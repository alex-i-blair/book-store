const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');
const Reviewer = require('../lib/models/Reviewer');

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

    expect(res.body).toEqual([{ id: expect.any(String), name: 'Sally', company: 'The Cool Company' }]);
  });
    
  it('get a reviewer by id', async () => {
    const reviewer = await Reviewer.insert({ name: 'Sally', company: 'The Cool Company'
    // , reviews: [{
    //   id: expect.any(String),
    //   rating: 5,
    //   review: 'Very good book!',
    //   book_id: 1,
    //   book_title: 'The Road'
      // }] 
    });
    const res = await request(app).get(`/api/v1/reviewers/${reviewer.id}`);
      
    expect(res.body).toEqual(reviewer);
  });
    
  it('updates a reviewer by id', async () => {
    const reviewer = await Reviewer.insert({ name: 'Sally', company: 'The Cool Company' });
     
    const res = await request(app)
      .patch(`/api/v1/reviewers/${reviewer.id}`)
      .send({ name: 'Maisie' });
      
    const expected = { id: reviewer.id, name: 'Maisie', company: 'The Cool Company' };

    expect(res.body).toEqual(expected);
    expect(await Reviewer.findReviewerById(reviewer.id)).toEqual(expected);
  });
    
});
