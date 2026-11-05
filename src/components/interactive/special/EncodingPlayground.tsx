'use client';

import React, { useState, useMemo } from 'react';
import { Binary, Sliders, AlertTriangle, CheckCircle2, Info, ArrowRight } from 'lucide-react';

interface EmployeeRecord {
  id: number;
  name: string;
  education: 'High School' | 'Bachelor' | 'Master' | 'PhD'; // Ordinal
  city: 'Paris' | 'Tokyo' | 'London' | 'New York'; // Nominal
  experience_yrs: number;
}

const SAMPLE_RECORDS: EmployeeRecord[] = [
  { id: 1, name: 'Alice', education: 'Bachelor', city: 'Paris', experience_yrs: 3 },
  { id: 2, name: 'Kenji', education: 'PhD', city: 'Tokyo', experience_yrs: 7 },
  { id: 3, name: 'Emma', education: 'Master', city: 'London', experience_yrs: 5 },
  { id: 4, name: 'David', education: 'High School', city: 'New York', experience_yrs: 2 },
  { id: 5, name: 'Sophie', education: 'Bachelor', city: 'Paris', experience_yrs: 4 },
];

type TargetCol = 'city' | 'education';
type EncodingType = 'one-hot' | 'ordinal' | 'label';

export default function EncodingPlayground() {
  const [selectedCol, setSelectedCol] = useState<TargetCol>('city');
  const [encodingType, setEncodingType] = useState<EncodingType>('one-hot');

  // Ordinal hierarchy definitions
  const ordinalMap: Record<string, number> = {
    'High School': 0,
    'Bachelor': 1,
    'Master': 2,
    'PhD': 3,
  };

  // Label encoding map (alphabetical or arbitrary)
  const labelMapCity: Record<string, number> = {
    'London': 0,
    'New York': 1,
    'Paris': 2,
    'Tokyo': 3,
  };

  const labelMapEdu: Record<string, number> = {
    'Bachelor': 0,
    'High School': 1,
    'Master': 2,
    'PhD': 3,
  };

  // Unique levels
  const cities = ['London', 'New York', 'Paris', 'Tokyo'];
  const edus = ['High School', 'Bachelor', 'Master', 'PhD'];

  const encodedOutput = useMemo(() => {
    return SAMPLE_RECORDS.map(r => {
      if (selectedCol === 'city') {
        const val = r.city;
        if (encodingType === 'label') {
          return { id: r.id, name: r.name, raw: val, encoded: { city_code: labelMapCity[val] } };
        } else if (encodingType === 'ordinal') {
          // Warning: city has no true ordinal order!
          return { id: r.id, name: r.name, raw: val, encoded: { city_rank: labelMapCity[val] } };
        } else {
          // One-Hot
          const ohe: Record<string, number> = {};
          cities.forEach(c => {
            ohe[`is_${c.toLowerCase().replace(' ', '_')}`] = val === c ? 1 : 0;
          });
          return { id: r.id, name: r.name, raw: val, encoded: ohe };
        }
      } else {
        const val = r.education;
        if (encodingType === 'label') {
          return { id: r.id, name: r.name, raw: val, encoded: { edu_label: labelMapEdu[val] } };
        } else if (encodingType === 'ordinal') {
          return { id: r.id, name: r.name, raw: val, encoded: { edu_rank: ordinalMap[val] } };
        } else {
          // One-Hot
          const ohe: Record<string, number> = {};
          edus.forEach(e => {
            ohe[`is_${e.toLowerCase().replace(' ', '_')}`] = val === e ? 1 : 0;
          });
          return { id: r.id, name: r.name, raw: val, encoded: ohe };
        }
      }
    });
  }, [selectedCol, encodingType]);

  // Assessment of choice
  const evaluation = useMemo(() => {
    if (selectedCol === 'city') {
      if (encodingType === 'one-hot') {
        return {
          verdict: 'IDEAL CHOICE (BEST PRACTICE)',
          color: 'text-emerald-400 border-emerald-500/30 bg-emerald-950/20',
          explanation: 'City is a NOMINAL category (no inherent mathematical order). One-Hot Encoding creates orthogonal binary vectors where every city is equidistant from every other city.',
        };
      } else {
        return {
          verdict: 'POTENTIALLY HARMFUL ARTIFACT',
          color: 'text-rose-400 border-rose-500/30 bg-rose-950/20',
          explanation: `Assigning numbers (London=0, New York=1, Paris=2, Tokyo=3) falsely informs a linear or distance model that Tokyo is "3 times larger" than London, and Paris is the "average" of London and Tokyo!`,
        };
      }
    } else {
      // education
      if (encodingType === 'ordinal') {
        return {
          verdict: 'IDEAL CHOICE (BEST PRACTICE)',
          color: 'text-emerald-400 border-emerald-500/30 bg-emerald-950/20',
          explanation: 'Education is an ORDINAL category (High School < Bachelor < Master < PhD). Ordinal Encoding preserves the true domain progression in a single compact column.',
        };
      } else if (encodingType === 'one-hot') {
        return {
          verdict: 'ACCEPTABLE BUT DISCARDS ORDER',
          color: 'text-amber-400 border-amber-500/30 bg-amber-950/20',
          explanation: 'One-hot encoding works without introducing false assumptions, but it discards the natural hierarchy that PhD > Bachelor and increases dimensionality.',
        };
      } else {
        return {
          verdict: 'CAUTION: ARBITRARY ALPHABETICAL LABELS',
          color: 'text-rose-400 border-rose-500/30 bg-rose-950/20',
          explanation: 'LabelEncoder sorts alphabetically: Bachelor=0, High School=1, Master=2, PhD=3. It incorrectly claims High School > Bachelor!',
        };
      }
    }
  }, [selectedCol, encodingType]);

  const encodedCols = Object.keys(encodedOutput[0].encoded);

  return (
    <div className="rounded-2xl border border-electric-cyan/30 bg-navy-950/85 p-6 backdrop-blur-md shadow-glow">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-white/10 pb-4 mb-5">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono text-cyan-400">
            <Binary className="h-4 w-4" />
            <span>CATEGORICAL VECTORIZATION LAB</span>
          </div>
          <h3 className="text-lg font-bold text-white mt-0.5">
            The Categorical Encoding Playground
          </h3>
          <p className="text-xs text-slate-300">
            Compare One-Hot, Ordinal, and Label encoding on Nominal vs. Ordinal features.
          </p>
        </div>
      </div>

      {/* Selectors Bar */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-5">
        {/* Feature Selector */}
        <div className="p-3.5 rounded-xl bg-navy-900/80 border border-white/10">
          <span className="text-xs font-mono font-bold text-slate-300 block mb-2">
            1. Target Feature to Encode:
          </span>
          <div className="grid grid-cols-2 gap-2">
            <button
              onClick={() => setSelectedCol('city')}
              className={`p-2 rounded-lg text-xs font-mono text-left transition-all ${
                selectedCol === 'city'
                  ? 'border border-cyan-400 bg-cyan-950/40 text-cyan-300'
                  : 'border border-white/10 bg-navy-950 text-slate-400 hover:text-white'
              }`}
            >
              <div className="font-bold">city</div>
              <div className="text-[10px] opacity-75">Nominal (Unordered)</div>
            </button>

            <button
              onClick={() => setSelectedCol('education')}
              className={`p-2 rounded-lg text-xs font-mono text-left transition-all ${
                selectedCol === 'education'
                  ? 'border border-purple-400 bg-purple-950/40 text-purple-300'
                  : 'border border-white/10 bg-navy-950 text-slate-400 hover:text-white'
              }`}
            >
              <div className="font-bold">education</div>
              <div className="text-[10px] opacity-75">Ordinal (Ranked)</div>
            </button>
          </div>
        </div>

        {/* Encoding Strategy */}
        <div className="p-3.5 rounded-xl bg-navy-900/80 border border-white/10">
          <span className="text-xs font-mono font-bold text-slate-300 block mb-2">
            2. Choose Encoding Method:
          </span>
          <div className="grid grid-cols-3 gap-2">
            <button
              onClick={() => setEncodingType('one-hot')}
              className={`p-2 rounded-lg text-xs font-mono text-center transition-all ${
                encodingType === 'one-hot'
                  ? 'border border-cyan-400 bg-cyan-500/20 text-cyan-300'
                  : 'border border-white/10 bg-navy-950 text-slate-400 hover:text-white'
              }`}
            >
              <div className="font-bold">One-Hot</div>
              <div className="text-[9px] opacity-75">K Dummy Cols</div>
            </button>

            <button
              onClick={() => setEncodingType('ordinal')}
              className={`p-2 rounded-lg text-xs font-mono text-center transition-all ${
                encodingType === 'ordinal'
                  ? 'border border-purple-400 bg-purple-500/20 text-purple-300'
                  : 'border border-white/10 bg-navy-950 text-slate-400 hover:text-white'
              }`}
            >
              <div className="font-bold">Ordinal</div>
              <div className="text-[9px] opacity-75">Domain Hierarchy</div>
            </button>

            <button
              onClick={() => setEncodingType('label')}
              className={`p-2 rounded-lg text-xs font-mono text-center transition-all ${
                encodingType === 'label'
                  ? 'border border-amber-400 bg-amber-500/20 text-amber-300'
                  : 'border border-white/10 bg-navy-950 text-slate-400 hover:text-white'
              }`}
            >
              <div className="font-bold">LabelEncoder</div>
              <div className="text-[9px] opacity-75">Arbitrary Integers</div>
            </button>
          </div>
        </div>
      </div>

      {/* Transformation Output Matrix */}
      <div className="overflow-x-auto rounded-xl border border-white/10 bg-navy-900/50 mb-4 font-mono text-xs">
        <table className="w-full text-left">
          <thead className="bg-navy-900 text-slate-400 border-b border-white/10">
            <tr>
              <th className="py-2.5 px-3">Name</th>
              <th className="py-2.5 px-3 text-slate-300">Raw Value</th>
              <th className="py-2.5 px-3 text-slate-400">→</th>
              {encodedCols.map(col => (
                <th key={col} className="py-2.5 px-3 text-cyan-300 whitespace-nowrap">
                  {col}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5 text-slate-200">
            {encodedOutput.map(r => (
              <tr key={r.id} className="hover:bg-white/5 transition-colors">
                <td className="py-2.5 px-3 text-slate-400">{r.name}</td>
                <td className="py-2.5 px-3 font-bold text-white">{r.raw}</td>
                <td className="py-2.5 px-3 text-slate-500">→</td>
                {encodedCols.map(col => {
                  const val = r.encoded[col];
                  return (
                    <td key={col} className="py-2.5 px-3 font-bold text-cyan-300">
                      {val}
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Evaluation Diagnostic Banner */}
      <div className={`p-4 rounded-xl border ${evaluation.color} space-y-1.5`}>
        <div className="flex items-center gap-2 font-mono font-bold text-xs uppercase tracking-wide">
          {evaluation.verdict.includes('IDEAL') ? (
            <CheckCircle2 className="h-4 w-4 text-emerald-400" />
          ) : (
            <AlertTriangle className="h-4 w-4 text-rose-400" />
          )}
          <span>Architectural Verdict: {evaluation.verdict}</span>
        </div>
        <p className="text-xs text-slate-200 leading-relaxed">
          {evaluation.explanation}
        </p>
      </div>
    </div>
  );
}

