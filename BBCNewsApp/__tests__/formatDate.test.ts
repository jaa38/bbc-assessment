/**
 * @file formatDate.test.ts
 *
 * Unit tests for the `formatDate` utility function.
 *
 * Purpose:
 * - Verify that date formatting logic behaves correctly
 * - Ensure consistent user-facing time labels
 * - Cover key edge cases (recent, hours, days)
 *
 * Why this matters:
 * - `formatDate` is a pure function → ideal for unit testing
 * - Time-based UI is prone to subtle bugs
 * - Improves reliability of article timestamps
 */

import { formatDate } from '../src/components/ArticleCard';

describe('formatDate', () => {

  /**
   * 🟢 Test: Very recent article
   *
   * Expectation:
   * - If the article was just published,
   *   it should display "Just now"
   */
  test('returns Just now for very recent articles', () => {
    const now = new Date().toISOString();

    expect(formatDate(now)).toBe('Just now');
  });

  /**
   * 🟡 Test: Same-day article (hours ago)
   *
   * Expectation:
   * - Articles within the last 24 hours
   *   should display "X hours ago"
   */
  test('returns hours ago for same day articles', () => {
    const threeHoursAgo = new Date(
      Date.now() - 3 * 60 * 60 * 1000
    ).toISOString();

    expect(formatDate(threeHoursAgo)).toBe('3 hours ago');
  });

  /**
   * 🔵 Test: Multi-day article
   *
   * Expectation:
   * - Articles older than 24 hours but less than 7 days
   *   should display "X days ago"
   */
  test('returns days ago for older articles', () => {
    const twoDaysAgo = new Date(
      Date.now() - 2 * 24 * 60 * 60 * 1000
    ).toISOString();

    expect(formatDate(twoDaysAgo)).toBe('2 days ago');
  });

});