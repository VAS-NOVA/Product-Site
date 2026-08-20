"use client";

import React from 'react';
import { motion } from 'framer-motion';

const points = [
  {
    title: "Renewable energy",
    description: "Every charge is sourced from the sun, not fossil fuels or grid peaker plants."
  },
  {
    title: "Cleaner mobility",
    description: "Supports a transportation network built around renewable, distributed power."
  },
  {
    title: "Future-ready tech",
    description: "Modular battery and solar architecture designed to evolve with EV standards."
  }
];

export const Sustainability = () => {
  return (
    <section id="sustainability" className="py-24 bg-background border-t border-slate-200 relative">
      <div className="absolute left-0 bottom-0 w-[600px] h-[600px] bg-accent/10 rounded-full blur-[120px] pointer-events-none" />
      
      <div className="container relative z-10 mx-auto px-6 md:px-12">
        <div className="flex flex-col lg:flex-row gap-16 mb-16">
          <div className="flex-1">
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-slate-900 mb-6 text-balance">
              Cleaner mobility, <br />
              <span className="text-accent">by design.</span>
            </h2>
            <p className="text-lg text-slate-600 max-w-xl text-balance">
              Every VAS unit is built to reduce dependency on fossil-fuel backup power, and to push the transportation ecosystem toward renewable-first infrastructure.
            </p>
          </div>
          
          <div className="flex-1 grid sm:grid-cols-2 gap-8">
            {points.map((point, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
                className="space-y-3"
              >
                <div className="w-10 h-10 rounded-full border border-slate-200 flex items-center justify-center text-accent font-bold mb-4 bg-slate-50">
                  0{i + 1}
                </div>
                <h3 className="text-xl font-bold text-slate-900">{point.title}</h3>
                <p className="text-slate-600 leading-relaxed">
                  {point.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

