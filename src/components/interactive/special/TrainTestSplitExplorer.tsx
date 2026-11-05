'use client';

import React, { useState } from 'react';
import { SlidersHorizontal, Database } from 'lucide-react';

const N_TOTAL = 100;

const SAMPLE_FEATURES = ['Area (sqft)', 'Bedrooms', 'Age (yrs)', 'Location Score', 'Garage'];
const SAMPLE_DATA = Array.from({ length: N_TOTAL }, (_, i) => ({
  id: i + 1,
  area: Math.round(800 + Math.random() * 2400),
  bedrooms: Math.round(1 + Math.random() * 4),
  age: Math.round(1 + Math.random() * 50),
  location: Math.round(40 + Math.random() * 60),
  garage: Math.random() > 0.4 ? 1 : 0,
  price: Math.round(120 + Math.random() * 880)
}));

export default function TrainTestSplitExplorer() {
  const [splitPct, setSplitPct] = useState(80);
  const [showRows, setShowRows] = useState(false);

  const trainN = Math.round((splitPct / 100) * N_TOTAL);
  const testN = N_TOTAL - trainN;
  const trainData = SAMPLE_DATA.slice(0, trainN);
  const testData = SAMPLE_DATA.slice(trainN);

  return (
    <div className="rounded-2xl border border-border/80 bg-navy-900/60 p-6 backdrop-blur-md shadow-2xl space-y-6">
      <div className="flex items-center gap-3 border-b border-border/50 pb-5">
        <span className="p-2 rounded-lg bg-electric-cyan/10 border border-electric-cyan/30 text-electric-cyan">
          <SlidersHorizontal className="w-5 h-5" />
        </span>
        <div>
          <h3 className="text-xl font-bold text-white">Train / Test Split Explorer</h3>
          <p className="text-xs text-slate-400 mt-0.5">Adjust the slider to partition the 100-sample housing dataset</p>
        </div>
      </div>

      {/* Slider Control */}
      <div className="space-y-3 bg-navy-950/70 rounded-xl border border-border/60 p-4">
        <div className="flex items-center justify-between text-xs font-semibold">
          <span className="text-slate-400">Training Proportion:</span>
          <span className="font-mono text-electric-cyan text-base">{splitPct}%</span>
        </div>
        <input
          type="range"
          min={50}
          max={95}
          step={5}
          value={splitPct}
          onChange={e => setSplitPct(Number(e.target.value))}
          className="w-full h-2 accent-electric-cyan cursor-pointer"
        />
        <div className="flex justify-between text-[10px] text-slate-600 font-mono">
          <span>50% / 50%</span>
          <span>95% / 5%</span>
        </div>
      </div>

      {/* Visual Bar */}
      <div className="space-y-2">
        <div className="text-xs font-mono text-slate-400 uppercase tracking-wider">Dataset Partition Visualizer</div>
        <div className="relative w-full h-12 rounded-xl overflow-hidden border border-border/50 flex">
          <div
            className="h-full bg-gradient-to-r from-electric-cyan/60 to-electric-cyan/80 flex items-center justify-center text-xs font-bold text-navy-950 transition-all duration-300"
            style={{ width: `${splitPct}%` }}
          >
            {splitPct >= 20 && `Train: ${trainN} samples`}
          </div>
          <div
            className="h-full bg-gradient-to-r from-rose-500/60 to-rose-400/80 flex items-center justify-center text-xs font-bold text-white transition-all duration-300"
            style={{ width: `${100 - splitPct}%` }}
          >
            {(100 - splitPct) >= 10 && `Test: ${testN} samples`}
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 gap-4">
        <div className="p-4 rounded-xl border border-electric-cyan/30 bg-electric-cyan/5 space-y-1">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-electric-cyan" />
            <span className="text-xs font-bold text-white">Training Set</span>
          </div>
          <div className="text-3xl font-bold font-mono text-electric-cyan">{trainN}</div>
          <div className="text-[11px] text-slate-400">samples ({splitPct}%)</div>
          <div className="text-[11px] text-slate-500 mt-2 leading-relaxed">
            Used to fit model parameters. Algorithm never sees Test rows during this phase.
          </div>
        </div>
        <div className="p-4 rounded-xl border border-rose-500/30 bg-rose-500/5 space-y-1">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-rose-400" />
            <span className="text-xs font-bold text-white">Test Set</span>
          </div>
          <div className="text-3xl font-bold font-mono text-rose-400">{testN}</div>
          <div className="text-[11px] text-slate-400">samples ({100 - splitPct}%)</div>
          <div className="text-[11px] text-slate-500 mt-2 leading-relaxed">
            Locked away until final evaluation. Simulates real-world unseen data.
          </div>
        </div>
      </div>

      {/* Bias-Variance Tradeoff Annotation */}
      <div className="p-4 rounded-xl border border-amber-500/30 bg-amber-500/5 space-y-1.5">
        <div className="text-xs font-bold text-amber-300">Split-Size Impact on Bias vs Variance:</div>
        <div className="text-xs text-slate-300 leading-relaxed">
          {splitPct >= 90
            ? '⚠️ Very large train set gives more data to fit the model, but the tiny test set produces a high-variance evaluation estimate.'
            : splitPct >= 70
            ? '✅ The 70–80% range is a widely accepted industry standard, balancing sufficient training data with a robust evaluation sample.'
            : '⚠️ Small training sets (< 70%) may cause high bias — the model is starved of data and may underfit.'}
        </div>
      </div>

      {/* Data Preview Table */}
      <div>
        <button
          onClick={() => setShowRows(v => !v)}
          className="flex items-center gap-2 text-xs font-semibold text-electric-cyan hover:text-white transition-colors mb-3"
        >
          <Database className="w-3.5 h-3.5" />
          {showRows ? 'Hide' : 'Show'} first 8 rows of each partition
        </button>
        {showRows && (
          <div className="space-y-3">
            {(['Training Set', 'Test Set'] as const).map((label, setIdx) => {
              const rows = setIdx === 0 ? trainData.slice(0, 8) : testData.slice(0, 8);
              const color = setIdx === 0 ? '#00f0ff' : '#f43f5e';
              return (
                <div key={label} className="space-y-1.5">
                  <div className="text-[11px] font-mono uppercase tracking-wider" style={{ color }}>{label}</div>
                  <div className="overflow-x-auto rounded-xl border border-border/50">
                    <table className="w-full text-[11px] text-slate-300">
                      <thead>
                        <tr className="border-b border-border/50 bg-navy-950/80">
                          <th className="px-3 py-2 text-left text-slate-500 font-mono">#</th>
                          {SAMPLE_FEATURES.map(f => (
                            <th key={f} className="px-3 py-2 text-left text-slate-500 font-mono">{f}</th>
                          ))}
                          <th className="px-3 py-2 text-left font-mono" style={{ color }}>Price ($k)</th>
                        </tr>
                      </thead>
                      <tbody>
                        {rows.map((row, i) => (
                          <tr key={row.id} className={`border-b border-border/30 ${i % 2 === 0 ? 'bg-navy-950/30' : ''}`}>
                            <td className="px-3 py-1.5 text-slate-600 font-mono">{row.id}</td>
                            <td className="px-3 py-1.5">{row.area}</td>
                            <td className="px-3 py-1.5">{row.bedrooms}</td>
                            <td className="px-3 py-1.5">{row.age}</td>
                            <td className="px-3 py-1.5">{row.location}</td>
                            <td className="px-3 py-1.5">{row.garage}</td>
                            <td className="px-3 py-1.5 font-mono font-bold" style={{ color }}>{row.price}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}

