const pool = require('../utils/pool');

module.exports = class Author {
  id;
  name;
  dob;
  pob;

  constructor(row) {
    this.id = row.id;
    this.name = row.name;
    this.dob = row.dob;
    this.pob = row.pob;
  }

  static async insert({ name, dob, pob }) {
    const { rows } = await pool.query(`
    INSERT INTO
    authors (name, dob, pob)
    VALUES ($1, $2, $3)
    RETURNING *`,
    [name, dob, pob]
    );

    return new Author(rows[0]);
  }

  static async getAllAuthors() {
    const { rows } = await pool.query(`
    SELECT name, id
    FROM authors`
    );

    return rows.map((row) => new Author(row));
  }
};
