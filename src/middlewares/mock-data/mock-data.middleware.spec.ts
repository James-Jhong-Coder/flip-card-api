import { MockDataMiddleware } from './mock-data.middleware';

describe('MockDataMiddleware', () => {
  it('should be defined', () => {
    expect(new MockDataMiddleware()).toBeDefined();
  });
});
