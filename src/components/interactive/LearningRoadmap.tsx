'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { LEARNING_TRACKS, MODULES_DATA } from '@/lib/modulesData';
import { useStudent } from '@/lib/store';
import { CheckCircle2, Circle, ArrowRight, Lock, BookOpen, Sparkles, ChevronRight } from 'lucide-react';

export default function LearningRoadmap() {
  const { state } = useStudent();
  const [selectedTrackId, setSelectedTrackId] = useState<string>('all');

  const filteredTracks = selectedTrackId === 'all'
    ? LEARNING_TRACKS
    : LEARNING_TRACKS.filter((t) => t.id === selectedTrackId);

  return (
    <div className="space-y-6">
      {/* Track Filter Buttons */}
      <div className="flex flex-wrap items-center gap-2 pb-2">
        <button
          onClick={() => setSelectedTrackId('all')}
          className={`px-3 py-1.5 rounded-lg text-xs font-mono font-medium transition ${
            selectedTrackId === 'all'
              ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-400 shadow-glow'
              : 'bg-navy-900 border border-white/10 text-slate-400 hover:text-white'
          }`}
        >
          All Tracks ({LEARNING_TRACKS.length})
        </button>

        {LEARNING_TRACKS.map((track) => (
          <button
            key={track.id}
            onClick={() => setSelectedTrackId(track.id)}
            className={`px-3 py-1.5 rounded-lg text-xs font-mono font-medium transition ${
              selectedTrackId === track.id
                ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-400 shadow-glow'
                : 'bg-navy-900 border border-white/10 text-slate-400 hover:text-white'
            }`}
          >
            {track.title}
          </button>
        ))}
      </div>

      {/* Track Trees */}
      <div className="space-y-8">
        {filteredTracks.map((track, trackIdx) => {
          const trackModules = MODULES_DATA.filter((m) => m.trackId === track.id);

          return (
            <div
              key={track.id}
              className="rounded-2xl border border-white/10 bg-navy-950/70 p-6 backdrop-blur-xl"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-6 border-b border-white/10 pb-4">
                <div className="flex items-center gap-3">
                  <div
                    className="flex h-9 w-9 items-center justify-center rounded-xl font-mono font-bold text-xs"
                    style={{ backgroundColor: `${track.color}20`, color: track.color, border: `1px solid ${track.color}50` }}
                  >
                    0{trackIdx + 1}
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-white">{track.title}</h3>
                    <p className="text-xs text-slate-400">{track.description}</p>
                  </div>
                </div>

                <div className="flex items-center gap-2 text-xs font-mono">
                  <span className="px-2.5 py-0.5 rounded bg-white/5 border border-white/10 text-slate-300">
                    {track.level}
                  </span>
                  <span className="text-slate-400">~{track.estimatedWeeks} Weeks</span>
                </div>
              </div>

              {/* Module Cards Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {trackModules.map((module) => {
                  const isCompleted = state.completedModules.includes(module.id);
                  const completedLessonsInModule = module.lessons.filter((l) =>
                    state.completedLessons.includes(l.id)
                  ).length;
                  const isInProgress =
                    completedLessonsInModule > 0 &&
                    completedLessonsInModule < module.lessons.length;

                  return (
                    <div
                      key={module.id}
                      className={`relative rounded-xl p-5 border transition-all duration-300 flex flex-col justify-between ${
                        isCompleted
                          ? 'border-emerald-500/30 bg-emerald-950/15'
                          : isInProgress
                          ? 'border-cyan-400/40 bg-cyan-950/20 shadow-glow'
                          : 'border-white/10 bg-navy-900/50 hover:border-white/20'
                      }`}
                    >
                      <div>
                        <div className="flex items-center justify-between text-xs font-mono mb-2">
                          <span className="text-slate-400">{module.level} • {module.estimatedHours}h</span>
                          {isCompleted ? (
                            <span className="flex items-center gap-1 text-emerald-400 font-semibold">
                              <CheckCircle2 className="h-3.5 w-3.5" />
                              <span>Completed</span>
                            </span>
                          ) : isInProgress ? (
                            <span className="flex items-center gap-1 text-cyan-400 font-semibold">
                              <Sparkles className="h-3.5 w-3.5" />
                              <span>{completedLessonsInModule}/{module.lessons.length} Finished</span>
                            </span>
                          ) : (
                            <span className="text-slate-400">Ready to Start</span>
                          )}
                        </div>

                        <h4 className="text-sm font-bold text-white mb-1.5">{module.title}</h4>
                        <p className="text-xs text-slate-300 leading-relaxed mb-4">
                          {module.shortDescription}
                        </p>

                        {/* Objectives preview */}
                        <div className="space-y-1 mb-4">
                          {module.objectives.slice(0, 2).map((obj, i) => (
                            <div key={i} className="flex items-start gap-1.5 text-[11px] text-slate-400">
                              <ChevronRight className="h-3 w-3 text-cyan-400 shrink-0 mt-0.5" />
                              <span className="line-clamp-1">{obj}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div className="flex items-center justify-between pt-3 border-t border-white/5">
                        <Link
                          href={`/modules/${module.id}`}
                          className="text-xs font-semibold text-cyan-400 hover:text-cyan-300 flex items-center gap-1"
                        >
                          <BookOpen className="h-3.5 w-3.5" />
                          <span>View Syllabus</span>
                        </Link>

                        <Link
                          href={`/lessons/${module.lessons[0]?.id || 'les-1-1'}`}
                          className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 hover:bg-cyan-500/30 flex items-center gap-1 transition"
                        >
                          <span>{isCompleted ? 'Review' : 'Start Lesson'}</span>
                          <ArrowRight className="h-3.5 w-3.5" />
                        </Link>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

