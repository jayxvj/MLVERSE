'use client';

import React, { useState, useMemo } from 'react';
import { Layers, Activity, Sliders, ArrowRight, CheckCircle2, AlertTriangle, Eye } from 'lucide-react';
import InteractiveChart from '../InteractiveChart';

interface Point {
  x: number;
  y: number;
}

// Fixed synthetic dataset with a curved non-linear hill
const TRAINING_POINTS: Point[] = [
  { x: 1.0, y: 2.2 },
  { x: 2.0, y: 3.8 },
  { x: 3.0, y: 6.5 },
  { x: 4.0, y: 8.9 },
  { x: 5.0, y: 9.4 },
  { x: 6.0, y: 8.1 },
  { x: 7.0, y: 5.5 },
  { x: 8.0, y: 3.2 },
  { x: 9.0, y: 2.0 },
];

export default function ParametricVsNonParametric() {
  const [queryX, setQueryX] = useState<number>(5.5);
  const [knnK, setKnnK] = useState<number>(3);

  // 1. Parametric Model: Linear Regression (Learned parameters: w ≈ 0.22, b ≈ 4.18)
  const linearW = 0.22;
  const linearB = 4.18;
  const parametricPred = Number((linearW * queryX + linearB).toFixed(2));

  // 2. Non-Parametric Model: K-Nearest Neighbors (KNN Regression)
  const { knnPred, nearestNeighbors } = useMemo(() => {
    // Calculate distance to all training points
    const withDist = TRAINING_POINTS.map((p) => ({
      ...p,
      distance: Math.abs(p.x - queryX),
    }));

    // Sort by distance and pick top K
    withDist.sort((a, b) => a.distance - b.distance);
    const topK = withDist.slice(0, knnK);

    const avgY = topK.reduce((sum, p) => sum + p.y, 0) / knnK;
    return {
      knnPred: Number(avgY.toFixed(2)),
      nearestNeighbors: topK,
    };
  }, [queryX, knnK]);

  // Chart data: Points + Parametric line + Non-parametric piecewise prediction
  const chartData = useMemo(() => {
    const data = [];
    for (let x = 1.0; x <= 9.0; x += 0.5) {
      const linY = Number((linearW * x + linearB).toFixed(2));

      // KNN prediction for this x
      const withD = TRAINING_POINTS.map((p) => ({ ...p, dist: Math.abs(p.x - x) }));
      withD.sort((a, b) => a.dist - b.dist);
      const top = withD.slice(0, knnK);
      const kY = Number((top.reduce((s, p) => s + p.y, 0) / knnK).toFixed(2));

      // Check if original training point exists here
      const orig = TRAINING_POINTS.find((p) => Math.abs(p.x - x) < 0.1);

      data.push({
        x: Number(x.toFixed(1)),
        observedPoints: orig ? orig.y : undefined,
        parametricLinear: linY,
        nonParametricKNN: kY,
      });
    }
    return data;
  }, [knnK]);

  return (
    <div className="rounded-2xl border border-electric-cyan/30 bg-navy-950/85 p-6 backdrop-blur-md shadow-glow">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-white/10 pb-4 mb-5">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono text-cyan-400">
            <Layers className="h-4 w-4" />
            <span>ARCHITECTURAL TAXONOMY COMPARISON</span>
          </div>
          <h3 className="text-lg font-bold text-white mt-0.5">
            Parametric vs. Non-Parametric Models
          </h3>
          <p className="text-xs text-slate-300">
            Compare fixed-parameter hypothesis functions (Linear Regression) against data-dependent neighborhood algorithms (K-Nearest Neighbors).
          </p>
        </div>

        {/* Query Input Slider */}
        <div className="p-3 rounded-xl bg-navy-900 border border-white/10">
          <div className="flex justify-between text-xs font-mono mb-1">
            <span className="text-slate-400">Query Input x_new:</span>
            <span className="text-cyan-400 font-bold">{queryX.toFixed(1)}</span>
          </div>
          <input
            type="range"
            min="1.0"
            max="9.0"
            step="0.5"
            value={queryX}
            onChange={(e) => setQueryX(parseFloat(e.target.value))}
            className="w-44 accent-cyan-400 cursor-pointer"
          />
        </div>
      </div>

      {/* Side-by-Side Dual Prediction Readout */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-5">
        {/* Parametric Card */}
        <div className="p-4 rounded-xl bg-navy-900/80 border border-blue-400/30 space-y-3">
          <div className="flex items-center justify-between border-b border-white/10 pb-2">
            <div>
              <span className="text-[10px] font-mono uppercase text-blue-400 font-bold">PARAMETRIC APPROACH</span>
              <h4 className="text-sm font-bold text-white">Linear Regression</h4>
            </div>
            <span className="text-xl font-bold font-mono text-blue-300">ŷ = {parametricPred}</span>
          </div>

          <div className="text-xs text-slate-300 space-y-1 font-mono">
            <div>Mathematical Form: ŷ = w·x + b</div>
            <div className="text-cyan-300">Stored Parameters: w={linearW}, b={linearB} (Only 2 numbers!)</div>
            <div className="text-slate-400">Parameter Count: Fixed O(D), does NOT grow with sample size N.</div>
          </div>

          <div className="p-2.5 rounded-lg bg-rose-950/20 border border-rose-500/20 text-xs text-rose-300">
            <strong>Limitation:</strong> Strong linear assumption. Cannot capture the peak curve at x=5 (underfitting).
          </div>
        </div>

        {/* Non-Parametric Card */}
        <div className="p-4 rounded-xl bg-navy-900/80 border border-purple-400/30 space-y-3 shadow-glow-violet">
          <div className="flex items-center justify-between border-b border-white/10 pb-2">
            <div>
              <span className="text-[10px] font-mono uppercase text-purple-400 font-bold">NON-PARAMETRIC APPROACH</span>
              <h4 className="text-sm font-bold text-white">K-Nearest Neighbors (KNN)</h4>
            </div>
            <span className="text-xl font-bold font-mono text-purple-300">ŷ = {knnPred}</span>
          </div>

          <div className="text-xs text-slate-300 space-y-1 font-mono">
            <div>Mathematical Form: ŷ = (1/K) · Σ y_i for i in N_K(x)</div>
            <div className="text-purple-300">Nearest {knnK} points used: {nearestNeighbors.map((n) => `(${n.x}, ${n.y})`).join(', ')}</div>
            <div className="text-slate-400">Parameter Count: O(N), grows with dataset size (stores all training points).</div>
          </div>

          <div className="p-2.5 rounded-lg bg-emerald-950/20 border border-emerald-500/20 text-xs text-emerald-300">
            <strong>Advantage:</strong> Free from rigid geometric assumptions. Naturally bends around the curved peak!
          </div>
        </div>
      </div>

      {/* K Slider */}
      <div className="flex items-center gap-4 mb-4 p-3 rounded-xl bg-navy-900/50 border border-white/5">
        <span className="text-xs font-mono text-slate-400">KNN Neighborhood Size (K):</span>
        <input
          type="range"
          min="1"
          max="5"
          step="1"
          value={knnK}
          onChange={(e) => setKnnK(parseInt(e.target.value))}
          className="w-44 accent-purple-400 cursor-pointer"
        />
        <span className="text-xs font-mono text-purple-300 font-bold">K = {knnK} Neighbors Averaged</span>
      </div>

      {/* Real-time Comparison Curve */}
      <div className="rounded-xl bg-navy-900/60 border border-white/10 p-5 mb-4">
        <InteractiveChart
          type="line"
          data={chartData}
          xKey="x"
          series={[
            { key: 'parametricLinear', name: 'Parametric Linear Regression (ŷ = wx+b)', color: '#38bdf8' },
            { key: 'nonParametricKNN', name: `Non-Parametric KNN (K=${knnK})`, color: '#a855f7' },
          ]}
          height={260}
        />
      </div>

      {/* Educational Summary Table */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
        <div className="p-3.5 rounded-xl bg-navy-950 border border-white/5 space-y-1.5">
          <span className="font-bold text-cyan-300 font-mono">When to use Parametric:</span>
          <p className="text-slate-300 leading-relaxed">
            When you have prior domain knowledge about functional form, need rapid real-time inference on edge devices, or have limited RAM. (Linear/Logistic Regression, Naive Bayes).
          </p>
        </div>

        <div className="p-3.5 rounded-xl bg-navy-950 border border-white/5 space-y-1.5">
          <span className="font-bold text-purple-300 font-mono">When to use Non-Parametric:</span>
          <p className="text-slate-300 leading-relaxed">
            When the underlying relationship is arbitrary, highly complex, or multimodal, and you have sufficient memory and computing resources. (KNN, Decision Trees, Kernel SVMs).
          </p>
        </div>
      </div>
    </div>
  );
}

