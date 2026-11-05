'use client';

import React, { useState } from 'react';
import Sidebar from '@/components/layout/Sidebar';
import { useStudent } from '@/lib/store';
import { isSupabaseConfigured } from '@/lib/supabase';
import { UserCog, Database, RotateCcw, Check, LogIn, LogOut, UserCheck } from 'lucide-react';

export default function ProfilePage() {
  const { state, resetProgress, openAuthModal, signOut } = useStudent();
  const [dailyGoalMinutes, setDailyGoalMinutes] = useState(30);
  const [notificationSaved, setNotificationSaved] = useState(false);

  const handleSaveGoal = () => {
    setNotificationSaved(true);
    setTimeout(() => setNotificationSaved(false), 2000);
  };

  return (
    <div className="flex bg-black min-h-screen text-white">
      <Sidebar />

      <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-4xl mx-auto space-y-6 overflow-y-auto">
        <div className="border-b border-[#303030] pb-4">
          <div className="flex items-center gap-2 text-xs font-mono text-[#D0D0D0] mb-1">
            <UserCog className="h-4 w-4" />
            <span>STUDENT SETTINGS & STORAGE</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-white">
            Profile & Settings
          </h1>
          <p className="text-xs sm:text-sm text-[#999999] mt-1 max-w-xl">
            Manage your authenticated account, cloud sync, and daily study targets.
          </p>
        </div>

        {/* Student Identity Card */}
        <div className="rounded-xl border border-[#303030] bg-[#111111] p-6 space-y-4">
          <div className="flex items-center justify-between border-b border-[#303030] pb-4">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-[#181818] border border-[#303030] text-white">
                <UserCheck className="h-6 w-6 text-[#75D7FF]" />
              </div>
              <div>
                <h3 className="text-base font-bold text-white">
                  {state.user ? state.user.fullName || 'Active Scholar' : 'Guest Student Session'}
                </h3>
                <p className="text-xs text-[#999999]">
                  {state.user ? state.user.email : 'Sign in to access your permanent streak and earned badges'}
                </p>
              </div>
            </div>

            {state.user ? (
              <button
                onClick={() => signOut()}
                className="flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-[#181818] border border-[#303030] text-xs font-semibold text-[#999999] hover:text-white transition"
              >
                <LogOut className="w-3.5 h-3.5" />
                <span>Sign Out</span>
              </button>
            ) : (
              <button
                onClick={() => openAuthModal('login')}
                className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white text-black text-xs font-bold hover:bg-[#E5E5E5] transition shadow-md"
              >
                <LogIn className="w-3.5 h-3.5" />
                <span>Sign In / Register</span>
              </button>
            )}
          </div>
        </div>

        {/* Study Target Goals */}
        <div className="rounded-xl border border-[#303030] bg-[#111111] p-6 space-y-4">
          <h3 className="text-sm font-semibold text-white">Daily Learning Target</h3>
          <div className="flex items-center gap-4">
            <input
              type="range"
              min="15"
              max="90"
              step="15"
              value={dailyGoalMinutes}
              onChange={(e) => setDailyGoalMinutes(parseInt(e.target.value))}
              className="w-64 accent-white"
            />
            <span className="font-mono text-xs text-white font-bold">{dailyGoalMinutes} mins / day</span>

            <button
              onClick={handleSaveGoal}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-white text-black hover:bg-[#E5E5E5] transition"
            >
              {notificationSaved ? <Check className="h-3.5 w-3.5 text-black" /> : null}
              <span>{notificationSaved ? 'Saved Target' : 'Update Target'}</span>
            </button>
          </div>
        </div>

        {/* Progress Reset */}
        <div className="rounded-xl border border-[#303030] bg-[#111111] p-6 space-y-3">
          <h3 className="text-sm font-semibold text-white">Data Reset</h3>
          <p className="text-xs text-[#999999] leading-relaxed">
            Reset all your completed lessons, notes, and quiz submissions to restart with a clean slate.
          </p>

          <div>
            <button
              onClick={resetProgress}
              className="flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-semibold bg-[#181818] text-[#D0D0D0] hover:text-white hover:bg-[#252525] border border-[#303030] transition"
            >
              <RotateCcw className="h-4 w-4" />
              <span>Reset All Progress</span>
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}
