'use client';

import React, { useState } from 'react';
import { Database, Target, ArrowRight, Table, Info, Check } from 'lucide-react';

interface ColumnInfo {
  name: string;
  mathSymbol: string;
  type: 'Continuous Numeric' | 'Discrete Numeric' | 'Categorical';
  isDefaultTarget?: boolean;
  unit: string;
  roleDescription: string;
  sampleValues: Array<string | number>;
  correlationWithPrice: string;
}

const COLUMNS: ColumnInfo[] = [
  {
    name: 'SquareFootage',
    mathSymbol: 'x₁',
    type: 'Continuous Numeric',
    unit: 'sq ft',
    roleDescription: 'The interior living space of the property. Typically has the strongest positive linear correlation with valuation.',
    sampleValues: [1200, 1850, 2400, 3100, 1450],
    correlationWithPrice: '+0.88 (Very High Positive)',
  },
  {
    name: 'Bedrooms',
    mathSymbol: 'x₂',
    type: 'Discrete Numeric',
    unit: 'count',
    roleDescription: 'The count of dedicated bedrooms. Influences target market buyer persona (e.g., family vs single).',
    sampleValues: [2, 3, 4, 4, 2],
    correlationWithPrice: '+0.62 (Moderate Positive)',
  },
  {
    name: 'Bathrooms',
    mathSymbol: 'x₃',
    type: 'Discrete Numeric',
    unit: 'count',
    roleDescription: 'Full and partial bathroom count.',
    sampleValues: [1.5, 2.0, 3.5, 3.0, 1.0],
    correlationWithPrice: '+0.58 (Moderate Positive)',
  },
  {
    name: 'YearBuilt',
    mathSymbol: 'x₄',
    type: 'Discrete Numeric',
    unit: 'year',
    roleDescription: 'Construction year. Captures architectural modernness, wiring/plumbing standards, and building wear.',
    sampleValues: [1995, 2012, 2021, 2005, 1982],
    correlationWithPrice: '+0.44 (Moderate Positive)',
  },
  {
    name: 'NeighborhoodTier',
    mathSymbol: 'x₅',
    type: 'Categorical',
    unit: 'category',
    roleDescription: 'District rating (Urban Downtown, Suburban Park, Rural). Encoded as categorical one-hot vectors.',
    sampleValues: ['Suburban', 'Downtown', 'Suburban', 'Luxury Hill', 'Rural'],
    correlationWithPrice: '+0.71 (High Qualitative)',
  },
  {
    name: 'SalePrice',
    mathSymbol: 'y',
    type: 'Continuous Numeric',
    isDefaultTarget: true,
    unit: 'USD ($)',
    roleDescription: 'The ground truth answer that the machine learning model is trying to approximate and predict.',
    sampleValues: [280000, 420000, 560000, 715000, 310000],
    correlationWithPrice: '1.00 (Self Target)',
  },
];

export default function FeatureTargetExplorer() {
  const [selectedTargetCol, setSelectedTargetCol] = useState<string>('SalePrice');
  const [inspectedColName, setInspectedColName] = useState<string>('SquareFootage');

  const inspectedCol = COLUMNS.find((c) => c.name === inspectedColName) || COLUMNS[0];
  const isTarget = inspectedCol.name === selectedTargetCol;

  return (
    <div className="rounded-2xl border border-electric-cyan/30 bg-navy-950/85 p-6 backdrop-blur-md shadow-glow">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-white/10 pb-4 mb-5">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono text-cyan-400">
            <Target className="h-4 w-4" />
            <span>DATASET TAXONOMY INSPECTOR</span>
          </div>
          <h3 className="text-lg font-bold text-white mt-0.5">
            Features (X) vs. Target (y) Explorer
          </h3>
          <p className="text-xs text-slate-300">
            Click any column header to inspect its role, math notation, and statistical nature.
          </p>
        </div>

        <div className="text-xs font-mono bg-navy-900 border border-white/10 p-2.5 rounded-xl">
          <span className="text-slate-400">Designated Target Variable: </span>
          <span className="text-emerald-400 font-bold">{selectedTargetCol} (y)</span>
        </div>
      </div>

      {/* Dataset Interactive Table with Header Chips */}
      <div className="rounded-xl border border-white/10 bg-navy-900/60 overflow-x-auto mb-5">
        <table className="w-full text-left text-xs border-collapse">
          <thead>
            <tr className="border-b border-white/10 bg-navy-950/80 font-mono">
              <th className="p-3 text-slate-500">Row #</th>
              {COLUMNS.map((col) => {
                const isSelected = inspectedColName === col.name;
                const isCurrentTarget = selectedTargetCol === col.name;
                return (
                  <th
                    key={col.name}
                    onClick={() => setInspectedColName(col.name)}
                    className={`p-3 cursor-pointer transition select-none ${
                      isSelected
                        ? 'bg-cyan-950/80 text-cyan-300 ring-1 ring-cyan-400'
                        : isCurrentTarget
                        ? 'bg-emerald-950/40 text-emerald-300'
                        : 'hover:bg-white/5 text-slate-300'
                    }`}
                  >
                    <div className="flex items-center gap-1.5">
                      <span className="font-bold">{col.name}</span>
                      <span
                        className={`px-1.5 py-0.2 rounded text-[10px] font-bold ${
                          isCurrentTarget
                            ? 'bg-emerald-500 text-black'
                            : 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/30'
                        }`}
                      >
                        {isCurrentTarget ? 'y (Target)' : `${col.mathSymbol} (Feature)`}
                      </span>
                    </div>
                  </th>
                );
              })}
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5 font-mono text-slate-300">
            {[0, 1, 2, 3, 4].map((rowIdx) => (
              <tr key={rowIdx} className="hover:bg-white/5">
                <td className="p-3 text-slate-500">{rowIdx + 1}</td>
                {COLUMNS.map((col) => {
                  const isCurrentTarget = selectedTargetCol === col.name;
                  return (
                    <td
                      key={col.name}
                      onClick={() => setInspectedColName(col.name)}
                      className={`p-3 cursor-pointer ${
                        isCurrentTarget ? 'text-emerald-300 font-bold bg-emerald-950/10' : ''
                      }`}
                    >
                      {col.sampleValues[rowIdx]}
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Selected Column Deep-Dive Card */}
      <div className="rounded-xl bg-navy-900/90 border border-white/10 p-5 space-y-3 animate-fadeIn">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-white/10 pb-3">
          <div className="flex items-center gap-3">
            <span
              className={`px-2.5 py-1 rounded-lg text-xs font-mono font-bold ${
                isTarget
                  ? 'bg-emerald-500 text-black shadow-[0_0_12px_rgba(16,185,129,0.4)]'
                  : 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40'
              }`}
            >
              {isTarget ? 'TARGET VARIABLE (y)' : `FEATURE VARIABLE (${inspectedCol.mathSymbol})`}
            </span>
            <h4 className="text-base font-bold text-white">{inspectedCol.name}</h4>
          </div>

          <button
            onClick={() => setSelectedTargetCol(inspectedCol.name)}
            disabled={isTarget}
            className="self-start sm:self-auto px-3 py-1.5 rounded-lg text-xs font-mono bg-white/5 hover:bg-white/10 text-slate-300 border border-white/10 disabled:opacity-40 transition"
          >
            {isTarget ? '✓ Currently Designated as Target (y)' : 'Make This Column The Target (y)'}
          </button>
        </div>

        <p className="text-xs sm:text-sm text-slate-200 leading-relaxed">
          {inspectedCol.roleDescription}
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2 text-xs font-mono">
          <div className="p-3 rounded-lg bg-navy-950 border border-white/5">
            <span className="text-slate-400 text-[10px] block">DATA TYPE:</span>
            <span className="text-cyan-300 font-bold">{inspectedCol.type}</span>
          </div>

          <div className="p-3 rounded-lg bg-navy-950 border border-white/5">
            <span className="text-slate-400 text-[10px] block">MATH NOTATION:</span>
            <span className="text-purple-300 font-bold">{isTarget ? 'y (Scalar Target)' : `X[:, ${inspectedCol.mathSymbol}]`}</span>
          </div>

          <div className="p-3 rounded-lg bg-navy-950 border border-white/5">
            <span className="text-slate-400 text-[10px] block">CORRELATION:</span>
            <span className="text-emerald-300 font-bold">{inspectedCol.correlationWithPrice}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

