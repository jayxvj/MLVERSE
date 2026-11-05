'use client';

import React, { useState, useMemo } from 'react';
import { Home, Sliders, DollarSign, Sparkles, TrendingUp } from 'lucide-react';
import InteractiveChart from '../InteractiveChart';

export default function HousePriceSimulator() {
  const [area, setArea] = useState<number>(1850);
  const [bedrooms, setBedrooms] = useState<number>(3);
  const [age, setAge] = useState<number>(8);

  // Model weights (Learned parameters)
  const W_AREA = 175; // $175 per sqft
  const W_BEDS = 18000; // $18,000 per bedroom
  const W_AGE = -1200; // -$1,200 per year of age
  const BIAS = 65000; // $65,000 base land value

  // Predicted price calculation
  const predictedPrice = useMemo(() => {
    return Math.round(area * W_AREA + bedrooms * W_BEDS + age * W_AGE + BIAS);
  }, [area, bedrooms, age]);

  // Breakdown components
  const areaContribution = area * W_AREA;
  const bedsContribution = bedrooms * W_BEDS;
  const ageContribution = age * W_AGE;

  // Chart data showing trend curve with current point
  const chartData = useMemo(() => {
    const pts = [];
    for (let a = 600; a <= 4500; a += 300) {
      const p = Math.round(a * W_AREA + bedrooms * W_BEDS + age * W_AGE + BIAS);
      pts.push({
        area: a,
        predictedPrice: p / 1000, // in thousands
      });
    }
    return pts;
  }, [bedrooms, age]);

  return (
    <div className="rounded-2xl border border-electric-cyan/30 bg-navy-950/85 p-6 backdrop-blur-md shadow-glow">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-white/10 pb-4 mb-5">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono text-cyan-400">
            <Home className="h-4 w-4" />
            <span>REAL-TIME INFERENCE SIMULATOR</span>
          </div>
          <h3 className="text-lg font-bold text-white mt-0.5">
            House Price Machine Learning Predictor
          </h3>
          <p className="text-xs text-slate-300">
            Slide features to observe the model computing instantaneous price predictions.
          </p>
        </div>

        {/* Prediction Badge */}
        <div className="p-3 rounded-xl bg-gradient-to-r from-cyan-950 to-navy-900 border border-cyan-400/50 shadow-glow text-right">
          <div className="text-[10px] font-mono text-cyan-400 uppercase tracking-widest">
            Estimated Model Valuation
          </div>
          <div className="text-2xl font-black font-mono text-white">
            ${predictedPrice.toLocaleString()}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
        {/* Sliders Input Panel */}
        <div className="lg:col-span-5 space-y-4 rounded-xl bg-navy-900/60 border border-white/10 p-5">
          <div>
            <div className="flex justify-between text-xs font-mono mb-1">
              <span className="text-slate-300">Living Area (Sqft):</span>
              <span className="text-cyan-400 font-bold">{area.toLocaleString()} sqft</span>
            </div>
            <input
              type="range"
              min="600"
              max="4500"
              step="50"
              value={area}
              onChange={(e) => setArea(parseInt(e.target.value))}
              className="w-full accent-cyan-400 cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-slate-500 font-mono mt-0.5">
              <span>600 sqft (Studio)</span>
              <span>4,500 sqft (Mansion)</span>
            </div>
          </div>

          <div>
            <div className="flex justify-between text-xs font-mono mb-1">
              <span className="text-slate-300">Bedrooms Count:</span>
              <span className="text-purple-400 font-bold">{bedrooms} Bedrooms</span>
            </div>
            <input
              type="range"
              min="1"
              max="6"
              step="1"
              value={bedrooms}
              onChange={(e) => setBedrooms(parseInt(e.target.value))}
              className="w-full accent-purple-400 cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-slate-500 font-mono mt-0.5">
              <span>1 Bed</span>
              <span>6 Beds</span>
            </div>
          </div>

          <div>
            <div className="flex justify-between text-xs font-mono mb-1">
              <span className="text-slate-300">Property Age (Years):</span>
              <span className="text-amber-400 font-bold">{age} Years Old</span>
            </div>
            <input
              type="range"
              min="0"
              max="40"
              step="1"
              value={age}
              onChange={(e) => setAge(parseInt(e.target.value))}
              className="w-full accent-amber-400 cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-slate-500 font-mono mt-0.5">
              <span>0 (Brand New Construction)</span>
              <span>40 (Historical Build)</span>
            </div>
          </div>

          {/* Mathematical Decomposition breakdown */}
          <div className="pt-3 border-t border-white/10 space-y-1.5 text-xs font-mono">
            <span className="text-slate-400 text-[10px] uppercase block">Linear Feature Breakdown:</span>
            <div className="flex justify-between text-cyan-300">
              <span>Area (x₁ × $175):</span>
              <span>+${areaContribution.toLocaleString()}</span>
            </div>
            <div className="flex justify-between text-purple-300">
              <span>Bedrooms (x₂ × $18,000):</span>
              <span>+${bedsContribution.toLocaleString()}</span>
            </div>
            <div className="flex justify-between text-amber-300">
              <span>Age Depreciation (x₃ × -$1,200):</span>
              <span>-${Math.abs(ageContribution).toLocaleString()}</span>
            </div>
            <div className="flex justify-between text-slate-400">
              <span>Base Intercept (b):</span>
              <span>+${BIAS.toLocaleString()}</span>
            </div>
          </div>
        </div>

        {/* Prediction Response Curve */}
        <div className="lg:col-span-7 rounded-xl bg-navy-900/60 border border-white/10 p-5">
          <div className="flex items-center justify-between text-xs font-mono text-slate-400 mb-2">
            <span>Price Curve vs Area (holding beds={bedrooms}, age={age}y)</span>
            <span className="text-cyan-400">Values in $ Thousands</span>
          </div>

          <InteractiveChart
            type="line"
            data={chartData}
            xKey="area"
            series={[
              { key: 'predictedPrice', name: 'Price ($k)', color: '#00f0ff' },
            ]}
            height={260}
          />
        </div>
      </div>
    </div>
  );
}

