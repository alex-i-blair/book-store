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

  static async insert({ 
    title,
    publisher,
    released, 
  }) {
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
};
