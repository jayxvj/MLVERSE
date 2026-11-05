'use client';

import React, { useState } from 'react';
import Sidebar from '@/components/layout/Sidebar';
import DataTable from '@/components/interactive/DataTable';
import InteractiveChart from '@/components/interactive/InteractiveChart';
import { BarChart3, Database, Sparkles, Filter } from 'lucide-react';

const IRIS_DATA = [
  { id: 1, sepalLength: 5.1, sepalWidth: 3.5, petalLength: 1.4, petalWidth: 0.2, species: 'setosa' },
  { id: 2, sepalLength: 4.9, sepalWidth: 3.0, petalLength: 1.4, petalWidth: 0.2, species: 'setosa' },
  { id: 3, sepalLength: 4.7, sepalWidth: 3.2, petalLength: 1.3, petalWidth: 0.2, species: 'setosa' },
  { id: 4, sepalLength: 4.6, sepalWidth: 3.1, petalLength: 1.5, petalWidth: 0.2, species: 'setosa' },
  { id: 5, sepalLength: 5.0, sepalWidth: 3.6, petalLength: 1.4, petalWidth: 0.2, species: 'setosa' },
  { id: 6, sepalLength: 7.0, sepalWidth: 3.2, petalLength: 4.7, petalWidth: 1.4, species: 'versicolor' },
  { id: 7, sepalLength: 6.4, sepalWidth: 3.2, petalLength: 4.5, petalWidth: 1.5, species: 'versicolor' },
  { id: 8, sepalLength: 6.9, sepalWidth: 3.1, petalLength: 4.9, petalWidth: 1.5, species: 'versicolor' },
  { id: 9, sepalLength: 5.5, sepalWidth: 2.3, petalLength: 4.0, petalWidth: 1.3, species: 'versicolor' },
  { id: 10, sepalLength: 6.3, sepalWidth: 3.3, petalLength: 6.0, petalWidth: 2.5, species: 'virginica' },
  { id: 11, sepalLength: 5.8, sepalWidth: 2.7, petalLength: 5.1, petalWidth: 1.9, species: 'virginica' },
  { id: 12, sepalLength: 7.1, sepalWidth: 3.0, petalLength: 5.9, petalWidth: 2.1, species: 'virginica' },
  { id: 13, sepalLength: 6.3, sepalWidth: 2.9, petalLength: 5.6, petalWidth: 1.8, species: 'virginica' },
  { id: 14, sepalLength: 6.5, sepalWidth: 3.0, petalLength: 5.8, petalWidth: 2.2, species: 'virginica' },
];

export default function DataVizLabPage() {
  const [selectedX, setSelectedX] = useState<'petalLength' | 'sepalLength'>('petalLength');
  const [selectedY, setSelectedY] = useState<'petalWidth' | 'sepalWidth'>('petalWidth');

  const chartSeriesData = IRIS_DATA.map((row) => ({
    x: row[selectedX],
    y: row[selectedY],
    species: row.species,
  }));

  return (
    <div className="flex">
      <Sidebar />

      <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-6xl mx-auto space-y-6 overflow-y-auto">
        <div className="border-b border-white/10 pb-4">
          <div className="flex items-center gap-2 text-xs font-mono text-cyan-400 mb-1">
            <BarChart3 className="h-4 w-4" />
            <span>EXPLORATORY DATA ANALYSIS (EDA)</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-white">
            Data Visualization Lab
          </h1>
          <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-2xl">
            Inspect real machine learning benchmark datasets. Analyze feature correlations, distributions, outliers, and multidimensional separability.
          </p>
        </div>

        {/* Feature Correlation Scatter Explorer */}
        <div className="rounded-xl border border-white/10 bg-navy-950/80 p-5 space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-white/10 pb-3">
            <div>
              <h3 className="text-sm font-semibold text-white">Feature Correlation Matrix Plot</h3>
              <p className="text-xs text-slate-400">Fisher&apos;s Iris Dataset (150 samples)</p>
            </div>

            <div className="flex items-center gap-2 text-xs font-mono">
              <span className="text-slate-400">X-Axis:</span>
              <select
                value={selectedX}
                onChange={(e) => setSelectedX(e.target.value as any)}
                className="bg-navy-900 border border-white/10 text-cyan-300 px-2.5 py-1 rounded-lg focus:outline-none"
              >
                <option value="petalLength">Petal Length</option>
                <option value="sepalLength">Sepal Length</option>
              </select>

              <span className="text-slate-400 ml-2">Y-Axis:</span>
              <select
                value={selectedY}
                onChange={(e) => setSelectedY(e.target.value as any)}
                className="bg-navy-900 border border-white/10 text-purple-300 px-2.5 py-1 rounded-lg focus:outline-none"
              >
                <option value="petalWidth">Petal Width</option>
                <option value="sepalWidth">Sepal Width</option>
              </select>
            </div>
          </div>

          <InteractiveChart
            type="scatter"
            title={`${selectedX} vs ${selectedY} Separability`}
            data={chartSeriesData}
            xKey="x"
            series={[
              { key: 'y', name: `${selectedY} (cm)`, color: '#00f0ff' },
            ]}
            height={300}
          />
        </div>

        {/* Interactive Data Table Component */}
        <DataTable
          title="Iris Benchmark Dataset"
          subtitle="Showing botanical petal and sepal measurements in centimeters"
          data={IRIS_DATA}
          columns={[
            { key: 'id', header: 'ID', type: 'number' },
            { key: 'sepalLength', header: 'Sepal Length (cm)', type: 'number' },
            { key: 'sepalWidth', header: 'Sepal Width (cm)', type: 'number' },
            { key: 'petalLength', header: 'Petal Length (cm)', type: 'number' },
            { key: 'petalWidth', header: 'Petal Width (cm)', type: 'number' },
            { key: 'species', header: 'Class Label', type: 'badge' },
          ]}
        />
      </main>
    </div>
  );
}

