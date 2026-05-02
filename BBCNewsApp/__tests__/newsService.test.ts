import axios from 'axios'
import { fetchArticles } from '../src/services/newsService'

jest.mock('axios')
const mockedAxios = axios as jest.Mocked<typeof axios>

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

beforeEach(() => {
  jest.clearAllMocks()
  mockedAxios.get.mockResolvedValue({
    data: { articles: mockArticles },
  })
})

describe('fetchArticles', () => {

  test('returns articles from the API', async () => {
    const articles = await fetchArticles(['bbc.com'], 'latest')
    expect(Array.isArray(articles)).toBe(true)
    expect(articles.length).toBeGreaterThan(0)
  })

  test('handles multiple domains without crashing', async () => {
    const articles = await fetchArticles(['bbc.com', 'apple.com'], 'latest')
    expect(Array.isArray(articles)).toBe(true)
  })

  test('calls the API with correct domains string', async () => {
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

  test('uses publishedAt when sortBy is latest', async () => {
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

  test('uses popularity when sortBy is popular', async () => {
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

})