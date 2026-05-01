// src/services/newsService.ts
import {NewsApiResponse, Domain} from '../types/news';
import {NEWS_API_KEY} from '@env';

const BASE_URL = 'https://newsapi.org/v2/everything';

export const fetchArticles = async (
  domains: Domain[],
  sortBy: 'publishedAt' | 'popularity' = 'publishedAt',
): Promise<NewsApiResponse> => {

  // Join multiple domains with a comma
  // Like assembling a team — Thor AND Iron Man AND Captain America
  const domainsString = domains.join(',');

  const url =
    `${BASE_URL}` +
    `?domains=${domainsString}` +
    `&language=en` +
    `&pageSize=10` +
    `&sortBy=${sortBy}` +
    `&apiKey=${NEWS_API_KEY}`;

  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(`API error: ${response.status}`);
  }

  const data: NewsApiResponse = await response.json();
  return data;
};