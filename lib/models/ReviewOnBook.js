const pool = require('../utils/pool');

module.exports = class ReviewOnBook {
  id;
  rating;
  review;
  reviewer;

  constructor(row) {
    this.id = row.id;
    this.rating = row.rating;
    this.review = row.review;
    this.reviewer = row.reviewer;
  }
  static async getReviewsOnBook({ rating, review, reviewer }) {
    const { rows } = await pool.query('SELECT * FROM reviews;', [
      rating,
      review,
      reviewer,
    ]);
    return rows.map((row) => new ReviewOnBook(row));
  }
};
