export type WordSeed = {
  id: string;
  german: string;
};

export type CategorySeed = {
  id: string;
  title: string;
  description: string;
  emoji: string;
  words: WordSeed[];
};

export const categories: CategorySeed[] = [
  {
    id: 'greetings',
    title: 'Greetings & Basics',
    description: 'Say hello, goodbye, and be polite',
    emoji: 'HI',
    words: [
      { id: 'g1', german: 'Hallo' },
      { id: 'g2', german: 'Guten Morgen' },
      { id: 'g3', german: 'Guten Tag' },
      { id: 'g4', german: 'Guten Abend' },
      { id: 'g5', german: 'Gute Nacht' },
      { id: 'g6', german: 'Tschüss' },
      { id: 'g7', german: 'Auf Wiedersehen' },
      { id: 'g8', german: 'Bitte' },
      { id: 'g9', german: 'Danke' },
      { id: 'g10', german: 'Entschuldigung' },
      { id: 'g11', german: 'Ja' },
      { id: 'g12', german: 'Nein' },
    ],
  },
  {
    id: 'numbers',
    title: 'Numbers',
    description: 'Count from one to twenty',
    emoji: '123',
    words: [
      { id: 'n1', german: 'eins' },
      { id: 'n2', german: 'zwei' },
      { id: 'n3', german: 'drei' },
      { id: 'n4', german: 'vier' },
      { id: 'n5', german: 'fünf' },
      { id: 'n6', german: 'sechs' },
      { id: 'n7', german: 'sieben' },
      { id: 'n8', german: 'acht' },
      { id: 'n9', german: 'neun' },
      { id: 'n10', german: 'zehn' },
      { id: 'n11', german: 'elf' },
      { id: 'n12', german: 'zwölf' },
      { id: 'n13', german: 'dreizehn' },
      { id: 'n14', german: 'zwanzig' },
      { id: 'n15', german: 'hundert' },
    ],
  },
  {
    id: 'colors',
    title: 'Colors',
    description: 'Describe the world around you',
    emoji: 'ART',
    words: [
      { id: 'c1', german: 'rot' },
      { id: 'c2', german: 'blau' },
      { id: 'c3', german: 'grün' },
      { id: 'c4', german: 'gelb' },
      { id: 'c5', german: 'schwarz' },
      { id: 'c6', german: 'weiß' },
      { id: 'c7', german: 'orange' },
      { id: 'c8', german: 'lila' },
      { id: 'c9', german: 'braun' },
      { id: 'c10', german: 'grau' },
      { id: 'c11', german: 'rosa' },
    ],
  },
  {
    id: 'food',
    title: 'Food & Drink',
    description: 'Order at a restaurant with confidence',
    emoji: 'EAT',
    words: [
      { id: 'f1', german: 'das Brot' },
      { id: 'f2', german: 'der Käse' },
      { id: 'f3', german: 'das Wasser' },
      { id: 'f4', german: 'der Apfel' },
      { id: 'f5', german: 'der Kaffee' },
      { id: 'f6', german: 'der Tee' },
      { id: 'f7', german: 'das Bier' },
      { id: 'f8', german: 'die Milch' },
      { id: 'f9', german: 'das Ei' },
      { id: 'f10', german: 'der Fisch' },
      { id: 'f11', german: 'das Fleisch' },
      { id: 'f12', german: 'der Zucker' },
    ],
  },
  {
    id: 'family',
    title: 'Family',
    description: 'Talk about the people you love',
    emoji: 'FAM',
    words: [
      { id: 'fa1', german: 'die Mutter' },
      { id: 'fa2', german: 'der Vater' },
      { id: 'fa3', german: 'die Schwester' },
      { id: 'fa4', german: 'der Bruder' },
      { id: 'fa5', german: 'die Tochter' },
      { id: 'fa6', german: 'der Sohn' },
      { id: 'fa7', german: 'die Großmutter' },
      { id: 'fa8', german: 'der Großvater' },
      { id: 'fa9', german: 'die Tante' },
      { id: 'fa10', german: 'der Onkel' },
    ],
  },
  {
    id: 'verbs',
    title: 'Common Verbs',
    description: 'Action words you will use every day',
    emoji: 'DO',
    words: [
      { id: 'v1', german: 'sein' },
      { id: 'v2', german: 'haben' },
      { id: 'v3', german: 'gehen' },
      { id: 'v4', german: 'kommen' },
      { id: 'v5', german: 'machen' },
      { id: 'v6', german: 'sagen' },
      { id: 'v7', german: 'sehen' },
      { id: 'v8', german: 'essen' },
      { id: 'v9', german: 'trinken' },
      { id: 'v10', german: 'sprechen' },
      { id: 'v11', german: 'lernen' },
      { id: 'v12', german: 'arbeiten' },
    ],
  },
  {
    id: 'travel',
    title: 'Travel & Places',
    description: 'Find your way around a German city',
    emoji: 'GO',
    words: [
      { id: 't1', german: 'der Bahnhof' },
      { id: 't2', german: 'der Flughafen' },
      { id: 't3', german: 'das Hotel' },
      { id: 't4', german: 'die Straße' },
      { id: 't5', german: 'die Stadt' },
      { id: 't6', german: 'das Dorf' },
      { id: 't7', german: 'links' },
      { id: 't8', german: 'rechts' },
      { id: 't9', german: 'geradeaus' },
      { id: 't10', german: 'der Zug' },
      { id: 't11', german: 'das Auto' },
      { id: 't12', german: 'das Fahrrad' },
    ],
  },
];

export const findCategory = (id: string) =>
  categories.find((category) => category.id === id);

export const allSeeds = (): WordSeed[] =>
  categories.flatMap((category) => category.words);
