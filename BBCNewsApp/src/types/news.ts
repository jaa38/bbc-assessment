// src/types/news.ts

export type Domain =
  | 'apple.com'
  | 'bbc.com'
  | 'ign.com'
  | 'google.com'
  | 'youtube.com'

// Human readable labels for each domain
// Like giving each Avenger a code name
export const DOMAIN_LABELS: Record<Domain, string> = {
  'apple.com': 'Apple',
  'bbc.com': 'BBC',
  'ign.com': 'IGN',
  'google.com': 'Google',
  'youtube.com': 'YouTube',
}

// All five domains in order
export const ALL_DOMAINS: Domain[] = [
  'apple.com',
  'bbc.com',
  'ign.com',
  'google.com',
  'youtube.com',
]

// One news article
export type Article = {
  title: string
  description: string | null
  publishedAt: string
  content: string | null
  url: string
  source: {
    id: string | null
    name: string
  }
}

// What the News API sends back
export type NewsApiResponse = {
  status: string
  totalResults: number
  articles: Article[]
}

// Sort options — matches your SortToggle component
export type SortOption = 'latest' | 'popular'

// The state of fetching articles
// This is your discriminated union — like the Infinity Gauntlet states
export type FetchState =
  | { status: 'idle' }
  | { status: 'loading' }
  | { status: 'success'; articles: Article[] }
  | { status: 'error'; message: string }