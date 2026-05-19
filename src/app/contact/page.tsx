"use client";

import { useState } from "react";
import { Mail, Send, MessageSquare } from "lucide-react";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    email: "",
    message: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    setIsSubmitting(false);
    setSubmitted(true);
    setFormData({ email: "", message: "" });
    
    // Reset success message after 3 seconds
    setTimeout(() => setSubmitted(false), 3000);
  };

  return (
    <div className="min-h-screen bg-[#07090e] text-[#b4bcca] font-sans flex flex-col w-full relative overflow-x-hidden pt-16">
      
      {/* Premium Background Atmosphere */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-[1400px] h-[600px] bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-purple-900/15 via-emerald-950/5 to-transparent -z-10 blur-3xl pointer-events-none" />
      <div className="absolute top-[800px] right-0 w-[400px] h-[400px] bg-purple-950/10 -z-10 blur-[100px] pointer-events-none" />

      {/* Header Section */}
      <section className="flex flex-col items-center justify-center px-6 py-24 text-center max-w-5xl mx-auto relative z-10">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#10b981]/5 border border-[#10b981]/20 text-[#10b981]/80 text-xs font-black uppercase tracking-widest mb-8">
          <MessageSquare className="w-3 h-3" />
          Get In Touch
        </div>
        
        <h1 className="text-5xl md:text-7xl font-black tracking-tighter text-white max-w-4xl leading-[1.05] mb-6 uppercase italic">
          Contact <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#10b981] to-[#8b5cf6]">Us</span>
        </h1>
        
        <p className="text-base md:text-lg text-neutral-400 max-w-2xl mx-auto mb-12 leading-relaxed font-medium">
          Have questions or feedback? We'd love to hear from you.
        </p>
      </section>

      {/* Contact Form Section */}
      <section className="px-6 pb-24 relative z-10">
        <div className="max-w-2xl mx-auto">
          <div className="bg-gradient-to-br from-[#0a0d14] to-[#07090e] border border-[#121824] rounded-3xl p-12 relative overflow-hidden">
            <div className="absolute -top-32 -left-32 w-64 h-64 bg-[#10b981]/5 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute -bottom-32 -right-32 w-64 h-64 bg-[#8b5cf6]/5 rounded-full blur-3xl pointer-events-none" />

            <div className="relative z-10">
              {submitted ? (
                <div className="text-center py-12">
                  <div className="w-16 h-16 rounded-full bg-[#10b981]/10 border border-[#10b981]/20 flex items-center justify-center mx-auto mb-6 shadow-[0_0_20px_rgba(16,185,129,0.2)]">
                    <Send className="w-8 h-8 text-[#10b981]" />
                  </div>
                  <h3 className="text-2xl font-black text-white mb-4 uppercase tracking-tight">
                    Message Sent!
                  </h3>
                  <p className="text-neutral-400 text-sm">
                    We'll get back to you as soon as possible.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label htmlFor="email" className="block text-sm font-bold text-white uppercase tracking-wider mb-3">
                      Email Address
                    </label>
                    <div className="relative">
                      <div className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-500">
                        <Mail className="w-5 h-5" />
                      </div>
                      <input
                        type="email"
                        id="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="your@email.com"
                        className="w-full bg-[#07090e] border border-[#121824] rounded-xl px-4 py-3 pl-12 text-white placeholder-neutral-500 focus:outline-none focus:border-[#10b981]/50 focus:shadow-[0_0_15px_rgba(16,185,129,0.1)] transition-all"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-sm font-bold text-white uppercase tracking-wider mb-3">
                      Message
                    </label>
                    <textarea
                      id="message"
                      required
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Tell us what's on your mind..."
                      rows={6}
                      className="w-full bg-[#07090e] border border-[#121824] rounded-xl px-4 py-3 text-white placeholder-neutral-500 focus:outline-none focus:border-[#10b981]/50 focus:shadow-[0_0_15px_rgba(16,185,129,0.1)] transition-all resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full inline-flex items-center justify-center gap-3 bg-gradient-to-r from-[#10b981] to-[#059669] hover:from-[#34d399] hover:to-[#059669] text-[#07090e] font-black uppercase tracking-widest text-xs px-8 py-4 rounded-xl transition-all active:scale-[0.98] shadow-[0_0_30px_rgba(16,185,129,0.3)] hover:shadow-[0_0_40px_rgba(16,185,129,0.5)] disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="w-4 h-4 border-2 border-[#07090e] border-t-transparent rounded-full animate-spin" />
                        Sending...
                      </>
                    ) : (
                      <>
                        <Send className="w-4 h-4" />
                        Send Message
                      </>
                    )}
                  </button>
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
