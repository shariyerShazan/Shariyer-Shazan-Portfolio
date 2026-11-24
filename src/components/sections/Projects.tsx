"use client";

import React from "react";
import { portfolioData } from "../../config/portfolioData";
import { FiGithub, FiExternalLink, FiTerminal, FiArrowUpRight } from "react-icons/fi";

const Projects = () => {
  return (
    <section id="projects" className="py-24 sm:py-32 relative">
      <div className="w-full">
        {/* Section Header */}
        <div className="mb-14 sm:mb-16" data-aos="fade-right">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono font-medium text-[#38bdf8] bg-[#38bdf8]/10 border border-[#38bdf8]/20 mb-4">
            04 / PRODUCTION WORK
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight mb-4 font-sans">
            Featured Systems &amp; Products
          </h2>
          <p className="text-sm sm:text-base text-slate-400 max-w-2xl font-sans leading-relaxed">
            A selection of production-grade cloud ecosystems, distributed microservices, and multi-tier SaaS platforms engineered from architecture to deployment.
          </p>
        </div>

        {/* Projects List */}
        <div className="space-y-10 sm:space-y-12">
          {portfolioData.projects.map((project, index) => {
            const isGrovr = project.title.includes("Grovr");
            const isWaave = project.title.includes("Waave");
            const isCanine = project.title.includes("Canine");

            let categoryLabel = "Production Platform";
            let categoryStyle = "text-sky-400 bg-sky-500/10 border-sky-500/20";
            if (isGrovr) {
              categoryLabel = "YouFresh LLC • Flagship Cloud Ecosystem";
              categoryStyle = "text-emerald-400 bg-emerald-500/10 border-emerald-500/20";
            } else if (isWaave) {
              categoryLabel = "Distributed Systems • 10 Microservices";
              categoryStyle = "text-cyan-400 bg-cyan-500/10 border-cyan-500/20";
            } else if (isCanine) {
              categoryLabel = "Softvence • Multi-Tier SaaS";
              categoryStyle = "text-purple-400 bg-purple-500/10 border-purple-500/20";
            }

            return (
              <div
                key={project.title}
                className="p-7 sm:p-9 rounded-2xl bg-white/[0.02] border border-white/[0.08] hover:border-white/[0.16] transition-all duration-300"
                data-aos="fade-up"
                data-aos-delay={index * 80}
              >
                {/* Card Top Row: Category & Action Links */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-5">
                  <span
                    className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono font-medium border w-fit ${categoryStyle}`}
                  >
                    {categoryLabel}
                  </span>

                  {/* Links Row */}
                  <div className="flex flex-wrap items-center gap-2">
                    {project.backendLink && (
                      <a
                        href={project.backendLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/[0.04] hover:bg-white/[0.08] border border-white/[0.08] hover:border-white/[0.16] text-xs font-sans text-slate-200 hover:text-white transition-all shadow-sm"
                        title="View Backend Repository"
                      >
                        <FiGithub className="w-3.5 h-3.5" />
                        <span>Backend</span>
                      </a>
                    )}
                    {project.frontendLink && (
                      <a
                        href={project.frontendLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/[0.04] hover:bg-white/[0.08] border border-white/[0.08] hover:border-white/[0.16] text-xs font-sans text-slate-200 hover:text-white transition-all shadow-sm"
                        title="View Frontend Repository"
                      >
                        <FiGithub className="w-3.5 h-3.5" />
                        <span>Frontend</span>
                      </a>
                    )}
                    {project.swaggerLink && (
                      <a
                        href={project.swaggerLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/[0.04] hover:bg-white/[0.08] border border-white/[0.08] hover:border-white/[0.16] text-xs font-sans text-cyan-400 hover:text-cyan-300 transition-all shadow-sm"
                        title="Open Swagger API Documentation"
                      >
                        <FiTerminal className="w-3.5 h-3.5" />
                        <span>API Docs</span>
                      </a>
                    )}
                    {project.liveLink && (
                      <a
                        href={project.liveLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-white hover:bg-slate-200 text-slate-950 text-xs font-sans font-semibold transition-all shadow-sm"
                        title="View Live Platform"
                      >
                        <span>Live Demo</span>
                        <FiArrowUpRight className="w-3.5 h-3.5" />
                      </a>
                    )}
                  </div>
                </div>

                {/* Title */}
                <h3 className="text-2xl sm:text-3xl font-bold text-white mb-3 tracking-tight font-sans">
                  {project.title}
                </h3>

                {/* Narrative Description */}
                <p className="text-sm sm:text-base text-slate-300 leading-relaxed mb-6 font-sans">
                  {project.description}
                </p>

                {/* Key Architectural Contributions */}
                {project.highlights && project.highlights.length > 0 && (
                  <div className="mb-6 p-5 sm:p-6 rounded-xl bg-white/[0.02] border border-white/[0.06]">
                    <div className="text-xs font-mono text-slate-400 uppercase tracking-wider mb-3.5 font-medium">
                      Key Architectural Highlights
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {project.highlights.map((highlight, hIdx) => {
                        const parts = highlight.split(":");
                        const hasPrefix = parts.length > 1;
                        return (
                          <div
                            key={hIdx}
                            className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-300 leading-relaxed font-sans"
                          >
                            <span className="w-1.5 h-1.5 rounded-full bg-[#38bdf8] mt-2 flex-shrink-0" />
                            <span>
                              {hasPrefix ? (
                                <>
                                  <strong className="text-white font-medium">{parts[0]}:</strong>
                                  <span className="text-slate-300">{parts.slice(1).join(":")}</span>
                                </>
                              ) : (
                                highlight
                              )}
                            </span>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}

                {/* Tech Tags */}
                <div className="flex flex-wrap gap-2 pt-2 border-t border-white/[0.04]">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-xs font-sans text-slate-300 bg-white/[0.03] border border-white/[0.06] hover:border-white/[0.14] px-3 py-1 rounded-lg transition-colors cursor-default"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Projects;
