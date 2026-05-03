/**
 * @file ArticlesScreen.tsx
 *
 * Screen responsible for displaying a list of articles
 * based on selected domains and sort preference.
 *
 * Responsibilities:
 * - Fetch articles from API
 * - Handle loading, error, and success states
 * - Allow sorting (latest / popular)
 * - Display articles in a list
 *
 * Design Principles:
 * - Clear separation of UI states
 * - Controlled data fetching
 * - Accessible UI elements
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

import { Article, FetchState, DOMAIN_LABELS, SortOption } from '../types/news';

import { fetchArticles } from '../services/newsService';
import { RootStackParamList } from '../navigation/AppNavigator';

import Ionicons from 'react-native-vector-icons/Ionicons';
import { spacing } from '../theme/spacing';

<Ionicons name="home" size={24} color="#000" />;
/**
 * 🧠 Navigation typing
 */
type NavigationProp = NativeStackNavigationProp<RootStackParamList, 'Articles'>;

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
   * 📥 Params from previous screen
   */
  const { domains, sortBy: initialSort } = route.params;

  /**
   * 🔄 Sort state
   */
  const [sortBy, setSortBy] = useState<SortOption>(initialSort);

  /**
   * 📡 Fetch state (loading | success | error)
   */
  const [fetchState, setFetchState] = useState<FetchState>({
    status: 'loading',
  });

  /**
   * 🚀 Load articles from API
   *
   * - Sets loading state
   * - Fetches articles
   * - Handles success + error
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
   * 🧠 Derived UI values
   */
  const domainLabels = domains.map(d => DOMAIN_LABELS[d]).join(', ');

  /**
   * 🎨 Render UI
   */
  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: theme.colors.background,
      }}
    >
      {/* 🧭 HEADER */}
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
          {/* LEFT SIDE */}
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

            {/* 📰 Title */}
            <View>
              <AppText variant="h2" color={theme.colors.textPrimary}>
                Top Stories
              </AppText>
              <AppText variant="caption" color={theme.colors.textSecondary}>
                {domainLabels}
              </AppText>
            </View>
          </View>

          {/* 🔄 Refresh ACTION */}
          <Pressable onPress={loadArticles}>
            <Ionicons
              name="refresh-outline"
              size={24}
              color={theme.colors.textPrimary}
            />
          </Pressable>
        </View>

        {/* 🔄 SORT TOGGLE */}

        <SortToggle
          value={sortBy}
          onChange={setSortBy}
          style={{
            marginTop: spacing.md,
            marginHorizontal: 0, // 🔥 override internal margin
            width: '100%',
          }}
        />
      </View>

      {/* 🔄 SORT TOGGLE
      <SortToggle value={sortBy} onChange={setSortBy} /> */}

      {/* ⏳ LOADING STATE */}
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

      {/* ❌ ERROR STATE */}
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

          {/* 🔁 Retry Button */}
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

      {/* ✅ SUCCESS STATE */}
      {fetchState.status === 'success' && (
        <FlatList
          data={fetchState.articles}
          keyExtractor={(item, index) => `${item.url}-${index}`}
          /**
           * 📰 Render each article
           */
          renderItem={({ item }: { item: Article }) => (
            <ArticleCard article={item} />
          )}
          /**
           * 📐 Spacing
           */
          contentContainerStyle={{
            paddingBottom: theme.spacing.lg,
          }}
          accessibilityLabel="Articles list"
        />
      )}
    </SafeAreaView>
  );
};
