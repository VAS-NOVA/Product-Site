"use client";

import React from 'react';
import { Check, X } from 'lucide-react';

export const Comparison = () => {
  return (
    <section id="solution" className="py-32 bg-slate-50">
      <div className="container mx-auto px-6 md:px-12">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-6 text-slate-900">
            The VAS Difference
          </h2>
          <p className="text-lg text-slate-600">
            Traditional infrastructure is slow to deploy and relies on grid stability. We built a system that operates independently and scales instantly.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {/* Traditional */}
          <div className="p-8 rounded-3xl border border-slate-200 bg-background shadow-sm opacity-80">
            <div className="text-xl font-bold text-slate-400 mb-8 border-b border-slate-100 pb-4">Traditional Charging</div>
            <ul className="space-y-6">
              {[
                'Dependent on local grid stability',
                'High installation costs and permits',
                'Months to deploy new stations',
                '100% fossil-fuel grid reliance'
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-4">
                  <X className="w-6 h-6 text-red-500 shrink-0 mt-0.5" />
                  <span className="text-slate-600">{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* VAS */}
          <div className="p-8 rounded-3xl border-2 border-accent bg-background shadow-xl relative">
            <div className="absolute -top-4 right-8 bg-accent text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-widest">
              The Standard
            </div>
            <div className="text-xl font-bold text-slate-900 mb-8 border-b border-slate-100 pb-4 flex items-center gap-2">
              VAS Infrastructure
            </div>
            <ul className="space-y-6">
              {[
                'Independent off-grid capabilities',
                'Rapid, permit-light deployment',
                'Operational in less than 48 hours',
                '100% powered by renewable energy'
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-4">
                  <Check className="w-6 h-6 text-accent shrink-0 mt-0.5" />
                  <span className="text-slate-900 font-medium">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

