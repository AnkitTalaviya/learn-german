export type Word = {
  id: string;
  german: string;
  english: string;
  example?: string;
  exampleTranslation?: string;
};

export type Category = {
  id: string;
  title: string;
  description: string;
  emoji: string;
  words: Word[];
};

export const categories: Category[] = [
  {
    id: 'greetings',
    title: 'Greetings & Basics',
    description: 'Say hello, goodbye, and be polite',
    emoji: 'HI',
    words: [
      { id: 'g1', german: 'Hallo', english: 'Hello', example: 'Hallo, wie geht es dir?', exampleTranslation: 'Hello, how are you?' },
      { id: 'g2', german: 'Guten Morgen', english: 'Good morning', example: 'Guten Morgen, Anna!', exampleTranslation: 'Good morning, Anna!' },
      { id: 'g3', german: 'Guten Tag', english: 'Good day', example: 'Guten Tag, Herr Schmidt.', exampleTranslation: 'Good day, Mr. Schmidt.' },
      { id: 'g4', german: 'Guten Abend', english: 'Good evening' },
      { id: 'g5', german: 'Gute Nacht', english: 'Good night' },
      { id: 'g6', german: 'Tschüss', english: 'Bye' },
      { id: 'g7', german: 'Auf Wiedersehen', english: 'Goodbye' },
      { id: 'g8', german: 'Bitte', english: 'Please / You’re welcome' },
      { id: 'g9', german: 'Danke', english: 'Thank you' },
      { id: 'g10', german: 'Entschuldigung', english: 'Excuse me / Sorry' },
      { id: 'g11', german: 'Ja', english: 'Yes' },
      { id: 'g12', german: 'Nein', english: 'No' },
    ],
  },
  {
    id: 'numbers',
    title: 'Numbers',
    description: 'Count from one to twenty',
    emoji: '123',
    words: [
      { id: 'n1', german: 'eins', english: 'one' },
      { id: 'n2', german: 'zwei', english: 'two' },
      { id: 'n3', german: 'drei', english: 'three' },
      { id: 'n4', german: 'vier', english: 'four' },
      { id: 'n5', german: 'fünf', english: 'five' },
      { id: 'n6', german: 'sechs', english: 'six' },
      { id: 'n7', german: 'sieben', english: 'seven' },
      { id: 'n8', german: 'acht', english: 'eight' },
      { id: 'n9', german: 'neun', english: 'nine' },
      { id: 'n10', german: 'zehn', english: 'ten' },
      { id: 'n11', german: 'elf', english: 'eleven' },
      { id: 'n12', german: 'zwölf', english: 'twelve' },
      { id: 'n13', german: 'dreizehn', english: 'thirteen' },
      { id: 'n14', german: 'zwanzig', english: 'twenty' },
      { id: 'n15', german: 'hundert', english: 'hundred' },
    ],
  },
  {
    id: 'colors',
    title: 'Colors',
    description: 'Describe the world around you',
    emoji: 'ART',
    words: [
      { id: 'c1', german: 'rot', english: 'red' },
      { id: 'c2', german: 'blau', english: 'blue' },
      { id: 'c3', german: 'grün', english: 'green' },
      { id: 'c4', german: 'gelb', english: 'yellow' },
      { id: 'c5', german: 'schwarz', english: 'black' },
      { id: 'c6', german: 'weiß', english: 'white' },
      { id: 'c7', german: 'orange', english: 'orange' },
      { id: 'c8', german: 'lila', english: 'purple' },
      { id: 'c9', german: 'braun', english: 'brown' },
      { id: 'c10', german: 'grau', english: 'gray' },
      { id: 'c11', german: 'rosa', english: 'pink' },
    ],
  },
  {
    id: 'food',
    title: 'Food & Drink',
    description: 'Order at a restaurant with confidence',
    emoji: 'EAT',
    words: [
      { id: 'f1', german: 'das Brot', english: 'the bread' },
      { id: 'f2', german: 'der Käse', english: 'the cheese' },
      { id: 'f3', german: 'das Wasser', english: 'the water' },
      { id: 'f4', german: 'der Apfel', english: 'the apple' },
      { id: 'f5', german: 'der Kaffee', english: 'the coffee' },
      { id: 'f6', german: 'der Tee', english: 'the tea' },
      { id: 'f7', german: 'das Bier', english: 'the beer' },
      { id: 'f8', german: 'die Milch', english: 'the milk' },
      { id: 'f9', german: 'das Ei', english: 'the egg' },
      { id: 'f10', german: 'der Fisch', english: 'the fish' },
      { id: 'f11', german: 'das Fleisch', english: 'the meat' },
      { id: 'f12', german: 'der Zucker', english: 'the sugar' },
    ],
  },
  {
    id: 'family',
    title: 'Family',
    description: 'Talk about the people you love',
    emoji: 'FAM',
    words: [
      { id: 'fa1', german: 'die Mutter', english: 'the mother' },
      { id: 'fa2', german: 'der Vater', english: 'the father' },
      { id: 'fa3', german: 'die Schwester', english: 'the sister' },
      { id: 'fa4', german: 'der Bruder', english: 'the brother' },
      { id: 'fa5', german: 'die Tochter', english: 'the daughter' },
      { id: 'fa6', german: 'der Sohn', english: 'the son' },
      { id: 'fa7', german: 'die Großmutter', english: 'the grandmother' },
      { id: 'fa8', german: 'der Großvater', english: 'the grandfather' },
      { id: 'fa9', german: 'die Tante', english: 'the aunt' },
      { id: 'fa10', german: 'der Onkel', english: 'the uncle' },
    ],
  },
  {
    id: 'verbs',
    title: 'Common Verbs',
    description: 'Action words you will use every day',
    emoji: 'DO',
    words: [
      { id: 'v1', german: 'sein', english: 'to be', example: 'Ich bin müde.', exampleTranslation: 'I am tired.' },
      { id: 'v2', german: 'haben', english: 'to have', example: 'Ich habe einen Hund.', exampleTranslation: 'I have a dog.' },
      { id: 'v3', german: 'gehen', english: 'to go' },
      { id: 'v4', german: 'kommen', english: 'to come' },
      { id: 'v5', german: 'machen', english: 'to make / do' },
      { id: 'v6', german: 'sagen', english: 'to say' },
      { id: 'v7', german: 'sehen', english: 'to see' },
      { id: 'v8', german: 'essen', english: 'to eat' },
      { id: 'v9', german: 'trinken', english: 'to drink' },
      { id: 'v10', german: 'sprechen', english: 'to speak' },
      { id: 'v11', german: 'lernen', english: 'to learn' },
      { id: 'v12', german: 'arbeiten', english: 'to work' },
    ],
  },
  {
    id: 'travel',
    title: 'Travel & Places',
    description: 'Find your way around a German city',
    emoji: 'GO',
    words: [
      { id: 't1', german: 'der Bahnhof', english: 'the train station' },
      { id: 't2', german: 'der Flughafen', english: 'the airport' },
      { id: 't3', german: 'das Hotel', english: 'the hotel' },
      { id: 't4', german: 'die Straße', english: 'the street' },
      { id: 't5', german: 'die Stadt', english: 'the city' },
      { id: 't6', german: 'das Dorf', english: 'the village' },
      { id: 't7', german: 'links', english: 'left' },
      { id: 't8', german: 'rechts', english: 'right' },
      { id: 't9', german: 'geradeaus', english: 'straight ahead' },
      { id: 't10', german: 'der Zug', english: 'the train' },
      { id: 't11', german: 'das Auto', english: 'the car' },
      { id: 't12', german: 'das Fahrrad', english: 'the bicycle' },
    ],
  },
];

export const findCategory = (id: string) =>
  categories.find((category) => category.id === id);

export const allWords = (): Word[] =>
  categories.flatMap((category) => category.words);
