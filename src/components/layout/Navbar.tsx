"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/Button';

export const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 transition-all duration-300 bg-transparent py-4 md:py-6 pointer-events-none">
      <div className="container mx-auto px-6 md:px-12 flex items-center justify-end">
        {/* Unified Nav Pill */}
        <div className="hidden md:flex items-center bg-white/70 backdrop-blur-md rounded-full p-1.5 border border-white/40 shadow-sm pointer-events-auto">
          <nav className="flex items-center px-4 gap-2">
            <Link href="/#about" className="text-[10px] sm:text-xs font-bold tracking-[0.2em] uppercase text-slate-600 hover:text-emerald-500 px-3 py-2 transition-colors">
              About
            </Link>
            <Link href="/#solution" className="text-[10px] sm:text-xs font-bold tracking-[0.2em] uppercase text-slate-600 hover:text-emerald-500 px-3 py-2 transition-colors">
              Solution
            </Link>
            <Link href="/#features" className="text-[10px] sm:text-xs font-bold tracking-[0.2em] uppercase text-slate-600 hover:text-emerald-500 px-3 py-2 transition-colors">
              Features
            </Link>
          </nav>
          <Link href="/contact" suppressHydrationWarning className="bg-emerald-500/90 text-white text-[10px] sm:text-xs font-bold tracking-[0.2em] uppercase px-6 py-3 rounded-full hover:bg-emerald-600 shadow-md shadow-emerald-500/20 transition-all">
            Contact Us
          </Link>
        </div>
      </div>
    </header>
  );
};
