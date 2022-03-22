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
  });
