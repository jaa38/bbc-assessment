/**
 * @file env.d.ts
 *
 * Type declaration file for environment variables.
 *
 * Purpose:
 * - Allows TypeScript to understand imports from '@env'
 * - Ensures type safety when accessing environment variables
 * - Prevents runtime errors due to undefined values
 *
 * Context:
 * - Used with libraries like 'react-native-dotenv'
 * - Enables importing env variables like:
 *   import { NEWS_API_KEY } from '@env'
 *
 * Why this matters:
 * - Without this file, TypeScript throws:
 *   "Cannot find module '@env'"
 * - Provides autocomplete and validation for env variables
 */

declare module '@env' {
  /**
   * 🔑 NEWS_API_KEY
   *
   * API key for NewsAPI.org
   *
   * Requirements:
   * - Must be defined in .env file
   * - Must not be committed to version control
   *
   * Example (.env):
   * NEWS_API_KEY=your_api_key_here
   */
  export const NEWS_API_KEY: string;
}