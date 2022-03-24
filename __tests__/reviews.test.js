const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');
const Review = require('../lib/models/Review');

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
    await Review.insert({
      rating: 3,
      reviewer: 1,
      review: 'amazing book',
      book: 1
    });

    const res = await request(app)
      .get('/api/v1/reviews');

    expect(res.body).toEqual([{
      id: expect.any(String),
      rating: 3,
      reviewer: expect.any(String),
      review: 'amazing book',
      book: expect.any(String)
    }]);
  });

});
