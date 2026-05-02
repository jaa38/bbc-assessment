/**
 * @file typography.ts
 *
 * Typography design tokens for the app.
 *
 * Responsibilities:
 * - Define font sizes, weights, and spacing
 * - Provide consistent typographic scale
 * - Serve as the foundation for text styles
 *
 * Design Principles:
 * - Use semantic variants (h1, body, caption)
 * - Maintain vertical rhythm (lineHeight)
 * - Ensure readability across devices
 */


/**
 * 🧠 TextVariant
 *
 * All supported text styles in the app.
 *
 * Used across:
 * - AppText component
 * - textStyles mapping
 */
export type TextVariant =
  | 'h1'
  | 'h2'
  | 'h3'
  | 'body'
  | 'bodySmall'
  | 'meta'
  | 'caption'
  | 'label';


/**
 * ✍️ TypographyStyle
 *
 * Defines the structure of each text variant.
 *
 * Includes:
 * - fontSize → text size
 * - lineHeight → vertical rhythm
 * - fontWeight → emphasis
 * - letterSpacing → readability tuning
 */
export type TypographyStyle = {
  fontSize: number;
  lineHeight: number;
  fontWeight: '400' | '500' | '600' | '700';
  letterSpacing: number;
};


/**
 * 🧱 Typography
 *
 * Combines:
 * - global fontFamily
 * - all text variants
 */
type Typography = {
  fontFamily: string;
} & Record<TextVariant, TypographyStyle>;


/**
 * 🔤 typography
 *
 * Core typography system for the app.
 *
 * Uses "Inter" font with a structured scale.
 */
export const typography: Typography = {
  /**
   * 🌐 Global font
   *
   * Applied across all text styles
   */
  fontFamily: 'Inter',


  /**
   * 🧱 Headings
   *
   * Used for:
   * - Screen titles
   * - Section headers
   */
  h1: {
    fontSize: 26,
    lineHeight: 34,
    fontWeight: '700',
    letterSpacing: -0.3, // tighter for large text
  },

  h2: {
    fontSize: 22,
    lineHeight: 30,
    fontWeight: '600',
    letterSpacing: -0.2,
  },

  h3: {
    fontSize: 18,
    lineHeight: 26,
    fontWeight: '600',
    letterSpacing: -0.1,
  },


  /**
   * 📄 Body Text
   *
   * Used for main readable content
   */
  body: {
    fontSize: 16,
    lineHeight: 24,
    fontWeight: '400',
    letterSpacing: 0,
  },

  bodySmall: {
    fontSize: 14,
    lineHeight: 20,
    fontWeight: '400',
    letterSpacing: 0.1,
  },


  /**
   * 🧾 Supporting Text
   *
   * Used for:
   * - metadata
   * - timestamps
   * - secondary information
   */
  meta: {
    fontSize: 13,
    lineHeight: 18,
    fontWeight: '500',
    letterSpacing: 0.2,
  },

  caption: {
    fontSize: 12,
    lineHeight: 16,
    fontWeight: '400',
    letterSpacing: 0.2,
  },


  /**
   * 🔘 Labels
   *
   * Used for:
   * - buttons
   * - chips
   * - interactive UI elements
   */
  label: {
    fontSize: 14,
    lineHeight: 18,
    fontWeight: '600',
    letterSpacing: 0.4,
  },
};