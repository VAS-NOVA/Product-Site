"use client";

import React from 'react';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { motion } from 'framer-motion';

export const Footer = () => {
  return (
    <footer className="bg-[#f8f5f0] pt-24 pb-8 relative overflow-hidden text-slate-900 border-t border-slate-200">
      
      {/* Ambient background glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-64 bg-emerald-500/5 blur-[120px] pointer-events-none" />

      <div className="container mx-auto px-6 md:px-12 relative z-10">
        
        {/* Top Section: Brand & Newsletter */}
        <div className="flex flex-col lg:flex-row justify-between items-start gap-16 mb-8">
          <div className="max-w-md">
            <Link href="/" className="text-4xl md:text-5xl font-black tracking-tighter text-slate-900 inline-block mb-6">
              VAS<span className="text-emerald-500">.</span>
            </Link>
            <p className="text-slate-700 text-lg leading-relaxed mb-8 font-medium">
              The missing layer of EV infrastructure. Portable, solar-powered, and always ready when you need it most.
            </p>
          </div>
          
          <div className="w-full lg:w-auto">
            <h4 className="text-slate-900 font-bold mb-6 text-lg tracking-tight">Stay powered. Join the newsletter.</h4>
            <form className="flex flex-col sm:flex-row items-center gap-3" onSubmit={(e) => e.preventDefault()}>
              <input 
                type="email" 
                placeholder="Enter your email address..." 
                className="bg-white border border-slate-200 shadow-sm rounded-full px-8 py-4 text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-emerald-500/50 focus:ring-4 focus:ring-emerald-500/10 transition-all w-full sm:w-80 md:w-96 text-lg"
              />
              <button className="bg-emerald-500 text-white px-8 py-4 rounded-full font-bold hover:bg-emerald-600 transition-colors flex items-center justify-center gap-2 w-full sm:w-auto text-lg shadow-[0_0_15px_rgba(16,185,129,0.2)] hover:shadow-[0_0_25px_rgba(16,185,129,0.4)]">
                Subscribe <ArrowUpRight className="w-5 h-5" />
              </button>
            </form>
          </div>
        </div>

        {/* Middle Section: Links Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-12 mb-20">
          
          <div>
            <h4 className="font-bold text-slate-900 mb-6 tracking-wide text-sm uppercase">Product</h4>
            <ul className="space-y-4">
              <li><Link href="/coming-soon" className="text-slate-700 hover:text-emerald-600 transition-colors font-medium">VAS Unit V1</Link></li>
              <li><Link href="/coming-soon" className="text-slate-700 hover:text-emerald-600 transition-colors font-medium">Fleet Solutions</Link></li>
              <li><Link href="/coming-soon" className="text-slate-700 hover:text-emerald-600 transition-colors font-medium">Technical Specs</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-slate-900 mb-6 tracking-wide text-sm uppercase">Company</h4>
            <ul className="space-y-4">
              <li><Link href="/coming-soon" className="text-slate-700 hover:text-emerald-600 transition-colors font-medium">About Us</Link></li>
              <li><Link href="/coming-soon" className="text-slate-700 hover:text-emerald-600 transition-colors font-medium">Sustainability</Link></li>
              <li><Link href="/coming-soon" className="text-slate-700 hover:text-emerald-600 transition-colors font-medium">Careers</Link></li>
              <li><Link href="/contact" className="text-slate-700 hover:text-emerald-600 transition-colors font-medium">Contact</Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-bold text-slate-900 mb-6 tracking-wide text-sm uppercase">Connect</h4>
            <ul className="space-y-4">
              <li><a href="https://x.com/vasnova_" target="_blank" rel="noopener noreferrer" className="text-slate-700 hover:text-emerald-600 transition-colors font-medium block">Twitter (X)</a></li>
              <li><a href="https://www.linkedin.com/company/vas-nova/" target="_blank" rel="noopener noreferrer" className="text-slate-700 hover:text-emerald-600 transition-colors font-medium block">LinkedIn</a></li>
              <li><a href="https://instagram.com/vasnova_" target="_blank" rel="noopener noreferrer" className="text-slate-700 hover:text-emerald-600 transition-colors font-medium block">Instagram</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-slate-900 mb-6 tracking-wide text-sm uppercase">Legal</h4>
            <ul className="space-y-4">
              <li><Link href="/coming-soon" className="text-slate-700 hover:text-emerald-600 transition-colors font-medium">Privacy Policy</Link></li>
              <li><Link href="/coming-soon" className="text-slate-700 hover:text-emerald-600 transition-colors font-medium">Terms of Service</Link></li>
              <li><Link href="/coming-soon" className="text-slate-700 hover:text-emerald-600 transition-colors font-medium">Cookie Policy</Link></li>
            </ul>
          </div>

        </div>

      </div>

      {/* Massive Background Watermark */}
      <div className="w-full flex justify-center items-center pointer-events-none select-none absolute bottom-12 left-0 right-0 overflow-hidden" aria-hidden="true">
        <motion.div 
          initial={{ y: '100%', opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="text-[20vw] font-black text-slate-900/[0.08] tracking-tighter leading-none whitespace-nowrap"
        >
          VAS NOVA
        </motion.div>
      </div>

      {/* Bottom Copyright Bar */}
      <div className="container mx-auto px-6 relative z-10 border-t border-slate-200 pt-8 flex flex-col md:flex-row items-center justify-between gap-4 mt-8">
        <p className="text-slate-700 text-sm font-medium">
          © {new Date().getFullYear()} Vision for Advanced Sustainability. All rights reserved.
        </p>
      </div>

    </footer>
  );
};
