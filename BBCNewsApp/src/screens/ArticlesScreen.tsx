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

type NavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'Articles'
>;

type RouteProps = RouteProp<RootStackParamList, 'Articles'>;

export const ArticlesScreen = () => {
  const navigation = useNavigation<NavigationProp>();
  const route = useRoute<RouteProps>();

  const { domains, sortBy: initialSort } = route.params;

  const [sortBy, setSortBy] = useState<SortOption>(initialSort);

  const [fetchState, setFetchState] = useState<FetchState>({
    status: 'loading',
  });

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

  const domainLabels = domains
    .map((d) => DOMAIN_LABELS[d])
    .join(', ');

  // ✅ memoised renderItem
  const renderItem = useCallback(
    ({ item }: { item: Article }) => (
      <ArticleCard article={item} />
    ),
    []
  );

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
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          {/* LEFT */}
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              gap: spacing.md,
            }}
          >
            <Pressable onPress={() => navigation.goBack()}>
              <Ionicons
                name="arrow-back"
                size={24}
                color={theme.colors.textPrimary}
              />
            </Pressable>

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

          {/* REFRESH */}
          <Pressable onPress={loadArticles}>
            <Ionicons
              name="refresh-outline"
              size={24}
              color={theme.colors.textPrimary}
            />
          </Pressable>
        </View>

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

      {/* LOADING */}
      {fetchState.status === 'loading' && (
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <ActivityIndicator size="large" color={theme.colors.primary} />
        </View>
      )}

      {/* ERROR */}
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

          <TouchableOpacity onPress={loadArticles}>
            <AppText color={theme.colors.primary}>Try again</AppText>
          </TouchableOpacity>
        </View>
      )}

      {/* EMPTY STATE */}
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

      {/* SUCCESS */}
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