'use client';

import React from 'react';
import Sidebar from '@/components/layout/Sidebar';
import LearningRoadmap from '@/components/interactive/LearningRoadmap';
import { GitBranch, Compass, Sparkles } from 'lucide-react';

export default function RoadmapPage() {
  return (
    <div className="flex">
      <Sidebar />

      <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-6xl mx-auto space-y-8 overflow-y-auto">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-6">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono text-cyan-400 mb-1">
              <GitBranch className="h-4 w-4" />
              <span>ACADEMIC CURRICULUM</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-white">
              University Learning Roadmap
            </h1>
            <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-2xl">
              From absolute beginner fundamentals to advanced neural architectures. Navigate tracks, view prerequisites, and track your milestone completion status.
            </p>
          </div>
        </div>

        <LearningRoadmap />
      </main>
    </div>
  );
}

