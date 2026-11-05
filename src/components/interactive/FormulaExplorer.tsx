'use client';

import React, { useState } from 'react';
import { MathFormula } from '@/lib/types';
import { Sigma, Sparkles, BookOpen } from 'lucide-react';

interface FormulaExplorerProps {
  formula: MathFormula;
}

export default function FormulaExplorer({ formula }: FormulaExplorerProps) {
  const [activeSymbolId, setActiveSymbolId] = useState<string | null>(
    formula.breakdown[0]?.id || null
  );

  const activeSymbol = formula.breakdown.find((b) => b.id === activeSymbolId);

  return (
    <div className="rounded-xl border border-electric-cyan/25 bg-navy-950/75 p-5 backdrop-blur-md shadow-glow">
      <div className="flex items-center justify-between mb-3 border-b border-white/10 pb-2">
        <div className="flex items-center gap-2">
          <Sigma className="h-4 w-4 text-cyan-400" />
          <h4 className="text-sm font-semibold text-white">{formula.title}</h4>
        </div>
        <span className="text-[11px] font-mono text-cyan-400 bg-cyan-950/50 px-2.5 py-0.5 rounded border border-cyan-500/20">
          Interactive Math Inspector
        </span>
      </div>

      {/* Main Formula Display */}
      <div className="py-4 my-2 text-center bg-navy-900/90 rounded-lg border border-white/10">
        <div className="text-2xl sm:text-3xl font-mono font-bold tracking-wider text-cyan-300 drop-shadow-[0_0_12px_rgba(0,240,255,0.4)]">
          {formula.plainText}
        </div>
        <p className="text-xs text-slate-400 mt-2 max-w-xl mx-auto px-4">
          {formula.explanation}
        </p>
      </div>

      {/* Interactive Symbol Chips */}
      <div className="mt-4">
        <div className="text-xs font-mono uppercase tracking-wider text-slate-400 mb-2">
          Select symbol to break down:
        </div>
        <div className="flex flex-wrap gap-2">
          {formula.breakdown.map((item) => {
            const isSelected = activeSymbolId === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveSymbolId(item.id)}
                className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-mono transition-all ${
                  isSelected
                    ? 'bg-electric-cyan/20 border-cyan-400 text-cyan-300 border shadow-glow scale-105'
                    : 'bg-navy-900 border border-white/10 text-slate-300 hover:border-white/30'
                }`}
              >
                <span className="font-bold text-white bg-white/10 px-1.5 py-0.5 rounded">
                  {item.symbol}
                </span>
                <span>{item.name}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Selected Term Deep-Dive */}
      {activeSymbol && (
        <div className="mt-4 p-3.5 rounded-lg bg-navy-900/90 border border-cyan-500/30 flex items-start gap-3 animate-fadeIn">
          <div className="flex h-8 w-8 items-center justify-center rounded bg-cyan-500/20 text-cyan-300 font-mono font-bold shrink-0">
            {activeSymbol.symbol}
          </div>
          <div>
            <div className="text-xs font-bold text-white mb-0.5">
              {activeSymbol.name} ({activeSymbol.symbol})
            </div>
            <div className="text-xs text-slate-300 leading-relaxed">
              {activeSymbol.description}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

