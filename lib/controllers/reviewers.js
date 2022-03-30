const { Router } = require('express');
const Reviewer = require('../models/Reviewer');

module.exports = Router()
  .post('/', async (req, res) => {
    const reviewer = await Reviewer.insert(req.body);
    res.send(reviewer);
  })

  .get('/', async (req, res) => {
    const reviewers = await Reviewer.findAllReviewers(req.body);
    res.send(reviewers);
  })

  .get('/:id', async (req, res) => {
    const reviewer = await Reviewer.findReviewerById(req.params.id);
    const reviewersWithReviews = await reviewer.findReviews();
    res.send(reviewersWithReviews);

    //grab reviewers with id
    //join to reviews
    // and match reviews to reviewer by reviewer id
    //every table has the id property
  })

  .patch('/:id', async (req, res, next) => {
    try {
      const updatedReviewer = await Reviewer.updateReviewer(req.params.id, req.body);
      if (!updatedReviewer) {
        const error = new Error(`reviewer ${req.params.id} not found`);
        error.status = 404;
        throw error;
      } res.json(updatedReviewer);
    } catch (error) {
      next(error);
    }
  })

  .delete('/:id', async (req, res, next) => {
    try {
      const reviewer = await Reviewer.deleteReviewerById(req.params.id);

      res.send(reviewer);
    } catch (error) {
      error.status = 403;
      error.message = 'Cannot delete reviewer';
      next(error);
    }
  });
