/**
 * @file ArticleCard.test.tsx
 *
 * Test suite for ArticleCard component.
 *
 * Purpose:
 * - Validate rendering of article content
 * - Ensure correct display of metadata (title, source, description)
 * - Verify time formatting logic
 * - Confirm resilience to missing data
 *
 * Strategy:
 * - Use mock article data to simulate real API responses
 * - Assert visible UI output (black-box testing)
 * - Cover both standard and edge cases
 */

import React from 'react';
import { render, screen } from '@testing-library/react-native';
import { ArticleCard } from '../src/components/ArticleCard';
import { Article } from '../src/types/news';

/**
 * 🧱 Mock Article Data
 *
 * Represents a realistic article object returned from API.
 * Includes all required fields for rendering.
 */
const mockArticle: Article = {
  title: 'Healthcare Innovation Improves Patient Outcome',
  description: 'A new breakthrough in healthcare technology.',
  publishedAt: new Date().toISOString(), // ensures "Just now"
  content: 'Full article content here.',
  url: 'https://bbc.com/article/1',
  source: {
    id: 'bbc-news',
    name: 'BBC News',
  },
};

/**
 * 📦 Test Suite: ArticleCard
 */
describe('ArticleCard', () => {

  /**
   * 📰 Test: Title rendering
   *
   * Validates:
   * - Article title is displayed correctly
   */
  test('shows the article title', () => {
    render(<ArticleCard article={mockArticle} />);

    expect(
      screen.getByText('Healthcare Innovation Improves Patient Outcome'),
    ).toBeTruthy();
  });

  /**
   * 🏷️ Test: Source rendering
   *
   * Validates:
   * - Source name (publisher) is visible
   */
  test('shows the source name', () => {
    render(<ArticleCard article={mockArticle} />);

    expect(screen.getByText('BBC News')).toBeTruthy();
  });

  /**
   * 📝 Test: Description rendering
   *
   * Validates:
   * - Article description is displayed when available
   */
  test('shows the description', () => {
    render(<ArticleCard article={mockArticle} />);

    expect(
      screen.getByText('A new breakthrough in healthcare technology.'),
    ).toBeTruthy();
  });

  /**
   * ⏱️ Test: Time formatting
   *
   * Validates:
   * - Recent articles display "Just now"
   * - Confirms relative time logic works correctly
   */
  test('shows Just now for a very recent article', () => {
    render(<ArticleCard article={mockArticle} />);

    expect(screen.getByText('Just now')).toBeTruthy();
  });

  /**
   * ⚠️ Test: Null description handling (edge case)
   *
   * Validates:
   * - Component does not crash when description is missing
   * - UI still renders essential content (e.g. title)
   *
   * Why:
   * - API responses may contain null/optional fields
   */
  test('does not crash when description is null', () => {
    const articleNoDesc: Article = {
      ...mockArticle,
      description: null,
    };

    render(<ArticleCard article={articleNoDesc} />);

    expect(
      screen.getByText('Healthcare Innovation Improves Patient Outcome'),
    ).toBeTruthy();
  });

});