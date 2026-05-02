/**
 * @file Button.tsx
 *
 * Reusable button component for the app.
 *
 * Responsibilities:
 * - Handle press interactions
 * - Support loading + disabled states
 * - Apply design system styles (theme)
 * - Provide accessibility support
 *
 * Design Principles:
 * - Consistent interaction patterns
 * - Clear visual feedback (loading/disabled)
 * - Accessible by default
 */

import React from 'react';
import {
  TouchableOpacity,
  ActivityIndicator,
  StyleSheet,
  StyleProp,
  ViewStyle,
} from 'react-native';
import { AppText } from './AppText';
import { theme } from '../theme';


/**
 * 🎨 Button Variants
 */
type Variant = 'primary' | 'secondary';


/**
 * 🧾 Props
 */
interface Props {
  title: string;
  onPress: () => void;
  variant?: Variant;
  disabled?: boolean;
  loading?: boolean;
  style?: StyleProp<ViewStyle>; // ✅ improved typing
}


/**
 * 🔘 Button Component
 */
export const Button = ({
  title,
  onPress,
  variant = 'primary',
  disabled = false,
  loading = false,
  style,
}: Props) => {
  /**
   * 🧠 Derived state
   */
  const isDisabled = disabled || loading;


  /**
   * 🎨 Background logic
   */
  const backgroundColor =
    variant === 'primary'
      ? isDisabled
        ? theme.colors.disabled
        : theme.colors.primary
      : theme.colors.surface;


  /**
   * 🎨 Text color logic
   */
  const textColor =
    variant === 'primary'
      ? theme.colors.textInverse
      : theme.colors.textPrimary;


  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={isDisabled}
      activeOpacity={0.8}

      /**
       * ♿ Accessibility
       */
      accessible
      accessibilityRole="button"
      accessibilityLabel={title}
      accessibilityState={{ disabled: isDisabled }}
      accessibilityHint="Double tap to activate"

      /**
       * 🎨 Styling
       */
      style={[styles.container, { backgroundColor }, style]}
    >
      {loading ? (
        /**
         * ⏳ Loading state
         */
        <ActivityIndicator color={textColor} />
      ) : (
        /**
         * 🔤 Label
         */
        <AppText variant="label" color={textColor}>
          {title}
        </AppText>
      )}
    </TouchableOpacity>
  );
};


/**
 * 🎨 Styles
 */
const styles = StyleSheet.create({
  container: {
    height: 48,
    borderRadius: theme.radius.md,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: theme.spacing.md,
  },
});