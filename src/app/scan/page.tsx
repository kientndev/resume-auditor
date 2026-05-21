"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FileText, Loader2, Send, AlertCircle, RefreshCcw, ArrowLeft, Image as ImageIcon, UploadCloud, Type, CheckCircle } from "lucide-react";
import ReactMarkdown from "react-markdown";
import Link from "next/link";
import { trackEvent } from "@/utils/analytics";

const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10 MB

export default function ScanPage() {
  const [mode, setMode] = useState<"text" | "file">("text");
  const [resumeText, setResumeText] = useState("");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleFileChange = (file: File) => {
    setError(null);
    const ext = file.name.substring(file.name.lastIndexOf('.')).toLowerCase();
    const allowedExts = ['.pdf', '.docx', '.doc', '.txt', '.png', '.jpeg', '.jpg'];
    const excelExts = ['.xlsx', '.xls', '.csv'];

    if (file.size > MAX_FILE_SIZE) {
      setError("File is too large. Maximum allowed size is 10 MB.");
      setSelectedFile(null);
      if (fileInputRef.current) fileInputRef.current.value = "";
      return;
    }

    if (excelExts.includes(ext)) {
      setError("Excel files (.xlsx, .xls, .csv) are explicitly blocked. Please upload a PDF, Word document, text file, or image instead.");
      setSelectedFile(null);
      if (fileInputRef.current) fileInputRef.current.value = "";
      return;
    }

    if (!allowedExts.includes(ext)) {
      setError("Unsupported file format. Please upload a PDF, Word document (.docx, .doc), text file (.txt), or image (.png, .jpeg, .jpg).");
      setSelectedFile(null);
      if (fileInputRef.current) fileInputRef.current.value = "";
      return;
    }

    setSelectedFile(file);
  };

  const handleAudit = async () => {
    if (mode === "text" && !resumeText.trim()) {
      setError("Please provide some resume text.");
      return;
    }
    if (mode === "file" && !selectedFile) {
      setError("Please select a file to upload.");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const formData = new FormData();
      formData.append("mode", mode);
      
      if (mode === "text") {
        formData.append("resumeText", resumeText);
      } else if (mode === "file" && selectedFile) {
        formData.append("file", selectedFile);
      }

      const res = await fetch("/api/audit", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Failed to audit resume");
      }

      setResult(data.result);
      trackEvent("resume_audited", { mode });
    } catch (err: any) {
      setError(err.message || "An unexpected error occurred.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-200 selection:bg-purple-500/30 font-sans">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-neutral-900 via-neutral-950 to-neutral-950 -z-10" />
      
      <main className="max-w-5xl mx-auto px-6 py-12 md:py-20 flex flex-col gap-8 relative z-10">
        
        {/* Back Button */}
        <div>
          <Link href="/" className="inline-flex items-center gap-2 text-sm text-neutral-400 hover:text-white transition-colors group">
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            Back to Home
          </Link>
        </div>

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
            className="text-4xl md:text-5xl font-bold tracking-tight text-white"
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

        <div className="grid lg:grid-cols-2 gap-8 items-start mt-4">
          {/* Input Section */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="space-y-6 bg-neutral-900/50 p-6 md:p-8 rounded-3xl border border-neutral-800 backdrop-blur-sm"
          >
            {/* Mode Switcher */}
            <div className="flex bg-neutral-950 p-1 rounded-xl border border-neutral-800">
              <button
                onClick={() => setMode("text")}
                className={`flex-1 flex items-center justify-center gap-2 py-2.5 text-sm font-medium rounded-lg transition-all ${
                  mode === "text" 
                    ? "bg-neutral-800 text-white shadow-sm" 
                    : "text-neutral-400 hover:text-neutral-200"
                }`}
              >
                <Type className="w-4 h-4" />
                Paste Text
              </button>
              <button
                onClick={() => setMode("file")}
                className={`flex-1 flex items-center justify-center gap-2 py-2.5 text-sm font-medium rounded-lg transition-all ${
                  mode === "file" 
                    ? "bg-neutral-800 text-white shadow-sm" 
                    : "text-neutral-400 hover:text-neutral-200"
                }`}
              >
                <UploadCloud className="w-4 h-4" />
                Upload Resume
              </button>
            </div>

            {mode === "text" ? (
              <div className="space-y-2">
                <label className="text-sm font-medium text-neutral-300 flex items-center gap-2">
                  <FileText className="w-4 h-4 text-pink-400" />
                  Resume / CV Text
                </label>
                <textarea 
                  value={resumeText}
                  onChange={(e) => setResumeText(e.target.value)}
                  placeholder="Paste the extracted text of your resume here..."
                  className="w-full bg-neutral-950 border border-neutral-800 rounded-xl px-4 py-3 text-sm min-h-[380px] resize-y focus:outline-none focus:ring-2 focus:ring-pink-500/50 focus:border-pink-500 transition-all placeholder:text-neutral-600"
                />
              </div>
            ) : (
              <div className="space-y-2">
                <label className="text-sm font-medium text-neutral-300 flex items-center gap-2">
                  <UploadCloud className="w-4 h-4 text-pink-400" />
                  Resume / CV File
                </label>
                
                <input 
                  type="file" 
                  accept=".pdf,.docx,.doc,.txt,image/png,image/jpeg,image/jpg" 
                  className="hidden" 
                  ref={fileInputRef}
                  onChange={(e) => {
                    if (e.target.files && e.target.files.length > 0) {
                      handleFileChange(e.target.files[0]);
                    }
                  }}
                />

                <div 
                  onClick={() => fileInputRef.current?.click()}
                  className={`w-full border-2 border-dashed rounded-xl px-4 py-12 flex flex-col items-center justify-center min-h-[380px] transition-all cursor-pointer group ${
                    selectedFile 
                      ? "bg-purple-500/5 border-purple-500/50 hover:border-purple-400" 
                      : "bg-neutral-950 border-neutral-800 hover:border-pink-500/50"
                  }`}
                >
                  {selectedFile ? (
                    <>
                      <div className="w-16 h-16 rounded-full bg-purple-500/20 flex items-center justify-center mb-4">
                        <CheckCircle className="w-8 h-8 text-purple-400" />
                      </div>
                      <p className="text-purple-300 font-medium mb-1 text-center truncate max-w-[250px]">
                        {selectedFile.name}
                      </p>
                      <p className="text-purple-400/60 text-xs">Click to change file</p>
                    </>
                  ) : (
                    <>
                      <div className="w-16 h-16 rounded-full bg-neutral-900 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                        <UploadCloud className="w-8 h-8 text-neutral-400 group-hover:text-pink-400 transition-colors" />
                      </div>
                      <p className="text-neutral-300 font-medium mb-1 text-center">Click to upload your resume</p>
                      <p className="text-neutral-500 text-xs text-center px-4 max-w-sm">
                        Supports PDF, Word (.docx, .doc), Text (.txt), or Images (PNG, JPEG)
                      </p>
                    </>
                  )}
                </div>
              </div>
            )}

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
            <div className="bg-neutral-900/50 rounded-3xl border border-neutral-800 backdrop-blur-sm overflow-hidden h-[600px] max-h-[calc(100vh-4rem)] flex flex-col">
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
                      className="flex flex-col gap-6"
                    >
                      <div className="prose prose-invert prose-purple max-w-none prose-headings:font-bold prose-h3:text-2xl prose-h3:mt-8 prose-h3:mb-4 prose-p:text-neutral-300 prose-li:text-neutral-300 prose-strong:text-purple-300">
                        <ReactMarkdown>{result}</ReactMarkdown>
                      </div>

                      <div className="pt-6 border-t border-neutral-800">
                        <Link 
                          href="/editor"
                          className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-white font-bold py-4 rounded-xl transition-all active:scale-[0.98] shadow-[0_0_20px_rgba(16,185,129,0.3)] hover:shadow-[0_0_30px_rgba(16,185,129,0.5)] text-lg"
                        >
                          ✨ Fix with AI Generator
                        </Link>
                      </div>
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
