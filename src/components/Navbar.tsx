"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "./ui/Button";
import { HiMenuAlt3, HiX } from "react-icons/hi";
import { FiArrowUpRight } from "react-icons/fi";

const NAV_LINKS = [
  { name: "Overview", href: "#home" },
  { name: "Skills", href: "#tech" },
  { name: "Experience", href: "#experience" },
  { name: "Open Source", href: "#opensource" },
  { name: "Projects", href: "#projects" },
  { name: "Education", href: "#education" },
  { name: "Contact", href: "#contact" },
];

const Navbar = () => {
  const [activeHash, setActiveHash] = useState("#home");
  const [scrolled, setScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 30);

      const sections = NAV_LINKS.map((link) => link.href.substring(1));
      let currentSection = sections[0];

      for (const section of sections) {
        const el = document.getElementById(section);
        if (el && window.scrollY >= el.offsetTop - 140) {
          currentSection = section;
        }
      }
      setActiveHash(`#${currentSection}`);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
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
        initial={{ y: -60, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.35, ease: "easeOut" }}
        className="fixed top-0 left-0 right-0 z-50 flex justify-center px-4 pt-4 pb-2 pointer-events-none"
      >
        <nav
          className={cn(
            "pointer-events-auto flex items-center justify-between w-full max-w-5xl rounded-2xl transition-all duration-300 px-4 md:px-5 py-2.5",
            scrolled
              ? "bg-[#090d16]/80 backdrop-blur-xl border border-white/[0.08] shadow-[0_8px_32px_rgba(0,0,0,0.5)]"
              : "bg-transparent border border-transparent"
          )}
        >
          {/* Brand Logo */}
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="flex items-center gap-1.5 text-sm md:text-base font-bold text-white hover:opacity-80 transition-opacity font-sans tracking-tight cursor-pointer"
          >
            <span className="text-[#38bdf8] font-mono">&lt;</span>
            <span className="font-semibold tracking-tight">Shazan</span>
            <span className="text-[#38bdf8] font-mono">/&gt;</span>
          </button>

          {/* Desktop Navigation Links */}
          <ul className="hidden lg:flex items-center gap-1 text-xs font-medium font-sans">
            {NAV_LINKS.map((link) => {
              const isActive = activeHash === link.href;
              return (
                <li key={link.name}>
                  <a
                    href={link.href}
                    onClick={(e) => handleClick(e, link.href)}
                    className={cn(
                      "px-3 py-1.5 rounded-lg transition-all duration-200 block select-none",
                      isActive
                        ? "text-white bg-white/[0.08] border border-white/[0.08]"
                        : "text-slate-400 hover:text-white hover:bg-white/[0.04]"
                    )}
                  >
                    {link.name}
                  </a>
                </li>
              );
            })}
          </ul>

          {/* Action Button */}
          <div className="hidden lg:flex items-center gap-3">
            <a
              href="#contact"
              onClick={(e) => handleClick(e, "#contact")}
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-white hover:bg-slate-200 text-slate-950 font-semibold text-xs transition-all shadow-sm active:scale-[0.98]"
            >
              <span>Get in Touch</span>
              <FiArrowUpRight className="text-xs" />
            </a>
          </div>

          {/* Mobile Toggle Button */}
          <button
            className="lg:hidden text-2xl text-slate-200 p-1.5 rounded-lg hover:bg-white/[0.06] transition-colors cursor-pointer"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle mobile menu"
          >
            {isOpen ? <HiX /> : <HiMenuAlt3 />}
          </button>
        </nav>
      </motion.header>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-40 bg-[#08090d]/95 backdrop-blur-2xl flex flex-col items-center justify-center lg:hidden px-6"
          >
            <ul className="flex flex-col items-center gap-5 w-full max-w-xs text-center">
              {NAV_LINKS.map((link, i) => (
                <motion.li
                  key={link.name}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.03 }}
                  className="w-full"
                >
                  <a
                    href={link.href}
                    onClick={(e) => handleClick(e, link.href)}
                    className={cn(
                      "block py-2.5 text-lg font-semibold tracking-tight transition-colors rounded-xl",
                      activeHash === link.href
                        ? "text-white bg-white/[0.08]"
                        : "text-slate-300 hover:text-white"
                    )}
                  >
                    {link.name}
                  </a>
                </motion.li>
              ))}
              <li className="pt-4 w-full">
                <a
                  href="#contact"
                  onClick={(e) => handleClick(e, "#contact")}
                  className="block w-full py-3 rounded-xl bg-white text-slate-950 font-semibold text-sm tracking-tight text-center"
                >
                  Get in Touch
                </a>
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
