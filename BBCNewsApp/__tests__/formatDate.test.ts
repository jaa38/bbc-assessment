// __tests__/formatDate.test.ts

import { formatDate } from '../src/components/ArticleCard';

describe('formatDate', () => {

  test('returns Just now for very recent articles', () => {
    const now = new Date().toISOString();

    expect(formatDate(now)).toBe('Just now');
  });

  test('returns hours ago for same day articles', () => {
    const threeHoursAgo = new Date(
      Date.now() - 3 * 60 * 60 * 1000
    ).toISOString();

    expect(formatDate(threeHoursAgo)).toBe('3 hours ago');
  });

  test('returns days ago for older articles', () => {
    const twoDaysAgo = new Date(
      Date.now() - 2 * 24 * 60 * 60 * 1000
    ).toISOString();

    expect(formatDate(twoDaysAgo)).toBe('2 days ago');
  });

});