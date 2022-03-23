const { Router } = require('express');
const Author = require('../models/Author');

module.exports = Router()
  .post('/', async (req, res) => {
    const author = await Author.insert(req.body);

    res.json(author);
  })

  .get('/', async (req, res) => {
    const author = await Author.getAllAuthors();
    console.log(author);
    res.json(author);
  })

  .get('/:id', async (req, res) => {
    const author = await Author.getAuthor(req.params.id);

    res.json(author);
  })
  .patch('/:id', async (req, res) => {
    const { id } = req.params;
    const author = await Author.updateAuthorById(id, req.body);
    res.json(author);
  });
