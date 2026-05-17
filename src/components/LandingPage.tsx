"use client";

import Link from "next/link";
import { SignInButton } from "@clerk/nextjs";
import { 
  ArrowRight, 
  Zap, 
  Target, 
  ShieldCheck, 
  Lock, 
  Briefcase, 
  Eye, 
  Cpu, 
  UserCheck, 
  FileText, 
  Sparkles,
  Search
} from "lucide-react";
import { useState } from "react";

export default function LandingPage() {
  const [hoveredTemplate, setHoveredTemplate] = useState<number | null>(null);

  // Stylized grayscale company logos
  const companies = [
    { name: "Netflix", logo: "NETFLIX" },
    { name: "Walmart", logo: "WALMART" },
    { name: "Cleveland Clinic", logo: "CLEVELAND CLINIC" },
    { name: "Amazon", logo: "AMAZON" },
    { name: "Costco", logo: "COSTCO" },
    { name: "PepsiCo", logo: "PEPSICO" },
    { name: "Disney", logo: "DISNEY" }
  ];

  return (
    <div className="min-h-screen bg-[#07090e] text-[#b4bcca] selection:bg-[#10b981]/30 selection:text-white font-sans flex flex-col w-full relative overflow-x-hidden pt-16">
      
      {/* Premium Background Atmosphere */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-[1400px] h-[600px] bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-purple-900/15 via-emerald-950/5 to-transparent -z-10 blur-3xl pointer-events-none" />
      <div className="absolute top-[800px] right-0 w-[400px] h-[400px] bg-purple-950/10 -z-10 blur-[100px] pointer-events-none" />
      <div className="absolute top-[1600px] left-0 w-[400px] h-[400px] bg-emerald-950/5 -z-10 blur-[100px] pointer-events-none" />

      {/* 1. Header & Navigation (Integrated into page for perfect dark transitions) */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-[#07090e]/80 backdrop-blur-md border-b border-[#121824]">
        <div className="w-full max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-10">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2 group">
              <div className="bg-gradient-to-br from-[#8b5cf6] to-[#a78bfa] p-1.5 rounded-lg group-hover:scale-105 transition-transform shadow-[0_0_15px_rgba(139,92,246,0.3)]">
                <Briefcase className="w-4 h-4 text-white" />
              </div>
              <span className="text-xl font-bold tracking-tight text-white group-hover:text-purple-300 transition-colors">YourRecruiter</span>
            </Link>

            {/* Nav Links */}
            <nav className="hidden md:flex items-center gap-8">
              <a href="#features" className="text-xs font-semibold uppercase tracking-wider text-neutral-400 hover:text-white transition-colors">Features</a>
              <a href="#templates" className="text-xs font-semibold uppercase tracking-wider text-neutral-400 hover:text-white transition-colors">Templates</a>
              <a href="#security" className="text-xs font-semibold uppercase tracking-wider text-neutral-400 hover:text-white transition-colors">Security Audit</a>
              <a href="#faq" className="text-xs font-semibold uppercase tracking-wider text-neutral-400 hover:text-white transition-colors">FAQ</a>
            </nav>
          </div>

          <div className="flex items-center gap-4">
            <SignInButton mode="modal">
              <button className="text-xs font-semibold uppercase tracking-wider text-neutral-400 hover:text-white transition-colors px-2 py-1 cursor-pointer">
                Sign In
              </button>
            </SignInButton>
            
            <SignInButton mode="modal">
              <button className="inline-flex items-center justify-center border border-[#10b981] hover:bg-[#10b981]/10 text-[#10b981] hover:text-white text-xs font-black uppercase tracking-widest px-4 py-2.5 rounded-lg transition-all active:scale-[0.98] cursor-pointer shadow-[0_0_15px_rgba(16,185,129,0.1)] hover:shadow-[0_0_20px_rgba(16,185,129,0.25)]">
                Start Auditing
              </button>
            </SignInButton>
          </div>
        </div>
      </header>

      {/* 2. Hero Section (The "Facelift") */}
      <section className="flex flex-col items-center justify-center px-6 py-24 text-center max-w-5xl mx-auto relative z-10">
        
        {/* dim green sub-headline */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#10b981]/5 border border-[#10b981]/20 text-[#10b981]/80 text-xs font-black uppercase tracking-widest mb-8">
          <span className="w-1.5 h-1.5 rounded-full bg-[#10b981] animate-pulse" />
          The ATS-Compatible AI Resume Builder
        </div>
        
        {/* massive bold main headline */}
        <h1 className="text-5xl md:text-8xl font-black tracking-tighter text-white max-w-4xl leading-[1.05] mb-8 uppercase italic">
          Build a Winning, <br className="hidden md:block" />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#10b981] to-[#8b5cf6] drop-shadow-[0_0_30px_rgba(16,185,129,0.2)]">AI-Powered</span> Resume.
        </h1>
        
        {/* secondary descriptive line */}
        <p className="text-base md:text-lg text-neutral-400 max-w-2xl mx-auto mb-10 leading-relaxed font-medium">
          Optimize details, rewrite content using Gemini-1.5, and audit for recruiter compliance on a secure, <span className="text-[#10b981] font-semibold">Sentinel-fortified</span> platform.
        </p>
        
        {/* wide glowing lock green button */}
        <SignInButton mode="modal">
          <button className="group relative inline-flex items-center justify-center gap-3 bg-gradient-to-r from-[#10b981] to-[#059669] hover:from-[#34d399] hover:to-[#059669] text-[#07090e] font-black uppercase tracking-widest text-xs px-8 py-5 rounded-xl transition-all active:scale-[0.98] shadow-[0_0_40px_rgba(16,185,129,0.35)] hover:shadow-[0_0_60px_rgba(16,185,129,0.55)] cursor-pointer">
            <Lock className="w-4 h-4 text-[#07090e] animate-pulse" />
            Get Started - Securely
            <ArrowRight className="w-4 h-4 text-[#07090e] group-hover:translate-x-1 transition-transform" />
          </button>
        </SignInButton>

        {/* Floating background lock stamp */}
        <div className="absolute top-[80%] opacity-5 text-[#10b981] pointer-events-none">
          <ShieldCheck className="w-64 h-64" />
        </div>
      </section>

      {/* 3. Multi-template Showcase */}
      <section id="templates" className="py-24 border-t border-[#121824] bg-[#07090e]/30 relative z-10">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <span className="text-xs font-semibold text-purple-400 uppercase tracking-widest">Visual Presets</span>
            <h2 className="text-3xl md:text-5xl font-black text-white mt-2 mb-4 uppercase italic">Best Professional Resume Templates</h2>
            <p className="text-neutral-400 max-w-xl mx-auto text-sm">Select from our signature dark layouts built specifically to satisfy scanner algorithms.</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8 relative">
            
            {/* Template 1: Clean Teal (Single column, monospace details) */}
            <div 
              className={`bg-[#0a0d14]/90 border rounded-3xl p-6 transition-all duration-300 relative overflow-hidden group cursor-pointer ${
                hoveredTemplate === 1 
                  ? "border-[#10b981] shadow-[0_0_40px_rgba(16,185,129,0.15)] scale-[1.02]" 
                  : "border-[#121824]"
              }`}
              onMouseEnter={() => setHoveredTemplate(1)}
              onMouseLeave={() => setHoveredTemplate(null)}
            >
              <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl from-[#10b981]/5 to-transparent rounded-bl-full" />
              <div className="flex flex-col gap-6">
                <div className="flex justify-between items-center pb-4 border-b border-[#121824]">
                  <div>
                    <h3 className="font-bold text-white text-sm">NEON CLEAN</h3>
                    <p className="text-[10px] text-[#10b981] uppercase font-mono tracking-widest mt-0.5">Developer Edition</p>
                  </div>
                  <span className="px-2 py-0.5 bg-[#10b981]/10 text-[#10b981] text-[9px] font-black uppercase tracking-wider rounded border border-[#10b981]/20">Active</span>
                </div>
                
                {/* Mock Resume Content */}
                <div className="space-y-4 text-[10px]">
                  <div>
                    <div className="w-16 h-2 bg-neutral-800 rounded mb-1" />
                    <div className="w-24 h-3 bg-white/10 rounded" />
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-[#10b981]" />
                      <div className="w-full h-1.5 bg-neutral-800 rounded" />
                    </div>
                    <div className="w-4/5 h-1.5 bg-neutral-800/60 rounded ml-4" />
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-[#10b981]" />
                      <div className="w-full h-1.5 bg-neutral-800 rounded" />
                    </div>
                    <div className="w-3/4 h-1.5 bg-neutral-800/60 rounded ml-4" />
                  </div>
                </div>
              </div>
            </div>

            {/* Template 2: Executive Purple (Dual Column) */}
            <div 
              className={`bg-[#0a0d14]/90 border rounded-3xl p-6 transition-all duration-300 relative overflow-hidden group cursor-pointer ${
                hoveredTemplate === 2 
                  ? "border-[#8b5cf6] shadow-[0_0_40px_rgba(139,92,246,0.15)] scale-[1.02]" 
                  : "border-[#121824]"
              }`}
              onMouseEnter={() => setHoveredTemplate(2)}
              onMouseLeave={() => setHoveredTemplate(null)}
            >
              <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl from-[#8b5cf6]/5 to-transparent rounded-bl-full" />
              <div className="flex flex-col gap-6">
                <div className="flex justify-between items-center pb-4 border-b border-[#121824]">
                  <div>
                    <h3 className="font-bold text-white text-sm">EXECUTIVE PURPLE</h3>
                    <p className="text-[10px] text-[#8b5cf6] uppercase font-mono tracking-widest mt-0.5">Management Edition</p>
                  </div>
                  <span className="px-2 py-0.5 bg-[#8b5cf6]/10 text-[#8b5cf6] text-[9px] font-black uppercase tracking-wider rounded border border-[#8b5cf6]/20">Trending</span>
                </div>
                
                {/* Mock Resume Content - Dual Column */}
                <div className="grid grid-cols-3 gap-4 text-[10px]">
                  {/* Left Column */}
                  <div className="col-span-1 border-r border-[#121824] pr-2 space-y-3">
                    <div className="w-8 h-8 rounded-full bg-neutral-800" />
                    <div className="w-full h-2 bg-[#8b5cf6]/20 rounded" />
                    <div className="w-3/4 h-1.5 bg-neutral-800 rounded" />
                    <div className="w-2/4 h-1.5 bg-neutral-800 rounded" />
                  </div>
                  
                  {/* Right Column */}
                  <div className="col-span-2 space-y-3">
                    <div className="w-full h-3 bg-white/10 rounded" />
                    <div className="space-y-1.5">
                      <div className="w-full h-1.5 bg-neutral-800 rounded" />
                      <div className="w-5/6 h-1.5 bg-neutral-800/60 rounded" />
                    </div>
                    <div className="space-y-1.5">
                      <div className="w-full h-1.5 bg-neutral-800 rounded" />
                      <div className="w-4/5 h-1.5 bg-neutral-800/60 rounded" />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Template 3: Sentinel Dark (Cyber Duo-Tone) */}
            <div 
              className={`bg-[#0a0d14]/90 border rounded-3xl p-6 transition-all duration-300 relative overflow-hidden group cursor-pointer ${
                hoveredTemplate === 3 
                  ? "border-[#10b981] shadow-[0_0_40px_rgba(16,185,129,0.15)] scale-[1.02]" 
                  : "border-[#121824]"
              }`}
              onMouseEnter={() => setHoveredTemplate(3)}
              onMouseLeave={() => setHoveredTemplate(null)}
            >
              <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl from-[#10b981]/5 to-[#8b5cf6]/5 rounded-bl-full" />
              <div className="flex flex-col gap-6">
                <div className="flex justify-between items-center pb-4 border-b border-[#121824]">
                  <div>
                    <h3 className="font-bold text-white text-sm">SENTINEL DARK</h3>
                    <p className="text-[10px] text-transparent bg-clip-text bg-gradient-to-r from-[#10b981] to-[#8b5cf6] uppercase font-mono tracking-widest mt-0.5">Fortress Edition</p>
                  </div>
                  <span className="px-2 py-0.5 bg-gradient-to-r from-[#10b981]/10 to-[#8b5cf6]/10 text-[#10b981] text-[9px] font-black uppercase tracking-wider rounded border border-[#10b981]/20">Premium</span>
                </div>
                
                {/* Mock Resume Content - Single Column Cyber details */}
                <div className="space-y-4 text-[10px]">
                  <div className="flex items-center gap-3">
                    <div className="w-6 h-6 rounded bg-gradient-to-br from-[#10b981] to-[#8b5cf6]/60 p-0.5">
                      <div className="w-full h-full bg-[#0a0d14] rounded-sm" />
                    </div>
                    <div className="w-24 h-3 bg-white/10 rounded" />
                  </div>
                  <div className="space-y-2 border-l-2 border-gradient border-l-[#10b981] pl-3">
                    <div className="w-full h-1.5 bg-neutral-800 rounded" />
                    <div className="w-5/6 h-1.5 bg-neutral-800/60 rounded" />
                  </div>
                  <div className="space-y-2 border-l-2 border-gradient border-l-[#8b5cf6] pl-3">
                    <div className="w-full h-1.5 bg-neutral-800 rounded" />
                    <div className="w-4/5 h-1.5 bg-neutral-800/60 rounded" />
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 4. Client Proof Banner */}
      <section className="py-16 border-t border-b border-[#121824] bg-[#07090e] relative z-10">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <span className="text-[11px] font-bold uppercase tracking-widest text-neutral-500">YourRecruiter users have been hired at</span>
          <div className="flex flex-wrap items-center justify-center gap-x-12 gap-y-6 mt-8 opacity-45 grayscale hover:grayscale-0 transition-all duration-500">
            {companies.map((company, index) => (
              <span key={index} className="text-white font-black tracking-tighter text-sm uppercase italic hover:text-[#10b981] transition-colors duration-300">
                {company.logo}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* 5. High-Converting Call to Action (The Final Push) */}
      <section id="security" className="py-24 relative z-10">
        <div className="max-w-4xl mx-auto px-6 text-center">
          
          <div className="bg-gradient-to-br from-[#0a0d14] to-[#07090e] border border-[#121824] hover:border-[#10b981]/20 transition-colors duration-500 rounded-[32px] p-12 relative overflow-hidden shadow-2xl">
            <div className="absolute -top-32 -left-32 w-64 h-64 bg-[#10b981]/5 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute -bottom-32 -right-32 w-64 h-64 bg-[#8b5cf6]/5 rounded-full blur-3xl pointer-events-none" />

            <div className="relative z-10 flex flex-col items-center gap-6">
              
              <div className="w-12 h-12 rounded-2xl bg-[#10b981]/5 border border-[#10b981]/20 flex items-center justify-center shadow-[0_0_15px_rgba(16,185,129,0.1)]">
                <Search className="w-6 h-6 text-[#10b981]" />
              </div>

              <h2 className="text-3xl md:text-5xl font-black text-white uppercase italic tracking-tight">
                Audit Your Current Resume for Free.
              </h2>
              
              <p className="text-sm text-neutral-400 max-w-md mx-auto leading-relaxed">
                Unlock recruiter grading, layout audits, and metric-driven feedback bullet points instantly.
              </p>

              {/* Upload scanner grid trigger link */}
              <Link 
                href="/scan"
                className="group w-full max-w-md mt-6 bg-[#07090e] border border-dashed border-[#121824] hover:border-[#10b981] rounded-2xl p-8 flex flex-col items-center justify-center gap-4 transition-all duration-300 cursor-pointer"
              >
                <div className="w-12 h-12 bg-neutral-900 border border-[#121824] rounded-xl flex items-center justify-center group-hover:bg-[#10b981]/10 group-hover:border-[#10b981]/30 transition-all shadow-[0_0_15px_rgba(16,185,129,0.05)]">
                  <Cpu className="w-6 h-6 text-neutral-400 group-hover:text-[#10b981] group-hover:animate-pulse" />
                </div>
                <div>
                  <span className="text-sm font-bold text-white uppercase tracking-wider block">Scan Your CV Image</span>
                  <span className="text-[10px] text-neutral-500 mt-1 block">Supports direct uploads, base64 images, and raw strings.</span>
                </div>
              </Link>

              {/* Privacy statement */}
              <div className="flex items-center gap-2 text-xs text-[#10b981] bg-[#10b981]/5 px-4 py-2 rounded-full border border-[#10b981]/10 mt-6 shadow-[0_0_15px_rgba(16,185,129,0.05)]">
                <Lock className="w-3.5 h-3.5" />
                <span className="font-semibold uppercase tracking-wider text-[9px]">Your data is audited locally on the Sentinel network and is never shared.</span>
              </div>

            </div>
          </div>

        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-[#121824] py-8 text-center text-neutral-500 text-xs bg-[#07090e]">
        <p>&copy; {new Date().getFullYear()} YourRecruiter. All rights reserved.</p>
      </footer>
    </div>
  );
}
