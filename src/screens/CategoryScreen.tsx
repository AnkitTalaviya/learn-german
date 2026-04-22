import { useLayoutEffect } from 'react';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { FlatList, StyleSheet, Text, View } from 'react-native';

import { findCategory } from '../data/vocabulary';
import PrimaryButton from '../components/PrimaryButton';
import { colors, radii, spacing } from '../theme';
import type { RootStackParamList } from '../navigation/AppNavigator';

type Props = NativeStackScreenProps<RootStackParamList, 'Category'>;

export default function CategoryScreen({ navigation, route }: Props) {
  const category = findCategory(route.params.categoryId);

  useLayoutEffect(() => {
    navigation.setOptions({ title: category?.title ?? 'Category' });
  }, [navigation, category?.title]);

  if (!category) {
    return (
      <View style={styles.missing}>
        <Text style={styles.missingText}>Category not found.</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>{category.title}</Text>
        <Text style={styles.description}>{category.description}</Text>
        <View style={styles.actions}>
          <PrimaryButton
            title="Study flashcards"
            onPress={() =>
              navigation.navigate('Lesson', { categoryId: category.id })
            }
            style={styles.actionButton}
          />
          <PrimaryButton
            title="Take quiz"
            variant="secondary"
            onPress={() =>
              navigation.navigate('Quiz', { categoryId: category.id })
            }
            style={styles.actionButton}
          />
        </View>
      </View>

      <FlatList
        data={category.words}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.list}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
        renderItem={({ item }) => (
          <View style={styles.row}>
            <Text style={styles.german}>{item.german}</Text>
            <Text style={styles.english}>{item.english}</Text>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  missing: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  missingText: {
    color: colors.textMuted,
  },
  header: {
    padding: spacing.lg,
    backgroundColor: colors.card,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  title: {
    fontSize: 24,
    fontWeight: '800',
    color: colors.text,
  },
  description: {
    fontSize: 14,
    color: colors.textMuted,
    marginTop: spacing.xs,
  },
  actions: {
    flexDirection: 'row',
    gap: spacing.md,
    marginTop: spacing.lg,
  },
  actionButton: {
    flex: 1,
  },
  list: {
    padding: spacing.lg,
  },
  row: {
    backgroundColor: colors.card,
    padding: spacing.md,
    borderRadius: radii.md,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  separator: {
    height: spacing.sm,
  },
  german: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.text,
  },
  english: {
    fontSize: 14,
    color: colors.textMuted,
  },
});
