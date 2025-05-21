const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const bookRoutes = require('./routes/bookRoutes');
const errorHandler = require('./middlewares/errorHandler');

const app = express();
const logger = require('./middlewares/logger');

// Middleware
app.use(cors());
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(logger);

// Static files (for .txt)
app.use('/uploads', express.static('uploads'));

// Routes
app.use('/api/books', bookRoutes);

// Global error handler
app.use(errorHandler);

module.exports = app;
