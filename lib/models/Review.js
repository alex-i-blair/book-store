const pool = require('../utils/pool');

module.exports = class Review {
  id;
  rating;
  reviewer;
  review;
  book;

  constructor(row) {
    this.id = row.id;
    this.rating = row.rating;
    if (row.reviewer) {
      this.reviewer = row.reviewer;
    }
    this.review = row.review;
    if (row.book) {
      this.book = row.book;
    }
  }

  static async insert({ rating, reviewer, review, book }) {
    const { rows } = await pool.query(
      `
    INSERT INTO
      reviews (rating, reviewer, review, book)
    VALUES ($1, $2, $3, $4)
    RETURNING *
    `,
      [rating, reviewer, review, book]
    );

    return new Review(rows[0]);
  }

  static async getAllReviews() {
    const { rows } = await pool.query(`
    SELECT
      reviews.id,
      reviews.rating,
      reviews.review
    FROM 
      reviews
    ORDER BY
      rating DESC
    LIMIT 100
    `);

    return await Promise.all(
      rows.map(async (row) => {
        const p = new Review(row);
        return await p.addBookTitle();
      })
    );
  }

  async addBookTitle() {
    const { rows } = await pool.query(
      `
      SELECT  
        books.title AS book_title,
        books.id AS book_id
      FROM
        books
      WHERE
        books.id = $1
      `,
      [this.id]
    );

    this.book_title = rows[0].book_title;
    this.book_id = rows[0].book_id;
    return this;
  }
  static async getReviewsForBook() {
    const { rows } = await pool.query('SELECT * FROM reviews;');
    return rows.map((row) => new Review(row));
  }
};
