'use client';

import React, { useState, useMemo } from 'react';
import { Sliders, Maximize2, ShieldCheck, Info, Compass } from 'lucide-react';
import InteractiveChart from '../InteractiveChart';

interface Candidate {
  id: number;
  name: string;
  age: number; // 20 to 60
  income: number; // 25,000 to 140,000
}

const RAW_CANDIDATES: Candidate[] = [
  { id: 1, name: 'Alice', age: 24, income: 32000 },
  { id: 2, name: 'Bob', age: 48, income: 85000 },
  { id: 3, name: 'Charlie', age: 29, income: 45000 },
  { id: 4, name: 'Diana', age: 55, income: 128000 },
  { id: 5, name: 'Evan', age: 36, income: 64000 },
];

export default function FeatureScalingLab() {
  const [scaleMethod, setScaleMethod] = useState<'raw' | 'minmax' | 'standard'>('minmax');

  // Compute stats for raw Age and Income
  const stats = useMemo(() => {
    const ages = RAW_CANDIDATES.map(c => c.age);
    const incomes = RAW_CANDIDATES.map(c => c.income);

    const minAge = Math.min(...ages), maxAge = Math.max(...ages);
    const minInc = Math.min(...incomes), maxInc = Math.max(...incomes);

    const meanAge = ages.reduce((a, b) => a + b, 0) / ages.length;
    const meanInc = incomes.reduce((a, b) => a + b, 0) / incomes.length;

    const stdAge = Math.sqrt(ages.reduce((s, a) => s + (a - meanAge) ** 2, 0) / (ages.length - 1));
    const stdInc = Math.sqrt(incomes.reduce((s, i) => s + (i - meanInc) ** 2, 0) / (incomes.length - 1));

    return { minAge, maxAge, minInc, maxInc, meanAge, meanInc, stdAge, stdInc };
  }, []);

  // Transformed data
  const transformed = useMemo(() => {
    return RAW_CANDIDATES.map(c => {
      let scaledAge = c.age;
      let scaledIncome = c.income;

      if (scaleMethod === 'minmax') {
        scaledAge = (c.age - stats.minAge) / (stats.maxAge - stats.minAge);
        scaledIncome = (c.income - stats.minInc) / (stats.maxInc - stats.minInc);
      } else if (scaleMethod === 'standard') {
        scaledAge = (c.age - stats.meanAge) / stats.stdAge;
        scaledIncome = (c.income - stats.meanInc) / stats.stdInc;
      }

      return {
        ...c,
        scaledAge: Number(scaledAge.toFixed(2)),
        scaledIncome: Number(scaledIncome.toFixed(2)),
      };
    });
  }, [scaleMethod, stats]);

  // Distance comparison between Alice (#1) and Bob (#2)
  const distanceMetric = useMemo(() => {
    const p1 = transformed[0];
    const p2 = transformed[1];

    const ageDiff = p1.scaledAge - p2.scaledAge;
    const incDiff = p1.scaledIncome - p2.scaledIncome;

    const ageSq = ageDiff * ageDiff;
    const incSq = incDiff * incDiff;
    const euclideanDist = Math.sqrt(ageSq + incSq);

    const ageContributionPct = (ageSq / (ageSq + incSq)) * 100;
    const incContributionPct = (incSq / (ageSq + incSq)) * 100;

    return {
      ageDiff: Math.abs(ageDiff),
      incDiff: Math.abs(incDiff),
      euclideanDist,
      ageContributionPct,
      incContributionPct,
    };
  }, [transformed]);

  return (
    <div className="rounded-2xl border border-electric-cyan/30 bg-navy-950/85 p-6 backdrop-blur-md shadow-glow">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-white/10 pb-4 mb-5">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono text-cyan-400">
            <Maximize2 className="h-4 w-4" />
            <span>NUMERICAL FEATURE NORMALIZATION & STANDARDIZATION</span>
          </div>
          <h3 className="text-lg font-bold text-white mt-0.5">
            Feature Scaling & Distance Distortion Lab
          </h3>
          <p className="text-xs text-slate-300">
            Watch how unscaled features distort distance metrics (KNN, K-Means, SVM) and how scaling equalizes influence.
          </p>
        </div>

        {/* Method Toggles */}
        <div className="flex items-center gap-1.5 p-1 rounded-xl bg-navy-900 border border-white/10 w-fit">
          <button
            onClick={() => setScaleMethod('raw')}
            className={`px-3 py-1.5 rounded-lg text-xs font-mono transition-colors ${
              scaleMethod === 'raw'
                ? 'bg-rose-500/20 text-rose-300 border border-rose-500/30'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Raw Unscaled
          </button>
          <button
            onClick={() => setScaleMethod('minmax')}
            className={`px-3 py-1.5 rounded-lg text-xs font-mono transition-colors ${
              scaleMethod === 'minmax'
                ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/30'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Min-Max [0, 1]
          </button>
          <button
            onClick={() => setScaleMethod('standard')}
            className={`px-3 py-1.5 rounded-lg text-xs font-mono transition-colors ${
              scaleMethod === 'standard'
                ? 'bg-purple-500/20 text-purple-300 border border-purple-500/30'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Standard Z-Score
          </button>
        </div>
      </div>

      {/* Comparison Metrics: The Scale Trap */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-5 font-mono">
        <div className="p-4 rounded-xl bg-navy-900/80 border border-white/10">
          <span className="text-[10px] text-slate-400 uppercase font-bold">Scaling Formula Applied</span>
          <div className="text-base font-bold text-white mt-1">
            {scaleMethod === 'raw' && 'None (Raw Native Units)'}
            {scaleMethod === 'minmax' && 'x_scaled = (x - min) / (max - min)'}
            {scaleMethod === 'standard' && 'z = (x - μ) / σ'}
          </div>
          <p className="text-[11px] text-slate-400 mt-1">
            {scaleMethod === 'raw' && 'Income ranges [32k, 128k], Age ranges [24, 55]'}
            {scaleMethod === 'minmax' && 'All values strictly bounded in [0.0, 1.0]'}
            {scaleMethod === 'standard' && 'Centered at mean = 0.0 with std = 1.0'}
          </p>
        </div>

        <div className="p-4 rounded-xl bg-navy-900/80 border border-cyan-500/30">
          <span className="text-[10px] text-cyan-400 uppercase font-bold">Age Influence on Distance</span>
          <div className="text-2xl font-bold text-white mt-1">
            {distanceMetric.ageContributionPct.toFixed(1)}%
          </div>
          <div className="h-1.5 w-full bg-navy-950 rounded-full overflow-hidden mt-1.5">
            <div className="h-full bg-cyan-400" style={{ width: `${distanceMetric.ageContributionPct}%` }} />
          </div>
        </div>

        <div className="p-4 rounded-xl bg-navy-900/80 border border-purple-500/30">
          <span className="text-[10px] text-purple-400 uppercase font-bold">Income Influence on Distance</span>
          <div className="text-2xl font-bold text-white mt-1">
            {distanceMetric.incContributionPct.toFixed(1)}%
          </div>
          <div className="h-1.5 w-full bg-navy-950 rounded-full overflow-hidden mt-1.5">
            <div className="h-full bg-purple-400" style={{ width: `${distanceMetric.incContributionPct}%` }} />
          </div>
        </div>
      </div>

      {/* The Danger Banner if Raw */}
      {scaleMethod === 'raw' && (
        <div className="p-4 rounded-xl border border-rose-500/40 bg-rose-950/20 text-xs text-rose-200 mb-5 space-y-1">
          <div className="font-bold flex items-center gap-1.5 text-rose-300">
            <Compass className="h-4 w-4" />
            <span>THE UNCALIBRATED SCALE DISASTER:</span>
          </div>
          <p className="leading-relaxed">
            Notice that without scaling, <strong>Income accounts for {distanceMetric.incContributionPct.toFixed(4)}%</strong> of Euclidean distance, while <strong>Age accounts for only {distanceMetric.ageContributionPct.toFixed(4)}%</strong>!
            Because Income values are measured in tens of thousands while Age is in tens, any distance-based algorithm (KNN, K-Means clustering) will completely ignore Age!
          </p>
        </div>
      )}

      {/* Transformed Values Table */}
      <div className="overflow-x-auto rounded-xl border border-white/10 bg-navy-900/50 mb-4 font-mono text-xs">
        <table className="w-full text-left">
          <thead className="bg-navy-900 text-slate-400 border-b border-white/10">
            <tr>
              <th className="py-2.5 px-3">Candidate</th>
              <th className="py-2.5 px-3">Raw Age</th>
              <th className="py-2.5 px-3 text-cyan-300">Transformed Age</th>
              <th className="py-2.5 px-3">Raw Income</th>
              <th className="py-2.5 px-3 text-purple-300">Transformed Income</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5 text-slate-200">
            {transformed.map(c => (
              <tr key={c.id} className="hover:bg-white/5 transition-colors">
                <td className="py-2.5 px-3 font-medium text-white">{c.name}</td>
                <td className="py-2.5 px-3 text-slate-400">{c.age} yrs</td>
                <td className="py-2.5 px-3 font-bold text-cyan-300">{c.scaledAge}</td>
                <td className="py-2.5 px-3 text-slate-400">${c.income.toLocaleString()}</td>
                <td className="py-2.5 px-3 font-bold text-purple-300">{c.scaledIncome}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* When to use which */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-mono">
        <div className="p-3.5 rounded-xl bg-navy-950 border border-white/5 space-y-1">
          <span className="text-cyan-300 font-bold">When to choose Normalization (Min-Max):</span>
          <p className="text-slate-300 text-[11px] leading-relaxed">
            When you need bounded features in [0, 1] (e.g. image pixels, neural network inputs, or algorithms with bounded activation functions like Sigmoid). Vulnerable to outliers.
          </p>
        </div>

        <div className="p-3.5 rounded-xl bg-navy-950 border border-white/5 space-y-1">
          <span className="text-purple-300 font-bold">When to choose Standardization (Z-Score):</span>
          <p className="text-slate-300 text-[11px] leading-relaxed">
            The standard default for linear models, Logistic Regression, SVMs, and PCA. Robust to outliers because it does not bind the distribution to strict minimum and maximum boundaries.
          </p>
        </div>
      </div>
    </div>
  );
}

