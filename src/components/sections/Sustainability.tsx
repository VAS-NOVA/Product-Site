"use client";

import React from 'react';
import { motion } from 'framer-motion';

export const Sustainability = () => {
  return (
    <section id="sustainability" className="py-24 md:py-32 bg-[#f8f5f0] relative overflow-hidden">
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        
        {/* Bento Box Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 md:gap-6 max-w-7xl mx-auto">
          
          {/* Main Hero Block (Spans 5 columns) */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="lg:col-span-5 flex flex-col justify-between p-8 md:p-12 lg:p-14 rounded-[2rem] md:rounded-[2.5rem] bg-emerald-500 text-white relative overflow-hidden shadow-xl transform-gpu transition-transform hover:scale-[1.01] duration-500 min-h-[400px] lg:min-h-[500px]"
          >
             {/* Decorative Background Glows */}
             <div className="absolute -top-32 -right-32 w-80 h-80 bg-emerald-400 blur-[80px] rounded-full pointer-events-none" />
             <div className="absolute -bottom-32 -left-32 w-80 h-80 bg-emerald-600 blur-[80px] rounded-full pointer-events-none" />
             
             <div className="relative z-10">
               <h2 className="text-4xl md:text-5xl lg:text-[3.5rem] font-extrabold tracking-tight mb-8 leading-[1.05]">
                 Cleaner mobility, <br />
                 <span className="text-emerald-100">by design.</span>
               </h2>
             </div>
             
             <div className="relative z-10 mt-8">
               <p className="text-lg md:text-xl text-emerald-50 font-medium opacity-95 leading-relaxed">
                 Every VAS unit is built to reduce dependency on fossil-fuel backup power, and to push the transportation ecosystem toward renewable-first infrastructure.
               </p>
             </div>
          </motion.div>

          {/* Points Blocks (Spans 7 columns) */}
          <div className="lg:col-span-7 flex flex-col gap-4 md:gap-6">
            
            {/* Top Row: 2 Columns */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6 h-full">
               
               {/* 01 Renewable Energy */}
               <motion.div 
                 initial={{ opacity: 0, y: 20 }}
                 whileInView={{ opacity: 1, y: 0 }}
                 viewport={{ once: true }}
                 transition={{ duration: 0.7, delay: 0.1, ease: "easeOut" }}
                 className="bg-white rounded-[2rem] md:rounded-[2.5rem] p-8 md:p-10 border border-slate-200/80 shadow-sm hover:shadow-xl transition-all duration-500 group flex flex-col transform-gpu hover:-translate-y-1"
               >
                  <div className="w-12 h-12 rounded-full bg-emerald-50 text-emerald-500 flex items-center justify-center font-bold mb-8 group-hover:bg-emerald-500 group-hover:text-white transition-colors duration-500 shadow-sm shrink-0">01</div>
                  <h3 className="text-2xl font-bold text-slate-900 mb-4 tracking-tight">Renewable energy</h3>
                  <p className="text-slate-500 leading-relaxed font-medium">Every charge is sourced from the sun, not fossil fuels or grid peaker plants.</p>
               </motion.div>
               
               {/* 02 Cleaner Mobility */}
               <motion.div 
                 initial={{ opacity: 0, y: 20 }}
                 whileInView={{ opacity: 1, y: 0 }}
                 viewport={{ once: true }}
                 transition={{ duration: 0.7, delay: 0.2, ease: "easeOut" }}
                 className="bg-white rounded-[2rem] md:rounded-[2.5rem] p-8 md:p-10 border border-slate-200/80 shadow-sm hover:shadow-xl transition-all duration-500 group flex flex-col transform-gpu hover:-translate-y-1"
               >
                  <div className="w-12 h-12 rounded-full bg-emerald-50 text-emerald-500 flex items-center justify-center font-bold mb-8 group-hover:bg-emerald-500 group-hover:text-white transition-colors duration-500 shadow-sm shrink-0">02</div>
                  <h3 className="text-2xl font-bold text-slate-900 mb-4 tracking-tight">Cleaner mobility</h3>
                  <p className="text-slate-500 leading-relaxed font-medium">Supports a transportation network built around renewable, distributed power.</p>
               </motion.div>

            </div>

            {/* Bottom Row: Full Width Dark Tech Block */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.3, ease: "easeOut" }}
              className="bg-slate-950 rounded-[2rem] md:rounded-[2.5rem] p-8 md:p-10 lg:p-12 flex flex-col md:flex-row items-start md:items-center gap-8 shadow-[0_20px_50px_rgba(0,0,0,0.2)] group overflow-hidden relative transform-gpu transition-all duration-500 hover:scale-[1.01]"
            >
               {/* Hover flare effect */}
               <div className="absolute -right-24 -bottom-24 w-64 h-64 bg-emerald-500/20 blur-[60px] rounded-full pointer-events-none transition-transform group-hover:scale-150 duration-700" />
               
               <div className="w-14 h-14 rounded-full bg-slate-900 text-emerald-400 border border-emerald-500/30 flex items-center justify-center font-bold shrink-0 z-10 shadow-[0_0_20px_rgba(16,185,129,0.2)]">03</div>
               <div className="z-10 relative">
                 <h3 className="text-2xl md:text-3xl font-bold text-white mb-3 tracking-tight">Future-ready tech</h3>
                 <p className="text-slate-400 text-lg leading-relaxed font-medium max-w-2xl">Modular battery and solar architecture designed to evolve directly with future EV charging standards.</p>
               </div>
            </motion.div>

          </div>

        </div>

      </div>
    </section>
  );
};
