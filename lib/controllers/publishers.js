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
  });
