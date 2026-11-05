import React from 'react';
import Link from 'next/link';
import { Cpu, ShieldCheck } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="w-full border-t border-[#303030] bg-[#000000] text-[#999999] py-12 px-4 sm:px-6 lg:px-8 mt-auto">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
        
        {/* Brand */}
        <div className="space-y-3.5 md:col-span-1">
          <div className="flex items-center gap-2.5">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#181818] border border-[#303030] text-white font-bold text-xs shadow-sm">
              <Cpu className="h-4 w-4" />
            </div>
            <span className="text-lg font-bold text-white tracking-tight">MLVERSE</span>
          </div>
          <p className="text-xs text-[#999999] leading-relaxed">
            Interactive, rigorous Machine Learning curriculum engineered for conceptual clarity and direct application.
          </p>
          <div className="flex items-center gap-2 text-[11px] font-medium text-[#D0D0D0]">
            <ShieldCheck className="h-3.5 w-3.5" />
            <span>Open Educational Platform</span>
          </div>
        </div>

        {/* Curriculum Tracks */}
        <div className="space-y-2 text-xs">
          <div className="font-bold text-white uppercase tracking-wider text-[11px] mb-2.5">Curriculum Tracks</div>
          <ul className="space-y-2">
            <li><Link href="/modules" className="hover:text-white transition">Foundations of ML</Link></li>
            <li><Link href="/modules" className="hover:text-white transition">Calculus & Optimization</Link></li>
            <li><Link href="/modules" className="hover:text-white transition">Supervised Learning</Link></li>
            <li><Link href="/modules" className="hover:text-white transition">Neural Networks & Deep Learning</Link></li>
            <li><Link href="/modules" className="hover:text-white transition">Model Validation & Evaluation</Link></li>
          </ul>
        </div>

        {/* Labs & Sandboxes */}
        <div className="space-y-2 text-xs">
          <div className="font-bold text-white uppercase tracking-wider text-[11px] mb-2.5">Interactive Labs</div>
          <ul className="space-y-2">
            <li><Link href="/coding-lab" className="hover:text-white transition">Python & Scikit-learn Sandbox</Link></li>
            <li><Link href="/playground" className="hover:text-white transition">ML Decision Playground</Link></li>
            <li><Link href="/dataviz-lab" className="hover:text-white transition">Data Visualization Lab</Link></li>
            <li><Link href="/algorithm-explorer" className="hover:text-white transition">Algorithm Explorer</Link></li>
            <li><Link href="/quizzes" className="hover:text-white transition">Diagnostic Assessments</Link></li>
          </ul>
        </div>

        {/* Navigation & Student Tools */}
        <div className="space-y-2 text-xs">
          <div className="font-bold text-white uppercase tracking-wider text-[11px] mb-2.5">Student Tools</div>
          <ul className="space-y-2">
            <li><Link href="/dashboard" className="hover:text-white transition">Student Dashboard</Link></li>
            <li><Link href="/roadmap" className="hover:text-white transition">Learning Roadmap</Link></li>
            <li><Link href="/projects" className="hover:text-white transition">Capstone Projects</Link></li>
            <li><Link href="/notes" className="hover:text-white transition">Personal Notes & Saved Items</Link></li>
            <li><Link href="/achievements" className="hover:text-white transition">Achievements & Badges</Link></li>
          </ul>
        </div>

      </div>

      <div className="max-w-7xl mx-auto mt-10 pt-6 border-t border-[#303030] flex flex-col sm:flex-row items-center justify-between text-xs text-[#666666] gap-4">
        <div>© 2026 MLVERSE — Machine Learning Academy. Monochromatic UI. All rights reserved.</div>
        <div className="flex gap-6">
          <Link href="/modules" className="hover:text-white transition">Modules</Link>
          <Link href="/roadmap" className="hover:text-white transition">Roadmap</Link>
          <Link href="/achievements" className="hover:text-white transition">Badges</Link>
        </div>
      </div>
    </footer>
  );
}
