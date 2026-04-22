import { useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import { colors, radii, spacing } from '../theme';
import type { EnrichedWord } from '../hooks/useWordEntries';

type Props = {
  word: EnrichedWord;
};

export default function Flashcard({ word }: Props) {
  const [flipped, setFlipped] = useState(false);

  return (
    <Pressable
      onPress={() => setFlipped((prev) => !prev)}
      style={({ pressed }) => [styles.card, pressed && styles.pressed]}
    >
      {flipped ? (
        <View style={styles.face}>
          <Text style={styles.label}>English</Text>
          <Text style={styles.word}>{word.english}</Text>
          {word.exampleTranslation && (
            <Text style={styles.example}>{word.exampleTranslation}</Text>
          )}
        </View>
      ) : (
        <View style={styles.face}>
          <Text style={styles.label}>Deutsch</Text>
          <Text style={styles.word}>{word.german}</Text>
          {word.example && <Text style={styles.example}>{word.example}</Text>}
        </View>
      )}
      <Text style={styles.hint}>
        Tap to flip • {word.source === 'cache' ? 'cached' : `via ${word.source}`}
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.card,
    borderRadius: radii.lg,
    paddingVertical: spacing.xl,
    paddingHorizontal: spacing.lg,
    minHeight: 260,
    justifyContent: 'space-between',
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 6 },
    elevation: 3,
  },
  pressed: {
    opacity: 0.9,
  },
  face: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.textMuted,
    textTransform: 'uppercase',
    letterSpacing: 1.2,
    marginBottom: spacing.md,
  },
  word: {
    fontSize: 36,
    fontWeight: '800',
    color: colors.text,
    textAlign: 'center',
  },
  example: {
    marginTop: spacing.lg,
    fontSize: 16,
    color: colors.textMuted,
    textAlign: 'center',
    fontStyle: 'italic',
  },
  hint: {
    marginTop: spacing.md,
    textAlign: 'center',
    color: colors.textMuted,
    fontSize: 12,
  },
});
