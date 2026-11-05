'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  LayoutDashboard,
  GitBranch,
  BookOpenCheck,
  GraduationCap,
  Terminal,
  Cpu,
  BarChart3,
  Binary,
  CheckCircle2,
  FolderGit2,
  BookmarkCheck,
  Trophy,
  UserCog,
} from 'lucide-react';
import { useStudent } from '@/lib/store';

export const SIDEBAR_ITEMS = [
  { href: '/dashboard', label: 'Dashboard', icon: LayoutDashboard, category: 'Overview' },
  { href: '/roadmap', label: 'Learning Roadmap', icon: GitBranch, category: 'Curriculum' },
  { href: '/modules', label: 'All Modules', icon: BookOpenCheck, category: 'Curriculum' },
  { href: '/lessons/les-1-1', label: 'Interactive Lessons', icon: GraduationCap, category: 'Curriculum' },
  { href: '/coding-lab', label: 'Python Coding Lab', icon: Terminal, category: 'Labs & Tools' },
  { href: '/playground', label: 'ML Playground', icon: Cpu, category: 'Labs & Tools' },
  { href: '/dataviz-lab', label: 'Data Visualization Lab', icon: BarChart3, category: 'Labs & Tools' },
  { href: '/algorithm-explorer', label: 'Algorithm Explorer', icon: Binary, category: 'Labs & Tools' },
  { href: '/quizzes', label: 'Quizzes & Assessments', icon: CheckCircle2, category: 'Practice' },
  { href: '/projects', label: 'Guided Projects', icon: FolderGit2, category: 'Practice' },
  { href: '/notes', label: 'Notes & Bookmarks', icon: BookmarkCheck, category: 'Personal' },
  { href: '/achievements', label: 'Achievements & Badges', icon: Trophy, category: 'Personal' },
  { href: '/profile', label: 'Profile & Settings', icon: UserCog, category: 'Personal' },
];

export default function Sidebar() {
  const pathname = usePathname();
  const { state } = useStudent();

  const categories = ['Overview', 'Curriculum', 'Labs & Tools', 'Practice', 'Personal'];

  return (
    <aside className="hidden lg:flex flex-col w-64 border-r border-[#303030] bg-[#000000] h-[calc(100vh-4rem)] sticky top-16 shrink-0 overflow-y-auto">
      {/* Student Mini Profile Status */}
      <div className="p-4 mx-3 my-3 rounded-2xl bg-[#0A0A0A] border border-[#303030]">
        <div className="flex items-center justify-between mb-2">
          <span className="text-[11px] font-semibold tracking-wider text-[#D0D0D0] uppercase">
            Active Student
          </span>
          <span className="flex h-2 w-2 rounded-full bg-white animate-pulse" />
        </div>
        <div className="text-sm font-bold text-white">
          Level 1 Scholar
        </div>
        <div className="mt-2 text-xs text-[#999999]">
          <span>{state.completedLessons.length} lessons mastered</span>
        </div>
      </div>

      {/* Navigation Groupings */}
      <nav className="flex-1 px-3 py-2 space-y-5">
        {categories.map((cat) => {
          const items = SIDEBAR_ITEMS.filter((i) => i.category === cat);
          return (
            <div key={cat} className="space-y-1">
              <div className="px-3 text-[10px] font-bold tracking-wider text-[#666666] uppercase">
                {cat}
              </div>
              {items.map((item) => {
                const Icon = item.icon;
                const isActive = pathname === item.href || (item.href !== '/' && pathname.startsWith(item.href));
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-semibold transition-all ${
                      isActive
                        ? 'bg-[#181818] text-white border border-[#444444] font-bold shadow-sm'
                        : 'text-[#999999] hover:text-white hover:bg-[#111111]'
                    }`}
                  >
                    <Icon className={`h-4 w-4 ${isActive ? 'text-white' : 'text-[#666666]'}`} />
                    <span>{item.label}</span>
                  </Link>
                );
              })}
            </div>
          );
        })}
      </nav>
    </aside>
  );
}
