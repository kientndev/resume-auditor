"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { User, Briefcase, Code, Sparkles, Loader2, FileText, Eye, Download, X, Mail, Phone, Plus, Trash2 } from "lucide-react";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import { trackEvent } from "@/utils/analytics";

interface Experience {
  role: string;
  company: string;
  duration: string;
  bullets: string[];
}

interface ResumeData {
  personalInfo: {
    fullName: string;
    jobTitle: string;
    email: string;
    phone: string;
  };
  experience: Experience[];
  skills: string[];
}

export default function EditorPage() {
  const [rawText, setRawText] = useState("");
  const [loading, setLoading] = useState(false);
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);
  
  const [resumeData, setResumeData] = useState<ResumeData>({
    personalInfo: {
      fullName: 'John Doe',
      jobTitle: 'Frontend Engineer',
      email: 'john@example.com',
      phone: '+1 (555) 000-0000'
    },
    experience: [
      {
        role: 'Senior Developer',
        company: 'Google',
        duration: '2021 - Present',
        bullets: [
          'Led the development of a high-performance React application serving 2M+ users.',
          'Architected a custom state management solution reducing render times by 40%.'
        ]
      }
    ],
    skills: ['React', 'TypeScript', 'Node.js', 'AWS', 'Tailwind CSS']
  });

  const handleGenerate = async () => {
    if (!rawText.trim()) return;
    setLoading(true);
    try {
      const res = await fetch("/api/generate-resume", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ resumeText: rawText })
      });
      const data = await res.json();
      if (data.result) {
        setResumeData(data.result);
        trackEvent("resume_generated", {
          fullName: data.result.personalInfo?.fullName || "Anonymous",
          jobTitle: data.result.personalInfo?.jobTitle || "Unknown"
        });
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const updatePersonalInfo = (field: keyof ResumeData['personalInfo'], value: string) => {
    setResumeData(prev => ({
      ...prev,
      personalInfo: { ...prev.personalInfo, [field]: value }
    }));
  };

  const updateExperience = (index: number, field: keyof Experience, value: any) => {
    const newExp = [...resumeData.experience];
    newExp[index] = { ...newExp[index], [field]: value };
    setResumeData(prev => ({ ...prev, experience: newExp }));
  };

  const addExperience = () => {
    setResumeData(prev => ({
      ...prev,
      experience: [...prev.experience, { role: '', company: '', duration: '', bullets: [''] }]
    }));
  };

  const removeExperience = (index: number) => {
    const newExp = resumeData.experience.filter((_, i) => i !== index);
    setResumeData(prev => ({ ...prev, experience: newExp }));
  };

  const addBullet = (expIndex: number) => {
    const newExp = [...resumeData.experience];
    newExp[expIndex].bullets = [...newExp[expIndex].bullets, ''];
    setResumeData(prev => ({ ...prev, experience: newExp }));
  };

  const removeBullet = (expIndex: number, bulletIndex: number) => {
    const newExp = [...resumeData.experience];
    newExp[expIndex].bullets = newExp[expIndex].bullets.filter((_, i) => i !== bulletIndex);
    setResumeData(prev => ({ ...prev, experience: newExp }));
  };

  const updateBullet = (expIndex: number, bulletIndex: number, value: string) => {
    const newExp = [...resumeData.experience];
    newExp[expIndex].bullets[bulletIndex] = value;
    setResumeData(prev => ({ ...prev, experience: newExp }));
  };

  const updateSkills = (value: string) => {
    const skillsArray = value.split(',').map(s => s.trim());
    setResumeData(prev => ({ ...prev, skills: skillsArray }));
  };

  const downloadPdf = async () => {
    const element = document.getElementById("printable-resume");
    if (!element) return;
    setIsDownloading(true);

    try {
      // Create a temporary clean sandboxed iframe
      const iframe = document.createElement("iframe");
      iframe.style.position = "absolute";
      iframe.style.top = "-9999px";
      iframe.style.left = "-9999px";
      iframe.style.width = "210mm";
      iframe.style.height = "297mm";
      document.body.appendChild(iframe);

      const iframeDoc = iframe.contentDocument || iframe.contentWindow?.document;
      if (!iframeDoc) throw new Error("Could not access iframe document");

      // Inject standard, simple layout CSS that avoids modern color functions like lab() / oklch()
      const htmlContent = `
        <html>
          <head>
            <style>
              body {
                margin: 0;
                padding: 0;
                font-family: ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
                background-color: #ffffff;
                color: #000000;
              }
              .printable-container {
                width: 210mm;
                min-height: 297mm;
                padding: 20mm;
                box-sizing: border-box;
                background-color: #ffffff;
              }
              .text-center { text-align: center; }
              .border-b { border-bottom: 1px solid #e5e7eb; }
              .border-b-2 { border-bottom: 2px solid #1f2937; }
              .pb-6 { padding-bottom: 1.5rem; }
              .pb-1 { padding-bottom: 0.25rem; }
              .mb-6 { margin-bottom: 1.5rem; }
              .mb-3 { margin-bottom: 0.75rem; }
              .mb-2 { margin-bottom: 0.5rem; }
              .mt-3 { margin-top: 0.75rem; }
              .mt-1.5 { margin-top: 0.375rem; }
              .text-4xl { font-size: 2.25rem; font-weight: 800; }
              .text-base { font-size: 1rem; font-weight: 700; }
              .text-sm { font-size: 0.875rem; }
              .text-xs { font-size: 0.75rem; }
              .text-neutral-900 { color: #111827; }
              .text-neutral-800 { color: #1f2937; }
              .text-neutral-600 { color: #4b5563; }
              .text-neutral-500 { color: #6b7280; }
              .text-neutral-400 { color: #9ca3af; }
              .text-purple-700 { color: #7e22ce; }
              .font-extrabold { font-weight: 800; }
              .font-bold { font-weight: 700; }
              .font-semibold { font-weight: 600; }
              .tracking-tight { letter-spacing: -0.025em; }
              .tracking-widest { letter-spacing: 0.1em; }
              .uppercase { text-transform: uppercase; }
              .flex { display: flex; }
              .flex-col { flex-direction: column; }
              .flex-wrap { flex-wrap: wrap; }
              .items-center { align-items: center; }
              .justify-between { justify-content: space-between; }
              .justify-center { justify-content: center; }
              .gap-4 { gap: 1rem; }
              .gap-2 { gap: 0.5rem; }
              .space-y-6 > * + * { margin-top: 1.5rem; }
              .space-y-4 > * + * { margin-top: 1rem; }
              .space-y-1 > * + * { margin-top: 0.25rem; }
              .list-disc { list-style-type: disc; }
              .list-outside { list-style-position: outside; }
              .ml-4 { margin-left: 1rem; }
              .px-2 { padding-left: 0.5rem; padding-right: 0.5rem; }
              .py-1 { padding-top: 0.25rem; padding-bottom: 0.25rem; }
              .bg-neutral-100 { background-color: #f3f4f6; }
              .rounded { border-radius: 0.25rem; }
              .leading-relaxed { line-height: 1.625; }
              .box-border { box-sizing: border-box; }
            </style>
          </head>
          <body>
            <div class="printable-container">
              ${element.innerHTML}
            </div>
          </body>
        </html>
      `;

      iframeDoc.open();
      iframeDoc.write(htmlContent);
      iframeDoc.close();

      // Wait briefly for content rendering
      await new Promise((resolve) => setTimeout(resolve, 250));

      const target = iframeDoc.querySelector(".printable-container") as HTMLElement;

      const canvas = await html2canvas(target, {
        scale: 2,
        useCORS: true,
        backgroundColor: "#ffffff",
      });

      // Safely cleanup the iframe
      document.body.removeChild(iframe);

      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF("p", "mm", "a4");
      const imgWidth = 210;
      const pageHeight = 297;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      let heightLeft = imgHeight;
      let position = 0;

      pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;

      while (heightLeft >= 0) {
        position = heightLeft - imgHeight;
        pdf.addPage();
        pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;
      }

      pdf.save(`${resumeData.personalInfo.fullName.replace(/\s+/g, '_')}_Resume.pdf`);
      trackEvent("download_pdf", {
        fullName: resumeData.personalInfo.fullName,
        jobTitle: resumeData.personalInfo.jobTitle
      });
    } catch (err) {
      console.error("PDF generation failed:", err);
    } finally {
      setIsDownloading(false);
    }
  };

  return (
    <div className="min-h-[calc(100vh-4rem)] bg-neutral-950 text-neutral-200 selection:bg-purple-500/30 font-sans p-6 md:p-8 overflow-x-hidden relative">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-neutral-900 via-neutral-950 to-neutral-950 -z-10" />

      {/* Editor Layout Wrapper */}
      <div className="max-w-[1700px] mx-auto h-full flex flex-col gap-6">
        
        {/* Top bar with PDF triggers */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-neutral-900/40 p-4 md:p-6 rounded-3xl border border-neutral-800/80 backdrop-blur-md">
          <div>
            <h1 className="text-xl md:text-2xl font-bold text-white flex items-center gap-2">
              <span className="w-8 h-8 rounded-lg bg-emerald-500/10 flex items-center justify-center border border-emerald-500/20 text-emerald-400">
                ✨
              </span>
              YourRecruiter Editor
            </h1>
            <p className="text-xs md:text-sm text-neutral-400">
              Live updates synchronized across clean responsive document panels.
            </p>
          </div>
          <div className="flex items-center gap-3 w-full sm:w-auto">
            <button 
              onClick={() => setIsPreviewOpen(true)}
              className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-2 bg-neutral-900 border border-neutral-800 hover:bg-neutral-800 text-neutral-300 hover:text-white text-sm font-semibold px-5 py-3 rounded-xl transition-all"
            >
              <Eye className="w-4 h-4" />
              Preview Document
            </button>
            <button 
              onClick={downloadPdf}
              disabled={isDownloading}
              className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-2 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-400 hover:to-pink-400 text-white text-sm font-semibold px-5 py-3 rounded-xl transition-all shadow-[0_0_20px_rgba(168,85,247,0.3)] disabled:opacity-50"
            >
              {isDownloading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Generating PDF...
                </>
              ) : (
                <>
                  <Download className="w-4 h-4" />
                  Download PDF
                </>
              )}
            </button>
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 items-start">
          
          {/* Left Column: Form Editor */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-neutral-900/50 p-6 md:p-8 rounded-3xl border border-neutral-800 backdrop-blur-sm space-y-8 lg:sticky lg:top-24 max-h-[calc(100vh-14rem)] overflow-y-auto custom-scrollbar"
          >
            {/* AI Generator input block */}
            <div className="space-y-4 bg-neutral-950 p-4 rounded-xl border border-neutral-800">
              <label className="text-sm font-medium text-neutral-300 flex items-center gap-2">
                <FileText className="w-4 h-4 text-emerald-400" />
                Auto-Generate & Optimize with AI
              </label>
              <textarea 
                value={rawText}
                onChange={(e) => setRawText(e.target.value)}
                placeholder="Paste your unformatted CV details, LinkedIn text, or a raw draft here to generate a professionally polished resume..."
                className="w-full bg-neutral-900 border border-neutral-800 rounded-lg px-4 py-3 text-sm min-h-[100px] resize-y focus:outline-none focus:ring-2 focus:ring-emerald-500/50 transition-all placeholder:text-neutral-600"
              />
              <button 
                onClick={handleGenerate}
                disabled={loading || !rawText.trim()}
                className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-white font-semibold py-3 rounded-xl transition-all active:scale-[0.98] disabled:opacity-50 disabled:pointer-events-none shadow-lg shadow-emerald-500/20"
              >
                {loading ? (
                  <><Loader2 className="w-5 h-5 animate-spin" /> Optimizing Details...</>
                ) : (
                  <><Sparkles className="w-5 h-5" /> Generate and Optimize Resume</>
                )}
              </button>
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
                  <input 
                    type="text" 
                    value={resumeData.personalInfo.fullName}
                    onChange={(e) => updatePersonalInfo('fullName', e.target.value)}
                    className="w-full bg-neutral-950 border border-neutral-800 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500/50 transition-all text-white" 
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-medium text-neutral-400">Job Title</label>
                  <input 
                    type="text" 
                    value={resumeData.personalInfo.jobTitle}
                    onChange={(e) => updatePersonalInfo('jobTitle', e.target.value)}
                    className="w-full bg-neutral-950 border border-neutral-800 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500/50 transition-all text-white" 
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-medium text-neutral-400">Email</label>
                  <input 
                    type="email" 
                    value={resumeData.personalInfo.email}
                    onChange={(e) => updatePersonalInfo('email', e.target.value)}
                    className="w-full bg-neutral-950 border border-neutral-800 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500/50 transition-all text-white" 
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-medium text-neutral-400">Phone</label>
                  <input 
                    type="tel" 
                    value={resumeData.personalInfo.phone}
                    onChange={(e) => updatePersonalInfo('phone', e.target.value)}
                    className="w-full bg-neutral-950 border border-neutral-800 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500/50 transition-all text-white" 
                  />
                </div>
              </div>
            </div>

            {/* Section: Work Experience */}
            <div className="space-y-4">
              <div className="flex items-center justify-between border-b border-neutral-800 pb-2">
                <h3 className="text-lg font-semibold text-white flex items-center gap-2">
                  <Briefcase className="w-5 h-5 text-pink-400" />
                  Work Experience
                </h3>
                <button 
                  onClick={addExperience}
                  className="inline-flex items-center gap-1 text-xs text-pink-400 hover:text-pink-300 font-medium transition-colors"
                >
                  <Plus className="w-3.5 h-3.5" /> Add Job
                </button>
              </div>
              
              <div className="space-y-6">
                {resumeData.experience.map((exp, index) => (
                  <div key={index} className="bg-neutral-950 p-5 rounded-2xl border border-neutral-800 space-y-4 relative group">
                    <button 
                      onClick={() => removeExperience(index)}
                      className="absolute top-4 right-4 text-neutral-500 hover:text-red-400 transition-colors opacity-0 group-hover:opacity-100"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-1">
                        <label className="text-xs font-medium text-neutral-400">Company</label>
                        <input 
                          type="text" 
                          value={exp.company}
                          onChange={(e) => updateExperience(index, 'company', e.target.value)}
                          className="w-full bg-neutral-900 border border-neutral-800 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-pink-500/50 transition-all text-white" 
                        />
                      </div>
                      <div className="space-y-1">
                        <label className="text-xs font-medium text-neutral-400">Role</label>
                        <input 
                          type="text" 
                          value={exp.role}
                          onChange={(e) => updateExperience(index, 'role', e.target.value)}
                          className="w-full bg-neutral-900 border border-neutral-800 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-pink-500/50 transition-all text-white" 
                        />
                      </div>
                      <div className="space-y-1 col-span-2">
                        <label className="text-xs font-medium text-neutral-400">Duration</label>
                        <input 
                          type="text" 
                          value={exp.duration}
                          onChange={(e) => updateExperience(index, 'duration', e.target.value)}
                          className="w-full bg-neutral-900 border border-neutral-800 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-pink-500/50 transition-all text-white" 
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <label className="text-xs font-medium text-neutral-400">Bullets / Achievements</label>
                        <button 
                          onClick={() => addBullet(index)}
                          className="text-xs text-neutral-400 hover:text-white transition-colors"
                        >
                          + Add Bullet
                        </button>
                      </div>
                      <div className="space-y-2">
                        {exp.bullets.map((bullet, bulletIdx) => (
                          <div key={bulletIdx} className="flex items-center gap-2">
                            <input 
                              type="text"
                              value={bullet}
                              onChange={(e) => updateBullet(index, bulletIdx, e.target.value)}
                              placeholder="Describe an achievement with metrics..."
                              className="flex-grow bg-neutral-900 border border-neutral-800 rounded-lg px-3 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-pink-500/50 transition-all text-white"
                            />
                            <button 
                              onClick={() => removeBullet(index, bulletIdx)}
                              className="text-neutral-500 hover:text-red-400 transition-colors shrink-0"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Section: Skills */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-white flex items-center gap-2 border-b border-neutral-800 pb-2">
                <Code className="w-5 h-5 text-emerald-400" />
                Technical Skills
              </h3>
              <div className="space-y-1">
                <label className="text-xs font-medium text-neutral-400">Comma separated skills</label>
                <textarea 
                  value={resumeData.skills.join(', ')}
                  onChange={(e) => updateSkills(e.target.value)}
                  className="w-full bg-neutral-950 border border-neutral-800 rounded-lg px-3 py-2 text-sm min-h-[80px] resize-y focus:outline-none focus:ring-2 focus:ring-emerald-500/50 transition-all text-white" 
                />
              </div>
            </div>
          </motion.div>

          {/* Right Column: Full-Bleed Modern Responsive Preview Area */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="w-full bg-neutral-900/40 p-6 md:p-8 rounded-3xl border border-neutral-800/80 backdrop-blur-sm lg:sticky lg:top-24 max-h-[calc(100vh-14rem)] overflow-y-auto custom-scrollbar flex flex-col gap-6"
          >
            {/* Header info */}
            <div className="border-b border-neutral-800 pb-6">
              <span className="text-xs font-semibold text-purple-400 uppercase tracking-widest block mb-2">Live Preview Panel</span>
              <h2 className="text-3xl font-extrabold text-white tracking-tight">
                {resumeData.personalInfo.fullName || "Your Full Name"}
              </h2>
              <p className="text-lg text-purple-300 font-medium mt-1">
                {resumeData.personalInfo.jobTitle || "Your Job Title"}
              </p>
              
              <div className="flex flex-wrap items-center gap-4 text-sm text-neutral-400 mt-4">
                {resumeData.personalInfo.email && (
                  <span className="flex items-center gap-1.5">
                    <Mail className="w-4 h-4 text-neutral-500" />
                    {resumeData.personalInfo.email}
                  </span>
                )}
                {resumeData.personalInfo.phone && (
                  <span className="flex items-center gap-1.5">
                    <Phone className="w-4 h-4 text-neutral-500" />
                    {resumeData.personalInfo.phone}
                  </span>
                )}
              </div>
            </div>

            {/* Experience Section */}
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-bold text-white uppercase tracking-wider mb-4 flex items-center gap-2">
                  Professional Experience
                  <div className="h-px bg-neutral-800 flex-grow" />
                </h3>
                
                <div className="space-y-6">
                  {resumeData.experience.map((exp, idx) => (
                    <div key={idx} className="space-y-2">
                      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-baseline gap-1">
                        <h4 className="font-bold text-neutral-200 text-lg">{exp.role || "Job Role"}</h4>
                        <span className="text-sm font-medium text-neutral-500 shrink-0">{exp.duration || "Duration"}</span>
                      </div>
                      <p className="text-sm font-semibold text-purple-400">{exp.company || "Company Name"}</p>
                      <ul className="list-disc list-outside ml-4 mt-2 space-y-1.5 text-sm text-neutral-400 leading-relaxed">
                        {exp.bullets.filter(b => b.trim()).map((bullet, i) => (
                          <li key={i} className="hover:text-white transition-colors">{bullet}</li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>

              {/* Skills Section */}
              <div className="space-y-3">
                <h3 className="text-lg font-bold text-white uppercase tracking-wider flex items-center gap-2">
                  Skills & Expertise
                  <div className="h-px bg-neutral-800 flex-grow" />
                </h3>
                <div className="flex flex-wrap gap-2 pt-2">
                  {resumeData.skills.filter(s => s.trim()).map((skill, idx) => (
                    <span key={idx} className="px-3 py-1.5 bg-neutral-950 border border-neutral-800 text-neutral-300 text-sm font-semibold rounded-xl hover:border-purple-500/40 transition-colors">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>

        </div>
      </div>

      {/* Hidden Print-Ready A4 Document Portal (strictly styled for standard white-page PDF extraction) */}
      <div className="absolute top-[-9999px] left-[-9999px] pointer-events-none">
        <div 
          id="printable-resume" 
          className="w-[210mm] min-h-[297mm] bg-white p-12 text-black flex flex-col font-sans box-border"
          style={{ width: "210mm", minHeight: "297mm", padding: "20mm" }}
        >
          {/* Header */}
          <div className="text-center border-b border-neutral-300 pb-6 mb-6">
            <h1 className="text-4xl font-extrabold tracking-tight text-neutral-900 mb-2">
              {resumeData.personalInfo.fullName}
            </h1>
            <p className="text-neutral-500 font-bold tracking-wide uppercase text-sm">
              {resumeData.personalInfo.jobTitle}
            </p>
            <div className="flex items-center justify-center gap-4 text-xs text-neutral-400 mt-3 font-semibold">
              <span>{resumeData.personalInfo.email}</span>
              <span>•</span>
              <span>{resumeData.personalInfo.phone}</span>
            </div>
          </div>

          {/* Main content */}
          <div className="space-y-6 flex-grow">
            {resumeData.experience.length > 0 && (
              <section>
                <h2 className="text-base font-bold text-neutral-900 uppercase tracking-widest mb-3 flex items-center gap-2 border-b-2 border-neutral-800 pb-1">
                  Professional Experience
                </h2>
                <div className="space-y-4">
                  {resumeData.experience.map((exp, idx) => (
                    <div key={idx} className="space-y-1">
                      <div className="flex justify-between items-baseline">
                        <h3 className="font-bold text-neutral-800 text-sm">{exp.role}</h3>
                        <span className="text-xs font-semibold text-neutral-500 shrink-0">{exp.duration}</span>
                      </div>
                      <p className="text-xs font-bold text-purple-700">{exp.company}</p>
                      <ul className="list-disc list-outside ml-4 mt-1.5 space-y-1 text-xs text-neutral-600 leading-relaxed">
                        {exp.bullets.filter(b => b.trim()).map((bullet, i) => (
                          <li key={i}>{bullet}</li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {resumeData.skills.length > 0 && (
              <section>
                <h2 className="text-base font-bold text-neutral-900 uppercase tracking-widest mb-3 flex items-center gap-2 border-b-2 border-neutral-800 pb-1">
                  Skills & Expertise
                </h2>
                <div className="flex flex-wrap gap-2">
                  {resumeData.skills.filter(s => s.trim()).map((skill, idx) => (
                    <span key={idx} className="px-2 py-1 bg-neutral-100 text-neutral-800 text-xs font-semibold rounded">
                      {skill}
                    </span>
                  ))}
                </div>
              </section>
            )}
          </div>
        </div>
      </div>

      {/* Modern Modal: Full Document Preview */}
      <AnimatePresence>
        {isPreviewOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Backdrop */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsPreviewOpen(false)}
              className="absolute inset-0 bg-black/85 backdrop-blur-sm"
            />
            
            {/* Modal Box */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="relative w-full max-w-[850px] max-h-[90vh] bg-neutral-900 rounded-3xl border border-neutral-800 shadow-2xl flex flex-col overflow-hidden z-10"
            >
              {/* Header */}
              <div className="p-4 md:p-6 border-b border-neutral-800 bg-neutral-900/80 backdrop-blur-md flex items-center justify-between shrink-0">
                <div>
                  <h3 className="font-bold text-white text-lg">Document Print Preview</h3>
                  <p className="text-xs text-neutral-400">This matches the precise layout generated inside your PDF download.</p>
                </div>
                <button 
                  onClick={() => setIsPreviewOpen(false)}
                  className="p-2 hover:bg-neutral-800 rounded-xl text-neutral-400 hover:text-white transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Scrollable Document Wrapper */}
              <div className="p-6 md:p-8 flex-grow overflow-y-auto custom-scrollbar bg-neutral-950 flex justify-center">
                <div className="w-full max-w-[700px] aspect-[1/1.414] bg-white text-black p-8 md:p-12 shadow-2xl flex flex-col font-sans box-border select-none origin-top transition-transform scale-100">
                  {/* Header */}
                  <div className="text-center border-b border-neutral-300 pb-6 mb-6">
                    <h1 className="text-3xl font-extrabold tracking-tight text-neutral-900 mb-2">
                      {resumeData.personalInfo.fullName}
                    </h1>
                    <p className="text-neutral-500 font-bold tracking-wide uppercase text-xs">
                      {resumeData.personalInfo.jobTitle}
                    </p>
                    <div className="flex items-center justify-center gap-3 text-[10px] text-neutral-400 mt-2 font-semibold">
                      <span>{resumeData.personalInfo.email}</span>
                      <span>•</span>
                      <span>{resumeData.personalInfo.phone}</span>
                    </div>
                  </div>

                  {/* Main content */}
                  <div className="space-y-6 flex-grow">
                    {resumeData.experience.length > 0 && (
                      <section>
                        <h2 className="text-xs font-bold text-neutral-900 uppercase tracking-widest mb-3 border-b-2 border-neutral-800 pb-1">
                          Professional Experience
                        </h2>
                        <div className="space-y-4">
                          {resumeData.experience.map((exp, idx) => (
                            <div key={idx} className="space-y-1">
                              <div className="flex justify-between items-baseline">
                                <h3 className="font-bold text-neutral-800 text-[13px]">{exp.role}</h3>
                                <span className="text-[10px] font-semibold text-neutral-500 shrink-0">{exp.duration}</span>
                              </div>
                              <p className="text-[11px] font-bold text-purple-700">{exp.company}</p>
                              <ul className="list-disc list-outside ml-4 mt-1 space-y-0.5 text-[11px] text-neutral-600 leading-relaxed">
                                {exp.bullets.filter(b => b.trim()).map((bullet, i) => (
                                  <li key={i}>{bullet}</li>
                                ))}
                              </ul>
                            </div>
                          ))}
                        </div>
                      </section>
                    )}

                    {resumeData.skills.length > 0 && (
                      <section>
                        <h2 className="text-xs font-bold text-neutral-900 uppercase tracking-widest mb-3 border-b-2 border-neutral-800 pb-1">
                          Skills & Expertise
                        </h2>
                        <div className="flex flex-wrap gap-1.5">
                          {resumeData.skills.filter(s => s.trim()).map((skill, idx) => (
                            <span key={idx} className="px-1.5 py-0.5 bg-neutral-100 text-neutral-800 text-[10px] font-semibold rounded">
                              {skill}
                            </span>
                          ))}
                        </div>
                      </section>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

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
