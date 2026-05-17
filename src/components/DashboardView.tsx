"use client";

import Link from "next/link";
import { ArrowRight, Target, Edit, FileText, Plus, Calendar, Sparkles } from "lucide-react";
import { useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";

interface DashboardViewProps {
  user: any;
}

export default function DashboardView({ user }: DashboardViewProps) {
  const resumes = useQuery(
    api.resumes.getUserResumes,
    user?.id ? { userId: user.id } : "skip"
  );

  const getRelativeTime = (timestamp: number) => {
    const diff = timestamp - Date.now();
    const days = Math.round(diff / (1000 * 60 * 60 * 24));
    
    if (Math.abs(days) < 1) {
      const hours = Math.round(diff / (1000 * 60 * 60));
      if (Math.abs(hours) < 1) {
        return "Just now";
      }
      return `${Math.abs(hours)} hour${Math.abs(hours) > 1 ? "s" : ""} ago`;
    }
    return `${Math.abs(days)} day${Math.abs(days) > 1 ? "s" : ""} ago`;
  };

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
            Welcome back, {user?.firstName || "Developer"}! 👋
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
                  Audit New Resume 🔍
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
                  Open Editor Workspace 📝
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
            
            {resumes === undefined ? (
              // Loading skeletons
              <>
                <div className="bg-neutral-900/20 border border-neutral-800/80 rounded-2xl p-6 flex flex-col gap-4 animate-pulse min-h-[146px]">
                  <div className="flex items-start justify-between">
                    <div className="w-10 h-10 bg-neutral-950 border border-neutral-800 rounded-xl" />
                    <div className="w-20 h-6 bg-neutral-900 rounded-full" />
                  </div>
                  <div className="flex flex-col gap-2">
                    <div className="w-2/3 h-4 bg-neutral-900 rounded" />
                    <div className="w-1/3 h-3 bg-neutral-900 rounded" />
                  </div>
                </div>
                <div className="bg-neutral-900/20 border border-neutral-800/80 rounded-2xl p-6 flex flex-col gap-4 animate-pulse min-h-[146px]">
                  <div className="flex items-start justify-between">
                    <div className="w-10 h-10 bg-neutral-950 border border-neutral-800 rounded-xl" />
                    <div className="w-20 h-6 bg-neutral-900 rounded-full" />
                  </div>
                  <div className="flex flex-col gap-2">
                    <div className="w-2/3 h-4 bg-neutral-900 rounded" />
                    <div className="w-1/3 h-3 bg-neutral-900 rounded" />
                  </div>
                </div>
              </>
            ) : resumes && resumes.length > 0 ? (
              resumes.map((resume) => {
                const isGradeA = resume.grade.startsWith("A");
                const isGradeB = resume.grade.startsWith("B");
                
                return (
                  <Link 
                    key={resume._id} 
                    href={`/editor?id=${resume._id}`}
                    className="bg-neutral-900/20 border border-neutral-800/80 rounded-2xl p-6 flex flex-col gap-4 hover:border-neutral-700 hover:bg-neutral-900/30 transition-all relative group cursor-pointer"
                  >
                    <div className="flex items-start justify-between">
                      <div className="w-10 h-10 bg-neutral-950 border border-neutral-800 rounded-xl flex items-center justify-center">
                        <FileText className={`w-5 h-5 ${isGradeA ? "text-purple-400" : isGradeB ? "text-pink-400" : "text-neutral-400"}`} />
                      </div>
                      <span className={`px-2.5 py-0.5 text-[10px] font-bold rounded-full border ${
                        isGradeA 
                          ? "bg-purple-500/10 text-purple-400 border-purple-500/20" 
                          : isGradeB 
                            ? "bg-pink-500/10 text-pink-400 border-pink-500/20" 
                            : "bg-neutral-500/10 text-neutral-400 border-neutral-500/20"
                      }`}>
                        ATS Grade: {resume.grade}
                      </span>
                    </div>
                    <div>
                      <h4 className="font-bold text-neutral-200 text-sm group-hover:text-white transition-colors truncate">
                        {resume.fullName || "Untitled Resume"}
                      </h4>
                      <p className="text-xs text-neutral-400 truncate mt-0.5">{resume.jobTitle || "No title specified"}</p>
                      <div className="flex items-center gap-1.5 text-xs text-neutral-500 mt-2">
                        <Calendar className="w-3.5 h-3.5" />
                        <span>Updated {getRelativeTime(resume.updatedAt)}</span>
                      </div>
                    </div>
                  </Link>
                );
              })
            ) : null}

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
