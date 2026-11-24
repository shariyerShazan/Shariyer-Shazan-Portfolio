"use client";

import React from "react";
import { portfolioData } from "../../config/portfolioData";
import { FaGraduationCap, FaMapMarkerAlt, FaCalendarAlt } from "react-icons/fa";

const Education = () => {
  return (
    <section id="education" className="py-24 sm:py-32 relative">
      <div className="w-full">
        {/* Section Header */}
        <div className="mb-14 sm:mb-16" data-aos="fade-right">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono font-medium text-[#38bdf8] bg-[#38bdf8]/10 border border-[#38bdf8]/20 mb-4">
            05 / ACADEMIC BACKGROUND
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight mb-4 font-sans">
            Education
          </h2>
          <p className="text-sm sm:text-base text-slate-400 max-w-2xl font-sans leading-relaxed">
            Formal foundations in Computer Science, algorithms, systems engineering, and mathematics.
          </p>
        </div>

        {/* Education List */}
        <div className="space-y-6">
          {portfolioData.education.map((edu, index) => (
            <div
              key={index}
              className="p-6 sm:p-8 rounded-2xl bg-white/[0.02] border border-white/[0.08] hover:border-white/[0.16] transition-all duration-300 flex flex-col sm:flex-row sm:items-center justify-between gap-5"
              data-aos="fade-up"
              data-aos-delay={index * 100}
            >
              <div className="flex items-start sm:items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-white/[0.04] border border-white/[0.08] text-[#38bdf8] flex items-center justify-center flex-shrink-0 mt-0.5 sm:mt-0 shadow-sm">
                  <FaGraduationCap className="text-2xl" />
                </div>

                <div>
                  <h3 className="text-lg sm:text-xl font-bold text-white tracking-tight font-sans">
                    {edu.degree}
                  </h3>
                  <div className="text-sm sm:text-base font-semibold text-[#38bdf8] font-sans mt-0.5">
                    {edu.school}
                  </div>
                  {edu.location && (
                    <div className="flex items-center gap-1.5 text-xs font-mono text-slate-400 mt-1">
                      <FaMapMarkerAlt className="text-slate-500 text-xs" />
                      <span>{edu.location}</span>
                    </div>
                  )}
                </div>
              </div>

              <div>
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono font-medium bg-white/[0.04] border border-white/[0.08] text-slate-300 w-fit">
                  <FaCalendarAlt className="text-[10px]" />
                  <span>{edu.period}</span>
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Education;
