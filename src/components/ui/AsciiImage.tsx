"use client";

import React, { useRef, useEffect, useState } from "react";
import Image from "next/image";

interface Particle {
  x: number;
  y: number;
  targetX: number;
  targetY: number;
  normX: number; // normalized coordinate (0 to 1)
  normY: number; // normalized coordinate (0 to 1)
  vx: number;
  vy: number;
  originalColor: string; // Real colors for high-legibility facial features mapping
  themeColor: string; // Portfolio themed matrix colors
  char: string;
  brightness: number;
}

interface AsciiImageProps {
  src: string;
  gridResolution?: number; // Density of characters (default: 80)
  themeColor?: string; // Color used for "theme" color mode (default: "#00f0ff")
  colorMode?: "original" | "theme"; // Rendering color scheme (default: "theme")
  fontSize?: number; // Font size of ASCII characters (default: 9)
  pushStrength?: number; // Strength of mouse repulsion (default: 0.15)
  mouseRadius?: number; // Radius of mouse influence (default: 80)
  springStrength?: number; // Gravity returning particles (default: 0.04)
  friction?: number; // Velocity decay factors (default: 0.88)
}

const charsPreset = "`.\":-+*="; // User specified ASCII gradient: darkest to brightest density

const hexToRgb = (hex: string) => {
  const shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
  const fullHex = hex.replace(shorthandRegex, (m, r, g, b) => r + r + g + g + b + b);
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(fullHex);
  return result
    ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16),
      }
    : { r: 0, g: 240, b: 255 };
};

export const AsciiImage: React.FC<AsciiImageProps> = ({
  src,
  gridResolution = 90, // Slightly denser grid resolution for detailed face shape mapping
  themeColor = "#00f0ff",
  colorMode = "original", // Default to original colors for perfect facial legibility
  fontSize = 8.0, // Balanced font size
  pushStrength = 0.04, // Gentle push
  mouseRadius = 45, // Hover radius
  springStrength = 0.12, // Tight snapping spring-back
  friction = 0.78, // Snappy stabilization
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const imageLoadedRef = useRef<boolean>(false);
  const mouseRef = useRef<{ x: number; y: number }>({ x: -9999, y: -9999 });
  const animationFrameIdRef = useRef<number | null>(null);

  const [viewMode, setViewMode] = useState<"ascii" | "original">("ascii");
  const [colorModeState, setColorModeState] = useState<"original" | "theme">(colorMode);
  const [dimensions, setDimensions] = useState<{ width: number; height: number }>({
    width: 384,
    height: 384,
  });

  // Handle Resize and get bounding dims
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const updateDimensions = () => {
      const rect = container.getBoundingClientRect();
      if (rect.width > 0 && rect.height > 0) {
        setDimensions({
          width: Math.floor(rect.width),
          height: Math.floor(rect.height),
        });
      }
    };

    updateDimensions();

    const resizeObserver = new ResizeObserver(() => {
      updateDimensions();
    });
    resizeObserver.observe(container);

    return () => {
      resizeObserver.disconnect();
    };
  }, []);

  // Set up Canvas DPR and scale particles when dimensions change
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || !dimensions.width || !dimensions.height) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const dpr = window.devicePixelRatio || 1;
    // Set actual canvas drawing dimensions scaled for high DPI screens
    canvas.width = dimensions.width * dpr;
    canvas.height = dimensions.height * dpr;
    
    // Scale drawings back down logically so we write normal CSS coordinate values
    ctx.scale(dpr, dpr);

    // Re-adjust particle coordinate systems relative to the new layout
    const particles = particlesRef.current;
    particles.forEach((part) => {
      const targetX = part.normX * dimensions.width;
      const targetY = part.normY * dimensions.height;
      part.targetX = targetX;
      part.targetY = targetY;
      
      // If particles have not been initialized yet, start them at targets
      if (part.x === 0 && part.y === 0) {
        // Scatter slightly initially
        part.x = targetX + (Math.random() - 0.5) * 20;
        part.y = targetY + (Math.random() - 0.5) * 20;
      }
    });

  }, [dimensions]);

  // Load and sample the image
  useEffect(() => {
    if (imageLoadedRef.current) return;

    const img = new window.Image();
    img.crossOrigin = "anonymous";
    img.src = src;

    img.onload = () => {
      imageLoadedRef.current = true;
      
      // Create hidden/off-screen downsampling canvas
      const tempCanvas = document.createElement("canvas");
      const tempCtx = tempCanvas.getContext("2d");
      if (!tempCtx) return;

      const sampleWidth = gridResolution;
      const aspect = img.height / img.width;
      const sampleHeight = Math.round(sampleWidth * aspect);

      tempCanvas.width = sampleWidth;
      tempCanvas.height = sampleHeight;
      tempCtx.drawImage(img, 0, 0, sampleWidth, sampleHeight);

      const imgData = tempCtx.getImageData(0, 0, sampleWidth, sampleHeight);
      const data = imgData.data;

      const newParticles: Particle[] = [];
      const themeRgb = hexToRgb(themeColor);

      for (let y = 0; y < sampleHeight; y++) {
        for (let x = 0; x < sampleWidth; x++) {
          const idx = (y * sampleWidth + x) * 4;
          const r = data[idx];
          const g = data[idx + 1];
          const b = data[idx + 2];
          const a = data[idx + 3];

          // Ignore transparent pixels
          if (a < 128) continue;

          // Compute normalized coordinates (0 to 1) for boundary filtering
          const normX = x / sampleWidth;
          const normY = y / sampleHeight;

          // 1. Boundary filter: Discard background details on left (trees/others) and right (curtain edge)
          if (normX < 0.26 || normX > 0.83) continue;
          if (normY < 0.04) continue;

          // 2. Chromakey background removal:
          // A. Strip bright red/orange curtains specifically without affecting skin tones (curtain has high R, very low B)
          const isOrangeCurtain = r > 95 && r > g * 1.4 && b < 48;
          if (isOrangeCurtain) continue;

          // B. Strip background blue shirts and green foliage on left
          const isBlueShirtBg = b > r * 1.15 && b > 55 && normX < 0.35;
          if (isBlueShirtBg) continue;
          const isGreenLeaves = g > r * 1.04 && g > b && g > 40;
          if (isGreenLeaves) continue;

          // C. Strip bright sky patches and light spots
          const isBrightSkyPart = r > 160 && g > 160 && b > 150 && normX < 0.45;
          if (isBrightSkyPart) continue;

          // Standard Luma brightness formula
          const brightness = 0.299 * r + 0.587 * g + 0.114 * b;
          // Filter out dark background shadows for a clean look
          if (brightness < 35) continue;

          // S-curve contrast expansion mapping for detailed definition of eyes, brows, nose, smile structure
          let normBrightness = (brightness - 35) / (220 - 35);
          normBrightness = Math.max(0, Math.min(1, normBrightness));
          const contrastBrightness = 3 * Math.pow(normBrightness, 2) - 2 * Math.pow(normBrightness, 3);

          const charIdx = Math.floor(contrastBrightness * (charsPreset.length - 1));
          const char = charsPreset[charIdx];

          // Store original colors boosted/equalized for dark background visibility
          const scale = Math.max(1.35, 112 / (brightness || 1));
          const adjR = Math.min(255, Math.floor(r * scale));
          const adjG = Math.min(255, Math.floor(g * scale));
          const adjB = Math.min(255, Math.floor(b * scale));
          
          // Apply a gentle saturation boost to enrich natural skin tones and shirt values
          const avg = (adjR + adjG + adjB) / 3;
          const satR = Math.min(255, Math.max(0, Math.floor(avg + (adjR - avg) * 1.25)));
          const satG = Math.min(255, Math.max(0, Math.floor(avg + (adjG - avg) * 1.25)));
          const satB = Math.min(255, Math.max(0, Math.floor(avg + (adjB - avg) * 1.25)));
          const originalColor = `rgb(${satR}, ${satG}, ${satB})`;
          
          // Store theme colors mapped to boosted opacity curve
          const opacity = Math.min(1.0, (brightness / 255) * 0.55 + 0.45);
          const themeColorVal = `rgba(${themeRgb.r}, ${themeRgb.g}, ${themeRgb.b}, ${opacity.toFixed(2)})`;

          newParticles.push({
            x: 0,
            y: 0,
            targetX: 0,
            targetY: 0,
            normX,
            normY,
            vx: 0,
            vy: 0,
            originalColor,
            themeColor: themeColorVal,
            char,
            brightness,
          });
        }
      }

      particlesRef.current = newParticles;

      // Trigger coordinate calculation based on current state size dimensions
      const width = dimensions.width;
      const height = dimensions.height;
      
      newParticles.forEach((part) => {
        const targetX = part.normX * width;
        const targetY = part.normY * height;
        part.targetX = targetX;
        part.targetY = targetY;
        // Introduce random starting offsets to fly-in smoothly on page load
        part.x = targetX + (Math.random() - 0.5) * 40;
        part.y = targetY + (Math.random() - 0.5) * 40;
      });
    };
  }, [src, gridResolution, themeColor, dimensions.width, dimensions.height]);

  // Main animation loops
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const render = () => {
      // Clear with transparent bg to let parent layouts shine through
      ctx.clearRect(0, 0, dimensions.width, dimensions.height);

      ctx.font = `bold ${fontSize}px monospace`;
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";

      const particles = particlesRef.current;
      const mouse = mouseRef.current;

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        // 1. Calculate repulsion forces relative to the current cursor coordinates
        const dxMouse = p.x - mouse.x;
        const dyMouse = p.y - mouse.y;
        const distMouse = Math.sqrt(dxMouse * dxMouse + dyMouse * dyMouse);

        let pushX = 0;
        let pushY = 0;

        if (distMouse < mouseRadius) {
          // Inversely proportional magnitude: closer is stronger repel strength
          const force = (mouseRadius - distMouse) / mouseRadius;
          const angle = Math.atan2(dyMouse, dxMouse);
          pushX = Math.cos(angle) * force * pushStrength * 80;
          pushY = Math.sin(angle) * force * pushStrength * 80;
          
          p.vx += pushX;
          p.vy += pushY;
        }

        // 2. Gravitational spring force dragging it back home to target
        const dxTarget = p.targetX - p.x;
        const dyTarget = p.targetY - p.y;
        p.vx += dxTarget * springStrength;
        p.vy += dyTarget * springStrength;

        // Apply friction
        p.vx *= friction;
        p.vy *= friction;

        // Apply velocities
        p.x += p.vx;
        p.y += p.vy;

        // Optimization: snap if speeds and distances are microscopic to save CPU jitter
        if (Math.abs(p.vx) < 0.01 && Math.abs(p.vy) < 0.01 && Math.abs(dxTarget) < 0.1 && Math.abs(dyTarget) < 0.1) {
          p.x = p.targetX;
          p.y = p.targetY;
          p.vx = 0;
          p.vy = 0;
        }

        // Draw particle representation characters based on chosen color view
        ctx.fillStyle = colorModeState === "theme" ? p.themeColor : p.originalColor;
        ctx.fillText(p.char, p.x, p.y);
      }

      animationFrameIdRef.current = requestAnimationFrame(render);
    };

    if (viewMode === "ascii") {
      animationFrameIdRef.current = requestAnimationFrame(render);
    }

    return () => {
      if (animationFrameIdRef.current) {
        cancelAnimationFrame(animationFrameIdRef.current);
      }
    };
  }, [dimensions, fontSize, mouseRadius, pushStrength, springStrength, friction, viewMode, colorModeState]);

  // Handle Event listeners to register cursor tracking
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      mouseRef.current = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      };
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        const rect = container.getBoundingClientRect();
        mouseRef.current = {
          x: e.touches[0].clientX - rect.left,
          y: e.touches[0].clientY - rect.top,
        };
      }
    };

    const handleMouseEnterNative = () => {
      if (typeof document !== "undefined") document.body.classList.add("no-custom-cursor");
    };

    const handleMouseLeaveNative = () => {
      if (typeof document !== "undefined") document.body.classList.remove("no-custom-cursor");
      mouseRef.current = { x: -9999, y: -9999 };
    };

    container.addEventListener("mousemove", handleMouseMove, { passive: true });
    container.addEventListener("mouseleave", handleMouseLeaveNative, { passive: true });
    container.addEventListener("mouseenter", handleMouseEnterNative, { passive: true });
    container.addEventListener("touchmove", handleTouchMove, { passive: true });
    container.addEventListener("touchend", handleMouseLeaveNative, { passive: true });
    container.addEventListener("touchstart", handleMouseEnterNative, { passive: true });

    return () => {
      container.removeEventListener("mousemove", handleMouseMove);
      container.removeEventListener("mouseleave", handleMouseLeaveNative);
      container.removeEventListener("mouseenter", handleMouseEnterNative);
      container.removeEventListener("touchmove", handleTouchMove);
      container.removeEventListener("touchend", handleMouseLeaveNative);
      container.removeEventListener("touchstart", handleMouseEnterNative);
    };
  }, []);

  // Cleanup body class on unmount
  useEffect(() => {
    return () => {
      if (typeof document !== "undefined") {
        document.body.classList.remove('no-custom-cursor');
      }
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative w-full h-full rounded-2xl overflow-hidden border border-slate-800/80 bg-[#070b14]/50 shadow-2xl group cursor-crosshair select-none"
      data-no-circle-cursor="true"
    >
      {/* 1. ASCII Renderer Canvas */}
      <canvas
        ref={canvasRef}
        className={`w-full h-full object-cover transition-opacity duration-500 ease-in-out ${
          viewMode === "ascii" ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        style={{ display: "block" }}
      />

      {/* 2. Original Portrait Display (Crossfaded) */}
      <div
        className={`absolute inset-0 transition-opacity duration-500 ease-in-out ${
          viewMode === "original" ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
      >
        <div className="absolute inset-0 bg-[#00f0ff]/10 mix-blend-overlay z-10 pointer-events-none"></div>
        <img
          src={src}
          alt="Shariyer Shazan Profile"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Futuristic cyber scanner screen effect */}
      <div className="absolute top-0 left-0 w-full h-1 bg-[#00f0ff]/30 opacity-40 animate-scan pointer-events-none z-10"></div>

      {/* Control UI: Mode toggle overlay on hover */}
      <div className="absolute bottom-3 right-3 z-20 flex gap-2 opacity-50 group-hover:opacity-100 transition-opacity duration-300 pointer-events-auto">
        {viewMode === "ascii" && (
          <button
            onClick={(e) => {
              e.stopPropagation();
              setColorModeState((prev) => (prev === "theme" ? "original" : "theme"));
            }}
            className="px-2 py-1 text-[8px] font-mono font-bold uppercase rounded border border-[#00f0ff]/40 bg-slate-950/95 text-[#00f0ff] hover:bg-[#00f0ff]/10 transition-all cursor-pointer"
          >
            {colorModeState === "theme" ? "Colors" : "Matrix"}
          </button>
        )}
        <button
          onClick={(e) => {
            e.stopPropagation();
            setViewMode((prev) => (prev === "ascii" ? "original" : "ascii"));
          }}
          className="px-2 py-1 text-[8px] font-mono font-bold uppercase rounded border border-[#00f0ff]/40 bg-slate-950/95 text-[#00f0ff] hover:bg-[#00f0ff]/10 transition-all cursor-pointer shadow-md hover:shadow-[0_0_8px_rgba(0,240,255,0.35)]"
        >
          {viewMode === "ascii" ? "Photo" : "ASCII"}
        </button>
      </div>
    </div>
  );
};
