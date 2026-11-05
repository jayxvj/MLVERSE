'use client';

import React, { useState, useMemo } from 'react';
import { BarChart3, Sliders, Info, Eye, Layers, Database, Sparkles } from 'lucide-react';
import InteractiveChart from '../InteractiveChart';

type DatasetId = 'houses' | 'sales' | 'customers' | 'students';
type ChartType = 'bar' | 'grouped-bar' | 'stacked-bar' | 'line' | 'scatter' | 'area';

interface DatasetMeta {
  id: DatasetId;
  name: string;
  description: string;
  data: any[];
  xOptions: string[];
  yOptions: string[];
}

const DATASETS: DatasetMeta[] = [
  {
    id: 'houses',
    name: 'Real Estate & Housing',
    description: '10 representative residential properties with architectural and market valuations.',
    xOptions: ['property', 'location'],
    yOptions: ['price_k', 'area_sqft', 'age_years'],
    data: [
      { property: 'P1', location: 'Urban', price_k: 385, area_sqft: 1850, age_years: 8, bedrooms: 3 },
      { property: 'P2', location: 'Suburban', price_k: 245, area_sqft: 1200, age_years: 15, bedrooms: 2 },
      { property: 'P3', location: 'Rural', price_k: 128, area_sqft: 950, age_years: 30, bedrooms: 1 },
      { property: 'P4', location: 'Urban', price_k: 520, area_sqft: 2400, age_years: 3, bedrooms: 4 },
      { property: 'P5', location: 'Suburban', price_k: 310, area_sqft: 1500, age_years: 12, bedrooms: 3 },
      { property: 'P6', location: 'Urban', price_k: 875, area_sqft: 3200, age_years: 1, bedrooms: 5 },
      { property: 'P7', location: 'Suburban', price_k: 450, area_sqft: 2100, age_years: 5, bedrooms: 4 },
      { property: 'P8', location: 'Rural', price_k: 95, area_sqft: 780, age_years: 45, bedrooms: 1 },
      { property: 'P9', location: 'Urban', price_k: 362, area_sqft: 1700, age_years: 18, bedrooms: 3 },
      { property: 'P10', location: 'Suburban', price_k: 215, area_sqft: 1100, age_years: 22, bedrooms: 2 },
    ]
  },
  {
    id: 'sales',
    name: 'Enterprise SaaS Revenue',
    description: 'Quarterly financial performance tracking marketing spend, units sold, and gross revenue.',
    xOptions: ['month'],
    yOptions: ['revenue_k', 'marketing_k', 'units_sold'],
    data: [
      { month: 'Jan', revenue_k: 120, marketing_k: 35, units_sold: 240, profit_k: 45 },
      { month: 'Feb', revenue_k: 145, marketing_k: 42, units_sold: 290, profit_k: 58 },
      { month: 'Mar', revenue_k: 190, marketing_k: 55, units_sold: 380, profit_k: 72 },
      { month: 'Apr', revenue_k: 175, marketing_k: 48, units_sold: 340, profit_k: 65 },
      { month: 'May', revenue_k: 230, marketing_k: 68, units_sold: 450, profit_k: 90 },
      { month: 'Jun', revenue_k: 280, marketing_k: 85, units_sold: 540, profit_k: 115 },
      { month: 'Jul', revenue_k: 310, marketing_k: 92, units_sold: 610, profit_k: 130 },
      { month: 'Aug', revenue_k: 295, marketing_k: 88, units_sold: 580, profit_k: 122 },
      { month: 'Sep', revenue_k: 350, marketing_k: 105, units_sold: 690, profit_k: 148 },
    ]
  },
  {
    id: 'customers',
    name: 'Customer Behavior & Churn',
    description: 'User engagement metrics evaluating tenure, monthly spend, and customer support tickets.',
    xOptions: ['user'],
    yOptions: ['monthly_spend', 'tenure_months', 'support_tickets'],
    data: [
      { user: 'U1', monthly_spend: 120, tenure_months: 24, support_tickets: 1, churn_risk: 15 },
      { user: 'U2', monthly_spend: 45, tenure_months: 6, support_tickets: 5, churn_risk: 82 },
      { user: 'U3', monthly_spend: 210, tenure_months: 36, support_tickets: 0, churn_risk: 5 },
      { user: 'U4', monthly_spend: 85, tenure_months: 14, support_tickets: 3, churn_risk: 45 },
      { user: 'U5', monthly_spend: 30, tenure_months: 3, support_tickets: 8, churn_risk: 94 },
      { user: 'U6', monthly_spend: 165, tenure_months: 28, support_tickets: 2, churn_risk: 22 },
      { user: 'U7', monthly_spend: 95, tenure_months: 18, support_tickets: 2, churn_risk: 30 },
      { user: 'U8', monthly_spend: 250, tenure_months: 48, support_tickets: 1, churn_risk: 8 },
    ]
  },
  {
    id: 'students',
    name: 'Academic Student Performance',
    description: 'Study habits and physiological indicators correlated with final exam scores.',
    xOptions: ['student'],
    yOptions: ['final_exam', 'study_hours', 'attendance_pct'],
    data: [
      { student: 'S1', study_hours: 12, sleep_hours: 7.5, attendance_pct: 95, final_exam: 88 },
      { student: 'S2', study_hours: 4, sleep_hours: 5.0, attendance_pct: 70, final_exam: 52 },
      { student: 'S3', study_hours: 18, sleep_hours: 8.0, attendance_pct: 98, final_exam: 96 },
      { student: 'S4', study_hours: 8, sleep_hours: 6.5, attendance_pct: 82, final_exam: 74 },
      { student: 'S5', study_hours: 2, sleep_hours: 4.5, attendance_pct: 55, final_exam: 42 },
      { student: 'S6', study_hours: 15, sleep_hours: 7.0, attendance_pct: 92, final_exam: 91 },
      { student: 'S7', study_hours: 9, sleep_hours: 6.8, attendance_pct: 86, final_exam: 78 },
      { student: 'S8', study_hours: 6, sleep_hours: 6.0, attendance_pct: 75, final_exam: 65 },
    ]
  }
];

export default function ChartPlayground() {
  const [datasetId, setDatasetId] = useState<DatasetId>('sales');
  const [chartType, setChartType] = useState<ChartType>('bar');
  const [selectedY, setSelectedY] = useState<string>('revenue_k');

  const currentDataset = useMemo(() => {
    return DATASETS.find(d => d.id === datasetId) || DATASETS[0];
  }, [datasetId]);

  // Adjust Y variable if not valid in new dataset
  const activeY = useMemo(() => {
    if (currentDataset.yOptions.includes(selectedY)) return selectedY;
    return currentDataset.yOptions[0];
  }, [currentDataset, selectedY]);

  const xKey = currentDataset.xOptions[0];

  // Chart configuration
  const chartProps = useMemo(() => {
    let rechartType: 'bar' | 'line' | 'scatter' = 'bar';
    if (chartType === 'line' || chartType === 'area') rechartType = 'line';
    if (chartType === 'scatter') rechartType = 'scatter';

    let series = [{ key: activeY, name: activeY.replace('_', ' ').toUpperCase(), color: '#00f0ff' }];

    if (chartType === 'grouped-bar' || chartType === 'stacked-bar') {
      const secondY = currentDataset.yOptions[1] || currentDataset.yOptions[0];
      series = [
        { key: activeY, name: activeY.replace('_', ' ').toUpperCase(), color: '#00f0ff' },
        { key: secondY, name: secondY.replace('_', ' ').toUpperCase(), color: '#a855f7' }
      ];
    }

    return { rechartType, series };
  }, [chartType, activeY, currentDataset]);

  // Interpretation metadata
  const interpretation = useMemo(() => {
    switch (chartType) {
      case 'bar':
        return {
          title: 'Discrete Categorical Comparison',
          desc: `The Bar Chart displays ${activeY.replace('_', ' ')} across distinct ${xKey} entities. Rectangular bars encode values as physical heights from an absolute zero baseline, making proportional comparisons perceptually effortless.`,
          idealFor: 'Comparing discrete categories or individual observations.',
          danger: 'Never truncate the Y-axis zero baseline on bar charts; doing so distorts visual ratios.'
        };
      case 'grouped-bar':
        return {
          title: 'Multi-Metric Clustered Comparison',
          desc: `The Grouped Bar Chart clusters two parallel variables side-by-side for each ${xKey}. Allows simultaneous evaluation of intra-group differences and overall volume.`,
          idealFor: 'Comparing 2-3 related numeric metrics across categories.',
          danger: 'Clustering more than 4 metrics per group creates visual clutter and information overload.'
        };
      case 'stacked-bar':
        return {
          title: 'Part-to-Whole Composition',
          desc: `The Stacked Bar Chart demonstrates the cumulative total while displaying internal sub-components.`,
          idealFor: 'Visualizing total volume alongside component proportions.',
          danger: 'Evaluating secondary segments is difficult because they lack a shared bottom baseline.'
        };
      case 'line':
        return {
          title: 'Continuous Trend & Trajectory',
          desc: `The Line Chart connects sequential observations with linear segments. The human visual cortex naturally interprets connected slopes as rate-of-change and directional velocity.`,
          idealFor: 'Sequential or temporal progressions (time-series, iterations, epochs).',
          danger: 'Never use line charts for unordered nominal categories (connecting Paris to Tokyo implies a false continuum).'
        };
      case 'area':
        return {
          title: 'Cumulative Volume Progression',
          desc: `The Area Chart colors the region under the trend line, emphasizing total cumulative weight and magnitude over time.`,
          idealFor: 'Highlighting massive volume shifts across temporal intervals.',
          danger: 'Avoid multiple overlapping opaque areas; use transparency or stacked lines.'
        };
      case 'scatter':
        return {
          title: 'Bivariate Relationship & Correlation',
          desc: `The Scatter Plot positions each sample as a Cartesian point (X, Y). It is the premier diagnostic tool for discovering correlations, clusters, and non-linear associations.`,
          idealFor: 'Examine relationships and outliers between two continuous variables.',
          danger: 'Overplotting occurs when thousands of opaque points overlap into an unreadable solid blob.'
        };
    }
  }, [chartType, activeY, xKey]);

  return (
    <div className="rounded-2xl border border-electric-cyan/30 bg-navy-950/85 p-6 backdrop-blur-md shadow-glow">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-white/10 pb-4 mb-5">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono text-cyan-400">
            <BarChart3 className="h-4 w-4" />
            <span>INTERACTIVE VISUALIZATION LAB</span>
          </div>
          <h3 className="text-lg font-bold text-white mt-0.5">
            The Interactive Chart Playground
          </h3>
          <p className="text-xs text-slate-300">
            Switch datasets, change graph types, and inspect diagnostic interpretations in real-time.
          </p>
        </div>

        {/* Dataset Selector */}
        <div className="flex items-center gap-1.5 p-1 rounded-xl bg-navy-900 border border-white/10">
          <Database className="h-3.5 w-3.5 text-cyan-400 ml-1.5" />
          <select
            value={datasetId}
            onChange={(e) => setDatasetId(e.target.value as DatasetId)}
            className="bg-transparent text-xs font-mono text-slate-200 py-1 px-2 focus:outline-none cursor-pointer"
          >
            {DATASETS.map(d => (
              <option key={d.id} value={d.id} className="bg-navy-900 text-white">
                {d.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Control Strip: Chart Type & Variable Selector */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-4 mb-5">
        {/* Chart Type Buttons */}
        <div className="md:col-span-8 flex flex-wrap gap-1.5 p-1.5 rounded-xl bg-navy-900/80 border border-white/10">
          {(['bar', 'grouped-bar', 'stacked-bar', 'line', 'area', 'scatter'] as ChartType[]).map(t => (
            <button
              key={t}
              onClick={() => setChartType(t)}
              className={`px-3 py-1.5 rounded-lg text-xs font-mono font-medium transition-all capitalize ${
                chartType === t
                  ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 shadow-glow'
                  : 'text-slate-400 hover:text-white hover:bg-white/5'
              }`}
            >
              {t.replace('-', ' ')}
            </button>
          ))}
        </div>

        {/* Y-Axis Metric Selector */}
        <div className="md:col-span-4 flex items-center justify-between p-2 rounded-xl bg-navy-900/80 border border-white/10 font-mono text-xs">
          <span className="text-slate-400 text-[11px] font-bold">Metric (Y):</span>
          <div className="flex gap-1">
            {currentDataset.yOptions.map(y => (
              <button
                key={y}
                onClick={() => setSelectedY(y)}
                className={`px-2 py-1 rounded text-[11px] transition-colors ${
                  activeY === y
                    ? 'bg-purple-500/30 text-purple-300 border border-purple-500/40 font-bold'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                {y.replace('_', ' ')}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Recharts Canvas */}
      <div className="rounded-xl border border-white/10 bg-navy-900/40 p-4 mb-5">
        <InteractiveChart
          type={chartProps.rechartType}
          data={currentDataset.data}
          xKey={xKey}
          series={chartProps.series}
          height={280}
        />
      </div>

      {/* Real-time Educational Interpretation Banner */}
      <div className="p-4 rounded-xl border border-cyan-500/20 bg-navy-900/70 text-xs space-y-2">
        <div className="flex items-center justify-between border-b border-white/10 pb-2">
          <div className="flex items-center gap-2 font-mono font-bold text-cyan-300">
            <Sparkles className="h-4 w-4" />
            <span>Analytical Interpretation: {interpretation.title}</span>
          </div>
          <span className="text-[10px] font-mono text-slate-400">
            Dataset: {currentDataset.name}
          </span>
        </div>
        <p className="text-slate-200 leading-relaxed">
          {interpretation.desc}
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1 text-[11px] font-mono">
          <div className="p-2.5 rounded-lg bg-emerald-950/20 border border-emerald-500/20 text-emerald-300">
            <strong>Ideal Use Case:</strong> {interpretation.idealFor}
          </div>
          <div className="p-2.5 rounded-lg bg-rose-950/20 border border-rose-500/20 text-rose-300">
            <strong>Common Pitfall:</strong> {interpretation.danger}
          </div>
        </div>
      </div>
    </div>
  );
}

