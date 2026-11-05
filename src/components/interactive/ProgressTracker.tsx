'use client';

import React from 'react';
import { useStudent } from '@/lib/store';
import { ALL_LESSONS, MODULES_DATA } from '@/lib/modulesData';
import { Trophy, CheckCircle, Clock, Flame } from 'lucide-react';

export default function ProgressTracker() {
  const { state } = useStudent();

  const totalLessons = ALL_LESSONS.length;
  const completedCount = state.completedLessons.length;
  const percentage = Math.round((completedCount / totalLessons) * 100);

  return (
    <div className="rounded-xl border border-white/10 bg-navy-950/80 p-5 backdrop-blur-md">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h4 className="text-sm font-semibold text-white">University Progress</h4>
          <p className="text-xs text-slate-400">Mastering Machine Learning Curriculum</p>
        </div>
        <div className="text-right">
          <span className="text-2xl font-black font-mono text-cyan-400">{percentage}%</span>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="w-full bg-navy-900 h-2.5 rounded-full overflow-hidden border border-white/5 mb-4">
        <div
          className="h-full bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 transition-all duration-700 shadow-glow"
          style={{ width: `${percentage}%` }}
        />
      </div>

      {/* Key Metric Counters */}
      <div className="grid grid-cols-3 gap-2 text-center text-xs font-mono">
        <div className="p-2.5 rounded-lg bg-navy-900/60 border border-white/5">
          <div className="flex items-center justify-center gap-1 text-slate-400 mb-1">
            <CheckCircle className="h-3.5 w-3.5 text-cyan-400" />
            <span>Completed</span>
          </div>
          <div className="text-base font-bold text-white">
            {completedCount}/{totalLessons}
          </div>
        </div>

        <div className="p-2.5 rounded-lg bg-navy-900/60 border border-white/5">
          <div className="flex items-center justify-center gap-1 text-slate-400 mb-1">
            <Flame className="h-3.5 w-3.5 text-amber-400" />
            <span>Streak</span>
          </div>
          <div className="text-base font-bold text-white">
            {state.streakDays} Days
          </div>
        </div>

        <div className="p-2.5 rounded-lg bg-navy-900/60 border border-white/5">
          <div className="flex items-center justify-center gap-1 text-slate-400 mb-1">
            <Trophy className="h-3.5 w-3.5 text-purple-400" />
            <span>Badges</span>
          </div>
          <div className="text-base font-bold text-white">
            {state.earnedBadges.length}
          </div>
        </div>
      </div>
    </div>
  );
}

