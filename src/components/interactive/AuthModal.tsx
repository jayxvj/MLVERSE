'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useStudent } from '@/lib/store';
import { X, Mail, Lock, User, ArrowRight, Sparkles, AlertCircle, CheckCircle2 } from 'lucide-react';

export default function AuthModal() {
  const { isAuthModalOpen, authModalMode, closeAuthModal, openAuthModal, signIn, signUp } = useStudent();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
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
    } else {
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
              <Sparkles className="w-3.5 h-3.5 text-white" />
              <span>{authModalMode === 'login' ? 'STUDENT SIGN IN' : 'NEW SCHOLAR ENROLLMENT'}</span>
            </div>
            <h2 className="text-2xl font-black text-white tracking-tight">
              {authModalMode === 'login' ? 'Welcome Back' : 'Create Your Account'}
            </h2>
            <p className="text-xs text-[#999999]">
              {authModalMode === 'login'
                ? 'Sign in to access your streaks, achievements, and progress.'
                : 'Join MLVERSE to track streaks, master modules, and earn badges.'}
            </p>
          </div>

          {/* Alert messages */}
          {errorMsg && (
            <div className="p-3 rounded-xl bg-[#181818] border border-[#444444] text-xs text-white flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
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

            <div>
              <label className="block text-xs font-mono text-[#D0D0D0] mb-1.5">
                Password {authModalMode === 'register' && '(min. 6 characters)'}
              </label>
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
          </form>

          {/* Mode Switcher */}
          <div className="text-center pt-3 border-t border-[#303030] text-xs text-[#999999] space-y-2">
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
            ) : (
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
            )}

            <p className="text-[11px] text-[#666666] font-mono leading-relaxed pt-1">
              Policy: Inactive accounts without a 15-day streak auto-expire after 7 days for automatic reset & re-registration.
            </p>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
