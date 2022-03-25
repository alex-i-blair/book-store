const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');
const Reviewer = require('../lib/models/Reviewer');
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
  it.only('get a reviewer by id', async () => {
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

    const newReviewer = await Reviewer.insert({
      name: 'Billy',
      company: 'alchemy'
    });

    await Review.insert({
      rating: 3,
      reviewer: newReviewer.id,
      review: 'amazing book',
      book: book.id,
    });

    const newReviews = await Review.getAllReviews();

    const res = await request(app).get(`/api/v1/reviewers/${newReviewer.id}`);
    console.log(res.body);
    expect(res.body).toEqual({
      id: expect.any(String),
      name: newReviewer.name,
      company: newReviewer.company,
      reviews: [{ id: newReviews.id, rating: newReviews.rating, review: newReviews.review, book_id: newReviews[0].book, book_title: book.title }]
    });
  });

  // it('updates a reviewer by id', async () => {
  //   const reviewer = await Reviewer.insert({
  //     name: 'Sally',
  //     company: 'The Cool Company',
  //   });

  //   // await Review.insert({
  //   //   rating: 3,
  //   //   reviewer: newReviewer.id,
  //   //   review: 'amazing book',
  //   //   book: book.id,
  //   // });
    
  //   // const newReviews = await Review.getAllReviews();

  //   const res = await request(app)
  //     .patch(`/api/v1/reviewers/${reviewer.id}`)
  //     .send({ name: 'Maisie' });

  //   const expected = {
  //     id: reviewer.id,
  //     name: 'Maisie',
  //     company: 'The Cool Company',
  //   };

  //   expect(res.body).toEqual(expected);
  //   expect(await Reviewer.findReviewerById(reviewer.id)).toEqual(expected);
  // });

//   it('deletes a reviewer by id', async () => {
//     const expected = await Reviewer.insert({
//       name: 'Sally',
//       company: 'The Cool Company',
//     });
//     const res = await request(app).delete(`/api/v1/reviewers/${expected.id}`);

//     expect(res.body).toEqual(expected);
//     expect(await Reviewer.findReviewerById(expected.id)).toBeNull();
//   });
// 
});
