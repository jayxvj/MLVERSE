'use client';

import React, { useState } from 'react';
import { ShieldAlert, ShieldCheck, ArrowRight, Code, AlertTriangle, CheckCircle2, Sliders } from 'lucide-react';

export default function DataLeakageDemo() {
  const [pipelineMode, setPipelineMode] = useState<'leaky' | 'correct'>('leaky');

  // Toy dataset with 6 train samples and 2 holdout test samples
  // Notice the holdout test set has a high-value outlier ($200k)
  const trainRaw = [30000, 42000, 38000, 50000, 45000, 55000];
  const testRaw = [48000, 200000]; // $200k is an unseen future surge

  // Leaky Approach: Scaler fits on ALL 8 samples (train + test)
  const allRaw = [...trainRaw, ...testRaw];
  const leakyMean = Math.round(allRaw.reduce((a, b) => a + b, 0) / allRaw.length);
  const leakyMax = Math.max(...allRaw);

  // Correct Approach: Scaler fits STRICTLY on 6 train samples
  const correctMean = Math.round(trainRaw.reduce((a, b) => a + b, 0) / trainRaw.length);
  const correctMax = Math.max(...trainRaw);

  // Computed parameters depending on mode
  const currentMean = pipelineMode === 'leaky' ? leakyMean : correctMean;
  const currentMax = pipelineMode === 'leaky' ? leakyMax : correctMax;

  // Scale train samples using current scaler
  const scaledTrain = trainRaw.map(v => Number(((v - (pipelineMode === 'leaky' ? 30000 : 30000)) / (currentMax - 30000)).toFixed(3)));
  const scaledTest = testRaw.map(v => Number(((v - (pipelineMode === 'leaky' ? 30000 : 30000)) / (currentMax - 30000)).toFixed(3)));

  return (
    <div className="rounded-2xl border border-electric-cyan/30 bg-navy-950/85 p-6 backdrop-blur-md shadow-glow">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-white/10 pb-4 mb-5">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono text-cyan-400">
            <ShieldAlert className="h-4 w-4" />
            <span>ARCHITECTURAL INTEGRITY BENCHMARK</span>
          </div>
          <h3 className="text-lg font-bold text-white mt-0.5">
            Data Leakage & Preprocessing Pipeline Simulator
          </h3>
          <p className="text-xs text-slate-300">
            See how preprocessing before splitting contaminates your holdout audit, giving falsely optimistic results.
          </p>
        </div>

        {/* Toggle Mode */}
        <div className="grid grid-cols-2 gap-2 p-1 rounded-xl bg-navy-900 border border-white/10">
          <button
            onClick={() => setPipelineMode('leaky')}
            className={`px-3 py-1.5 rounded-lg text-xs font-mono transition-all flex items-center gap-1.5 ${
              pipelineMode === 'leaky'
                ? 'bg-rose-500/20 text-rose-300 border border-rose-500/30'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <ShieldAlert className="h-3.5 w-3.5" />
            <span>Flawed (Leaky)</span>
          </button>
          <button
            onClick={() => setPipelineMode('correct')}
            className={`px-3 py-1.5 rounded-lg text-xs font-mono transition-all flex items-center gap-1.5 ${
              pipelineMode === 'correct'
                ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <ShieldCheck className="h-3.5 w-3.5" />
            <span>Correct (Pipeline)</span>
          </button>
        </div>
      </div>

      {/* Visual Flow Diagram */}
      <div className="p-4 rounded-xl bg-navy-900/60 border border-white/10 mb-5 text-xs font-mono">
        <div className="text-[10px] text-slate-400 uppercase font-bold mb-2">
          Execution Order Flow:
        </div>
        {pipelineMode === 'leaky' ? (
          <div className="flex flex-wrap items-center gap-2 text-rose-300">
            <span className="p-2 rounded bg-rose-950/60 border border-rose-500/30">
              1. Full Dataset (8 samples)
            </span>
            <ArrowRight className="h-4 w-4 text-slate-500" />
            <span className="p-2 rounded bg-rose-950/80 border border-rose-400 font-bold">
              2. Fit Scaler on ALL Data ⚠️ LEAKAGE OCCURS HERE!
            </span>
            <ArrowRight className="h-4 w-4 text-slate-500" />
            <span className="p-2 rounded bg-rose-950/40 border border-rose-500/20">
              3. train_test_split()
            </span>
          </div>
        ) : (
          <div className="flex flex-wrap items-center gap-2 text-emerald-300">
            <span className="p-2 rounded bg-emerald-950/40 border border-emerald-500/20">
              1. train_test_split() FIRST
            </span>
            <ArrowRight className="h-4 w-4 text-slate-500" />
            <span className="p-2 rounded bg-emerald-950/80 border border-emerald-400 font-bold">
              2. scaler.fit_transform(X_train ONLY)
            </span>
            <ArrowRight className="h-4 w-4 text-slate-500" />
            <span className="p-2 rounded bg-emerald-950/60 border border-emerald-500/30">
              3. scaler.transform(X_test frozen)
            </span>
          </div>
        )}
      </div>

      {/* Numerical Impact Readout */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-5 font-mono">
        <div className={`p-4 rounded-xl border ${pipelineMode === 'leaky' ? 'border-rose-500/40 bg-rose-950/20' : 'border-emerald-500/40 bg-emerald-950/20'}`}>
          <div className="text-[10px] text-slate-400 uppercase font-bold">Computed Scaler Max</div>
          <div className="text-2xl font-bold text-white mt-1">
            ${currentMax.toLocaleString()}
          </div>
          <p className="text-[11px] text-slate-400 mt-1">
            {pipelineMode === 'leaky' ? 'Contaminated by test point $200k!' : 'Strictly bounded by train max ($55k)'}
          </p>
        </div>

        <div className="p-4 rounded-xl bg-navy-900/80 border border-white/10">
          <div className="text-[10px] text-slate-400 uppercase font-bold">Computed Scaler Mean</div>
          <div className="text-2xl font-bold text-cyan-300 mt-1">
            ${currentMean.toLocaleString()}
          </div>
          <p className="text-[11px] text-slate-400 mt-1">
            {pipelineMode === 'leaky' ? 'Shifted +$7,000 by test data!' : 'Honest in-sample empirical mean'}
          </p>
        </div>

        <div className="p-4 rounded-xl bg-navy-900/80 border border-white/10">
          <div className="text-[10px] text-slate-400 uppercase font-bold">Scaled Test Outlier ($200k)</div>
          <div className="text-2xl font-bold text-purple-300 mt-1">
            {scaledTest[1]}
          </div>
          <p className="text-[11px] text-slate-400 mt-1">
            {pipelineMode === 'leaky' ? 'Capped at 1.0 (artificial)' : '> 1.0 (realistically out-of-bounds!)'}
          </p>
        </div>
      </div>

      {/* Code Sample: The Scikit-Learn Pipeline Solution */}
      <div className="p-4 rounded-xl bg-navy-900 border border-white/10 font-mono text-xs space-y-2 mb-4">
        <div className="flex items-center gap-2 text-cyan-300 font-bold">
          <Code className="h-4 w-4" />
          <span>The Bulletproof Scikit-Learn Solution:</span>
        </div>
        <pre className="p-3 rounded-lg bg-black/60 text-slate-300 overflow-x-auto text-[11px] leading-relaxed">
{`from sklearn.pipeline import Pipeline
from sklearn.preprocessing import StandardScaler
from sklearn.linear_model import Ridge
from sklearn.model_selection import train_test_split

# 1. Split FIRST
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

# 2. Package Preprocessing + Model into a single Atomic Pipeline
pipeline = Pipeline([
    ('scaler', StandardScaler()), # Fits ONLY on X_train during pipeline.fit()
    ('model', Ridge())
])

# 3. Fit strictly learns parameters (mean, std) from X_train
pipeline.fit(X_train, y_train)

# 4. Predict applies X_train's learned scaler parameters to unseen X_test
predictions = pipeline.predict(X_test)`}
        </pre>
      </div>

      {/* Diagnostic Callout */}
      <div className={`p-4 rounded-xl border ${pipelineMode === 'leaky' ? 'border-rose-500/30 bg-rose-950/20 text-rose-200' : 'border-emerald-500/30 bg-emerald-950/20 text-emerald-200'} text-xs space-y-1.5`}>
        <div className="font-bold flex items-center gap-1.5 font-mono">
          {pipelineMode === 'leaky' ? <AlertTriangle className="h-4 w-4 text-rose-400" /> : <CheckCircle2 className="h-4 w-4 text-emerald-400" />}
          <span>{pipelineMode === 'leaky' ? 'WARNING: CATASTROPHIC INFORMATION LEAKAGE' : 'CLEAN ISOLATION: PRODUCTION-READY ARCHITECTURE'}</span>
        </div>
        <p className="leading-relaxed">
          {pipelineMode === 'leaky'
            ? 'When you compute mean, standard deviation, or min/max on the full dataset before splitting, the training set inherits subtle statistical artifacts from the test set. When the model is evaluated, test scores are artificially high because the model already "peeked" at the test set parameters.'
            : 'Using an atomic Scikit-Learn Pipeline guarantees that data transformations learn statistics STRICTLY from X_train. The test set remains an unpolluted, objective benchmark of real-world generalization.'}
        </p>
      </div>
    </div>
  );
}

