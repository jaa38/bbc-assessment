/**
 * @file DomainChip.tsx
 *
 * Selectable chip component used for choosing news domains.
 *
 * Responsibilities:
 * - Display a selectable label (domain)
 * - Reflect selected/unselected state visually
 * - Provide press feedback (interaction state)
 * - Ensure accessibility support
 *
 * Design Principles:
 * - Stateless UI component (controlled by parent)
 * - Clear visual feedback for selection
 * - Consistent styling via theme
 */

import React from 'react';
import {
  Pressable,
  StyleSheet,
  ViewStyle,
  StyleProp,
} from 'react-native';
import { AppText } from './AppText';
import { theme } from '../theme';


/**
 * 🧾 Props
 */
interface Props {
  label: string;
  selected: boolean;
  onPress: () => void;
  style?: StyleProp<ViewStyle>;
}


/**
 * 🏷️ DomainChip Component
 */
export const DomainChip = ({
  label,
  selected,
  onPress,
  style,
}: Props) => {
  return (
    <Pressable
      onPress={onPress}

      /**
       * ♿ Accessibility
       */
      accessibilityRole="button"
      accessibilityLabel={`${label} domain`}
      accessibilityState={{ selected }}
      accessibilityHint={`Select or deselect ${label}`}

      /**
       * 🎨 Dynamic styling
       */
      style={({ pressed }) => [
        styles.container,
        selected && styles.selected,
        pressed && styles.pressed,
        style,
      ]}
    >
      <AppText
        variant="label"
        style={[
          styles.text,
          selected && styles.selectedText,
        ]}
      >
        {label}
      </AppText>
    </Pressable>
  );
};


/**
 * 🎨 Styles
 */
const styles = StyleSheet.create({
  container: {
    height: 36,
    paddingHorizontal: theme.spacing.md,
    borderRadius: theme.radius.full,

    borderWidth: 1,
    borderColor: theme.colors.border,

    justifyContent: 'center',
    alignItems: 'center',

    marginRight: theme.spacing.sm,
    marginBottom: theme.spacing.sm,

    backgroundColor: theme.colors.background,
  },

  /**
   * Selected state
   */
  selected: {
    backgroundColor: theme.colors.primary,
    borderColor: theme.colors.primary,
  },

  /**
   * Press interaction feedback
   */
  pressed: {
    opacity: 0.85,
  },

  /**
   * Default text
   */
  text: {
    color: theme.colors.textPrimary,
  },

  /**
   * Selected text
   */
  selectedText: {
    color: theme.colors.textInverse,
  },
});