/**
 * @file AppNavigator.tsx
 *
 * Central navigation configuration for the application.
 *
 * Responsibilities:
 * - Define all app routes and their params
 * - Configure navigation stack
 * - Wrap app with providers (SafeArea + NavigationContainer)
 *
 * Design Principles:
 * - Strong typing via RootStackParamList
 * - Single source of truth for navigation
 * - Scalable structure for future screens
 */

import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { SafeAreaProvider } from 'react-native-safe-area-context'

import { DomainSelectorScreen } from '../screens/DomainSelectorScreen'
import { ArticlesScreen } from '../screens/ArticlesScreen'
import { ArticleDetailScreen } from '../screens/ArticleDetailScreen'

import { Domain, SortOption, Article } from '../types/news'


/**
 * 🧠 RootStackParamList
 *
 * Defines all navigation routes and their parameters.
 *
 * Benefits:
 * - Prevents runtime navigation errors
 * - Enables autocomplete for navigation
 */
export type RootStackParamList = {
  DomainSelector: undefined

  Articles: {
    domains: Domain[]
    sortBy: SortOption
  }

  ArticleDetail: {
    article: Article
  }
}

const Stack = createNativeStackNavigator<RootStackParamList>()


/**
 * 🚀 AppNavigator
 *
 * Entry point for navigation.
 */
export const AppNavigator = () => {
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen
            name="DomainSelector"
            component={DomainSelectorScreen}
          />

          <Stack.Screen
            name="Articles"
            component={ArticlesScreen}
          />

          <Stack.Screen
            name="ArticleDetail"
            component={ArticleDetailScreen}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  )
}