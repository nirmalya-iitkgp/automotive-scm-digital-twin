/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { BookOpen, Database, ArrowRight, Zap } from 'lucide-react';

export default function MethodologySpace() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 text-slate-300">
      {/* Methodology Column */}
      <div className="space-y-6">
        <div className="bg-slate-900/50 border border-slate-800 p-8 rounded-2xl shadow-xl">
          <div className="flex items-center gap-3 mb-6">
            <BookOpen className="text-cyan-400" size={24} />
            <h2 className="text-xl font-bold text-white uppercase tracking-tight">Sensitivity Logic Framework</h2>
          </div>

          <div className="space-y-8">
            <div>
              <h3 className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-4">The Price Shock Formula</h3>
              <div className="bg-slate-950 p-6 rounded-xl border border-slate-800 font-mono text-cyan-400 text-lg text-center shadow-inner">
                ΔUnitCost = Σ ( δIndex_i × W_i × α_i )
              </div>
            </div>

            <div className="grid grid-cols-1 gap-4 font-mono text-[10px] uppercase">
              <div className="p-4 bg-slate-800/30 border border-slate-800 rounded">
                <span className="text-cyan-400 font-bold">δIndex_i</span>
                <p className="mt-1 opacity-60">Percentage change in the market index (e.g., Brent Crude +10%)</p>
              </div>
              <div className="p-4 bg-slate-800/30 border border-slate-800 rounded">
                <span className="text-cyan-400 font-bold">W_i (BOM Weight)</span>
                <p className="mt-1 opacity-60">Relative weight of the material in the assembly (e.g., 85% Polypropylene)</p>
              </div>
              <div className="p-4 bg-slate-800/30 border border-slate-800 rounded">
                <span className="text-cyan-400 font-bold">α_i (Pass-through)</span>
                <p className="mt-1 opacity-60">Coefficient representing energy intensity & refining overhead (1.2x - 1.5x for polymers)</p>
              </div>
            </div>

            <div className="border-t border-slate-800 pt-6">
              <h3 className="text-xs font-bold text-white uppercase tracking-widest mb-4 flex items-center gap-2">
                <Zap size={14} className="text-amber-400" />
                Example: Exterior Trim via Polymer Feedstock
              </h3>
              <div className="bg-slate-950/50 p-5 rounded-lg border-l-2 border-amber-500 space-y-3 font-sans text-xs leading-relaxed">
                <div className="flex items-center gap-2">
                  <span className="px-1.5 py-0.5 bg-slate-800 font-mono text-[9px]">STEP 1</span>
                  <span><strong>Brent Crude Spike:</strong> Market realizes +15% volatility.</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="px-1.5 py-0.5 bg-slate-800 font-mono text-[9px]">STEP 2</span>
                  <span><strong>Feedstock Correlation:</strong> PP Resin typically tracks at 0.85 sensitivity to Crude.</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="px-1.5 py-0.5 bg-slate-800 font-mono text-[9px]">STEP 3</span>
                  <span><strong>Propagation:</strong> 15% Crude × 0.85 = +12.75% Residue impact.</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="px-1.5 py-0.5 bg-slate-800 font-mono text-[9px]">STEP 4</span>
                  <span><strong>BOM Mapping:</strong> Bumper (85% PP) impact = 12.75% × 0.85 = <strong>+10.8% Total Shock</strong>.</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Ingestion Schema Column */}
      <div className="space-y-6">
        <div className="bg-slate-900/50 border border-slate-800 p-8 rounded-2xl shadow-xl h-full">
          <div className="flex items-center gap-3 mb-6">
            <Database className="text-cyan-400" size={24} />
            <h2 className="text-xl font-bold text-white uppercase tracking-tight">Data Ingestion Schema</h2>
          </div>

          <div className="space-y-6">
            <h3 className="text-xs font-bold text-slate-500 uppercase tracking-widest">Source Mapping & Transformers</h3>
            <div className="overflow-x-auto">
              <table className="w-full text-[10px] font-mono border-collapse">
                <thead>
                  <tr className="text-left text-slate-500 border-b border-slate-800">
                    <th className="pb-2">Provider</th>
                    <th className="pb-2">Domain</th>
                    <th className="pb-2">Frequency</th>
                    <th className="pb-2">Format</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/50">
                  <tr className="hover:bg-slate-800/20">
                    <td className="py-3 text-cyan-400 font-bold">LME Real-Time</td>
                    <td className="py-3 text-slate-400">Non-Ferrous Metals</td>
                    <td className="py-3">Real-Time</td>
                    <td className="py-3">JSON/FIX</td>
                  </tr>
                  <tr className="hover:bg-slate-800/20">
                    <td className="py-3 text-cyan-400 font-bold">EIA Gov</td>
                    <td className="py-3 text-slate-400">Energy & Feedstock</td>
                    <td className="py-3">Daily</td>
                    <td className="py-3">REST API</td>
                  </tr>
                  <tr className="hover:bg-slate-800/20">
                    <td className="py-3 text-cyan-400 font-bold">FRED Eco Data</td>
                    <td className="py-3 text-slate-400">Labor/PPI/Macro</td>
                    <td className="py-3">Monthly</td>
                    <td className="py-3">CSV Batch</td>
                  </tr>
                  <tr className="hover:bg-slate-800/20">
                    <td className="py-3 text-cyan-400 font-bold">SOX / WSTS</td>
                    <td className="py-3 text-slate-400">Electronics/Semis</td>
                    <td className="py-3">Weekly</td>
                    <td className="py-3">JSON</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="mt-8 space-y-4">
              <h3 className="text-xs font-bold text-slate-500 uppercase tracking-widest">Digital Twin Pipeline</h3>
              <div className="space-y-4 relative before:absolute before:left-3 before:top-2 before:bottom-2 before:w-[1px] before:bg-slate-800">
                <div className="flex gap-4 relative">
                  <div className="w-6 h-6 bg-slate-900 border border-slate-800 rounded-full flex items-center justify-center text-[10px] text-cyan-400 z-10 shrink-0">1</div>
                  <div>
                    <h4 className="text-xs font-bold text-white">Normalization</h4>
                    <p className="text-[10px] text-slate-500">Mapping inconsistent units (metric tons, barrels, pounds) to a unified standard.</p>
                  </div>
                </div>
                <div className="flex gap-4 relative">
                  <div className="w-6 h-6 bg-slate-900 border border-slate-800 rounded-full flex items-center justify-center text-[10px] text-cyan-400 z-10 shrink-0">2</div>
                  <div>
                    <h4 className="text-xs font-bold text-white">Lead-Time Time-Shifting</h4>
                    <p className="text-[10px] text-slate-500">Shifting current spot signals 90-120 days into the future to align with auto procurement cycles.</p>
                  </div>
                </div>
                <div className="flex gap-4 relative">
                  <div className="w-6 h-6 bg-cyan-500 border border-cyan-400 rounded-full flex items-center justify-center text-[10px] text-white z-10 shrink-0">3</div>
                  <div>
                    <h4 className="text-xs font-bold text-white">BOM Aggregation</h4>
                    <p className="text-[10px] text-slate-500">Applying weighted average material impacts across complex sub-assemblies.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
