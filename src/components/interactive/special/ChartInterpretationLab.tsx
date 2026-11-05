'use client';

import React, { useState } from 'react';
import { AlertTriangle, CheckCircle2, Eye, ShieldAlert, Sparkles, Scale, BarChart2, Layers } from 'lucide-react';
import InteractiveChart from '../InteractiveChart';

type ScenarioId = 'truncated-axis' | 'pie-vs-bar' | 'overplotting' | 'dual-axis';

export default function ChartInterpretationLab() {
  const [activeScenario, setActiveScenario] = useState<ScenarioId>('truncated-axis');
  const [isMisleading, setIsMisleading] = useState<boolean>(true);
  const [yAxisMin, setYAxisMin] = useState<number>(90);
  const [alphaLevel, setAlphaLevel] = useState<number>(0.2);

  // Scenario 1: Truncated Y-Axis Data
  const companyPerformance = [
    { label: 'Q1 2025', honestVal: 94.2, val: 94.2 },
    { label: 'Q2 2025', honestVal: 95.1, val: 95.1 },
    { label: 'Q3 2025', honestVal: 96.8, val: 96.8 },
    { label: 'Q4 2025', honestVal: 98.4, val: 98.4 },
  ];

  // Scenario 2: Slices for pie vs bar
  const marketShareData = [
    { category: 'Platform A', share: 29 },
    { category: 'Platform B', share: 25 },
    { category: 'Platform C', share: 18 },
    { category: 'Platform D', share: 12 },
    { category: 'Platform E', share: 9 },
    { category: 'Platform F', share: 7 },
  ];

  // Scenario 3: Overplotting mock points
  const clusterPoints = [
    // Dense cluster centered around (50, 50)
    { x: 48, y: 52 }, { x: 50, y: 51 }, { x: 52, y: 49 }, { x: 49, y: 48 }, { x: 51, y: 53 },
    { x: 50, y: 50 }, { x: 47, y: 51 }, { x: 53, y: 50 }, { x: 50, y: 47 }, { x: 51, y: 52 },
    { x: 49, y: 50 }, { x: 50, y: 49 }, { x: 52, y: 51 }, { x: 48, y: 49 }, { x: 50, y: 52 },
    { x: 51, y: 50 }, { x: 49, y: 52 }, { x: 52, y: 48 }, { x: 48, y: 51 }, { x: 50, y: 48 },
    // Secondary cluster around (80, 75)
    { x: 79, y: 76 }, { x: 81, y: 74 }, { x: 80, y: 75 }, { x: 82, y: 77 }, { x: 78, y: 73 },
    { x: 80, y: 76 }, { x: 81, y: 75 }, { x: 79, y: 74 }, { x: 83, y: 75 }, { x: 78, y: 76 },
    // Scattered background points
    { x: 20, y: 30 }, { x: 35, y: 70 }, { x: 65, y: 25 }, { x: 90, y: 40 }, { x: 15, y: 85 }
  ];

  return (
    <div className="rounded-2xl border border-border/80 bg-navy-900/60 p-6 backdrop-blur-md shadow-2xl space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-border/50 pb-5">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-2 rounded-lg bg-electric-cyan/10 border border-electric-cyan/30 text-electric-cyan">
              <ShieldAlert className="w-5 h-5" />
            </span>
            <h3 className="text-xl font-bold text-white tracking-wide">
              Chart Interpretation & Lie Factor Lab
            </h3>
          </div>
          <p className="text-sm text-slate-300 mt-1">
            Analyze how visual distortion techniques mislead human perception, and how to design ethically rigorous ML charts.
          </p>
        </div>

        {/* Global Misleading vs Honest Toggle */}
        <div className="flex items-center gap-2 bg-navy-950/80 p-1.5 rounded-xl border border-border">
          <button
            onClick={() => setIsMisleading(true)}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${isMisleading
                ? 'bg-rose-500/20 text-rose-300 border border-rose-500/40 shadow-sm'
                : 'text-slate-300 hover:text-white'
              }`}
          >
            <AlertTriangle className="w-3.5 h-3.5 text-rose-400" />
            Misleading View
          </button>
          <button
            onClick={() => setIsMisleading(false)}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${!isMisleading
                ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 shadow-sm'
                : 'text-slate-300 hover:text-white'
              }`}
          >
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
            Ethical / Honest View
          </button>
        </div>
      </div>

      {/* Scenario Selector Navigation */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
        {[
          { id: 'truncated-axis' as ScenarioId, label: 'Truncated Y-Axis', icon: BarChart2 },
          { id: 'pie-vs-bar' as ScenarioId, label: 'Pie Angle vs Bar', icon: Scale },
          { id: 'overplotting' as ScenarioId, label: 'Overplotting & Alpha', icon: Eye },
          { id: 'dual-axis' as ScenarioId, label: 'Spurious Dual-Axis', icon: Layers },
        ].map((item) => {
          const Icon = item.icon;
          const active = activeScenario === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setActiveScenario(item.id)}
              className={`flex items-center justify-center gap-2 px-3 py-2.5 rounded-xl text-xs font-semibold transition-all border ${active
                  ? 'bg-electric-cyan/20 border-electric-cyan/60 text-white shadow-[0_0_15px_rgba(0,240,255,0.2)]'
                  : 'bg-navy-950/40 border-border/60 text-slate-300 hover:border-slate-500 hover:text-white'
                }`}
            >
              <Icon className={`w-4 h-4 ${active ? 'text-electric-cyan' : 'text-slate-400'}`} />
              <span>{item.label}</span>
            </button>
          );
        })}
      </div>

      {/* Main Interactive Stage */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Visual Canvas (7 Cols) */}
        <div className="lg:col-span-7 bg-navy-950/70 rounded-xl border border-border/70 p-5 space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono uppercase tracking-wider text-slate-400">
              Interactive Display Canvas
            </span>
            <span
              className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-bold border ${isMisleading
                  ? 'bg-rose-500/10 text-rose-300 border-rose-500/30'
                  : 'bg-emerald-500/10 text-emerald-300 border-emerald-500/30'
                }`}
            >
              {isMisleading ? 'Lie Factor > 4.5 (Severely Distorted)' : 'Lie Factor = 1.0 (True Proportions)'}
            </span>
          </div>

          {/* SCENARIO 1: TRUNCATED Y-AXIS */}
          {activeScenario === 'truncated-axis' && (
            <div className="space-y-4">
              <div className="p-3 bg-navy-900/50 rounded-lg text-xs text-slate-300 flex items-center justify-between">
                <span>Metric: Model Accuracy Retention Rate (%)</span>
                <span className="text-electric-cyan font-mono font-bold">
                  Baseline Origin: {isMisleading ? `${yAxisMin}% (Truncated)` : '0% (Standard Origin)'}
                </span>
              </div>

              {isMisleading && (
                <div className="space-y-1.5 bg-navy-900/40 p-3 rounded-lg border border-border/50">
                  <div className="flex justify-between text-xs text-slate-300">
                    <span>Simulate Truncation Baseline Cutoff:</span>
                    <span className="font-mono text-rose-400">{yAxisMin}%</span>
                  </div>
                  <input
                    type="range"
                    min="80"
                    max="93"
                    step="1"
                    value={yAxisMin}
                    onChange={(e) => setYAxisMin(Number(e.target.value))}
                    className="w-full accent-rose-500 cursor-pointer"
                  />
                </div>
              )}

              {/* Render dynamic bars */}
              <div className="h-64 flex items-end justify-around gap-4 pt-8 pb-4 px-4 bg-navy-900/30 rounded-xl border border-border/40 relative">
                {/* Horizontal reference baseline */}
                <div className="absolute bottom-4 left-0 right-0 border-b border-slate-700/60" />

                {companyPerformance.map((item) => {
                  const baseline = isMisleading ? yAxisMin : 0;
                  const range = isMisleading ? 100 - yAxisMin : 100;
                  const heightPercent = Math.max(5, Math.min(100, ((item.val - baseline) / range) * 100));

                  return (
                    <div key={item.label} className="flex-1 flex flex-col items-center gap-2 z-10">
                      <span className="text-xs font-mono font-bold text-white">{item.val}%</span>
                      <div className="w-full max-w-[56px] bg-slate-800/40 rounded-t-lg overflow-hidden flex items-end h-44">
                        <div
                          style={{ height: `${heightPercent}%` }}
                          className={`w-full transition-all duration-500 rounded-t-md ${isMisleading
                              ? 'bg-gradient-to-t from-rose-600 to-rose-400 shadow-[0_0_15px_rgba(244,63,94,0.3)]'
                              : 'bg-gradient-to-t from-emerald-600 to-emerald-400 shadow-[0_0_15px_rgba(16,185,129,0.3)]'
                            }`}
                        />
                      </div>
                      <span className="text-[11px] text-slate-400 text-center font-medium">{item.label}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* SCENARIO 2: PIE VS BAR */}
          {activeScenario === 'pie-vs-bar' && (
            <div className="space-y-4">
              <div className="p-3 bg-navy-900/50 rounded-lg text-xs text-slate-300">
                <span>Objective: Rank market share across 6 competitor machine learning platforms.</span>
              </div>

              {isMisleading ? (
                /* Pie representation with angles difficult to discern */
                <div className="h-64 flex flex-col items-center justify-center bg-navy-900/30 rounded-xl border border-border/40 p-4">
                  <div className="relative w-44 h-44 rounded-full border-4 border-slate-700/50 flex items-center justify-center bg-gradient-to-tr from-rose-500/20 via-amber-500/20 to-blue-500/20 shadow-inner">
                    <div className="text-center p-2">
                      <span className="text-xs font-bold text-white">Pie / Donut</span>
                      <p className="text-[10px] text-rose-300">Angles & perspective distort area perception</p>
                    </div>
                  </div>
                  <div className="grid grid-cols-3 gap-2 mt-4 text-[11px] text-slate-400">
                    {marketShareData.map((d) => (
                      <span key={d.category} className="truncate">
                        • {d.category}: {d.share}%
                      </span>
                    ))}
                  </div>
                </div>
              ) : (
                /* Honest ordered horizontal bar chart */
                <div className="h-64 flex flex-col justify-center gap-2 bg-navy-900/30 rounded-xl border border-border/40 p-4">
                  {marketShareData.map((item) => (
                    <div key={item.category} className="space-y-1">
                      <div className="flex justify-between text-[11px] text-slate-300">
                        <span className="font-semibold text-white">{item.category}</span>
                        <span className="font-mono text-emerald-400">{item.share}%</span>
                      </div>
                      <div className="w-full bg-slate-800/80 rounded-full h-2.5 overflow-hidden">
                        <div
                          style={{ width: `${item.share * 3}%` }}
                          className="h-full bg-gradient-to-r from-emerald-500 to-cyan-400 rounded-full"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* SCENARIO 3: OVERPLOTTING & ALPHA */}
          {activeScenario === 'overplotting' && (
            <div className="space-y-4">
              <div className="p-3 bg-navy-900/50 rounded-lg text-xs text-slate-300 flex justify-between items-center">
                <span>2,000 data observations in high-density feature space</span>
                <span className="text-electric-cyan font-mono text-[11px]">
                  Alpha Transparency: {isMisleading ? '1.0 (Fully Opaque)' : alphaLevel}
                </span>
              </div>

              {!isMisleading && (
                <div className="space-y-1.5 bg-navy-900/40 p-3 rounded-lg border border-border/50">
                  <div className="flex justify-between text-xs text-slate-300">
                    <span>Adjust Scatter Alpha Parameter:</span>
                    <span className="font-mono text-emerald-400">{alphaLevel}</span>
                  </div>
                  <input
                    type="range"
                    min="0.05"
                    max="0.5"
                    step="0.05"
                    value={alphaLevel}
                    onChange={(e) => setAlphaLevel(Number(e.target.value))}
                    className="w-full accent-emerald-500 cursor-pointer"
                  />
                </div>
              )}

              {/* 2D Canvas representing scatter dots */}
              <div className="h-64 relative bg-navy-900/40 rounded-xl border border-border/40 overflow-hidden">
                {clusterPoints.map((pt, i) => (
                  <div
                    key={i}
                    style={{
                      left: `${pt.x}%`,
                      top: `${pt.y}%`,
                      opacity: isMisleading ? 1 : alphaLevel * 3,
                    }}
                    className={`absolute -translate-x-1/2 -translate-y-1/2 rounded-full transition-all duration-300 ${isMisleading
                        ? 'w-4 h-4 bg-rose-500 shadow-[0_0_8px_rgba(244,63,94,0.6)]'
                        : 'w-3 h-3 bg-cyan-400 ring-2 ring-emerald-400/40'
                      }`}
                  />
                ))}
                {/* Visual annotation badge */}
                <div className="absolute bottom-2 right-2 bg-navy-950/80 px-2 py-1 rounded text-[10px] font-mono text-slate-300 border border-border/40">
                  {isMisleading ? 'Hidden Clusters (Severe Overplotting)' : 'Visible Bimodal Densities'}
                </div>
              </div>
            </div>
          )}

          {/* SCENARIO 4: DUAL-AXIS SPURIOUS CORRELATION */}
          {activeScenario === 'dual-axis' && (
            <div className="space-y-4">
              <div className="p-3 bg-navy-900/50 rounded-lg text-xs text-slate-300">
                <span>Metrics: Daily Swimming Pool Visitors (LHS) vs Ice Cream Sales Revenue (RHS).</span>
              </div>

              <div className="h-64 flex flex-col justify-center items-center bg-navy-900/30 rounded-xl border border-border/40 p-4 text-center">
                {isMisleading ? (
                  <div className="space-y-3">
                    <p className="text-xs text-rose-300 font-semibold">
                      Spurious Scaling Trap: Dual Axes Arbitrarily Stretched
                    </p>
                    <p className="text-xs text-slate-400 max-w-md">
                      When two unrelated or confounding time series are plotted on separate left/right Y-axes, arbitrary scaling forces the lines to overlap, misleading observers into assuming strong causal connection.
                    </p>
                    <div className="inline-block px-3 py-1 bg-rose-500/15 border border-rose-500/30 rounded-lg text-xs text-rose-300 font-mono">
                      r = 0.94 (Spurious Confounder: Ambient Summer Heat)
                    </div>
                  </div>
                ) : (
                  <div className="space-y-3">
                    <p className="text-xs text-emerald-300 font-semibold">
                      Proper Practice: Faceted Subplots or Standardized Z-Scores
                    </p>
                    <p className="text-xs text-slate-400 max-w-md">
                      Separate unrelated scales into stacked subplots with identical temporal X-axes, or perform causal inference checking for confounding latent variables.
                    </p>
                    <div className="inline-block px-3 py-1 bg-emerald-500/15 border border-emerald-500/30 rounded-lg text-xs text-emerald-300 font-mono">
                      Standardized Z-Score Alignment
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Analytical Explanation & Rules Card (5 Cols) */}
        <div className="lg:col-span-5 space-y-4">
          <div className="rounded-xl border border-border/70 bg-navy-950/70 p-5 space-y-4">
            <div className="flex items-center gap-2 text-white font-bold text-sm">
              <Sparkles className="w-4 h-4 text-electric-cyan" />
              <span>Cognitive Diagnosis</span>
            </div>

            {activeScenario === 'truncated-axis' && (
              <div className="space-y-3 text-xs leading-relaxed text-slate-300">
                <p>
                  <strong className="text-rose-400">The Truncation Lie:</strong> Cutting off the Y-axis origin makes a modest 4.4% increase (from 94.2% to 98.4%) look like a massive 400% surge. The bar heights represent visual length, but human brains naturally attribute length directly to quantity.
                </p>
                <div className="p-3 bg-navy-900/60 rounded-lg border border-border/50 space-y-1.5 font-mono text-[11px]">
                  <div className="text-slate-400">Edward Tufte Lie Factor Formula:</div>
                  <div className="text-electric-cyan">
                    Lie Factor = (Size of effect in graphic) / (Size of effect in data)
                  </div>
                  <div className="text-slate-400">When baseline starts at 90%: Lie Factor = 4.8</div>
                </div>
                <p className="text-emerald-400 font-semibold">
                  Rule: Always anchor zero-baseline for bar charts. Use line charts with explicit callouts if zooming in on micro-variations.
                </p>
              </div>
            )}

            {activeScenario === 'pie-vs-bar' && (
              <div className="space-y-3 text-xs leading-relaxed text-slate-300">
                <p>
                  <strong className="text-rose-400">The Angle Distortion:</strong> Humans are notoriously poor at estimating 2D angular slices compared to aligned 1D lengths. In 3D pie charts, front slices appear up to 40% larger due to perspective projection.
                </p>
                <p>
                  <strong className="text-emerald-400">The Solution:</strong> Sorted horizontal bar charts align all items to a common baseline, enabling immediate cognitive ranking in milliseconds.
                </p>
                <div className="p-3 bg-navy-900/60 rounded-lg border border-border/50 text-[11px] text-slate-400">
                  <span className="text-white font-bold">Best Practice:</span> If categories exceed 3, eliminate pie charts in favor of horizontal bar charts.
                </div>
              </div>
            )}

            {activeScenario === 'overplotting' && (
              <div className="space-y-3 text-xs leading-relaxed text-slate-300">
                <p>
                  <strong className="text-rose-400">The Overplotting Blindspot:</strong> When thousands of observations are rendered with 100% opacity, 5 points layered directly on top of each other look identical to 500 points layered together.
                </p>
                <p>
                  <strong className="text-emerald-400">The Fix:</strong> Apply alpha transparency (<code className="text-electric-cyan">alpha=0.15</code>), jittering for discrete values, or 2D density hexbins (<code className="text-electric-cyan">sns.kdeplot</code> / <code className="text-electric-cyan">plt.hexbin</code>).
                </p>
              </div>
            )}

            {activeScenario === 'dual-axis' && (
              <div className="space-y-3 text-xs leading-relaxed text-slate-300">
                <p>
                  <strong className="text-rose-400">Spurious Dual-Axis Fallacy:</strong> Arbitrary axis scales manipulate human intuition into assuming correlation equals causation.
                </p>
                <p>
                  <strong className="text-emerald-400">Ethical Charting Rule:</strong> Always ask: <em>"What latent confounder drives both features?"</em> For dual variables, use small multiples (two vertically stacked charts with identical time axes).
                </p>
              </div>
            )}
          </div>

          {/* Quick Checklist */}
          <div className="p-4 rounded-xl border border-electric-cyan/20 bg-electric-cyan/5 space-y-2">
            <span className="text-xs font-bold text-electric-cyan uppercase tracking-wider">
              Ethical Data Visualization Checklist
            </span>
            <ul className="text-xs text-slate-300 space-y-1.5 list-disc list-inside">
              <li>Always include zero on bar chart quantitative axes.</li>
              <li>Label all units of measurement clearly with currency or percentage tags.</li>
              <li>Use color deliberately (reserve bright hues for highlights, not random decoration).</li>
              <li>Verify that visual proportions match mathematical percentages.</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

