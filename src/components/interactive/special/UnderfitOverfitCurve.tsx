'use client';

import React, { useState, useMemo } from 'react';
import { Activity, Sliders, Eye, AlertTriangle, CheckCircle, Flame, Layers } from 'lucide-react';
import InteractiveChart from '../InteractiveChart';

interface Point {
  x: number;
  y: number;
}

// True underlying function: f(x) = sin(x * 0.8) * 4 + 0.3 * x
const trueFunction = (x: number) => Math.sin(x * 0.8) * 4 + 0.3 * x;

// Fixed training set with synthetic Gaussian-like noise
const TRAIN_POINTS: Point[] = [
  { x: 1.0, y: 3.2 },
  { x: 1.8, y: 4.8 },
  { x: 2.5, y: 3.9 },
  { x: 3.4, y: 1.8 },
  { x: 4.2, y: -0.6 },
  { x: 5.1, y: -2.8 },
  { x: 6.0, y: -3.6 },
  { x: 6.8, y: -2.2 },
  { x: 7.7, y: 0.4 },
  { x: 8.5, y: 3.1 },
];

// Unseen holdout test set with independent noise
const TEST_POINTS: Point[] = [
  { x: 1.4, y: 4.2 },
  { x: 2.9, y: 2.7 },
  { x: 4.6, y: -1.7 },
  { x: 5.8, y: -3.8 },
  { x: 7.2, y: -1.1 },
  { x: 8.1, y: 1.9 },
];

export default function UnderfitOverfitCurve() {
  // Complexity: 1 (Linear/Underfit), 2 (Quadratic), 3 (Optimal Cubic), 4 (Severe Overfit)
  const [complexity, setComplexity] = useState<number>(3);
  const [showTrueSignal, setShowTrueSignal] = useState<boolean>(true);
  const [showTestPoints, setShowTestPoints] = useState<boolean>(true);

  // Model prediction functions evaluated at x
  const predict = (x: number, comp: number): number => {
    switch (comp) {
      case 1:
        // Linear regression fit: y = -0.55 * x + 2.5 (underfitting - completely misses the curve)
        return -0.55 * x + 2.5;
      case 2:
        // Quadratic: captures downward trend but misses final recovery
        return -0.18 * (x - 4) ** 2 + 1.2;
      case 3:
        // Optimal degree 3-4 approximation (captures underlying sine wave accurately)
        return trueFunction(x) * 0.96 + 0.1;
      case 4:
        // Overfit polynomial: exactly interpolates training points with wild oscillating overshoot
        // Tailored oscillating polynomial approximation passing through all train points
        const base = trueFunction(x);
        const wildOscillation =
          Math.sin(x * 4.5) * 2.8 * Math.cos(x * 1.8) +
          0.003 * Math.pow(x - 4.5, 5);
        return base + wildOscillation;
      default:
        return trueFunction(x);
    }
  };

  // Compute live Training and Testing MSE
  const metrics = useMemo(() => {
    // Train MSE
    let trainSumSq = 0;
    TRAIN_POINTS.forEach((pt) => {
      const pred = predict(pt.x, complexity);
      trainSumSq += (pt.y - pred) ** 2;
    });
    const trainMse = trainSumSq / TRAIN_POINTS.length;

    // Test MSE
    let testSumSq = 0;
    TEST_POINTS.forEach((pt) => {
      const pred = predict(pt.x, complexity);
      testSumSq += (pt.y - pred) ** 2;
    });
    const testMse = testSumSq / TEST_POINTS.length;

    const gap = Math.abs(testMse - trainMse);

    let status = '';
    let statusColor = '';
    let diagnosis = '';

    if (complexity === 1) {
      status = 'SEVERE UNDERFITTING (HIGH BIAS)';
      statusColor = 'text-blue-400 border-blue-400/30 bg-blue-950/30';
      diagnosis =
        'Model is too rigid to capture the natural non-linear wave. Both training error and testing error are unacceptably high.';
    } else if (complexity === 2) {
      status = 'MODERATE UNDERFIT';
      statusColor = 'text-amber-400 border-amber-400/30 bg-amber-950/30';
      diagnosis =
        'Quadratic model captures the peak and drop, but lacks degrees of freedom to capture the upward recovery at x > 7.';
    } else if (complexity === 3) {
      status = 'OPTIMAL FIT (SWEET SPOT)';
      statusColor = 'text-emerald-400 border-emerald-400/30 bg-emerald-950/30';
      diagnosis =
        'Model captures the true underlying periodic generator function without memorizing sample noise. Test error is at its global minimum!';
    } else {
      status = 'CATASTROPHIC OVERFITTING (HIGH VARIANCE)';
      statusColor = 'text-rose-400 border-rose-400/30 bg-rose-950/30';
      diagnosis =
        'Model forces its curve through every noisy training outlier. Training error drops near zero, but test error explodes!';
    }

    return { trainMse, testMse, gap, status, statusColor, diagnosis };
  }, [complexity]);

  // Generate smooth curve points for chart
  const chartData = useMemo(() => {
    const data = [];
    for (let x = 0.8; x <= 8.8; x += 0.2) {
      const roundX = Number(x.toFixed(2));
      const modelY = Number(predict(roundX, complexity).toFixed(2));
      const trueY = Number(trueFunction(roundX).toFixed(2));

      // Find matching train or test point if near
      const trainPt = TRAIN_POINTS.find((p) => Math.abs(p.x - roundX) < 0.11);
      const testPt = TEST_POINTS.find((p) => Math.abs(p.x - roundX) < 0.11);

      data.push({
        x: roundX,
        fittedModel: modelY,
        trueSignal: showTrueSignal ? trueY : undefined,
        trainingPoint: trainPt ? trainPt.y : undefined,
        testingPoint: showTestPoints && testPt ? testPt.y : undefined,
      });
    }
    return data;
  }, [complexity, showTrueSignal, showTestPoints]);

  return (
    <div className="rounded-2xl border border-electric-cyan/30 bg-navy-950/85 p-6 backdrop-blur-md shadow-glow">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-white/10 pb-4 mb-5">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono text-cyan-400">
            <Activity className="h-4 w-4" />
            <span>GENERALIZATION BENCHMARK</span>
          </div>
          <h3 className="text-lg font-bold text-white mt-0.5">
            Underfitting vs. Overfitting Curve Fitting Lab
          </h3>
          <p className="text-xs text-slate-300">
            Increase model complexity to watch the transition from rigid underfitting to optimal fit and explosive overfitting.
          </p>
        </div>

        {/* Visibility Toggles */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => setShowTrueSignal(!showTrueSignal)}
            className={`px-2.5 py-1.5 rounded-lg text-xs font-medium border transition-colors ${
              showTrueSignal
                ? 'border-emerald-500/40 bg-emerald-500/10 text-emerald-300'
                : 'border-white/10 bg-navy-900 text-slate-400'
            }`}
          >
            {showTrueSignal ? 'True Signal ON' : 'True Signal OFF'}
          </button>
          <button
            onClick={() => setShowTestPoints(!showTestPoints)}
            className={`px-2.5 py-1.5 rounded-lg text-xs font-medium border transition-colors ${
              showTestPoints
                ? 'border-purple-500/40 bg-purple-500/10 text-purple-300'
                : 'border-white/10 bg-navy-900 text-slate-400'
            }`}
          >
            {showTestPoints ? 'Test Points ON' : 'Test Points OFF'}
          </button>
        </div>
      </div>

      {/* Model Complexity Control Slider */}
      <div className="p-4 rounded-xl bg-navy-900/80 border border-white/10 mb-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-2">
          <span className="text-xs font-mono font-bold text-slate-300 flex items-center gap-2">
            <Sliders className="h-4 w-4 text-cyan-400" />
            Model Complexity (Capacity / Degree of Freedom):
          </span>
          <span className="text-xs font-mono font-bold text-cyan-400">
            {complexity === 1 && 'Degree 1: Rigid Linear Line (Too Simple)'}
            {complexity === 2 && 'Degree 2: Quadratic Parabola'}
            {complexity === 3 && 'Degree 3: Natural Cubic Spline (Optimal)'}
            {complexity === 4 && 'Degree 9: Wild High-Degree Polynomial (Overfit)'}
          </span>
        </div>

        <input
          type="range"
          min="1"
          max="4"
          step="1"
          value={complexity}
          onChange={(e) => setComplexity(parseInt(e.target.value))}
          className="w-full accent-cyan-400 cursor-pointer"
        />

        <div className="flex justify-between text-[10px] font-mono text-slate-400 mt-1.5">
          <span>1. Linear (High Bias)</span>
          <span>2. Quadratic</span>
          <span className="text-emerald-400 font-bold">3. Optimal Sweet Spot</span>
          <span className="text-rose-400 font-bold">4. High-Degree Polynomial (High Var)</span>
        </div>
      </div>

      {/* Live Error Gauge Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-5">
        {/* Training Error */}
        <div className="p-3.5 rounded-xl bg-navy-900 border border-cyan-500/30">
          <div className="flex justify-between text-[10px] font-mono text-cyan-400 uppercase font-bold">
            <span>TRAINING MSE</span>
            <span>(Seen Data)</span>
          </div>
          <div className="text-2xl font-mono font-bold text-white mt-1">
            {metrics.trainMse.toFixed(2)}
          </div>
          <div className="text-[10px] text-slate-400 mt-0.5">
            {complexity === 4 ? 'Near zero! Memorized points.' : 'Error on 10 training samples'}
          </div>
        </div>

        {/* Testing Error */}
        <div className="p-3.5 rounded-xl bg-navy-900 border border-purple-500/30">
          <div className="flex justify-between text-[10px] font-mono text-purple-400 uppercase font-bold">
            <span>TESTING MSE</span>
            <span>(Unseen Data)</span>
          </div>
          <div className="text-2xl font-mono font-bold text-white mt-1">
            {metrics.testMse.toFixed(2)}
          </div>
          <div className="text-[10px] text-slate-400 mt-0.5">
            {complexity === 3 ? 'Lowest test error achievable!' : complexity === 4 ? 'Explodes due to wild swings!' : 'High due to rigid stiffness'}
          </div>
        </div>

        {/* Generalization Gap */}
        <div className="p-3.5 rounded-xl bg-navy-900 border border-white/10">
          <div className="flex justify-between text-[10px] font-mono text-slate-400 uppercase font-bold">
            <span>GENERALIZATION GAP</span>
            <span>|Test - Train|</span>
          </div>
          <div
            className={`text-2xl font-mono font-bold mt-1 ${
              metrics.gap > 3 ? 'text-rose-400' : metrics.gap < 0.5 ? 'text-emerald-400' : 'text-amber-400'
            }`}
          >
            {metrics.gap.toFixed(2)}
          </div>
          <div className="text-[10px] text-slate-400 mt-0.5">
            {metrics.gap > 3 ? 'Massive gap = Overfitting!' : 'Small gap = Strong generalization'}
          </div>
        </div>
      </div>

      {/* Chart Canvas */}
      <div className="mb-4">
        <InteractiveChart
          type="line"
          data={chartData}
          xKey="x"
          series={[
            { key: 'fittedModel', name: 'Learned Model f_hat(x)', color: '#00f0ff' },
            ...(showTrueSignal ? [{ key: 'trueSignal', name: 'True Signal f(x)', color: '#10b981' }] : []),
            { key: 'trainingPoint', name: 'Training Samples (Seen)', color: '#38bdf8' },
            ...(showTestPoints ? [{ key: 'testingPoint', name: 'Holdout Test Points (Unseen)', color: '#c084fc' }] : []),
          ]}
          height={280}
        />
      </div>

      {/* Diagnosis Verdict Banner */}
      <div className={`p-4 rounded-xl border ${metrics.statusColor} space-y-1.5`}>
        <div className="flex items-center gap-2 font-mono font-bold text-xs uppercase tracking-wide">
          {complexity === 3 ? (
            <CheckCircle className="h-4 w-4" />
          ) : (
            <AlertTriangle className="h-4 w-4" />
          )}
          <span>Diagnostic Verdict: {metrics.status}</span>
        </div>
        <p className="text-xs text-slate-200 leading-relaxed">
          {metrics.diagnosis}
        </p>
      </div>
    </div>
  );
}

