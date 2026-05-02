/**
 * @file AppNavigator.tsx
 *
 * Root navigation configuration for the app.
 *
 * Responsibilities:
 * - Define navigation stack
 * - Type navigation routes (TypeScript safety)
 * - Wrap app with required providers (SafeArea, Navigation)
 *
 * Design Decisions:
 * - Use Native Stack Navigator for performance
 * - Strongly type navigation params
 * - Disable default headers (custom UI instead)
 */

import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { DomainSelectorScreen } from '../screens/DomainSelectorScreen';
import { ArticlesScreen } from '../screens/ArticlesScreen';

import { Domain, SortOption } from '../types/news';
import { SafeAreaProvider } from 'react-native-safe-area-context';


/**
 * 🧠 RootStackParamList
 *
 * Defines all navigation routes and their parameters.
 *
 * Benefits:
 * - Type-safe navigation
 * - Prevents incorrect route usage
 * - Improves developer experience (autocomplete)
 */
export type RootStackParamList = {
  DomainSelector: undefined;

  Articles: {
    domains: Domain[];
    sortBy: SortOption;
  };
};


/**
 * 🚀 Stack Navigator
 *
 * Native stack used for better performance (vs JS stack).
 */
const Stack = createNativeStackNavigator<RootStackParamList>();


/**
 * 📱 AppNavigator
 *
 * Root component that wires up:
 * - Safe area handling (for notches, status bar, etc.)
 * - Navigation container
 * - Screen stack
 */
export const AppNavigator = () => {
  return (
    /**
     * 🛡️ SafeAreaProvider
     *
     * Ensures UI respects device safe areas
     * (especially important for iOS devices)
     */
    <SafeAreaProvider>
      <NavigationContainer>
        <Stack.Navigator
          /**
           * 🎨 Global screen options
           *
           * headerShown: false → using custom headers
           */
          screenOptions={{ headerShown: false }}
        >
          {/* 🏠 Domain Selection Screen */}
          <Stack.Screen
            name="DomainSelector"
            component={DomainSelectorScreen}
          />

          {/* 📰 Articles Screen */}
          <Stack.Screen
            name="Articles"
            component={ArticlesScreen}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
};