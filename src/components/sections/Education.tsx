"use client";

import React from "react";
import { portfolioData } from "../../config/portfolioData";
import { FaGraduationCap } from "react-icons/fa";

const Education = () => {
  return (
    <section id="education" className="py-24 px-6 min-h-screen flex flex-col justify-center">
      <div className="max-w-4xl mx-auto w-full">
        <h2 className="text-3xl md:text-5xl font-bold text-white mb-16 flex items-center gap-4" data-aos="fade-right">
          <span className="text-[#00f0ff] font-mono text-2xl md:text-4xl">04.</span>
          Education
          <div className="h-[1px] flex-grow bg-gradient-to-r from-[#475569] to-transparent ml-4"></div>
        </h2>

        <div className="space-y-10">
          {portfolioData.education.map((edu, index) => (
            <div 
              key={index} 
              className="flex flex-col md:flex-row gap-6 bg-[#0f172a] p-8 rounded-lg border border-[#1e293b] hover:border-[#00f0ff]/30 transition-colors"
              data-aos="fade-up"
              data-aos-delay={index * 100}
            >
              <div className="hidden md:flex items-center justify-center w-16 h-16 rounded-full bg-[#00f0ff]/10 border border-[#00f0ff]/30 flex-shrink-0 mt-1">
                <FaGraduationCap className="text-3xl text-[#00f0ff]" />
              </div>
              
              <div className="flex-grow">
                <h3 className="text-xl font-bold text-[#f8fafc] mb-2">{edu.degree}</h3>
                <h4 className="text-lg text-[#00f0ff] mb-4">{edu.school}</h4>
                
                <div className="flex flex-col sm:flex-row sm:items-center justify-between text-sm font-mono text-[#94a3b8] gap-2">
                  <div className="flex items-center gap-2">
                    <span className="text-[#475569]">Timeline:</span> {edu.period}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Education;
