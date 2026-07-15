"use client";

import React, { useEffect, useRef, useState } from "react";
import { useGameMode } from "@/context/GameModeContext";
import { HiX } from "react-icons/hi";
import {
  SiNestjs,
  SiNodedotjs,
  SiRedis,
  SiApachekafka,
  SiDocker,
  SiPostgresql,
  SiMongodb,
  SiMongoose,
  SiGithubactions,
} from "react-icons/si";
import { FaAws, FaTerminal, FaBomb } from "react-icons/fa";
import { TbNetwork } from "react-icons/tb";

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
  icon: string;
  iconKey: string;
  color: string;
  collected: boolean;
  pulseOffset: number;
  type: "skill" | "grenade" | "deploy";
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

// Skill nodes with emoji fallbacks and matching react-icon naming keys
const TECH_NODES: { label: string; icon: string; color: string; iconKey: string }[] = [
  { label: "NestJS",   icon: "🐱", color: "#E0234E", iconKey: "NestJS" },
  { label: "Node.js",  icon: "💚", color: "#68A063", iconKey: "Node.js" },
  { label: "gRPC",     icon: "⚡", color: "#244C5A", iconKey: "gRPC" },
  { label: "Kafka",    icon: "📨", color: "#231F20", iconKey: "Kafka" },
  { label: "Redis",    icon: "🔴", color: "#DC382D", iconKey: "Redis" },
  { label: "Docker",   icon: "🐳", color: "#0db7ed", iconKey: "Docker" },
  { label: "Postgres", icon: "🐘", color: "#336791", iconKey: "Postgres" },
  { label: "MongoDB",  icon: "🍃", color: "#4DB33D", iconKey: "MongoDB" },
  { label: "Mongoose", icon: "🍀", color: "#880000", iconKey: "Mongoose" },
  { label: "CI/CD",    icon: "🔄", color: "#F05133", iconKey: "CI/CD" },
  { label: "AWS",      icon: "☁️",  color: "#FF9900", iconKey: "AWS" },
  { label: "PM2",      icon: "⚙️",  color: "#2B037A", iconKey: "PM2" },
];

const getIconComponent = (key: string) => {
  switch (key) {
    case "NestJS": return SiNestjs;
    case "Node.js": return SiNodedotjs;
    case "gRPC": return TbNetwork;
    case "Kafka": return SiApachekafka;
    case "Redis": return SiRedis;
    case "Docker": return SiDocker;
    case "Postgres": return SiPostgresql;
    case "MongoDB": return SiMongodb;
    case "Mongoose": return SiMongoose;
    case "CI/CD": return SiGithubactions;
    case "AWS": return FaAws;
    case "PM2": return FaTerminal;
    case "grenade": return FaBomb;
    default: return null;
  }
};

export const GameMode: React.FC = () => {
  const { isGameActive, setIsGameActive } = useGameMode();
  
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const requestRef = useRef<number | null>(null);

  // States
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(0);
  const [servicesConnected, setServicesConnected] = useState<string[]>([]);
  const [gameState, setGameState] = useState<"playing" | "victory" | "gameover">("playing");
  const [gameStarted, setGameStarted] = useState(false);
  const [collectedCount, setCollectedCount] = useState(0); // Trigger React re-renders on coin collection

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
  // Camera auto-scroll position — advances independently of player
  const cameraScrollRef = useRef<number>(0);

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

    // Generous, easy platform dimensions — wide and closely spaced
    const platformWidth = 220;
    const verticalGap = 90; // Much closer platforms — easier to jump between

    // 1st platform: always starts at the left edge
    list.push({ x: 40, y: 260, w: platformWidth, h: 8 });

    // Start rendering platforms cascading downwards starting from next level
    let currentY = 260 + verticalGap;
    let index = 0;

    // Snake/zigzag pattern: 5 positions across, left→right, then right→left
    const STEPS = 5; // 5 horizontal positions per direction
    const margin = 40;
    const usableWidth = width - platformWidth - margin * 2;
    const stepSize = usableWidth / (STEPS - 1);

    let goingRight = true;
    // Start at step 1 so 2nd platform is already stepped right from the manually-placed 1st
    let loopStepIndex = 1;

    while (currentY < docHeight - 120) {
      // Compute the x position for this step
      const normalizedStep = goingRight ? loopStepIndex : (STEPS - 1 - loopStepIndex);
      const x = margin + Math.round(stepSize * normalizedStep);

      list.push({ x, y: currentY, w: platformWidth, h: 8 });

      // --- ONE token per platform: 75% skill coin, 25% grenade ---
      // Token floats ABOVE platform so player can walk under; must jump to collect
      const TOKEN_HOVER = 42; // px above platform surface
      const tokenX = x + platformWidth / 2; // centered on platform
      const tokenY = currentY - TOKEN_HOVER;

      if (Math.random() < 0.25) {
        // Grenade
        colls.push({
          x: tokenX,
          y: tokenY,
          label: "GRENADE",
          icon: "💣",
          iconKey: "grenade",
          color: "#ea285a",
          collected: false,
          pulseOffset: Math.random() * 10,
          type: "grenade",
        });
      } else {
        // Skill coin
        const node = TECH_NODES[index % TECH_NODES.length];
        colls.push({
          x: tokenX,
          y: tokenY,
          label: node.label,
          icon: node.icon,
          iconKey: node.iconKey,
          color: node.color,
          collected: false,
          pulseOffset: Math.random() * 10,
          type: "skill",
        });
        index++;
      }

      // Advance step — reset to 1 (not 0) on flip to avoid repeating edge positions
      loopStepIndex++;
      if (loopStepIndex >= STEPS) {
        goingRight = !goingRight;
        loopStepIndex = 1; // skip 0 to prevent duplicate at edge
      }

      currentY += verticalGap;
    }

    // Portal deployment platform — centered at the bottom
    list.push({ x: width / 2 - 120, y: docHeight - 80, w: 240, h: 12 });
    colls.push({
      x: width / 2,
      y: docHeight - 125,
      label: "DEPLOY",
      icon: "⚡",
      iconKey: "deploy",
      color: "#EAB308",
      collected: false,
      pulseOffset: 0,
      type: "deploy",
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
    // Disable smooth scrolling when game is active to allow instant rendering
    const originalScrollBehavior = document.documentElement.style.scrollBehavior;
    document.documentElement.style.scrollBehavior = "auto";
    
    // Also scroll to top on mount
    window.scrollTo({ top: 0, behavior: "instant" } as any);
    cameraScrollRef.current = 0;

    return () => {
      // Restore scroll behavior on exit
      document.documentElement.style.scrollBehavior = originalScrollBehavior;
    };
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

      // Start scrolling on any active control input
      if (["Space", "ArrowUp", "ArrowLeft", "ArrowRight", "KeyW", "KeyA", "KeyD"].includes(e.code)) {
        setGameStarted(true);
      }
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

      // 1. UPDATE PHYSICS — only when playing
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

        // Clamping: only prevent going above the top
        const docHeight = documentHeightRef.current;
        if (player.y < 50) {
          player.y = 50;
          player.vy = 0;
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

        // Check collectibles — token floats ABOVE platform; simple AABB touch
        const collectibles = collectiblesRef.current;
        for (const c of collectibles) {
          if (!c.collected) {
            // Coin radius = 14px. Collect if player bounding box overlaps coin area.
            const coinR = 14;
            const px1 = player.x + 4,   px2 = player.x + player.width - 4;
            const py1 = player.y,        py2 = player.y + player.height;
            const cx1 = c.x - coinR,     cx2 = c.x + coinR;
            const cy1 = c.y - coinR,     cy2 = c.y + coinR;

            if (px2 > cx1 && px1 < cx2 && py2 > cy1 && py1 < cy2) {
              c.collected = true;
              setCollectedCount((prev) => prev + 1);

              if (c.type === "deploy") {
                setGameState("victory");
                playBeep(523.2, 0.1, "square", 0.05);
                setTimeout(() => playBeep(659.3, 0.1, "square", 0.05), 80);
                setTimeout(() => playBeep(784.0, 0.1, "square", 0.05), 160);
                setTimeout(() => playBeep(1046.5, 0.4, "square", 0.08), 240);
                continue;
              }

              if (c.type === "grenade") {
                setGameState("gameover");
                playBeep(80, 0.5, "sawtooth", 0.12);
                for (let i = 0; i < 20; i++) {
                  particlesRef.current.push({
                    x: c.x, y: c.y,
                    vx: (Math.random() - 0.5) * 12,
                    vy: (Math.random() - 0.5) * 12 - 2,
                    color: i % 2 === 0 ? "#ea285a" : "#ff6b00",
                    size: 3 + Math.random() * 5,
                    alpha: 1.0,
                  });
                }
                continue;
              }

              // Skill coin collected
              setScore((prev) => {
                const ns = prev + 100;
                if (ns > highScore) {
                  setHighScore(ns);
                  localStorage.setItem("shazan_game_highscore", ns.toString());
                }
                return ns;
              });
              setServicesConnected((prev) => [...prev, c.label]);
              playBeep(900, 0.04, "sine", 0.03);
              setTimeout(() => playBeep(1400, 0.08, "sine", 0.03), 40);
              for (let i = 0; i < 12; i++) {
                particlesRef.current.push({
                  x: c.x, y: c.y,
                  vx: (Math.random() - 0.5) * 6,
                  vy: (Math.random() - 0.5) * 6 - 1,
                  color: c.color,
                  size: 2 + Math.random() * 3,
                  alpha: 1.0,
                });
              }
            }
          }
        }

        // CAMERA AUTO-SCROLL: only scroll down when game has started
        if (gameStarted) {
          const CAMERA_SPEED = 0.65; // px per frame
          cameraScrollRef.current = Math.min(
            cameraScrollRef.current + CAMERA_SPEED,
            documentHeightRef.current - window.innerHeight + 60
          );
          window.scrollTo(0, cameraScrollRef.current);
        } else {
          window.scrollTo(0, 0);
          cameraScrollRef.current = 0;
        }

        // GAME OVER: player fell below the camera's visible bottom (touched the 'ground')
        const viewportBottom = cameraScrollRef.current + window.innerHeight;
        if (player.y > viewportBottom - 10) {
          setGameState("gameover");
          playBeep(200, 0.3, "sawtooth", 0.06);
          setTimeout(() => playBeep(140, 0.5, "sawtooth", 0.06), 150);
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

      // Sync CSS scroll variable for absolute DOM collectibles rendering
      if (containerRef.current) {
        containerRef.current.style.setProperty("--game-scroll-y", `${scrollY}px`);
      }

      // Draw Platforms
      const platforms = platformsRef.current;
      platforms.forEach((p) => {
        const drawY = p.y - scrollY;
        // Don't draw if outside viewport
        if (drawY + p.h < 0 || drawY > canvas.height) return;

        // Glowing platform line — #ea285a color
        ctx.shadowBlur = 6;
        ctx.shadowColor = "#ea285a";
        ctx.strokeStyle = "rgba(234, 40, 90, 0.85)";
        ctx.lineWidth = 3;
        ctx.beginPath();
        ctx.moveTo(p.x, drawY);
        ctx.lineTo(p.x + p.w, drawY);
        ctx.stroke();

        // Platform dash line
        ctx.shadowBlur = 0;
        ctx.setLineDash([3, 4]);
        ctx.strokeStyle = "rgba(234, 40, 90, 0.35)";
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(p.x, drawY + 4);
        ctx.lineTo(p.x + p.w, drawY + 4);
        ctx.stroke();
        ctx.setLineDash([]);
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
  }, [gameState, highScore, gameStarted]);

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
    cameraScrollRef.current = 0; // Reset camera to top
    setScore(0);
    setServicesConnected([]);
    setGameState("playing");
    setGameStarted(false);
    setCollectedCount(0);
    particlesRef.current = [];
    window.scrollTo({ top: 0, behavior: "instant" } as any);
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
      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes floatSlow {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-5px); }
        }
        .game-float-icon {
          animation: floatSlow 2.2s ease-in-out infinite;
        }
      `}} />

      {/* Viewport canvas overlays */}
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full block pointer-events-none" />

      {/* Absolute-positioned HTML/SVG Collectibles using real react-icons */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden select-none">
        {collectiblesRef.current.map((c, index) => {
          if (c.collected) return null;
          const IconComponent = getIconComponent(c.iconKey);

          return (
            <div
              key={index}
              style={{
                position: "absolute",
                left: `${c.x}px`,
                top: `calc(${c.y}px - var(--game-scroll-y, 0px))`,
                transform: "translate(-50%, -50%)",
                pointerEvents: "auto",
                transition: "opacity 0.2s ease",
              }}
              className="flex flex-col items-center select-none"
            >
              {/* Glowing ring/badge around icon */}
              <div
                className="w-10 h-10 rounded-full flex items-center justify-center border border-2 shadow-lg game-float-icon backdrop-blur-sm"
                style={{
                  borderColor: c.color,
                  boxShadow: `0 0 14px ${c.color}6b`,
                  backgroundColor: `${c.color}22`,
                  animationDelay: `${c.pulseOffset * 0.15}s`,
                }}
              >
                {IconComponent ? (
                  <IconComponent className="text-lg" style={{ color: c.color }} />
                ) : (
                  <span className="text-base">{c.icon}</span>
                )}
              </div>

              {/* Label */}
              <span
                className="text-[8px] font-mono font-bold mt-1 px-1 bg-[#0a0f1d]/90 rounded border border-slate-800 shadow-sm uppercase tracking-wider block"
                style={{
                  color: c.color,
                  textShadow: `0 0 4px ${c.color}a0`,
                }}
              >
                {c.label}
              </span>
            </div>
          );
        })}
      </div>

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

      {/* Start Game screen / Space to start prompt */}
      {!gameStarted && gameState === "playing" && (
        <div className="absolute inset-0 bg-[#070b14]/50 backdrop-blur-xs z-25 flex flex-col items-center justify-center text-center p-6 font-mono pointer-events-auto">
          <div className="max-w-xs border border-[#00f0ff]/30 p-6 rounded-lg bg-[#0a0f1d]/90 shadow-[0_0_30px_rgba(0,240,255,0.15)] animate-pulse">
            <h3 className="text-[#00f0ff] text-sm font-bold tracking-widest mb-3">SYSTEM READY</h3>
            <p className="text-[10px] text-slate-400 mb-5 leading-relaxed">
              Auto-scroll descending pipeline is ready to compile. Collect real-time skill badges and avoid grenades.
            </p>
            <button
              onClick={() => setGameStarted(true)}
              className="w-full py-2 bg-[#00f0ff] hover:bg-[#00d0df] text-[#0a0f1d] font-bold text-xs uppercase transition-all shadow-[0_0_10px_rgba(0,240,255,0.2)] hover:shadow-[0_0_15px_rgba(0,240,255,0.4)] cursor-pointer"
            >
              START COMPILING
            </button>
            <div className="text-[8px] text-slate-500 mt-2 font-mono">
              (OR PRESS SPACE/ARROW TO START)
            </div>
          </div>
        </div>
      )}

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

      {/* Game Over Screen Modal */}
      {gameState === "gameover" && (
        <div className="absolute inset-0 bg-[#070b14]/80 backdrop-blur-sm z-30 flex flex-col items-center justify-center text-center p-6 font-mono pointer-events-auto">
          <div className="max-w-md border border-[#ea285a]/40 p-6 rounded-lg bg-[#0a0f1d] shadow-[0_0_35px_rgba(234,40,90,0.25)]">
            <h2 className="text-[#ea285a] text-lg font-bold tracking-widest mb-2">💀 PROCESS TERMINATED</h2>
            <p className="text-xs text-slate-400 mb-4 leading-relaxed">
              The service crashed. Your <span className="text-[#00f0ff] font-bold">&lt;/&gt;</span> container either hit a <span className="text-[#ea285a] font-bold">💣 grenade</span> or fell off the platform grid.
            </p>
            <div className="text-xs text-slate-500 mb-6 text-left border border-slate-800 bg-[#070b14]/90 p-3 rounded leading-relaxed">
              <span className="text-[#ea285a] font-bold">&gt; AVOID:</span> 💣 grenades on platforms — they kill instantly.<br />
              <span className="text-[#ea285a] font-bold">&gt; SCORE LOGGED:</span> <span className="text-slate-200 font-bold">{score}</span><br />
              <span className="text-slate-600 font-bold">&gt; RESTART TO REDEPLOY...</span>
            </div>
            <div className="flex gap-4 items-center justify-center">
              <button
                onClick={() => setIsGameActive(false)}
                className="px-4 py-2 border border-slate-700 hover:border-[#ea285a]/50 text-slate-300 font-bold text-xs uppercase hover:bg-[#ea285a]/5 transition-all cursor-pointer"
              >
                Exit
              </button>
              <button
                onClick={resetGame}
                className="px-5 py-2.5 bg-[#ea285a] hover:bg-[#c41e48] text-white font-bold text-xs uppercase shadow-[0_0_12px_rgba(234,40,90,0.3)] hover:shadow-[0_0_20px_rgba(234,40,90,0.5)] transition-all cursor-pointer"
              >
                ↺ Restart
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
