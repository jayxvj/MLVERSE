'use client';
import React, { useState } from 'react';

function safeDiv(n: number, d: number) {
  return d === 0 ? null : n / d;
}

function pct(v: number | null) {
  if (v === null) return 'N/A';
  return (v * 100).toFixed(1) + '%';
}

function f1(p: number | null, r: number | null) {
  if (p === null || r === null || p + r === 0) return null;
  return (2 * p * r) / (p + r);
}

export default function MetricCalculator() {
  const [tp, setTp] = useState(80);
  const [tn, setTn] = useState(850);
  const [fp, setFp] = useState(30);
  const [fn, setFn] = useState(40);

  const total = tp + tn + fp + fn;
  const accuracy  = safeDiv(tp + tn, total);
  const precision = safeDiv(tp, tp + fp);
  const recall    = safeDiv(tp, tp + fn);
  const specificity = safeDiv(tn, tn + fp);
  const f1Score   = f1(precision, recall);

  const metrics = [
    {
      name: 'Accuracy',
      formula: '(TP + TN) / Total',
      value: accuracy,
      color: 'text-cyan-300',
      bar: 'bg-cyan-500',
      desc: 'Overall correct predictions out of all predictions.',
    },
    {
      name: 'Precision',
      formula: 'TP / (TP + FP)',
      value: precision,
      color: 'text-purple-300',
      bar: 'bg-purple-500',
      desc: 'Of all positive predictions, how many were actually positive?',
    },
    {
      name: 'Recall',
      formula: 'TP / (TP + FN)',
      value: recall,
      color: 'text-emerald-300',
      bar: 'bg-emerald-500',
      desc: 'Of all actual positives, how many did we correctly find?',
    },
    {
      name: 'Specificity',
      formula: 'TN / (TN + FP)',
      value: specificity,
      color: 'text-blue-300',
      bar: 'bg-blue-500',
      desc: 'Of all actual negatives, how many did we correctly reject?',
    },
    {
      name: 'F1-Score',
      formula: '2 × (P × R) / (P + R)',
      value: f1Score,
      color: 'text-amber-300',
      bar: 'bg-amber-500',
      desc: 'Harmonic mean of Precision and Recall — balance of both.',
    },
  ];

  const Input = ({ label, value, setter, color }: { label: string; value: number; setter: (v: number) => void; color: string }) => (
    <div>
      <label className={`text-xs font-mono font-bold ${color} block mb-1`}>{label}</label>
      <input
        type="number"
        min={0}
        max={9999}
        value={value}
        onChange={e => setter(Math.max(0, Number(e.target.value)))}
        className="w-full rounded-lg bg-navy-900 border border-white/10 text-white text-sm font-mono px-3 py-2 focus:outline-none focus:border-cyan-500/50"
      />
    </div>
  );

  return (
    <div className="rounded-xl border border-white/10 bg-navy-950/70 p-5 space-y-5">
      <div>
        <h3 className="text-sm font-bold text-white">Metric Calculator</h3>
        <p className="text-xs text-slate-400 mt-0.5">Adjust TP, TN, FP, FN — all five metrics update instantly.</p>
      </div>

      {/* Inputs */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <Input label="TP — True Positive"  value={tp} setter={setTp} color="text-emerald-300" />
        <Input label="TN — True Negative"  value={tn} setter={setTn} color="text-blue-300" />
        <Input label="FP — False Positive" value={fp} setter={setFp} color="text-rose-300" />
        <Input label="FN — False Negative" value={fn} setter={setFn} color="text-amber-300" />
      </div>

      <p className="text-xs font-mono text-slate-500">Total samples: {total}</p>

      {/* Metric Bars */}
      <div className="space-y-3">
        {metrics.map(m => {
          const pctVal = m.value === null ? 0 : m.value * 100;
          return (
            <div key={m.name} className="rounded-lg bg-navy-900/60 border border-white/5 p-3 space-y-1.5">
              <div className="flex items-center justify-between">
                <div>
                  <span className={`text-xs font-bold font-mono ${m.color}`}>{m.name}</span>
                  <span className="text-[10px] text-slate-500 ml-2 font-mono">= {m.formula}</span>
                </div>
                <span className={`text-lg font-bold font-mono ${m.color}`}>{pct(m.value)}</span>
              </div>
              <div className="h-2 rounded-full bg-white/5">
                <div
                  className={`h-2 rounded-full transition-all duration-300 ${m.bar}`}
                  style={{ width: `${Math.min(pctVal, 100)}%` }}
                />
              </div>
              <p className="text-[10px] text-slate-400">{m.desc}</p>
            </div>
          );
        })}
      </div>

      {/* 2×2 grid recap */}
      <div className="grid grid-cols-3 gap-1 max-w-xs">
        <div />
        <div className="text-center text-[10px] font-mono text-slate-400">Pred +</div>
        <div className="text-center text-[10px] font-mono text-slate-400">Pred −</div>
        <div className="text-[10px] font-mono text-slate-400 flex items-center">Act +</div>
        <div className="rounded p-2 text-center bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 font-bold text-sm">{tp}</div>
        <div className="rounded p-2 text-center bg-amber-500/10 border border-amber-500/30 text-amber-300 font-bold text-sm">{fn}</div>
        <div className="text-[10px] font-mono text-slate-400 flex items-center">Act −</div>
        <div className="rounded p-2 text-center bg-rose-500/10 border border-rose-500/30 text-rose-300 font-bold text-sm">{fp}</div>
        <div className="rounded p-2 text-center bg-blue-500/10 border border-blue-500/30 text-blue-300 font-bold text-sm">{tn}</div>
      </div>

      <p className="text-[10px] text-slate-600 font-mono">
        Tip: Try TP=0 or FP=0 to see &quot;N/A&quot; for metrics with undefined denominators.
      </p>
    </div>
  );
}

