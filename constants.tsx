
import { Difficulty, Theme } from './types';

export const DIFFICULTY_CONFIG = {
  [Difficulty.EASY]: { pairs: 6, gridCols: 'grid-cols-4' },
  [Difficulty.MEDIUM]: { pairs: 10, gridCols: 'grid-cols-5' },
  [Difficulty.HARD]: { pairs: 15, gridCols: 'grid-cols-6' },
};

export const THEME_DATA = {
  [Theme.EMOJIS]: ['😀', '😎', '🍕', '🚀', '⭐', '🎈', '🎨', '🎸', '🎮', '🍦', '🍩', '🚗', '🌈', '💎', '🔥'],
  [Theme.ANIMALS]: ['🐶', '🐱', '🦁', '🦊', '🐻', '🐨', '🐼', '🐹', '🐰', '🐯', '🦒', '🦓', '🐘', '🦏', '🐧'],
  [Theme.NATURE]: ['🌵', '🌲', '🌻', '🌸', '🍁', '🍄', '🌍', '🌊', '☀️', '🌕', '🌦️', '⚡', '🔥', '🌴', '🍀'],
  [Theme.TECH]: ['💻', '📱', '⌨️', '🔋', '🔌', '📡', '🛰️', '🛠️', '⚙️', '🖥️', '💿', '💾', '⌚', '🕹️', '📷'],
};

// SQA_PHASES documentation for ProjectDocs component
export const SQA_PHASES = [
  {
    title: 'Requirement Analysis',
    icon: '📋',
    description: 'Defining user expectations and project goals.',
    details: [
      'Identified core memory game mechanics (matching, scoring, timing).',
      'Established target audience: Cognitive training enthusiasts.',
      'Defined performance metrics: moves count and completion time.'
    ]
  },
  {
    title: 'System Design',
    icon: '📐',
    description: 'Architecting the application structure and UI/UX.',
    details: [
      'Component-based architecture using React.',
      'Responsive grid layout for various difficulty levels.',
      'State management strategy for game logic and timer.'
    ]
  },
  {
    title: 'Implementation',
    icon: '💻',
    description: 'Translating designs into functional code.',
    details: [
      'Developed card matching algorithm with Fisher-Yates shuffle.',
      'Integrated Tailwind CSS for modern, aesthetic styling.',
      'Implemented custom hooks for timer and game state control.'
    ]
  },
  {
    title: 'AI Integration',
    icon: '🧠',
    description: 'Enhancing user experience with Gemini API.',
    details: [
      'Integrated @google/genai for post-game performance analysis.',
      'Context-aware prompt engineering for coach-like insights.',
      'Asynchronous data fetching with robust error handling.'
    ]
  },
  {
    title: 'Quality Assurance',
    icon: '🛡️',
    description: 'Ensuring software reliability and performance.',
    details: [
      'Verified state consistency during rapid card clicking.',
      'Tested responsiveness across different screen sizes.',
      'Validated memory leak prevention in timer cleanup.'
    ]
  }
];
