/* eslint-disable react-native/no-inline-styles */

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

type NavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'Articles'
>;

type RouteProps = RouteProp<
  RootStackParamList,
  'Articles'
>;

export const ArticlesScreen = () => {
  const navigation = useNavigation<NavigationProp>();
  const route = useRoute<RouteProps>();

  const { domains, sortBy: initialSort } = route.params;

  const [sortBy, setSortBy] = useState<SortOption>(initialSort);

  const [fetchState, setFetchState] = useState<FetchState>({
    status: 'loading',
  });

  // 📡 Load Articles
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

  useEffect(() => {
    loadArticles();
  }, [loadArticles]);

  // 🧠 Derived UI
  const domainLabels = domains
    .map((d) => DOMAIN_LABELS[d])
    .join(', ');

  const headerSubtitle = `${domains.length} ${
    domains.length === 1 ? 'source' : 'sources'
  } selected`;

  // ✅ SORT ARTICLES (MOST RECENT FIRST)
  const sortedArticles =
    fetchState.status === 'success'
      ? [...fetchState.articles].sort((a, b) => {
          return (
            new Date(b.publishedAt).getTime() -
            new Date(a.publishedAt).getTime()
          );
        })
      : [];

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: theme.colors.background,
      }}
    >
      {/* HEADER */}
      <View
        style={{
          paddingHorizontal: theme.spacing.md,
          paddingVertical: theme.spacing.md,
          borderBottomWidth: 1,
          borderBottomColor: theme.colors.border,
        }}
      >
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

        <AppText variant="meta" color={theme.colors.textSecondary}>
          {headerSubtitle}
        </AppText>

        <AppText variant="caption" color={theme.colors.textSecondary}>
          {domainLabels}
        </AppText>
      </View>

      {/* SORT TOGGLE */}
      <SortToggle value={sortBy} onChange={setSortBy} />

      {/* LOADING */}
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

      {/* ERROR */}
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

      {/* SUCCESS */}
      {fetchState.status === 'success' && (
        <FlatList
          data={sortedArticles} // ✅ using sorted data
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