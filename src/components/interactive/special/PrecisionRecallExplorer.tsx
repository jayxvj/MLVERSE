'use client';
import React, { useState } from 'react';

// Fraud dataset: 1000 transactions — 10 fraud, 990 legit
// Two models at different thresholds
const TOTAL = 1000;
const ACTUAL_FRAUD = 10;
const ACTUAL_LEGIT = 990;

interface ModelProfile {
  name: string;
  threshold: string;
  strategy: string;
  tp: number;
  tn: number;
  fp: number;
  fn: number;
  color: string;
  borderColor: string;
}

const MODELS: ModelProfile[] = [
  {
    name: 'Model A — Aggressive',
    threshold: '0.2 (low)',
    strategy: 'Flags everything suspicious. Catches almost all fraud but many false alarms.',
    tp: 10, tn: 800, fp: 190, fn: 0,
    color: 'text-amber-300',
    borderColor: 'border-amber-500/30',
  },
  {
    name: 'Model B — Conservative',
    threshold: '0.7 (high)',
    strategy: 'Only flags very suspicious transactions. Very precise but misses some fraud.',
    tp: 7, tn: 985, fp: 5, fn: 3,
    color: 'text-cyan-300',
    borderColor: 'border-cyan-500/30',
  },
];

function safeDiv(n: number, d: number) { return d === 0 ? null : n / d; }
function pct(v: number | null) { return v === null ? 'N/A' : (v * 100).toFixed(1) + '%'; }

function computeMetrics(m: ModelProfile) {
  const total = m.tp + m.tn + m.fp + m.fn;
  const p = safeDiv(m.tp, m.tp + m.fp);
  const r = safeDiv(m.tp, m.tp + m.fn);
  const f1 = p !== null && r !== null && p + r > 0 ? (2 * p * r) / (p + r) : null;
  return {
    accuracy:  pct(safeDiv(m.tp + m.tn, total)),
    precision: pct(p),
    recall:    pct(r),
    f1:        pct(f1),
  };
}

// PR curve points for both models (threshold sweep, pre-computed for illustration)
const PR_POINTS_A = [
  { th: 0.1, p: 0.05, r: 1.0 }, { th: 0.2, p: 0.05, r: 1.0 },
  { th: 0.4, p: 0.10, r: 0.9 }, { th: 0.6, p: 0.25, r: 0.8 },
  { th: 0.7, p: 0.58, r: 0.7 }, { th: 0.8, p: 0.70, r: 0.5 },
  { th: 0.9, p: 1.00, r: 0.2 },
];

export default function PrecisionRecallExplorer() {
  const [selected, setSelected] = useState<0 | 1>(0);
  const model = MODELS[selected];
  const metrics = computeMetrics(model);

  // SVG PR curve — simple path
  const W = 260, H = 180, PAD = 30;
  const toX = (p: number) => PAD + p * (W - PAD * 2);
  const toY = (r: number) => PAD + (1 - r) * (H - PAD * 2);
  const points = PR_POINTS_A.map(pt => `${toX(pt.p)},${toY(pt.r)}`).join(' ');

  return (
    <div className="rounded-xl border border-white/10 bg-navy-950/70 p-5 space-y-5">
      <div>
        <h3 className="text-sm font-bold text-white">Precision–Recall Explorer</h3>
        <p className="text-xs text-slate-400 mt-0.5">
          Fraud dataset: {TOTAL.toLocaleString()} transactions — {ACTUAL_FRAUD} fraud, {ACTUAL_LEGIT.toLocaleString()} legit. Compare two models.
        </p>
      </div>

      {/* Model selector */}
      <div className="flex gap-3">
        {MODELS.map((m, i) => (
          <button
            key={i}
            onClick={() => setSelected(i as 0 | 1)}
            className={`flex-1 rounded-lg border px-3 py-2.5 text-xs text-left transition-all ${
              selected === i
                ? `${m.borderColor} bg-white/5 ${m.color}`
                : 'border-white/10 text-slate-400 hover:border-white/20'
            }`}
          >
            <div className="font-bold">{m.name}</div>
            <div className="text-[10px] opacity-70 mt-0.5">Threshold: {m.threshold}</div>
          </button>
        ))}
      </div>

      <p className="text-xs text-slate-300 bg-navy-900/60 rounded-lg p-3 border border-white/5">{model.strategy}</p>

      {/* Confusion matrix */}
      <div>
        <p className="text-[10px] font-mono text-slate-500 mb-2">CONFUSION MATRIX</p>
        <div className="grid grid-cols-3 gap-1 max-w-xs">
          <div />
          <div className="text-center text-[10px] font-mono text-slate-400">Pred: Fraud</div>
          <div className="text-center text-[10px] font-mono text-slate-400">Pred: Legit</div>
          <div className="text-[10px] font-mono text-slate-400 flex items-center">Act: Fraud</div>
          <div className="rounded p-2 text-center bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 font-bold text-sm">{model.tp}</div>
          <div className="rounded p-2 text-center bg-amber-500/10 border border-amber-500/30 text-amber-300 font-bold text-sm">{model.fn}</div>
          <div className="text-[10px] font-mono text-slate-400 flex items-center">Act: Legit</div>
          <div className="rounded p-2 text-center bg-rose-500/10 border border-rose-500/30 text-rose-300 font-bold text-sm">{model.fp}</div>
          <div className="rounded p-2 text-center bg-blue-500/10 border border-blue-500/30 text-blue-300 font-bold text-sm">{model.tn}</div>
        </div>
      </div>

      {/* Metrics */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {[
          { label: 'Accuracy',  value: metrics.accuracy },
          { label: 'Precision', value: metrics.precision },
          { label: 'Recall',    value: metrics.recall },
          { label: 'F1-Score',  value: metrics.f1 },
        ].map(m => (
          <div key={m.label} className="rounded-lg bg-navy-900/60 border border-white/5 p-3 text-center">
            <div className={`text-xl font-bold font-mono ${model.color}`}>{m.value}</div>
            <div className="text-[10px] text-slate-400 mt-0.5">{m.label}</div>
          </div>
        ))}
      </div>

      {/* P-R curve (SVG) */}
      <div>
        <p className="text-[10px] font-mono text-slate-400 mb-2">PRECISION–RECALL CURVE (Illustrative)</p>
        <svg width={W} height={H} className="rounded-lg bg-navy-900/60 border border-white/5">
          {/* Axes */}
          <line x1={PAD} y1={PAD} x2={PAD} y2={H - PAD} stroke="#ffffff20" strokeWidth={1} />
          <line x1={PAD} y1={H - PAD} x2={W - PAD} y2={H - PAD} stroke="#ffffff20" strokeWidth={1} />
          {/* Labels */}
          <text x={W / 2} y={H - 5} textAnchor="middle" fontSize={9} fill="#64748b">Precision</text>
          <text x={10} y={H / 2} textAnchor="middle" fontSize={9} fill="#64748b" transform={`rotate(-90, 10, ${H / 2})`}>Recall</text>
          {/* Curve */}
          <polyline points={points} fill="none" stroke="#00f0ff" strokeWidth={2} strokeLinejoin="round" />
          {/* Points */}
          {PR_POINTS_A.map((pt, i) => (
            <circle key={i} cx={toX(pt.p)} cy={toY(pt.r)} r={3} fill="#00f0ff" />
          ))}
          {/* Perfect model line */}
          <line x1={PAD} y1={PAD} x2={W - PAD} y2={PAD} stroke="#a855f730" strokeWidth={1} strokeDasharray="4,4" />
        </svg>
      </div>

      <div className="p-3 rounded-lg bg-rose-950/20 border border-rose-500/20 text-xs text-rose-200">
        <strong>Key Insight:</strong> A model that labels everything as &quot;Legit&quot; achieves <strong>99% accuracy</strong> on this dataset but catches <strong>zero fraud</strong>. Accuracy alone is misleading on imbalanced datasets.
      </div>
    </div>
  );
}

