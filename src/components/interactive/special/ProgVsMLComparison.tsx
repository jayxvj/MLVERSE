'use client';

import React, { useState } from 'react';
import { ArrowRight, Code2, Cpu, CheckCircle2, AlertTriangle, Sparkles, RefreshCw } from 'lucide-react';

interface Scenario {
  id: string;
  title: string;
  dataInput: string;
  tradRule: string;
  tradOutput: string;
  tradFailureCase: string;
  mlDataset: string;
  mlLearnedParams: string;
  mlOutput: string;
  mlStrength: string;
}

const SCENARIOS: Scenario[] = [
  {
    id: 'spam',
    title: 'Spam Detection',
    dataInput: 'Email: "CONGRATS! You won a fr3e luxury watch! Click wire link"',
    tradRule: 'if "free" in text and "money" in text: return SPAM',
    tradOutput: 'HAM (False Negative! Rule bypassed because spammer wrote "fr3e")',
    tradFailureCase: 'Human programmer must manually add thousands of spelling permutations ("fr3e", "f-r-e-e", "f_r_e_e").',
    mlDataset: '100,000 labeled emails converted to n-gram token probability vectors.',
    mlLearnedParams: 'Weights θ: P("fr3e"|Spam)=0.94, P("wire"|Spam)=0.97, Bias b=-0.12',
    mlOutput: 'SPAM (98.4% Confidence! Successfully caught subtle probabilistic signal)',
    mlStrength: 'Generalizes seamlessly to typos, synonyms, and novel obfuscation tactics without manual code changes.',
  },
  {
    id: 'pricing',
    title: 'House Price Estimation',
    dataInput: 'Property: 1,850 sqft, 3 bedrooms, built 2018, suburban district',
    tradRule: 'price = area * 200 + bedrooms * 10000',
    tradOutput: '$400,000 (Crude estimate ignoring market trends, age, location)',
    tradFailureCase: 'Hardcoded formulas cannot adjust for inflation, interest rates, or neighborhood desirability.',
    mlDataset: '10 years of regional sales transactions with 25 distinct environmental features.',
    mlLearnedParams: 'Linear Hyperplane: ŷ = 182.4*area + 15200*beds - 850*age + 48000',
    mlOutput: '$434,200 (Accurate, market-calibrated valuation with high R² fit)',
    mlStrength: 'Discovers non-obvious multi-variable interactions directly from real transaction data.',
  },
  {
    id: 'vision',
    title: 'Handwritten Digit Recognition',
    dataInput: 'Input: 28x28 grayscale pixel grid showing a hand-drawn "8"',
    tradRule: 'if has_loop_top() and has_loop_bottom(): return 8',
    tradOutput: 'FAIL (Human hand-drawing has slight gap in bottom loop; fails boolean test)',
    tradFailureCase: 'Writing rules for every possible angle, slant, pen thickness, and messy stroke is mathematically impossible.',
    mlDataset: '60,000 MNIST training images with validated labels 0 through 9.',
    mlLearnedParams: 'Convolutional / Dense weights detecting edges, curves, and spatial loops.',
    mlOutput: 'Predicted: "8" (99.2% certainty despite imperfect gap)',
    mlStrength: 'Tolerant of natural human variance, sensor noise, and partial occlusions.',
  },
];

export default function ProgVsMLComparison() {
  const [selectedScenarioId, setSelectedScenarioId] = useState<string>('spam');
  const [activeTab, setActiveTab] = useState<'both' | 'traditional' | 'ml'>('both');

  const scenario = SCENARIOS.find((s) => s.id === selectedScenarioId) || SCENARIOS[0];

  return (
    <div className="rounded-2xl border border-electric-cyan/30 bg-navy-950/85 p-6 backdrop-blur-md shadow-glow">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-white/10 pb-4 mb-5">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono text-cyan-400">
            <Sparkles className="h-4 w-4" />
            <span>INTERACTIVE PARADIGM COMPARISON</span>
          </div>
          <h3 className="text-lg font-bold text-white mt-0.5">
            Traditional Software Engineering vs. Machine Learning
          </h3>
          <p className="text-xs text-slate-300">
            Compare how the two philosophies solve the exact same challenging problem.
          </p>
        </div>

        {/* Scenario Pill Buttons */}
        <div className="flex items-center gap-1.5 overflow-x-auto">
          {SCENARIOS.map((s) => (
            <button
              key={s.id}
              onClick={() => setSelectedScenarioId(s.id)}
              className={`px-3 py-1.5 rounded-lg text-xs font-mono font-medium whitespace-nowrap transition ${
                selectedScenarioId === s.id
                  ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-400 shadow-glow font-bold'
                  : 'bg-navy-900 border border-white/10 text-slate-400 hover:text-white'
              }`}
            >
              {s.title}
            </button>
          ))}
        </div>
      </div>

      {/* Input Observation Banner */}
      <div className="p-3.5 rounded-xl bg-navy-900 border border-white/10 mb-5 text-xs font-mono">
        <span className="text-cyan-400 font-bold uppercase block mb-1">Incoming Test Observation:</span>
        <span className="text-white text-sm">{scenario.dataInput}</span>
      </div>

      {/* Side-by-Side Arena */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        {/* Paradigm 1: Traditional Software */}
        <div className="rounded-xl border border-amber-500/30 bg-navy-900/60 p-5 flex flex-col justify-between space-y-4">
          <div>
            <div className="flex items-center justify-between text-xs font-mono text-amber-400 mb-2">
              <span className="flex items-center gap-1.5 font-bold">
                <Code2 className="h-4 w-4" />
                <span>Traditional Programming</span>
              </span>
              <span className="px-2 py-0.5 rounded bg-amber-500/10 border border-amber-500/20">
                Data + Rules = Answers
              </span>
            </div>

            <div className="space-y-3 text-xs">
              <div className="p-3 rounded-lg bg-black/60 border border-white/10 font-mono text-amber-200">
                <span className="text-slate-400 text-[10px] block mb-1">HUMAN-WRITTEN RULES (CODE):</span>
                <code>{scenario.tradRule}</code>
              </div>

              <div className="p-3 rounded-lg bg-navy-950/80 border border-amber-500/20">
                <span className="text-slate-400 text-[10px] font-mono block mb-1">OUTPUT RESULT:</span>
                <span className="text-amber-300 font-bold">{scenario.tradOutput}</span>
              </div>
            </div>
          </div>

          <div className="p-3 rounded-lg bg-rose-950/20 border border-rose-500/20 text-xs flex items-start gap-2">
            <AlertTriangle className="h-4 w-4 text-rose-400 shrink-0 mt-0.5" />
            <div className="text-slate-300">
              <strong className="text-rose-300">Failure Ceiling:</strong> {scenario.tradFailureCase}
            </div>
          </div>
        </div>

        {/* Paradigm 2: Machine Learning */}
        <div className="rounded-xl border border-cyan-400/35 bg-navy-900/60 p-5 flex flex-col justify-between space-y-4 shadow-glow">
          <div>
            <div className="flex items-center justify-between text-xs font-mono text-cyan-400 mb-2">
              <span className="flex items-center gap-1.5 font-bold">
                <Cpu className="h-4 w-4" />
                <span>Machine Learning Paradigm</span>
              </span>
              <span className="px-2 py-0.5 rounded bg-cyan-500/10 border border-cyan-500/20">
                Data + Answers = Model (Rules)
              </span>
            </div>

            <div className="space-y-3 text-xs">
              <div className="p-3 rounded-lg bg-black/60 border border-white/10 font-mono text-cyan-200">
                <span className="text-slate-400 text-[10px] block mb-1">LEARNED OPTIMIZED PARAMETERS (MODEL):</span>
                <code>{scenario.mlLearnedParams}</code>
              </div>

              <div className="p-3 rounded-lg bg-navy-950/80 border border-cyan-500/20">
                <span className="text-slate-400 text-[10px] font-mono block mb-1">PREDICTION INFERENCE:</span>
                <span className="text-emerald-300 font-bold">{scenario.mlOutput}</span>
              </div>
            </div>
          </div>

          <div className="p-3 rounded-lg bg-emerald-950/20 border border-emerald-500/20 text-xs flex items-start gap-2">
            <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0 mt-0.5" />
            <div className="text-slate-300">
              <strong className="text-emerald-300">Superpower:</strong> {scenario.mlStrength}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

