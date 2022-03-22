const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');
const Publisher = require('../lib/models/Publisher');

describe('book-store routes', () => {
  beforeEach(() => {
    return setup(pool);
  });

  afterAll(() => {
    pool.end();
  });
  it('should create a publisher', async () => {
    const res = await request(app)
      .post('/api/v1/publishers')
      .send({ name: 'test', city: 'portland', state: 'OR', country: 'USA' });
    expect(res.body).toEqual({
      id: expect.any(String),
      name: 'test',
      city: 'portland',
      state: 'OR',
      country: 'USA',
    });
  });
  it('should be able to list all publishers', async () => {
    await Publisher.insert({
      name: 'test',
      city: 'portland',
      state: 'OR',
      country: 'USA',
    });
    const res = await request(app).get('/api/v1/publishers');
    expect(res.body).toEqual([
      {
        id: expect.any(String),
        name: 'test',
        city: 'portland',
        state: 'OR',
        country: 'USA',
      },
    ]);
  });
  it('should be able to get publisher by id', async () => {
    const publisher = await Publisher.insert({
      name: 'test',
      city: 'portland',
      state: 'OR',
      country: 'USA',
    });
    const res = await request(app).get(`/api/v1/publishers/${publisher.id}`);
    expect(res.body).toEqual(publisher);
  });
});
