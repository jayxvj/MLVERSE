'use client';

import React, { useState } from 'react';
import { Compass, Scale, Sparkles, ArrowRight, Info } from 'lucide-react';

export default function DistanceCalculator() {
  const [p1, setP1] = useState<{ x: number; y: number }>({ x: 20, y: 30 });
  const [p2, setP2] = useState<{ x: number; y: number }>({ x: 70, y: 80 });
  const [pParam, setPParam] = useState<number>(3);
  const [scaleDisparity, setScaleDisparity] = useState<boolean>(false);

  // Scaled coordinates simulation (e.g. Feature 1 = Income in $k (0-100), Feature 2 = Age (0-100))
  // When scale disparity is on, multiply Y by 10
  const yMultiplier = scaleDisparity ? 10 : 1;
  const p1yEffective = p1.y * yMultiplier;
  const p2yEffective = p2.y * yMultiplier;

  const dx = Math.abs(p2.x - p1.x);
  const dy = Math.abs(p2yEffective - p1yEffective);

  const euclidean = Math.sqrt(dx * dx + dy * dy);
  const manhattan = dx + dy;
  const minkowski = Math.pow(Math.pow(dx, pParam) + Math.pow(dy, pParam), 1 / pParam);
  const chebyshev = Math.max(dx, dy);

  return (
    <div className="rounded-2xl border border-border/80 bg-navy-900/60 p-6 backdrop-blur-md shadow-2xl space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-border/50 pb-5">
        <div className="flex items-center gap-3">
          <span className="p-2 rounded-lg bg-violet-500/10 border border-violet-500/30 text-violet-400">
            <Compass className="w-5 h-5" />
          </span>
          <div>
            <h3 className="text-xl font-bold text-white">Dynamic Distance Metric Visualizer</h3>
            <p className="text-xs text-slate-400 mt-0.5">Move Point A and Point B to compare Euclidean, Manhattan, and Minkowski distance geometries</p>
          </div>
        </div>

        {/* Feature Scaling Toggle */}
        <label className="flex items-center gap-2 cursor-pointer bg-navy-950/80 px-3 py-2 rounded-xl border border-border">
          <input
            type="checkbox"
            checked={scaleDisparity}
            onChange={(e) => setScaleDisparity(e.target.checked)}
            className="accent-electric-cyan w-4 h-4 cursor-pointer rounded"
          />
          <span className="text-xs text-slate-300 font-medium">
            Simulate Unscaled Feature (10× Y-scale)
          </span>
        </label>
      </div>

      {/* Coordinate Sliders */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 bg-navy-950/70 p-4 rounded-xl border border-border/60">
        {/* Point A */}
        <div className="space-y-2">
          <div className="flex items-center justify-between text-xs font-bold text-electric-cyan">
            <div className="flex items-center gap-1.5">
              <span className="w-3 h-3 rounded-full bg-electric-cyan" />
              Point A (x₁, y₁)
            </div>
            <span className="font-mono">({p1.x}, {p1.y})</span>
          </div>
          <div className="space-y-1">
            <div className="flex justify-between text-[11px] text-slate-400">
              <span>X₁ Coordinate:</span>
              <span className="font-mono">{p1.x}</span>
            </div>
            <input
              type="range"
              min={0}
              max={100}
              value={p1.x}
              onChange={(e) => setP1(prev => ({ ...prev, x: Number(e.target.value) }))}
              className="w-full accent-electric-cyan cursor-pointer"
            />
          </div>
          <div className="space-y-1">
            <div className="flex justify-between text-[11px] text-slate-400">
              <span>Y₁ Coordinate:</span>
              <span className="font-mono">{p1.y}</span>
            </div>
            <input
              type="range"
              min={0}
              max={100}
              value={p1.y}
              onChange={(e) => setP1(prev => ({ ...prev, y: Number(e.target.value) }))}
              className="w-full accent-electric-cyan cursor-pointer"
            />
          </div>
        </div>

        {/* Point B */}
        <div className="space-y-2">
          <div className="flex items-center justify-between text-xs font-bold text-rose-400">
            <div className="flex items-center gap-1.5">
              <span className="w-3 h-3 rounded-full bg-rose-400" />
              Point B (x₂, y₂)
            </div>
            <span className="font-mono">({p2.x}, {p2.y})</span>
          </div>
          <div className="space-y-1">
            <div className="flex justify-between text-[11px] text-slate-400">
              <span>X₂ Coordinate:</span>
              <span className="font-mono">{p2.x}</span>
            </div>
            <input
              type="range"
              min={0}
              max={100}
              value={p2.x}
              onChange={(e) => setP2(prev => ({ ...prev, x: Number(e.target.value) }))}
              className="w-full accent-rose-400 cursor-pointer"
            />
          </div>
          <div className="space-y-1">
            <div className="flex justify-between text-[11px] text-slate-400">
              <span>Y₂ Coordinate:</span>
              <span className="font-mono">{p2.y}</span>
            </div>
            <input
              type="range"
              min={0}
              max={100}
              value={p2.y}
              onChange={(e) => setP2(prev => ({ ...prev, y: Number(e.target.value) }))}
              className="w-full accent-rose-400 cursor-pointer"
            />
          </div>
        </div>
      </div>

      {/* Main Grid Visualizer & Calculations */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* SVG Plane (6 Cols) */}
        <div className="lg:col-span-6 bg-navy-950/80 rounded-xl border border-border/70 p-4 space-y-2">
          <div className="flex items-center justify-between text-xs text-slate-400 pb-1">
            <span>2D Metric Space</span>
            <span className="font-mono text-slate-500 text-[11px]">
              ΔX = {dx} | ΔY = {dy}
            </span>
          </div>

          <div className="relative w-full aspect-square max-h-[340px] bg-navy-950 rounded-xl border border-border/50 overflow-hidden">
            <svg viewBox="0 0 100 100" className="w-full h-full">
              {/* Background Grid */}
              {[20, 40, 60, 80].map(v => (
                <React.Fragment key={v}>
                  <line x1={v} y1={0} x2={v} y2={100} stroke="#1e293b" strokeWidth={0.5} />
                  <line x1={0} y1={v} x2={100} y2={v} stroke="#1e293b" strokeWidth={0.5} />
                </React.Fragment>
              ))}

              {/* Manhattan Path (Right Angle Grid Steps) */}
              <polyline
                points={`${p1.x},${100 - p1.y} ${p2.x},${100 - p1.y} ${p2.x},${100 - p2.y}`}
                fill="none"
                stroke="#a855f7"
                strokeWidth={1.5}
                strokeDasharray="3,2"
              />

              {/* Euclidean Path (Direct Hypotenuse) */}
              <line
                x1={p1.x}
                y1={100 - p1.y}
                x2={p2.x}
                y2={100 - p2.y}
                stroke="#00f0ff"
                strokeWidth={2}
              />

              {/* Point A */}
              <circle cx={p1.x} cy={100 - p1.y} r={3.5} fill="#00f0ff" stroke="#ffffff" strokeWidth={1} />
              <text x={p1.x + 3} y={100 - p1.y - 3} fill="#00f0ff" fontSize={5} fontWeight="bold">A</text>

              {/* Point B */}
              <circle cx={p2.x} cy={100 - p2.y} r={3.5} fill="#f43f5e" stroke="#ffffff" strokeWidth={1} />
              <text x={p2.x + 3} y={100 - p2.y - 3} fill="#f43f5e" fontSize={5} fontWeight="bold">B</text>
            </svg>
          </div>

          <div className="flex items-center justify-around text-[11px] pt-1">
            <span className="flex items-center gap-1.5 text-cyan-300">
              <span className="w-3 h-0.5 bg-electric-cyan" /> Euclidean (Straight Hypotenuse)
            </span>
            <span className="flex items-center gap-1.5 text-purple-300">
              <span className="w-3 h-0.5 bg-purple-400 border-dashed" /> Manhattan (City-Block Stair)
            </span>
          </div>
        </div>

        {/* Dynamic Calculations (6 Cols) */}
        <div className="lg:col-span-6 space-y-3.5">
          {/* Euclidean Card */}
          <div className="p-3.5 rounded-xl border border-electric-cyan/30 bg-electric-cyan/5 space-y-1.5">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-electric-cyan">Euclidean Distance (L₂ Norm)</span>
              <span className="text-lg font-mono font-bold text-white">{euclidean.toFixed(2)}</span>
            </div>
            <p className="text-[11px] font-mono text-slate-300">
              d_E = √((x₂ - x₁)² + (y₂ - y₁)²) = √({dx}² + {dy}²) = √({(dx * dx + dy * dy).toFixed(0)})
            </p>
            <p className="text-[11px] text-slate-400">
              The straight-line ruler distance in continuous Euclidean space. Sensitive to extreme single-feature deviations.
            </p>
          </div>

          {/* Manhattan Card */}
          <div className="p-3.5 rounded-xl border border-violet-500/30 bg-violet-500/5 space-y-1.5">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-violet-300">Manhattan Distance (L₁ Norm / Taxicab)</span>
              <span className="text-lg font-mono font-bold text-white">{manhattan.toFixed(2)}</span>
            </div>
            <p className="text-[11px] font-mono text-slate-300">
              d_M = |x₂ - x₁| + |y₂ - y₁| = {dx} + {dy} = {manhattan}
            </p>
            <p className="text-[11px] text-slate-400">
              Sum of absolute differences along perpendicular coordinate axes. Often preferred in high-dimensional spaces to combat the curse of dimensionality.
            </p>
          </div>

          {/* Minkowski Card with Slider */}
          <div className="p-3.5 rounded-xl border border-amber-500/30 bg-amber-500/5 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-amber-300">Minkowski Distance (Lₚ Norm)</span>
              <span className="text-lg font-mono font-bold text-white">{minkowski.toFixed(2)}</span>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-[11px] text-slate-300 font-mono">Order p: {pParam}</span>
              <input
                type="range"
                min={1}
                max={6}
                step={1}
                value={pParam}
                onChange={(e) => setPParam(Number(e.target.value))}
                className="flex-1 accent-amber-400 cursor-pointer h-1.5"
              />
              <span className="text-[10px] text-slate-400 font-mono">
                {pParam === 1 ? '(L₁ Manhattan)' : pParam === 2 ? '(L₂ Euclidean)' : `(L_${pParam})`}
              </span>
            </div>
            <p className="text-[10px] text-slate-400">
              Generalized metric family: when p=1 it equals Manhattan; when p=2 it equals Euclidean; as p → ∞ it approaches Chebyshev: <strong>{chebyshev.toFixed(2)}</strong>.
            </p>
          </div>

          {/* Feature Scaling Callout */}
          {scaleDisparity && (
            <div className="p-3 rounded-xl border border-rose-500/40 bg-rose-500/10 flex items-start gap-2.5">
              <Scale className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
              <div className="text-[11px] text-slate-300 leading-relaxed">
                <strong className="text-rose-300">Feature Scaling Pitfall Exposed:</strong> Because Y was multiplied by 10 (range 0–1000 vs X range 0–100), the Y feature contributed <strong>{((dy / (dx + dy)) * 100).toFixed(0)}%</strong> of the total distance! X is effectively ignored. Feature scaling (StandardScaler or MinMaxScaler) is mandatory in KNN.
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

