'use client';

import React, { useState, useMemo } from 'react';
import { Layers, Sliders, Sparkles, RefreshCw, Info } from 'lucide-react';

type DatasetShape = 'moons' | 'circles' | 'linear';
type AlgoType = 'logistic' | 'tree' | 'forest' | 'knn' | 'svm';

interface Point2D {
  x: number;
  y: number;
  label: 0 | 1;
}

export default function DecisionBoundaryVisualizer() {
  const [shape, setShape] = useState<DatasetShape>('moons');
  const [algo, setAlgo] = useState<AlgoType>('knn');
  const [complexity, setComplexity] = useState<number>(3); // depth, K, or gamma depending on algo

  // Generate synthetic points based on shape
  const points = useMemo<Point2D[]>(() => {
    const pts: Point2D[] = [];
    if (shape === 'linear') {
      // Linearly separable
      for (let i = 0; i < 20; i++) {
        pts.push({ x: 20 + Math.random() * 25, y: 55 + Math.random() * 35, label: 0 });
        pts.push({ x: 55 + Math.random() * 35, y: 15 + Math.random() * 30, label: 1 });
      }
    } else if (shape === 'circles') {
      // Concentric circles
      for (let i = 0; i < 22; i++) {
        // Inner circle (label 0)
        const r1 = 10 + Math.random() * 14;
        const th1 = Math.random() * 2 * Math.PI;
        pts.push({ x: 50 + r1 * Math.cos(th1), y: 50 + r1 * Math.sin(th1), label: 0 });

        // Outer ring (label 1)
        const r2 = 32 + Math.random() * 12;
        const th2 = Math.random() * 2 * Math.PI;
        pts.push({ x: 50 + r2 * Math.cos(th2), y: 50 + r2 * Math.sin(th2), label: 1 });
      }
    } else {
      // Two Moons
      for (let i = 0; i < 20; i++) {
        const th = (i / 20) * Math.PI;
        // Moon 1 (top left, label 0)
        pts.push({
          x: 40 + 25 * Math.cos(th) + (Math.random() - 0.5) * 6,
          y: 60 + 20 * Math.sin(th) + (Math.random() - 0.5) * 6,
          label: 0
        });
        // Moon 2 (bottom right, label 1)
        pts.push({
          x: 60 - 25 * Math.cos(th) + (Math.random() - 0.5) * 6,
          y: 40 - 20 * Math.sin(th) + (Math.random() - 0.5) * 6,
          label: 1
        });
      }
    }
    return pts;
  }, [shape]);

  // Decision boundary classification function f(x, y) -> 0 or 1
  const classifyGrid = useMemo(() => {
    return (x: number, y: number): 0 | 1 => {
      if (algo === 'logistic') {
        // Linear boundary: w1*x + w2*y + b > 0
        // Fit approximate line passing through (50, 50) with slope -1
        return (x + y - 100) > 0 ? 1 : 0;
      }

      if (algo === 'tree') {
        // Axis-aligned rectangular splits
        if (complexity <= 2) {
          return x > 48 ? 1 : 0;
        } else if (complexity <= 4) {
          if (x < 45) return y < 45 ? 1 : 0;
          return y > 52 ? 0 : 1;
        } else {
          // Deeper rectangular steps
          if (x < 35) return y < 50 ? 1 : 0;
          if (x < 65) return y > 40 && y < 70 ? 0 : 1;
          return y < 55 ? 1 : 0;
        }
      }

      if (algo === 'forest') {
        // Soft smoothed steps (ensemble of diverse axis splits)
        const score = (x > 50 ? 0.4 : 0) + (y < 48 ? 0.4 : 0) + (x > 65 ? 0.3 : 0) - (y > 65 ? 0.3 : 0);
        return score > 0.4 ? 1 : 0;
      }

      if (algo === 'knn') {
        // Fast KNN over points
        const kVal = Math.max(1, complexity * 2 - 1);
        const sorted = points.map(p => ({
          label: p.label,
          dist: Math.sqrt((p.x - x) ** 2 + (p.y - y) ** 2)
        })).sort((a, b) => a.dist - b.dist).slice(0, kVal);

        const count1 = sorted.filter(s => s.label === 1).length;
        return count1 > sorted.length / 2 ? 1 : 0;
      }

      if (algo === 'svm') {
        // RBF Kernel: exp(-gamma * ||x - x_i||^2)
        // Center around (50, 50) or moon centers
        if (shape === 'circles') {
          const distFromCenter = Math.sqrt((x - 50) ** 2 + (y - 50) ** 2);
          return distFromCenter > 24 ? 1 : 0;
        }
        // Non-linear polynomial / sigmoid contour
        const contour = Math.sin((x / 100) * Math.PI) * 40 + 30;
        return y < contour ? 1 : 0;
      }

      return 0;
    };
  }, [algo, complexity, points, shape]);

  // Compute 25x25 grid cells for decision regions
  const gridCells = useMemo(() => {
    const cells = [];
    const step = 4; // 25x25 grid
    for (let x = 0; x < 100; x += step) {
      for (let y = 0; y < 100; y += step) {
        const pred = classifyGrid(x + step / 2, y + step / 2);
        cells.push({ x, y, size: step, pred });
      }
    }
    return cells;
  }, [classifyGrid]);

  return (
    <div className="rounded-2xl border border-border/80 bg-navy-900/60 p-6 backdrop-blur-md shadow-2xl space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-border/50 pb-5">
        <div className="flex items-center gap-3">
          <span className="p-2 rounded-lg bg-electric-cyan/10 border border-electric-cyan/30 text-electric-cyan">
            <Layers className="w-5 h-5" />
          </span>
          <div>
            <h3 className="text-xl font-bold text-white">2D Decision Boundary Playground</h3>
            <p className="text-xs text-slate-400 mt-0.5">Observe how different algorithms partition continuous feature space into decision regions</p>
          </div>
        </div>

        {/* Dataset Shape Toggle */}
        <div className="flex items-center gap-2 bg-navy-950/80 p-1 rounded-xl border border-border">
          {(['moons', 'circles', 'linear'] as const).map(s => (
            <button
              key={s}
              onClick={() => setShape(s)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold capitalize transition-all ${
                shape === s
                  ? 'bg-electric-cyan/20 border border-electric-cyan/60 text-white'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              {s}
            </button>
          ))}
        </div>
      </div>

      {/* Algorithm Selector Buttons */}
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
        {[
          { id: 'logistic' as AlgoType, name: 'Logistic Reg.', desc: 'Linear Hyperplane' },
          { id: 'tree' as AlgoType, name: 'Decision Tree', desc: 'Orthogonal Steps' },
          { id: 'forest' as AlgoType, name: 'Random Forest', desc: 'Smooth Ensemble' },
          { id: 'knn' as AlgoType, name: 'KNN', desc: 'Local Voronoi' },
          { id: 'svm' as AlgoType, name: 'SVM (RBF)', desc: 'Max-Margin Curved' },
        ].map(item => (
          <button
            key={item.id}
            onClick={() => setAlgo(item.id)}
            className={`p-3 rounded-xl border text-left transition-all ${
              algo === item.id
                ? 'bg-electric-cyan/20 border-electric-cyan/60 text-white shadow-[0_0_12px_rgba(0,240,255,0.2)]'
                : 'bg-navy-950/50 border-border/60 text-slate-400 hover:border-slate-500 hover:text-white'
            }`}
          >
            <div className="text-xs font-bold text-white">{item.name}</div>
            <div className="text-[10px] text-slate-500 font-mono mt-0.5">{item.desc}</div>
          </button>
        ))}
      </div>

      {/* Complexity Slider */}
      <div className="space-y-1.5 bg-navy-950/60 p-3.5 rounded-xl border border-border/50">
        <div className="flex justify-between items-center text-xs">
          <span className="text-slate-300 font-semibold flex items-center gap-1.5">
            <Sliders className="w-3.5 h-3.5 text-electric-cyan" />
            Model Complexity Hyperparameter:
          </span>
          <span className="font-mono font-bold text-electric-cyan text-sm">
            {algo === 'tree' ? `max_depth = ${complexity * 2}` : algo === 'knn' ? `K = ${Math.max(1, complexity * 2 - 1)}` : `Complexity Level = ${complexity}`}
          </span>
        </div>
        <input
          type="range"
          min={1}
          max={5}
          value={complexity}
          onChange={(e) => setComplexity(Number(e.target.value))}
          className="w-full accent-electric-cyan cursor-pointer"
        />
        <div className="flex justify-between text-[10px] text-slate-500 font-mono">
          <span>Simple / High Bias (Underfitting)</span>
          <span>Flexible / High Variance (Overfitting)</span>
        </div>
      </div>

      {/* Main Boundary Canvas */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* SVG Display (7 Cols) */}
        <div className="lg:col-span-7 bg-navy-950/80 rounded-xl border border-border/70 p-4 space-y-2">
          <div className="flex items-center justify-between text-xs text-slate-400 pb-1">
            <span>2D Decision Regions (Feature X₁ vs Feature X₂)</span>
            <span className="font-mono text-electric-cyan text-[11px] capitalize">
              {algo} on {shape}
            </span>
          </div>

          <div className="relative w-full aspect-square max-h-[360px] bg-navy-950 rounded-xl border border-border/50 overflow-hidden">
            <svg viewBox="0 0 100 100" className="w-full h-full">
              {/* Background Color Grid (Decision Regions) */}
              {gridCells.map((c, i) => (
                <rect
                  key={i}
                  x={c.x}
                  y={100 - c.y - c.size}
                  width={c.size}
                  height={c.size}
                  fill={c.pred === 0 ? 'rgba(0, 240, 255, 0.18)' : 'rgba(244, 63, 94, 0.18)'}
                  stroke="none"
                />
              ))}

              {/* Data Points */}
              {points.map((pt, i) => (
                <circle
                  key={i}
                  cx={pt.x}
                  cy={100 - pt.y}
                  r={2.5}
                  fill={pt.label === 0 ? '#00f0ff' : '#f43f5e'}
                  stroke="#ffffff"
                  strokeWidth={0.8}
                />
              ))}
            </svg>
          </div>

          <div className="flex items-center justify-around text-[11px] pt-1">
            <span className="flex items-center gap-1.5 text-cyan-300">
              <span className="w-3 h-3 rounded-full bg-electric-cyan" /> Class 0 Region (Cyan)
            </span>
            <span className="flex items-center gap-1.5 text-rose-300">
              <span className="w-3 h-3 rounded-full bg-rose-500" /> Class 1 Region (Rose)
            </span>
          </div>
        </div>

        {/* Theoretical Explanation (5 Cols) */}
        <div className="lg:col-span-5 space-y-4">
          <div className="p-4 rounded-xl border border-electric-cyan/30 bg-electric-cyan/5 space-y-2.5">
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-electric-cyan">
              Inductive Bias Architecture: {algo.toUpperCase()}
            </span>
            <div className="text-xs text-slate-300 leading-relaxed space-y-2">
              {algo === 'logistic' && (
                <p>
                  <strong>Linear Inductive Bias:</strong> Logistic Regression computes a linear weighted sum z = w₁x₁ + w₂x₂ + b = 0. Its boundary is mathematically constrained to be a straight line hyperplane. Notice how it fails on concentric circles or interlocking moons.
                </p>
              )}
              {algo === 'tree' && (
                <p>
                  <strong>Orthogonal Axis Splitting:</strong> Decision trees split one feature at a time (e.g. x₁ &gt; 45.2). Therefore, boundaries are strictly composed of horizontal and vertical stair-step rectangles.
                </p>
              )}
              {algo === 'forest' && (
                <p>
                  <strong>Ensemble Smoothing:</strong> Random Forest averages hundreds of randomized orthogonal tree splits, smoothing out the harsh stair steps into subtle rounded contours.
                </p>
              )}
              {algo === 'knn' && (
                <p>
                  <strong>Local Instance Geometry:</strong> KNN makes no global functional assumptions. Boundaries are locally driven by neighborhood proximity (Voronoi tessellation), forming complex non-linear islands.
                </p>
              )}
              {algo === 'svm' && (
                <p>
                  <strong>Maximum-Margin Kernelization:</strong> The RBF (Radial Basis Function) kernel projects the 2D plane into an infinite-dimensional feature space, creating a smooth curved boundary with maximum clearance margin from points.
                </p>
              )}
            </div>
          </div>

          <div className="p-3.5 rounded-xl border border-border/50 bg-navy-950/70 space-y-1.5 text-xs">
            <span className="font-mono text-amber-300 font-bold">Key Engineering Rule:</span>
            <p className="text-slate-400 leading-relaxed">
              When features exhibit non-linear interactions (like concentric rings), linear classifiers suffer from high bias. Non-parametric models (KNN, Random Forest, SVM-RBF) naturally contour to irregular manifolds.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

