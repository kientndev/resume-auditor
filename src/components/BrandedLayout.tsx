'use client';

import React from 'react';
import { useTheme } from '../context/ThemeContext';
import { LayoutDashboard, FileText, Settings, Users, Sparkles, LogOut, CheckCircle2 } from 'lucide-react';

interface BrandedLayoutProps {
  children: React.ReactNode;
}

export const BrandedLayout: React.FC<BrandedLayoutProps> = ({ children }) => {
  const { config } = useTheme();

  return (
    <div className="flex h-screen w-full overflow-hidden bg-neutral-950 text-neutral-100 font-sans">
      {/* Dynamic Sidebar */}
      <aside className="hidden md:flex md:w-64 md:flex-col bg-neutral-900/60 backdrop-blur-xl border-r border-neutral-800">
        {/* Sidebar Header */}
        <div className="flex items-center gap-3 px-6 py-5 border-b border-neutral-800">
          <img
            src={config.logoUrl}
            alt={`${config.organizationName} Logo`}
            className="w-10 h-10 rounded-lg object-cover shadow-lg border border-neutral-700"
          />
          <div>
            <h1 className="font-bold text-sm tracking-tight text-white line-clamp-1">
              {config.organizationName}
            </h1>
            <span className="text-[10px] uppercase font-semibold text-neutral-400 tracking-wider">
              Enterprise Hub
            </span>
          </div>
        </div>

        {/* Navigation Items */}
        <nav className="flex-1 px-4 py-6 space-y-1.5 overflow-y-auto">
          <a
            href="#"
            className="flex items-center gap-3 px-4 py-3 text-sm font-medium text-white bg-neutral-800/80 rounded-xl transition-all duration-300"
            style={{
              borderLeft: `3px solid var(--color-primary)`,
            }}
          >
            <LayoutDashboard className="w-5 h-5 text-primary" style={{ color: 'var(--color-primary)' }} />
            <span>Dashboard</span>
          </a>

          {config.features.enableResumeAudit && (
            <a
              href="#"
              className="flex items-center gap-3 px-4 py-3 text-sm font-medium text-neutral-400 hover:text-white hover:bg-neutral-800/40 rounded-xl transition-all duration-300 group"
            >
              <FileText className="w-5 h-5 group-hover:text-primary transition-colors" />
              <span>Resume Audit</span>
              <span 
                className="ml-auto text-[10px] font-semibold px-2 py-0.5 rounded-full text-white bg-primary"
                style={{ backgroundColor: 'var(--color-primary)' }}
              >
                AI
              </span>
            </a>
          )}

          {config.features.enableMatching && (
            <a
              href="#"
              className="flex items-center gap-3 px-4 py-3 text-sm font-medium text-neutral-400 hover:text-white hover:bg-neutral-800/40 rounded-xl transition-all duration-300 group"
            >
              <Users className="w-5 h-5 group-hover:text-accent transition-colors" />
              <span>Candidate Matching</span>
              <span 
                className="ml-auto text-[10px] font-semibold px-2 py-0.5 rounded-full text-white bg-accent"
                style={{ backgroundColor: 'var(--color-accent)' }}
              >
                PRO
              </span>
            </a>
          )}

          <a
            href="#"
            className="flex items-center gap-3 px-4 py-3 text-sm font-medium text-neutral-400 hover:text-white hover:bg-neutral-800/40 rounded-xl transition-all duration-300"
          >
            <Settings className="w-5 h-5" />
            <span>Settings</span>
          </a>
        </nav>

        {/* Sidebar Footer */}
        <div className="p-4 border-t border-neutral-800">
          <button className="flex items-center gap-3 w-full px-4 py-3 text-sm font-medium text-neutral-400 hover:text-red-400 hover:bg-red-500/10 rounded-xl transition-all duration-300">
            <LogOut className="w-5 h-5" />
            <span>Sign Out</span>
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top Header */}
        <header className="h-16 flex items-center justify-between px-6 bg-neutral-900/40 backdrop-blur-xl border-b border-neutral-800">
          <div className="flex items-center gap-4">
            {/* Small screen mobile logo */}
            <img
              src={config.logoUrl}
              alt="Logo"
              className="md:hidden w-8 h-8 rounded-md object-cover"
            />
            <h2 className="text-lg font-semibold text-white tracking-tight hidden sm:block">
              Welcome to {config.organizationName}
            </h2>
          </div>

          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-neutral-800 border border-neutral-700 text-xs text-neutral-300">
              <span className="w-2 h-2 rounded-full animate-ping bg-accent" style={{ backgroundColor: 'var(--color-accent)' }} />
              <span>Status: Active</span>
            </div>
            
            {/* Dynamic Button utilizing primary and hover secondary styles */}
            <button
              className="flex items-center gap-2 px-4 py-2 text-sm font-semibold rounded-xl text-white shadow-lg transition-all duration-300 hover:opacity-90 active:scale-95"
              style={{
                background: `linear-gradient(135deg, var(--color-primary), var(--color-secondary))`,
              }}
            >
              <Sparkles className="w-4 h-4" />
              <span>New Action</span>
            </button>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto p-6 md:p-8">
          <div className="max-w-5xl mx-auto space-y-6">
            
            {/* Interactive Demo Header */}
            <div 
              className="p-8 rounded-3xl relative overflow-hidden border border-neutral-800 shadow-2xl"
              style={{
                background: `linear-gradient(135deg, rgba(23, 23, 23, 0.8), rgba(10, 10, 10, 0.9))`
              }}
            >
              {/* Abstract branded ambient background glow */}
              <div 
                className="absolute -top-24 -right-24 w-72 h-72 rounded-full blur-[100px] opacity-20 pointer-events-none"
                style={{ backgroundColor: 'var(--color-primary)' }}
              />
              <div 
                className="absolute -bottom-24 -left-24 w-72 h-72 rounded-full blur-[100px] opacity-10 pointer-events-none"
                style={{ backgroundColor: 'var(--color-accent)' }}
              />

              <div className="relative z-10 space-y-4">
                <span 
                  className="inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1 rounded-full text-white bg-primary"
                  style={{ backgroundColor: 'var(--color-primary)' }}
                >
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  White-label Theme System Active
                </span>
                
                <h1 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight">
                  Fully Rebranded UI Experience
                </h1>
                
                <p className="text-neutral-400 max-w-2xl text-sm md:text-base leading-relaxed">
                  You are viewing the custom portal tailored for <strong className="text-white">{config.organizationName}</strong>. 
                  All buttons, icons, accents, and visual assets are driven entirely by your tenant configurations 
                  injecting real-time CSS variables.
                </p>
              </div>
            </div>

            {/* Dynamic Slot Content */}
            <div className="mt-8">
              {children}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};
