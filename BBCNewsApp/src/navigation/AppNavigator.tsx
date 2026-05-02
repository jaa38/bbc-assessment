import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { DomainSelectorScreen } from '../screens/DomainSelectorScreen';
import { ArticlesScreen } from '../screens/ArticlesScreen';
import { Domain, SortOption } from '../types/news';
import { SafeAreaProvider } from 'react-native-safe-area-context';

export type RootStackParamList = {
  DomainSelector: undefined;
  Articles: {
    domains: Domain[];
    sortBy: SortOption;
  };
};

const Stack = createNativeStackNavigator<RootStackParamList>();

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
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
};