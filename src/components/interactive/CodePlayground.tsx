'use client';

import React, { useState } from 'react';
import dynamic from 'next/dynamic';
import { Play, RotateCcw, Copy, Check, Terminal, Cpu, Clock, AlertTriangle } from 'lucide-react';
import { executePythonCode, PythonExecutionResult } from '@/lib/pythonRunner';

// Dynamically import Monaco Editor to avoid SSR hydration issues
const Editor = dynamic(() => import('@monaco-editor/react'), {
  ssr: false,
  loading: () => (
    <div className="flex h-64 w-full items-center justify-center bg-navy-950 text-slate-400 font-mono text-xs">
      Loading Monaco Python Editor...
    </div>
  ),
});

interface CodePlaygroundProps {
  initialCode: string;
  expectedOutput?: string;
  title?: string;
  description?: string;
  height?: string;
}

export default function CodePlayground({
  initialCode,
  expectedOutput,
  title = 'Python Executable Environment',
  description,
  height = '280px',
}: CodePlaygroundProps) {
  const [code, setCode] = useState(initialCode);
  const [isRunning, setIsRunning] = useState(false);
  const [result, setResult] = useState<PythonExecutionResult | null>(null);
  const [copied, setCopied] = useState(false);

  const handleRun = async () => {
    setIsRunning(true);
    try {
      const res = await executePythonCode(code, expectedOutput);
      setResult(res);
    } catch (err: any) {
      setResult({
        output: '',
        error: String(err.message || err),
        executionTimeMs: 0,
        engine: 'MLVERSE Safe Sandbox',
      });
    } finally {
      setIsRunning(false);
    }
  };

  const handleReset = () => {
    setCode(initialCode);
    setResult(null);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="rounded-xl border border-white/10 bg-navy-950/80 overflow-hidden backdrop-blur-md">
      {/* Editor Header */}
      <div className="flex flex-wrap items-center justify-between gap-2 px-4 py-2.5 bg-navy-900 border-b border-white/10">
        <div className="flex items-center gap-2">
          <Terminal className="h-4 w-4 text-cyan-400" />
          <span className="text-xs font-mono font-semibold text-white">{title}</span>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleCopy}
            className="flex items-center gap-1 px-2.5 py-1 rounded text-xs font-mono bg-white/5 hover:bg-white/10 text-slate-300 border border-white/5 transition"
            title="Copy Python Code"
          >
            {copied ? <Check className="h-3.5 w-3.5 text-emerald-400" /> : <Copy className="h-3.5 w-3.5" />}
            <span>{copied ? 'Copied' : 'Copy'}</span>
          </button>

          <button
            onClick={handleReset}
            className="flex items-center gap-1 px-2.5 py-1 rounded text-xs font-mono bg-white/5 hover:bg-white/10 text-slate-300 border border-white/5 transition"
            title="Reset to Original"
          >
            <RotateCcw className="h-3.5 w-3.5" />
            <span>Reset</span>
          </button>

          <button
            onClick={handleRun}
            disabled={isRunning}
            className="flex items-center gap-1.5 px-3 py-1 rounded-md text-xs font-mono font-semibold bg-gradient-to-r from-cyan-400 to-blue-500 text-navy-950 hover:brightness-110 shadow-glow disabled:opacity-50 transition"
          >
            <Play className={`h-3.5 w-3.5 ${isRunning ? 'animate-spin' : ''}`} />
            <span>{isRunning ? 'Running...' : 'Run Code'}</span>
          </button>
        </div>
      </div>

      {description && (
        <div className="px-4 py-2 bg-navy-900/40 border-b border-white/5 text-xs text-slate-300">
          {description}
        </div>
      )}

      {/* Monaco Editor Canvas */}
      <div className="w-full bg-[#1e1e1e]">
        <Editor
          height={height}
          defaultLanguage="python"
          value={code}
          onChange={(val) => setCode(val || '')}
          theme="vs-dark"
          options={{
            minimap: { enabled: false },
            fontSize: 13,
            lineNumbers: 'on',
            scrollBeyondLastLine: false,
            wordWrap: 'on',
            automaticLayout: true,
            tabSize: 4,
            folding: true,
          }}
        />
      </div>

      {/* Terminal Output Console */}
      <div className="border-t border-white/10 bg-black/80 p-4">
        <div className="flex items-center justify-between text-[11px] font-mono text-slate-400 mb-2 border-b border-white/5 pb-1">
          <div className="flex items-center gap-1.5">
            <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>OUTPUT CONSOLE</span>
          </div>
          {result && (
            <div className="flex items-center gap-3">
              <span className="flex items-center gap-1 text-cyan-400">
                <Cpu className="h-3 w-3" />
                {result.engine}
              </span>
              <span className="flex items-center gap-1 text-slate-400">
                <Clock className="h-3 w-3" />
                {result.executionTimeMs}ms
              </span>
            </div>
          )}
        </div>

        {result ? (
          <div className="space-y-2">
            {result.error && (
              <div className="p-2 rounded bg-rose-950/40 border border-rose-500/30 text-rose-300 font-mono text-xs flex items-start gap-2">
                <AlertTriangle className="h-4 w-4 shrink-0 mt-0.5" />
                <span>{result.error}</span>
              </div>
            )}
            <pre className="font-mono text-xs text-emerald-300 whitespace-pre-wrap leading-relaxed overflow-x-auto max-h-48">
              {result.output || '(No console output generated)'}
            </pre>
          </div>
        ) : (
          <div className="text-xs font-mono text-slate-400 py-1">
            Click <strong className="text-cyan-300">&quot;Run Code&quot;</strong> above to execute this Python block in the browser sandbox.
          </div>
        )}
      </div>
    </div>
  );
}

