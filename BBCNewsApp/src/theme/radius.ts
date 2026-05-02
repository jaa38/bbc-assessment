/**
 * @file radius.ts
 *
 * Border radius scale for the design system.
 *
 * Responsibilities:
 * - Provide consistent corner rounding across components
 * - Avoid hardcoded values in UI
 * - Enable scalable design tokens
 *
 * Design Principles:
 * - Use a spacing-like scale (sm, md, lg)
 * - Keep values predictable and reusable
 * - Include "full" for pills and circular elements
 */


/**
 * 🔘 radius
 *
 * Standardised radius values used throughout the app.
 *
 * Naming:
 * - sm → small radius (subtle rounding)
 * - md → medium radius (default for cards/inputs)
 * - lg → large radius (modals, containers)
 * - full → fully rounded (chips, pills, avatars)
 */
export const radius = {
  /**
   * Small radius
   * Used for tight UI elements (e.g. inputs, small buttons)
   */
  sm: 6,

  /**
   * Medium radius (default)
   * Used for cards, buttons, containers
   */
  md: 10,

  /**
   * Large radius
   * Used for prominent surfaces or sections
   */
  lg: 16,

  /**
   * Full radius
   * Creates pill / circular shapes
   * (e.g. DomainChip, avatars)
   */
  full: 999,
};