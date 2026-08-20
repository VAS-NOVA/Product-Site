"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { Battery, Sun, Maximize2, Zap } from 'lucide-react';

const features = [
  {
    icon: <Sun className="w-8 h-8 text-black" />,
    title: "Solar-assisted charging",
    description: "Integrated solar cells trickle-charge the internal battery continuously, even while idle."
  },
  {
    icon: <Battery className="w-8 h-8 text-black" />,
    title: "Smart battery backup",
    description: "An intelligent reserve cell delivers immediate power the moment solar isn't enough."
  },
  {
    icon: <Maximize2 className="w-8 h-8 text-black" />,
    title: "Foldable, lightweight design",
    description: "Collapses to a fraction of its size — stows easily in any trunk or emergency kit."
  },
  {
    icon: <Zap className="w-8 h-8 text-black" />,
    title: "Emergency-ready deployment",
    description: "Unfold and connect in minutes — no tools, no waiting on roadside assistance."
  }
];

export const Solution = () => {
  return (
    <section id="how-it-works" className="py-24 bg-background relative border-y border-slate-200">
      <div className="container mx-auto px-6 md:px-12">
        <div className="flex flex-col md:flex-row gap-12 items-end mb-16">
          <div className="flex-1">
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-balance leading-tight text-slate-900">
              One fold-out unit. <br />
              <span className="text-slate-400">Power from the sun.</span>
            </h2>
          </div>
          <div className="flex-1 max-w-xl">
            <p className="text-lg text-slate-600">
              VAS is a portable emergency charger that unfolds in minutes, draws power from integrated solar cells, and tops up a smart battery reserve for exactly this scenario.
            </p>
          </div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              className="group p-8 rounded-3xl bg-slate-50 border border-slate-200 hover:bg-slate-900 hover:text-white transition-all duration-300 shadow-sm hover:shadow-xl"
            >
              <div className="w-16 h-16 rounded-full bg-accent flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                {feature.icon}
              </div>
              <h3 className="text-xl font-bold mb-3 group-hover:text-white text-slate-900">{feature.title}</h3>
              <p className="text-slate-500 group-hover:text-slate-300 transition-colors">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

