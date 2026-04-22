import { useCallback, useState } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { FlatList, Pressable, StyleSheet, Text, View } from 'react-native';

import { categories, allWords } from '../data/vocabulary';
import { getLearnedWords } from '../storage/progress';
import { colors, radii, spacing } from '../theme';
import PrimaryButton from '../components/PrimaryButton';
import type { RootStackParamList } from '../navigation/AppNavigator';

type Props = NativeStackScreenProps<RootStackParamList, 'Home'>;

export default function HomeScreen({ navigation }: Props) {
  const [learnedCount, setLearnedCount] = useState(0);
  const total = allWords().length;

  useFocusEffect(
    useCallback(() => {
      let active = true;
      getLearnedWords().then((learned) => {
        if (active) setLearnedCount(learned.length);
      });
      return () => {
        active = false;
      };
    }, []),
  );

  const percent = total === 0 ? 0 : Math.round((learnedCount / total) * 100);

  return (
    <View style={styles.container}>
      <View style={styles.hero}>
        <Text style={styles.heroTitle}>Willkommen!</Text>
        <Text style={styles.heroSubtitle}>
          Start your German journey one word at a time.
        </Text>
        <View style={styles.progressRow}>
          <View style={styles.progressBarBg}>
            <View style={[styles.progressBarFill, { width: `${percent}%` }]} />
          </View>
          <Text style={styles.progressText}>
            {learnedCount} / {total} words
          </Text>
        </View>
        <View style={styles.heroActions}>
          <PrimaryButton
            title="Quick Quiz"
            onPress={() => navigation.navigate('Quiz', {})}
            variant="secondary"
            style={styles.heroButton}
          />
          <PrimaryButton
            title="My Progress"
            onPress={() => navigation.navigate('Progress')}
            style={styles.heroButton}
          />
        </View>
      </View>

      <Text style={styles.sectionTitle}>Categories</Text>
      <FlatList
        data={categories}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.list}
        renderItem={({ item }) => (
          <Pressable
            style={({ pressed }) => [styles.card, pressed && styles.cardPressed]}
            onPress={() =>
              navigation.navigate('Category', { categoryId: item.id })
            }
          >
            <Text style={styles.cardEmoji}>{item.emoji}</Text>
            <View style={styles.cardBody}>
              <Text style={styles.cardTitle}>{item.title}</Text>
              <Text style={styles.cardDescription}>{item.description}</Text>
              <Text style={styles.cardMeta}>{item.words.length} words</Text>
            </View>
          </Pressable>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  hero: {
    backgroundColor: colors.primary,
    padding: spacing.lg,
    paddingBottom: spacing.xl,
  },
  heroTitle: {
    color: '#fff',
    fontSize: 28,
    fontWeight: '800',
  },
  heroSubtitle: {
    color: '#dde5f5',
    fontSize: 15,
    marginTop: spacing.xs,
  },
  progressRow: {
    marginTop: spacing.lg,
  },
  progressBarBg: {
    height: 10,
    backgroundColor: '#ffffff33',
    borderRadius: 999,
    overflow: 'hidden',
  },
  progressBarFill: {
    height: '100%',
    backgroundColor: colors.accent,
  },
  progressText: {
    color: '#fff',
    marginTop: spacing.sm,
    fontSize: 13,
    fontWeight: '600',
  },
  heroActions: {
    flexDirection: 'row',
    marginTop: spacing.lg,
    gap: spacing.md,
  },
  heroButton: {
    flex: 1,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.text,
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.lg,
    paddingBottom: spacing.sm,
  },
  list: {
    paddingHorizontal: spacing.lg,
    paddingBottom: spacing.xl,
  },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.card,
    borderRadius: radii.md,
    padding: spacing.md,
    marginBottom: spacing.md,
    shadowColor: '#000',
    shadowOpacity: 0.06,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 4 },
    elevation: 2,
  },
  cardPressed: {
    opacity: 0.85,
  },
  cardEmoji: {
    fontSize: 16,
    fontWeight: '800',
    color: colors.primary,
    width: 44,
    textAlign: 'center',
    marginRight: spacing.md,
  },
  cardBody: {
    flex: 1,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.text,
  },
  cardDescription: {
    fontSize: 13,
    color: colors.textMuted,
    marginTop: 2,
  },
  cardMeta: {
    fontSize: 12,
    color: colors.primary,
    marginTop: spacing.xs,
    fontWeight: '600',
  },
});
