const pool = require('../utils/pool');

module.exports = class Author {
  id;
  name;
  dob;
  pob;

  constructor(row) {
    this.id = row.id;
    this.name = row.name;
    if (row.dob) {
      this.dob = new Date(row.dob).toLocaleDateString('en-US');
    }
    this.pob = row.pob;
  }

  static async insert({ name, dob, pob }) {
    const { rows } = await pool.query(
      `
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
    FROM authors`);
    return rows.map((row) => new Author(row));
  }

  static async getAuthor(id) {
    const { rows } = await pool.query(
      `
    SELECT *
    FROM authors
    WHERE id=$1`,
      [id]
    );
    if (!rows[0]) return null;
    return new Author(rows[0]);
  }
  static async updateAuthorById(id, { name }) {
    const existingAuthor = await Author.getAuthor(id);
    if (!existingAuthor) return null;
    const newName = name ?? existingAuthor.name;
    const { rows } = await pool.query(
      'UPDATE authors SET name=$2 WHERE id=$1 RETURNING *;',
      [id, newName]
    );
    return new Author(rows[0]);
  }
  static async deleteAuthor(id) {
    const { rows } = await pool.query(
      'DELETE FROM authors WHERE id=$1 RETURNING *;',
      [id]
    );
    return new Author(rows[0]);
  }
};
