# Learn German

A React Native (Expo + TypeScript) app for learning German vocabulary through flashcards and quizzes.

## Features

- **Categorized German word seeds**: Greetings, numbers, colors, food, family, verbs, and travel.
- **Live translations**: English meanings fetched from the public [MyMemory Translation API](https://mymemory.translated.net/doc/spec.php) — no API key required.
- **Example sentences**: Pulled from the [Tatoeba open corpus](https://tatoeba.org/) (`deu → eng`).
- **Cached locally**: Results are stored in AsyncStorage for 30 days, so lessons work offline after a first visit.
- **Multiple-choice quizzes**: Category-specific or mixed across all vocabulary.
- **Progress tracking**: Learned-word count per category, recent quiz history, and a reset button that also clears the translation cache.

## Getting started

```bash
npm install
npm run start
```

Then press `i` for iOS simulator, `a` for Android, or `w` for web. You can also scan the Expo Go QR code on a physical device.

## Third-party APIs

| Source | Endpoint | Purpose |
| --- | --- | --- |
| MyMemory | `https://api.mymemory.translated.net/get?q=<de>&langpair=de|en` | Translate each German seed into English |
| Tatoeba | `https://tatoeba.org/en/api_v0/search?from=deu&to=eng&query=<de>` | Fetch a real example sentence with its English translation |

Both are free and require no credentials. The app batches requests serially from `useWordEntries`, dedupes in-flight calls, and persists responses to AsyncStorage.

## Project structure

```
App.tsx                   Navigation container entry
src/
  api/languageService.ts  MyMemory + Tatoeba fetchers with cache
  components/             Flashcard and PrimaryButton
  data/vocabulary.ts      German word seeds organized by category
  hooks/useWordEntries.ts Progressive API-backed data hook
  navigation/             React Navigation stack setup
  screens/                Home, Category, Lesson, Quiz, Progress
  storage/progress.ts     AsyncStorage for learned words + quiz history
  theme.ts                Shared colors, spacing, radii
```

## Type checking

```bash
npm run typecheck
```
