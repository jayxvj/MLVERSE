'use client';

import React, { useState, useMemo } from 'react';
import { Mail, ShieldAlert, ShieldCheck, Sparkles, Sliders } from 'lucide-react';

interface SpamRuleToken {
  word: string;
  weight: number; // positive = spammy, negative = legit
}

const VOCAB_WEIGHTS: Record<string, number> = {
  free: 2.8,
  winner: 3.5,
  claim: 2.9,
  urgent: 2.5,
  wire: 3.2,
  lottery: 3.8,
  crypto: 2.6,
  bitcoin: 2.7,
  prize: 3.1,
  cash: 2.4,
  bonus: 2.5,
  click: 1.8,
  link: 1.6,
  password: 2.9,
  verify: 2.1,
  account: 1.5,
  meeting: -2.0,
  lunch: -2.5,
  project: -2.2,
  coffee: -2.8,
  mom: -3.5,
  tomorrow: -1.8,
  thanks: -2.0,
  homework: -2.7,
  lecture: -2.4,
};

const PRESET_MESSAGES = [
  { label: 'Phishing Scammer', text: 'URGENT: Claim your free prize cash bonus! Click link to wire funds now!' },
  { label: 'Friend Hangout', text: 'Hey, are you free for coffee tomorrow afternoon before our project meeting?' },
  { label: 'Ambiguous Offer', text: 'Free webinar link: Learn how crypto and modern tech accounts operate.' },
];

export default function SpamDetectionSimulator() {
  const [message, setMessage] = useState<string>(PRESET_MESSAGES[0].text);
  const [threshold, setThreshold] = useState<number>(0.5);

  // Compute logit and Sigmoid probability
  const { score, probability, tokensFound } = useMemo(() => {
    const words = message.toLowerCase().replace(/[^a-z0-9\s]/g, ' ').split(/\s+/).filter(Boolean);
    let logit = -1.2; // Base prior bias towards non-spam

    const matchedTokens: Array<{ word: string; weight: number }> = [];

    words.forEach((w) => {
      if (VOCAB_WEIGHTS[w] !== undefined) {
        const wt = VOCAB_WEIGHTS[w];
        logit += wt;
        matchedTokens.push({ word: w, weight: wt });
      }
    });

    const prob = 1 / (1 + Math.exp(-logit));
    return {
      score: logit,
      probability: Math.min(1.0, Math.max(0.0, prob)),
      tokensFound: matchedTokens,
    };
  }, [message]);

  const isSpam = probability >= threshold;

  return (
    <div className="rounded-2xl border border-electric-cyan/30 bg-navy-950/85 p-6 backdrop-blur-md shadow-glow">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-white/10 pb-4 mb-5">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono text-cyan-400">
            <Mail className="h-4 w-4" />
            <span>BAYESIAN / LOGISTIC CLASSIFICATION LAB</span>
          </div>
          <h3 className="text-lg font-bold text-white mt-0.5">
            Real-Time Spam vs. Ham Detector
          </h3>
          <p className="text-xs text-slate-300">
            Type or edit any email snippet to see tokens evaluated through learned logistic weights.
          </p>
        </div>

        {/* Classification Result Pill */}
        <div
          className={`px-4 py-2 rounded-xl text-center border font-mono transition-all duration-300 ${
            isSpam
              ? 'bg-rose-950/50 border-rose-500/50 text-rose-300 shadow-[0_0_15px_rgba(244,63,94,0.3)]'
              : 'bg-emerald-950/50 border-emerald-500/50 text-emerald-300 shadow-[0_0_15px_rgba(16,185,129,0.3)]'
          }`}
        >
          <div className="text-[10px] uppercase tracking-wider text-slate-400">Prediction Output</div>
          <div className="text-xl font-black flex items-center justify-center gap-1.5">
            {isSpam ? <ShieldAlert className="h-5 w-5 text-rose-400" /> : <ShieldCheck className="h-5 w-5 text-emerald-400" />}
            <span>{isSpam ? 'SPAM DETECTED' : 'LEGITIMATE (HAM)'}</span>
          </div>
        </div>
      </div>

      {/* Preset Buttons */}
      <div className="flex items-center gap-2 mb-3 overflow-x-auto pb-1">
        <span className="text-xs font-mono text-slate-400">Quick Presets:</span>
        {PRESET_MESSAGES.map((preset, idx) => (
          <button
            key={idx}
            onClick={() => setMessage(preset.text)}
            className="px-2.5 py-1 rounded text-xs font-mono bg-navy-900 border border-white/10 text-slate-300 hover:text-white hover:border-cyan-400/50 transition whitespace-nowrap"
          >
            {preset.label}
          </button>
        ))}
      </div>

      {/* Message Input Box */}
      <div className="mb-5">
        <textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          rows={3}
          placeholder="Type or paste any text message to test classification..."
          className="w-full p-3.5 rounded-xl bg-navy-900/90 border border-white/10 text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:border-cyan-400 font-sans resize-y"
        />
      </div>

      {/* Probability Gauge & Threshold Slider */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-5 p-4 rounded-xl bg-navy-900/60 border border-white/5">
        <div>
          <div className="flex justify-between text-xs font-mono mb-1.5">
            <span className="text-slate-300">Calculated Spam Probability P(Spam|Text):</span>
            <span className={`font-bold ${isSpam ? 'text-rose-400' : 'text-emerald-400'}`}>
              {(probability * 100).toFixed(1)}%
            </span>
          </div>
          <div className="w-full bg-navy-950 h-3 rounded-full overflow-hidden border border-white/10">
            <div
              className={`h-full transition-all duration-300 ${
                isSpam
                  ? 'bg-gradient-to-r from-amber-400 to-rose-500'
                  : 'bg-gradient-to-r from-cyan-400 to-emerald-400'
              }`}
              style={{ width: `${probability * 100}%` }}
            />
          </div>
        </div>

        <div>
          <div className="flex justify-between text-xs font-mono mb-1">
            <span className="text-slate-300">Decision Cutoff Threshold:</span>
            <span className="text-cyan-400 font-bold">{threshold.toFixed(2)}</span>
          </div>
          <input
            type="range"
            min="0.1"
            max="0.9"
            step="0.05"
            value={threshold}
            onChange={(e) => setThreshold(parseFloat(e.target.value))}
            className="w-full accent-cyan-400 cursor-pointer"
          />
          <div className="flex justify-between text-[10px] text-slate-500 font-mono mt-0.5">
            <span>Aggressive (0.10)</span>
            <span>Balanced (0.50)</span>
            <span>Conservative (0.90)</span>
          </div>
        </div>
      </div>

      {/* Identified Token Weights */}
      <div className="rounded-xl bg-navy-900/80 border border-white/10 p-4">
        <div className="text-xs font-mono text-cyan-400 font-bold mb-2">
          Recognized Feature Tokens & Weight Signatures:
        </div>

        {tokensFound.length > 0 ? (
          <div className="flex flex-wrap gap-2">
            {tokensFound.map((item, idx) => {
              const isSpammy = item.weight > 0;
              return (
                <div
                  key={idx}
                  className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-mono border ${
                    isSpammy
                      ? 'bg-rose-950/40 border-rose-500/40 text-rose-300'
                      : 'bg-emerald-950/40 border-emerald-500/40 text-emerald-300'
                  }`}
                >
                  <span className="font-bold">{item.word}</span>
                  <span className="text-[10px] opacity-80">({isSpammy ? `+${item.weight}` : item.weight})</span>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="text-xs text-slate-500 font-mono italic">
            No known signature tokens found. Defaulting to prior baseline probability.
          </div>
        )}
      </div>
    </div>
  );
}

