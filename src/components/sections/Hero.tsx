"use client";

import React from 'react';
import { Button } from '@/components/ui/Button';
import { motion } from 'framer-motion';
import { HexagonBackground } from '@/components/ui/HexagonBackground';
import { ArrowRight, Zap } from 'lucide-react';

export const Hero = () => {
  return (
    <section id="top" className="relative min-h-screen w-full overflow-hidden bg-background flex flex-col lg:block pt-32 pb-16 lg:pt-0 lg:pb-0">
      
      {/* Interactive Hexagon Base */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <HexagonBackground />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-background/50" />
      </div>

      {/* Top Left Zone: Logo */}
      <div className="absolute top-0 left-6 lg:left-8 xl:left-12 z-40">
        <img src="/vas-logo-transparent.png" alt="VAS NOVA Logo - Vision for Advanced Sustainability" className="w-28 md:w-36 h-auto object-contain drop-shadow-sm" />
      </div>

      {/* Top Left Zone: Headline */}
      <motion.div 
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 1, ease: "easeOut" }}
        className="relative lg:absolute lg:top-24 xl:top-32 lg:left-0 xl:left-4 max-w-sm z-30 px-6 lg:px-4 w-full lg:w-auto mb-12 lg:mb-0"
      >
        <h1 className="text-5xl md:text-7xl lg:text-[6rem] font-extrabold tracking-tight text-slate-900 leading-[1]">
          <span className="sr-only">VAS NOVA — Solar-Powered Emergency EV Charging. </span>
          &ldquo;Forge <br/>
          <span className="relative inline-block mt-2">
            <span className="relative z-10 text-transparent bg-clip-text bg-gradient-to-r from-accent via-cyan-400 to-accent-hover">
              Onward&rdquo;
            </span>
          </span>
        </h1>
      </motion.div>

      {/* Center Zone: 3D Model Image */}
      <div className="relative lg:absolute lg:top-1/2 lg:left-1/2 lg:-translate-x-1/2 lg:-translate-y-1/2 w-full lg:w-[60vw] lg:max-w-[900px] h-[400px] lg:h-[600px] pointer-events-none z-10 flex items-center justify-center my-4 lg:my-0 shrink-0">
        <img 
          src="/vas-nova-cutout.png"
          alt="VAS NOVA Solar-Powered Emergency EV Charger Prototype - Portable clean energy infrastructure"
          className="w-full h-full object-contain"
        />
      </div>

      {/* Bottom Right Zone: Description */}
      <motion.div 
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 1, delay: 0.5, ease: "easeOut" }}
        className="relative lg:absolute lg:bottom-24 lg:right-6 xl:right-16 max-w-[280px] z-20 px-6 md:px-0 w-full lg:w-auto flex flex-col lg:items-end text-left lg:text-right mt-auto pb-24 lg:pb-0"
      >
        <p className="text-base md:text-lg text-black mb-2 leading-tight text-balance font-bold">
          Sever the cord. Portable solar backup for your EV.
        </p>
        <p className="text-xs md:text-sm text-slate-700 leading-snug font-medium">
          VAS NOVA develops emergency clean-energy infrastructure.
        </p>
      </motion.div>
      
    </section>
  );
};
