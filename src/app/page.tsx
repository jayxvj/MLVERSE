'use client';

import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { 
  ArrowRight, 
  Sparkles, 
  Terminal, 
  Cpu, 
  BookOpen,
  Code,
  Brain,
  TrendingUp,
} from 'lucide-react';
import NeuralNetworkHero3D from '@/components/3d/NeuralNetworkHero3D';
import ModuleCard from '@/components/interactive/ModuleCard';
import { MODULES_DATA } from '@/lib/modulesData';
import { useStudent } from '@/lib/store';
import Footer from '@/components/layout/Footer';

export default function HomePage() {
  const router = useRouter();
  const { state, openAuthModal } = useStudent();
  const featuredModules = MODULES_DATA.slice(0, 3);

  const handleProtectedAction = (href: string) => {
    if (!state.user) {
      openAuthModal('login');
    } else {
      router.push(href);
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-black text-white relative overflow-hidden">
      
      {/* Hero Section */}
      <section className="relative pt-12 sm:pt-20 pb-20 px-4 sm:px-6 lg:px-8 border-b border-[#303030]">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10">
          
          {/* Hero Left Content */}
          <motion.div 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
            className="lg:col-span-7 space-y-6"
          >
            {/* Monochromatic Pill Tag */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#111111] border border-[#303030] text-xs font-mono text-[#D0D0D0] shadow-sm">
              <Sparkles className="h-3.5 w-3.5 text-white" />
              <span>Interactive Machine Learning Platform</span>
              <span className="w-1.5 h-1.5 rounded-full bg-white" />
              <span className="text-[#999999]">10 Modules</span>
            </div>

            {/* Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-white leading-[1.12]">
              Master Machine Learning <br />
              <span className="text-[#D0D0D0]">
                From Zero to Real Projects.
              </span>
            </h1>

            {/* Description */}
            <p className="text-base sm:text-lg text-[#D0D0D0] max-w-2xl leading-relaxed">
              Understand intelligence through real-time 3D visualizations, interactive calculus simulators, formula breakdowns, and live Python sandboxes.
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <button
                onClick={() => handleProtectedAction('/lessons/les-1-1')}
                className="flex items-center gap-2 px-6 py-3.5 rounded-xl text-sm font-bold bg-white text-black hover:bg-[#E5E5E5] transition-all hover:scale-[1.02] active:scale-[0.98] shadow-md"
              >
                <span>Start Learning Free</span>
                <ArrowRight className="h-4 w-4" />
              </button>

              <button
                onClick={() => handleProtectedAction('/modules')}
                className="flex items-center gap-2 px-6 py-3.5 rounded-xl text-sm font-semibold bg-[#111111] hover:bg-[#181818] text-white border border-[#303030] hover:border-[#444444] transition-all"
              >
                <BookOpen className="h-4 w-4 text-[#D0D0D0]" />
                <span>Explore Modules</span>
              </button>

              <button
                onClick={() => handleProtectedAction('/playground')}
                className="flex items-center gap-2 px-5 py-3.5 rounded-xl text-sm font-mono text-[#D0D0D0] hover:text-white hover:bg-[#111111] transition rounded-xl border border-transparent hover:border-[#303030]"
              >
                <Terminal className="h-4 w-4" />
                <span>Open Playground</span>
              </button>
            </div>

            {/* Metric Highlights */}
            <div className="pt-6 grid grid-cols-3 gap-4 border-t border-[#303030] text-[#D0D0D0]">
              <div className="p-4 rounded-2xl bg-[#0A0A0A] border border-[#303030]">
                <div className="text-2xl font-bold text-white">10</div>
                <div className="text-xs text-[#999999] font-mono mt-0.5">Deep Modules</div>
              </div>
              <div className="p-4 rounded-2xl bg-[#0A0A0A] border border-[#303030]">
                <div className="text-2xl font-bold text-white">180+</div>
                <div className="text-xs text-[#999999] font-mono mt-0.5">Interactive Lessons</div>
              </div>
              <div className="p-4 rounded-2xl bg-[#0A0A0A] border border-[#303030]">
                <div className="text-2xl font-bold text-white">5</div>
                <div className="text-xs text-[#999999] font-mono mt-0.5">Capstone Projects</div>
              </div>
            </div>
          </motion.div>

          {/* Hero Right 3D Visualizer */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.1, ease: 'easeOut' }}
            className="lg:col-span-5 relative"
          >
            <NeuralNetworkHero3D />
          </motion.div>
        </div>
      </section>

      {/* Value Pillars */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#111111] border border-[#303030] text-xs font-mono text-[#D0D0D0]">
            <Cpu className="w-3.5 h-3.5 text-white" />
            <span>LEARNING ADVANTAGE</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Designed for Real Machine Learning Fluency
          </h2>
          <p className="text-[#999999] text-sm sm:text-base leading-relaxed">
            Bridge mathematics and production code with interactive calculators, Scikit-learn sandboxes, and visual decision boundaries.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-7 rounded-3xl bg-[#0A0A0A] border border-[#303030] hover-float relative overflow-hidden group">
            <div className="w-12 h-12 rounded-2xl bg-[#111111] border border-[#303030] flex items-center justify-center text-white mb-5 shadow-sm">
              <Brain className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-white mb-2">Visual First Principles</h3>
            <p className="text-xs sm:text-sm text-[#D0D0D0] leading-relaxed">
              Interact with loss surfaces, confusion matrices, and decision trees dynamically to see mathematical changes in real time.
            </p>
          </div>

          <div className="p-7 rounded-3xl bg-[#0A0A0A] border border-[#303030] hover-float relative overflow-hidden group">
            <div className="w-12 h-12 rounded-2xl bg-[#111111] border border-[#303030] flex items-center justify-center text-white mb-5 shadow-sm">
              <Code className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-white mb-2">Practical Python Code</h3>
            <p className="text-xs sm:text-sm text-[#D0D0D0] leading-relaxed">
              Every lesson features clean Python snippets using NumPy, Pandas, and Scikit-learn with verified educational outputs.
            </p>
          </div>

          <div className="p-7 rounded-3xl bg-[#0A0A0A] border border-[#303030] hover-float relative overflow-hidden group">
            <div className="w-12 h-12 rounded-2xl bg-[#111111] border border-[#303030] flex items-center justify-center text-white mb-5 shadow-sm">
              <TrendingUp className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-white mb-2">Industrial Project Lab</h3>
            <p className="text-xs sm:text-sm text-[#D0D0D0] leading-relaxed">
              Execute complete ML capstones: House Valuation, Spam NLP, Customer K-Means, Iris KNN, and Credit Card Fraud Detection.
            </p>
          </div>
        </div>
      </section>

      {/* Featured Curriculum */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full border-t border-[#303030]">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-10 gap-4">
          <div>
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">Featured Curriculum</h2>
            <p className="text-[#999999] text-xs sm:text-sm mt-1">Foundational machine learning curriculum tracks.</p>
          </div>
          <button 
            onClick={() => handleProtectedAction('/modules')}
            className="flex items-center gap-1.5 text-xs font-semibold text-white hover:text-[#D0D0D0] transition"
          >
            <span>View All 10 Modules</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {featuredModules.map((mod) => (
            <ModuleCard key={mod.id} module={mod} />
          ))}
        </div>
      </section>

      <Footer />
    </div>
  );
}
