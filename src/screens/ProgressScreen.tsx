import { useCallback, useState } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import { Alert, FlatList, StyleSheet, Text, View } from 'react-native';

import PrimaryButton from '../components/PrimaryButton';
import {
  QuizResult,
  getLearnedWords,
  getQuizHistory,
  resetProgress,
} from '../storage/progress';
import { allWords, categories, findCategory } from '../data/vocabulary';
import { colors, radii, spacing } from '../theme';

export default function ProgressScreen() {
  const [learned, setLearned] = useState<string[]>([]);
  const [history, setHistory] = useState<QuizResult[]>([]);

  const load = useCallback(() => {
    Promise.all([getLearnedWords(), getQuizHistory()]).then(([l, h]) => {
      setLearned(l);
      setHistory(h);
    });
  }, []);

  useFocusEffect(
    useCallback(() => {
      load();
    }, [load]),
  );

  const total = allWords().length;
  const percent = total === 0 ? 0 : Math.round((learned.length / total) * 100);

  const handleReset = () => {
    Alert.alert('Reset progress?', 'This will clear all learned words and quiz history.', [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Reset',
        style: 'destructive',
        onPress: async () => {
          await resetProgress();
          load();
        },
      },
    ]);
  };

  return (
    <FlatList
      style={styles.container}
      contentContainerStyle={styles.content}
      data={history}
      keyExtractor={(item, idx) => `${item.date}-${idx}`}
      ListHeaderComponent={
        <View>
          <View style={styles.summary}>
            <Text style={styles.summaryLabel}>Words learned</Text>
            <Text style={styles.summaryValue}>
              {learned.length} / {total}
            </Text>
            <View style={styles.progressBar}>
              <View style={[styles.progressFill, { width: `${percent}%` }]} />
            </View>
            <Text style={styles.summaryPct}>{percent}% complete</Text>
          </View>

          <Text style={styles.sectionTitle}>By category</Text>
          {categories.map((category) => {
            const completed = category.words.filter((w) =>
              learned.includes(w.id),
            ).length;
            const pct = Math.round((completed / category.words.length) * 100);
            return (
              <View key={category.id} style={styles.categoryRow}>
                <View style={styles.categoryHead}>
                  <Text style={styles.categoryTitle}>{category.title}</Text>
                  <Text style={styles.categoryMeta}>
                    {completed} / {category.words.length}
                  </Text>
                </View>
                <View style={styles.progressBar}>
                  <View
                    style={[styles.progressFill, { width: `${pct}%` }]}
                  />
                </View>
              </View>
            );
          })}

          <Text style={styles.sectionTitle}>Recent quizzes</Text>
          {history.length === 0 && (
            <Text style={styles.empty}>No quizzes yet. Take one!</Text>
          )}
        </View>
      }
      renderItem={({ item }) => {
        const catTitle =
          item.categoryId === 'mixed'
            ? 'Mixed quiz'
            : findCategory(item.categoryId)?.title ?? 'Quiz';
        const date = new Date(item.date);
        return (
          <View style={styles.historyRow}>
            <View style={{ flex: 1 }}>
              <Text style={styles.historyTitle}>{catTitle}</Text>
              <Text style={styles.historyDate}>
                {date.toLocaleDateString()} {date.toLocaleTimeString()}
              </Text>
            </View>
            <Text style={styles.historyScore}>
              {item.score}/{item.total}
            </Text>
          </View>
        );
      }}
      ListFooterComponent={
        <PrimaryButton
          title="Reset progress"
          variant="danger"
          onPress={handleReset}
          style={{ marginTop: spacing.lg }}
        />
      }
    />
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    padding: spacing.lg,
  },
  summary: {
    backgroundColor: colors.primary,
    borderRadius: radii.lg,
    padding: spacing.lg,
  },
  summaryLabel: {
    color: '#dde5f5',
    fontSize: 13,
    textTransform: 'uppercase',
    letterSpacing: 1.2,
  },
  summaryValue: {
    color: '#fff',
    fontSize: 32,
    fontWeight: '800',
    marginTop: spacing.xs,
  },
  summaryPct: {
    color: colors.accent,
    fontWeight: '700',
    marginTop: spacing.sm,
  },
  progressBar: {
    marginTop: spacing.sm,
    height: 8,
    backgroundColor: '#ffffff33',
    borderRadius: 999,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: colors.accent,
  },
  sectionTitle: {
    marginTop: spacing.xl,
    marginBottom: spacing.md,
    fontSize: 18,
    fontWeight: '700',
    color: colors.text,
  },
  categoryRow: {
    backgroundColor: colors.card,
    borderRadius: radii.md,
    padding: spacing.md,
    marginBottom: spacing.sm,
  },
  categoryHead: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: spacing.sm,
  },
  categoryTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: colors.text,
  },
  categoryMeta: {
    fontSize: 13,
    color: colors.textMuted,
  },
  historyRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.card,
    borderRadius: radii.md,
    padding: spacing.md,
    marginBottom: spacing.sm,
  },
  historyTitle: {
    fontWeight: '700',
    color: colors.text,
  },
  historyDate: {
    color: colors.textMuted,
    fontSize: 12,
    marginTop: 2,
  },
  historyScore: {
    fontSize: 18,
    fontWeight: '800',
    color: colors.primary,
  },
  empty: {
    color: colors.textMuted,
    fontStyle: 'italic',
    paddingVertical: spacing.sm,
  },
});
