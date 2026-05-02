/**
 * @file DomainSelectorScreen.test.tsx
 *
 * Test suite for DomainSelectorScreen.
 *
 * Purpose:
 * - Validate rendering of available domains
 * - Ensure correct selection and deselection behavior
 * - Verify user feedback (selection count)
 * - Confirm navigation with correct parameters
 *
 * Strategy:
 * - Mock navigation to isolate UI logic
 * - Simulate user interaction using fireEvent
 * - Assert visible UI state and behavior
 */

import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react-native'
import { DomainSelectorScreen } from '../src/screens/DomainSelectorScreen'

/**
 * 🧭 Mock navigation
 *
 * Why:
 * - Prevents dependency on real navigation stack
 * - Allows us to assert navigation behavior directly
 */
const mockNavigate = jest.fn()

jest.mock('@react-navigation/native', () => ({
  useNavigation: () => ({
    navigate: mockNavigate,
    goBack: jest.fn(),
  }),
  useRoute: () => ({
    params: {},
  }),
}))

/**
 * 🧱 Mock native stack navigator
 *
 * Prevents errors from navigator initialization
 */
jest.mock('@react-navigation/native-stack', () => ({
  createNativeStackNavigator: jest.fn(),
}))

/**
 * 📦 Test Suite: DomainSelectorScreen
 */
describe('DomainSelectorScreen', () => {

  /**
   * 🔄 Reset mocks before each test
   */
  beforeEach(() => {
    jest.clearAllMocks()
  })

  /**
   * 🎯 Test: All domain chips are rendered
   *
   * Validates:
   * - UI correctly displays all available domains
   * - Ensures data source (ALL_DOMAINS) is mapped correctly
   */
  test('shows all five domain chips', () => {
    render(<DomainSelectorScreen />)

    expect(screen.getByText('Apple')).toBeTruthy()
    expect(screen.getByText('BBC')).toBeTruthy()
    expect(screen.getByText('IGN')).toBeTruthy()
    expect(screen.getByText('Google')).toBeTruthy()
    expect(screen.getByText('YouTube')).toBeTruthy()
  })

  /**
   * 📭 Test: Initial state (no selection)
   *
   * Validates:
   * - Default UI feedback is correct
   */
  test('shows No source selected when nothing is tapped', () => {
    render(<DomainSelectorScreen />)

    expect(screen.getByText('No source selected')).toBeTruthy()
  })

  /**
   * ☝️ Test: Single selection
   *
   * Validates:
   * - Selecting one domain updates UI correctly
   */
  test('shows 1 source selected after tapping one chip', () => {
    render(<DomainSelectorScreen />)

    fireEvent.press(screen.getByText('Apple'))

    expect(screen.getByText('1 source selected')).toBeTruthy()
  })

  /**
   * ✌️ Test: Multiple selection
   *
   * Validates:
   * - Multiple domains can be selected
   * - Selection count updates accurately
   */
  test('shows 2 sources selected after tapping two chips', () => {
    render(<DomainSelectorScreen />)

    fireEvent.press(screen.getByText('Apple'))
    fireEvent.press(screen.getByText('BBC'))

    expect(screen.getByText('2 sources selected')).toBeTruthy()
  })

  /**
   * 🔁 Test: Toggle (select → deselect)
   *
   * Validates:
   * - Pressing a selected chip removes it
   * - UI resets correctly
   */
  test('deselects a chip when tapped again', () => {
    render(<DomainSelectorScreen />)

    fireEvent.press(screen.getByText('Apple'))
    fireEvent.press(screen.getByText('Apple'))

    expect(screen.getByText('No source selected')).toBeTruthy()
  })

  /**
   * 🚀 Test: Navigation to Articles screen
   *
   * Validates:
   * - Correct route is triggered
   * - Correct parameters are passed:
   *   - selected domains
   *   - default sort option ("latest")
   */
  test('navigates to Articles when View Articles is tapped', () => {
    render(<DomainSelectorScreen />)

    fireEvent.press(screen.getByText('Apple'))
    fireEvent.press(screen.getByText('View Articles'))

    expect(mockNavigate).toHaveBeenCalledWith('Articles', {
      domains: ['apple.com'],
      sortBy: 'latest',
    })
  })

})