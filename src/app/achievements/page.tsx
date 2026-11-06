'use client';

import React from 'react';
import Sidebar from '@/components/layout/Sidebar';
import { useStudent } from '@/lib/store';
import { MODULES_DATA } from '@/lib/modulesData';
import { Trophy, Flame, Award, CheckCircle2, Lock, Sparkles } from 'lucide-react';

const ALL_BADGES = [
  {
    id: 'badge-paradigm-shift',
    title: 'ML Pioneer',
    category: 'Foundations',
    description: 'Mastered the core paradigm of Machine Learning and dataset taxonomy.',
    icon: '/trophy/MLPioneer.png',
  },
  {
    id: 'badge-learning-mechanic',
    title: 'Learning Mechanics Master',
    category: 'Foundations',
    description: 'Mastered all 14 lessons on dataset structures, data partitioning, model complexity, and the No Free Lunch Theorem.',
    icon: '/trophy/LMechanics.png',
  },
  {
    id: 'badge-bias-variance-master',
    title: 'Bias-Variance Master',
    category: 'Foundations',
    description: 'Mastered prediction errors, MSE calculations, the Bias-Variance Trade-off, and model generalization.',
    icon: '/trophy/BiasVar.png',
  },
  {
    id: 'badge-data-detective',
    title: 'Data Detective',
    category: 'Foundations',
    description: 'Mastered all 21 lessons on Exploratory Data Analysis, descriptive statistics, outlier detection, and correlation.',
    icon: '/trophy/Data_Detective.png',
  },
  {
    id: 'badge-pipeline-architect',
    title: 'Pipeline Architect',
    category: 'Foundations',
    description: 'Mastered all 19 lessons on Data Preprocessing, feature scaling, categorical encoding, and leak-free Scikit-Learn pipelines.',
    icon: '/trophy/SKLearn.png',
  },
  {
    id: 'badge-visualization-master',
    title: 'Visualization Master',
    category: 'Foundations',
    description: 'Mastered all 19 lessons on Data Visualization, statistical charting architectures, Seaborn, Matplotlib, and ethical visualization design.',
    icon: '/trophy/Data_Visualize.png',
  },
  {
    id: 'badge-workflow-architect',
    title: 'Workflow Architect',
    category: 'Foundations',
    description: 'Mastered all 14 lessons on the end-to-end ML workflow, cross-validation architectures, hyperparameter optimization, and leak-free production pipelines.',
    icon: '/trophy/Workflow.png',
  },
  {
    id: 'badge-taxonomist',
    title: 'Taxonomy Master',
    category: 'Foundations',
    description: 'Categorized supervised, unsupervised, and reinforcement learning tasks.',
    icon: '/trophy/Taxonomy.png',
  },
  {
    id: 'badge-matrix-sage',
    title: 'Vector Virtuoso',
    category: 'Mathematics',
    description: 'Mastered vector spaces, dot product projections, and matrix transformations.',
    icon: '/trophy/MathMastery.png',
  },
  {
    id: 'badge-gradient-climber',
    title: 'Loss Conqueror',
    category: 'Optimization',
    description: 'Mastered calculus, error surfaces, and gradient descent convergence.',
    icon: '/trophy/Loss_Conqueror.png',
  },
  {
    id: 'badge-regression-hero',
    title: 'Regression Ace',
    category: 'Supervised',
    description: 'Mastered linear hypotheses, residuals, and logistic odds models.',
    icon: '/trophy/Regreace.png',
  },
  {
    id: 'badge-forest-ranger',
    title: 'Ensemble Architect',
    category: 'Supervised',
    description: 'Mastered decision trees, pruning, and Random Forest bagging.',
    icon: '/trophy/Ensemble.png',
  },
  {
    id: 'badge-synapse-master',
    title: 'Neural Architect',
    category: 'Deep Learning',
    description: 'Mastered artificial neurons, activation functions, and multi-layer networks.',
    icon: '/trophy/NeuralNetwork.png',
  },
  {
    id: 'badge-algorithm-master',
    title: 'Algorithm Master',
    category: 'Supervised',
    description: 'Mastered all 33 lessons across classification, regression, and KNN in-depth.',
    icon: '/trophy/Algorithm.png',
  },
  {
    id: 'badge-backprop-prophet',
    title: 'Backprop Guru',
    category: 'Deep Learning',
    description: 'Mastered computational graphs, chain rule calculus, and Adam optimizers.',
    icon: '/trophy/Backpropagation.png',
  },
  {
    id: 'badge-project-engineer',
    title: 'Project Engineer',
    category: 'Projects',
    description: 'Completed all 5 end-to-end ML projects spanning regression, classification, clustering, and fraud detection.',
    icon: '/trophy/Master.png',
  },
];

export default function AchievementsPage() {
  const { state } = useStudent();

  return (
    <div className="flex">
      <Sidebar />

      <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-5xl mx-auto space-y-6 overflow-y-auto">
        <div className="border-b border-white/10 pb-4">
          <div className="flex items-center gap-2 text-xs font-mono text-cyan-400 mb-1">
            <Trophy className="h-4 w-4" />
            <span>STUDENT RECOGNITION</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-white">
            Achievements & Academic Badges
          </h1>
          <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-2xl">
            Earn badges as you pass diagnostic module assessments and maintain continuous learning habits.
          </p>
        </div>

        {/* Milestone Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="p-4 rounded-xl bg-navy-950/80 border border-white/10 flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-amber-500/10 text-amber-400 border border-amber-500/30">
              <Flame className="h-6 w-6" />
            </div>
            <div>
              <div className="text-xs font-mono text-slate-400">Current Streak</div>
              <div className="text-xl font-bold text-white">{state.streakDays} Consecutive Days</div>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-navy-950/80 border border-white/10 flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-cyan-500/10 text-cyan-400 border border-cyan-500/30">
              <Award className="h-6 w-6" />
            </div>
            <div>
              <div className="text-xs font-mono text-slate-400">Earned Badges</div>
              <div className="text-xl font-bold text-white">{state.earnedBadges.length} of {ALL_BADGES.length}</div>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-navy-950/80 border border-white/10 flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-purple-500/10 text-purple-400 border border-purple-500/30">
              <CheckCircle2 className="h-6 w-6" />
            </div>
            <div>
              <div className="text-xs font-mono text-slate-400">Lessons Finished</div>
              <div className="text-xl font-bold text-white">{state.completedLessons.length} Modules Active</div>
            </div>
          </div>
        </div>

        {/* Badges Grid */}
        <div className="space-y-3">
          <h3 className="text-sm font-semibold text-white">University Degree Badges</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {ALL_BADGES.map((badge) => {
              const isUnlocked = state.earnedBadges.includes(badge.id);

              return (
                <div
                  key={badge.id}
                  className={`rounded-xl p-5 border text-center transition-all flex flex-col justify-between ${isUnlocked
                    ? 'border-cyan-400/40 bg-gradient-to-b from-cyan-950/30 to-navy-950/90 shadow-glow'
                    : 'border-white/5 bg-navy-950/50 opacity-60'
                    }`}
                >

                  <div>
                    <div className="mb-2 flex justify-center items-center">
                      {badge.icon.startsWith('/') ? (
                        <img
                          src={badge.icon}
                          alt={badge.title}
                          className="w-16 h-16 object-contain"
                        />
                      ) : (
                        <span className="text-3xl">{badge.icon}</span>
                      )}
                    </div>

                    <div className="text-xs font-mono text-cyan-400 mb-1">
                      {badge.category}
                    </div>

                    <h4 className="text-sm font-bold text-white mb-2">
                      {badge.title}
                    </h4>

                    <p className="text-[11px] text-slate-300 leading-relaxed mb-4">
                      {badge.description}
                    </p>
                  </div>

                  <div className="pt-2 border-t border-white/5">
                    {isUnlocked ? (
                      <span className="inline-flex items-center gap-1 text-[11px] font-mono font-bold text-emerald-400">
                        <CheckCircle2 className="h-3.5 w-3.5" />
                        <span>Unlocked</span>
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 text-[11px] font-mono text-slate-500">
                        <Lock className="h-3.5 w-3.5" />
                        <span>Locked • Pass Exam</span>
                      </span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </main>
    </div>
  );
}

