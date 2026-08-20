"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/Button';

export const VisionQuote = () => {
  return (
    <section className="py-32 relative flex items-center justify-center border-t border-slate-200 bg-slate-50">
      <div className="absolute inset-0 bg-background opacity-50" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-accent/5 rounded-full blur-[150px] pointer-events-none" />
      
      <div className="container relative z-10 mx-auto px-6 md:px-12">
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl mx-auto text-center bg-background p-12 md:p-20 rounded-3xl border border-slate-200 relative overflow-hidden shadow-xl shadow-slate-200/50"
        >
          <h2 className="text-4xl md:text-6xl font-black tracking-tight text-slate-900 mb-8 relative z-10">
            Power Every <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent to-accent-hover">Journey.</span>
          </h2>
          <p className="text-xl text-slate-600 mb-12 max-w-2xl mx-auto text-balance relative z-10">
            Our vision is to make emergency EV charging accessible anywhere, while accelerating the transition toward a sustainable transportation ecosystem. Join us in redefining sustainable mobility.
          </p>
          
          <div className="relative z-10">
            <a href="mailto:hello@vas-energy.com">
              <Button variant="solid" size="lg" className="px-12 py-6 text-lg font-bold shadow-xl shadow-accent/20 hover:scale-105 transition-transform">
                Get in Touch
              </Button>
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

