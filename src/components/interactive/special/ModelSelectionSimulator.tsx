'use client';

import React, { useState } from 'react';
import { Cpu, CheckCircle2, XCircle, Lightbulb, BarChart2 } from 'lucide-react';

interface Dataset {
  id: string;
  name: string;
  description: string;
  size: number;
  features: number;
  target: 'binary' | 'multiclass' | 'regression';
  hasNonlinear: boolean;
  isHighDim: boolean;
}

interface Algorithm {
  id: string;
  name: string;
  category: string;
  strengths: string[];
  weaknesses: string[];
  bestFor: string[];
  complexity: 'Low' | 'Medium' | 'High';
  interpretable: boolean;
  handlesNonlinear: boolean;
  needsScaling: boolean;
  targetTypes: Array<'binary' | 'multiclass' | 'regression'>;
}

const DATASETS: Dataset[] = [
  {
    id: 'titanic',
    name: 'Titanic Survival',
    description: '891 passengers, 8 features. Binary: survived or not. Mixed categorical (Pclass, Sex, Embarked) and numerical columns, some missing values.',
    size: 891, features: 8, target: 'binary', hasNonlinear: true, isHighDim: false
  },
  {
    id: 'housing',
    name: 'House Price Prediction',
    description: '1,460 homes, 79 features. Regression: predict sale price. Strong non-linear interactions between location and size.',
    size: 1460, features: 79, target: 'regression', hasNonlinear: true, isHighDim: true
  },
  {
    id: 'iris',
    name: 'Iris Flower Classification',
    description: '150 samples, 4 features. 3 species classes with near-linear petal length boundaries. Small, balanced, and interpretability-focused.',
    size: 150, features: 4, target: 'multiclass', hasNonlinear: false, isHighDim: false
  },
  {
    id: 'spam',
    name: 'Email Spam Detection',
    description: '5,572 emails, 57 word-frequency features. Binary: spam or not. Sparse high-dimensional bag-of-words representation.',
    size: 5572, features: 57, target: 'binary', hasNonlinear: false, isHighDim: true
  }
];

const ALGORITHMS: Algorithm[] = [
  {
    id: 'lr',
    name: 'Logistic Regression',
    category: 'Linear',
    strengths: ['Fast training and inference', 'Highly interpretable coefficients', 'Great baseline model'],
    weaknesses: ['Cannot learn non-linear decision boundaries', 'Sensitive to multicollinearity'],
    bestFor: ['Binary or multiclass classification with approximately linear boundaries'],
    complexity: 'Low',
    interpretable: true,
    handlesNonlinear: false,
    needsScaling: true,
    targetTypes: ['binary', 'multiclass']
  },
  {
    id: 'rf',
    name: 'Random Forest',
    category: 'Ensemble',
    strengths: ['Handles non-linear relationships well', 'Robust to outliers and missing values', 'Built-in feature importance ranking'],
    weaknesses: ['Slow inference for very large forests', 'Not suitable for extremely high-dimensional sparse text'],
    bestFor: ['Tabular data with non-linear feature interactions and mixed feature types'],
    complexity: 'Medium',
    interpretable: false,
    handlesNonlinear: true,
    needsScaling: false,
    targetTypes: ['binary', 'multiclass', 'regression']
  },
  {
    id: 'xgb',
    name: 'XGBoost / Gradient Boosting',
    category: 'Ensemble',
    strengths: ['State-of-the-art tabular performance', 'Handles missing values natively', 'Powerful regularization with L1/L2'],
    weaknesses: ['Many hyperparameters to tune', 'Slower training than Random Forest for large trees'],
    bestFor: ['Competition-grade tabular regression and classification tasks'],
    complexity: 'High',
    interpretable: false,
    handlesNonlinear: true,
    needsScaling: false,
    targetTypes: ['binary', 'multiclass', 'regression']
  },
  {
    id: 'svm',
    name: 'Support Vector Machine',
    category: 'Kernel',
    strengths: ['Excellent on high-dimensional sparse data (text/NLP)', 'Strong theoretical generalization guarantees'],
    weaknesses: ['Slow training on large datasets (O(n^2 to n^3))', 'Requires careful feature scaling and kernel tuning'],
    bestFor: ['Text classification with sparse bag-of-words features'],
    complexity: 'Medium',
    interpretable: false,
    handlesNonlinear: true,
    needsScaling: true,
    targetTypes: ['binary', 'multiclass']
  },
  {
    id: 'knn',
    name: 'K-Nearest Neighbors',
    category: 'Instance-Based',
    strengths: ['Zero training time (lazy learner)', 'Naturally handles multiclass', 'Simple to understand'],
    weaknesses: ['Extremely slow inference O(N*D) per query', 'Degrades badly in high-dimensional spaces'],
    bestFor: ['Very small datasets with low dimensionality where inference latency is not critical'],
    complexity: 'Low',
    interpretable: true,
    handlesNonlinear: true,
    needsScaling: true,
    targetTypes: ['binary', 'multiclass', 'regression']
  },
  {
    id: 'linreg',
    name: 'Linear Regression',
    category: 'Linear',
    strengths: ['Perfect interpretability (clear coefficients)', 'Fast and minimal memory footprint', 'Outputs calibrated probability estimates'],
    weaknesses: ['Assumes linear relationship between features and target', 'Highly sensitive to outliers in the target variable'],
    bestFor: ['Regression tasks with approximately linear feature-target relationships'],
    complexity: 'Low',
    interpretable: true,
    handlesNonlinear: false,
    needsScaling: true,
    targetTypes: ['regression']
  }
];

function evaluateFit(algo: Algorithm, dataset: Dataset): { score: 'excellent' | 'good' | 'fair' | 'poor'; reasons: string[]; warnings: string[] } {
  const reasons: string[] = [];
  const warnings: string[] = [];
  let score = 0;

  if (!algo.targetTypes.includes(dataset.target)) {
    return { score: 'poor', reasons: [], warnings: [`${algo.name} cannot solve ${dataset.target} tasks.`] };
  }

  if (dataset.hasNonlinear && algo.handlesNonlinear) { score += 2; reasons.push('Handles non-linear feature interactions present in this dataset'); }
  if (dataset.hasNonlinear && !algo.handlesNonlinear) { score -= 2; warnings.push('Dataset has non-linear patterns this algorithm cannot capture'); }
  if (dataset.isHighDim && algo.id === 'knn') { score -= 2; warnings.push('KNN suffers severely from the curse of dimensionality with 79 features'); }
  if (dataset.isHighDim && algo.id === 'svm') { score += 1; reasons.push('SVMs are well-suited to high-dimensional sparse feature spaces'); }
  if (dataset.size < 200 && algo.id === 'xgb') { warnings.push('XGBoost may overfit with only 150 samples; consider regularization or simpler models'); score -= 1; }
  if (dataset.size > 1000 && algo.id === 'svm') { warnings.push('SVM training is O(n²–n³); may be slow with thousands of samples'); score -= 1; }
  if (algo.interpretable) { score += 1; reasons.push('High interpretability — useful for explaining predictions to stakeholders'); }
  if (algo.category === 'Ensemble') { score += 1; reasons.push('Ensemble algorithms typically generalize better on heterogeneous tabular datasets'); }

  if (score >= 3) return { score: 'excellent', reasons, warnings };
  if (score >= 1) return { score: 'good', reasons, warnings };
  if (score >= -1) return { score: 'fair', reasons, warnings };
  return { score: 'poor', reasons, warnings };
}

export default function ModelSelectionSimulator() {
  const [selectedDataset, setSelectedDataset] = useState<Dataset>(DATASETS[0]);
  const [selectedAlgo, setSelectedAlgo] = useState<Algorithm | null>(null);

  const fit = selectedAlgo ? evaluateFit(selectedAlgo, selectedDataset) : null;

  const scoreConfig = {
    excellent: { label: 'Excellent Fit', color: '#10b981', bg: 'bg-emerald-500/10 border-emerald-500/30' },
    good: { label: 'Good Fit', color: '#00f0ff', bg: 'bg-cyan-500/10 border-cyan-500/30' },
    fair: { label: 'Fair Fit', color: '#f59e0b', bg: 'bg-amber-500/10 border-amber-500/30' },
    poor: { label: 'Poor Fit', color: '#f43f5e', bg: 'bg-rose-500/10 border-rose-500/30' }
  };

  return (
    <div className="rounded-2xl border border-border/80 bg-navy-900/60 p-6 backdrop-blur-md shadow-2xl space-y-6">
      <div className="flex items-center gap-3 border-b border-border/50 pb-5">
        <span className="p-2 rounded-lg bg-violet-500/10 border border-violet-500/30 text-violet-400">
          <Cpu className="w-5 h-5" />
        </span>
        <div>
          <h3 className="text-xl font-bold text-white">Model Selection Simulator</h3>
          <p className="text-xs text-slate-400 mt-0.5">Choose a dataset, select an algorithm, then receive an analytical suitability report</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left: Dataset & Algorithm Pickers */}
        <div className="space-y-5">
          {/* Dataset picker */}
          <div className="space-y-2">
            <h4 className="text-xs font-mono uppercase tracking-wider text-slate-400">Step 1 — Select a Dataset</h4>
            <div className="space-y-2">
              {DATASETS.map(ds => (
                <button
                  key={ds.id}
                  onClick={() => { setSelectedDataset(ds); setSelectedAlgo(null); }}
                  className={`w-full text-left p-3.5 rounded-xl border transition-all ${
                    selectedDataset.id === ds.id
                      ? 'border-electric-cyan/60 bg-electric-cyan/10 shadow-[0_0_12px_rgba(0,240,255,0.15)]'
                      : 'border-border/50 bg-navy-950/50 hover:border-slate-500'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className={`text-sm font-semibold ${selectedDataset.id === ds.id ? 'text-white' : 'text-slate-300'}`}>{ds.name}</span>
                    <span className={`text-[10px] font-mono px-2 py-0.5 rounded-full ${
                      ds.target === 'binary' ? 'bg-cyan-500/10 text-cyan-300 border border-cyan-500/30'
                      : ds.target === 'multiclass' ? 'bg-violet-500/10 text-violet-300 border border-violet-500/30'
                      : 'bg-emerald-500/10 text-emerald-300 border border-emerald-500/30'
                    }`}>{ds.target}</span>
                  </div>
                  <p className="text-[11px] text-slate-400 mt-1 leading-relaxed">{ds.description}</p>
                  <div className="flex gap-3 mt-2 text-[10px] text-slate-500 font-mono">
                    <span>{ds.size.toLocaleString()} samples</span>
                    <span>·</span>
                    <span>{ds.features} features</span>
                    {ds.hasNonlinear && <><span>·</span><span className="text-amber-400">Non-linear</span></>}
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Algorithm picker */}
          <div className="space-y-2">
            <h4 className="text-xs font-mono uppercase tracking-wider text-slate-400">Step 2 — Select an Algorithm</h4>
            <div className="grid grid-cols-2 gap-2">
              {ALGORITHMS.map(algo => (
                <button
                  key={algo.id}
                  onClick={() => setSelectedAlgo(algo)}
                  className={`p-3 rounded-xl border text-left transition-all ${
                    selectedAlgo?.id === algo.id
                      ? 'border-violet-500/60 bg-violet-500/10'
                      : 'border-border/50 bg-navy-950/50 hover:border-slate-500'
                  }`}
                >
                  <span className={`text-xs font-semibold block ${selectedAlgo?.id === algo.id ? 'text-white' : 'text-slate-300'}`}>{algo.name}</span>
                  <span className="text-[10px] text-slate-500">{algo.category}</span>
                  <div className="flex gap-1 mt-1.5 flex-wrap">
                    <span className={`text-[9px] px-1.5 py-0.5 rounded-full ${algo.complexity === 'Low' ? 'bg-emerald-500/15 text-emerald-400' : algo.complexity === 'Medium' ? 'bg-amber-500/15 text-amber-400' : 'bg-rose-500/15 text-rose-400'}`}>
                      {algo.complexity} Complexity
                    </span>
                    {algo.interpretable && <span className="text-[9px] px-1.5 py-0.5 rounded-full bg-cyan-500/15 text-cyan-400">Interpretable</span>}
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Right: Fit Report */}
        <div className="space-y-4">
          {!selectedAlgo ? (
            <div className="h-full flex flex-col items-center justify-center rounded-xl border border-border/40 bg-navy-950/60 p-8 text-center gap-3">
              <BarChart2 className="w-10 h-10 text-slate-600" />
              <p className="text-sm text-slate-400">Select an algorithm above to receive a detailed suitability analysis</p>
            </div>
          ) : (
            <div className="space-y-4">
              <div className={`p-4 rounded-xl border ${scoreConfig[fit!.score].bg} space-y-1`}>
                <div className="flex items-center justify-between">
                  <span className="text-sm font-bold text-white">{selectedAlgo.name}</span>
                  <span className="text-xs font-bold px-2.5 py-1 rounded-full border" style={{ color: scoreConfig[fit!.score].color, borderColor: scoreConfig[fit!.score].color + '50', backgroundColor: scoreConfig[fit!.score].color + '15' }}>
                    {scoreConfig[fit!.score].label}
                  </span>
                </div>
                <p className="text-[11px] text-slate-400">Against: {selectedDataset.name}</p>
              </div>

              {fit!.reasons.length > 0 && (
                <div className="space-y-1.5">
                  <span className="text-[11px] font-mono uppercase tracking-wider text-emerald-400">Why it Works:</span>
                  {fit!.reasons.map((r, i) => (
                    <div key={i} className="flex items-start gap-2 p-2.5 rounded-lg bg-emerald-500/5 border border-emerald-500/20">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                      <span className="text-[11px] text-slate-300">{r}</span>
                    </div>
                  ))}
                </div>
              )}

              {fit!.warnings.length > 0 && (
                <div className="space-y-1.5">
                  <span className="text-[11px] font-mono uppercase tracking-wider text-rose-400">Concerns & Limitations:</span>
                  {fit!.warnings.map((w, i) => (
                    <div key={i} className="flex items-start gap-2 p-2.5 rounded-lg bg-rose-500/5 border border-rose-500/20">
                      <XCircle className="w-3.5 h-3.5 text-rose-400 shrink-0 mt-0.5" />
                      <span className="text-[11px] text-slate-300">{w}</span>
                    </div>
                  ))}
                </div>
              )}

              <div className="p-3.5 rounded-xl border border-border/50 bg-navy-950/70 space-y-2">
                <div className="flex items-center gap-1.5 text-[11px] font-semibold text-amber-300">
                  <Lightbulb className="w-3.5 h-3.5" />
                  Best use case for {selectedAlgo.name}:
                </div>
                {selectedAlgo.bestFor.map((bf, i) => (
                  <p key={i} className="text-[11px] text-slate-300 leading-relaxed">{bf}</p>
                ))}
              </div>

              <div className="grid grid-cols-3 gap-2 text-center">
                {[
                  { label: 'Needs Scaling', val: selectedAlgo.needsScaling },
                  { label: 'Non-Linear', val: selectedAlgo.handlesNonlinear },
                  { label: 'Interpretable', val: selectedAlgo.interpretable },
                ].map(item => (
                  <div key={item.label} className={`p-2 rounded-lg border text-[10px] font-semibold ${item.val ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-300' : 'bg-rose-500/10 border-rose-500/30 text-rose-400'}`}>
                    <div>{item.val ? '✓' : '✗'}</div>
                    <div className="mt-0.5">{item.label}</div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

