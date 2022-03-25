const pool = require('../utils/pool');

module.exports = class Book {
  id;
  title;
  publisher;
  released;

  constructor(row) {
    this.id = row.id;
    this.title = row.title;
    this.publisher = row.publisher;
    this.released = row.released;
  }

  static async insert({ title, publisher, released }) {
    const { rows } = await pool.query(
      `
      INSERT INTO
        books (title, publisher, released)
      VALUES
        ($1, $2, $3)
      RETURNING
        *
      `,
      [title, publisher, released]
    );

    return new Book(rows[0]);
  }

  static async getAllBooks() {
    const { rows } = await pool.query(
      `
      SELECT
        *
      FROM
        books
      `
    );

    return rows.map((row) => new Book(row));
  }

  static async getBookById(id) {
    const { rows } = await pool.query(
      `
      SELECT
        *
      FROM
        books
      LEFT JOIN
        publishers
      ON
        books.publisher = publishers.id
      WHERE
        books.id=$1
      `,
      [id]
    );

    return new Book(rows[0]);
  }
  async getBookAuthors() {
    const { rows } = await pool.query(
      'SELECT authors.id, authors.name FROM authors LEFT JOIN books_authors ON authors.id = books_authors.author_id WHERE books_authors.author_id=$1;',
      [this.id]
    );
    this.authors = rows;
    return this;
  }
};
