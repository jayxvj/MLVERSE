'use client';

import React, { useState } from 'react';
import { Settings, Zap, TrendingUp, AlertTriangle } from 'lucide-react';

interface HPConfig {
  maxDepth: number;
  nEstimators: number;
  learningRate: number;
  minSamplesSplit: number;
}

function simulateScore(cfg: HPConfig): { train: number; val: number } {
  // Synthetic heuristic that mimics realistic overfitting behaviour
  const depthEffect = cfg.maxDepth > 8 ? -(cfg.maxDepth - 8) * 0.025 : cfg.maxDepth * 0.018;
  const lrEffect = cfg.learningRate > 0.3 ? -(cfg.learningRate - 0.3) * 0.4 : cfg.learningRate * 1.5;
  const nestEffect = Math.min(cfg.nEstimators / 500, 1) * 0.12;
  const splitEffect = cfg.minSamplesSplit < 5 ? 0.02 : -cfg.minSamplesSplit * 0.003;

  const base = 0.72;
  const rawVal = base + depthEffect * 0.6 + lrEffect * 0.2 + nestEffect + splitEffect;
  const rawTrain = rawVal + cfg.maxDepth * 0.007 + (cfg.minSamplesSplit < 5 ? 0.04 : 0);

  return {
    train: Math.max(0.5, Math.min(0.99, rawTrain + (Math.random() - 0.5) * 0.01)),
    val: Math.max(0.5, Math.min(0.97, rawVal + (Math.random() - 0.5) * 0.01)),
  };
}

const DEFAULTS: HPConfig = { maxDepth: 5, nEstimators: 100, learningRate: 0.1, minSamplesSplit: 10 };

interface Trial { id: number; cfg: HPConfig; train: number; val: number }

export default function HyperparameterTuningLab() {
  const [cfg, setCfg] = useState<HPConfig>(DEFAULTS);
  const [trials, setTrials] = useState<Trial[]>([]);
  const [searching, setSearching] = useState(false);

  function runTrial() {
    const { train, val } = simulateScore(cfg);
    const newTrial: Trial = { id: trials.length + 1, cfg: { ...cfg }, train, val };
    setTrials(prev => [newTrial, ...prev].slice(0, 10));
  }

  async function randomSearch() {
    setSearching(true);
    const newTrials: Trial[] = [];
    for (let i = 0; i < 8; i++) {
      const randCfg: HPConfig = {
        maxDepth: Math.round(2 + Math.random() * 14),
        nEstimators: [50, 100, 200, 300, 500][Math.floor(Math.random() * 5)],
        learningRate: parseFloat((0.01 + Math.random() * 0.5).toFixed(2)),
        minSamplesSplit: [2, 5, 10, 20, 30][Math.floor(Math.random() * 5)],
      };
      const { train, val } = simulateScore(randCfg);
      newTrials.push({ id: trials.length + i + 1, cfg: randCfg, train, val });
      await new Promise(r => setTimeout(r, 250));
      setTrials(prev => [newTrials[i], ...prev].slice(0, 10));
    }
    setSearching(false);
  }

  const gap = trials[0] ? trials[0].train - trials[0].val : 0;
  const overfit = gap > 0.08;
  const underfit = trials[0] && trials[0].val < 0.75;

  return (
    <div className="rounded-2xl border border-border/80 bg-navy-900/60 p-6 backdrop-blur-md shadow-2xl space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-border/50 pb-5">
        <div className="flex items-center gap-3">
          <span className="p-2 rounded-lg bg-amber-500/10 border border-amber-500/30 text-amber-400">
            <Settings className="w-5 h-5" />
          </span>
          <div>
            <h3 className="text-xl font-bold text-white">Hyperparameter Tuning Lab</h3>
            <p className="text-xs text-slate-400 mt-0.5">Adjust GBM hyperparameters and observe train vs validation F1-Score</p>
          </div>
        </div>
        <div className="flex gap-2">
          <button onClick={runTrial}
            className="px-4 py-2 rounded-xl border border-electric-cyan/60 bg-electric-cyan/10 text-electric-cyan text-xs font-bold hover:bg-electric-cyan/20 transition-all">
            Run Trial
          </button>
          <button onClick={randomSearch} disabled={searching}
            className="px-4 py-2 rounded-xl border border-amber-500/60 bg-amber-500/10 text-amber-300 text-xs font-bold hover:bg-amber-500/20 transition-all disabled:opacity-50 flex items-center gap-1.5">
            <Zap className={`w-3.5 h-3.5 ${searching ? 'animate-pulse' : ''}`} />
            Random Search (8 trials)
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Controls */}
        <div className="space-y-5">
          {([
            { key: 'maxDepth', label: 'Max Tree Depth', min: 1, max: 20, step: 1, tip: 'Higher = more complex trees. Risk: overfitting.' },
            { key: 'nEstimators', label: 'Number of Trees', min: 10, max: 500, step: 10, tip: 'More trees = better ensemble. Diminishing returns above ~300.' },
            { key: 'learningRate', label: 'Learning Rate', min: 0.01, max: 0.5, step: 0.01, tip: 'Scales gradient steps. High LR: fast but unstable.' },
            { key: 'minSamplesSplit', label: 'Min Samples Split', min: 2, max: 50, step: 1, tip: 'Min samples to split a leaf. Higher = more regularization.' },
          ] as const).map(({ key, label, min, max, step, tip }) => (
            <div key={key} className="space-y-1.5 bg-navy-950/60 rounded-xl border border-border/50 p-4">
              <div className="flex justify-between items-center text-xs">
                <span className="font-semibold text-slate-200">{label}</span>
                <span className="font-mono font-bold text-amber-300">{cfg[key]}</span>
              </div>
              <input
                type="range"
                min={min}
                max={max}
                step={step}
                value={cfg[key]}
                onChange={e => setCfg(prev => ({ ...prev, [key]: key === 'learningRate' ? parseFloat(e.target.value) : Number(e.target.value) }))}
                className="w-full accent-amber-400 cursor-pointer"
              />
              <p className="text-[10px] text-slate-500">{tip}</p>
            </div>
          ))}
        </div>

        {/* Results */}
        <div className="space-y-4">
          {/* Current Score Visual */}
          {trials.length > 0 && (
            <div className="p-4 rounded-xl border border-border/60 bg-navy-950/70 space-y-4">
              <div className="text-xs font-mono uppercase text-slate-400 tracking-wider">Latest Trial #{trials[0].id}</div>
              {[
                { label: 'Training F1', value: trials[0].train, color: '#00f0ff' },
                { label: 'Validation F1', value: trials[0].val, color: '#10b981' }
              ].map(({ label, value, color }) => (
                <div key={label} className="space-y-1">
                  <div className="flex justify-between text-xs">
                    <span className="text-slate-400">{label}</span>
                    <span className="font-mono font-bold" style={{ color }}>{value.toFixed(3)}</span>
                  </div>
                  <div className="h-2.5 bg-slate-800/80 rounded-full overflow-hidden">
                    <div className="h-full rounded-full transition-all duration-500"
                      style={{ width: `${value * 100}%`, backgroundColor: color, boxShadow: `0 0 10px ${color}60` }} />
                  </div>
                </div>
              ))}

              {overfit && (
                <div className="flex gap-2 p-2.5 rounded-lg bg-rose-500/10 border border-rose-500/30">
                  <AlertTriangle className="w-4 h-4 text-rose-400 shrink-0" />
                  <span className="text-[11px] text-slate-300">High Train–Val gap ({(gap * 100).toFixed(1)} pp) indicates overfitting. Reduce max depth or increase min_samples_split.</span>
                </div>
              )}
              {!overfit && underfit && (
                <div className="flex gap-2 p-2.5 rounded-lg bg-amber-500/10 border border-amber-500/30">
                  <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0" />
                  <span className="text-[11px] text-slate-300">Low validation score may indicate underfitting. Try increasing max depth or number of estimators.</span>
                </div>
              )}
              {!overfit && !underfit && (
                <div className="flex gap-2 p-2.5 rounded-lg bg-emerald-500/10 border border-emerald-500/30">
                  <TrendingUp className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span className="text-[11px] text-slate-300">Good balance! Small train–val gap suggests the model generalizes well.</span>
                </div>
              )}
            </div>
          )}

          {/* Trial History */}
          {trials.length > 0 && (
            <div className="overflow-x-auto rounded-xl border border-border/50">
              <table className="w-full text-[11px]">
                <thead>
                  <tr className="border-b border-border/50 bg-navy-950/80">
                    <th className="px-3 py-2 text-left text-slate-500 font-mono">#</th>
                    <th className="px-3 py-2 text-left text-slate-500 font-mono">Depth</th>
                    <th className="px-3 py-2 text-left text-slate-500 font-mono">Trees</th>
                    <th className="px-3 py-2 text-left text-slate-500 font-mono">LR</th>
                    <th className="px-3 py-2 text-left text-slate-500 font-mono">MSS</th>
                    <th className="px-3 py-2 text-left text-electric-cyan font-mono">Train F1</th>
                    <th className="px-3 py-2 text-left text-emerald-400 font-mono">Val F1</th>
                  </tr>
                </thead>
                <tbody>
                  {trials.map((t, i) => (
                    <tr key={t.id} className={`border-b border-border/20 ${i === 0 ? 'bg-amber-500/5' : 'bg-navy-950/30'}`}>
                      <td className="px-3 py-1.5 text-slate-500">{t.id}</td>
                      <td className="px-3 py-1.5 text-slate-300">{t.cfg.maxDepth}</td>
                      <td className="px-3 py-1.5 text-slate-300">{t.cfg.nEstimators}</td>
                      <td className="px-3 py-1.5 text-slate-300">{t.cfg.learningRate}</td>
                      <td className="px-3 py-1.5 text-slate-300">{t.cfg.minSamplesSplit}</td>
                      <td className="px-3 py-1.5 text-electric-cyan font-mono font-bold">{t.train.toFixed(3)}</td>
                      <td className="px-3 py-1.5 text-emerald-400 font-mono font-bold">{t.val.toFixed(3)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {trials.length === 0 && (
            <div className="h-48 flex items-center justify-center rounded-xl border border-border/40 bg-navy-950/60 text-sm text-slate-500">
              Configure hyperparameters and click "Run Trial" to start
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

