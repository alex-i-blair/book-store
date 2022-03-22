const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');

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
});
