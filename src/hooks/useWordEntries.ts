import { useEffect, useRef, useState } from 'react';

import { getWordEntry, WordEntry } from '../api/languageService';
import type { WordSeed } from '../data/vocabulary';

export type EnrichedWord = WordSeed & WordEntry;

type State = {
  entries: EnrichedWord[];
  loading: boolean;
  error: string | null;
};

export function useWordEntries(seeds: WordSeed[]): State {
  const [state, setState] = useState<State>({
    entries: [],
    loading: true,
    error: null,
  });
  const seedKey = seeds.map((s) => s.id).join('|');
  const mounted = useRef(true);

  useEffect(() => {
    mounted.current = true;
    return () => {
      mounted.current = false;
    };
  }, []);

  useEffect(() => {
    let cancelled = false;
    setState({ entries: [], loading: true, error: null });

    (async () => {
      const results: EnrichedWord[] = [];
      for (const seed of seeds) {
        try {
          const entry = await getWordEntry(seed.german);
          if (cancelled) return;
          results.push({ ...seed, ...entry });
          if (mounted.current) {
            setState({
              entries: [...results],
              loading: results.length < seeds.length,
              error: null,
            });
          }
        } catch (err) {
          if (cancelled) return;
          if (mounted.current) {
            setState((prev) => ({
              ...prev,
              loading: false,
              error: err instanceof Error ? err.message : 'Failed to load',
            }));
          }
          return;
        }
      }
      if (!cancelled && mounted.current) {
        setState({ entries: results, loading: false, error: null });
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [seedKey]);

  return state;
}
