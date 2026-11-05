'use client';
import React, { useState, useMemo } from 'react';

// 8 actual house prices (in $1000s)
const ACTUAL = [250, 320, 180, 410, 290, 370, 215, 480];

function clamp(v: number, min: number, max: number) { return Math.max(min, Math.min(max, v)); }

function mae(actual: number[], pred: number[]) {
  return actual.reduce((s, a, i) => s + Math.abs(a - pred[i]), 0) / actual.length;
}
function mse(actual: number[], pred: number[]) {
  return actual.reduce((s, a, i) => s + (a - pred[i]) ** 2, 0) / actual.length;
}
function rmse(actual: number[], pred: number[]) { return Math.sqrt(mse(actual, pred)); }
function r2(actual: number[], pred: number[]) {
  const mean = actual.reduce((s, v) => s + v, 0) / actual.length;
  const ssTot = actual.reduce((s, a) => s + (a - mean) ** 2, 0);
  const ssRes = actual.reduce((s, a, i) => s + (a - pred[i]) ** 2, 0);
  return ssTot === 0 ? 1 : 1 - ssRes / ssTot;
}

const COLORS = ['#00f0ff','#a855f7','#10b981','#f59e0b','#ec4899','#38bdf8','#f97316','#84cc16'];

export default function RegressionMetricLab() {
  // predicted values as offsets from actual (slider −100 to +100)
  const [offsets, setOffsets] = useState<number[]>([10, -20, 15, -30, 5, 25, -10, 20]);

  const predicted = useMemo(
    () => ACTUAL.map((a, i) => clamp(a + offsets[i], 50, 700)),
    [offsets]
  );

  const maeVal  = mae(ACTUAL, predicted);
  const mseVal  = mse(ACTUAL, predicted);
  const rmseVal = rmse(ACTUAL, predicted);
  const r2Val   = r2(ACTUAL, predicted);

  const setOffset = (i: number, v: number) => {
    setOffsets(prev => prev.map((o, idx) => idx === i ? v : o));
  };

  // SVG bar chart
  const W = 280, H = 160, PAD = 30;
  const maxVal = Math.max(...ACTUAL, ...predicted);
  const barWidth = (W - PAD * 2) / (ACTUAL.length * 2 + ACTUAL.length - 1) * 1.5;
  const gap = (W - PAD * 2) / ACTUAL.length;

  return (
    <div className="rounded-xl border border-white/10 bg-navy-950/70 p-5 space-y-5">
      <div>
        <h3 className="text-sm font-bold text-white">Regression Metric Lab</h3>
        <p className="text-xs text-slate-400 mt-0.5">Adjust predicted house prices (in \$1000s). All four regression metrics update live.</p>
      </div>

      {/* Sliders */}
      <div className="space-y-2">
        <p className="text-[10px] font-mono text-slate-500 uppercase tracking-wider">Adjust Predicted Values (offset from actual)</p>
        {ACTUAL.map((a, i) => (
          <div key={i} className="grid grid-cols-[60px_1fr_80px] gap-3 items-center">
            <span className="text-[10px] font-mono" style={{ color: COLORS[i] }}>House {i + 1}</span>
            <input
              type="range" min={-150} max={150} step={5}
              value={offsets[i]}
              onChange={e => setOffset(i, Number(e.target.value))}
              className="accent-cyan-400"
            />
            <span className="text-[10px] font-mono text-slate-300">
              {a} → <span className={offsets[i] > 0 ? 'text-amber-300' : offsets[i] < 0 ? 'text-rose-300' : 'text-slate-300'}>
                {predicted[i]}
              </span>
            </span>
          </div>
        ))}
      </div>

      {/* Metrics */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {[
          { label: 'MAE',  formula: 'mean |y − ŷ|',   value: maeVal.toFixed(1),  unit: 'k',  color: 'text-cyan-300', bg: 'bg-cyan-500/10', border: 'border-cyan-500/30' },
          { label: 'MSE',  formula: 'mean (y − ŷ)²',   value: mseVal.toFixed(0),  unit: 'k²', color: 'text-purple-300', bg: 'bg-purple-500/10', border: 'border-purple-500/30' },
          { label: 'RMSE', formula: '√MSE',             value: rmseVal.toFixed(1), unit: 'k',  color: 'text-emerald-300', bg: 'bg-emerald-500/10', border: 'border-emerald-500/30' },
          { label: 'R²',   formula: '1 − SS_res/SS_tot', value: r2Val.toFixed(3),  unit: '',   color: 'text-amber-300', bg: 'bg-amber-500/10', border: 'border-amber-500/30' },
        ].map(m => (
          <div key={m.label} className={`rounded-lg ${m.bg} border ${m.border} p-3 text-center`}>
            <div className={`text-xl font-bold font-mono ${m.color}`}>{m.value}<span className="text-xs">{m.unit}</span></div>
            <div className="text-xs font-bold text-white mt-0.5">{m.label}</div>
            <div className="text-[10px] text-slate-400 font-mono">{m.formula}</div>
          </div>
        ))}
      </div>

      {/* Bar chart */}
      <div>
        <p className="text-[10px] font-mono text-slate-400 mb-2">ACTUAL vs PREDICTED (\$1000s)</p>
        <svg width="100%" viewBox={`0 0 ${W} ${H}`} className="rounded-lg bg-navy-900/60 border border-white/5">
          {ACTUAL.map((a, i) => {
            const x = PAD + i * gap;
            const barH_a = (a / maxVal) * (H - PAD * 1.5);
            const barH_p = (predicted[i] / maxVal) * (H - PAD * 1.5);
            const diff = predicted[i] - a;
            return (
              <g key={i}>
                {/* Actual */}
                <rect x={x} y={H - PAD - barH_a} width={barWidth * 0.9} height={barH_a}
                  fill={COLORS[i] + '80'} stroke={COLORS[i]} strokeWidth={1} />
                {/* Predicted */}
                <rect x={x + barWidth} y={H - PAD - barH_p} width={barWidth * 0.9} height={barH_p}
                  fill="transparent" stroke={COLORS[i]} strokeWidth={1.5} strokeDasharray="3,2" />
                {/* Residual line */}
                <line
                  x1={x + barWidth * 0.45} y1={H - PAD - barH_a}
                  x2={x + barWidth * 1.45} y2={H - PAD - barH_p}
                  stroke={diff > 0 ? '#f59e0b' : '#f43f5e'} strokeWidth={1} strokeDasharray="2,2"
                />
                <text x={x + barWidth * 0.5} y={H - PAD + 10} fontSize={7} fill={COLORS[i]} textAnchor="middle">
                  H{i + 1}
                </text>
              </g>
            );
          })}
          {/* Axis */}
          <line x1={PAD - 5} y1={H - PAD} x2={W - 5} y2={H - PAD} stroke="#ffffff15" strokeWidth={1} />
        </svg>
        <div className="flex gap-4 text-[10px] font-mono mt-1">
          <span className="text-slate-400">■ Actual</span>
          <span className="text-slate-400">□ Predicted</span>
          <span className="text-amber-400">— Overpredict</span>
          <span className="text-rose-400">— Underpredict</span>
        </div>
      </div>

      <div className="p-3 rounded-lg bg-blue-950/20 border border-blue-500/20 text-xs text-blue-200">
        <strong>R² Interpretation:</strong> R² ≈ 1.0 means near-perfect fit. R² = 0 means no better than predicting the mean. R² &lt; 0 means worse than the mean — a sign your model is broken.
      </div>
    </div>
  );
}

