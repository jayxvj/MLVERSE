'use client';

import React, { useRef, useEffect } from 'react';

interface NodePoint {
  x: number;
  y: number;
  z: number;
  origX: number;
  origY: number;
  origZ: number;
  layer: number;
  radius: number;
  pulsePhase: number;
  activationVal: number;
}

interface ParticleSignal {
  sourceIdx: number;
  targetIdx: number;
  progress: number;
  speed: number;
  color: string;
}

export default function NeuralNetworkHero3D() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = canvas.parentElement?.clientWidth || 700);
    let height = (canvas.height = canvas.parentElement?.clientHeight || 480);

    const handleResize = () => {
      if (!canvas.parentElement) return;
      width = canvas.width = canvas.parentElement.clientWidth;
      height = canvas.height = canvas.parentElement.clientHeight;
    };

    window.addEventListener('resize', handleResize);

    // Layered neural network nodes
    const layers = 5;
    const nodesPerLayer = [4, 6, 8, 6, 3];
    const nodes: NodePoint[] = [];

    nodesPerLayer.forEach((count, layerIdx) => {
      const layerX = (width / (layers + 1)) * (layerIdx + 1);
      for (let i = 0; i < count; i++) {
        const spacing = height / (count + 1);
        const y = spacing * (i + 1) + (Math.random() - 0.5) * 16;
        const z = (Math.random() - 0.5) * 120;
        nodes.push({
          x: layerX,
          y: y,
          z: z,
          origX: layerX,
          origY: y,
          origZ: z,
          layer: layerIdx,
          radius: 3.5 + Math.random() * 2.5,
          pulsePhase: Math.random() * Math.PI * 2,
          activationVal: 0.3 + Math.random() * 0.7,
        });
      }
    });

    // Synaptic connections map
    const connections: Array<{ a: number; b: number; weight: number }> = [];
    for (let i = 0; i < nodes.length; i++) {
      for (let j = i + 1; j < nodes.length; j++) {
        if (nodes[j].layer === nodes[i].layer + 1) {
          connections.push({
            a: i,
            b: j,
            weight: 0.4 + Math.random() * 0.6,
          });
        }
      }
    }

    // Signals traveling through synapses with intelligent accent colors (Ice Blue & Soft Violet)
    const signals: ParticleSignal[] = [];
    for (let k = 0; k < 15; k++) {
      const conn = connections[Math.floor(Math.random() * connections.length)];
      if (conn) {
        signals.push({
          sourceIdx: conn.a,
          targetIdx: conn.b,
          progress: Math.random(),
          speed: 0.007 + Math.random() * 0.01,
          color: Math.random() > 0.4 ? '#75D7FF' : '#A78BFA', // Electric ice blue or soft violet
        });
      }
    }

    // Smooth subtle mouse parallax
    let mouseX = width / 2;
    let mouseY = height / 2;
    let targetTiltX = 0;
    let targetTiltY = 0;
    let curTiltX = 0;
    let curTiltY = 0;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseX = e.clientX - rect.left;
      mouseY = e.clientY - rect.top;
      targetTiltX = (mouseX - width / 2) * 0.03;
      targetTiltY = (mouseY - height / 2) * 0.03;
    };
    canvas.addEventListener('mousemove', handleMouseMove);

    let time = 0;

    const render = () => {
      time += 0.015;
      ctx.clearRect(0, 0, width, height);

      curTiltX += (targetTiltX - curTiltX) * 0.06;
      curTiltY += (targetTiltY - curTiltY) * 0.06;

      // Update positions
      nodes.forEach((n, idx) => {
        n.x = n.origX + Math.sin(time * 0.7 + n.pulsePhase) * 5;
        n.y = n.origY + Math.cos(time * 0.5 + n.pulsePhase) * 5;
        n.z = n.origZ + Math.sin(time + idx) * 8;
      });

      // 3D projection
      const fov = 500;
      const projected = nodes.map((n) => {
        const pz = n.z + curTiltX;
        const scale = fov / (fov + pz);
        return {
          x: n.x + curTiltX * (scale * 0.5),
          y: n.y + curTiltY * (scale * 0.5),
          scale: scale,
          z: pz,
          orig: n,
        };
      });

      // 1. Draw synaptic lines (subtle electric-blue / silver connections)
      connections.forEach((conn) => {
        const pA = projected[conn.a];
        const pB = projected[conn.b];
        const dx = pA.x - pB.x;
        const dy = pA.y - pB.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < width * 0.45) {
          const alpha = (1 - dist / (width * 0.45)) * 0.28 * conn.weight;

          ctx.beginPath();
          ctx.moveTo(pA.x, pA.y);
          ctx.lineTo(pB.x, pB.y);
          ctx.lineWidth = 0.9 * pA.scale;

          const grad = ctx.createLinearGradient(pA.x, pA.y, pB.x, pB.y);
          grad.addColorStop(0, `rgba(117, 215, 255, ${alpha * 0.75})`); // Ice blue
          grad.addColorStop(1, `rgba(167, 139, 250, ${alpha * 0.6})`); // Soft violet
          ctx.strokeStyle = grad;
          ctx.stroke();
        }
      });

      // 2. Animate Data Signals
      signals.forEach((sig) => {
        sig.progress += sig.speed;
        if (sig.progress >= 1) {
          sig.progress = 0;
          const nextConn = connections[Math.floor(Math.random() * connections.length)];
          if (nextConn) {
            sig.sourceIdx = nextConn.a;
            sig.targetIdx = nextConn.b;
          }
        }

        const pA = projected[sig.sourceIdx];
        const pB = projected[sig.targetIdx];
        if (pA && pB) {
          const sx = pA.x + (pB.x - pA.x) * sig.progress;
          const sy = pA.y + (pB.y - pA.y) * sig.progress;
          const particleScale = (pA.scale + pB.scale) / 2;

          ctx.beginPath();
          ctx.arc(sx, sy, 2.5 * particleScale, 0, Math.PI * 2);
          ctx.fillStyle = sig.color;
          ctx.shadowColor = sig.color;
          ctx.shadowBlur = 8;
          ctx.fill();
          ctx.shadowBlur = 0;
        }
      });

      // 3. Render White & Silver Nodes with Subtle Pulses
      projected.sort((a, b) => b.z - a.z);

      projected.forEach((p) => {
        const n = p.orig;
        const rad = Math.max(2.5, n.radius * p.scale);
        const pulse = Math.sin(time * 2.5 + n.pulsePhase) * 0.25 + 0.75;

        // Subtle outer aura
        ctx.beginPath();
        ctx.arc(p.x, p.y, rad * (1.6 + 0.3 * pulse), 0, Math.PI * 2);
        const auraGrad = ctx.createRadialGradient(p.x, p.y, rad * 0.4, p.x, p.y, rad * 2.2);
        auraGrad.addColorStop(0, 'rgba(255, 255, 255, 0.25)');
        auraGrad.addColorStop(1, 'rgba(255, 255, 255, 0)');
        ctx.fillStyle = auraGrad;
        ctx.fill();

        // Node center (Silver & Platinum White)
        ctx.beginPath();
        ctx.arc(p.x, p.y, rad, 0, Math.PI * 2);
        ctx.fillStyle = n.layer === 4 ? '#FFFFFF' : n.layer === 0 ? '#C0C0C0' : '#F5F5F5';
        ctx.shadowColor = 'rgba(255, 255, 255, 0.4)';
        ctx.shadowBlur = 6 * p.scale;
        ctx.fill();
        ctx.shadowBlur = 0;

        // Inner point
        ctx.beginPath();
        ctx.arc(p.x - rad * 0.3, p.y - rad * 0.3, rad * 0.3, 0, Math.PI * 2);
        ctx.fillStyle = '#FFFFFF';
        ctx.fill();
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
      canvas.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <div className="relative w-full h-[440px] lg:h-[500px] flex items-center justify-center overflow-hidden rounded-3xl border border-[#303030] bg-[#0A0A0A] backdrop-blur-xl shadow-2xl">
      {/* Live Interactive Canvas */}
      <canvas ref={canvasRef} className="relative z-10 w-full h-full cursor-default" />

      {/* Monochromatic Status Badges */}
      <div className="absolute top-4 left-4 z-20 flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#111111]/90 border border-[#303030] backdrop-blur-md text-[11px] font-mono text-white shadow-sm">
        <span className="w-2 h-2 rounded-full bg-[#75D7FF] animate-pulse" />
        <span>3D SYNAPTIC ACCELERATOR</span>
      </div>

      <div className="absolute bottom-4 right-4 z-20 hidden sm:flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-[#111111]/90 border border-[#303030] backdrop-blur-md text-[11px] font-mono text-[#D0D0D0] shadow-sm">
        <span className="text-[#75D7FF]">Feed-Forward</span>
        <span>•</span>
        <span className="text-[#A78BFA]">5 Active Layers</span>
      </div>
    </div>
  );
}
