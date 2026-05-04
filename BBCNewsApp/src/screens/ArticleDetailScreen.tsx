/**
 * @file ArticleDetailScreen.tsx
 *
 * Displays full details of a selected article.
 *
 * Responsibilities:
 * - Show article metadata (title, source, date)
 * - Display description and content
 * - Allow user to open full article in browser
 *
 * Design Principles:
 * - Readable layout using ScrollView
 * - Defensive rendering (null-safe fields)
 * - Clear user actions (back + open link)
 */

import React from 'react';
import { ScrollView, Pressable, Linking } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { RouteProp, useRoute, useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

import { AppText } from '../components/AppText';
import { theme } from '../theme';
import { RootStackParamList } from '../navigation/AppNavigator';

import Ionicons from 'react-native-vector-icons/Ionicons';

type RouteProps = RouteProp<RootStackParamList, 'ArticleDetail'>;
type NavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'ArticleDetail'
>;

export const ArticleDetailScreen = () => {
  const route = useRoute<RouteProps>();
  const navigation = useNavigation<NavigationProp>();

  const { article } = route.params;

  /**
   * 🌐 Open article in browser
   */
  const openArticle = () => {
    Linking.openURL(article.url);
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView contentContainerStyle={{ padding: theme.spacing.md }}>
        {/* BACK */}
        <Pressable
          onPress={() => navigation.goBack()}
          accessibilityRole="button"
          accessibilityLabel="Go back"
          hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
        >
          <Ionicons
            name="arrow-back"
            size={24}
            color={theme.colors.textPrimary}
          />
        </Pressable>

        {/* SOURCE */}
        <AppText
          variant="meta"
          color={theme.colors.primary}
          style={{ marginTop: theme.spacing.sm }}
        >
          {article.source.name}
        </AppText>

        {/* TITLE */}
        <AppText variant="h1" style={{ marginTop: theme.spacing.sm }}>
          {article.title}
        </AppText>

        {/* DATE */}
        <AppText
          variant="caption"
          color={theme.colors.textSecondary}
          style={{ marginTop: theme.spacing.sm }}
        >
          {new Date(article.publishedAt).toLocaleString()}
        </AppText>

        {/* DESCRIPTION */}
        {article.description && (
          <AppText variant="body" style={{ marginTop: theme.spacing.md }}>
            {article.description}
          </AppText>
        )}

        {/* CONTENT */}
        {article.content && (
          <AppText
            variant="bodySmall"
            color={theme.colors.textSecondary}
            style={{ marginTop: theme.spacing.md }}
          >
            {article.content}
          </AppText>
        )}

        {/* OPEN LINK */}
        <Pressable
          onPress={openArticle}
          accessibilityRole="link"
          accessibilityLabel="Read full article in browser"
          style={{ marginTop: theme.spacing.lg }}
        >
          <AppText color={theme.colors.primary}>Read full article →</AppText>
        </Pressable>
      </ScrollView>
    </SafeAreaView>
  );
};
