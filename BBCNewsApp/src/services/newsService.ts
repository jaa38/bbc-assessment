/**
 * @file newsService.ts
 *
 * Service responsible for:
 * - Fetching news articles from the News API
 * - Mapping UI sorting options to API parameters
 * - Handling API errors and normalizing them for UI consumption
 *
 * Key Responsibilities:
 * - Construct API request with correct parameters
 * - Ensure response structure is valid
 * - Handle network and API errors gracefully
 *
 * Design Decisions:
 * - Use axios for HTTP requests
 * - Normalize errors to avoid leaking backend details
 * - Add defensive checks for API response structure
 * - Apply timeout to prevent hanging requests
 */

import axios from 'axios';
import { NEWS_API_KEY } from '@env';
import { Domain, SortOption, Article } from '../types/news';

/**
 * 📡 fetchArticles
 *
 * Fetches articles from the News API based on:
 * - selected domains
 * - sorting preference
 *
 * @param domains - Array of selected domain strings (e.g. ['bbc.com'])
 * @param sortBy - Sorting option ('latest' | 'popular')
 *
 * @returns Promise<Article[]>
 */
export const fetchArticles = async (
  domains: Domain[],
  sortBy: SortOption = 'latest',
): Promise<Article[]> => {
  try {
    /**
     * 🔗 Convert domains array into API-compatible string
     * Example: ['bbc.com', 'apple.com'] → 'bbc.com,apple.com'
     */
    const domainsString = domains.join(',');

    /**
     * 🔀 Map UI sort option to API parameter
     */
    const apiSortBy =
      sortBy === 'latest' ? 'publishedAt' : 'popularity';

    /**
     * 🌐 API Request
     */
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
        timeout: 10000, // ⏱️ Prevent long-hanging requests
      }
    );

    /**
     * 🛡️ Defensive Check
     *
     * Ensures API response structure is valid before using it.
     * Prevents runtime crashes if API changes or fails silently.
     */
    if (!response.data || !response.data.articles) {
      throw new Error('Invalid API response structure');
    }

    /**
     * ✅ Return articles array
     */
    return response.data.articles;

  } catch (error: any) {
    /**
     * 🧠 Debug Logging
     *
     * Logs detailed error info for development/debugging.
     * Not exposed to UI.
     */
    console.error('fetchArticles error:', {
      message: error.message,
      response: error.response?.data,
      status: error.response?.status,
    });

    /**
     * 🎯 Error Normalization
     *
     * Converts raw API/network errors into user-friendly messages.
     */

    // ⏱️ Timeout error
    if (error.code === 'ECONNABORTED') {
      throw new Error('Request timed out. Please try again.');
    }

    // 🔐 Invalid API key
    if (error.response?.status === 401) {
      throw new Error('Invalid API key.');
    }

    // 🚫 Rate limiting
    if (error.response?.status === 429) {
      throw new Error('Too many requests. Please try later.');
    }

    // 🧨 Server errors
    if (error.response?.status >= 500) {
      throw new Error('Server error. Please try again later.');
    }

    /**
     * ⚠️ Fallback error
     *
     * Used when no specific condition matches.
     */
    throw new Error('Something went wrong. Please try again.');
  }
};