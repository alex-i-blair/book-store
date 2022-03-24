const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');
const Book = require('../lib/models/Book');
const Publisher = require('../lib/models/Publisher');
const Author = require('../lib/models/Author');
const Review = require('../lib/models/Review');

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
    const newPublisher = await Publisher.insert({
      name: 'test',
      city: 'portland',
      state: 'OR',
      country: 'USA'
    });

    await Author.insert({
      name: 'Dan Brown',
      dob: '1964-06-22',
      pob: 'Exeter, NH',
    });

    const newAuthors = await Author.getAllAuthors();

    await Review.insert({
      rating: 3,
      reviewer: 1,
      review: 'amazing book',
      book: 1
    });

    const newReviews = await Review.getAllReviews();

    const book = await Book.insert({
      title: 'Bobs Burgers',
      released: 2000,
      publisher: newPublisher,
      authors: newAuthors,
      reviews: newReviews
    });

    const res = await request(app)
      .get(`/api/v1/books/${book.id}`);

    expect(res.body).toEqual({ id: expect.any(String), ...book });
  });
});