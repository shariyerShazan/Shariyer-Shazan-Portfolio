"use client";

import React, { useState, useEffect } from "react";
import profilePic from "../../../public/profile.jpg";
import { Button } from "../ui/Button";
import { portfolioData } from "../../config/portfolioData";
import { FaLinkedin, FaDownload, FaMapMarkerAlt } from "react-icons/fa";
import Image from "next/image";

const Hero = () => {
  const [roleIndex, setRoleIndex] = useState(0);
  const [currentText, setCurrentText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const roles = portfolioData.roles || [portfolioData.role];
    const fullText = roles[roleIndex];
    let timer: NodeJS.Timeout;

    if (!isDeleting) {
      if (currentText !== fullText) {
        timer = setTimeout(() => {
          setCurrentText(fullText.substring(0, currentText.length + 1));
        }, 80);
      } else {
        // Pause for 10 seconds at full text state before deletion
        timer = setTimeout(() => {
          setIsDeleting(true);
        }, 10000);
      }
    } else {
      if (currentText !== "") {
        timer = setTimeout(() => {
          setCurrentText(fullText.substring(0, currentText.length - 1));
        }, 40);
      } else {
        // Pause briefly at empty state before changing to next role
        timer = setTimeout(() => {
          setIsDeleting(false);
          setRoleIndex((prev) => (prev + 1) % roles.length);
        }, 300);
      }
    }

    return () => clearTimeout(timer);
  }, [currentText, isDeleting, roleIndex]);

  return (
    <section
      id="home"
      className="relative min-h-[100svh] flex flex-col justify-center px-6 pt-32 pb-20 overflow-hidden bg-gradient-to-b from-[#0a0f1d] to-[#0a0f1d]"
    >
      {/* Decorative radial gradients for professional depth */}
      <div className="absolute top-[20%] left-[10%] w-[350px] h-[350px] bg-[#00f0ff]/10 rounded-full blur-[100px] pointer-events-none"></div>
      <div className="absolute bottom-[20%] right-[10%] w-[400px] h-[400px] bg-[#7C3AED]/5 rounded-full blur-[120px] pointer-events-none"></div>

      <div className="max-w-6xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10">
        {/* Text Content */}
        <div className="lg:col-span-7" data-aos="fade-up">
          <div className="flex flex-wrap items-center gap-3 mb-6">
            <p className="text-[#00f0ff] font-mono tracking-wider border-l-2 border-[#00f0ff] pl-3 text-xs md:text-sm">
              SYSTEMS_INITIALIZED: TRUE
            </p>
            
            <div className="flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono bg-[#1e293b]/80 border border-[#334155] text-slate-300">
              <FaMapMarkerAlt className="text-[#00f0ff] animate-bounce" />
              <span>{portfolioData.location}</span>
            </div>
          </div>

          <h1 className="text-4xl md:text-6xl xl:text-7xl font-bold text-white mb-3 leading-tight">
            {portfolioData.name}
          </h1>

          {/* Static Professional Title */}
          <p className="text-base md:text-xl font-mono text-[#00f0ff] mb-6 font-semibold tracking-wide">
            {portfolioData.role}
          </p>

          <div className="h-10 md:h-12 mb-8 flex items-center">
            <h2 className="text-xl md:text-3xl font-bold text-[#94a3b8]">
              I design &amp; build <span className="text-[#00f0ff] border-r-2 border-[#00f0ff] pr-1 animate-pulse font-mono">{currentText}</span>
            </h2>
          </div>

          <p className="text-sm md:text-base text-[#cbd5e1] leading-relaxed max-w-2xl mb-10 text-justify font-sans">
            {portfolioData.about.split("Waave").map((part, index, arr) => (
              <React.Fragment key={index}>
                {part}
                {index < arr.length - 1 && (
                  <a
                    href="#projects"
                    className="text-[#00f0ff] hover:underline underline-offset-4 font-semibold transition-all duration-300"
                  >
                    Waave
                  </a>
                )}
              </React.Fragment>
            ))}
          </p>

          <div className="flex flex-wrap gap-4 items-center">
            <Button
              variant="primary"
              className="cursor-pointer font-semibold"
              onClick={() => {
                const el = document.getElementById("projects");
                if (el)
                  window.scrollTo({
                    top: el.offsetTop - 80,
                    behavior: "smooth",
                  });
              }}
            >
              Configure Projects
            </Button>

            <Button
              variant="outline"
              className="gap-2 cursor-pointer"
              onClick={() => window.open(portfolioData.resumeLink, "_blank")}
            >
              <FaDownload className="w-3.5 h-3.5" /> Get CV / Resume
            </Button>

            <Button
              variant="ghost"
              className="gap-2 cursor-pointer"
              onClick={() =>
                window.open(
                  portfolioData.socials.find((s) => s.name === "LinkedIn")?.href,
                  "_blank"
                )
              }
            >
              <FaLinkedin /> Connect
            </Button>
          </div>

          {/* Social Links Row */}
          <div className="mt-8 pt-6 border-t border-[#1e293b]/50 flex flex-wrap gap-3">
            {portfolioData.socials.map((social) => {
              const SocialIcon = social.icon;
              return (
                <a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-xs md:text-sm font-mono text-[#cbd5e1] hover:text-[#00f0ff] transition-all bg-[#0f172a]/30 hover:bg-[#00f0ff]/5 px-3 py-1.5 rounded-lg border border-[#1e293b]/60 hover:border-[#00f0ff]/30 cursor-pointer group shadow-sm hover:shadow-[0_0_10px_rgba(0,240,255,0.05)]"
                >
                  <SocialIcon className="text-sm group-hover:scale-110 transition-transform duration-300" />
                  <span>{social.name}</span>
                </a>
              );
            })}
          </div>
        </div>

        {/* Profile Image Column */}
        <div
          className="lg:col-span-5 flex justify-center lg:justify-end"
          data-aos="fade-left"
        >
          <div className="relative w-64 h-64 md:w-80 md:h-80 xl:w-96 xl:h-96">
            {/* Geometric Background Shapes */}
            <div className="absolute -inset-4 border border-[#00f0ff]/20 rounded-2xl rotate-6 animate-pulse"></div>
            <div className="absolute -inset-4 border border-[#7C3AED]/20 rounded-2xl -rotate-3"></div>

            {/* The Image Container */}
            <div className="relative w-full h-full rounded-2xl overflow-hidden border-2 border-[#1e293b] shadow-2xl group">
              <div className="absolute inset-0 bg-[#00f0ff]/10 mix-blend-overlay group-hover:bg-transparent transition-colors duration-500"></div>
              <Image
                src={profilePic}
                alt={portfolioData.name}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                priority
              />

              {/* Overlay scanning effect */}
              <div className="absolute top-0 left-0 w-full h-1 bg-[#00f0ff] opacity-40 animate-scan"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
