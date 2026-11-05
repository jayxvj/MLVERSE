'use client';

import React, { useState, useEffect } from 'react';
import { useStudent } from '@/lib/store';
import { Save, Check, FileText, Download, Trash2 } from 'lucide-react';

interface NotesEditorProps {
  lessonId: string;
  lessonTitle: string;
}

export default function NotesEditor({ lessonId, lessonTitle }: NotesEditorProps) {
  const { state, saveNote } = useStudent();
  const [content, setContent] = useState('');
  const [savedStatus, setSavedStatus] = useState(false);

  useEffect(() => {
    setContent(state.notes[lessonId] || '');
  }, [lessonId, state.notes]);

  const handleSave = () => {
    saveNote(lessonId, content);
    setSavedStatus(true);
    setTimeout(() => setSavedStatus(false), 2000);
  };

  const handleDownload = () => {
    const blob = new Blob([`# Notes: ${lessonTitle}\n\n${content}`], {
      type: 'text/markdown;charset=utf-8',
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `notes-${lessonId}.md`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleClear = () => {
    if (confirm('Clear your notes for this lesson?')) {
      setContent('');
      saveNote(lessonId, '');
    }
  };

  return (
    <div className="rounded-xl border border-white/10 bg-navy-950/80 p-4 backdrop-blur-md">
      <div className="flex items-center justify-between mb-3 border-b border-white/10 pb-2">
        <div className="flex items-center gap-2">
          <FileText className="h-4 w-4 text-cyan-400" />
          <h4 className="text-sm font-semibold text-white">Personal Study Notes</h4>
        </div>

        <div className="flex items-center gap-2">
          {savedStatus && (
            <span className="flex items-center gap-1 text-[11px] font-mono text-emerald-400">
              <Check className="h-3 w-3" />
              <span>Saved</span>
            </span>
          )}

          <button
            onClick={handleDownload}
            disabled={!content}
            className="p-1.5 rounded text-slate-400 hover:text-white disabled:opacity-30"
            title="Download Notes as Markdown"
          >
            <Download className="h-4 w-4" />
          </button>

          <button
            onClick={handleClear}
            disabled={!content}
            className="p-1.5 rounded text-slate-400 hover:text-rose-400 disabled:opacity-30"
            title="Clear Notes"
          >
            <Trash2 className="h-4 w-4" />
          </button>

          <button
            onClick={handleSave}
            className="flex items-center gap-1 px-2.5 py-1 rounded text-xs font-semibold bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 hover:bg-cyan-500/30 transition"
          >
            <Save className="h-3 w-3" />
            <span>Save</span>
          </button>
        </div>
      </div>

      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="Record key observations, mathematical derivations, or doubts here. Notes are automatically linked to this lesson..."
        className="w-full h-36 p-3 rounded-lg bg-navy-900/90 border border-white/10 text-xs text-slate-200 placeholder-slate-500 font-sans focus:outline-none focus:border-cyan-400 resize-y"
      />

      <div className="flex justify-between items-center text-[10px] font-mono text-slate-400 mt-2">
        <span>{content.trim() ? content.trim().split(/\s+/).length : 0} words • {content.length} characters</span>
        <span>Synced with Student Portal</span>
      </div>
    </div>
  );
}

