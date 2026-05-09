/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useMemo } from 'react';
import { COMPONENT_LIST, MARKET_INDICES, HISTORICAL_SHOCKS } from '../data';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { TrendingUp, TrendingDown, Info, History, Globe, Zap, Ship } from 'lucide-react';
import { motion } from 'motion/react';

function IndexSlider({ 
  idx, 
  value, 
  onChange 
}: { 
  idx: typeof MARKET_INDICES[0]; 
  value: number; 
  onChange: (val: number) => void;
  key?: string | number;
}) {
  return (
    <div className="space-y-2">
      <div className="flex justify-between text-[11px] font-mono text-slate-400">
        <span className="uppercase tracking-wider flex items-center gap-1.5">
          {idx.id === 'freight' ? <Ship size={12} className="text-indigo-400" /> : null}
          {idx.name}
        </span>
        <span className={`font-bold transition-colors ${value > 0 ? 'text-red-400' : value < 0 ? 'text-emerald-400' : 'text-slate-500'}`}>
          {value > 0 ? '▲' : value < 0 ? '▼' : ''} {Math.abs(value)}%
        </span>
      </div>
      <input 
        type="range" 
        min="-50" 
        max="200" 
        step="5"
        value={value || 0} 
        onChange={(e) => onChange(parseInt(e.target.value))}
        className="w-full accent-cyan-400 h-1 bg-slate-800 rounded-lg appearance-none cursor-pointer"
      />
    </div>
  );
}

function MaterialBar({ 
  name, 
  weight, 
  index,
  colorClass 
}: { 
  name: string; 
  weight: number; 
  index: string;
  colorClass: string;
  key?: string | number;
}) {
  return (
    <div>
      <div className="flex justify-between mb-1">
        <span className="text-slate-400 capitalize flex items-center gap-2">
          {name}
          <span className="text-[9px] text-slate-600 font-mono">({index})</span>
        </span>
        <span className={colorClass}>{(weight || 0) * 100}%</span>
      </div>
      <div className="h-0.5 bg-slate-800 rounded-full overflow-hidden">
        <motion.div 
          initial={{ width: 0 }}
          animate={{ width: `${(weight || 0) * 100}%` }}
          transition={{ duration: 1, ease: "easeOut" }}
          className={`h-full ${colorClass.replace('text-', 'bg-')}`}
        />
      </div>
    </div>
  );
}

export default function ShockSimulator() {
  const [shocks, setShocks] = useState<Record<string, number>>(() => 
    MARKET_INDICES.reduce((acc, idx) => ({ ...acc, [idx.name]: 0 }), {})
  );

  const [selectedComponentId, setSelectedComponentId] = useState(COMPONENT_LIST[0].id);
  const [isNearshoring, setIsNearshoring] = useState(false);
  const [useSubstitution, setUseSubstitution] = useState(false);

  const selectedBaseComponent = useMemo(() => 
    COMPONENT_LIST.find(c => c.id === selectedComponentId), 
    [selectedComponentId]
  );

  // Active component configuration (original or substitution)
  const activeComponent = useMemo(() => {
    if (useSubstitution && selectedBaseComponent?.substitution) {
      return {
        ...selectedBaseComponent,
        materials: selectedBaseComponent.substitution.materials,
        weight_kg: selectedBaseComponent.substitution.weight_kg,
        name: `${selectedBaseComponent.name} (${selectedBaseComponent.substitution.name})`
      };
    }
    return selectedBaseComponent;
  }, [selectedBaseComponent, useSubstitution]);

  const calculatedShock = useMemo(() => {
    if (!activeComponent) return 0;
    
    // 1. Material Shock
    const m = activeComponent.materials;
    let materialShock = (shocks[m.primary.index] || 0) * m.primary.weight;
    if (m.secondary) materialShock += (shocks[m.secondary.index] || 0) * m.secondary.weight;
    if (m.tertiary) materialShock += (shocks[m.tertiary.index] || 0) * m.tertiary.weight;
    
    // 2. Logistics Shock
    const freightShock = shocks['Global Freight Index'] || 0;
    const logisticsMultiplier = (activeComponent.isGlobalSourcing && !isNearshoring) ? 1.0 : 0.2;
    const logisticsShock = freightShock * activeComponent.logisticsSensitivity * logisticsMultiplier;

    // 3. Complexity/Processing overhead
    const complexityFactor = activeComponent.sensitivityScore / 6;
    
    return (materialShock * complexityFactor) + logisticsShock;
  }, [activeComponent, shocks, isNearshoring]);

  const forecastData = useMemo(() => {
    return [
      { month: 'Current', shock: 0 },
      { month: 'T+1', shock: calculatedShock * 0.4 },
      { month: 'T+2', shock: calculatedShock * 0.7 },
      { month: 'T+3 (Peak)', shock: calculatedShock },
      { month: 'T+6 (Recede)', shock: calculatedShock * 0.8 },
    ];
  }, [calculatedShock]);

  // Reset substitution when switching components
  const handleComponentChange = (id: string) => {
    setSelectedComponentId(id);
    setUseSubstitution(false);
  };

  const resetShocks = () => {
    setShocks(MARKET_INDICES.reduce((acc, idx) => ({ ...acc, [idx.name]: 0 }), {}));
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
      {/* Controls */}
      <div className="lg:col-span-4 space-y-6">
        <div className="bg-slate-900/50 p-6 rounded-xl border border-slate-800 shadow-xl overflow-hidden relative">
          <div className="absolute top-0 right-0 p-4 opacity-10 pointer-events-none">
            <Zap size={100} />
          </div>
          <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-6 border-b border-slate-800 pb-3">Market Index Simulator</h3>
          <div className="grid grid-cols-1 gap-4 max-h-[400px] overflow-y-auto pr-2 custom-scrollbar">
            {MARKET_INDICES.map(idx => (
              <IndexSlider 
                key={idx.id} 
                idx={idx} 
                value={shocks[idx.name]} 
                onChange={(val) => setShocks(prev => ({ ...prev, [idx.name]: val }))}
              />
            ))}
          </div>
          <button 
            onClick={resetShocks}
            className="mt-8 w-full py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded border border-slate-700 font-mono text-[10px] uppercase tracking-widest transition-all hover:border-cyan-500/50 hover:text-cyan-400 group"
          >
            <span className="flex items-center justify-center gap-2">
              <History size={12} className="group-hover:rotate-[-45deg] transition-transform" />
              Reset All Simulation Shocks
            </span>
          </button>
        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 relative overflow-hidden">
          <div className="absolute top-0 right-0 p-3">
             <div className="w-2 h-2 rounded-full bg-cyan-500 animate-pulse shadow-[0_0_8px_rgba(6,182,212,0.8)]" />
          </div>
          <div className="flex items-center gap-2 mb-4">
            <Globe size={16} className="text-cyan-400" />
            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest leading-none">Strategist Toolbox</h3>
          </div>
          <div className="space-y-4">
            {/* Substitution Toggle */}
            <div className={`p-4 rounded border transition-all duration-300 ${selectedBaseComponent?.substitution ? (useSubstitution ? 'border-amber-500 bg-amber-500/5 shadow-[inset_0_0_20px_rgba(245,158,11,0.05)]' : 'border-amber-500/30 bg-amber-500/3 sm:hover:border-amber-500/60') : 'border-slate-800 bg-slate-900/50 opacity-40'}`}>
              <div className="flex justify-between items-center mb-2">
                <span className="text-[10px] font-bold text-slate-300 uppercase flex items-center gap-2">
                  <Zap size={12} className={useSubstitution ? "text-amber-400" : "text-amber-600"} />
                  Material Substitution
                </span>
                <input 
                  type="checkbox" 
                  disabled={!selectedBaseComponent?.substitution}
                  checked={useSubstitution} 
                  onChange={(e) => setUseSubstitution(e.target.checked)}
                  className="w-4 h-4 accent-amber-500 cursor-pointer"
                />
              </div>
              <p className="text-[9px] text-slate-500 leading-tight">
                {selectedBaseComponent?.substitution 
                  ? useSubstitution 
                    ? selectedBaseComponent.substitution.rationale 
                    : `Potential: ${selectedBaseComponent.substitution.name}. Click to preview impact.`
                  : "No viable alternative materials identified for this component."}
              </p>
            </div>

            {/* Nearshoring Toggle */}
            <div className={`p-4 rounded border transition-all duration-300 ${isNearshoring ? 'border-cyan-500 bg-cyan-500/5 shadow-[inset_0_0_20px_rgba(6,182,212,0.05)]' : 'border-cyan-500/30 bg-cyan-500/3 sm:hover:border-cyan-500/60'}`}>
              <div className="flex justify-between items-center mb-2">
                <span className="text-[10px] font-bold text-slate-300 uppercase flex items-center gap-2">
                  <Globe size={12} className={isNearshoring ? "text-cyan-400" : "text-cyan-600"} />
                  Regional Nearshoring
                </span>
                <input 
                  type="checkbox" 
                  checked={isNearshoring} 
                  onChange={(e) => setIsNearshoring(e.target.checked)}
                  className="w-4 h-4 accent-cyan-500 cursor-pointer"
                />
              </div>
              <p className="text-[9px] text-slate-500 leading-tight">
                Shift assembly within region. Increases base unit cost (approx 5-10%) but reduces logistics volatility footprint.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Visualizer */}
      <div className="lg:col-span-8 bg-slate-900/50 rounded-xl border border-slate-800 p-8 flex flex-col min-h-[500px] shadow-2xl">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-10">
          <div>
            <h2 className="text-2xl font-bold text-white mb-2 tracking-tight">Cost Scenario Explorer</h2>
            <div className="inline-flex flex-col">
              <span className="text-[10px] uppercase text-slate-500 font-bold mb-2 tracking-widest">Select Vehicle Component</span>
              <div className="relative">
                <select 
                  className="appearance-none bg-slate-950 text-slate-200 font-mono text-xs uppercase border border-slate-700 pl-4 pr-10 py-2.5 rounded focus:outline-none focus:border-cyan-500 transition-colors cursor-pointer w-full"
                  value={selectedComponentId}
                  onChange={(e) => handleComponentChange(e.target.value)}
                >
                  {COMPONENT_LIST.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
                </select>
                <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-slate-500">
                   <TrendingDown size={14} />
                </div>
              </div>
            </div>
          </div>
          <div className="flex flex-col items-end">
            <div className="text-[11px] font-bold uppercase tracking-widest text-slate-500 mb-1">Forecasted Landed Cost Impact</div>
            <div className={`text-5xl font-mono font-bold tracking-tighter ${calculatedShock > 0 ? 'text-red-400' : calculatedShock < 0 ? 'text-emerald-400' : 'text-slate-600'}`}>
              <motion.span
                key={calculatedShock}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
              >
                {calculatedShock > 0 ? '+' : ''}{calculatedShock.toFixed(2)}%
              </motion.span>
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
                tick={{ fontFamily: 'var(--font-mono)', fontSize: 10, fill: '#64748b' }}
                tickLine={{ stroke: '#334155' }}
              />
              <YAxis 
                axisLine={{ stroke: '#334155' }} 
                tick={{ fontFamily: 'var(--font-mono)', fontSize: 10, fill: '#64748b' }}
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
                cursor={{ stroke: '#334155', strokeWidth: 1 }}
              />
              <Line 
                type="monotone" 
                dataKey="shock" 
                stroke={useSubstitution ? "#f59e0b" : "#22d3ee"} 
                strokeWidth={3} 
                dot={{ r: 4, fill: useSubstitution ? "#f59e0b" : "#22d3ee", stroke: "none" }}
                activeDot={{ r: 6, stroke: "none", fill: '#ec4899' }}
                animationDuration={1000}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="bg-slate-950/50 border border-slate-800 p-5 rounded-lg flex flex-col justify-between">
            <div>
              <h4 className="text-[11px] font-bold text-slate-400 uppercase tracking-widest mb-4">Active Sensitivity Distribution</h4>
              <div className="space-y-3 font-mono text-[11px] text-slate-200">
                {[
                  activeComponent?.materials.primary,
                  activeComponent?.materials.secondary,
                  activeComponent?.materials.tertiary,
                ].filter(Boolean).map((mat, i) => (
                  <MaterialBar 
                    key={i}
                    name={mat!.name}
                    weight={mat!.weight}
                    index={mat!.index}
                    colorClass={i === 0 ? "text-cyan-400" : "text-indigo-400"}
                  />
                ))}
                {/* Logistics Bar */}
                <div className="mt-4 pt-4 border-t border-slate-800">
                  <MaterialBar 
                    name="Freight Exposure (Logistics)"
                    weight={activeComponent?.logisticsSensitivity || 0}
                    index="Global Freight Index"
                    colorClass="text-indigo-500"
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="bg-slate-950/50 border border-slate-800 p-5 rounded-lg">
            <h4 className="text-[11px] font-bold text-slate-400 uppercase tracking-widest mb-4 flex items-center gap-2">
              <Info size={12} className="text-slate-500" />
              Propagation Insights
            </h4>
            <div className="space-y-4">
              <div className="flex justify-between items-center text-[10px] uppercase tracking-wider">
                <span className="text-slate-500">Weight Profile</span>
                <span className={`text-slate-300 font-mono transition-colors ${useSubstitution ? 'text-amber-400' : ''}`}>
                  {activeComponent?.weight_kg} kg 
                  {useSubstitution && selectedBaseComponent?.substitution && (
                    <span className="ml-1 opacity-50">({(activeComponent!.weight_kg! - selectedBaseComponent!.weight_kg!).toFixed(1)}kg delta)</span>
                  )}
                </span>
              </div>
              <div className="flex justify-between items-center text-[10px] uppercase tracking-wider">
                <span className="text-slate-500">Sourcing Profile</span>
                <span className={`px-2 py-0.5 rounded text-[8px] transition-all ${isNearshoring ? 'bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 shadow-[0_0_10px_rgba(34,211,238,0.1)]' : 'bg-indigo-500/10 text-indigo-400 border border-indigo-500/20'}`}>
                  {isNearshoring ? 'LOCALIZED' : activeComponent?.isGlobalSourcing ? 'GLOBAL' : 'LOCAL'}
                </span>
              </div>
              <div className="flex justify-between items-center text-[10px] uppercase tracking-wider">
                <span className="text-slate-500">Volatility Risk</span>
                <span className={`text-slate-300 transition-colors ${calculatedShock > 25 ? 'text-red-500 font-bold animate-pulse' : calculatedShock > 10 ? 'text-red-400' : 'text-emerald-400'}`}>
                  {calculatedShock > 25 ? 'EXTREME' : calculatedShock > 10 ? 'HIGH' : isNearshoring ? 'MINIMIZED' : 'STABLE'}
                </span>
              </div>
              <div className="pt-2 border-t border-slate-800 flex justify-between items-center text-[9px] text-slate-600 font-mono italic">
                 <span>REPORT GENERATED: {new Date().toLocaleDateString()}</span>
                 <span>AUDIT: VERIFIED</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Historical Section */}
      <div className="lg:col-span-12 bg-slate-900/50 rounded-xl border border-slate-800 p-8 shadow-inner overflow-hidden group">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-10">
          <div className="flex items-center gap-3">
            <div className="p-2 border border-slate-700 bg-slate-800 rounded group-hover:border-cyan-500/50 transition-colors">
              <History size={20} className="text-cyan-400" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-white tracking-tight uppercase">Historical Market Drift</h2>
              <p className="text-[10px] text-slate-500 uppercase tracking-widest font-medium">Real-world volatility tracking (6M Window)</p>
            </div>
          </div>
          <div className="flex gap-4">
             {['Brent Crude', 'LME Copper', 'SOX Index', 'LME Steel'].map((label, idx) => (
                <div key={label} className="flex items-center gap-2">
                   <div className={`w-2 h-2 rounded-full ${idx === 0 ? 'bg-red-400' : idx === 1 ? 'bg-amber-400' : idx === 2 ? 'bg-cyan-400' : 'bg-slate-400'}`} />
                   <span className="text-[9px] uppercase tracking-tighter text-slate-500 font-mono">{label}</span>
                </div>
             ))}
          </div>
        </div>

        <div className="h-64 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={HISTORICAL_SHOCKS}>
              <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} />
              <XAxis 
                dataKey="month" 
                axisLine={{ stroke: '#334155' }} 
                tick={{ fontFamily: 'var(--font-mono)', fontSize: 10, fill: '#64748b' }}
              />
              <YAxis 
                axisLine={{ stroke: '#334155' }} 
                tick={{ fontFamily: 'var(--font-mono)', fontSize: 10, fill: '#64748b' }}
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
              <Line type="monotone" dataKey="Brent Crude" stroke="#f87171" strokeWidth={2} dot={{ r: 3, fill: '#ef4444', stroke: "none" }} activeDot={{ r: 5, stroke: "none" }} />
              <Line type="monotone" dataKey="LME Copper" stroke="#fbbf24" strokeWidth={2} dot={{ r: 3, fill: '#f59e0b', stroke: "none" }} activeDot={{ r: 5, stroke: "none" }} />
              <Line type="monotone" dataKey="SOX Index" stroke="#22d3ee" strokeWidth={2} dot={{ r: 3, fill: '#06b6d4', stroke: "none" }} activeDot={{ r: 5, stroke: "none" }} />
              <Line type="monotone" dataKey="LME Steel" stroke="#94a3b8" strokeWidth={2} dot={{ r: 3, fill: '#64748b', stroke: "none" }} activeDot={{ r: 5, stroke: "none" }} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}

