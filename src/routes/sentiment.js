const express = require('express');
const router = express.Router();
const sentimentController = require('../controllers/sentiment');
const validator = require('../middlewares/validator');

// Single, properly defined route
router.post('/', validator.validateText, sentimentController.analyzeSentiment);

module.exports = router;

/**
 * @swagger
 * tags:
 *   name: Sentiment
 *   description: Text sentiment analysis operations
 */

/**
 * @swagger
 * /sentiment:
 *   post:
 *     summary: Analyze text sentiment
 *     description: Analyze the sentiment of provided text and return results
 *     tags: [Sentiment]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/SentimentRequest'
 *           examples:
 *             positive:
 *               $ref: '#/components/examples/PositiveExample'
 *             negative:
 *               $ref: '#/components/examples/NegativeExample'
 *             neutral:
 *               $ref: '#/components/examples/NeutralExample'
 *     responses:
 *       200:
 *         description: Successful sentiment analysis
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/SentimentResponse'
 *             examples:
 *               positiveResponse:
 *                 value:
 *                   sentiment: "positive"
 *                   score: 0.95
 *                   confidence: 0.98
 *                   analyzedText: "This service is amazing and the support team is wonderful!"
 *               negativeResponse:
 *                 value:
 *                   sentiment: "negative"
 *                   score: -0.87
 *                   confidence: 0.92
 *                   analyzedText: "I'm extremely disappointed with the quality of this product."
 *       400:
 *         description: Invalid input
 *       500:
 *         description: Server error
 */
