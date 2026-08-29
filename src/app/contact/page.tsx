"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Mail, MapPin } from 'lucide-react';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';

// Reusing the sleek social icons from ComingSoon page
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

export default function ContactPage() {
  return (
    <>
      <Navbar />
      
      <main className="min-h-screen bg-[#f8f5f0] pt-32 pb-24 relative overflow-hidden flex items-center">
        
        {/* Ambient background glow */}
        <div className="absolute top-1/4 right-0 w-[600px] h-[600px] bg-emerald-500/10 rounded-full blur-[150px] pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-[800px] h-[400px] bg-[#947844]/5 rounded-full blur-[150px] pointer-events-none" />

        <div className="container mx-auto px-6 md:px-12 relative z-10 max-w-6xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
            
            {/* Left Content */}
            <motion.div 
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="flex flex-col justify-center"
            >
              <h1 className="text-5xl md:text-6xl font-black tracking-tighter text-slate-900 mb-6 drop-shadow-sm">
                Get in touch.
              </h1>
              <p className="text-slate-600 text-lg md:text-xl leading-relaxed mb-12 font-medium max-w-md">
                Whether you're looking to upgrade your fleet's charging capabilities, or you just want to say hi, we'd love to hear from you.
              </p>

              <div className="space-y-8 mb-12">
                <div className="flex items-center gap-4 text-slate-700">
                  <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-sm">
                    <Mail className="w-5 h-5 text-emerald-500" />
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900 text-sm tracking-wide uppercase mb-1">Email Us</h4>
                    <a href="mailto:vasnova3@gmail.com" className="text-slate-600 hover:text-emerald-500 transition-colors font-medium">vasnova3@gmail.com</a>
                  </div>
                </div>


              </div>

              <div className="flex items-center gap-6">
                 <a href="https://instagram.com/vasnova_" target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-slate-500 hover:text-emerald-500 hover:shadow-md transition-all">
                   <InstagramIcon className="w-4 h-4" />
                 </a>
                 <a href="https://x.com/vasnova_" target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-slate-500 hover:text-emerald-500 hover:shadow-md transition-all">
                   <TwitterIcon className="w-4 h-4" />
                 </a>
                 <a href="https://www.linkedin.com/company/vas-nova/" target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-slate-500 hover:text-emerald-500 hover:shadow-md transition-all">
                   <LinkedinIcon className="w-4 h-4" />
                 </a>
              </div>
            </motion.div>

            {/* Right Form Card */}
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            >
              <div className="bg-white rounded-[2rem] p-8 md:p-12 shadow-[0_20px_50px_rgba(0,0,0,0.05)] border border-slate-100">
                <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label htmlFor="firstName" className="text-sm font-bold tracking-wide uppercase text-slate-700">First Name</label>
                      <input 
                        type="text" 
                        id="firstName"
                        className="w-full bg-[#f8f5f0] border-none rounded-xl px-5 py-4 text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 transition-all font-medium"
                        placeholder="John"
                      />
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="lastName" className="text-sm font-bold tracking-wide uppercase text-slate-700">Last Name</label>
                      <input 
                        type="text" 
                        id="lastName"
                        className="w-full bg-[#f8f5f0] border-none rounded-xl px-5 py-4 text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 transition-all font-medium"
                        placeholder="Doe"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="email" className="text-sm font-bold tracking-wide uppercase text-slate-700">Email Address</label>
                    <input 
                      type="email" 
                      id="email"
                      className="w-full bg-[#f8f5f0] border-none rounded-xl px-5 py-4 text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 transition-all font-medium"
                      placeholder="john@company.com"
                    />
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="company" className="text-sm font-bold tracking-wide uppercase text-slate-700">Company (Optional)</label>
                    <input 
                      type="text" 
                      id="company"
                      className="w-full bg-[#f8f5f0] border-none rounded-xl px-5 py-4 text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 transition-all font-medium"
                      placeholder="Acme Corp"
                    />
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="message" className="text-sm font-bold tracking-wide uppercase text-slate-700">Message</label>
                    <textarea 
                      id="message"
                      rows={5}
                      className="w-full bg-[#f8f5f0] border-none rounded-xl px-5 py-4 text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 transition-all font-medium resize-none"
                      placeholder="How can we help you?"
                    ></textarea>
                  </div>

                  <button 
                    type="submit" 
                    className="w-full bg-emerald-500 text-white font-bold tracking-wide uppercase py-4 rounded-xl hover:bg-emerald-600 transition-colors flex items-center justify-center gap-2 shadow-[0_0_15px_rgba(16,185,129,0.2)] hover:shadow-[0_0_25px_rgba(16,185,129,0.4)] mt-4"
                  >
                    Send Message <ArrowRight className="w-5 h-5" />
                  </button>

                </form>
              </div>
            </motion.div>

          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}
