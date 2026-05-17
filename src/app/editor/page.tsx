"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { User, Briefcase, Code, Sparkles, Loader2, FileText } from "lucide-react";

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

  const updateSkills = (value: string) => {
    const skillsArray = value.split(',').map(s => s.trim()).filter(Boolean);
    setResumeData(prev => ({ ...prev, skills: skillsArray }));
  };

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
            <p className="text-neutral-400 text-sm mb-6">
              Paste your raw resume below and let our AI optimize it instantly, or fill out the details manually.
            </p>

            <div className="space-y-4 bg-neutral-950 p-4 rounded-xl border border-neutral-800">
              <label className="text-sm font-medium text-neutral-300 flex items-center gap-2">
                <FileText className="w-4 h-4 text-emerald-400" />
                Raw Input Data
              </label>
              <textarea 
                value={rawText}
                onChange={(e) => setRawText(e.target.value)}
                placeholder="Paste your unformatted resume, LinkedIn profile text, or rough notes here..."
                className="w-full bg-neutral-900 border border-neutral-800 rounded-lg px-4 py-3 text-sm min-h-[120px] resize-y focus:outline-none focus:ring-2 focus:ring-emerald-500/50 transition-all placeholder:text-neutral-600"
              />
              <button 
                onClick={handleGenerate}
                disabled={loading || !rawText.trim()}
                className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-white font-semibold py-3 rounded-xl transition-all active:scale-[0.98] disabled:opacity-50 disabled:pointer-events-none shadow-lg shadow-emerald-500/20"
              >
                {loading ? (
                  <><Loader2 className="w-5 h-5 animate-spin" /> Generating Magic...</>
                ) : (
                  <><Sparkles className="w-5 h-5" /> Auto-Generate with AI</>
                )}
              </button>
            </div>
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
            <h3 className="text-lg font-semibold text-white flex items-center gap-2 border-b border-neutral-800 pb-2">
              <Briefcase className="w-5 h-5 text-pink-400" />
              Work Experience
            </h3>
            {resumeData.experience.map((exp, index) => (
              <div key={index} className="bg-neutral-950 p-4 rounded-xl border border-neutral-800 space-y-4">
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
                <div className="space-y-1">
                  <label className="text-xs font-medium text-neutral-400">Bullets (1 per line)</label>
                  <textarea 
                    value={exp.bullets.join('\n')}
                    onChange={(e) => updateExperience(index, 'bullets', e.target.value.split('\n'))}
                    className="w-full bg-neutral-900 border border-neutral-800 rounded-lg px-3 py-2 text-sm min-h-[100px] resize-y focus:outline-none focus:ring-2 focus:ring-pink-500/50 transition-all text-white leading-relaxed" 
                  />
                </div>
              </div>
            ))}
            <button 
              onClick={() => setResumeData(prev => ({
                ...prev,
                experience: [...prev.experience, { role: '', company: '', duration: '', bullets: [] }]
              }))}
              className="text-sm text-pink-400 font-medium hover:text-pink-300 transition-colors"
            >
              + Add Experience
            </button>
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

        {/* Right Column: Live A4 Preview */}
        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="w-full flex justify-center lg:sticky lg:top-24"
        >
          <div className="w-full max-w-[800px] aspect-[1/1.414] bg-white rounded shadow-2xl shadow-black/50 p-8 md:p-12 text-black flex flex-col relative overflow-hidden">
            <div className="absolute inset-0 bg-[linear-gradient(transparent_0px,_transparent_calc(100%_-_1px),_#e5e5e5_calc(100%_-_1px))] bg-[length:100%_20px] pointer-events-none opacity-20" />
            
            <div className="text-center border-b-2 border-neutral-200 pb-6 mb-6">
              <h1 className="text-4xl font-bold tracking-tight text-neutral-900 mb-2">
                {resumeData.personalInfo.fullName || "Your Name"}
              </h1>
              <p className="text-neutral-500 font-medium tracking-wide uppercase text-sm">
                {resumeData.personalInfo.jobTitle || "Job Title"}
              </p>
              <div className="flex flex-wrap items-center justify-center gap-2 md:gap-4 text-xs text-neutral-400 mt-3">
                <span>{resumeData.personalInfo.email || "email@example.com"}</span>
                <span className="hidden md:inline">•</span>
                <span>{resumeData.personalInfo.phone || "Phone Number"}</span>
              </div>
            </div>

            <div className="space-y-6 flex-grow">
              <section>
                <h2 className="text-lg font-bold text-neutral-900 uppercase tracking-wider mb-3 flex items-center gap-2">
                  Experience
                  <div className="h-px bg-neutral-200 flex-grow" />
                </h2>
                <div className="space-y-4">
                  {resumeData.experience.map((exp, idx) => (
                    <div key={idx} className="space-y-1">
                      <div className="flex justify-between items-baseline">
                        <h3 className="font-semibold text-neutral-800">{exp.role || "Role"}</h3>
                        <span className="text-xs font-medium text-neutral-500 shrink-0">{exp.duration || "Duration"}</span>
                      </div>
                      <p className="text-sm font-medium text-purple-600">{exp.company || "Company"}</p>
                      <ul className="list-disc list-outside ml-4 mt-2 space-y-1 text-sm text-neutral-600">
                        {exp.bullets.filter(b => b.trim()).map((bullet, i) => (
                          <li key={i}>{bullet}</li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </section>

              <section>
                <h2 className="text-lg font-bold text-neutral-900 uppercase tracking-wider mb-3 flex items-center gap-2">
                  Skills
                  <div className="h-px bg-neutral-200 flex-grow" />
                </h2>
                <div className="flex flex-wrap gap-2">
                  {resumeData.skills.filter(s => s.trim()).map((skill, idx) => (
                    <span key={idx} className="px-2 py-1 bg-neutral-100 text-neutral-700 text-xs font-medium rounded">
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
