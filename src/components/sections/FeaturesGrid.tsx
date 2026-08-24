"use client";

import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useMotionTemplate, useSpring } from 'framer-motion';
import { Battery, Zap, Shield, Globe, Cpu, Sun } from 'lucide-react';

const features = [
  {
    icon: <Sun className="w-10 h-10 md:w-12 md:h-12 text-emerald-500" />,
    title: 'Solar Integration',
    description: 'Directly harness solar energy to power the grid or store it for peak usage with industry-leading efficiency.',
  },
  {
    icon: <Battery className="w-10 h-10 md:w-12 md:h-12 text-emerald-500" />,
    title: 'Smart Storage',
    description: 'Advanced lithium-ion arrays ensuring reliable backup power during grid outages.',
  },
  {
    icon: <Zap className="w-10 h-10 md:w-12 md:h-12 text-emerald-500" />,
    title: 'Fast Charging',
    description: 'Deliver up to 350kW DC fast charging capabilities for minimal wait times.',
  },
  {
    icon: <Cpu className="w-10 h-10 md:w-12 md:h-12 text-emerald-500" />,
    title: 'AI Optimization',
    description: 'Predictive algorithms manage load balancing and energy distribution dynamically.',
  },
  {
    icon: <Shield className="w-10 h-10 md:w-12 md:h-12 text-emerald-500" />,
    title: 'Maximum Safety',
    description: 'Multi-layer hardware and software fail-safes protect the grid and the vehicle.',
  },
  {
    icon: <Globe className="w-10 h-10 md:w-12 md:h-12 text-emerald-500" />,
    title: 'Remote Monitoring',
    description: 'Cloud-based dashboard for real-time analytics, predictive maintenance, and fleet management.',
  }
];

// Added 3D rotation offsets for a much more spatial, tumbling constellation effect
const constellationPoints = [
  { x: "0vw", y: "0vh", flyX: "-40vw", flyY: "-30vh", rotX: "0deg", rotY: "0deg", flyRotX: "40deg", flyRotY: "-40deg" }, 
  { x: "25vw", y: "-20vh", flyX: "60vw", flyY: "-50vh", rotX: "15deg", rotY: "-25deg", flyRotX: "-30deg", flyRotY: "60deg" }, 
  { x: "-25vw", y: "25vh", flyX: "-60vw", flyY: "50vh", rotX: "-20deg", rotY: "25deg", flyRotX: "45deg", flyRotY: "-50deg" }, 
  { x: "30vw", y: "20vh", flyX: "60vw", flyY: "40vh", rotX: "-15deg", rotY: "-30deg", flyRotX: "30deg", flyRotY: "50deg" }, 
  { x: "-10vw", y: "-30vh", flyX: "-20vw", flyY: "-60vh", rotX: "25deg", rotY: "15deg", flyRotX: "-50deg", flyRotY: "30deg" }, 
  { x: "-25vw", y: "-10vh", flyX: "-60vw", flyY: "-20vh", rotX: "10deg", rotY: "25deg", flyRotX: "20deg", flyRotY: "-60deg" } 
];

const getCardTransforms = (i: number, total: number, point: any) => {
  const t = total - 1; 
  const W = 1 / t; 
  const hold = W * 0.15; 
  const C = i * W; 

  let input: number[] = [];
  let scaleOutput: number[] = [];
  let opacityOutput: number[] = [];
  let xOutput: string[] = [];
  let yOutput: string[] = [];
  let rotateXOutput: string[] = [];
  let rotateYOutput: string[] = [];

  const addState = (prog: number, scale: number, opacity: number, x: string, y: string, rx: string, ry: string) => {
    input.push(prog);
    scaleOutput.push(scale);
    opacityOutput.push(opacity);
    xOutput.push(x);
    yOutput.push(y);
    rotateXOutput.push(rx);
    rotateYOutput.push(ry);
  };

  // 1. Deep space
  if (i > 1) {
    addState(0, 0.05, 0, point.x, point.y, point.rotX, point.rotY);
  }

  // 2. Waiting in the background
  if (i > 0) {
    addState(Math.max(0, C - W), 0.35, 0.4, point.x, point.y, point.rotX, point.rotY);
  }

  // 3. Arrives at the camera (Hold Start - Flattens out perfectly to read)
  addState(Math.max(0, C - hold), 1, 1, "0vw", "0vh", "0deg", "0deg");

  // 4. Departs the camera (Hold End)
  if (C + hold < 1) {
    addState(Math.min(1, C + hold), 1, 1, "0vw", "0vh", "0deg", "0deg");
  } else if (i === t) {
    addState(1, 1, 1, "0vw", "0vh", "0deg", "0deg");
  }

  // 5. Blown past the camera
  if (i < t) {
    addState(Math.min(1, C + W), 3.5, 0, point.flyX, point.flyY, point.flyRotX, point.flyRotY);
  }

  // 6. Way passed
  if (i < t - 1) {
    addState(1, 4, 0, point.flyX, point.flyY, point.flyRotX, point.flyRotY);
  }

  return { input, scaleOutput, opacityOutput, xOutput, yOutput, rotateXOutput, rotateYOutput };
}

const FlyCard = ({ feature, i, progress, total }: any) => {
  const point = constellationPoints[i];
  const { input, scaleOutput, opacityOutput, xOutput, yOutput, rotateXOutput, rotateYOutput } = getCardTransforms(i, total, point);

  const scale = useTransform(progress, input, scaleOutput);
  const opacity = useTransform(progress, input, opacityOutput);
  const x = useTransform(progress, input, xOutput);
  const y = useTransform(progress, input, yOutput);
  const rotateX = useTransform(progress, input, rotateXOutput);
  const rotateY = useTransform(progress, input, rotateYOutput);

  return (
    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
      <motion.div 
        style={{ 
          scale,
          opacity,
          x,
          y,
          rotateX,
          rotateY,
          zIndex: total - i, 
        }}
        className="w-[85vw] md:w-[700px] lg:w-[850px] bg-white/95 rounded-[2.5rem] p-8 md:p-12 shadow-[0_30px_100px_rgba(0,0,0,0.08)] border border-slate-100 flex flex-col md:flex-row gap-8 md:gap-12 items-center pointer-events-auto will-change-transform"
      >
        <div className="shrink-0 w-24 h-24 md:w-32 md:h-32 rounded-[2rem] bg-slate-50 flex items-center justify-center border border-slate-100 shadow-inner">
          {feature.icon}
        </div>
        
        <div className="text-center md:text-left">
          <h3 className="text-3xl md:text-5xl font-extrabold text-slate-900 mb-4 tracking-tight">
            {feature.title}
          </h3>
          <p className="text-lg md:text-xl text-slate-500 leading-relaxed font-medium">
            {feature.description}
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export const FeaturesGrid = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  return (
    <section ref={containerRef} id="features" className="relative bg-[#f8f5f0] h-[600vh]">
      <div className="sticky top-0 h-screen w-full flex flex-col items-center justify-center overflow-hidden">
        
        <div className="absolute top-8 md:top-16 z-[100] pointer-events-none">
          <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight text-slate-900 leading-[1.1] text-center shadow-sm bg-white/70 backdrop-blur-xl px-8 py-4 rounded-full border border-white">
            Engineered for the <span className="text-emerald-500">future.</span>
          </h2>
        </div>

        {/* 1000px perspective gives the tumbling 3D cards a deep spatial warp */}
        <div className="relative w-full h-full flex items-center justify-center perspective-[1000px] transform-style-[preserve-3d]">
          {features.map((feature, i) => (
            <FlyCard 
              key={i} 
              i={i} 
              feature={feature} 
              progress={scrollYProgress} 
              total={features.length} 
            />
          ))}
        </div>
        
      </div>
    </section>
  );
};
