import { useLayoutEffect, useState } from 'react';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { StyleSheet, Text, View } from 'react-native';

import Flashcard from '../components/Flashcard';
import PrimaryButton from '../components/PrimaryButton';
import { findCategory } from '../data/vocabulary';
import { markWordLearned } from '../storage/progress';
import { colors, spacing } from '../theme';
import type { RootStackParamList } from '../navigation/AppNavigator';

type Props = NativeStackScreenProps<RootStackParamList, 'Lesson'>;

export default function LessonScreen({ navigation, route }: Props) {
  const category = findCategory(route.params.categoryId);
  const [index, setIndex] = useState(0);

  useLayoutEffect(() => {
    navigation.setOptions({ title: category?.title ?? 'Lesson' });
  }, [navigation, category?.title]);

  if (!category) {
    return (
      <View style={styles.missing}>
        <Text style={styles.missingText}>Category not found.</Text>
      </View>
    );
  }

  const word = category.words[index];
  const isLast = index === category.words.length - 1;

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
      </Text>
      <Flashcard word={word} key={word.id} />
      <View style={styles.actions}>
        <PrimaryButton
          title="Needs review"
          variant="secondary"
          onPress={handleSkip}
          style={styles.actionButton}
        />
        <PrimaryButton
          title={isLast ? 'Got it — Quiz me' : 'I know it'}
          onPress={handleKnown}
          style={styles.actionButton}
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
  missing: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  missingText: {
    color: colors.textMuted,
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
