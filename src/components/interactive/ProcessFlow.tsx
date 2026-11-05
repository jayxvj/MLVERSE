'use client';

import React, { useState } from 'react';
import { Check, ChevronRight, Play } from 'lucide-react';

interface Step {
  id: string;
  stepNumber: number;
  title: string;
  description: string;
  codeHint?: string;
}

interface ProcessFlowProps {
  steps: Step[];
  title?: string;
}

export default function ProcessFlow({ steps, title = 'Step-by-Step Machine Learning Pipeline' }: ProcessFlowProps) {
  const [activeStepIndex, setActiveStepIndex] = useState(0);

  const currentStep = steps[activeStepIndex] || steps[0];

  return (
    <div className="rounded-xl border border-white/10 bg-navy-950/70 p-5 backdrop-blur-md">
      <div className="flex items-center justify-between mb-4">
        <h4 className="text-sm font-semibold text-white">{title}</h4>
        <span className="text-xs font-mono text-cyan-400">Step {activeStepIndex + 1} of {steps.length}</span>
      </div>

      {/* Step Indicators */}
      <div className="flex items-center justify-between gap-2 overflow-x-auto pb-3 mb-4">
        {steps.map((step, idx) => {
          const isCurrent = idx === activeStepIndex;
          const isDone = idx < activeStepIndex;
          return (
            <button
              key={step.id}
              onClick={() => setActiveStepIndex(idx)}
              className={`flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-medium border whitespace-nowrap transition-all ${
                isCurrent
                  ? 'border-cyan-400 bg-cyan-950/60 text-cyan-300 shadow-glow'
                  : isDone
                  ? 'border-emerald-500/40 bg-emerald-950/30 text-emerald-300'
                  : 'border-white/10 bg-navy-900/40 text-slate-400 hover:text-white'
              }`}
            >
              <span
                className={`flex h-5 w-5 items-center justify-center rounded-full text-[10px] font-bold ${
                  isDone
                    ? 'bg-emerald-500 text-black'
                    : isCurrent
                    ? 'bg-cyan-400 text-black'
                    : 'bg-white/10 text-slate-300'
                }`}
              >
                {isDone ? <Check className="h-3 w-3" /> : step.stepNumber}
              </span>
              <span>{step.title}</span>
            </button>
          );
        })}
      </div>

      {/* Active Step Panel */}
      {currentStep && (
        <div className="rounded-lg bg-navy-900/80 p-4 border border-white/10">
          <div className="flex items-center gap-2 text-cyan-400 text-xs font-mono font-bold mb-1">
            <Play className="h-3.5 w-3.5" />
            <span>PHASE {currentStep.stepNumber}: {currentStep.title}</span>
          </div>
          <p className="text-sm text-slate-200 leading-relaxed mb-3">
            {currentStep.description}
          </p>

          {currentStep.codeHint && (
            <div className="mt-2 p-2.5 rounded bg-black/60 border border-white/10 font-mono text-xs text-emerald-400 overflow-x-auto">
              <code>{currentStep.codeHint}</code>
            </div>
          )}

          <div className="flex justify-between items-center mt-4 pt-3 border-t border-white/10 text-xs">
            <button
              disabled={activeStepIndex === 0}
              onClick={() => setActiveStepIndex(Math.max(0, activeStepIndex - 1))}
              className="px-3 py-1.5 rounded border border-white/10 text-slate-300 disabled:opacity-30 hover:bg-white/5"
            >
              Previous Phase
            </button>

            <button
              disabled={activeStepIndex === steps.length - 1}
              onClick={() => setActiveStepIndex(Math.min(steps.length - 1, activeStepIndex + 1))}
              className="px-3 py-1.5 rounded bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 disabled:opacity-30 hover:bg-cyan-500/30 flex items-center gap-1"
            >
              <span>Next Phase</span>
              <ChevronRight className="h-3.5 w-3.5" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

