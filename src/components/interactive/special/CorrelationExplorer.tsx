'use client';

import React, { useState, useMemo } from 'react';
import { GitMerge, RefreshCw, Info } from 'lucide-react';
import InteractiveChart from '../InteractiveChart';

type Scenario = 'strong-positive' | 'strong-negative' | 'weak' | 'zero' | 'nonlinear';

const SCENARIOS: { id: Scenario; label: string; r: number; desc: string; example: string; color: string }[] = [
  {
    id: 'strong-positive',
    label: 'Strong Positive (r ≈ +0.95)',
    r: 0.95,
    desc: 'Both variables increase together. As X rises, Y rises proportionally.',
    example: 'House area (sqft) vs. Sale price — bigger houses tend to sell for more.',
    color: '#10b981',
  },
  {
    id: 'strong-negative',
    label: 'Strong Negative (r ≈ -0.88)',
    r: -0.88,
    desc: 'As X increases, Y decreases. An inverse linear relationship.',
    example: 'Years of fuel-efficiency improvements vs. CO2 emissions per mile.',
    color: '#f87171',
  },
  {
    id: 'weak',
    label: 'Weak Positive (r ≈ +0.32)',
    r: 0.32,
    desc: 'A very slight upward trend buried in noise. Hard to rely on for predictions.',
    example: 'Number of gym visits vs. mood score — linked but many other factors intervene.',
    color: '#fbbf24',
  },
  {
    id: 'zero',
    label: 'No Correlation (r ≈ 0.0)',
    r: 0.0,
    desc: 'X and Y are completely unrelated. Knowing X tells you nothing about Y.',
    example: 'Shoe size vs. mathematical ability — genuinely uncorrelated.',
    color: '#94a3b8',
  },
  {
    id: 'nonlinear',
    label: 'Non-Linear (r ≈ +0.05)',
    r: 0.05,
    desc: 'Strong relationship, but curved — Pearson r misses it entirely! Use Spearman rank or visualize first.',
    example: 'Drug dose vs. efficacy — low dose and high dose both reduce effectiveness (inverted-U).',
    color: '#a855f7',
  },
];

// Generate pseudo-random scatter points for a given Pearson r
function generatePoints(scenario: Scenario, seed: number): { x: number; y: number }[] {
  const pts: { x: number; y: number }[] = [];
  const n = 25;
  const rand = (i: number, offset: number) => {
    const s = Math.sin((i * 9.7 + offset * 3.1 + seed * 2.9) * 7891) * 10000;
    return (s - Math.floor(s)) * 2 - 1;
  };

  for (let i = 0; i < n; i++) {
    const xRaw = rand(i, 1);
    const noise = rand(i, 2);

    let x: number, y: number;
    if (scenario === 'strong-positive') {
      x = xRaw * 3 + 5;
      y = 0.95 * xRaw * 3 + noise * 0.6 + 5;
    } else if (scenario === 'strong-negative') {
      x = xRaw * 3 + 5;
      y = -0.88 * xRaw * 3 + noise * 0.9 + 5;
    } else if (scenario === 'weak') {
      x = xRaw * 3 + 5;
      y = 0.32 * xRaw * 3 + noise * 2.8 + 5;
    } else if (scenario === 'zero') {
      x = xRaw * 3 + 5;
      y = rand(i, 3) * 3 + 5;
    } else {
      // nonlinear: inverted-U
      x = xRaw * 4 + 5;
      y = -((x - 5) ** 2) * 0.3 + rand(i, 4) * 0.6 + 8;
    }
    pts.push({ x: Number(x.toFixed(2)), y: Number(y.toFixed(2)) });
  }
  return pts;
}

export default function CorrelationExplorer() {
  const [scenario, setScenario] = useState<Scenario>('strong-positive');
  const [seed, setSeed] = useState(1);

  const info = SCENARIOS.find(s => s.id === scenario)!;
  const points = useMemo(() => generatePoints(scenario, seed), [scenario, seed]);

  // Format points for scatter chart
  const chartData = useMemo(() =>
    points.map(p => ({ x: p.x, y: p.y })),
    [points]
  );

  return (
    <div className="rounded-2xl border border-electric-cyan/30 bg-navy-950/85 p-5 backdrop-blur-md shadow-glow">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-white/10 pb-4 mb-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono text-cyan-400">
            <GitMerge className="h-4 w-4" />
            <span>CORRELATION EXPLORER</span>
          </div>
          <h3 className="text-lg font-bold text-white mt-0.5">Relationships Between Variables</h3>
          <p className="text-xs text-slate-300">Explore positive, negative, weak, and spurious correlations. Pearson r measures <em>linear</em> association only.</p>
        </div>
        <button
          onClick={() => setSeed(s => s + 1)}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono border border-white/10 bg-navy-900 text-slate-300 hover:text-white transition-colors w-fit"
        >
          <RefreshCw className="h-3.5 w-3.5" /> New Sample
        </button>
      </div>

      {/* Scenario Selector */}
      <div className="grid grid-cols-1 sm:grid-cols-5 gap-2 mb-5">
        {SCENARIOS.map(sc => (
          <button
            key={sc.id}
            onClick={() => setScenario(sc.id)}
            className={`p-2.5 rounded-xl border text-left text-xs transition-all ${
              scenario === sc.id
                ? `border-[${sc.color}] bg-navy-900 shadow-glow`
                : 'border-white/10 bg-navy-900/60 text-slate-400 hover:text-white hover:bg-navy-900'
            }`}
            style={scenario === sc.id ? { borderColor: sc.color + '60' } : {}}
          >
            <div className="font-bold text-white" style={{ color: scenario === sc.id ? sc.color : undefined }}>
              r {sc.id === 'strong-positive' ? '≈ +0.95' : sc.id === 'strong-negative' ? '≈ -0.88' : sc.id === 'weak' ? '≈ +0.32' : sc.id === 'zero' ? '≈ 0.0' : '≈ 0.05'}
            </div>
            <div className="text-[10px] opacity-70 mt-0.5">
              {sc.id === 'strong-positive' ? 'Strong +' : sc.id === 'strong-negative' ? 'Strong −' : sc.id === 'weak' ? 'Weak' : sc.id === 'zero' ? 'None' : 'Non-Linear'}
            </div>
          </button>
        ))}
      </div>

      {/* r Readout */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-5 font-mono">
        <div className="p-4 rounded-xl bg-navy-900 border sm:col-span-1" style={{ borderColor: info.color + '50' }}>
          <div className="text-[10px] uppercase font-bold" style={{ color: info.color }}>Pearson r</div>
          <div className="text-3xl font-bold text-white mt-1">{info.r.toFixed(2)}</div>
          <div className="text-xs text-slate-400 mt-0.5">{info.label}</div>
        </div>
        <div className="sm:col-span-2 p-4 rounded-xl bg-navy-900/70 border border-white/10 text-xs space-y-2">
          <p className="text-slate-200 leading-relaxed">{info.desc}</p>
          <p className="text-slate-400"><strong className="text-cyan-300">Real-world example:</strong> {info.example}</p>
        </div>
      </div>

      {/* Scatter Plot */}
      <div className="mb-4">
        <InteractiveChart
          type="scatter"
          data={chartData}
          xKey="x"
          series={[{ key: 'y', name: 'Y variable', color: info.color }]}
          height={240}
        />
      </div>

      {/* Causation Warning */}
      <div className="p-4 rounded-xl bg-amber-950/30 border border-amber-500/30 text-xs space-y-2">
        <div className="flex items-center gap-2 text-amber-300 font-bold font-mono">
          <Info className="h-4 w-4" />
          <span>Correlation Does NOT Imply Causation</span>
        </div>
        <p className="text-slate-300 leading-relaxed">
          A high Pearson r between two variables does NOT mean one <em>causes</em> the other. Classic spurious correlations:
        </p>
        <ul className="list-disc pl-5 space-y-1 text-slate-300">
          <li><strong className="text-amber-300">Nicolas Cage films vs. Pool drownings</strong> — strong annual correlation, zero causation.</li>
          <li><strong className="text-amber-300">Ice cream sales vs. Shark attacks</strong> — both rise in summer (confounded by temperature).</li>
          <li><strong className="text-amber-300">Shoe size vs. Reading level in children</strong> — both increase with age (the true cause).</li>
        </ul>
        <p className="text-slate-400 leading-relaxed">
          Causation must be established through <strong>controlled experiments</strong> or rigorous causal inference frameworks (do-calculus, instrumental variables, randomized controlled trials).
        </p>
      </div>
    </div>
  );
}

