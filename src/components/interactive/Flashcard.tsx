'use client';

import React, { useState } from 'react';
import { RotateCw, CheckCircle, HelpCircle } from 'lucide-react';

interface FlashcardProps {
  term: string;
  definition: string;
  hint?: string;
  example?: string;
}

export default function Flashcard({ term, definition, hint, example }: FlashcardProps) {
  const [isFlipped, setIsFlipped] = useState(false);

  return (
    <div
      onClick={() => setIsFlipped(!isFlipped)}
      className="relative w-full min-h-[200px] cursor-pointer rounded-xl border border-white/10 bg-navy-950/80 p-6 backdrop-blur-md hover:border-cyan-400/50 transition-all duration-300 shadow-glass select-none flex flex-col justify-between"
    >
      <div className="flex items-center justify-between text-xs font-mono text-slate-400 border-b border-white/5 pb-2">
        <span className="text-cyan-400">{isFlipped ? 'ANSWER / CONCEPT' : 'FLASHCARD TERM'}</span>
        <div className="flex items-center gap-1">
          <RotateCw className="h-3.5 w-3.5 text-slate-400" />
          <span>Click to flip</span>
        </div>
      </div>

      <div className="my-auto py-4 text-center">
        {!isFlipped ? (
          <div>
            <div className="text-xl sm:text-2xl font-bold text-white mb-2">{term}</div>
            {hint && <p className="text-xs text-slate-400 italic font-mono">Hint: {hint}</p>}
          </div>
        ) : (
          <div className="animate-fadeIn">
            <p className="text-sm text-slate-200 leading-relaxed font-sans">{definition}</p>
            {example && (
              <div className="mt-3 p-2 rounded bg-black/40 border border-white/5 text-xs font-mono text-cyan-300">
                Example: {example}
              </div>
            )}
          </div>
        )}
      </div>

      <div className="text-[11px] font-mono text-center text-slate-400 pt-2 border-t border-white/5">
        {isFlipped ? 'Tap to flip back' : 'Can you explain this without flipping?'}
      </div>
    </div>
  );
}

