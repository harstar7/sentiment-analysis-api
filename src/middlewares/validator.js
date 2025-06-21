const createError = require('http-errors');
const logger = require('../config/logger');

const validateText = (req, res, next) => {
  const { text } = req.body;
  
  // Check for empty input
  if (!text) {
    logger.error('No text provided');
    return next(createError(400, 'Text is required'));
  }
  
  // Validate input type
  if (typeof text !== 'string' && !Array.isArray(text)) {
    logger.error('Invalid text format');
    return next(createError(400, 'Text must be a string or an array of strings'));
  }

  // Handle array input
  if (Array.isArray(text)) {
    if (text.some(item => typeof item !== 'string')) {
      logger.error('Invalid array content');
      return next(createError(400, 'All items in the array must be strings'));
    }
    if (text.some(item => /^[\d\s]+$/.test(item))) {
      logger.error('Numeric-only text in array');
      return next(createError(400, 'Text elements must contain letters, not just numbers'));
    }
    return next();
  }

  // Handle single string input
  if (/^[\d\s]+$/.test(text)) {
    logger.error('Numeric-only text provided');
    return next(createError(400, 'Text must contain letters, not just numbers'));
  }
if (text.length < 3) {
  return next(createError(400, 'Text must be at least 3 characters'));
}
  next();
};

module.exports = {
  validateText
};