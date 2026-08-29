"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/Button';
import Image from 'next/image';
import { ArrowUpRight } from 'lucide-react';

export const VisionQuote = () => {
  return (
    <section className="py-24 md:py-32 relative bg-[#f8f5f0]">
      <div className="container mx-auto px-4 md:px-6">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="max-w-6xl mx-auto bg-white rounded-[2.5rem] md:rounded-[3rem] overflow-hidden shadow-xl border border-slate-200/60 flex flex-col md:flex-row relative"
        >
          {/* Left Column - Content */}
          <div className="w-full md:w-[55%] p-10 md:p-16 lg:p-20 flex flex-col justify-center relative z-10">
            <h2 className="text-4xl md:text-5xl lg:text-[3.5rem] font-bold tracking-tight text-slate-900 mb-6 leading-[1.1]">
              Ready to power <br />
              your <span className="text-emerald-500">journey?</span>
            </h2>
            <p className="text-lg md:text-xl text-slate-500 mb-10 max-w-md leading-relaxed font-medium">
              Our vision is to make emergency EV charging accessible anywhere, accelerating the transition toward a sustainable transportation ecosystem.
            </p>
            
            <div>
              <a href="mailto:hello@vas-energy.com" className="inline-block relative group">
                {/* Glowing drop shadow specifically matching the screenshot's button glow */}
                <div className="absolute -inset-1 bg-emerald-500/80 rounded-full blur-md opacity-20 group-hover:opacity-40 transition duration-500" />
                
                <Button 
                  variant="solid" 
                  size="lg" 
                  className="relative px-8 py-6 rounded-full text-lg font-bold shadow-none transition-transform hover:scale-105 flex items-center gap-3 bg-emerald-500 text-white hover:bg-emerald-600"
                >
                  Get in Touch
                  <ArrowUpRight className="w-5 h-5 stroke-[2.5]" />
                </Button>
              </a>
            </div>
          </div>

          {/* Right Column - Image */}
          <div className="w-full md:w-[45%] relative min-h-[350px] md:min-h-full border-t md:border-t-0 md:border-l border-slate-100">
             <Image 
               src="/images/cta_image.png"
               alt="VAS Mobile Dashboard"
               fill
               className="object-cover object-center"
             />
             {/* A subtle vignette to make the image blend perfectly into the light container */}
             <div className="absolute inset-0 bg-gradient-to-tr from-black/5 to-transparent pointer-events-none" />
          </div>
          
        </motion.div>
      </div>
    </section>
  );
};
