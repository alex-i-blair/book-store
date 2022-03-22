const { Router } = require('express');
const Author = require('../models/Author');

module.exports = Router()
  .post('/', async (req, res) => {
    const author = await Author.insert(req.body);

    res.json(author);
  })

  .get('/', async (req, res) => {
    const author = await Author.getAllAuthors();

    res.json(author);
  });
