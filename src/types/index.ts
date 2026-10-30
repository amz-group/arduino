export type Language = 'en' | 'ku';

export type PageId =
  | 'home'
  | 'academy'
  | 'components'
  | 'simulator'
  | 'editor'
  | 'ai'
  | 'circuit-to-code'
  | 'projects'
  | 'pinout'
  | 'calculators'
  | 'quiz'
  | 'troubleshooting'
  | 'community'
  | 'dashboard';

export interface Lesson {
  id: string;
  level: 'beginner' | 'intermediate' | 'advanced';
  title: string;
  titleKu: string;
  shortDesc: string;
  shortDescKu: string;
  duration: string;
  objectives: string[];
  objectivesKu: string[];
  content: string;
  contentKu: string;
  circuitInfo?: {
    board: string;
    parts: string[];
    wiring: Array<{ from: string; to: string; note?: string }>;
  };
  codeSnippet?: string;
  exercisePrompt: string;
  exercisePromptKu: string;
  miniQuiz: {
    question: string;
    questionKu: string;
    options: string[];
    optionsKu: string[];
    correctIndex: number;
    explanation: string;
    explanationKu: string;
  };
}

export interface ComponentItem {
  id: string;
  name: string;
  category: string;
  categoryKu: string;
  image: string;
  description: string;
  descriptionKu: string;
  operatingVoltage: string;
  currentDraw: string;
  workingPrinciple: string;
  workingPrincipleKu: string;
  pinout: Array<{ pin: string; function: string; functionKu: string }>;
  wiringTip: string;
  wiringTipKu: string;
  exampleCode: string;
  relatedProjects: string[];
  datasheetUrl?: string;
}

export interface ProjectItem {
  id: string;
  title: string;
  titleKu: string;
  level: 'beginner' | 'intermediate' | 'advanced';
  category: string;
  categoryKu: string;
  image: string;
  summary: string;
  summaryKu: string;
  difficultyRating: number; // 1-5
  estimatedCost: string;
  timeNeeded: string;
  components: Array<{ name: string; quantity: number }>;
  circuitSummary: string;
  circuitSummaryKu: string;
  wiringSteps: string[];
  wiringStepsKu: string[];
  code: string;
  testingSteps: string[];
  testingStepsKu: string[];
  troubleshootingTips: string[];
  troubleshootingTipsKu: string[];
}

export interface BoardPin {
  pin: string;
  name: string;
  type: 'digital' | 'analog' | 'pwm' | 'power' | 'ground' | 'communication';
  voltage: string;
  protocols?: string[]; // I2C, SPI, UART, ADC, DAC
  description: string;
  descriptionKu: string;
  exampleCode?: string;
  x?: number; // visual coordinate
  y?: number;
  side?: 'left' | 'right' | 'top' | 'bottom';
}

export interface BoardPinout {
  id: string;
  name: string;
  chip: string;
  voltage: string;
  clockSpeed: string;
  flashMemory: string;
  sram: string;
  pins: BoardPin[];
}

export interface QuizQuestion {
  id: string;
  level: 'beginner' | 'intermediate' | 'advanced';
  question: string;
  questionKu: string;
  type: 'multiple-choice' | 'true-false' | 'circuit-id';
  codeSnippet?: string;
  options: string[];
  optionsKu: string[];
  correctIndex: number;
  explanation: string;
  explanationKu: string;
}

export interface TroubleshootingItem {
  id: string;
  title: string;
  titleKu: string;
  category: 'connection' | 'compilation' | 'upload' | 'hardware' | 'power' | 'libraries';
  categoryKu: string;
  severity: 'high' | 'medium' | 'low';
  symptoms: string[];
  symptomsKu: string[];
  possibleCauses: string[];
  possibleCausesKu: string[];
  stepsToFix: string[];
  stepsToFixKu: string[];
  codeFix?: string;
}

export interface UserAchievement {
  id: string;
  title: string;
  titleKu: string;
  desc: string;
  descKu: string;
  icon: string;
  unlockedAt?: string;
}

export interface UserProfile {
  name: string;
  email: string;
  title: string;
  xp: number;
  level: number;
  streakDays: number;
  completedLessons: string[];
  savedProjects: string[];
  savedCode: Array<{ id: string; title: string; code: string; date: string }>;
  quizScores: Record<string, number>;
  achievements: string[];
}
