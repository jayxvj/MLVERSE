'use client';

import React, { useState } from 'react';
import Sidebar from '@/components/layout/Sidebar';
import QuizEngine from '@/components/interactive/QuizEngine';
import { MODULES_DATA } from '@/lib/modulesData';
import { useStudent } from '@/lib/store';
import { CheckCircle2, Award, BookOpen, Clock, Sparkles } from 'lucide-react';

export default function QuizzesPage() {
  const { state } = useStudent();
  const [selectedModuleId, setSelectedModuleId] = useState<string>(MODULES_DATA[0].id);

  const activeModule = MODULES_DATA.find((m) => m.id === selectedModuleId) || MODULES_DATA[0];

  return (
    <div className="flex">
      <Sidebar />

      <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-5xl mx-auto space-y-6 overflow-y-auto">
        <div className="border-b border-white/10 pb-4">
          <div className="flex items-center gap-2 text-xs font-mono text-cyan-400 mb-1">
            <CheckCircle2 className="h-4 w-4" />
            <span>EXAMINATION PORTAL</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-white">
            Quizzes & Assessments
          </h1>
          <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-2xl">
            Test your conceptual clarity. Perfect scores award university achievement badges and record directly to your student record.
          </p>
        </div>

        {/* Assessment Module Selector */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          {MODULES_DATA.map((mod) => {
            const isSelected = mod.id === selectedModuleId;
            const quizRecord = state.quizScores[`exam-${mod.id}`];
            const isPassed = quizRecord && quizRecord.score === quizRecord.total;

            return (
              <button
                key={mod.id}
                onClick={() => setSelectedModuleId(mod.id)}
                className={`p-3.5 rounded-xl border text-left transition-all ${
                  isSelected
                    ? 'border-cyan-400 bg-cyan-950/40 text-cyan-200 shadow-glow'
                    : 'border-white/10 bg-navy-950/70 text-slate-300 hover:border-white/20'
                }`}
              >
                <div className="flex items-center justify-between text-[11px] font-mono text-slate-400 mb-1">
                  <span>{mod.category}</span>
                  {isPassed && (
                    <span className="flex items-center gap-1 text-emerald-400 font-bold">
                      <Award className="h-3.5 w-3.5" />
                      <span>Passed</span>
                    </span>
                  )}
                </div>
                <div className="text-xs font-bold text-white line-clamp-1">{mod.title}</div>
                <div className="text-[11px] text-slate-400 mt-1">
                  {mod.finalQuiz.length} Questions • {mod.badgeReward.title}
                </div>
              </button>
            );
          })}
        </div>

        {/* Active Quiz Engine */}
        <div className="pt-2">
          <QuizEngine
            key={activeModule.id}
            quizId={`exam-${activeModule.id}`}
            title={`Comprehensive Assessment: ${activeModule.title}`}
            questions={activeModule.finalQuiz}
            badgeId={activeModule.badgeReward.id}
          />
        </div>
      </main>
    </div>
  );
}

