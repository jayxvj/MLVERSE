'use client';

import React from 'react';
import { notFound, useParams } from 'next/navigation';
import Link from 'next/link';
import Sidebar from '@/components/layout/Sidebar';
import { getModuleById, MODULES_DATA } from '@/lib/modulesData';
import { useStudent } from '@/lib/store';
import ConceptBrain3D from '@/components/3d/ConceptBrain3D';
import { 
  BookOpen, 
  CheckCircle2, 
  Clock, 
  ArrowRight, 
  Award, 
  Play, 
  Layers, 
  ChevronRight,
  ShieldCheck,
  AlertCircle
} from 'lucide-react';

export default function ModuleDetailPage() {
  const params = useParams();
  const moduleId = params?.moduleId as string;
  const module = getModuleById(moduleId);
  const { state } = useStudent();

  if (!module) {
    return (
      <div className="flex">
        <Sidebar />
        <main className="flex-1 p-8 text-center text-slate-300">
          <AlertCircle className="h-10 w-10 text-rose-400 mx-auto mb-2" />
          <h2 className="text-xl font-bold text-white">Module Not Found</h2>
          <p className="text-xs text-slate-400 mt-1">Please return to the course catalog.</p>
          <Link href="/modules" className="mt-4 inline-block px-4 py-2 bg-cyan-500/20 text-cyan-300 rounded-lg text-xs">
            Back to All Modules
          </Link>
        </main>
      </div>
    );
  }

  const isModuleCompleted = state.completedModules.includes(module.id);
  const completedLessonsInModule = module.lessons.filter((l) =>
    state.completedLessons.includes(l.id)
  ).length;

  return (
    <div className="flex">
      <Sidebar />

      <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-6xl mx-auto space-y-8 overflow-y-auto">
        {/* Module Header with 3D Illustration */}
        <div className="rounded-2xl border border-electric-cyan/30 bg-gradient-to-r from-navy-950 via-navy-900 to-navy-950 p-6 sm:p-8 backdrop-blur-md shadow-glow">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-8 space-y-4">
              <div className="flex flex-wrap items-center gap-2 text-xs font-mono">
                <span className="px-2.5 py-0.5 rounded bg-cyan-500/10 text-cyan-300 border border-cyan-500/30">
                  {module.category}
                </span>
                <span className="px-2.5 py-0.5 rounded bg-white/5 text-slate-300 border border-white/10">
                  {module.level}
                </span>
                <span className="flex items-center gap-1 text-slate-400">
                  <Clock className="h-3.5 w-3.5" />
                  <span>{module.estimatedHours} Hours Required</span>
                </span>
              </div>

              <h1 className="text-2xl sm:text-3xl font-black text-white leading-tight">
                {module.title}
              </h1>

              <p className="text-sm text-slate-300 leading-relaxed max-w-2xl">
                {module.description}
              </p>

              <div className="flex flex-wrap items-center gap-4 pt-2">
                <Link
                  href={`/lessons/${module.lessons[0]?.id || 'les-1-1'}`}
                  className="flex items-center gap-2 px-6 py-3 rounded-xl text-xs font-bold bg-gradient-to-r from-cyan-400 to-blue-500 text-navy-950 hover:brightness-110 shadow-glow transition"
                >
                  <Play className="h-4 w-4 fill-navy-950" />
                  <span>{completedLessonsInModule > 0 ? 'Resume Lessons' : 'Start First Lesson'}</span>
                </Link>

                <div className="text-xs font-mono text-slate-400">
                  Progress: {completedLessonsInModule}/{module.lessons.length} Finished
                </div>
              </div>
            </div>

            <div className="lg:col-span-4 flex justify-center">
              <ConceptBrain3D accentColor="#00f0ff" particleCount={60} />
            </div>
          </div>
        </div>

        {/* Learning Objectives & Prerequisites */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="rounded-xl border border-white/10 bg-navy-950/70 p-5">
            <h3 className="text-sm font-semibold text-white mb-3 flex items-center gap-2">
              <ShieldCheck className="h-4 w-4 text-cyan-400" />
              <span>Learning Objectives</span>
            </h3>
            <ul className="space-y-2">
              {module.objectives.map((obj, i) => (
                <li key={i} className="flex items-start gap-2 text-xs text-slate-300">
                  <CheckCircle2 className="h-4 w-4 text-cyan-400 shrink-0 mt-0.5" />
                  <span>{obj}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="rounded-xl border border-white/10 bg-navy-950/70 p-5 flex flex-col justify-between">
            <div>
              <h3 className="text-sm font-semibold text-white mb-3 flex items-center gap-2">
                <Layers className="h-4 w-4 text-purple-400" />
                <span>Prerequisites</span>
              </h3>
              <ul className="space-y-2">
                {module.prerequisites.map((pre, i) => (
                  <li key={i} className="flex items-start gap-2 text-xs text-slate-300">
                    <ChevronRight className="h-4 w-4 text-purple-400 shrink-0 mt-0.5" />
                    <span>{pre}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Badge Reward Callout */}
            <div className="mt-4 p-3 rounded-lg bg-navy-900/80 border border-purple-500/20 flex items-center gap-3">
              <div className="p-2 rounded bg-purple-500/20 text-purple-300">
                <Award className="h-5 w-5" />
              </div>
              <div className="text-xs">
                <div className="font-bold text-white">{module.badgeReward.title}</div>
                <div className="text-slate-400">{module.badgeReward.description}</div>
              </div>
            </div>
          </div>
        </div>

        {/* Lessons List in this Module */}
        <div className="rounded-xl border border-white/10 bg-navy-950/80 p-6 space-y-4">
          <div className="flex items-center justify-between border-b border-white/10 pb-3">
            <div>
              <h3 className="text-sm font-semibold text-white">Syllabus Lessons</h3>
              <p className="text-xs text-slate-400">Step through concepts in sequence</p>
            </div>
            <span className="text-xs font-mono text-cyan-400">
              {module.lessons.length} Lessons Total
            </span>
          </div>

          <div className="space-y-3">
            {module.lessons.map((lesson, index) => {
              const isCompleted = state.completedLessons.includes(lesson.id);
              return (
                <div
                  key={lesson.id}
                  className={`p-4 rounded-xl border transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-4 ${
                    isCompleted
                      ? 'border-emerald-500/30 bg-emerald-950/10'
                      : 'border-white/10 bg-navy-900/60 hover:border-cyan-400/40'
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-white/10 text-xs font-mono font-bold text-white shrink-0 mt-0.5">
                      0{index + 1}
                    </span>
                    <div>
                      <div className="text-sm font-bold text-white">{lesson.title}</div>
                      <p className="text-xs text-slate-300 mt-0.5 line-clamp-1">
                        {lesson.conceptSummary}
                      </p>
                      <div className="flex items-center gap-3 text-[11px] font-mono text-slate-400 mt-1">
                        <span>~{lesson.estimatedMinutes} mins</span>
                        <span>•</span>
                        <span>{lesson.knowledgeCheck.length} Quiz questions</span>
                      </div>
                    </div>
                  </div>

                  <Link
                    href={`/lessons/${lesson.id}`}
                    className="self-end sm:self-auto px-4 py-2 rounded-lg text-xs font-semibold bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 hover:bg-cyan-500/30 flex items-center gap-1.5 transition whitespace-nowrap"
                  >
                    <span>{isCompleted ? 'Review Lesson' : 'Launch Lesson'}</span>
                    <ArrowRight className="h-3.5 w-3.5" />
                  </Link>
                </div>
              );
            })}
          </div>
        </div>
      </main>
    </div>
  );
}

