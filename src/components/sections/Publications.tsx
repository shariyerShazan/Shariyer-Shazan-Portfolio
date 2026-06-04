import React from "react";
import { FiExternalLink, FiBookOpen } from "react-icons/fi";

const Publications = () => {
  return (
    <section id="publications" className="py-24 px-6 min-h-screen flex flex-col justify-center bg-gradient-to-b from-transparent to-[#0a0f1d]/50">
      <div className="max-w-4xl mx-auto w-full">
        <h2 className="text-3xl md:text-5xl font-bold text-white mb-16 flex items-center gap-4" data-aos="fade-right">
          <span className="text-[#00f0ff] font-mono text-2xl md:text-4xl">04.</span>
          Publications
          <div className="h-[1px] flex-grow bg-gradient-to-r from-[#475569] to-transparent ml-4"></div>
        </h2>

        <div className="space-y-8">
          <div 
            className="bg-[#0a0f1d] border border-[#1e293b] p-8 rounded-lg shadow-lg relative group overflow-hidden"
            data-aos="fade-up"
          >
            <div className="absolute top-0 left-0 w-1 h-full bg-[#00f0ff] transform scale-y-0 group-hover:scale-y-100 transition-transform origin-bottom duration-300"></div>
            
            <div className="flex justify-between items-start mb-4">
              <FiBookOpen className="text-3xl text-[#00f0ff] mb-2" />
              <button className="text-[#94a3b8] hover:text-[#00f0ff] transition-colors p-2">
                <FiExternalLink className="text-xl" />
              </button>
            </div>

            <h3 className="text-xl font-bold text-[#f8fafc] mb-2 group-hover:text-[#00f0ff] transition-colors pr-8">
              High-Availability Backend Architecture Patterns
            </h3>
            
            <p className="text-sm font-mono text-[#00f0ff] mb-4">
              Tech Journal &nbsp;|&nbsp; 2024
            </p>
            
            <p className="text-[#94a3b8] leading-relaxed">
              Exploring distributed system design and scalability challenges in modern enterprise environments.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Publications;
