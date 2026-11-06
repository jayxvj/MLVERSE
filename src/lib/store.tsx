'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import { UserProgressState, StudentProfile } from './types';
import { supabase, isSupabaseConfigured } from './supabase';

interface StudentContextType {
  state: UserProgressState;
  isLoaded: boolean;
  isSupabaseConnected: boolean;
  isAuthModalOpen: boolean;
  authModalMode: 'login' | 'register' | 'forgot-password';
  openAuthModal: (mode?: 'login' | 'register' | 'forgot-password') => void;
  closeAuthModal: () => void;
  signIn: (email: string, password?: string) => Promise<{ success: boolean; error?: string }>;
  signUp: (email: string, password?: string, fullName?: string) => Promise<{ success: boolean; error?: string }>;
  signOut: () => Promise<void>;
  updateProfileAvatar: (avatarUrl: string) => Promise<void>;
  toggleCompleteLesson: (lessonId: string, moduleId?: string) => void;
  toggleBookmark: (lessonId: string) => void;
  saveNote: (lessonId: string, note: string) => void;
  recordQuizScore: (quizId: string, score: number, total: number, badgeId?: string) => void;
  setTheme: (theme: 'dark' | 'light') => void;
  setCurrentLesson: (moduleId: string, lessonId: string) => void;
  resetProgress: () => void;
}

const STORAGE_KEY = 'mlverse_student_progress_v1';

const INITIAL_EMPTY_STATE: UserProgressState = {
  completedLessons: [],
  completedModules: [],
  bookmarkedLessons: [],
  notes: {},
  quizScores: {},
  streakDays: 1,
  lastActiveDate: new Date().toISOString().split('T')[0],
  weeklyActivity: [
    { day: 'Mon', lessonsCount: 0, minutes: 0 },
    { day: 'Tue', lessonsCount: 0, minutes: 0 },
    { day: 'Wed', lessonsCount: 0, minutes: 0 },
    { day: 'Thu', lessonsCount: 0, minutes: 0 },
    { day: 'Fri', lessonsCount: 0, minutes: 0 },
    { day: 'Sat', lessonsCount: 0, minutes: 0 },
    { day: 'Sun', lessonsCount: 0, minutes: 0 },
  ],
  earnedBadges: [],
  theme: 'dark',
  currentModuleId: 'mod-1',
  currentLessonId: 'les-1-1',
  user: null,
};

const StudentContext = createContext<StudentContextType | undefined>(undefined);

export function StudentProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState<UserProgressState>(INITIAL_EMPTY_STATE);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isSupabaseConnected] = useState(isSupabaseConfigured);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authModalMode, setAuthModalMode] = useState<'login' | 'register' | 'forgot-password'>('login');

  // Load from local storage
  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        setState(JSON.parse(saved));
      }
    } catch (e) {
      console.warn('Failed to parse local student progress:', e);
    }
    setIsLoaded(true);
  }, []);

  // Save to local storage on changes
  useEffect(() => {
    if (!isLoaded) return;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch (e) {
      console.error('Failed to write student progress:', e);
    }
  }, [state, isLoaded]);

  // Auth modal handlers
  const openAuthModal = (mode: 'login' | 'register' | 'forgot-password' = 'login') => {
    setAuthModalMode(mode);
    setIsAuthModalOpen(true);
  };

  const closeAuthModal = () => {
    setIsAuthModalOpen(false);
  };

  // Sign In with real SQL validation
  const signIn = async (email: string, password?: string): Promise<{ success: boolean; error?: string }> => {
    if (!email || !password) {
      return { success: false, error: 'Email and password are required.' };
    }

    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();
      if (!res.ok) {
        return { success: false, error: data.error || 'Failed to authenticate.' };
      }

      const profile: StudentProfile = {
        id: data.user.id,
        email: data.user.email,
        fullName: data.user.fullName,
        avatarUrl: data.user.avatarUrl || '',
      };
      setState((prev) => ({ ...prev, user: profile }));
      closeAuthModal();
      return { success: true };
    } catch (err: any) {
      return { success: false, error: err.message || 'Network error connecting to auth service' };
    }
  };

  // Sign Up with real SQL persistence
  const signUp = async (email: string, password?: string, fullName?: string): Promise<{ success: boolean; error?: string }> => {
    if (!email || !password) {
      return { success: false, error: 'Email and password are required.' };
    }

    try {
      const res = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password, fullName }),
      });
      const data = await res.json();
      if (!res.ok) {
        return { success: false, error: data.error || 'Failed to register account.' };
      }

      const profile: StudentProfile = {
        id: data.user.id,
        email: data.user.email,
        fullName: data.user.fullName,
        avatarUrl: data.user.avatarUrl || '',
      };
      setState((prev) => ({ ...prev, user: profile }));
      closeAuthModal();
      return { success: true };
    } catch (err: any) {
      return { success: false, error: err.message || 'Network error connecting to auth service' };
    }
  };

  // Sign Out
  const signOut = async () => {
    if (isSupabaseConfigured && supabase) {
      await supabase.auth.signOut();
    }
    setState((prev) => ({ ...prev, user: null }));
  };

  // Update Profile Image & Autosave to SQL and Storage
  const updateProfileAvatar = async (avatarUrl: string) => {
    setState((prev) => {
      const updatedUser: StudentProfile = prev.user
        ? { ...prev.user, avatarUrl }
        : { id: 'usr_local', email: 'scholar@mlverse.ai', fullName: 'Scholar', avatarUrl };
      return { ...prev, user: updatedUser };
    });

    if (state.user?.email) {
      try {
        await fetch('/api/auth/update-avatar', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email: state.user.email, avatarUrl }),
        });
      } catch (err) {
        console.error('Failed to sync avatar to database', err);
      }
    }

    if (isSupabaseConfigured && supabase && state.user?.id) {
      await supabase.auth.updateUser({
        data: { avatar_url: avatarUrl }
      });
    }
  };

  const toggleCompleteLesson = (lessonId: string, moduleId?: string) => {
    setState((prev) => {
      const isCompleted = prev.completedLessons.includes(lessonId);
      const newCompleted = isCompleted
        ? prev.completedLessons.filter((id) => id !== lessonId)
        : [...prev.completedLessons, lessonId];

      const newModules = [...prev.completedModules];
      if (moduleId && !isCompleted && !newModules.includes(moduleId)) {
        newModules.push(moduleId);
      }

      const todayName = new Date().toLocaleDateString('en-US', { weekday: 'short' });
      const updatedWeekly = prev.weeklyActivity.map((w) =>
        w.day === todayName ? { ...w, lessonsCount: w.lessonsCount + (isCompleted ? -1 : 1), minutes: w.minutes + (isCompleted ? -10 : 15) } : w
      );

      return {
        ...prev,
        completedLessons: newCompleted,
        completedModules: newModules,
        weeklyActivity: updatedWeekly,
      };
    });
  };

  const toggleBookmark = (lessonId: string) => {
    setState((prev) => {
      const exists = prev.bookmarkedLessons.includes(lessonId);
      return {
        ...prev,
        bookmarkedLessons: exists
          ? prev.bookmarkedLessons.filter((id) => id !== lessonId)
          : [...prev.bookmarkedLessons, lessonId],
      };
    });
  };

  const saveNote = (lessonId: string, note: string) => {
    setState((prev) => ({
      ...prev,
      notes: {
        ...prev.notes,
        [lessonId]: note,
      },
    }));
  };

  const recordQuizScore = (quizId: string, score: number, total: number, badgeId?: string) => {
    setState((prev) => {
      const updatedScores = {
        ...prev.quizScores,
        [quizId]: { score, total, timestamp: new Date().toISOString() },
      };

      const newBadges = [...prev.earnedBadges];
      if (badgeId && !newBadges.includes(badgeId) && score === total) {
        newBadges.push(badgeId);
      }

      return {
        ...prev,
        quizScores: updatedScores,
        earnedBadges: newBadges,
      };
    });
  };

  const setTheme = (theme: 'dark' | 'light') => {
    setState((prev) => ({ ...prev, theme }));
  };

  const setCurrentLesson = (moduleId: string, lessonId: string) => {
    setState((prev) => ({
      ...prev,
      currentModuleId: moduleId,
      currentLessonId: lessonId,
    }));
  };

  const resetProgress = () => {
    setState(INITIAL_EMPTY_STATE);
    localStorage.removeItem(STORAGE_KEY);
  };

  return (
    <StudentContext.Provider
      value={{
        state,
        isLoaded,
        isSupabaseConnected,
        isAuthModalOpen,
        authModalMode,
        openAuthModal,
        closeAuthModal,
        signIn,
        signUp,
        signOut,
        updateProfileAvatar,
        toggleCompleteLesson,
        toggleBookmark,
        saveNote,
        recordQuizScore,
        setTheme,
        setCurrentLesson,
        resetProgress,
      }}
    >
      {children}
    </StudentContext.Provider>
  );
}

export function useStudent() {
  const context = useContext(StudentContext);
  if (!context) {
    throw new Error('useStudent must be used within a StudentProvider');
  }
  return context;
}
