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
    this.book = row.book;
    this.review = row.review;
    if (row.book_id) {
      this.book_id = row.book_id;
    }
    if (row.book_title) {
      this.book_title = row.book_title;
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
    rating, review, reviews.id, books.id AS book_id, books.title AS book_title
    FROM reviews
    LEFT JOIN 
      books
    ON 
      books.id = reviews.book
    ORDER BY
    rating DESC
    LIMIT 100
    `);
    console.log(rows);
    return rows.map((row) => new Review(row));
  }
};
