'use client';

import React, { useState } from 'react';
import Sidebar from '@/components/layout/Sidebar';
import ModuleCard from '@/components/interactive/ModuleCard';
import { MODULES_DATA } from '@/lib/modulesData';
import { useStudent } from '@/lib/store';
import { BookOpen, Search, Filter } from 'lucide-react';
import { Difficulty } from '@/lib/types';

export default function ModulesPage() {
  const { state } = useStudent();
  const [search, setSearch] = useState('');
  const [difficultyFilter, setDifficultyFilter] = useState<'All' | Difficulty>('All');

  const filteredModules = MODULES_DATA.filter((mod) => {
    const matchesSearch =
      mod.title.toLowerCase().includes(search.toLowerCase()) ||
      mod.description.toLowerCase().includes(search.toLowerCase()) ||
      mod.category.toLowerCase().includes(search.toLowerCase());

    const matchesDifficulty =
      difficultyFilter === 'All' || mod.level === difficultyFilter;

    return matchesSearch && matchesDifficulty;
  });

  return (
    <div className="flex">
      <Sidebar />

      <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-6xl mx-auto space-y-8 overflow-y-auto">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-6">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono text-cyan-400 mb-1">
              <BookOpen className="h-4 w-4" />
              <span>COURSE CATALOG</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-white">
              All Learning Modules
            </h1>
            <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-2xl">
              Explore the full curriculum library. Each module contains concept breakdowns, visual diagrams, formula explanations, and interactive coding labs.
            </p>
          </div>
        </div>

        {/* Filters and Search Bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-4 rounded-xl bg-navy-950/70 border border-white/10">
          <div className="relative w-full sm:w-72">
            <Search className="h-4 w-4 text-slate-400 absolute left-3 top-2.5" />
            <input
              type="text"
              placeholder="Search concepts, algorithms, metrics..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-9 pr-3 py-2 rounded-lg text-xs bg-navy-900 border border-white/10 text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400 font-sans"
            />
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto overflow-x-auto pb-1 sm:pb-0">
            <Filter className="h-3.5 w-3.5 text-slate-400 shrink-0" />
            {(['All', 'Beginner', 'Intermediate', 'Advanced'] as const).map((diff) => (
              <button
                key={diff}
                onClick={() => setDifficultyFilter(diff)}
                className={`px-3 py-1.5 rounded-lg text-xs font-mono font-medium transition whitespace-nowrap ${
                  difficultyFilter === diff
                    ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-400 shadow-glow'
                    : 'bg-navy-900 border border-white/10 text-slate-400 hover:text-white'
                }`}
              >
                {diff}
              </button>
            ))}
          </div>
        </div>

        {/* Modules Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredModules.map((module) => {
            const isCompleted = state.completedModules.includes(module.id);
            const completedCount = module.lessons.filter((l) =>
              state.completedLessons.includes(l.id)
            ).length;

            return (
              <ModuleCard
                key={module.id}
                module={module}
                isCompleted={isCompleted}
                completedLessonsCount={completedCount}
              />
            );
          })}
        </div>
      </main>
    </div>
  );
}

