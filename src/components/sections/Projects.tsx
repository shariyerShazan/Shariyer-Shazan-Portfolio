"use client";

import React, { useState } from "react";
import { portfolioData } from "../../config/portfolioData";
import { FiFolder, FiGithub, FiExternalLink, FiLock, FiTerminal } from "react-icons/fi";
import { BsCheck2Circle } from "react-icons/bs";
import { motion, AnimatePresence } from "framer-motion";
import { WaaveArchitecture } from "./WaaveArchitecture";
import { FinnVisualizer } from "./FinnVisualizer";

const Projects = () => {
  const [showWaaveArch, setShowWaaveArch] = useState(false);
  const [showFinnArch, setShowFinnArch] = useState(false);

  return (
    <section id="projects" className="py-24 px-6 min-h-screen flex flex-col justify-center bg-gradient-to-b from-[#0a0f1d] via-[#0d1428] to-[#0a0f1d] relative">
      {/* Glow overlays for design depth */}
      <div className="absolute top-[30%] right-[10%] w-[300px] h-[300px] bg-[#00f0ff]/5 rounded-full blur-[90px] pointer-events-none"></div>
      <div className="absolute bottom-[20%] left-[5%] w-[250px] h-[250px] bg-[#8b5cf6]/5 rounded-full blur-[90px] pointer-events-none"></div>
      
      <div className="max-w-5xl mx-auto w-full relative z-10">
        <h2 className="text-3xl md:text-5xl font-bold text-white mb-16 flex items-center gap-4" data-aos="fade-right">
          <span className="text-[#00f0ff] font-mono text-2xl md:text-4xl">03.</span>
          Featured Projects
          <div className="h-[1px] flex-grow bg-gradient-to-r from-[#475569] to-transparent ml-4"></div>
        </h2>

        {/* Projects Single Column Stack (grid-cols-1) */}
        <div className="flex flex-col gap-12 mb-12">
          {portfolioData.projects.map((project, index) => {
            const isWaave = project.title.includes("Waave");
            const isFinn = project.title.includes("Finn");
            
            // Asymmetric layout alignments: 
            // index 0 (Waave) -> Centered (w-full lg:max-w-4xl mx-auto)
            // index 1 (AI Health) -> Left-aligned (w-full lg:max-w-3xl mr-auto ml-0)
            // index 2 (Finn) -> Right-aligned (w-full lg:max-w-3xl ml-auto mr-0)
            let alignmentClass = "";
            let animDir = "fade-up";
            if (index === 0) {
              alignmentClass = "w-full lg:max-w-4xl lg:mx-auto";
              animDir = "fade-up";
            } else if (index === 1) {
              alignmentClass = "w-full lg:max-w-3xl lg:mr-auto lg:ml-0";
              animDir = "fade-right";
            } else if (index === 2) {
              alignmentClass = "w-full lg:max-w-3xl lg:ml-auto lg:mr-0";
              animDir = "fade-left";
            }

            return (
              <React.Fragment key={index}>
                <div 
                  className={`bg-[#0f172a]/35 backdrop-blur-md rounded-2xl p-6 md:p-8 flex flex-col border border-[#1e293b]/70 hover:border-[#00f0ff]/40 transition-all duration-500 hover:-translate-y-1.5 group hover:shadow-[0_15px_45px_rgba(0,240,255,0.06)] relative overflow-hidden ${alignmentClass}`}
                  data-aos={animDir}
                  data-aos-delay={100}
                >
                  {/* Techy background scan grid */}
                  <div className="absolute inset-0 bg-[linear-gradient(rgba(0,240,255,0.02)_1px,transparent_1px)] bg-[size:100%_8px] pointer-events-none group-hover:opacity-60 transition-opacity"></div>
                  <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-[#00f0ff]/10 to-transparent rounded-bl-full pointer-events-none group-hover:scale-110 transition-transform duration-700"></div>

                  {/* Upper Header Row */}
                  <div className="flex justify-between items-center mb-6">
                    <div className="p-3 rounded-xl bg-slate-900/50 border border-slate-800/60 group-hover:border-[#00f0ff]/40 group-hover:bg-[#00f0ff]/5 transition-all duration-300">
                      <FiFolder className="text-3xl text-[#00f0ff] group-hover:scale-110 transition-transform duration-300" />
                    </div>
                    
                    {project.isConfidential ? (
                      <span className="flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-mono font-medium text-amber-500 bg-amber-500/10 border border-amber-500/20">
                        <FiLock className="w-3 h-3" /> NDA Protected
                      </span>
                    ) : (
                      <span className="flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-mono font-medium text-[#00f0ff] bg-[#00f0ff]/10 border border-[#00f0ff]/20">
                        Active System
                      </span>
                    )}
                  </div>
                  
                  {/* Main Content */}
                  <div className="flex-grow">
                    {/* Project Title */}
                    <h3 className="text-xl md:text-2xl font-bold text-white mb-4 group-hover:text-[#00f0ff] transition-colors leading-tight font-sans tracking-tight">
                      {project.title}
                    </h3>
                    
                    {/* Description */}
                    <p className="text-[#cbd5e1] text-xs md:text-sm leading-relaxed mb-6 font-sans text-justify opacity-80 group-hover:opacity-100 transition-opacity">
                      {project.description}
                    </p>
                    
                    {/* Highlights List */}
                    {project.highlights && project.highlights.length > 0 && (
                      <div className="mb-6 space-y-2.5">
                        <h4 className="text-[10px] font-mono text-[#94a3b8] uppercase tracking-wider mb-2">Key Highlights:</h4>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                          {project.highlights.map((highlight, hIdx) => (
                            <div key={hIdx} className="flex items-start gap-2.5 text-xs text-[#cbd5e1] leading-relaxed font-sans opacity-95">
                              <BsCheck2Circle className="text-[#00f0ff] w-4 h-4 mt-0.5 flex-shrink-0" />
                              <span>{highlight}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                  
                  {/* Tech tags and buttons aligned at the bottom */}
                  <div className="pt-6 border-t border-[#1e293b]/40">
                    {/* Tech Tags */}
                    <div className="flex flex-wrap gap-1.5 mb-5">
                      {project.tags.map((tag) => (
                        <span 
                          key={tag} 
                          className="text-[9px] font-mono text-[#94a3b8] bg-[#0f172a] px-2 py-0.5 rounded-md border border-slate-800 hover:border-[#00f0ff]/30 hover:text-white transition-colors cursor-default"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    {/* Action Links / Buttons */}
                    <div className="flex flex-wrap gap-2">
                      {isWaave && (
                        <button 
                          type="button"
                          onMouseDown={(e) => e.preventDefault()}
                          onClick={() => setShowWaaveArch(!showWaaveArch)}
                          className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono transition-all cursor-pointer border ${
                            showWaaveArch 
                              ? "bg-[#00f0ff] text-black font-semibold border-[#00f0ff] shadow-[0_0_15px_rgba(0,240,255,0.4)]" 
                              : "bg-[#00f0ff]/10 hover:bg-[#00f0ff]/20 border-[#00f0ff]/30 text-[#00f0ff]"
                          }`}
                        >
                          <FiTerminal className="w-3.5 h-3.5 animate-pulse" /> 
                          {showWaaveArch ? "Close Diagram" : "Architecture Explorer"}
                        </button>
                      )}
                      {isFinn && (
                        <button 
                          type="button"
                          onMouseDown={(e) => e.preventDefault()}
                          onClick={() => setShowFinnArch(!showFinnArch)}
                          className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono transition-all cursor-pointer border ${
                            showFinnArch 
                              ? "bg-[#00f0ff] text-black font-semibold border-[#00f0ff] shadow-[0_0_15px_rgba(0,240,255,0.4)]" 
                              : "bg-[#00f0ff]/10 hover:bg-[#00f0ff]/20 border-[#00f0ff]/30 text-[#00f0ff]"
                          }`}
                        >
                          <FiTerminal className="w-3.5 h-3.5 animate-pulse" /> 
                          {showFinnArch ? "Close Systems" : "System Engine Flow"}
                        </button>
                      )}
                      {project.backendLink && (
                        <a 
                          href={project.backendLink} 
                          target="_blank" 
                          rel="noopener noreferrer" 
                          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-950 hover:bg-slate-900 border border-slate-800 text-xs font-mono text-[#cbd5e1] hover:text-white transition-all"
                        >
                          <FiGithub className="w-3.5 h-3.5" /> Backend
                        </a>
                      )}
                      {project.frontendLink && (
                        <a 
                          href={project.frontendLink} 
                          target="_blank" 
                          rel="noopener noreferrer" 
                          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-950 hover:bg-slate-900 border border-slate-800 text-xs font-mono text-[#cbd5e1] hover:text-white transition-all"
                        >
                          <FiGithub className="w-3.5 h-3.5" /> Frontend
                        </a>
                      )}
                      {project.swaggerLink && (
                        <a 
                          href={project.swaggerLink} 
                          target="_blank" 
                          rel="noopener noreferrer" 
                          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-950 hover:bg-[#1e293b] border border-slate-800/80 text-xs font-mono text-[#00f0ff] hover:text-cyan-300 transition-all font-sans"
                        >
                          <FiTerminal className="w-3.5 h-3.5" /> Swagger
                        </a>
                      )}
                      {project.liveLink && (
                        <a 
                          href={project.liveLink} 
                          target="_blank" 
                          rel="noopener noreferrer" 
                          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#00f0ff] hover:bg-[#00d0e6] border border-[#00f0ff] text-xs font-mono text-black font-semibold transition-all shadow-[0_0_10px_rgba(0,240,255,0.2)]"
                        >
                          <FiExternalLink className="w-3.5 h-3.5" /> Live Demo
                        </a>
                      )}
                    </div>
                  </div>

                </div>

                {/* Architecture Panel placed EXACTLY under the current card in the vertical list context */}
                {isWaave && (
                  <AnimatePresence initial={false}>
                    {showWaaveArch && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.4, ease: "easeInOut" }}
                        className="w-full overflow-hidden mt-4 max-w-4xl mx-auto"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <div className="pb-6" onClick={(e) => e.stopPropagation()}>
                          <WaaveArchitecture />
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                )}

                {isFinn && (
                  <AnimatePresence initial={false}>
                    {showFinnArch && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.4, ease: "easeInOut" }}
                        className="w-full overflow-hidden mt-4 max-w-4xl mx-auto"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <div className="pb-6" onClick={(e) => e.stopPropagation()}>
                          <FinnVisualizer />
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                )}
              </React.Fragment>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Projects;
