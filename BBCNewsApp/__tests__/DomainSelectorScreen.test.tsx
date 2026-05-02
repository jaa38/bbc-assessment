import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react-native'
import { DomainSelectorScreen } from '../src/screens/DomainSelectorScreen'

// Mock navigation — like using a Quinjet simulator instead of a real jet
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

jest.mock('@react-navigation/native-stack', () => ({
  createNativeStackNavigator: jest.fn(),
}))

describe('DomainSelectorScreen', () => {

  beforeEach(() => {
    jest.clearAllMocks()
  })

  test('shows all five domain chips', () => {
    render(<DomainSelectorScreen />)
    expect(screen.getByText('Apple')).toBeTruthy()
    expect(screen.getByText('BBC')).toBeTruthy()
    expect(screen.getByText('IGN')).toBeTruthy()
    expect(screen.getByText('Google')).toBeTruthy()
    expect(screen.getByText('YouTube')).toBeTruthy()
  })

  test('shows No source selected when nothing is tapped', () => {
    render(<DomainSelectorScreen />)
    expect(screen.getByText('No source selected')).toBeTruthy()
  })

  test('shows 1 source selected after tapping one chip', () => {
    render(<DomainSelectorScreen />)
    fireEvent.press(screen.getByText('Apple'))
    expect(screen.getByText('1 source selected')).toBeTruthy()
  })

  test('shows 2 sources selected after tapping two chips', () => {
    render(<DomainSelectorScreen />)
    fireEvent.press(screen.getByText('Apple'))
    fireEvent.press(screen.getByText('BBC'))
    expect(screen.getByText('2 sources selected')).toBeTruthy()
  })

  test('deselects a chip when tapped again', () => {
    render(<DomainSelectorScreen />)
    fireEvent.press(screen.getByText('Apple'))
    fireEvent.press(screen.getByText('Apple'))
    expect(screen.getByText('No source selected')).toBeTruthy()
  })

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