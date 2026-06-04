import React from "react";
import { portfolioData } from "../../config/portfolioData";

const Experience = () => {
  return (
    <section id="experience" className="py-24 px-6 min-h-screen flex flex-col justify-center">
      <div className="max-w-4xl mx-auto w-full">
        <h2 className="text-3xl md:text-5xl font-bold text-white mb-16 flex items-center gap-4" data-aos="fade-right">
          <span className="text-[#00f0ff] font-mono text-2xl md:text-4xl">02.</span>
          Experience
          <div className="h-[1px] flex-grow bg-gradient-to-r from-[#475569] to-transparent ml-4"></div>
        </h2>

        <div className="relative border-l border-[#334155] ml-4 md:ml-6 space-y-12">
          {portfolioData.experience.map((exp, index) => (
            <div 
              key={index} 
              className="relative pl-8 md:pl-12"
              data-aos="fade-up" 
              data-aos-delay={index * 100}
            >
              {/* Timeline Marker */}
              <div className="absolute w-4 h-4 rounded-full bg-[#0a0f1d] border-2 border-[#00f0ff] -left-[9px] top-1.5 ring-4 ring-[#0a0f1d]"></div>
              
              <div className="flex flex-col md:flex-row md:items-baseline mb-2 gap-2 md:gap-4">
                <h3 className="text-xl font-bold text-[#f8fafc]">
                  {exp.role} <span className="text-[#00f0ff]">@ {exp.company}</span>
                </h3>
              </div>
              
              <p className="text-sm font-mono text-[#94a3b8] mb-4">
                {exp.period} | DHAKA, BANGLADESH
              </p>
              
              <div className="text-[#cbd5e1] leading-relaxed max-w-2xl text-justify group space-y-2">
                {exp.description.map((desc, i) => (
                  <p key={i}>{desc}</p>
                ))}
              </div>

              <div className="flex flex-wrap gap-2 mt-4">
                {exp.tech?.map((t) => (
                  <span key={t} className="text-[10px] font-mono text-[#00f0ff] bg-[#00f0ff]/10 px-2 py-0.5 rounded">
                    {t}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Experience;
