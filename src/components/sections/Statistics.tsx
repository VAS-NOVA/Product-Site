"use client";

import React from 'react';
import { motion } from 'framer-motion';

export const Statistics = () => {
  return (
    <section className="py-24 bg-slate-50 relative overflow-hidden border-t border-slate-200">
      <div className="absolute inset-0 bg-background opacity-50" />
      
      <div className="container relative z-10 mx-auto px-6 md:px-12 text-center">
        <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-slate-900 mb-6">
          Range anxiety is still the biggest brake on <span className="text-accent">EV confidence.</span>
        </h2>
        <p className="text-lg text-slate-600 max-w-3xl mx-auto mb-16">
          As EV adoption grows faster than charging infrastructure, drivers are left exposed in the moments that matter most — on remote roads, far from the nearest station.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { value: "48%", label: "of EV owners cite range anxiety as top concern" },
            { value: "3x", label: "faster adoption of EVs than charging ports" },
            { value: "2 hrs", label: "average wait time for traditional flatbed tow" },
            { value: "0", label: "emissions produced by VAS emergency charge" },
          ].map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.4 }}
              className="p-8 rounded-2xl bg-background shadow-sm flex flex-col items-center justify-center gap-2 border border-slate-200 hover:border-accent transition-colors"
            >
              <div className="text-5xl font-black text-slate-900">{stat.value}</div>
              <div className="text-sm font-medium text-slate-500">{stat.label}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

