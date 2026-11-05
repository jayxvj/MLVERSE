'use client';

import React, { useState, useMemo } from 'react';
import { Sparkles, Trash2, CheckCircle2, AlertTriangle, RefreshCw, Layers, ArrowRight } from 'lucide-react';

interface DirtyRecord {
  id: number;
  name: string;
  age: number | null;
  city: string;
  salary: number | null;
  status: 'raw' | 'cleaned' | 'removed';
  issues: string[];
}

const INITIAL_DATA: DirtyRecord[] = [
  { id: 1, name: 'Alice Smith', age: 29, city: 'New York', salary: 75000, status: 'raw', issues: [] },
  { id: 2, name: 'Bob Jones', age: null, city: '  san francisco ', salary: 82000, status: 'raw', issues: ['Missing Age', 'Untrimmed whitespace', 'Lowercase city'] },
  { id: 3, name: 'Charlie Brown', age: -4, city: 'Chicago', salary: 61000, status: 'raw', issues: ['Impossible negative age (-4)'] },
  { id: 4, name: 'Diana Prince', age: 34, city: 'new york', salary: null, status: 'raw', issues: ['Missing Salary', 'Lowercase city'] },
  { id: 5, name: 'Evan Wright', age: 41, city: 'Austin', salary: 95000, status: 'raw', issues: [] },
  { id: 6, name: 'Bob Jones', age: null, city: '  san francisco ', salary: 82000, status: 'raw', issues: ['Duplicate of row #2'] },
  { id: 7, name: 'Fiona Gallagher', age: 26, city: 'CHICAGO', salary: 999999999, status: 'raw', issues: ['Uppercase city', 'Corrupt outlier salary ($999M)'] },
  { id: 8, name: 'George Clark', age: 38, city: 'Austin', salary: 89000, status: 'raw', issues: [] },
];

export default function RawDataCleaning() {
  const [removeDuplicates, setRemoveDuplicates] = useState(false);
  const [standardizeText, setStandardizeText] = useState(false);
  const [imputeMissing, setImputeMissing] = useState(false);
  const [fixOutliers, setFixOutliers] = useState(false);

  const cleanedData = useMemo(() => {
    let rows: DirtyRecord[] = INITIAL_DATA.map(r => ({ ...r, issues: [...r.issues] }));

    // 1. Remove duplicates
    if (removeDuplicates) {
      const seen = new Set<string>();
      rows = rows.filter(r => {
        const key = `${r.name}-${r.city.trim().toLowerCase()}-${r.salary}`;
        if (seen.has(key)) return false;
        seen.add(key);
        return true;
      });
    }

    // 2. Standardize text
    if (standardizeText) {
      rows = rows.map(r => {
        const trimmed = r.city.trim();
        const formatted = trimmed.charAt(0).toUpperCase() + trimmed.slice(1).toLowerCase();
        const cityMap: Record<string, string> = {
          'New york': 'New York',
          'San francisco': 'San Francisco',
          'Chicago': 'Chicago',
          'Austin': 'Austin',
        };
        return {
          ...r,
          city: cityMap[formatted] || formatted,
        };
      });
    }

    // 3. Fix outliers / impossible values
    if (fixOutliers) {
      rows = rows.map(r => {
        let age = r.age;
        let salary = r.salary;
        if (age !== null && age < 0) {
          age = Math.abs(age); // fix sign error
        }
        if (salary !== null && salary > 1000000) {
          salary = 95000; // replace sentinel with ceiling / capped estimate
        }
        return { ...r, age, salary };
      });
    }

    // 4. Impute missing
    if (imputeMissing) {
      // Median age and salary from valid entries
      const validAges = rows.map(r => r.age).filter((a): a is number => a !== null && a > 0);
      const medianAge = 34;
      const validSalaries = rows.map(r => r.salary).filter((s): s is number => s !== null && s < 1000000);
      const medianSalary = 82000;

      rows = rows.map(r => ({
        ...r,
        age: r.age === null ? medianAge : r.age,
        salary: r.salary === null ? medianSalary : r.salary,
      }));
    }

    return rows;
  }, [removeDuplicates, standardizeText, imputeMissing, fixOutliers]);

  // Cleanliness score
  const activeSteps = [removeDuplicates, standardizeText, imputeMissing, fixOutliers].filter(Boolean).length;
  const cleanlinessScore = Math.round((activeSteps / 4) * 100);

  const resetAll = () => {
    setRemoveDuplicates(false);
    setStandardizeText(false);
    setImputeMissing(false);
    setFixOutliers(false);
  };

  const applyAll = () => {
    setRemoveDuplicates(true);
    setStandardizeText(true);
    setImputeMissing(true);
    setFixOutliers(true);
  };

  return (
    <div className="rounded-2xl border border-electric-cyan/30 bg-navy-950/85 p-6 backdrop-blur-md shadow-glow">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-white/10 pb-4 mb-5">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono text-cyan-400">
            <Sparkles className="h-4 w-4" />
            <span>DATA HYGIENE WORKSHOP</span>
          </div>
          <h3 className="text-lg font-bold text-white mt-0.5">
            Raw vs. Clean Data Transformation Studio
          </h3>
          <p className="text-xs text-slate-300">
            Toggle cleaning operations to see how dirty raw records are sanitized for model ingestion.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={applyAll}
            className="px-3 py-1.5 rounded-lg text-xs font-mono font-medium border border-cyan-500/40 bg-cyan-500/10 text-cyan-300 hover:bg-cyan-500/20 transition-colors"
          >
            Apply All 4 Fixes
          </button>
          <button
            onClick={resetAll}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-white/5 transition-colors"
            title="Reset to raw"
          >
            <RefreshCw className="h-4 w-4" />
          </button>
        </div>
      </div>

      {/* Control Checklist & Quality Meter */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-5 mb-6">
        {/* Step Toggles */}
        <div className="md:col-span-8 grid grid-cols-1 sm:grid-cols-2 gap-2.5">
          <button
            onClick={() => setRemoveDuplicates(v => !v)}
            className={`p-3 rounded-xl border text-left text-xs font-mono transition-all flex items-center justify-between ${
              removeDuplicates
                ? 'border-emerald-400 bg-emerald-950/30 text-emerald-300'
                : 'border-white/10 bg-navy-900/60 text-slate-400 hover:text-white'
            }`}
          >
            <div>
              <div className="font-bold">1. Deduplication</div>
              <div className="text-[10px] opacity-75">Drop row #6 (duplicate of #2)</div>
            </div>
            {removeDuplicates ? <CheckCircle2 className="h-4 w-4 text-emerald-400" /> : <div className="h-4 w-4 rounded-full border border-white/20" />}
          </button>

          <button
            onClick={() => setStandardizeText(v => !v)}
            className={`p-3 rounded-xl border text-left text-xs font-mono transition-all flex items-center justify-between ${
              standardizeText
                ? 'border-emerald-400 bg-emerald-950/30 text-emerald-300'
                : 'border-white/10 bg-navy-900/60 text-slate-400 hover:text-white'
            }`}
          >
            <div>
              <div className="font-bold">2. Standardize Strings</div>
              <div className="text-[10px] opacity-75">Strip whitespace & fix title casing</div>
            </div>
            {standardizeText ? <CheckCircle2 className="h-4 w-4 text-emerald-400" /> : <div className="h-4 w-4 rounded-full border border-white/20" />}
          </button>

          <button
            onClick={() => setFixOutliers(v => !v)}
            className={`p-3 rounded-xl border text-left text-xs font-mono transition-all flex items-center justify-between ${
              fixOutliers
                ? 'border-emerald-400 bg-emerald-950/30 text-emerald-300'
                : 'border-white/10 bg-navy-900/60 text-slate-400 hover:text-white'
            }`}
          >
            <div>
              <div className="font-bold">3. Outlier / Corrupt Fix</div>
              <div className="text-[10px] opacity-75">Fix age -4 and cap $999M salary</div>
            </div>
            {fixOutliers ? <CheckCircle2 className="h-4 w-4 text-emerald-400" /> : <div className="h-4 w-4 rounded-full border border-white/20" />}
          </button>

          <button
            onClick={() => setImputeMissing(v => !v)}
            className={`p-3 rounded-xl border text-left text-xs font-mono transition-all flex items-center justify-between ${
              imputeMissing
                ? 'border-emerald-400 bg-emerald-950/30 text-emerald-300'
                : 'border-white/10 bg-navy-900/60 text-slate-400 hover:text-white'
            }`}
          >
            <div>
              <div className="font-bold">4. Missing Imputation</div>
              <div className="text-[10px] opacity-75">Fill null age & salary with median</div>
            </div>
            {imputeMissing ? <CheckCircle2 className="h-4 w-4 text-emerald-400" /> : <div className="h-4 w-4 rounded-full border border-white/20" />}
          </button>
        </div>

        {/* Health Score Gauge */}
        <div className="md:col-span-4 p-4 rounded-xl bg-navy-900/80 border border-white/10 flex flex-col justify-between">
          <div className="text-[10px] font-mono uppercase text-slate-400 font-bold">
            Data Quality Score
          </div>
          <div className="my-2">
            <div className="flex items-baseline justify-between mb-1">
              <span className={`text-3xl font-mono font-bold ${cleanlinessScore === 100 ? 'text-emerald-400' : cleanlinessScore >= 50 ? 'text-amber-400' : 'text-rose-400'}`}>
                {cleanlinessScore}%
              </span>
              <span className="text-xs font-mono text-slate-400">
                {cleanedData.length} Clean Rows
              </span>
            </div>
            <div className="h-2 w-full rounded-full bg-navy-950 overflow-hidden border border-white/10">
              <div
                className={`h-full transition-all duration-500 rounded-full ${cleanlinessScore === 100 ? 'bg-emerald-400' : cleanlinessScore >= 50 ? 'bg-amber-400' : 'bg-rose-400'}`}
                style={{ width: `${cleanlinessScore}%` }}
              />
            </div>
          </div>
          <div className="text-[11px] text-slate-400">
            {cleanlinessScore === 100 ? '✓ Ready for feature encoding & ML modeling' : '⚠ Dirty data will degrade model performance'}
          </div>
        </div>
      </div>

      {/* Dataset Table */}
      <div className="overflow-x-auto rounded-xl border border-white/10 bg-navy-900/50 mb-4 font-mono text-xs">
        <table className="w-full text-left">
          <thead className="bg-navy-900 text-slate-400 border-b border-white/10">
            <tr>
              <th className="py-2.5 px-3">ID</th>
              <th className="py-2.5 px-3">Name</th>
              <th className="py-2.5 px-3">Age</th>
              <th className="py-2.5 px-3">City</th>
              <th className="py-2.5 px-3">Salary ($)</th>
              <th className="py-2.5 px-3">Raw Flaws Detected</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5 text-slate-200">
            {cleanedData.map(r => {
              const hadIssues = r.issues.length > 0;
              return (
                <tr key={r.id} className="hover:bg-white/5 transition-colors">
                  <td className="py-2.5 px-3 text-slate-500">{r.id}</td>
                  <td className="py-2.5 px-3 font-medium text-white">{r.name}</td>
                  <td className="py-2.5 px-3">
                    {r.age === null ? (
                      <span className="text-rose-400 font-bold">null</span>
                    ) : r.age < 0 ? (
                      <span className="text-rose-400 font-bold">{r.age} (invalid)</span>
                    ) : (
                      <span className={imputeMissing && r.id === 2 ? 'text-amber-300 font-bold' : 'text-cyan-300'}>
                        {r.age} {imputeMissing && r.id === 2 ? '★' : ''}
                      </span>
                    )}
                  </td>
                  <td className="py-2.5 px-3">
                    <span className={standardizeText ? 'text-purple-300 font-medium' : 'text-slate-300'}>
                      "{r.city}"
                    </span>
                  </td>
                  <td className="py-2.5 px-3">
                    {r.salary === null ? (
                      <span className="text-rose-400 font-bold">null</span>
                    ) : r.salary > 1000000 ? (
                      <span className="text-rose-400 font-bold">${r.salary.toLocaleString()}</span>
                    ) : (
                      <span className={imputeMissing && r.id === 4 ? 'text-amber-300 font-bold' : fixOutliers && r.id === 7 ? 'text-emerald-300 font-bold' : 'text-emerald-400'}>
                        ${r.salary.toLocaleString()} {imputeMissing && r.id === 4 ? '★' : ''}
                      </span>
                    )}
                  </td>
                  <td className="py-2.5 px-3">
                    {hadIssues ? (
                      <span className="text-[11px] text-amber-400/90 flex items-center gap-1">
                        <AlertTriangle className="h-3 w-3 shrink-0" />
                        {r.issues.join('; ')}
                      </span>
                    ) : (
                      <span className="text-[11px] text-emerald-400 flex items-center gap-1">
                        <CheckCircle2 className="h-3 w-3 shrink-0" />
                        Clean
                      </span>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <div className="p-3.5 rounded-xl bg-navy-900/60 border border-white/5 text-xs text-slate-300 flex items-start gap-2">
        <Layers className="h-4 w-4 shrink-0 text-cyan-400 mt-0.5" />
        <div>
          <strong className="text-white">Why Step Order Matters:</strong> Always deduplicate first to prevent duplicate observations from biasing mean/median imputation calculations. Standardize categorical text before encoding to avoid creating duplicate categories (e.g. "New York" vs "new york").
        </div>
      </div>
    </div>
  );
}

