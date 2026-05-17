"use client";

import { motion } from "framer-motion";
import { User, Briefcase, Code } from "lucide-react";

export default function EditorPage() {
  return (
    <div className="min-h-[calc(100vh-4rem)] bg-neutral-950 text-neutral-200 selection:bg-purple-500/30 font-sans p-6 md:p-8 overflow-x-hidden">
      <div className="max-w-[1600px] mx-auto h-full grid lg:grid-cols-2 gap-8 items-start">
        
        {/* Left Column: Form Editor */}
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="bg-neutral-900/50 p-6 md:p-8 rounded-3xl border border-neutral-800 backdrop-blur-sm space-y-8 lg:sticky lg:top-24 max-h-[calc(100vh-8rem)] overflow-y-auto custom-scrollbar"
        >
          <div>
            <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
              <span className="w-8 h-8 rounded-lg bg-emerald-500/10 flex items-center justify-center border border-emerald-500/20 text-emerald-400">
                ✨
              </span>
              AI Resume Generator
            </h2>
            <p className="text-neutral-400 text-sm mb-8">
              Fill out your details below. The AI will automatically format, optimize, and generate a professional resume on the right.
            </p>
          </div>

          {/* Section: Personal Info */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-white flex items-center gap-2 border-b border-neutral-800 pb-2">
              <User className="w-5 h-5 text-purple-400" />
              Personal Info
            </h3>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-xs font-medium text-neutral-400">Full Name</label>
                <input type="text" placeholder="e.g. John Doe" className="w-full bg-neutral-950 border border-neutral-800 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500/50 transition-all placeholder:text-neutral-600" />
              </div>
              <div className="space-y-1">
                <label className="text-xs font-medium text-neutral-400">Job Title</label>
                <input type="text" placeholder="e.g. Frontend Engineer" className="w-full bg-neutral-950 border border-neutral-800 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500/50 transition-all placeholder:text-neutral-600" />
              </div>
              <div className="space-y-1">
                <label className="text-xs font-medium text-neutral-400">Email</label>
                <input type="email" placeholder="john@example.com" className="w-full bg-neutral-950 border border-neutral-800 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500/50 transition-all placeholder:text-neutral-600" />
              </div>
              <div className="space-y-1">
                <label className="text-xs font-medium text-neutral-400">Phone</label>
                <input type="tel" placeholder="+1 (555) 000-0000" className="w-full bg-neutral-950 border border-neutral-800 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500/50 transition-all placeholder:text-neutral-600" />
              </div>
            </div>
          </div>

          {/* Section: Work Experience */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-white flex items-center gap-2 border-b border-neutral-800 pb-2">
              <Briefcase className="w-5 h-5 text-pink-400" />
              Work Experience
            </h3>
            <div className="bg-neutral-950 p-4 rounded-xl border border-neutral-800 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-medium text-neutral-400">Company</label>
                  <input type="text" placeholder="e.g. Google" className="w-full bg-neutral-900 border border-neutral-800 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-pink-500/50 transition-all placeholder:text-neutral-600" />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-medium text-neutral-400">Role</label>
                  <input type="text" placeholder="e.g. Senior Developer" className="w-full bg-neutral-900 border border-neutral-800 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-pink-500/50 transition-all placeholder:text-neutral-600" />
                </div>
              </div>
              <div className="space-y-1">
                <label className="text-xs font-medium text-neutral-400">Description (AI will enhance this)</label>
                <textarea placeholder="Describe your achievements..." className="w-full bg-neutral-900 border border-neutral-800 rounded-lg px-3 py-2 text-sm min-h-[100px] resize-y focus:outline-none focus:ring-2 focus:ring-pink-500/50 transition-all placeholder:text-neutral-600" />
              </div>
            </div>
            <button className="text-sm text-pink-400 font-medium hover:text-pink-300 transition-colors">+ Add Experience</button>
          </div>

          {/* Section: Skills */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-white flex items-center gap-2 border-b border-neutral-800 pb-2">
              <Code className="w-5 h-5 text-emerald-400" />
              Technical Skills
            </h3>
            <div className="space-y-1">
              <label className="text-xs font-medium text-neutral-400">Comma separated skills</label>
              <textarea placeholder="React, TypeScript, Node.js, AWS..." className="w-full bg-neutral-950 border border-neutral-800 rounded-lg px-3 py-2 text-sm min-h-[80px] resize-y focus:outline-none focus:ring-2 focus:ring-emerald-500/50 transition-all placeholder:text-neutral-600" />
            </div>
          </div>
        </motion.div>

        {/* Right Column: Live A4 Preview */}
        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="w-full flex justify-center lg:sticky lg:top-24"
        >
          <div className="w-full max-w-[800px] aspect-[1/1.414] bg-white rounded shadow-2xl shadow-black/50 p-8 md:p-12 text-black flex flex-col relative overflow-hidden">
            {/* Placeholder content for A4 paper */}
            <div className="absolute inset-0 bg-[linear-gradient(transparent_0px,_transparent_calc(100%_-_1px),_#e5e5e5_calc(100%_-_1px))] bg-[length:100%_20px] pointer-events-none opacity-20" />
            
            <div className="text-center border-b-2 border-neutral-200 pb-6 mb-6">
              <h1 className="text-4xl font-bold tracking-tight text-neutral-900 mb-2">John Doe</h1>
              <p className="text-neutral-500 font-medium tracking-wide uppercase text-sm">Frontend Engineer</p>
              <div className="flex flex-wrap items-center justify-center gap-2 md:gap-4 text-xs text-neutral-400 mt-3">
                <span>john@example.com</span>
                <span className="hidden md:inline">•</span>
                <span>+1 (555) 000-0000</span>
              </div>
            </div>

            <div className="space-y-6 flex-grow">
              <section>
                <h2 className="text-lg font-bold text-neutral-900 uppercase tracking-wider mb-3 flex items-center gap-2">
                  Experience
                  <div className="h-px bg-neutral-200 flex-grow" />
                </h2>
                <div className="space-y-1">
                  <div className="flex justify-between items-baseline">
                    <h3 className="font-semibold text-neutral-800">Senior Developer</h3>
                    <span className="text-xs font-medium text-neutral-500 shrink-0">2021 - Present</span>
                  </div>
                  <p className="text-sm font-medium text-purple-600">Google</p>
                  <ul className="list-disc list-outside ml-4 mt-2 space-y-1 text-sm text-neutral-600">
                    <li>Led the development of a high-performance React application serving 2M+ users.</li>
                    <li>Architected a custom state management solution reducing render times by 40%.</li>
                  </ul>
                </div>
              </section>

              <section>
                <h2 className="text-lg font-bold text-neutral-900 uppercase tracking-wider mb-3 flex items-center gap-2">
                  Skills
                  <div className="h-px bg-neutral-200 flex-grow" />
                </h2>
                <div className="flex flex-wrap gap-2">
                  {['React', 'TypeScript', 'Node.js', 'AWS', 'Tailwind CSS'].map(skill => (
                    <span key={skill} className="px-2 py-1 bg-neutral-100 text-neutral-700 text-xs font-medium rounded">
                      {skill}
                    </span>
                  ))}
                </div>
              </section>
            </div>
            
            <div className="absolute inset-0 border-[16px] border-white/50 pointer-events-none" />
          </div>
        </motion.div>

      </div>
    </div>
  );
}
