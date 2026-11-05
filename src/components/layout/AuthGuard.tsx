'use client';

import React, { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { useStudent } from '@/lib/store';
import { Lock, Sparkles } from 'lucide-react';

export default function AuthGuard({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const { state, isLoaded, openAuthModal } = useStudent();

  const isPublicRoute = pathname === '/';

  useEffect(() => {
    // If client storage is loaded and user is not logged in on a non-public route, open auth modal
    if (isLoaded && !state.user && !isPublicRoute) {
      openAuthModal('login');
    }
  }, [isLoaded, state.user, isPublicRoute, openAuthModal]);

  // Public home route always renders
  if (isPublicRoute) {
    return <>{children}</>;
  }

  // While checking local storage or if logged in
  if (!isLoaded) {
    return (
      <div className="min-h-[80vh] flex items-center justify-center bg-black text-white">
        <div className="flex items-center gap-3 px-5 py-3 rounded-2xl bg-[#111111] border border-[#303030]">
          <span className="w-2.5 h-2.5 rounded-full bg-white animate-ping" />
          <span className="text-xs font-mono text-[#D0D0D0]">INITIALIZING CAMPUS...</span>
        </div>
      </div>
    );
  }

  // If user is authenticated, render protected page
  if (state.user) {
    return <>{children}</>;
  }

  // If user is not authenticated on a protected page: show locked in-page view with prompt
  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 bg-black text-white">
      <div className="max-w-md w-full p-8 rounded-3xl bg-[#111111] border border-[#303030] text-center space-y-6 shadow-2xl">
        <div className="w-14 h-14 rounded-2xl bg-[#181818] border border-[#303030] flex items-center justify-center mx-auto text-white shadow-sm">
          <Lock className="w-6 h-6" />
        </div>

        <div className="space-y-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#181818] border border-[#303030] text-xs font-mono text-[#D0D0D0]">
            <Sparkles className="w-3.5 h-3.5 text-white" />
            <span>AUTHENTICATION REQUIRED</span>
          </div>
          <h2 className="text-2xl font-bold text-white tracking-tight">
            Scholar Sign In Required
          </h2>
          <p className="text-xs text-[#999999] leading-relaxed">
            All curriculum tracks, labs, calculators, and assessments are protected. Sign in or enroll to access the platform.
          </p>
        </div>

        <div className="pt-2 flex flex-col sm:flex-row gap-3 justify-center">
          <button
            onClick={() => openAuthModal('login')}
            className="w-full py-3 rounded-xl bg-white text-black font-bold text-xs hover:bg-[#E5E5E5] transition shadow-md"
          >
            Sign In to Account
          </button>
          <button
            onClick={() => openAuthModal('register')}
            className="w-full py-3 rounded-xl bg-[#181818] border border-[#303030] text-white font-semibold text-xs hover:bg-[#222222] transition"
          >
            Enroll Free
          </button>
        </div>
      </div>
    </div>
  );
}

