"use client";

import React from "react";
import { portfolioData } from "@/config/portfolioData";
import { FiGitPullRequest, FiGitBranch, FiExternalLink, FiCheckCircle } from "react-icons/fi";
import { SiNestjs } from "react-icons/si";

const OpenSource = () => {
  return (
    <section id="opensource" className="py-24 px-6 min-h-screen flex flex-col justify-center relative overflow-hidden bg-gradient-to-b from-[#0a0f1d] via-[#0d1527] to-[#0a0f1d]">
      {/* Visual background glows */}
      <div className="absolute top-[25%] left-[5%] w-[320px] h-[320px] bg-[#E0234E]/10 rounded-full blur-[100px] pointer-events-none"></div>
      <div className="absolute bottom-[20%] right-[5%] w-[300px] h-[300px] bg-[#00f0ff]/10 rounded-full blur-[100px] pointer-events-none"></div>

      <div className="max-w-4xl mx-auto w-full relative z-10">
        <h2 className="text-3xl md:text-5xl font-bold text-white mb-16 flex items-center gap-4" data-aos="fade-right">
          <span className="text-[#00f0ff] font-mono text-2xl md:text-4xl">03.</span>
          Open Source Contributions
          <div className="h-[1px] flex-grow bg-gradient-to-r from-[#475569] to-transparent ml-4"></div>
        </h2>

        <div className="space-y-8">
          {portfolioData.openSourceContributions.map((item, index) => (
            <div 
              key={index} 
              className="bg-[#0f172a]/40 backdrop-blur-md rounded-2xl p-6 md:p-8 border border-[#1e293b]/80 hover:border-[#E0234E]/50 transition-all duration-500 hover:-translate-y-1.5 group hover:shadow-[0_15px_45px_rgba(224,35,78,0.12)] relative overflow-hidden"
              data-aos="fade-up" 
              data-aos-delay={index * 100}
            >
              {/* Techy background scan grid */}
              <div className="absolute inset-0 bg-[linear-gradient(rgba(224,35,78,0.02)_1px,transparent_1px)] bg-[size:100%_8px] pointer-events-none group-hover:opacity-70 transition-opacity"></div>
              <div className="absolute top-0 right-0 w-36 h-36 bg-gradient-to-br from-[#E0234E]/15 to-transparent rounded-bl-full pointer-events-none group-hover:scale-110 transition-transform duration-700"></div>
              
              {/* Upper Header Row */}
              <div className="flex flex-wrap justify-between items-center gap-4 mb-6 relative z-10">
                <div className="flex items-center gap-3.5">
                  <div className="p-3 rounded-xl bg-[#E0234E]/10 border border-[#E0234E]/30 text-[#E0234E] group-hover:scale-105 transition-transform duration-300">
                    <SiNestjs className="text-3xl" />
                  </div>
                  <div>
                    <div className="text-[10px] font-mono text-[#E0234E] uppercase tracking-widest flex items-center gap-1.5 font-semibold">
                      <FiGitBranch className="text-xs" /> Core Framework Contribution
                    </div>
                    <h3 className="text-xl md:text-2xl font-bold text-white group-hover:text-[#E0234E] transition-colors font-sans tracking-tight">
                      {item.project}
                    </h3>
                  </div>
                </div>

                {/* PR Status Badge */}
                <div className="flex items-center gap-2">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono font-medium bg-emerald-500/10 border border-emerald-500/30 text-emerald-400">
                    <FiCheckCircle className="w-3.5 h-3.5" /> {item.status || "Merged"}
                  </span>
                  {item.prNumber && (
                    <a 
                      href={item.prUrl || "https://github.com/nestjs/nest/pull/17430"}
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-mono font-semibold bg-[#E0234E]/15 border border-[#E0234E]/40 text-[#f43f5e] hover:bg-[#E0234E]/25 transition-colors"
                    >
                      <FiGitPullRequest className="w-3.5 h-3.5" /> PR {item.prNumber}
                    </a>
                  )}
                </div>
              </div>

              {/* Descriptions & Highlights */}
              <div className="space-y-4 mb-6 relative z-10">
                {item.description.map((desc, dIdx) => (
                  <p key={dIdx} className="text-[#cbd5e1] text-xs md:text-sm leading-relaxed text-justify opacity-90">
                    {desc}
                  </p>
                ))}

                {item.highlights && item.highlights.length > 0 && (
                  <div className="pt-2 space-y-2">
                    <div className="text-[10px] font-mono text-slate-400 uppercase tracking-wider">Key Details &amp; Impact:</div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5">
                      {item.highlights.map((h, hIdx) => (
                        <div key={hIdx} className="flex items-start gap-2 text-xs text-[#e2e8f0]">
                          <FiCheckCircle className="text-[#00f0ff] w-3.5 h-3.5 mt-0.5 flex-shrink-0" />
                          <span>{h}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Bottom Tags & Link Buttons */}
              <div className="pt-6 border-t border-[#1e293b]/60 flex flex-wrap justify-between items-center gap-4 relative z-10">
                <div className="flex flex-wrap gap-1.5">
                  {item.tech?.map((t) => (
                    <span 
                      key={t} 
                      className="text-[9px] font-mono text-[#94a3b8] bg-[#0a0f1d] px-2.5 py-0.5 rounded-md border border-slate-800 hover:border-[#E0234E]/40 hover:text-white transition-colors cursor-default"
                    >
                      {t}
                    </span>
                  ))}
                </div>

                <div className="flex items-center gap-3">
                  {item.prUrl && (
                    <a 
                      href={item.prUrl} 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-[#E0234E] hover:bg-[#c81e43] text-white text-xs font-mono font-semibold transition-all shadow-[0_0_15px_rgba(224,35,78,0.3)] hover:shadow-[0_0_20px_rgba(224,35,78,0.5)] cursor-pointer"
                    >
                      <FiGitPullRequest className="w-4 h-4" /> View PR {item.prNumber} <FiExternalLink className="w-3 h-3 ml-0.5" />
                    </a>
                  )}
                  {item.repoUrl && (
                    <a 
                      href={item.repoUrl} 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-slate-950 hover:bg-slate-900 border border-slate-800 text-xs font-mono text-[#cbd5e1] hover:text-white transition-all cursor-pointer"
                    >
                      NestJS Repo <FiExternalLink className="w-3 h-3" />
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default OpenSource;
