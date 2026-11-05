'use client';

import React, { useState, useMemo } from 'react';
import { AlertCircle, Sliders, Eye } from 'lucide-react';

// Extended house-price dataset with deliberate missing values
const RAW_DATA: Record<string, string | number | null>[] = [
  { id: 1, area: 1200, bedrooms: 2,    age: 15, location: 'Suburban', price: 245000 },
  { id: 2, area: 1850, bedrooms: 3,    age: null, location: 'Urban',  price: 385000 },
  { id: 3, area: null, bedrooms: 1,    age: 30, location: 'Rural',    price: 128000 },
  { id: 4, area: 2400, bedrooms: null, age: 3,  location: 'Urban',    price: 520000 },
  { id: 5, area: 1100, bedrooms: 2,    age: 22, location: null,       price: 215000 },
  { id: 6, area: 3200, bedrooms: 5,    age: 1,  location: 'Urban',    price: null   },
  { id: 7, area: 1500, bedrooms: 3,    age: null, location: 'Suburban', price: 310000 },
  { id: 8, area: null, bedrooms: 1,    age: 45, location: 'Rural',    price: 95000  },
  { id: 9, area: 2100, bedrooms: 4,    age: 5,  location: 'Suburban', price: 450000 },
  { id: 10, area: 1700, bedrooms: 3,   age: 18, location: 'Urban',    price: null   },
  { id: 11, area: 980,  bedrooms: null, age: 10, location: 'Rural',   price: 175000 },
  { id: 12, area: 2800, bedrooms: 4,   age: null, location: 'Urban',  price: 620000 },
];

const COLUMNS = ['area', 'bedrooms', 'age', 'location', 'price'] as const;
type Col = typeof COLUMNS[number];

type Strategy = 'drop' | 'mean' | 'median' | 'mode' | 'constant';

export default function MissingValueExplorer() {
  const [strategy, setStrategy] = useState<Strategy>('drop');
  const [highlighted, setHighlighted] = useState<Col | 'all'>('all');

  const missingStats = useMemo(() => {
    return COLUMNS.map(col => {
      const missing = RAW_DATA.filter(r => r[col] === null).length;
      return { col, missing, pct: ((missing / RAW_DATA.length) * 100).toFixed(0) };
    });
  }, []);

  const imputedData = useMemo(() => {
    if (strategy === 'drop') {
      return RAW_DATA.filter(r => COLUMNS.every(c => r[c] !== null));
    }

    // Compute imputation values for numeric cols
    const numCols: Col[] = ['area', 'bedrooms', 'age', 'price'];
    const impValues: Record<Col, number | string> = {} as any;
    numCols.forEach(col => {
      const vals = RAW_DATA.filter(r => r[col] !== null).map(r => r[col] as number).sort((a,b) => a-b);
      const n = vals.length;
      const mean = vals.reduce((s,v) => s+v, 0) / n;
      const median = n % 2 === 0 ? (vals[n/2-1]+vals[n/2])/2 : vals[Math.floor(n/2)];
      impValues[col] = strategy === 'mean' ? Math.round(mean)
        : strategy === 'median' ? median
        : strategy === 'constant' ? (col === 'price' ? 0 : -1)
        : Math.round(mean); // mode fallback to mean for numeric
    });
    impValues['location'] = strategy === 'mode' || strategy === 'constant' ? 'Suburban' : 'Unknown';

    return RAW_DATA.map(r => {
      const out: Record<string, string | number | null> = { ...r };
      COLUMNS.forEach(col => {
        if (r[col] === null) out[col] = impValues[col];
      });
      return out;
    });
  }, [strategy]);

  const isNull = (v: string | number | null) => v === null;
  const isMissing = (row: Record<string, string | number | null>, col: Col) => RAW_DATA.find(r => r.id === row.id)?.[col] === null;

  return (
    <div className="rounded-2xl border border-electric-cyan/30 bg-navy-950/85 p-5 backdrop-blur-md shadow-glow">
      <div className="flex items-center gap-2 text-xs font-mono text-cyan-400 mb-1">
        <AlertCircle className="h-4 w-4" />
        <span>MISSING VALUE EXPLORER</span>
      </div>
      <h3 className="text-lg font-bold text-white mb-1">Detect & Handle Missing Data</h3>
      <p className="text-xs text-slate-300 mb-4">
        Real-world data always has gaps. Choose an imputation strategy and see how it fills the blanks.
      </p>

      {/* Missing % Summary */}
      <div className="grid grid-cols-5 gap-2 mb-5">
        {missingStats.map(m => (
          <div
            key={m.col}
            onClick={() => setHighlighted(highlighted === m.col ? 'all' : m.col)}
            className={`p-2.5 rounded-xl border text-center text-xs font-mono cursor-pointer transition-all ${
              highlighted === m.col
                ? 'border-rose-400 bg-rose-950/40 text-rose-300'
                : 'border-white/10 bg-navy-900/60 text-slate-300 hover:bg-navy-900'
            }`}
          >
            <div className="font-bold text-white">{m.col}</div>
            <div className={`text-lg font-bold mt-0.5 ${Number(m.pct) > 0 ? 'text-rose-400' : 'text-emerald-400'}`}>
              {m.pct}%
            </div>
            <div className="text-[10px] text-slate-400">{m.missing} missing</div>
          </div>
        ))}
      </div>

      {/* Strategy Selector */}
      <div className="flex flex-wrap gap-2 mb-4">
        <span className="text-xs text-slate-400 self-center font-mono">Handling strategy:</span>
        {(['drop', 'mean', 'median', 'mode', 'constant'] as Strategy[]).map(s => (
          <button
            key={s}
            onClick={() => setStrategy(s)}
            className={`px-3 py-1.5 rounded-lg text-xs font-mono border transition-colors ${
              strategy === s
                ? 'bg-cyan-500/20 border-cyan-500/40 text-cyan-300'
                : 'bg-navy-900 border-white/10 text-slate-400 hover:text-white'
            }`}
          >
            {s === 'drop' ? 'Drop Rows' : s === 'mean' ? 'Fill Mean' : s === 'median' ? 'Fill Median' : s === 'mode' ? 'Fill Mode' : 'Fill Constant'}
          </button>
        ))}
      </div>

      {/* Strategy Explanation */}
      <div className="p-3 rounded-xl bg-navy-900/60 border border-white/10 text-xs text-slate-300 mb-4">
        {strategy === 'drop' && <><strong className="text-rose-300">Drop Rows:</strong> Remove any row that has at least one missing value. Simple but wasteful — you lose {RAW_DATA.length - imputedData.length} of {RAW_DATA.length} rows ({Math.round((RAW_DATA.length - imputedData.length)/RAW_DATA.length*100)}% of data)!</>}
        {strategy === 'mean' && <><strong className="text-cyan-300">Mean Imputation:</strong> Replace missing numeric values with the column's arithmetic mean. Fast but shrinks variance and distorts distributions.</>}
        {strategy === 'median' && <><strong className="text-purple-300">Median Imputation:</strong> Replace missing values with the column median. More robust than mean when the column has outliers.</>}
        {strategy === 'mode' && <><strong className="text-amber-300">Mode Imputation:</strong> Fill with the most frequent value. Best for categorical columns like <code>location</code>.</>}
        {strategy === 'constant' && <><strong className="text-emerald-300">Constant Fill:</strong> Replace with a fixed sentinel value (-1, 0, or "Unknown"). Clear but can confuse models that treat sentinels as real values.</>}
      </div>

      {/* Data Table */}
      <div className="overflow-x-auto rounded-xl border border-white/10 bg-navy-900/50 text-xs font-mono">
        <table className="w-full text-left">
          <thead className="bg-navy-900 text-slate-400 border-b border-white/10">
            <tr>
              <th className="py-2 px-3">#</th>
              {COLUMNS.map(c => (
                <th key={c} className="py-2 px-3 whitespace-nowrap">{c}</th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            {imputedData.slice(0, 8).map(row => (
              <tr key={String(row.id)} className="hover:bg-white/5">
                <td className="py-2 px-3 text-slate-500">{row.id}</td>
                {COLUMNS.map(col => {
                  const wasMissing = isMissing(row, col);
                  const isNow = strategy !== 'drop' && wasMissing;
                  return (
                    <td key={col} className={`py-2 px-3 ${isNow ? 'text-amber-300 font-bold' : 'text-slate-200'}`}>
                      {wasMissing && strategy === 'drop' ? '—' : String(row[col] ?? 'null')}
                      {isNow ? ' ★' : ''}
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
        <div className="px-3 py-2 text-[10px] text-slate-500">
          ★ = imputed value (was originally missing) &nbsp;|&nbsp; Showing first 8 rows of {imputedData.length}
        </div>
      </div>
    </div>
  );
}

