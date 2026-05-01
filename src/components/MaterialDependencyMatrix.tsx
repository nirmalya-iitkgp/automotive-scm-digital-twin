/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { COMPONENT_LIST } from '../data';

export default function MaterialDependencyMatrix() {
  return (
    <div className="rounded-xl border border-slate-800 bg-slate-900 border-collapse overflow-hidden shadow-2xl">
      <div className="p-4 border-b border-slate-800 bg-slate-900/80 flex justify-between items-center">
        <h2 className="text-xs font-bold text-slate-400 uppercase tracking-widest">Bill of Materials - Live Mapping</h2>
        <button className="text-[10px] px-3 py-1 bg-slate-800 rounded border border-slate-700 hover:bg-slate-700 text-slate-400 transition font-mono uppercase tracking-widest">Export Core CSV</button>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse text-xs">
          <thead>
            <tr className="bg-slate-950 font-bold text-slate-500 uppercase text-[10px]">
              <th className="p-4 border-b border-slate-800">Category</th>
              <th className="p-4 border-b border-slate-800">Component Assembly</th>
              <th className="p-4 border-b border-slate-800 border-l border-slate-800/50">Primary Feedstock</th>
              <th className="p-4 border-b border-slate-800">Global Index</th>
              <th className="p-4 border-b border-slate-800">Weight</th>
              <th className="p-4 border-b border-slate-800 text-right">Secondary Flow</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800 font-sans">
            {COMPONENT_LIST.map((comp) => (
              <tr key={comp.id} className="hover:bg-slate-800/50 transition-colors group">
                <td className="p-4 font-mono text-[9px] uppercase text-slate-500">{comp.category}</td>
                <td className="p-4 font-bold text-slate-200">{comp.name}</td>
                <td className="p-4 text-slate-400 underline decoration-slate-700 underline-offset-4 border-l border-slate-800/30">{comp.materials.primary.name}</td>
                <td className="p-4 font-mono text-[10px] text-cyan-400/80">{comp.materials.primary.index}</td>
                <td className="p-4 font-mono text-slate-300">{(comp.materials.primary.weight * 100).toFixed(0)}%</td>
                <td className="p-4 font-mono text-[9px] text-right space-y-1">
                  {comp.materials.secondary && (
                    <div className="flex justify-end gap-2 text-slate-400">
                      <span>{comp.materials.secondary.name}</span>
                      <span className="text-slate-600">({(comp.materials.secondary.weight * 100).toFixed(0)}%)</span>
                    </div>
                  )}
                  {comp.materials.tertiary && (
                    <div className="flex justify-end gap-2 text-slate-400">
                      <span>{comp.materials.tertiary.name}</span>
                      <span className="text-slate-600">({(comp.materials.tertiary.weight * 100).toFixed(0)}%)</span>
                    </div>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
