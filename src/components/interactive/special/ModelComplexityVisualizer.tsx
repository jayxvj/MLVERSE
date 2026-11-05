'use client';

import React, { useState, useMemo } from 'react';
import { Sliders, TrendingUp, AlertTriangle, CheckCircle2, Award } from 'lucide-react';
import InteractiveChart from '../InteractiveChart';

interface ComplexityDataPoint {
  degree: number;
  trainError: number;
  valError: number;
}

export default function ModelComplexityVisualizer() {
  const [selectedDegree, setSelectedDegree] = useState<number>(3);

  // Precomputed U-shaped bias-variance error curve data across polynomial degrees 1 to 10
  const curveData: ComplexityDataPoint[] = [
    { degree: 1, trainError: 0.82, valError: 0.88 },
    { degree: 2, trainError: 0.42, valError: 0.48 },
    { degree: 3, trainError: 0.18, valError: 0.22 }, // Optimal sweet spot
    { degree: 4, trainError: 0.14, valError: 0.24 },
    { degree: 5, trainError: 0.10, valError: 0.31 },
    { degree: 6, trainError: 0.07, valError: 0.45 },
    { degree: 7, trainError: 0.05, valError: 0.62 },
    { degree: 8, trainError: 0.03, valError: 0.85 },
    { degree: 9, trainError: 0.01, valError: 1.18 },
    { degree: 10, trainError: 0.00, valError: 1.65 },
  ];

  const currentPoint = curveData.find((d) => d.degree === selectedDegree) || curveData[2];

  let regime: 'underfit' | 'optimal' | 'overfit' = 'optimal';
  if (selectedDegree < 3) regime = 'underfit';
  else if (selectedDegree > 4) regime = 'overfit';

  return (
    <div className="rounded-2xl border border-electric-cyan/30 bg-navy-950/85 p-6 backdrop-blur-md shadow-glow">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-white/10 pb-4 mb-5">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono text-cyan-400">
            <TrendingUp className="h-4 w-4" />
            <span>BIAS-VARIANCE TRADEOFF DYNAMICS</span>
          </div>
          <h3 className="text-lg font-bold text-white mt-0.5">
            Model Complexity vs. Generalization Error
          </h3>
          <p className="text-xs text-slate-300">
            Watch how increasing model flexibility decreases training error to zero while driving validation error into explosive overfitting.
          </p>
        </div>

        {/* Current Regime Status Indicator */}
        <div
          className={`px-4 py-2 rounded-xl text-center border font-mono transition-all ${
            regime === 'optimal'
              ? 'bg-emerald-950/40 border-emerald-500/50 text-emerald-300 shadow-[0_0_15px_rgba(16,185,129,0.3)]'
              : regime === 'underfit'
              ? 'bg-amber-950/40 border-amber-500/50 text-amber-300'
              : 'bg-rose-950/40 border-rose-500/50 text-rose-300 shadow-[0_0_15px_rgba(244,63,94,0.3)]'
          }`}
        >
          <div className="text-[10px] uppercase tracking-wider text-slate-400">Model Regime</div>
          <div className="text-sm font-black flex items-center justify-center gap-1.5">
            {regime === 'optimal' ? (
              <CheckCircle2 className="h-4 w-4 text-emerald-400" />
            ) : (
              <AlertTriangle className="h-4 w-4 text-rose-400" />
            )}
            <span>
              {regime === 'optimal'
                ? 'OPTIMAL GENERALIZATION (SWEET SPOT)'
                : regime === 'underfit'
                ? 'UNDERFITTING (HIGH BIAS)'
                : 'OVERFITTING (HIGH VARIANCE)'}
            </span>
          </div>
        </div>
      </div>

      {/* Complexity Slider */}
      <div className="p-4 rounded-xl bg-navy-900/60 border border-white/5 mb-5 space-y-2">
        <div className="flex items-center justify-between text-xs font-mono">
          <span className="text-slate-300">Model Complexity (Polynomial Degree / Capacity):</span>
          <span className="text-cyan-400 font-bold text-sm">Degree {selectedDegree}</span>
        </div>
        <input
          type="range"
          min="1"
          max="10"
          step="1"
          value={selectedDegree}
          onChange={(e) => setSelectedDegree(parseInt(e.target.value))}
          className="w-full accent-cyan-400 cursor-pointer"
        />
        <div className="flex justify-between text-[10px] text-slate-400 font-mono">
          <span className="text-amber-400">Degree 1 (Underfitting: Straight Line)</span>
          <span className="text-emerald-400 font-bold">Degree 3 (Sweet Spot)</span>
          <span className="text-rose-400">Degree 10 (Overfitting: Memorizes Noise)</span>
        </div>
      </div>

      {/* Dual Loss Chart */}
      <div className="rounded-xl bg-navy-900/60 border border-white/10 p-5 mb-5">
        <div className="flex items-center justify-between text-xs font-mono text-slate-400 mb-2">
          <span>The Classical U-Shaped Validation Curve</span>
          <span className="text-cyan-400">Selected: Degree {selectedDegree}</span>
        </div>

        <InteractiveChart
          type="line"
          data={curveData}
          xKey="degree"
          series={[
            { key: 'trainError', name: 'Training Loss (Drops Monotonically)', color: '#00f0ff' },
            { key: 'valError', name: 'Validation Loss (U-Shaped Generalization)', color: '#ec4899' },
          ]}
          height={260}
        />
      </div>

      {/* Current Metrics Readout */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs font-mono">
        <div className="p-3.5 rounded-xl bg-navy-900 border border-white/10">
          <span className="text-slate-400 text-[10px] uppercase block">Training Error:</span>
          <span className="text-lg font-bold text-cyan-300">{currentPoint.trainError.toFixed(2)}</span>
          <div className="text-[10px] text-slate-500 mt-0.5">Measures fit on training examples</div>
        </div>

        <div className="p-3.5 rounded-xl bg-navy-900 border border-white/10">
          <span className="text-slate-400 text-[10px] uppercase block">Validation Error:</span>
          <span className={`text-lg font-bold ${regime === 'optimal' ? 'text-emerald-300' : 'text-rose-300'}`}>
            {currentPoint.valError.toFixed(2)}
          </span>
          <div className="text-[10px] text-slate-500 mt-0.5">Measures real generalization ability</div>
        </div>

        <div className="p-3.5 rounded-xl bg-navy-900 border border-white/10">
          <span className="text-slate-400 text-[10px] uppercase block">Generalization Gap:</span>
          <span className="text-lg font-bold text-purple-300">
            {(currentPoint.valError - currentPoint.trainError).toFixed(2)}
          </span>
          <div className="text-[10px] text-slate-500 mt-0.5">Val Error minus Train Error</div>
        </div>
      </div>
    </div>
  );
}

