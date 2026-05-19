"use client";

import { Code, Shield, Zap, Target, Lock, Cpu } from "lucide-react";

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-[#07090e] text-[#b4bcca] font-sans flex flex-col w-full relative overflow-x-hidden pt-16">
      
      {/* Premium Background Atmosphere */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-[1400px] h-[600px] bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-purple-900/15 via-emerald-950/5 to-transparent -z-10 blur-3xl pointer-events-none" />
      <div className="absolute top-[800px] right-0 w-[400px] h-[400px] bg-purple-950/10 -z-10 blur-[100px] pointer-events-none" />

      {/* Header Section */}
      <section className="flex flex-col items-center justify-center px-6 py-24 text-center max-w-5xl mx-auto relative z-10">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#10b981]/5 border border-[#10b981]/20 text-[#10b981]/80 text-xs font-black uppercase tracking-widest mb-8">
          <Code className="w-3 h-3" />
          Built by Developers, For Developers
        </div>
        
        <h1 className="text-5xl md:text-7xl font-black tracking-tighter text-white max-w-4xl leading-[1.05] mb-6 uppercase italic">
          About <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#10b981] to-[#8b5cf6]">YourRecruiter</span>
        </h1>
        
        <p className="text-base md:text-lg text-neutral-400 max-w-3xl mx-auto mb-12 leading-relaxed font-medium">
          We built YourRecruiter to fix the generic phrasing that fails modern ATS systems. Our mission is to help engineers showcase their high-impact metrics with secure, data-driven architecture.
        </p>
      </section>

      {/* Mission Section */}
      <section className="px-6 pb-24 relative z-10">
        <div className="max-w-6xl mx-auto">
          <div className="bg-gradient-to-br from-[#0a0d14] to-[#07090e] border border-[#121824] rounded-3xl p-12 relative overflow-hidden">
            <div className="absolute -top-32 -left-32 w-64 h-64 bg-[#10b981]/5 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute -bottom-32 -right-32 w-64 h-64 bg-[#8b5cf6]/5 rounded-full blur-3xl pointer-events-none" />

            <div className="relative z-10">
              <h2 className="text-3xl md:text-4xl font-black text-white mb-8 uppercase italic tracking-tight">
                Our Mission
              </h2>
              
              <div className="space-y-6 text-neutral-300 leading-relaxed max-w-3xl">
                <p className="text-base">
                  Modern Applicant Tracking Systems (ATS) filter out 75% of resumes before a human ever sees them. Generic phrases like "hardworking" and "team player" don't cut it anymore. Engineers need quantifiable metrics, specific technologies, and impact-driven narratives.
                </p>
                <p className="text-base">
                  YourRecruiter was built by software developers who experienced this frustration firsthand. We leveraged Gemini-1.5 AI and Sentinel-fortified security to create a platform that transforms raw career data into ATS-optimized, metric-rich resumes that actually get interviews.
                </p>
                <p className="text-base">
                  Every resume audit happens locally on secure infrastructure. Your career data never leaves our controlled environment—no scraping, no selling, no compromise.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Grid */}
      <section className="px-6 pb-24 relative z-10">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-black text-white mb-4 uppercase italic tracking-tight">
              Core Values
            </h2>
            <p className="text-neutral-400 max-w-xl mx-auto text-sm">
              The principles that drive every feature we build
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            
            {/* Value 1 */}
            <div className="bg-[#0a0d14]/90 border border-[#121824] rounded-3xl p-8 relative overflow-hidden hover:border-[#10b981]/30 transition-all duration-300 group">
              <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl from-[#10b981]/5 to-transparent rounded-bl-full" />
              <div className="w-12 h-12 rounded-xl bg-[#10b981]/10 border border-[#10b981]/20 flex items-center justify-center mb-6 shadow-[0_0_15px_rgba(16,185,129,0.1)]">
                <Target className="w-6 h-6 text-[#10b981]" />
              </div>
              <h3 className="text-xl font-black text-white mb-4 uppercase tracking-tight">Impact-First</h3>
              <p className="text-sm text-neutral-300 leading-relaxed">
                We prioritize quantifiable engineering metrics over generic fluff. Numbers, technologies, and measurable outcomes drive our AI recommendations.
              </p>
            </div>

            {/* Value 2 */}
            <div className="bg-[#0a0d14]/90 border border-[#121824] rounded-3xl p-8 relative overflow-hidden hover:border-[#8b5cf6]/30 transition-all duration-300 group">
              <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl from-[#8b5cf6]/5 to-transparent rounded-bl-full" />
              <div className="w-12 h-12 rounded-xl bg-[#8b5cf6]/10 border border-[#8b5cf6]/20 flex items-center justify-center mb-6 shadow-[0_0_15px_rgba(139,92,246,0.1)]">
                <Shield className="w-6 h-6 text-[#8b5cf6]" />
              </div>
              <h3 className="text-xl font-black text-white mb-4 uppercase tracking-tight">Security-First</h3>
              <p className="text-sm text-neutral-300 leading-relaxed">
                Your career data is processed on Sentinel-fortified infrastructure. We never scrape, sell, or share your personal information with third parties.
              </p>
            </div>

            {/* Value 3 */}
            <div className="bg-[#0a0d14]/90 border border-[#121824] rounded-3xl p-8 relative overflow-hidden hover:border-[#06b6d4]/30 transition-all duration-300 group">
              <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl from-[#06b6d4]/5 to-transparent rounded-bl-full" />
              <div className="w-12 h-12 rounded-xl bg-[#06b6d4]/10 border border-[#06b6d4]/20 flex items-center justify-center mb-6 shadow-[0_0_15px_rgba(6,182,212,0.1)]">
                <Zap className="w-6 h-6 text-[#06b6d4]" />
              </div>
              <h3 className="text-xl font-black text-white mb-4 uppercase tracking-tight">Speed-First</h3>
              <p className="text-sm text-neutral-300 leading-relaxed">
                AI-powered resume generation happens in seconds, not minutes. Our optimized architecture delivers instant feedback without compromising quality.
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* Technology Section */}
      <section className="px-6 pb-24 relative z-10">
        <div className="max-w-6xl mx-auto">
          <div className="bg-gradient-to-br from-[#0a0d14] to-[#07090e] border border-[#121824] rounded-3xl p-12 relative overflow-hidden">
            <div className="absolute -top-32 -right-32 w-64 h-64 bg-[#8b5cf6]/5 rounded-full blur-3xl pointer-events-none" />
            
            <div className="relative z-10">
              <div className="flex items-center gap-4 mb-8">
                <div className="w-12 h-12 rounded-xl bg-[#8b5cf6]/10 border border-[#8b5cf6]/20 flex items-center justify-center shadow-[0_0_15px_rgba(139,92,246,0.1)]">
                  <Cpu className="w-6 h-6 text-[#8b5cf6]" />
                </div>
                <h2 className="text-3xl md:text-4xl font-black text-white uppercase italic tracking-tight">
                  Built With Modern Tech
                </h2>
              </div>
              
              <div className="grid md:grid-cols-2 gap-8">
                <div className="space-y-4">
                  <h3 className="text-lg font-bold text-white uppercase tracking-wider">Frontend</h3>
                  <ul className="space-y-2 text-sm text-neutral-300">
                    <li className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-[#10b981]" />
                      Next.js 15 with App Router
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-[#10b981]" />
                      Tailwind CSS for responsive design
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-[#10b981]" />
                      Clerk for secure authentication
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-[#10b981]" />
                      Lucide React for modern icons
                    </li>
                  </ul>
                </div>
                
                <div className="space-y-4">
                  <h3 className="text-lg font-bold text-white uppercase tracking-wider">Backend & AI</h3>
                  <ul className="space-y-2 text-sm text-neutral-300">
                    <li className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-[#8b5cf6]" />
                      Convex for real-time database
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-[#8b5cf6]" />
                      Gemini-1.5 for AI-powered content generation
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-[#8b5cf6]" />
                      Sentinel-fortified security architecture
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-[#8b5cf6]" />
                      Local processing for data privacy
                    </li>
                  </ul>
                </div>
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
