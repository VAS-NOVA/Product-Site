import React from 'react';
import Link from 'next/link';

export const Footer = () => {
  return (
    <footer className="bg-slate-50 border-t border-slate-200 pt-20 pb-10">
      <div className="container mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          <div className="md:col-span-1">
            <Link href="/" className="text-3xl font-bold tracking-tighter text-slate-900 inline-block mb-6">
              VAS<span className="text-accent">.</span>
            </Link>
            <p className="text-slate-500 mb-6 max-w-sm">
              The missing layer of EV infrastructure. Portable, solar-powered, and always ready when you need it most.
            </p>
          </div>

          <div>
            <h4 className="font-bold text-slate-900 mb-6 uppercase tracking-wider text-sm">Product</h4>
            <ul className="space-y-4">
              <li><Link href="#" className="text-slate-500 hover:text-accent transition-colors">VAS Unit V1</Link></li>
              <li><Link href="#" className="text-slate-500 hover:text-accent transition-colors">Fleet Solutions</Link></li>
              <li><Link href="#" className="text-slate-500 hover:text-accent transition-colors">Technical Specs</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-slate-900 mb-6 uppercase tracking-wider text-sm">Company</h4>
            <ul className="space-y-4">
              <li><Link href="#" className="text-slate-500 hover:text-accent transition-colors">About Us</Link></li>
              <li><Link href="#" className="text-slate-500 hover:text-accent transition-colors">Sustainability</Link></li>
              <li><Link href="#" className="text-slate-500 hover:text-accent transition-colors">Careers</Link></li>
              <li><Link href="#" className="text-slate-500 hover:text-accent transition-colors">Contact</Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-bold text-slate-900 mb-6 uppercase tracking-wider text-sm">Connect</h4>
            <ul className="space-y-4">
              <li><Link href="#" className="text-slate-500 hover:text-accent transition-colors">Twitter (X)</Link></li>
              <li><Link href="#" className="text-slate-500 hover:text-accent transition-colors">LinkedIn</Link></li>
              <li><Link href="#" className="text-slate-500 hover:text-accent transition-colors">Instagram</Link></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-slate-200 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-slate-500 text-sm">
            © {new Date().getFullYear()} Vision for Advanced Sustainability. All rights reserved.
          </p>
          <div className="flex items-center gap-6 text-sm">
            <Link href="#" className="text-slate-500 hover:text-slate-900 transition-colors">Privacy Policy</Link>
            <Link href="#" className="text-slate-500 hover:text-slate-900 transition-colors">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};
