'use client';

import React, { useState } from 'react';
import Sidebar from '@/components/layout/Sidebar';
import AlgorithmSimulator from '@/components/interactive/AlgorithmSimulator';
import ProcessFlow from '@/components/interactive/ProcessFlow';
import { Binary, Layers, GitMerge, Activity } from 'lucide-react';

export default function AlgorithmExplorerPage() {
  const [activeAlgorithm, setActiveAlgorithm] = useState<'gradient' | 'kmeans' | 'tree'>('gradient');

  return (
    <div className="flex">
      <Sidebar />

      <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-6xl mx-auto space-y-6 overflow-y-auto">
        <div className="border-b border-white/10 pb-4">
          <div className="flex items-center gap-2 text-xs font-mono text-cyan-400 mb-1">
            <Binary className="h-4 w-4" />
            <span>ALGORITHM MECHANICS SIMULATOR</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-white">
            Algorithm Explorer
          </h1>
          <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-2xl">
            Step through machine learning algorithms one iteration at a time. Trace math, updates, and convergence paths.
          </p>
        </div>

        {/* Algorithm Switcher */}
        <div className="flex items-center gap-2 overflow-x-auto p-1.5 rounded-xl bg-navy-950 border border-white/10">
          {[
            { id: 'gradient', label: '1. Gradient Descent Optimization', icon: Activity },
            { id: 'kmeans', label: '2. K-Means Centroid Shift', icon: Layers },
            { id: 'tree', label: '3. Decision Tree Recursive Splitting', icon: GitMerge },
          ].map((item) => {
            const Icon = item.icon;
            const isSelected = activeAlgorithm === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveAlgorithm(item.id as any)}
                className={`flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs font-mono font-medium transition whitespace-nowrap ${
                  isSelected
                    ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-400 shadow-glow font-bold'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                <Icon className="h-3.5 w-3.5" />
                <span>{item.label}</span>
              </button>
            );
          })}
        </div>

        {activeAlgorithm === 'gradient' && (
          <div className="space-y-6 animate-fadeIn">
            <AlgorithmSimulator
              config={{
                type: 'gradient-descent',
                title: 'Convex Error Terrain Minimization',
                description: 'Adjust learning rate to watch parameter w navigate loss bowl L(w) = w² - 4w + 5.',
                defaultParams: { learningRate: 0.1, startingWeight: 9 },
              }}
            />

            <ProcessFlow
              title="Mathematical Optimization Loop"
              steps={[
                {
                  id: 's1',
                  stepNumber: 1,
                  title: 'Initialize Parameters',
                  description: 'Weights are set to random initial values θ ~ N(0, 0.01) or specific seeds.',
                  codeHint: 'w = np.random.randn(D, 1) * 0.01',
                },
                {
                  id: 's2',
                  stepNumber: 2,
                  title: 'Forward Prediction',
                  description: 'Compute hypothesis predictions ŷ = f(X; θ) across current batch.',
                  codeHint: 'y_hat = np.dot(X, w) + b',
                },
                {
                  id: 's3',
                  stepNumber: 3,
                  title: 'Compute Loss & Gradients',
                  description: 'Calculate error metric and derive analytical partial derivatives ∇L with respect to each weight.',
                  codeHint: 'grad = (2/N) * np.dot(X.T, (y_hat - y))',
                },
                {
                  id: 's4',
                  stepNumber: 4,
                  title: 'Update Weight Vectors',
                  description: 'Shift weights against the gradient vector scaled by learning rate α.',
                  codeHint: 'w = w - learning_rate * grad',
                },
              ]}
            />
          </div>
        )}

        {activeAlgorithm === 'kmeans' && (
          <div className="space-y-6 animate-fadeIn">
            <ProcessFlow
              title="Lloyd's K-Means Clustering Algorithm Pipeline"
              steps={[
                {
                  id: 'k1',
                  stepNumber: 1,
                  title: 'Centroid Initialization',
                  description: 'Randomly place K initial centroids μ_1, μ_2, ... μ_k inside feature bounding space (or via K-Means++).',
                  codeHint: 'centroids = X[np.random.choice(N, K, replace=False)]',
                },
                {
                  id: 'k2',
                  stepNumber: 2,
                  title: 'Voronoi Assignment',
                  description: 'Assign each data sample to its closest centroid using Euclidean distance ||x_i - μ_k||².',
                  codeHint: 'cluster_labels = np.argmin(distances, axis=1)',
                },
                {
                  id: 'k3',
                  stepNumber: 3,
                  title: 'Centroid Re-computation',
                  description: 'Recalculate centroid coordinates as the geometric mean of all points assigned to that cluster.',
                  codeHint: 'centroids[k] = X[cluster_labels == k].mean(axis=0)',
                },
                {
                  id: 'k4',
                  stepNumber: 4,
                  title: 'Check Convergence',
                  description: 'Repeat assignment and recalculation until centroid drift falls below epsilon tolerance (||μ_new - μ_old|| < ε).',
                  codeHint: 'if np.all(centroids_new == centroids_old): break',
                },
              ]}
            />
          </div>
        )}

        {activeAlgorithm === 'tree' && (
          <div className="space-y-6 animate-fadeIn">
            <ProcessFlow
              title="CART (Classification & Regression Trees) Splitting Algorithm"
              steps={[
                {
                  id: 't1',
                  stepNumber: 1,
                  title: 'Scan All Available Features',
                  description: 'For each feature column j, sort the values and test potential midpoint split thresholds s.',
                  codeHint: 'for feature_idx in range(n_features): ...',
                },
                {
                  id: 't2',
                  stepNumber: 2,
                  title: 'Calculate Weighted Impurity',
                  description: 'Evaluate Gini Impurity or Mean Squared Error for the candidate left and right child subsets.',
                  codeHint: 'impurity = (N_left/N)*Gini_left + (N_right/N)*Gini_right',
                },
                {
                  id: 't3',
                  stepNumber: 3,
                  title: 'Execute Greedy Best Split',
                  description: 'Choose the feature and threshold that produces the largest drop in impurity (maximum information gain).',
                  codeHint: 'best_split = min(splits, key=lambda s: s.impurity)',
                },
                {
                  id: 't4',
                  stepNumber: 4,
                  title: 'Recursion & Pruning Stop',
                  description: 'Recurse on child partitions until stopping criteria is met (max_depth reached or min_samples_split violated).',
                  codeHint: 'if depth >= max_depth or n_samples < min_samples: return leaf_node()',
                },
              ]}
            />
          </div>
        )}
      </main>
    </div>
  );
}

