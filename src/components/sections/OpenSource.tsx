"use client";

import React from "react";
import { portfolioData } from "@/config/portfolioData";
import { FiGitPullRequest, FiExternalLink, FiCheckCircle } from "react-icons/fi";
import { SiNestjs } from "react-icons/si";

const OpenSource = () => {
  return (
    <section id="opensource" className="py-24 sm:py-32 relative">
      <div className="w-full">
        {/* Section Header */}
        <div className="mb-14 sm:mb-16" data-aos="fade-right">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono font-medium text-[#38bdf8] bg-[#38bdf8]/10 border border-[#38bdf8]/20 mb-4">
            03 / OPEN SOURCE CREDENTIALS
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight mb-4 font-sans">
            Open Source Contributions
          </h2>
          <p className="text-sm sm:text-base text-slate-400 max-w-2xl font-sans leading-relaxed">
            Direct framework-level contributions to the official NestJS core repository (<span className="text-white font-mono">nestjs/nest</span>), architecting fixes for module lazy-loading, dependency injection, and singleton lifecycle preservation.
          </p>
        </div>

        <div className="space-y-10">
          {portfolioData.openSourceContributions.map((item, index) => (
            <div
              key={index}
              className="p-6 sm:p-8 rounded-2xl bg-white/[0.02] border border-white/[0.08] hover:border-red-500/30 transition-all duration-300"
              data-aos="fade-up"
              data-aos-delay={index * 100}
            >
              {/* Project Header Row */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 pb-6 border-b border-white/[0.06]">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-red-500/10 border border-red-500/20 text-[#E0234E] flex items-center justify-center flex-shrink-0 shadow-sm">
                    <SiNestjs className="text-2xl sm:text-3xl" />
                  </div>
                  <div>
                    <div className="text-xs font-mono text-[#E0234E] uppercase tracking-wider font-semibold">
                      Core Framework Contribution
                    </div>
                    <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight font-sans">
                      {item.project}
                    </h3>
                  </div>
                </div>

                {/* Badges & Repo Link */}
                <div className="flex items-center gap-2.5">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono font-medium bg-emerald-500/10 border border-emerald-500/20 text-emerald-400">
                    <FiCheckCircle className="w-3.5 h-3.5" />
                    <span>{item.status || "Official Contributor"}</span>
                  </span>
                  {item.repoUrl && (
                    <a
                      href={item.repoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-white/[0.04] hover:bg-white/[0.08] border border-white/[0.08] hover:border-white/[0.16] text-xs font-sans text-slate-200 hover:text-white transition-all shadow-sm"
                    >
                      <span>Repository</span>
                      <FiExternalLink className="w-3 h-3 text-slate-400" />
                    </a>
                  )}
                </div>
              </div>

              {/* Project Description */}
              {item.description && item.description.length > 0 && (
                <div className="mb-8">
                  {item.description.map((desc, dIdx) => (
                    <p key={dIdx} className="text-sm sm:text-base text-slate-300 leading-relaxed font-sans">
                      {desc}
                    </p>
                  ))}
                </div>
              )}

              {/* Merged Pull Requests Section */}
              {item.pullRequests && item.pullRequests.length > 0 ? (
                <div className="space-y-4 mb-8">
                  <div className="text-xs font-mono text-slate-400 uppercase tracking-wider mb-4 font-medium">
                    Merged Pull Requests ({item.pullRequests.length})
                  </div>

                  <div className="grid grid-cols-1 gap-4">
                    {item.pullRequests.map((pr, prIdx) => (
                      <div
                        key={prIdx}
                        className="p-5 sm:p-6 rounded-xl bg-white/[0.02] border border-white/[0.06] hover:border-white/[0.14] transition-all duration-200"
                      >
                        {/* PR Header */}
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-3">
                          <div className="flex items-center gap-2.5 flex-wrap">
                            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-md text-xs font-mono font-semibold bg-red-500/10 border border-red-500/20 text-red-400">
                              <FiGitPullRequest className="w-3 h-3" />
                              <span>PR #{pr.prNumber}</span>
                            </span>
                            <h4 className="text-base sm:text-lg font-semibold text-white tracking-tight font-sans">
                              {pr.title}
                            </h4>
                          </div>

                          <div className="flex items-center gap-2">
                            <span className="inline-flex items-center gap-1 text-xs font-mono text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
                              <FiCheckCircle className="w-3 h-3" /> Merged
                            </span>
                            <a
                              href={pr.prUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-1 px-3 py-1 rounded-md text-xs font-sans font-medium bg-white/[0.06] hover:bg-white/[0.12] text-white border border-white/[0.08] transition-all"
                            >
                              <span>View PR</span>
                              <FiExternalLink className="w-3 h-3 text-slate-400" />
                            </a>
                          </div>
                        </div>

                        {/* PR Narrative Description */}
                        <p className="text-sm text-slate-300 leading-relaxed font-sans mb-4">
                          {pr.description}
                        </p>

                        {/* PR Technical Highlights */}
                        {pr.highlights && pr.highlights.length > 0 && (
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mb-4">
                            {pr.highlights.map((h, hIdx) => (
                              <div key={hIdx} className="flex items-start gap-2 text-xs sm:text-sm text-slate-300 font-sans">
                                <span className="w-1.5 h-1.5 rounded-full bg-[#38bdf8] mt-2 flex-shrink-0" />
                                <span>{h}</span>
                              </div>
                            ))}
                          </div>
                        )}

                        {/* PR Sub-tech Tags */}
                        {pr.tech && pr.tech.length > 0 && (
                          <div className="flex flex-wrap gap-1.5 pt-3 border-t border-white/[0.04]">
                            {pr.tech.map((t) => (
                              <span
                                key={t}
                                className="text-xs font-mono text-slate-400 bg-white/[0.03] px-2.5 py-0.5 rounded border border-white/[0.04]"
                              >
                                {t}
                              </span>
                            ))}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                /* Fallback for single highlight format */
                item.highlights && item.highlights.length > 0 && (
                  <div className="space-y-2 mb-6">
                    <div className="text-xs font-mono text-slate-400 uppercase tracking-wider mb-2">Key Highlights:</div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5">
                      {item.highlights.map((h, hIdx) => (
                        <div key={hIdx} className="flex items-start gap-2 text-sm text-slate-300 font-sans">
                          <span className="w-1.5 h-1.5 rounded-full bg-[#38bdf8] mt-2 flex-shrink-0" />
                          <span>{h}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )
              )}

              {/* Project-Level Core Topics */}
              {item.tech && item.tech.length > 0 && (
                <div className="pt-6 border-t border-white/[0.06] flex flex-wrap items-center justify-between gap-3">
                  <span className="text-xs font-mono text-slate-500 uppercase tracking-wider">
                    Core Engineering Topics:
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {item.tech.map((t) => (
                      <span
                        key={t}
                        className="text-xs font-sans text-slate-300 bg-white/[0.03] border border-white/[0.06] px-3 py-1 rounded-lg"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default OpenSource;
