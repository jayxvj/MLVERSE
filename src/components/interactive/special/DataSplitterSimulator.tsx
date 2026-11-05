'use client';

import React, { useState } from 'react';
import { Sliders, Split, ShieldCheck, CheckCircle2, Lock, Flame } from 'lucide-react';

export default function DataSplitterSimulator() {
  const TOTAL_DATASET_SIZE = 1000;

  // Split percentages: trainPct + valPct + testPct = 100
  const [trainPct, setTrainPct] = useState<number>(70);
  const [valPct, setValPct] = useState<number>(15);
  const testPct = Math.max(0, 100 - trainPct - valPct);

  // Derived sample counts
  const trainCount = Math.round((trainPct / 100) * TOTAL_DATASET_SIZE);
  const valCount = Math.round((valPct / 100) * TOTAL_DATASET_SIZE);
  const testCount = TOTAL_DATASET_SIZE - trainCount - valCount;

  // Presets
  const applyPreset = (train: number, val: number) => {
    setTrainPct(train);
    setValPct(val);
  };

  return (
    <div className="rounded-2xl border border-electric-cyan/30 bg-navy-950/85 p-6 backdrop-blur-md shadow-glow">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-white/10 pb-4 mb-5">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono text-cyan-400">
            <Split className="h-4 w-4" />
            <span>DATA PARTITIONING ENGINE</span>
          </div>
          <h3 className="text-lg font-bold text-white mt-0.5">
            Train vs. Validation vs. Test Dataset Splitter
          </h3>
          <p className="text-xs text-slate-300">
            Adjust the allocation sliders below to visualize how the 1,000 total sample observations are partitioned across the ML lifecycle.
          </p>
        </div>

        {/* Quick Presets */}
        <div className="flex items-center gap-1.5 overflow-x-auto">
          <button
            onClick={() => applyPreset(80, 0)}
            className={`px-2.5 py-1 rounded text-xs font-mono transition ${
              trainPct === 80 && valPct === 0
                ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-400 font-bold'
                : 'bg-navy-900 border border-white/10 text-slate-400 hover:text-white'
            }`}
          >
            Classic 80/20
          </button>
          <button
            onClick={() => applyPreset(70, 15)}
            className={`px-2.5 py-1 rounded text-xs font-mono transition ${
              trainPct === 70 && valPct === 15
                ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-400 font-bold'
                : 'bg-navy-900 border border-white/10 text-slate-400 hover:text-white'
            }`}
          >
            Modern 70/15/15
          </button>
          <button
            onClick={() => applyPreset(60, 20)}
            className={`px-2.5 py-1 rounded text-xs font-mono transition ${
              trainPct === 60 && valPct === 20
                ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-400 font-bold'
                : 'bg-navy-900 border border-white/10 text-slate-400 hover:text-white'
            }`}
          >
            Deep 60/20/20
          </button>
        </div>
      </div>

      {/* Visual Dynamic Partition Bar */}
      <div className="space-y-2 mb-6">
        <div className="flex items-center justify-between text-xs font-mono text-slate-400">
          <span>Dataset Total: {TOTAL_DATASET_SIZE} Observations</span>
          <span>{trainPct}% Train • {valPct}% Val • {testPct}% Test</span>
        </div>

        <div className="w-full h-8 rounded-xl overflow-hidden flex border border-white/10 shadow-lg text-xs font-mono font-bold text-navy-950 text-center leading-8 select-none">
          {trainPct > 0 && (
            <div
              className="bg-gradient-to-r from-cyan-400 to-blue-500 transition-all duration-300 flex items-center justify-center overflow-hidden"
              style={{ width: `${trainPct}%` }}
              title={`Training Set: ${trainCount} samples`}
            >
              <span className="truncate px-2">Train: {trainCount} ({trainPct}%)</span>
            </div>
          )}

          {valPct > 0 && (
            <div
              className="bg-gradient-to-r from-purple-400 to-indigo-500 transition-all duration-300 flex items-center justify-center overflow-hidden"
              style={{ width: `${valPct}%` }}
              title={`Validation Set: ${valCount} samples`}
            >
              <span className="truncate px-2 text-white">Val: {valCount} ({valPct}%)</span>
            </div>
          )}

          {testPct > 0 && (
            <div
              className="bg-gradient-to-r from-emerald-400 to-teal-500 transition-all duration-300 flex items-center justify-center overflow-hidden"
              style={{ width: `${testPct}%` }}
              title={`Testing Set: ${testCount} samples`}
            >
              <span className="truncate px-2">Test: {testCount} ({testPct}%)</span>
            </div>
          )}
        </div>
      </div>

      {/* Interactive Sliders */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-6 p-4 rounded-xl bg-navy-900/60 border border-white/5">
        <div>
          <div className="flex justify-between text-xs font-mono mb-1">
            <span className="text-cyan-300 font-bold">1. Training Partition Size:</span>
            <span className="text-cyan-400 font-bold">{trainPct}% ({trainCount} rows)</span>
          </div>
          <input
            type="range"
            min="40"
            max="85"
            step="5"
            value={trainPct}
            onChange={(e) => {
              const newTrain = parseInt(e.target.value);
              setTrainPct(newTrain);
              if (newTrain + valPct > 95) {
                setValPct(Math.max(5, 95 - newTrain));
              }
            }}
            className="w-full accent-cyan-400 cursor-pointer"
          />
          <div className="text-[10px] text-slate-500 font-mono mt-0.5">Used exclusively to update parameter weights θ</div>
        </div>

        <div>
          <div className="flex justify-between text-xs font-mono mb-1">
            <span className="text-purple-300 font-bold">2. Validation Partition Size:</span>
            <span className="text-purple-400 font-bold">{valPct}% ({valCount} rows)</span>
          </div>
          <input
            type="range"
            min="0"
            max="30"
            step="5"
            value={valPct}
            onChange={(e) => {
              const newVal = parseInt(e.target.value);
              if (trainPct + newVal <= 95) {
                setValPct(newVal);
              }
            }}
            className="w-full accent-purple-400 cursor-pointer"
          />
          <div className="text-[10px] text-slate-500 font-mono mt-0.5">Used to tune hyperparameters and trigger early stopping</div>
        </div>
      </div>

      {/* Triad Partition Comparison Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Train Card */}
        <div className="p-4 rounded-xl bg-navy-900/80 border border-cyan-400/40 space-y-2">
          <div className="flex items-center gap-2 text-cyan-300 text-xs font-mono font-bold">
            <Flame className="h-4 w-4" />
            <span>TRAINING SET ({trainCount} rows)</span>
          </div>
          <p className="text-xs text-slate-300 leading-relaxed">
            The actual textbook studied by the model. Gradient descent computes partial derivatives ∇_θ L strictly on these samples to adjust internal weights.
          </p>
          <div className="text-[10px] font-mono text-cyan-400 pt-1">
            Role: Parameter Optimization (w, b)
          </div>
        </div>

        {/* Validation Card */}
        <div className="p-4 rounded-xl bg-navy-900/80 border border-purple-400/40 space-y-2">
          <div className="flex items-center gap-2 text-purple-300 text-xs font-mono font-bold">
            <Sliders className="h-4 w-4" />
            <span>VALIDATION SET ({valCount} rows)</span>
          </div>
          <p className="text-xs text-slate-300 leading-relaxed">
            The practice quiz. Used to tune architectural choices (hyperparameters like learning rate $\alpha$, polynomial degree, or tree depth) without biasing the final test.
          </p>
          <div className="text-[10px] font-mono text-purple-400 pt-1">
            Role: Hyperparameter Tuning & Early Stopping
          </div>
        </div>

        {/* Test Card */}
        <div className="p-4 rounded-xl bg-navy-900/80 border border-emerald-400/40 space-y-2">
          <div className="flex items-center gap-2 text-emerald-300 text-xs font-mono font-bold">
            <Lock className="h-4 w-4" />
            <span>TEST SET ({testCount} rows)</span>
          </div>
          <p className="text-xs text-slate-300 leading-relaxed">
            The final locked exam. Kept in a secure vault until the model architecture is completely finalized. Provides an unbiased measurement of real-world generalization.
          </p>
          <div className="text-[10px] font-mono text-emerald-400 pt-1">
            Role: Unbiased Generalization Metric
          </div>
        </div>
      </div>
    </div>
  );
}

