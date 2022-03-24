const express = require('express');

const app = express();

// Built in middleware
app.use(express.json());

// App routes
app.use('/api/v1/publishers', require('./controllers/publishers'));
app.use('/api/v1/authors', require('./controllers/authors'));
app.use('/api/v1/reviewers', require('./controllers/reviewers'));
app.use('/api/v1/reviews', require('./controllers/reviews'));
app.use('/api/v1/books', require('./controllers/books'));

// Error handling & 404 middleware for when
// a request doesn't match any app routes
app.use(require('./middleware/not-found'));
app.use(require('./middleware/error'));

module.exports = app;
