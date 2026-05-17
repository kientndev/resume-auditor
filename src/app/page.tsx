"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FileText, Key, Loader2, Send, AlertCircle, RefreshCcw } from "lucide-react";
import ReactMarkdown from "react-markdown";

export default function Home() {
  const [apiKey, setApiKey] = useState("");
  const [resumeText, setResumeText] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleAudit = async () => {
    if (!apiKey) {
      setError("Please provide an OpenAI API Key.");
      return;
    }
    if (!resumeText.trim()) {
      setError("Please provide some resume text.");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const res = await fetch("/api/audit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ resumeText, apiKey }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Failed to audit resume");
      }

      setResult(data.result);
    } catch (err: any) {
      setError(err.message || "An unexpected error occurred.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-200 selection:bg-purple-500/30 font-sans">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-neutral-900 via-neutral-950 to-neutral-950 -z-10" />
      
      <main className="max-w-5xl mx-auto px-6 py-12 md:py-20 flex flex-col gap-12 relative z-10">
        <header className="text-center space-y-4">
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center justify-center p-3 bg-purple-500/10 rounded-2xl mb-2 border border-purple-500/20"
          >
            <FileText className="w-8 h-8 text-purple-400" />
          </motion.div>
          <motion.h1 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-6xl font-bold tracking-tight text-white"
          >
            AI Resume <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-500">Auditor</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-neutral-400 max-w-2xl mx-auto text-lg"
          >
            Get a brutally honest, highly constructive breakdown of your resume from an elite AI tech recruiter.
          </motion.p>
        </header>

        <div className="grid lg:grid-cols-2 gap-8 items-start">
          {/* Input Section */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="space-y-6 bg-neutral-900/50 p-6 md:p-8 rounded-3xl border border-neutral-800 backdrop-blur-sm"
          >
            <div className="space-y-2">
              <label className="text-sm font-medium text-neutral-300 flex items-center gap-2">
                <Key className="w-4 h-4 text-purple-400" />
                OpenAI API Key
              </label>
              <input 
                type="password"
                value={apiKey}
                onChange={(e) => setApiKey(e.target.value)}
                placeholder="sk-..."
                className="w-full bg-neutral-950 border border-neutral-800 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500 transition-all placeholder:text-neutral-600"
              />
              <p className="text-xs text-neutral-500">Your key is only used for this session and is never stored.</p>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-neutral-300 flex items-center gap-2">
                <FileText className="w-4 h-4 text-pink-400" />
                Resume / CV Text
              </label>
              <textarea 
                value={resumeText}
                onChange={(e) => setResumeText(e.target.value)}
                placeholder="Paste the extracted text of your resume here..."
                className="w-full bg-neutral-950 border border-neutral-800 rounded-xl px-4 py-3 text-sm min-h-[300px] resize-y focus:outline-none focus:ring-2 focus:ring-pink-500/50 focus:border-pink-500 transition-all placeholder:text-neutral-600"
              />
            </div>

            {error && (
              <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-xl flex items-start gap-3 text-red-400 text-sm">
                <AlertCircle className="w-5 h-5 shrink-0" />
                <p>{error}</p>
              </div>
            )}

            <button 
              onClick={handleAudit}
              disabled={loading}
              className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-400 hover:to-pink-400 text-white font-medium py-4 rounded-xl transition-all active:scale-[0.98] disabled:opacity-50 disabled:pointer-events-none shadow-lg shadow-purple-500/20"
            >
              {loading ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Auditing Resume...
                </>
              ) : (
                <>
                  <Send className="w-5 h-5" />
                  Audit My Resume
                </>
              )}
            </button>
          </motion.div>

          {/* Output Section */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
            className="lg:sticky lg:top-8"
          >
            <div className="bg-neutral-900/50 rounded-3xl border border-neutral-800 backdrop-blur-sm overflow-hidden h-full min-h-[600px] flex flex-col">
              <div className="p-6 border-b border-neutral-800 bg-neutral-900/80 flex items-center justify-between">
                <h2 className="font-semibold flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                  Audit Results
                </h2>
                {result && (
                  <button 
                    onClick={() => {
                      setResult(null);
                      setResumeText("");
                    }}
                    className="text-neutral-400 hover:text-white transition-colors flex items-center gap-2 text-sm"
                  >
                    <RefreshCcw className="w-4 h-4" />
                    Reset
                  </button>
                )}
              </div>
              
              <div className="p-6 md:p-8 flex-grow overflow-y-auto custom-scrollbar">
                <AnimatePresence mode="wait">
                  {!result && !loading && (
                    <motion.div 
                      key="empty"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="h-full flex flex-col items-center justify-center text-center text-neutral-500 space-y-4"
                    >
                      <div className="w-16 h-16 rounded-2xl bg-neutral-800/50 flex items-center justify-center border border-neutral-800">
                        <FileText className="w-8 h-8 text-neutral-600" />
                      </div>
                      <p>Your brutal, honest feedback will appear here.</p>
                    </motion.div>
                  )}

                  {loading && (
                    <motion.div 
                      key="loading"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="h-full flex flex-col items-center justify-center text-center text-purple-400 space-y-4"
                    >
                      <Loader2 className="w-12 h-12 animate-spin" />
                      <p className="animate-pulse">Analyzing the impact & metrics...</p>
                    </motion.div>
                  )}

                  {result && (
                    <motion.div 
                      key="result"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="prose prose-invert prose-purple max-w-none prose-headings:font-bold prose-h3:text-2xl prose-h3:mt-8 prose-h3:mb-4 prose-p:text-neutral-300 prose-li:text-neutral-300 prose-strong:text-purple-300"
                    >
                      <ReactMarkdown>{result}</ReactMarkdown>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </motion.div>
        </div>
      </main>
      
      <style dangerouslySetInnerHTML={{__html: `
        .custom-scrollbar::-webkit-scrollbar {
          width: 8px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background-color: #333;
          border-radius: 20px;
        }
      `}} />
    </div>
  );
}
