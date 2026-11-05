'use client';

import React, { useState, useRef } from 'react';
import Sidebar from '@/components/layout/Sidebar';
import { useStudent } from '@/lib/store';
import {
  UserCog,
  RotateCcw,
  Check,
  LogIn,
  LogOut,
  Camera,
  ShieldAlert,
  Flame,
} from 'lucide-react';

export default function ProfilePage() {
  const { state, resetProgress, openAuthModal, signOut, updateProfileAvatar } = useStudent();
  const [dailyGoalMinutes, setDailyGoalMinutes] = useState(30);
  const [notificationSaved, setNotificationSaved] = useState(false);
  const [avatarSuccess, setAvatarSuccess] = useState(false);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleSaveGoal = () => {
    setNotificationSaved(true);
    setTimeout(() => setNotificationSaved(false), 2000);
  };

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      alert('Please select an image file (PNG, JPG, WebP, etc.).');
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      alert('Image size exceeds 5MB limit. Please choose a smaller file.');
      return;
    }

    const reader = new FileReader();
    reader.onload = async () => {
      const base64 = reader.result as string;
      await updateProfileAvatar(base64);
      setAvatarSuccess(true);
      setTimeout(() => setAvatarSuccess(false), 2500);
    };
    reader.readAsDataURL(file);
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
            Manage your account avatar, learning streaks, and automated retention lifecycle.
          </p>
        </div>

        {/* Student Identity Card with Circular Image Uploader (No name shown, only avatar pic) */}
        <div className="rounded-xl border border-[#303030] bg-[#111111] p-6 space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#303030] pb-5">
            <div className="flex items-center gap-4">
              {/* Circular Avatar with Image Uploader */}
              <div className="relative group shrink-0">
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="w-16 h-16 sm:w-20 sm:h-20 rounded-full border-2 border-[#303030] group-hover:border-white relative overflow-hidden bg-[#181818] flex items-center justify-center transition shadow-lg focus:outline-none"
                  title="Click to upload profile avatar"
                  aria-label="Upload profile image"
                >
                  {state.user?.avatarUrl ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={state.user.avatarUrl}
                      alt="Student Avatar"
                      className="w-full h-full object-cover rounded-full"
                    />
                  ) : (
                    <span className="text-xl sm:text-2xl font-black text-white font-mono">
                      {(state.user?.email || 'M')[0].toUpperCase()}
                    </span>
                  )}

                  {/* Hover Camera Overlay */}
                  <div className="absolute inset-0 bg-black/75 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-150">
                    <Camera className="w-5 h-5 text-white" />
                    <span className="text-[10px] text-[#D0D0D0] font-mono mt-0.5">Upload</span>
                  </div>
                </button>

                {/* Hidden File Input */}
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleAvatarChange}
                  className="hidden"
                />
              </div>

              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-base sm:text-lg font-bold text-white font-mono">
                    {state.user ? state.user.email : 'Guest Student Session'}
                  </h3>
                  {avatarSuccess && (
                    <span className="px-2 py-0.5 rounded-full bg-[#181818] border border-[#444444] text-[10px] text-white flex items-center gap-1 font-mono">
                      <Check className="w-3 h-3 text-white" /> Saved
                    </span>
                  )}
                </div>
                <p className="text-xs text-[#999999] mt-0.5">
                  {state.user ? 'Active Authenticated Scholar' : 'Sign in to access your permanent streak and earned badges'}
                </p>
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="text-xs text-[#D0D0D0] hover:text-white underline mt-1.5 inline-block font-mono"
                >
                  Upload custom avatar
                </button>
              </div>
            </div>

            <div className="flex items-center gap-2">
              {state.user ? (
                <button
                  onClick={() => signOut()}
                  className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-[#181818] border border-[#303030] text-xs font-semibold text-[#999999] hover:text-white transition"
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
        </div>

        {/* 7-Day Auto-Reset & 15-Day Continuous Streak Policy Notice */}
        <div className="rounded-xl border border-[#303030] bg-[#111111] p-6 space-y-3">
          <div className="flex items-center gap-2 text-xs font-mono text-[#D0D0D0]">
            <ShieldAlert className="h-4 w-4 text-white" />
            <span>ACCOUNT LIFECYCLE & RETENTION POLICY</span>
          </div>

          <div className="space-y-2 text-xs text-[#999999] leading-relaxed">
            <p>
              <strong className="text-white">Automatic 7-Day Inactivity Purge:</strong> If you forget your password or email, you do not need to worry. After 7 days of inactivity, your account is automatically purged from the SQL database and authentication is revoked.
            </p>
            <p>
              <strong className="text-white">15-Day Continuous Streak Requirement:</strong> To maintain permanent database retention across months, at least a 15-day continuous streak is required each month. Without this required streak, inactivity past 7 days automatically wipes the record so you can cleanly re-register with fresh credentials.
            </p>
          </div>

          <div className="pt-2 flex items-center gap-3 text-xs font-mono text-[#D0D0D0]">
            <div className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-[#181818] border border-[#303030]">
              <Flame className="w-3.5 h-3.5 text-white" />
              <span>Current Streak: {state.streakDays} Days</span>
            </div>
            <span className="text-[#666666]">Target: 15 continuous days / month</span>
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
