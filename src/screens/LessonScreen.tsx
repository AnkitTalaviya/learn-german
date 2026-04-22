import { useLayoutEffect, useState } from 'react';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';

import Flashcard from '../components/Flashcard';
import PrimaryButton from '../components/PrimaryButton';
import { findCategory } from '../data/vocabulary';
import { markWordLearned } from '../storage/progress';
import { useWordEntries } from '../hooks/useWordEntries';
import { colors, spacing } from '../theme';
import type { RootStackParamList } from '../navigation/AppNavigator';

type Props = NativeStackScreenProps<RootStackParamList, 'Lesson'>;

export default function LessonScreen({ navigation, route }: Props) {
  const category = findCategory(route.params.categoryId);
  const { entries, loading, error } = useWordEntries(category?.words ?? []);
  const [index, setIndex] = useState(0);

  useLayoutEffect(() => {
    navigation.setOptions({ title: category?.title ?? 'Lesson' });
  }, [navigation, category?.title]);

  if (!category) {
    return (
      <View style={styles.centered}>
        <Text style={styles.mutedText}>Category not found.</Text>
      </View>
    );
  }

  if (error && entries.length === 0) {
    return (
      <View style={styles.centered}>
        <Text style={styles.errorText}>Couldn’t reach the translation service.</Text>
        <Text style={styles.mutedText}>{error}</Text>
      </View>
    );
  }

  if (entries.length === 0) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator color={colors.primary} />
        <Text style={styles.mutedText}>Fetching vocabulary…</Text>
      </View>
    );
  }

  const word = entries[Math.min(index, entries.length - 1)];
  const isLast = index >= entries.length - 1;
  const waitingForMore = loading && isLast && entries.length < category.words.length;

  const handleKnown = async () => {
    await markWordLearned(word.id);
    if (isLast) {
      navigation.navigate('Quiz', { categoryId: category.id });
    } else {
      setIndex((prev) => prev + 1);
    }
  };

  const handleSkip = () => {
    if (isLast) {
      navigation.goBack();
    } else {
      setIndex((prev) => prev + 1);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.counter}>
        Card {index + 1} of {category.words.length}
        {loading ? ' • loading…' : ''}
      </Text>
      <Flashcard word={word} key={word.id} />
      <View style={styles.actions}>
        <PrimaryButton
          title="Needs review"
          variant="secondary"
          onPress={handleSkip}
          style={styles.actionButton}
          disabled={waitingForMore}
        />
        <PrimaryButton
          title={isLast ? 'Got it — Quiz me' : 'I know it'}
          onPress={handleKnown}
          style={styles.actionButton}
          disabled={waitingForMore}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: spacing.lg,
    justifyContent: 'center',
  },
  centered: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: spacing.sm,
    padding: spacing.lg,
  },
  mutedText: {
    color: colors.textMuted,
    textAlign: 'center',
  },
  errorText: {
    color: colors.danger,
    fontWeight: '700',
  },
  counter: {
    textAlign: 'center',
    color: colors.textMuted,
    marginBottom: spacing.md,
    fontWeight: '600',
  },
  actions: {
    flexDirection: 'row',
    gap: spacing.md,
    marginTop: spacing.lg,
  },
  actionButton: {
    flex: 1,
  },
});
