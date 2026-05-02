/**
 * @file news.ts
 *
 * Central type definitions for the News App.
 *
 * Responsibilities:
 * - Define domain sources
 * - Define article data structure
 * - Define API response shape
 * - Define UI state (FetchState)
 * - Provide consistent labels and domain lists
 *
 * Design Principles:
 * - Strong typing for reliability
 * - Centralised constants for consistency
 * - Clear mapping between UI and API data
 */


/**
 * 🌐 Domain
 *
 * Represents allowed news sources.
 * Restricts input to only supported domains.
 *
 * Benefit:
 * - Prevents invalid API calls
 * - Improves autocomplete and developer experience
 */
export type Domain =
  | 'apple.com'
  | 'bbc.com'
  | 'ign.com'
  | 'google.com'
  | 'youtube.com';


/**
 * 🏷️ DOMAIN_LABELS
 *
 * Maps domain → human-readable label for UI.
 *
 * Example:
 * 'bbc.com' → 'BBC'
 *
 * Benefit:
 * - Keeps UI clean and readable
 * - Avoids hardcoding labels in components
 */
export const DOMAIN_LABELS: Record<Domain, string> = {
  'apple.com': 'Apple',
  'bbc.com': 'BBC',
  'ign.com': 'IGN',
  'google.com': 'Google',
  'youtube.com': 'YouTube',
};


/**
 * 📚 ALL_DOMAINS
 *
 * Ordered list of all available domains.
 *
 * Used for:
 * - Rendering domain chips
 * - Ensuring consistent order in UI
 */
export const ALL_DOMAINS: Domain[] = [
  'apple.com',
  'bbc.com',
  'ign.com',
  'google.com',
  'youtube.com',
];


/**
 * 📰 Article
 *
 * Represents a single news article.
 *
 * Matches structure returned by News API.
 *
 * Notes:
 * - description/content can be null (API inconsistency)
 * - publishedAt is ISO string (needs parsing for sorting)
 */
export type Article = {
  title: string;
  description: string | null;
  publishedAt: string;
  content: string | null;
  url: string;
  source: {
    id: string | null;
    name: string;
  };
};


/**
 * 🌍 NewsApiResponse
 *
 * Full response shape from News API.
 *
 * Not always used directly in UI,
 * but useful for validation and debugging.
 */
export type NewsApiResponse = {
  status: string;
  totalResults: number;
  articles: Article[];
};


/**
 * 🔀 SortOption
 *
 * Controls how articles are sorted in UI.
 *
 * 'latest' → most recent articles
 * 'popular' → most popular articles
 *
 * Mapped in service layer to:
 * - publishedAt
 * - popularity
 */
export type SortOption = 'latest' | 'popular';


/**
 * ⚙️ FetchState (Discriminated Union)
 *
 * Represents all possible states of data fetching.
 *
 * This pattern ensures:
 * - Type-safe UI rendering
 * - No undefined states
 * - Clear state transitions
 *
 * States:
 * - idle → initial state (not used yet but scalable)
 * - loading → API request in progress
 * - success → data loaded successfully
 * - error → API failed
 */
export type FetchState =
  | { status: 'idle' }
  | { status: 'loading' }
  | { status: 'success'; articles: Article[] }
  | { status: 'error'; message: string };