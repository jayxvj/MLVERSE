'use client';

import React, { useState } from 'react';
import { Layers, Cpu, Brain, Sparkles, CheckCircle2, ChevronRight } from 'lucide-react';

interface Tier {
  id: 'ai' | 'ml' | 'dl';
  name: string;
  scope: string;
  era: string;
  color: string;
  borderColor: string;
  bgTier: string;
  description: string;
  keyTechniques: string[];
  concreteExamples: string[];
  limitations: string;
}

const TIERS: Record<'ai' | 'ml' | 'dl', Tier> = {
  ai: {
    id: 'ai',
    name: 'Artificial Intelligence (AI)',
    scope: 'The Broad Umbrella Universe',
    era: '1950s — Present',
    color: '#38bdf8',
    borderColor: 'border-blue-500/40',
    bgTier: 'from-blue-950/40 to-navy-950/80',
    description: 'Any computational technique that enables a machine to mimic human cognitive behavior, decision-making, logic, or problem-solving. Encompasses symbolic reasoning, rule-based expert systems, game search (e.g., Deep Blue chess), optimization, and statistical learning.',
    keyTechniques: [
      'Expert Systems (if-then inference engines)',
      'Search Trees (A*, Minimax)',
      'Symbolic Logic & Knowledge Graphs',
      'Genetic & Evolutionary Algorithms',
      'All of Machine Learning & Deep Learning'
    ],
    concreteExamples: [
      'IBM Deep Blue chess computer (1997)',
      'Roomba vacuum path planning algorithms',
      'Autofocus logic in digital cameras'
    ],
    limitations: 'Handcrafted rules cannot scale to complex, unstructured human speech or chaotic real-world vision.'
  },
  ml: {
    id: 'ml',
    name: 'Machine Learning (ML)',
    scope: 'Subset of AI: Learning from Data',
    era: '1980s — Present',
    color: '#00f0ff',
    borderColor: 'border-cyan-400/50',
    bgTier: 'from-cyan-950/40 to-navy-950/80',
    description: 'A major subfield of AI that gives computers the ability to learn without being explicitly programmed. Instead of hardcoding logic, ML algorithms ingest statistical datasets, estimate parameter weights, and improve performance autonomously through experience.',
    keyTechniques: [
      'Linear & Logistic Regression',
      'Decision Trees & Random Forests',
      'Support Vector Machines (SVM)',
      'K-Means Clustering & PCA',
      'Gradient Boosting (XGBoost, LightGBM)'
    ],
    concreteExamples: [
      'Credit card transaction fraud scoring',
      'Netflix movie recommendation engines',
      'Email spam classification filters'
    ],
    limitations: 'Requires human domain experts to manually engineer and clean tabular feature representations.'
  },
  dl: {
    id: 'dl',
    name: 'Deep Learning (DL)',
    scope: 'Subset of ML: Multi-Layer Neural Networks',
    era: '2010s — Present',
    color: '#a855f7',
    borderColor: 'border-purple-400/60',
    bgTier: 'from-purple-950/50 to-navy-950/90',
    description: 'A specialized subfield of Machine Learning based on deep artificial neural networks with multiple stacked layers. Deep Learning algorithms extract hierarchical features automatically from raw pixels, audio waves, or token sequences without manual feature engineering.',
    keyTechniques: [
      'Multi-Layer Perceptrons (MLPs)',
      'Convolutional Neural Networks (CNNs)',
      'Transformers & Attention Mechanisms',
      'Generative Adversarial Networks (GANs)',
      'Diffusion Models & Large Language Models'
    ],
    concreteExamples: [
      'Self-driving car computer vision (Tesla, Waymo)',
      'Large Language Models (ChatGPT, Claude, Gemini)',
      'Real-time voice translation (Whisper)'
    ],
    limitations: 'Extremely compute-intensive, requires massive datasets, and acts as a complex "black box" harder to mathematically audit.'
  }
};

export default function AIMLHierarchy() {
  const [selectedTier, setSelectedTier] = useState<'ai' | 'ml' | 'dl'>('ml');

  const tier = TIERS[selectedTier];

  return (
    <div className="rounded-2xl border border-electric-cyan/30 bg-navy-950/85 p-6 backdrop-blur-md shadow-glow">
      <div className="border-b border-white/10 pb-4 mb-5">
        <div className="flex items-center gap-2 text-xs font-mono text-cyan-400">
          <Layers className="h-4 w-4" />
          <span>TAXONOMY ARCHITECTURE EXPLORER</span>
        </div>
        <h3 className="text-lg font-bold text-white mt-0.5">
          The AI vs. Machine Learning vs. Deep Learning Hierarchy
        </h3>
        <p className="text-xs text-slate-300">
          Understand how these three widely conflated terms fit inside each other as nested subsets.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
        {/* Interactive Nested Concentric Diagram */}
        <div className="lg:col-span-5 flex flex-col items-center justify-center p-4">
          <div className="w-full max-w-sm space-y-3">
            {/* AI Layer */}
            <div
              onClick={() => setSelectedTier('ai')}
              className={`p-4 rounded-2xl border transition-all cursor-pointer ${
                selectedTier === 'ai'
                  ? 'border-blue-400 bg-blue-950/50 shadow-glow-blue scale-102'
                  : 'border-blue-500/20 bg-blue-950/20 hover:border-blue-400/40'
              }`}
            >
              <div className="flex items-center justify-between text-xs font-bold text-blue-300 mb-1">
                <span>ARTIFICIAL INTELLIGENCE (Broadest)</span>
                <span className="text-[10px] font-mono text-slate-400">1950s+</span>
              </div>
              <p className="text-[11px] text-slate-300">Machines exhibiting human-like smart behavior</p>

              {/* ML Layer (Nested) */}
              <div
                onClick={(e) => {
                  e.stopPropagation();
                  setSelectedTier('ml');
                }}
                className={`mt-3 p-3.5 rounded-xl border transition-all cursor-pointer ${
                  selectedTier === 'ml'
                    ? 'border-cyan-400 bg-cyan-950/60 shadow-glow scale-102'
                    : 'border-cyan-500/20 bg-cyan-950/30 hover:border-cyan-400/50'
                }`}
              >
                <div className="flex items-center justify-between text-xs font-bold text-cyan-300 mb-1">
                  <span>MACHINE LEARNING (Subset of AI)</span>
                  <span className="text-[10px] font-mono text-slate-400">1980s+</span>
                </div>
                <p className="text-[11px] text-slate-300">Statistical pattern extraction from data</p>

                {/* DL Layer (Deepest Core) */}
                <div
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedTier('dl');
                  }}
                  className={`mt-3 p-3 rounded-lg border transition-all cursor-pointer ${
                    selectedTier === 'dl'
                      ? 'border-purple-400 bg-purple-950/70 shadow-glow-violet scale-102'
                      : 'border-purple-500/25 bg-purple-950/30 hover:border-purple-400/50'
                  }`}
                >
                  <div className="flex items-center justify-between text-xs font-bold text-purple-300 mb-0.5">
                    <span>DEEP LEARNING (Core Subset)</span>
                    <span className="text-[10px] font-mono text-slate-400">2010s+</span>
                  </div>
                  <p className="text-[10px] text-slate-300">Multi-layer artificial neural networks</p>
                </div>
              </div>
            </div>
          </div>
          <span className="text-[11px] font-mono text-slate-400 mt-3 text-center">
            Click any concentric tier to inspect its mechanics
          </span>
        </div>

        {/* Selected Tier Deep-Dive Inspector */}
        <div className="lg:col-span-7 rounded-xl bg-navy-900/80 border border-white/10 p-5 space-y-4 animate-fadeIn">
          <div className="flex items-center justify-between border-b border-white/10 pb-3">
            <div>
              <span className="text-xs font-mono uppercase" style={{ color: tier.color }}>
                {tier.scope}
              </span>
              <h4 className="text-base font-bold text-white mt-0.5">{tier.name}</h4>
            </div>
            <span className="text-xs font-mono text-slate-400 bg-white/5 px-2.5 py-1 rounded">
              {tier.era}
            </span>
          </div>

          <p className="text-xs sm:text-sm text-slate-200 leading-relaxed">
            {tier.description}
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
            <div className="p-3 rounded-lg bg-navy-950 border border-white/5">
              <span className="font-mono text-cyan-400 font-bold block mb-1.5">
                Key Techniques & Algorithms:
              </span>
              <ul className="space-y-1 text-slate-300 text-[11px]">
                {tier.keyTechniques.map((tech, i) => (
                  <li key={i} className="flex items-center gap-1.5">
                    <ChevronRight className="h-3 w-3 text-cyan-400 shrink-0" />
                    <span>{tech}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="p-3 rounded-lg bg-navy-950 border border-white/5">
              <span className="font-mono text-purple-400 font-bold block mb-1.5">
                Real-World Everyday Examples:
              </span>
              <ul className="space-y-1 text-slate-300 text-[11px]">
                {tier.concreteExamples.map((ex, i) => (
                  <li key={i} className="flex items-center gap-1.5">
                    <CheckCircle2 className="h-3 w-3 text-emerald-400 shrink-0" />
                    <span>{ex}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="p-3 rounded-lg bg-amber-950/20 border border-amber-500/20 text-xs text-amber-200">
            <strong>Known Limitation:</strong> {tier.limitations}
          </div>
        </div>
      </div>
    </div>
  );
}

