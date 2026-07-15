"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "./ui/Button";
import { HiMenuAlt3, HiX } from "react-icons/hi";
import { useGameMode } from "@/context/GameModeContext";

const NAV_LINKS = [
  { name: "Home", href: "#home" },
  { name: "Skills", href: "#tech" },
  { name: "Experience", href: "#experience" },
  { name: "Projects", href: "#projects" },
  { name: "Education", href: "#education" },
  { name: "Contact", href: "#contact" },
];

const Navbar = () => {
  const [activeHash, setActiveHash] = useState("#home");
  const [scrolled, setScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const { isGameActive, setIsGameActive } = useGameMode();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);

      const sections = NAV_LINKS.map((link) => link.href.substring(1));
      let currentSection = sections[0];

      for (const section of sections) {
        const el = document.getElementById(section);
        if (el && window.scrollY >= el.offsetTop - 150) {
          currentSection = section;
        }
      }
      setActiveHash(`#${currentSection}`);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setIsOpen(false);
    const el = document.getElementById(href.substring(1));
    if (el) {
      window.scrollTo({ top: el.offsetTop - 80, behavior: "smooth" });
    }
  };

  return (
    <>
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className={cn(
          "fixed top-4 md:top-8 left-1/2 -translate-x-1/2 z-[60] w-[90%] max-w-5xl rounded-full border transition-all duration-300",
          scrolled 
            ? "bg-[#0a0f1d]/85 backdrop-blur-md border-gray-800 shadow-2xl py-3" 
            : "bg-transparent border-transparent py-5"
        )}
      >
        <nav className="flex items-center justify-between px-6 md:px-8">
          <div className="flex items-center gap-3 md:gap-4">
            <div className="text-xl font-bold text-[#f8fafc] tracking-widest cursor-pointer" onClick={() => window.scrollTo({top: 0, behavior: 'smooth'})}>
              <span className="text-[#00f0ff]">&lt;</span>
              Shazan<span className="text-[#00f0ff]">/&gt;</span>
            </div>

            {/* Game Mode switch button */}
            <button
              onClick={() => setIsGameActive(!isGameActive)}
              className={cn(
                "flex items-center gap-1.5 px-3 py-1 text-[10px] font-mono font-bold uppercase tracking-wider rounded border transition-all duration-300 cursor-pointer shadow-sm relative overflow-hidden",
                isGameActive
                  ? "bg-[#00f0ff]/10 border-[#00f0ff]/80 text-[#00f0ff] shadow-[0_0_10px_rgba(0,240,255,0.2)]"
                  : "bg-slate-950/70 border-slate-700/80 text-slate-400 hover:text-slate-200 hover:border-slate-500"
              )}
            >
              <span className={cn(
                "w-1.5 h-1.5 rounded-full inline-block animate-pulse",
                isGameActive ? "bg-[#00f0ff]" : "bg-slate-500"
              )} />
              GAME MODE
            </button>
          </div>

          {/* Desktop Nav */}
          <ul className={cn(
            "hidden lg:flex items-center gap-2 text-xs xl:text-sm transition-all duration-300",
            isGameActive ? "opacity-0 pointer-events-none" : "opacity-100"
          )}>
            {NAV_LINKS.map((link) => (
              <li key={link.name}>
                <a
                  href={link.href}
                  onClick={(e) => handleClick(e, link.href)}
                  className={cn(
                    "relative px-3 py-1 font-medium transition-colors hover:text-[#00f0ff]",
                    activeHash === link.href ? "text-[#00f0ff]" : "text-[#94a3b8]"
                  )}
                >
                  {activeHash === link.href && (
                    <motion.span
                      layoutId="active-nav"
                      className="absolute inset-0 bg-[rgba(0,240,255,0.1)] border-b-2 border-[#00f0ff] rounded-sm"
                      transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    />
                  )}
                  <span className="relative z-10">{link.name}</span>
                </a>
              </li>
            ))}
          </ul>

          {/* Mobile Toggle */}
          {!isGameActive && (
            <button 
              className="lg:hidden text-2xl text-[#00f0ff] p-1 cursor-pointer"
              onClick={() => setIsOpen(!isOpen)}
            >
              {isOpen ? <HiX /> : <HiMenuAlt3 />}
            </button>
          )}
        </nav>
      </motion.header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="fixed inset-0 z-[55] bg-[#0a0f1d] flex flex-col items-center justify-center lg:hidden"
          >
            <ul className="flex flex-col items-center gap-8">
              {NAV_LINKS.map((link, i) => (
                <motion.li 
                  key={link.name}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05 }}
                >
                  <a
                    href={link.href}
                    onClick={(e) => handleClick(e, link.href)}
                    className={cn(
                      "text-2xl font-bold tracking-widest hover:text-[#00f0ff] transition-colors",
                      activeHash === link.href ? "text-[#00f0ff]" : "text-white"
                    )}
                  >
                    {link.name}
                  </a>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
