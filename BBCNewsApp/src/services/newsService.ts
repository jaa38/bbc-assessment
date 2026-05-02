import axios from 'axios'
import { NEWS_API_KEY } from '@env'
import { Domain, SortOption, Article } from '../types/news'

export const fetchArticles = async (
  domains: Domain[],
  sortBy: SortOption = 'latest',
): Promise<Article[]> => {
  const domainsString = domains.join(',')
  const apiSortBy = sortBy === 'latest' ? 'publishedAt' : 'popularity'

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

  return response.data.articles
}