'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useStudent } from '@/lib/store';
import {
  X,
  Mail,
  Lock,
  User,
  ArrowRight,
  Sparkles,
  AlertCircle,
  CheckCircle2,
  Trash2,
  AlertTriangle,
} from 'lucide-react';

export default function AuthModal() {
  const { isAuthModalOpen, authModalMode, closeAuthModal, openAuthModal, signIn, signUp, signOut, state } = useStudent();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [deleteConfirm, setDeleteConfirm] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  if (!isAuthModalOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');
    setSuccessMsg('');
    setLoading(true);

    if (authModalMode === 'login') {
      const res = await signIn(email, password);
      setLoading(false);
      if (!res.success) {
        setErrorMsg(res.error || 'Failed to authenticate');
      } else {
        setSuccessMsg('Signed in successfully!');
      }
    } else if (authModalMode === 'register') {
      if (password.length < 6) {
        setLoading(false);
        setErrorMsg('Password must be at least 6 characters.');
        return;
      }
      const res = await signUp(email, password, fullName);
      setLoading(false);
      if (!res.success) {
        setErrorMsg(res.error || 'Failed to register account');
      } else {
        setSuccessMsg('Account registered successfully!');
      }
    } else if (authModalMode === 'forgot-password') {
      if (deleteConfirm.trim() !== 'DELETE FOREVER') {
        setLoading(false);
        setErrorMsg('You must type exactly "DELETE FOREVER" to confirm deletion.');
        return;
      }

      try {
        const res = await fetch('/api/auth/delete-account', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email, confirmation: deleteConfirm.trim() }),
        });
        const data = await res.json();
        setLoading(false);

        if (!res.ok) {
          setErrorMsg(data.error || 'Failed to delete account.');
        } else {
          setSuccessMsg(data.message || 'Account deleted permanently from database.');
          setDeleteConfirm('');
          if (state.user?.email?.toLowerCase() === email.trim().toLowerCase()) {
            await signOut();
          }
        }
      } catch (err: any) {
        setLoading(false);
        setErrorMsg(err.message || 'Network error connecting to server.');
      }
    }
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={closeAuthModal}
          className="absolute inset-0 bg-black/80 backdrop-blur-md"
        />

        {/* Modal Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 15 }}
          transition={{ duration: 0.2, ease: 'easeOut' }}
          className="relative w-full max-w-md bg-[#111111] border border-[#303030] rounded-3xl p-7 shadow-2xl z-10 space-y-6 text-white"
        >
          {/* Close button */}
          <button
            onClick={closeAuthModal}
            className="absolute top-5 right-5 p-1.5 rounded-full text-[#999999] hover:text-white hover:bg-[#181818] transition"
            aria-label="Close dialog"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Header */}
          <div className="text-center space-y-2">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#181818] border border-[#303030] text-xs font-mono text-[#D0D0D0]">
              {authModalMode === 'forgot-password' ? (
                <AlertTriangle className="w-3.5 h-3.5 text-red-400" />
              ) : (
                <Sparkles className="w-3.5 h-3.5 text-white" />
              )}
              <span>
                {authModalMode === 'login'
                  ? 'STUDENT SIGN IN'
                  : authModalMode === 'register'
                  ? 'NEW SCHOLAR ENROLLMENT'
                  : 'ACCOUNT RESET'}
              </span>
            </div>
            <h2 className="text-2xl font-black text-white tracking-tight">
              {authModalMode === 'login'
                ? 'Welcome Back'
                : authModalMode === 'register'
                ? 'Create Your Account'
                : 'Forgot Password?'}
            </h2>
            <p className="text-xs text-[#999999]">
              {authModalMode === 'login'
                ? 'Sign in to access your streaks, achievements, and progress.'
                : authModalMode === 'register'
                ? 'Join MLVERSE to track streaks, master modules, and earn badges.'
                : 'Enter your email and confirm below to permanently wipe your account and all database records so you can cleanly re-register.'}
            </p>
          </div>

          {/* Alert messages */}
          {errorMsg && (
            <div className="p-3 rounded-xl bg-[#181818] border border-[#444444] text-xs text-white flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0 text-red-400" />
              <span>{errorMsg}</span>
            </div>
          )}

          {successMsg && (
            <div className="p-3 rounded-xl bg-[#181818] border border-[#444444] text-xs text-[#75D7FF] flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 shrink-0 text-[#75D7FF]" />
              <span>{successMsg}</span>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {authModalMode === 'register' && (
              <div>
                <label className="block text-xs font-mono text-[#D0D0D0] mb-1.5">
                  Full Name
                </label>
                <div className="relative">
                  <input
                    type="text"
                    required
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="Ada Lovelace"
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-[#0A0A0A] border border-[#303030] text-sm text-white placeholder-[#666666] focus:border-white focus:outline-none transition"
                  />
                  <User className="w-4 h-4 text-[#666666] absolute left-3.5 top-3" />
                </div>
              </div>
            )}

            <div>
              <label className="block text-xs font-mono text-[#D0D0D0] mb-1.5">
                Email Address
              </label>
              <div className="relative">
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="scholar@mlverse.ai"
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-[#0A0A0A] border border-[#303030] text-sm text-white placeholder-[#666666] focus:border-white focus:outline-none transition"
                />
                <Mail className="w-4 h-4 text-[#666666] absolute left-3.5 top-3" />
              </div>
            </div>

            {authModalMode !== 'forgot-password' ? (
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="block text-xs font-mono text-[#D0D0D0]">
                    Password {authModalMode === 'register' && '(min. 6 characters)'}
                  </label>
                  {authModalMode === 'login' && (
                    <button
                      type="button"
                      onClick={() => {
                        setErrorMsg('');
                        setSuccessMsg('');
                        setDeleteConfirm('');
                        openAuthModal('forgot-password');
                      }}
                      className="text-xs text-[#999999] hover:text-white transition font-mono underline"
                    >
                      Forgot Password?
                    </button>
                  )}
                </div>
                <div className="relative">
                  <input
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••••••"
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-[#0A0A0A] border border-[#303030] text-sm text-white placeholder-[#666666] focus:border-white focus:outline-none transition"
                  />
                  <Lock className="w-4 h-4 text-[#666666] absolute left-3.5 top-3" />
                </div>
              </div>
            ) : (
              <div>
                <label className="block text-xs font-mono text-red-400 mb-1.5">
                  Type &quot;DELETE FOREVER&quot; to delete account & all records
                </label>
                <div className="relative">
                  <input
                    type="text"
                    required
                    value={deleteConfirm}
                    onChange={(e) => setDeleteConfirm(e.target.value)}
                    placeholder="DELETE FOREVER"
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-[#0A0A0A] border border-red-500/40 text-sm text-white placeholder-[#555555] font-mono tracking-widest focus:border-red-500 focus:outline-none transition"
                  />
                  <Trash2 className="w-4 h-4 text-red-400 absolute left-3.5 top-3" />
                </div>
                <p className="text-[11px] text-[#888888] font-mono mt-1.5">
                  This permanently wipes your user profile, streak, and credentials from the database so you can re-register.
                </p>
              </div>
            )}

            {authModalMode !== 'forgot-password' ? (
              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 rounded-xl bg-white text-black font-bold text-sm hover:bg-[#E5E5E5] transition flex items-center justify-center gap-2 shadow-md disabled:opacity-50"
              >
                <span>
                  {loading
                    ? 'Processing...'
                    : authModalMode === 'login'
                    ? 'Sign In to Portal'
                    : 'Complete Enrollment'}
                </span>
                <ArrowRight className="w-4 h-4" />
              </button>
            ) : (
              <button
                type="submit"
                disabled={loading || deleteConfirm.trim() !== 'DELETE FOREVER'}
                className="w-full py-3 rounded-xl bg-red-600 hover:bg-red-500 text-white font-bold text-sm transition flex items-center justify-center gap-2 shadow-md disabled:opacity-40"
              >
                <span>{loading ? 'Deleting Account...' : 'Delete Account Permanently'}</span>
                <Trash2 className="w-4 h-4" />
              </button>
            )}
          </form>

          {/* Mode Switcher */}
          <div className="text-center pt-3 border-t border-[#303030] text-xs text-[#999999] space-y-1">
            {authModalMode === 'login' ? (
              <span>
                Don&apos;t have an account?{' '}
                <button
                  type="button"
                  onClick={() => {
                    setErrorMsg('');
                    setSuccessMsg('');
                    openAuthModal('register');
                  }}
                  className="text-white font-semibold hover:underline"
                >
                  Register here
                </button>
              </span>
            ) : authModalMode === 'register' ? (
              <span>
                Already enrolled?{' '}
                <button
                  type="button"
                  onClick={() => {
                    setErrorMsg('');
                    setSuccessMsg('');
                    openAuthModal('login');
                  }}
                  className="text-white font-semibold hover:underline"
                >
                  Sign in
                </button>
              </span>
            ) : (
              <span>
                Remembered your credentials?{' '}
                <button
                  type="button"
                  onClick={() => {
                    setErrorMsg('');
                    setSuccessMsg('');
                    openAuthModal('login');
                  }}
                  className="text-white font-semibold hover:underline"
                >
                  Back to Sign In
                </button>
              </span>
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
