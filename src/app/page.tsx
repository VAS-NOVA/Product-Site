import React from 'react';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { Hero } from '@/components/sections/Hero';
import { ExplodedBattery } from '@/components/sections/ExplodedBattery';
import { About } from '@/components/sections/About';
import { Statistics } from '@/components/sections/Statistics';
import { Solution } from '@/components/sections/Solution';
import { FeaturesGrid } from '@/components/sections/FeaturesGrid';
import { Comparison } from '@/components/sections/Comparison';
import { Sustainability } from '@/components/sections/Sustainability';
import { VisionQuote } from '@/components/sections/VisionQuote';

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="flex-1">
        <Hero />
        <ExplodedBattery />
        <About />
        <Statistics />
        <Solution />
        <FeaturesGrid />
        <Comparison />
        <Sustainability />
        <VisionQuote />
      </main>
      <Footer />
    </>
  );
}
