"use client";

import React from "react";
import { portfolioData } from "../../config/portfolioData";

const TechStack = () => {
  return (
    <section id="tech" className="py-24 sm:py-32 relative">
      <div className="w-full">
        {/* Section Header */}
        <div className="mb-14 sm:mb-16" data-aos="fade-right">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono font-medium text-[#38bdf8] bg-[#38bdf8]/10 border border-[#38bdf8]/20 mb-4">
            01 / TECHNICAL EXPERTISE
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight mb-4 font-sans">
            Technical Arsenal
          </h2>
          <p className="text-sm sm:text-base text-slate-400 max-w-2xl font-sans leading-relaxed">
            A comprehensive overview of the languages, frameworks, cloud infrastructure, and distributed systems technologies I leverage to architect and ship production ecosystems.
          </p>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
          {portfolioData.techStack.map((category, index) => (
            <div
              key={category.title}
              className="p-6 sm:p-7 rounded-2xl bg-white/[0.02] border border-white/[0.08] hover:border-white/[0.16] transition-all duration-300 flex flex-col justify-between"
              data-aos="fade-up"
              data-aos-delay={index * 60}
            >
              <div>
                {/* Category Header */}
                <div className="flex items-center justify-between gap-3 mb-6 pb-4 border-b border-white/[0.06]">
                  <h3 className="text-base sm:text-lg font-semibold text-white tracking-tight font-sans">
                    {category.title}
                  </h3>
                  <span className="text-xs font-mono text-slate-400 bg-white/[0.04] border border-white/[0.06] px-2.5 py-0.5 rounded-full font-medium">
                    {category.items.length} tools
                  </span>
                </div>

                {/* Items Badges */}
                <div className="flex flex-wrap gap-2.5">
                  {category.items.map((tech) => (
                    <div
                      key={tech.name}
                      className="inline-flex items-center gap-2.5 bg-white/[0.03] border border-white/[0.06] hover:border-white/[0.18] hover:bg-white/[0.07] px-3.5 py-2 rounded-xl text-xs sm:text-sm font-medium text-slate-200 transition-all cursor-default shadow-sm select-none"
                    >
                      <tech.icon
                        className="text-base flex-shrink-0"
                        style={{ color: tech.color || "#38bdf8" }}
                      />
                      <span className="font-sans tracking-tight">{tech.name}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TechStack;
