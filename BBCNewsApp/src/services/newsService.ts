import axios from 'axios';
import { NEWS_API_KEY } from '@env';
import { Domain, SortOption, Article } from '../types/news';

export const fetchArticles = async (
  domains: Domain[],
  sortBy: SortOption = 'latest',
): Promise<Article[]> => {
  try {
    const domainsString = domains.join(',');

    const apiSortBy =
      sortBy === 'latest' ? 'publishedAt' : 'popularity';

    const response = await axios.get(
      'https://newsapi.org/v2/everything',
      {
        params: {
          domains: domainsString,
          language: 'en',
          pageSize: 10,
          sortBy: apiSortBy,
          apiKey: NEWS_API_KEY,
        },
        timeout: 10000,
      }
    );

    if (!response.data || !response.data.articles) {
      throw new Error('Invalid API response structure');
    }

    // ✅ Move sorting HERE (not UI)
    const articles: Article[] = response.data.articles;

    const sortedArticles = articles.sort((a, b) => {
      if (sortBy === 'latest') {
        return (
          new Date(b.publishedAt).getTime() -
          new Date(a.publishedAt).getTime()
        );
      }
      return 0; // API already handles popularity
    });

    return sortedArticles;

  } catch (error: any) {
    console.error('fetchArticles error:', {
      message: error.message,
      response: error.response?.data,
      status: error.response?.status,
    });

    if (error.code === 'ECONNABORTED') {
      throw new Error('Request timed out. Please try again.');
    }

    if (error.response?.status === 401) {
      throw new Error('Invalid API key.');
    }

    if (error.response?.status === 429) {
      throw new Error('Too many requests. Please try later.');
    }

    if (error.response?.status >= 500) {
      throw new Error('Server error. Please try again later.');
    }

    throw new Error('Something went wrong. Please try again.');
  }
};