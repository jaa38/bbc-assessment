/**
 * @file newsService.ts
 *
 * Handles all API interactions related to fetching news articles.
 *
 * Responsibilities:
 * - Build API requests using selected domains and sort options
 * - Map UI-friendly values to API-compatible parameters
 * - Validate API response structure
 * - Normalize and handle errors consistently
 * - Ensure articles are returned in correct order (latest first)
 *
 * Design Decisions:
 * - Axios used for cleaner HTTP handling and error structure
 * - Sorting logic handled in service layer (not UI)
 * - Defensive checks added to prevent runtime crashes
 * - Errors normalized to avoid leaking backend details to UI
 */

import axios from 'axios';
import { NEWS_API_KEY } from '@env';
import { Domain, SortOption, Article } from '../types/news';


/**
 * 📡 fetchArticles
 *
 * Fetches articles from News API based on:
 * - selected domains
 * - sort preference
 *
 * @param domains - List of selected domains (e.g. ['bbc.com'])
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
     * 🔗 Convert domains array → comma-separated string
     * Required by News API
     *
     * Example:
     * ['bbc.com', 'apple.com'] → 'bbc.com,apple.com'
     */
    const domainsString = domains.join(',');


    /**
     * 🔀 Map UI sort option → API parameter
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
        timeout: 10000, // ⏱️ Prevent hanging requests
      }
    );


    /**
     * 🛡️ Defensive Check
     *
     * Ensures API response contains expected structure.
     * Prevents undefined crashes in UI.
     */
    if (!response.data || !response.data.articles) {
      throw new Error('Invalid API response structure');
    }


    /**
     * 📰 Extract articles
     */
    const articles: Article[] = response.data.articles;


    /**
     * 🔄 Sorting Logic (Service Layer)
     *
     * WHY:
     * - Keeps UI simple
     * - Guarantees correct ordering regardless of API inconsistencies
     *
     * NOTE:
     * - Latest → sorted manually (most recent first)
     * - Popular → API already handles sorting
     */
    const sortedArticles = articles.sort((a, b) => {
      if (sortBy === 'latest') {
        return (
          new Date(b.publishedAt).getTime() -
          new Date(a.publishedAt).getTime()
        );
      }

      return 0;
    });


    /**
     * ✅ Return sorted articles
     */
    return sortedArticles;

  } catch (error: any) {
    /**
     * 🧠 Debug Logging
     *
     * Logs detailed error info for development.
     * Not shown to users.
     */
    console.error('fetchArticles error:', {
      message: error.message,
      response: error.response?.data,
      status: error.response?.status,
    });


    /**
     * 🎯 Error Normalization
     *
     * Converts raw errors → user-friendly messages
     */

    // ⏱️ Timeout
    if (error.code === 'ECONNABORTED') {
      throw new Error('Request timed out. Please try again.');
    }

    // 🔐 Invalid API key
    if (error.response?.status === 401) {
      throw new Error('Invalid API key.');
    }

    // 🚫 Rate limit exceeded
    if (error.response?.status === 429) {
      throw new Error('Too many requests. Please try later.');
    }

    // 🧨 Server errors
    if (error.response?.status >= 500) {
      throw new Error('Server error. Please try again later.');
    }

    /**
     * ⚠️ Fallback error
     */
    throw new Error('Something went wrong. Please try again.');
  }
};