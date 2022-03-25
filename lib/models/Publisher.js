const pool = require('../utils/pool');

module.exports = class Publisher {
  id;
  name;
  city;
  state;
  country;

  constructor(row) {
    this.id = row.id;
    this.name = row.name;
    this.city = row.city;
    this.state = row.state;
    this.country = row.country;
  }
  static async insert({ name, city, state, country }) {
    const { rows } = await pool.query(
      'INSERT INTO publishers (name, city, state, country) VALUES ($1, $2, $3, $4) RETURNING *;',
      [name, city, state, country]
    );
    return new Publisher(rows[0]);
  }
  static async getAllPublishers() {
    const { rows } = await pool.query('SELECT id, name FROM publishers;');
    return rows.map((row) => new Publisher(row));
  }

  static async getPublisherById(id) {
    const { rows } = await pool.query('SELECT * FROM publishers WHERE id=$1;', [
      id,
    ]);
    if (!rows[0]) return null;
    return new Publisher(rows[0]);
  }

  static async updatePublisher(id, attributes) {
    const currentPublisher = await Publisher.getPublisherById(id);
    if (!currentPublisher) return null;
    const updatedPublisher = { ...currentPublisher, ...attributes };
    const { name, city, state, country } = updatedPublisher;
    const { rows } = await pool.query(
      `
      UPDATE
        publishers
      SET
        name=$1,
        city=$2,
        state=$3,
        country=$4
      WHERE
        id=$5
      RETURNING
        *
      `,
      [name, city, state, country, id]
    );

    return new Publisher(rows[0]);
  }

  static async deletePublisher(id) {
    const { rows } = await pool.query(
      `
      DELETE FROM
        publishers
      WHERE
        id=$1
      RETURNING
        *
      `,
      [id]
    );

    return new Publisher(rows[0]);
  }
};
