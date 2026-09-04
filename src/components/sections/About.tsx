"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { Leaf, Sun, Zap, ShieldAlert } from 'lucide-react';
import { GradientWaves } from '@/components/ui/GradientWaves';

const values = [
  {
    icon: <Leaf className="w-6 h-6 text-emerald-600" />,
    bgIcon: <Leaf className="absolute -top-12 -right-8 w-64 h-64 text-slate-900/[0.03] -rotate-12 group-hover:text-emerald-500 group-hover:opacity-10 transition-all duration-700 pointer-events-none group-hover:scale-110 z-10" />,
    title: "Sustainability First",
    description: "Every charge drawn from the sun, not the grid. We are building a future where emergency power doesn't mean burning fossil fuels.",
    className: "md:col-span-2 md:row-span-1",
  },
  {
    icon: <Sun className="w-6 h-6 text-emerald-600" />,
    bgIcon: <Sun className="absolute -top-12 -right-12 w-56 h-56 text-slate-900/[0.03] rotate-45 group-hover:text-emerald-500 group-hover:opacity-10 transition-all duration-700 pointer-events-none group-hover:rotate-90 z-10" />,
    title: "Renewable Core",
    description: "Solar isn't an add-on - it's the foundation of our architecture.",
    className: "md:col-span-1",
  },
  {
    icon: <Zap className="w-6 h-6 text-emerald-600" />,
    bgIcon: <Zap className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 text-slate-900/[0.03] group-hover:text-emerald-500 group-hover:opacity-10 transition-all duration-700 pointer-events-none group-hover:scale-125 z-10" />,
    title: "EV Future-Proof",
    description: "High-density architecture that scales seamlessly as EV battery capacities expand.",
    className: "md:col-span-1",
  },
  {
    icon: <ShieldAlert className="w-6 h-6 text-emerald-600" />,
    bgIcon: <ShieldAlert className="absolute -bottom-8 -left-8 w-64 h-64 text-slate-900/[0.03] rotate-12 group-hover:text-emerald-500 group-hover:opacity-10 transition-all duration-700 pointer-events-none group-hover:-rotate-12 z-10" />,
    title: "Engineered for Emergencies",
    description: "Fold-out, lightweight, and deployment-ready in under 60 seconds. When you are stranded, time is everything.",
    className: "md:col-span-2 md:row-span-1",
  }
];

export const About = () => {
  return (
    <section id="about" className="py-32 bg-[#f8f5f0] relative overflow-hidden">
      
      <div className="container mx-auto px-6 md:px-12 relative z-10">
        
        {/* Section Header */}
        <div className="max-w-4xl mb-24 relative">
          
          {/* Subtle background decoration */}
          <div className="absolute -top-12 -left-12 w-48 h-48 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl lg:text-7xl font-extrabold tracking-tight text-balance mb-8 leading-[1.05] text-slate-900 relative z-10"
          >
            <span className="block text-xl md:text-2xl text-emerald-600 font-bold tracking-widest uppercase mb-4">About VAS NOVA</span>
            We pair <span className="relative inline-block whitespace-nowrap">
              <span className="relative z-10 text-transparent bg-clip-text bg-gradient-to-r from-emerald-500 via-emerald-400 to-cyan-500 px-2">renewable solar</span>
              
              {/* Realistic rough brush stroke (Black, sits behind text, strictly bounded, tilted) */}
              <svg 
                className="absolute top-1/2 left-[5%] -translate-y-1/2 w-[90%] h-[130%] text-slate-900 z-0 pointer-events-none drop-shadow-sm -rotate-3" 
                viewBox="0 0 200 60" 
                preserveAspectRatio="none" 
                fill="currentColor"
              >
                <defs>
                  <filter id="rough-brush" x="-10%" y="-10%" width="120%" height="120%">
                    <feTurbulence type="fractalNoise" baseFrequency="0.1 0.4" numOctaves="3" result="noise" />
                    <feDisplacementMap in="SourceGraphic" in2="noise" scale="5" xChannelSelector="R" yChannelSelector="G" />
                  </filter>
                </defs>
                <motion.path 
                  initial={{ scaleX: 0 }}
                  whileInView={{ scaleX: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
                  style={{ transformOrigin: "left" }}
                  filter="url(#rough-brush)"
                  d="M 5 18 C 15 15, 40 18, 80 16 C 120 14, 160 18, 185 15 C 190 14, 195 20, 192 28 C 195 32, 190 38, 185 40 C 150 45, 110 42, 70 45 C 30 48, 15 42, 5 38 C 2 35, 2 25, 5 18 Z"
                />
              </svg>
            </span> with intelligent battery systems.
          </motion.h2>
          
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="relative pl-6 md:pl-8 border-l-4 border-emerald-500 max-w-2xl z-10"
          >
            <p className="text-lg md:text-xl text-slate-600 font-medium leading-relaxed">
              VAS is engineered for the exact moment an EV runs out of charge far from the nearest station. A single, deployable unit that bridges the gap between stranded and moving.
            </p>
          </motion.div>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 md:gap-6 auto-rows-auto md:auto-rows-[240px]">
          {values.map((value, index) => {
            const isEven = index % 2 === 0;
            
            // Outer radius
            const outerRounded = isEven 
              ? "rounded-tl-[2.5rem] rounded-br-[2.5rem] rounded-tr-xl rounded-bl-xl" 
              : "rounded-tr-[2.5rem] rounded-bl-[2.5rem] rounded-tl-xl rounded-br-xl";
            
            // Inner radius mathematically adjusted by the exact 2px padding to prevent anti-aliasing gaps
            const innerRounded = isEven
              ? "rounded-tl-[calc(2.5rem-2px)] rounded-br-[calc(2.5rem-2px)] rounded-tr-[calc(0.75rem-2px)] rounded-bl-[calc(0.75rem-2px)]"
              : "rounded-tr-[calc(2.5rem-2px)] rounded-bl-[calc(2.5rem-2px)] rounded-tl-[calc(0.75rem-2px)] rounded-br-[calc(0.75rem-2px)]";

            return (
              <motion.div 
                key={index}
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                whileInView={{ opacity: 1, scale: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                className={`group relative overflow-hidden ${outerRounded} p-[2px] transition-all duration-500 shadow-md shadow-slate-200/50 hover:shadow-xl hover:shadow-emerald-500/20 ${value.className}`}
              >
                
                {/* Static base border color */}
                <div className="absolute inset-0 bg-slate-200 z-0" />

                {/* Highly visible Moving Green Border Glow */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[200%] h-[200%] z-0 opacity-80 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none">
                  <div 
                    className="w-full h-full animate-spin"
                    style={{
                      background: 'conic-gradient(from 0deg at 50% 50%, transparent 0%, transparent 50%, #6ee7b7 80%, #059669 100%)',
                      animationDuration: '3.5s' 
                    }}
                  />
                </div>

                {/* Inner Card Frame */}
                <div className={`relative z-10 w-full h-full bg-white flex flex-col justify-end overflow-hidden ${innerRounded}`}>
                  
                  {/* Massive background icon */}
                  {value.bgIcon}

                  {/* Restored Waves with proper Fog Depth and Masking */}
                  <div 
                    className="absolute inset-0 z-0 opacity-30 group-hover:opacity-60 transition-opacity duration-700 pointer-events-auto"
                    style={{
                      maskImage: 'linear-gradient(to bottom, transparent 0%, transparent 15%, black 75%)',
                      WebkitMaskImage: 'linear-gradient(to bottom, transparent 0%, transparent 15%, black 75%)'
                    }}
                  >
                    <GradientWaves
                      horizonColor="#ffffff"
                      waveColor="#34d399" 
                      crestColor="#10b981" 
                      speed={0.4 + (index * 0.1)} 
                      amplitude={2.5}
                      waveScale={1.2}
                      height={4.5} 
                      fogDepth={25} // Restored to 25 so it doesn't look like a solid spherical blob
                      opacity={1.0}
                    />
                  </div>
                  
                  {/* Actual Content Wrapper */}
                  <div className="relative z-20 flex flex-col h-full p-8 pointer-events-none">
                    <div className="mb-auto">
                      <div className="w-12 h-12 rounded-xl bg-white/90 backdrop-blur-sm border border-slate-100 flex items-center justify-center shadow-sm shadow-slate-200 group-hover:scale-110 transition-transform duration-500 group-hover:border-emerald-300 group-hover:shadow-emerald-500/20">
                        {value.icon}
                      </div>
                    </div>
                    
                    {/* Removed blurred box, text sits cleanly directly on the waves */}
                    <div className="mt-6">
                      <h3 className="text-xl md:text-2xl font-bold text-slate-900 mb-1 tracking-tight group-hover:text-emerald-700 transition-colors duration-500">{value.title}</h3>
                      <p className="text-slate-600 leading-relaxed font-medium text-sm">
                        {value.description}
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
};

