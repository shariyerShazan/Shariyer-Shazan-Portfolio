"use client";

import React from "react";
import Hero from "@/components/sections/Hero";
import Skills from "@/components/sections/TechStack";
import Experience from "@/components/sections/Experience";
import Projects from "@/components/sections/Projects";
import Education from "@/components/sections/Education";
import Contact from "@/components/sections/Contact";
import { AOSInit } from "@/components/AOSInit";
import { portfolioData } from "@/config/portfolioData";

export default function Home() {
  return (
    <div className="flex flex-col gap-2 relative">
      <AOSInit />
      <Hero />
      <Skills />
      <Experience />
      <Projects />
      <Education />
      <Contact />
      
      <footer className="py-12 text-center text-slate-500 font-mono text-sm">
        <p>&copy; {new Date().getFullYear()} {portfolioData.name}. Built with Next.js & Tailwind CSS.</p>
      </footer>
    </div>
  );
}
