"use client";

import { useState, FormEvent } from "react";
import { Check, Zap, Crown, Sparkles, Loader2, PartyPopper, Mail } from "lucide-react";
import Link from "next/link";

export default function PricingPage() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [message, setMessage] = useState("");

  const handleWaitlistSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const trimmed = email.trim();

    // Basic email validation
    if (!trimmed || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmed)) {
      setStatus("error");
      setMessage("Please enter a valid email address.");
      return;
    }

    setStatus("loading");
    try {
      const res = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: trimmed }),
      });
      const result = await res.json();

      if (!res.ok) {
        throw new Error(result.error || "Something went wrong. Please try again.");
      }

      setStatus("success");
      setMessage(result.message);
    } catch (error) {
      setStatus("error");
      setMessage(error instanceof Error ? error.message : "Something went wrong. Please try again.");
    }
  };

  return (
    <div className="min-h-screen bg-[#07090e] text-[#b4bcca] font-sans flex flex-col w-full relative overflow-x-hidden pt-16">
      
      {/* Premium Background Atmosphere */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-[1400px] h-[600px] bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-purple-900/15 via-emerald-950/5 to-transparent -z-10 blur-3xl pointer-events-none" />
      <div className="absolute top-[800px] right-0 w-[400px] h-[400px] bg-purple-950/10 -z-10 blur-[100px] pointer-events-none" />

      {/* Header Section */}
      <section className="flex flex-col items-center justify-center px-6 py-24 text-center max-w-5xl mx-auto relative z-10">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#10b981]/5 border border-[#10b981]/20 text-[#10b981]/80 text-xs font-black uppercase tracking-widest mb-8">
          <Sparkles className="w-3 h-3" />
          Simple, Transparent Pricing
        </div>
        
        <h1 className="text-5xl md:text-7xl font-black tracking-tighter text-white max-w-4xl leading-[1.05] mb-6 uppercase italic">
          Choose Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#10b981] to-[#8b5cf6]">Plan</span>
        </h1>
        
        <p className="text-base md:text-lg text-neutral-400 max-w-2xl mx-auto mb-12 leading-relaxed font-medium">
          Start free, upgrade when you need unlimited AI-powered resume optimization.
        </p>
      </section>

      {/* Pricing Grid */}
      <section className="px-6 pb-24 relative z-10">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-8">
          
          {/* Free Tier */}
          <div className="bg-[#0a0d14]/90 border border-[#121824] rounded-3xl p-8 relative overflow-hidden hover:border-[#121824]/80 transition-all duration-300">
            <div className="flex flex-col h-full">
              <div className="mb-8">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-xl bg-neutral-900/80 border border-[#121824] flex items-center justify-center">
                    <Zap className="w-5 h-5 text-neutral-400" />
                  </div>
                  <h3 className="text-2xl font-black text-white uppercase tracking-tight">Free Tier</h3>
                </div>
                <div className="flex items-baseline gap-2 mb-2">
                  <span className="text-5xl font-black text-white">$0</span>
                  <span className="text-neutral-500 text-sm font-medium">/month</span>
                </div>
                <p className="text-neutral-400 text-sm">Perfect for getting started with AI resume auditing</p>
              </div>

              <ul className="flex-1 space-y-4 mb-8">
                <li className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-[#10b981] flex-shrink-0 mt-0.5" />
                  <span className="text-sm text-neutral-300">3 AI Resume Audits per month</span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-[#10b981] flex-shrink-0 mt-0.5" />
                  <span className="text-sm text-neutral-300">Standard editor access</span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-[#10b981] flex-shrink-0 mt-0.5" />
                  <span className="text-sm text-neutral-300">Basic ATS compatibility check</span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-[#10b981] flex-shrink-0 mt-0.5" />
                  <span className="text-sm text-neutral-300">Secure local processing</span>
                </li>
              </ul>

              <Link 
                href="/scan"
                className="w-full inline-flex items-center justify-center bg-neutral-900 hover:bg-neutral-800 text-white text-sm font-semibold px-6 py-3 rounded-xl transition-all active:scale-[0.98] border border-[#121824] cursor-pointer"
              >
                Get Started Free
              </Link>
            </div>
          </div>

          {/* Pro Tier */}
          <div className="bg-[#0a0d14]/90 border-2 border-[#8b5cf6] rounded-3xl p-8 relative overflow-hidden hover:border-[#8b5cf6]/80 transition-all duration-300 shadow-[0_0_40px_rgba(139,92,246,0.15)] hover:shadow-[0_0_60px_rgba(139,92,246,0.25)]">
            {/* Pro Badge */}
            <div className="absolute top-0 right-0 bg-gradient-to-l from-[#8b5cf6] to-purple-600 text-white text-[10px] font-black uppercase tracking-wider px-4 py-1.5 rounded-bl-xl">
              Most Popular
            </div>

            <div className="flex flex-col h-full">
              <div className="mb-8">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-xl bg-[#8b5cf6]/10 border border-[#8b5cf6]/30 flex items-center justify-center shadow-[0_0_15px_rgba(139,92,246,0.2)]">
                    <Crown className="w-5 h-5 text-[#8b5cf6]" />
                  </div>
                  <h3 className="text-2xl font-black text-white uppercase tracking-tight">Pro Tier</h3>
                </div>
                <div className="flex items-baseline gap-2 mb-2">
                  <span className="text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-[#8b5cf6] to-purple-400">$12</span>
                  <span className="text-neutral-500 text-sm font-medium">/month</span>
                </div>
                <p className="text-neutral-400 text-sm">Unlock unlimited AI-powered optimization</p>
              </div>

              <ul className="flex-1 space-y-4 mb-8">
                <li className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-[#8b5cf6] flex-shrink-0 mt-0.5" />
                  <span className="text-sm text-neutral-300 font-medium">Unlimited AI Resume Audits</span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-[#8b5cf6] flex-shrink-0 mt-0.5" />
                  <span className="text-sm text-neutral-300 font-medium">Deep-dive metric breakdown pages</span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-[#8b5cf6] flex-shrink-0 mt-0.5" />
                  <span className="text-sm text-neutral-300 font-medium">Premium template exports (PDF, DOCX)</span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-[#8b5cf6] flex-shrink-0 mt-0.5" />
                  <span className="text-sm text-neutral-300 font-medium">Priority generation speeds</span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-[#8b5cf6] flex-shrink-0 mt-0.5" />
                  <span className="text-sm text-neutral-300 font-medium">Advanced ATS scoring algorithms</span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-[#8b5cf6] flex-shrink-0 mt-0.5" />
                  <span className="text-sm text-neutral-300 font-medium">Priority support</span>
                </li>
              </ul>

              {/* Waitlist Form / CTA */}
              {status === "success" ? (
                <div className="space-y-3 animate-in fade-in duration-500">
                  <div className="flex items-center justify-center gap-2 bg-[#8b5cf6]/10 border border-[#8b5cf6]/30 rounded-xl px-4 py-3">
                    <PartyPopper className="w-5 h-5 text-[#8b5cf6] flex-shrink-0" />
                    <span className="text-sm text-[#8b5cf6] font-semibold">{message}</span>
                  </div>
                  <p className="text-center text-neutral-500 text-xs">
                    Your <span className="text-[#8b5cf6] font-bold">15% launch discount</span> is reserved.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleWaitlistSubmit} className="space-y-3">
                  <div className="relative">
                    <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-500 pointer-events-none" />
                    <input
                      id="waitlist-email"
                      type="email"
                      placeholder="Enter your email to join the waitlist"
                      value={email}
                      onChange={(e) => {
                        setEmail(e.target.value);
                        if (status === "error") setStatus("idle");
                      }}
                      disabled={status === "loading"}
                      className="w-full bg-[#0d1117] border border-[#8b5cf6]/30 focus:border-[#8b5cf6] rounded-xl px-4 py-3 pl-10 text-sm text-white placeholder:text-neutral-500 outline-none transition-all disabled:opacity-50"
                    />
                  </div>

                  {status === "error" && (
                    <p className="text-red-400 text-xs px-1 animate-in fade-in duration-300">{message}</p>
                  )}

                  <button
                    type="submit"
                    disabled={status === "loading"}
                    className="w-full inline-flex items-center justify-center gap-2 bg-gradient-to-r from-[#8b5cf6] to-purple-600 hover:from-purple-500 hover:to-purple-500 text-white text-sm font-semibold px-6 py-3 rounded-xl transition-all active:scale-[0.98] shadow-[0_0_20px_rgba(139,92,246,0.3)] hover:shadow-[0_0_30px_rgba(139,92,246,0.5)] cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed"
                  >
                    {status === "loading" ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        Joining...
                      </>
                    ) : (
                      "Join Waitlist — Get 15% Off"
                    )}
                  </button>

                  <p className="text-center text-neutral-500 text-xs">
                    Pro is coming soon. Join the waitlist to lock in a <span className="text-[#8b5cf6] font-bold">15% early-bird discount</span>.
                  </p>
                </form>
              )}
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
