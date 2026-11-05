'use client';

import React, { useState } from 'react';
import { Database, Table, Layers, ArrowRight, Eye, Grid } from 'lucide-react';

interface DatasetRow {
  id: number;
  features: Record<string, string | number>;
  target: string | number;
}

interface DatasetPreset {
  id: string;
  name: string;
  domain: string;
  n_samples: number;
  n_features: number;
  targetName: string;
  targetType: string;
  featureNames: string[];
  rows: DatasetRow[];
}

const PRESETS: DatasetPreset[] = [
  {
    id: 'customers',
    name: 'Customer Subscription Churn',
    domain: 'SaaS Analytics',
    n_samples: 5,
    n_features: 4,
    targetName: 'Churned',
    targetType: 'Binary Categorical (0 = Retained, 1 = Left)',
    featureNames: ['MonthlyCharges', 'TenureMonths', 'TechSupportTickets', 'ContractType'],
    rows: [
      { id: 1, features: { MonthlyCharges: 65.5, TenureMonths: 24, TechSupportTickets: 1, ContractType: 'Two-Year' }, target: 0 },
      { id: 2, features: { MonthlyCharges: 89.2, TenureMonths: 3, TechSupportTickets: 5, ContractType: 'Month-to-Month' }, target: 1 },
      { id: 3, features: { MonthlyCharges: 45.0, TenureMonths: 36, TechSupportTickets: 0, ContractType: 'One-Year' }, target: 0 },
      { id: 4, features: { MonthlyCharges: 99.8, TenureMonths: 8, TechSupportTickets: 4, ContractType: 'Month-to-Month' }, target: 1 },
      { id: 5, features: { MonthlyCharges: 70.1, TenureMonths: 18, TechSupportTickets: 2, ContractType: 'Month-to-Month' }, target: 0 },
    ],
  },
  {
    id: 'housing',
    name: 'Housing Valuation',
    domain: 'Real Estate',
    n_samples: 5,
    n_features: 3,
    targetName: 'PriceUSD',
    targetType: 'Continuous Numerical ($)',
    featureNames: ['LivingAreaSqft', 'Bedrooms', 'AgeYears'],
    rows: [
      { id: 1, features: { LivingAreaSqft: 1850, Bedrooms: 3, AgeYears: 5 }, target: 410000 },
      { id: 2, features: { LivingAreaSqft: 2400, Bedrooms: 4, AgeYears: 1 }, target: 545000 },
      { id: 3, features: { LivingAreaSqft: 1100, Bedrooms: 2, AgeYears: 22 }, target: 260000 },
      { id: 4, features: { LivingAreaSqft: 3200, Bedrooms: 5, AgeYears: 3 }, target: 720000 },
      { id: 5, features: { LivingAreaSqft: 1500, Bedrooms: 3, AgeYears: 12 }, target: 335000 },
    ],
  },
];

export default function DatasetExplorer() {
  const [selectedPresetId, setSelectedPresetId] = useState<string>('customers');
  const [highlightMode, setHighlightMode] = useState<'all' | 'row' | 'features' | 'target'>('all');
  const [selectedRowIndex, setSelectedRowIndex] = useState<number>(0);

  const preset = PRESETS.find((p) => p.id === selectedPresetId) || PRESETS[0];

  return (
    <div className="rounded-2xl border border-electric-cyan/30 bg-navy-950/85 p-6 backdrop-blur-md shadow-glow">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-white/10 pb-4 mb-5">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono text-cyan-400">
            <Database className="h-4 w-4" />
            <span>INTERACTIVE DATASET ANATOMY</span>
          </div>
          <h3 className="text-lg font-bold text-white mt-0.5">
            Dataset Matrix Explorer: Samples (Rows) & Attributes (Columns)
          </h3>
          <p className="text-xs text-slate-300">
            Inspect how real-world observations map into mathematical matrix dimensions X ∈ ℝ^(N×D) and target vector y ∈ ℝ^N.
          </p>
        </div>

        {/* Dataset Preset Selector */}
        <div className="flex items-center gap-2">
          {PRESETS.map((p) => (
            <button
              key={p.id}
              onClick={() => {
                setSelectedPresetId(p.id);
                setSelectedRowIndex(0);
              }}
              className={`px-3 py-1.5 rounded-lg text-xs font-mono font-medium transition ${
                selectedPresetId === p.id
                  ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-400 shadow-glow font-bold'
                  : 'bg-navy-900 border border-white/10 text-slate-400 hover:text-white'
              }`}
            >
              {p.name}
            </button>
          ))}
        </div>
      </div>

      {/* Dimensionality Metric Badges */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-5">
        <div className="p-3 rounded-xl bg-navy-900/70 border border-white/10">
          <div className="text-[10px] font-mono text-slate-400 uppercase">Sample Count ($N$)</div>
          <div className="text-lg font-bold text-white font-mono">{preset.n_samples} Observations</div>
          <div className="text-[10px] text-cyan-400">Number of matrix rows</div>
        </div>

        <div className="p-3 rounded-xl bg-navy-900/70 border border-white/10">
          <div className="text-[10px] font-mono text-slate-400 uppercase">Dimensionality ($D$)</div>
          <div className="text-lg font-bold text-cyan-300 font-mono">{preset.n_features} Features</div>
          <div className="text-[10px] text-slate-400">Number of feature columns</div>
        </div>

        <div className="p-3 rounded-xl bg-navy-900/70 border border-white/10">
          <div className="text-[10px] font-mono text-slate-400 uppercase">Feature Matrix ($X$)</div>
          <div className="text-lg font-bold text-purple-300 font-mono">Shape: ({preset.n_samples}, {preset.n_features})</div>
          <div className="text-[10px] text-purple-400">2D Observation Matrix</div>
        </div>

        <div className="p-3 rounded-xl bg-navy-900/70 border border-white/10">
          <div className="text-[10px] font-mono text-slate-400 uppercase">Target Vector ($y$)</div>
          <div className="text-lg font-bold text-emerald-300 font-mono">Length: {preset.n_samples}</div>
          <div className="text-[10px] text-emerald-400">{preset.targetType.split(' ')[0]} Outcome</div>
        </div>
      </div>

      {/* Interactive Highlighting Controls */}
      <div className="flex flex-wrap items-center justify-between gap-3 mb-4 p-3 rounded-xl bg-navy-900/50 border border-white/5">
        <div className="flex items-center gap-2">
          <span className="text-xs font-mono text-slate-400">Highlight View:</span>
          {[
            { id: 'all', label: 'Complete Matrix' },
            { id: 'row', label: 'Single Sample (xᵢ, yᵢ)' },
            { id: 'features', label: 'Feature Matrix (X)' },
            { id: 'target', label: 'Target Vector (y)' },
          ].map((mode) => (
            <button
              key={mode.id}
              onClick={() => setHighlightMode(mode.id as any)}
              className={`px-2.5 py-1 rounded text-xs font-mono transition ${
                highlightMode === mode.id
                  ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-400 shadow-glow font-bold'
                  : 'bg-navy-950 border border-white/10 text-slate-400 hover:text-white'
              }`}
            >
              {mode.label}
            </button>
          ))}
        </div>

        <div className="text-xs font-mono text-slate-400">
          Click any row to select sample $i$
        </div>
      </div>

      {/* The Matrix Table */}
      <div className="rounded-xl border border-white/10 bg-navy-900/80 overflow-x-auto mb-5">
        <table className="w-full text-left text-xs border-collapse">
          <thead>
            <tr className="border-b border-white/10 bg-navy-950 text-slate-400 font-mono">
              <th className="p-3 w-16 text-center">Row $i$</th>
              {preset.featureNames.map((fn, fIdx) => (
                <th
                  key={fn}
                  className={`p-3 transition ${
                    highlightMode === 'features' || highlightMode === 'all'
                      ? 'text-cyan-300 bg-cyan-950/20'
                      : 'text-slate-400 opacity-40'
                  }`}
                >
                  <div className="font-bold text-white">{fn}</div>
                  <div className="text-[10px] text-cyan-400">Feature $x_{fIdx + 1}$</div>
                </th>
              ))}
              <th
                className={`p-3 border-l border-white/10 transition ${
                  highlightMode === 'target' || highlightMode === 'all'
                    ? 'text-emerald-300 bg-emerald-950/30'
                    : 'text-slate-400 opacity-40'
                }`}
              >
                <div className="font-bold text-emerald-300">{preset.targetName}</div>
                <div className="text-[10px] text-emerald-400">Target $y$</div>
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5 font-mono text-slate-300">
            {preset.rows.map((row, rIdx) => {
              const isSelectedRow = selectedRowIndex === rIdx;
              const isRowHighlighted = highlightMode === 'row' && isSelectedRow;

              return (
                <tr
                  key={row.id}
                  onClick={() => setSelectedRowIndex(rIdx)}
                  className={`cursor-pointer transition ${
                    isRowHighlighted
                      ? 'bg-cyan-950/60 text-white ring-1 ring-cyan-400'
                      : isSelectedRow
                      ? 'bg-white/5'
                      : 'hover:bg-white/5'
                  }`}
                >
                  <td className="p-3 text-center text-slate-500 font-bold">
                    $x_{rIdx + 1}$
                  </td>

                  {preset.featureNames.map((fn) => (
                    <td
                      key={fn}
                      className={`p-3 transition ${
                        highlightMode === 'features'
                          ? 'text-cyan-200 bg-cyan-950/20 font-bold'
                          : highlightMode === 'target'
                          ? 'opacity-30'
                          : ''
                      }`}
                    >
                      {row.features[fn]}
                    </td>
                  ))}

                  <td
                    className={`p-3 border-l border-white/10 font-bold transition ${
                      highlightMode === 'target' || highlightMode === 'all'
                        ? 'text-emerald-300 bg-emerald-950/20'
                        : 'opacity-40'
                    }`}
                  >
                    {row.target}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Selected Sample Mathematical Representation */}
      <div className="rounded-xl bg-navy-900 border border-white/10 p-4 space-y-2 font-mono text-xs">
        <div className="flex items-center justify-between text-cyan-400 font-bold">
          <span>Vector Representation of Sample $i = {selectedRowIndex + 1}$:</span>
          <span className="text-slate-400">Row {selectedRowIndex + 1} of {preset.n_samples}</span>
        </div>
        <div className="p-3 rounded-lg bg-black/60 text-slate-200 border border-white/5 overflow-x-auto space-y-1">
          <div>
            <span className="text-purple-300">Feature Vector x[{selectedRowIndex + 1}]: </span>
            <span className="text-cyan-300">
              [{Object.values(preset.rows[selectedRowIndex].features).map((v) => (typeof v === 'number' ? v : `"${v}"`)).join(', ')}]
            </span>
          </div>
          <div>
            <span className="text-purple-300">Target y[{selectedRowIndex + 1}]: </span>
            <span className="text-emerald-400 font-bold">
              {preset.rows[selectedRowIndex].target}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

