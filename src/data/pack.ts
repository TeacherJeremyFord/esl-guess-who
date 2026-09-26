export interface VocabCard {
  id: string;
  word: string;
  emoji: string;
}

// Placeholder vocab pack per IMA-13 scope — one embedded pack, no content
// pipeline yet. Real packs load from mods/ per game-design.md §2.
export const ANIMALS_PACK: VocabCard[] = [
  { id: "cat", word: "Cat", emoji: "\u{1F431}" },
  { id: "dog", word: "Dog", emoji: "\u{1F436}" },
  { id: "fish", word: "Fish", emoji: "\u{1F41F}" },
  { id: "bird", word: "Bird", emoji: "\u{1F426}" },
  { id: "lion", word: "Lion", emoji: "\u{1F981}" },
  { id: "elephant", word: "Elephant", emoji: "\u{1F418}" },
  { id: "monkey", word: "Monkey", emoji: "\u{1F412}" },
  { id: "rabbit", word: "Rabbit", emoji: "\u{1F430}" },
  { id: "bear", word: "Bear", emoji: "\u{1F43B}" },
  { id: "frog", word: "Frog", emoji: "\u{1F438}" },
  { id: "pig", word: "Pig", emoji: "\u{1F437}" },
  { id: "cow", word: "Cow", emoji: "\u{1F42E}" },
  { id: "duck", word: "Duck", emoji: "\u{1F986}" },
  { id: "horse", word: "Horse", emoji: "\u{1F434}" },
  { id: "tiger", word: "Tiger", emoji: "\u{1F42F}" },
  { id: "penguin", word: "Penguin", emoji: "\u{1F427}" },
];
