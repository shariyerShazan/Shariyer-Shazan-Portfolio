"use client";

import React, { useState, useEffect } from "react";
import { Button } from "../ui/Button";
import { portfolioData } from "../../config/portfolioData";
import { FaLinkedin, FaDownload, FaMapMarkerAlt, FaBriefcase, FaCodeBranch } from "react-icons/fa";
import { SiKubernetes } from "react-icons/si";
import { FiArrowDown, FiArrowUpRight } from "react-icons/fi";
import { AsciiImage } from "../ui/AsciiImage";

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
        }, 45);
      } else {
        timer = setTimeout(() => {
          setIsDeleting(true);
        }, 5000);
      }
    } else {
      if (currentText !== "") {
        timer = setTimeout(() => {
          setCurrentText(fullText.substring(0, currentText.length - 1));
        }, 20);
      } else {
        timer = setTimeout(() => {
          setIsDeleting(false);
          setRoleIndex((prev) => (prev + 1) % roles.length);
        }, 150);
      }
    }

    return () => clearTimeout(timer);
  }, [currentText, isDeleting, roleIndex]);

  return (
    <section
      id="home"
      className="relative min-h-[92svh] flex flex-col justify-center pt-32 pb-20 overflow-hidden"
    >
      <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center relative z-10">
        {/* Left Column: Bio & Core Info */}
        <div className="lg:col-span-7 flex flex-col justify-center" data-aos="fade-up">
          {/* Top Status & Location Badges */}
          <div className="flex flex-wrap items-center gap-3 mb-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-mono bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 font-medium">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              <span>Lead Engineer @ YouFresh LLC</span>
            </div>

            <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-mono bg-white/[0.04] border border-white/[0.08] text-slate-300">
              <FaMapMarkerAlt className="text-slate-400 text-xs" />
              <span>{portfolioData.location}</span>
            </div>
          </div>

          {/* Name & Headline */}
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold text-white mb-4 tracking-tight font-sans">
            {portfolioData.name}
          </h1>

          <p className="text-lg md:text-xl font-medium text-slate-200 mb-3 tracking-tight font-sans">
            {portfolioData.role}
          </p>

          {/* Dynamic Specialization Subtitle */}
          <div className="min-h-[2.5rem] mb-6 flex items-center">
            <p className="text-sm md:text-base text-slate-400 font-sans">
              Specializing in{" "}
              <span className="text-[#38bdf8] font-mono font-medium border-b border-[#38bdf8]/40 pb-0.5">
                {currentText}
              </span>
              <span className="text-[#38bdf8] animate-pulse ml-0.5">|</span>
            </p>
          </div>

          {/* Authoritative Human Bio */}
          <p className="text-sm md:text-base text-slate-300/90 leading-relaxed max-w-2xl mb-8 font-sans">
            {portfolioData.about}
          </p>

          {/* Architectural Credentials Micro-Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-8">
            <a
              href="#opensource"
              className="p-3.5 rounded-xl bg-white/[0.03] border border-white/[0.08] hover:border-red-500/40 hover:bg-white/[0.05] transition-all group flex flex-col justify-between"
            >
              <div className="flex items-center justify-between mb-2">
                <FaCodeBranch className="text-[#E0234E] text-base" />
                <FiArrowUpRight className="text-xs text-slate-500 group-hover:text-white transition-colors" />
              </div>
              <div>
                <div className="text-xs font-semibold text-white font-sans">NestJS Core Contributor</div>
                <div className="text-[11px] font-mono text-slate-400 mt-0.5">3 Merged Framework PRs</div>
              </div>
            </a>

            <a
              href="#projects"
              className="p-3.5 rounded-xl bg-white/[0.03] border border-white/[0.08] hover:border-emerald-500/40 hover:bg-white/[0.05] transition-all group flex flex-col justify-between"
            >
              <div className="flex items-center justify-between mb-2">
                <FaBriefcase className="text-emerald-400 text-base" />
                <FiArrowUpRight className="text-xs text-slate-500 group-hover:text-white transition-colors" />
              </div>
              <div>
                <div className="text-xs font-semibold text-white font-sans">Grovr Ecosystem</div>
                <div className="text-[11px] font-mono text-slate-400 mt-0.5">AWS EKS &amp; React Native</div>
              </div>
            </a>

            <a
              href="#tech"
              className="p-3.5 rounded-xl bg-white/[0.03] border border-white/[0.08] hover:border-sky-500/40 hover:bg-white/[0.05] transition-all group flex flex-col justify-between"
            >
              <div className="flex items-center justify-between mb-2">
                <SiKubernetes className="text-sky-400 text-base" />
                <FiArrowUpRight className="text-xs text-slate-500 group-hover:text-white transition-colors" />
              </div>
              <div>
                <div className="text-xs font-semibold text-white font-sans">Cloud Infrastructure</div>
                <div className="text-[11px] font-mono text-slate-400 mt-0.5">Terraform, Ansible, Helm</div>
              </div>
            </a>
          </div>

          {/* Action CTAs Row */}
          <div className="flex flex-wrap gap-3 items-center mb-8">
            <Button
              variant="primary"
              className="font-semibold text-xs md:text-sm px-6 py-3 cursor-pointer"
              onClick={() => {
                const el = document.getElementById("projects");
                if (el) el.scrollIntoView({ behavior: "smooth" });
              }}
            >
              <span>View Featured Work</span>
              <FiArrowDown className="text-sm" />
            </Button>

            <Button
              variant="secondary"
              className="font-medium text-xs md:text-sm px-5 py-3 cursor-pointer"
              onClick={() => window.open(portfolioData.resumeLink, "_blank")}
            >
              <FaDownload className="text-xs" />
              <span>Resume / CV</span>
            </Button>

            <Button
              variant="outline"
              className="font-medium text-xs md:text-sm px-5 py-3 cursor-pointer"
              onClick={() => {
                const el = document.getElementById("contact");
                if (el) el.scrollIntoView({ behavior: "smooth" });
              }}
            >
              <span>Get in Touch</span>
            </Button>
          </div>

          {/* Social Links Row */}
          <div className="flex items-center flex-wrap gap-2 pt-4 border-t border-white/[0.08]">
            <span className="text-xs font-mono text-slate-500 uppercase tracking-wider mr-2">Profiles:</span>
            {portfolioData.socials.map((social) => {
              const SocialIcon = social.icon;
              return (
                <a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs font-sans text-slate-400 hover:text-white transition-all bg-white/[0.03] hover:bg-white/[0.08] px-3 py-1.5 rounded-lg border border-white/[0.06] hover:border-white/[0.12]"
                >
                  <SocialIcon className="text-xs" />
                  <span>{social.name}</span>
                </a>
              );
            })}
          </div>
        </div>

        {/* Right Column: Profile Portrait */}
        <div
          className="lg:col-span-5 flex justify-center lg:justify-end"
          data-aos="fade-left"
        >
          <div className="p-2 rounded-3xl bg-gradient-to-b from-white/[0.12] via-white/[0.04] to-transparent shadow-[0_20px_50px_rgba(0,0,0,0.6)]">
            <div className="relative w-72 h-72 sm:w-80 sm:h-80 xl:w-96 xl:h-96 rounded-2xl overflow-hidden bg-slate-950 border border-white/[0.08]">
              <AsciiImage src="/profile.jpg" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
