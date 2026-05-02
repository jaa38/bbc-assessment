/**
 * @file spacing.ts
 *
 * Spacing scale for layout and component spacing.
 *
 * Responsibilities:
 * - Provide consistent spacing across the app
 * - Replace hardcoded margin/padding values
 * - Align UI with a predictable grid system
 *
 * Design Principles:
 * - Use a base unit (4px)
 * - Scale consistently (multiples of 4)
 * - Keep naming simple (xs → xl)
 */


/**
 * 📏 spacing
 *
 * Standard spacing tokens used throughout the UI.
 *
 * Scale:
 * - xs → extra small spacing
 * - sm → small spacing
 * - md → medium (default spacing)
 * - lg → large spacing
 * - xl → extra large spacing
 *
 * All values follow a 4pt grid system:
 * 4, 8, 16, 24, 32
 */
export const spacing = {
  /**
   * Extra small spacing
   * Used for tight gaps (icons, micro spacing)
   */
  xs: 4,

  /**
   * Small spacing
   * Used for compact layouts
   */
  sm: 8,

  /**
   * Medium spacing (default)
   * Used for padding and standard gaps
   */
  md: 16,

  /**
   * Large spacing
   * Used for section separation
   */
  lg: 24,

  /**
   * Extra large spacing
   * Used for major layout spacing
   */
  xl: 32,
};