const { Router } = require('express');
const Review = require('../models/Review');

module.exports = Router()
  .post('/', async (req, res) => {
    const review = await Review.insert(req.body);

    res.json(review);
  })

  .get('/', async (req, res) => {
    const reviews = await Review.getReviewsForBook(req.body);
    res.json(reviews);
  })

  .get('/', async (req, res, next) => {
    try {
      const reviews = await Review.getAllReviews();

      res.json(reviews);
    } catch (error) {
      next(error);
    }
  });
