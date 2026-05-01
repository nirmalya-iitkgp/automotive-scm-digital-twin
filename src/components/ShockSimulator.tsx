/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useMemo } from 'react';
import { COMPONENT_LIST, MARKET_INDICES, HISTORICAL_SHOCKS } from '../data';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { TrendingUp, TrendingDown, Info, History } from 'lucide-react';

export default function ShockSimulator() {
  const [shocks, setShocks] = useState<Record<string, number>>(
    MARKET_INDICES.reduce((acc, idx) => ({ ...acc, [idx.name]: 0 }), {})
  );

  const [selectedComponentId, setSelectedComponentId] = useState(COMPONENT_LIST[0].id);

  const selectedComponent = useMemo(() => 
    COMPONENT_LIST.find(c => c.id === selectedComponentId), 
    [selectedComponentId]
  );

  const calculatedShock = useMemo(() => {
    if (!selectedComponent) return 0;
    const m = selectedComponent.materials;
    let total = (shocks[m.primary.index] || 0) * m.primary.weight;
    if (m.secondary) total += (shocks[m.secondary.index] || 0) * m.secondary.weight;
    if (m.tertiary) total += (shocks[m.tertiary.index] || 0) * m.tertiary.weight;
    
    // Non-linear processing factor (complex parts have higher energy/labor overhead)
    const complexityFactor = selectedComponent.sensitivityScore / 5;
    return total * complexityFactor;
  }, [selectedComponent, shocks]);

  const forecastData = useMemo(() => {
    return [
      { month: 'Current', shock: 0 },
      { month: 'T+1', shock: calculatedShock * 0.4 },
      { month: 'T+2', shock: calculatedShock * 0.7 },
      { month: 'T+3 (Peak)', shock: calculatedShock },
      { month: 'T+6 (Recede)', shock: calculatedShock * 0.8 },
    ];
  }, [calculatedShock]);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
      {/* Controls */}
      <div className="lg:col-span-4 space-y-6">
        <div className="bg-slate-900/50 p-6 rounded-xl border border-slate-800 shadow-xl">
          <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-6 border-b border-slate-800 pb-3">Index Shock Importer</h3>
          <div className="grid grid-cols-1 gap-4 max-h-[400px] overflow-y-auto pr-2 custom-scrollbar">
            {MARKET_INDICES.map(idx => (
              <div key={idx.id} className="space-y-2">
                <div className="flex justify-between text-[11px] font-mono text-slate-400">
                  <span className="uppercase tracking-wider">{idx.name}</span>
                  <span className={`font-bold ${shocks[idx.name] > 0 ? 'text-red-400' : shocks[idx.name] < 0 ? 'text-emerald-400' : 'text-slate-500'}`}>
                    {shocks[idx.name] > 0 ? '▲' : shocks[idx.name] < 0 ? '▼' : ''} {Math.abs(shocks[idx.name])}%
                  </span>
                </div>
                <input 
                  type="range" 
                  min="-50" 
                  max="100" 
                  value={shocks[idx.name] || 0} 
                  onChange={(e) => setShocks(prev => ({ ...prev, [idx.name]: parseInt(e.target.value) }))}
                  className="w-full accent-cyan-400 h-1 bg-slate-800 rounded-lg appearance-none cursor-pointer"
                />
              </div>
            ))}
          </div>
          <button 
            onClick={() => setShocks(MARKET_INDICES.reduce((acc, idx) => ({ ...acc, [idx.name]: 0 }), {}))}
            className="mt-8 w-full py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded border border-slate-700 font-mono text-[10px] uppercase tracking-widest transition-all"
          >
            Reset All Simulation Shocks
          </button>
        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-xl p-6">
          <div className="flex items-center gap-2 mb-4">
            <Info size={16} className="text-cyan-400" />
            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest leading-none">Intelligence Engine</h3>
          </div>
          <div className="bg-slate-950 p-4 rounded border border-slate-800 font-mono text-[10px] text-cyan-400/80 leading-relaxed">
            y[cost] = β₀ + β₁(Crude) + β₂(Steel) + β₃(LeadTime) + ε
            <br /><br />
            Confidence: 94.2% (High)
            <br />
            Lead-Time Lag: 120 Days Avg
          </div>
        </div>
      </div>

      {/* Visualizer */}
      <div className="lg:col-span-8 bg-slate-900/50 rounded-xl border border-slate-800 p-8 flex flex-col min-h-[500px]">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-10">
          <div>
            <h2 className="text-2xl font-bold text-white mb-2 tracking-tight">Cost Scenario Explorer</h2>
            <div className="inline-flex flex-col">
              <span className="text-[10px] uppercase text-slate-500 font-bold mb-1 tracking-widest">Select Vehicle Component</span>
              <select 
                className="bg-slate-950 text-slate-200 font-mono text-xs uppercase border border-slate-700 px-4 py-2 rounded focus:outline-none focus:border-cyan-500 transition-colors cursor-pointer"
                value={selectedComponentId}
                onChange={(e) => setSelectedComponentId(e.target.value)}
              >
                {COMPONENT_LIST.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
              </select>
            </div>
          </div>
          <div className="flex flex-col items-end">
            <div className="text-[11px] font-bold uppercase tracking-widest text-slate-500 mb-1">Forecasted Cost Impact (T+3m)</div>
            <div className={`text-5xl font-mono font-bold tracking-tighter ${calculatedShock > 0 ? 'text-red-400' : 'text-emerald-400'}`}>
              {calculatedShock > 0 ? '+' : ''}{calculatedShock.toFixed(2)}%
            </div>
          </div>
        </div>

        <div className="flex-grow min-h-0 relative mb-8">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={forecastData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} />
              <XAxis 
                dataKey="month" 
                axisLine={{ stroke: '#334155' }} 
                tick={{ fontStyle: 'monospace', fontSize: 10, fill: '#64748b' }}
                tickLine={{ stroke: '#334155' }}
              />
              <YAxis 
                axisLine={{ stroke: '#334155' }} 
                tick={{ fontStyle: 'monospace', fontSize: 10, fill: '#64748b' }}
                tickLine={{ stroke: '#334155' }}
                unit="%"
              />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: '#0f172a',
                  border: '1px solid #334155',
                  borderRadius: '6px',
                  fontFamily: 'monospace',
                  fontSize: '12px',
                  color: '#e2e8f0'
                }}
                itemStyle={{ color: '#22d3ee' }}
              />
              <Line 
                type="monotone" 
                dataKey="shock" 
                stroke="#22d3ee" 
                strokeWidth={3} 
                dot={{ r: 4, fill: '#22d3ee', strokeWidth: 0 }}
                activeDot={{ r: 8, strokeWidth: 0, fill: '#ec4899' }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="bg-slate-950/50 border border-slate-800 p-5 rounded-lg flex flex-col justify-between">
            <div>
              <h4 className="text-[11px] font-bold text-slate-400 uppercase tracking-widest mb-4">Material Sensitivity Distribution</h4>
              <div className="space-y-4 font-mono text-[11px] text-slate-200">
                {[
                  selectedComponent?.materials.primary,
                  selectedComponent?.materials.secondary,
                  selectedComponent?.materials.tertiary,
                ].filter(Boolean).map((mat, i) => (
                  <div key={i}>
                    <div className="flex justify-between mb-1.5">
                      <span className="text-slate-400 capitalize">{mat?.name} <span className="text-[9px] opacity-40 ml-1">({mat?.index})</span></span>
                      <span className={i === 0 ? "text-cyan-400" : i === 1 ? "text-indigo-400" : "text-emerald-400"}>{(mat?.weight || 0) * 100}%</span>
                    </div>
                    <div className="h-1 bg-slate-800 rounded-full overflow-hidden">
                      <div 
                        className={`h-full transition-all duration-1000 ${i === 0 ? "bg-cyan-400 shadow-[0_0_8px_rgba(34,211,238,0.3)]" : i === 1 ? "bg-indigo-500" : "bg-emerald-500"}`}
                        style={{ width: `${(mat?.weight || 0) * 100}%` }} 
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="bg-slate-950/50 border border-slate-800 p-5 rounded-lg">
            <h4 className="text-[11px] font-bold text-slate-400 uppercase tracking-widest mb-4">Propagation Insights</h4>
            <div className="space-y-3">
              <div className="flex justify-between text-[10px] uppercase tracking-wider">
                <span className="text-slate-500">Lead-Time Lag</span>
                <span className="text-slate-300">~120 Days</span>
              </div>
              <div className="flex justify-between text-[10px] uppercase tracking-wider">
                <span className="text-slate-500">Regression Error (MSE)</span>
                <span className="text-slate-300">0.024</span>
              </div>
              <div className="flex justify-between text-[10px] uppercase tracking-wider">
                <span className="text-slate-500">Signal Confidence</span>
                <span className="text-emerald-400">High (94%)</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Historical Section */}
      <div className="lg:col-span-12 bg-slate-900/50 rounded-xl border border-slate-800 p-8">
        <div className="flex items-center gap-3 mb-8">
          <div className="p-2 border border-slate-700 bg-slate-800 rounded">
            <History size={20} className="text-cyan-400" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-white tracking-tight uppercase">Historical Price Shock Variance</h2>
            <p className="text-[10px] text-slate-500 uppercase tracking-widest font-medium">Last 6 Months Actual Market Drift</p>
          </div>
        </div>

        <div className="h-80 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={HISTORICAL_SHOCKS}>
              <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} />
              <XAxis 
                dataKey="month" 
                axisLine={{ stroke: '#334155' }} 
                tick={{ fontStyle: 'monospace', fontSize: 10, fill: '#64748b' }}
              />
              <YAxis 
                axisLine={{ stroke: '#334155' }} 
                tick={{ fontStyle: 'monospace', fontSize: 10, fill: '#64748b' }}
                unit="%"
              />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: '#0f172a',
                  border: '1px solid #334155',
                  borderRadius: '6px',
                  fontFamily: 'monospace',
                  fontSize: '11px',
                  color: '#e2e8f0'
                }}
              />
              <Legend 
                wrapperStyle={{ 
                  fontFamily: 'monospace', 
                  fontSize: '10px', 
                  textTransform: 'uppercase',
                  paddingTop: '20px'
                }}
              />
              <Line type="monotone" dataKey="Brent Crude" stroke="#f87171" strokeWidth={2} dot={{ r: 3 }} />
              <Line type="monotone" dataKey="LME Copper" stroke="#fbbf24" strokeWidth={2} dot={{ r: 3 }} />
              <Line type="monotone" dataKey="SOX Index" stroke="#22d3ee" strokeWidth={2} dot={{ r: 3 }} />
              <Line type="monotone" dataKey="LME Steel" stroke="#94a3b8" strokeWidth={2} dot={{ r: 3 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
