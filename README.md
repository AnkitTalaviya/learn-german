# Learn German

A React Native (Expo + TypeScript) app for learning German vocabulary through flashcards and quizzes.

## Features

- **Categorized vocabulary**: Greetings, numbers, colors, food, family, verbs, and travel.
- **Flashcards**: Tap to flip between German and English, with example sentences where available.
- **Multiple-choice quizzes**: Category-specific or mixed across all vocabulary.
- **Progress tracking**: Learned-word count per category, history of recent quiz results, and reset.

## Getting started

```bash
npm install
npm run start
```

Then press `i` for iOS simulator, `a` for Android, or `w` for web. You can also scan the Expo Go QR code on a physical device.

## Project structure

```
App.tsx                 Navigation container entry
src/
  components/           Flashcard and PrimaryButton
  data/vocabulary.ts    Word lists organized by category
  navigation/           React Navigation stack setup
  screens/              Home, Category, Lesson, Quiz, Progress
  storage/progress.ts   AsyncStorage-backed learned words + quiz history
  theme.ts              Shared colors, spacing, radii
```

## Type checking

```bash
npm run typecheck
```
