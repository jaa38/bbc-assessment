/**
 * @file colors.ts
 *
 * Centralised color system for the app.
 *
 * Responsibilities:
 * - Define all UI colors in one place
 * - Ensure consistency across components
 * - Support accessibility and theming
 *
 * Design Principles:
 * - Semantic naming (not raw color names)
 * - Scalable for dark mode
 * - Readable and maintainable
 */


/**
 * 🎨 colors
 *
 * Semantic color tokens used across the app.
 *
 * Naming Strategy:
 * - Use "what it means" instead of "what it looks like"
 *   (e.g. primary, textSecondary, error)
 *
 * Benefits:
 * - Easier to refactor
 * - Supports theming (light/dark)
 * - Improves collaboration with designers
 */
export const colors = {
  /**
   * 🔴 Primary Brand Color
   *
   * Used for:
   * - Buttons
   * - Active states
   * - Highlights
   */
  primary: '#B80000',


  /**
   * ⚪ Background Layers
   *
   * background → main screen background
   * surface → cards, chips, containers
   */
  background: '#FFFFFF',
  surface: '#F5F5F5',


  /**
   * 🧱 Borders & Dividers
   */
  border: '#E0E0E0',


  /**
   * ✍️ Text Colors
   *
   * textPrimary → main readable text
   * textSecondary → metadata, subtitles
   * textInverse → text on dark backgrounds
   */
  textPrimary: '#0A0A0A',
  textSecondary: '#6B6B6B',
  textInverse: '#FFFFFF',


  /**
   * ✅ Status Colors
   */
  success: '#2E7D32',
  error: '#D32F2F',


  /**
   * 🚫 Disabled State
   *
   * Used for:
   * - Disabled buttons
   * - Inactive UI elements
   */
  disabled: '#C7C7C7',
};