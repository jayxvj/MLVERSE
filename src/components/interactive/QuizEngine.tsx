'use client';

import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { QuizQuestion } from '@/lib/types';
import { CheckCircle2, XCircle, HelpCircle, Award, RotateCcw, ArrowRight, Lightbulb } from 'lucide-react';
import { useStudent } from '@/lib/store';

interface QuizEngineProps {
  quizId: string;
  title?: string;
  questions: QuizQuestion[];
  badgeId?: string;
  onComplete?: (score: number, total: number) => void;
}

export default function QuizEngine({
  quizId,
  title = 'Knowledge Check Assessment',
  questions,
  badgeId,
  onComplete,
}: QuizEngineProps) {
  const { recordQuizScore } = useStudent();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isAnswerSubmitted, setIsAnswerSubmitted] = useState(false);
  const [showHint, setShowHint] = useState(false);
  const [score, setScore] = useState(0);
  const [userAnswers, setUserAnswers] = useState<Record<number, number>>({});
  const [isFinished, setIsFinished] = useState(false);

  const currentQuestion = questions[currentIndex];

  const handleSelect = (idx: number) => {
    if (isAnswerSubmitted) return;
    setSelectedOption(idx);
  };

  const handleSubmit = () => {
    if (selectedOption === null) return;
    setIsAnswerSubmitted(true);
    const isCorrect = selectedOption === currentQuestion.correctIndex;
    if (isCorrect) {
      setScore((s) => s + 1);
    }
    setUserAnswers((prev) => ({ ...prev, [currentIndex]: selectedOption }));
  };

  const handleNext = () => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex((i) => i + 1);
      setSelectedOption(null);
      setIsAnswerSubmitted(false);
      setShowHint(false);
    } else {
      setIsFinished(true);
      const finalScore = score + (selectedOption === currentQuestion.correctIndex ? 1 : 0);
      recordQuizScore(quizId, finalScore, questions.length, badgeId);

      if (finalScore === questions.length) {
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 },
          colors: ['#00f0ff', '#a855f7', '#38bdf8', '#ffffff'],
        });
      }

      if (onComplete) {
        onComplete(finalScore, questions.length);
      }
    }
  };

  const handleRetry = () => {
    setCurrentIndex(0);
    setSelectedOption(null);
    setIsAnswerSubmitted(false);
    setShowHint(false);
    setScore(0);
    setUserAnswers({});
    setIsFinished(false);
  };

  if (isFinished) {
    const percentage = Math.round((score / questions.length) * 100);
    return (
      <div className="rounded-xl border border-electric-cyan/40 bg-navy-950/90 p-6 text-center backdrop-blur-md shadow-glow">
        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-cyan-500/20 text-cyan-400 mb-3 border border-cyan-500/40">
          <Award className="h-8 w-8" />
        </div>
        <h3 className="text-xl font-bold text-white mb-1">Assessment Complete!</h3>
        <p className="text-xs text-slate-300 mb-4">
          You scored <strong className="text-cyan-400">{score}</strong> out of{' '}
          <strong className="text-white">{questions.length}</strong> ({percentage}%)
        </p>

        <div className="w-full bg-navy-900 h-3 rounded-full overflow-hidden border border-white/10 max-w-sm mx-auto mb-6">
          <div
            className={`h-full transition-all duration-700 ${
              percentage >= 80
                ? 'bg-gradient-to-r from-cyan-400 to-emerald-400'
                : 'bg-gradient-to-r from-amber-400 to-cyan-400'
            }`}
            style={{ width: `${percentage}%` }}
          />
        </div>

        <div className="flex items-center justify-center gap-3">
          <button
            onClick={handleRetry}
            className="flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs font-semibold bg-white/10 hover:bg-white/15 text-slate-200 transition"
          >
            <RotateCcw className="h-4 w-4" />
            <span>Retake Quiz</span>
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="rounded-xl border border-white/10 bg-navy-950/80 p-5 backdrop-blur-md">
      {/* Quiz Top bar */}
      <div className="flex items-center justify-between border-b border-white/10 pb-3 mb-4">
        <div>
          <h4 className="text-sm font-semibold text-white">{title}</h4>
          <span className="text-xs text-slate-400 font-mono">
            Question {currentIndex + 1} of {questions.length}
          </span>
        </div>
        {currentQuestion.hint && (
          <button
            onClick={() => setShowHint(!showHint)}
            className="flex items-center gap-1 text-xs text-amber-400 hover:text-amber-300 font-mono px-2.5 py-1 rounded border border-amber-500/20 bg-amber-500/10"
          >
            <Lightbulb className="h-3.5 w-3.5" />
            <span>{showHint ? 'Hide Hint' : 'Show Hint'}</span>
          </button>
        )}
      </div>

      {/* Hint Alert */}
      {showHint && currentQuestion.hint && (
        <div className="p-3 mb-4 rounded-lg bg-amber-950/30 border border-amber-500/30 text-amber-300 text-xs flex items-start gap-2">
          <HelpCircle className="h-4 w-4 shrink-0 mt-0.5" />
          <span>Hint: {currentQuestion.hint}</span>
        </div>
      )}

      {/* Question Text */}
      <div className="text-sm sm:text-base font-medium text-white mb-4 leading-snug">
        {currentQuestion.question}
      </div>

      {/* Options List */}
      <div className="space-y-2.5 mb-5">
        {currentQuestion.options.map((option, idx) => {
          const isSelected = selectedOption === idx;
          const isCorrect = idx === currentQuestion.correctIndex;

          let btnClass = 'border-white/10 bg-navy-900/60 text-slate-300 hover:border-cyan-400/50 hover:bg-white/5';
          if (isSelected) {
            btnClass = 'border-cyan-400 bg-cyan-950/60 text-cyan-200 ring-1 ring-cyan-400';
          }
          if (isAnswerSubmitted) {
            if (isCorrect) {
              btnClass = 'border-emerald-500 bg-emerald-950/60 text-emerald-200 ring-1 ring-emerald-500';
            } else if (isSelected) {
              btnClass = 'border-rose-500 bg-rose-950/60 text-rose-200 ring-1 ring-rose-500';
            } else {
              btnClass = 'border-white/5 bg-navy-950/40 text-slate-400 opacity-60';
            }
          }

          return (
            <button
              key={idx}
              disabled={isAnswerSubmitted}
              onClick={() => handleSelect(idx)}
              className={`w-full p-3.5 rounded-xl border text-left text-xs sm:text-sm font-medium transition-all flex items-start justify-between gap-3 ${btnClass}`}
            >
              <div className="flex items-start gap-3">
                <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded bg-white/10 font-mono text-xs">
                  {String.fromCharCode(65 + idx)}
                </span>
                <span>{option}</span>
              </div>
              {isAnswerSubmitted && isCorrect && (
                <CheckCircle2 className="h-5 w-5 text-emerald-400 shrink-0" />
              )}
              {isAnswerSubmitted && isSelected && !isCorrect && (
                <XCircle className="h-5 w-5 text-rose-400 shrink-0" />
              )}
            </button>
          );
        })}
      </div>

      {/* Explanation Banner */}
      {isAnswerSubmitted && (
        <div className="p-3.5 rounded-lg bg-navy-900/90 border border-white/10 mb-4 animate-fadeIn">
          <div className="text-xs font-mono font-bold text-white mb-1">
            {selectedOption === currentQuestion.correctIndex ? '✓ Correct Answer' : '✗ Solution Explanation'}
          </div>
          <p className="text-xs text-slate-300 leading-relaxed">
            {currentQuestion.explanation}
          </p>
        </div>
      )}

      {/* Action Footer */}
      <div className="flex items-center justify-between pt-3 border-t border-white/10">
        <div className="text-xs text-slate-400 font-mono">
          Score: {score}/{questions.length}
        </div>

        {!isAnswerSubmitted ? (
          <button
            disabled={selectedOption === null}
            onClick={handleSubmit}
            className="px-4 py-2 rounded-lg text-xs font-semibold bg-gradient-to-r from-cyan-400 to-blue-500 text-navy-950 hover:brightness-110 shadow-glow disabled:opacity-40 transition"
          >
            Submit Answer
          </button>
        ) : (
          <button
            onClick={handleNext}
            className="flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs font-semibold bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 hover:bg-cyan-500/30 transition"
          >
            <span>{currentIndex < questions.length - 1 ? 'Next Question' : 'View Results'}</span>
            <ArrowRight className="h-3.5 w-3.5" />
          </button>
        )}
      </div>
    </div>
  );
}

