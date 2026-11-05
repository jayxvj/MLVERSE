'use client';

import React, { useState } from 'react';
import { CheckCircle2, Circle, Lock, ChevronDown, ChevronUp, Rocket } from 'lucide-react';

interface CheckItem { id: string; text: string; completed: boolean }
interface PhaseSection {
  phase: number;
  title: string;
  subtitle: string;
  color: string;
  items: CheckItem[];
}

function makeItems(texts: string[]): CheckItem[] {
  return texts.map((text, i) => ({ id: `item-${i}`, text, completed: false }));
}

const INITIAL_PHASES: PhaseSection[] = [
  {
    phase: 1, title: 'Problem Definition', subtitle: 'Define the what and why',
    color: '#00f0ff',
    items: makeItems([
      'Written a clear one-sentence problem statement',
      'Identified this as classification, regression, or clustering',
      'Defined at least one measurable success metric (e.g. F1 > 0.88)',
      'Assessed whether ML is necessary (vs. simpler rules)',
      'Documented baseline performance for comparison'
    ])
  },
  {
    phase: 2, title: 'Data Collection', subtitle: 'Gather the raw learning signal',
    color: '#7000ff',
    items: makeItems([
      'Identified and accessed all required data sources',
      'Defined the target variable (label) and its type',
      'Verified data has sufficient volume for the problem complexity',
      'Documented data lineage and collection methodology',
      'Completed privacy and legal compliance review'
    ])
  },
  {
    phase: 3, title: 'Data Preparation & EDA', subtitle: 'Clean, explore and engineer',
    color: '#3b82f6',
    items: makeItems([
      'Performed split-first: created train/test partition before any preprocessing',
      'Handled missing values (imputation or removal)',
      'Removed or flagged outlier observations',
      'Encoded categorical variables (Label / Ordinal / One-Hot)',
      'Scaled numerical features (StandardScaler / MinMaxScaler)',
      'Inspected class balance with a count plot',
      'Analysed feature–target correlations with a heatmap'
    ])
  },
  {
    phase: 4, title: 'Model Selection & Training', subtitle: 'Choose and fit the algorithm',
    color: '#10b981',
    items: makeItems([
      'Set reproducible random seed (random_state=42)',
      'Established a naive baseline (e.g. DummyClassifier)',
      'Trained and cross-validated at least 3 different algorithms',
      'Performed hyperparameter tuning on the validation set only',
      'Logged all experiment configurations and metrics (MLflow)',
      'Selected the best model based on validation performance'
    ])
  },
  {
    phase: 5, title: 'Model Evaluation', subtitle: 'Measure true generalization',
    color: '#f59e0b',
    items: makeItems([
      'Evaluated the final model on the held-out test set (first and only time)',
      'Computed all agreed success metrics (F1, RMSE, AUC)',
      'Generated confusion matrix and residual diagnostic plots',
      'Performed error analysis: inspected worst-performing examples',
      'Reviewed inference latency and memory footprint'
    ])
  },
  {
    phase: 6, title: 'Deployment & Monitoring', subtitle: 'Serve and maintain quality',
    color: '#ec4899',
    items: makeItems([
      'Serialized model artifact (joblib.dump / ONNX export)',
      'Wrapped model in a FastAPI REST inference endpoint',
      'Containerized the service with Docker',
      'Set up data drift monitoring alerts (Evidently AI)',
      'Created model card with performance, limitations and fairness notes',
      'Scheduled periodic model retraining trigger'
    ])
  }
];

export default function WorkflowChecklist() {
  const [phases, setPhases] = useState<PhaseSection[]>(INITIAL_PHASES);
  const [openPhases, setOpenPhases] = useState<Set<number>>(new Set([1]));

  function toggleItem(phaseIdx: number, itemId: string) {
    setPhases(prev => prev.map((ph, pi) =>
      pi !== phaseIdx ? ph : {
        ...ph,
        items: ph.items.map(it => it.id === itemId ? { ...it, completed: !it.completed } : it)
      }
    ));
  }

  function togglePhase(phase: number) {
    setOpenPhases(prev => {
      const next = new Set(prev);
      next.has(phase) ? next.delete(phase) : next.add(phase);
      return next;
    });
  }

  const totalItems = phases.reduce((s, p) => s + p.items.length, 0);
  const completedItems = phases.reduce((s, p) => s + p.items.filter(i => i.completed).length, 0);
  const pct = Math.round((completedItems / totalItems) * 100);

  function phaseComplete(ph: PhaseSection) { return ph.items.every(i => i.completed); }
  function phaseLocked(idx: number) { return idx > 0 && !phaseComplete(phases[idx - 1]); }

  return (
    <div className="rounded-2xl border border-border/80 bg-navy-900/60 p-6 backdrop-blur-md shadow-2xl space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-border/50 pb-5">
        <div className="flex items-center gap-3">
          <span className="p-2 rounded-lg bg-electric-cyan/10 border border-electric-cyan/30 text-electric-cyan">
            <Rocket className="w-5 h-5" />
          </span>
          <div>
            <h3 className="text-xl font-bold text-white">End-to-End ML Project Checklist</h3>
            <p className="text-xs text-slate-400 mt-0.5">Track your progress through all six ML workflow phases</p>
          </div>
        </div>
        <div className="text-right">
          <div className="text-3xl font-bold font-mono text-electric-cyan">{pct}%</div>
          <div className="text-xs text-slate-400">{completedItems} / {totalItems} tasks</div>
        </div>
      </div>

      {/* Overall Progress Bar */}
      <div className="space-y-2">
        <div className="h-3 bg-slate-800/60 rounded-full overflow-hidden">
          <div
            className="h-full rounded-full bg-gradient-to-r from-electric-cyan via-violet-500 to-rose-500 transition-all duration-500"
            style={{ width: `${pct}%` }}
          />
        </div>
        <div className="flex justify-between text-[10px] text-slate-600 font-mono">
          <span>Problem Definition</span>
          <span>Deployment</span>
        </div>
      </div>

      {/* Phase Accordions */}
      <div className="space-y-3">
        {phases.map((phase, phaseIdx) => {
          const isOpen = openPhases.has(phase.phase);
          const isLocked = phaseLocked(phaseIdx);
          const isDone = phaseComplete(phase);
          const phaseCompletedCount = phase.items.filter(i => i.completed).length;
          const phasePct = Math.round((phaseCompletedCount / phase.items.length) * 100);

          return (
            <div
              key={phase.phase}
              className={`rounded-xl border transition-all ${
                isDone
                  ? 'border-emerald-500/30'
                  : isLocked
                  ? 'border-border/30 opacity-50'
                  : 'border-border/60'
              }`}
              style={!isLocked ? { borderColor: phase.color + '35' } : {}}
            >
              <button
                onClick={() => !isLocked && togglePhase(phase.phase)}
                disabled={isLocked}
                className="w-full flex items-center gap-4 p-4 text-left"
              >
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold border shrink-0 transition-all`}
                  style={isDone ? { background: '#10b981', borderColor: '#10b981', color: '#fff' } : isLocked ? { background: '#1e293b', borderColor: '#334155', color: '#64748b' } : { background: phase.color + '25', borderColor: phase.color, color: phase.color }}>
                  {isDone ? '✓' : isLocked ? <Lock className="w-3 h-3" /> : phase.phase}
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-bold" style={{ color: isLocked ? '#64748b' : phase.color }}>{phase.title}</span>
                    <span className="text-[11px] text-slate-400 font-mono">{phaseCompletedCount}/{phase.items.length}</span>
                  </div>
                  <div className="text-[11px] text-slate-500">{phase.subtitle}</div>
                  <div className="mt-1.5 h-1 bg-slate-800 rounded-full overflow-hidden">
                    <div className="h-full rounded-full transition-all duration-300" style={{ width: `${phasePct}%`, backgroundColor: phase.color }} />
                  </div>
                </div>
                {!isLocked && (
                  isOpen ? <ChevronUp className="w-4 h-4 text-slate-500 shrink-0" /> : <ChevronDown className="w-4 h-4 text-slate-500 shrink-0" />
                )}
              </button>

              {isOpen && !isLocked && (
                <div className="border-t border-border/30 p-4 space-y-2">
                  {phase.items.map(item => (
                    <button
                      key={item.id}
                      onClick={() => toggleItem(phaseIdx, item.id)}
                      className={`w-full flex items-center gap-3 p-3 rounded-lg border text-left transition-all ${
                        item.completed
                          ? 'border-emerald-500/30 bg-emerald-500/5'
                          : 'border-border/30 bg-navy-950/40 hover:border-slate-600'
                      }`}
                    >
                      {item.completed
                        ? <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                        : <Circle className="w-4 h-4 text-slate-600 shrink-0" />
                      }
                      <span className={`text-xs leading-relaxed ${item.completed ? 'text-slate-400 line-through' : 'text-slate-300'}`}>
                        {item.text}
                      </span>
                    </button>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

