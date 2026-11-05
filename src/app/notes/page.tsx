'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Sidebar from '@/components/layout/Sidebar';
import { useStudent } from '@/lib/store';
import { ALL_LESSONS, getLessonById } from '@/lib/modulesData';
import { Bookmark, FileText, Search, Download, ArrowRight, Trash2 } from 'lucide-react';

export default function NotesPage() {
  const { state, saveNote, toggleBookmark } = useStudent();
  const [search, setSearch] = useState('');
  const [activeTab, setActiveTab] = useState<'notes' | 'bookmarks'>('notes');

  const notesList = Object.entries(state.notes)
    .filter(([_, content]) => content.trim().length > 0)
    .map(([lessonId, content]) => ({
      lesson: getLessonById(lessonId),
      content,
    }))
    .filter(
      (item) =>
        item.lesson?.title.toLowerCase().includes(search.toLowerCase()) ||
        item.content.toLowerCase().includes(search.toLowerCase())
    );

  const bookmarkedList = state.bookmarkedLessons
    .map((id) => getLessonById(id))
    .filter((l): l is NonNullable<typeof l> => Boolean(l))
    .filter((l) => l.title.toLowerCase().includes(search.toLowerCase()));

  const handleExportAll = () => {
    let fullDoc = '# MLVERSE — Personal Study Notes & Synthesis\n\n';
    Object.entries(state.notes).forEach(([id, text]) => {
      const lesson = getLessonById(id);
      fullDoc += `## ${lesson ? lesson.title : id}\n\n${text}\n\n---\n\n`;
    });

    const blob = new Blob([fullDoc], { type: 'text/markdown;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `mlverse-all-study-notes.md`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="flex">
      <Sidebar />

      <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-5xl mx-auto space-y-6 overflow-y-auto">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono text-cyan-400 mb-1">
              <FileText className="h-4 w-4" />
              <span>PERSONAL REVISION VAULT</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-white">
              Notes & Bookmarks
            </h1>
            <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-2xl">
              Quickly retrieve your saved insights, formula reminders, and bookmarked lessons.
            </p>
          </div>

          <button
            onClick={handleExportAll}
            disabled={notesList.length === 0}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold bg-cyan-500/15 text-cyan-300 border border-cyan-500/30 hover:bg-cyan-500/25 disabled:opacity-30 transition"
          >
            <Download className="h-4 w-4" />
            <span>Export All Notes (.md)</span>
          </button>
        </div>

        {/* Search & Tabs */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2 w-full sm:w-auto">
            <button
              onClick={() => setActiveTab('notes')}
              className={`flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs font-mono font-medium transition ${
                activeTab === 'notes'
                  ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-400 shadow-glow font-bold'
                  : 'bg-navy-950 border border-white/10 text-slate-400 hover:text-white'
              }`}
            >
              <FileText className="h-3.5 w-3.5" />
              <span>Notes ({notesList.length})</span>
            </button>

            <button
              onClick={() => setActiveTab('bookmarks')}
              className={`flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs font-mono font-medium transition ${
                activeTab === 'bookmarks'
                  ? 'bg-amber-500/20 text-amber-300 border border-amber-400 shadow-glow font-bold'
                  : 'bg-navy-950 border border-white/10 text-slate-400 hover:text-white'
              }`}
            >
              <Bookmark className="h-3.5 w-3.5" />
              <span>Bookmarks ({bookmarkedList.length})</span>
            </button>
          </div>

          <div className="relative w-full sm:w-64">
            <Search className="h-3.5 w-3.5 text-slate-400 absolute left-3 top-2.5" />
            <input
              type="text"
              placeholder="Search in notes..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-9 pr-3 py-1.5 rounded-lg text-xs bg-navy-950 border border-white/10 text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400"
            />
          </div>
        </div>

        {/* Content View */}
        {activeTab === 'notes' ? (
          notesList.length > 0 ? (
            <div className="space-y-4">
              {notesList.map((item, idx) => (
                <div
                  key={idx}
                  className="rounded-xl border border-white/10 bg-navy-950/80 p-5 space-y-3"
                >
                  <div className="flex items-center justify-between border-b border-white/5 pb-2">
                    <span className="text-xs font-bold text-cyan-300">
                      {item.lesson?.title || 'General Note'}
                    </span>
                    {item.lesson && (
                      <Link
                        href={`/lessons/${item.lesson.id}`}
                        className="text-[11px] font-mono text-cyan-400 hover:text-cyan-300 flex items-center gap-1"
                      >
                        <span>Open Lesson</span>
                        <ArrowRight className="h-3 w-3" />
                      </Link>
                    )}
                  </div>
                  <p className="text-xs text-slate-200 whitespace-pre-wrap leading-relaxed font-mono">
                    {item.content}
                  </p>
                </div>
              ))}
            </div>
          ) : (
            <div className="p-8 text-center text-xs text-slate-400 rounded-xl border border-dashed border-white/10">
              No notes saved yet. Open any lesson and click the &quot;Personal Notes&quot; tab to write and persist insights.
            </div>
          )
        ) : bookmarkedList.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {bookmarkedList.map((lesson) => (
              <div
                key={lesson.id}
                className="rounded-xl border border-amber-500/30 bg-navy-950/80 p-4 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between text-xs font-mono text-amber-400 mb-2">
                    <span className="flex items-center gap-1">
                      <Bookmark className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
                      <span>Bookmarked</span>
                    </span>
                    <button
                      onClick={() => toggleBookmark(lesson.id)}
                      className="text-slate-500 hover:text-rose-400"
                      title="Remove Bookmark"
                    >
                      <Trash2 className="h-3.5 w-3.5" />
                    </button>
                  </div>
                  <h4 className="text-xs font-bold text-white mb-1">{lesson.title}</h4>
                  <p className="text-[11px] text-slate-300 line-clamp-2">{lesson.conceptSummary}</p>
                </div>

                <Link
                  href={`/lessons/${lesson.id}`}
                  className="mt-3 text-xs font-semibold text-cyan-400 hover:text-cyan-300 flex items-center gap-1"
                >
                  <span>Go to Lesson</span>
                  <ArrowRight className="h-3 w-3" />
                </Link>
              </div>
            ))}
          </div>
        ) : (
          <div className="p-8 text-center text-xs text-slate-400 rounded-xl border border-dashed border-white/10">
            No bookmarks saved yet. Click the bookmark icon on any lesson to save it for quick review.
          </div>
        )}
      </main>
    </div>
  );
}

