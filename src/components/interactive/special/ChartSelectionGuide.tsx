'use client';

import React, { useState } from 'react';
import { Compass, CheckCircle2, AlertOctagon, Code, ArrowRight, Layers, BarChart2 } from 'lucide-react';

interface DecisionGoal {
  id: string;
  question: string;
  category: string;
  recommendedChart: string;
  dataTypes: string;
  strengths: string[];
  pitfalls: string[];
  codeSnippet: string;
  svgIcon: string;
}

const GOALS: DecisionGoal[] = [
  {
    id: 'compare-categories',
    question: 'Compare quantities across distinct categories or groups',
    category: 'Categorical Comparison',
    recommendedChart: 'Bar Chart / Grouped Bar Chart',
    dataTypes: '1 Categorical (Nominal or Ordinal) + 1 Numerical (Continuous)',
    strengths: [
      'Zero-baseline makes visual ratio comparisons highly accurate',
      'Accommodates clear text labels horizontally or vertically',
      'Easy to sort descending to highlight rank order'
    ],
    pitfalls: [
      'Never truncate the zero baseline on bar heights',
      'Do not use if category count exceeds 30 (use horizontal bars or top-K filtering)'
    ],
    codeSnippet: 'sns.barplot(data=df, x="city", y="revenue", estimator=np.mean)',
    svgIcon: 'bar'
  },
  {
    id: 'distribution',
    question: 'Examine the shape, spread, and modality of a continuous variable',
    category: 'Distribution & Spread',
    recommendedChart: 'Histogram / Kernel Density Estimate (KDE)',
    dataTypes: '1 Continuous Numerical Variable',
    strengths: [
      'Reveals skewness, symmetry, tails, and multi-modal peaks',
      'KDE provides a smooth non-parametric probability density estimate',
      'Identifies gaps and zero-inflation directly'
    ],
    pitfalls: [
      'Bin width selection dramatically alters histogram appearance (check multiple bin sizes)',
      'KDE bandwidth smoothing can invent false tails beyond physical boundaries (e.g. negative ages)'
    ],
    codeSnippet: 'sns.histplot(data=df, x="house_price", kde=True, bins=30)',
    svgIcon: 'hist'
  },
  {
    id: 'outliers-spread',
    question: 'Detect outliers, interquartile range (IQR), and five-number summaries',
    category: 'Spread & Outlier Auditing',
    recommendedChart: 'Box Plot (Tukey Boxplot) / Violin Plot',
    dataTypes: '1 Numerical + Optional 1 Categorical (for grouped comparison)',
    strengths: [
      'Directly visualizes Median, Q1, Q3, and Tukey 1.5×IQR outlier fences',
      'Violin plot combines boxplot with mirrored KDE to show distribution density',
      'Enables compact parallel comparison of 10+ categories on one screen'
    ],
    pitfalls: [
      'Standard boxplots hide bimodal distributions (two separate peaks can look identical to a uniform spread)',
      'Use Violin plots or jittered strip plots when underlying modality is uncertain'
    ],
    codeSnippet: 'sns.boxplot(data=df, x="department", y="salary")\n# Or violin: sns.violinplot(data=df, x="department", y="salary")',
    svgIcon: 'box'
  },
  {
    id: 'two-numerical',
    question: 'Examine the relationship, clustering, or correlation between two numerical variables',
    category: 'Bivariate Correlation',
    recommendedChart: 'Scatter Plot / Bubble Chart',
    dataTypes: '2 Continuous Numerical Variables (+ 1 optional for bubble size)',
    strengths: [
      'The premier diagnostic tool for discovering linear, polynomial, or cluster patterns',
      'Immediately isolates multivariate outliers that look normal on individual histograms',
      'Point color (hue) allows adding a third categorical dimension'
    ],
    pitfalls: [
      'Overplotting: when thousands of points overlap into a solid block, use alpha transparency or hexbin density',
      'Correlation visible on scatter plots does not prove causal direction'
    ],
    codeSnippet: 'sns.scatterplot(data=df, x="area_sqft", y="price", hue="has_garage", alpha=0.7)',
    svgIcon: 'scatter'
  },
  {
    id: 'time-series',
    question: 'Show trend, trajectory, or rate-of-change over continuous time or sequence',
    category: 'Temporal Evolution',
    recommendedChart: 'Line Chart / Area Chart',
    dataTypes: '1 Temporal/Sequential Variable (X) + 1 Continuous Numerical (Y)',
    strengths: [
      'Connected slopes naturally communicate velocity and acceleration over time',
      'Reveals seasonality, cyclical patterns, and long-term macro drift',
      'Area chart emphasizes cumulative volume progression'
    ],
    pitfalls: [
      'Never connect categorical or unordered nominal labels with lines',
      'Spurious dual Y-axes can visually falsify correlation between unrelated trends'
    ],
    codeSnippet: 'sns.lineplot(data=df, x="date", y="daily_active_users")',
    svgIcon: 'line'
  },
  {
    id: 'correlation-matrix',
    question: 'Audit all pairwise linear correlations across a multi-variable feature matrix',
    category: 'Multivariate Correlation',
    recommendedChart: 'Correlation Heatmap',
    dataTypes: 'Full Matrix of Continuous Numerical Features',
    strengths: [
      'Diverging color palettes (e.g. coolwarm from -1.0 to +1.0) highlight relationships instantly',
      'Identifies multicollinearity between predictor variables for feature pruning',
      'Identifies top features strongly correlated with the target label'
    ],
    pitfalls: [
      'Pearson correlation heatmaps only evaluate linear relationships (misses non-linearities)',
      'Always use a diverging palette with 0 centered at neutral white/gray'
    ],
    codeSnippet: 'sns.heatmap(df.corr(), annot=True, cmap="coolwarm", vmin=-1, vmax=1)',
    svgIcon: 'heat'
  },
  {
    id: 'pairwise-matrix',
    question: 'Explore all pairwise bivariate scatter plots and univariate distributions at once',
    category: 'Comprehensive Matrix',
    recommendedChart: 'Pair Plot (Scatterplot Matrix)',
    dataTypes: '3 to 6 Continuous Numerical Features (+ 1 Categorical for hue)',
    strengths: [
      'Diagonal displays univariate distributions (histograms/KDE)',
      'Off-diagonals display all possible bivariate scatter combinations',
      'The fastest way to scan multi-dimensional dataset geometry in a single view'
    ],
    pitfalls: [
      'Does not scale to 20+ features (matrix becomes too tiny to inspect and consumes massive compute)',
      'Select top 4-6 most important features before running'
    ],
    codeSnippet: 'sns.pairplot(df[["age", "income", "spend", "target_tier"]], hue="target_tier")',
    svgIcon: 'pair'
  }
];

export default function ChartSelectionGuide() {
  const [selectedGoalId, setSelectedGoalId] = useState<string>('compare-categories');

  const activeGoal = GOALS.find(g => g.id === selectedGoalId) || GOALS[0];

  return (
    <div className="rounded-2xl border border-electric-cyan/30 bg-navy-950/85 p-6 backdrop-blur-md shadow-glow">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-white/10 pb-4 mb-5">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono text-cyan-400">
            <Compass className="h-4 w-4" />
            <span>VISUAL DECISION ARCHITECTURE</span>
          </div>
          <h3 className="text-lg font-bold text-white mt-0.5">
            The Scientific Chart-Selection Decision Guide
          </h3>
          <p className="text-xs text-slate-300">
            Select your analytical objective to get the mathematically appropriate chart choice.
          </p>
        </div>
      </div>

      {/* Goal Selector Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2 mb-6">
        {GOALS.map((g) => (
          <button
            key={g.id}
            onClick={() => setSelectedGoalId(g.id)}
            className={`p-3 rounded-xl border text-left text-xs transition-all flex flex-col justify-between ${
              selectedGoalId === g.id
                ? 'border-cyan-400 bg-cyan-950/40 text-cyan-300 shadow-glow'
                : 'border-white/10 bg-navy-900/60 text-slate-400 hover:text-white hover:bg-navy-900'
            }`}
          >
            <div>
              <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-cyan-400 block mb-1">
                {g.category}
              </span>
              <p className="text-xs text-slate-200 font-medium leading-tight">
                {g.question}
              </p>
            </div>
            <div className="mt-2 pt-2 border-t border-white/5 text-[11px] font-mono text-purple-300 font-bold">
              → {g.recommendedChart.split('/')[0]}
            </div>
          </button>
        ))}
      </div>

      {/* Recommended Chart Dossier */}
      <div className="rounded-xl border border-white/10 bg-navy-900/80 p-5 space-y-4">
        {/* Recommendation Title */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-white/10 pb-3">
          <div>
            <span className="text-[10px] font-mono uppercase text-slate-400 font-bold">
              RECOMMENDED VISUALIZATION
            </span>
            <h4 className="text-xl font-bold font-mono text-cyan-300 mt-0.5">
              {activeGoal.recommendedChart}
            </h4>
          </div>
          <div className="p-2 rounded-lg bg-navy-950 border border-white/10 text-xs font-mono text-slate-300">
            <span className="text-slate-400">Required Input Types: </span>
            <strong className="text-white">{activeGoal.dataTypes}</strong>
          </div>
        </div>

        {/* Strengths & Pitfalls Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* Strengths */}
          <div className="p-4 rounded-xl bg-emerald-950/20 border border-emerald-500/20 space-y-2">
            <div className="flex items-center gap-2 text-xs font-mono font-bold text-emerald-400 uppercase">
              <CheckCircle2 className="h-4 w-4" />
              <span>When to Use & Key Strengths</span>
            </div>
            <ul className="space-y-1.5 text-xs text-slate-200">
              {activeGoal.strengths.map((s, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <span className="text-emerald-400 mt-0.5">•</span>
                  <span>{s}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Pitfalls */}
          <div className="p-4 rounded-xl bg-rose-950/20 border border-rose-500/20 space-y-2">
            <div className="flex items-center gap-2 text-xs font-mono font-bold text-rose-400 uppercase">
              <AlertOctagon className="h-4 w-4" />
              <span>When NOT to Use & Dangerous Pitfalls</span>
            </div>
            <ul className="space-y-1.5 text-xs text-slate-200">
              {activeGoal.pitfalls.map((p, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <span className="text-rose-400 mt-0.5">•</span>
                  <span>{p}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Python Implementation snippet */}
        <div className="p-3.5 rounded-xl bg-black/60 border border-white/10 font-mono text-xs space-y-1.5">
          <div className="flex items-center gap-2 text-cyan-300 font-bold">
            <Code className="h-4 w-4" />
            <span>Python Implementation (Seaborn / Matplotlib):</span>
          </div>
          <pre className="text-slate-300 overflow-x-auto text-[11px] leading-relaxed pt-1">
            {activeGoal.codeSnippet}
          </pre>
        </div>
      </div>
    </div>
  );
}

