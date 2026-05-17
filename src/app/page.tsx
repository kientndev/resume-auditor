"use client";

import Link from "next/link";
import { useUser, SignInButton } from "@clerk/nextjs";
import { ArrowRight, Zap, Target, ShieldCheck, FileText, Plus, Edit, Sparkles, Calendar } from "lucide-react";

export default function LandingPage() {
  const { user, isSignedIn, isLoaded } = useUser();

  if (!isLoaded) {
    return (
      <div className="min-h-screen bg-neutral-950 text-neutral-200 selection:bg-purple-500/30 font-sans flex items-center justify-center">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-purple-900/20 via-neutral-950 to-neutral-950 -z-10" />
        <div className="w-12 h-12 rounded-full border-t-2 border-purple-500 animate-spin" />
      </div>
    );
  }

  if (isSignedIn) {
    return (
      <div className="min-h-screen bg-neutral-950 text-neutral-200 selection:bg-purple-500/30 font-sans flex flex-col relative overflow-x-hidden pt-12">
        {/* Background gradients */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-purple-950/40 via-neutral-950 to-neutral-950 -z-10" />

        {/* Dashboard Main Workspace */}
        <main className="flex-grow max-w-7xl w-full mx-auto px-6 py-12 flex flex-col gap-10">
          
          {/* Welcome Header */}
          <div className="flex flex-col gap-2">
            <span className="text-xs font-semibold text-purple-400 uppercase tracking-widest">Candidate Console</span>
            <h1 className="text-4xl font-extrabold text-white tracking-tight">
              Welcome back, {user?.firstName || "Agent"}! 👋
            </h1>
            <p className="text-neutral-400 text-sm">
              Your resume auditing database is active. Optimize your details, rewrite with generative AI, and scale your job search.
            </p>
          </div>

          {/* Quick Actions Row */}
          <div className="grid md:grid-cols-2 gap-6">
            
            {/* Card 1: Scanner */}
            <Link href="/scan" className="group relative bg-neutral-900/40 hover:bg-neutral-900/60 border border-neutral-800 hover:border-purple-500/30 rounded-3xl p-8 flex flex-col justify-between transition-all duration-300 shadow-xl overflow-hidden hover:shadow-purple-500/5">
              <div className="absolute top-0 right-0 w-32 h-32 bg-purple-500/5 rounded-bl-full group-hover:bg-purple-500/10 transition-colors" />
              <div className="flex flex-col gap-4 relative z-10">
                <div className="w-12 h-12 bg-purple-500/10 rounded-2xl flex items-center justify-center border border-purple-500/20 group-hover:scale-105 transition-transform">
                  <Target className="w-6 h-6 text-purple-400" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white mb-2 flex items-center gap-2">
                    Launch New Audit Scan
                    <Sparkles className="w-4 h-4 text-purple-400 animate-pulse" />
                  </h3>
                  <p className="text-neutral-400 text-sm leading-relaxed">
                    Upload a new CV image or paste raw text. Our generative model evaluates ATS compatibility and provides a brutal, recruiters-eye grade feedback audit.
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2 text-sm font-semibold text-purple-400 mt-8 group-hover:text-purple-300 transition-colors">
                Run Audit Scanner
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>

            {/* Card 2: Editor */}
            <Link href="/editor" className="group relative bg-neutral-900/40 hover:bg-neutral-900/60 border border-neutral-800 hover:border-pink-500/30 rounded-3xl p-8 flex flex-col justify-between transition-all duration-300 shadow-xl overflow-hidden hover:shadow-pink-500/5">
              <div className="absolute top-0 right-0 w-32 h-32 bg-pink-500/5 rounded-bl-full group-hover:bg-pink-500/10 transition-colors" />
              <div className="flex flex-col gap-4 relative z-10">
                <div className="w-12 h-12 bg-pink-500/10 rounded-2xl flex items-center justify-center border border-pink-500/20 group-hover:scale-105 transition-transform">
                  <Edit className="w-6 h-6 text-pink-400" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white mb-2">
                    Open Resume Editor Workspace
                  </h3>
                  <p className="text-neutral-400 text-sm leading-relaxed">
                    Formulate layout metrics, edit contact grids, auto-generate bullet copies using generative AI optimization structures, and download physical PDF sheets.
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2 text-sm font-semibold text-pink-400 mt-8 group-hover:text-pink-300 transition-colors">
                Open Resume Workspace
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>

          </div>

          {/* History Skeleton Section */}
          <div className="flex flex-col gap-6">
            <div className="flex items-center justify-between border-b border-neutral-900 pb-4">
              <h2 className="text-xl font-bold text-white flex items-center gap-2">
                <FileText className="w-5 h-5 text-neutral-500" />
                Your Saved Resumes
              </h2>
              <span className="text-xs bg-neutral-900 px-3 py-1 rounded-full text-neutral-500 font-medium">
                Convex Active Cache
              </span>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              
              {/* Skeleton Doc 1 */}
              <div className="bg-neutral-900/20 border border-neutral-800/80 rounded-2xl p-6 flex flex-col gap-4 hover:border-neutral-850 hover:bg-neutral-900/30 transition-all relative group cursor-pointer">
                <div className="flex items-start justify-between">
                  <div className="w-10 h-10 bg-neutral-950 border border-neutral-800 rounded-xl flex items-center justify-center">
                    <FileText className="w-5 h-5 text-purple-400" />
                  </div>
                  <span className="px-2 py-0.5 bg-purple-500/10 text-purple-400 text-[10px] font-semibold rounded-full border border-purple-500/20">
                    ATS Grade: A
                  </span>
                </div>
                <div>
                  <h4 className="font-bold text-neutral-200 text-sm group-hover:text-white transition-colors truncate">
                    Software_Engineer_CV.pdf
                  </h4>
                  <div className="flex items-center gap-1.5 text-xs text-neutral-500 mt-1">
                    <Calendar className="w-3.5 h-3.5" />
                    <span>Updated 2 days ago</span>
                  </div>
                </div>
              </div>

              {/* Skeleton Doc 2 */}
              <div className="bg-neutral-900/20 border border-neutral-800/80 rounded-2xl p-6 flex flex-col gap-4 hover:border-neutral-850 hover:bg-neutral-900/30 transition-all relative group cursor-pointer">
                <div className="flex items-start justify-between">
                  <div className="w-10 h-10 bg-neutral-950 border border-neutral-800 rounded-xl flex items-center justify-center">
                    <FileText className="w-5 h-5 text-pink-400" />
                  </div>
                  <span className="px-2 py-0.5 bg-pink-500/10 text-pink-400 text-[10px] font-semibold rounded-full border border-pink-500/20">
                    ATS Grade: B+
                  </span>
                </div>
                <div>
                  <h4 className="font-bold text-neutral-200 text-sm group-hover:text-white transition-colors truncate">
                    Product_Manager_Resume.pdf
                  </h4>
                  <div className="flex items-center gap-1.5 text-xs text-neutral-500 mt-1">
                    <Calendar className="w-3.5 h-3.5" />
                    <span>Updated 5 days ago</span>
                  </div>
                </div>
              </div>

              {/* Dash Border Empty State Trigger Card */}
              <Link href="/scan" className="bg-neutral-950/20 border border-dashed border-neutral-800 hover:border-purple-500/30 rounded-2xl p-6 flex flex-col items-center justify-center gap-3 text-center transition-all group min-h-[146px]">
                <div className="w-8 h-8 rounded-full bg-neutral-900 border border-neutral-800 flex items-center justify-center group-hover:bg-purple-500/10 group-hover:border-purple-500/20 transition-all">
                  <Plus className="w-4 h-4 text-neutral-400 group-hover:text-purple-400" />
                </div>
                <div>
                  <span className="text-xs font-semibold text-neutral-300 group-hover:text-white transition-colors">Create New Copy</span>
                  <p className="text-[10px] text-neutral-500 mt-0.5">Launch a scanner upload or blank editor workspace.</p>
                </div>
              </Link>

            </div>
          </div>

        </main>

        {/* Footer */}
        <footer className="border-t border-neutral-900/80 py-8 text-center text-neutral-500 text-sm relative z-10 bg-neutral-950/60 backdrop-blur-md mt-16">
          <p>&copy; {new Date().getFullYear()} YourRecruiter. All rights reserved.</p>
        </footer>
      </div>
    );
  }

  // Not signed in: Standard marketing landing page
  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-200 selection:bg-purple-500/30 font-sans flex flex-col">
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
