const { Router } = require('express');
const Review = require('../models/Review');

module.exports = Router()
  .post('/', async (req, res) => {
    const review = await Review.insert(req.body);

    res.json(review);
  })

  .get('/', async (req, res, next) => {
    try {
      const reviews = await Review.getAllReviews();
      // await reviews.addBookTitle();
      console.log('REVIEWS!!!!!', reviews);
      
      res.json(reviews);
    } catch(error) {
      next(error);
    } 
  });
