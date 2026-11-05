'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Module } from '@/lib/types';
import { BookOpen, Clock, ArrowRight, Layers } from 'lucide-react';

interface ModuleCardProps {
  module: Module;
  isCompleted?: boolean;
  completedLessonsCount?: number;
}

export default function ModuleCard({
  module,
  isCompleted = false,
  completedLessonsCount = 0,
}: ModuleCardProps) {
  const totalLessons = module.lessons.length;
  const progressPct = Math.round((completedLessonsCount / totalLessons) * 100);

  return (
    <motion.div
      whileHover={{ y: -4, transition: { duration: 0.2, ease: 'easeOut' } }}
      className={`rounded-3xl border p-6 bg-[#111111] transition-all duration-200 flex flex-col justify-between shadow-lg relative overflow-hidden group ${
        isCompleted
          ? 'border-[#444444]'
          : 'border-[#303030] hover:border-[#555555]'
      }`}
    >
      <div>
        {/* Top Badges */}
        <div className="flex items-center justify-between text-xs font-mono text-[#999999] mb-3.5">
          <span className="px-2.5 py-0.5 rounded-full border border-[#303030] bg-[#181818] text-[11px] font-semibold text-[#D0D0D0]">
            {module.level}
          </span>
          <div className="flex items-center gap-1.5 text-[#999999]">
            <Clock className="h-3.5 w-3.5" />
            <span>{module.estimatedHours} hrs</span>
          </div>
        </div>

        {/* Title */}
        <h3 className="text-base sm:text-lg font-bold text-white mb-2 leading-snug group-hover:text-[#D0D0D0] transition-colors">
          {module.title}
        </h3>

        {/* Short Description */}
        <p className="text-xs text-[#D0D0D0] leading-relaxed mb-5 line-clamp-3">
          {module.shortDescription}
        </p>

        {/* Progress Bar */}
        <div className="mb-5 bg-[#0A0A0A] p-3 rounded-2xl border border-[#303030]">
          <div className="flex justify-between text-[11px] font-mono text-[#999999] mb-1.5">
            <span className="flex items-center gap-1">
              <Layers className="w-3 h-3 text-white" />
              <span>Progress</span>
            </span>
            <span className="font-semibold text-white">{completedLessonsCount}/{totalLessons} ({progressPct}%)</span>
          </div>
          <div className="w-full bg-[#181818] h-2 rounded-full overflow-hidden p-0.5">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${progressPct}%` }}
              transition={{ duration: 0.8, ease: 'easeOut' }}
              className="h-full rounded-full bg-gradient-to-r from-white via-[#C0C0C0] to-[#75D7FF]"
            />
          </div>
        </div>
      </div>

      {/* Footer Navigation */}
      <div className="flex items-center justify-between pt-4 border-t border-[#303030] text-xs">
        <Link
          href={`/modules/${module.id}`}
          className="text-[#999999] hover:text-white transition flex items-center gap-1.5 font-semibold"
        >
          <BookOpen className="h-3.5 w-3.5 text-white" />
          <span>Curriculum</span>
        </Link>

        <Link
          href={`/lessons/${module.lessons[0]?.id || 'les-1-1'}`}
          className="px-4 py-2 rounded-xl font-semibold flex items-center gap-1.5 transition-all bg-white text-black hover:bg-[#E5E5E5] shadow-sm"
        >
          <span>{isCompleted ? 'Review' : 'Enter'}</span>
          <ArrowRight className="h-3.5 w-3.5" />
        </Link>
      </div>
    </motion.div>
  );
}
