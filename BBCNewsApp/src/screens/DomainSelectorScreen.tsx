/**
 * @file DomainSelectorScreen.tsx
 *
 * Screen responsible for:
 * - Displaying available news domains
 * - Allowing users to select one or multiple domains
 * - Providing real-time feedback on selection
 * - Navigating to ArticlesScreen with selected filters
 *
 * Key Responsibilities:
 * - Manage domain selection state
 * - Handle user interactions (select / deselect)
 * - Provide accessible feedback
 * - Trigger navigation with correct params
 *
 * Design Decisions:
 * - Use local state for selection (simple, scoped)
 * - Use toggle pattern for multi-select
 * - Disable CTA when no selection (prevent invalid navigation)
 */

import React, { useState, useCallback } from 'react'
import { View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useNavigation } from '@react-navigation/native'
import { AppNavigationProp } from '../navigation/types'

import { AppText } from '../components/AppText'
import { DomainChip } from '../components/DomainChip'
import { Button } from '../components/Button'
import { theme } from '../theme'

import { Domain, ALL_DOMAINS, DOMAIN_LABELS } from '../types/news'

type NavigationProp = AppNavigationProp<'DomainSelector'>

export const DomainSelectorScreen = () => {
  const navigation = useNavigation<NavigationProp>()

  const [selectedDomains, setSelectedDomains] = useState<Domain[]>([])

  const toggleDomain = useCallback((domain: Domain) => {
    setSelectedDomains(prev => {
      const isSelected = prev.includes(domain)
      return isSelected
        ? prev.filter(d => d !== domain)
        : [...prev, domain]
    })
  }, [])

  const handleViewArticles = useCallback(() => {
    navigation.navigate('Articles', {
      domains: selectedDomains,
      sortBy: 'latest',
    })
  }, [navigation, selectedDomains])

  const selectionText =
    selectedDomains.length === 0
      ? 'No source selected'
      : selectedDomains.length === 1
      ? '1 source selected'
      : `${selectedDomains.length} sources selected`

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
          flexDirection: 'row',
          alignItems: 'center',
          paddingHorizontal: theme.spacing.md,
          paddingVertical: theme.spacing.md,
          gap: theme.spacing.sm,
          borderBottomWidth: 1,
          borderBottomColor: theme.colors.border,
        }}
      >
        <View
          style={{
            width: 4,
            height: 24,
            borderRadius: 2,
            backgroundColor: theme.colors.primary,
          }}
        />
        <AppText variant="h2">News Reader</AppText>
      </View>

      {/* CONTENT */}
      <View
        style={{
          flex: 1,
          paddingHorizontal: theme.spacing.md,
          paddingTop: theme.spacing.lg,
        }}
      >
        <AppText
          variant="h1"
          style={{ marginBottom: theme.spacing.sm }}
        >
          Pick your sources
        </AppText>

        <AppText
          variant="body"
          color={theme.colors.textSecondary}
          style={{ marginBottom: theme.spacing.lg }}
        >
          Select one or more publishers to build your feed.
        </AppText>

        {/* DOMAIN CHIPS */}
        <View
          style={{
            flexDirection: 'row',
            flexWrap: 'wrap',
            marginBottom: theme.spacing.md,
          }}
          accessibilityRole="list"
          accessibilityLabel="Available news sources"
        >
          {ALL_DOMAINS.map(domain => (
            <DomainChip
              key={domain}
              label={DOMAIN_LABELS[domain]}
              selected={selectedDomains.includes(domain)}
              onPress={() => toggleDomain(domain)}
            />
          ))}
        </View>

        {/* SELECTION FEEDBACK */}
        <AppText
          variant="bodySmall"
          color={theme.colors.textSecondary}
          accessibilityLiveRegion="polite"
        >
          {selectionText}
        </AppText>
      </View>

      {/* FOOTER — fixed button at bottom */}
      <View
        style={{
          paddingHorizontal: theme.spacing.md,
          paddingBottom: theme.spacing.lg,
          paddingTop: theme.spacing.sm,
        }}
      >
        {/* 
          FIX: Removed outer Pressable wrapper.
          Button already handles its own press interaction.
          Wrapping in Pressable with no onPress was redundant.
        */}
        <Button
          title="View Articles"
          onPress={handleViewArticles}
          disabled={selectedDomains.length === 0}
          style={{ width: '100%' }}
        />
      </View>
    </SafeAreaView>
  )
}