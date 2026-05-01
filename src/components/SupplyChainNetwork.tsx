/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion } from 'motion/react';
import { COMPONENT_LIST } from '../data';
import { useState } from 'react';

interface Node {
  id: string;
  label: string;
  type: 'oem' | 'tier1' | 'tier2';
  color: string;
  size: number;
  x: number;
  y: number;
  description?: string;
}

export default function SupplyChainNetwork() {
  const [hoveredNode, setHoveredNode] = useState<string | null>(null);

  // Center: OEM
  const center: Node = { id: 'oem', label: 'AutoOEM', type: 'oem', color: '#22d3ee', size: 80, x: 50, y: 50 };

  // Tier 1: Suppliers from the BOM
  const suppliers = Array.from(new Set(COMPONENT_LIST.map(c => c.supplier).filter(Boolean))) as string[];
  
  const tier1Nodes: Node[] = suppliers.map((sup, i) => {
    const angle = (i / suppliers.length) * 2 * Math.PI;
    const distance = 28;
    // Calculate total influence based on number of parts and weight
    const partsBySup = COMPONENT_LIST.filter(c => c.supplier === sup);
    const totalWeight = partsBySup.reduce((acc, c) => acc + (c.weight_kg || 0), 0);
    const size = 30 + Math.min(totalWeight / 5, 40); // Size based on "Influence"

    return {
      id: `sup-${i}`,
      label: sup,
      type: 'tier1',
      color: '#818cf8',
      size: size,
      x: 50 + distance * Math.cos(angle),
      y: 50 + distance * Math.sin(angle),
      description: `${partsBySup.length} Assemblies // ${totalWeight.toFixed(1)}kg Influence`
    };
  });

  // Tier 2: Individual Parts for each Supplierhub
  const tier2Nodes: Node[] = tier1Nodes.flatMap((parent, i) => {
    const supName = suppliers[i];
    const parts = COMPONENT_LIST.filter(c => c.supplier === supName);
    
    return parts.map((part, j) => {
      const angle = (i / suppliers.length) * 2 * Math.PI + (j - (parts.length - 1) / 2) * 0.25;
      const distance = 42;
      return {
        id: `part-${part.id}`,
        label: part.name,
        type: 'tier2',
        color: '#94a3b8',
        size: 12 + Math.min((part.weight_kg || 5) / 2, 10),
        x: 50 + distance * Math.cos(angle),
        y: 50 + distance * Math.sin(angle),
        description: `${part.category} // ${part.weight_kg}kg`
      };
    });
  });

  const allNodes = [center, ...tier1Nodes, ...tier2Nodes];

  return (
    <div className="bg-slate-900/30 border border-slate-800 rounded-2xl p-6 relative overflow-hidden h-[650px] flex items-center justify-center">
      <div className="absolute top-6 left-8 z-20">
        <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">Global Dependency Topology</h3>
        <p className="text-[10px] text-slate-500 font-mono italic">Radial mapping of raw indicators to assembly modules</p>
      </div>

      {/* Legend */}
      <div className="absolute bottom-8 right-8 z-20 bg-slate-950/80 p-4 rounded border border-slate-800 space-y-2 backdrop-blur-md">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-cyan-400" />
          <span className="text-[9px] uppercase font-mono text-slate-300">AutoOEM Center</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-indigo-400" />
          <span className="text-[9px] uppercase font-mono text-slate-300">Tier 1 Modules</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-slate-500" />
          <span className="text-[9px] uppercase font-mono text-slate-300">Tier 2 Feedstock</span>
        </div>
      </div>

      {/* SVG Background for Connections */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid meet">
        {/* OEM to Tier 1 */}
        {tier1Nodes.map(node => (
          <line 
            key={`line-oem-${node.id}`}
            x1={center.x} y1={center.y}
            x2={node.x} y2={node.y}
            stroke="#334155"
            strokeWidth="0.15"
            strokeDasharray="1,1"
          />
        ))}
        {/* Tier 1 to Tier 2 */}
        {tier1Nodes.map((p, i) => {
          const children = tier2Nodes.filter(c => c.id.startsWith(`t2-${i}-`));
          return children.map(c => (
            <line 
              key={`line-${p.id}-${c.id}`}
              x1={p.x} y1={p.y}
              x2={c.x} y2={c.y}
              stroke="#1e293b"
              strokeWidth="0.1"
            />
          ));
        })}
      </svg>

      {/* Nodes */}
      <div className="relative w-full h-full max-w-[800px] max-h-[800px]">
        {allNodes.map((node) => (
          <motion.div
            key={node.id}
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ 
              type: 'spring', 
              stiffness: 260, 
              damping: 20, 
              delay: (node.type === 'oem' ? 0 : node.type === 'tier1' ? 0.3 : 0.6) 
            }}
            onMouseEnter={() => setHoveredNode(node.id)}
            onMouseLeave={() => setHoveredNode(null)}
            style={{ 
              left: `${node.x}%`, 
              top: `${node.y}%`,
              width: `${node.size}px`,
              height: `${node.size}px`,
              backgroundColor: node.color,
              marginTop: `-${node.size / 2}px`,
              marginLeft: `-${node.size / 2}px`,
              boxShadow: hoveredNode === node.id ? `0 0 20px ${node.color}88` : 'none',
              zIndex: hoveredNode === node.id ? 100 : 10
            }}
            className="absolute rounded-full cursor-help hover:scale-110 transition-transform flex items-center justify-center border border-white/10"
          >
            {node.type !== 'tier2' && (
              <span className="text-[7px] font-bold text-white/80 uppercase text-center pointer-events-none line-clamp-1 p-1">
                {node.label}
              </span>
            )}
            
            {/* Tooltip-like label for nodes when hovered */}
            {hoveredNode === node.id && (
              <div className="absolute top-full mt-2 bg-slate-950 border border-slate-700 px-3 py-2 rounded-lg shadow-2xl z-[100] whitespace-nowrap min-w-[120px]">
                <div className="text-[11px] font-bold text-white mb-0.5">{node.label}</div>
                <div className="text-[9px] text-cyan-400 font-mono mb-1 uppercase tracking-tighter">{node.type} node</div>
                {node.description && (
                  <div className="text-[9px] text-slate-400 font-sans border-t border-slate-800 pt-1 mt-1">{node.description}</div>
                )}
              </div>
            )}
          </motion.div>
        ))}
      </div>

      {/* Status Overlay */}
      <div className="absolute top-6 right-8 text-right font-mono text-[9px] uppercase tracking-tighter opacity-20 hidden md:block">
        NETWORK_TOPOLOGY: ACTIVE<br />
        DENSITY_INDEX: 4.82<br />
        LATENCY: 12ms
      </div>
    </div>
  );
}
