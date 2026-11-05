'use client';

import React, { useState } from 'react';
import { Table, Search, Sliders, ChevronDown, ChevronUp, Sparkles, CheckCircle2, XCircle, Code } from 'lucide-react';

interface AlgorithmMeta {
  id: string;
  name: string;
  family: 'Linear' | 'Instance' | 'Tree' | 'Ensemble' | 'Kernel' | 'Probabilistic';
  type: 'Both' | 'Classification' | 'Regression';
  howItWorks: string;
  suitableFor: string;
  advantages: string[];
  disadvantages: string[];
  interpretability: 'High' | 'Medium' | 'Low' | 'Black Box';
  trainingComplexity: string;
  inferenceComplexity: string;
  needsScaling: boolean;
  sklearnSnippet: string;
}

const ALGORITHMS: AlgorithmMeta[] = [
  {
    id: 'linreg',
    name: 'Linear Regression',
    family: 'Linear',
    type: 'Regression',
    howItWorks: 'Finds the optimal hyperplane that minimizes the Sum of Squared Residuals (Ordinary Least Squares) between ground truth y and predictions.',
    suitableFor: 'Continuous targets with approximately linear relationships; econometrics, pricing, trend forecasting.',
    advantages: ['Perfect explainability via analytical beta coefficients', 'Extremely fast closed-form O(D³ + N D²) solution', 'No tuning hyperparameters required'],
    disadvantages: ['Fails on non-linear curves without manual feature expansion', 'Extremely sensitive to outliers and collinearity'],
    interpretability: 'High',
    trainingComplexity: 'O(N D² + D³)',
    inferenceComplexity: 'O(D)',
    needsScaling: true,
    sklearnSnippet: 'from sklearn.linear_model import LinearRegression\nmodel = LinearRegression().fit(X_train, y_train)'
  },
  {
    id: 'logreg',
    name: 'Logistic Regression',
    family: 'Linear',
    type: 'Classification',
    howItWorks: 'Passes a linear combination of inputs z = wᵀx + b through the non-linear Sigmoid activation function to output calibrated class probabilities.',
    suitableFor: 'Binary and multiclass classification baselines, credit scoring, medical disease risk diagnosis.',
    advantages: ['Outputs true calibrated posterior probabilities P(y=1|x)', 'Interpretable odds ratios: exp(w_i)', 'Very fast training with L1/L2 regularization'],
    disadvantages: ['Can only construct linear decision boundaries', 'Requires feature scaling and multicollinearity pruning'],
    interpretability: 'High',
    trainingComplexity: 'O(N D)',
    inferenceComplexity: 'O(D)',
    needsScaling: true,
    sklearnSnippet: 'from sklearn.linear_model import LogisticRegression\nmodel = LogisticRegression(C=1.0).fit(X_train, y_train)'
  },
  {
    id: 'knn',
    name: 'K-Nearest Neighbors (KNN)',
    family: 'Instance',
    type: 'Both',
    howItWorks: 'Non-parametric lazy learner. Stores all training instances and predicts by finding the K closest samples in feature space using Euclidean or Manhattan distance.',
    suitableFor: 'Low-dimensional datasets with non-linear boundaries where training time must be zero.',
    advantages: ['Zero training time (simply memorizes data)', 'Naturally adapts to complex irregular boundaries', 'Intuitive and transparent decisions'],
    disadvantages: ['Extremely slow inference O(N D) for every single prediction', 'Severe curse of dimensionality in high dimensions', 'Mandatory feature scaling'],
    interpretability: 'Medium',
    trainingComplexity: 'O(1) [Zero training]',
    inferenceComplexity: 'O(N D)',
    needsScaling: true,
    sklearnSnippet: 'from sklearn.neighbors import KNeighborsClassifier\nmodel = KNeighborsClassifier(n_neighbors=5).fit(X_train, y_train)'
  },
  {
    id: 'dt',
    name: 'Decision Tree (CART)',
    family: 'Tree',
    type: 'Both',
    howItWorks: 'Recursively splits feature space using orthogonal axis-aligned thresholds to maximize information gain (minimizing Gini Impurity or Variance).',
    suitableFor: 'Tabular data with mixed data types where human auditability and rule explanation are mandatory.',
    advantages: ['Complete transparency: can be drawn as flowchart rules', 'Invariant to monotonic feature scaling (no scaling needed)', 'Handles mixed categorical and numerical data naturally'],
    disadvantages: ['Severe tendency to overfit without depth pruning (high variance)', 'Unstable: small changes in data alter the entire tree'],
    interpretability: 'High',
    trainingComplexity: 'O(N D log N)',
    inferenceComplexity: 'O(log N)',
    needsScaling: false,
    sklearnSnippet: 'from sklearn.tree import DecisionTreeClassifier\nmodel = DecisionTreeClassifier(max_depth=4).fit(X_train, y_train)'
  },
  {
    id: 'rf',
    name: 'Random Forest',
    family: 'Ensemble',
    type: 'Both',
    howItWorks: 'Bagging ensemble that trains hundreds of de-correlated decision trees on bootstrap random subsets of data and random feature splits, averaging their votes.',
    suitableFor: 'Default algorithm for tabular classification and regression with complex non-linear interactions.',
    advantages: ['Dramatically reduces single-tree variance and overfitting', 'Built-in feature importance ranking (Gini gain)', 'Robust to outliers and missing values'],
    disadvantages: ['Slower inference than a single tree', 'Loss of individual flowchart interpretability', 'Cannot extrapolate beyond training domain ranges'],
    interpretability: 'Medium',
    trainingComplexity: 'O(M · N D log N)',
    inferenceComplexity: 'O(M · depth)',
    needsScaling: false,
    sklearnSnippet: 'from sklearn.ensemble import RandomForestClassifier\nmodel = RandomForestClassifier(n_estimators=100, max_depth=8).fit(X_train, y_train)'
  },
  {
    id: 'svm',
    name: 'Support Vector Machine (SVM)',
    family: 'Kernel',
    type: 'Both',
    howItWorks: 'Finds the maximum-margin hyperplane that separates classes. Uses kernel trick (RBF, Polynomial) to project data into infinite-dimensional Hilbert space.',
    suitableFor: 'High-dimensional sparse text classification, image embeddings, bioinformatics, small-to-medium sample sizes.',
    advantages: ['Effective in very high-dimensional spaces (D > N)', 'Memory efficient: prediction depends only on support vectors', 'Strong mathematical generalization guarantees'],
    disadvantages: ['Quadratic to cubic training complexity O(N² to N³)', 'Sensitive to noise and feature scaling', 'Requires calibration to produce probabilities'],
    interpretability: 'Low',
    trainingComplexity: 'O(N² D to N³)',
    inferenceComplexity: 'O(N_sv D)',
    needsScaling: true,
    sklearnSnippet: 'from sklearn.svm import SVC\nmodel = SVC(kernel="rbf", C=1.0).fit(X_train, y_train)'
  },
  {
    id: 'nb',
    name: 'Naive Bayes',
    family: 'Probabilistic',
    type: 'Classification',
    howItWorks: 'Applies Bayes Theorem assuming strict conditional independence between every pair of features given the class label: P(x|y) = ∏ P(xᵢ|y).',
    suitableFor: 'Real-time text classification, spam filtering, sentiment analysis, recommendation cold-starts.',
    advantages: ['Ultra-fast linear training and inference O(N D)', 'Requires very small training data to estimate parameters', 'Handles high-dimensional text bag-of-words natively'],
    disadvantages: ['Strong naive independence assumption rarely holds true in reality', 'Poor probability calibration when features correlate'],
    interpretability: 'High',
    trainingComplexity: 'O(N D)',
    inferenceComplexity: 'O(C D)',
    needsScaling: false,
    sklearnSnippet: 'from sklearn.naive_bayes import GaussianNB\nmodel = GaussianNB().fit(X_train, y_train)'
  },
  {
    id: 'gb',
    name: 'Gradient Boosting (XGBoost / LightGBM)',
    family: 'Ensemble',
    type: 'Both',
    howItWorks: 'Sequential boosting ensemble that trains shallow decision trees consecutively, where each new tree is fit to the negative gradient (residuals) of the previous ensemble.',
    suitableFor: 'Kaggle competitions, production tabular forecasting, high-stakes fraud detection.',
    advantages: ['State-of-the-art predictive performance on tabular data', 'Built-in handling of missing values and L1/L2 regularization', 'Optimized fast C++ backends (LightGBM / XGBoost)'],
    disadvantages: ['Prone to overfitting if learning rate or early stopping is mistuned', 'Many hyperparameters to tune (learning_rate, depth, subsample)', 'Sensitive to noisy outliers'],
    interpretability: 'Low',
    trainingComplexity: 'O(M · N D log N)',
    inferenceComplexity: 'O(M · depth)',
    needsScaling: false,
    sklearnSnippet: 'from sklearn.ensemble import GradientBoostingClassifier\nmodel = GradientBoostingClassifier(learning_rate=0.05, n_estimators=200).fit(X_train, y_train)'
  }
];

export default function AlgorithmComparisonMatrix() {
  const [filterType, setFilterType] = useState<'All' | 'Classification' | 'Regression'>('All');
  const [filterInterpretability, setFilterInterpretability] = useState<string>('All');
  const [expandedId, setExpandedId] = useState<string | null>('knn');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredAlgorithms = ALGORITHMS.filter(algo => {
    const matchesType = filterType === 'All' || algo.type === 'Both' || algo.type === filterType;
    const matchesInterp = filterInterpretability === 'All' || algo.interpretability === filterInterpretability;
    const matchesSearch = algo.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          algo.family.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesType && matchesInterp && matchesSearch;
  });

  return (
    <div className="rounded-2xl border border-border/80 bg-navy-900/60 p-6 backdrop-blur-md shadow-2xl space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-border/50 pb-5">
        <div className="flex items-center gap-3">
          <span className="p-2 rounded-lg bg-electric-cyan/10 border border-electric-cyan/30 text-electric-cyan">
            <Table className="w-5 h-5" />
          </span>
          <div>
            <h3 className="text-xl font-bold text-white">Machine Learning Algorithm Master Matrix</h3>
            <p className="text-xs text-slate-400 mt-0.5">Compare architectures across complexity, interpretability, scaling rules, and runtime latency</p>
          </div>
        </div>

        {/* Search */}
        <div className="relative">
          <Search className="w-4 h-4 text-slate-500 absolute left-3 top-2.5" />
          <input
            type="text"
            placeholder="Search algorithms..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-9 pr-3 py-1.5 rounded-xl border border-border/60 bg-navy-950/80 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-electric-cyan"
          />
        </div>
      </div>

      {/* Filter Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 bg-navy-950/70 p-3 rounded-xl border border-border/50 text-xs">
        <div className="flex items-center gap-2">
          <span className="text-slate-400 font-mono">Problem Type:</span>
          {(['All', 'Classification', 'Regression'] as const).map(t => (
            <button
              key={t}
              onClick={() => setFilterType(t)}
              className={`px-2.5 py-1 rounded-lg font-semibold transition-all ${
                filterType === t
                  ? 'bg-electric-cyan/20 border border-electric-cyan/60 text-white'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              {t}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-2">
          <span className="text-slate-400 font-mono">Interpretability:</span>
          {['All', 'High', 'Medium', 'Low'].map(lvl => (
            <button
              key={lvl}
              onClick={() => setFilterInterpretability(lvl)}
              className={`px-2.5 py-1 rounded-lg font-semibold transition-all ${
                filterInterpretability === lvl
                  ? 'bg-violet-500/20 border border-violet-500/60 text-white'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              {lvl}
            </button>
          ))}
        </div>
      </div>

      {/* Comparison Table */}
      <div className="overflow-x-auto rounded-xl border border-border/60">
        <table className="w-full text-xs text-left text-slate-300">
          <thead className="bg-navy-950 text-slate-400 font-mono uppercase text-[11px] border-b border-border/60">
            <tr>
              <th className="px-4 py-3">Algorithm</th>
              <th className="px-4 py-3">Family</th>
              <th className="px-4 py-3">Task Type</th>
              <th className="px-4 py-3">Interpretability</th>
              <th className="px-4 py-3">Needs Scaling</th>
              <th className="px-4 py-3 text-right">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border/30">
            {filteredAlgorithms.map(algo => {
              const isExpanded = expandedId === algo.id;
              return (
                <React.Fragment key={algo.id}>
                  <tr
                    onClick={() => setExpandedId(isExpanded ? null : algo.id)}
                    className={`hover:bg-navy-900/60 cursor-pointer transition-all ${
                      isExpanded ? 'bg-navy-900/80' : 'bg-navy-950/40'
                    }`}
                  >
                    <td className="px-4 py-3 font-bold text-white flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-electric-cyan" />
                      {algo.name}
                    </td>
                    <td className="px-4 py-3 font-mono text-slate-400">{algo.family}</td>
                    <td className="px-4 py-3">
                      <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold border ${
                        algo.type === 'Both'
                          ? 'bg-purple-500/10 text-purple-300 border-purple-500/30'
                          : algo.type === 'Classification'
                          ? 'bg-cyan-500/10 text-cyan-300 border-cyan-500/30'
                          : 'bg-emerald-500/10 text-emerald-300 border-emerald-500/30'
                      }`}>
                        {algo.type}
                      </span>
                    </td>
                    <td className="px-4 py-3 font-semibold" style={{
                      color: algo.interpretability === 'High' ? '#10b981' : algo.interpretability === 'Medium' ? '#f59e0b' : '#f43f5e'
                    }}>
                      {algo.interpretability}
                    </td>
                    <td className="px-4 py-3 font-mono">
                      {algo.needsScaling ? (
                        <span className="text-amber-400 font-bold">Yes (Mandatory)</span>
                      ) : (
                        <span className="text-slate-500">No (Invariant)</span>
                      )}
                    </td>
                    <td className="px-4 py-3 text-right">
                      <button className="text-slate-400 hover:text-white">
                        {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                      </button>
                    </td>
                  </tr>

                  {/* Expanded Detail Panel */}
                  {isExpanded && (
                    <tr className="bg-navy-950/95 border-b border-border/50">
                      <td colSpan={6} className="p-5 space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          {/* Left: How it works & Strengths */}
                          <div className="space-y-3">
                            <div className="space-y-1">
                              <span className="text-[10px] font-mono uppercase tracking-wider text-electric-cyan font-bold">
                                How It Works Mechanically:
                              </span>
                              <p className="text-xs text-slate-300 leading-relaxed">{algo.howItWorks}</p>
                            </div>

                            <div className="space-y-1">
                              <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400 font-bold">
                                Primary Strengths:
                              </span>
                              <div className="space-y-1">
                                {algo.advantages.map((adv, i) => (
                                  <div key={i} className="flex items-start gap-1.5 text-xs text-emerald-300">
                                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                                    <span>{adv}</span>
                                  </div>
                                ))}
                              </div>
                            </div>
                          </div>

                          {/* Right: Limitations & Code */}
                          <div className="space-y-3">
                            <div className="space-y-1">
                              <span className="text-[10px] font-mono uppercase tracking-wider text-rose-400 font-bold">
                                Primary Limitations:
                              </span>
                              <div className="space-y-1">
                                {algo.disadvantages.map((dis, i) => (
                                  <div key={i} className="flex items-start gap-1.5 text-xs text-rose-300">
                                    <XCircle className="w-3.5 h-3.5 text-rose-400 shrink-0 mt-0.5" />
                                    <span>{dis}</span>
                                  </div>
                                ))}
                              </div>
                            </div>

                            {/* Complexity Badges */}
                            <div className="grid grid-cols-2 gap-2 pt-1">
                              <div className="p-2 rounded bg-navy-900 border border-border/50 text-[11px]">
                                <span className="text-slate-500 block font-mono">Training Complexity:</span>
                                <span className="font-mono text-electric-cyan font-bold">{algo.trainingComplexity}</span>
                              </div>
                              <div className="p-2 rounded bg-navy-900 border border-border/50 text-[11px]">
                                <span className="text-slate-500 block font-mono">Inference Latency:</span>
                                <span className="font-mono text-amber-300 font-bold">{algo.inferenceComplexity}</span>
                              </div>
                            </div>

                            {/* Code Snippet */}
                            <div className="p-2.5 rounded bg-navy-900/80 border border-border/50 font-mono text-[11px] text-cyan-300">
                              <div className="flex items-center gap-1 text-[10px] text-slate-500 mb-1">
                                <Code className="w-3 h-3" /> Scikit-Learn Initialization
                              </div>
                              <pre className="whitespace-pre-wrap">{algo.sklearnSnippet}</pre>
                            </div>
                          </div>
                        </div>
                      </td>
                    </tr>
                  )}
                </React.Fragment>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

