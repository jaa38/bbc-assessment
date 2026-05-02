import React from 'react';
import { render, screen } from '@testing-library/react-native';
import { ArticleCard } from '../src/components/ArticleCard';
import { Article } from '../src/types/news';

const mockArticle: Article = {
  title: 'Healthcare Innovation Improves Patient Outcome',
  description: 'A new breakthrough in healthcare technology.',
  publishedAt: new Date().toISOString(),
  content: 'Full article content here.',
  url: 'https://bbc.com/article/1',
  source: {
    id: 'bbc-news',
    name: 'BBC News',
  },
};

describe('ArticleCard', () => {
  test('shows the article title', () => {
    render(<ArticleCard article={mockArticle} />);
    expect(
      screen.getByText('Healthcare Innovation Improves Patient Outcome'),
    ).toBeTruthy();
  });

  test('shows the source name', () => {
    render(<ArticleCard article={mockArticle} />);
    expect(screen.getByText('BBC News')).toBeTruthy();
  });

  test('shows the description', () => {
    render(<ArticleCard article={mockArticle} />);
    expect(
      screen.getByText('A new breakthrough in healthcare technology.'),
    ).toBeTruthy();
  });

  test('shows Just now for a very recent article', () => {
    render(<ArticleCard article={mockArticle} />);
    expect(screen.getByText('Just now')).toBeTruthy();
  });

  test('does not crash when description is null', () => {
    const articleNoDesc: Article = { ...mockArticle, description: null };
    render(<ArticleCard article={articleNoDesc} />);
    expect(
      screen.getByText('Healthcare Innovation Improves Patient Outcome'),
    ).toBeTruthy();
  });
});
