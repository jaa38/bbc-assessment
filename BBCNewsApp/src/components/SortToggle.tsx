// src/components/SortToggle.tsx

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

type SortOption = 'latest' | 'popular';

interface Props {
  value: SortOption;
  onChange: (value: SortOption) => void;
  style?: StyleProp<ViewStyle>;
}

const OPTIONS: { label: string; value: SortOption }[] = [
  { label: 'LATEST', value: 'latest' },
  { label: 'POPULAR', value: 'popular' },
];

export const SortToggle = ({
  value,
  onChange,
  style,
}: Props) => {
  return (
    <View
      style={[styles.container, style]}
      accessibilityRole="tablist"
    >
      {OPTIONS.map((option) => {
        const isActive = value === option.value;

        return (
          <Pressable
            key={option.value}
            onPress={() => onChange(option.value)}
            accessibilityRole="tab"
            accessibilityState={{ selected: isActive }}
            accessibilityLabel={`Sort by ${option.value}`}
            accessibilityHint={`Shows articles sorted by ${option.value}`}
            style={({ pressed }) => [
              styles.button,
              isActive ? styles.active : undefined,
              pressed ? styles.pressed : undefined,
            ]}
          >
            <AppText
              variant="label"
              style={[
                styles.text,
                isActive ? styles.activeText : undefined,
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

  active: {
    backgroundColor: theme.colors.primary,
  },

  pressed: {
    opacity: 0.9,
  },

  text: {
    color: theme.colors.textPrimary,
  },

  activeText: {
    color: theme.colors.textInverse,
  },
});