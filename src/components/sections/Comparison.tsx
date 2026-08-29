"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2, XCircle } from 'lucide-react';

const comparisons = [
  {
    problem: 'Dependent on local grid stability',
    solution: 'Independent off-grid capabilities'
  },
  {
    problem: 'High installation costs and permits',
    solution: 'Rapid, permit-light deployment'
  },
  {
    problem: 'Months to deploy new stations',
    solution: 'Operational in less than 48 hours'
  },
  {
    problem: '100% fossil-fuel grid reliance',
    solution: '100% powered by renewable energy'
  }
];

export const Comparison = () => {
  return (
    <section id="solution" className="py-24 md:py-32 bg-[#f8f5f0] relative overflow-x-hidden">
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 md:mb-24">
          <h2 className="text-3xl md:text-5xl lg:text-6xl font-extrabold tracking-tight mb-6 text-slate-900">
            There’s a smarter way to <br className="hidden md:block"/> power the future.
          </h2>
        </div>

        {/* The Comparison Container */}
        <div className="max-w-6xl mx-auto bg-white rounded-[2.5rem] md:rounded-[3rem] border border-slate-200/80 shadow-sm flex flex-col md:flex-row relative">
          
          {/* Left Column - Traditional (Static) */}
          <div className="w-full md:w-1/2 p-8 md:p-12 lg:p-16 flex flex-col justify-center relative z-0">
             <h3 className="text-2xl md:text-3xl font-bold text-slate-800 mb-8 md:mb-10">Traditional Charging</h3>
             <ul className="space-y-6 md:space-y-8">
               {comparisons.map((item, i) => (
                 <li key={i} className="flex items-start gap-4">
                    <XCircle className="w-6 h-6 shrink-0 mt-0.5 text-slate-400 stroke-[1.5]" />
                    <span className="text-lg md:text-xl text-slate-500 leading-snug">{item.problem}</span>
                 </li>
               ))}
             </ul>
          </div>

          {/* Right Column - VAS Card (Slides in from outside) */}
          <motion.div 
             initial={{ x: "100%", opacity: 0 }}
             whileInView={{ x: 0, opacity: 1 }}
             viewport={{ once: true, margin: "-100px" }}
             transition={{ type: "spring", stiffness: 40, damping: 20, delay: 0.1 }}
             className="w-full md:w-1/2 p-3 md:p-4 lg:p-5 relative z-10"
          >
             {/* The actual premium card */}
             <div className="w-full h-full bg-slate-950 rounded-[2rem] md:rounded-[2.5rem] p-8 md:p-10 lg:p-12 shadow-[0_20px_50px_rgba(0,0,0,0.3)] flex flex-col justify-center relative overflow-hidden">
                
                <h3 className="text-2xl md:text-3xl font-bold text-white mb-8 md:mb-10 flex items-center justify-between">
                  VAS Infrastructure
                  <span className="bg-emerald-500/20 text-emerald-400 text-[10px] md:text-xs font-bold px-3 py-1.5 md:px-4 md:py-2 rounded-full uppercase tracking-widest border border-emerald-500/30">
                    The Standard
                  </span>
                </h3>
                
                <ul className="space-y-6 md:space-y-8 relative z-10">
                   {comparisons.map((item, i) => (
                     <li key={i} className="flex items-start gap-4">
                        <CheckCircle2 className="w-6 h-6 shrink-0 mt-0.5 text-emerald-500 stroke-[2]" />
                        <span className="text-lg md:text-xl text-slate-300 font-medium leading-snug">{item.solution}</span>
                     </li>
                   ))}
                </ul>

                {/* Subtle background glow effect */}
                <div className="absolute -bottom-24 -right-24 w-64 h-64 bg-emerald-500/10 blur-[80px] rounded-full pointer-events-none" />
             </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};
