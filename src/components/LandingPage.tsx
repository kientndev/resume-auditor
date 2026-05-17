"use client";

import Link from "next/link";
import { SignInButton } from "@clerk/nextjs";
import { ArrowRight, Zap, Target, ShieldCheck } from "lucide-react";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-200 selection:bg-purple-500/30 font-sans flex flex-col w-full pt-12">
      {/* Background gradients */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-purple-900/20 via-neutral-950 to-neutral-950 -z-10" />

      {/* Hero Section */}
      <main className="flex-grow flex flex-col items-center justify-center px-6 py-20 text-center">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-400 text-sm font-medium mb-8">
          <span className="w-2 h-2 rounded-full bg-purple-500 animate-pulse" />
          AI-Powered Resume Analysis
        </div>
        
        <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight text-white max-w-4xl mx-auto leading-tight mb-6">
          Stop sending resumes into a <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-500">black hole.</span>
        </h1>
        
        <p className="text-lg md:text-xl text-neutral-400 max-w-2xl mx-auto mb-10 leading-relaxed">
          Upload your CV in seconds. Get an instant grade, a professional roast, and actionable fixes to land more interviews.
        </p>
        
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <SignInButton mode="modal">
            <button className="group inline-flex items-center justify-center gap-2 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-400 hover:to-pink-400 text-white text-lg font-semibold px-8 py-4 rounded-full transition-all active:scale-[0.98] shadow-[0_0_40px_rgba(168,85,247,0.4)] hover:shadow-[0_0_60px_rgba(168,85,247,0.6)] cursor-pointer">
              Audit Your Resume Now
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
          </SignInButton>
        </div>
      </main>

      {/* Features Section */}
      <section className="border-t border-neutral-900 bg-neutral-950/50 backdrop-blur-sm relative z-10 py-24">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Why use YourRecruiter?</h2>
            <p className="text-neutral-400">Because sugarcoating won't get you hired.</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="bg-neutral-900/50 p-8 rounded-3xl border border-neutral-800 hover:border-purple-500/30 transition-colors">
              <div className="w-12 h-12 bg-purple-500/10 rounded-2xl flex items-center justify-center mb-6">
                <Zap className="w-6 h-6 text-purple-400" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">Instant Analysis</h3>
              <p className="text-neutral-400 leading-relaxed">
                No waiting for human recruiters to get back to you. Get a comprehensive breakdown of your resume in mere seconds.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="bg-neutral-900/50 p-8 rounded-3xl border border-neutral-800 hover:border-pink-500/30 transition-colors">
              <div className="w-12 h-12 bg-pink-500/10 rounded-2xl flex items-center justify-center mb-6">
                <Target className="w-6 h-6 text-pink-400" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">Brutal & Actionable Feedback</h3>
              <p className="text-neutral-400 leading-relaxed">
                We'll roast your generic bullet points and tell you exactly how to rewrite them with strong action verbs and measurable metrics.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="bg-neutral-900/50 p-8 rounded-3xl border border-neutral-800 hover:border-purple-500/30 transition-colors">
              <div className="w-12 h-12 bg-purple-500/10 rounded-2xl flex items-center justify-center mb-6">
                <ShieldCheck className="w-6 h-6 text-purple-400" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">ATS Optimization</h3>
              <p className="text-neutral-400 leading-relaxed">
                Make sure your layout and skill keywords align perfectly so the automated tracking software doesn't drop you on day one.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-neutral-900 py-8 text-center text-neutral-500 text-sm">
        <p>&copy; {new Date().getFullYear()} YourRecruiter. All rights reserved.</p>
      </footer>
    </div>
  );
}
