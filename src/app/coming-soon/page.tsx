"use client";

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

const InstagramIcon = (props: any) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5"/>
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/>
  </svg>
);

const TwitterIcon = (props: any) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M4 4l11.733 16h4.267l-11.733 -16z" />
    <path d="M4 20l6.768 -6.768m2.46 -2.46l6.772 -6.772" />
  </svg>
);

const LinkedinIcon = (props: any) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/>
    <rect width="4" height="12" x="2" y="9"/>
    <circle cx="4" cy="4" r="2"/>
  </svg>
);

export default function ComingSoon() {
  return (
    <div className="h-screen w-screen bg-[#f8f5f0] flex relative overflow-hidden">
      
      {/* Background ambient glow */}
      <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-emerald-500/5 rounded-full blur-[150px] pointer-events-none" />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col md:flex-row relative z-10 w-full max-w-[1600px] mx-auto h-full">
        
        {/* Left Content */}
        <div className="w-full md:w-[45%] flex flex-col justify-center p-8 md:p-16 lg:p-24 h-full relative">
          
          {/* Logo (Absolute at top) */}
          <div className="absolute top-8 left-8 md:top-16 md:left-16 lg:left-24">
            <Link href="/" className="text-3xl font-black tracking-tighter text-slate-900 hover:opacity-80 transition-opacity">
              VAS<span className="text-emerald-500">.</span>
            </Link>
          </div>

          {/* Main Copy */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-md mt-12 md:mt-0"
          >
            <h1 className="text-5xl md:text-6xl font-black tracking-tighter text-[#947844] mb-6 drop-shadow-sm">
              Coming soon...
            </h1>
            <p className="text-slate-600 text-lg leading-relaxed mb-10 font-medium max-w-lg">
              Because relying on broken public chargers is literally not the vibe. We're building portable, off-grid power so you can stop having a meltdown every time your battery hits 10%. Drop your email below and we'll let you know when it drops.
            </p>

            {/* Email Form */}
            <form className="flex items-center gap-2 bg-white rounded-full p-2 shadow-lg shadow-black/5 mb-8" onSubmit={(e) => e.preventDefault()}>
              <input 
                type="email" 
                placeholder="Email Address" 
                className="bg-transparent border-none px-6 py-3 text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-0 w-full text-base font-medium"
                required
              />
              <button 
                type="submit" 
                className="bg-emerald-500/90 text-white p-4 rounded-full hover:bg-emerald-600 transition-colors flex items-center justify-center min-w-[60px]"
              >
                <ArrowRight className="w-5 h-5" />
              </button>
            </form>
            
            {/* Socials under the form */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 0.4 }}
              className="flex items-center gap-6 pl-4"
            >
               <a href="https://instagram.com/vasnova_" target="_blank" rel="noopener noreferrer" className="text-slate-500 hover:text-emerald-500 transition-colors">
                 <InstagramIcon className="w-5 h-5" />
               </a>
               <a href="https://x.com/vasnova_" target="_blank" rel="noopener noreferrer" className="text-slate-500 hover:text-emerald-500 transition-colors">
                 <TwitterIcon className="w-5 h-5" />
               </a>
               <a href="https://www.linkedin.com/company/vas-nova/" target="_blank" rel="noopener noreferrer" className="text-slate-500 hover:text-emerald-500 transition-colors">
                 <LinkedinIcon className="w-5 h-5" />
               </a>
            </motion.div>
          </motion.div>

        </div>

        {/* Right Image Container */}
        <div className="hidden md:flex w-full md:w-[55%] items-center justify-center relative p-12 h-full">
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.2, ease: "easeOut", delay: 0.2 }}
            className="relative w-full h-[85%]"
          >
            <Image 
              src="/images/coming_soon_final.png"
              alt="Coming Soon"
              fill
              className="object-contain drop-shadow-[0_20px_50px_rgba(0,0,0,0.15)] scale-110"
            />
          </motion.div>
        </div>

      </div>
    </div>
  );
}
