'use client';

import React, { useState, useMemo } from 'react';
import { Sliders, TrendingUp, Sparkles, Scale, CheckCircle2 } from 'lucide-react';

interface DataPoint {
  id: number;
  x: number;
  y: number;
}

// 14 representative observations on a non-linear curve (e.g. House SqFt in hundreds vs Price in $k)
const TRAINING_DATA: DataPoint[] = [
  { id: 1, x: 10, y: 150 },
  { id: 2, x: 15, y: 180 },
  { id: 3, x: 20, y: 240 },
  { id: 4, x: 25, y: 210 },
  { id: 5, x: 30, y: 310 },
  { id: 6, x: 35, y: 340 },
  { id: 7, x: 42, y: 420 },
  { id: 8, x: 50, y: 460 },
  { id: 9, x: 58, y: 490 },
  { id: 10, x: 65, y: 620 },
  { id: 11, x: 72, y: 680 },
  { id: 12, x: 80, y: 730 },
  { id: 13, x: 88, y: 840 },
  { id: 14, x: 95, y: 910 },
];

export default function KnnRegressionVisualizer() {
  const [queryX, setQueryX] = useState<number>(45);
  const [k, setK] = useState<number>(3);
  const [weighting, setWeighting] = useState<'uniform' | 'distance'>('uniform');

  // Compute distance to each training point
  const sortedPoints = useMemo(() => {
    return TRAINING_DATA.map(pt => {
      const dist = Math.abs(pt.x - queryX);
      return { ...pt, dist };
    }).sort((a, b) => a.dist - b.dist);
  }, [queryX]);

  const nearestK = useMemo(() => sortedPoints.slice(0, k), [sortedPoints, k]);

  // Compute prediction
  const prediction = useMemo(() => {
    if (weighting === 'uniform') {
      const sum = nearestK.reduce((acc, curr) => acc + curr.y, 0);
      return Math.round(sum / k);
    } else {
      // Distance weighted: w = 1 / (d + 1e-5)
      let weightedSum = 0;
      let totalWeight = 0;
      nearestK.forEach(pt => {
        const w = 1 / (pt.dist + 0.001);
        weightedSum += w * pt.y;
        totalWeight += w;
      });
      return Math.round(weightedSum / totalWeight);
    }
  }, [nearestK, k, weighting]);

  // Compute step-curve points across domain [10, 95] for visualization
  const curvePoints = useMemo(() => {
    const pts = [];
    for (let x = 10; x <= 95; x += 2) {
      const neighbors = TRAINING_DATA.map(p => ({ ...p, dist: Math.abs(p.x - x) })).sort((a, b) => a.dist - b.dist).slice(0, k);
      let pred = 0;
      if (weighting === 'uniform') {
        pred = neighbors.reduce((acc, c) => acc + c.y, 0) / k;
      } else {
        let wSum = 0;
        let totW = 0;
        neighbors.forEach(p => {
          const w = 1 / (p.dist + 0.001);
          wSum += w * p.y;
          totW += w;
        });
        pred = wSum / totW;
      }
      pts.push({ x, y: pred });
    }
    return pts;
  }, [k, weighting]);

  return (
    <div className="rounded-2xl border border-border/80 bg-navy-900/60 p-6 backdrop-blur-md shadow-2xl space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-border/50 pb-5">
        <div className="flex items-center gap-3">
          <span className="p-2 rounded-lg bg-electric-cyan/10 border border-electric-cyan/30 text-electric-cyan">
            <TrendingUp className="w-5 h-5" />
          </span>
          <div>
            <h3 className="text-xl font-bold text-white">KNN Continuous Regression Visualizer</h3>
            <p className="text-xs text-slate-400 mt-0.5">Explore how K nearest continuous neighbors vote and average to predict a numerical target</p>
          </div>
        </div>

        {/* Weighting Selector */}
        <div className="flex items-center gap-2 bg-navy-950/80 p-1 rounded-xl border border-border">
          <button
            onClick={() => setWeighting('uniform')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              weighting === 'uniform'
                ? 'bg-electric-cyan/20 border border-electric-cyan/60 text-white shadow-sm'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Uniform Average
          </button>
          <button
            onClick={() => setWeighting('distance')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              weighting === 'distance'
                ? 'bg-violet-500/20 border border-violet-500/60 text-white shadow-sm'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Distance-Weighted (1 / d)
          </button>
        </div>
      </div>

      {/* Sliders Control Bar */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 bg-navy-950/70 p-4 rounded-xl border border-border/60">
        <div className="space-y-1.5">
          <div className="flex justify-between items-center text-xs">
            <span className="text-slate-300 font-semibold">Query Feature Input (X):</span>
            <span className="font-mono font-bold text-amber-300 text-sm">X = {queryX}</span>
          </div>
          <input
            type="range"
            min={12}
            max={92}
            value={queryX}
            onChange={(e) => setQueryX(Number(e.target.value))}
            className="w-full accent-amber-400 cursor-pointer"
          />
          <div className="flex justify-between text-[10px] text-slate-500 font-mono">
            <span>Min: X = 12</span>
            <span>Max: X = 92</span>
          </div>
        </div>

        <div className="space-y-1.5">
          <div className="flex justify-between items-center text-xs">
            <span className="text-slate-300 font-semibold">Neighbors Count K:</span>
            <span className="font-mono font-bold text-electric-cyan text-sm">K = {k}</span>
          </div>
          <input
            type="range"
            min={1}
            max={7}
            step={1}
            value={k}
            onChange={(e) => setK(Number(e.target.value))}
            className="w-full accent-electric-cyan cursor-pointer"
          />
          <div className="flex justify-between text-[10px] text-slate-500 font-mono">
            <span>K = 1 (Jagged step function)</span>
            <span>K = 7 (Smoother curve)</span>
          </div>
        </div>
      </div>

      {/* Visualization Stage */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* SVG Plot (7 Cols) */}
        <div className="lg:col-span-7 bg-navy-950/80 rounded-xl border border-border/70 p-4 space-y-2">
          <div className="flex items-center justify-between text-xs text-slate-400 pb-1">
            <span>Feature X vs Continuous Target Y</span>
            <span className="font-mono text-electric-cyan text-[11px]">
              Predicted ŷ = ${prediction}k
            </span>
          </div>

          <div className="relative w-full aspect-[4/3] max-h-[320px] bg-navy-950 rounded-xl border border-border/50 overflow-hidden">
            <svg viewBox="0 0 100 100" className="w-full h-full">
              {/* Grid Lines */}
              {[25, 50, 75].map(v => (
                <React.Fragment key={v}>
                  <line x1={v} y1={0} x2={v} y2={100} stroke="#1e293b" strokeWidth={0.5} />
                  <line x1={0} y1={v} x2={100} y2={v} stroke="#1e293b" strokeWidth={0.5} />
                </React.Fragment>
              ))}

              {/* KNN Regression Fitted Curve (Polyline) */}
              <polyline
                points={curvePoints.map(p => `${p.x},${100 - (p.y / 1000) * 100}`).join(' ')}
                fill="none"
                stroke="#00f0ff"
                strokeWidth={1.5}
                strokeOpacity={0.8}
              />

              {/* Vertical Guide for Query X */}
              <line
                x1={queryX}
                y1={0}
                x2={queryX}
                y2={100}
                stroke="#f59e0b"
                strokeWidth={1}
                strokeDasharray="2,2"
              />

              {/* Horizontal Guide for Predicted Y */}
              <line
                x1={0}
                y1={100 - (prediction / 1000) * 100}
                x2={100}
                y2={100 - (prediction / 1000) * 100}
                stroke="#f59e0b"
                strokeWidth={1}
                strokeDasharray="2,2"
              />

              {/* Training Points */}
              {TRAINING_DATA.map(pt => {
                const isK = nearestK.some(n => n.id === pt.id);
                return (
                  <circle
                    key={pt.id}
                    cx={pt.x}
                    cy={100 - (pt.y / 1000) * 100}
                    r={isK ? 3 : 2}
                    fill={isK ? '#a855f7' : '#334155'}
                    stroke={isK ? '#ffffff' : '#070b19'}
                    strokeWidth={isK ? 1 : 0.5}
                  />
                );
              })}

              {/* Predicted Target Marker */}
              <circle
                cx={queryX}
                cy={100 - (prediction / 1000) * 100}
                r={4}
                fill="#f59e0b"
                stroke="#ffffff"
                strokeWidth={1.5}
              />
            </svg>
          </div>

          <div className="flex items-center justify-around text-[11px] pt-1 text-slate-400">
            <span className="flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-slate-600" /> Distant Training Observations
            </span>
            <span className="flex items-center gap-1 text-purple-400">
              <span className="w-2.5 h-2.5 rounded-full bg-purple-500" /> {k} Nearest Neighbors
            </span>
            <span className="flex items-center gap-1 text-amber-300">
              <span className="w-2.5 h-2.5 rounded-full bg-amber-400" /> Predicted (X={queryX}, ŷ={prediction})
            </span>
          </div>
        </div>

        {/* Calculation Table (5 Cols) */}
        <div className="lg:col-span-5 space-y-4">
          <div className="p-4 rounded-xl border border-electric-cyan/30 bg-electric-cyan/5 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono font-bold uppercase tracking-wider text-electric-cyan">
                Continuous Target Estimate
              </span>
              <span className="text-xs font-mono px-2 py-0.5 rounded bg-navy-950 text-slate-300 border border-border">
                {weighting === 'uniform' ? 'Uniform Mean' : 'Inverse Distance Weighted'}
              </span>
            </div>
            <div className="text-2xl font-bold font-mono text-white">
              ŷ = ${prediction},000
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              {weighting === 'uniform'
                ? `Simple arithmetic mean of the ${k} closest target outputs: (${nearestK.map(n => `$${n.y}k`).join(' + ')}) / ${k}`
                : `Points closer to X=${queryX} exert higher voting weight according to w_i = 1 / d_i.`}
            </p>
          </div>

          {/* Breakdown Table */}
          <div className="space-y-2">
            <span className="text-[11px] font-mono uppercase tracking-wider text-slate-400">
              {k} Contributing Neighbors:
            </span>
            <div className="overflow-x-auto rounded-xl border border-border/50">
              <table className="w-full text-[11px] text-slate-300">
                <thead className="bg-navy-950 text-slate-500 font-mono">
                  <tr className="border-b border-border/50">
                    <th className="px-2.5 py-1.5 text-left">Neighbor</th>
                    <th className="px-2.5 py-1.5 text-left">X Val</th>
                    <th className="px-2.5 py-1.5 text-right">Target y</th>
                    <th className="px-2.5 py-1.5 text-right">Distance |ΔX|</th>
                  </tr>
                </thead>
                <tbody>
                  {nearestK.map((n, idx) => (
                    <tr key={n.id} className="border-b border-border/20 bg-navy-900/40">
                      <td className="px-2.5 py-1 font-mono text-purple-400">Neighbor #{idx + 1}</td>
                      <td className="px-2.5 py-1 font-mono text-slate-300">{n.x}</td>
                      <td className="px-2.5 py-1 font-mono font-bold text-white text-right">${n.y}k</td>
                      <td className="px-2.5 py-1 font-mono text-amber-300 text-right">{n.dist.toFixed(1)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

