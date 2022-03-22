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
    const res = await request(app)
      .post('/api/v1/authors')
      .send({
        name: 'Dan Brown',
        dob: '1964-06-22',
        pob: 'Exeter, NH'
      });

    const expected = {
      id: expect.any(String),
      name: 'Dan Brown',
      dob: res.body.dob,
      pob: 'Exeter, NH'
    };

    expect(res.body).toEqual(expected);
  });

  it ('should get all authors', async () => {
    const author = await Author.insert({
      name: 'Dan Brown',
    });

    const expected = [{
      id: author.id,
      name: author.name
    }
    ];

    const res = await request(app)
      .get('/api/v1/authors');

    expect(res.body).toEqual(expected);
  });

  test('should get an author by id', async () => {
    const author = await Author.insert({
      name: 'Dan Brown',
      dob: '1964-06-22',
      pob: 'Exeter, NH'
    });

    // eslint-disable-next-line
    const regex = /\"/ig;

    const expected = {
      id: expect.any(String),
      name: 'Dan Brown',
      dob: JSON.stringify(author.dob).replace(regex, ''),
      pob: 'Exeter, NH'
    };

    const res = await request(app).get(`/api/v1/authors/${author.id}`);

    expect(res.body).toEqual(expected);
  });

  // test('should update an author by id', async () => {
  //   const author = await Author.insert({
  //     name: 'Dan Brown',
  //     dob: new Date('1964-06-22'),
  //     pob: 'Exeter, NH'
  //   });

  //   const res = await request(app)
  //   .patch('/api/v1/author')
  //   .send({

  //   })
  // })

});
