'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import {
  Sparkles,
  BookOpen,
  Code,
  Cpu,
  Layers,
  Award,
  Flame,
  Menu,
  X,
  Compass,
  LogIn,
  LogOut,
  UserCheck
} from 'lucide-react';
import { useStudent } from '@/lib/store';

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const { state, openAuthModal, signOut } = useStudent();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { href: '/dashboard', label: 'Dashboard', icon: Layers },
    { href: '/roadmap', label: 'Roadmap', icon: Compass },
    { href: '/modules', label: 'Modules', icon: BookOpen },
    { href: '/coding-lab', label: 'Python Lab', icon: Code },
    { href: '/playground', label: 'ML Playground', icon: Cpu },
  ];

  const handleProtectedNav = (e: React.MouseEvent, href: string) => {
    e.preventDefault();
    if (!state.user) {
      openAuthModal('login');
    } else {
      router.push(href);
    }
  };

  return (
    <header className="sticky top-0 z-40 w-full border-b border-[#303030] bg-[#000000]/90 backdrop-blur-xl transition-all">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">

        {/* Brand Logo */}
        <Link href="/" className="flex items-center gap-3 group">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#111111] text-white border border-[#444444] shadow-sm transition-all duration-300 group-hover:border-white">
            <Sparkles className="h-5 w-5 text-[#F5F5F5]" />
          </div>
          <div className="flex flex-col">
            <span className="text-xl font-bold tracking-tight text-white">
              ML<span className="text-[#D0D0D0]">VERSE</span>
            </span>
            <span className="text-[10px] uppercase font-semibold tracking-wider text-[#999999] -mt-1">
              Machine Learning Academy
            </span>
          </div>
        </Link>

        {/* Desktop Navigation Capsule */}
        <nav className="hidden md:flex items-center gap-1 bg-[#0A0A0A] p-1.5 rounded-full border border-[#303030]">
          {navLinks.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href || (item.href !== '/' && pathname.startsWith(item.href));
            return (
              <button
                key={item.href}
                onClick={(e) => handleProtectedNav(e, item.href)}
                className={`flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold tracking-wide transition-all ${isActive && state.user
                  ? 'bg-[#FFFFFF] text-[#000000] shadow-sm'
                  : 'text-[#D0D0D0] hover:text-white hover:bg-[#181818]'
                  }`}
              >
                <Icon className={`h-3.5 w-3.5 ${isActive && state.user ? 'text-black' : 'text-[#999999]'}`} />
                <span>{item.label}</span>
              </button>
            );
          })}
        </nav>

        {/* User Badges, Streak & Auth Control */}
        <div className="hidden sm:flex items-center gap-3">
          {state.user ? (
            <>
              {/* Streak Counter (visible only when logged in) */}
              <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#111111] border border-[#303030] text-[#D0D0D0] text-xs font-semibold">
                <Flame className="h-3.5 w-3.5 text-[#F5F5F5]" />
                <span>{state.streakDays}</span>
              </div>

              {/* Achievements Badge (visible only when logged in) */}
              <Link
                href="/achievements"
                className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#181818] border border-[#303030] text-white text-xs font-medium hover:bg-[#222222] hover:border-[#444444] transition shadow-sm"
              >
                <Award className="h-3.5 w-3.5 text-[#D0D0D0]" />
              </Link>

              {/* User Profile Pill & Sign Out */}
              <div className="flex items-center gap-1.5 pl-2 border-l border-[#303030]">
                <Link
                  href="/profile"
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#181818] border border-[#303030] text-xs text-white hover:border-[#555555] transition"
                  title="View Profile"
                >
                  <UserCheck className="h-3.5 w-3.5 text-[#75D7FF]" />
                  <span className="max-w-[100px] truncate">{state.user.fullName || state.user.email}</span>
                </Link>

                <button
                  onClick={() => signOut()}
                  className="p-1.5 rounded-full text-[#999999] hover:text-white hover:bg-[#181818] transition"
                  title="Sign Out"
                >
                  <LogOut className="h-4 w-4" />
                </button>
              </div>
            </>
          ) : (
            <>
              {/* Auth Prompt Buttons (when logged out) */}
              <button
                onClick={() => openAuthModal('login')}
                className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#181818] border border-[#303030] text-[#D0D0D0] text-xs font-semibold hover:text-white hover:border-[#444444] transition shadow-sm"
              >
                <LogIn className="h-3.5 w-3.5" />
                <span>Sign In</span>
              </button>

              <button
                onClick={() => openAuthModal('register')}
                className="flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-white text-black text-xs font-bold hover:bg-[#E5E5E5] transition shadow-sm"
              >
                <span>Enroll Free</span>
              </button>
            </>
          )}
        </div>

        {/* Mobile Hamburger Button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden p-2 rounded-xl text-[#D0D0D0] hover:text-white hover:bg-[#181818] transition border border-[#303030]"
          aria-label="Toggle Navigation Menu"
        >
          {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-[#303030] bg-[#0A0A0A]/95 backdrop-blur-2xl px-4 py-4 space-y-2">
          {navLinks.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;
            return (
              <button
                key={item.href}
                onClick={(e) => {
                  setMobileMenuOpen(false);
                  handleProtectedNav(e, item.href);
                }}
                className={`w-full text-left flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-semibold transition ${isActive && state.user
                  ? 'bg-white text-black font-bold'
                  : 'text-[#D0D0D0] hover:bg-[#181818] hover:text-white'
                  }`}
              >
                <Icon className={`h-4 w-4 ${isActive && state.user ? 'text-black' : 'text-[#999999]'}`} />
                <span>{item.label}</span>
              </button>
            );
          })}

          <div className="pt-3 border-t border-[#303030] space-y-2">
            {state.user ? (
              <>
                <div className="flex items-center justify-between text-xs text-[#D0D0D0] px-2 py-1">
                  <div className="flex items-center gap-2">
                    <UserCheck className="h-4 w-4 text-[#75D7FF]" />
                    <span>{state.user.fullName || state.user.email}</span>
                  </div>
                  <div className="flex items-center gap-1 font-semibold text-white">
                    <Flame className="h-4 w-4" />
                    <span>{state.streakDays} Days</span>
                  </div>
                </div>

                <div className="flex items-center gap-2 pt-1">
                  <Link
                    href="/achievements"
                    onClick={() => setMobileMenuOpen(false)}
                    className="flex-1 text-center py-2 rounded-xl bg-[#181818] border border-[#303030] text-xs font-semibold text-[#D0D0D0]"
                  >
                    Badges
                  </Link>

                  <button
                    onClick={() => {
                      signOut();
                      setMobileMenuOpen(false);
                    }}
                    className="flex-1 text-center py-2 rounded-xl bg-[#181818] border border-[#303030] text-xs font-semibold text-[#999999] hover:text-white"
                  >
                    Sign Out
                  </button>
                </div>
              </>
            ) : (
              <div className="flex items-center gap-2 pt-1">
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    openAuthModal('login');
                  }}
                  className="flex-1 py-2.5 rounded-xl bg-[#181818] border border-[#303030] text-xs font-semibold text-white"
                >
                  Sign In
                </button>
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    openAuthModal('register');
                  }}
                  className="flex-1 py-2.5 rounded-xl bg-white text-black text-xs font-bold"
                >
                  Register
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
