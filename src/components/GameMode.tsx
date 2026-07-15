"use client";

import React, { useEffect, useRef, useState } from "react";
import { useGameMode } from "@/context/GameModeContext";
import { HiX } from "react-icons/hi";

// Synthesize retro audio bloops dynamically
const playBeep = (freq: number, duration: number, type: OscillatorType = "sine", gainVal = 0.05) => {
  try {
    const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
    if (!AudioContextClass) return;
    const ctx = new AudioContextClass();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    
    osc.type = type;
    osc.frequency.setValueAtTime(freq, ctx.currentTime);
    gain.gain.setValueAtTime(gainVal, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.00001, ctx.currentTime + duration);
    
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start();
    osc.stop(ctx.currentTime + duration);
  } catch (e) {
    // Fail silently on security block
  }
};

interface Platform {
  x: number;
  y: number;
  w: number;
  h: number;
}

interface Collectible {
  x: number;
  y: number;
  label: string;
  collected: boolean;
  pulseOffset: number;
}

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  color: string;
  size: number;
  alpha: number;
}

const TECH_NODES = [
  "NestJS", "Node.js", "gRPC", "Kafka",
  "Redis", "Docker", "Postgres", "MongoDB",
  "Mongoose", "CI/CD", "AWS", "PM2"
];

export const GameMode: React.FC = () => {
  const { isGameActive, setIsGameActive } = useGameMode();
  
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const requestRef = useRef<number | null>(null);

  // Stats
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(0);
  const [servicesConnected, setServicesConnected] = useState<string[]>([]);
  const [gameState, setGameState] = useState<"playing" | "victory">("playing");

  // Low gravity, easy controls physics parameters
  const playerRef = useRef({
    x: 154, // Center aligned on the 1st top-left platform (80 + 90 - 16)
    y: 240, // Spawn right on top of 260y platform level (Y = 260 - playerHeight)
    vx: 0,
    vy: 0,
    width: 32,
    height: 20,
    onGround: true,
  });

  const keysRef = useRef<{ [key: string]: boolean }>({});
  const platformsRef = useRef<Platform[]>([]);
  const collectiblesRef = useRef<Collectible[]>([]);
  const particlesRef = useRef<Particle[]>([]);
  const documentHeightRef = useRef<number>(2000);

  // Generate platforms all down the entire website page height
  const generateLevel = (width: number) => {
    const list: Platform[] = [];
    const colls: Collectible[] = [];

    // Calculate actual document height
    const docHeight = Math.max(
      document.documentElement.scrollHeight,
      document.body.scrollHeight,
      3500
    );
    documentHeightRef.current = docHeight;

    // Generous, easy platform dimensions
    const platformWidth = 180;
    const verticalGap = 160;

    // 1st platform: fixed top-left coordinate as requested, cleared below the HUD
    list.push({ x: 80, y: 260, w: platformWidth, h: 8 });

    // Start rendering platforms cascading downwards starting from next level
    let currentY = 260 + verticalGap;
    let index = 0;

    while (currentY < docHeight - 120) {
      // Alternate left, center, right to cover the width
      const maxColX = width - platformWidth - 60;
      const x = 50 + Math.random() * maxColX;
      
      list.push({ x, y: currentY, w: platformWidth, h: 8 });

      // Add floating collectibles
      if (Math.random() < 0.6) {
        const label = TECH_NODES[index % TECH_NODES.length];
        colls.push({
          x: x + platformWidth / 2,
          y: currentY - 25,
          label,
          collected: false,
          pulseOffset: Math.random() * 10,
        });
        index++;
      }

      currentY += verticalGap;
    }

    // Portal deployment platform at very bottom of document near footer
    list.push({ x: width / 2 - 120, y: docHeight - 80, w: 240, h: 12 });
    colls.push({
      x: width / 2,
      y: docHeight - 110,
      label: "⚡ PRODUCTION DEPLOY ⚡",
      collected: false,
      pulseOffset: 0,
    });

    platformsRef.current = list;
    collectiblesRef.current = colls;
  };

  useEffect(() => {
    // Setup high score local storage safely
    if (typeof window !== "undefined") {
      const stored = localStorage.getItem("shazan_game_highscore");
      if (stored) setHighScore(parseInt(stored, 10));
    }
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;

      if (platformsRef.current.length === 0) {
        generateLevel(window.innerWidth);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    const handleKeyDown = (e: KeyboardEvent) => {
      // Allow scroll page with Keyboard arrows ordinarily, but intercept to move player
      if (["Space", "ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"].includes(e.code)) {
        e.preventDefault();
      }
      keysRef.current[e.code] = true;
    };

    const handleKeyUp = (e: KeyboardEvent) => {
      keysRef.current[e.code] = false;
    };

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);

    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
    };
  }, []);

  // Main game physics loop
  useEffect(() => {
    const loop = () => {
      const canvas = canvasRef.current;
      if (!canvas) {
        requestRef.current = requestAnimationFrame(loop);
        return;
      }

      const ctx = canvas.getContext("2d");
      if (!ctx) {
        requestRef.current = requestAnimationFrame(loop);
        return;
      }

      // 1. UPDATE PHYSICS
      if (gameState === "playing") {
        const player = playerRef.current;

        // Custom Easy Low Gravity physics formulas
        const moveSpeed = 0.5;
        const maxSpeed = 5.0;
        const friction = 0.85;
        const gravity = 0.35; // Easy low-gravity fall rate

        if (keysRef.current["ArrowLeft"] || keysRef.current["KeyA"]) {
          player.vx -= moveSpeed;
        } else if (keysRef.current["ArrowRight"] || keysRef.current["KeyD"]) {
          player.vx += moveSpeed;
        } else {
          player.vx *= friction;
        }

        player.vx = Math.max(-maxSpeed, Math.min(maxSpeed, player.vx));

        // Jump physics (Easy high jump)
        if ((keysRef.current["ArrowUp"] || keysRef.current["KeyW"] || keysRef.current["Space"]) && player.onGround) {
          player.vy = -9.2;
          player.onGround = false;
          playBeep(260, 0.08, "sine", 0.03);
        }

        // Apply Gravity
        player.vy += gravity;

        player.x += player.vx;
        player.y += player.vy;

        // Screen boundary loops
        if (player.x + player.width < 0) player.x = window.innerWidth;
        if (player.x > window.innerWidth) player.x = -player.width;

        // Clamping to doc limits
        const docHeight = documentHeightRef.current;
        if (player.y < 50) {
          player.y = 50;
          player.vy = 0;
        }
        if (player.y > docHeight - 40) {
          player.y = docHeight - 40;
          player.vy = 0;
          player.onGround = true; // Landed at bottom ground of the website page
        }

        // Check platforms collision
        player.onGround = false;
        const platforms = platformsRef.current;
        for (const p of platforms) {
          if (player.vy > 0 && 
              player.x + player.width - 6 > p.x && 
              player.x + 6 < p.x + p.w &&
              player.y + player.height >= p.y &&
              player.y + player.height - player.vy <= p.y + p.h + 2) {
            
            player.y = p.y - player.height;
            player.vy = 0;
            player.onGround = true;
            break;
          }
        }

        // Check collectibles
        const collectibles = collectiblesRef.current;
        for (const c of collectibles) {
          if (!c.collected) {
            const range = 24;
            if (player.x + player.width > c.x - range && 
                player.x < c.x + range && 
                player.y + player.height > c.y - range && 
                player.y < c.y - 4) {
              
              c.collected = true;

              const isDeployment = c.label.includes("DEPLOY");
              if (isDeployment) {
                // Victory Deployed!
                setGameState("victory");
                playBeep(523.2, 0.1, "square", 0.05);
                setTimeout(() => playBeep(659.3, 0.1, "square", 0.05), 80);
                setTimeout(() => playBeep(784.0, 0.1, "square", 0.05), 160);
                setTimeout(() => playBeep(1046.5, 0.4, "square", 0.08), 240);
                continue;
              }

              // Normal node collect
              setScore((prev) => {
                const ns = prev + 100;
                if (ns > highScore) {
                  setHighScore(ns);
                  localStorage.setItem("shazan_game_highscore", ns.toString());
                }
                return ns;
              });

              setServicesConnected((prev) => [...prev, c.label]);
              playBeep(800, 0.04, "sine", 0.03);
              setTimeout(() => playBeep(1200, 0.08, "sine", 0.03), 40);

              // Spawn particles
              for (let i = 0; i < 10; i++) {
                particlesRef.current.push({
                  x: c.x,
                  y: c.y,
                  vx: (Math.random() - 0.5) * 5,
                  vy: (Math.random() - 0.5) * 5 - 1,
                  color: "#10B981",
                  size: 2 + Math.random() * 2,
                  alpha: 1.0,
                });
              }
            }
          }
        }

        // SMOOTH SCROLL TRACKING: Intercept window scroll position to follow player coordinates
        const targetScrollY = player.y - window.innerHeight / 2;
        const currentScrollY = window.scrollY;
        
        // Smoothly adjust scroll position of the browser view
        const scrollDelta = targetScrollY - currentScrollY;
        if (Math.abs(scrollDelta) > 1) {
          window.scrollTo(0, currentScrollY + scrollDelta * 0.065);
        }
      }

      // Update particles
      particlesRef.current.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;
        p.alpha -= 0.025;
      });
      particlesRef.current = particlesRef.current.filter((p) => p.alpha > 0);

      // 2. RENDERING CANVAS (RELATIVE TO WINDOW SCROLLY)
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const scrollY = window.scrollY;

      // Draw Platforms
      const platforms = platformsRef.current;
      platforms.forEach((p) => {
        const drawY = p.y - scrollY;
        // Don't draw if outside viewport
        if (drawY + p.h < 0 || drawY > canvas.height) return;

        // Glowing platform line
        ctx.shadowBlur = 6;
        ctx.shadowColor = "#00f0ff";
        ctx.strokeStyle = "rgba(0, 240, 255, 0.7)";
        ctx.lineWidth = 3;
        ctx.beginPath();
        ctx.moveTo(p.x, drawY);
        ctx.lineTo(p.x + p.w, drawY);
        ctx.stroke();

        // Platform tech dash line
        ctx.shadowBlur = 0;
        ctx.setLineDash([3, 4]);
        ctx.strokeStyle = "rgba(0, 240, 255, 0.3)";
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(p.x, drawY + 4);
        ctx.lineTo(p.x + p.w, drawY + 4);
        ctx.stroke();
        ctx.setLineDash([]);
      });

      // Draw Collectibles
      const collectibles = collectiblesRef.current;
      collectibles.forEach((c) => {
        if (c.collected) return;
        const drawY = c.y - scrollY;
        if (drawY + 40 < 0 || drawY - 40 > canvas.height) return;

        const pulse = Math.sin((Date.now() / 180) + c.pulseOffset) * 2;
        ctx.font = "bold 9px monospace";
        ctx.textAlign = "center";
        
        if (c.label.includes("DEPLOY")) {
          // Yellow glow Deploy badge
          ctx.shadowBlur = 10;
          ctx.shadowColor = "#EAB308";
          ctx.fillStyle = "#EAB308";
          ctx.font = "bold 11px monospace";
          ctx.fillText(c.label, c.x, drawY + pulse);
          
          ctx.strokeStyle = "#EAB308";
          ctx.lineWidth = 1.5;
          ctx.strokeRect(c.x - 85, drawY - 12 + pulse, 170, 18);
        } else {
          // Standard green tech badge
          ctx.shadowBlur = 5;
          ctx.shadowColor = "#10B981";
          ctx.fillStyle = "#10B981";
          
          const labelWidth = ctx.measureText(c.label).width;
          ctx.fillText(c.label, c.x, drawY + pulse);
          
          ctx.strokeStyle = "rgba(16, 185, 129, 0.5)";
          ctx.lineWidth = 1;
          ctx.strokeRect(c.x - (labelWidth / 2) - 4, drawY - 9 + pulse, labelWidth + 8, 12);
        }
        ctx.shadowBlur = 0;
      });

      // Draw particles
      particlesRef.current.forEach((p) => {
        const drawY = p.y - scrollY;
        ctx.fillStyle = p.color;
        ctx.globalAlpha = p.alpha;
        ctx.fillRect(p.x - p.size / 2, drawY - p.size / 2, p.size, p.size);
      });
      ctx.globalAlpha = 1.0;

      // Draw Player </ >
      const player = playerRef.current;
      const drawPlayerY = player.y - scrollY;
      ctx.shadowBlur = 10;
      ctx.shadowColor = "#00f0ff";
      ctx.fillStyle = "#00f0ff";
      ctx.font = "bold 22px monospace";
      ctx.textAlign = "left";
      ctx.fillText("</>", player.x, drawPlayerY + 16);
      ctx.shadowBlur = 0;

      requestRef.current = requestAnimationFrame(loop);
    };

    requestRef.current = requestAnimationFrame(loop);
    return () => {
      if (requestRef.current) cancelAnimationFrame(requestRef.current);
    };
  }, [gameState, highScore]);

  // Restart game utility
  const resetGame = () => {
    playerRef.current = {
      x: 154,
      y: 240,
      vx: 0,
      vy: 0,
      width: 32,
      height: 20,
      onGround: true,
    };
    setScore(0);
    setServicesConnected([]);
    setGameState("playing");
    particlesRef.current = [];
    window.scrollTo({ top: 0, behavior: "smooth" });
    generateLevel(window.innerWidth);
    
    playBeep(440, 0.1, "triangle", 0.04);
    setTimeout(() => playBeep(554, 0.1, "triangle", 0.04), 80);
    setTimeout(() => playBeep(659, 0.2, "triangle", 0.04), 160);
  };

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 pointer-events-none z-45 overflow-hidden"
    >
      {/* Viewport canvas overlays */}
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full block pointer-events-none" />

      {/* Screen HUD - Slightly moved down to avoid overlapping the logo */}
      <div className="absolute top-20 md:top-24 left-8 font-mono z-10 pointer-events-none flex flex-col gap-1 text-[10px] md:text-sm">
        <div className="px-3 py-2 rounded border border-[#00f0ff]/20 bg-[#0a0f1d]/85 text-slate-300 shadow-md backdrop-blur-sm pointer-events-auto select-none">
          <div>SCORE: <span className="text-[#00f0ff] font-bold">{score}</span></div>
          <div>HIGH SCORE: <span className="text-slate-200">{highScore}</span></div>
          <div className="text-[9px] text-slate-500 mt-1 font-sans font-medium uppercase tracking-wider">
            Explore and Collect Tech Badges!
          </div>
        </div>
        
        {servicesConnected.length > 0 && (
          <div className="flex flex-wrap max-w-[200px] md:max-w-xs gap-1 mt-1 font-sans">
            {servicesConnected.slice(-5).map((label, idx) => (
              <span key={idx} className="px-1.5 py-0.5 bg-[#10B981]/20 text-[#10B981] border border-[#10B981]/30 rounded text-[8px] font-bold shadow-sm">
                {label}
              </span>
            ))}
            {servicesConnected.length > 5 && (
              <span className="text-[#10B981] font-bold text-[10px] my-auto">+{servicesConnected.length - 5}</span>
            )}
          </div>
        )}
      </div>

      {/* Control Instruction Card on Top-Center */}
      <div className="absolute top-20 md:top-24 left-1/2 -translate-x-1/2 font-sans text-[10px] md:text-xs z-10 select-none bg-[#0a0f1d]/80 border border-slate-700/60 backdrop-blur-md px-4 py-2.5 rounded-full shadow-lg text-slate-400 pointer-events-auto flex items-center gap-2">
        <span className="text-[#00f0ff] font-bold uppercase tracking-wider font-mono">Controls:</span>
        <span className="text-slate-200 font-bold font-mono">A/D</span> or <span className="text-slate-200 font-bold font-mono">&larr;/&rarr;</span> to Run
        <span className="text-slate-500">|</span>
        <span className="text-slate-200 font-bold font-mono">Space</span> or <span className="text-slate-200 font-bold font-mono">W</span> to Jump
      </div>

      {/* Symmetrized Close / Reset UI at Top Right */}
      <div className="absolute top-20 md:top-24 right-8 z-10 flex gap-2 pointer-events-auto">
        <button
          onClick={resetGame}
          className="px-3 py-1.5 text-[10px] font-mono font-bold uppercase rounded border border-slate-800 bg-[#0a0f1d]/85 text-slate-400 hover:text-slate-200 hover:bg-slate-900 transition-colors shadow-md cursor-pointer"
        >
          Reset Setup
        </button>
        <button
          onClick={() => setIsGameActive(false)}
          className="p-1 px-2.5 text-slate-400 hover:text-red-400 hover:bg-red-500/10 rounded border border-slate-800 bg-[#0a0f1d]/85 transition-colors shadow-md cursor-pointer flex items-center justify-center"
          title="Exit Game Mode"
        >
          <HiX className="w-4 h-4 mr-1 inline-block" />
          <span>Exit</span>
        </button>
      </div>

      {/* Victory Screen Modal Overlay */}
      {gameState === "victory" && (
        <div className="absolute inset-0 bg-[#070b14]/75 backdrop-blur-sm z-30 flex flex-col items-center justify-center text-center p-6 font-mono pointer-events-auto">
          <div className="max-w-md border border-[#EAB308]/40 p-6 rounded-lg bg-[#0a0f1d] shadow-[0_0_35px_rgba(234,179,8,0.25)]">
            <h2 className="text-[#EAB308] text-lg font-bold tracking-widest mb-2">⚡ PIPELINE DEPLOYED SUCCESSFUL ⚡</h2>
            <p className="text-xs text-slate-400 mb-6 leading-relaxed">
              Wonderful! You successfully climbed your portfolio layers, synthesized all system badges, and reached the production deployment portal at the bottom footer.
            </p>
            <div className="text-xs text-slate-200 mb-5 text-left border border-slate-800 bg-[#070b14]/90 p-3 rounded leading-relaxed">
              <span className="text-[#10B981] font-bold">&gt; STATUS:</span> Architecture compilation resolved.<br />
              <span className="text-[#10B981] font-bold">&gt; STACK CONNECTED:</span> {servicesConnected.join(", ") || "Vanilla nodeJS"}<br />
              <span className="text-[#10B981] font-bold">&gt; FINAL SCORE:</span> <span className="text-[#00f0ff] font-bold">{score}</span>
            </div>
            <div className="flex gap-4 items-center justify-center">
              <button
                onClick={resetGame}
                className="px-4 py-2 border border-slate-700 hover:border-slate-500 text-slate-300 font-bold text-xs uppercase hover:bg-slate-800/40 transition-all cursor-pointer"
              >
                Reset Setup
              </button>
              <button
                onClick={() => setIsGameActive(false)}
                className="px-5 py-2.5 bg-[#EAB308] hover:bg-[#CA8A04] text-slate-950 font-bold text-xs uppercase hover:shadow-[0_0_12px_rgba(234,179,8,0.3)] transition-all cursor-pointer"
              >
                Explore Portfolio
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
