const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');
const Author = require('../lib/models/Author');

describe('author routes', () => {
  beforeEach(() => {
    return setup(pool);
  });

  afterAll(() => {
    pool.end();
  });

  it('should create an author', async () => {
    const res = await request(app).post('/api/v1/authors').send({
      name: 'Dan Brown',
      dob: '1964-06-22',
      pob: 'Exeter, NH',
    });

    const expected = {
      id: expect.any(String),
      name: 'Dan Brown',
      dob: res.body.dob,
      pob: 'Exeter, NH',
    };

    expect(res.body).toEqual(expected);
  });

  it('should get all authors', async () => {
    const author = await Author.insert({
      name: 'Dan Brown',
      dob: '1964-06-22',
      pob: 'Exeter, NH',
    });

    const expected = [
      {
        id: author.id,
        name: author.name,
      },
    ];

    const res = await request(app).get('/api/v1/authors');

    expect(res.body).toEqual(expected);
  });

  test('should get an author by id', async () => {
    const author = await Author.insert({
      name: 'Dan Brown',
      dob: '1964-06-22',
      pob: 'Exeter, NH',
    });

    const expected = {
      id: expect.any(String),
      name: 'Dan Brown',
      dob: author.dob,
      pob: 'Exeter, NH',
    };

    const res = await request(app).get(`/api/v1/authors/${author.id}`);

    expect(res.body).toEqual(expected);
  });

  it('should update an author by id', async () => {
    const author = await Author.insert({
      name: 'Dan Brown',
      dob: '1964-06-22',
      pob: 'Exeter, NH',
    });

    const res = await request(app)
      .patch(`/api/v1/authors/${author.id}`)
      .send({ name: 'Philip Pullman' });

    const expected = {
      id: author.id,
      name: 'Philip Pullman',
      dob: author.dob,
      pob: 'Exeter, NH',
    };
    expect(res.body).toEqual(expected);
    expect(await Author.getAuthor(author.id)).toEqual(expected);
  });
  it('should be able to delete an author', async () => {
    const author = await Author.insert({
      name: 'Dan Brown',
      dob: '1964-06-22',
      pob: 'Exeter, NH',
    });
    const res = await request(app).delete(`/api/v1/authors/${author.id}`);
    expect(res.body).toEqual(author);
    expect(await Author.getAuthor(author.id)).toBeNull();
  });
});
