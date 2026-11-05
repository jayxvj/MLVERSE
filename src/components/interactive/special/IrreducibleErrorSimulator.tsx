'use client';

import React, { useState, useMemo } from 'react';
import { ShieldAlert, Sliders, Zap, CheckCircle2, AlertTriangle, Layers } from 'lucide-react';
import InteractiveChart from '../InteractiveChart';

export default function IrreducibleErrorSimulator() {
  const [noiseStd, setNoiseStd] = useState<number>(1.2); // sigma
  const [modelType, setModelType] = useState<'oracle' | 'simple'>('oracle');

  // True generating relationship: f(x) = 2.5 * sin(0.9 * x) + 3.0
  const trueFn = (x: number) => 2.5 * Math.sin(0.9 * x) + 3.0;

  // Fixed sample points with pseudorandom Gaussian-like noise scaled by noiseStd
  const { chartData, reducibleError, irreducibleError, totalMse } = useMemo(() => {
    // 12 sampled observation points across x in [1, 9]
    const sampleX = [1.0, 1.8, 2.5, 3.2, 4.0, 4.8, 5.5, 6.2, 7.0, 7.8, 8.4, 9.0];
    const fixedNoiseFactors = [
      0.8, -1.2, 0.4, 1.5, -0.9, -1.6, 0.3, 1.1, -0.5, -1.3, 0.7, 0.2,
    ];

    const samples = sampleX.map((x, idx) => {
      const noise = fixedNoiseFactors[idx] * noiseStd;
      const y = trueFn(x) + noise;
      return { x, y, noise };
    });

    // Model prediction:
    // If oracle: f_hat(x) = trueFn(x) -> Reducible Error = 0
    // If simple: f_hat(x) = 0.4 * x + 1.8 -> Reducible Error > 0
    const predictModel = (x: number) => {
      if (modelType === 'oracle') {
        return trueFn(x);
      } else {
        return 0.4 * x + 1.8;
      }
    };

    // Calculate errors on the samples
    let sumSqTotal = 0;
    let sumSqReducible = 0;

    samples.forEach((s) => {
      const pred = predictModel(s.x);
      const trueVal = trueFn(s.x);

      sumSqTotal += (s.y - pred) ** 2;
      sumSqReducible += (trueVal - pred) ** 2;
    });

    const calculatedTotalMse = sumSqTotal / samples.length;
    const calculatedReducible = sumSqReducible / samples.length;
    const theoreticalNoiseFloor = noiseStd * noiseStd; // sigma^2

    // Continuous points for smooth chart rendering
    const points = [];
    for (let x = 1.0; x <= 9.0; x += 0.4) {
      const roundX = Number(x.toFixed(1));
      const trueY = Number(trueFn(roundX).toFixed(2));
      const modelY = Number(predictModel(roundX).toFixed(2));

      // Match scatter point if sample falls close
      const matchSample = samples.find((s) => Math.abs(s.x - roundX) < 0.2);

      points.push({
        x: roundX,
        trueFunction: trueY,
        modelPrediction: modelY,
        observedDataWithNoise: matchSample ? Number(matchSample.y.toFixed(2)) : undefined,
      });
    }

    return {
      chartData: points,
      reducibleError: calculatedReducible,
      irreducibleError: theoreticalNoiseFloor,
      totalMse: calculatedTotalMse,
    };
  }, [noiseStd, modelType]);

  return (
    <div className="rounded-2xl border border-electric-cyan/30 bg-navy-950/85 p-6 backdrop-blur-md shadow-glow">
      {/* Header */}
      <div className="border-b border-white/10 pb-4 mb-5">
        <div className="flex items-center gap-2 text-xs font-mono text-cyan-400">
          <ShieldAlert className="h-4 w-4" />
          <span>FUNDAMENTAL BOUNDARY OF PREDICTABILITY</span>
        </div>
        <h3 className="text-lg font-bold text-white mt-0.5">
          Irreducible Error & The Noise Floor Simulator
        </h3>
        <p className="text-xs text-slate-300">
          Every measurement contains unobserved random variation: y = f(x) + ε, where ε ~ N(0, σ²).
        </p>
      </div>

      {/* Controls Bar */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-5">
        {/* Noise Level Slider */}
        <div className="p-4 rounded-xl bg-navy-900/80 border border-white/10">
          <div className="flex justify-between text-xs font-mono mb-2">
            <span className="text-slate-300 font-bold">Unobserved Noise σ:</span>
            <span className="text-amber-400 font-bold">σ = {noiseStd.toFixed(1)}</span>
          </div>
          <input
            type="range"
            min="0.0"
            max="3.0"
            step="0.2"
            value={noiseStd}
            onChange={(e) => setNoiseStd(parseFloat(e.target.value))}
            className="w-full accent-amber-400 cursor-pointer"
          />
          <div className="flex justify-between text-[10px] font-mono text-slate-400 mt-1">
            <span>0.0 (Noiseless Vacuum)</span>
            <span>1.5 (Moderate Real-World Noise)</span>
            <span>3.0 (Severe Noise)</span>
          </div>
        </div>

        {/* Model Architecture Selector */}
        <div className="p-4 rounded-xl bg-navy-900/80 border border-white/10 flex flex-col justify-between">
          <span className="text-xs font-mono font-bold text-slate-300 mb-2">
            Hypothesis Function Architecture:
          </span>
          <div className="grid grid-cols-2 gap-2">
            <button
              onClick={() => setModelType('oracle')}
              className={`p-2 rounded-lg text-xs font-mono font-medium border text-center transition-all ${
                modelType === 'oracle'
                  ? 'border-emerald-400 bg-emerald-950/40 text-emerald-300 shadow-glow'
                  : 'border-white/10 bg-navy-950 text-slate-400 hover:text-white'
              }`}
            >
              <div>Oracle Model f_hat = f(x)</div>
              <div className="text-[10px] opacity-75">Reducible Error = 0</div>
            </button>

            <button
              onClick={() => setModelType('simple')}
              className={`p-2 rounded-lg text-xs font-mono font-medium border text-center transition-all ${
                modelType === 'simple'
                  ? 'border-cyan-400 bg-cyan-950/40 text-cyan-300 shadow-glow'
                  : 'border-white/10 bg-navy-950 text-slate-400 hover:text-white'
              }`}
            >
              <div>Linear Model f_hat ≠ f(x)</div>
              <div className="text-[10px] opacity-75">Reducible Error &gt; 0</div>
            </button>
          </div>
        </div>
      </div>

      {/* Numerical Error Decomposition */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-5 font-mono">
        {/* Reducible Error */}
        <div className="p-3.5 rounded-xl bg-navy-900 border border-cyan-500/30">
          <span className="text-[10px] uppercase text-cyan-400 font-bold">1. Reducible Error</span>
          <div className="text-2xl font-bold text-white mt-1">
            {reducibleError.toFixed(2)}
          </div>
          <p className="text-[10px] text-slate-400 mt-0.5">
            {modelType === 'oracle'
              ? 'Zero! Oracle knows true f(x) perfectly.'
              : 'Error caused by suboptimal model choice.'}
          </p>
        </div>

        {/* Irreducible Error */}
        <div className="p-3.5 rounded-xl bg-navy-900 border border-amber-500/30">
          <span className="text-[10px] uppercase text-amber-400 font-bold">2. Irreducible Noise (σ²)</span>
          <div className="text-2xl font-bold text-white mt-1">
            {irreducibleError.toFixed(2)}
          </div>
          <p className="text-[10px] text-slate-400 mt-0.5">
            Physical noise floor. No algorithm can beat this!
          </p>
        </div>

        {/* Total Observed MSE */}
        <div className="p-3.5 rounded-xl bg-navy-900 border border-blue-500/40 shadow-glow">
          <span className="text-[10px] uppercase text-blue-300 font-bold">Total Observed MSE</span>
          <div className="text-2xl font-bold text-white mt-1">
            {totalMse.toFixed(2)}
          </div>
          <p className="text-[10px] text-cyan-300 mt-0.5">
            Reducible ({reducibleError.toFixed(1)}) + Noise ({irreducibleError.toFixed(1)})
          </p>
        </div>
      </div>

      {/* Chart Canvas */}
      <div className="mb-4">
        <InteractiveChart
          type="line"
          data={chartData}
          xKey="x"
          series={[
            { key: 'modelPrediction', name: 'Learned Model f_hat(x)', color: '#00f0ff' },
            { key: 'trueFunction', name: 'True Generator f(x)', color: '#10b981' },
            { key: 'observedDataWithNoise', name: 'Noisy Observed Samples y = f(x) + ε', color: '#f59e0b' },
          ]}
          height={280}
        />
      </div>

      {/* Crucial Takeaway */}
      <div className="p-4 rounded-xl bg-navy-900/60 border border-white/10 text-xs space-y-2">
        <div className="flex items-center gap-2 text-cyan-300 font-bold font-mono">
          <Zap className="h-4 w-4" />
          <span>The "Zero Error" Fallacy in Machine Learning:</span>
        </div>
        <p className="text-slate-300 leading-relaxed">
          Notice what happens when you select the <strong>Oracle Model</strong>: even though our model has perfect knowledge of the true underlying curve f(x), the total MSE is still <strong>{totalMse.toFixed(2)}</strong>!
        </p>
        <p className="text-slate-300 leading-relaxed">
          Because the real world produces data through sensor jitter, unmeasured environmental variables, and human subjectivity, the noise ε has non-zero variance σ².
          If any data science candidate claims to have trained a model that achieves <strong>100% accuracy</strong> (or 0.0 MSE) on real noisy test data, they have either:
        </p>
        <ul className="list-disc pl-5 space-y-1 text-slate-300">
          <li>Suffered from <strong>Data Leakage</strong> (the test set was accidentally leaked into the training data).</li>
          <li>Tested on the training set instead of a clean holdout split.</li>
          <li>Severely overfit to sample-specific artifacts.</li>
        </ul>
      </div>
    </div>
  );
}

