/**
 * @file AppText.tsx
 *
 * Reusable text component built on top of React Native Text.
 *
 * Responsibilities:
 * - Apply design system typography (textStyles)
 * - Support variants (h1, body, caption, etc.)
 * - Enable accessibility (font scaling)
 * - Provide consistent text rendering across the app
 *
 * Design Principles:
 * - Single source of truth for text styles
 * - Accessibility-first (scaling enabled)
 * - Flexible overrides via props
 */

import React from 'react';
import {
  Text,
  TextProps,
  StyleSheet,
  StyleProp,
  TextStyle,
} from 'react-native';
import { textStyles } from '../theme/textStyles';


/**
 * 🧠 Variant
 *
 * Matches typography variants.
 * Ensures consistency with design system.
 */
type Variant =
  | 'h1'
  | 'h2'
  | 'h3'
  | 'body'
  | 'bodySmall'
  | 'meta'
  | 'caption'
  | 'label';


/**
 * 🧾 Props
 *
 * Extends native TextProps with:
 * - variant → typography style
 * - color → optional override
 * - style → additional styles
 */
interface Props extends TextProps {
  variant?: Variant;
  color?: string;
  style?: StyleProp<TextStyle>; // ✅ Correct typing
}


/**
 * ✍️ AppText
 *
 * Wrapper around React Native Text.
 *
 * Features:
 * - Applies typography system automatically
 * - Supports accessibility scaling
 * - Allows style overrides
 */
export const AppText = ({
  variant = 'body',
  color,
  style,
  children,
  ...props
}: Props) => {
  return (
    <Text
      /**
       * ♿ Accessibility
       *
       * allowFontScaling → respects user settings
       * maxFontSizeMultiplier → prevents layout break
       */
      allowFontScaling
      maxFontSizeMultiplier={1.5}

      /**
       * 🎨 Styling
       */
      style={[
        styles.base,
        textStyles[variant],
        color ? { color } : undefined,
        style,
      ]}
      {...props}
    >
      {children}
    </Text>
  );
};


/**
 * 🎨 Base Styles
 */
const styles = StyleSheet.create({
  base: {
    /**
     * Fixes Android vertical alignment issues
     */
    includeFontPadding: false,
  },
});