import { Module, Track, Lesson } from './types';
import { MODULE_01_METADATA } from './module01Data';
import { MODULE_02_METADATA } from './module02Data';
import { MODULE_03_METADATA } from './module03Data';
import { MODULE_04_METADATA } from './module04Data';
import { MODULE_05_METADATA } from './module05Data';
import { MODULE_06_METADATA } from './module06Data';
import { MODULE_07_METADATA } from './module07Data';
import { MODULE_08_METADATA } from './module08Data';
import { MODULE_09_METADATA } from './module09Data';
import { MODULE_10_METADATA } from './module10Data';

export const LEARNING_TRACKS: Track[] = [
  {
    id: 'track-foundations',
    title: 'Foundations of Machine Learning',
    description: 'Master core paradigms, datasets, features, targets, and the ML pipeline from first principles.',
    level: 'Beginner',
    color: '#00f0ff',
    modulesCount: 7,
    estimatedWeeks: 2,
  },
  {
    id: 'track-math',
    title: 'Mathematics & Optimization',
    description: 'Build intuitive, visual fluency in vectors, matrices, loss landscapes, and gradient descent.',
    level: 'Beginner',
    color: '#38bdf8',
    modulesCount: 2,
    estimatedWeeks: 3,
  },
  {
    id: 'track-classical',
    title: 'Supervised Learning Mastery',
    description: 'From Linear Regression to Decision Trees and Ensembles with scikit-learn implementation.',
    level: 'Intermediate',
    color: '#a855f7',
    modulesCount: 2,
    estimatedWeeks: 4,
  },
  {
    id: 'track-neural',
    title: 'Neural Networks & Deep Learning',
    description: 'Demystify artificial neurons, activation functions, forward propagation, and backprop calculus.',
    level: 'Intermediate',
    color: '#ec4899',
    modulesCount: 2,
    estimatedWeeks: 4,
  },
  {
    id: 'track-unsupervised',
    title: 'Unsupervised Learning & Clustering',
    description: 'Discover hidden latent patterns, K-Means clustering, and Principal Component Analysis.',
    level: 'Intermediate',
    color: '#10b981',
    modulesCount: 1,
    estimatedWeeks: 2,
  },
  {
    id: 'track-evaluation',
    title: 'Production Evaluation & Validation',
    description: 'Precision, recall, ROC-AUC, bias-variance tradeoff, cross-validation, and avoiding data leakage.',
    level: 'Advanced',
    color: '#f59e0b',
    modulesCount: 3,
    estimatedWeeks: 2,
  },
];

export const MODULES_DATA: Module[] = [
  MODULE_01_METADATA,
  MODULE_02_METADATA,
  MODULE_03_METADATA,
  MODULE_04_METADATA,
  MODULE_05_METADATA,
  MODULE_06_METADATA,
  MODULE_07_METADATA,
  MODULE_08_METADATA,
  MODULE_09_METADATA,
  MODULE_10_METADATA,
];

export const ALL_LESSONS: Lesson[] = MODULES_DATA.flatMap(m => m.lessons);

export function getModuleById(id: string): Module | undefined {
  return MODULES_DATA.find(m => m.id === id || m.slug === id);
}

export function getLessonById(id: string): Lesson | undefined {
  return ALL_LESSONS.find(l => l.id === id || l.slug === id);
}

export function getNextAndPrevLesson(currentLessonId: string): { prev?: Lesson; next?: Lesson } {
  const index = ALL_LESSONS.findIndex(l => l.id === currentLessonId || l.slug === currentLessonId);
  if (index === -1) return {};
  return {
    prev: index > 0 ? ALL_LESSONS[index - 1] : undefined,
    next: index < ALL_LESSONS.length - 1 ? ALL_LESSONS[index + 1] : undefined,
  };
}

