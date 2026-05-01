/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { AlertTriangle, Zap, Globe, Package, Droplet, Cpu, ShieldAlert } from 'lucide-react';

const RISKS = [
  {
    category: 'Advanced Electronics',
    vulnerability: 'Geopolitical / Semiconductor',
    driver: 'Silicon shortages, SOX Volatility, Lead-time lag',
    score: 'Critical',
    icon: Cpu,
    color: 'bg-red-600',
    indicators: ['SOX Index', 'Rare Earth Index']
  },
  {
    category: 'Polymer Assemblies',
    vulnerability: 'Energy / Feedstock',
    driver: 'Brent Crude pricing, Naphtha cracking costs',
    score: 'High',
    icon: Droplet,
    color: 'bg-orange-600',
    indicators: ['Brent Crude', 'Natural Gas']
  },
  {
    category: 'Structural Metal',
    vulnerability: 'Commodity / Trade',
    driver: 'LME Steel/Aluminum capacity, CBAM regulations',
    score: 'Medium',
    icon: Package,
    color: 'bg-yellow-600',
    indicators: ['LME Steel', 'LME Aluminum']
  },
  {
    category: 'Safety & Restraints',
    vulnerability: 'Regulatory / Material',
    driver: 'Nylon 6,6 precursors, certification bottlenecks',
    score: 'Low',
    icon: ShieldAlert,
    color: 'bg-emerald-600',
    indicators: ['Propylene', 'Labor Index']
  }
];

export default function RiskTaxonomy() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {RISKS.map((risk) => (
        <div key={risk.category} className="border border-slate-800 bg-slate-900/50 group hover:translate-x-[-4px] hover:translate-y-[-4px] hover:shadow-[8px_8px_0px_0px_rgba(15,23,42,0.5)] transition-all duration-200 overflow-hidden rounded-xl">
          <div className={`h-1 w-full ${risk.color}`} />
          <div className="p-6">
            <div className="flex justify-between items-start mb-6">
              <div className="p-2 border border-slate-700 bg-slate-800 rounded">
                <risk.icon size={20} className="text-slate-300" />
              </div>
              <span className="font-mono text-[9px] font-bold uppercase tracking-widest border border-slate-700 px-2 py-0.5 text-slate-400">
                {risk.score}
              </span>
            </div>
            
            <h3 className="text-xl font-bold text-white mb-2 tracking-tight">{risk.category}</h3>
            <p className="font-mono text-[10px] uppercase text-cyan-400/60 mb-4">{risk.vulnerability}</p>
            
            <div className="space-y-4">
              <div>
                <div className="text-[10px] font-mono uppercase text-slate-500 tracking-widest mb-1">Primary Driver</div>
                <p className="text-xs leading-relaxed text-slate-300">{risk.driver}</p>
              </div>
              
              <div className="flex flex-wrap gap-2">
                {risk.indicators.map(ind => (
                  <span key={ind} className="bg-slate-800 text-slate-400 text-[8px] font-mono px-2 py-0.6 rounded uppercase tracking-wider">
                    {ind}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
