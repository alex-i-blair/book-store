const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');
const Reviewer = require('../lib/models/Reviewer');
const Book = require('../lib/models/Book');
const Publisher = require('../lib/models/Publisher');
const Review = require('../lib/models/Review');

describe('book-store routes', () => {
  beforeEach(() => {
    return setup(pool);
  });

  afterAll(() => {
    pool.end();
  });

  it('creates a reviewer', async () => {
    const reviewer = { name: 'Sally', company: 'The Cool Company' };

    const res = await request(app).post('/api/v1/reviewers').send(reviewer);

    expect(res.body).toEqual({ id: expect.any(String), ...reviewer });
  });

  it('gets a list of reviewers', async () => {
    await Reviewer.insert({ name: 'Sally', company: 'The Cool Company' });
    const res = await request(app).get('/api/v1/reviewers');

    expect(res.body).toEqual([
      { id: expect.any(String), name: 'Sally', company: 'The Cool Company' },
    ]);
  });

  // this test is incomplete: it needs a book insert
  it('get a reviewer by id', async () => {
    const reviewer = await Reviewer.insert({
      name: 'Sally',
      company: 'The Cool Company',
    });
    const publisher = await Publisher.insert({
      name: 'test',
      city: 'portland',
      state: 'or',
      country: 'usa',
    });
    const book = await Book.insert({
      title: 'Bobs Burgers',
      publisher: publisher.id,
      released: 2000,
    });
    await Review.insert({
      rating: 3,
      reviewer: reviewer.id,
      review: 'it was delicious',
      book: book.id,
    });
    const res = await request(app).get(`/api/v1/reviewers/${reviewer.id}`);

    expect(res.body).toEqual(reviewer);
  });

  it('updates a reviewer by id', async () => {
    const reviewer = await Reviewer.insert({
      name: 'Sally',
      company: 'The Cool Company',
    });

    const res = await request(app)
      .patch(`/api/v1/reviewers/${reviewer.id}`)
      .send({ name: 'Maisie' });

    const expected = {
      id: reviewer.id,
      name: 'Maisie',
      company: 'The Cool Company',
    };

    expect(res.body).toEqual(expected);
    expect(await Reviewer.findReviewerById(reviewer.id)).toEqual(expected);
  });

  it('deletes a reviewer by id', async () => {
    const expected = await Reviewer.insert({
      name: 'Sally',
      company: 'The Cool Company',
    });
    const res = await request(app).delete(`/api/v1/reviewers/${expected.id}`);

    expect(res.body).toEqual(expected);
    expect(await Reviewer.findReviewerById(expected.id)).toBeNull();
  });

  it('should not be able to delete reviewer if associated with review', async () => {
    const publisher = await Publisher.insert({
      name: 'test',
      city: 'portland',
      state: 'or',
      country: 'usa',
    });

    const book = await Book.insert({
      title: 'Bobs Burgers',
      publisher: publisher.id,
      released: 2000,
    });

    const reviewer = await Reviewer.insert({
      name: 'Sally',
      company: 'The Cool Company',
    });

    await Review.insert({
      rating: 3,
      reviewer: reviewer.id,
      review: 'it was delicious',
      book: book.id,
    });

    const res = await request(app).delete(`/api/v1/reviewers/${reviewer.id}`);

    expect(res.body).toEqual({
      message: 'Cannot delete reviewer',
      status: 403,
    });
  });
});
