// src/types/news.ts

// One news article from the API
export type Article = {
  title: string
  description: string | null
  publishedAt: string
  content: string | null
  url: string
  source: {
    name: string
  }
}

// What the News API sends back
export type NewsApiResponse = {
  status: string
  totalResults: number
  articles: Article[]
}

// The five domains the BBC want
export type Domain =
  | 'apple.com'
  | 'bbc.com'
  | 'ign.com'
  | 'google.com'
  | 'youtube.com'

// State of the articles fetch
export type FetchState =
  | {status: 'idle'}
  | {status: 'loading'}
  | {status: 'success'; articles: Article[]}
  | {status: 'error'; message: string}