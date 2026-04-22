import { useEffect, useLayoutEffect, useMemo, useState } from 'react';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import {
  ActivityIndicator,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import PrimaryButton from '../components/PrimaryButton';
import { allSeeds, categories, findCategory } from '../data/vocabulary';
import { markWordLearned, saveQuizResult } from '../storage/progress';
import { colors, radii, spacing } from '../theme';
import { useWordEntries, EnrichedWord } from '../hooks/useWordEntries';
import type { RootStackParamList } from '../navigation/AppNavigator';

type Props = NativeStackScreenProps<RootStackParamList, 'Quiz'>;

type Question = {
  word: EnrichedWord;
  options: string[];
  answer: string;
};

const QUIZ_LENGTH = 8;

function shuffle<T>(values: T[]): T[] {
  const copy = [...values];
  for (let i = copy.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

function buildQuestions(words: EnrichedWord[]): Question[] {
  if (words.length < 2) return [];
  const picks = shuffle(words).slice(0, Math.min(QUIZ_LENGTH, words.length));
  return picks.map((word) => {
    const distractors = shuffle(
      words.filter((candidate) => candidate.id !== word.id),
    )
      .slice(0, 3)
      .map((candidate) => candidate.english);
    const options = shuffle([word.english, ...distractors]);
    return { word, options, answer: word.english };
  });
}

export default function QuizScreen({ navigation, route }: Props) {
  const categoryId = route.params?.categoryId;
  const category = categoryId ? findCategory(categoryId) : undefined;

  const seeds = useMemo(() => {
    if (category) return category.words;
    const pool = allSeeds();
    return shuffle(pool).slice(0, Math.max(QUIZ_LENGTH + 4, 12));
  }, [category]);

  const { entries, loading, error } = useWordEntries(seeds);

  const questions = useMemo(() => {
    if (loading || entries.length < Math.min(4, seeds.length)) return [];
    return buildQuestions(entries);
  }, [entries, loading, seeds.length]);

  const [index, setIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [selected, setSelected] = useState<string | null>(null);
  const [done, setDone] = useState(false);

  useLayoutEffect(() => {
    navigation.setOptions({
      title: category ? `${category.title} Quiz` : 'Mixed Quiz',
    });
  }, [navigation, category]);

  useEffect(() => {
    if (!done) return;
    saveQuizResult({
      date: new Date().toISOString(),
      categoryId: category?.id ?? 'mixed',
      score,
      total: questions.length,
    });
  }, [done, score, category?.id, questions.length]);

  if (error && entries.length === 0) {
    return (
      <View style={styles.empty}>
        <Text style={styles.errorHeading}>Couldn’t load quiz data.</Text>
        <Text style={styles.emptyText}>{error}</Text>
        <PrimaryButton title="Go back" onPress={() => navigation.goBack()} />
      </View>
    );
  }

  if (questions.length === 0) {
    return (
      <View style={styles.empty}>
        <ActivityIndicator color={colors.primary} />
        <Text style={styles.emptyText}>
          Preparing questions from the translation API…
        </Text>
      </View>
    );
  }

  if (done) {
    const pct = Math.round((score / questions.length) * 100);
    return (
      <View style={styles.container}>
        <View style={styles.resultCard}>
          <Text style={styles.resultHeading}>Quiz complete!</Text>
          <Text style={styles.resultScore}>
            {score} / {questions.length}
          </Text>
          <Text style={styles.resultPercent}>{pct}%</Text>
          <Text style={styles.resultMessage}>
            {pct >= 80
              ? 'Sehr gut! Keep it up.'
              : pct >= 50
                ? 'Nicht schlecht — try again to improve.'
                : 'Weiter üben! Review the flashcards and try again.'}
          </Text>
        </View>
        <View style={styles.resultActions}>
          <PrimaryButton
            title="Try again"
            onPress={() => {
              setIndex(0);
              setScore(0);
              setSelected(null);
              setDone(false);
            }}
            style={styles.resultButton}
          />
          <PrimaryButton
            title="Back home"
            variant="secondary"
            onPress={() => navigation.popToTop()}
            style={styles.resultButton}
          />
        </View>
      </View>
    );
  }

  const current = questions[index];
  const isCorrect = selected !== null && selected === current.answer;

  const handleSelect = async (option: string) => {
    if (selected !== null) return;
    setSelected(option);
    if (option === current.answer) {
      setScore((prev) => prev + 1);
      await markWordLearned(current.word.id);
    }
  };

  const handleNext = () => {
    setSelected(null);
    if (index === questions.length - 1) {
      setDone(true);
    } else {
      setIndex((prev) => prev + 1);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.counter}>
        Question {index + 1} of {questions.length} • Score {score}
      </Text>
      <View style={styles.prompt}>
        <Text style={styles.promptLabel}>What does this mean?</Text>
        <Text style={styles.promptWord}>{current.word.german}</Text>
      </View>
      <View style={styles.options}>
        {current.options.map((option) => {
          const isChosen = option === selected;
          const isAnswer = option === current.answer;
          const showState = selected !== null;
          const backgroundColor = showState
            ? isAnswer
              ? colors.success
              : isChosen
                ? colors.danger
                : colors.card
            : colors.card;
          const textColor =
            showState && (isAnswer || isChosen) ? '#fff' : colors.text;
          return (
            <Pressable
              key={option}
              onPress={() => handleSelect(option)}
              disabled={selected !== null}
              style={({ pressed }) => [
                styles.option,
                { backgroundColor },
                pressed && selected === null && styles.optionPressed,
              ]}
            >
              <Text style={[styles.optionText, { color: textColor }]}>
                {option}
              </Text>
            </Pressable>
          );
        })}
      </View>
      {selected !== null && (
        <View style={styles.feedback}>
          <Text
            style={[
              styles.feedbackText,
              { color: isCorrect ? colors.success : colors.danger },
            ]}
          >
            {isCorrect ? 'Richtig!' : `Answer: ${current.answer}`}
          </Text>
          <PrimaryButton
            title={
              index === questions.length - 1 ? 'See results' : 'Next question'
            }
            onPress={handleNext}
          />
        </View>
      )}
      {!category && (
        <Text style={styles.footerHint}>
          Drawing from {categories.length} categories.
        </Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: spacing.lg,
  },
  empty: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: spacing.lg,
    gap: spacing.md,
  },
  emptyText: {
    color: colors.textMuted,
    textAlign: 'center',
  },
  errorHeading: {
    color: colors.danger,
    fontWeight: '700',
  },
  counter: {
    color: colors.textMuted,
    fontWeight: '600',
    textAlign: 'center',
    marginBottom: spacing.md,
  },
  prompt: {
    backgroundColor: colors.primary,
    borderRadius: radii.lg,
    padding: spacing.lg,
    alignItems: 'center',
    marginBottom: spacing.lg,
  },
  promptLabel: {
    color: '#dde5f5',
    fontSize: 13,
    textTransform: 'uppercase',
    letterSpacing: 1.2,
    marginBottom: spacing.sm,
  },
  promptWord: {
    color: '#fff',
    fontSize: 32,
    fontWeight: '800',
    textAlign: 'center',
  },
  options: {
    gap: spacing.sm,
  },
  option: {
    borderRadius: radii.md,
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.lg,
    borderWidth: 1,
    borderColor: colors.border,
  },
  optionPressed: {
    opacity: 0.8,
  },
  optionText: {
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
  },
  feedback: {
    marginTop: spacing.lg,
    gap: spacing.md,
  },
  feedbackText: {
    fontSize: 16,
    fontWeight: '700',
    textAlign: 'center',
  },
  footerHint: {
    marginTop: spacing.lg,
    textAlign: 'center',
    color: colors.textMuted,
    fontSize: 12,
  },
  resultCard: {
    backgroundColor: colors.card,
    borderRadius: radii.lg,
    padding: spacing.xl,
    alignItems: 'center',
    marginTop: spacing.xl,
  },
  resultHeading: {
    fontSize: 20,
    fontWeight: '700',
    color: colors.text,
  },
  resultScore: {
    fontSize: 40,
    fontWeight: '800',
    color: colors.primary,
    marginTop: spacing.md,
  },
  resultPercent: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.accent,
    marginTop: spacing.xs,
  },
  resultMessage: {
    marginTop: spacing.md,
    fontSize: 15,
    color: colors.textMuted,
    textAlign: 'center',
  },
  resultActions: {
    flexDirection: 'row',
    gap: spacing.md,
    marginTop: spacing.xl,
  },
  resultButton: {
    flex: 1,
  },
});
