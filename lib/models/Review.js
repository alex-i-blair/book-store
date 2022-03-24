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
    this.reviewer = row.reviewer;
    this.review = row.review;
    this.book = row.book;
  }

  static async insert({ rating, reviewer, review, book }) {
    const { rows } = await pool.query(`
    INSERT INTO
    reviews (rating, reviewer, review, book)
    VALUES ($1, $2, $3, $4)
    RETURNING *
    `, [rating, reviewer, review, book]);

    return new Review(rows[0]);
  }

  static async getAllReviews() {
    const { rows } = await pool.query(`
    SELECT
    *
    FROM reviews
    ORDER BY
    rating DESC
    LIMIT 100
    `);

    return rows.map((row) => new Review(row));
  }
};
