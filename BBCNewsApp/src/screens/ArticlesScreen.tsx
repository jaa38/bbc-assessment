/* eslint-disable react-native/no-inline-styles */

/**
 * 📄 ArticlesScreen
 *
 * Displays a list of news articles based on selected domains.
 *
 * Responsibilities:
 * - Fetch articles from API
 * - Handle loading, success, and error states
 * - Allow sorting (latest vs popular)
 * - Ensure articles are displayed in most recent order
 * - Provide accessible UI for all users
 */

import React, { useState, useEffect, useCallback } from 'react';
import {
  View,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';

import { AppText } from '../components/AppText';
import { SortToggle } from '../components/SortToggle';
import { ArticleCard } from '../components/ArticleCard';

import { theme } from '../theme';

import {
  Article,
  FetchState,
  DOMAIN_LABELS,
  SortOption,
} from '../types/news';

import { fetchArticles } from '../services/newsService';
import { RootStackParamList } from '../navigation/AppNavigator';

/**
 * 🔗 Navigation typing
 *
 * Ensures type safety when navigating between screens.
 */
type NavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'Articles'
>;

type RouteProps = RouteProp<
  RootStackParamList,
  'Articles'
>;

/**
 * 🚀 ArticlesScreen Component
 */
export const ArticlesScreen = () => {
  const navigation = useNavigation<NavigationProp>();
  const route = useRoute<RouteProps>();

  /**
   * 📥 Params passed from DomainSelectorScreen
   */
  const { domains, sortBy: initialSort } = route.params;

  /**
   * 🔄 State: current sort option
   */
  const [sortBy, setSortBy] = useState<SortOption>(initialSort);

  /**
   * 📊 State: fetch lifecycle
   *
   * Uses discriminated union:
   * - loading
   * - success
   * - error
   */
  const [fetchState, setFetchState] = useState<FetchState>({
    status: 'loading',
  });

  /**
   * 📡 loadArticles
   *
   * Fetches articles from API and updates UI state.
   *
   * - Shows loading spinner
   * - Handles success response
   * - Gracefully handles errors
   */
  const loadArticles = useCallback(async () => {
    setFetchState({ status: 'loading' });

    try {
      const articles = await fetchArticles(domains, sortBy);

      setFetchState({
        status: 'success',
        articles,
      });
    } catch (error) {
      console.error('Failed to fetch articles:', error);

      setFetchState({
        status: 'error',
        message: 'Could not load articles. Please try again.',
      });
    }
  }, [domains, sortBy]);

  /**
   * 🔄 Trigger fetch on mount and when dependencies change
   */
  useEffect(() => {
    loadArticles();
  }, [loadArticles]);

  /**
   * 🧠 Derived UI data
   */

  // Human-readable domain names (e.g. "BBC, Apple")
  const domainLabels = domains
    .map((d) => DOMAIN_LABELS[d])
    .join(', ');

  // Subtitle showing number of selected sources
  const headerSubtitle = `${domains.length} ${
    domains.length === 1 ? 'source' : 'sources'
  } selected`;

  /**
   * 🕒 Sort Articles (Most Recent First)
   *
   * Even though API supports sorting,
   * we enforce correct order on client side
   * for consistency and reliability.
   */
  const sortedArticles =
    fetchState.status === 'success'
      ? [...fetchState.articles].sort((a, b) => {
          return (
            new Date(b.publishedAt).getTime() -
            new Date(a.publishedAt).getTime()
          );
        })
      : [];

  /**
   * 🎨 UI Rendering
   */
  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: theme.colors.background,
      }}
    >
      {/* ================= HEADER ================= */}
      <View
        style={{
          paddingHorizontal: theme.spacing.md,
          paddingVertical: theme.spacing.md,
          borderBottomWidth: 1,
          borderBottomColor: theme.colors.border,
        }}
      >
        {/* Back button */}
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          accessibilityRole="button"
          accessibilityLabel="Go back"
          style={{ marginBottom: theme.spacing.sm }}
        >
          <AppText variant="body" color={theme.colors.textPrimary}>
            {'< Back'}
          </AppText>
        </TouchableOpacity>

        {/* Selected sources count */}
        <AppText variant="meta" color={theme.colors.textSecondary}>
          {headerSubtitle}
        </AppText>

        {/* Selected domain names */}
        <AppText variant="caption" color={theme.colors.textSecondary}>
          {domainLabels}
        </AppText>
      </View>

      {/* ================= SORT ================= */}
      <SortToggle value={sortBy} onChange={setSortBy} />

      {/* ================= LOADING STATE ================= */}
      {fetchState.status === 'loading' && (
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            padding: theme.spacing.lg,
          }}
        >
          <ActivityIndicator
            size="large"
            color={theme.colors.primary}
            accessibilityLabel="Loading articles"
          />
        </View>
      )}

      {/* ================= ERROR STATE ================= */}
      {fetchState.status === 'error' && (
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            padding: theme.spacing.lg,
          }}
        >
          <AppText
            variant="body"
            color={theme.colors.error}
            style={{
              textAlign: 'center',
              marginBottom: theme.spacing.md,
            }}
          >
            {fetchState.message}
          </AppText>

          <TouchableOpacity
            onPress={loadArticles}
            accessibilityRole="button"
            accessibilityLabel="Try again"
          >
            <AppText variant="label" color={theme.colors.primary}>
              Try again
            </AppText>
          </TouchableOpacity>
        </View>
      )}

      {/* ================= SUCCESS STATE ================= */}
      {fetchState.status === 'success' && (
        <FlatList
          data={sortedArticles} // ✅ Ensures correct order
          keyExtractor={(item, index) =>
            `${item.url}-${index}`
          }
          renderItem={({ item }: { item: Article }) => (
            <ArticleCard article={item} />
          )}
          contentContainerStyle={{
            paddingBottom: theme.spacing.lg,
          }}
          accessibilityLabel="Articles list"
        />
      )}
    </SafeAreaView>
  );
};