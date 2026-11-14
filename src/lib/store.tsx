'use client';

import React, { createContext, useContext, useEffect, useState, useRef } from 'react';
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
}

const GLOBAL_SESSION_KEY = 'mlverse_active_session_user';
const PROGRESS_KEY_PREFIX = 'mlverse_user_progress_';

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

  const syncTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Sync state to backend database (debounced)
  const syncProgressToBackend = (email: string, progressData: Partial<UserProgressState>) => {
    if (!email) return;
    if (syncTimeoutRef.current) clearTimeout(syncTimeoutRef.current);

    syncTimeoutRef.current = setTimeout(async () => {
      try {
        await fetch('/api/progress', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            email,
            progress: {
              completedLessons: progressData.completedLessons,
              completedModules: progressData.completedModules,
              bookmarkedLessons: progressData.bookmarkedLessons,
              notes: progressData.notes,
              quizScores: progressData.quizScores,
              earnedBadges: progressData.earnedBadges,
              streakDays: progressData.streakDays,
            },
          }),
        });
      } catch (err) {
        console.warn('[PROGRESS SYNC WARNING]', err);
      }
    }, 400);
  };

  // 1. Initial Load: Restore user session and their individual progress
  useEffect(() => {
    try {
      const activeUserJson = localStorage.getItem(GLOBAL_SESSION_KEY);
      if (activeUserJson) {
        const activeUser: StudentProfile = JSON.parse(activeUserJson);
        const userProgressKey = PROGRESS_KEY_PREFIX + (activeUser.id || activeUser.email);
        const cachedProgressJson = localStorage.getItem(userProgressKey);

        let initialLoadedProgress = INITIAL_EMPTY_STATE;
        if (cachedProgressJson) {
          try {
            initialLoadedProgress = { ...INITIAL_EMPTY_STATE, ...JSON.parse(cachedProgressJson) };
          } catch {}
        }

        setState({
          ...initialLoadedProgress,
          user: activeUser,
        });

        // Background fetch latest progress from SQLite DB for this user
        fetch(`/api/progress?email=${encodeURIComponent(activeUser.email)}`)
          .then((res) => (res.ok ? res.json() : null))
          .then((data) => {
            if (data?.progress) {
              setState((prev) => {
                if (prev.user?.email !== activeUser.email) return prev;
                const merged: UserProgressState = {
                  ...prev,
                  completedLessons: Array.from(new Set([...prev.completedLessons, ...(data.progress.completedLessons || [])])),
                  completedModules: Array.from(new Set([...prev.completedModules, ...(data.progress.completedModules || [])])),
                  bookmarkedLessons: Array.from(new Set([...prev.bookmarkedLessons, ...(data.progress.bookmarkedLessons || [])])),
                  notes: { ...data.progress.notes, ...prev.notes },
                  quizScores: { ...data.progress.quizScores, ...prev.quizScores },
                  earnedBadges: Array.from(new Set([...prev.earnedBadges, ...(data.progress.earnedBadges || [])])),
                  streakDays: Math.max(prev.streakDays, data.progress.streakDays || 1),
                };
                try {
                  localStorage.setItem(userProgressKey, JSON.stringify(merged));
                } catch {}
                return merged;
              });
            }
          })
          .catch((e) => console.warn('[PROGRESS INITIAL SYNC WARNING]', e));
      }
    } catch (e) {
      console.warn('Failed to parse active user session:', e);
    }
    setIsLoaded(true);
  }, []);

  // 2. Save individual user progress whenever state changes
  useEffect(() => {
    if (!isLoaded) return;
    try {
      if (state.user) {
        const userProgressKey = PROGRESS_KEY_PREFIX + (state.user.id || state.user.email);
        localStorage.setItem(GLOBAL_SESSION_KEY, JSON.stringify(state.user));
        localStorage.setItem(userProgressKey, JSON.stringify(state));
        syncProgressToBackend(state.user.email, state);
      } else {
        localStorage.removeItem(GLOBAL_SESSION_KEY);
      }
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

  // Sign In with individual user progress loading
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

      // Load user's individual progress from SQLite
      let userDbProgress = null;
      try {
        const progRes = await fetch(`/api/progress?email=${encodeURIComponent(profile.email)}`);
        if (progRes.ok) {
          const progData = await progRes.json();
          userDbProgress = progData.progress;
        }
      } catch (err) {
        console.warn('[DB PROGRESS LOAD WARNING]', err);
      }

      // Check local cache for this specific user
      const userProgressKey = PROGRESS_KEY_PREFIX + profile.id;
      let userLocalProgress: any = null;
      try {
        const cached = localStorage.getItem(userProgressKey);
        if (cached) userLocalProgress = JSON.parse(cached);
      } catch {}

      const mergedProgress: UserProgressState = {
        ...INITIAL_EMPTY_STATE,
        user: profile,
        completedLessons: userDbProgress?.completedLessons || userLocalProgress?.completedLessons || [],
        completedModules: userDbProgress?.completedModules || userLocalProgress?.completedModules || [],
        bookmarkedLessons: userDbProgress?.bookmarkedLessons || userLocalProgress?.bookmarkedLessons || [],
        notes: userDbProgress?.notes || userLocalProgress?.notes || {},
        quizScores: userDbProgress?.quizScores || userLocalProgress?.quizScores || {},
        earnedBadges: userDbProgress?.earnedBadges || userLocalProgress?.earnedBadges || [],
        streakDays: userDbProgress?.streakDays || data.user.streakDays || 1,
      };

      setState(mergedProgress);
      localStorage.setItem(GLOBAL_SESSION_KEY, JSON.stringify(profile));
      localStorage.setItem(userProgressKey, JSON.stringify(mergedProgress));

      closeAuthModal();
      return { success: true };
    } catch (err: any) {
      return { success: false, error: err.message || 'Network error connecting to auth service' };
    }
  };

  // Sign Up with individual fresh progress creation
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

      // Completely fresh, individual progress for this newly registered user
      const freshProgress: UserProgressState = {
        ...INITIAL_EMPTY_STATE,
        user: profile,
        completedLessons: [],
        completedModules: [],
        bookmarkedLessons: [],
        notes: {},
        quizScores: {},
        earnedBadges: [],
        streakDays: 1,
      };

      const userProgressKey = PROGRESS_KEY_PREFIX + profile.id;
      localStorage.setItem(GLOBAL_SESSION_KEY, JSON.stringify(profile));
      localStorage.setItem(userProgressKey, JSON.stringify(freshProgress));

      setState(freshProgress);
      closeAuthModal();
      return { success: true };
    } catch (err: any) {
      return { success: false, error: err.message || 'Network error connecting to auth service' };
    }
  };

  // Sign Out: completely isolate user data, reset active screen to blank state
  const signOut = async () => {
    if (isSupabaseConfigured && supabase) {
      try {
        await supabase.auth.signOut();
      } catch {}
    }
    localStorage.removeItem(GLOBAL_SESSION_KEY);
    setState(INITIAL_EMPTY_STATE);
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
      try {
        await supabase.auth.updateUser({
          data: { avatar_url: avatarUrl },
        });
      } catch {}
    }
  };

  // Mark lesson as complete: NO ROLLBACK. Once marked complete, it stays completed!
  const toggleCompleteLesson = (lessonId: string, moduleId?: string) => {
    setState((prev) => {
      // If already marked as complete, DO NOT roll back or toggle off
      if (prev.completedLessons.includes(lessonId)) {
        return prev;
      }

      const newCompleted = [...prev.completedLessons, lessonId];
      const newModules = [...prev.completedModules];
      if (moduleId && !newModules.includes(moduleId)) {
        newModules.push(moduleId);
      }

      const todayName = new Date().toLocaleDateString('en-US', { weekday: 'short' });
      const updatedWeekly = prev.weeklyActivity.map((w) =>
        w.day === todayName ? { ...w, lessonsCount: w.lessonsCount + 1, minutes: w.minutes + 15 } : w
      );

      const nextState: UserProgressState = {
        ...prev,
        completedLessons: newCompleted,
        completedModules: newModules,
        weeklyActivity: updatedWeekly,
      };

      if (prev.user?.email) {
        syncProgressToBackend(prev.user.email, nextState);
      }

      return nextState;
    });
  };

  const toggleBookmark = (lessonId: string) => {
    setState((prev) => {
      const exists = prev.bookmarkedLessons.includes(lessonId);
      const nextState: UserProgressState = {
        ...prev,
        bookmarkedLessons: exists
          ? prev.bookmarkedLessons.filter((id) => id !== lessonId)
          : [...prev.bookmarkedLessons, lessonId],
      };
      if (prev.user?.email) {
        syncProgressToBackend(prev.user.email, nextState);
      }
      return nextState;
    });
  };

  const saveNote = (lessonId: string, note: string) => {
    setState((prev) => {
      const nextState: UserProgressState = {
        ...prev,
        notes: {
          ...prev.notes,
          [lessonId]: note,
        },
      };
      if (prev.user?.email) {
        syncProgressToBackend(prev.user.email, nextState);
      }
      return nextState;
    });
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

      const nextState: UserProgressState = {
        ...prev,
        quizScores: updatedScores,
        earnedBadges: newBadges,
      };

      if (prev.user?.email) {
        syncProgressToBackend(prev.user.email, nextState);
      }

      return nextState;
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
