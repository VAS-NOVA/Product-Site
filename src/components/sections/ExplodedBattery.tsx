'use client';

import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

// Recalculated label positions based on 85% scaled canvas shifted down by 10%
const layers = [
  {
    id: 1,
    name: "TOP INSULATION PLATE",
    desc: "Heat & shock resistant",
    src: "/layer-1-top-plate.png?v=3",
    labelTop: "7.6%", 
    startOpen: 0.1,
    endOpen: 0.15,
  },
  {
    id: 2,
    name: "COPPER BUSBARS",
    desc: "High conductivity current distribution",
    src: "/layer-2-busbars.png?v=3",
    labelTop: "18.7%", 
    startOpen: 0.2,
    endOpen: 0.25,
  },
  {
    id: 3,
    name: "CELL HOLDER",
    desc: "Securely holds cells in place",
    src: "/layer-3-cell-holder.png?v=3",
    labelTop: "32.9%", 
    startOpen: 0.3,
    endOpen: 0.35,
  },
  {
    id: 4,
    name: <>LiFePO<sub>4</sub> CELLS</>,
    desc: "High performance 32700 cells",
    src: "/layer-4-cells.png?v=3",
    labelTop: "52.5%", 
    startOpen: 0.4,
    endOpen: 0.45,
  },
  {
    id: 5,
    name: "BMS & CONTROL BOARD",
    desc: "Monitoring, balancing & protection",
    src: "/layer-5-bms.png?v=3",
    labelTop: "72.1%", 
    startOpen: 0.5,
    endOpen: 0.55,
  },
  {
    id: 6,
    name: "BOTTOM PLATE",
    desc: "Impact resistant base structure",
    src: "/layer-6-bottom-plate.png?v=3",
    labelTop: "90.3%", 
    startOpen: 0.6,
    endOpen: 0.65,
  }
];

export function ExplodedBattery() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Scroll tracking
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const titleOpacity = useTransform(scrollYProgress, [0, 0.05, 1], [0, 1, 1]);
  const titleY = useTransform(scrollYProgress, [0, 0.05, 1], [20, 0, 0]);
  
  return (
    <section ref={containerRef} className="relative h-[400vh] bg-[#f8f5f0]">
      <div className="sticky top-0 h-screen w-full overflow-hidden flex items-center justify-center">
        
        {/* Title and Narrative Text positioned on the right side */}
        <motion.div 
          style={{ opacity: titleOpacity, y: titleY }}
          className="absolute top-[18%] right-6 md:right-[5%] w-[45%] md:w-[25%] z-50 pointer-events-none text-right"
        >
          <h2 className="text-3xl md:text-5xl font-extrabold text-slate-900 tracking-tight">
            ENGINEERED TO LAST
          </h2>
          
          <p className="mt-6 text-sm md:text-base text-slate-600 leading-relaxed max-w-xs ml-auto">
            Meticulously crafted from the cell level up. Our architecture guarantees unparalleled thermal stability, maximizing lifespan and safety under the harshest conditions.
          </p>

          <div className="mt-8 flex justify-end pointer-events-auto">
            <button className="group flex items-center gap-3 bg-slate-900 hover:bg-slate-800 text-white px-6 py-3 rounded-full text-sm font-bold tracking-wide uppercase transition-all duration-300 shadow-lg shadow-slate-900/20">
              View Datasheet
              <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </button>
          </div>
        </motion.div>

        <div className="relative w-full max-w-7xl h-full flex items-center justify-center z-10">
          
          {layers.map((layer) => {
            
            const opacity = useTransform(
              scrollYProgress,
              [0, layer.startOpen, layer.endOpen, 1],
              [0, 0, 1, 1]
            );

            const yOffset = useTransform(
              scrollYProgress,
              [0, layer.startOpen, layer.endOpen, 1],
              [40, 40, 0, 0]
            );

            const lineWidth = useTransform(
              scrollYProgress,
              [0, layer.startOpen, layer.endOpen, 1],
              ["0%", "0%", "100%", "100%"]
            );

            return (
              <motion.div
                key={layer.id}
                // Wrapper shifted down by 10% to avoid Navbar, and right-padding added to shift battery left!
                className="absolute inset-0 top-[10%] h-[85%] flex items-center justify-center w-full pointer-events-none md:pr-[12%]"
              >
                
                <motion.div 
                  style={{ opacity, y: yOffset }}
                  className="relative w-full md:w-[60%] h-full flex items-center justify-center"
                >
                  <img 
                    src={layer.src} 
                    alt={typeof layer.name === 'string' ? layer.name : "LiFePO4 CELLS"}
                    className="w-full h-full object-contain"
                  />
                </motion.div>

                {/* Text Labels completely on the left side, precisely centered vertically on the piece */}
                <motion.div 
                  style={{ opacity, y: yOffset, top: layer.labelTop }}
                  className="absolute left-4 md:left-[2%] w-[45%] md:w-[35%] flex flex-col -translate-y-1/2"
                >
                  <div className="flex items-center gap-4 flex-row">
                    
                    <div className="text-left">
                      <h3 className="text-sm md:text-base font-bold text-slate-900 tracking-wider">{layer.name}</h3>
                      <p className="text-[10px] md:text-xs text-slate-500 mt-1">{layer.desc}</p>
                    </div>

                    <div className="hidden md:block flex-grow h-[1px] bg-slate-300 relative ml-4 max-w-[150px]">
                        <motion.div 
                            style={{ width: lineWidth }}
                            className="absolute top-0 left-0 h-full bg-green-500"
                        />
                    </div>

                  </div>
                </motion.div>

              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
