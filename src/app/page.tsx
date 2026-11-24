"use client";

import React from "react";
import Hero from "@/components/sections/Hero";
import Skills from "@/components/sections/TechStack";
import Experience from "@/components/sections/Experience";
import OpenSource from "@/components/sections/OpenSource";
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
      
      {/* Semantic Knowledge Graph Profile for Search Engines & AI Crawlers */}
      <section aria-label="Professional Profile & Biography" className="sr-only">
        <h2>About Shariyer Shazan — Lead Full-Stack &amp; DevOps Engineer</h2>
        <p>
          Md Shariyer Shazan is a software engineer based in Tejgaon, Dhaka, Bangladesh.
          He currently serves as Lead Full-Stack &amp; DevOps Engineer at YouFresh LLC (June 2026 – Present),
          where he leads the end-to-end engineering and Kubernetes infrastructure for Grovr, an enterprise healthcare,
          AI nutrition tracking, and telehealth ecosystem across iOS, Android, Web, and AWS Cloud.
        </p>
        <p>
          Previously, Shariyer worked as a Full-Stack Developer at Softvence (August 2025 – October 2026),
          architecting an enterprise Canine Registry SaaS platform with RBAC permissions, pedigree tracking, and Stripe billing.
        </p>
        <p>
          Open Source: Shariyer Shazan is an official core framework contributor to NestJS (nestjs/nest) with three merged pull requests in the master branch:
          PR #17430 (Singleton Provider Reuse in Lazily Loaded Modules),
          PR #17618 (Provider Discovery for Custom Decorators &amp; Value Providers), and
          PR #17631 (Lazy Module Logger Lifecycle Restoration).
        </p>
        <p>
          Core Technologies: NestJS, Node.js, TypeScript, React Native, Expo, Next.js, AWS (EKS, EC2, RDS, S3), Kubernetes,
          Terraform, Ansible, Docker, Helm, Kafka, gRPC, Redis, PostgreSQL, Prisma ORM, MongoDB, Socket.IO, WebRTC,
          Stripe Connect, and OpenAI GPT-4o Vision &amp; Whisper.
        </p>
        <p>
          Contact: Email shariyershazan1@gmail.com, LinkedIn https://www.linkedin.com/in/md-shariyerShazan, GitHub https://github.com/shariyerShazan.
        </p>
      </section>

      <Hero />
      <Skills />
      <Experience />
      <OpenSource />
      <Projects />
      <Education />
      <Contact />
      
      {isGameActive && <GameMode />}
      
      <footer className="py-16 text-center font-sans text-xs flex flex-col items-center gap-3 w-full border-t border-white/[0.08] mt-16">
        <p className="text-slate-300 tracking-wide text-xs sm:text-sm font-medium">
          &copy; {new Date().getFullYear()} {portfolioData.name} &mdash; {portfolioData.role}
        </p>
        <p className="text-slate-500 text-xs tracking-normal max-w-lg">
          Architecting resilient cloud-native ecosystems, distributed microservices &amp; real-time platforms.
        </p>
      </footer>
    </div>
  );
}
