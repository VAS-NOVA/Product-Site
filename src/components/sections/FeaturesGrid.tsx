"use client";

import React from 'react';
import { Battery, Zap, Shield, Globe, Cpu, Sun } from 'lucide-react';

const features = [
  {
    icon: <Sun className="w-6 h-6" />,
    title: 'Solar Integration',
    description: 'Directly harness solar energy to power the grid or store it for peak usage.'
  },
  {
    icon: <Battery className="w-6 h-6" />,
    title: 'Smart Storage',
    description: 'Advanced lithium-ion arrays ensuring reliable backup power during grid outages.'
  },
  {
    icon: <Zap className="w-6 h-6" />,
    title: 'Fast Charging',
    description: 'Deliver up to 350kW DC fast charging capabilities for minimal wait times.'
  },
  {
    icon: <Cpu className="w-6 h-6" />,
    title: 'AI Optimization',
    description: 'Predictive algorithms manage load balancing and energy distribution dynamically.'
  },
  {
    icon: <Shield className="w-6 h-6" />,
    title: 'Maximum Safety',
    description: 'Multi-layer hardware and software fail-safes protect the grid and the vehicle.'
  },
  {
    icon: <Globe className="w-6 h-6" />,
    title: 'Remote Monitoring',
    description: 'Cloud-based dashboard for real-time analytics and predictive maintenance.'
  }
];

export const FeaturesGrid = () => {
  return (
    <section id="features" className="py-32 bg-background">
      <div className="container mx-auto px-6 md:px-12">
        <div className="mb-16 md:mb-24 text-center max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-6 text-slate-900">
            Engineered for the future of mobility.
          </h2>
          <p className="text-lg text-slate-600">
            Our infrastructure is built from the ground up to support the next generation of electric vehicles, offering unmatched reliability and sustainability.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, idx) => (
            <div 
              key={idx} 
              className="group p-8 rounded-2xl border border-slate-200 bg-slate-50 hover:bg-background hover:border-accent/50 transition-all duration-300 shadow-sm hover:shadow-xl hover:-translate-y-1"
            >
              <div className="w-12 h-12 rounded-xl bg-slate-100 flex items-center justify-center text-accent mb-6 group-hover:scale-110 transition-transform">
                {feature.icon}
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">{feature.title}</h3>
              <p className="text-slate-600 leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

