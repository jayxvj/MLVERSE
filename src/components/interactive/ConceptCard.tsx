import React from 'react';
import { LucideIcon, Lightbulb, CheckCircle2 } from 'lucide-react';

interface ConceptCardProps {
  title: string;
  summary: string;
  icon?: LucideIcon;
  badge?: string;
  points?: string[];
  variant?: 'cyan' | 'violet' | 'blue' | 'emerald';
  children?: React.ReactNode;
}

export default function ConceptCard({
  title,
  summary,
  icon: Icon = Lightbulb,
  badge,
  points,
  children,
}: ConceptCardProps) {
  return (
    <div className="relative rounded-3xl p-6 bg-[#111111] border border-[#303030] shadow-md transition-all duration-200">
      <div className="flex items-start justify-between gap-3 mb-3.5">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-2xl border border-[#303030] bg-[#181818] text-white shadow-sm">
            <Icon className="h-5 w-5" />
          </div>
          <h3 className="font-bold text-white text-base tracking-tight">{title}</h3>
        </div>
        {badge && (
          <span className="text-[11px] font-mono px-2.5 py-0.5 rounded-full bg-[#181818] border border-[#303030] text-[#D0D0D0]">
            {badge}
          </span>
        )}
      </div>

      <p className="text-xs sm:text-sm text-[#D0D0D0] leading-relaxed mb-4">{summary}</p>

      {points && points.length > 0 && (
        <ul className="space-y-2 mb-3">
          {points.map((pt, i) => (
            <li key={i} className="flex items-start gap-2.5 text-xs text-[#D0D0D0]">
              <CheckCircle2 className="h-4 w-4 text-white shrink-0 mt-0.5" />
              <span className="leading-normal">{pt}</span>
            </li>
          ))}
        </ul>
      )}

      {children}
    </div>
  );
}
