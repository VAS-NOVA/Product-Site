"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { Leaf, Sun, Zap, ShieldAlert } from 'lucide-react';

const values = [
  {
    icon: <Leaf className="w-6 h-6 text-accent" />,
    title: "Sustainability first",
    description: "Every charge drawn from the sun, not the grid."
  },
  {
    icon: <Sun className="w-6 h-6 text-accent" />,
    title: "Renewable by design",
    description: "Solar isn't an add-on — it's the core power source."
  },
  {
    icon: <Zap className="w-6 h-6 text-accent" />,
    title: "Built for the EV future",
    description: "Infrastructure that scales as adoption accelerates."
  },
  {
    icon: <ShieldAlert className="w-6 h-6 text-accent" />,
    title: "Engineered for emergencies",
    description: "Fold-out, lightweight, ready in minutes."
  }
];

export const About = () => {
  return (
    <section id="about" className="py-24 bg-background">
      <div className="container mx-auto px-6 md:px-12">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          
          <div className="space-y-6">
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-balance text-slate-900">
              We pair renewable solar energy with intelligent battery systems.
            </h2>
            <p className="text-lg text-slate-600">
              VAS is engineered for the moment an EV runs out of charge far from the nearest station. A single portable unit that bridges the gap.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 gap-8">
            {values.map((value, index) => (
              <motion.div 
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                className="space-y-4 p-6 rounded-2xl bg-slate-50 border border-slate-200 hover:shadow-lg transition-shadow"
              >
                <div className="w-12 h-12 rounded-xl bg-slate-100 flex items-center justify-center">
                  {value.icon}
                </div>
                <h3 className="text-xl font-bold text-slate-900">{value.title}</h3>
                <p className="text-slate-600 leading-relaxed">
                  {value.description}
                </p>
              </motion.div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
};

