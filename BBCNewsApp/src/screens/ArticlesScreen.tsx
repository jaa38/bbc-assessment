/**
 * @file ArticlesScreen.tsx
 *
 * Displays a list of news articles based on selected domains.
 *
 * Responsibilities:
 * - Fetch articles from the News API
 * - Handle loading, error, empty, and success states
 * - Allow sorting (latest / popular)
 * - Provide refresh and navigation controls
 *
 * Key Features:
 * - Typed navigation (prevents runtime errors)
 * - Discriminated union state handling (FetchState)
 * - Memoised list rendering for performance
 * - Accessible UI interactions
 *
 * Design Decisions:
 * - API logic is abstracted into a service (fetchArticles)
 * - UI states are explicitly handled (no undefined states)
 * - FlatList used for performance with large datasets
 * - Inline styles used for speed and clarity in assessment context
 */

import React, { useState, useEffect, useCallback } from 'react';
import {
  View,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
  Pressable,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';

import { AppText } from '../components/AppText';
import { SortToggle } from '../components/SortToggle';
import { ArticleCard } from '../components/ArticleCard';

import { theme } from '../theme';
import { spacing } from '../theme/spacing';

import {
  Article,
  FetchState,
  DOMAIN_LABELS,
  SortOption,
} from '../types/news';

import { fetchArticles } from '../services/newsService';
import { RootStackParamList } from '../navigation/AppNavigator';

import Ionicons from 'react-native-vector-icons/Ionicons';


/**
 * 🧠 Navigation typing
 *
 * Ensures type-safe navigation and route params.
 */
type NavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'Articles'
>;

type RouteProps = RouteProp<RootStackParamList, 'Articles'>;


/**
 * 📰 ArticlesScreen Component
 */
export const ArticlesScreen = () => {
  /**
   * 🧭 Navigation + route
   */
  const navigation = useNavigation<NavigationProp>();
  const route = useRoute<RouteProps>();

  /**
   * 📥 Extract params from previous screen
   */
  const { domains, sortBy: initialSort } = route.params;

  /**
   * 🔄 Sort state
   */
  const [sortBy, setSortBy] = useState<SortOption>(initialSort);

  /**
   * 📡 Fetch state
   * Uses discriminated union to ensure safe rendering
   */
  const [fetchState, setFetchState] = useState<FetchState>({
    status: 'loading',
  });


  /**
   * 🚀 loadArticles
   *
   * Fetches articles from API and updates UI state
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
   * 🔄 Trigger fetch on mount or dependency change
   */
  useEffect(() => {
    loadArticles();
  }, [loadArticles]);


  /**
   * 🧠 Derived values
   *
   * Converts domain list into readable labels
   */
  const domainLabels = domains
    .map((d) => DOMAIN_LABELS[d])
    .join(', ');


  /**
   * ⚡ Memoised renderItem
   *
   * Prevents unnecessary re-renders of FlatList items
   */
  const renderItem = useCallback(
    ({ item }: { item: Article }) => (
      <ArticleCard article={item} />
    ),
    []
  );


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
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          {/* LEFT SECTION */}
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              gap: spacing.md,
            }}
          >
            {/* 🔙 Back Button */}
            <Pressable onPress={() => navigation.goBack()}>
              <Ionicons
                name="arrow-back"
                size={24}
                color={theme.colors.textPrimary}
              />
            </Pressable>

            {/* 📰 Title + Domains */}
            <View>
              <AppText variant="h2">Top Stories</AppText>
              <AppText
                variant="caption"
                color={theme.colors.textSecondary}
              >
                {domainLabels}
              </AppText>
            </View>
          </View>

          {/* 🔄 Refresh Button */}
          <Pressable onPress={loadArticles}>
            <Ionicons
              name="refresh-outline"
              size={24}
              color={theme.colors.textPrimary}
            />
          </Pressable>
        </View>

        {/* 🔀 Sort Toggle */}
        <SortToggle
          value={sortBy}
          onChange={setSortBy}
          style={{
            marginTop: spacing.md,
            marginHorizontal: 0,
            width: '100%',
          }}
        />
      </View>


      {/* ================= LOADING STATE ================= */}
      {fetchState.status === 'loading' && (
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <ActivityIndicator
            size="large"
            color={theme.colors.primary}
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
          }}
        >
          <AppText color={theme.colors.error}>
            {fetchState.message}
          </AppText>

          {/* Retry */}
          <TouchableOpacity onPress={loadArticles}>
            <AppText color={theme.colors.primary}>
              Try again
            </AppText>
          </TouchableOpacity>
        </View>
      )}


      {/* ================= EMPTY STATE ================= */}
      {fetchState.status === 'success' &&
        fetchState.articles.length === 0 && (
          <View
            style={{
              flex: 1,
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <AppText color={theme.colors.textSecondary}>
              No articles found for selected sources.
            </AppText>
          </View>
        )}


      {/* ================= SUCCESS STATE ================= */}
      {fetchState.status === 'success' &&
        fetchState.articles.length > 0 && (
          <FlatList
            data={fetchState.articles}
            keyExtractor={(item) => item.url}
            renderItem={renderItem}
            contentContainerStyle={{
              paddingBottom: theme.spacing.lg,
            }}
          />
        )}
    </SafeAreaView>
  );
};