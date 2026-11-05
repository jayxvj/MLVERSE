'use client';

import React, { useState, useEffect } from 'react';
import { notFound, useParams } from 'next/navigation';
import Link from 'next/link';
import Sidebar from '@/components/layout/Sidebar';
import { getLessonById, getNextAndPrevLesson, getModuleById } from '@/lib/modulesData';
import { useStudent } from '@/lib/store';
import ConceptCard from '@/components/interactive/ConceptCard';
import InteractiveDiagram from '@/components/interactive/InteractiveDiagram';
import FormulaExplorer from '@/components/interactive/FormulaExplorer';
import CodePlayground from '@/components/interactive/CodePlayground';
import AlgorithmSimulator from '@/components/interactive/AlgorithmSimulator';
import QuizEngine from '@/components/interactive/QuizEngine';
import NotesEditor from '@/components/interactive/NotesEditor';
import LessonNavigation from '@/components/interactive/LessonNavigation';
import Flashcard from '@/components/interactive/Flashcard';
import Animated3DPipeline from '@/components/interactive/special/Animated3DPipeline';
import ProgVsMLComparison from '@/components/interactive/special/ProgVsMLComparison';
import HousePriceSimulator from '@/components/interactive/special/HousePriceSimulator';
import SpamDetectionSimulator from '@/components/interactive/special/SpamDetectionSimulator';
import AIMLHierarchy from '@/components/interactive/special/AIMLHierarchy';
import FeatureTargetExplorer from '@/components/interactive/special/FeatureTargetExplorer';
import FunctionApproxVisualizer from '@/components/interactive/special/FunctionApproxVisualizer';
import DatasetExplorer from '@/components/interactive/special/DatasetExplorer';
import DataSplitterSimulator from '@/components/interactive/special/DataSplitterSimulator';
import ParametricVsNonParametric from '@/components/interactive/special/ParametricVsNonParametric';
import ModelComplexityVisualizer from '@/components/interactive/special/ModelComplexityVisualizer';
import NoFreeLunchArena from '@/components/interactive/special/NoFreeLunchArena';
import MseCalculator from '@/components/interactive/special/MseCalculator';
import BiasVarianceDartboard from '@/components/interactive/special/BiasVarianceDartboard';
import UnderfitOverfitCurve from '@/components/interactive/special/UnderfitOverfitCurve';
import BiasVarianceTradeoffGraph from '@/components/interactive/special/BiasVarianceTradeoffGraph';
import IrreducibleErrorSimulator from '@/components/interactive/special/IrreducibleErrorSimulator';
import EdaDashboard from '@/components/interactive/special/EdaDashboard';
import DistributionExplorer from '@/components/interactive/special/DistributionExplorer';
import OutlierDetector from '@/components/interactive/special/OutlierDetector';
import MissingValueExplorer from '@/components/interactive/special/MissingValueExplorer';
import CorrelationExplorer from '@/components/interactive/special/CorrelationExplorer';
import RawDataCleaning from '@/components/interactive/special/RawDataCleaning';
import EncodingPlayground from '@/components/interactive/special/EncodingPlayground';
import FeatureScalingLab from '@/components/interactive/special/FeatureScalingLab';
import DataLeakageDemo from '@/components/interactive/special/DataLeakageDemo';
import ChartPlayground from '@/components/interactive/special/ChartPlayground';
import ChartSelectionGuide from '@/components/interactive/special/ChartSelectionGuide';
import ChartInterpretationLab from '@/components/interactive/special/ChartInterpretationLab';
import PairPlotMatrix from '@/components/interactive/special/PairPlotMatrix';
import MLWorkflowMap from '@/components/interactive/special/MLWorkflowMap';
import ModelSelectionSimulator from '@/components/interactive/special/ModelSelectionSimulator';
import TrainTestSplitExplorer from '@/components/interactive/special/TrainTestSplitExplorer';
import KFoldCrossValidation from '@/components/interactive/special/KFoldCrossValidation';
import HyperparameterTuningLab from '@/components/interactive/special/HyperparameterTuningLab';
import WorkflowChecklist from '@/components/interactive/special/WorkflowChecklist';
import ProblemTypeGame from '@/components/interactive/special/ProblemTypeGame';
import KnnClassificationPlayground from '@/components/interactive/special/KnnClassificationPlayground';
import DistanceCalculator from '@/components/interactive/special/DistanceCalculator';
import KnnRegressionVisualizer from '@/components/interactive/special/KnnRegressionVisualizer';
import AlgorithmComparisonMatrix from '@/components/interactive/special/AlgorithmComparisonMatrix';
import DecisionBoundaryVisualizer from '@/components/interactive/special/DecisionBoundaryVisualizer';
import ConfusionMatrixSimulator from '@/components/interactive/special/ConfusionMatrixSimulator';
import MetricCalculator from '@/components/interactive/special/MetricCalculator';
import ThresholdSimulator from '@/components/interactive/special/ThresholdSimulator';
import PrecisionRecallExplorer from '@/components/interactive/special/PrecisionRecallExplorer';
import RegressionMetricLab from '@/components/interactive/special/RegressionMetricLab';
import ModelComparisonLab from '@/components/interactive/special/ModelComparisonLab';
import ProjectLab from '@/components/interactive/special/ProjectLab';
import { 
  BookOpen, 
  Code, 
  Sigma, 
  HelpCircle, 
  FileText, 
  CheckCircle, 
  Sparkles, 
  Clock, 
  Layers, 
  Globe, 
  Zap,
  Sliders,
  Lightbulb,
  AlertTriangle,
  HelpCircle as QuestionIcon
} from 'lucide-react';

export default function InteractiveLessonPage() {
  const params = useParams();
  const lessonId = params?.lessonId as string;
  const lesson = getLessonById(lessonId);
  const { prev, next } = getNextAndPrevLesson(lessonId);
  const { state, setCurrentLesson } = useStudent();

  const [activeTab, setActiveTab] = useState<'concepts' | 'math' | 'code' | 'simulation' | 'quiz' | 'notes'>('concepts');

  useEffect(() => {
    if (lesson) {
      setCurrentLesson(lesson.moduleId, lesson.id);
    }
  }, [lesson]);

  if (!lesson) {
    return (
      <div className="flex">
        <Sidebar />
        <main className="flex-1 p-8 text-center text-slate-300">
          <h2 className="text-xl font-bold text-white">Lesson Not Found</h2>
          <Link href="/modules" className="mt-4 inline-block px-4 py-2 bg-cyan-500/20 text-cyan-300 rounded-lg text-xs">
            Return to Modules
          </Link>
        </main>
      </div>
    );
  }

  const module = getModuleById(lesson.moduleId);

  return (
    <div className="flex">
      <Sidebar />

      <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-5xl mx-auto space-y-6 overflow-y-auto pb-24">
        {/* Breadcrumb Header */}
        <div className="flex flex-wrap items-center justify-between gap-2 text-xs font-mono text-slate-400 border-b border-white/10 pb-3">
          <div className="flex items-center gap-2">
            <Link href="/modules" className="hover:text-cyan-400">Modules</Link>
            <span>/</span>
            {module && (
              <Link href={`/modules/${module.id}`} className="hover:text-cyan-400 truncate max-w-xs">
                {module.title}
              </Link>
            )}
            <span>/</span>
            <span className="text-white">{lesson.title}</span>
          </div>

          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1 text-slate-300">
              <Clock className="h-3.5 w-3.5 text-cyan-400" />
              <span>~{lesson.estimatedMinutes} mins</span>
            </span>
          </div>
        </div>

        {/* Lesson Hero */}
        <div className="rounded-2xl border border-electric-cyan/30 bg-gradient-to-r from-navy-950 via-navy-900 to-navy-950 p-6 sm:p-8 backdrop-blur-md shadow-glow">
          <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-xs font-mono text-cyan-300 mb-3">
            <Sparkles className="h-3 w-3" />
            <span>Interactive University Lesson</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-white leading-tight">
            {lesson.title}
          </h1>
          <p className="text-sm text-slate-300 mt-2 leading-relaxed max-w-3xl">
            {lesson.conceptSummary}
          </p>
        </div>

        {/* Lesson Content Tab Switcher */}
        <div className="flex items-center gap-1.5 p-1.5 rounded-xl bg-navy-950 border border-white/10 overflow-x-auto">
          {[
            { id: 'concepts', label: '1. Concepts & Diagrams', icon: Layers },
            { id: 'math', label: '2. Math Breakdown', icon: Sigma },
            { id: 'code', label: '3. Python Lab', icon: Code },
            { id: 'simulation', label: '4. Simulation', icon: Sliders },
            { id: 'quiz', label: '5. Assessment', icon: HelpCircle },
            { id: 'notes', label: '6. Personal Notes', icon: FileText },
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-mono font-medium whitespace-nowrap transition-all ${
                  isActive
                    ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-400 shadow-glow font-bold'
                    : 'text-slate-400 hover:text-white hover:bg-white/5'
                }`}
              >
                <Icon className="h-3.5 w-3.5" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Tab 1: Concepts & Diagrams */}
        {activeTab === 'concepts' && (
          <div className="space-y-6 animate-fadeIn">
            {/* Simple Definition */}
            {lesson.simpleDefinition && (
              <div className="p-4 rounded-xl border border-cyan-400/30 bg-cyan-950/20 backdrop-blur-md">
                <div className="flex items-center gap-2 text-xs font-mono text-cyan-400 font-bold mb-1">
                  <Lightbulb className="h-4 w-4" />
                  <span>PLAIN-ENGLISH INTUITIVE DEFINITION</span>
                </div>
                <p className="text-sm font-medium text-white leading-relaxed">
                  {lesson.simpleDefinition}
                </p>
              </div>
            )}

            {/* Special Interactive Experience */}
            {lesson.interactiveExperienceType === 'animated-3d-pipeline' && (
              <Animated3DPipeline />
            )}
            {lesson.interactiveExperienceType === 'prog-vs-ml' && (
              <ProgVsMLComparison />
            )}
            {lesson.interactiveExperienceType === 'house-price' && (
              <HousePriceSimulator />
            )}
            {lesson.interactiveExperienceType === 'spam-detector' && (
              <SpamDetectionSimulator />
            )}
            {lesson.interactiveExperienceType === 'ai-ml-dl-hierarchy' && (
              <AIMLHierarchy />
            )}
            {lesson.interactiveExperienceType === 'feature-target' && (
              <FeatureTargetExplorer />
            )}
            {lesson.interactiveExperienceType === 'function-approx' && (
              <FunctionApproxVisualizer />
            )}
            {lesson.interactiveExperienceType === 'dataset-inspector' && (
              <DatasetExplorer />
            )}
            {lesson.interactiveExperienceType === 'train-test-val-splitter' && (
              <DataSplitterSimulator />
            )}
            {lesson.interactiveExperienceType === 'parametric-vs-nonparametric' && (
              <ParametricVsNonParametric />
            )}
            {lesson.interactiveExperienceType === 'model-complexity-tradeoff' && (
              <ModelComplexityVisualizer />
            )}
            {lesson.interactiveExperienceType === 'no-free-lunch-arena' && (
              <NoFreeLunchArena />
            )}
            {lesson.interactiveExperienceType === 'mse-calculator' && (
              <MseCalculator />
            )}
            {lesson.interactiveExperienceType === 'bias-variance-dartboard' && (
              <BiasVarianceDartboard />
            )}
            {lesson.interactiveExperienceType === 'underfit-overfit-curve' && (
              <UnderfitOverfitCurve />
            )}
            {lesson.interactiveExperienceType === 'bias-variance-tradeoff-curve' && (
              <BiasVarianceTradeoffGraph />
            )}
            {lesson.interactiveExperienceType === 'irreducible-error-simulator' && (
              <IrreducibleErrorSimulator />
            )}
            {lesson.interactiveExperienceType === 'eda-dashboard' && (
              <EdaDashboard />
            )}
            {lesson.interactiveExperienceType === 'distribution-explorer' && (
              <DistributionExplorer />
            )}
            {lesson.interactiveExperienceType === 'outlier-detector' && (
              <OutlierDetector />
            )}
            {lesson.interactiveExperienceType === 'missing-value-explorer' && (
              <MissingValueExplorer />
            )}
            {lesson.interactiveExperienceType === 'correlation-explorer' && (
              <CorrelationExplorer />
            )}
            {lesson.interactiveExperienceType === 'raw-data-cleaning' && (
              <RawDataCleaning />
            )}
            {lesson.interactiveExperienceType === 'encoding-playground' && (
              <EncodingPlayground />
            )}
            {lesson.interactiveExperienceType === 'feature-scaling-lab' && (
              <FeatureScalingLab />
            )}
            {lesson.interactiveExperienceType === 'data-leakage-demo' && (
              <DataLeakageDemo />
            )}
            {lesson.interactiveExperienceType === 'chart-playground' && (
              <ChartPlayground />
            )}
            {lesson.interactiveExperienceType === 'chart-selection-guide' && (
              <ChartSelectionGuide />
            )}
            {lesson.interactiveExperienceType === 'chart-interpretation-lab' && (
              <ChartInterpretationLab />
            )}
            {lesson.interactiveExperienceType === 'pair-plot-matrix' && (
              <PairPlotMatrix />
            )}
            {lesson.interactiveExperienceType === 'ml-workflow-map' && (
              <MLWorkflowMap />
            )}
            {lesson.interactiveExperienceType === 'model-selection-simulator' && (
              <ModelSelectionSimulator />
            )}
            {lesson.interactiveExperienceType === 'train-test-split-explorer' && (
              <TrainTestSplitExplorer />
            )}
            {lesson.interactiveExperienceType === 'kfold-cross-validation' && (
              <KFoldCrossValidation />
            )}
            {lesson.interactiveExperienceType === 'hyperparameter-tuning-lab' && (
              <HyperparameterTuningLab />
            )}
            {lesson.interactiveExperienceType === 'workflow-checklist' && (
              <WorkflowChecklist />
            )}
            {lesson.interactiveExperienceType === 'problem-type-game' && (
              <ProblemTypeGame />
            )}
            {lesson.interactiveExperienceType === 'knn-classification-playground' && (
              <KnnClassificationPlayground />
            )}
            {lesson.interactiveExperienceType === 'distance-calculator' && (
              <DistanceCalculator />
            )}
            {lesson.interactiveExperienceType === 'knn-regression-visualizer' && (
              <KnnRegressionVisualizer />
            )}
            {lesson.interactiveExperienceType === 'algorithm-comparison-matrix' && (
              <AlgorithmComparisonMatrix />
            )}
            {lesson.interactiveExperienceType === 'decision-boundary-visualizer' && (
              <DecisionBoundaryVisualizer />
            )}
            {lesson.interactiveExperienceType === 'confusion-matrix-simulator' && (
              <ConfusionMatrixSimulator />
            )}
            {lesson.interactiveExperienceType === 'metric-calculator' && (
              <MetricCalculator />
            )}
            {lesson.interactiveExperienceType === 'threshold-simulator' && (
              <ThresholdSimulator />
            )}
            {lesson.interactiveExperienceType === 'precision-recall-explorer' && (
              <PrecisionRecallExplorer />
            )}
            {lesson.interactiveExperienceType === 'regression-metric-lab' && (
              <RegressionMetricLab />
            )}
            {lesson.interactiveExperienceType === 'model-comparison-lab' && (
              <ModelComparisonLab />
            )}
            {lesson.interactiveExperienceType === 'project-lab' && (
              <ProjectLab />
            )}

            {/* Why The Concept Exists & How It Works */}
            {(lesson.whyItExists || (lesson.howItWorks && lesson.howItWorks.length > 0)) && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {lesson.whyItExists && (
                  <div className="p-5 rounded-xl border border-white/10 bg-navy-950/70 space-y-2">
                    <div className="text-xs font-mono uppercase text-cyan-400 font-bold flex items-center gap-1.5">
                      <Zap className="h-3.5 w-3.5" />
                      <span>Why This Concept Exists</span>
                    </div>
                    <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                      {lesson.whyItExists}
                    </p>
                  </div>
                )}

                {lesson.howItWorks && lesson.howItWorks.length > 0 && (
                  <div className="p-5 rounded-xl border border-white/10 bg-navy-950/70 space-y-2">
                    <div className="text-xs font-mono uppercase text-purple-400 font-bold flex items-center gap-1.5">
                      <Layers className="h-3.5 w-3.5" />
                      <span>How It Works In Practice</span>
                    </div>
                    <ul className="space-y-1.5 text-xs text-slate-300">
                      {lesson.howItWorks.map((step, idx) => (
                        <li key={idx} className="flex items-start gap-2">
                          <span className="flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-purple-500/20 text-purple-300 text-[10px] font-mono font-bold mt-0.5">
                            {idx + 1}
                          </span>
                          <span>{step}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            )}

            {/* Practical Examples */}
            {lesson.practicalExamples && lesson.practicalExamples.length > 0 && (
              <div className="p-5 rounded-xl border border-white/10 bg-navy-950/80 space-y-3">
                <div className="text-xs font-mono text-cyan-400 font-bold uppercase">
                  Practical Concrete Scenarios
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                  {lesson.practicalExamples.map((ex, i) => (
                    <div key={i} className="p-3 rounded-lg bg-navy-900 border border-white/5 flex items-start gap-2 text-slate-300">
                      <CheckCircle className="h-4 w-4 text-cyan-400 shrink-0 mt-0.5" />
                      <span>{ex}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Common Misconceptions */}
            {lesson.commonMisconceptions && lesson.commonMisconceptions.length > 0 && (
              <div className="p-5 rounded-xl border border-amber-500/30 bg-amber-950/15 space-y-3">
                <div className="flex items-center gap-2 text-xs font-mono text-amber-300 font-bold">
                  <AlertTriangle className="h-4 w-4" />
                  <span>COMMON BEGINNER MISCONCEPTIONS VS. REALITY</span>
                </div>
                <div className="space-y-2.5">
                  {lesson.commonMisconceptions.map((item, i) => (
                    <div key={i} className="p-3 rounded-lg bg-navy-900/90 border border-white/5 text-xs space-y-1">
                      <div className="text-rose-400 font-mono">
                        <strong>Myth:</strong> {item.myth}
                      </div>
                      <div className="text-emerald-300 font-mono">
                        <strong>Reality:</strong> {item.reality}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Real World Scenario */}
            <div className="p-5 rounded-xl border border-purple-500/30 bg-purple-950/20 backdrop-blur-md">
              <div className="flex items-center gap-2 text-xs font-mono text-purple-300 mb-2">
                <Globe className="h-4 w-4" />
                <span>REAL-WORLD DOMAIN: {lesson.realWorldExample.domain}</span>
              </div>
              <h4 className="text-sm font-bold text-white mb-1">Practical Scenario</h4>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-3">
                {lesson.realWorldExample.scenario}
              </p>
              <div className="p-2.5 rounded-lg bg-navy-950/80 border border-purple-500/20 text-xs text-purple-200">
                <strong>Measurable Impact:</strong> {lesson.realWorldExample.impact}
              </div>
            </div>

            {/* Key Takeaways */}
            <ConceptCard
              title="Fundamental Takeaways"
              summary="Core mental models you must carry forward from this lesson:"
              points={lesson.keyTakeaways}
              variant="cyan"
            />

            {/* Visual Architecture Diagram */}
            {lesson.visualDiagramData && (
              <InteractiveDiagram
                title="System Pipeline & Data Flow Representation"
                nodes={lesson.visualDiagramData.nodes}
                connections={lesson.visualDiagramData.connections}
              />
            )}

            {/* Interactive Flashcard */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Flashcard
                term={lesson.title}
                definition={lesson.conceptSummary}
                hint="Think about inputs, labels, and statistical mappings."
                example={lesson.keyTakeaways[0]}
              />
              <div className="rounded-xl border border-white/10 bg-navy-950/70 p-5 flex flex-col justify-between">
                <div>
                  <h4 className="text-xs font-mono uppercase tracking-wider text-cyan-400 mb-2">
                    Revision Summary
                  </h4>
                  <ul className="space-y-2">
                    {lesson.revisionNotes?.map((note: string, i: number) => (
                      <li key={i} className="flex items-start gap-2 text-xs text-slate-300">
                        <CheckCircle className="h-3.5 w-3.5 text-cyan-400 shrink-0 mt-0.5" />
                        <span>{note}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <button
                  onClick={() => setActiveTab('math')}
                  className="mt-4 text-xs font-semibold text-cyan-400 hover:text-cyan-300 flex items-center gap-1"
                >
                  <span>Proceed to Mathematical Breakdown</span>
                  <span>→</span>
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Tab 2: Math Breakdown */}
        {activeTab === 'math' && (
          <div className="space-y-6 animate-fadeIn">
            {lesson.mathematics ? (
              <FormulaExplorer formula={lesson.mathematics} />
            ) : (
              <div className="p-8 text-center text-xs text-slate-400 rounded-xl border border-white/10 bg-navy-950">
                This conceptual lesson relies on intuitive representations rather than analytical calculus.
              </div>
            )}

            <div className="p-4 rounded-xl bg-navy-900/60 border border-white/5 flex items-center justify-between">
              <span className="text-xs text-slate-400">Ready to see this math expressed in Python?</span>
              <button
                onClick={() => setActiveTab('code')}
                className="px-3.5 py-1.5 rounded-lg text-xs font-semibold bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 hover:bg-cyan-500/30"
              >
                Open Python Lab →
              </button>
            </div>
          </div>
        )}

        {/* Tab 3: Python Coding Lab */}
        {activeTab === 'code' && (
          <div className="space-y-6 animate-fadeIn">
            <CodePlayground
              initialCode={lesson.pythonSnippet.code}
              expectedOutput={lesson.pythonSnippet.expectedOutput}
              title={lesson.pythonSnippet.title}
              description={lesson.pythonSnippet.explanation}
              height="300px"
            />
          </div>
        )}

        {/* Tab 4: Simulation */}
        {activeTab === 'simulation' && (
          <div className="space-y-6 animate-fadeIn">
            {lesson.simulation ? (
              <AlgorithmSimulator config={lesson.simulation} />
            ) : (
              <AlgorithmSimulator
                config={{
                  type: 'gradient-descent',
                  title: 'Loss Landscape Optimization',
                  description: 'Adjust learning rate and observe parameters descending error surfaces.',
                  defaultParams: { learningRate: 0.1, startingWeight: 8 },
                }}
              />
            )}
          </div>
        )}

        {/* Tab 5: Quiz / Assessment */}
        {activeTab === 'quiz' && (
          <div className="space-y-6 animate-fadeIn">
            <QuizEngine
              quizId={`quiz-${lesson.id}`}
              title={`Concept Diagnostic: ${lesson.title}`}
              questions={lesson.knowledgeCheck}
              badgeId={module?.badgeReward.id}
            />
          </div>
        )}

        {/* Tab 6: Notes */}
        {activeTab === 'notes' && (
          <div className="space-y-6 animate-fadeIn">
            <NotesEditor lessonId={lesson.id} lessonTitle={lesson.title} />
          </div>
        )}

        {/* Lesson Bottom Navigation Bar */}
        <LessonNavigation
          currentLesson={lesson}
          prevLesson={prev}
          nextLesson={next}
          onOpenQuiz={() => setActiveTab('quiz')}
        />
      </main>
    </div>
  );
}

