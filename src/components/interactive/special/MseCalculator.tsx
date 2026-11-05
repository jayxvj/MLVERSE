'use client';

import React, { useState, useMemo } from 'react';
import { Calculator, RotateCcw, AlertTriangle, CheckCircle2, TrendingUp, Sliders } from 'lucide-react';

interface DataPoint {
  id: number;
  label: string;
  actual: number; // y_i
  predicted: number; // y_hat_i
}

const INITIAL_POINTS: DataPoint[] = [
  { id: 1, label: 'Sample 1', actual: 10, predicted: 12 },
  { id: 2, label: 'Sample 2', actual: 20, predicted: 18 },
  { id: 3, label: 'Sample 3', actual: 15, predicted: 15 },
  { id: 4, label: 'Sample 4', actual: 25, predicted: 21 },
  { id: 5, label: 'Sample 5', actual: 30, predicted: 35 },
];

export default function MseCalculator() {
  const [points, setPoints] = useState<DataPoint[]>(INITIAL_POINTS);

  const updatePrediction = (id: number, val: number) => {
    setPoints((prev) =>
      prev.map((pt) => (pt.id === id ? { ...pt, predicted: val } : pt))
    );
  };

  const setPreset = (type: 'perfect' | 'slight' | 'outlier') => {
    if (type === 'perfect') {
      setPoints((prev) => prev.map((pt) => ({ ...pt, predicted: pt.actual })));
    } else if (type === 'slight') {
      setPoints([
        { id: 1, label: 'Sample 1', actual: 10, predicted: 11 },
        { id: 2, label: 'Sample 2', actual: 20, predicted: 21 },
        { id: 3, label: 'Sample 3', actual: 15, predicted: 14 },
        { id: 4, label: 'Sample 4', actual: 25, predicted: 26 },
        { id: 5, label: 'Sample 5', actual: 30, predicted: 29 },
      ]);
    } else if (type === 'outlier') {
      // One massive error of 10 vs 4 small errors of 1
      setPoints([
        { id: 1, label: 'Sample 1', actual: 10, predicted: 10 },
        { id: 2, label: 'Sample 2', actual: 20, predicted: 20 },
        { id: 3, label: 'Sample 3', actual: 15, predicted: 15 },
        { id: 4, label: 'Sample 4', actual: 25, predicted: 25 },
        { id: 5, label: 'Sample 5', actual: 30, predicted: 40 }, // residual = -10, squared = 100!
      ]);
    }
  };

  const calculations = useMemo(() => {
    const n = points.length;
    let sumSquaredResiduals = 0;
    let sumAbsoluteResiduals = 0;

    const rows = points.map((pt) => {
      const residual = pt.actual - pt.predicted; // y_i - y_hat_i
      const absResidual = Math.abs(residual);
      const squaredResidual = residual * residual; // (y_i - y_hat_i)^2
      sumSquaredResiduals += squaredResidual;
      sumAbsoluteResiduals += absResidual;
      return {
        ...pt,
        residual,
        absResidual,
        squaredResidual,
      };
    });

    const mse = sumSquaredResiduals / n;
    const mae = sumAbsoluteResiduals / n;
    const rmse = Math.sqrt(mse);

    return { rows, n, sumSquaredResiduals, sumAbsoluteResiduals, mse, mae, rmse };
  }, [points]);

  return (
    <div className="rounded-2xl border border-electric-cyan/30 bg-navy-950/85 p-6 backdrop-blur-md shadow-glow">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-white/10 pb-4 mb-5">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono text-cyan-400">
            <Calculator className="h-4 w-4" />
            <span>INTERACTIVE LOSS BENCHMARK</span>
          </div>
          <h3 className="text-lg font-bold text-white mt-0.5">
            Mean Squared Error (MSE) Step-by-Step Calculator
          </h3>
          <p className="text-xs text-slate-300">
            Adjust the predicted values ŷ_i to see how residuals are calculated, squared, and averaged.
          </p>
        </div>

        {/* Presets */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => setPreset('perfect')}
            className="px-2.5 py-1.5 rounded-lg text-xs font-medium border border-emerald-500/30 bg-emerald-500/10 text-emerald-300 hover:bg-emerald-500/20 transition-colors"
          >
            Zero Error
          </button>
          <button
            onClick={() => setPreset('outlier')}
            className="px-2.5 py-1.5 rounded-lg text-xs font-medium border border-rose-500/30 bg-rose-500/10 text-rose-300 hover:bg-rose-500/20 transition-colors"
          >
            Outlier Penalty
          </button>
          <button
            onClick={() => setPoints(INITIAL_POINTS)}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-white/5 transition-colors"
            title="Reset to default"
          >
            <RotateCcw className="h-4 w-4" />
          </button>
        </div>
      </div>

      {/* Metrics Banner */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
        <div className="p-4 rounded-xl bg-navy-900/80 border border-cyan-500/30 shadow-glow">
          <span className="text-[10px] font-mono uppercase text-cyan-400 font-bold">PRIMARY METRIC</span>
          <div className="flex items-baseline justify-between mt-1">
            <h4 className="text-2xl font-mono font-bold text-white">
              {calculations.mse.toFixed(2)}
            </h4>
            <span className="text-xs font-mono text-cyan-300">MSE (Units²)</span>
          </div>
          <p className="text-[11px] text-slate-400 mt-1">
            MSE = (1/{calculations.n}) × {calculations.sumSquaredResiduals}
          </p>
        </div>

        <div className="p-4 rounded-xl bg-navy-900/80 border border-purple-500/30">
          <span className="text-[10px] font-mono uppercase text-purple-400 font-bold">ROOT SQUARED</span>
          <div className="flex items-baseline justify-between mt-1">
            <h4 className="text-2xl font-mono font-bold text-white">
              {calculations.rmse.toFixed(2)}
            </h4>
            <span className="text-xs font-mono text-purple-300">RMSE (Original Units)</span>
          </div>
          <p className="text-[11px] text-slate-400 mt-1">
            RMSE = √MSE = √{calculations.mse.toFixed(2)}
          </p>
        </div>

        <div className="p-4 rounded-xl bg-navy-900/80 border border-blue-500/30">
          <span className="text-[10px] font-mono uppercase text-blue-400 font-bold">ABSOLUTE AVERAGE</span>
          <div className="flex items-baseline justify-between mt-1">
            <h4 className="text-2xl font-mono font-bold text-white">
              {calculations.mae.toFixed(2)}
            </h4>
            <span className="text-xs font-mono text-blue-300">MAE (Original Units)</span>
          </div>
          <p className="text-[11px] text-slate-400 mt-1">
            MAE = (1/{calculations.n}) × {calculations.sumAbsoluteResiduals}
          </p>
        </div>
      </div>

      {/* Interactive Step-by-Step Table */}
      <div className="overflow-x-auto rounded-xl border border-white/10 mb-6 bg-navy-900/40">
        <table className="w-full text-left text-xs font-mono">
          <thead className="bg-navy-900/90 text-slate-400 border-b border-white/10">
            <tr>
              <th className="py-2.5 px-3">Sample i</th>
              <th className="py-2.5 px-3 text-cyan-300">Actual y_i</th>
              <th className="py-2.5 px-3 text-purple-300">Predicted ŷ_i (Adjust Slider)</th>
              <th className="py-2.5 px-3 text-amber-300">Residual (y_i - ŷ_i)</th>
              <th className="py-2.5 px-3 text-rose-300">Squared (y_i - ŷ_i)²</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5 text-slate-200">
            {calculations.rows.map((row) => (
              <tr key={row.id} className="hover:bg-white/5 transition-colors">
                <td className="py-2.5 px-3 font-bold text-slate-300">{row.label}</td>
                <td className="py-2.5 px-3 text-cyan-300 font-bold">{row.actual}</td>
                <td className="py-2.5 px-3">
                  <div className="flex items-center gap-3">
                    <input
                      type="range"
                      min={0}
                      max={45}
                      step={1}
                      value={row.predicted}
                      onChange={(e) => updatePrediction(row.id, parseInt(e.target.value))}
                      className="w-28 sm:w-36 accent-purple-400 cursor-pointer"
                    />
                    <span className="font-bold text-purple-300 w-8 text-right">
                      {row.predicted}
                    </span>
                  </div>
                </td>
                <td className="py-2.5 px-3">
                  <span
                    className={
                      row.residual === 0
                        ? 'text-emerald-400'
                        : row.residual > 0
                        ? 'text-cyan-400'
                        : 'text-amber-400'
                    }
                  >
                    {row.residual >= 0 ? `+${row.residual}` : row.residual}
                  </span>
                </td>
                <td className="py-2.5 px-3 font-bold text-rose-400">
                  {row.squaredResidual}
                </td>
              </tr>
            ))}
          </tbody>
          <tfoot className="bg-navy-900/90 font-bold border-t border-white/10">
            <tr>
              <td colSpan={3} className="py-2.5 px-3 text-right text-slate-400">
                Sum of Squared Errors (SSE):
              </td>
              <td className="py-2.5 px-3 text-slate-400">-</td>
              <td className="py-2.5 px-3 text-rose-300">
                Σ = {calculations.sumSquaredResiduals}
              </td>
            </tr>
            <tr>
              <td colSpan={3} className="py-2.5 px-3 text-right text-cyan-400">
                Mean Squared Error = (1/{calculations.n}) × Σ:
              </td>
              <td className="py-2.5 px-3 text-slate-400">-</td>
              <td className="py-2.5 px-3 text-cyan-300 text-sm">
                MSE = {calculations.mse.toFixed(2)}
              </td>
            </tr>
          </tfoot>
        </table>
      </div>

      {/* Mathematical Breakdown Callout */}
      <div className="p-4 rounded-xl bg-navy-900/70 border border-white/10 text-xs space-y-2">
        <div className="flex items-center gap-2 text-cyan-300 font-bold font-mono">
          <TrendingUp className="h-4 w-4" />
          <span>Why Squaring the Residuals Matters:</span>
        </div>
        <p className="text-slate-300 leading-relaxed">
          1. <strong>Cancels Sign Cancellation:</strong> If one prediction is +5 off and another is -5 off, simple summation yields 0 error. Squaring converts all deviations into positive magnitudes: (+5)² = 25 and (-5)² = 25.
        </p>
        <p className="text-slate-300 leading-relaxed">
          2. <strong>Heavy Outlier Penalty:</strong> An error of 2 contributes 4 to the loss, whereas an error of 10 contributes 100 (25× larger penalty for a 5× larger error!). Try the <strong className="text-rose-400">Outlier Penalty</strong> preset button above to see how one single outlier pulls the MSE up dramatically.
        </p>
        <p className="text-slate-300 leading-relaxed">
          3. <strong>Calculus Convenience:</strong> The derivative of (y - ŷ)² with respect to ŷ is -2(y - ŷ), a clean linear gradient ideal for smooth optimization via gradient descent.
        </p>
      </div>
    </div>
  );
}

