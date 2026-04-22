import AsyncStorage from '@react-native-async-storage/async-storage';

const LEARNED_KEY = '@learn-german/learned-words';
const QUIZ_KEY = '@learn-german/quiz-history';

export type QuizResult = {
  date: string;
  categoryId: string;
  score: number;
  total: number;
};

export async function getLearnedWords(): Promise<string[]> {
  try {
    const raw = await AsyncStorage.getItem(LEARNED_KEY);
    return raw ? (JSON.parse(raw) as string[]) : [];
  } catch {
    return [];
  }
}

export async function markWordLearned(wordId: string): Promise<string[]> {
  const current = await getLearnedWords();
  if (current.includes(wordId)) return current;
  const updated = [...current, wordId];
  await AsyncStorage.setItem(LEARNED_KEY, JSON.stringify(updated));
  return updated;
}

export async function resetProgress(): Promise<void> {
  await AsyncStorage.multiRemove([LEARNED_KEY, QUIZ_KEY]);
}

export async function getQuizHistory(): Promise<QuizResult[]> {
  try {
    const raw = await AsyncStorage.getItem(QUIZ_KEY);
    return raw ? (JSON.parse(raw) as QuizResult[]) : [];
  } catch {
    return [];
  }
}

export async function saveQuizResult(result: QuizResult): Promise<QuizResult[]> {
  const history = await getQuizHistory();
  const updated = [result, ...history].slice(0, 50);
  await AsyncStorage.setItem(QUIZ_KEY, JSON.stringify(updated));
  return updated;
}
