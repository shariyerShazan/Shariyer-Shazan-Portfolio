import React from "react";
import { portfolioData } from "../../config/portfolioData";
import { FiFolder } from "react-icons/fi";
import { BsCheck2Circle } from "react-icons/bs";

const Projects = () => {
  return (
    <section id="projects" className="py-24 px-6 min-h-screen flex flex-col justify-center">
      <div className="max-w-5xl mx-auto w-full">
        <h2 className="text-3xl md:text-5xl font-bold text-white mb-16 flex items-center gap-4" data-aos="fade-right">
          <span className="text-[#00f0ff] font-mono text-2xl md:text-4xl">03.</span>
          Featured Projects
          <div className="h-[1px] flex-grow bg-gradient-to-r from-[#475569] to-transparent ml-4"></div>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {portfolioData.projects.map((project, index) => (
            <div 
              key={index} 
              className="bg-[#0f172a] rounded-xl p-8 flex flex-col h-full border border-[#1e293b] hover:border-[#00f0ff]/50 transition-all duration-300 hover:-translate-y-2 group group-hover:shadow-[0_10px_30px_rgba(0,240,255,0.1)]"
              data-aos="fade-up"
              data-aos-delay={index * 50}
            >
              <div className="flex justify-between items-center mb-8">
                <FiFolder className="text-4xl text-[#00f0ff]" />
              </div>
              
              <h3 className="text-xl font-bold text-[#f8fafc] mb-4 group-hover:text-[#00f0ff] transition-colors">
                {project.title}
              </h3>
              
              <p className="text-[#94a3b8] text-sm mb-6 flex-grow">
                {project.description}
              </p>
              
              <div className="mt-auto pt-4 border-t border-[#1e293b]/50">
                <p className="text-xs font-mono text-[#475569] flex items-center gap-2 flex-wrap">
                  <BsCheck2Circle className="text-[#00f0ff]" />
                  {project.tags.join(", ")}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
