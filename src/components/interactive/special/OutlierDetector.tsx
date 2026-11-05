'use client';

import React, { useState, useMemo } from 'react';
import { AlertTriangle, Sliders, RefreshCw, Info } from 'lucide-react';
import InteractiveChart from '../InteractiveChart';

// Base dataset: house prices in $000s (10 values)
const BASE_DATA = [210, 235, 220, 245, 228, 240, 215, 232, 225, 238];

function computeStats(data: number[]) {
  const sorted = [...data].sort((a, b) => a - b);
  const n = data.length;
  const mean = data.reduce((s, v) => s + v, 0) / n;
  const median = n % 2 === 0 ? (sorted[n/2-1] + sorted[n/2]) / 2 : sorted[Math.floor(n/2)];
  const q1 = sorted[Math.floor(n/4)];
  const q3 = sorted[Math.floor(3*n/4)];
  const iqr = q3 - q1;
  const lowerFence = q1 - 1.5 * iqr;
  const upperFence = q3 + 1.5 * iqr;
  return { mean, median, q1, q3, iqr, lowerFence, upperFence, min: sorted[0], max: sorted[n-1], sorted };
}

export default function OutlierDetector() {
  const [outlier, setOutlier] = useState<number>(238); // extra "outlier" value — can be dragged
  const [includeOutlier, setIncludeOutlier] = useState(true);

  const data = useMemo(() =>
    includeOutlier ? [...BASE_DATA, outlier] : BASE_DATA,
    [outlier, includeOutlier]
  );

  const s = useMemo(() => computeStats(data), [data]);
  const isOutlier = outlier > s.upperFence || outlier < s.lowerFence;

  const chartData = useMemo(() =>
    data.map((v, i) => ({
      sample: `H${i+1}`,
      price: v,
      mean: Math.round(s.mean),
      median: Math.round(s.median),
      q1: s.q1,
      q3: s.q3,
    })), [data, s]);

  return (
    <div className="rounded-2xl border border-electric-cyan/30 bg-navy-950/85 p-5 backdrop-blur-md shadow-glow">
      <div className="flex items-center gap-2 text-xs font-mono text-cyan-400 mb-1">
        <AlertTriangle className="h-4 w-4" />
        <span>OUTLIER DETECTION SIMULATOR</span>
      </div>
      <h3 className="text-lg font-bold text-white mb-1">IQR Method & Outlier Impact</h3>
      <p className="text-xs text-slate-300 mb-4">
        Drag the outlier value slider. Watch how extreme values distort the <strong className="text-cyan-300">mean</strong> while the <strong className="text-purple-300">median stays stable</strong>.
      </p>

      {/* Outlier Controls */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-5">
        <div className="p-4 rounded-xl bg-navy-900/80 border border-white/10">
          <div className="flex justify-between text-xs font-mono mb-2">
            <span className="text-slate-300 font-bold">Outlier Value ($000s):</span>
            <span className={`font-bold ${isOutlier && includeOutlier ? 'text-rose-400' : 'text-emerald-400'}`}>
              ${outlier}k {isOutlier && includeOutlier ? '⚠ OUTLIER' : ''}
            </span>
          </div>
          <input
            type="range" min={150} max={800} step={5}
            value={outlier}
            onChange={e => setOutlier(Number(e.target.value))}
            className="w-full accent-rose-400 cursor-pointer"
          />
          <div className="flex justify-between text-[10px] font-mono text-slate-500 mt-1">
            <span>$150k (Low)</span>
            <span>$800k (High)</span>
          </div>
        </div>

        <div className="p-4 rounded-xl bg-navy-900/80 border border-white/10 flex flex-col gap-3">
          <button
            onClick={() => setIncludeOutlier(v => !v)}
            className={`flex-1 py-2 rounded-lg text-xs font-mono font-medium border transition-colors ${
              includeOutlier
                ? 'border-rose-500/40 bg-rose-500/10 text-rose-300 hover:bg-rose-500/20'
                : 'border-emerald-500/40 bg-emerald-500/10 text-emerald-300 hover:bg-emerald-500/20'
            }`}
          >
            {includeOutlier ? 'Remove Outlier from Dataset' : 'Add Outlier Back to Dataset'}
          </button>
          <div className="text-[11px] text-slate-400 text-center">
            Dataset: {data.length} samples. {includeOutlier ? 'Outlier included.' : 'Clean dataset.'}
          </div>
        </div>
      </div>

      {/* IQR Calculation */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 font-mono text-xs mb-5">
        <div className="p-3 rounded-xl bg-navy-900 border border-cyan-500/30">
          <div className="text-[10px] text-cyan-400 uppercase font-bold">Mean</div>
          <div className="text-lg font-bold text-white">${s.mean.toFixed(1)}k</div>
          <div className="text-[10px] text-slate-400">Pulled by extremes</div>
        </div>
        <div className="p-3 rounded-xl bg-navy-900 border border-purple-500/30">
          <div className="text-[10px] text-purple-400 uppercase font-bold">Median</div>
          <div className="text-lg font-bold text-white">${s.median.toFixed(1)}k</div>
          <div className="text-[10px] text-slate-400">Robust center</div>
        </div>
        <div className="p-3 rounded-xl bg-navy-900 border border-amber-500/30">
          <div className="text-[10px] text-amber-400 uppercase font-bold">IQR (Q3-Q1)</div>
          <div className="text-lg font-bold text-white">${s.iqr.toFixed(1)}k</div>
          <div className="text-[10px] text-slate-400">Middle 50% spread</div>
        </div>
        <div className="p-3 rounded-xl bg-navy-900 border border-rose-500/30">
          <div className="text-[10px] text-rose-400 uppercase font-bold">Outlier Fence</div>
          <div className="text-sm font-bold text-white">&lt;${s.lowerFence.toFixed(0)}k or &gt;${s.upperFence.toFixed(0)}k</div>
          <div className="text-[10px] text-slate-400">Q1/Q3 ± 1.5×IQR</div>
        </div>
      </div>

      {/* Chart: individual values vs mean vs median */}
      <div className="mb-4">
        <InteractiveChart
          type="line"
          data={chartData}
          xKey="sample"
          series={[
            { key: 'price', name: 'House Price ($000s)', color: '#38bdf8' },
            { key: 'mean', name: 'Mean', color: '#f59e0b' },
            { key: 'median', name: 'Median', color: '#a855f7' },
          ]}
          height={220}
        />
      </div>

      {/* Boxplot Summary */}
      <div className="p-4 rounded-xl bg-navy-900/60 border border-white/10 text-xs space-y-2">
        <div className="font-bold text-white font-mono">IQR Boxplot Summary:</div>
        <div className="flex gap-4 font-mono text-slate-300">
          <span>Min: <strong className="text-blue-300">${s.min}k</strong></span>
          <span>Q1: <strong className="text-cyan-300">${s.q1}k</strong></span>
          <span>Median: <strong className="text-purple-300">${s.median}k</strong></span>
          <span>Q3: <strong className="text-cyan-300">${s.q3}k</strong></span>
          <span>Max: <strong className="text-rose-300">${s.max}k</strong></span>
        </div>
        <div className="h-6 relative mt-2 bg-navy-950 rounded-full border border-white/10 overflow-hidden">
          {/* IQR box */}
          <div
            className="absolute top-0 h-full bg-cyan-500/30 border-x border-cyan-400"
            style={{
              left: `${((s.q1 - s.min) / (s.max - s.min)) * 100}%`,
              width: `${(s.iqr / (s.max - s.min)) * 100}%`,
            }}
          />
          {/* Median line */}
          <div
            className="absolute top-0 h-full w-0.5 bg-purple-400"
            style={{ left: `${((s.median - s.min) / (s.max - s.min)) * 100}%` }}
          />
        </div>
        <div className="text-slate-400 leading-relaxed">
          Any point below <strong className="text-rose-300">${s.lowerFence.toFixed(0)}k</strong> or above <strong className="text-rose-300">${s.upperFence.toFixed(0)}k</strong> is flagged as an outlier by the IQR method.
          {includeOutlier && isOutlier && (
            <span className="text-rose-300 font-bold"> Your current value of ${outlier}k is an outlier!</span>
          )}
        </div>
      </div>
    </div>
  );
}

