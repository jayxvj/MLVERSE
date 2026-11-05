'use client';

import React, { useRef, useEffect } from 'react';

interface ConceptBrain3DProps {
  accentColor?: string;
  particleCount?: number;
}

export default function ConceptBrain3D({
  accentColor = '#00f0ff',
  particleCount = 70,
}: ConceptBrain3DProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    const size = Math.min(canvas.parentElement?.clientWidth || 320, 360);
    canvas.width = size;
    canvas.height = size;

    // Generate points on a sphere (Fibonacci sphere algorithm)
    const points: Array<{ x: number; y: number; z: number }> = [];
    const phi = Math.PI * (3 - Math.sqrt(5)); // Golden ratio angle

    for (let i = 0; i < particleCount; i++) {
      const y = 1 - (i / (particleCount - 1)) * 2; // y goes from 1 to -1
      const radius = Math.sqrt(1 - y * y);
      const theta = phi * i;
      const x = Math.cos(theta) * radius;
      const z = Math.sin(theta) * radius;
      points.push({ x: x * (size * 0.36), y: y * (size * 0.36), z: z * (size * 0.36) });
    }

    let rotX = 0;
    let rotY = 0;

    const render = () => {
      rotX += 0.005;
      rotY += 0.008;

      ctx.clearRect(0, 0, size, size);
      const cx = size / 2;
      const cy = size / 2;

      // Project 3D to 2D
      const projected = points.map((p) => {
        // Rotate around Y
        let x1 = p.x * Math.cos(rotY) - p.z * Math.sin(rotY);
        let z1 = p.z * Math.cos(rotY) + p.x * Math.sin(rotY);

        // Rotate around X
        let y2 = p.y * Math.cos(rotX) - z1 * Math.sin(rotX);
        let z2 = z1 * Math.cos(rotX) + p.y * Math.sin(rotX);

        const perspective = 300 / (300 + z2);
        return {
          x: cx + x1 * perspective,
          y: cy + y2 * perspective,
          z: z2,
          scale: perspective,
        };
      });

      // Sort by depth
      projected.sort((a, b) => a.z - b.z);

      // Connect nearby points
      ctx.lineWidth = 0.8;
      for (let i = 0; i < projected.length; i++) {
        for (let j = i + 1; j < projected.length; j++) {
          const dx = projected[i].x - projected[j].x;
          const dy = projected[i].y - projected[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < size * 0.18) {
            const alpha = (1 - dist / (size * 0.18)) * 0.25;
            ctx.beginPath();
            ctx.moveTo(projected[i].x, projected[i].y);
            ctx.lineTo(projected[j].x, projected[j].y);
            ctx.strokeStyle = `rgba(168, 85, 247, ${alpha})`;
            ctx.stroke();
          }
        }
      }

      // Draw glowing sphere nodes
      for (const p of projected) {
        const radius = Math.max(1, 2.5 * p.scale);
        const alpha = Math.max(0.2, (p.z + size * 0.4) / (size * 0.8));

        ctx.beginPath();
        ctx.arc(p.x, p.y, radius, 0, Math.PI * 2);
        ctx.fillStyle = accentColor;
        ctx.globalAlpha = alpha;
        ctx.shadowColor = accentColor;
        ctx.shadowBlur = 8;
        ctx.fill();
        ctx.shadowBlur = 0;
        ctx.globalAlpha = 1.0;
      }

      animId = requestAnimationFrame(render);
    };

    render();

    return () => cancelAnimationFrame(animId);
  }, [accentColor, particleCount]);

  return (
    <div className="relative flex items-center justify-center w-full h-full min-h-[220px]">
      <canvas ref={canvasRef} className="block mx-auto" />
    </div>
  );
}

