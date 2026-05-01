// src/services/newsService.ts
import axios from 'axios'
import { NEWS_API_KEY } from '@env'
import { Domain, SortOption, Article } from '../types/news'

const BASE_URL = 'https://newsapi.org/v2/everything'

// Create an axios instance — like giving SHIELD their own secure comms channel
// All requests go through this one channel
const newsApi = axios.create({
  baseURL: BASE_URL,
  timeout: 10000, // 10 seconds — if no response, give up
})

export const fetchArticles = async (
  domains: Domain[],
  sortBy: SortOption = 'latest',
): Promise<Article[]> => {

  // Join multiple domains with comma
  // apple.com + bbc.com becomes "apple.com,bbc.com"
  const domainsString = domains.join(',')

  // Map our sort option to what the API expects
  // 'latest' → 'publishedAt'
  // 'popular' → 'popularity'
  const apiSortBy = sortBy === 'latest' ? 'publishedAt' : 'popularity'

  const response = await newsApi.get('', {
    params: {
      domains: domainsString,
      language: 'en',
      pageSize: 10,
      sortBy: apiSortBy,
      apiKey: NEWS_API_KEY,
    },
  })

  return response.data.articles
}