'use client';
import React, { useState } from 'react';

// Imbalanced dataset: 950 negatives (healthy), 50 positives (cancer)
const ACTUAL_POS = 50;
const ACTUAL_NEG = 950;
const TOTAL = ACTUAL_POS + ACTUAL_NEG;

interface ModelDef {
  name: string;
  subtitle: string;
  description: string;
  tp: number;
  tn: number;
  fp: number;
  fn: number;
  color: string;
  borderColor: string;
  accent: string;
  verdict: string;
  usefulFor: string;
}

const MODELS: ModelDef[] = [
  {
    name: 'Model A',
    subtitle: '"Always Healthy" Baseline',
    description: 'Predicts every patient as healthy. Achieves 95% accuracy but is completely useless for detecting cancer.',
    tp: 0, tn: ACTUAL_NEG, fp: 0, fn: ACTUAL_POS,
    color: 'text-rose-300',
    borderColor: 'border-rose-500/40',
    accent: 'bg-rose-500/10',
    verdict: '❌ Useless despite 95% accuracy',
    usefulFor: 'Nothing — it misses every cancer case.',
  },
  {
    name: 'Model B',
    subtitle: 'Balanced Classifier',
    description: 'Detects 40 of 50 cancer cases with few false alarms. Lower accuracy (97.5%) but far more useful in practice.',
    tp: 40, tn: 940, fp: 10, fn: 10,
    color: 'text-emerald-300',
    borderColor: 'border-emerald-500/40',
    accent: 'bg-emerald-500/10',
    verdict: '✅ Clinically useful — high recall',
    usefulFor: 'Cancer screening: missing a case is catastrophic.',
  },
  {
    name: 'Model C',
    subtitle: 'High Precision Model',
    description: 'Only flags very likely cancer cases. Precise, but misses more cases. Good when false positives are expensive.',
    tp: 30, tn: 948, fp: 2, fn: 20,
    color: 'text-cyan-300',
    borderColor: 'border-cyan-500/40',
    accent: 'bg-cyan-500/10',
    verdict: '⚠️ Good precision, lower recall',
    usefulFor: 'When false positives are costly (e.g., unnecessary surgery).',
  },
];

function safeDiv(n: number, d: number) { return d === 0 ? null : n / d; }
function pct(v: number | null, dp = 1) { return v === null ? 'N/A' : (v * 100).toFixed(dp) + '%'; }

export default function ModelComparisonLab() {
  const [active, setActive] = useState(0);
  const model = MODELS[active];

  const total = model.tp + model.tn + model.fp + model.fn;
  const accuracy  = pct(safeDiv(model.tp + model.tn, total));
  const precision = pct(safeDiv(model.tp, model.tp + model.fp));
  const recall    = pct(safeDiv(model.tp, model.tp + model.fn));
  const spec      = pct(safeDiv(model.tn, model.tn + model.fp));
  const p = safeDiv(model.tp, model.tp + model.fp);
  const r = safeDiv(model.tp, model.tp + model.fn);
  const f1 = p !== null && r !== null && p + r > 0 ? pct((2 * p * r) / (p + r)) : 'N/A';

  // Mini bar for recall visualization
  const recallVal = model.tp / ACTUAL_POS;
  const precVal = model.tp === 0 ? 0 : model.tp / (model.tp + model.fp);

  return (
    <div className="rounded-xl border border-white/10 bg-navy-950/70 p-5 space-y-5">
      <div>
        <h3 className="text-sm font-bold text-white">Model Comparison Lab</h3>
        <p className="text-xs text-slate-400 mt-0.5">
          Imbalanced medical dataset: {TOTAL} patients — {ACTUAL_POS} cancer, {ACTUAL_NEG} healthy.
          Compare three models and see why accuracy alone is misleading.
        </p>
      </div>

      {/* Model selector tabs */}
      <div className="flex gap-2 flex-wrap">
        {MODELS.map((m, i) => (
          <button
            key={i}
            onClick={() => setActive(i)}
            className={`rounded-lg border px-3 py-2 text-xs text-left transition-all ${
              active === i
                ? `${m.borderColor} ${m.accent} ${m.color} font-bold`
                : 'border-white/10 text-slate-400 hover:border-white/20'
            }`}
          >
            <div className="font-semibold">{m.name}</div>
            <div className="text-[10px] opacity-70">{m.subtitle}</div>
          </button>
        ))}
      </div>

      <p className="text-xs text-slate-300 bg-navy-900/60 rounded-lg p-3 border border-white/5">{model.description}</p>

      {/* Confusion Matrix */}
      <div className="grid grid-cols-3 gap-1 max-w-xs">
        <div />
        <div className="text-center text-[10px] font-mono text-slate-400">Pred: Cancer</div>
        <div className="text-center text-[10px] font-mono text-slate-400">Pred: Healthy</div>
        <div className="text-[10px] font-mono text-slate-400 flex items-center">Act: Cancer</div>
        <div className="rounded p-2 text-center bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 font-bold text-sm">{model.tp}</div>
        <div className="rounded p-2 text-center bg-amber-500/10 border border-amber-500/30 text-amber-300 font-bold text-sm">{model.fn}</div>
        <div className="text-[10px] font-mono text-slate-400 flex items-center">Act: Healthy</div>
        <div className="rounded p-2 text-center bg-rose-500/10 border border-rose-500/30 text-rose-300 font-bold text-sm">{model.fp}</div>
        <div className="rounded p-2 text-center bg-blue-500/10 border border-blue-500/30 text-blue-300 font-bold text-sm">{model.tn}</div>
      </div>

      {/* Metrics */}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
        {[
          { label: 'Accuracy',    value: accuracy },
          { label: 'Precision',   value: precision },
          { label: 'Recall',      value: recall },
          { label: 'Specificity', value: spec },
          { label: 'F1-Score',    value: f1 },
        ].map(m => (
          <div key={m.label} className="rounded-lg bg-navy-900/60 border border-white/5 p-3 text-center">
            <div className={`text-xl font-bold font-mono ${model.color}`}>{m.value}</div>
            <div className="text-[10px] text-slate-400 mt-0.5">{m.label}</div>
          </div>
        ))}
      </div>

      {/* Visual recall bar */}
      <div className="space-y-2">
        <p className="text-[10px] font-mono text-slate-400 uppercase tracking-wider">Cancer Detection Rate (Recall)</p>
        <div className="h-4 rounded-full bg-white/5 overflow-hidden">
          <div
            className="h-4 rounded-full transition-all duration-500 bg-gradient-to-r from-emerald-600 to-emerald-400"
            style={{ width: `${recallVal * 100}%` }}
          />
        </div>
        <div className="flex justify-between text-[10px] font-mono text-slate-400">
          <span>0% detected</span>
          <span className={model.color}>{(recallVal * 100).toFixed(0)}% of {ACTUAL_POS} cancer cases caught</span>
          <span>100%</span>
        </div>
        <p className="text-[10px] font-mono text-slate-400 uppercase tracking-wider mt-2">Precision (Positive Predictive Value)</p>
        <div className="h-4 rounded-full bg-white/5 overflow-hidden">
          <div
            className="h-4 rounded-full transition-all duration-500 bg-gradient-to-r from-purple-600 to-purple-400"
            style={{ width: `${precVal * 100}%` }}
          />
        </div>
        <div className="flex justify-between text-[10px] font-mono text-slate-400">
          <span>0%</span>
          <span className="text-purple-300">{(precVal * 100).toFixed(0)}% of positive predictions are correct</span>
          <span>100%</span>
        </div>
      </div>

      {/* Verdict */}
      <div className={`p-3 rounded-lg ${model.accent} border ${model.borderColor} space-y-1`}>
        <div className={`text-sm font-bold ${model.color}`}>{model.verdict}</div>
        <div className="text-xs text-slate-300"><strong>Best for:</strong> {model.usefulFor}</div>
      </div>

      <div className="p-3 rounded-lg bg-amber-950/20 border border-amber-500/20 text-xs text-amber-200">
        <strong>Rule of thumb:</strong> On imbalanced datasets, use <strong>Recall</strong> when missing positives is dangerous (disease, fraud). Use <strong>Precision</strong> when false alarms are costly. Use <strong>F1-Score</strong> when you need balance.
      </div>
    </div>
  );
}

