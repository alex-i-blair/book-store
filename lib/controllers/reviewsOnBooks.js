const { Router } = require('express');
const ReviewOnBook = require('../models/ReviewOnBook');
module.exports = Router().get('/', async (req, res) => {
  const reviews = await ReviewOnBook.getReviewsForBook(req.body);
  res.json(reviews);
});
