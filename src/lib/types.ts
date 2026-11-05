export type Difficulty = 'Beginner' | 'Intermediate' | 'Advanced';

export interface StudentProfile {
  id: string;
  email: string;
  fullName?: string;
  avatarUrl?: string;
}

export interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
  hint?: string;
}

export interface FormulaBreakdown {
  id: string;
  symbol: string;
  name: string;
  description: string;
}

export interface MathFormula {
  title: string;
  latex: string;
  plainText: string;
  explanation: string;
  breakdown: FormulaBreakdown[];
}

export interface InteractiveSimulationConfig {
  type: 'regression' | 'classification' | 'neural-net' | 'clustering' | 'gradient-descent';
  title: string;
  description: string;
  defaultParams: Record<string, number | string>;
}

export interface Lesson {
  id: string;
  moduleId: string;
  title: string;
  slug: string;
  estimatedMinutes: number;
  conceptSummary: string;
  simpleDefinition?: string;
  whyItExists?: string;
  howItWorks?: string[];
  practicalExamples?: string[];
  commonMisconceptions?: Array<{ myth: string; reality: string }>;
  interactiveExperienceType?:
  | 'animated-3d-pipeline'
  | 'prog-vs-ml'
  | 'house-price'
  | 'spam-detector'
  | 'ai-ml-dl-hierarchy'
  | 'feature-target'
  | 'function-approx'
  | 'dataset-inspector'
  | 'train-test-val-splitter'
  | 'parametric-vs-nonparametric'
  | 'model-complexity-tradeoff'
  | 'no-free-lunch-arena'
  | 'mse-calculator'
  | 'bias-variance-dartboard'
  | 'underfit-overfit-curve'
  | 'bias-variance-tradeoff-curve'
  | 'irreducible-error-simulator'
  | 'eda-dashboard'
  | 'distribution-explorer'
  | 'outlier-detector'
  | 'missing-value-explorer'
  | 'correlation-explorer'
  | 'raw-data-cleaning'
  | 'encoding-playground'
  | 'feature-scaling-lab'
  | 'data-leakage-demo'
  | 'chart-playground'
  | 'chart-selection-guide'
  | 'chart-interpretation-lab'
  | 'pair-plot-matrix'
  | 'ml-workflow-map'
  | 'model-selection-simulator'
  | 'train-test-split-explorer'
  | 'kfold-cross-validation'
  | 'hyperparameter-tuning-lab'
  | 'workflow-checklist'
  | 'problem-type-game'
  | 'knn-classification-playground'
  | 'distance-calculator'
  | 'knn-regression-visualizer'
  | 'algorithm-comparison-matrix'
  | 'decision-boundary-visualizer'
  | 'confusion-matrix-simulator'
  | 'metric-calculator'
  | 'threshold-simulator'
  | 'precision-recall-explorer'
  | 'regression-metric-lab'
  | 'model-comparison-lab'
  | 'project-lab';
  realWorldExample: {
    domain: string;
    scenario: string;
    impact: string;
  };
  keyTakeaways: string[];
  visualDiagramType?: 'flow' | 'architecture' | 'comparison' | 'matrix';
  visualDiagramData?: {
    nodes: Array<{ id: string; label: string; description: string; type?: 'input' | 'process' | 'output' }>;
    connections: Array<{ from: string; to: string; label?: string }>;
  };
  mathematics?: MathFormula;
  pythonSnippet: {
    title: string;
    code: string;
    explanation: string;
    expectedOutput: string;
  };
  simulation?: InteractiveSimulationConfig;
  knowledgeCheck: QuizQuestion[];
  revisionNotes: string[];
}

export interface Module {
  id: string;
  trackId: string;
  title: string;
  slug: string;
  level: Difficulty;
  category: string;
  iconName: string;
  shortDescription: string;
  description: string;
  estimatedHours: number;
  prerequisites: string[];
  objectives: string[];
  lessons: Lesson[];
  finalQuiz: QuizQuestion[];
  badgeReward: {
    id: string;
    title: string;
    icon: string;
    description: string;
  };
}

export interface Track {
  id: string;
  title: string;
  description: string;
  level: Difficulty;
  color: string;
  modulesCount: number;
  estimatedWeeks: number;
}

export interface UserProgressState {
  completedLessons: string[]; // lesson IDs
  completedModules: string[]; // module IDs
  bookmarkedLessons: string[]; // lesson IDs
  notes: Record<string, string>; // lessonId -> note string
  quizScores: Record<string, { score: number; total: number; timestamp: string }>; // quizId -> score info
  streakDays: number;
  lastActiveDate: string;
  weeklyActivity: Array<{ day: string; lessonsCount: number; minutes: number }>;
  earnedBadges: string[]; // badge IDs
  theme: 'dark' | 'light';
  currentModuleId: string;
  currentLessonId: string;
  // Auth state
  user?: StudentProfile | null;
}
