/**
 * @file types.ts
 *
 * Navigation type utilities.
 *
 * Purpose:
 * - Provide reusable, strongly-typed navigation props
 * - Avoid repeating complex generic types across screens
 * - Improve readability and maintainability
 *
 * Design Principle:
 * - "Abstract complexity once, reuse everywhere"
 */

import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from './AppNavigator';


/**
 * 🧠 AppNavigationProp
 *
 * Generic navigation type for any screen in the app.
 *
 * @template T - Screen name (must exist in RootStackParamList)
 *
 * Example Usage:
 *
 * type NavigationProp = AppNavigationProp<'DomainSelector'>
 *
 * const navigation = useNavigation<NavigationProp>()
 *
 * Benefits:
 * - Strong typing for navigation.navigate()
 * - Prevents passing incorrect params
 * - Cleaner than repeating NativeStackNavigationProp everywhere
 */
export type AppNavigationProp<
  T extends keyof RootStackParamList
> = NativeStackNavigationProp<RootStackParamList, T>;