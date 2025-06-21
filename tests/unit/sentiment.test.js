const { analyzeSentiment, analyzeBatchSentiment } = require('../../src/services/sentiment');

describe('Sentiment Analysis Service', () => {
  beforeAll(() => {
    process.env.NODE_ENV = 'test'; // Set test environment
  });

  describe('analyzeSentiment()', () => {
    test('should classify positive text correctly', () => {
      const result = analyzeSentiment("I love this API!");
      expect(result.sentiment).toBe('positive');
      expect(result.score).toBeGreaterThan(0);
    });

    test('should classify negative text correctly', () => {
      const result = analyzeSentiment("I hate bugs in my code");
      expect(result.sentiment).toBe('negative');
      expect(result.score).toBeLessThan(0);
    });

    test('should classify neutral text correctly', () => {
      const result = analyzeSentiment("This is a chair");
      expect(result.sentiment).toBe('neutral');
      expect(Math.abs(result.score)).toBeLessThanOrEqual(0.2);
    });

    test('should throw error for empty text', () => {
      expect(() => analyzeSentiment("")).toThrow('Text must be a non-empty string');
    });
  });

  describe('analyzeBatchSentiment()', () => {
    test('should process multiple texts', () => {
      const results = analyzeBatchSentiment([
        "Excellent work!",
        "Terrible experience",
        "It was okay"
      ]);
      
      expect(results).toEqual([
        expect.objectContaining({ sentiment: 'positive' }),
        expect.objectContaining({ sentiment: 'negative' }),
        expect.objectContaining({ sentiment: 'neutral' })
      ]);
    });

    test('should handle invalid inputs in batch', () => {
      const results = analyzeBatchSentiment([
        "Good",
        123, // invalid input
        "Bad"
      ]);
      
      expect(results).toEqual([
        expect.objectContaining({ sentiment: 'positive' }),
        expect.objectContaining({ error: 'Text must be a string' }),
        expect.objectContaining({ sentiment: 'negative' })
      ]);
    });
  });
});