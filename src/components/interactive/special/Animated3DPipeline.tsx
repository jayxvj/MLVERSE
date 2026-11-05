'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Database, Cpu, Flame, Layers, Sparkles, Play, RotateCcw, CheckCircle2 } from 'lucide-react';

interface Stage {
  id: string;
  name: string;
  subtitle: string;
  icon: any;
  color: string;
  glow: string;
  description: string;
  keyAction: string;
  example: string;
}

const STAGES: Stage[] = [
  {
    id: 'data',
    name: '1. Data',
    subtitle: 'Observations & Ground Truth',
    icon: Database,
    color: '#00f0ff',
    glow: 'rgba(0, 240, 255, 0.4)',
    description: 'Raw historical examples structured into numeric features X and target answers y. Without clean data, no pattern can be learned.',
    keyAction: 'Collection, Cleaning, Normalization, Train/Test Split',
    example: '5,000 house listings with square footage, bedrooms, and sale prices.',
  },
  {
    id: 'algorithm',
    name: '2. Algorithm',
    subtitle: 'The Mathematical Recipe',
    icon: Cpu,
    color: '#38bdf8',
    glow: 'rgba(56, 189, 248, 0.4)',
    description: 'The strategy and mathematical blueprint used to adjust parameters (e.g. Linear Regression, Neural Network, Decision Tree).',
    keyAction: 'Defines hypothesis space f(X; θ) and error metric L(y, ŷ)',
    example: 'Ordinary Least Squares or Gradient Descent formula.',
  },
  {
    id: 'training',
    name: '3. Training',
    subtitle: 'Iterative Optimization',
    icon: Flame,
    color: '#f59e0b',
    glow: 'rgba(245, 158, 11, 0.4)',
    description: 'The computational loop where the algorithm repeatedly measures error on training data and adjusts internal weights to minimize loss.',
    keyAction: 'Forward Pass → Compute Loss → Backward Gradient Update',
    example: 'Adjusting weights over 100 epochs until loss drops from 120.4 to 1.8.',
  },
  {
    id: 'model',
    name: '4. Model',
    subtitle: 'The Frozen Artifact',
    icon: Layers,
    color: '#a855f7',
    glow: 'rgba(168, 85, 247, 0.4)',
    description: 'The finished product: the algorithm infused with learned parameters (weights and biases θ). Ready to save and deploy.',
    keyAction: 'Serialization (e.g., ONNX, .pkl file), Quantization, Hosting',
    example: 'Equation ŷ = 180 * area + 45000 ready to accept any input.',
  },
  {
    id: 'prediction',
    name: '5. Prediction',
    subtitle: 'Inference on Unseen Data',
    icon: Sparkles,
    color: '#10b981',
    glow: 'rgba(16, 185, 129, 0.4)',
    description: 'A brand-new observation enters the trained model, which computes and outputs the estimated target instantaneously.',
    keyAction: 'Forward calculation ŷ = f(x_new; θ_trained)',
    example: 'New 2,200 sqft house entered → Predicts $441,000.',
  },
];

export default function Animated3DPipeline() {
  const [activeStageIndex, setActiveStageIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // 3D Canvas visualizer for pipeline flow
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    let width = (canvas.width = canvas.parentElement?.clientWidth || 700);
    let height = (canvas.height = 180);

    const handleResize = () => {
      if (!canvas.parentElement) return;
      width = canvas.width = canvas.parentElement.clientWidth;
      height = canvas.height = 180;
    };
    window.addEventListener('resize', handleResize);

    let t = 0;

    const render = () => {
      t += 0.03;
      ctx.clearRect(0, 0, width, height);

      const stageCount = STAGES.length;
      const stageCoords = STAGES.map((_, i) => ({
        x: (width / (stageCount + 1)) * (i + 1),
        y: height / 2 + Math.sin(t * 1.5 + i * 1.2) * 8,
      }));

      // Draw 3D connecting data tubes
      for (let i = 0; i < stageCoords.length - 1; i++) {
        const p1 = stageCoords[i];
        const p2 = stageCoords[i + 1];

        const grad = ctx.createLinearGradient(p1.x, p1.y, p2.x, p2.y);
        grad.addColorStop(0, STAGES[i].color);
        grad.addColorStop(1, STAGES[i + 1].color);

        ctx.beginPath();
        ctx.moveTo(p1.x, p1.y);
        ctx.lineTo(p2.x, p2.y);
        ctx.strokeStyle = grad;
        ctx.lineWidth = 3;
        ctx.shadowColor = STAGES[i].color;
        ctx.shadowBlur = 10;
        ctx.stroke();
        ctx.shadowBlur = 0;

        // Flowing data photon packets
        for (let k = 0; k < 3; k++) {
          const packetProgress = (t * 0.8 + (i * 0.3) + k * 0.33) % 1;
          const px = p1.x + (p2.x - p1.x) * packetProgress;
          const py = p1.y + (p2.y - p1.y) * packetProgress;

          ctx.beginPath();
          ctx.arc(px, py, 3.5, 0, Math.PI * 2);
          ctx.fillStyle = '#ffffff';
          ctx.shadowColor = '#00f0ff';
          ctx.shadowBlur = 12;
          ctx.fill();
          ctx.shadowBlur = 0;
        }
      }

      // Draw 3D node disks
      stageCoords.forEach((p, idx) => {
        const isCurrent = idx === activeStageIndex;
        const stage = STAGES[idx];
        const radius = isCurrent ? 24 : 18;

        // Outer glow aura
        ctx.beginPath();
        ctx.arc(p.x, p.y, radius * 1.8, 0, Math.PI * 2);
        ctx.fillStyle = isCurrent ? stage.glow : 'rgba(255, 255, 255, 0.03)';
        ctx.fill();

        // 3D sphere gradient
        const sphereGrad = ctx.createRadialGradient(
          p.x - radius * 0.3,
          p.y - radius * 0.3,
          radius * 0.1,
          p.x,
          p.y,
          radius
        );
        sphereGrad.addColorStop(0, '#ffffff');
        sphereGrad.addColorStop(0.4, stage.color);
        sphereGrad.addColorStop(1, '#070d1d');

        ctx.beginPath();
        ctx.arc(p.x, p.y, radius, 0, Math.PI * 2);
        ctx.fillStyle = sphereGrad;
        ctx.shadowColor = stage.color;
        ctx.shadowBlur = isCurrent ? 20 : 8;
        ctx.fill();
        ctx.shadowBlur = 0;

        // Node number label
        ctx.fillStyle = isCurrent ? '#000000' : '#ffffff';
        ctx.font = 'bold 11px monospace';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(String(idx + 1), p.x, p.y);
      });

      animId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', handleResize);
    };
  }, [activeStageIndex]);

  // Autoplay progression
  useEffect(() => {
    if (!isAutoPlaying) return;
    const interval = setInterval(() => {
      setActiveStageIndex((prev) => (prev + 1) % STAGES.length);
    }, 2500);
    return () => clearInterval(interval);
  }, [isAutoPlaying]);

  const currentStage = STAGES[activeStageIndex];
  const Icon = currentStage.icon;

  return (
    <div className="rounded-2xl border border-electric-cyan/30 bg-navy-950/85 p-6 backdrop-blur-md shadow-glow">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-white/10 pb-4 mb-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono text-cyan-400">
            <Sparkles className="h-4 w-4" />
            <span>ANIMATED 3D ML ARCHITECTURE</span>
          </div>
          <h3 className="text-lg font-bold text-white mt-0.5">
            The End-to-End Machine Learning Pipeline
          </h3>
          <p className="text-xs text-slate-300">
            How raw data transforms into an intelligent predictive system.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setIsAutoPlaying(!isAutoPlaying)}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono font-semibold transition ${
              isAutoPlaying
                ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
                : 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 hover:bg-cyan-500/30'
            }`}
          >
            <Play className={`h-3.5 w-3.5 ${isAutoPlaying ? 'animate-spin' : ''}`} />
            <span>{isAutoPlaying ? 'Pause Flow' : 'Auto-Play Pipeline'}</span>
          </button>
          <button
            onClick={() => {
              setIsAutoPlaying(false);
              setActiveStageIndex(0);
            }}
            className="p-1.5 rounded-lg text-xs bg-navy-900 border border-white/10 text-slate-400 hover:text-white"
            title="Reset Pipeline"
          >
            <RotateCcw className="h-4 w-4" />
          </button>
        </div>
      </div>

      {/* 3D Flow Canvas */}
      <div className="w-full relative rounded-xl bg-navy-900/60 border border-white/5 overflow-hidden mb-5">
        <canvas ref={canvasRef} className="block w-full h-[180px]" />
      </div>

      {/* Stage Selector Buttons */}
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 mb-5">
        {STAGES.map((s, idx) => {
          const isSelected = activeStageIndex === idx;
          const StepIcon = s.icon;
          return (
            <button
              key={s.id}
              onClick={() => {
                setIsAutoPlaying(false);
                setActiveStageIndex(idx);
              }}
              className={`p-3 rounded-xl border text-left transition-all ${
                isSelected
                  ? 'border-cyan-400 bg-cyan-950/40 shadow-glow scale-102'
                  : 'border-white/10 bg-navy-900/50 hover:border-white/20'
              }`}
            >
              <div className="flex items-center gap-2 mb-1">
                <StepIcon className="h-4 w-4" style={{ color: s.color }} />
                <span className="text-xs font-bold text-white">{s.name}</span>
              </div>
              <div className="text-[10px] font-mono text-slate-400 truncate">{s.subtitle}</div>
            </button>
          );
        })}
      </div>

      {/* Stage Detail Inspector */}
      <div className="rounded-xl bg-navy-900/90 border border-white/10 p-5 space-y-3 animate-fadeIn">
        <div className="flex items-center justify-between border-b border-white/10 pb-2">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-lg bg-white/5 border border-white/10" style={{ color: currentStage.color }}>
              <Icon className="h-5 w-5" />
            </div>
            <div>
              <div className="text-xs font-mono uppercase text-cyan-400">Current Phase</div>
              <h4 className="text-base font-bold text-white">{currentStage.name}: {currentStage.subtitle}</h4>
            </div>
          </div>
          <span className="text-xs font-mono text-slate-400 bg-navy-950 px-2.5 py-1 rounded border border-white/5">
            Stage {activeStageIndex + 1} of 5
          </span>
        </div>

        <p className="text-xs sm:text-sm text-slate-200 leading-relaxed">
          {currentStage.description}
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 text-xs">
          <div className="p-3 rounded-lg bg-navy-950/70 border border-white/5">
            <span className="font-mono text-cyan-400 font-bold block mb-1">Key Operations:</span>
            <span className="text-slate-300">{currentStage.keyAction}</span>
          </div>

          <div className="p-3 rounded-lg bg-navy-950/70 border border-white/5">
            <span className="font-mono text-purple-400 font-bold block mb-1">Concrete Example:</span>
            <span className="text-slate-300">{currentStage.example}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

