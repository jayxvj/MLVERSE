'use client';

import React, { useState } from 'react';
import { ArrowUpDown, Search, Database } from 'lucide-react';

interface Column<T> {
  key: keyof T;
  header: string;
  type?: 'number' | 'string' | 'badge';
}

interface DataTableProps<T> {
  data: T[];
  columns: Column<T>[];
  title?: string;
  subtitle?: string;
}

export default function DataTable<T extends Record<string, any>>({
  data,
  columns,
  title = 'Dataset Viewer',
  subtitle,
}: DataTableProps<T>) {
  const [search, setSearch] = useState('');
  const [sortKey, setSortKey] = useState<keyof T | null>(null);
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');

  const handleSort = (key: keyof T) => {
    if (sortKey === key) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortKey(key);
      setSortOrder('asc');
    }
  };

  const filtered = data
    .filter((row) => {
      if (!search) return true;
      return Object.values(row).some((val) =>
        String(val).toLowerCase().includes(search.toLowerCase())
      );
    })
    .sort((a, b) => {
      if (!sortKey) return 0;
      const valA = a[sortKey];
      const valB = b[sortKey];
      if (typeof valA === 'number' && typeof valB === 'number') {
        return sortOrder === 'asc' ? valA - valB : valB - valA;
      }
      return sortOrder === 'asc'
        ? String(valA).localeCompare(String(valB))
        : String(valB).localeCompare(String(valA));
    });

  return (
    <div className="rounded-xl border border-white/10 bg-navy-950/80 overflow-hidden backdrop-blur-md">
      {/* Header & Search */}
      <div className="p-4 bg-navy-900 border-b border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <div className="flex items-center gap-2">
            <Database className="h-4 w-4 text-cyan-400" />
            <h4 className="text-sm font-semibold text-white">{title}</h4>
            <span className="text-[11px] font-mono px-2 py-0.5 rounded-full bg-white/10 text-cyan-300">
              {data.length} records
            </span>
          </div>
          {subtitle && <p className="text-xs text-slate-400 mt-0.5">{subtitle}</p>}
        </div>

        <div className="relative">
          <Search className="h-3.5 w-3.5 text-slate-400 absolute left-2.5 top-2.5" />
          <input
            type="text"
            placeholder="Filter rows..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full sm:w-48 pl-8 pr-3 py-1.5 rounded-lg text-xs bg-navy-950 border border-white/10 text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400"
          />
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs border-collapse">
          <thead>
            <tr className="border-b border-white/10 bg-navy-900/50 text-slate-300 font-mono">
              {columns.map((col) => (
                <th
                  key={String(col.key)}
                  onClick={() => handleSort(col.key)}
                  className="px-4 py-3 cursor-pointer hover:text-cyan-400 transition select-none"
                >
                  <div className="flex items-center gap-1">
                    <span>{col.header}</span>
                    <ArrowUpDown className="h-3 w-3 opacity-60" />
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5 font-mono">
            {filtered.map((row, i) => (
              <tr key={i} className="hover:bg-white/5 transition">
                {columns.map((col) => {
                  const val = row[col.key];
                  return (
                    <td key={String(col.key)} className="px-4 py-2.5 text-slate-300 whitespace-nowrap">
                      {col.type === 'badge' ? (
                        <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-cyan-950 border border-cyan-500/40 text-cyan-300">
                          {String(val)}
                        </span>
                      ) : (
                        String(val)
                      )}
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

