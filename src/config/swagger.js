const swaggerJSDoc = require('swagger-jsdoc');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Sentiment Analysis API',
      version: '1.0.0',
      description: 'API for analyzing sentiment in text',
    },
    servers: [
      {
        url: 'http://localhost:3000/api',
        description: 'Development server',
      },
    ],
    components: {
      schemas: {
        SentimentRequest: {
          type: 'object',
          properties: {
            text: {
              type: 'string',
              example: "I absolutely love this product! It's fantastic."
            }
          },
          required: ['text']
        },
        SentimentResponse: {
          type: 'object',
          properties: {
            sentiment: {
              type: 'string',
              example: "positive",
              enum: ["positive", "neutral", "negative"]
            },
            score: {
              type: 'number',
              example: 0.95,
              description: "Sentiment score between -1 (negative) and 1 (positive)"
            },
            confidence: {
              type: 'number',
              example: 0.98,
              description: "Confidence level of the analysis (0 to 1)"
            },
            analyzedText: {
              type: 'string',
              example: "I absolutely love this product! It's fantastic.",
              description: "Echo of the analyzed text"
            }
          }
        }
      },
      examples: {
        PositiveExample: {
          value: {
            text: "This service is amazing and the support team is wonderful!"
          }
        },
        NegativeExample: {
          value: {
            text: "I'm extremely disappointed with the quality of this product."
          }
        },
        NeutralExample: {
          value: {
            text: "The package arrived on time with no issues."
          }
        }
      }
    }
  },
  apis: ['./src/routes/*.js'],
};

const swaggerSpec = swaggerJSDoc(options);

module.exports = swaggerSpec;