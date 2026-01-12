
export enum Difficulty {
  EASY = 'EASY',
  MEDIUM = 'MEDIUM',
  HARD = 'HARD'
}

export enum Theme {
  EMOJIS = 'EMOJIS',
  ANIMALS = 'ANIMALS',
  NATURE = 'NATURE',
  TECH = 'TECH'
}

export interface Card {
  id: string;
  value: string;
  isFlipped: boolean;
  isMatched: boolean;
}

export interface GameState {
  cards: Card[];
  moves: number;
  timer: number;
  isComplete: boolean;
  difficulty: Difficulty;
  theme: Theme;
}
