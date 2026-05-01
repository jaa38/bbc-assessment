import React, { useState, useCallback } from 'react';
import { View, StyleSheet, SafeAreaView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { AppNavigationProp } from '../navigation/types';

import { AppText } from '../components/AppText';
import { DomainChip } from '../components/DomainChip';
import { Button } from '../components/Button';
import { theme } from '../theme';

import {
  Domain,
  ALL_DOMAINS,
  DOMAIN_LABELS,
} from '../types/news';

type NavigationProp = AppNavigationProp<'DomainSelector'>;

export const DomainSelectorScreen = () => {
  const navigation = useNavigation<NavigationProp>();

  const [selectedDomains, setSelectedDomains] = useState<Domain[]>([]);

  const toggleDomain = useCallback((domain: Domain) => {
    setSelectedDomains((prev) => {
      const isSelected = prev.includes(domain);

      if (isSelected) {
        return prev.filter((d) => d !== domain);
      }

      return [...prev, domain];
    });
  }, []);

  const handleViewArticles = useCallback(() => {
    navigation.navigate('Articles', {
      domains: selectedDomains,
      sortBy: 'latest',
    });
  }, [navigation, selectedDomains]);

  const selectionText =
    selectedDomains.length === 0
      ? 'No source selected'
      : selectedDomains.length === 1
      ? '1 source selected'
      : `${selectedDomains.length} sources selected`;

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerAccent} />
        <AppText variant="h2">News Reader</AppText>
      </View>

      {/* Content */}
      <View style={styles.content}>
        <AppText variant="h1" style={styles.title}>
          Pick your sources
        </AppText>

        <AppText
          variant="body"
          color={theme.colors.textSecondary}
          style={styles.subtitle}
        >
          Select one or more publishers to build your feed.
        </AppText>

        {/* Domain Chips */}
        <View
          style={styles.chipsContainer}
          accessibilityRole="list"
          accessibilityLabel="Available news sources"
        >
          {ALL_DOMAINS.map((domain) => (
            <DomainChip
              key={domain}
              label={DOMAIN_LABELS[domain]}
              selected={selectedDomains.includes(domain)}
              onPress={() => toggleDomain(domain)}
            />
          ))}
        </View>

        {/* Selection Feedback */}
        <AppText
          variant="bodySmall"
          color={theme.colors.textSecondary}
          accessibilityLiveRegion="polite"
        >
          {selectionText}
        </AppText>
      </View>

      {/* Footer */}
      <View style={styles.footer}>
        <Button
          title="View Articles"
          onPress={handleViewArticles}
          disabled={selectedDomains.length === 0}
          style={styles.button}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },

  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: theme.spacing.md,
    paddingVertical: theme.spacing.md,
    gap: theme.spacing.sm,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.border,
  },

  headerAccent: {
    width: 4,
    height: 24,
    borderRadius: 2,
    backgroundColor: theme.colors.primary,
  },

  content: {
    flex: 1,
    paddingHorizontal: theme.spacing.md,
    paddingTop: theme.spacing.lg,
  },

  title: {
    marginBottom: theme.spacing.sm,
  },

  subtitle: {
    marginBottom: theme.spacing.lg,
  },

  chipsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: theme.spacing.md,
  },

  footer: {
    paddingHorizontal: theme.spacing.md,
    paddingBottom: theme.spacing.lg,
    paddingTop: theme.spacing.sm,
  },

  button: {
    width: '100%',
  },
});