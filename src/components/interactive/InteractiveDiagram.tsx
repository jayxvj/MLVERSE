'use client';

import React, { useState } from 'react';
import { ArrowRight, Info } from 'lucide-react';

interface DiagramNode {
  id: string;
  label: string;
  description: string;
  type?: 'input' | 'process' | 'output';
}

interface DiagramConnection {
  from: string;
  to: string;
  label?: string;
}

interface InteractiveDiagramProps {
  title?: string;
  nodes: DiagramNode[];
  connections: DiagramConnection[];
}

export default function InteractiveDiagram({
  title = 'Interactive Architecture Flow',
  nodes,
  connections,
}: InteractiveDiagramProps) {
  const [selectedNode, setSelectedNode] = useState<DiagramNode | null>(nodes[0] || null);

  const nodeStyles = {
    input: 'border-cyan-400/40 bg-cyan-950/40 text-cyan-300 hover:border-cyan-400',
    process: 'border-purple-400/40 bg-purple-950/40 text-purple-300 hover:border-purple-400',
    output: 'border-emerald-400/40 bg-emerald-950/40 text-emerald-300 hover:border-emerald-400',
  };

  return (
    <div className="rounded-xl border border-white/10 bg-navy-950/60 p-5 backdrop-blur-md">
      <div className="flex items-center justify-between mb-4">
        <h4 className="text-sm font-semibold text-white tracking-wide">{title}</h4>
        <span className="text-[11px] font-mono text-cyan-400">Click any block to inspect details</span>
      </div>

      {/* Nodes visual flow */}
      <div className="flex flex-wrap items-center justify-center gap-3 py-6 px-2 bg-navy-900/50 rounded-lg border border-white/5">
        {nodes.map((node, index) => {
          const isSelected = selectedNode?.id === node.id;
          const nodeType = node.type || 'process';

          return (
            <React.Fragment key={node.id}>
              <button
                onClick={() => setSelectedNode(node)}
                className={`relative px-4 py-3 rounded-xl border text-center transition-all duration-200 cursor-pointer ${
                  nodeStyles[nodeType]
                } ${isSelected ? 'ring-2 ring-cyan-400 shadow-glow scale-105' : 'hover:scale-102'}`}
              >
                <div className="text-xs font-mono uppercase tracking-wider opacity-70 mb-0.5">
                  {nodeType}
                </div>
                <div className="text-sm font-bold text-white">{node.label}</div>
              </button>

              {index < nodes.length - 1 && (
                <div className="flex items-center text-slate-400 px-1">
                  <ArrowRight className="h-4 w-4 animate-pulse" />
                </div>
              )}
            </React.Fragment>
          );
        })}
      </div>

      {/* Detail Inspector */}
      {selectedNode && (
        <div className="mt-4 p-3.5 rounded-lg bg-navy-900/80 border border-cyan-500/20 flex items-start gap-3">
          <Info className="h-5 w-5 text-cyan-400 shrink-0 mt-0.5" />
          <div>
            <div className="text-xs font-mono text-cyan-400 font-semibold mb-0.5">
              Inspecting: {selectedNode.label} ({selectedNode.type?.toUpperCase()})
            </div>
            <div className="text-xs text-slate-300 leading-relaxed">
              {selectedNode.description}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

