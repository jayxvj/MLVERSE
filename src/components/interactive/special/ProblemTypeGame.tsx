'use client';

import React, { useState } from 'react';
import { Target, CheckCircle2, XCircle, Award, Sparkles, HelpCircle, ArrowRight, RotateCcw } from 'lucide-react';

interface Scenario {
  id: string;
  title: string;
  description: string;
  inputFeatures: string[];
  targetVariable: string;
  broadType: 'Classification' | 'Regression';
  specificType: 'Binary Classification' | 'Multiclass Classification' | 'Multilabel Classification' | 'Simple Regression' | 'Multiple Regression';
  explanation: string;
}

const SCENARIOS: Scenario[] = [
  {
    id: 's1',
    title: 'Hospital Patient Readmission',
    description: 'Predict whether a diabetic patient will be readmitted to the hospital within 30 days after discharge.',
    inputFeatures: ['Age', 'Time in Hospital', 'Number of Lab Procedures', 'Insulin Dosage'],
    targetVariable: 'Readmitted? (Yes / No)',
    broadType: 'Classification',
    specificType: 'Binary Classification',
    explanation: 'The target is discrete and has exactly two mutually exclusive categories (Yes or No).'
  },
  {
    id: 's2',
    title: 'Automobile Selling Price',
    description: 'Estimate the fair market resale price of a used vehicle based on its technical specifications and usage history.',
    inputFeatures: ['Mileage', 'Horsepower', 'Year Manufactured', 'Engine Size', 'Brand'],
    targetVariable: 'Selling Price ($ in thousands)',
    broadType: 'Regression',
    specificType: 'Multiple Regression',
    explanation: 'The target variable (dollar price) is continuous and continuous numbers can take infinitely many real values, predicted from multiple input features.'
  },
  {
    id: 's3',
    title: 'E-Commerce Product Category',
    description: 'Classify an incoming product title and description into one of 12 department catalog categories.',
    inputFeatures: ['Product Title', 'Description Text', 'Price', 'Seller Rating'],
    targetVariable: 'Catalog Department (Electronics, Apparel, Books, Home, etc.)',
    broadType: 'Classification',
    specificType: 'Multiclass Classification',
    explanation: 'There are more than two mutually exclusive discrete categories, and each product belongs to exactly one category.'
  },
  {
    id: 's4',
    title: 'News Article Content Tagging',
    description: 'Assign relevant topic tags to a newly published journalistic article (an article can be simultaneously about Politics, Economics, and Technology).',
    inputFeatures: ['Article Headline', 'Full Body Text', 'Author'],
    targetVariable: 'Assigned Tags: [Politics, Economy, AI, Climate, Healthcare]',
    broadType: 'Classification',
    specificType: 'Multilabel Classification',
    explanation: 'Multiple labels can be simultaneously true for a single observation; tags are not mutually exclusive.'
  },
  {
    id: 's5',
    title: 'House Price from Square Footage Only',
    description: 'Estimate the value of an apartment knowing only its internal living area in square meters.',
    inputFeatures: ['Square Footage (sqft)'],
    targetVariable: 'Property Price ($)',
    broadType: 'Regression',
    specificType: 'Simple Regression',
    explanation: 'A single continuous independent predictor (area) is used to predict a single continuous dependent target (price).'
  },
  {
    id: 's6',
    title: 'Credit Card Transaction Fraud',
    description: 'Determine in real time if an online payment swipe is fraudulent or authentic.',
    inputFeatures: ['Transaction Amount', 'Merchant ID', 'Distance from Home', 'Device Fingerprint'],
    targetVariable: 'Transaction Status (Fraudulent vs Legitimate)',
    broadType: 'Classification',
    specificType: 'Binary Classification',
    explanation: 'The prediction assigns each swipe to one of two discrete classes (Fraud=1 vs Legitimate=0).'
  },
  {
    id: 's7',
    title: 'Crop Yield Estimation',
    description: 'Forecast the expected wheat harvest quantity in metric tons per hectare for an agricultural region.',
    inputFeatures: ['Seasonal Rainfall (mm)', 'Average Temperature', 'Fertilizer Applied (kg)', 'Soil Nitrogen Level'],
    targetVariable: 'Wheat Yield (Tons / Hectare)',
    broadType: 'Regression',
    specificType: 'Multiple Regression',
    explanation: 'Yield is a continuous physical quantity measured on a continuous real scale, modeled from several meteorological inputs.'
  },
  {
    id: 's8',
    title: 'Audio Music Genre Tagging',
    description: 'Detect all applicable musical genres and moods that describe a 30-second soundtrack clip.',
    inputFeatures: ['Spectrogram Mel Frequencies', 'Tempo (BPM)', 'Harmonic Pitch'],
    targetVariable: 'Applicable Genres: [Jazz, Ambient, Instrumental]',
    broadType: 'Classification',
    specificType: 'Multilabel Classification',
    explanation: 'A single song can belong to multiple stylistic genres simultaneously.'
  }
];

export default function ProblemTypeGame() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [streak, setStreak] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [gameMode, setGameMode] = useState<'broad' | 'fine'>('broad');

  const current = SCENARIOS[currentIndex];

  const broadOptions = ['Classification', 'Regression'];
  const fineOptions = [
    'Binary Classification',
    'Multiclass Classification',
    'Multilabel Classification',
    'Simple Regression',
    'Multiple Regression'
  ];

  const activeOptions = gameMode === 'broad' ? broadOptions : fineOptions;
  const correctAnswer = gameMode === 'broad' ? current.broadType : current.specificType;

  const handleSelect = (option: string) => {
    if (isAnswered) return;
    setSelectedAnswer(option);
    setIsAnswered(true);

    if (option === correctAnswer) {
      setScore(s => s + 10);
      setStreak(st => st + 1);
    } else {
      setStreak(0);
    }
  };

  const handleNext = () => {
    setIsAnswered(false);
    setSelectedAnswer(null);
    setCurrentIndex(i => (i + 1) % SCENARIOS.length);
  };

  const handleReset = () => {
    setCurrentIndex(0);
    setScore(0);
    setStreak(0);
    setIsAnswered(false);
    setSelectedAnswer(null);
  };

  return (
    <div className="rounded-2xl border border-border/80 bg-navy-900/60 p-6 backdrop-blur-md shadow-2xl space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-border/50 pb-5">
        <div className="flex items-center gap-3">
          <span className="p-2 rounded-lg bg-electric-cyan/10 border border-electric-cyan/30 text-electric-cyan">
            <Target className="w-5 h-5" />
          </span>
          <div>
            <h3 className="text-xl font-bold text-white">Problem Identification Arena</h3>
            <p className="text-xs text-slate-400 mt-0.5">Diagnose whether real-world problems require Classification or Regression</p>
          </div>
        </div>

        {/* Score & Streak Counters */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 bg-navy-950/80 px-3 py-1.5 rounded-xl border border-border">
            <Award className="w-4 h-4 text-amber-400" />
            <span className="text-xs font-mono font-bold text-white">{score} pts</span>
          </div>
          <div className="flex items-center gap-2 bg-navy-950/80 px-3 py-1.5 rounded-xl border border-border">
            <Sparkles className="w-4 h-4 text-electric-cyan" />
            <span className="text-xs font-mono font-bold text-electric-cyan">{streak} Streak</span>
          </div>
          <button
            onClick={handleReset}
            title="Reset Game"
            className="p-2 rounded-xl border border-border/60 bg-navy-950/60 text-slate-400 hover:text-white"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Mode Selector */}
      <div className="flex items-center justify-between bg-navy-950/50 p-2 rounded-xl border border-border/50">
        <span className="text-xs text-slate-400 font-mono">Game Mode:</span>
        <div className="flex gap-2">
          <button
            onClick={() => { setGameMode('broad'); setIsAnswered(false); setSelectedAnswer(null); }}
            className={`px-3 py-1 rounded-lg text-xs font-semibold transition-all ${
              gameMode === 'broad'
                ? 'bg-electric-cyan/20 border border-electric-cyan/60 text-white'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Broad (Classification vs Regression)
          </button>
          <button
            onClick={() => { setGameMode('fine'); setIsAnswered(false); setSelectedAnswer(null); }}
            className={`px-3 py-1 rounded-lg text-xs font-semibold transition-all ${
              gameMode === 'fine'
                ? 'bg-violet-500/20 border border-violet-500/60 text-white'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Granular (Binary / Multiclass / Multilabel / Simple / Multiple)
          </button>
        </div>
      </div>

      {/* Scenario Card */}
      <div className="bg-navy-950/80 rounded-xl border border-border/70 p-5 space-y-4">
        <div className="flex items-center justify-between">
          <span className="text-xs font-mono font-bold text-electric-cyan uppercase tracking-wider">
            Scenario {currentIndex + 1} of {SCENARIOS.length}
          </span>
          <span className="text-xs font-mono text-slate-500">
            Target Type Inspection
          </span>
        </div>

        <div>
          <h4 className="text-base font-bold text-white">{current.title}</h4>
          <p className="text-xs text-slate-300 mt-1 leading-relaxed">{current.description}</p>
        </div>

        {/* Feature & Target Breakdown */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
          <div className="p-3 rounded-lg bg-navy-900/60 border border-border/40 space-y-1">
            <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400">Inputs (Features X):</span>
            <div className="flex flex-wrap gap-1.5 mt-1">
              {current.inputFeatures.map((f, i) => (
                <span key={i} className="text-[11px] font-mono px-2 py-0.5 rounded bg-navy-950 border border-border/60 text-slate-300">
                  {f}
                </span>
              ))}
            </div>
          </div>
          <div className="p-3 rounded-lg bg-navy-900/60 border border-border/40 space-y-1">
            <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400">Target to Predict (y):</span>
            <div className="text-xs font-mono font-bold text-amber-300 mt-1">
              {current.targetVariable}
            </div>
          </div>
        </div>
      </div>

      {/* Answer Options */}
      <div className="space-y-2">
        <span className="text-xs font-mono text-slate-400 uppercase tracking-wider">
          Identify the Machine Learning Task Type:
        </span>
        <div className={`grid ${gameMode === 'broad' ? 'grid-cols-2' : 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3'} gap-2.5`}>
          {activeOptions.map((opt) => {
            const isSelected = selectedAnswer === opt;
            const isCorrect = opt === correctAnswer;

            let btnStyle = 'border-border/60 bg-navy-950/60 text-slate-300 hover:border-slate-500 hover:text-white';
            if (isAnswered) {
              if (isCorrect) {
                btnStyle = 'border-emerald-500 bg-emerald-500/20 text-emerald-300 font-bold shadow-[0_0_12px_rgba(16,185,129,0.3)]';
              } else if (isSelected && !isCorrect) {
                btnStyle = 'border-rose-500 bg-rose-500/20 text-rose-300 font-bold';
              } else {
                btnStyle = 'border-border/30 opacity-40 text-slate-600';
              }
            }

            return (
              <button
                key={opt}
                onClick={() => handleSelect(opt)}
                disabled={isAnswered}
                className={`p-3.5 rounded-xl border text-sm font-semibold transition-all flex items-center justify-between ${btnStyle}`}
              >
                <span>{opt}</span>
                {isAnswered && isCorrect && <CheckCircle2 className="w-4 h-4 text-emerald-400" />}
                {isAnswered && isSelected && !isCorrect && <XCircle className="w-4 h-4 text-rose-400" />}
              </button>
            );
          })}
        </div>
      </div>

      {/* Feedback & Explanation Card */}
      {isAnswered && (
        <div className={`p-4 rounded-xl border animate-fadeIn space-y-3 ${
          selectedAnswer === correctAnswer
            ? 'bg-emerald-500/10 border-emerald-500/30'
            : 'bg-rose-500/10 border-rose-500/30'
        }`}>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              {selectedAnswer === correctAnswer ? (
                <>
                  <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                  <span className="text-sm font-bold text-emerald-300">Correct! +10 Points</span>
                </>
              ) : (
                <>
                  <XCircle className="w-5 h-5 text-rose-400" />
                  <span className="text-sm font-bold text-rose-300">Incorrect — Correct Answer: {correctAnswer}</span>
                </>
              )}
            </div>
            <button
              onClick={handleNext}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold bg-white/10 hover:bg-white/20 text-white transition-all"
            >
              <span>Next Scenario</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
          <p className="text-xs text-slate-300 leading-relaxed">
            <strong>Analytical Reason:</strong> {current.explanation}
          </p>
        </div>
      )}
    </div>
  );
}

