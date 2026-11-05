'use client';

import React, { useState, useMemo } from 'react';
import { BarChart2, Sliders, RefreshCw } from 'lucide-react';
import InteractiveChart from '../InteractiveChart';

type Shape = 'normal' | 'right-skewed' | 'left-skewed' | 'bimodal' | 'uniform';

const SHAPES: { id: Shape; label: string; desc: string; skewness: string }[] = [
  { id: 'normal', label: 'Normal (Bell Curve)', desc: 'Symmetric around the mean. Mean = Median = Mode.', skewness: '≈ 0 (Symmetric)' },
  { id: 'right-skewed', label: 'Right-Skewed (Positive)', desc: 'Long tail on the right. Mean > Median > Mode. Income distributions.', skewness: '> 0 (Positive Skew)' },
  { id: 'left-skewed', label: 'Left-Skewed (Negative)', desc: 'Long tail on the left. Mean < Median < Mode. Exam scores near ceiling.', skewness: '< 0 (Negative Skew)' },
  { id: 'bimodal', label: 'Bimodal', desc: 'Two separate peaks — hints at two sub-populations in the data.', skewness: 'Variable' },
  { id: 'uniform', label: 'Uniform', desc: 'All values equally likely. No preferred outcome.', skewness: '≈ 0' },
];

// Generate synthetic histogram bins for each shape
function generateBins(shape: Shape): { x: string; freq: number }[] {
  const labels = ['1','2','3','4','5','6','7','8','9','10'];
  const rawFreqs: Record<Shape, number[]> = {
    normal:       [2,  5,  11, 18, 24, 22, 12,  5,  1,  0],
    'right-skewed':[28,20, 15, 12,  8,  6,  4,  3,  2,  2],
    'left-skewed': [2,  2,  3,  4,  6,  8, 12, 15, 20, 28],
    bimodal:       [3, 10, 18,  8,  2,  2,  8, 18, 10,  3],
    uniform:       [10,10, 10, 10, 10, 10, 10, 10, 10, 10],
  };
  return labels.map((x, i) => ({ x, freq: rawFreqs[shape][i] }));
}

function distributionStats(shape: Shape) {
  const data: Record<Shape, { mean: string; median: string; mode: string }> = {
    normal:        { mean: '5.5', median: '5.5', mode: '5' },
    'right-skewed':{ mean: '3.8', median: '3.0', mode: '1' },
    'left-skewed': { mean: '7.2', median: '8.0', mode: '10' },
    bimodal:       { mean: '5.5', median: '5.5', mode: '3 and 8' },
    uniform:       { mean: '5.5', median: '5.5', mode: 'None' },
  };
  return data[shape];
}

export default function DistributionExplorer() {
  const [shape, setShape] = useState<Shape>('normal');

  const bins = useMemo(() => generateBins(shape), [shape]);
  const s = useMemo(() => distributionStats(shape), [shape]);
  const shapeInfo = SHAPES.find(sh => sh.id === shape)!;

  return (
    <div className="rounded-2xl border border-electric-cyan/30 bg-navy-950/85 p-5 backdrop-blur-md shadow-glow">
      <div className="flex items-center gap-2 text-xs font-mono text-cyan-400 mb-1">
        <BarChart2 className="h-4 w-4" />
        <span>DATA DISTRIBUTION EXPLORER</span>
      </div>
      <h3 className="text-lg font-bold text-white mb-1">Distribution Shapes & Skewness</h3>
      <p className="text-xs text-slate-300 mb-4">
        Select a distribution shape to see how it looks and how Mean, Median, and Mode relate.
      </p>

      {/* Shape Selector */}
      <div className="grid grid-cols-1 sm:grid-cols-5 gap-2 mb-5">
        {SHAPES.map(sh => (
          <button
            key={sh.id}
            onClick={() => setShape(sh.id)}
            className={`p-2.5 rounded-xl border text-left text-xs transition-all ${
              shape === sh.id
                ? 'border-cyan-400 bg-cyan-950/40 text-cyan-300'
                : 'border-white/10 bg-navy-900/60 text-slate-400 hover:text-white hover:bg-navy-900'
            }`}
          >
            <div className="font-bold">{sh.label}</div>
            <div className="text-[10px] opacity-70 mt-0.5">{sh.skewness}</div>
          </button>
        ))}
      </div>

      {/* Chart */}
      <div className="mb-4">
        <InteractiveChart
          type="bar"
          data={bins}
          xKey="x"
          series={[{ key: 'freq', name: 'Frequency', color: '#00f0ff' }]}
          height={220}
        />
      </div>

      {/* Central Tendency Readout */}
      <div className="grid grid-cols-3 gap-3 font-mono text-xs mb-4">
        <div className="p-3 rounded-xl bg-navy-900 border border-cyan-500/30">
          <div className="text-[10px] text-cyan-400 uppercase font-bold">Mean (Average)</div>
          <div className="text-lg font-bold text-white mt-0.5">{s.mean}</div>
          <div className="text-[10px] text-slate-400">Pulled by outliers</div>
        </div>
        <div className="p-3 rounded-xl bg-navy-900 border border-purple-500/30">
          <div className="text-[10px] text-purple-400 uppercase font-bold">Median (Middle)</div>
          <div className="text-lg font-bold text-white mt-0.5">{s.median}</div>
          <div className="text-[10px] text-slate-400">Robust to outliers</div>
        </div>
        <div className="p-3 rounded-xl bg-navy-900 border border-amber-500/30">
          <div className="text-[10px] text-amber-400 uppercase font-bold">Mode (Most Freq.)</div>
          <div className="text-lg font-bold text-white mt-0.5">{s.mode}</div>
          <div className="text-[10px] text-slate-400">Most common value</div>
        </div>
      </div>

      {/* Description */}
      <div className="p-3.5 rounded-xl bg-navy-900/60 border border-white/10 text-xs space-y-1.5">
        <div className="font-bold text-white">{shapeInfo.label}</div>
        <p className="text-slate-300 leading-relaxed">{shapeInfo.desc}</p>
        <div className="text-cyan-300 font-mono">Skewness: {shapeInfo.skewness}</div>
        {shape === 'right-skewed' && (
          <p className="text-amber-300">
            Real-world example: Household income — most people earn modest salaries, but a few billionaires pull the mean far above the median. This is why median income is a better social statistic than mean income.
          </p>
        )}
        {shape === 'bimodal' && (
          <p className="text-purple-300">
            EDA insight: A bimodal distribution often reveals two hidden sub-groups. For example, a height distribution combining both male and female populations produces two overlapping bell curves.
          </p>
        )}
      </div>
    </div>
  );
}

