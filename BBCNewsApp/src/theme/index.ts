/**
 * @file index.ts
 *
 * Theme aggregator for the app.
 *
 * Responsibilities:
 * - Combine all design tokens into a single export
 * - Provide a unified theme object for UI components
 *
 * Design Principles:
 * - Single source of truth for styling
 * - Easy to import and use across the app
 * - Scalable for future theming (e.g. dark mode)
 */

import { colors } from './colors';
import { spacing } from './spacing';
import { radius } from './radius';
import { textStyles } from './textStyles';


/**
 * 🎨 theme
 *
 * Centralised design system object.
 *
 * Usage:
 * import { theme } from '../theme';
 *
 * style={{
 *   padding: theme.spacing.md,
 *   backgroundColor: theme.colors.background,
 * }}
 */
export const theme = {
  colors,
  spacing,
  radius,
  textStyles,
};