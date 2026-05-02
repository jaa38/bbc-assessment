/**
 * @file SortToggle.tsx
 *
 * Segmented control / tab switcher for sorting articles.
 *
 * Responsibilities:
 * - Allow users to switch between sort options
 * - Reflect active selection visually
 * - Provide accessible tab semantics
 *
 * Design Principles:
 * - Stateless (controlled via props)
 * - Clear visual state (active/inactive)
 * - Accessible tab pattern
 */

import React from 'react';
import {
  View,
  Pressable,
  StyleSheet,
  StyleProp,
  ViewStyle,
} from 'react-native';
import { AppText } from './AppText';
import { theme } from '../theme';


/**
 * 🧠 Sort options
 */
type SortOption = 'latest' | 'popular';


/**
 * 🧾 Props
 */
interface Props {
  value: SortOption;
  onChange: (value: SortOption) => void;
  style?: StyleProp<ViewStyle>;
}


/**
 * 📊 Available options
 */
const OPTIONS: { label: string; value: SortOption }[] = [
  { label: 'LATEST', value: 'latest' },
  { label: 'POPULAR', value: 'popular' },
];


/**
 * 🔀 SortToggle Component
 */
export const SortToggle = ({
  value,
  onChange,
  style,
}: Props) => {
  return (
    <View
      style={[styles.container, style]}

      /**
       * ♿ Accessibility: Tab pattern
       */
      accessibilityRole="tablist"
    >
      {OPTIONS.map((option) => {
        const isActive = value === option.value;

        return (
          <Pressable
            key={option.value}
            onPress={() => onChange(option.value)}

            /**
             * ♿ Accessibility
             */
            accessibilityRole="tab"
            accessibilityState={{ selected: isActive }}
            accessibilityLabel={`Sort by ${option.value}`}
            accessibilityHint={`Shows articles sorted by ${option.value}`}

            /**
             * 🎨 Dynamic styling
             */
            style={({ pressed }) => [
              styles.button,
              isActive && styles.active,
              pressed && styles.pressed,
            ]}
          >
            <AppText
              variant="label"
              style={[
                styles.text,
                isActive && styles.activeText,
              ]}
            >
              {option.label}
            </AppText>
          </Pressable>
        );
      })}
    </View>
  );
};


/**
 * 🎨 Styles
 */
const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: theme.colors.surface,
    borderRadius: theme.radius.md,
    overflow: 'hidden',

    marginHorizontal: theme.spacing.md,
    marginVertical: theme.spacing.sm,
  },

  button: {
    flex: 1,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },

  /**
   * Active tab
   */
  active: {
    backgroundColor: theme.colors.primary,
  },

  /**
   * Press feedback
   */
  pressed: {
    opacity: 0.9,
  },

  /**
   * Default text
   */
  text: {
    color: theme.colors.textPrimary,
  },

  /**
   * Active text
   */
  activeText: {
    color: theme.colors.textInverse,
  },
});