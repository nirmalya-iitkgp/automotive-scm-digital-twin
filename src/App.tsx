/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import ShockSimulator from './components/ShockSimulator';
import { motion } from 'motion/react';

export default function App() {
  return (
    <div className="min-h-screen bg-[#0F172A] text-slate-200 font-sans selection:bg-cyan-500 selection:text-white">
      {/* Main Content Area */}
      <main className="min-h-screen flex flex-col">
        {/* Header */}
        <header className="border-b border-slate-800 bg-slate-900/50 px-8 py-6 backdrop-blur-sm sticky top-0 z-40">
          <div className="flex justify-between items-center relative z-10 max-w-[1600px] mx-auto w-full">
            <div className="flex items-center gap-4">
              <div className="relative group">
                <div className="absolute -inset-1 bg-cyan-500 rounded-lg blur opacity-25 group-hover:opacity-50 transition duration-1000"></div>
                <img 
                  src="https://cdn-icons-png.flaticon.com/512/3067/3067260.png" 
                  alt="AutoDrive Logo" 
                  className="relative w-10 h-10 object-contain brightness-110 contrast-125"
                  referrerPolicy="no-referrer"
                />
              </div>
              <h1 className="text-xl font-bold tracking-tight text-white uppercase flex gap-2">
                AutoDrive <span className="text-cyan-500 font-light font-mono text-sm self-center tracking-[0.3em] hidden sm:inline ml-2">Digital Twin</span>
              </h1>
            </div>
              <div className="text-right border-l border-slate-800 pl-10">
                <div className="font-mono text-[9px] uppercase tracking-widest text-slate-500 mb-1">Forecast Horizon</div>
                <div className="font-mono text-xs text-slate-200">180 Days (Q3 Projection)</div>
              </div>
          </div>
        </header>

        {/* Simulator Section */}
        <section className="p-8 max-w-[1600px] mx-auto w-full flex-grow">
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4 }}
          >
            <ShockSimulator />
          </motion.div>
        </section>

        {/* Global Footer */}
        <footer className="mt-auto px-8 py-4 border-t border-slate-800 flex justify-between items-center text-[10px] font-mono text-slate-500">
          <div className="max-w-[1600px] mx-auto w-full flex justify-between">
            <div className="flex gap-6 uppercase tracking-wider">
              <span className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse" />
                MARKET FEED ACTIVE
              </span>
              <span>SIMULATION TIME: {new Date().toISOString().slice(0, 19).replace('T', ' ')}</span>
            </div>
          </div>
        </footer>

        {/* Legal Ticker Tape */}
        <div className="bg-slate-950 border-t border-slate-800 h-8 flex items-center overflow-hidden">
          <div className="animate-marquee whitespace-nowrap text-[10px] font-mono text-slate-600 uppercase flex gap-20">
            <span>LEGAL DISCLAIMER: ALL DATA PROVIDED BY THE AUTODRIVE DIGITAL TWIN IS FOR SIMULATION AND INFORMATIONAL PURPOSES ONLY.</span>
            <span>PAST PERFORMANCE OF MARKET INDICES IS NOT INDICATIVE OF FUTURE RESULTS.</span>
            <span>NO PART OF THIS VISUALIZATION CONSTITUTES FINANCIAL OR PROCUREMENT ADVICE.</span>
            <span>SUPPLY CHAIN PROJECTIONS ARE SUBJECT TO UNFORESEEN GEOPOLITICAL AND ENVIRONMENTAL VARIABLES.</span>
            {/* Duplicate for seamless looping */}
            <span>LEGAL DISCLAIMER: ALL DATA PROVIDED BY THE AUTODRIVE DIGITAL TWIN IS FOR SIMULATION AND INFORMATIONAL PURPOSES ONLY.</span>
            <span>PAST PERFORMANCE OF MARKET INDICES IS NOT INDICATIVE OF FUTURE RESULTS.</span>
            <span>NO PART OF THIS VISUALIZATION CONSTITUTES FINANCIAL OR PROCUREMENT ADVICE.</span>
            <span>SUPPLY CHAIN PROJECTIONS ARE SUBJECT TO UNFORESEEN GEOPOLITICAL AND ENVIRONMENTAL VARIABLES.</span>
          </div>
        </div>
      </main>
    </div>
  );
}
