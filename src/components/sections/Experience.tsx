"use client";

import React from "react";
import { portfolioData } from "../../config/portfolioData";
import { FaMapMarkerAlt, FaCalendarAlt } from "react-icons/fa";

const Experience = () => {
  return (
    <section id="experience" className="py-24 sm:py-32 relative">
      <div className="w-full">
        {/* Section Header */}
        <div className="mb-14 sm:mb-16" data-aos="fade-right">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono font-medium text-[#38bdf8] bg-[#38bdf8]/10 border border-[#38bdf8]/20 mb-4">
            02 / CAREER MILESTONES
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight mb-4 font-sans">
            Professional Experience
          </h2>
          <p className="text-sm sm:text-base text-slate-400 max-w-2xl font-sans leading-relaxed">
            Demonstrated engineering leadership in architecting distributed backend services, high-availability Kubernetes infrastructure, and cross-platform native applications.
          </p>
        </div>

        {/* Timeline Container */}
        <div className="relative border-l border-white/[0.1] ml-3 sm:ml-4 pl-6 sm:pl-10 space-y-12 sm:space-y-16">
          {portfolioData.experience.map((exp, index) => {
            const isCurrent = exp.period.includes("PRESENT");
            return (
              <div
                key={exp.company + exp.role}
                className="relative"
                data-aos="fade-up"
                data-aos-delay={index * 100}
              >
                {/* Timeline Node Dot */}
                <div
                  className={`absolute -left-[31px] sm:-left-[47px] top-6 w-3.5 h-3.5 rounded-full border-2 ${
                    isCurrent
                      ? "bg-emerald-400 border-[#08090d] ring-4 ring-emerald-500/20"
                      : "bg-slate-400 border-[#08090d] ring-4 ring-white/10"
                  }`}
                />

                {/* Role Card */}
                <div className="p-6 sm:p-8 rounded-2xl bg-white/[0.02] border border-white/[0.08] hover:border-white/[0.16] transition-all duration-300">
                  {/* Card Header */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-3">
                    <div>
                      <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight font-sans">
                        {exp.role}
                      </h3>
                      <div className="text-base sm:text-lg font-semibold text-[#38bdf8] font-sans mt-0.5">
                        {exp.company}
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <span
                        className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono font-medium ${
                          isCurrent
                            ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"
                            : "bg-white/[0.04] text-slate-300 border border-white/[0.08]"
                        }`}
                      >
                        <FaCalendarAlt className="text-[10px]" />
                        <span>{exp.period}</span>
                      </span>
                    </div>
                  </div>

                  {/* Location Meta */}
                  <div className="flex items-center gap-1.5 text-xs font-mono text-slate-400 mb-6">
                    <FaMapMarkerAlt className="text-slate-500 text-xs" />
                    <span>{exp.location || "Dhaka, Bangladesh"}</span>
                  </div>

                  {/* Responsibilities & Achievements */}
                  <div className="space-y-3 mb-8">
                    {exp.description.map((desc, i) => (
                      <div key={i} className="flex items-start gap-3">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#38bdf8] mt-2.5 flex-shrink-0" />
                        <p className="text-sm sm:text-base text-slate-300 leading-relaxed font-sans">
                          {desc}
                        </p>
                      </div>
                    ))}
                  </div>

                  {/* Technology Tags */}
                  {exp.tech && exp.tech.length > 0 && (
                    <div className="pt-6 border-t border-white/[0.06]">
                      <div className="text-xs font-mono text-slate-500 uppercase tracking-wider mb-3">
                        Technologies &amp; Infrastructure
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {exp.tech.map((t) => (
                          <span
                            key={t}
                            className="text-xs font-sans text-slate-300 bg-white/[0.03] border border-white/[0.06] hover:border-white/[0.14] px-3 py-1 rounded-lg transition-colors cursor-default"
                          >
                            {t}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Experience;
