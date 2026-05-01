// src/components/ArticleCard.tsx

import React from 'react';
import {
  Pressable,
  StyleSheet,
  StyleProp,
  ViewStyle,
} from 'react-native';
import { AppText } from './AppText';
import { theme } from '../theme';

interface Article {
  title: string;
  description?: string;
  publishedAt: string;
  source: string;
}

interface Props {
  article: Article;
  onPress?: () => void;
  style?: StyleProp<ViewStyle>;
}

export const ArticleCard = ({ article, onPress, style }: Props) => {
  return (
    <Pressable
      onPress={onPress}
      accessibilityRole="button"
      accessibilityLabel={`${article.title}. ${
        article.description ?? ''
      }. Published ${formatDate(article.publishedAt)} from ${article.source}`}
      accessibilityHint="Double tap to open article"
      style={({ pressed }) => [
        styles.container,
        pressed ? styles.pressed : undefined,
        style,
      ]}
    >
      {/* Source */}
      <AppText variant="caption" style={styles.source}>
        [{article.source}]
      </AppText>

      {/* Title */}
      <AppText variant="h2" numberOfLines={2} style={styles.title}>
        {article.title}
      </AppText>

      {/* Description */}
      {article.description ? (
        <AppText variant="body" numberOfLines={3} style={styles.description}>
          {article.description}
        </AppText>
      ) : null}

      {/* Date */}
      <AppText variant="meta" style={styles.meta}>
        {formatDate(article.publishedAt)}
      </AppText>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: theme.spacing.md,
    borderBottomWidth: 1,
    borderColor: theme.colors.border,
    backgroundColor: theme.colors.background,
  },

  pressed: {
    opacity: 0.9,
  },

  source: {
    color: theme.colors.primary,
    marginBottom: theme.spacing.xs,
  },

  title: {
    color: theme.colors.textPrimary,
    marginBottom: theme.spacing.sm,
  },

  description: {
    color: theme.colors.textSecondary,
    marginBottom: theme.spacing.sm,
  },

  meta: {
    color: theme.colors.textSecondary,
  },
});

// 🧠 Helper function
const formatDate = (dateString: string) => {
  const date = new Date(dateString);

  return date.toLocaleDateString(undefined, {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });
};
