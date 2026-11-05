'use client';

import React, { useState, useMemo } from 'react';
import { Database, BarChart2, Filter, Info, Table, ChevronDown, ChevronUp } from 'lucide-react';
import InteractiveChart from '../InteractiveChart';

// Sample house-price dataset
const DATASET = [
  { id: 1, area: 1200, bedrooms: 2, age: 15, location: 'Suburban', price: 245000, has_garage: true },
  { id: 2, area: 1850, bedrooms: 3, age: 8,  location: 'Urban',    price: 385000, has_garage: true },
  { id: 3, area: 950,  bedrooms: 1, age: 30, location: 'Rural',    price: 128000, has_garage: false },
  { id: 4, area: 2400, bedrooms: 4, age: 3,  location: 'Urban',    price: 520000, has_garage: true },
  { id: 5, area: 1100, bedrooms: 2, age: 22, location: 'Suburban', price: 215000, has_garage: false },
  { id: 6, area: 3200, bedrooms: 5, age: 1,  location: 'Urban',    price: 875000, has_garage: true },
  { id: 7, area: 1500, bedrooms: 3, age: 12, location: 'Suburban', price: 310000, has_garage: true },
  { id: 8, area: 780,  bedrooms: 1, age: 45, location: 'Rural',    price: 95000,  has_garage: false },
  { id: 9, area: 2100, bedrooms: 4, age: 5,  location: 'Suburban', price: 450000, has_garage: true },
  { id: 10, id2: 10, area: 1700, bedrooms: 3, age: 18, location: 'Urban', price: 362000, has_garage: false },
];

const NUM_COLS = ['area', 'bedrooms', 'age', 'price'] as const;
const CAT_COLS = ['location', 'has_garage'] as const;
type NumCol = typeof NUM_COLS[number];
type CatCol = typeof CAT_COLS[number];

function stats(vals: number[]) {
  const sorted = [...vals].sort((a, b) => a - b);
  const n = vals.length;
  const mean = vals.reduce((s, v) => s + v, 0) / n;
  const median = n % 2 === 0 ? (sorted[n/2-1] + sorted[n/2]) / 2 : sorted[Math.floor(n/2)];
  const variance = vals.reduce((s, v) => s + (v - mean)**2, 0) / n;
  const std = Math.sqrt(variance);
  return { mean, median, min: sorted[0], max: sorted[n-1], range: sorted[n-1]-sorted[0], std, n };
}

export default function EdaDashboard() {
  const [selectedNum, setSelectedNum] = useState<NumCol>('price');
  const [selectedCat, setSelectedCat] = useState<CatCol>('location');
  const [showRaw, setShowRaw] = useState(false);
  const [activeTab, setActiveTab] = useState<'stats' | 'chart' | 'categorical'>('stats');

  const numVals = useMemo(() => DATASET.map(r => r[selectedNum] as number), [selectedNum]);
  const numStats = useMemo(() => stats(numVals), [numVals]);

  const histData = useMemo(() => {
    const bins: { range: string; count: number }[] = [];
    const min = numStats.min, range = numStats.range;
    const binCount = 5;
    const binSize = range / binCount;
    for (let i = 0; i < binCount; i++) {
      const lo = min + i * binSize;
      const hi = lo + binSize;
      bins.push({
        range: `${Math.round(lo / (selectedNum === 'price' ? 1000 : 1))}${selectedNum === 'price' ? 'k' : ''}`,
        count: numVals.filter(v => v >= lo && (i === binCount - 1 ? v <= hi : v < hi)).length,
      });
    }
    return bins;
  }, [numVals, numStats, selectedNum]);

  const catFreq = useMemo(() => {
    const freq: Record<string, number> = {};
    DATASET.forEach(r => {
      const v = String(r[selectedCat]);
      freq[v] = (freq[v] ?? 0) + 1;
    });
    return Object.entries(freq).map(([label, count]) => ({ label, count }));
  }, [selectedCat]);

  const colMeta: Record<string, { type: string; desc: string }> = {
    id: { type: 'Discrete Numeric (ID)', desc: 'Unique house identifier — not useful for prediction' },
    area: { type: 'Continuous Numeric', desc: 'Floor area in square feet — a key predictive feature' },
    bedrooms: { type: 'Discrete Numeric', desc: 'Number of bedroom rooms — ordinal numeric' },
    age: { type: 'Continuous Numeric', desc: 'Age of house in years' },
    location: { type: 'Nominal Categorical', desc: 'Neighbourhood type — Urban / Suburban / Rural' },
    price: { type: 'Continuous Numeric (Target)', desc: 'Sale price in USD — the variable we want to predict' },
    has_garage: { type: 'Binary Categorical', desc: 'Boolean flag for garage presence — true/false' },
  };

  return (
    <div className="rounded-2xl border border-electric-cyan/30 bg-navy-950/85 p-5 backdrop-blur-md shadow-glow space-y-5">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-white/10 pb-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono text-cyan-400">
            <Database className="h-4 w-4" />
            <span>EXPLORATORY DATA ANALYSIS LAB</span>
          </div>
          <h3 className="text-lg font-bold text-white mt-0.5">House Price EDA Dashboard</h3>
          <p className="text-xs text-slate-300">10-row sample dataset — inspect rows, statistics, and distributions.</p>
        </div>
        <div className="flex items-center gap-2 text-xs font-mono text-slate-400 bg-navy-900 border border-white/10 rounded-lg px-3 py-2">
          <span>10 rows × 6 features + 1 target</span>
        </div>
      </div>

      {/* Column Type Guide */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
        {Object.entries(colMeta).filter(([k]) => k !== 'id' && k !== 'id2').map(([col, meta]) => (
          <div key={col} className="flex gap-2 p-2.5 rounded-lg bg-navy-900/60 border border-white/5 text-xs">
            <code className="text-cyan-300 font-bold shrink-0 w-20">{col}</code>
            <div>
              <div className="text-purple-300 font-medium">{meta.type}</div>
              <div className="text-slate-400">{meta.desc}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Raw Data Toggle */}
      <button
        onClick={() => setShowRaw(v => !v)}
        className="flex items-center gap-2 text-xs font-mono text-slate-300 hover:text-white transition-colors"
      >
        <Table className="h-4 w-4 text-cyan-400" />
        <span>{showRaw ? 'Hide' : 'Show'} Raw Data Table</span>
        {showRaw ? <ChevronUp className="h-3.5 w-3.5" /> : <ChevronDown className="h-3.5 w-3.5" />}
      </button>

      {showRaw && (
        <div className="overflow-x-auto rounded-xl border border-white/10 bg-navy-900/50">
          <table className="w-full text-xs font-mono text-left">
            <thead className="bg-navy-900 text-slate-400 border-b border-white/10">
              <tr>
                {['#', 'area (sqft)', 'bedrooms', 'age (yrs)', 'location', 'has_garage', 'price ($)'].map(h => (
                  <th key={h} className="py-2 px-3 whitespace-nowrap">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {DATASET.map(r => (
                <tr key={r.id} className="hover:bg-white/5 transition-colors text-slate-200">
                  <td className="py-2 px-3 text-slate-500">{r.id}</td>
                  <td className="py-2 px-3 text-cyan-300">{r.area.toLocaleString()}</td>
                  <td className="py-2 px-3">{r.bedrooms}</td>
                  <td className="py-2 px-3">{r.age}</td>
                  <td className="py-2 px-3 text-purple-300">{r.location}</td>
                  <td className="py-2 px-3">{r.has_garage ? '✓ Yes' : '✗ No'}</td>
                  <td className="py-2 px-3 text-emerald-300 font-bold">${r.price.toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Tab Selector */}
      <div className="flex gap-1 p-1 rounded-xl bg-navy-900/80 border border-white/10 w-fit">
        {(['stats', 'chart', 'categorical'] as const).map(tab => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-3 py-1.5 rounded-lg text-xs font-mono font-medium transition-colors capitalize ${
              activeTab === tab
                ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/30'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            {tab === 'stats' ? 'Descriptive Stats' : tab === 'chart' ? 'Histogram' : 'Categorical'}
          </button>
        ))}
      </div>

      {/* Numerical Column Selector */}
      {(activeTab === 'stats' || activeTab === 'chart') && (
        <div className="flex flex-wrap gap-2">
          <span className="text-xs text-slate-400 self-center">Numerical column:</span>
          {NUM_COLS.map(col => (
            <button
              key={col}
              onClick={() => setSelectedNum(col)}
              className={`px-3 py-1 rounded-lg text-xs font-mono border transition-colors ${
                selectedNum === col
                  ? 'bg-cyan-500/20 border-cyan-500/40 text-cyan-300'
                  : 'bg-navy-900 border-white/10 text-slate-400 hover:text-white'
              }`}
            >
              {col}
            </button>
          ))}
        </div>
      )}

      {/* Stats Tab */}
      {activeTab === 'stats' && (
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 font-mono">
          {[
            { label: 'Mean', val: numStats.mean.toFixed(selectedNum === 'price' ? 0 : 2), color: 'text-cyan-300' },
            { label: 'Median', val: numStats.median.toFixed(selectedNum === 'price' ? 0 : 2), color: 'text-purple-300' },
            { label: 'Min', val: numStats.min, color: 'text-blue-300' },
            { label: 'Max', val: numStats.max, color: 'text-rose-300' },
            { label: 'Range', val: numStats.range, color: 'text-amber-300' },
            { label: 'Std Dev', val: numStats.std.toFixed(selectedNum === 'price' ? 0 : 2), color: 'text-emerald-300' },
            { label: 'Variance', val: (numStats.std**2).toFixed(selectedNum === 'price' ? 0 : 2), color: 'text-pink-300' },
            { label: 'Count (n)', val: numStats.n, color: 'text-slate-300' },
          ].map(s => (
            <div key={s.label} className="p-3 rounded-xl bg-navy-900 border border-white/10">
              <div className="text-[10px] uppercase text-slate-400 font-bold">{s.label}</div>
              <div className={`text-lg font-bold mt-0.5 ${s.color}`}>
                {selectedNum === 'price' && ['Mean','Median','Min','Max','Range','Std Dev'].includes(s.label)
                  ? '$' + Number(s.val).toLocaleString()
                  : s.val}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Histogram Tab */}
      {activeTab === 'chart' && (
        <InteractiveChart
          type="bar"
          data={histData}
          xKey="range"
          series={[{ key: 'count', name: `Count of ${selectedNum}`, color: '#00f0ff' }]}
          height={240}
        />
      )}

      {/* Categorical Tab */}
      {activeTab === 'categorical' && (
        <div className="space-y-3">
          <div className="flex flex-wrap gap-2">
            <span className="text-xs text-slate-400 self-center">Categorical column:</span>
            {CAT_COLS.map(col => (
              <button
                key={col}
                onClick={() => setSelectedCat(col)}
                className={`px-3 py-1 rounded-lg text-xs font-mono border transition-colors ${
                  selectedCat === col
                    ? 'bg-purple-500/20 border-purple-500/40 text-purple-300'
                    : 'bg-navy-900 border-white/10 text-slate-400 hover:text-white'
                }`}
              >
                {col}
              </button>
            ))}
          </div>
          <InteractiveChart
            type="bar"
            data={catFreq.map(r => ({ label: String(r.label), count: r.count }))}
            xKey="label"
            series={[{ key: 'count', name: `Frequency of ${selectedCat}`, color: '#a855f7' }]}
            height={220}
          />
          <div className="text-xs text-slate-400 space-y-1">
            {catFreq.map(r => (
              <div key={String(r.label)} className="flex justify-between">
                <span className="text-purple-300">{String(r.label)}</span>
                <span>{r.count} rows ({((r.count/DATASET.length)*100).toFixed(0)}%)</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

