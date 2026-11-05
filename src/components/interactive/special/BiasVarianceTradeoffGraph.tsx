'use client';

import React, { useState, useMemo } from 'react';
import { TrendingUp, Sliders, Info, ShieldCheck, AlertCircle } from 'lucide-react';
import InteractiveChart from '../InteractiveChart';

export default function BiasVarianceTradeoffGraph() {
  const [complexity, setComplexity] = useState<number>(5); // 1 to 10
  const irreducibleNoise = 1.5; // constant sigma^2 floor

  // Generate continuous curve data across complexity 1 to 10
  const chartData = useMemo(() => {
    const data = [];
    for (let c = 1; c <= 10; c += 0.5) {
      // Bias^2: starts high at complexity 1, decays exponentially towards zero
      const biasSq = Number((12 * Math.exp(-0.45 * (c - 1))).toFixed(2));

      // Variance: starts very low at complexity 1, grows quadratically/exponentially as capacity increases
      const variance = Number((0.2 + 0.12 * Math.pow(c - 1, 2.1)).toFixed(2));

      // Total Expected Test Error = Bias^2 + Variance + Irreducible Error (sigma^2)
      const totalError = Number((biasSq + variance + irreducibleNoise).toFixed(2));

      data.push({
        complexity: c,
        biasSquared: biasSq,
        variance: variance,
        noiseFloor: irreducibleNoise,
        totalExpectedError: totalError,
      });
    }
    return data;
  }, []);

  // Compute values for the current selected complexity
  const currentMetrics = useMemo(() => {
    const biasSq = Number((12 * Math.exp(-0.45 * (complexity - 1))).toFixed(2));
    const variance = Number((0.2 + 0.12 * Math.pow(complexity - 1, 2.1)).toFixed(2));
    const total = Number((biasSq + variance + irreducibleNoise).toFixed(2));

    let regime = '';
    let regimeColor = '';
    let explanation = '';

    if (complexity <= 3) {
      regime = 'UNDERFITTING REGIME (HIGH BIAS)';
      regimeColor = 'text-cyan-400 border-cyan-400/30 bg-cyan-950/30';
      explanation =
        'Model complexity is too low. Bias² dominates the error because the model makes rigid, incorrect assumptions about the true data generation function.';
    } else if (complexity >= 4 && complexity <= 6) {
      regime = 'OPTIMAL CAPACITY (SWEET SPOT)';
      regimeColor = 'text-emerald-400 border-emerald-400/30 bg-emerald-950/30';
      explanation =
        'The golden balance. Model complexity is rich enough to capture meaningful patterns without memorizing idiosyncratic dataset noise. Total expected test error is minimized.';
    } else {
      regime = 'OVERFITTING REGIME (HIGH VARIANCE)';
      regimeColor = 'text-purple-400 border-purple-400/30 bg-purple-950/30';
      explanation =
        'Model complexity is excessively high. While Bias² is negligible, Variance skyrockets because the model fits the noise in the training set, causing wild errors on unseen test data.';
    }

    return { biasSq, variance, total, regime, regimeColor, explanation };
  }, [complexity]);

  return (
    <div className="rounded-2xl border border-electric-cyan/30 bg-navy-950/85 p-6 backdrop-blur-md shadow-glow">
      {/* Header */}
      <div className="border-b border-white/10 pb-4 mb-5">
        <div className="flex items-center gap-2 text-xs font-mono text-cyan-400">
          <TrendingUp className="h-4 w-4" />
          <span>STATISTICAL LEARNING THEORY</span>
        </div>
        <h3 className="text-lg font-bold text-white mt-0.5">
          The Bias-Variance Tradeoff Decomposition
        </h3>
        <p className="text-xs text-slate-300">
          Total Expected Error = Bias²(x) + Variance(x) + σ_ε² (Irreducible Noise).
        </p>
      </div>

      {/* Complexity Slider */}
      <div className="p-4 rounded-xl bg-navy-900/80 border border-white/10 mb-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2">
          <span className="text-xs font-mono font-bold text-slate-300 flex items-center gap-2">
            <Sliders className="h-4 w-4 text-cyan-400" />
            Model Complexity / Degrees of Freedom:
          </span>
          <span className="text-xs font-mono font-bold text-cyan-400">
            Level {complexity} of 10
          </span>
        </div>

        <input
          type="range"
          min="1"
          max="10"
          step="0.5"
          value={complexity}
          onChange={(e) => setComplexity(parseFloat(e.target.value))}
          className="w-full accent-cyan-400 cursor-pointer"
        />

        <div className="flex justify-between text-[10px] font-mono text-slate-400 mt-1.5">
          <span>Low (Rigid Linear Model)</span>
          <span className="text-emerald-400 font-bold">Optimal Sweet Spot (Min Total Error)</span>
          <span className="text-purple-400 font-bold">High (Unregularized Deep Net)</span>
        </div>
      </div>

      {/* Numerical Decomposition Readout */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-5 font-mono">
        <div className="p-3 rounded-xl bg-navy-900 border border-cyan-500/30">
          <span className="text-[10px] text-cyan-400 uppercase">1. Bias² (Reducible)</span>
          <div className="text-xl font-bold text-white mt-0.5">
            {currentMetrics.biasSq.toFixed(2)}
          </div>
          <span className="text-[10px] text-slate-400">Drops with capacity</span>
        </div>

        <div className="p-3 rounded-xl bg-navy-900 border border-purple-500/30">
          <span className="text-[10px] text-purple-400 uppercase">2. Variance (Reducible)</span>
          <div className="text-xl font-bold text-white mt-0.5">
            {currentMetrics.variance.toFixed(2)}
          </div>
          <span className="text-[10px] text-slate-400">Rises with capacity</span>
        </div>

        <div className="p-3 rounded-xl bg-navy-900 border border-amber-500/30">
          <span className="text-[10px] text-amber-400 uppercase">3. Noise σ² (Irreducible)</span>
          <div className="text-xl font-bold text-white mt-0.5">
            {irreducibleNoise.toFixed(2)}
          </div>
          <span className="text-[10px] text-slate-400">Fixed lower floor</span>
        </div>

        <div className="p-3 rounded-xl bg-navy-900 border border-blue-500/40 shadow-glow">
          <span className="text-[10px] text-blue-300 uppercase font-bold">Total Expected Error</span>
          <div className="text-xl font-bold text-white mt-0.5">
            {currentMetrics.total.toFixed(2)}
          </div>
          <span className="text-[10px] text-cyan-300">Sum of (1 + 2 + 3)</span>
        </div>
      </div>

      {/* The Dynamic U-Curve Recharts */}
      <div className="mb-4">
        <InteractiveChart
          type="line"
          data={chartData}
          xKey="complexity"
          series={[
            { key: 'totalExpectedError', name: 'Total Expected Test Error (U-Curve)', color: '#38bdf8' },
            { key: 'biasSquared', name: 'Bias² (Rigidity Error)', color: '#00f0ff' },
            { key: 'variance', name: 'Variance (Sensitivity to Noise)', color: '#a855f7' },
            { key: 'noiseFloor', name: 'Irreducible Error σ² (Theoretical Floor)', color: '#f59e0b' },
          ]}
          height={300}
        />
      </div>

      {/* Conceptual Distinction Notice & Status */}
      <div className={`p-4 rounded-xl border ${currentMetrics.regimeColor} space-y-2 mb-3`}>
        <div className="font-mono font-bold text-xs uppercase tracking-wide">
          Operating Status: {currentMetrics.regime}
        </div>
        <p className="text-xs text-slate-200 leading-relaxed">
          {currentMetrics.explanation}
        </p>
      </div>

      <div className="p-3 rounded-lg bg-navy-950 border border-white/5 text-[11px] text-slate-400 flex items-start gap-2">
        <Info className="h-4 w-4 shrink-0 text-cyan-400 mt-0.5" />
        <span>
          <strong>Scientific Clarification:</strong> This graph illustrates the theoretical expected prediction error decomposition formulated by Hastie, Tibshirani, and Friedman. In empirical real-world workflows, Bias and Variance cannot be computed directly on a single test dataset because the true function f(x) is unknown; instead, cross-validation and holdout validation sets are used to approximate this curve.
        </span>
      </div>
    </div>
  );
}

