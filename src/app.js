const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const morgan = require('morgan');
const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('./config/swagger');
const logger = require('./config/logger');
const errorHandler = require('./middlewares/errorHandler');
const rateLimiter = require('./middlewares/rateLimiter');

const app = express();

// Middlewares
app.use(cors());
app.use(bodyParser.json());
app.use(morgan('combined', { stream: logger.stream }));
app.use(rateLimiter);

// API Documentation
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Routes
app.use('/api/sentiment', require('./routes/sentiment'));

// Error handling middleware
app.use(errorHandler);

module.exports = app;

