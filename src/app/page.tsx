"use client";

import React from "react";
import Hero from "@/components/sections/Hero";
import Skills from "@/components/sections/TechStack";
import Experience from "@/components/sections/Experience";
import Projects from "@/components/sections/Projects";
import Education from "@/components/sections/Education";
import Contact from "@/components/sections/Contact";
import { AOSInit } from "@/components/AOSInit";
import { GameMode } from "@/components/GameMode";
import { useGameMode } from "@/context/GameModeContext";
import { portfolioData } from "@/config/portfolioData";

export default function Home() {
  const { isGameActive } = useGameMode();

  return (
    <div className="flex flex-col gap-2 relative">
      <AOSInit />
      <Hero />
      <Skills />
      <Experience />
      <Projects />
      <Education />
      <Contact />
      
      {isGameActive && <GameMode />}
      
      <footer className="py-12 text-center font-mono text-xs flex flex-col items-center gap-2 w-full">
        <p className="text-slate-400 tracking-widest uppercase text-[10px]">
          &copy; {new Date().getFullYear()} {portfolioData.name} &mdash; Backend Engineer &amp; Systems Architect
        </p>
        <p className="text-slate-600 text-[9px] tracking-wider">
          Crafting scalable APIs, distributed systems &amp; real-time architectures.
        </p>
      </footer>
    </div>
  );
}
