"use client";

import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

// Tightly bounded slices to cut out any separator lines from the raw image and prevent drop-shadow box artifacts
const slices = [
  { id: 1, top: 1.5, bottom: 86.5, startOpen: 0.05, endOpen: 0.15, yStart: 100 }, 
  { id: 2, top: 16.5, bottom: 70.0, startOpen: 0.15, endOpen: 0.25, yStart: 80 }, 
  { id: 3, top: 30.0, bottom: 55.4, startOpen: 0.25, endOpen: 0.35, yStart: 60 }, 
  { id: 4, top: 44.6, bottom: 46.0, startOpen: 0.35, endOpen: 0.45, yStart: 45 }, 
  { id: 5, top: 55.5, bottom: 21.0, startOpen: 0.45, endOpen: 0.55, yStart: 20 }, 
  { id: 6, top: 81.0, bottom: 1.5, startOpen: 0.55, endOpen: 0.65, yStart: 0 },   
];

// Calculated to perfectly align with the exact midpoints of the image slices
const labels = [
  {
    id: 1,
    title: "1. Waterproof Top Cover",
    desc: "Durable and weather-resistant protection.",
    top: "7.6%",
    startOpen: 0.05,
    endOpen: 0.15
  },
  {
    id: 2,
    title: "2. Flexible Solar Panels",
    desc: "High-efficiency cells for rapid charging.",
    top: "23.2%",
    startOpen: 0.15,
    endOpen: 0.25
  },
  {
    id: 3,
    title: "3. Waterproof Wiring Network",
    desc: "Safe and reliable power routing.",
    top: "37.4%",
    startOpen: 0.25,
    endOpen: 0.35
  },
  {
    id: 4,
    title: "4. MPPT Charge Controller",
    desc: "Optimizes solar power conversion.",
    top: "49.2%",
    startOpen: 0.35,
    endOpen: 0.45
  },
  {
    id: 5,
    title: "5 & 6. LiFePO4 Battery & DC Module",
    desc: "Smart reserve with rapid power conversion.",
    top: "67.2%",
    startOpen: 0.45,
    endOpen: 0.55
  },
  {
    id: 6,
    title: "7. EV Charging Output",
    desc: "Universal connection to your vehicle.",
    top: "89.6%",
    startOpen: 0.55,
    endOpen: 0.65
  }
];

export const Solution = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const titleOpacity = useTransform(scrollYProgress, [0, 0.05, 1], [0, 1, 1]);
  const titleY = useTransform(scrollYProgress, [0, 0.05, 1], [20, 0, 0]);

  return (
    <section id="how-it-works" ref={containerRef} className="relative h-[400vh] bg-[#f8f5f0] border-y border-slate-200">
      <div className="sticky top-0 h-screen w-full overflow-hidden flex pt-24 pb-8 px-4 md:px-[5%]">
        
        {/* TITLE - Moved to the far right edge to prevent overlap */}
        <motion.div 
          style={{ opacity: titleOpacity, y: titleY }}
          className="absolute top-1/2 right-8 md:right-12 lg:right-[10%] -translate-y-1/2 z-50 pointer-events-none text-right"
        >
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-slate-900 tracking-tight leading-[1.1]">
            Anatomy <br className="hidden md:block" /> of VAS.
          </h2>
        </motion.div>

        {/* CAR EXPLOSION ANIMATION & LABELS */}
        {/* Pushed fully to the left side */}
        <div className="w-full h-full flex items-end justify-start relative pl-2 md:pl-12 lg:pl-24">
          
          {/* Base relative wrapper explicitly capped at 80vh height */}
          <div className="relative h-[75vh] md:h-[80vh] w-max flex items-center justify-center">
            
            {/* Invisible baseline image to stretch the container width based on the 80vh height */}
            <img 
              src="/final-car-transparent.png" 
              alt="Baseline" 
              className="h-full w-auto opacity-0 pointer-events-none"
            />

            {/* Slices that animate their y-offset */}
            {slices.map((slice) => {
              const yOffset = useTransform(
                scrollYProgress,
                [0, slice.startOpen, slice.endOpen, 1],
                [slice.yStart, slice.yStart, 0, 0]
              );
              
              const opacity = useTransform(
                scrollYProgress,
                [0, slice.startOpen, slice.endOpen, 1],
                [0, 0, 1, 1]
              );

              return (
                <motion.div
                  key={slice.id}
                  style={{ 
                    y: yOffset, 
                    opacity,
                    clipPath: `inset(${slice.top}% 0% ${slice.bottom}% 0%)` 
                  }}
                  className="absolute inset-0 h-full w-full pointer-events-none"
                >
                  <img 
                    src="/final-car-transparent.png" 
                    alt={`Slice ${slice.id}`} 
                    className="h-full w-auto object-cover"
                  />
                </motion.div>
              );
            })}

            {/* LABELS - Attached directly to the car container */}
            {labels.map((label) => {
              const opacity = useTransform(
                scrollYProgress,
                [0, label.startOpen, label.endOpen, 1],
                [0, 0, 1, 1]
              );

              const xOffset = useTransform(
                scrollYProgress,
                [0, label.startOpen, label.endOpen, 1],
                [20, 20, 0, 0]
              );

              const lineWidth = useTransform(
                scrollYProgress,
                [0, label.startOpen, label.endOpen, 1],
                ["0%", "0%", "100%", "100%"]
              );

              return (
                <motion.div 
                  key={label.id}
                  style={{ opacity, x: xOffset, top: label.top }}
                  // Locked tightly to the right side of the car, pulled slightly left
                  className="absolute left-full ml-6 md:ml-10 lg:ml-16 w-max flex flex-col -translate-y-1/2"
                >
                  
                  {/* Connecting Line pointing towards the car */}
                  <div className="absolute top-1/2 right-full mr-3 md:mr-4 w-6 md:w-12 h-[2px] bg-slate-200 -translate-y-1/2">
                    <motion.div 
                      style={{ width: lineWidth }}
                      className="absolute left-0 top-0 h-full bg-emerald-500 origin-left"
                    />
                  </div>

                  <div className="text-left relative">
                    <h3 className="text-sm md:text-base lg:text-lg font-bold text-slate-900 tracking-wide leading-tight whitespace-nowrap">{label.title}</h3>
                  </div>

                </motion.div>
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
};

