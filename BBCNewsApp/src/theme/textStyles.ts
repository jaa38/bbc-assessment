/**
 * @file textStyles.ts
 *
 * Maps typography tokens to React Native TextStyle objects.
 *
 * Responsibilities:
 * - Combine fontFamily with typography variants
 * - Provide ready-to-use styles for components (e.g. AppText)
 * - Ensure consistency across all text rendering
 *
 * Design Principles:
 * - Keep typography tokens (sizes, weights) separate
 * - Apply fontFamily at this layer
 * - Strong typing for safety and scalability
 */

import { TextStyle } from 'react-native';
import { typography, TextVariant } from './typography';


/**
 * 🧠 TextStyles Type
 *
 * Ensures every TextVariant has a corresponding style.
 *
 * Benefit:
 * - Compile-time safety
 * - No missing styles for variants
 */
type TextStyles = Record<TextVariant, TextStyle>;


/**
 * ✍️ textStyles
 *
 * Final text styles used by components (e.g. AppText).
 *
 * Each variant:
 * - Applies global fontFamily
 * - Spreads typography tokens (fontSize, lineHeight, etc.)
 *
 * This keeps:
 * - Design tokens clean
 * - Usage layer consistent
 */
export const textStyles: TextStyles = {
  /**
   * 🧱 Headings
   */
  h1: {
    fontFamily: typography.fontFamily,
    ...typography.h1,
  },

  h2: {
    fontFamily: typography.fontFamily,
    ...typography.h2,
  },

  h3: {
    fontFamily: typography.fontFamily,
    ...typography.h3,
  },


  /**
   * 📄 Body Text
   */
  body: {
    fontFamily: typography.fontFamily,
    ...typography.body,
  },

  bodySmall: {
    fontFamily: typography.fontFamily,
    ...typography.bodySmall,
  },


  /**
   * 🧾 Supporting Text
   */
  meta: {
    fontFamily: typography.fontFamily,
    ...typography.meta,
  },

  caption: {
    fontFamily: typography.fontFamily,
    ...typography.caption,
  },


  /**
   * 🔘 Labels
   *
   * Used for:
   * - Buttons
   * - Chips
   * - Interactive elements
   */
  label: {
    fontFamily: typography.fontFamily,
    ...typography.label,
  },
};