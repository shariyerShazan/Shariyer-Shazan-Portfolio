"use client";

import React, { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

const CustomCursor = () => {
  const [isHovered, setIsHovered] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isHidden, setIsHidden] = useState(false);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { stiffness: 250, damping: 25, mass: 0.5 };
  const cursorX = useSpring(mouseX, springConfig);
  const cursorY = useSpring(mouseY, springConfig);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX - 16);
      mouseY.set(e.clientY - 16);
      if (!isVisible) setIsVisible(true);

      if (typeof document !== "undefined") {
        setIsHidden(document.body.classList.contains("no-custom-cursor"));
      }
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!target || typeof target.closest !== "function") return;

      const isClickable = 
        target.tagName === 'BUTTON' || 
        target.tagName === 'A' || 
        target.closest('button') || 
        target.closest('a') ||
        target.classList.contains('cursor-pointer');
      
      setIsHovered(!!isClickable);

      if (typeof document !== "undefined") {
        setIsHidden(document.body.classList.contains("no-custom-cursor"));
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseover", handleMouseOver);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseover", handleMouseOver);
    };
  }, [mouseX, mouseY, isVisible]);

  if (typeof window !== "undefined" && window.matchMedia("(pointer: coarse)").matches) {
    return null;
  }

  return (
    <motion.div
      style={{
        translateX: cursorX,
        translateY: cursorY,
        pointerEvents: "none",
      }}
      animate={{
        scale: isHovered ? 1.8 : 1,
      }}
      className={`custom-cursor fixed top-0 left-0 w-8 h-8 rounded-full border-2 border-[#7C3AED] pointer-events-none z-[9999] will-change-transform transition-all duration-150 ${
        isVisible && !isHidden ? "opacity-100 scale-100" : "opacity-0 scale-50"
      }`}
    >
      <div className="absolute inset-0 rounded-full bg-[#7C3AED]/10 pointer-events-none" />
    </motion.div>
  );
};

export default CustomCursor;
