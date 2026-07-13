"use client";

import React from "react";
import { portfolioData } from "../../config/portfolioData";

const TechStack = () => {
  return (
    <section id="tech" className="py-24 px-6 min-h-screen flex flex-col justify-center">
      <div className="max-w-4xl mx-auto w-full">
        <h2 className="text-3xl md:text-5xl font-bold text-white mb-16 flex items-center gap-4" data-aos="fade-right">
          <span className="text-[#00f0ff] font-mono text-2xl md:text-4xl">01.</span>
          Technical Arsenal
          <div className="h-[1px] flex-grow bg-gradient-to-r from-[#475569] to-transparent ml-4"></div>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {portfolioData.techStack.map((category, index) => (
            <div 
              key={category.title} 
              className="bg-[#0a0f1d] border border-[#1e293b] p-6 rounded-lg shadow-lg relative overflow-hidden group"
              data-aos="fade-up"
              data-aos-delay={index * 100}
            >
              {/* Decorative top border */}
              <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-[#00f0ff] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

              <h3 className="text-xl font-semibold text-white mb-6 tracking-wide flex items-center gap-3">
                <span className="w-2 h-2 rounded-full bg-[#00f0ff]"></span>
                {category.title}
              </h3>
              
              <div className="flex flex-wrap gap-3">
                {category.items.map((tech) => (
                  <div 
                    key={tech.name} 
                    className="flex items-center gap-2 bg-[#0f172a] border border-[#334155] px-4 py-2 rounded text-sm text-[#cbd5e1] hover:border-[#00f0ff] hover:text-[#00f0ff] transition-colors cursor-default"
                  >
                    <tech.icon className="text-xl" style={{ color: tech.color }} />
                    <span>{tech.name}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TechStack;
