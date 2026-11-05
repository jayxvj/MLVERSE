'use client';

import React from 'react';
import Link from 'next/link';
import Sidebar from '@/components/layout/Sidebar';
import { useStudent } from '@/lib/store';
import { MODULES_DATA, ALL_LESSONS, getModuleById, getLessonById } from '@/lib/modulesData';
import { 
  Sparkles, 
  ArrowRight, 
  CheckCircle2, 
  Flame, 
  Trophy, 
  BookOpen, 
  Clock, 
  Play, 
  RotateCcw,
  Check,
  Calendar,
  Lock
} from 'lucide-react';
import InteractiveChart from '@/components/interactive/InteractiveChart';

export default function DashboardPage() {
  const { state, resetProgress, openAuthModal } = useStudent();

  const totalLessons = ALL_LESSONS.length;
  const completedCount = state.completedLessons.length;
  const completionPercentage = Math.round((completedCount / totalLessons) * 100);

  const currentModule = getModuleById(state.currentModuleId) || MODULES_DATA[0];
  const currentLesson = getLessonById(state.currentLessonId) || ALL_LESSONS[0];

  const upcomingLessons = ALL_LESSONS.filter(
    (l) => !state.completedLessons.includes(l.id)
  ).slice(0, 4);

  const recentlyCompleted = ALL_LESSONS.filter(
    (l) => state.completedLessons.includes(l.id)
  ).slice(-3);

  const totalQuizzesTaken = Object.keys(state.quizScores).length;

  return (
    <div className="flex bg-black text-white min-h-screen">
      <Sidebar />

      <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-6xl mx-auto space-y-8 overflow-y-auto">
        {/* Welcome Section */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-6 rounded-2xl bg-[#0A0A0A] border border-[#303030] shadow-xl">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono text-[#D0D0D0] mb-1">
              <Sparkles className="h-3.5 w-3.5 text-white" />
              <span>STUDENT CAMPUS PORTAL</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-white">
              {state.user ? `Welcome back, ${state.user.fullName || 'Scholar'}!` : 'Welcome to MLVERSE Campus'}
            </h1>
            <p className="text-xs sm:text-sm text-[#999999] mt-1">
              {completedCount === 0
                ? "You are at the start of your machine learning journey. Let's begin with Module 1!"
                : `You've completed ${completedCount} lesson${completedCount > 1 ? 's' : ''} across ${state.completedModules.length} module${state.completedModules.length > 1 ? 's' : ''}. Keep the momentum going!`}
            </p>
          </div>

          {/* User Auth or Reset Controls */}
          <div className="flex items-center gap-2">
            {!state.user ? (
              <button
                onClick={() => openAuthModal('login')}
                className="px-4 py-2 rounded-xl text-xs font-bold bg-white text-black hover:bg-[#E5E5E5] transition"
              >
                Sign In to Save Progress
              </button>
            ) : completedCount > 0 ? (
              <button
                onClick={resetProgress}
                className="px-3.5 py-2 rounded-xl text-xs font-semibold bg-[#111111] text-[#999999] border border-[#303030] hover:text-white transition flex items-center gap-1.5"
                title="Reset completed items"
              >
                <RotateCcw className="h-3.5 w-3.5" />
                <span>Reset Progress</span>
              </button>
            ) : null}
          </div>
        </div>

        {/* Top Metric Cards - Streak and Badges conditionally visible or prompt login */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Card 1: Completed Lessons */}
          <div className="p-5 rounded-2xl bg-[#111111] border border-[#303030]">
            <div className="flex items-center justify-between text-xs font-mono text-[#999999] mb-2">
              <span>COMPLETION</span>
              <BookOpen className="h-4 w-4 text-white" />
            </div>
            <div className="text-2xl font-black text-white">{completedCount} / {totalLessons}</div>
            <div className="text-xs text-[#999999] mt-1">{completionPercentage}% of curriculum</div>
          </div>

          {/* Card 2: Streak Days (only if user logged in, else locked indicator) */}
          <div className="p-5 rounded-2xl bg-[#111111] border border-[#303030]">
            <div className="flex items-center justify-between text-xs font-mono text-[#999999] mb-2">
              <span>LEARNING STREAK</span>
              <Flame className="h-4 w-4 text-white" />
            </div>
            {state.user ? (
              <>
                <div className="text-2xl font-black text-white">{state.streakDays} Days</div>
                <div className="text-xs text-[#999999] mt-1">Keep learning daily</div>
              </>
            ) : (
              <div 
                onClick={() => openAuthModal('login')}
                className="cursor-pointer group"
              >
                <div className="flex items-center gap-1.5 text-xs text-[#D0D0D0] font-semibold mt-1 group-hover:text-white">
                  <Lock className="w-3.5 h-3.5" />
                  <span>Sign in to unlock</span>
                </div>
                <div className="text-[11px] text-[#666666] mt-1">Tracks continuous study</div>
              </div>
            )}
          </div>

          {/* Card 3: Earned Badges (only if user logged in, else locked indicator) */}
          <div className="p-5 rounded-2xl bg-[#111111] border border-[#303030]">
            <div className="flex items-center justify-between text-xs font-mono text-[#999999] mb-2">
              <span>EARNED BADGES</span>
              <Trophy className="h-4 w-4 text-white" />
            </div>
            {state.user ? (
              <>
                <div className="text-2xl font-black text-white">{state.earnedBadges.length}</div>
                <div className="text-xs text-[#999999] mt-1">Academic credentials</div>
              </>
            ) : (
              <div 
                onClick={() => openAuthModal('login')}
                className="cursor-pointer group"
              >
                <div className="flex items-center gap-1.5 text-xs text-[#D0D0D0] font-semibold mt-1 group-hover:text-white">
                  <Lock className="w-3.5 h-3.5" />
                  <span>Sign in to unlock</span>
                </div>
                <div className="text-[11px] text-[#666666] mt-1">Earn diagnostic certificates</div>
              </div>
            )}
          </div>

          {/* Card 4: Quizzes Completed */}
          <div className="p-5 rounded-2xl bg-[#111111] border border-[#303030]">
            <div className="flex items-center justify-between text-xs font-mono text-[#999999] mb-2">
              <span>EVALUATIONS</span>
              <CheckCircle2 className="h-4 w-4 text-white" />
            </div>
            <div className="text-2xl font-black text-white">{totalQuizzesTaken}</div>
            <div className="text-xs text-[#999999] mt-1">Assessments passed</div>
          </div>
        </div>

        {/* Current Lesson Banner */}
        <div className="p-6 rounded-2xl bg-[#111111] border border-[#303030] flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-xs font-mono text-[#D0D0D0]">
              <Play className="h-3.5 w-3.5 text-white" />
              <span>RESUME CURRENT LESSON</span>
              <span>•</span>
              <span className="text-[#999999]">{currentModule.title}</span>
            </div>
            <h2 className="text-xl font-bold text-white">{currentLesson.title}</h2>
            <p className="text-xs text-[#999999] max-w-xl line-clamp-2">
              {currentLesson.simpleDefinition || currentLesson.conceptSummary}
            </p>
          </div>

          <Link
            href={`/lessons/${currentLesson.id}`}
            className="px-6 py-3 rounded-xl bg-white text-black font-bold text-xs hover:bg-[#E5E5E5] transition flex items-center justify-center gap-2 shrink-0 shadow-md"
          >
            <span>Continue Lesson</span>
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        {/* Weekly Study Activity Chart */}
        <div className="p-6 rounded-2xl bg-[#111111] border border-[#303030] space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-base font-bold text-white">Study Activity</h3>
              <p className="text-xs text-[#999999]">Minutes spent mastering concepts over the past 7 days</p>
            </div>
            <div className="flex items-center gap-2 text-xs font-mono text-[#D0D0D0]">
              <Calendar className="h-3.5 w-3.5 text-white" />
              <span>Weekly Cadence</span>
            </div>
          </div>

          <InteractiveChart
            title="Minutes Studied per Day"
            data={state.weeklyActivity.map((w) => ({ name: w.day, value: w.minutes, lessons: w.lessonsCount }))}
            xKey="name"
            series={[{ key: "value", name: "Minutes", color: "#FFFFFF" }]}
            type="bar"
            height={220}
          />
        </div>

        {/* Next Up Lessons */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-bold text-white">Next Up in Curriculum</h3>
            <Link href="/modules" className="text-xs font-semibold text-white hover:underline">
              View All Modules
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {upcomingLessons.map((lesson) => (
              <Link
                key={lesson.id}
                href={`/lessons/${lesson.id}`}
                className="p-4 rounded-xl bg-[#0A0A0A] border border-[#303030] hover:border-[#444444] transition flex items-start justify-between gap-3 group"
              >
                <div>
                  <div className="text-[11px] font-mono text-[#999999] mb-1">
                    {lesson.estimatedMinutes} mins
                  </div>
                  <h4 className="text-sm font-semibold text-white group-hover:text-[#D0D0D0] transition">
                    {lesson.title}
                  </h4>
                </div>
                <div className="p-2 rounded-lg bg-[#181818] text-[#999999] group-hover:text-white transition shrink-0">
                  <ArrowRight className="h-3.5 w-3.5" />
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Recently Mastered */}
        {recentlyCompleted.length > 0 && (
          <div className="space-y-4">
            <h3 className="text-lg font-bold text-white">Recently Mastered</h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {recentlyCompleted.map((lesson) => (
                <div
                  key={lesson.id}
                  className="p-4 rounded-xl bg-[#0A0A0A] border border-[#303030] flex items-center gap-3"
                >
                  <div className="p-2 rounded-lg bg-[#181818] text-white shrink-0">
                    <Check className="h-4 w-4" />
                  </div>
                  <div className="truncate">
                    <div className="text-xs font-semibold text-white truncate">{lesson.title}</div>
                    <div className="text-[10px] text-[#999999] font-mono">Completed</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
