import axios from 'axios'
import { NEWS_API_KEY } from '@env'
import { Domain, SortOption, Article } from '../types/news'

/**
 * 📰 fetchArticles
 *
 * Fetches news articles from News API based on:
 * - Selected domains
 * - Sort option (latest or popular)
 *
 * Responsibilities:
 * - Build correct API request
 * - Handle errors gracefully
 * - Return clean, predictable data
 */
export const fetchArticles = async (
  domains: Domain[],
  sortBy: SortOption = 'latest',
): Promise<Article[]> => {
  try {
    const domainsString = domains.join(',')

    const apiSortBy =
      sortBy === 'latest' ? 'publishedAt' : 'popularity'

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
    )

    // 🛡️ Defensive check
    if (!response.data || !response.data.articles) {
      throw new Error('Invalid API response structure')
    }

    return response.data.articles

  } catch (error: any) {
    // 🧠 Debug logging (useful for dev, ignored in UI)
    console.error('fetchArticles error:', {
      message: error.message,
      status: error.response?.status,
    })

    // 🎯 Normalize errors (important for UX + testing)

    if (error.code === 'ECONNABORTED') {
      throw new Error('Request timed out. Please try again.')
    }

    if (error.response?.status === 401) {
      throw new Error('Invalid API key.')
    }

    if (error.response?.status === 429) {
      throw new Error('Too many requests. Please try later.')
    }

    if (error.response?.status >= 500) {
      throw new Error('Server error. Please try again later.')
    }

    // ✅ fallback (THIS is what your test expects)
    throw new Error('Something went wrong. Please try again.')
  }
}