"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';

const points = [
  {
    id: "01",
    title: "Renewable energy",
    description: "Every charge is sourced from the sun, not fossil fuels or grid peaker plants.",
    img: "/images/bg_renewable.png",
    overlay: "bg-emerald-950/80 group-hover:bg-emerald-900/60",
    text: "text-white",
    descText: "text-emerald-50",
    badge: "bg-emerald-900/80 text-emerald-400 border-emerald-500/50",
    border: "border-emerald-900"
  },
  {
    id: "02",
    title: "Cleaner mobility",
    description: "Supports a transportation network built around renewable, distributed power.",
    img: "/images/bg_clean.png",
    overlay: "bg-white/90 group-hover:bg-white/70",
    text: "text-slate-900",
    descText: "text-slate-600",
    badge: "bg-white text-emerald-500 border-slate-200 shadow-sm",
    border: "border-slate-200/80"
  },
  {
    id: "03",
    title: "Future-ready tech",
    description: "Modular battery and solar architecture designed to evolve with EV standards.",
    img: "/images/bg_future.png",
    overlay: "bg-slate-950/85 group-hover:bg-slate-900/70",
    text: "text-white",
    descText: "text-slate-300",
    badge: "bg-slate-800/90 text-white border-slate-700",
    border: "border-slate-800"
  }
];

export const Sustainability = () => {
  const [hoveredIndex, setHoveredIndex] = useState<number>(0);

  return (
    <section id="sustainability" className="py-24 md:py-32 bg-[#f8f5f0] relative overflow-hidden">
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-4xl mx-auto mb-16 md:mb-20">
          <h2 className="text-4xl md:text-5xl lg:text-[4rem] font-extrabold tracking-tight text-slate-900 mb-6 leading-[1.05]">
            Cleaner mobility, <br className="hidden md:block" />
            <span className="text-emerald-500">by design.</span>
          </h2>
          <p className="text-lg md:text-2xl text-slate-500 font-medium max-w-2xl mx-auto leading-relaxed">
            Every VAS unit is built to reduce dependency on fossil-fuel backup power and push toward renewable-first infrastructure.
          </p>
        </div>

        {/* Interactive Expansion Accordion */}
        <div className="flex flex-col lg:flex-row h-[900px] lg:h-[600px] gap-4 w-full max-w-7xl mx-auto">
          {points.map((point, i) => {
            const isHovered = hoveredIndex === i;
            
            return (
              <motion.div
                key={point.id}
                onMouseEnter={() => setHoveredIndex(i)}
                onFocus={() => setHoveredIndex(i)}
                tabIndex={0}
                layout
                initial={false}
                animate={{
                  flex: isHovered ? 3.5 : 1,
                }}
                transition={{ type: "spring", stiffness: 100, damping: 20 }}
                className={`relative rounded-[2rem] md:rounded-[2.5rem] overflow-hidden cursor-pointer border shadow-sm hover:shadow-2xl transition-shadow ${point.border} group`}
              >
                 {/* The Background Image */}
                 <div 
                   className={`absolute inset-0 bg-cover bg-center bg-no-repeat transition-transform duration-1000 ease-out group-hover:scale-110`}
                   style={{ backgroundImage: `url(${point.img})` }} 
                 />
                 
                 {/* The Color Overlay (Darkens/Lightens the image for readability) */}
                 <div className={`absolute inset-0 transition-colors duration-500 ${point.overlay}`} />

                 {/* Content Wrapper */}
                 <div className="absolute inset-0 p-6 md:p-8 lg:p-12 flex flex-col justify-end pointer-events-none z-10">
                    
                    <div className="flex flex-col w-full h-full justify-end">
                       
                       {/* Number Badge */}
                       <motion.div 
                         layout="position"
                         className={`w-12 h-12 md:w-16 md:h-16 rounded-full flex items-center justify-center shrink-0 text-lg md:text-2xl font-bold border shadow-sm mb-6 ${point.badge}`}
                       >
                         {point.id}
                       </motion.div>
                       
                       {/* Title Row (whitespace-normal allows wrapping, min-h prevents layout jumping) */}
                       <div className="min-h-[70px] md:min-h-[100px] flex items-start w-full">
                         <motion.h3 
                           layout="position" 
                           className={`text-3xl md:text-4xl lg:text-5xl font-extrabold tracking-tight whitespace-normal leading-[1.1] ${point.text}`}
                         >
                           {point.title}
                         </motion.h3>
                       </div>

                       {/* Description collapses and expands seamlessly */}
                       <div className="overflow-hidden">
                         <AnimatePresence mode="wait">
                           {isHovered && (
                             <motion.div
                               initial={{ opacity: 0, height: 0 }}
                               animate={{ opacity: 1, height: 'auto' }}
                               exit={{ opacity: 0, height: 0 }}
                               transition={{ duration: 0.3, ease: "easeOut" }}
                             >
                               <p className={`text-lg md:text-xl font-medium leading-relaxed max-w-sm mt-4 whitespace-normal ${point.descText}`}>
                                 {point.description}
                               </p>
                             </motion.div>
                           )}
                         </AnimatePresence>
                       </div>

                    </div>
                 </div>
                 
                 {/* Subtle Inner Gradient for premium depth */}
                 <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent pointer-events-none opacity-50 mix-blend-overlay" />
              </motion.div>
            )
          })}
        </div>

      </div>
    </section>
  );
};
