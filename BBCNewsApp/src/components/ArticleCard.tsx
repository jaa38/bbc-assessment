/**
 * @file ArticleCard.tsx
 *
 * Displays a single news article preview.
 *
 * Responsibilities:
 * - Render article metadata (source, title, description, time)
 * - Format publication date into human-readable form
 * - Handle missing data safely (e.g. null description)
 * - Provide accessible output for screen readers
 *
 * Design Decisions:
 * - Inline styles used instead of StyleSheet for simplicity & consistency
 * - Theme system ensures consistent spacing, colors, and typography
 * - formatDate extracted as a pure function for testability
 */

import React from 'react';
import { View } from 'react-native';
import { AppText } from './AppText';
import { theme } from '../theme';
import { Article } from '../types/news';

interface Props {
  article: Article;
}

/**
 * 🧠 formatDate (EXPORTED for testing)
 *
 * Converts ISO date → human-readable relative time
 *
 * Examples:
 * - "Just now"
 * - "2 hours ago"
 * - "3 days ago"
 * - fallback → locale date
 */
export const formatDate = (dateString: string): string => {
  const now = new Date();
  const published = new Date(dateString);

  const diffMs = now.getTime() - published.getTime();
  const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
  const diffDays = Math.floor(diffHours / 24);

  if (diffHours < 1) return 'Just now';

  if (diffHours < 24) {
    return `${diffHours} hour${diffHours === 1 ? '' : 's'} ago`;
  }

  if (diffDays < 7) {
    return `${diffDays} day${diffDays === 1 ? '' : 's'} ago`;
  }

  return published.toLocaleDateString();
};

/**
 * 📰 ArticleCard Component
 */
export const ArticleCard = ({ article }: Props) => {
  return (
    <View
      style={{
        paddingHorizontal: theme.spacing.md,
        paddingTop: theme.spacing.md,
      }}
      accessible
      accessibilityRole="summary"
      accessibilityLabel={`${article.title}, from ${article.source.name}`}
    >
      {/* 🏷️ Source */}
      <AppText
        variant="meta"
        color={theme.colors.primary}
        style={{ marginBottom: theme.spacing.xs }}
      >
        {article.source.name}
      </AppText>

      {/* 📰 Title */}
      <AppText
        variant="h3"
        style={{ marginBottom: theme.spacing.sm }}
      >
        {article.title}
      </AppText>

      {/* 📄 Description (optional) */}
      {article.description ? (
        <AppText
          variant="bodySmall"
          color={theme.colors.textSecondary}
          style={{ marginBottom: theme.spacing.sm }}
          numberOfLines={3}
        >
          {article.description}
        </AppText>
      ) : null}

      {/* ⏱️ Published Time */}
      <AppText
        variant="caption"
        color={theme.colors.textSecondary}
        style={{ marginBottom: theme.spacing.md }}
      >
        {formatDate(article.publishedAt)}
      </AppText>

      {/* ➖ Divider */}
      <View
        style={{
          height: 1,
          backgroundColor: theme.colors.border,
        }}
      />
    </View>
  );
};