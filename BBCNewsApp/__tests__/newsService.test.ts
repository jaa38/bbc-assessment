/**
 * @file newsService.test.ts
 *
 * Test suite for fetchArticles service.
 *
 * Purpose:
 * - Validate API request construction
 * - Ensure correct handling of sorting logic
 * - Verify support for multiple domains
 * - Confirm robust error handling
 *
 * Strategy:
 * - Mock axios to isolate service logic
 * - Avoid real network calls
 * - Ensure deterministic, fast tests
 */

import axios from 'axios'
import { fetchArticles } from '../src/services/newsService'

// 🔌 Mock axios globally
jest.mock('axios')

// 👇 Strong typing for mocked axios
const mockedAxios = axios as jest.Mocked<typeof axios>

/**
 * 🧱 Mock API response data
 *
 * Represents a minimal valid Article object.
 * Used across all success test cases.
 */
const mockArticles = [
  {
    title: 'Test Article',
    description: 'Test description',
    publishedAt: '2024-01-01T00:00:00Z',
    content: 'Test content',
    url: 'https://bbc.com/test',
    source: { id: 'bbc-news', name: 'BBC News' },
  },
]

/**
 * 🔄 Reset mocks before each test
 *
 * Ensures:
 * - No cross-test pollution
 * - Clean state for every test case
 */
beforeEach(() => {
  jest.clearAllMocks()
})

/**
 * 📦 Test Suite: fetchArticles
 */
describe('fetchArticles', () => {

  /**
   * ✅ Test: Successful API response
   *
   * Validates:
   * - Function returns an array
   * - Articles are properly returned from API
   */
  test('returns articles from the API', async () => {
    mockedAxios.get.mockResolvedValue({
      data: { articles: mockArticles },
    })

    const articles = await fetchArticles(['bbc.com'], 'latest')

    expect(Array.isArray(articles)).toBe(true)
    expect(articles.length).toBeGreaterThan(0)
  })

  /**
   * 🌐 Test: Multiple domains support
   *
   * Validates:
   * - Function accepts multiple domains
   * - No runtime errors when joining domains
   */
  test('handles multiple domains without crashing', async () => {
    mockedAxios.get.mockResolvedValue({
      data: { articles: mockArticles },
    })

    const articles = await fetchArticles(['bbc.com', 'apple.com'], 'latest')

    expect(Array.isArray(articles)).toBe(true)
  })

  /**
   * 🔗 Test: API parameter formatting
   *
   * Validates:
   * - Domains are joined into comma-separated string
   * - Matches News API contract:
   *   domains=bbc.com,apple.com
   */
  test('calls the API with correct domains string', async () => {
    mockedAxios.get.mockResolvedValue({
      data: { articles: mockArticles },
    })

    await fetchArticles(['bbc.com', 'apple.com'], 'latest')

    expect(mockedAxios.get).toHaveBeenCalledWith(
      'https://newsapi.org/v2/everything',
      expect.objectContaining({
        params: expect.objectContaining({
          domains: 'bbc.com,apple.com',
        }),
      })
    )
  })

  /**
   * ⏱️ Test: Latest sorting mapping
   *
   * Validates:
   * - UI sort option "latest" maps to API param "publishedAt"
   */
  test('uses publishedAt when sortBy is latest', async () => {
    mockedAxios.get.mockResolvedValue({
      data: { articles: mockArticles },
    })

    await fetchArticles(['bbc.com'], 'latest')

    expect(mockedAxios.get).toHaveBeenCalledWith(
      expect.any(String),
      expect.objectContaining({
        params: expect.objectContaining({
          sortBy: 'publishedAt',
        }),
      })
    )
  })

  /**
   * 🔥 Test: Popular sorting mapping
   *
   * Validates:
   * - UI sort option "popular" maps to API param "popularity"
   */
  test('uses popularity when sortBy is popular', async () => {
    mockedAxios.get.mockResolvedValue({
      data: { articles: mockArticles },
    })

    await fetchArticles(['bbc.com'], 'popular')

    expect(mockedAxios.get).toHaveBeenCalledWith(
      expect.any(String),
      expect.objectContaining({
        params: expect.objectContaining({
          sortBy: 'popularity',
        }),
      })
    )
  })

  /**
   * ❗ Test: Error handling (critical scenario)
   *
   * Simulates:
   * - Network failure / API rejection
   *
   * Validates:
   * - Service does NOT expose raw error (e.g. "Network error")
   * - Instead returns normalized, user-friendly error message
   *
   * Why:
   * - Improves UX consistency
   * - Prevents leaking backend/internal errors
   */
  test('throws normalized error when API fails', async () => {
    mockedAxios.get.mockRejectedValue(new Error('Network error'))

    await expect(
      fetchArticles(['bbc.com'], 'latest')
    ).rejects.toThrow('Something went wrong. Please try again.')
  })

})