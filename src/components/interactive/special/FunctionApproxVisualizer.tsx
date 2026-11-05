'use client';

import React, { useState, useMemo } from 'react';
import { Sigma, Sparkles, Sliders, Play, RotateCcw, TrendingUp } from 'lucide-react';
import InteractiveChart from '../InteractiveChart';

export default function FunctionApproxVisualizer() {
  const [modelComplexity, setModelComplexity] = useState<'linear' | 'quadratic' | 'overfit'>('linear');
  const [learningStep, setLearningStep] = useState<number>(0); // 0 = untrained, 1 = partial, 2 = fitted

  // Generate synthetic ground truth points: y = 0.5 * x^2 - 2 * x + 4 + noise
  const points = useMemo(() => {
    const data = [];
    const trueFn = (x: number) => 0.4 * Math.pow(x - 3, 2) + 1.5;

    for (let x = 0; x <= 6; x += 0.5) {
      const noise = Math.sin(x * 9.1) * 0.4;
      const trueY = trueFn(x);
      const observedY = Number((trueY + noise).toFixed(2));

      // Candidate approximation functions based on complexity and step
      let approxY = 0;
      if (modelComplexity === 'linear') {
        if (learningStep === 0) approxY = 5.0; // flat guess
        else if (learningStep === 1) approxY = 0.8 * x + 1.5;
        else approxY = 0.3 * x + 2.1; // best linear fit
      } else if (modelComplexity === 'quadratic') {
        if (learningStep === 0) approxY = 0.2 * x + 4.0;
        else if (learningStep === 1) approxY = 0.2 * Math.pow(x - 2, 2) + 2.5;
        else approxY = 0.4 * Math.pow(x - 3, 2) + 1.6; // true approximation!
      } else {
        // Overfit: wild wiggles through every individual noise point
        approxY =
          0.4 * Math.pow(x - 3, 2) +
          1.5 +
          Math.sin(x * 9.1) * 0.4 +
          Math.cos(x * 15.0) * 0.2;
      }

      data.push({
        x: Number(x.toFixed(1)),
        observedPoints: observedY,
        modelApproximation: Number(approxY.toFixed(2)),
      });
    }
    return data;
  }, [modelComplexity, learningStep]);

  // Compute Mean Squared Error between observedPoints and modelApproximation
  const mse = useMemo(() => {
    const sum = points.reduce(
      (acc, p) => acc + Math.pow(p.observedPoints - p.modelApproximation, 2),
      0
    );
    return (sum / points.length).toFixed(3);
  }, [points]);

  return (
    <div className="rounded-2xl border border-electric-cyan/30 bg-navy-950/85 p-6 backdrop-blur-md shadow-glow">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-white/10 pb-4 mb-5">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono text-cyan-400">
            <TrendingUp className="h-4 w-4" />
            <span>CORE MACHINE LEARNING THEOREM</span>
          </div>
          <h3 className="text-lg font-bold text-white mt-0.5">
            Machine Learning as Function Approximation: ŷ ≈ f(X; θ)
          </h3>
          <p className="text-xs text-slate-300">
            A model is simply a mathematical function whose shape is bent by optimization until it approximates the underlying data generator.
          </p>
        </div>

        {/* Error readout */}
        <div className="p-3 rounded-xl bg-navy-900 border border-white/10 text-right">
          <div className="text-[10px] font-mono text-slate-400 uppercase">Approximation Loss (MSE)</div>
          <div className="text-xl font-bold font-mono text-cyan-400">{mse}</div>
        </div>
      </div>

      {/* Complexity & Fit Selector */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4 p-3.5 rounded-xl bg-navy-900/60 border border-white/5">
        <div className="flex items-center gap-2">
          <span className="text-xs font-mono text-slate-400">Hypothesis Class:</span>
          {(['linear', 'quadratic', 'overfit'] as const).map((comp) => (
            <button
              key={comp}
              onClick={() => {
                setModelComplexity(comp);
                setLearningStep(2); // show best fit for that complexity
              }}
              className={`px-3 py-1.5 rounded-lg text-xs font-mono transition ${
                modelComplexity === comp
                  ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-400 shadow-glow font-bold'
                  : 'bg-navy-950 border border-white/10 text-slate-400 hover:text-white'
              }`}
            >
              {comp === 'linear'
                ? 'Linear (Degree 1)'
                : comp === 'quadratic'
                ? 'Quadratic (Degree 2)'
                : 'Complex (Degree 8+ Overfit)'}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs font-mono text-slate-400">Optimization Step:</span>
          <button
            onClick={() => setLearningStep((s) => (s + 1) % 3)}
            className="px-3 py-1.5 rounded-lg text-xs font-mono font-semibold bg-cyan-500/15 text-cyan-300 border border-cyan-500/30 hover:bg-cyan-500/25 flex items-center gap-1.5"
          >
            <Play className="h-3 w-3" />
            <span>
              {learningStep === 0
                ? 'Epoch 0 (Initial Guess)'
                : learningStep === 1
                ? 'Epoch 25 (Gradient Descent)'
                : 'Epoch 100 (Converged)'}
            </span>
          </button>
        </div>
      </div>

      {/* Plot of Function vs Points */}
      <div className="rounded-xl bg-navy-900/60 border border-white/10 p-5 mb-4">
        <InteractiveChart
          type="line"
          data={points}
          xKey="x"
          series={[
            { key: 'observedPoints', name: 'Observed Examples (Data)', color: '#ec4899' },
            { key: 'modelApproximation', name: 'Learned Function f(x; θ)', color: '#00f0ff' },
          ]}
          height={280}
        />
      </div>

      {/* Educational Explanation Box */}
      <div className="p-4 rounded-xl bg-navy-900 border border-white/10 text-xs space-y-1.5">
        <div className="font-mono text-cyan-400 font-bold">What is this demonstrating?</div>
        <p className="text-slate-300 leading-relaxed">
          {modelComplexity === 'linear'
            ? 'Underfitting (High Bias): The real relationship is curved, but a degree-1 straight line lacks the capacity to bend. The error stays high (~0.68).'
            : modelComplexity === 'quadratic'
            ? 'Optimal Function Approximation: The quadratic hypothesis space has the exact capacity to capture the parabolic trend without memorizing the pink random noise points.'
            : 'Overfitting (High Variance): A hyper-complex model wiggles to hit every single noise outlier in the training data, losing the smooth generalizable law.'}
        </p>
      </div>
    </div>
  );
}

