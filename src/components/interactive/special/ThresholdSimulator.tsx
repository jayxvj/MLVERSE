'use client';
import React, { useState, useMemo } from 'react';

// 20 fraud detection samples: [score, actualLabel]  1=fraud, 0=legit
const SAMPLES: Array<{ score: number; actual: 1 | 0; id: number }> = [
  { id: 1,  score: 0.92, actual: 1 },
  { id: 2,  score: 0.85, actual: 1 },
  { id: 3,  score: 0.78, actual: 1 },
  { id: 4,  score: 0.71, actual: 0 },
  { id: 5,  score: 0.68, actual: 1 },
  { id: 6,  score: 0.61, actual: 0 },
  { id: 7,  score: 0.58, actual: 1 },
  { id: 8,  score: 0.55, actual: 0 },
  { id: 9,  score: 0.49, actual: 0 },
  { id: 10, score: 0.45, actual: 1 },
  { id: 11, score: 0.42, actual: 0 },
  { id: 12, score: 0.39, actual: 0 },
  { id: 13, score: 0.35, actual: 1 },
  { id: 14, score: 0.31, actual: 0 },
  { id: 15, score: 0.28, actual: 0 },
  { id: 16, score: 0.22, actual: 0 },
  { id: 17, score: 0.19, actual: 0 },
  { id: 18, score: 0.15, actual: 0 },
  { id: 19, score: 0.11, actual: 1 },
  { id: 20, score: 0.07, actual: 0 },
];

function safeDiv(n: number, d: number) { return d === 0 ? null : n / d; }
function fmt(v: number | null) { return v === null ? 'N/A' : (v * 100).toFixed(1) + '%'; }

export default function ThresholdSimulator() {
  const [threshold, setThreshold] = useState(0.5);

  const { tp, tn, fp, fn, classified } = useMemo(() => {
    let tp = 0, tn = 0, fp = 0, fn = 0;
    const classified = SAMPLES.map(s => {
      const predicted = s.score >= threshold ? 1 : 0;
      if (predicted === 1 && s.actual === 1) tp++;
      else if (predicted === 0 && s.actual === 0) tn++;
      else if (predicted === 1 && s.actual === 0) fp++;
      else fn++;
      return { ...s, predicted };
    });
    return { tp, tn, fp, fn, classified };
  }, [threshold]);

  const precision = safeDiv(tp, tp + fp);
  const recall    = safeDiv(tp, tp + fn);
  const accuracy  = safeDiv(tp + tn, SAMPLES.length);
  const f1 = (precision !== null && recall !== null && precision + recall > 0)
    ? (2 * precision * recall) / (precision + recall)
    : null;

  return (
    <div className="rounded-xl border border-white/10 bg-navy-950/70 p-5 space-y-5">
      <div>
        <h3 className="text-sm font-bold text-white">Threshold Simulator</h3>
        <p className="text-xs text-slate-400 mt-0.5">
          Drag the threshold slider. Samples above it → predicted Fraud. Watch precision vs recall trade-off.
        </p>
      </div>

      {/* Slider */}
      <div className="space-y-2">
        <div className="flex items-center justify-between text-xs font-mono">
          <span className="text-slate-400">Threshold</span>
          <span className="text-cyan-300 font-bold text-base">{threshold.toFixed(2)}</span>
        </div>
        <input
          type="range" min={0.05} max={0.95} step={0.01}
          value={threshold}
          onChange={e => setThreshold(parseFloat(e.target.value))}
          className="w-full accent-cyan-400"
        />
        <div className="flex justify-between text-[10px] text-slate-500 font-mono">
          <span>0.05 (aggressive)</span>
          <span>0.95 (conservative)</span>
        </div>
      </div>

      {/* Score bar visualization */}
      <div className="space-y-1">
        <p className="text-[10px] font-mono text-slate-400 uppercase tracking-wider">Fraud Score Distribution</p>
        <div className="relative h-10 rounded-lg overflow-hidden bg-navy-900 border border-white/5">
          {classified.map(s => {
            const left = `${s.score * 100}%`;
            const isFraud = s.actual === 1;
            const correct = s.predicted === s.actual;
            return (
              <div
                key={s.id}
                className="absolute top-1/2 -translate-y-1/2 w-3 h-3 rounded-full border-2 transition-all duration-150"
                style={{ left, marginLeft: '-6px' }}
                title={`Score: ${s.score} | Actual: ${s.actual === 1 ? 'Fraud' : 'Legit'} | Predicted: ${s.predicted === 1 ? 'Fraud' : 'Legit'}`}
              >
                <div className={`w-full h-full rounded-full ${
                  isFraud && correct ? 'bg-emerald-400' :
                  !isFraud && correct ? 'bg-blue-400' :
                  isFraud && !correct ? 'bg-amber-400' : 'bg-rose-400'
                }`} />
              </div>
            );
          })}
          {/* Threshold line */}
          <div
            className="absolute top-0 bottom-0 w-0.5 bg-cyan-400 opacity-90 z-10 transition-all duration-150"
            style={{ left: `${threshold * 100}%` }}
          />
        </div>
        <div className="flex gap-3 text-[10px] font-mono">
          <span className="text-emerald-400">● TP</span>
          <span className="text-blue-400">● TN</span>
          <span className="text-amber-400">● FN</span>
          <span className="text-rose-400">● FP</span>
          <span className="text-cyan-400">| Threshold</span>
        </div>
      </div>

      {/* Metrics */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {[
          { label: 'Accuracy',  value: fmt(accuracy),  color: 'text-cyan-300' },
          { label: 'Precision', value: fmt(precision), color: 'text-purple-300' },
          { label: 'Recall',    value: fmt(recall),    color: 'text-emerald-300' },
          { label: 'F1-Score',  value: fmt(f1),        color: 'text-amber-300' },
        ].map(m => (
          <div key={m.label} className="rounded-lg bg-navy-900/60 border border-white/5 p-3 text-center">
            <div className={`text-xl font-bold font-mono ${m.color}`}>{m.value}</div>
            <div className="text-[10px] text-slate-400 mt-0.5">{m.label}</div>
          </div>
        ))}
      </div>

      {/* Confusion Matrix */}
      <div className="grid grid-cols-3 gap-1 max-w-xs">
        <div />
        <div className="text-center text-[10px] font-mono text-slate-400">Pred: Fraud</div>
        <div className="text-center text-[10px] font-mono text-slate-400">Pred: Legit</div>
        <div className="text-[10px] font-mono text-slate-400 flex items-center">Act: Fraud</div>
        <div className="rounded p-2 text-center bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 font-bold">{tp}</div>
        <div className="rounded p-2 text-center bg-amber-500/10 border border-amber-500/30 text-amber-300 font-bold">{fn}</div>
        <div className="text-[10px] font-mono text-slate-400 flex items-center">Act: Legit</div>
        <div className="rounded p-2 text-center bg-rose-500/10 border border-rose-500/30 text-rose-300 font-bold">{fp}</div>
        <div className="rounded p-2 text-center bg-blue-500/10 border border-blue-500/30 text-blue-300 font-bold">{tn}</div>
      </div>

      <div className="p-3 rounded-lg bg-amber-950/20 border border-amber-500/20 text-xs text-amber-200">
        <strong>Observation:</strong> As you lower the threshold, recall rises (catch more fraud) but precision drops (more false alarms). This is the fundamental Precision–Recall trade-off.
      </div>
    </div>
  );
}

