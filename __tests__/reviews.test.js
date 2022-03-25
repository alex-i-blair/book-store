const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');
const Review = require('../lib/models/Review');
const Book = require('../lib/models/Book');
const Publisher = require('../lib/models/Publisher');

describe('book-store routes', () => {
  beforeEach(() => {
    return setup(pool);
  });

  afterAll(() => {
    pool.end();
  });

  it('should add a review', async () => {
    const res = await request(app)
      .post('/api/v1/reviews')
      .send({
        rating: 3,
        reviewer: 1,
        review: 'amazing book',
        book: 1
      });

    const expected = {
      id: expect.any(String),
      rating: 3,
      reviewer: res.body.reviewer,
      review: 'amazing book',
      book: res.body.book
    };

    expect(res.body).toEqual(expected);
  });

  it('should get all reviews', async () => {
    const newPublisher = await Publisher.insert({
      name: 'test',
      city: 'portland',
      state: 'OR',
      country: 'USA',
    });

    const book = await Book.insert({
      title: 'Bobs Burgers',
      released: 2000,
      publisher: newPublisher.id
    });
    
    await Review.insert({
      rating: 3,
      reviewer: 1,
      review: 'amazing book',
      book: book.id
    });

    const res = await request(app)
      .get('/api/v1/reviews');

    expect(res.body).toEqual([{
      id: expect.any(String),
      rating: 3,
      review: 'amazing book',
      book_id: book.id,
      book_title: book.title
    }]);
  });

  // it('get a review by its id', async () => {

  //   const review = await Review.insert({
  //     rating: 3,
  //     reviewer: 1,
  //     review: 'amazing book',
  //     book: 1
  //   });

  //   const res = await request(app)
  //     .get(`/api/v1/reviews/${review.id}`);

  //   expect(res.body).toEqual(review);
  // });

});
