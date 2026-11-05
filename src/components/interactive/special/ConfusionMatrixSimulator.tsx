'use client';
import React, { useState, useCallback } from 'react';

type Label = 'Positive' | 'Negative';

interface DataPoint {
  id: number;
  actual: Label;
  predicted: Label;
  label: string;
}

const INITIAL_POINTS: DataPoint[] = [
  { id: 1,  actual: 'Positive', predicted: 'Positive', label: '🐱 Cat' },
  { id: 2,  actual: 'Positive', predicted: 'Positive', label: '🐱 Cat' },
  { id: 3,  actual: 'Positive', predicted: 'Negative', label: '🐱 Cat' },
  { id: 4,  actual: 'Positive', predicted: 'Positive', label: '🐱 Cat' },
  { id: 5,  actual: 'Positive', predicted: 'Negative', label: '🐱 Cat' },
  { id: 6,  actual: 'Positive', predicted: 'Positive', label: '🐱 Cat' },
  { id: 7,  actual: 'Positive', predicted: 'Positive', label: '🐱 Cat' },
  { id: 8,  actual: 'Positive', predicted: 'Positive', label: '🐱 Cat' },
  { id: 9,  actual: 'Negative', predicted: 'Negative', label: '🐶 Dog' },
  { id: 10, actual: 'Negative', predicted: 'Negative', label: '🐶 Dog' },
  { id: 11, actual: 'Negative', predicted: 'Positive', label: '🐶 Dog' },
  { id: 12, actual: 'Negative', predicted: 'Negative', label: '🐶 Dog' },
  { id: 13, actual: 'Negative', predicted: 'Negative', label: '🐶 Dog' },
  { id: 14, actual: 'Negative', predicted: 'Negative', label: '🐶 Dog' },
  { id: 15, actual: 'Negative', predicted: 'Positive', label: '🐶 Dog' },
  { id: 16, actual: 'Negative', predicted: 'Negative', label: '🐶 Dog' },
];

function getCellColor(actual: Label, predicted: Label) {
  if (actual === 'Positive' && predicted === 'Positive') return 'bg-emerald-500/20 border-emerald-500/50 text-emerald-300';
  if (actual === 'Negative' && predicted === 'Negative') return 'bg-blue-500/20 border-blue-500/50 text-blue-300';
  if (actual === 'Negative' && predicted === 'Positive') return 'bg-rose-500/20 border-rose-500/50 text-rose-300';
  return 'bg-amber-500/20 border-amber-500/50 text-amber-300';
}

function getCellLabel(actual: Label, predicted: Label) {
  if (actual === 'Positive' && predicted === 'Positive') return 'TP';
  if (actual === 'Negative' && predicted === 'Negative') return 'TN';
  if (actual === 'Negative' && predicted === 'Positive') return 'FP';
  return 'FN';
}

export default function ConfusionMatrixSimulator() {
  const [points, setPoints] = useState<DataPoint[]>(INITIAL_POINTS);

  const toggle = useCallback((id: number) => {
    setPoints(prev => prev.map(p =>
      p.id === id ? { ...p, predicted: p.predicted === 'Positive' ? 'Negative' : 'Positive' } : p
    ));
  }, []);

  const reset = () => setPoints(INITIAL_POINTS);

  const tp = points.filter(p => p.actual === 'Positive' && p.predicted === 'Positive').length;
  const tn = points.filter(p => p.actual === 'Negative' && p.predicted === 'Negative').length;
  const fp = points.filter(p => p.actual === 'Negative' && p.predicted === 'Positive').length;
  const fn = points.filter(p => p.actual === 'Positive' && p.predicted === 'Negative').length;
  const total = points.length;

  return (
    <div className="rounded-xl border border-white/10 bg-navy-950/70 p-5 space-y-5">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-sm font-bold text-white">Confusion Matrix Simulator</h3>
          <p className="text-xs text-slate-400 mt-0.5">Click any animal card to flip its prediction. Watch the matrix update live.</p>
        </div>
        <button onClick={reset} className="text-xs px-3 py-1.5 rounded-lg border border-white/10 text-slate-400 hover:text-white hover:border-white/30 transition-colors">
          Reset
        </button>
      </div>

      {/* Data Points Grid */}
      <div className="grid grid-cols-4 sm:grid-cols-8 gap-2">
        {points.map(p => {
          const color = getCellColor(p.actual, p.predicted);
          const cellLabel = getCellLabel(p.actual, p.predicted);
          return (
            <button
              key={p.id}
              onClick={() => toggle(p.id)}
              title={`Actual: ${p.actual} | Predicted: ${p.predicted} — Click to flip prediction`}
              className={`rounded-lg border p-2 text-center cursor-pointer transition-all hover:scale-105 ${color}`}
            >
              <div className="text-lg">{p.label.split(' ')[0]}</div>
              <div className="text-[10px] font-mono font-bold mt-0.5">{cellLabel}</div>
            </button>
          );
        })}
      </div>

      {/* Legend */}
      <div className="flex flex-wrap gap-3 text-xs">
        {[
          { label: 'TP — True Positive', color: 'text-emerald-300' },
          { label: 'TN — True Negative', color: 'text-blue-300' },
          { label: 'FP — False Positive', color: 'text-rose-300' },
          { label: 'FN — False Negative', color: 'text-amber-300' },
        ].map(item => (
          <span key={item.label} className={`font-mono ${item.color}`}>{item.label}</span>
        ))}
      </div>

      {/* 2×2 Matrix */}
      <div>
        <p className="text-xs font-mono text-slate-400 mb-2">CONFUSION MATRIX — {total} samples (Cat = Positive, Dog = Negative)</p>
        <div className="grid grid-cols-3 gap-1 max-w-sm">
          <div />
          <div className="text-center text-xs font-mono text-slate-400 py-1">Pred: Cat</div>
          <div className="text-center text-xs font-mono text-slate-400 py-1">Pred: Dog</div>
          <div className="flex items-center text-xs font-mono text-slate-400">Act: Cat</div>
          <div className="rounded-lg bg-emerald-500/20 border border-emerald-500/40 p-3 text-center">
            <div className="text-xl font-bold text-emerald-300">{tp}</div>
            <div className="text-[10px] text-emerald-400 font-mono">TP</div>
          </div>
          <div className="rounded-lg bg-amber-500/20 border border-amber-500/40 p-3 text-center">
            <div className="text-xl font-bold text-amber-300">{fn}</div>
            <div className="text-[10px] text-amber-400 font-mono">FN</div>
          </div>
          <div className="flex items-center text-xs font-mono text-slate-400">Act: Dog</div>
          <div className="rounded-lg bg-rose-500/20 border border-rose-500/40 p-3 text-center">
            <div className="text-xl font-bold text-rose-300">{fp}</div>
            <div className="text-[10px] text-rose-400 font-mono">FP</div>
          </div>
          <div className="rounded-lg bg-blue-500/20 border border-blue-500/40 p-3 text-center">
            <div className="text-xl font-bold text-blue-300">{tn}</div>
            <div className="text-[10px] text-blue-400 font-mono">TN</div>
          </div>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {[
          { label: 'True Positive', value: tp, color: 'text-emerald-300', desc: 'Correctly predicted Cat' },
          { label: 'True Negative', value: tn, color: 'text-blue-300', desc: 'Correctly predicted Dog' },
          { label: 'False Positive', value: fp, color: 'text-rose-300', desc: 'Dog predicted as Cat' },
          { label: 'False Negative', value: fn, color: 'text-amber-300', desc: 'Cat predicted as Dog' },
        ].map(stat => (
          <div key={stat.label} className="rounded-lg bg-navy-900/60 border border-white/5 p-3">
            <div className={`text-2xl font-bold font-mono ${stat.color}`}>{stat.value}</div>
            <div className="text-xs font-semibold text-white mt-0.5">{stat.label}</div>
            <div className="text-[10px] text-slate-500 mt-0.5">{stat.desc}</div>
          </div>
        ))}
      </div>

      <p className="text-[11px] text-slate-500 font-mono">
        Accuracy: {((tp + tn) / total * 100).toFixed(1)}% | Total: {total} samples
      </p>
    </div>
  );
}

