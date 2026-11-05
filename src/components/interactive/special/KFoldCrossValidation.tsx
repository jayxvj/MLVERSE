'use client';

import React, { useState } from 'react';
import { RefreshCw, ChevronRight, Info } from 'lucide-react';

const N_SAMPLES = 20;
const K_OPTIONS = [2, 3, 4, 5, 10];

const SAMPLE_IDS = Array.from({ length: N_SAMPLES }, (_, i) => i + 1);

function buildFolds(k: number): number[][] {
  const foldSize = Math.floor(N_SAMPLES / k);
  return Array.from({ length: k }, (_, i) =>
    SAMPLE_IDS.slice(i * foldSize, (i + 1) * foldSize)
  );
}

export default function KFoldCrossValidation() {
  const [K, setK] = useState(5);
  const [activeFold, setActiveFold] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  const folds = buildFolds(K);

  async function animateAll() {
    setIsAnimating(true);
    for (let i = 0; i < K; i++) {
      setActiveFold(i);
      await new Promise(r => setTimeout(r, 700));
    }
    setIsAnimating(false);
  }

  const mockScores = Array.from({ length: K }, (_, i) =>
    (0.82 + (Math.sin(i * 1.3) * 0.05)).toFixed(3)
  );
  const meanScore = (mockScores.reduce((s, v) => s + parseFloat(v), 0) / K).toFixed(3);

  return (
    <div className="rounded-2xl border border-border/80 bg-navy-900/60 p-6 backdrop-blur-md shadow-2xl space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-border/50 pb-5">
        <div className="flex items-center gap-3">
          <span className="p-2 rounded-lg bg-violet-500/10 border border-violet-500/30 text-violet-400">
            <RefreshCw className="w-5 h-5" />
          </span>
          <div>
            <h3 className="text-xl font-bold text-white">K-Fold Cross-Validation</h3>
            <p className="text-xs text-slate-400 mt-0.5">Select K folds and animate how validation windows rotate</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          {K_OPTIONS.map(k => (
            <button
              key={k}
              onClick={() => { setK(k); setActiveFold(0); }}
              className={`w-9 h-9 rounded-lg text-sm font-bold border transition-all ${
                K === k
                  ? 'bg-violet-500/20 border-violet-500/60 text-white'
                  : 'border-border/50 text-slate-400 hover:text-white'
              }`}
            >
              {k}
            </button>
          ))}
          <span className="text-xs text-slate-400 font-mono">K =</span>
        </div>
      </div>

      {/* Fold Grid */}
      <div className="space-y-2">
        <div className="flex items-center justify-between text-xs text-slate-400">
          <span className="font-mono uppercase tracking-wider">Data Partitions ({N_SAMPLES} samples)</span>
          <span className="font-mono text-slate-600">Click a row to inspect that fold</span>
        </div>
        <div className="space-y-2">
          {folds.map((fold, idx) => {
            const isValidation = idx === activeFold;
            return (
              <button
                key={idx}
                onClick={() => setActiveFold(idx)}
                className={`w-full flex items-center gap-3 p-2.5 rounded-xl border transition-all ${
                  isValidation
                    ? 'border-violet-500/60 bg-violet-500/10 shadow-[0_0_12px_rgba(168,85,247,0.2)]'
                    : 'border-border/40 bg-navy-950/40 hover:border-slate-600'
                }`}
              >
                {/* Fold label */}
                <div className={`shrink-0 text-[11px] font-bold font-mono w-14 text-right ${isValidation ? 'text-violet-300' : 'text-slate-500'}`}>
                  Fold {idx + 1}
                </div>

                {/* Sample Blocks */}
                <div className="flex-1 flex gap-1">
                  {SAMPLE_IDS.map(id => {
                    const inFold = fold.includes(id);
                    return (
                      <div
                        key={id}
                        title={`Sample ${id}`}
                        className={`flex-1 h-7 rounded-md text-[9px] font-bold flex items-center justify-center transition-all ${
                          inFold && isValidation
                            ? 'bg-violet-500 text-white shadow-[0_0_8px_rgba(168,85,247,0.6)]'
                            : inFold && !isValidation
                            ? 'bg-slate-700/60 text-slate-500'
                            : 'bg-electric-cyan/30 text-electric-cyan/80'
                        }`}
                      >
                        {id}
                      </div>
                    );
                  })}
                </div>

                {/* Score Tag */}
                <div className={`shrink-0 text-[11px] font-mono font-bold px-2 py-1 rounded-lg ${
                  isValidation ? 'text-violet-300 bg-violet-500/20' : 'text-slate-600 bg-navy-950/60'
                }`}>
                  {isValidation ? `Val: ${mockScores[idx]}` : `F1: ${mockScores[idx]}`}
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Legend */}
      <div className="flex flex-wrap gap-4 text-[11px]">
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded bg-electric-cyan/30 border border-electric-cyan/40" />
          <span className="text-slate-400">Training folds (fit model)</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded bg-violet-500 shadow-[0_0_6px_rgba(168,85,247,0.5)]" />
          <span className="text-slate-400">Validation fold (measure score)</span>
        </div>
      </div>

      {/* Current Fold Detail */}
      <div className="p-4 rounded-xl border border-violet-500/30 bg-violet-500/5 space-y-2">
        <div className="flex items-center justify-between">
          <span className="text-xs font-bold text-white">Fold {activeFold + 1} as Validation Set</span>
          <span className="text-xs font-mono text-violet-300">F1 Score: {mockScores[activeFold]}</span>
        </div>
        <div className="text-[11px] text-slate-300 leading-relaxed">
          Training on <strong className="text-electric-cyan">{N_SAMPLES - folds[activeFold].length} samples</strong> (folds {
            Array.from({ length: K }, (_, i) => i + 1).filter(i => i !== activeFold + 1).join(', ')
          }). Validating on <strong className="text-violet-300">{folds[activeFold].length} samples</strong> (fold {activeFold + 1}).
        </div>
      </div>

      {/* Animate & Results */}
      <div className="flex items-center gap-4">
        <button
          onClick={animateAll}
          disabled={isAnimating}
          className="flex items-center gap-2 px-4 py-2 rounded-xl border border-violet-500/60 bg-violet-500/15 text-violet-300 text-xs font-semibold hover:bg-violet-500/25 transition-all disabled:opacity-50"
        >
          <RefreshCw className={`w-3.5 h-3.5 ${isAnimating ? 'animate-spin' : ''}`} />
          Animate All {K} Folds
        </button>
        <div className="flex items-center gap-2 text-xs">
          <span className="text-slate-400 font-mono">Mean CV Score:</span>
          <span className="text-electric-cyan font-bold font-mono text-base">{meanScore}</span>
          <span className="text-slate-500">± {(Math.max(...mockScores.map(Number)) - Math.min(...mockScores.map(Number))).toFixed(3)}</span>
        </div>
      </div>

      {/* Insight box */}
      <div className="flex gap-2.5 p-3.5 rounded-xl border border-electric-cyan/20 bg-electric-cyan/5">
        <Info className="w-4 h-4 text-electric-cyan shrink-0 mt-0.5" />
        <p className="text-[11px] text-slate-300 leading-relaxed">
          <strong className="text-electric-cyan">Why cross-validate?</strong> A single train/test split gives one luck-dependent score. K-Fold rotates the validation window {K} times and averages, dramatically reducing the variance of the performance estimate.
        </p>
      </div>
    </div>
  );
}

