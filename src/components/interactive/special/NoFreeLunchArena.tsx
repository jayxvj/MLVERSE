'use client';

import React, { useState } from 'react';
import { Trophy, Swords, Sparkles, CheckCircle2, XCircle, ArrowRight, ShieldAlert } from 'lucide-react';

interface AlgorithmPerformance {
  name: string;
  family: string;
  accuracy: number;
  isWinner: boolean;
  whyItWonOrLost: string;
}

interface DatasetProblem {
  id: string;
  name: string;
  geometry: string;
  description: string;
  winningAlgorithm: string;
  algorithms: AlgorithmPerformance[];
}

const PROBLEMS: DatasetProblem[] = [
  {
    id: 'linear',
    name: 'Problem 1: Pure Linear Boundary',
    geometry: 'Linearly Separable Data (y = sign(2x₁ + 3x₂ - 5))',
    description: 'The two classes are cleanly partitioned by a single straight hyperplane with light Gaussian measurement noise.',
    winningAlgorithm: 'Linear Logistic Regression',
    algorithms: [
      {
        name: 'Linear Logistic Regression',
        family: 'Parametric Linear',
        accuracy: 98.5,
        isWinner: true,
        whyItWonOrLost: 'Perfect structural inductive bias match! The algorithm assumes a straight hyperplane, which exactly mirrors reality. Low variance prevents it from being misled by noise.',
      },
      {
        name: 'Decision Tree (Deep)',
        family: 'Non-Parametric Axis-Split',
        accuracy: 89.0,
        isWinner: false,
        whyItWonOrLost: 'Must approximate the diagonal line using a jagged staircase of horizontal and vertical splits, slightly overfitting to random noise points.',
      },
      {
        name: 'K-Nearest Neighbors (K=1)',
        family: 'Non-Parametric Instance',
        accuracy: 84.5,
        isWinner: false,
        whyItWonOrLost: 'Excessively sensitive to noisy outlier points near the boundary, creating islands of misclassification.',
      },
    ],
  },
  {
    id: 'circles',
    name: 'Problem 2: Concentric Circular Rings',
    geometry: 'Non-Linear Radial Geometry (x₁² + x₂² < r²)',
    description: 'Class 1 forms a circular core in the center; Class 0 wraps entirely around it in an outer ring (XOR-like structure).',
    winningAlgorithm: 'K-Nearest Neighbors (KNN)',
    algorithms: [
      {
        name: 'Linear Logistic Regression',
        family: 'Parametric Linear',
        accuracy: 51.0,
        isWinner: false,
        whyItWonOrLost: 'Catastrophic failure (~random guessing). A straight line is mathematically incapable of cutting a circle out from the center of a plane.',
      },
      {
        name: 'K-Nearest Neighbors (KNN, K=5)',
        family: 'Non-Parametric Instance',
        accuracy: 97.5,
        isWinner: true,
        whyItWonOrLost: 'Winner! KNN relies purely on local spatial distance rather than global geometric linearity. Neighboring points within the inner ring correctly vote for Class 1.',
      },
      {
        name: 'Decision Tree (Depth 4)',
        family: 'Non-Parametric Axis-Split',
        accuracy: 92.0,
        isWinner: false,
        whyItWonOrLost: 'Approximates the circle via an octagon-shaped box of 8 axis-aligned cuts. Effective, but slightly inferior to circular Euclidean distance.',
      },
    ],
  },
  {
    id: 'discontinuous',
    name: 'Problem 3: Multi-Step Rule Thresholds',
    geometry: 'Orthogonal Hierarchical Partitions',
    description: 'Outcome determined by discrete step rules: e.g. If Age > 50 and Income > 80k OR Age < 25 and Credit < 600.',
    winningAlgorithm: 'Random Forest / Decision Tree',
    algorithms: [
      {
        name: 'Linear Logistic Regression',
        family: 'Parametric Linear',
        accuracy: 68.0,
        isWinner: false,
        whyItWonOrLost: 'Cannot model independent rectangular quadrant conditions without handcrafted non-linear interaction terms.',
      },
      {
        name: 'Decision Tree',
        family: 'Non-Parametric Axis-Split',
        accuracy: 99.0,
        isWinner: true,
        whyItWonOrLost: 'Winner! The tree\'s recursive splitting logic mirrors the exact axis-aligned step conditions that generated the data.',
      },
      {
        name: 'K-Nearest Neighbors (KNN)',
        family: 'Non-Parametric Instance',
        accuracy: 86.5,
        isWinner: false,
        whyItWonOrLost: 'Struggles along the sharp rectangular boundaries where Euclidean distance treats diagonal separation smoothly rather than abruptly.',
      },
    ],
  },
];

export default function NoFreeLunchArena() {
  const [selectedProblemId, setSelectedProblemId] = useState<string>('linear');

  const problem = PROBLEMS.find((p) => p.id === selectedProblemId) || PROBLEMS[0];

  return (
    <div className="rounded-2xl border border-electric-cyan/30 bg-navy-950/85 p-6 backdrop-blur-md shadow-glow">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-white/10 pb-4 mb-5">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono text-cyan-400">
            <Swords className="h-4 w-4" />
            <span>THE NO FREE LUNCH (NFL) TOURNAMENT ARENA</span>
          </div>
          <h3 className="text-lg font-bold text-white mt-0.5">
            The No Free Lunch Theorem in Action
          </h3>
          <p className="text-xs text-slate-300">
            Mathematical proof by Wolpert & Macready (1997): No single algorithm outperforms all others across every problem distribution.
          </p>
        </div>

        {/* Problem Selector Buttons */}
        <div className="flex items-center gap-1.5 overflow-x-auto">
          {PROBLEMS.map((p) => (
            <button
              key={p.id}
              onClick={() => setSelectedProblemId(p.id)}
              className={`px-3 py-1.5 rounded-lg text-xs font-mono font-medium whitespace-nowrap transition ${
                selectedProblemId === p.id
                  ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-400 shadow-glow font-bold'
                  : 'bg-navy-900 border border-white/10 text-slate-400 hover:text-white'
              }`}
            >
              {p.name.split(':')[0]}
            </button>
          ))}
        </div>
      </div>

      {/* Problem Landscape Banner */}
      <div className="p-4 rounded-xl bg-navy-900/90 border border-white/10 mb-5 text-xs">
        <div className="flex items-center justify-between font-mono text-cyan-400 mb-1">
          <span className="font-bold">{problem.name}</span>
          <span className="text-slate-400">{problem.geometry}</span>
        </div>
        <p className="text-slate-200 leading-relaxed">{problem.description}</p>
      </div>

      {/* Algorithm Scoreboard */}
      <div className="space-y-3 mb-5">
        {problem.algorithms.map((algo) => (
          <div
            key={algo.name}
            className={`p-4 rounded-xl border transition-all ${
              algo.isWinner
                ? 'border-emerald-500/50 bg-emerald-950/20 shadow-[0_0_15px_rgba(16,185,129,0.25)]'
                : 'border-white/10 bg-navy-900/60'
            }`}
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2">
              <div className="flex items-center gap-2.5">
                {algo.isWinner ? (
                  <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-emerald-500 text-black font-bold">
                    <Trophy className="h-4 w-4" />
                  </div>
                ) : (
                  <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-white/10 text-slate-400 font-mono text-xs">
                    #2
                  </div>
                )}
                <div>
                  <h4 className="text-sm font-bold text-white flex items-center gap-2">
                    <span>{algo.name}</span>
                    <span className="text-[10px] font-mono text-slate-400 px-2 py-0.5 rounded bg-white/5 border border-white/10">
                      {algo.family}
                    </span>
                  </h4>
                </div>
              </div>

              {/* Accuracy Meter */}
              <div className="flex items-center gap-3">
                <div className="w-28 bg-navy-950 h-2.5 rounded-full overflow-hidden border border-white/10">
                  <div
                    className={`h-full ${algo.isWinner ? 'bg-emerald-400' : 'bg-cyan-400'}`}
                    style={{ width: `${algo.accuracy}%` }}
                  />
                </div>
                <span className={`font-mono text-base font-black ${algo.isWinner ? 'text-emerald-300' : 'text-slate-300'}`}>
                  {algo.accuracy.toFixed(1)}% Acc
                </span>
              </div>
            </div>

            <p className="text-xs text-slate-300 pl-9 leading-relaxed">
              <strong>Why this outcome?</strong> {algo.whyItWonOrLost}
            </p>
          </div>
        ))}
      </div>

      {/* The Core Lesson Takeaway */}
      <div className="p-4 rounded-xl bg-gradient-to-r from-navy-900 to-navy-950 border border-cyan-400/30 text-xs flex items-start gap-3">
        <Sparkles className="h-5 w-5 text-cyan-400 shrink-0 mt-0.5" />
        <div className="space-y-1">
          <span className="font-mono text-cyan-400 font-bold uppercase block">
            The Fundamental Takeaway of the No Free Lunch Theorem:
          </span>
          <p className="text-slate-300 leading-relaxed">
            Every machine learning algorithm makes an <strong>inductive bias</strong> (an implicit mathematical assumption about the shape of the world). If the assumption matches the data geometry, the algorithm triumphs. If the assumption conflicts, the algorithm fails. Therefore, <em>the role of the ML engineer is not to seek a mythical single "best" algorithm, but to explore and match algorithms to the true geometry of the problem.</em>
          </p>
        </div>
      </div>
    </div>
  );
}

