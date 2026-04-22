import AsyncStorage from '@react-native-async-storage/async-storage';

const CACHE_KEY = '@learn-german/word-cache-v1';
const CACHE_TTL_MS = 1000 * 60 * 60 * 24 * 30; // 30 days

export type WordEntry = {
  german: string;
  english: string;
  example?: string;
  exampleTranslation?: string;
  source: 'mymemory' | 'tatoeba' | 'cache';
  fetchedAt: number;
};

type CacheShape = Record<string, WordEntry>;

let memoryCache: CacheShape | null = null;
const inflight = new Map<string, Promise<WordEntry>>();

async function loadCache(): Promise<CacheShape> {
  if (memoryCache) return memoryCache;
  try {
    const raw = await AsyncStorage.getItem(CACHE_KEY);
    memoryCache = raw ? (JSON.parse(raw) as CacheShape) : {};
  } catch {
    memoryCache = {};
  }
  return memoryCache;
}

async function persistCache(cache: CacheShape): Promise<void> {
  memoryCache = cache;
  try {
    await AsyncStorage.setItem(CACHE_KEY, JSON.stringify(cache));
  } catch {
    // best-effort persistence; ignore failures
  }
}

function stripArticle(german: string): string {
  return german.replace(/^(der|die|das)\s+/i, '');
}

function isFresh(entry: WordEntry): boolean {
  return Date.now() - entry.fetchedAt < CACHE_TTL_MS;
}

async function fetchTranslation(german: string): Promise<string> {
  const url = `https://api.mymemory.translated.net/get?q=${encodeURIComponent(german)}&langpair=de|en`;
  const response = await fetch(url);
  if (!response.ok) throw new Error(`Translation failed: ${response.status}`);
  const data = (await response.json()) as {
    responseData?: { translatedText?: string };
    matches?: Array<{ translation?: string; quality?: string | number }>;
  };
  const best = data.responseData?.translatedText?.trim();
  if (best && best.length > 0) return best;
  const fallback = data.matches?.find((m) => m.translation)?.translation;
  if (!fallback) throw new Error('No translation returned');
  return fallback;
}

async function fetchExample(
  german: string,
): Promise<{ example: string; translation: string } | undefined> {
  const query = stripArticle(german);
  const url = `https://tatoeba.org/en/api_v0/search?from=deu&to=eng&query=${encodeURIComponent(query)}&sort=relevance&trans_filter=limit&trans_to=eng`;
  try {
    const response = await fetch(url);
    if (!response.ok) return undefined;
    const data = (await response.json()) as {
      results?: Array<{
        text?: string;
        translations?: Array<Array<{ text?: string; lang?: string }>>;
      }>;
    };
    const hit = data.results?.find((r) => {
      const firstTranslation = r.translations?.flat().find((t) => t?.text);
      return r.text && firstTranslation?.text;
    });
    if (!hit) return undefined;
    const translation = hit.translations?.flat().find((t) => t?.text);
    if (!hit.text || !translation?.text) return undefined;
    return { example: hit.text, translation: translation.text };
  } catch {
    return undefined;
  }
}

export async function getWordEntry(german: string): Promise<WordEntry> {
  const cache = await loadCache();
  const existing = cache[german];
  if (existing && isFresh(existing)) {
    return { ...existing, source: 'cache' };
  }

  const pending = inflight.get(german);
  if (pending) return pending;

  const task = (async () => {
    const english = await fetchTranslation(german);
    const example = await fetchExample(german);
    const entry: WordEntry = {
      german,
      english,
      example: example?.example,
      exampleTranslation: example?.translation,
      source: example ? 'tatoeba' : 'mymemory',
      fetchedAt: Date.now(),
    };
    const next = { ...(await loadCache()), [german]: entry };
    await persistCache(next);
    return entry;
  })().finally(() => {
    inflight.delete(german);
  });

  inflight.set(german, task);
  return task;
}

export async function preloadWordEntries(
  germanWords: string[],
): Promise<WordEntry[]> {
  return Promise.all(germanWords.map((w) => getWordEntry(w)));
}

export async function clearWordCache(): Promise<void> {
  memoryCache = {};
  await AsyncStorage.removeItem(CACHE_KEY);
}
