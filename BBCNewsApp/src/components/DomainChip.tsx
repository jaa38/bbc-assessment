// src/components/DomainChip.tsx

import React from 'react';
import {
  Pressable,
  StyleSheet,
  ViewStyle,
  StyleProp,
} from 'react-native';
import { AppText } from './AppText';
import { theme } from '../theme';

interface Props {
  label: string;
  selected: boolean;
  onPress: () => void;
  style?: StyleProp<ViewStyle>;
}

export const DomainChip = ({
  label,
  selected,
  onPress,
  style,
}: Props) => {
  return (
    <Pressable
      onPress={onPress}
      accessibilityRole="button"
      accessibilityLabel={`${label} domain`}
      accessibilityState={{ selected }}
      accessibilityHint="Double tap to select or deselect this domain"
      style={({ pressed }) => [
        styles.container,
        selected ? styles.selected : undefined,
        pressed ? styles.pressed : undefined,
        style,
      ]}
    >
      <AppText
        variant="label"
        style={[
          styles.text,
          selected ? styles.selectedText : undefined,
        ]}
      >
        {label}
      </AppText>
    </Pressable>
  );
};

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

  selected: {
    backgroundColor: theme.colors.primary,
    borderColor: theme.colors.primary,
  },

  pressed: {
    opacity: 0.85,
  },

  text: {
    color: theme.colors.textPrimary,
  },

  selectedText: {
    color: theme.colors.textInverse,
  },
});