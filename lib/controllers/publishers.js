const { Router } = require('express');
const Publisher = require('../models/Publisher');

module.exports = Router()
  .post('/', async (req, res) => {
    const publisher = await Publisher.insert(req.body);
    res.json(publisher);
  })
  .get('/', async (req, res) => {
    const publisher = await Publisher.getAllPublishers(req.body);
    res.json(publisher);
  })
  .get('/:id', async (req, res) => {
    const publisher = await Publisher.getPublisherById(req.params.id);
    res.json(publisher);
  })
  .patch('/:id', async (req, res, next) => {
    try {
      const updatedPublisher = await Publisher.updatePublisher(req.params.id, req.body);
      if (!updatedPublisher) {
        const error = new Error(`Publisher ${req.params.id} not found`);
        error.status = 404;
        throw error;
      }
      res.json(updatedPublisher);
    } catch (error) {
      next(error);
    }
  })
  .delete('/:id', async (req, res) => {
    const publisher = await Publisher.deletePublisher(req.params.id);

    res.json(publisher);
  });
