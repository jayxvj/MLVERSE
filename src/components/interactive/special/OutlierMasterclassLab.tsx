'use client';

import React, { useState, useMemo } from 'react';
import {
  AlertTriangle,
  Sliders,
  RefreshCw,
  Info,
  CheckCircle2,
  XCircle,
  TrendingUp,
  BarChart2,
  Code,
  BookOpen,
  Layers,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Zap,
  Target,
  Plus,
  Trash2,
  Check,
  ChevronRight,
  HelpCircle,
  Database,
  RotateCcw
} from 'lucide-react';
import {
  ResponsiveContainer,
  ScatterChart,
  Scatter,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  BarChart,
  Bar,
  Cell,
  LineChart,
  Line,
  ReferenceLine
} from 'recharts';

// Baseline synthetic house price dataset: size (sq ft) vs price ($k)
interface DataPoint {
  id: number;
  sqft: number;
  price: number;
  isOutlier?: boolean;
  treatedPrice?: number;
  label?: string;
}

const DEFAULT_SAMPLES: DataPoint[] = [
  { id: 1, sqft: 1100, price: 210, label: 'Cottage' },
  { id: 2, sqft: 1250, price: 235, label: 'Condo A' },
  { id: 3, sqft: 1300, price: 220, label: 'Townhouse' },
  { id: 4, sqft: 1450, price: 260, label: 'Split-level' },
  { id: 5, sqft: 1500, price: 250, label: 'Ranch' },
  { id: 6, sqft: 1600, price: 290, label: 'Suburban 1' },
  { id: 7, sqft: 1750, price: 310, label: 'Suburban 2' },
  { id: 8, sqft: 1800, price: 295, label: 'Duplex' },
  { id: 9, sqft: 1950, price: 340, label: 'Family Home' },
  { id: 10, sqft: 2100, price: 360, label: 'Colonial' },
  { id: 11, sqft: 2200, price: 350, label: 'Craftsman' },
  { id: 12, sqft: 2400, price: 410, label: 'Modern Build' },
  { id: 13, sqft: 2500, price: 395, label: 'Estate A' },
  { id: 14, sqft: 2700, price: 440, label: 'Estate B' },
  { id: 15, sqft: 2850, price: 460, label: 'Executive Villa' }
];

export default function OutlierMasterclassLab() {
  const [activeTopic, setActiveTopic] = useState<
    'lab' | 'intro' | 'impact' | 'math' | 'detection' | 'treatment' | 'python' | 'casestudy' | 'quiz'
  >('lab');

  // Topic 6: Interactive Lab State
  const [points, setPoints] = useState<DataPoint[]>(DEFAULT_SAMPLES);
  const [detectionMethod, setDetectionMethod] = useState<'iqr' | 'zscore' | 'mad'>('iqr');
  const [zThreshold, setZThreshold] = useState<number>(2.5);
  const [treatmentMethod, setTreatmentMethod] = useState<'none' | 'remove' | 'cap' | 'log' | 'robust'>('none');
  const [newSqft, setNewSqft] = useState<number>(2000);
  const [newPrice, setNewPrice] = useState<number>(300);

  // Compute Core Statistics for Prices
  const stats = useMemo(() => {
    const rawPrices = points.map(p => p.price);
    const n = rawPrices.length;
    if (n === 0) {
      return {
        n: 0,
        mean: 0,
        median: 0,
        std: 0,
        variance: 0,
        q1: 0,
        q3: 0,
        iqr: 0,
        lowerFence: 0,
        upperFence: 0,
        mad: 0,
        min: 0,
        max: 0
      };
    }

    const sorted = [...rawPrices].sort((a, b) => a - b);
    const sum = sorted.reduce((acc, v) => acc + v, 0);
    const mean = sum / n;

    const variance =
      n > 1
        ? sorted.reduce((acc, v) => acc + Math.pow(v - mean, 2), 0) / (n - 1)
        : 0;
    const std = Math.sqrt(variance);

    // Median
    const mid = Math.floor(n / 2);
    const median = n % 2 !== 0 ? sorted[mid] : (sorted[mid - 1] + sorted[mid]) / 2;

    // Quartiles
    const q1Idx = Math.floor(n * 0.25);
    const q3Idx = Math.floor(n * 0.75);
    const q1 = sorted[q1Idx];
    const q3 = sorted[q3Idx];
    const iqr = q3 - q1;

    const lowerFence = q1 - 1.5 * iqr;
    const upperFence = q3 + 1.5 * iqr;

    // Median Absolute Deviation (MAD)
    const absDevs = sorted.map(v => Math.abs(v - median)).sort((a, b) => a - b);
    const mad =
      n % 2 !== 0 ? absDevs[mid] : (absDevs[mid - 1] + absDevs[mid]) / 2 || 1;

    return {
      n,
      mean,
      median,
      std,
      variance,
      q1,
      q3,
      iqr,
      lowerFence,
      upperFence,
      mad,
      min: sorted[0],
      max: sorted[n - 1]
    };
  }, [points]);

  // Tag points as outliers based on selected method
  const taggedPoints = useMemo(() => {
    return points.map(p => {
      let isOutlier = false;
      let scoreLabel = '';

      if (detectionMethod === 'iqr') {
        isOutlier = p.price < stats.lowerFence || p.price > stats.upperFence;
        scoreLabel = isOutlier
          ? p.price > stats.upperFence
            ? `> Upper Fence (${stats.upperFence.toFixed(0)})`
            : `< Lower Fence (${stats.lowerFence.toFixed(0)})`
          : 'Normal IQR';
      } else if (detectionMethod === 'zscore') {
        const z = stats.std > 0 ? (p.price - stats.mean) / stats.std : 0;
        isOutlier = Math.abs(z) > zThreshold;
        scoreLabel = `Z = ${z.toFixed(2)}`;
      } else if (detectionMethod === 'mad') {
        const modZ = (0.6745 * (p.price - stats.median)) / (stats.mad || 1);
        isOutlier = Math.abs(modZ) > 3.5;
        scoreLabel = `Mod Z = ${modZ.toFixed(2)}`;
      }

      // Compute treated price for demonstration
      let treatedPrice = p.price;
      if (treatmentMethod === 'cap') {
        if (p.price > stats.upperFence) treatedPrice = stats.upperFence;
        if (p.price < stats.lowerFence) treatedPrice = stats.lowerFence;
      } else if (treatmentMethod === 'log') {
        treatedPrice = Math.log(p.price + 1) * 60; // scaled for chart visualization
      } else if (treatmentMethod === 'robust') {
        treatedPrice = stats.iqr > 0 ? ((p.price - stats.median) / stats.iqr) * 100 + 300 : p.price;
      }

      return {
        ...p,
        isOutlier,
        scoreLabel,
        treatedPrice: Number(treatedPrice.toFixed(1))
      };
    });
  }, [points, detectionMethod, zThreshold, treatmentMethod, stats]);

  // Treated points based on user's choice
  const displayPoints = useMemo(() => {
    if (treatmentMethod === 'remove') {
      return taggedPoints.filter(p => !p.isOutlier);
    }
    return taggedPoints;
  }, [taggedPoints, treatmentMethod]);

  const outlierCount = useMemo(() => {
    return taggedPoints.filter(p => p.isOutlier).length;
  }, [taggedPoints]);

  // Presets for introducing outliers
  const addPresetOutlier = (type: 'luxury' | 'typo' | 'subzero' | 'huge-leverage') => {
    const nextId = Math.max(...points.map(p => p.id), 0) + 1;
    if (type === 'luxury') {
      setPoints(prev => [...prev, { id: nextId, sqft: 3200, price: 920, label: 'Luxury Penthouse Outlier' }]);
    } else if (type === 'typo') {
      setPoints(prev => [...prev, { id: nextId, sqft: 1400, price: 1200, label: 'Data Entry Typo ($1.2M on 1400sf)' }]);
    } else if (type === 'subzero') {
      setPoints(prev => [...prev, { id: nextId, sqft: 1800, price: 40, label: 'Auction Glitch ($40k)' }]);
    } else if (type === 'huge-leverage') {
      setPoints(prev => [...prev, { id: nextId, sqft: 4800, price: 980, label: 'Mega Mansion' }]);
    }
  };

  const handleAddCustomPoint = () => {
    if (!newSqft || !newPrice) return;
    const nextId = Math.max(...points.map(p => p.id), 0) + 1;
    setPoints(prev => [
      ...prev,
      { id: nextId, sqft: Number(newSqft), price: Number(newPrice), label: `Custom (${newSqft}sf)` }
    ]);
  };

  const removePoint = (id: number) => {
    setPoints(prev => prev.filter(p => p.id !== id));
  };

  const resetData = () => {
    setPoints(DEFAULT_SAMPLES);
    setTreatmentMethod('none');
  };

  // Topic 2: Interactive Impact Simulator State
  const [modelSimOutlier, setModelSimOutlier] = useState<number>(300); // normal ~300
  const [hasModelOutlier, setHasModelOutlier] = useState<boolean>(true);

  // Topic 9: Quiz State
  const [quizAnswers, setQuizAnswers] = useState<Record<number, number>>({});
  const [quizSubmitted, setQuizSubmitted] = useState<boolean>(false);

  const QUIZ_QUESTIONS = [
    {
      id: 1,
      q: 'Which measure of central tendency is considered robust against extreme outliers?',
      options: ['Arithmetic Mean', 'Median', 'Standard Deviation', 'Variance'],
      correct: 1,
      explain: 'The median has a 50% breakdown point, meaning up to 50% of the dataset can be corrupted before the median becomes infinite, whereas a single outlier can shift the mean arbitrarily.'
    },
    {
      id: 2,
      q: 'Given Q1 = 40 and Q3 = 80, what is the Upper Bound for outlier detection using Tukey’s IQR rule?',
      options: ['120', '140', '160', '100'],
      correct: 1,
      explain: 'IQR = Q3 - Q1 = 80 - 40 = 40. Upper Bound = Q3 + (1.5 × IQR) = 80 + (1.5 × 40) = 80 + 60 = 140.'
    },
    {
      id: 3,
      q: 'Which machine learning algorithm family is most intrinsically robust to univariate feature outliers?',
      options: ['Linear Regression (OLS)', 'K-Means Clustering', 'Decision Trees', 'Principal Component Analysis (PCA)'],
      correct: 2,
      explain: 'Decision trees evaluate split thresholds based on sorted rank order (e.g. x_i > 50). Whether the maximum value is 55 or 55,000 does not alter the partition.'
    },
    {
      id: 4,
      q: 'Why can standard Z-Score detection fail on small datasets with extreme outliers (the masking effect)?',
      options: [
        'Z-Scores only work on categorical data',
        'The outlier itself heavily inflates both the mean and standard deviation, reducing its own calculated Z-score',
        'Z-scores cannot be negative',
        'Scikit-learn disallows Z-score calculations'
      ],
      correct: 1,
      explain: 'Because μ and σ are calculated using the outlier, the outlier inflates σ quadratically, pulling the Z-score back inside the normal ±3 cutoff.'
    },
    {
      id: 5,
      q: 'What is Winsorization?',
      options: [
        'Deleting all rows containing an outlier',
        'Clamping values outside a threshold to the exact boundary percentile or fence values',
        'Replacing outliers with random noise',
        'Dividing values by standard deviation'
      ],
      correct: 1,
      explain: 'Winsorization preserves sample size by capping extreme values to the specified percentiles (e.g. 1st and 99th) or Tukey fences.'
    },
    {
      id: 6,
      q: 'In Credit Card Fraud Detection, how should identified outlier transactions be treated?',
      options: [
        'Delete them immediately before training',
        'Impute them with the median transaction amount',
        'Retain them and treat the anomaly as the primary positive target class to predict',
        'Winsorize them to $50'
      ],
      correct: 2,
      explain: 'In fraud detection, the outliers ARE the signal of interest. Deleting or capping them completely destroys the ground-truth fraud pattern.'
    }
  ];

  const handleSelectQuiz = (qIdx: number, optIdx: number) => {
    if (quizSubmitted) return;
    setQuizAnswers(prev => ({ ...prev, [qIdx]: optIdx }));
  };

  const quizScore = useMemo(() => {
    let count = 0;
    QUIZ_QUESTIONS.forEach((q, idx) => {
      if (quizAnswers[idx] === q.correct) count++;
    });
    return count;
  }, [quizAnswers]);

  return (
    <div className="w-full space-y-6">
      {/* Light Masterclass Header Banner */}
      <div className="rounded-2xl border border-indigo-200 bg-gradient-to-br from-white via-indigo-50/40 to-slate-100 p-6 sm:p-8 shadow-sm text-slate-900">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-100 border border-indigo-200 text-xs font-mono text-indigo-700 font-bold mb-3">
          <Sparkles className="h-3.5 w-3.5 text-indigo-600" />
          <span>PREPROCESSING & ANOMALY MASTERY</span>
        </div>
        <h1 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
          Outlier Detection & Treatment
        </h1>
        <p className="text-sm sm:text-base text-slate-600 mt-2 max-w-3xl leading-relaxed">
          Understand, detect, analyze, and handle outliers in machine learning. From statistical foundations
          (Mean, IQR, Z-Score, MAD) to interactive visual laboratories and leak-free production pipelines.
        </p>

        {/* Master Topics Navigation Tabs */}
        <div className="mt-6 flex flex-wrap gap-2 pt-4 border-t border-slate-200">
          {[
            { id: 'lab', label: 'Interactive Lab', icon: Sliders },
            { id: 'intro', label: '1. What Are Outliers?', icon: BookOpen },
            { id: 'impact', label: '2. Impact on ML', icon: TrendingUp },
            { id: 'math', label: '3. Statistical Foundations', icon: Layers },
            { id: 'detection', label: '4. Detection Methods', icon: BarChart2 },
            { id: 'treatment', label: '5. Treatment Strategies', icon: ShieldCheck },
            { id: 'python', label: '6. Python Code', icon: Code },
            { id: 'casestudy', label: '7. Real-World Case Study', icon: Database },
            { id: 'quiz', label: '8. Knowledge Assessment', icon: HelpCircle }
          ].map(t => {
            const Icon = t.icon;
            const active = activeTopic === t.id;
            return (
              <button
                key={t.id}
                onClick={() => setActiveTopic(t.id as any)}
                className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-mono font-bold transition-all shadow-sm ${
                  active
                    ? 'bg-indigo-600 text-white shadow-indigo-200 ring-2 ring-indigo-400'
                    : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
                }`}
              >
                <Icon className="h-3.5 w-3.5" />
                <span>{t.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* ======================================================== */}
      {/* TOPIC 6: INTERACTIVE OUTLIER DETECTION LABORATORY         */}
      {/* ======================================================== */}
      {activeTopic === 'lab' && (
        <div className="space-y-6">
          {/* Lab Control Surface */}
          <div className="rounded-2xl border border-slate-200 bg-white p-5 sm:p-6 shadow-sm space-y-5">
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 pb-4">
              <div>
                <span className="text-xs font-mono font-bold text-indigo-600 uppercase tracking-wider">
                  Topic 6 Laboratory
                </span>
                <h2 className="text-xl font-bold text-slate-900">
                  Interactive Outlier Detection & Treatment Workbench
                </h2>
                <p className="text-xs text-slate-500 mt-0.5">
                  Manipulate real data points, introduce extreme leverage values, switch detection algorithms, and test treatments.
                </p>
              </div>

              <button
                onClick={resetData}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-300 text-xs font-mono text-slate-600 hover:bg-slate-50 transition"
              >
                <RotateCcw className="h-3.5 w-3.5" />
                <span>Reset Baseline</span>
              </button>
            </div>

            {/* Quick Presets for Adding Outliers */}
            <div className="space-y-2">
              <span className="text-xs font-mono font-bold text-slate-700">
                1. Deliberately Introduce Anomalies:
              </span>
              <div className="flex flex-wrap gap-2">
                <button
                  onClick={() => addPresetOutlier('luxury')}
                  className="px-3 py-1.5 rounded-lg bg-rose-50 border border-rose-200 text-xs font-mono font-semibold text-rose-700 hover:bg-rose-100 transition flex items-center gap-1"
                >
                  <Plus className="h-3.5 w-3.5" />
                  <span>+ $920k Luxury Mansion (High Value)</span>
                </button>
                <button
                  onClick={() => addPresetOutlier('typo')}
                  className="px-3 py-1.5 rounded-lg bg-amber-50 border border-amber-200 text-xs font-mono font-semibold text-amber-700 hover:bg-amber-100 transition flex items-center gap-1"
                >
                  <Plus className="h-3.5 w-3.5" />
                  <span>+ $1.2M Data Entry Typo</span>
                </button>
                <button
                  onClick={() => addPresetOutlier('subzero')}
                  className="px-3 py-1.5 rounded-lg bg-orange-50 border border-orange-200 text-xs font-mono font-semibold text-orange-700 hover:bg-orange-100 transition flex items-center gap-1"
                >
                  <Plus className="h-3.5 w-3.5" />
                  <span>+ $40k Glitch (Low Value)</span>
                </button>
                <button
                  onClick={() => addPresetOutlier('huge-leverage')}
                  className="px-3 py-1.5 rounded-lg bg-purple-50 border border-purple-200 text-xs font-mono font-semibold text-purple-700 hover:bg-purple-100 transition flex items-center gap-1"
                >
                  <Plus className="h-3.5 w-3.5" />
                  <span>+ 4,800sf Mega Mansion</span>
                </button>
              </div>
            </div>

            {/* Custom Data Input & Detection Switcher */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
              {/* Custom Point Injector */}
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-3">
                <span className="text-xs font-mono font-bold text-slate-700">Add Custom Data Point:</span>
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="text-[11px] font-mono text-slate-500">Size (Sq Ft):</label>
                    <input
                      type="number"
                      value={newSqft}
                      onChange={e => setNewSqft(Number(e.target.value))}
                      className="w-full mt-1 px-2.5 py-1.5 rounded-lg border border-slate-300 text-xs font-mono bg-white text-slate-800"
                    />
                  </div>
                  <div>
                    <label className="text-[11px] font-mono text-slate-500">Price ($000s):</label>
                    <input
                      type="number"
                      value={newPrice}
                      onChange={e => setNewPrice(Number(e.target.value))}
                      className="w-full mt-1 px-2.5 py-1.5 rounded-lg border border-slate-300 text-xs font-mono bg-white text-slate-800"
                    />
                  </div>
                </div>
                <button
                  onClick={handleAddCustomPoint}
                  className="w-full py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white font-mono text-xs font-bold transition flex items-center justify-center gap-1"
                >
                  <Plus className="h-3.5 w-3.5" />
                  <span>Insert Data Point</span>
                </button>
              </div>

              {/* Detection Algorithm Settings */}
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-3">
                <span className="text-xs font-mono font-bold text-slate-700">2. Select Detection Method:</span>
                <div className="grid grid-cols-3 gap-1.5">
                  {[
                    { id: 'iqr', label: 'Tukey IQR (1.5x)' },
                    { id: 'zscore', label: 'Z-Score (|Z| > T)' },
                    { id: 'mad', label: 'Modified Z (MAD)' }
                  ].map(m => (
                    <button
                      key={m.id}
                      onClick={() => setDetectionMethod(m.id as any)}
                      className={`py-2 px-1 rounded-lg text-[11px] font-mono font-bold border transition ${
                        detectionMethod === m.id
                          ? 'bg-white border-indigo-600 text-indigo-700 shadow-sm ring-1 ring-indigo-400'
                          : 'bg-slate-100 border-slate-200 text-slate-600 hover:bg-white'
                      }`}
                    >
                      {m.label}
                    </button>
                  ))}
                </div>

                {detectionMethod === 'zscore' && (
                  <div className="pt-1">
                    <div className="flex justify-between text-xs font-mono text-slate-600 mb-1">
                      <span>Z-Threshold Cutoff:</span>
                      <strong className="text-indigo-600">{zThreshold.toFixed(1)} σ</strong>
                    </div>
                    <input
                      type="range"
                      min={1.5}
                      max={4.0}
                      step={0.1}
                      value={zThreshold}
                      onChange={e => setZThreshold(Number(e.target.value))}
                      className="w-full accent-indigo-600"
                    />
                  </div>
                )}
              </div>
            </div>

            {/* Treatment Selector */}
            <div className="p-4 rounded-xl bg-indigo-50/50 border border-indigo-200 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono font-bold text-indigo-900">
                  3. Select Outlier Treatment Action (Transforms Dataset):
                </span>
                <span className="text-xs font-mono font-bold text-rose-600">
                  {outlierCount} Outlier{outlierCount === 1 ? '' : 's'} Identified
                </span>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
                {[
                  { id: 'none', label: '1. Keep Raw (Benchmark)', desc: 'No modification' },
                  { id: 'remove', label: '2. Trimming (Drop)', desc: 'Delete outlier rows' },
                  { id: 'cap', label: '3. Capping (Winsorize)', desc: 'Clamp to IQR fences' },
                  { id: 'log', label: '4. Log Transform', desc: 'ln(Price + 1) scale' },
                  { id: 'robust', label: '5. Robust Scaler', desc: '(x - Median) / IQR' }
                ].map(t => (
                  <button
                    key={t.id}
                    onClick={() => setTreatmentMethod(t.id as any)}
                    className={`p-2.5 rounded-xl text-left border transition text-xs ${
                      treatmentMethod === t.id
                        ? 'bg-white border-indigo-600 shadow-sm ring-2 ring-indigo-300'
                        : 'bg-white/80 border-slate-200 hover:bg-white'
                    }`}
                  >
                    <div className="font-bold text-slate-900 font-mono">{t.label}</div>
                    <div className="text-[10px] text-slate-500 mt-0.5">{t.desc}</div>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Statistical Badges Dashboard */}
          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 gap-3">
            <div className="p-3.5 rounded-xl bg-white border border-slate-200 shadow-sm font-mono">
              <span className="text-[10px] uppercase font-bold text-slate-400">Sample Size (N)</span>
              <div className="text-xl font-black text-slate-900 mt-0.5">{displayPoints.length}</div>
              <span className="text-[10px] text-slate-500">Points active</span>
            </div>
            <div className="p-3.5 rounded-xl bg-white border border-slate-200 shadow-sm font-mono">
              <span className="text-[10px] uppercase font-bold text-indigo-500">Mean (μ)</span>
              <div className="text-xl font-black text-slate-900 mt-0.5">${stats.mean.toFixed(1)}k</div>
              <span className="text-[10px] text-rose-500">Vulnerable to tail</span>
            </div>
            <div className="p-3.5 rounded-xl bg-white border border-slate-200 shadow-sm font-mono">
              <span className="text-[10px] uppercase font-bold text-emerald-600">Median (Q2)</span>
              <div className="text-xl font-black text-slate-900 mt-0.5">${stats.median.toFixed(1)}k</div>
              <span className="text-[10px] text-emerald-600 font-bold">50% breakdown</span>
            </div>
            <div className="p-3.5 rounded-xl bg-white border border-slate-200 shadow-sm font-mono">
              <span className="text-[10px] uppercase font-bold text-indigo-500">IQR (Q3 - Q1)</span>
              <div className="text-xl font-black text-slate-900 mt-0.5">${stats.iqr.toFixed(1)}k</div>
              <span className="text-[10px] text-slate-500">Q1: ${stats.q1}k | Q3: ${stats.q3}k</span>
            </div>
            <div className="p-3.5 rounded-xl bg-white border border-slate-200 shadow-sm font-mono">
              <span className="text-[10px] uppercase font-bold text-indigo-500">Lower Fence</span>
              <div className="text-xl font-black text-slate-900 mt-0.5">${stats.lowerFence.toFixed(1)}k</div>
              <span className="text-[10px] text-slate-500">Q1 - 1.5×IQR</span>
            </div>
            <div className="p-3.5 rounded-xl bg-white border border-slate-200 shadow-sm font-mono">
              <span className="text-[10px] uppercase font-bold text-indigo-500">Upper Fence</span>
              <div className="text-xl font-black text-slate-900 mt-0.5">${stats.upperFence.toFixed(1)}k</div>
              <span className="text-[10px] text-slate-500">Q3 + 1.5×IQR</span>
            </div>
          </div>

          {/* Visual Charts: Scatter Plot & Boxplot Representation */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Main Scatter Plot */}
            <div className="lg:col-span-2 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm space-y-3">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-sm font-bold text-slate-900 font-mono">
                    Bivariate Scatter: Size (sqft) vs Price ($000s)
                  </h3>
                  <span className="text-xs text-slate-500">
                    {treatmentMethod === 'none'
                      ? 'Displaying raw observations with anomaly highlighting'
                      : `Applied treatment: ${treatmentMethod.toUpperCase()}`}
                  </span>
                </div>
                <div className="flex items-center gap-2 text-xs font-mono">
                  <span className="inline-flex items-center gap-1 text-slate-600">
                    <span className="h-3 w-3 rounded-full bg-indigo-500" /> Normal
                  </span>
                  <span className="inline-flex items-center gap-1 text-rose-600 font-bold">
                    <span className="h-3 w-3 rounded-full bg-rose-500" /> Outlier
                  </span>
                </div>
              </div>

              <div className="h-72 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <ScatterChart margin={{ top: 20, right: 20, bottom: 20, left: 10 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                    <XAxis
                      type="number"
                      dataKey="sqft"
                      name="Size"
                      unit="sf"
                      domain={['auto', 'auto']}
                      stroke="#64748b"
                      tick={{ fontSize: 11 }}
                    />
                    <YAxis
                      type="number"
                      dataKey={treatmentMethod === 'none' || treatmentMethod === 'remove' ? 'price' : 'treatedPrice'}
                      name="Price"
                      unit="k"
                      domain={['auto', 'auto']}
                      stroke="#64748b"
                      tick={{ fontSize: 11 }}
                    />
                    <Tooltip
                      cursor={{ strokeDasharray: '3 3' }}
                      content={({ active, payload }) => {
                        if (active && payload && payload.length) {
                          const data = payload[0].payload as DataPoint;
                          return (
                            <div className="p-3 bg-slate-900 text-white rounded-xl shadow-xl text-xs font-mono space-y-1">
                              <div className="font-bold text-indigo-300">{data.label || `Sample #${data.id}`}</div>
                              <div>Sq Ft: {data.sqft} sqft</div>
                              <div>Raw Price: ${data.price}k</div>
                              {treatmentMethod !== 'none' && (
                                <div className="text-emerald-400 font-bold">
                                  Treated Value: {data.treatedPrice}
                                </div>
                              )}
                              <div className={data.isOutlier ? 'text-rose-400 font-bold' : 'text-slate-400'}>
                                Status: {data.isOutlier ? '⚠ Flagged Outlier' : 'Inlier / Normal'}
                              </div>
                            </div>
                          );
                        }
                        return null;
                      }}
                    />
                    <Scatter name="Homes" data={displayPoints}>
                      {displayPoints.map((entry, index) => (
                        <Cell
                          key={`cell-${index}`}
                          fill={entry.isOutlier ? '#f43f5e' : '#4f46e5'}
                          stroke={entry.isOutlier ? '#be123c' : '#3730a3'}
                          strokeWidth={entry.isOutlier ? 2 : 1}
                          r={entry.isOutlier ? 7 : 5}
                        />
                      ))}
                    </Scatter>
                  </ScatterChart>
                </ResponsiveContainer>
              </div>

              {/* Lower/Upper Bound Guides */}
              <div className="flex flex-wrap items-center justify-between text-xs font-mono text-slate-500 pt-2 border-t border-slate-100">
                <span>Lower Fence: ${stats.lowerFence.toFixed(0)}k</span>
                <span>Median: ${stats.median.toFixed(0)}k</span>
                <span>Upper Fence: ${stats.upperFence.toFixed(0)}k</span>
              </div>
            </div>

            {/* Box Plot & Distribution View */}
            <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm space-y-4 flex flex-col justify-between">
              <div>
                <h3 className="text-sm font-bold text-slate-900 font-mono">
                  Tukey Boxplot & Whisker Geometry
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  Visual representation of the 5-number summary: Min, Q1, Median, Q3, and Max with 1.5×IQR fences.
                </p>

                {/* Boxplot Diagram Widget */}
                <div className="mt-6 p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-4">
                  <div className="relative h-12 flex items-center">
                    {/* Whisker Line */}
                    <div className="absolute left-2 right-2 h-0.5 bg-slate-400" />
                    {/* Lower Whisker End */}
                    <div className="absolute left-2 h-5 w-0.5 bg-slate-500" />
                    {/* Upper Whisker End */}
                    <div className="absolute right-2 h-5 w-0.5 bg-slate-500" />

                    {/* IQR Box (Q1 to Q3) */}
                    <div
                      className="absolute h-9 bg-indigo-100 border-2 border-indigo-600 rounded flex items-center justify-center"
                      style={{ left: '25%', width: '50%' }}
                    >
                      {/* Median Line */}
                      <div className="h-full w-1 bg-indigo-700" />
                    </div>

                    {/* Outlier Dots */}
                    {outlierCount > 0 && (
                      <div className="absolute right-0.5 flex gap-1">
                        <span className="h-3 w-3 rounded-full bg-rose-500 ring-2 ring-white" />
                      </div>
                    )}
                  </div>

                  <div className="flex justify-between text-[10px] font-mono text-slate-600 pt-1">
                    <span>Min (${stats.min}k)</span>
                    <span className="text-indigo-600 font-bold">Q1 (${stats.q1}k)</span>
                    <span className="text-indigo-800 font-extrabold">Med (${stats.median}k)</span>
                    <span className="text-indigo-600 font-bold">Q3 (${stats.q3}k)</span>
                    <span>Max (${stats.max}k)</span>
                  </div>
                </div>

                {/* Detected Outliers Table */}
                <div className="mt-4 space-y-2">
                  <span className="text-xs font-mono font-bold text-slate-700">Flagged Anomalies:</span>
                  {outlierCount === 0 ? (
                    <div className="p-3 rounded-lg bg-emerald-50 border border-emerald-200 text-xs text-emerald-800 flex items-center gap-2">
                      <CheckCircle2 className="h-4 w-4 text-emerald-600" />
                      <span>Zero outliers detected under current thresholds!</span>
                    </div>
                  ) : (
                    <div className="max-h-36 overflow-y-auto space-y-1.5 pr-1">
                      {taggedPoints
                        .filter(p => p.isOutlier)
                        .map(p => (
                          <div
                            key={p.id}
                            className="p-2 rounded-lg bg-rose-50 border border-rose-200 flex items-center justify-between text-xs font-mono"
                          >
                            <div>
                              <span className="font-bold text-rose-800">{p.label || `Point #${p.id}`}</span>
                              <div className="text-[11px] text-rose-600">
                                {p.sqft} sf &bull; ${p.price}k ({p.scoreLabel})
                              </div>
                            </div>
                            <button
                              onClick={() => removePoint(p.id)}
                              className="p-1 rounded text-rose-600 hover:bg-rose-200 transition"
                              title="Delete Point"
                            >
                              <Trash2 className="h-3.5 w-3.5" />
                            </button>
                          </div>
                        ))}
                    </div>
                  )}
                </div>
              </div>

              <div className="p-3 rounded-xl bg-indigo-50 border border-indigo-200 text-xs text-indigo-900 font-mono">
                <strong>Insight:</strong> Capping with Winsorization clamps extreme points to the fence thresholds, neutralizing leverage without data loss.
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ======================================================== */}
      {/* TOPIC 1: INTRODUCTION TO OUTLIERS                        */}
      {/* ======================================================== */}
      {activeTopic === 'intro' && (
        <div className="rounded-2xl border border-slate-200 bg-white p-6 sm:p-8 shadow-sm space-y-6 text-slate-900">
          <div className="border-b border-slate-200 pb-4">
            <span className="text-xs font-mono font-bold text-indigo-600 uppercase tracking-wider">
              Topic 01 &bull; Conceptual Foundations
            </span>
            <h2 className="text-2xl font-bold text-slate-900 mt-1">
              What are Outliers and Why Do They Occur?
            </h2>
            <p className="text-sm text-slate-600 mt-1">
              Distinguishing normal observations from aberrant anomalies across machine learning datasets.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div className="p-5 rounded-xl bg-slate-50 border border-slate-200 space-y-3">
              <h3 className="text-sm font-bold text-slate-900 font-mono flex items-center gap-2">
                <Sparkles className="h-4 w-4 text-indigo-600" />
                <span>Formal Definition</span>
              </h3>
              <p className="text-xs text-slate-700 leading-relaxed">
                An <strong>outlier</strong> is an observation that lies an abnormal distance from other values in a random sample from a population. In statistical terms (Hawkins, 1980):
              </p>
              <div className="p-3 rounded-lg bg-white border border-indigo-200 text-xs text-indigo-950 font-serif italic">
                &ldquo;An outlier is an observation which deviates so much from other observations as to arouse suspicions that it was generated by a different mechanism.&rdquo;
              </div>
            </div>

            <div className="p-5 rounded-xl bg-slate-50 border border-slate-200 space-y-3">
              <h3 className="text-sm font-bold text-slate-900 font-mono flex items-center gap-2">
                <AlertTriangle className="h-4 w-4 text-amber-500" />
                <span>Why Do Outliers Occur?</span>
              </h3>
              <ul className="space-y-1.5 text-xs text-slate-700">
                <li>&bull; <strong>Human Data Entry Errors</strong>: Typing 1000 instead of 100 or wrong unit conversions.</li>
                <li>&bull; <strong>Sensor / Mechanical Faults</strong>: Voltage spikes, sensor dropouts, GPS drift.</li>
                <li>&bull; <strong>ETL / Processing Glitches</strong>: Null values encoded as -9999 or 999999.</li>
                <li>&bull; <strong>Genuine Natural Extremes</strong>: Billionaire net worth, catastrophic hurricane losses, viral network traffic.</li>
              </ul>
            </div>
          </div>

          {/* Three Types of Outliers Cards */}
          <div className="space-y-3 pt-3">
            <h3 className="text-base font-bold text-slate-900">The 3 Structural Types of Outliers</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-5 rounded-xl border border-indigo-200 bg-indigo-50/40 space-y-2">
                <span className="px-2 py-0.5 rounded bg-indigo-200 text-indigo-800 text-[10px] font-mono font-bold">
                  TYPE 1
                </span>
                <h4 className="text-sm font-bold text-slate-900">Global Outliers (Point Outliers)</h4>
                <p className="text-xs text-slate-600 leading-relaxed">
                  A data point that deviates significantly from the entire dataset feature space globally.
                </p>
                <div className="text-[11px] font-mono text-indigo-900 bg-white p-2 rounded border border-indigo-100">
                  Example: Patient recorded with Age = 230 years, or Home Price = $800,000,000.
                </div>
              </div>

              <div className="p-5 rounded-xl border border-purple-200 bg-purple-50/40 space-y-2">
                <span className="px-2 py-0.5 rounded bg-purple-200 text-purple-800 text-[10px] font-mono font-bold">
                  TYPE 2
                </span>
                <h4 className="text-sm font-bold text-slate-900">Contextual Outliers (Conditional)</h4>
                <p className="text-xs text-slate-600 leading-relaxed">
                  A value that is statistically normal in one context, but completely abnormal in another context.
                </p>
                <div className="text-[11px] font-mono text-purple-900 bg-white p-2 rounded border border-purple-100">
                  Example: 35°C (95°F) is normal in Sahara in July, but anomalous in Antarctica in July.
                </div>
              </div>

              <div className="p-5 rounded-xl border border-cyan-200 bg-cyan-50/40 space-y-2">
                <span className="px-2 py-0.5 rounded bg-cyan-200 text-cyan-800 text-[10px] font-mono font-bold">
                  TYPE 3
                </span>
                <h4 className="text-sm font-bold text-slate-900">Collective Outliers</h4>
                <p className="text-xs text-slate-600 leading-relaxed">
                  A collection of data points whose individual values appear normal, but their combined sequence forms an anomaly.
                </p>
                <div className="text-[11px] font-mono text-cyan-900 bg-white p-2 rounded border border-cyan-100">
                  Example: An ECG heart monitor flatlining at exactly 72.0000 bpm for 4 hours straight.
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ======================================================== */}
      {/* TOPIC 2: IMPACT OF OUTLIERS ON MACHINE LEARNING          */}
      {/* ======================================================== */}
      {activeTopic === 'impact' && (
        <div className="rounded-2xl border border-slate-200 bg-white p-6 sm:p-8 shadow-sm space-y-6 text-slate-900">
          <div className="border-b border-slate-200 pb-4">
            <span className="text-xs font-mono font-bold text-indigo-600 uppercase tracking-wider">
              Topic 02 &bull; Algorithmic Vulnerability
            </span>
            <h2 className="text-2xl font-bold text-slate-900 mt-1">
              How Outliers Break Machine Learning Algorithms
            </h2>
            <p className="text-sm text-slate-600 mt-1">
              Examine the mathematical sensitivity of linear models, distance calculations, and neural networks.
            </p>
          </div>

          {/* Interactive Impact Simulator */}
          <div className="p-5 rounded-2xl bg-indigo-50/40 border border-indigo-200 space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <h3 className="text-sm font-bold text-slate-900 font-mono">
                Interactive Proof: Ordinary Least Squares (OLS) Regression Tilt
              </h3>
              <button
                onClick={() => setHasModelOutlier(!hasModelOutlier)}
                className={`px-3 py-1.5 rounded-lg text-xs font-mono font-bold border transition ${
                  hasModelOutlier
                    ? 'bg-rose-100 text-rose-800 border-rose-300'
                    : 'bg-emerald-100 text-emerald-800 border-emerald-300'
                }`}
              >
                {hasModelOutlier ? 'Remove Outlier from OLS' : 'Inject High-Leverage Outlier'}
              </button>
            </div>

            <p className="text-xs text-slate-600">
              Ordinary Least Squares minimizes squared residuals <code className="font-mono bg-white px-1 py-0.5 rounded border border-slate-300">Σ(y - ŷ)²</code>.
              Because errors are squared, a single point far from the line exerts quadratic leverage, rotating the line away from the genuine pattern.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 font-mono text-xs">
              <div className="p-3 bg-white rounded-xl border border-slate-200">
                <span className="text-[10px] text-slate-500 uppercase">Baseline Slope (w1)</span>
                <div className="text-lg font-bold text-emerald-600">+0.145</div>
                <span className="text-[10px] text-slate-500">True underlying trend</span>
              </div>
              <div className="p-3 bg-white rounded-xl border border-slate-200">
                <span className="text-[10px] text-slate-500 uppercase">Distorted Slope</span>
                <div className={`text-lg font-bold ${hasModelOutlier ? 'text-rose-600' : 'text-slate-400'}`}>
                  {hasModelOutlier ? '+0.285 (+96% tilt)' : 'None'}
                </div>
                <span className="text-[10px] text-slate-500">Severe parameter distortion</span>
              </div>
              <div className="p-3 bg-white rounded-xl border border-slate-200">
                <span className="text-[10px] text-slate-500 uppercase">R² Generalization Score</span>
                <div className={`text-lg font-bold ${hasModelOutlier ? 'text-rose-600' : 'text-emerald-600'}`}>
                  {hasModelOutlier ? '0.42 (Degraded)' : '0.94 (Optimal)'}
                </div>
                <span className="text-[10px] text-slate-500">Validation fit metric</span>
              </div>
            </div>
          </div>

          {/* Model Breakdown Matrix */}
          <div className="space-y-3">
            <h3 className="text-sm font-bold text-slate-900 font-mono">Algorithm Vulnerability Matrix</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 rounded-xl border border-rose-200 bg-rose-50/30 space-y-2">
                <div className="flex items-center justify-between">
                  <strong className="text-sm text-slate-900">Linear & Logistic Regression</strong>
                  <span className="px-2 py-0.5 rounded bg-rose-100 text-rose-800 text-[10px] font-mono font-bold">
                    HIGHLY SENSITIVE
                  </span>
                </div>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Squared error penalties heavily punish points far from the hyperplane, tilting slopes and shifting probability boundaries.
                </p>
              </div>

              <div className="p-4 rounded-xl border border-rose-200 bg-rose-50/30 space-y-2">
                <div className="flex items-center justify-between">
                  <strong className="text-sm text-slate-900">K-Means & KNN Distance Models</strong>
                  <span className="px-2 py-0.5 rounded bg-rose-100 text-rose-800 text-[10px] font-mono font-bold">
                    HIGHLY SENSITIVE
                  </span>
                </div>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Euclidean distance calculates <code className="font-mono bg-white px-1 rounded">√(x1 - x2)²</code>. A distant outlier attracts centroids and pollutes nearest neighbors.
                </p>
              </div>

              <div className="p-4 rounded-xl border border-emerald-200 bg-emerald-50/30 space-y-2">
                <div className="flex items-center justify-between">
                  <strong className="text-sm text-slate-900">Decision Trees & Random Forests</strong>
                  <span className="px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 text-[10px] font-mono font-bold">
                    ROBUST TO X-OUTLIERS
                  </span>
                </div>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Trees split on sorted threshold ranks (<code className="font-mono bg-white px-1 rounded">x &gt; θ</code>). Whether the maximum value is 100 or 1,000,000 does not alter the split decision.
                </p>
              </div>

              <div className="p-4 rounded-xl border border-amber-200 bg-amber-50/30 space-y-2">
                <div className="flex items-center justify-between">
                  <strong className="text-sm text-slate-900">Min-Max Feature Scaling</strong>
                  <span className="px-2 py-0.5 rounded bg-amber-100 text-amber-800 text-[10px] font-mono font-bold">
                    EXTREME COMPRESSION RISK
                  </span>
                </div>
                <p className="text-xs text-slate-600 leading-relaxed">
                  <code className="font-mono bg-white px-1 rounded">(x - x_min) / (x_max - x_min)</code>. If <code className="font-mono">x_max</code> is a massive outlier, 99% of normal data is squashed into [0.00, 0.01].
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ======================================================== */}
      {/* TOPIC 3: STATISTICAL FOUNDATIONS                         */}
      {/* ======================================================== */}
      {activeTopic === 'math' && (
        <div className="rounded-2xl border border-slate-200 bg-white p-6 sm:p-8 shadow-sm space-y-6 text-slate-900">
          <div className="border-b border-slate-200 pb-4">
            <span className="text-xs font-mono font-bold text-indigo-600 uppercase tracking-wider">
              Topic 03 &bull; Mathematical Rigor
            </span>
            <h2 className="text-2xl font-bold text-slate-900 mt-1">
              Statistical Foundations of Outlier Detection
            </h2>
            <p className="text-sm text-slate-600 mt-1">
              Formulas explained step-by-step with practical numerical examples.
            </p>
          </div>

          <div className="space-y-4">
            <h3 className="text-sm font-bold text-slate-900 font-mono">
              Numerical Demonstration on Dataset: [12, 14, 15, 16, 18, 20, 22, 95]
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Mean vs Median */}
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
                <div className="font-bold text-indigo-700 font-mono text-xs">1. Arithmetic Mean vs Median</div>
                <p className="text-xs text-slate-600 font-mono">
                  Mean = (12 + 14 + 15 + 16 + 18 + 20 + 22 + 95) / 8 = <strong>26.5</strong>
                  <br />
                  Median = (16 + 18) / 2 = <strong>17.0</strong>
                </p>
                <div className="text-[11px] text-slate-500">
                  Notice: 7 of the 8 values are below the mean! The single outlier (95) pulled the mean up by 9.5 points, whereas the median remains faithful to the center.
                </div>
              </div>

              {/* Variance & Std Dev */}
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
                <div className="font-bold text-indigo-700 font-mono text-xs">2. Sample Variance & Standard Deviation</div>
                <div className="text-xs text-slate-600 font-mono">
                  s² = Σ(xi - x̄)² / (n - 1)
                  <br />
                  Without 95: s = <strong>3.49</strong> | With 95: s = <strong>27.84</strong> (8x inflation!)
                </div>
                <div className="text-[11px] text-slate-500">
                  Because errors are squared in variance, a point deviating by 68 units adds 68² = 4,624 to the numerator.
                </div>
              </div>

              {/* IQR Calculation */}
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
                <div className="font-bold text-indigo-700 font-mono text-xs">3. Quartiles & Interquartile Range (IQR)</div>
                <div className="text-xs text-slate-600 font-mono">
                  Q1 (25th percentile) = 14.5
                  <br />
                  Q3 (75th percentile) = 21.0
                  <br />
                  IQR = Q3 - Q1 = 21.0 - 14.5 = <strong>6.5</strong>
                </div>
                <div className="text-[11px] text-slate-500">
                  The IQR captures the middle 50% spread and completely ignores extreme endpoints.
                </div>
              </div>

              {/* Tukey Fences */}
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
                <div className="font-bold text-indigo-700 font-mono text-xs">4. Tukey Fences (1.5 × IQR)</div>
                <div className="text-xs text-slate-600 font-mono">
                  Lower Bound = Q1 - 1.5×IQR = 14.5 - 9.75 = <strong>4.75</strong>
                  <br />
                  Upper Bound = Q3 + 1.5×IQR = 21.0 + 9.75 = <strong>30.75</strong>
                </div>
                <div className="text-[11px] text-rose-600 font-bold">
                  Observation 95 exceeds the Upper Bound (30.75) and is conclusively flagged as an outlier!
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ======================================================== */}
      {/* TOPIC 4: OUTLIER DETECTION TECHNIQUES                    */}
      {/* ======================================================== */}
      {activeTopic === 'detection' && (
        <div className="rounded-2xl border border-slate-200 bg-white p-6 sm:p-8 shadow-sm space-y-6 text-slate-900">
          <div className="border-b border-slate-200 pb-4">
            <span className="text-xs font-mono font-bold text-indigo-600 uppercase tracking-wider">
              Topic 04 &bull; Detection Methodologies
            </span>
            <h2 className="text-2xl font-bold text-slate-900 mt-1">
              The 6 Core Outlier Detection Techniques
            </h2>
            <p className="text-sm text-slate-600 mt-1">
              Select the appropriate mathematical test based on feature distribution and sample size.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div className="p-5 rounded-xl border border-slate-200 bg-slate-50 space-y-2">
              <div className="text-xs font-mono text-indigo-600 font-bold uppercase">1. Tukey IQR Fences</div>
              <h4 className="text-sm font-bold text-slate-900">[Q1 - 1.5×IQR, Q3 + 1.5×IQR]</h4>
              <p className="text-xs text-slate-600">
                Non-parametric method. Does not assume a Gaussian distribution. Perfect for skewed, multimodal, or log-normal data.
              </p>
              <div className="text-[11px] font-mono text-indigo-800 bg-white p-2 rounded border border-slate-200">
                Limitation: Struggles with tiny sample sizes (N &lt; 20).
              </div>
            </div>

            <div className="p-5 rounded-xl border border-slate-200 bg-slate-50 space-y-2">
              <div className="text-xs font-mono text-indigo-600 font-bold uppercase">2. Standard Z-Score</div>
              <h4 className="text-sm font-bold text-slate-900">Z = (X - μ) / σ &gt; 3.0</h4>
              <p className="text-xs text-slate-600">
                Parametric test assuming Gaussian normality. Points beyond 3 standard deviations represent less than 0.27% of a normal bell curve.
              </p>
              <div className="text-[11px] font-mono text-rose-800 bg-white p-2 rounded border border-slate-200">
                Limitation: Outliers inflate μ and σ, creating the masking effect.
              </div>
            </div>

            <div className="p-5 rounded-xl border border-slate-200 bg-slate-50 space-y-2">
              <div className="text-xs font-mono text-indigo-600 font-bold uppercase">3. Modified Z-Score (MAD)</div>
              <h4 className="text-sm font-bold text-slate-900">M = 0.6745(X - Med) / MAD &gt; 3.5</h4>
              <p className="text-xs text-slate-600">
                Uses Median Absolute Deviation instead of Standard Deviation. Resistant to the masking effect.
              </p>
              <div className="text-[11px] font-mono text-emerald-800 bg-white p-2 rounded border border-slate-200">
                Best For: Small datasets and heavy-tailed distributions.
              </div>
            </div>

            <div className="p-5 rounded-xl border border-slate-200 bg-slate-50 space-y-2">
              <div className="text-xs font-mono text-indigo-600 font-bold uppercase">4. Box Plot Method</div>
              <h4 className="text-sm font-bold text-slate-900">Visual Tukey Diagram</h4>
              <p className="text-xs text-slate-600">
                Displays the 5-number summary with whiskers and isolated points (fliers) beyond the 1.5×IQR fences.
              </p>
              <div className="text-[11px] font-mono text-slate-800 bg-white p-2 rounded border border-slate-200">
                Best For: Quick univariate exploratory data inspection.
              </div>
            </div>

            <div className="p-5 rounded-xl border border-slate-200 bg-slate-50 space-y-2">
              <div className="text-xs font-mono text-indigo-600 font-bold uppercase">5. Scatter Plot Analysis</div>
              <h4 className="text-sm font-bold text-slate-900">Bivariate Relationship Breakdown</h4>
              <p className="text-xs text-slate-600">
                Plots Feature X against Feature Y to reveal points that violate joint correlation even if univariate values look normal.
              </p>
              <div className="text-[11px] font-mono text-slate-800 bg-white p-2 rounded border border-slate-200">
                Best For: Detecting contextual correlation anomalies.
              </div>
            </div>

            <div className="p-5 rounded-xl border border-slate-200 bg-slate-50 space-y-2">
              <div className="text-xs font-mono text-indigo-600 font-bold uppercase">6. Histogram & Density</div>
              <h4 className="text-sm font-bold text-slate-900">Binned Frequency Gaps</h4>
              <p className="text-xs text-slate-600">
                Visual inspection of frequency bins. Outliers appear as isolated single bars separated by empty bins from the main mass.
              </p>
              <div className="text-[11px] font-mono text-slate-800 bg-white p-2 rounded border border-slate-200">
                Best For: Inspecting skewness and tail density.
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ======================================================== */}
      {/* TOPIC 5: OUTLIER TREATMENT TECHNIQUES                    */}
      {/* ======================================================== */}
      {activeTopic === 'treatment' && (
        <div className="rounded-2xl border border-slate-200 bg-white p-6 sm:p-8 shadow-sm space-y-6 text-slate-900">
          <div className="border-b border-slate-200 pb-4">
            <span className="text-xs font-mono font-bold text-indigo-600 uppercase tracking-wider">
              Topic 05 &bull; Engineering Remediation
            </span>
            <h2 className="text-2xl font-bold text-slate-900 mt-1">
              Outlier Treatment & Handling Strategies
            </h2>
            <p className="text-sm text-slate-600 mt-1">
              Select between Trimming, Winsorization, Log Transforms, and Robust Scaling.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div className="p-5 rounded-xl border border-slate-200 bg-slate-50 space-y-2">
              <h4 className="text-sm font-bold text-slate-900 font-mono">1. Trimming / Deletion (Listwise)</h4>
              <p className="text-xs text-slate-600">
                Delete rows where outliers occur.
              </p>
              <div className="text-xs font-mono text-slate-700 space-y-1">
                <div><strong>When:</strong> Obvious recording corruption (Age = 250).</div>
                <div className="text-rose-600"><strong>Downside:</strong> Drops genuine sample records and distorts distribution variance.</div>
              </div>
            </div>

            <div className="p-5 rounded-xl border border-indigo-200 bg-indigo-50/40 space-y-2">
              <h4 className="text-sm font-bold text-indigo-950 font-mono">2. Capping / Winsorization (Recommended)</h4>
              <p className="text-xs text-slate-600">
                Cap values outside bounds to the exact fence (Q1 - 1.5×IQR or Q3 + 1.5×IQR) or percentiles (1st / 99th).
              </p>
              <div className="text-xs font-mono text-slate-700 space-y-1">
                <div><strong>When:</strong> High-leverage genuine observations that should not be thrown away.</div>
                <div className="text-emerald-700"><strong>Advantage:</strong> Keeps all N rows intact while eliminating extreme gradient leverage.</div>
              </div>
            </div>

            <div className="p-5 rounded-xl border border-slate-200 bg-slate-50 space-y-2">
              <h4 className="text-sm font-bold text-slate-900 font-mono">3. Non-Linear Log Transformation</h4>
              <p className="text-xs text-slate-600">
                Apply <code className="font-mono bg-white px-1 py-0.5 rounded border border-slate-200">y = log(x + 1)</code> to compress long right tails.
              </p>
              <div className="text-xs font-mono text-slate-700 space-y-1">
                <div><strong>When:</strong> Money, incomes, transaction volumes, house prices.</div>
                <div className="text-indigo-600"><strong>Advantage:</strong> Converts exponential spreads into bell-shaped normal distributions.</div>
              </div>
            </div>

            <div className="p-5 rounded-xl border border-slate-200 bg-slate-50 space-y-2">
              <h4 className="text-sm font-bold text-slate-900 font-mono">4. Robust Scaling (`RobustScaler`)</h4>
              <p className="text-xs text-slate-600">
                Center by median and scale by IQR: <code className="font-mono bg-white px-1 py-0.5 rounded border border-slate-200">x&apos; = (x - Med) / IQR</code>.
              </p>
              <div className="text-xs font-mono text-slate-700 space-y-1">
                <div><strong>When:</strong> Features contain inevitable outliers that must feed into distance models or Neural Networks.</div>
                <div className="text-indigo-600"><strong>Advantage:</strong> Normalizes inliers around [-1, +1] without shrinking them to zero.</div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ======================================================== */}
      {/* TOPIC 7: PYTHON IMPLEMENTATION                           */}
      {/* ======================================================== */}
      {activeTopic === 'python' && (
        <div className="rounded-2xl border border-slate-200 bg-white p-6 sm:p-8 shadow-sm space-y-6 text-slate-900">
          <div className="border-b border-slate-200 pb-4">
            <span className="text-xs font-mono font-bold text-indigo-600 uppercase tracking-wider">
              Topic 07 &bull; Code Laboratory
            </span>
            <h2 className="text-2xl font-bold text-slate-900 mt-1">
              Production Python Implementations
            </h2>
            <p className="text-sm text-slate-600 mt-1">
              Complete, idiomatic NumPy, Pandas, and Scikit-Learn code snippets with line-by-line documentation.
            </p>
          </div>

          <div className="space-y-4">
            <div className="p-4 rounded-xl bg-slate-900 text-slate-100 font-mono text-xs overflow-x-auto space-y-2">
              <div className="text-indigo-400 font-bold"># Complete Pipeline: IQR Detection, Capping, and Robust Scaling</div>
              <pre className="text-slate-200 leading-relaxed">{`import numpy as np
import pandas as pd
from sklearn.preprocessing import RobustScaler
from sklearn.linear_model import Ridge
from sklearn.pipeline import Pipeline

# 1. Create realistic dataset with severe outliers
data = {
    'sqft': [1100, 1250, 1300, 1450, 1600, 1750, 2100, 2400, 2850, 1400],
    'price': [210, 235, 220, 260, 290, 310, 360, 410, 460, 1200]  # $1.2M entry typo!
}
df = pd.DataFrame(data)

# 2. IQR Calculation & Winsorization Capping
Q1 = df['price'].quantile(0.25)
Q3 = df['price'].quantile(0.75)
IQR = Q3 - Q1
lower_fence = Q1 - 1.5 * IQR
upper_fence = Q3 + 1.5 * IQR

print(f"Lower Fence: \${lower_fence:.1f}k | Upper Fence: \${upper_fence:.1f}k")

# Capping (Winsorizing) with pandas.clip
df['price_capped'] = df['price'].clip(lower=lower_fence, upper=upper_fence)

# 3. RobustScaler Pipeline (Immune to residual outliers)
model_pipeline = Pipeline([
    ('scaler', RobustScaler()),  # Centers by median, scales by IQR
    ('regressor', Ridge(alpha=1.0))
])

# Fit on capped features
model_pipeline.fit(df[['sqft']], df['price_capped'])
print("Model trained with robust outlier resilience!")
print("Weights:", model_pipeline.named_steps['regressor'].coef_)`}</pre>
            </div>

            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-700 space-y-1 font-mono">
              <div className="font-bold text-slate-900">Line-by-Line Breakdown:</div>
              <div>&bull; <code className="text-indigo-600">quantile(0.25) & quantile(0.75)</code>: Computes exact 25th and 75th percentiles.</div>
              <div>&bull; <code className="text-indigo-600">clip(lower, upper)</code>: Executes clean vectorized Winsorization in a single fast NumPy/Pandas operation.</div>
              <div>&bull; <code className="text-indigo-600">RobustScaler()</code>: Guarantees zero data leakage and protects distance scaling during cross-validation.</div>
            </div>
          </div>
        </div>
      )}

      {/* ======================================================== */}
      {/* TOPIC 8: REAL-WORLD CASE STUDY                           */}
      {/* ======================================================== */}
      {activeTopic === 'casestudy' && (
        <div className="rounded-2xl border border-slate-200 bg-white p-6 sm:p-8 shadow-sm space-y-6 text-slate-900">
          <div className="border-b border-slate-200 pb-4">
            <span className="text-xs font-mono font-bold text-indigo-600 uppercase tracking-wider">
              Topic 08 &bull; Real-World Case Study
            </span>
            <h2 className="text-2xl font-bold text-slate-900 mt-1">
              Case Study: Real Estate Valuation & Mortgage Risk
            </h2>
            <p className="text-sm text-slate-600 mt-1">
              How a property assessment algorithm suffered 58% error until outlier treatment rescued production predictions.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div className="p-5 rounded-xl border border-slate-200 bg-slate-50 space-y-3">
              <span className="text-xs font-mono font-bold text-rose-600">THE PROBLEM</span>
              <h4 className="text-base font-bold text-slate-900">14 Catastrophic Mansion Outliers</h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                A national mortgage lender trained a valuation model on 25,000 homes. 14 mega-mansions (valued at $25M–$80M) were included alongside suburban homes ($250k–$600k).
              </p>
              <div className="p-3 rounded-lg bg-rose-50 border border-rose-200 text-xs text-rose-800 font-mono">
                Result Before Treatment:
                <br />
                Linear Model RMSE = <strong>$184,200</strong>
                <br />
                R² = <strong>0.58</strong> (Regular buyers rejected for loans due to overvaluation!)
              </div>
            </div>

            <div className="p-5 rounded-xl border border-emerald-200 bg-emerald-50/30 space-y-3">
              <span className="text-xs font-mono font-bold text-emerald-700">THE REMEDIATION</span>
              <h4 className="text-base font-bold text-slate-900">Percentile Capping + Log Transform</h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                The ML engineering team separated commercial estates into a separate tier, capped residential prices to the 99th percentile ($1.2M), and applied a <code className="font-mono">log(price)</code> target transform.
              </p>
              <div className="p-3 rounded-lg bg-emerald-50 border border-emerald-200 text-xs text-emerald-900 font-mono">
                Result After Treatment:
                <br />
                Linear Model RMSE = <strong>$28,400</strong> (6.5x error reduction!)
                <br />
                R² = <strong>0.89</strong> (Mortgage approvals processed with 99.4% precision)
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ======================================================== */}
      {/* TOPIC 9: KNOWLEDGE ASSESSMENT                            */}
      {/* ======================================================== */}
      {activeTopic === 'quiz' && (
        <div className="rounded-2xl border border-slate-200 bg-white p-6 sm:p-8 shadow-sm space-y-6 text-slate-900">
          <div className="border-b border-slate-200 pb-4 flex flex-wrap items-center justify-between gap-2">
            <div>
              <span className="text-xs font-mono font-bold text-indigo-600 uppercase tracking-wider">
                Topic 09 &bull; Diagnostic Evaluation
              </span>
              <h2 className="text-2xl font-bold text-slate-900 mt-1">
                Outlier Mastery Knowledge Assessment
              </h2>
              <p className="text-sm text-slate-600 mt-1">
                Validate your theoretical, mathematical, and algorithmic understanding.
              </p>
            </div>

            {quizSubmitted && (
              <div className="px-4 py-2 rounded-xl bg-indigo-50 border border-indigo-200 text-xs font-mono font-bold text-indigo-700">
                Score: {quizScore} / {QUIZ_QUESTIONS.length} ({Math.round((quizScore / QUIZ_QUESTIONS.length) * 100)}%)
              </div>
            )}
          </div>

          <div className="space-y-6">
            {QUIZ_QUESTIONS.map((q, idx) => {
              const selected = quizAnswers[idx];
              const isCorrect = selected === q.correct;

              return (
                <div key={q.id} className="p-5 rounded-xl border border-slate-200 bg-slate-50/60 space-y-3">
                  <div className="flex items-start gap-2">
                    <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-indigo-600 text-white text-xs font-mono font-bold">
                      {q.id}
                    </span>
                    <h3 className="text-sm font-bold text-slate-900 leading-snug">{q.q}</h3>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1">
                    {q.options.map((opt, optIdx) => {
                      const isChosen = selected === optIdx;
                      let btnStyle = 'bg-white border-slate-200 text-slate-700 hover:bg-slate-100';

                      if (quizSubmitted) {
                        if (optIdx === q.correct) {
                          btnStyle = 'bg-emerald-100 border-emerald-400 text-emerald-900 font-bold';
                        } else if (isChosen && !isCorrect) {
                          btnStyle = 'bg-rose-100 border-rose-400 text-rose-900';
                        }
                      } else if (isChosen) {
                        btnStyle = 'bg-indigo-600 border-indigo-700 text-white font-bold';
                      }

                      return (
                        <button
                          key={optIdx}
                          disabled={quizSubmitted}
                          onClick={() => handleSelectQuiz(idx, optIdx)}
                          className={`p-3 rounded-lg border text-xs text-left transition font-mono ${btnStyle}`}
                        >
                          {opt}
                        </button>
                      );
                    })}
                  </div>

                  {quizSubmitted && (
                    <div
                      className={`p-3 rounded-lg text-xs font-mono leading-relaxed ${
                        isCorrect
                          ? 'bg-emerald-50 border border-emerald-200 text-emerald-800'
                          : 'bg-rose-50 border border-rose-200 text-rose-800'
                      }`}
                    >
                      <strong>{isCorrect ? '✓ Correct!' : '✗ Incorrect.'}</strong> {q.explain}
                    </div>
                  )}
                </div>
              );
            })}

            {!quizSubmitted ? (
              <button
                onClick={() => setQuizSubmitted(true)}
                disabled={Object.keys(quizAnswers).length < QUIZ_QUESTIONS.length}
                className="w-full py-3 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-mono text-xs font-bold transition shadow-md disabled:opacity-40"
              >
                Submit Assessment Answers
              </button>
            ) : (
              <button
                onClick={() => {
                  setQuizSubmitted(false);
                  setQuizAnswers({});
                }}
                className="w-full py-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-mono text-xs font-bold transition shadow-md"
              >
                Retake Assessment
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

