const pool = require('../utils/pool');

module.exports = class Reviewer {
  id;
  name;
  company;

  constructor(row) {
    this.id = row.id;
    this.name = row.name;
    this.company = row.company;
  }

  static async insert({ name, company }) {
    const { rows } = await pool.query(
      `
        INSERT INTO
            reviewers (name, company)
        VALUES
            ($1, $2)
        RETURNING
            *
        `,
      [name, company]
    );
    return new Reviewer(rows[0]);
  }

  static async findAllReviewers() {
    const { rows } = await pool.query(
      `
        SELECT
            *
        FROM
            reviewers
        `
    );
    return rows.map((row) => new Reviewer(row));
  }

  static async findReviewerById(id) {
    const { rows } = await pool.query(
      `
        SELECT
            *
        FROM
            reviewers
        WHERE
            id=$1
        `,
      [id]
    );
    if (!rows[0]) return null;
    return new Reviewer(rows[0]);
  }

  async findReviews() {
    const { rows } = pool.query(
      `
        SELECT
            reviews.id,
            reviews.rating,
            reviews.review,
            books.id AS "book_id",
            books.title AS "book_title"
        FROM
            reviews
        LEFT JOIN
            reviewers
        ON
            reviewers.id = reviews.reviewer
        LEFT JOIN
          books
        ON
          reviews.book = books.id
        WHERE
            reviews.reviewer=$1
        `,
      [this.id]
    );
    this.reviews = rows;
    return this;
  }

  static async updateReviewer(id, attributes) {
    const existingReviewer = await Reviewer.findReviewerById(id);
    const updatedReviewer = { ...existingReviewer, ...attributes };
    const { name, company } = updatedReviewer;
    const { rows } = await pool.query(
      `
        UPDATE
            reviewers
        SET
            name=$1,
            company=$2
        WHERE
            id=$3
        RETURNING
            *
        `,
      [name, company, id]
    );
    return new Reviewer(rows[0]);
  }

  static async deleteReviewerById(id) {
    const { rows } = await pool.query(
      `
        DELETE FROM
            reviewers
        WHERE
            id=$1
        RETURNING
            *
        `,
      [id]
    );
    if (!rows) return null;
    return new Reviewer(rows[0]);
  }
};
