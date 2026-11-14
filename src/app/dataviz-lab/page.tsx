'use client';

import React, { useState, useMemo } from 'react';
import Sidebar from '@/components/layout/Sidebar';
import DataTable from '@/components/interactive/DataTable';
import InteractiveChart from '@/components/interactive/InteractiveChart';
import { BarChart3, Sparkles, Filter, Activity, TrendingUp, Layers } from 'lucide-react';

const IRIS_DATA = [
  // Setosa (Linear separable cluster)
  { id: 1, sepalLength: 5.1, sepalWidth: 3.5, petalLength: 1.4, petalWidth: 0.2, species: 'setosa' },
  { id: 2, sepalLength: 4.9, sepalWidth: 3.0, petalLength: 1.4, petalWidth: 0.2, species: 'setosa' },
  { id: 3, sepalLength: 4.7, sepalWidth: 3.2, petalLength: 1.3, petalWidth: 0.2, species: 'setosa' },
  { id: 4, sepalLength: 4.6, sepalWidth: 3.1, petalLength: 1.5, petalWidth: 0.2, species: 'setosa' },
  { id: 5, sepalLength: 5.0, sepalWidth: 3.6, petalLength: 1.4, petalWidth: 0.2, species: 'setosa' },
  { id: 6, sepalLength: 5.4, sepalWidth: 3.9, petalLength: 1.7, petalWidth: 0.4, species: 'setosa' },
  { id: 7, sepalLength: 4.6, sepalWidth: 3.4, petalLength: 1.4, petalWidth: 0.3, species: 'setosa' },
  { id: 8, sepalLength: 5.0, sepalWidth: 3.4, petalLength: 1.5, petalWidth: 0.2, species: 'setosa' },
  { id: 9, sepalLength: 4.4, sepalWidth: 2.9, petalLength: 1.4, petalWidth: 0.2, species: 'setosa' },
  { id: 10, sepalLength: 4.9, sepalWidth: 3.1, petalLength: 1.5, petalWidth: 0.1, species: 'setosa' },

  // Versicolor (Intermediate cluster)
  { id: 11, sepalLength: 7.0, sepalWidth: 3.2, petalLength: 4.7, petalWidth: 1.4, species: 'versicolor' },
  { id: 12, sepalLength: 6.4, sepalWidth: 3.2, petalLength: 4.5, petalWidth: 1.5, species: 'versicolor' },
  { id: 13, sepalLength: 6.9, sepalWidth: 3.1, petalLength: 4.9, petalWidth: 1.5, species: 'versicolor' },
  { id: 14, sepalLength: 5.5, sepalWidth: 2.3, petalLength: 4.0, petalWidth: 1.3, species: 'versicolor' },
  { id: 15, sepalLength: 6.5, sepalWidth: 2.8, petalLength: 4.6, petalWidth: 1.5, species: 'versicolor' },
  { id: 16, sepalLength: 5.7, sepalWidth: 2.8, petalLength: 4.5, petalWidth: 1.3, species: 'versicolor' },
  { id: 17, sepalLength: 6.3, sepalWidth: 3.3, petalLength: 4.7, petalWidth: 1.6, species: 'versicolor' },
  { id: 18, sepalLength: 4.9, sepalWidth: 2.4, petalLength: 3.3, petalWidth: 1.0, species: 'versicolor' },
  { id: 19, sepalLength: 6.6, sepalWidth: 2.9, petalLength: 4.6, petalWidth: 1.3, species: 'versicolor' },
  { id: 20, sepalLength: 5.2, sepalWidth: 2.7, petalLength: 3.9, petalWidth: 1.4, species: 'versicolor' },

  // Virginica (High magnitude cluster)
  { id: 21, sepalLength: 6.3, sepalWidth: 3.3, petalLength: 6.0, petalWidth: 2.5, species: 'virginica' },
  { id: 22, sepalLength: 5.8, sepalWidth: 2.7, petalLength: 5.1, petalWidth: 1.9, species: 'virginica' },
  { id: 23, sepalLength: 7.1, sepalWidth: 3.0, petalLength: 5.9, petalWidth: 2.1, species: 'virginica' },
  { id: 24, sepalLength: 6.3, sepalWidth: 2.9, petalLength: 5.6, petalWidth: 1.8, species: 'virginica' },
  { id: 25, sepalLength: 6.5, sepalWidth: 3.0, petalLength: 5.8, petalWidth: 2.2, species: 'virginica' },
  { id: 26, sepalLength: 7.6, sepalWidth: 3.0, petalLength: 6.6, petalWidth: 2.1, species: 'virginica' },
  { id: 27, sepalLength: 4.9, sepalWidth: 2.5, petalLength: 4.5, petalWidth: 1.7, species: 'virginica' },
  { id: 28, sepalLength: 7.3, sepalWidth: 2.9, petalLength: 6.3, petalWidth: 1.8, species: 'virginica' },
  { id: 29, sepalLength: 6.7, sepalWidth: 2.5, petalLength: 5.8, petalWidth: 1.8, species: 'virginica' },
  { id: 30, sepalLength: 7.2, sepalWidth: 3.6, petalLength: 6.1, petalWidth: 2.5, species: 'virginica' },
];

type FeatureKey = 'sepalLength' | 'sepalWidth' | 'petalLength' | 'petalWidth';

export default function DataVizLabPage() {
  const [selectedX, setSelectedX] = useState<FeatureKey>('petalLength');
  const [selectedY, setSelectedY] = useState<FeatureKey>('petalWidth');
  const [speciesFilter, setSpeciesFilter] = useState<'all' | 'setosa' | 'versicolor' | 'virginica'>('all');
  const [chartType, setChartType] = useState<'scatter' | 'bar'>('scatter');

  const filteredData = useMemo(() => {
    if (speciesFilter === 'all') return IRIS_DATA;
    return IRIS_DATA.filter((r) => r.species === speciesFilter);
  }, [speciesFilter]);

  const chartSeriesData = useMemo(() => {
    return filteredData.map((row) => ({
      x: row[selectedX],
      y: row[selectedY],
      species: row.species,
      sampleLabel: `#${row.id} ${row.species}`,
    }));
  }, [filteredData, selectedX, selectedY]);

  // Compute live correlation & stats
  const stats = useMemo(() => {
    const xs = filteredData.map((r) => r[selectedX]);
    const ys = filteredData.map((r) => r[selectedY]);
    const n = xs.length;
    if (n === 0) return { meanX: 0, meanY: 0, correlation: 0 };

    const meanX = xs.reduce((a, b) => a + b, 0) / n;
    const meanY = ys.reduce((a, b) => a + b, 0) / n;

    let num = 0;
    let denX = 0;
    let denY = 0;
    for (let i = 0; i < n; i++) {
      const dx = xs[i] - meanX;
      const dy = ys[i] - meanY;
      num += dx * dy;
      denX += dx * dx;
      denY += dy * dy;
    }
    const den = Math.sqrt(denX * denY);
    const correlation = den === 0 ? 0 : num / den;

    return {
      meanX: Number(meanX.toFixed(2)),
      meanY: Number(meanY.toFixed(2)),
      correlation: Number(correlation.toFixed(3)),
    };
  }, [filteredData, selectedX, selectedY]);

  const featureLabels: Record<FeatureKey, string> = {
    petalLength: 'Petal Length (cm)',
    petalWidth: 'Petal Width (cm)',
    sepalLength: 'Sepal Length (cm)',
    sepalWidth: 'Sepal Width (cm)',
  };

  return (
    <div className="flex bg-black text-white min-h-screen">
      <Sidebar />

      <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-6xl mx-auto space-y-6 overflow-y-auto">
        <div className="border-b border-[#303030] pb-4">
          <div className="flex items-center gap-2 text-xs font-mono text-[#00f0ff] mb-1">
            <BarChart3 className="h-4 w-4" />
            <span>EXPLORATORY DATA ANALYSIS (EDA) LAB</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-white">
            Data Visualization Lab
          </h1>
          <p className="text-xs sm:text-sm text-[#999999] mt-1 max-w-2xl">
            Inspect real machine learning benchmark datasets. Analyze multi-feature correlations, class boundaries, distributions, and spatial separability in real-time.
          </p>
        </div>

        {/* Statistical Summary KPI Strip */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          <div className="p-4 rounded-xl bg-[#111111] border border-[#303030]">
            <div className="text-[11px] font-mono text-[#999999]">SAMPLES LOADED</div>
            <div className="text-xl font-black text-white mt-1">{filteredData.length}</div>
            <div className="text-[10px] text-[#666666] mt-0.5">Fisher&apos;s Iris Benchmark</div>
          </div>

          <div className="p-4 rounded-xl bg-[#111111] border border-[#303030]">
            <div className="text-[11px] font-mono text-[#999999]">PEARSON CORRELATION (r)</div>
            <div className="text-xl font-black text-[#00f0ff] mt-1">{stats.correlation}</div>
            <div className="text-[10px] text-[#666666] mt-0.5">
              {Math.abs(stats.correlation) > 0.7
                ? 'Strong Linear Relationship'
                : Math.abs(stats.correlation) > 0.4
                ? 'Moderate Correlation'
                : 'Weak / Non-linear'}
            </div>
          </div>

          <div className="p-4 rounded-xl bg-[#111111] border border-[#303030]">
            <div className="text-[11px] font-mono text-[#999999]">MEAN {featureLabels[selectedX].split(' ')[0].toUpperCase()}</div>
            <div className="text-xl font-black text-white mt-1">{stats.meanX} cm</div>
            <div className="text-[10px] text-[#666666] mt-0.5">X-Axis Center of Mass</div>
          </div>

          <div className="p-4 rounded-xl bg-[#111111] border border-[#303030]">
            <div className="text-[11px] font-mono text-[#999999]">MEAN {featureLabels[selectedY].split(' ')[0].toUpperCase()}</div>
            <div className="text-xl font-black text-white mt-1">{stats.meanY} cm</div>
            <div className="text-[10px] text-[#666666] mt-0.5">Y-Axis Center of Mass</div>
          </div>
        </div>

        {/* Feature Correlation Explorer Card */}
        <div className="rounded-xl border border-[#303030] bg-[#111111] p-5 space-y-4">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 border-b border-[#303030] pb-4">
            <div>
              <h3 className="text-sm font-bold text-white flex items-center gap-2">
                <Activity className="w-4 h-4 text-[#00f0ff]" />
                <span>Feature Correlation & Distribution Explorer</span>
              </h3>
              <p className="text-xs text-[#999999] mt-0.5">
                Plotting {featureLabels[selectedX]} vs {featureLabels[selectedY]}
              </p>
            </div>

            {/* Controls */}
            <div className="flex flex-wrap items-center gap-3 text-xs font-mono">
              <div className="flex items-center gap-1.5 bg-[#181818] p-1 rounded-lg border border-[#303030]">
                <span className="text-[#999999] pl-1.5">Chart:</span>
                <button
                  onClick={() => setChartType('scatter')}
                  className={`px-2.5 py-1 rounded text-xs transition ${
                    chartType === 'scatter' ? 'bg-white text-black font-bold' : 'text-[#999999] hover:text-white'
                  }`}
                >
                  Scatter
                </button>
                <button
                  onClick={() => setChartType('bar')}
                  className={`px-2.5 py-1 rounded text-xs transition ${
                    chartType === 'bar' ? 'bg-white text-black font-bold' : 'text-[#999999] hover:text-white'
                  }`}
                >
                  Bar
                </button>
              </div>

              <div className="flex items-center gap-1.5 bg-[#181818] p-1 rounded-lg border border-[#303030]">
                <Filter className="w-3.5 h-3.5 text-[#999999] ml-1" />
                <select
                  value={speciesFilter}
                  onChange={(e) => setSpeciesFilter(e.target.value as any)}
                  className="bg-transparent text-white px-2 py-1 rounded focus:outline-none cursor-pointer"
                >
                  <option value="all" className="bg-[#181818]">All Classes (30)</option>
                  <option value="setosa" className="bg-[#181818]">Setosa only</option>
                  <option value="versicolor" className="bg-[#181818]">Versicolor only</option>
                  <option value="virginica" className="bg-[#181818]">Virginica only</option>
                </select>
              </div>

              <div className="flex items-center gap-2">
                <span className="text-[#999999]">X:</span>
                <select
                  value={selectedX}
                  onChange={(e) => setSelectedX(e.target.value as any)}
                  className="bg-[#181818] border border-[#303030] text-[#00f0ff] px-2.5 py-1 rounded-lg focus:outline-none cursor-pointer"
                >
                  <option value="petalLength">Petal Length</option>
                  <option value="petalWidth">Petal Width</option>
                  <option value="sepalLength">Sepal Length</option>
                  <option value="sepalWidth">Sepal Width</option>
                </select>

                <span className="text-[#999999] ml-1">Y:</span>
                <select
                  value={selectedY}
                  onChange={(e) => setSelectedY(e.target.value as any)}
                  className="bg-[#181818] border border-[#303030] text-[#a855f7] px-2.5 py-1 rounded-lg focus:outline-none cursor-pointer"
                >
                  <option value="petalWidth">Petal Width</option>
                  <option value="petalLength">Petal Length</option>
                  <option value="sepalWidth">Sepal Width</option>
                  <option value="sepalLength">Sepal Length</option>
                </select>
              </div>
            </div>
          </div>

          <InteractiveChart
            type={chartType}
            title={`${featureLabels[selectedX]} vs ${featureLabels[selectedY]} (r = ${stats.correlation})`}
            data={chartSeriesData}
            xKey="x"
            series={[
              { key: 'y', name: featureLabels[selectedY], color: '#00f0ff' },
            ]}
            height={320}
          />
        </div>

        {/* Interactive Data Table Component */}
        <DataTable
          title="Fisher's Iris Benchmark Dataset"
          subtitle="Botanical petal and sepal measurements in centimeters with taxonomy labels"
          data={filteredData}
          columns={[
            { key: 'id', header: 'Sample #', type: 'number' },
            { key: 'sepalLength', header: 'Sepal Length (cm)', type: 'number' },
            { key: 'sepalWidth', header: 'Sepal Width (cm)', type: 'number' },
            { key: 'petalLength', header: 'Petal Length (cm)', type: 'number' },
            { key: 'petalWidth', header: 'Petal Width (cm)', type: 'number' },
            { key: 'species', header: 'Taxonomy Class', type: 'badge' },
          ]}
        />
      </main>
    </div>
  );
}
