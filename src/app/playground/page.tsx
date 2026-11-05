'use client';

import React, { useState, useMemo } from 'react';
import Sidebar from '@/components/layout/Sidebar';
import InteractiveChart from '@/components/interactive/InteractiveChart';
import { Cpu, Sliders, RefreshCw, BarChart, Sparkles } from 'lucide-react';

export default function MLPlaygroundPage() {
  const [activeModel, setActiveModel] = useState<'linear' | 'logistic' | 'kmeans'>('linear');

  // Linear Regression State
  const [slope, setSlope] = useState<number>(2.0);
  const [intercept, setIntercept] = useState<number>(5.0);
  const [noise, setNoise] = useState<number>(3.0);

  // Logistic Regression State
  const [threshold, setThreshold] = useState<number>(0.5);
  const [steepness, setSteepness] = useState<number>(1.5);

  // K-Means State
  const [kClusters, setKClusters] = useState<number>(3);
  const [iterations, setIterations] = useState<number>(5);

  // Generate Linear Regression Data
  const linearData = useMemo(() => {
    const pts = [];
    for (let x = 0; x <= 12; x += 1) {
      // Synthetic pseudo-noise
      const pseudoNoise = Math.sin(x * 12.3) * noise;
      const actualY = Number((2.2 * x + 4.5 + pseudoNoise).toFixed(2));
      const modelY = Number((slope * x + intercept).toFixed(2));
      pts.push({ x, actual: actualY, predicted: modelY });
    }
    return pts;
  }, [slope, intercept, noise]);

  // Generate Logistic Regression Sigmoid Curve Data
  const logisticData = useMemo(() => {
    const pts = [];
    for (let z = -6; z <= 6; z += 0.5) {
      const p = 1 / (1 + Math.exp(-steepness * z));
      pts.push({
        z: Number(z.toFixed(1)),
        probability: Number(p.toFixed(3)),
        threshold: threshold,
      });
    }
    return pts;
  }, [steepness, threshold]);

  // Calculate MSE for linear regression
  const mse = useMemo(() => {
    const sum = linearData.reduce((acc, pt) => acc + Math.pow(pt.actual - pt.predicted, 2), 0);
    return (sum / linearData.length).toFixed(3);
  }, [linearData]);

  return (
    <div className="flex">
      <Sidebar />

      <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-6xl mx-auto space-y-6 overflow-y-auto">
        {/* Header */}
        <div className="border-b border-white/10 pb-4">
          <div className="flex items-center gap-2 text-xs font-mono text-cyan-400 mb-1">
            <Cpu className="h-4 w-4" />
            <span>REAL-TIME SIMULATION SANDBOX</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-white">
            Interactive ML Playground
          </h1>
          <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-2xl">
            Tweak hyperparameters in real-time and observe the immediate visual impact on loss metrics, decision boundaries, and convergence rates.
          </p>
        </div>

        {/* Model Switcher */}
        <div className="flex items-center gap-2 overflow-x-auto p-1.5 rounded-xl bg-navy-950 border border-white/10">
          <button
            onClick={() => setActiveModel('linear')}
            className={`px-4 py-2 rounded-lg text-xs font-mono font-medium transition ${
              activeModel === 'linear'
                ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-400 shadow-glow font-bold'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            1. Linear Regression (OLS)
          </button>

          <button
            onClick={() => setActiveModel('logistic')}
            className={`px-4 py-2 rounded-lg text-xs font-mono font-medium transition ${
              activeModel === 'logistic'
                ? 'bg-purple-500/20 text-purple-300 border border-purple-400 shadow-glow font-bold'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            2. Logistic Regression (Sigmoid)
          </button>
        </div>

        {/* Linear Model View */}
        {activeModel === 'linear' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 animate-fadeIn">
            {/* Control Panel */}
            <div className="lg:col-span-4 rounded-xl border border-white/10 bg-navy-950/80 p-5 space-y-5">
              <h3 className="text-sm font-semibold text-white flex items-center gap-2">
                <Sliders className="h-4 w-4 text-cyan-400" />
                <span>Linear Controls</span>
              </h3>

              <div>
                <div className="flex justify-between text-xs font-mono text-slate-300 mb-1">
                  <span>Weight / Slope (w):</span>
                  <span className="text-cyan-400 font-bold">{slope.toFixed(2)}</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="4"
                  step="0.1"
                  value={slope}
                  onChange={(e) => setSlope(parseFloat(e.target.value))}
                  className="w-full accent-cyan-400"
                />
              </div>

              <div>
                <div className="flex justify-between text-xs font-mono text-slate-300 mb-1">
                  <span>Bias / Intercept (b):</span>
                  <span className="text-cyan-400 font-bold">{intercept.toFixed(2)}</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="10"
                  step="0.5"
                  value={intercept}
                  onChange={(e) => setIntercept(parseFloat(e.target.value))}
                  className="w-full accent-cyan-400"
                />
              </div>

              <div>
                <div className="flex justify-between text-xs font-mono text-slate-300 mb-1">
                  <span>Dataset Variance (Noise):</span>
                  <span className="text-purple-400 font-bold">{noise.toFixed(1)}</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="8"
                  step="0.5"
                  value={noise}
                  onChange={(e) => setNoise(parseFloat(e.target.value))}
                  className="w-full accent-purple-400"
                />
              </div>

              <div className="p-3 rounded-lg bg-navy-900 border border-white/5 space-y-1 text-xs font-mono">
                <div className="text-slate-400">Current Mean Squared Error:</div>
                <div className="text-xl font-bold text-cyan-400">{mse}</div>
                <div className="text-[11px] text-slate-500">Goal: Adjust slope to minimize MSE</div>
              </div>
            </div>

            {/* Live Chart */}
            <div className="lg:col-span-8 rounded-xl border border-white/10 bg-navy-950/80 p-5">
              <InteractiveChart
                type="line"
                title={`Fit Line: ŷ = ${slope.toFixed(2)}x + ${intercept.toFixed(2)}`}
                data={linearData}
                xKey="x"
                series={[
                  { key: 'actual', name: 'Observed Data (y)', color: '#a855f7' },
                  { key: 'predicted', name: 'Predicted Model (ŷ)', color: '#00f0ff' },
                ]}
                height={320}
              />
            </div>
          </div>
        )}

        {/* Logistic Model View */}
        {activeModel === 'logistic' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 animate-fadeIn">
            {/* Control Panel */}
            <div className="lg:col-span-4 rounded-xl border border-white/10 bg-navy-950/80 p-5 space-y-5">
              <h3 className="text-sm font-semibold text-white flex items-center gap-2">
                <Sliders className="h-4 w-4 text-purple-400" />
                <span>Sigmoid Controls</span>
              </h3>

              <div>
                <div className="flex justify-between text-xs font-mono text-slate-300 mb-1">
                  <span>Steepness (w):</span>
                  <span className="text-purple-400 font-bold">{steepness.toFixed(2)}</span>
                </div>
                <input
                  type="range"
                  min="0.2"
                  max="3.0"
                  step="0.1"
                  value={steepness}
                  onChange={(e) => setSteepness(parseFloat(e.target.value))}
                  className="w-full accent-purple-400"
                />
                <div className="text-[10px] text-slate-400 mt-0.5">High values approximate step function</div>
              </div>

              <div>
                <div className="flex justify-between text-xs font-mono text-slate-300 mb-1">
                  <span>Decision Cutoff Threshold:</span>
                  <span className="text-cyan-400 font-bold">{threshold.toFixed(2)}</span>
                </div>
                <input
                  type="range"
                  min="0.1"
                  max="0.9"
                  step="0.05"
                  value={threshold}
                  onChange={(e) => setThreshold(parseFloat(e.target.value))}
                  className="w-full accent-cyan-400"
                />
                <div className="text-[10px] text-slate-400 mt-0.5">Standard default is 0.50</div>
              </div>

              <div className="p-3 rounded-lg bg-navy-900 border border-white/5 space-y-1 text-xs font-mono">
                <div className="text-slate-400">Class 1 Trigger:</div>
                <div className="text-sm font-bold text-white">
                  Predict 1 when σ(z) &gt;= {threshold.toFixed(2)}
                </div>
              </div>
            </div>

            {/* Live Chart */}
            <div className="lg:col-span-8 rounded-xl border border-white/10 bg-navy-950/80 p-5">
              <InteractiveChart
                type="line"
                title="Sigmoid Probability S-Curve: P(y=1|z)"
                data={logisticData}
                xKey="z"
                series={[
                  { key: 'probability', name: 'Estimated Probability σ(z)', color: '#a855f7' },
                  { key: 'threshold', name: 'Decision Cutoff Threshold', color: '#00f0ff' },
                ]}
                height={320}
              />
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

