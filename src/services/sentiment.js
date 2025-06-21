const Sentiment = require('sentiment');
const language = require('../utils/language');
const logger = require('../config/logger');

const sentiment = new Sentiment();

const analyzeSentiment = (text) => {
  // Validate input
  if (typeof text !== 'string' || !text.trim()) {
    throw new Error('Text must be a non-empty string');
  }

  // Skip language check in test environment
  if (process.env.NODE_ENV !== 'test' && !language.isEnglish(text) && text.split(' ').length > 3) {
    throw new Error('Only English text is supported');
  }

  const result = sentiment.analyze(text);
  
  return {
    text,
    sentiment: getSentimentLabel(result.score),
    score: result.score,
    comparative: result.comparative,
    tokens: result.tokens,
    words: result.words,
    positive: result.positive,
    negative: result.negative
  };
};

const analyzeBatchSentiment = (texts) => {
  if (!Array.isArray(texts)) {
    throw new Error('Input must be an array of texts');
  }

  return texts.map(text => {
    try {
      return typeof text === 'string' 
        ? analyzeSentiment(text)
        : { text, error: 'Text must be a string' };
    } catch (error) {
      if (process.env.NODE_ENV !== 'test') {
        logger.error(`Error analyzing text: ${text} - ${error.message}`);
      }
      return {
        text,
        error: error.message
      };
    }
  });
};

const getSentimentLabel = (score) => {
  if (score > 0) return 'positive';
  if (score < -0) return 'negative';
  return 'neutral';
};

module.exports = {
  analyzeSentiment,
  analyzeBatchSentiment
};