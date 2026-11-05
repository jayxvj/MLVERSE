'use client';

import React from 'react';
import Link from 'next/link';
import { Lesson } from '@/lib/types';
import { useStudent } from '@/lib/store';
import {
  ChevronLeft,
  ChevronRight,
  CheckCircle2,
  Bookmark,
  Share2,
  Award,
} from 'lucide-react';

interface LessonNavigationProps {
  currentLesson: Lesson;
  prevLesson?: Lesson;
  nextLesson?: Lesson;
  onOpenQuiz?: () => void;
}

export default function LessonNavigation({
  currentLesson,
  prevLesson,
  nextLesson,
  onOpenQuiz,
}: LessonNavigationProps) {
  const { state, toggleCompleteLesson, toggleBookmark } = useStudent();

  const isCompleted = state.completedLessons.includes(currentLesson.id);
  const isBookmarked = state.bookmarkedLessons.includes(currentLesson.id);

  return (
    <div className="rounded-xl border border-white/10 bg-navy-950/90 p-4 backdrop-blur-md sticky bottom-4 z-40 shadow-glass">
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
        {/* Left Actions: Previous & Bookmark */}
        <div className="flex items-center gap-2 w-full sm:w-auto justify-between sm:justify-start">
          {prevLesson ? (
            <Link
              href={`/lessons/${prevLesson.id}`}
              className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-semibold bg-white/5 hover:bg-white/10 text-slate-300 border border-white/5 transition"
            >
              <ChevronLeft className="h-4 w-4" />
              <span className="hidden md:inline">Prev: {prevLesson.title.slice(0, 20)}...</span>
              <span className="md:hidden">Previous</span>
            </Link>
          ) : (
            <span className="text-xs text-slate-400 font-mono">First lesson</span>
          )}

          <button
            onClick={() => toggleBookmark(currentLesson.id)}
            className={`p-2 rounded-lg text-xs border transition ${
              isBookmarked
                ? 'bg-amber-500/20 text-amber-300 border-amber-500/40'
                : 'bg-white/5 text-slate-400 border-white/5 hover:text-white'
            }`}
            title={isBookmarked ? 'Remove Bookmark' : 'Bookmark this Lesson'}
          >
            <Bookmark className={`h-4 w-4 ${isBookmarked ? 'fill-amber-400 text-amber-400' : ''}`} />
          </button>
        </div>

        {/* Center / Action Buttons */}
        <div className="flex items-center gap-3 w-full sm:w-auto justify-end">
          {onOpenQuiz && (
            <button
              onClick={onOpenQuiz}
              className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-semibold bg-purple-500/20 text-purple-300 border border-purple-500/30 hover:bg-purple-500/30 transition"
            >
              <Award className="h-4 w-4" />
              <span>Take Quiz</span>
            </button>
          )}

          <button
            onClick={() => toggleCompleteLesson(currentLesson.id, currentLesson.moduleId)}
            className={`flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-xs font-semibold transition ${
              isCompleted
                ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                : 'bg-white/10 text-white hover:bg-white/15 border border-white/10'
            }`}
          >
            <CheckCircle2 className={`h-4 w-4 ${isCompleted ? 'text-emerald-400' : ''}`} />
            <span>{isCompleted ? 'Completed' : 'Mark Complete'}</span>
          </button>

          {nextLesson && (
            <Link
              href={`/lessons/${nextLesson.id}`}
              className="flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs font-semibold bg-gradient-to-r from-cyan-400 to-blue-500 text-navy-950 hover:brightness-110 shadow-glow transition"
            >
              <span className="hidden md:inline">Next: {nextLesson.title.slice(0, 20)}...</span>
              <span className="md:hidden">Next</span>
              <ChevronRight className="h-4 w-4" />
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}

