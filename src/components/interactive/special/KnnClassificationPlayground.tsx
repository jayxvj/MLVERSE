'use client';

import React, { useState, useMemo } from 'react';
import { Target, Sliders, CheckCircle2, RotateCcw, Sparkles, Compass } from 'lucide-react';

interface Point {
  id: string;
  x: number;
  y: number;
  label: 'Class A' | 'Class B';
}

const INITIAL_POINTS: Point[] = [
  // Class A (e.g. Urban / High Income - Cyan)
  { id: 'a1', x: 22, y: 78, label: 'Class A' },
  { id: 'a2', x: 28, y: 85, label: 'Class A' },
  { id: 'a3', x: 35, y: 72, label: 'Class A' },
  { id: 'a4', x: 40, y: 65, label: 'Class A' },
  { id: 'a5', x: 48, y: 80, label: 'Class A' },
  { id: 'a6', x: 30, y: 60, label: 'Class A' },
  { id: 'a7', x: 55, y: 68, label: 'Class A' },
  { id: 'a8', x: 25, y: 50, label: 'Class A' },

  // Class B (e.g. Rural / Low Income - Rose)
  { id: 'b1', x: 65, y: 35, label: 'Class B' },
  { id: 'b2', x: 72, y: 28, label: 'Class B' },
  { id: 'b3', x: 80, y: 40, label: 'Class B' },
  { id: 'b4', x: 60, y: 22, label: 'Class B' },
  { id: 'b5', x: 85, y: 25, label: 'Class B' },
  { id: 'b6', x: 75, y: 52, label: 'Class B' },
  { id: 'b7', x: 68, y: 45, label: 'Class B' },
  { id: 'b8', x: 50, y: 30, label: 'Class B' },
];

export default function KnnClassificationPlayground() {
  const [points, setPoints] = useState<Point[]>(INITIAL_POINTS);
  const [queryPoint, setQueryPoint] = useState<{ x: number; y: number }>({ x: 52, y: 50 });
  const [k, setK] = useState<number>(3);
  const [metric, setMetric] = useState<'euclidean' | 'manhattan'>('euclidean');
  const [addMode, setAddMode] = useState<'query' | 'classA' | 'classB'>('query');

  // Compute distances to all points
  const neighbors = useMemo(() => {
    return points
      .map(pt => {
        const dx = pt.x - queryPoint.x;
        const dy = pt.y - queryPoint.y;
        const dist = metric === 'euclidean'
          ? Math.sqrt(dx * dx + dy * dy)
          : Math.abs(dx) + Math.abs(dy);
        return { ...pt, dist };
      })
      .sort((a, b) => a.dist - b.dist);
  }, [points, queryPoint, metric]);

  const nearestK = useMemo(() => neighbors.slice(0, k), [neighbors, k]);

  const votesA = nearestK.filter(n => n.label === 'Class A').length;
  const votesB = nearestK.filter(n => n.label === 'Class B').length;
  const predictedLabel: 'Class A' | 'Class B' | 'Tie' =
    votesA > votesB ? 'Class A' : votesB > votesA ? 'Class B' : 'Tie';

  const maxRadius = nearestK.length > 0 ? nearestK[nearestK.length - 1].dist : 0;

  const handleSvgClick = (e: React.MouseEvent<SVGSVGElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = Math.round(((e.clientX - rect.left) / rect.width) * 100);
    const y = Math.round((1 - (e.clientY - rect.top) / rect.height) * 100);

    if (addMode === 'query') {
      setQueryPoint({ x, y });
    } else {
      const newPt: Point = {
        id: `p-${Date.now()}`,
        x,
        y,
        label: addMode === 'classA' ? 'Class A' : 'Class B',
      };
      setPoints(prev => [...prev, newPt]);
    }
  };

  const resetPoints = () => {
    setPoints(INITIAL_POINTS);
    setQueryPoint({ x: 52, y: 50 });
    setK(3);
  };

  return (
    <div className="rounded-2xl border border-border/80 bg-navy-900/60 p-6 backdrop-blur-md shadow-2xl space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-border/50 pb-5">
        <div className="flex items-center gap-3">
          <span className="p-2 rounded-lg bg-electric-cyan/10 border border-electric-cyan/30 text-electric-cyan">
            <Target className="w-5 h-5" />
          </span>
          <div>
            <h3 className="text-xl font-bold text-white">KNN 2D Classification Playground</h3>
            <p className="text-xs text-slate-400 mt-0.5">Click anywhere on the coordinate canvas to move the query point and observe neighbor voting</p>
          </div>
        </div>

        <button
          onClick={resetPoints}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-border/60 bg-navy-950/60 text-xs font-semibold text-slate-300 hover:text-white"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          Reset Points
        </button>
      </div>

      {/* Controls Bar */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3 bg-navy-950/70 p-3.5 rounded-xl border border-border/60">
        {/* K Slider */}
        <div className="space-y-1.5">
          <div className="flex justify-between items-center text-xs">
            <span className="text-slate-300 font-semibold flex items-center gap-1.5">
              <Sliders className="w-3.5 h-3.5 text-electric-cyan" />
              Number of Neighbors K:
            </span>
            <span className="font-mono font-bold text-electric-cyan text-sm">K = {k}</span>
          </div>
          <input
            type="range"
            min={1}
            max={Math.min(15, points.length)}
            step={1}
            value={k}
            onChange={(e) => setK(Number(e.target.value))}
            className="w-full accent-electric-cyan cursor-pointer"
          />
          <div className="flex justify-between text-[10px] text-slate-500 font-mono">
            <span>K=1 (High Variance)</span>
            <span>{k % 2 === 0 ? '⚠️ Even K (risk of ties)' : '✓ Odd K (optimal)'}</span>
            <span>K=15 (High Bias)</span>
          </div>
        </div>

        {/* Distance Metric */}
        <div className="space-y-1.5">
          <span className="text-xs text-slate-300 font-semibold flex items-center gap-1.5">
            <Compass className="w-3.5 h-3.5 text-violet-400" />
            Distance Metric:
          </span>
          <div className="grid grid-cols-2 gap-2">
            <button
              onClick={() => setMetric('euclidean')}
              className={`px-2.5 py-1.5 rounded-lg text-xs font-semibold border transition-all ${
                metric === 'euclidean'
                  ? 'bg-electric-cyan/20 border-electric-cyan/60 text-white'
                  : 'border-border/50 text-slate-400 hover:text-white'
              }`}
            >
              Euclidean (L2)
            </button>
            <button
              onClick={() => setMetric('manhattan')}
              className={`px-2.5 py-1.5 rounded-lg text-xs font-semibold border transition-all ${
                metric === 'manhattan'
                  ? 'bg-violet-500/20 border-violet-500/60 text-white'
                  : 'border-border/50 text-slate-400 hover:text-white'
              }`}
            >
              Manhattan (L1)
            </button>
          </div>
        </div>

        {/* Click Mode */}
        <div className="space-y-1.5">
          <span className="text-xs text-slate-300 font-semibold">Click Canvas Mode:</span>
          <div className="grid grid-cols-3 gap-1.5">
            <button
              onClick={() => setAddMode('query')}
              className={`px-2 py-1.5 rounded-lg text-[11px] font-semibold border transition-all truncate ${
                addMode === 'query'
                  ? 'bg-amber-500/20 border-amber-500/60 text-amber-300'
                  : 'border-border/50 text-slate-400 hover:text-white'
              }`}
            >
              Move Query
            </button>
            <button
              onClick={() => setAddMode('classA')}
              className={`px-2 py-1.5 rounded-lg text-[11px] font-semibold border transition-all truncate ${
                addMode === 'classA'
                  ? 'bg-electric-cyan/20 border-electric-cyan/60 text-cyan-300'
                  : 'border-border/50 text-slate-400 hover:text-white'
              }`}
            >
              + Class A
            </button>
            <button
              onClick={() => setAddMode('classB')}
              className={`px-2 py-1.5 rounded-lg text-[11px] font-semibold border transition-all truncate ${
                addMode === 'classB'
                  ? 'bg-rose-500/20 border-rose-500/60 text-rose-300'
                  : 'border-border/50 text-slate-400 hover:text-white'
              }`}
            >
              + Class B
            </button>
          </div>
        </div>
      </div>

      {/* Main Interactive Stage */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* 2D Canvas (7 Cols) */}
        <div className="lg:col-span-7 bg-navy-950/80 rounded-xl border border-border/70 p-4 space-y-2">
          <div className="flex items-center justify-between text-xs text-slate-400 pb-1">
            <span>2D Feature Space (Feature X1 vs Feature X2)</span>
            <span className="font-mono text-electric-cyan text-[11px]">
              Query: ({queryPoint.x}, {queryPoint.y})
            </span>
          </div>

          <div className="relative w-full aspect-square max-h-[380px] bg-navy-950 rounded-xl border border-border/50 overflow-hidden cursor-crosshair">
            <svg
              viewBox="0 0 100 100"
              className="w-full h-full"
              onClick={handleSvgClick}
            >
              {/* Grid Lines */}
              {[20, 40, 60, 80].map(v => (
                <React.Fragment key={v}>
                  <line x1={v} y1={0} x2={v} y2={100} stroke="#1e293b" strokeWidth={0.5} strokeDasharray="2,2" />
                  <line x1={0} y1={v} x2={100} y2={v} stroke="#1e293b" strokeWidth={0.5} strokeDasharray="2,2" />
                </React.Fragment>
              ))}

              {/* Radius Circle for Euclidean */}
              {metric === 'euclidean' && nearestK.length > 0 && (
                <circle
                  cx={queryPoint.x}
                  cy={100 - queryPoint.y}
                  r={maxRadius}
                  fill="rgba(0, 240, 255, 0.04)"
                  stroke="#00f0ff"
                  strokeWidth={0.6}
                  strokeDasharray="2,2"
                />
              )}

              {/* Connecting Lines to K Nearest */}
              {nearestK.map(neighbor => (
                <line
                  key={`line-${neighbor.id}`}
                  x1={queryPoint.x}
                  y1={100 - queryPoint.y}
                  x2={neighbor.x}
                  y2={100 - neighbor.y}
                  stroke={neighbor.label === 'Class A' ? '#00f0ff' : '#f43f5e'}
                  strokeWidth={1}
                  strokeOpacity={0.7}
                />
              ))}

              {/* Points */}
              {points.map(pt => {
                const isSelectedNeighbor = nearestK.some(n => n.id === pt.id);
                return (
                  <circle
                    key={pt.id}
                    cx={pt.x}
                    cy={100 - pt.y}
                    r={isSelectedNeighbor ? 3 : 2}
                    fill={pt.label === 'Class A' ? '#00f0ff' : '#f43f5e'}
                    stroke={isSelectedNeighbor ? '#ffffff' : '#070b19'}
                    strokeWidth={isSelectedNeighbor ? 1 : 0.5}
                    className="transition-all duration-300"
                  />
                );
              })}

              {/* Query Point */}
              <circle
                cx={queryPoint.x}
                cy={100 - queryPoint.y}
                r={3.8}
                fill="#f59e0b"
                stroke="#ffffff"
                strokeWidth={1.5}
                className="animate-pulse"
              />
            </svg>
          </div>

          {/* Canvas Legend */}
          <div className="flex items-center justify-between text-[11px] text-slate-400 pt-1">
            <div className="flex items-center gap-3">
              <span className="flex items-center gap-1">
                <span className="w-2.5 h-2.5 rounded-full bg-electric-cyan" /> Class A ({votesA} votes)
              </span>
              <span className="flex items-center gap-1">
                <span className="w-2.5 h-2.5 rounded-full bg-rose-500" /> Class B ({votesB} votes)
              </span>
              <span className="flex items-center gap-1">
                <span className="w-2.5 h-2.5 rounded-full bg-amber-400" /> Query Target
              </span>
            </div>
            <span className="text-[10px] text-slate-500">Total Samples: {points.length}</span>
          </div>
        </div>

        {/* Voting & Diagnostics Panel (5 Cols) */}
        <div className="lg:col-span-5 space-y-4">
          {/* Prediction Result Card */}
          <div className={`p-4 rounded-xl border ${
            predictedLabel === 'Class A'
              ? 'bg-cyan-500/10 border-cyan-500/30'
              : predictedLabel === 'Class B'
              ? 'bg-rose-500/10 border-rose-500/30'
              : 'bg-amber-500/10 border-amber-500/30'
          } space-y-2`}>
            <div className="text-[11px] font-mono uppercase tracking-wider text-slate-400">
              KNN Decision Output
            </div>
            <div className="flex items-center justify-between">
              <div className="text-xl font-bold" style={{
                color: predictedLabel === 'Class A' ? '#00f0ff' : predictedLabel === 'Class B' ? '#f43f5e' : '#f59e0b'
              }}>
                Predicted: {predictedLabel}
              </div>
              <span className="text-xs font-mono font-bold px-2.5 py-1 rounded-full bg-navy-950/80 border border-border">
                {votesA} vs {votesB}
              </span>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              Based on the <strong>{k}</strong> closest training observations using <strong>{metric}</strong> distance.
            </p>
          </div>

          {/* Voting Breakdown Bar */}
          <div className="space-y-1.5 bg-navy-950/60 p-3.5 rounded-xl border border-border/50">
            <div className="flex justify-between text-xs text-slate-300">
              <span>Majority Vote Distribution:</span>
              <span className="font-mono text-[11px] text-slate-400">
                A: {((votesA / k) * 100).toFixed(0)}% | B: {((votesB / k) * 100).toFixed(0)}%
              </span>
            </div>
            <div className="w-full h-3 bg-slate-800 rounded-full overflow-hidden flex">
              <div
                style={{ width: `${(votesA / k) * 100}%` }}
                className="h-full bg-electric-cyan transition-all duration-300"
              />
              <div
                style={{ width: `${(votesB / k) * 100}%` }}
                className="h-full bg-rose-500 transition-all duration-300"
              />
            </div>
          </div>

          {/* Neighbors Table */}
          <div className="space-y-2">
            <span className="text-[11px] font-mono uppercase tracking-wider text-slate-400">
              {k} Nearest Neighbors Table:
            </span>
            <div className="overflow-x-auto rounded-xl border border-border/50 max-h-44 overflow-y-auto">
              <table className="w-full text-[11px] text-slate-300">
                <thead className="bg-navy-950 text-slate-500 font-mono sticky top-0">
                  <tr className="border-b border-border/50">
                    <th className="px-2.5 py-1.5 text-left">Rank</th>
                    <th className="px-2.5 py-1.5 text-left">Class</th>
                    <th className="px-2.5 py-1.5 text-left">Coords</th>
                    <th className="px-2.5 py-1.5 text-right">Distance</th>
                  </tr>
                </thead>
                <tbody>
                  {nearestK.map((n, idx) => (
                    <tr key={n.id} className="border-b border-border/20 bg-navy-900/40">
                      <td className="px-2.5 py-1 font-mono text-slate-500">#{idx + 1}</td>
                      <td className="px-2.5 py-1 font-bold" style={{ color: n.label === 'Class A' ? '#00f0ff' : '#f43f5e' }}>
                        {n.label}
                      </td>
                      <td className="px-2.5 py-1 font-mono text-slate-400">({n.x}, {n.y})</td>
                      <td className="px-2.5 py-1 font-mono text-right text-amber-300">{n.dist.toFixed(2)}</td>
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

