export enum Dichotomy {
  IE = 'Introversion/Extraversion',
  SN = 'Sensing/Intuition',
  TF = 'Thinking/Feeling',
  JP = 'Judging/Perceiving',
}

export interface Question {
  text: string;
  dichotomy: Dichotomy;
  direction: 1 | -1;
}

export interface PersonalityInsights {
  title: string;
  overview: string;
  strengths: string[];
  weaknesses: string[];
  careerPaths: string[];
  relationships: string;
  personalGrowth: string[];
  famousFigures: string[];
  fictionalCharacters: string[];
  vibe: {
    color: string;
    aesthetic: string;
    description: string;
  };
  recommendations: {
    hobbies: string[];
    books: string[];
    movies: string[];
    music: string[];
  };
}

export type GameState = 'welcome' | 'quiz' | 'loading' | 'results';