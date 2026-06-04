"use client";

import React from "react";
import { Button } from "../ui/Button";
import { portfolioData } from "../../config/portfolioData";
import { FaLinkedin, FaEnvelope } from "react-icons/fa";

const Hero = () => {
  return (
    <section
      id="home"
      className="relative min-h-[100svh] flex flex-col justify-center px-6 pt-32 pb-20"
    >
      <div className="max-w-6xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        
        {/* Text Content */}
        <div className="lg:col-span-7" data-aos="fade-up">
          <p className="text-[#00f0ff] font-mono tracking-wider mb-4 border-l-2 border-[#00f0ff] pl-3">
            HELLO, WORLD! I AM
          </p>

          <h1 className="text-4xl md:text-6xl xl:text-7xl font-bold text-white mb-6 leading-tight">
            {portfolioData.name}
          </h1>

          <h2 className="text-xl md:text-3xl font-semibold text-[#94a3b8] mb-8">
            {portfolioData.role}
          </h2>

          <p className="text-sm md:text-base text-[#cbd5e1] leading-relaxed max-w-2xl mb-10 text-justify">
            {portfolioData.about}
          </p>

          <div className="flex flex-wrap gap-4 items-center">
            <Button
              variant="primary"
              className="cursor-pointer"
              onClick={() => {
                const el = document.getElementById("projects");
                if (el) window.scrollTo({ top: el.offsetTop - 80, behavior: "smooth" });
              }}
            >
              View Projects
            </Button>

            <Button
              variant="outline"
              className="gap-2 cursor-pointer"
              onClick={() => window.open(portfolioData.socials.find(s => s.name === "LinkedIn")?.href, "_blank")}
            >
              <FaLinkedin /> LinkedIn
            </Button>

            <Button
              variant="ghost"
              className="gap-2 cursor-pointer"
              onClick={() => window.location.href = `mailto:${portfolioData.socials.find(s => s.name === "Email")?.href.replace("mailto:", "")}`}
            >
              <FaEnvelope /> Email Me
            </Button>
          </div>
        </div>

        {/* Profile Image Column */}
        <div className="lg:col-span-5 flex justify-center lg:justify-end" data-aos="fade-left">
          <div className="relative w-64 h-64 md:w-80 md:h-80 xl:w-96 xl:h-96">
            {/* Geometric Background Shapes */}
            <div className="absolute -inset-4 border border-[#00f0ff]/20 rounded-2xl rotate-6 animate-pulse"></div>
            <div className="absolute -inset-4 border border-[#7C3AED]/20 rounded-2xl -rotate-3"></div>
            
            {/* The Image Container */}
            <div className="relative w-full h-full rounded-2xl overflow-hidden border-2 border-[#1e293b] shadow-2xl group">
              <div className="absolute inset-0 bg-[#00f0ff]/10 mix-blend-overlay group-hover:bg-transparent transition-colors duration-500"></div>
              <img 
                src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=800" 
                alt={portfolioData.name}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              
              {/* Overlay scanning effect */}
              <div className="absolute top-0 left-0 w-full h-1 bg-[#00f0ff] opacity-20 animate-scan"></div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};

export default Hero;
