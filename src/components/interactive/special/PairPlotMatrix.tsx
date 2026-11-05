'use client';

import React, { useState } from 'react';
import { Grid, Eye, Sparkles, TrendingUp, Info, BarChart3 } from 'lucide-react';

interface Variable {
  id: string;
  name: string;
  unit: string;
}

const VARIABLES: Variable[] = [
  { id: 'study_hours', name: 'Study Hours', unit: 'hrs/wk' },
  { id: 'sleep_hours', name: 'Sleep', unit: 'hrs/night' },
  { id: 'practice_tests', name: 'Practice Tests', unit: 'completed' },
  { id: 'final_score', name: 'Final Score', unit: '%' },
];

// 12 representative synthetic student records
interface StudentRecord {
  id: string;
  study_hours: number;
  sleep_hours: number;
  practice_tests: number;
  final_score: number;
  status: 'Passed' | 'At-Risk';
}

const SAMPLE_STUDENTS: StudentRecord[] = [
  { id: 'S1', study_hours: 14, sleep_hours: 7.5, practice_tests: 8, final_score: 95, status: 'Passed' },
  { id: 'S2', study_hours: 12, sleep_hours: 7.0, practice_tests: 7, final_score: 88, status: 'Passed' },
  { id: 'S3', study_hours: 10, sleep_hours: 8.0, practice_tests: 6, final_score: 84, status: 'Passed' },
  { id: 'S4', study_hours: 8, sleep_hours: 6.5, practice_tests: 5, final_score: 76, status: 'Passed' },
  { id: 'S5', study_hours: 7, sleep_hours: 7.0, practice_tests: 4, final_score: 72, status: 'Passed' },
  { id: 'S6', study_hours: 6, sleep_hours: 8.5, practice_tests: 3, final_score: 68, status: 'Passed' },
  { id: 'S7', study_hours: 5, sleep_hours: 5.5, practice_tests: 3, final_score: 62, status: 'At-Risk' },
  { id: 'S8', study_hours: 4, sleep_hours: 6.0, practice_tests: 2, final_score: 55, status: 'At-Risk' },
  { id: 'S9', study_hours: 3, sleep_hours: 5.0, practice_tests: 2, final_score: 48, status: 'At-Risk' },
  { id: 'S10', study_hours: 2, sleep_hours: 4.5, practice_tests: 1, final_score: 42, status: 'At-Risk' },
  { id: 'S11', study_hours: 11, sleep_hours: 6.8, practice_tests: 6, final_score: 82, status: 'Passed' },
  { id: 'S12', study_hours: 5, sleep_hours: 7.8, practice_tests: 2, final_score: 59, status: 'At-Risk' },
];

// Precomputed Pearson correlations between variables
const CORRELATIONS: Record<string, number> = {
  'study_hours-study_hours': 1.0,
  'study_hours-sleep_hours': 0.42,
  'study_hours-practice_tests': 0.88,
  'study_hours-final_score': 0.94,

  'sleep_hours-study_hours': 0.42,
  'sleep_hours-sleep_hours': 1.0,
  'sleep_hours-practice_tests': 0.35,
  'sleep_hours-final_score': 0.48,

  'practice_tests-study_hours': 0.88,
  'practice_tests-sleep_hours': 0.35,
  'practice_tests-practice_tests': 1.0,
  'practice_tests-final_score': 0.89,

  'final_score-study_hours': 0.94,
  'final_score-sleep_hours': 0.48,
  'final_score-practice_tests': 0.89,
  'final_score-final_score': 1.0,
};

export default function PairPlotMatrix() {
  const [selectedRow, setSelectedRow] = useState<string>('study_hours');
  const [selectedCol, setSelectedCol] = useState<string>('final_score');
  const [showHue, setShowHue] = useState<boolean>(true);

  const isDiagonal = selectedRow === selectedCol;
  const pairKey = `${selectedRow}-${selectedCol}`;
  const rValue = CORRELATIONS[pairKey] ?? 0;

  const rowVar = VARIABLES.find((v) => v.id === selectedRow)!;
  const colVar = VARIABLES.find((v) => v.id === selectedCol)!;

  return (
    <div className="rounded-2xl border border-border/80 bg-navy-900/60 p-6 backdrop-blur-md shadow-2xl space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-border/50 pb-5">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-2 rounded-lg bg-electric-cyan/10 border border-electric-cyan/30 text-electric-cyan">
              <Grid className="w-5 h-5" />
            </span>
            <h3 className="text-xl font-bold text-white tracking-wide">
              Pair Plot Multi-Feature Matrix Visualizer
            </h3>
          </div>
          <p className="text-sm text-slate-300 mt-1">
            Simulate bivariate correlation and univariate distribution matrices (mimicking <code className="text-electric-cyan">sns.pairplot</code>).
          </p>
        </div>

        {/* Hue toggle */}
        <div className="flex items-center gap-3">
          <label className="flex items-center gap-2 text-xs text-slate-300 font-medium cursor-pointer bg-navy-950/80 px-3 py-2 rounded-xl border border-border">
            <input
              type="checkbox"
              checked={showHue}
              onChange={(e) => setShowHue(e.target.checked)}
              className="accent-electric-cyan w-4 h-4 cursor-pointer rounded"
            />
            <span>Color by Outcome Hue (<strong className="text-electric-cyan">Passed</strong> vs <strong className="text-rose-400">At-Risk</strong>)</span>
          </label>
        </div>
      </div>

      {/* Main Grid & Inspector */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* 4x4 Pair Matrix (7 Cols) */}
        <div className="lg:col-span-7 bg-navy-950/80 rounded-xl border border-border/70 p-4 space-y-3">
          <div className="flex items-center justify-between text-xs text-slate-400 pb-1 border-b border-border/40">
            <span>Matrix Grid: Click any tile to inspect</span>
            <span className="font-mono text-electric-cyan text-[11px]">4 × 4 Dimension Grid</span>
          </div>

          <div className="overflow-x-auto">
            <div className="min-w-[420px] space-y-1.5">
              {/* Column Headers */}
              <div className="grid grid-cols-5 gap-1 text-[11px] font-bold text-center text-slate-400">
                <div />
                {VARIABLES.map((v) => (
                  <div key={v.id} className="p-1 truncate text-slate-300">
                    {v.name}
                  </div>
                ))}
              </div>

              {/* Rows */}
              {VARIABLES.map((row) => (
                <div key={row.id} className="grid grid-cols-5 gap-1.5 items-center">
                  {/* Row Header */}
                  <div className="text-[11px] font-bold text-right pr-2 text-slate-300 truncate">
                    {row.name}
                  </div>

                  {/* 4 Cells */}
                  {VARIABLES.map((col) => {
                    const isDiag = row.id === col.id;
                    const isSelected = selectedRow === row.id && selectedCol === col.id;
                    const r = CORRELATIONS[`${row.id}-${col.id}`] ?? 0;

                    return (
                      <button
                        key={col.id}
                        onClick={() => {
                          setSelectedRow(row.id);
                          setSelectedCol(col.id);
                        }}
                        className={`h-16 rounded-lg border transition-all flex flex-col items-center justify-center p-1.5 relative overflow-hidden ${
                          isSelected
                            ? 'border-electric-cyan bg-electric-cyan/20 shadow-[0_0_12px_rgba(0,240,255,0.3)] ring-1 ring-electric-cyan'
                            : isDiag
                            ? 'border-slate-700/60 bg-navy-900/60 hover:border-slate-500'
                            : 'border-slate-800/80 bg-navy-900/40 hover:border-slate-600'
                        }`}
                      >
                        {isDiag ? (
                          <div className="flex flex-col items-center gap-1 text-slate-400">
                            <BarChart3 className="w-4 h-4 text-cyan-400" />
                            <span className="text-[9px] font-mono text-cyan-300 uppercase">Histogram</span>
                          </div>
                        ) : (
                          <div className="flex flex-col items-center gap-0.5">
                            <div className="flex gap-1 items-center">
                              <span className="w-1.5 h-1.5 rounded-full bg-electric-cyan/80" />
                              <span className="w-1.5 h-1.5 rounded-full bg-rose-400/80" />
                              <span className="w-1.5 h-1.5 rounded-full bg-electric-cyan/80" />
                            </div>
                            <span className="text-[10px] font-mono font-bold text-white mt-1">
                              r = {r > 0 ? `+${r.toFixed(2)}` : r.toFixed(2)}
                            </span>
                          </div>
                        )}
                      </button>
                    );
                  })}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Selected Cell Inspector (5 Cols) */}
        <div className="lg:col-span-5 space-y-4">
          <div className="rounded-xl border border-border/70 bg-navy-950/70 p-5 space-y-4">
            <div className="flex items-center justify-between border-b border-border/50 pb-3">
              <div className="flex items-center gap-2">
                <Eye className="w-4 h-4 text-electric-cyan" />
                <h4 className="text-sm font-bold text-white">Tile Detail Inspection</h4>
              </div>
              <span className="text-xs font-mono text-slate-400">
                {isDiagonal ? 'Diagonal Univariate' : 'Bivariate Scatter'}
              </span>
            </div>

            {/* Content for Diagonal */}
            {isDiagonal ? (
              <div className="space-y-3">
                <div className="p-3 bg-navy-900/60 rounded-lg border border-border/50">
                  <span className="text-xs font-bold text-white">Univariate Density: {rowVar.name}</span>
                  <p className="text-[11px] text-slate-300 mt-1">
                    On the diagonal, a pair plot collapses identical axes (X = Y) into a 1D distribution histogram or kernel density estimate (KDE).
                  </p>
                </div>

                {/* Micro Bar Chart representing frequency */}
                <div className="space-y-1.5">
                  <span className="text-[11px] text-slate-400">Sample Distribution across Cohort:</span>
                  <div className="grid grid-cols-4 gap-2 h-20 items-end bg-navy-900/40 p-3 rounded-lg border border-border/40">
                    <div className="bg-electric-cyan/40 rounded-t h-[40%] text-center text-[9px] text-slate-300 pt-1">Low</div>
                    <div className="bg-electric-cyan/60 rounded-t h-[75%] text-center text-[9px] text-slate-300 pt-1">Mid</div>
                    <div className="bg-electric-cyan/90 rounded-t h-[90%] text-center text-[9px] text-slate-300 pt-1">High</div>
                    <div className="bg-electric-cyan/50 rounded-t h-[55%] text-center text-[9px] text-slate-300 pt-1">Peak</div>
                  </div>
                </div>
              </div>
            ) : (
              /* Content for Off-Diagonal */
              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 bg-navy-900/60 rounded-lg border border-border/50">
                  <div>
                    <span className="text-xs font-semibold text-white">
                      {colVar.name} (X) vs {rowVar.name} (Y)
                    </span>
                    <div className="text-[11px] text-slate-400 mt-0.5">
                      Pearson r: <strong className="text-electric-cyan">{rValue.toFixed(2)}</strong>
                    </div>
                  </div>
                  <div className="px-2.5 py-1 bg-electric-cyan/10 border border-electric-cyan/30 rounded-full text-[11px] font-bold text-electric-cyan">
                    {rValue > 0.7 ? 'Strong Linear' : rValue > 0.4 ? 'Moderate' : 'Weak'}
                  </div>
                </div>

                {/* Scatter Points Representation */}
                <div className="relative h-44 bg-navy-900/40 rounded-xl border border-border/40 p-2 overflow-hidden">
                  {SAMPLE_STUDENTS.map((s) => {
                    // Normalize values approximately 0-100%
                    const xVal = ((s as any)[colVar.id] || 0);
                    const yVal = ((s as any)[rowVar.id] || 0);
                    // Mock coordinate mapping
                    const posX = Math.max(10, Math.min(90, (xVal / (colVar.id === 'final_score' ? 100 : colVar.id === 'study_hours' ? 16 : 10)) * 90));
                    const posY = 100 - Math.max(10, Math.min(90, (yVal / (rowVar.id === 'final_score' ? 100 : rowVar.id === 'study_hours' ? 16 : 10)) * 90));

                    return (
                      <div
                        key={s.id}
                        style={{ left: `${posX}%`, top: `${posY}%` }}
                        className={`absolute w-3.5 h-3.5 -translate-x-1/2 -translate-y-1/2 rounded-full border flex items-center justify-center transition-all ${
                          showHue
                            ? s.status === 'Passed'
                              ? 'bg-electric-cyan/80 border-cyan-300 shadow-[0_0_6px_rgba(0,240,255,0.5)]'
                              : 'bg-rose-500/80 border-rose-300 shadow-[0_0_6px_rgba(244,63,94,0.5)]'
                            : 'bg-slate-300 border-white'
                        }`}
                        title={`${s.id}: ${colVar.name}=${xVal}, ${rowVar.name}=${yVal}`}
                      />
                    );
                  })}
                  <div className="absolute bottom-2 left-2 text-[10px] text-slate-400 font-mono">
                    X: {colVar.name}
                  </div>
                  <div className="absolute top-2 left-2 text-[10px] text-slate-400 font-mono">
                    Y: {rowVar.name}
                  </div>
                </div>
              </div>
            )}

            {/* Python Code Snippet for Pair Plot */}
            <div className="space-y-1.5 pt-2">
              <span className="text-[11px] font-semibold text-slate-300 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-electric-cyan" />
                Seaborn Implementation
              </span>
              <pre className="p-3 bg-navy-950 rounded-lg border border-border/60 text-[11px] font-mono text-cyan-300 overflow-x-auto">
{`import seaborn as sns
import matplotlib.pyplot as plt

# Generate full bivariate pairwise grid with categorical hue
sns.pairplot(
    data=df,
    hue='passed',
    diag_kind='kde',
    corner=False,
    palette='viridis'
)
plt.show()`}
              </pre>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

