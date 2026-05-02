module.exports = {
  preset: 'react-native',
  setupFilesAfterEnv: [
    '@testing-library/jest-native/extend-expect',
  ],
  transformIgnorePatterns: [
    'node_modules/(?!(react-native|@react-native|@react-navigation|@testing-library|react-native-screens|react-native-safe-area-context)/)',
  ],
  moduleNameMapper: {
    '@env': '<rootDir>/__mocks__/env.js',
  },
}