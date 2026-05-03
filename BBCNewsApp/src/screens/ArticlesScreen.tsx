/**
 * @file ArticlesScreen.tsx
 *
 * Displays a list of articles based on selected domains.
 *
 * Responsibilities:
 * - Fetch articles from API
 * - Handle loading, error, empty, and success states
 * - Allow sorting (latest / popular)
 * - Navigate to article detail screen
 *
 * Design Principles:
 * - Separation of concerns (API in service layer)
 * - Explicit UI states via FetchState
 * - Performance optimisation using useCallback
 */

import React, { useState, useEffect, useCallback } from 'react'
import {
  View,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
  Pressable,
} from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

import { useNavigation, useRoute } from '@react-navigation/native'
import { RouteProp } from '@react-navigation/native'

import { AppText } from '../components/AppText'
import { SortToggle } from '../components/SortToggle'
import { ArticleCard } from '../components/ArticleCard'

import { theme } from '../theme'
import { spacing } from '../theme/spacing'

import {
  Article,
  FetchState,
  DOMAIN_LABELS,
  SortOption,
} from '../types/news'

import { fetchArticles } from '../services/newsService'
import { RootStackParamList } from '../navigation/AppNavigator'
import { AppNavigationProp } from '../navigation/types'

import Ionicons from 'react-native-vector-icons/Ionicons'


/**
 * 🧠 Navigation typing
 */
type NavigationProp = AppNavigationProp<'Articles'>
type RouteProps = RouteProp<RootStackParamList, 'Articles'>


export const ArticlesScreen = () => {
  /**
   * 🧭 Navigation + route
   */
  const navigation = useNavigation<NavigationProp>()
  const route = useRoute<RouteProps>()

  /**
   * 📥 Params
   */
  const { domains, sortBy: initialSort } = route.params

  /**
   * 🔄 State
   */
  const [sortBy, setSortBy] = useState<SortOption>(initialSort)

  const [fetchState, setFetchState] = useState<FetchState>({
    status: 'loading',
  })

  /**
   * 🚀 Fetch articles
   */
  const loadArticles = useCallback(async () => {
    setFetchState({ status: 'loading' })

    try {
      const articles = await fetchArticles(domains, sortBy)

      setFetchState({
        status: 'success',
        articles,
      })
    } catch (error) {
      console.error('Failed to fetch articles:', error)

      setFetchState({
        status: 'error',
        message: 'Could not load articles. Please try again.',
      })
    }
  }, [domains, sortBy])

  /**
   * 🔄 Fetch on mount / dependency change
   */
  useEffect(() => {
    loadArticles()
  }, [loadArticles])

  /**
   * 🧠 Derived values
   */
  const domainLabels = domains
    .map((d) => DOMAIN_LABELS[d])
    .join(', ')

  /**
   * ⚡ Optimised renderItem
   */
  const renderItem = useCallback(
    ({ item }: { item: Article }) => (
      <Pressable
        onPress={() =>
          navigation.navigate('ArticleDetail', { article: item })
        }
      >
        <ArticleCard article={item} />
      </Pressable>
    ),
    [navigation]
  )

  return (
    <SafeAreaView style={{ flex: 1 }}>
      {/* HEADER */}
      <View
        style={{
          padding: theme.spacing.md,
          borderBottomWidth: 1,
          borderColor: theme.colors.border,
        }}
      >
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          {/* LEFT */}
          <View style={{ flexDirection: 'row', gap: spacing.md }}>
            <Pressable onPress={() => navigation.goBack()}>
              <Ionicons name="arrow-back" size={24} />
            </Pressable>

            <View>
              <AppText variant="h2">Top Stories</AppText>
              <AppText variant="caption">{domainLabels}</AppText>
            </View>
          </View>

          {/* REFRESH */}
          <Pressable onPress={loadArticles}>
            <Ionicons name="refresh-outline" size={24} />
          </Pressable>
        </View>

        <SortToggle value={sortBy} onChange={setSortBy} />
      </View>

      {/* STATES */}
      {fetchState.status === 'loading' && (
        <ActivityIndicator style={{ flex: 1 }} />
      )}

      {fetchState.status === 'error' && (
        <View style={{ flex: 1, justifyContent: 'center' }}>
          <AppText>{fetchState.message}</AppText>
          <TouchableOpacity onPress={loadArticles}>
            <AppText>Retry</AppText>
          </TouchableOpacity>
        </View>
      )}

      {fetchState.status === 'success' && (
        <FlatList
          data={fetchState.articles}
          keyExtractor={(item) => item.url}
          renderItem={renderItem}
        />
      )}
    </SafeAreaView>
  )
}