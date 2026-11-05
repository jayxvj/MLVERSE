'use client';

import React, { useState, useEffect } from 'react';
import { Play, Pause, RotateCcw, FastForward, Sliders, Info } from 'lucide-react';
import { InteractiveSimulationConfig } from '@/lib/types';
import InteractiveChart from './InteractiveChart';

interface AlgorithmSimulatorProps {
  config: InteractiveSimulationConfig;
}

export default function AlgorithmSimulator({ config }: AlgorithmSimulatorProps) {
  const [learningRate, setLearningRate] = useState<number>(
    Number(config.defaultParams.learningRate || 0.1)
  );
  const [currentStep, setCurrentStep] = useState<number>(0);
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [weight, setWeight] = useState<number>(
    Number(config.defaultParams.startingWeight || 8.0)
  );
  const [history, setHistory] = useState<Array<{ step: number; weight: number; loss: number; gradient: number }>>([]);

  // Calculate loss L(w) = w^2 - 4w + 5, gradient = 2w - 4
  const computeLossAndGrad = (w: number) => {
    const loss = w * w - 4 * w + 5;
    const gradient = 2 * w - 4;
    return { loss, gradient };
  };

  // Reset simulator
  const handleReset = () => {
    setIsRunning(false);
    setCurrentStep(0);
    const initialW = Number(config.defaultParams.startingWeight || 8.0);
    setWeight(initialW);
    const { loss, gradient } = computeLossAndGrad(initialW);
    setHistory([{ step: 0, weight: initialW, loss, gradient }]);
  };

  // Step forward one iteration
  const stepOnce = () => {
    setWeight((prevW) => {
      const { gradient } = computeLossAndGrad(prevW);
      const nextW = prevW - learningRate * gradient;
      const { loss: nextLoss, gradient: nextGrad } = computeLossAndGrad(nextW);

      setHistory((prevHist) => [
        ...prevHist,
        {
          step: prevHist.length,
          weight: Number(nextW.toFixed(4)),
          loss: Number(nextLoss.toFixed(4)),
          gradient: Number(nextGrad.toFixed(4)),
        },
      ]);
      setCurrentStep((s) => s + 1);
      return nextW;
    });
  };

  // Initial setup
  useEffect(() => {
    handleReset();
  }, [config]);

  // Auto-run loop
  useEffect(() => {
    if (!isRunning) return;
    const interval = setInterval(() => {
      stepOnce();
    }, 400);

    return () => clearInterval(interval);
  }, [isRunning, learningRate]);

  const latestStats = history[history.length - 1] || {
    step: 0,
    weight: 8,
    loss: 37,
    gradient: 12,
  };

  return (
    <div className="rounded-xl border border-electric-cyan/30 bg-navy-950/80 p-5 backdrop-blur-md shadow-glow">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4 border-b border-white/10 pb-3">
        <div>
          <h4 className="text-sm font-semibold text-white flex items-center gap-2">
            <Sliders className="h-4 w-4 text-cyan-400" />
            {config.title}
          </h4>
          <p className="text-xs text-slate-400">{config.description}</p>
        </div>

        {/* Status indicator */}
        <div className="flex items-center gap-2 font-mono text-xs">
          <span className="text-slate-400">Step: {currentStep}</span>
          <span className="px-2 py-0.5 rounded bg-cyan-950 text-cyan-300 border border-cyan-500/30">
            Loss: {latestStats.loss.toFixed(3)}
          </span>
        </div>
      </div>

      {/* Control Toolbar */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4 p-3 rounded-lg bg-navy-900 border border-white/5">
        <div>
          <label className="flex items-center justify-between text-xs font-mono text-slate-300 mb-1">
            <span>Learning Rate (α):</span>
            <span className="text-cyan-400 font-bold">{learningRate.toFixed(2)}</span>
          </label>
          <input
            type="range"
            min="0.01"
            max="1.1"
            step="0.02"
            value={learningRate}
            onChange={(e) => setLearningRate(parseFloat(e.target.value))}
            className="w-full accent-cyan-400 cursor-pointer"
          />
          <div className="flex justify-between text-[10px] text-slate-400 font-mono mt-0.5">
            <span>0.01 (Slow crawl)</span>
            <span>0.5 (Optimal)</span>
            <span>1.1 (Overshoot/Diverge)</span>
          </div>
        </div>

        {/* Buttons */}
        <div className="flex items-end gap-2">
          <button
            onClick={() => setIsRunning(!isRunning)}
            className={`flex-1 py-2 px-3 rounded-lg text-xs font-semibold flex items-center justify-center gap-1.5 transition ${
              isRunning
                ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40 hover:bg-amber-500/30'
                : 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 hover:bg-cyan-500/30'
            }`}
          >
            {isRunning ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
            <span>{isRunning ? 'Pause' : 'Auto Play'}</span>
          </button>

          <button
            onClick={stepOnce}
            disabled={isRunning}
            className="py-2 px-3 rounded-lg text-xs font-medium bg-navy-800 hover:bg-navy-700 text-slate-200 border border-white/10 disabled:opacity-40 flex items-center gap-1"
            title="Step 1 Iteration"
          >
            <FastForward className="h-3.5 w-3.5" />
            <span>Step</span>
          </button>

          <button
            onClick={handleReset}
            className="p-2 rounded-lg text-xs bg-navy-800 hover:bg-navy-700 text-slate-300 border border-white/10"
            title="Reset Simulator"
          >
            <RotateCcw className="h-4 w-4" />
          </button>
        </div>
      </div>

      {/* Real-time Loss Curve Chart */}
      <div className="mb-4">
        <InteractiveChart
          type="line"
          data={history}
          xKey="step"
          series={[
            { key: 'loss', name: 'Loss L(w)', color: '#00f0ff' },
            { key: 'gradient', name: 'Gradient dL/dw', color: '#ec4899' },
          ]}
          height={200}
        />
      </div>

      {/* Live State Breakdown */}
      <div className="grid grid-cols-3 gap-2 text-center font-mono text-xs p-3 rounded bg-navy-900/60 border border-white/5">
        <div>
          <div className="text-slate-400 text-[10px]">WEIGHT w</div>
          <div className="text-white font-bold text-sm">{latestStats.weight.toFixed(3)}</div>
        </div>
        <div>
          <div className="text-slate-400 text-[10px]">CURRENT GRADIENT</div>
          <div className="text-rose-400 font-bold text-sm">{latestStats.gradient.toFixed(3)}</div>
        </div>
        <div>
          <div className="text-slate-400 text-[10px]">TARGET CONVERGENCE</div>
          <div className="text-emerald-400 font-bold text-sm">w = 2.000</div>
        </div>
      </div>
    </div>
  );
}

