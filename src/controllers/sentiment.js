const sentimentService = require('../services/sentiment');
const logger = require('../config/logger');

const analyzeSentiment = async (req, res, next) => {
  try {
    const { text } = req.body;
    
    // Check for batch processing
    if (Array.isArray(text)) {
      const results = await sentimentService.analyzeBatchSentiment(text);
      return res.json({ results });
    }
    
    // Single text processing
    const result = await sentimentService.analyzeSentiment(text);
    res.json(result);
  } catch (error) {
    logger.error(`Sentiment analysis error: ${error.message}`);
    next(error);
  }
};

module.exports = {
  analyzeSentiment
};