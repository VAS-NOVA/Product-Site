"use client";

import React, { useEffect, useRef } from 'react';
import { motion, useInView, animate } from 'framer-motion';

const Counter = ({ from = 0, to, duration = 2.5, suffix = "", prefix = "" }: { from?: number, to: number, duration?: number, suffix?: string, prefix?: string }) => {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  useEffect(() => {
    if (inView && ref.current) {
      const controls = animate(from, to, {
        duration,
        ease: [0.22, 1, 0.36, 1], // Cinematic ease out
        onUpdate(value) {
          if (ref.current) {
            ref.current.textContent = prefix + Math.round(value).toString() + suffix;
          }
        }
      });
      return () => controls.stop();
    }
  }, [inView, from, to, duration, prefix, suffix]);

  return <span ref={ref}>{prefix}{from}{suffix}</span>;
};

const stats = [
  { from: 0, to: 48, suffix: "%", label: "of EV owners cite range anxiety as top concern" },
  { from: 0, to: 3, suffix: "x", label: "faster adoption of EVs than charging ports" },
  { from: 0, to: 2, suffix: " hrs", label: "average wait time for traditional flatbed tow" },
  { from: 100, to: 0, suffix: "", label: "emissions produced by VAS emergency charge" },
];

export const Statistics = () => {
  return (
    <section className="py-24 md:py-32 bg-[#f8f5f0] relative overflow-hidden">
      
      {/* Background Schematic Overlay */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'radial-gradient(#000 1px, transparent 1px)', backgroundSize: '32px 32px' }} />

      <div className="container relative z-10 mx-auto px-6 md:px-12">
        
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-center max-w-4xl mx-auto mb-24 md:mb-32"
        >
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-slate-900 mb-8 leading-tight">
            Range anxiety is still the biggest brake on <span className="text-emerald-500">EV</span><br className="hidden md:block" />
            <span className="text-emerald-500 relative inline-block mt-2 md:mt-0">
              confidence.
              <div className="absolute -bottom-2 left-0 w-full h-1.5 bg-emerald-500 rounded-full" />
            </span>
          </h2>
          <p className="text-base md:text-lg text-slate-500 font-medium leading-relaxed max-w-3xl mx-auto">
            As EV adoption grows faster than charging infrastructure, drivers are left exposed in the<br className="hidden md:block" /> moments that matter most — on remote roads, far from the nearest station.
          </p>
        </motion.div>

        {/* Highly Unique Alternating Schematic Layout */}
        <div className="relative max-w-6xl mx-auto mt-16">
          
          <div className="flex flex-col md:flex-row justify-between items-center md:items-stretch relative z-10 w-full">
            {stats.map((stat, i) => {
              const isEven = i % 2 === 0;

              return (
                <div key={i} className="flex flex-col items-center w-full md:w-1/4 group mb-20 md:mb-0">
                  
                  {/* TOP SECTION */}
                  <div className="flex-1 flex flex-col justify-end pb-8">
                    {isEven ? (
                      <motion.div 
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: i * 0.15, duration: 0.5 }}
                        className="text-6xl md:text-7xl font-black text-slate-900 tracking-tight tabular-nums group-hover:text-emerald-600 transition-colors duration-500 text-center"
                      >
                        <Counter from={stat.from} to={stat.to} suffix={stat.suffix} />
                      </motion.div>
                    ) : (
                      <motion.div 
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: i * 0.15 + 0.2, duration: 0.5 }}
                        className="text-sm md:text-base font-medium text-slate-500 text-center max-w-[200px] mx-auto leading-relaxed group-hover:text-slate-700 transition-colors duration-300"
                      >
                        {stat.label}
                      </motion.div>
                    )}
                  </div>

                  {/* MIDDLE HARDWARE NODE */}
                  <div className="relative w-full h-16 items-center justify-center hidden md:flex">
                    {/* Schematic Dashed Track */}
                    <div className="absolute w-full h-[1px] border-b-2 border-dashed border-slate-300" />
                    
                    {/* Energy Pulse sweeping across */}
                    {i === 0 && (
                      <motion.div 
                        initial={{ x: "-100%" }}
                        whileInView={{ x: "400%" }}
                        viewport={{ once: true }}
                        transition={{ duration: 2.5, ease: "easeInOut", delay: 0.2 }}
                        className="absolute left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-emerald-500 to-transparent z-0"
                      />
                    )}
                    
                    {/* Advanced Spinning Node */}
                    <div className="relative flex items-center justify-center w-12 h-12 z-10">
                      {/* Outer Orbit Ring */}
                      <motion.div 
                        animate={{ rotate: 360 }}
                        transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                        className="absolute inset-0 rounded-full border-2 border-slate-200 border-t-emerald-500 border-l-emerald-500 opacity-30 group-hover:opacity-100 transition-opacity duration-500"
                      />
                      {/* Inner Glowing Core */}
                      <motion.div 
                        initial={{ scale: 0 }}
                        whileInView={{ scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ type: "spring", delay: i * 0.15 + 0.3 }}
                        className="w-3 h-3 bg-[#f8f5f0] border-2 border-slate-400 rounded-full group-hover:border-emerald-500 group-hover:bg-emerald-500 transition-all duration-300 shadow-none group-hover:shadow-[0_0_15px_rgba(16,185,129,0.8)]"
                      />
                      {/* Vertical Pin Connector to text */}
                      <div className={`absolute left-1/2 -translate-x-1/2 w-[2px] h-6 bg-slate-200 group-hover:bg-emerald-500/50 transition-colors duration-300 ${isEven ? 'bottom-[120%]' : 'top-[120%]'}`} />
                    </div>
                  </div>
                  
                  {/* Mobile Connector */}
                  <div className="md:hidden w-[2px] h-12 bg-slate-200 rounded-full relative overflow-hidden my-4">
                    <motion.div 
                      initial={{ y: "-100%" }}
                      whileInView={{ y: "100%" }}
                      transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
                      className="absolute inset-0 bg-emerald-500"
                    />
                  </div>

                  {/* BOTTOM SECTION */}
                  <div className="flex-1 flex flex-col justify-start pt-8">
                    {!isEven ? (
                      <motion.div 
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: i * 0.15, duration: 0.5 }}
                        className="text-6xl md:text-7xl font-black text-slate-900 tracking-tight tabular-nums group-hover:text-emerald-600 transition-colors duration-500 text-center"
                      >
                        <Counter from={stat.from} to={stat.to} suffix={stat.suffix} />
                      </motion.div>
                    ) : (
                      <motion.div 
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: i * 0.15 + 0.2, duration: 0.5 }}
                        className="text-sm md:text-base font-medium text-slate-500 text-center max-w-[200px] mx-auto leading-relaxed group-hover:text-slate-700 transition-colors duration-300"
                      >
                        {stat.label}
                      </motion.div>
                    )}
                  </div>

                </div>
              );
            })}
          </div>

        </div>

      </div>
    </section>
  );
};

