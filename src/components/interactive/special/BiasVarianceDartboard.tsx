'use client';

import React, { useState, useMemo } from 'react';
import { Target, RefreshCw, Zap, Sliders, Info, ShieldAlert, Award } from 'lucide-react';

type Mode = 'low-bias-low-var' | 'high-bias-low-var' | 'low-bias-high-var' | 'high-bias-high-var';

interface Dart {
  x: number; // offset from center (0,0)
  y: number;
}

export default function BiasVarianceDartboard() {
  const [mode, setMode] = useState<Mode>('low-bias-low-var');
  const [seed, setSeed] = useState<number>(1);

  // Generate 15 simulated darts based on the chosen mode
  const { darts, bias, variance, totalMse, modeInfo } = useMemo(() => {
    // Center is (0,0) - perfect prediction
    let biasOffsetX = 0;
    let biasOffsetY = 0;
    let spread = 8; // standard deviation in pixels

    let title = '';
    let description = '';
    let modelAnalogy = '';
    let recommendation = '';

    switch (mode) {
      case 'low-bias-low-var':
        biasOffsetX = 0;
        biasOffsetY = 0;
        spread = 9;
        title = 'Low Bias, Low Variance';
        description = 'The Holy Grail of machine learning. Predictions are centered right on the true target with minimal variation across different training datasets.';
        modelAnalogy = 'Regularized gradient-boosted trees or a well-tuned neural network with optimal capacity and early stopping.';
        recommendation = 'Ideal generalization performance. Ready for production deployment.';
        break;
      case 'high-bias-low-var':
        biasOffsetX = 45;
        biasOffsetY = -40;
        spread = 8;
        title = 'High Bias, Low Variance';
        description = 'Predictions are tightly clustered together (low variance), but consistently miss the true bullseye by a large margin (high bias). Systematic underfitting.';
        modelAnalogy = 'Fitting a rigid straight line (Linear Regression) to inherently curved non-linear data.';
        recommendation = 'Increase model complexity: add polynomial features, increase tree depth, or reduce regularization.';
        break;
      case 'low-bias-high-var':
        biasOffsetX = 0;
        biasOffsetY = 0;
        spread = 44;
        title = 'Low Bias, High Variance';
        description = 'On average, the center of mass of all predictions hits the bullseye (low bias), but individual predictions are wildly scattered across the board (high variance). Overfitting.';
        modelAnalogy = 'An unpruned decision tree with infinite depth memorizing every noisy training sample.';
        recommendation = 'Apply regularization (L1/L2), gather more training data, prune trees, or use ensemble bagging (Random Forests).';
        break;
      case 'high-bias-high-var':
        biasOffsetX = 40;
        biasOffsetY = 38;
        spread = 38;
        title = 'High Bias, High Variance';
        description = 'The worst possible scenario. The predictions are both systematically far from the bullseye AND wildly scattered from one dataset to the next.';
        modelAnalogy = 'A complex model trained on a tiny, biased, and noisy dataset with poor feature representation.';
        recommendation = 'Fundamental rethink needed: audit data quality, collect better features, and simplify architecture.';
        break;
    }

    // Pseudorandom generation using seed
    const pseudoRand = (s: number) => {
      const x = Math.sin(s * 9999 + seed * 123) * 10000;
      return x - Math.floor(x);
    };

    const generatedDarts: Dart[] = [];
    let sumX = 0;
    let sumY = 0;

    for (let i = 0; i < 16; i++) {
      // Box-Muller-like approximation using uniform sum
      const u1 = pseudoRand(i * 3 + 1);
      const u2 = pseudoRand(i * 3 + 2);
      const u3 = pseudoRand(i * 3 + 3);
      const u4 = pseudoRand(i * 3 + 4);
      const normX = (u1 + u2 - 1) * 1.73;
      const normY = (u3 + u4 - 1) * 1.73;

      const dx = biasOffsetX + normX * spread;
      const dy = biasOffsetY + normY * spread;

      generatedDarts.push({ x: dx, y: dy });
      sumX += dx;
      sumY += dy;
    }

    const meanX = sumX / generatedDarts.length;
    const meanY = sumY / generatedDarts.length;

    // Bias = Euclidean distance from center of mass (meanX, meanY) to true bullseye (0,0)
    const calculatedBias = Math.sqrt(meanX * meanX + meanY * meanY);
    const biasSq = calculatedBias * calculatedBias;

    // Variance = Average squared distance of each dart from the center of mass (meanX, meanY)
    let sumVar = 0;
    generatedDarts.forEach((d) => {
      const distFromMean = Math.sqrt((d.x - meanX) ** 2 + (d.y - meanY) ** 2);
      sumVar += distFromMean ** 2;
    });
    const calculatedVariance = sumVar / generatedDarts.length;

    // Total MSE = Bias² + Variance (assuming 0 irreducible noise for target visualization)
    const calculatedTotalMse = biasSq + calculatedVariance;

    return {
      darts: generatedDarts,
      bias: calculatedBias,
      variance: calculatedVariance,
      totalMse: calculatedTotalMse,
      modeInfo: { title, description, modelAnalogy, recommendation, meanX, meanY },
    };
  }, [mode, seed]);

  return (
    <div className="rounded-2xl border border-electric-cyan/30 bg-navy-950/85 p-6 backdrop-blur-md shadow-glow">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-white/10 pb-4 mb-5">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono text-cyan-400">
            <Target className="h-4 w-4" />
            <span>ARCHITECTURAL TARGET BENCHMARK</span>
          </div>
          <h3 className="text-lg font-bold text-white mt-0.5">
            Bias and Variance Dartboard Simulator
          </h3>
          <p className="text-xs text-slate-300">
            Bullseye (Center) = Ground Truth True Value. Each dart = Prediction from a model trained on a different dataset sample.
          </p>
        </div>

        <button
          onClick={() => setSeed((s) => s + 1)}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium border border-cyan-500/30 bg-cyan-500/10 text-cyan-300 hover:bg-cyan-500/20 transition-colors w-fit"
        >
          <RefreshCw className="h-3.5 w-3.5" />
          <span>Resample Training Runs</span>
        </button>
      </div>

      {/* 4 Quadrant Selector Tabs */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-2.5 mb-6">
        <button
          onClick={() => setMode('low-bias-low-var')}
          className={`p-3 rounded-xl border text-left transition-all ${
            mode === 'low-bias-low-var'
              ? 'border-emerald-400 bg-emerald-950/40 text-emerald-300 shadow-glow'
              : 'border-white/10 bg-navy-900/60 text-slate-400 hover:text-white hover:bg-navy-900'
          }`}
        >
          <div className="text-[10px] font-mono font-bold uppercase tracking-wider text-emerald-400">
            THE IDEAL GOAL
          </div>
          <div className="text-xs font-bold mt-1 text-white">Low Bias, Low Var</div>
          <div className="text-[10px] opacity-70 mt-0.5">Accurate & Consistent</div>
        </button>

        <button
          onClick={() => setMode('high-bias-low-var')}
          className={`p-3 rounded-xl border text-left transition-all ${
            mode === 'high-bias-low-var'
              ? 'border-blue-400 bg-blue-950/40 text-blue-300 shadow-glow'
              : 'border-white/10 bg-navy-900/60 text-slate-400 hover:text-white hover:bg-navy-900'
          }`}
        >
          <div className="text-[10px] font-mono font-bold uppercase tracking-wider text-blue-400">
            UNDERFITTING
          </div>
          <div className="text-xs font-bold mt-1 text-white">High Bias, Low Var</div>
          <div className="text-[10px] opacity-70 mt-0.5">Consistently Wrong</div>
        </button>

        <button
          onClick={() => setMode('low-bias-high-var')}
          className={`p-3 rounded-xl border text-left transition-all ${
            mode === 'low-bias-high-var'
              ? 'border-purple-400 bg-purple-950/40 text-purple-300 shadow-glow-violet'
              : 'border-white/10 bg-navy-900/60 text-slate-400 hover:text-white hover:bg-navy-900'
          }`}
        >
          <div className="text-[10px] font-mono font-bold uppercase tracking-wider text-purple-400">
            OVERFITTING
          </div>
          <div className="text-xs font-bold mt-1 text-white">Low Bias, High Var</div>
          <div className="text-[10px] opacity-70 mt-0.5">Right on Avg, Wildly Erratic</div>
        </button>

        <button
          onClick={() => setMode('high-bias-high-var')}
          className={`p-3 rounded-xl border text-left transition-all ${
            mode === 'high-bias-high-var'
              ? 'border-rose-400 bg-rose-950/40 text-rose-300 shadow-glow'
              : 'border-white/10 bg-navy-900/60 text-slate-400 hover:text-white hover:bg-navy-900'
          }`}
        >
          <div className="text-[10px] font-mono font-bold uppercase tracking-wider text-rose-400">
            WORST COMBINATION
          </div>
          <div className="text-xs font-bold mt-1 text-white">High Bias, High Var</div>
          <div className="text-[10px] opacity-70 mt-0.5">Biased & Inconsistent</div>
        </button>
      </div>

      {/* Main Interactive Stage: Dartboard + Live Metrics */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center mb-6">
        {/* SVG Target Board */}
        <div className="lg:col-span-6 flex justify-center">
          <div className="relative w-64 h-64 sm:w-72 sm:h-72 p-2 rounded-2xl bg-navy-900/90 border border-white/10 shadow-2xl flex items-center justify-center">
            <svg viewBox="-110 -110 220 220" className="w-full h-full">
              {/* Outer Ring 4 */}
              <circle cx="0" cy="0" r="100" fill="#0f172a" stroke="#334155" strokeWidth="2" />
              {/* Ring 3 */}
              <circle cx="0" cy="0" r="75" fill="#1e293b" stroke="#475569" strokeWidth="1.5" />
              {/* Ring 2 */}
              <circle cx="0" cy="0" r="50" fill="#0f172a" stroke="#64748b" strokeWidth="1.5" />
              {/* Ring 1 - Bullseye Zone */}
              <circle cx="0" cy="0" r="25" fill="#0284c7" fillOpacity="0.25" stroke="#38bdf8" strokeWidth="1.5" />
              {/* Golden Bullseye (Ground Truth True f(x)) */}
              <circle cx="0" cy="0" r="10" fill="#f59e0b" stroke="#fbbf24" strokeWidth="2" />

              {/* Crosshairs */}
              <line x1="-100" y1="0" x2="100" y2="0" stroke="#334155" strokeDasharray="3 3" strokeWidth="1" />
              <line x1="0" y1="-100" x2="0" y2="100" stroke="#334155" strokeDasharray="3 3" strokeWidth="1" />

              {/* Average Center of Mass Marker */}
              <circle
                cx={modeInfo.meanX}
                cy={modeInfo.meanY}
                r="7"
                fill="none"
                stroke="#00f0ff"
                strokeWidth="2.5"
                strokeDasharray="2 2"
              />
              <line
                x1="0"
                y1="0"
                x2={modeInfo.meanX}
                y2={modeInfo.meanY}
                stroke="#00f0ff"
                strokeWidth="1.5"
                strokeDasharray="2 2"
                opacity="0.8"
              />

              {/* Darts (Individual model predictions across 16 different datasets) */}
              {darts.map((d, idx) => (
                <g key={idx}>
                  <circle
                    cx={d.x}
                    cy={d.y}
                    r="4.5"
                    fill={mode === 'low-bias-low-var' ? '#10b981' : mode === 'high-bias-low-var' ? '#38bdf8' : mode === 'low-bias-high-var' ? '#c084fc' : '#fb7185'}
                    stroke="#ffffff"
                    strokeWidth="1.2"
                    className="transition-all duration-300"
                  />
                </g>
              ))}
            </svg>

            {/* Target Legend in corner */}
            <div className="absolute bottom-2 left-2 text-[9px] font-mono text-slate-400 bg-navy-950/80 px-2 py-1 rounded border border-white/5 space-y-0.5">
              <div>🎯 Gold = Ground Truth Target</div>
              <div>⭕ Cyan = Mean Prediction (Bias Vector)</div>
              <div>• Dots = 16 Model Runs</div>
            </div>
          </div>
        </div>

        {/* Live Mathematical Diagnostics */}
        <div className="lg:col-span-6 space-y-4">
          <div className="p-4 rounded-xl bg-navy-900/80 border border-white/10 space-y-3">
            <h4 className="text-sm font-bold text-white flex items-center justify-between">
              <span>{modeInfo.title}</span>
              <span className="text-xs font-mono text-cyan-400 font-normal">
                MSE = Bias² + Variance
              </span>
            </h4>

            {/* Diagnostic Bars */}
            <div className="space-y-2 font-mono text-xs">
              {/* Bias Measure */}
              <div>
                <div className="flex justify-between text-slate-300 text-[11px] mb-1">
                  <span>Bias² (Distance from Bullseye):</span>
                  <span className="text-cyan-400 font-bold">{(bias * bias).toFixed(1)}</span>
                </div>
                <div className="h-2 w-full rounded-full bg-navy-950 overflow-hidden border border-white/5">
                  <div
                    className="h-full bg-cyan-400 rounded-full transition-all duration-500"
                    style={{ width: `${Math.min(100, ((bias * bias) / 4000) * 100)}%` }}
                  />
                </div>
              </div>

              {/* Variance Measure */}
              <div>
                <div className="flex justify-between text-slate-300 text-[11px] mb-1">
                  <span>Variance (Dispersion / Scatter):</span>
                  <span className="text-purple-400 font-bold">{variance.toFixed(1)}</span>
                </div>
                <div className="h-2 w-full rounded-full bg-navy-950 overflow-hidden border border-white/5">
                  <div
                    className="h-full bg-purple-400 rounded-full transition-all duration-500"
                    style={{ width: `${Math.min(100, (variance / 2500) * 100)}%` }}
                  />
                </div>
              </div>

              {/* Total Expected Error */}
              <div className="pt-2 border-t border-white/10 flex justify-between items-baseline">
                <span className="text-slate-400 text-xs">Total Expected Error:</span>
                <span className="text-base font-bold text-white font-mono">
                  {totalMse.toFixed(1)} <span className="text-xs text-slate-400 font-normal">px²</span>
                </span>
              </div>
            </div>
          </div>

          {/* Conceptual Insight Box */}
          <div className="p-3.5 rounded-xl bg-navy-900/50 border border-white/5 space-y-1.5 text-xs">
            <div className="text-slate-200 font-medium">{modeInfo.description}</div>
            <div className="text-slate-400 text-[11px]">
              <strong className="text-cyan-300">Typical Real-World Model:</strong> {modeInfo.modelAnalogy}
            </div>
            <div className="text-slate-400 text-[11px]">
              <strong className="text-emerald-300">Engineering Action:</strong> {modeInfo.recommendation}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

