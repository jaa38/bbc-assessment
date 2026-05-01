import React from 'react'
import { View, StyleSheet } from 'react-native'
import { AppText } from './AppText'
import { theme } from '../theme'
import { Article } from '../types/news'

interface Props {
  article: Article
}

const formatDate = (dateString: string): string => {
  const now = new Date()
  const published = new Date(dateString)
  const diffMs = now.getTime() - published.getTime()
  const diffHours = Math.floor(diffMs / (1000 * 60 * 60))
  const diffDays = Math.floor(diffHours / 24)

  if (diffHours < 1) return 'Just now'
  if (diffHours < 24) return `${diffHours} hour${diffHours === 1 ? '' : 's'} ago`
  if (diffDays < 7) return `${diffDays} day${diffDays === 1 ? '' : 's'} ago`
  return published.toLocaleDateString()
}

export const ArticleCard = ({ article }: Props) => {
  return (
    <View
      style={styles.container}
      accessible
      accessibilityRole="none"
      accessibilityLabel={article.title}
    >
      <AppText
        variant="meta"
        color={theme.colors.primary}
        style={styles.source}
      >
        {article.source.name}
      </AppText>

      <AppText variant="h3" style={styles.title}>
        {article.title}
      </AppText>

      {article.description ? (
        <AppText
          variant="bodySmall"
          color={theme.colors.textSecondary}
          style={styles.description}
          numberOfLines={3}
        >
          {article.description}
        </AppText>
      ) : null}

      <AppText
        variant="caption"
        color={theme.colors.textSecondary}
        style={styles.time}
      >
        {formatDate(article.publishedAt)}
      </AppText>

      <View style={styles.divider} />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: theme.spacing.md,
    paddingTop: theme.spacing.md,
  },
  source: {
    marginBottom: theme.spacing.xs,
  },
  title: {
    marginBottom: theme.spacing.sm,
  },
  description: {
    marginBottom: theme.spacing.sm,
  },
  time: {
    marginBottom: theme.spacing.md,
  },
  divider: {
    height: 1,
    backgroundColor: theme.colors.border,
  },
})