const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');
const Book = require('../lib/models/Book');

describe('book routes', () => {
  beforeEach(() => {
    return setup(pool);
  });

  afterAll(() => {
    pool.end();
  });

  it('should create a book', async () => {
    const res = await request(app)
      .post('/api/v1/books')
      .send({
        title: 'Bobs Burgers',
        publisher: 1,
        released: 2000
      });

    const expected = {
      id: expect.any(String),
      title: 'Bobs Burgers',
      publisher: res.body.publisher,
      released: 2000
    };

    expect(res.body).toEqual(expected);
  });

  it('should get all books', async () => {
    await Book.insert({
      title: 'Bobs Burgers',
      publisher: 1,
      released: 2000
    });

    const res = await request(app)
      .get('/api/v1/books');

    expect(res.body).toEqual([{
      id: expect.any(String),
      title: 'Bobs Burgers',
      publisher: expect.any(String),
      released: 2000
    }]);
  });

  it('should get single row on books table by ID', async () => {
    const book = await Book.insert({
      title: 'Bobs Burgers',
      publisher: 1,
      released: 2000
    });

    const res = await request(app)
      .get(`/api/v1/books/${book.id}`);

    expect(res.body).toEqual(book);
  });
});
