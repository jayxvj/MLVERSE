'use client';

import React from 'react';
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ScatterChart,
  Scatter,
  BarChart,
  Bar,
} from 'recharts';

interface ChartProps {
  type: 'line' | 'scatter' | 'bar';
  data: any[];
  xKey: string;
  series: Array<{
    key: string;
    name: string;
    color?: string;
  }>;
  title?: string;
  height?: number;
}

export default function InteractiveChart({
  type,
  data,
  xKey,
  series,
  title,
  height = 280,
}: ChartProps) {
  const defaultColors = ['#00f0ff', '#a855f7', '#38bdf8', '#10b981', '#f59e0b'];

  const customTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="rounded-lg bg-navy-900 border border-white/10 p-2.5 shadow-xl font-mono text-xs text-white">
          <div className="text-slate-400 mb-1">{`${xKey}: ${label ?? payload[0].payload[xKey]}`}</div>
          {payload.map((entry: any, i: number) => (
            <div key={i} className="flex items-center gap-2" style={{ color: entry.color }}>
              <span className="h-2 w-2 rounded-full" style={{ background: entry.color }} />
              <span>{entry.name}: {typeof entry.value === 'number' ? entry.value.toFixed(3) : entry.value}</span>
            </div>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <div className="rounded-xl border border-white/10 bg-navy-950/80 p-4 backdrop-blur-md">
      {title && (
        <h4 className="text-sm font-semibold text-white mb-3 font-mono tracking-wide">
          {title}
        </h4>
      )}

      <div style={{ width: '100%', height }}>
        <ResponsiveContainer width="100%" height="100%">
          {type === 'line' ? (
            <LineChart data={data}>
              <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
              <XAxis dataKey={xKey} stroke="#64748b" tick={{ fontSize: 11 }} />
              <YAxis stroke="#64748b" tick={{ fontSize: 11 }} />
              <Tooltip content={customTooltip} />
              <Legend wrapperStyle={{ fontSize: 12, paddingTop: 8 }} />
              {series.map((s, idx) => (
                <Line
                  key={s.key}
                  type="monotone"
                  dataKey={s.key}
                  name={s.name}
                  stroke={s.color || defaultColors[idx % defaultColors.length]}
                  strokeWidth={2.5}
                  dot={{ r: 3 }}
                  activeDot={{ r: 6 }}
                />
              ))}
            </LineChart>
          ) : type === 'scatter' ? (
            <ScatterChart>
              <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
              <XAxis dataKey={xKey} stroke="#64748b" tick={{ fontSize: 11 }} />
              <YAxis stroke="#64748b" tick={{ fontSize: 11 }} />
              <Tooltip content={customTooltip} />
              <Legend wrapperStyle={{ fontSize: 12, paddingTop: 8 }} />
              {series.map((s, idx) => (
                <Scatter
                  key={s.key}
                  name={s.name}
                  data={data}
                  fill={s.color || defaultColors[idx % defaultColors.length]}
                />
              ))}
            </ScatterChart>
          ) : (
            <BarChart data={data}>
              <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
              <XAxis dataKey={xKey} stroke="#64748b" tick={{ fontSize: 11 }} />
              <YAxis stroke="#64748b" tick={{ fontSize: 11 }} />
              <Tooltip content={customTooltip} />
              <Legend wrapperStyle={{ fontSize: 12, paddingTop: 8 }} />
              {series.map((s, idx) => (
                <Bar
                  key={s.key}
                  dataKey={s.key}
                  name={s.name}
                  fill={s.color || defaultColors[idx % defaultColors.length]}
                  radius={[4, 4, 0, 0]}
                />
              ))}
            </BarChart>
          )}
        </ResponsiveContainer>
      </div>
    </div>
  );
}

