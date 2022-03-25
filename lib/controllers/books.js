const { Router } = require('express');
const Book = require('../models/Book');

module.exports = Router()
  .post('/', async (req, res) => {
    const book = await Book.insert(req.body);

    res.json(book);
  })

  .get('/', async (req, res) => {
    const books = await Book.getAllBooks();
    res.json(books);
  })

  .get('/:id', async (req, res) => {
    const book = await Book.getBookById(req.params.id);
    await book.getBookAuthors();
    console.log('bookAfter', book);
    await book.addReviews();
    console.log('full book', book);
    res.json(book);
  });

