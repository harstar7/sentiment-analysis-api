const request = require('supertest');
const app = require('../../src/app');
const logger = require('../../src/config/logger');

describe('Sentiment Analysis API', () => {
  beforeAll(() => {
    logger.silent = true; // Disable logging during tests
    process.env.NODE_ENV = 'test'; // Set test environment
  });

  afterAll(() => {
    logger.silent = false;
    delete process.env.NODE_ENV;
  });

  describe('POST /api/sentiment', () => {
    it('should analyze sentiment for a single text', async () => {
      const response = await request(app)
        .post('/api/sentiment')
        .send({ text: 'I love this!' })
        .expect(200);

      expect(response.body).toEqual({
        text: 'I love this!',
        sentiment: 'positive',
        score: expect.any(Number),
        comparative: expect.any(Number),
        tokens: expect.any(Array),
        words: expect.any(Array),
        positive: expect.any(Array),
        negative: expect.any(Array)
      });
    });

    it('should analyze sentiment for multiple texts', async () => {
      const response = await request(app)
        .post('/api/sentiment')
        .send({ text: ['I love this!', 'I hate this!', 'This is neutral'] })
        .expect(200);

      expect(response.body).toEqual({
        results: [
          expect.objectContaining({
            text: 'I love this!',
            sentiment: 'positive'
          }),
          expect.objectContaining({
            text: 'I hate this!',
            sentiment: 'negative'
          }),
          expect.objectContaining({
            text: 'This is neutral',
            sentiment: 'neutral'
          })
        ]
      });
    });

    it('should return 400 for empty text', async () => {
      const response = await request(app)
        .post('/api/sentiment')
        .send({})
        .expect(400);

      expect(response.body).toEqual({
        success: false,
        statusCode: 400,
        message: 'Text is required'
      });
    });

    it('should handle non-English text in test environment', async () => {
      const response = await request(app)
        .post('/api/sentiment')
        .send({ text: 'Texto en español' })
        .expect(200); // Should pass in test environment

      expect(response.body.sentiment).toBeDefined();
    });
  });
});