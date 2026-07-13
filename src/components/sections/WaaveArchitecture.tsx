/* eslint-disable react-hooks/set-state-in-effect */
"use client";

import React, { useState, useEffect, useRef } from "react";
import { SiPostgresql, SiMongodb, SiRedis, SiApachekafka } from "react-icons/si";
import {
  FiCpu,
  FiKey,
  FiUser,
  FiImage,
  FiBell,
  FiEdit3,
  FiRss,
  FiMessageSquare,
  FiShoppingBag,
  FiTerminal,
  FiServer,
  FiInfo,
  FiChevronRight,
} from "react-icons/fi";

interface ServiceNode {
  id: string;
  name: string;
  icon: React.ComponentType<{ className?: string }>;
  type: "gateway" | "service" | "infra" | "client" | "upcoming";
  port?: string;
  langTech: string;
  database?: string;
  responsibilities: string[];
  kafkaTopics?: {
    emitted?: string[];
    consumed?: string[];
  };
  dirPath: string;
  activeColor: string;
}

interface FlowStep {
  log: string;
  activeNodes: string[];
}

interface RequestFlow {
  id: string;
  name: string;
  description: string;
  steps: FlowStep[];
}

const SERVICES_DATA: ServiceNode[] = [
  {
    id: "client",
    name: "Web Client",
    icon: FiUser,
    type: "client",
    langTech: "Next.js 15 / Tailwind CSS",
    responsibilities: [
      "Translates UI/UX interactions into network REST requests",
      "Maintains client state, session structures & JWT token storage",
      "Establishes real-time communication via WebSockets client wrappers",
    ],
    dirPath: "src/app",
    activeColor: "border-emerald-500 text-emerald-400 bg-emerald-500/10 shadow-[0_0_15px_rgba(16,185,129,0.3)]",
  },
  {
    id: "gateway",
    name: "API Gateway",
    icon: FiCpu,
    type: "gateway",
    port: "Port 4000 (HTTP/REST)",
    langTech: "NestJS / TypeScript",
    responsibilities: [
      "Serves as the public-facing entrypoint for all clients and applications",
      "Checks APIs authentication and parses credentials using centralized JWT guards",
      "Performs rate limiting and request checking via in-memory Redis keys",
      "Proxies internal communications synchronously to target layers over gRPC",
    ],
    dirPath: "apps/api-gateway",
    activeColor: "border-cyan-500 text-cyan-400 bg-cyan-500/10 shadow-[0_0_15px_rgba(6,182,212,0.3)]",
  },
  {
    id: "auth-service",
    name: "Auth Service",
    icon: FiKey,
    type: "service",
    port: "gRPC 3001 | HTTP 4001",
    langTech: "NestJS / Prisma ORM",
    database: "PostgreSQL (Credentials)",
    responsibilities: [
      "Identity provider managing sign-ups, credential logs & token issuances",
      "Encrypts user passwords using strong bcrypt salt hashes",
      "Registers and validates registration email OTPs within Redis store limits",
      "Emits events to Kafka broker on account creations or sign-ins",
    ],
    kafkaTopics: {
      emitted: [
        "user.registered",
        "user.send-registration-otp",
        "user.login",
        "user.forgot-pass-request",
      ],
    },
    dirPath: "apps/auth-service",
    activeColor: "border-violet-500 text-violet-400 bg-violet-500/10 shadow-[0_0_15px_rgba(139,92,246,0.3)]",
  },
  {
    id: "user-service",
    name: "User Service",
    icon: FiUser,
    type: "service",
    port: "gRPC 3002 | HTTP 4002",
    langTech: "NestJS / Prisma ORM",
    database: "PostgreSQL (Profiles & Graph)",
    responsibilities: [
      "Manages biographic info, links, and avatar/cover file attachments",
      "Handles follower-following indexes and relational graphs",
      "Consumes user registration signals from Kafka to automatically seed profiles",
      "Tracks online activity markers and presence listings in Redis",
    ],
    kafkaTopics: {
      emitted: ["user.profile-updated", "user.profile-followed", "user.profile-unfollowed"],
      consumed: ["user.registered"],
    },
    dirPath: "apps/user-service",
    activeColor: "border-indigo-500 text-indigo-400 bg-indigo-500/10 shadow-[0_0_15px_rgba(99,102,241,0.3)]",
  },
  {
    id: "media-service",
    name: "Media Service",
    icon: FiImage,
    type: "service",
    port: "gRPC 3009 | HTTP 4009",
    langTech: "NestJS / Mongoose ODM",
    database: "MongoDB (Media Metadata)",
    responsibilities: [
      "Processes file updates and binds storage properties on disk",
      "Triggers Sharp resizing pipelines for thumbnail/medium variants",
      "Manages folders: storage/avatars, storage/covers, storage/images, storage/videos",
    ],
    dirPath: "apps/media-service",
    activeColor: "border-amber-500 text-amber-400 bg-amber-500/10 shadow-[0_0_15px_rgba(245,158,11,0.3)]",
  },
  {
    id: "post-service",
    name: "Post Service",
    icon: FiEdit3,
    type: "service",
    port: "gRPC 3003 | HTTP 4003",
    langTech: "NestJS / Prisma ORM",
    database: "PostgreSQL (Posts & Cycles)",
    responsibilities: [
      "Governs posts, drafts, soft-deletions, edit histories, and scheduling",
      "Binds uploaded media metadata references and tracks asset integrity",
      "Uses scheduler crons & tasks queues to auto-publish scheduled items",
      "Emits events to Kafka broker when posts are successfully created",
    ],
    kafkaTopics: {
      emitted: ["post.created", "post.updated", "post.published"],
    },
    dirPath: "apps/post-service",
    activeColor: "border-pink-500 text-pink-400 bg-pink-500/10 shadow-[0_0_15px_rgba(236,72,153,0.3)]",
  },
  {
    id: "feed-service",
    name: "Feed Service",
    icon: FiRss,
    type: "service",
    port: "gRPC 3004 | HTTP 4004",
    langTech: "NestJS / gRPC / Redis",
    database: "Redis Cache (Timeline Indexes)",
    responsibilities: [
      "Generates personalized user home feeds and global explore indices",
      "Updates active timeline timelines caches inside Redis keys",
      "Protects updates performance via celebrity-buffered timeline buffers",
    ],
    kafkaTopics: {
      consumed: [
        "post.created",
        "post.deleted",
        "post.liked",
        "post.commented",
        "post.shared",
        "user.profile-followed",
        "user.profile-unfollowed",
      ],
    },
    dirPath: "apps/feed-service",
    activeColor: "border-emerald-500 text-emerald-400 bg-emerald-500/10 shadow-[0_0_15px_rgba(16,185,129,0.3)]",
  },
  {
    id: "notification-service",
    name: "Notification Service",
    icon: FiBell,
    type: "service",
    port: "gRPC 3010 | HTTP 4010",
    langTech: "NestJS / Socket.IO",
    database: "MongoDB / Redis PubSub",
    responsibilities: [
      "Subscribes to Kafka event streams to broadcast transactional client notifications.",
      "Maintains direct real-time persistent connections to client nodes via Socket.IO WebSocket protocols.",
      "Scales dynamic alerts distribution horizontally across pods using Redis Pub/Sub brokers.",
      "Saves message histories and dispatch logs in MongoDB replica sets and sends SMTP emails.",
    ],
    kafkaTopics: {
      consumed: ["user.send-registration-otp", "user.forgot-pass-request", "user.profile-followed", "post.created"],
    },
    dirPath: "apps/notification",
    activeColor: "border-sky-500 text-sky-400 bg-sky-500/10 shadow-[0_0_15px_rgba(14,165,233,0.3)]",
  },
  {
    id: "chat-service",
    name: "Chat Service",
    icon: FiMessageSquare,
    type: "upcoming",
    port: "gRPC 3005",
    langTech: "NestJS / WebSockets",
    database: "MongoDB (Bilateral Dialogues)",
    responsibilities: [
      "Handles live chat messaging using Socket.IO server modules",
      "Aggregates conversation logs, unread notification counts, and status indicators",
    ],
    dirPath: "apps/chat-service",
    activeColor: "border-slate-700 text-slate-500 bg-slate-800/10 border-dashed",
  },
  {
    id: "marketplace",
    name: "Marketplace",
    icon: FiShoppingBag,
    type: "upcoming",
    port: "gRPC 3006",
    langTech: "NestJS / Stripe API",
    database: "PostgreSQL (Trades / Listings)",
    responsibilities: [
      "Supports classified lists, listings indexes, pricing, and transactions security",
      "Coordinates checkouts and processes payment confirmations via Stripe SDK",
    ],
    dirPath: "apps/marketplace-service",
    activeColor: "border-slate-700 text-slate-500 bg-slate-800/10 border-dashed",
  },
  {
    id: "kafka",
    name: "Apache Kafka Broker",
    icon: SiApachekafka,
    type: "infra",
    langTech: "Event Bus (Durable Logs)",
    responsibilities: [
      "The decoupled asynchronous event nervous system of the platform running CP-Kafka 7.6.",
      "Arranges message partitions inside topics (e.g. user.*, post.*) with KRaft consensus.",
      "Integrates with provectuslabs/kafka-ui dashboard container to monitor queue and topic metadata.",
    ],
    dirPath: "docker-compose.yaml",
    activeColor: "border-orange-500 text-orange-400 bg-orange-500/10 shadow-[0_0_15px_rgba(249,115,22,0.3)]",
  },
  {
    id: "redis",
    name: "Redis Cache Clusters",
    icon: SiRedis,
    type: "infra",
    langTech: "7 Isolated Redis Nodes",
    responsibilities: [
      "Runs 7 separate Redis containers supporting independent service bounds (Gateway, Auth, User, Media, Notification, Post, Feed) preventing caching locks contamination.",
      "Saves active followers timeline indices with allkeys-lru memory policies.",
      "Manages rate limits check counters and email registration OTP codes (with volatile-ttl).",
    ],
    dirPath: "docker-compose.yaml",
    activeColor: "border-red-500 text-red-400 bg-red-500/10 shadow-[0_0_15px_rgba(239,68,68,0.3)]",
  },
  {
    id: "postgres",
    name: "PostgreSQL Database",
    icon: SiPostgresql,
    type: "infra",
    langTech: "Replicated SQL Clusters",
    responsibilities: [
      "Runs primary-replica replication groups across Auth database (ports 5432 / 5442), User database (ports 5433 / 5443), and Post database (ports 5434 / 5444).",
      "Performs pg_basebackup streaming replicas clone syncing WAL logs from primary hosts.",
      "Includes WAL level replica replication slots and hot-standby nodes read configurations.",
    ],
    dirPath: "docker-compose.yaml",
    activeColor: "border-blue-500 text-blue-400 bg-blue-500/10 shadow-[0_0_15px_rgba(59,130,246,0.3)]",
  },
  {
    id: "mongodb",
    name: "MongoDB Database",
    icon: SiMongodb,
    type: "infra",
    langTech: "NoSQL Replica Sets",
    responsibilities: [
      "Deploys 3-member MongoDB Replica Sets for Media (media-rs) and Notification (notification-rs) databases to prevent data loss.",
      "Stores unstructured media item records, format sizes, and transactional emails trace indexes.",
      "Orchestrates dynamic replica set elections via replica-init entrypoint containers.",
    ],
    dirPath: "docker-compose.yaml",
    activeColor: "border-emerald-600 text-emerald-500 bg-emerald-600/10 shadow-[0_0_15px_rgba(16,185,129,0.3)]",
  },
];

const REQUEST_FLOWS: RequestFlow[] = [
  {
    id: "register",
    name: "User Signup & Verification",
    description: "REST Request -> Gateway Auth Check -> gRPC auth password hash -> PostgreSQL Insert -> Redis OTP store -> Kafka publish -> user profile seed & notification SMTP dispatch.",
    steps: [
      {
        log: "Client issues signup request: POST http://localhost:4000/auth/register",
        activeNodes: ["client", "gateway"],
      },
      {
        log: "Gateway checks rate-limiting counters in Redis, parses JWT payload structure, and forwards to Auth Service via gRPC.",
        activeNodes: ["gateway", "redis", "auth-service"],
      },
      {
        log: "Auth Service encrypts password values using bcrypt, registers credentials inside PostgreSQL, and generates verification OTP.",
        activeNodes: ["auth-service", "postgres"],
      },
      {
        log: "Auth Service caches registration OTP codes inside Redis, and publishes registration signals on Kafka event broker (topics: user.registered and user.send-registration-otp).",
        activeNodes: ["auth-service", "redis", "kafka"],
      },
      {
        log: "User Service consumes 'user.registered' to write profiles to Postgres. Notification Service consumes 'user.send-registration-otp' to send transaction verification emails via SMTP.",
        activeNodes: ["user-service", "notification-service", "postgres", "kafka"],
      },
      {
        log: "Verification OTP successfully dispatched to client inbox email client. Registration process completes.",
        activeNodes: ["client"],
      },
    ],
  },
  {
    id: "publish",
    name: "Post Publishing & Feed-update",
    description: "Submit post content -> link assets via gRPC -> commit relational record -> publish Kafka signal -> Feed Timeline aggregation & Redis cache invalidation.",
    steps: [
      {
        log: "Client submits post content with processed media attachments links: POST http://localhost:4000/posts",
        activeNodes: ["client", "gateway"],
      },
      {
        log: "Gateway client submits gRPC call to Post Service to write post properties, and enriches media details from Media Service.",
        activeNodes: ["gateway", "post-service", "media-service"],
      },
      {
        log: "Post Service resolves media owners validation, saves post structure inside PostgreSQL database, and publishes 'post.created' on Kafka.",
        activeNodes: ["post-service", "postgres", "kafka"],
      },
      {
        log: "Feed Service consumes 'post.created' from Kafka event bus, computes trending metrics, and invalidates active followers timeline page cache listings in Redis.",
        activeNodes: ["feed-service", "kafka", "redis"],
      },
      {
        log: "Feed Service pulls followers profile graphs from User Service via gRPC, compile timeline arrays, and writes caches to Redis.",
        activeNodes: ["feed-service", "user-service", "redis"],
      },
      {
        log: "Timeline feeds rebuilt. Redis cache invalidated. Client explore feeds refreshed with published post details.",
        activeNodes: ["client"],
      },
    ],
  },
  {
    id: "media",
    name: "Media Ingestion & Processing",
    description: "Request upload URL -> gRPC insert -> save pending state -> upload file -> trigger Sharp resize variants -> write MongoDB -> cache Redis.",
    steps: [
      {
        log: "Client requests unique upload credentials from Gateway: GET http://localhost:4000/media/upload-url",
        activeNodes: ["client", "gateway"],
      },
      {
        log: "Gateway calls Media Service over gRPC. Media Service writes pending asset entry to MongoDB and yields upload directories details.",
        activeNodes: ["gateway", "media-service", "mongodb"],
      },
      {
        log: "Client uploads source image file payload. Media Service moves upload streams and runs sharp variant image conversion process on storage/temp/.",
        activeNodes: ["client", "media-service"],
      },
      {
        log: "Media Service completes resizing original file to thumbnail/medium copies, updates MongoDB state to 'DONE', and updates Redis cache.",
        activeNodes: ["media-service", "mongodb", "redis", "user-service"],
      },
      {
        log: "Media records fully processed. File paths mapped and metadata verified for user feeds presentation usage.",
        activeNodes: ["client"],
      },
    ],
  },
];

export const WaaveArchitecture = () => {
  const [selectedNodeId, setSelectedNodeId] = useState<string>("gateway");
  const [activeSimulationId, setActiveSimulationId] = useState<string | null>(null);
  const [currentStepIndex, setCurrentStepIndex] = useState<number>(-1);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [consoleLogs, setConsoleLogs] = useState<string[]>([
    "=== SYSTEM VERIFICATION IN PROGRESS ===",
    "[SYSTEM] Architecture modules status: READY",
    "[SYSTEM] Select any service node below to explore its environment properties,",
    "[SYSTEM] Or choose a request simulation to examine the internal data pipeline.",
  ]);

  const terminalEndRef = useRef<HTMLDivElement>(null);
  const selectedNode = SERVICES_DATA.find((n) => n.id === selectedNodeId) || SERVICES_DATA[1];

  useEffect(() => {
    if (terminalEndRef.current) {
      terminalEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [consoleLogs]);

  useEffect(() => {
    if (!isPlaying || activeSimulationId === null) return;

    const flow = REQUEST_FLOWS.find((f) => f.id === activeSimulationId);
    if (!flow) {
      setIsPlaying(false);
      return;
    }

    if (currentStepIndex < flow.steps.length - 1) {
      const nextIndex = currentStepIndex + 1;
      const timer = setTimeout(() => {
        setCurrentStepIndex(nextIndex);
        const step = flow.steps[nextIndex];
        const timestamp = new Date().toLocaleTimeString();
        setConsoleLogs((prev) => [
          ...prev,
          `[${timestamp}] [STEP ${nextIndex + 1}/${flow.steps.length}] ${step.log}`,
        ]);
        
        if (step.activeNodes.length > 0) {
          const mainNode = step.activeNodes[0];
          if (mainNode !== "client") {
            setSelectedNodeId(mainNode);
          }
        }
      }, 2400);

      return () => clearTimeout(timer);
    } else {
      setIsPlaying(false);
      setConsoleLogs((prev) => [
        ...prev,
        `[SYSTEM] Simulation '${flow.name}' complete. Broker and nodes status returned to idle.`,
      ]);
    }
  }, [isPlaying, currentStepIndex, activeSimulationId]);

  const handleStartSimulation = (flowId: string) => {
    const flow = REQUEST_FLOWS.find((f) => f.id === flowId);
    if (!flow) return;

    setActiveSimulationId(flowId);
    setCurrentStepIndex(0);
    setIsPlaying(true);
    setConsoleLogs([
      "============================================================",
      `[SYSTEM] STARTING PIPELINE: ${flow.name.toUpperCase()}`,
      "============================================================",
      `[${new Date().toLocaleTimeString()}] [STEP 1/${flow.steps.length}] ${flow.steps[0].log}`,
    ]);
  };

  const handleStopSimulation = () => {
    setIsPlaying(false);
    setActiveSimulationId(null);
    setCurrentStepIndex(-1);
    setConsoleLogs((prev) => [...prev, "[SYSTEM] Simulation aborted by administrator. Logs flushed."]);
  };

  const getActiveNodesInStep = (): string[] => {
    if (activeSimulationId === null || currentStepIndex === -1) return [];
    const flow = REQUEST_FLOWS.find((f) => f.id === activeSimulationId);
    if (!flow || !flow.steps[currentStepIndex]) return [];
    return flow.steps[currentStepIndex].activeNodes;
  };

  const activeNodes = getActiveNodesInStep();
  
  return (
    <div className="w-full bg-[#070b13]/95 border border-[#1e293b] rounded-2xl overflow-hidden shadow-2xl relative text-left">
      <div className="h-[3px] w-full bg-gradient-to-r from-cyan-500 via-indigo-500 to-amber-500 animate-pulse"></div>

      <div className="p-5 md:p-8">
        
        {/* Core Header Row */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="flex h-2 w-2 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#00f0ff] opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#00f0ff]"></span>
              </span>
              <span className="text-[10px] font-mono text-[#00f0ff] uppercase tracking-widest">
                SYSTEM SCHEMATICS
              </span>
            </div>
            <h3 className="text-xl md:text-2xl font-bold text-white font-sans tracking-tight">
              Waave Architecture & Real-Time Flow Explorer
            </h3>
          </div>
          
          <div className="flex items-center gap-4 text-xs">
            <span className="text-slate-400 font-mono">CLUSTER: DOCKER COMPOSE</span>
            <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-emerald-500/10 border border-emerald-500/30 text-emerald-400">
              OPERATIONAL
            </span>
          </div>
        </div>

        {/* Info Box */}
        <div className="mb-6 p-4 bg-[#0a0f1d] border border-slate-800/80 rounded-xl flex items-start gap-3">
          <FiInfo className="text-[#00f0ff] w-5 h-5 flex-shrink-0 mt-0.5" />
          <div className="text-xs md:text-sm text-[#cbd5e1] leading-relaxed font-sans">
            This module models Shariyer&apos;s backend architecture. Click nodes on the <strong>Map</strong> block 
            to inspect ports configurations and internal workspaces, or initialize a <strong>Request Simulator</strong> 
            to watch gRPC & Kafka data streams.
          </div>
        </div>

        {/* Visual Map & Specs Split Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* MAP OVERLAY SECTION */}
          <div className="lg:col-span-8 bg-[#0b101c]/40 rounded-xl p-5 border border-[#1e293b] flex flex-col justify-between">
            <div className="mb-4 flex justify-between items-center border-b border-[#1e293b]/40 pb-2">
              <span className="text-xs font-mono text-[#94a3b8] uppercase tracking-wider">
                Topology Node Grid
              </span>
              <div className="flex items-center gap-4 text-[9px] font-mono text-slate-500">
                <span className="flex items-center gap-1"><span className="w-2 h-2 rounded bg-cyan-400/20 border border-cyan-400"></span> REST</span>
                <span className="flex items-center gap-1"><span className="w-2 h-2 rounded bg-violet-400/20 border border-violet-400"></span> gRPC</span>
                <span className="flex items-center gap-1"><span className="w-2 h-2 rounded bg-orange-400/20 border border-orange-400"></span> Event</span>
              </div>
            </div>

            {/* Structured Nodes List */}
            <div className="space-y-6 py-4">
              
              {/* Row 1: Client -> Ingress */}
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <button
                  onClick={() => setSelectedNodeId("client")}
                  className={`w-full sm:w-44 p-3.5 rounded-xl border flex flex-col items-center gap-1 transition-all duration-300 ${
                    activeNodes.includes("client")
                      ? SERVICES_DATA.find((n) => n.id === "client")?.activeColor
                      : selectedNodeId === "client"
                      ? "border-[#00f0ff] text-white bg-slate-800/20"
                      : "border-slate-800 text-slate-400 bg-slate-900/50 hover:border-slate-700"
                  }`}
                >
                  <FiUser className="text-xl" />
                  <span className="text-xs font-bold font-sans">Web Client</span>
                  <span className="text-[8px] font-mono opacity-50">Next.js UI</span>
                </button>
                
                <FiChevronRight className="hidden sm:block text-slate-600 text-lg" />
                
                <button
                  onClick={() => setSelectedNodeId("gateway")}
                  className={`w-full sm:w-48 p-3.5 rounded-xl border flex flex-col items-center gap-1 transition-all duration-300 relative ${
                    activeNodes.includes("gateway")
                      ? SERVICES_DATA.find((n) => n.id === "gateway")?.activeColor
                      : selectedNodeId === "gateway"
                      ? "border-[#00f0ff] text-white bg-slate-800/20"
                      : "border-slate-800 text-slate-400 bg-slate-900/50 hover:border-slate-700"
                  }`}
                >
                  {activeNodes.includes("gateway") && (
                    <span className="absolute -top-1 -right-1 flex h-2 w-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-500"></span>
                    </span>
                  )}
                  <FiCpu className="text-xl text-cyan-400" />
                  <span className="text-xs font-bold font-sans">API Gateway</span>
                  <span className="text-[8px] font-mono opacity-50">Port 4000 (REST)</span>
                </button>
              </div>

              {/* Row 2: Shared Cache Hub */}
              <div className="flex justify-center border-y border-[#1e293b]/30 py-4 my-2">
                <button
                  onClick={() => setSelectedNodeId("redis")}
                  className={`px-6 py-2.5 rounded-xl border flex items-center gap-3 transition-all duration-300 ${
                    activeNodes.includes("redis")
                      ? SERVICES_DATA.find((n) => n.id === "redis")?.activeColor
                      : selectedNodeId === "redis"
                      ? "border-red-500 text-white bg-slate-800/20"
                      : "border-slate-800 text-slate-400 bg-slate-900/50 hover:border-slate-700"
                  }`}
                >
                  <SiRedis className="text-lg text-red-500" />
                  <div className="text-left font-sans">
                    <div className="text-xs font-bold">Redis Cluster</div>
                    <div className="text-[8px] font-mono opacity-50">Shared caching, TTL rate-limiting & feed storage</div>
                  </div>
                </button>
              </div>

              {/* Row 3: Microservices Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {SERVICES_DATA.filter((n) => n.type === "service" || n.type === "upcoming").map((node) => {
                  const Icon = node.icon;
                  const isActive = activeNodes.includes(node.id);
                  const isSelected = selectedNodeId === node.id;
                  
                  return (
                    <button
                      key={node.id}
                      onClick={() => setSelectedNodeId(node.id)}
                      className={`p-3 rounded-xl border flex flex-col items-start text-left transition-all duration-300 relative ${
                        isActive
                          ? node.activeColor
                          : isSelected
                          ? "border-[#00f0ff] text-white bg-slate-800/20"
                          : "border-slate-800 text-slate-400 bg-slate-900/50 hover:border-slate-700"
                      }`}
                    >
                      {isActive && (
                        <span className="absolute top-2 right-2 flex h-2 w-2">
                          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
                          <span className="relative inline-flex rounded-full h-2 w-2 bg-white"></span>
                        </span>
                      )}
                      <div className="p-2 rounded bg-slate-900/80 mb-2 border border-slate-800/60">
                        <Icon className="text-sm" />
                      </div>
                      <div className="font-sans w-full min-w-0">
                        <div className="text-xs font-bold text-[#cbd5e1] leading-snug flex flex-wrap items-center gap-1.5 w-full">
                          <span className="truncate">{node.name}</span>
                          {node.type === "upcoming" && (
                            <span className="text-[7px] font-mono text-zinc-500 bg-slate-950 px-1 py-0.25 rounded border border-slate-900 flex-shrink-0">
                              PLANNED
                            </span>
                          )}
                        </div>
                        <div className="text-[8.5px] font-mono text-slate-500 mt-1">
                          {node.type === "upcoming" ? "gRPC Service" : node.port?.split(" | ")[0] || "gRPC"}
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>

            </div>

            {/* Layout Footer: Databases & Event Brokers */}
            <div className="mt-6 border-t border-[#1e293b]/40 pt-6">
              <span className="text-[10px] font-mono text-slate-500 uppercase tracking-widest mb-3 block text-center">
                DOCKER COMPOSE ORCHESTRATION LAYER (DATASETS & BROKERS)
              </span>
              
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                <button
                  onClick={() => setSelectedNodeId("kafka")}
                  className={`p-3.5 rounded-xl border flex flex-col items-center gap-1 transition-all duration-300 ${
                    activeNodes.includes("kafka")
                      ? SERVICES_DATA.find((n) => n.id === "kafka")?.activeColor
                      : selectedNodeId === "kafka"
                      ? "border-orange-500 text-white bg-slate-800/20"
                      : "border-slate-800 text-slate-400 bg-slate-900/50 hover:border-slate-700"
                  }`}
                >
                  <SiApachekafka className="text-lg text-orange-500" />
                  <span className="text-xs font-bold font-sans">Kafka Broker</span>
                  <span className="text-[8px] font-mono opacity-50">Async broker</span>
                </button>

                <button
                  onClick={() => setSelectedNodeId("postgres")}
                  className={`p-3.5 rounded-xl border flex flex-col items-center gap-1 transition-all duration-300 ${
                    activeNodes.includes("postgres")
                      ? SERVICES_DATA.find((n) => n.id === "postgres")?.activeColor
                      : selectedNodeId === "postgres"
                      ? "border-blue-500 text-white bg-slate-800/20"
                      : "border-slate-800 text-slate-400 bg-slate-900/50 hover:border-slate-700"
                  }`}
                >
                  <SiPostgresql className="text-lg text-blue-500" />
                  <span className="text-xs font-bold font-sans">PostgreSQL</span>
                  <span className="text-[8px] font-mono opacity-50">ACID SQL</span>
                </button>

                <button
                  onClick={() => setSelectedNodeId("mongodb")}
                  className={`p-3.5 rounded-xl border flex flex-col items-center gap-1 transition-all duration-300 ${
                    activeNodes.includes("mongodb")
                      ? SERVICES_DATA.find((n) => n.id === "mongodb")?.activeColor
                      : selectedNodeId === "mongodb"
                      ? "border-emerald-600 text-white bg-slate-800/20"
                      : "border-slate-800 text-slate-400 bg-slate-900/50 hover:border-slate-700"
                  }`}
                >
                  <SiMongodb className="text-lg text-emerald-500" />
                  <span className="text-xs font-bold font-sans">MongoDB</span>
                  <span className="text-[8px] font-mono opacity-50">NoSQL Store</span>
                </button>

                <div className="p-3 rounded-xl border border-slate-850 bg-[#0f172a]/20 flex flex-col justify-center items-center text-center font-sans">
                  <div className="text-[#00f0ff] text-xs font-bold leading-tight">Shared Libs</div>
                  <div className="text-[8px] font-mono text-slate-500 mt-1 uppercase">libs/common, proto-schema</div>
                </div>
              </div>
            </div>

          </div>

          {/* INSPECTIONS & ACTIONS SIDEBAR */}
          <div className="lg:col-span-4">
            
            {/* NODE SPECS CARD */}
            <div className="bg-[#0b101c]/40 rounded-xl p-5 border border-[#1e293b] h-full flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-2 mb-4 border-b border-[#1e293b]/40 pb-2">
                  <FiServer className="text-[#00f0ff] text-sm" />
                  <h4 className="text-xs font-mono text-[#94a3b8] uppercase tracking-wider">
                    Specifications
                  </h4>
                </div>

                <div className="space-y-4">
                  <div>
                    <h5 className="text-lg font-bold text-white flex items-center gap-2 font-sans tracking-tight">
                      {selectedNode.name}
                    </h5>
                    <span className="text-[10px] font-mono text-slate-500 uppercase tracking-wider">
                      Module: {selectedNode.type}
                    </span>
                  </div>

                  <div className="space-y-2 text-xs font-mono bg-[#05080f] p-3 rounded border border-slate-900/80">
                    {selectedNode.port && (
                      <div className="flex justify-between py-1 border-b border-slate-900">
                        <span className="text-[#94a3b8]">Interface:</span>
                        <span className="text-cyan-400">{selectedNode.port}</span>
                      </div>
                    )}
                    <div className="flex justify-between py-1 border-b border-slate-900">
                      <span className="text-[#94a3b8]">Runtime:</span>
                      <span className="text-white text-right">{selectedNode.langTech}</span>
                    </div>
                    {selectedNode.database && (
                      <div className="flex justify-between py-1 border-b border-slate-900">
                        <span className="text-[#94a3b8]">Backing DB:</span>
                        <span className="text-emerald-400 text-right">{selectedNode.database}</span>
                      </div>
                    )}
                    <div className="flex justify-between py-1">
                      <span className="text-[#94a3b8]">Workspace:</span>
                      <span className="text-zinc-500 font-mono text-[9px] truncate max-w-[120px]" title={selectedNode.dirPath}>
                        {selectedNode.dirPath}
                      </span>
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <span className="text-[10px] font-mono text-[#94a3b8] uppercase tracking-wider block">
                      Responsibilities:
                    </span>
                    <ul className="text-xs text-[#cbd5e1] list-disc list-inside space-y-1.5 leading-relaxed pl-1 max-h-[320px] overflow-y-auto font-sans">
                      {selectedNode.responsibilities.map((resp, i) => (
                        <li key={i}>{resp}</li>
                      ))}
                    </ul>
                  </div>

                  {selectedNode.kafkaTopics && (
                    <div className="space-y-2 pt-2 border-t border-[#1e293b]/40">
                      <span className="text-[10px] font-mono text-[#94a3b8] uppercase tracking-wider block">
                        Broker Channels:
                      </span>
                      {selectedNode.kafkaTopics.emitted && (
                        <div className="flex flex-wrap gap-1 items-center">
                          <span className="text-[9px] font-mono text-[#e879f9] bg-[#e879f9]/10 border border-[#e879f9]/20 px-1.5 py-0.5 rounded">
                            Emits
                          </span>
                          {selectedNode.kafkaTopics.emitted.map((topic) => (
                            <span key={topic} className="text-[8px] font-mono bg-slate-800/80 text-slate-300 px-1.5 py-0.5 rounded">
                              {topic}
                            </span>
                          ))}
                        </div>
                      )}
                      {selectedNode.kafkaTopics.consumed && (
                        <div className="flex flex-wrap gap-1 items-center mt-1">
                          <span className="text-[9px] font-mono text-[#22c55e] bg-[#22c55e]/10 border border-[#22c55e]/20 px-1.5 py-0.5 rounded">
                            Consumed
                          </span>
                          {selectedNode.kafkaTopics.consumed.map((topic) => (
                            <span key={topic} className="text-[8px] font-mono bg-slate-800/80 text-slate-300 px-1.5 py-0.5 rounded">
                              {topic}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  )}

                </div>
              </div>
            </div>

          </div>

        </div>

        {/* TERMINAL CONSOLE */}
        <div className="mt-6 bg-[#040810] border border-[#1e293b] rounded-xl p-4 md:p-5 relative overflow-hidden flex flex-col h-[180px] shadow-inner">
          <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%)] bg-[length:100%_4px] pointer-events-none opacity-30"></div>
          
          <div className="flex justify-between items-center mb-2 border-b border-slate-900 pb-1.5 relative z-10">
            <div className="flex items-center gap-2 text-xs font-mono text-[#00f0ff]">
              <FiTerminal className="animate-pulse" />
              <span>DOCKER_CONTAINER_CONSOLE</span>
            </div>
            <div className="flex gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-red-500/30 border border-red-500/50"></span>
              <span className="w-2.5 h-2.5 rounded-full bg-amber-500/30 border border-amber-500/50"></span>
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/30 border border-emerald-500/50"></span>
            </div>
          </div>

          <div className="flex-grow font-mono text-[11px] leading-relaxed text-[#22c55e] scrollbar-thin overflow-y-auto space-y-1 relative z-10 pr-2">
            {consoleLogs.map((log, i) => {
              const isSystem = log.startsWith("[SYSTEM]") || log.startsWith("==");
              
              return (
                <div key={i} className={isSystem ? "text-[#00f0ff]" : "text-emerald-400"}>
                  {log}
                </div>
              );
            })}
            <div ref={terminalEndRef} />
          </div>
        </div>

      </div>
    </div>
  );
};
