import {
  SiTypescript, SiGo, SiJavascript, SiPython, SiCplusplus, SiC,
  SiNodedotjs, SiExpress, SiNestjs, SiPostgresql, SiMongodb, SiMysql,
  SiPrisma, SiRedis, SiApachekafka, SiRabbitmq, SiSocketdotio, SiGraphql,
  SiJsonwebtokens, SiDocker, SiGithubactions,
  SiNginx, SiVercel, SiRender, SiReact, SiNextdotjs, SiTailwindcss,
  SiRedux, SiMui, SiShadcnui, SiStripe,
  SiFirebase, SiPostman, SiFigma, SiSwagger, SiCloudinary, SiMongoose,
} from "react-icons/si";
import {
  FaGithub, FaLinkedin, FaTwitter, FaEnvelope, FaAws,
  FaUsers, FaComments, FaHandshake, FaClock, FaCode, FaLayerGroup, FaCheckCircle,
  FaFacebook, FaInstagram, FaLinux, FaTerminal, FaCreditCard,
} from "react-icons/fa";
import { TbNetwork } from "react-icons/tb";
import { PortfolioData } from "@/types/portfolio";

export const portfolioData: PortfolioData = {
  name: "Shariyer Shazan",
  role: "Backend Engineer (Node.js, NestJS, Microservices)",
  roles: [
    "distributed systems",
    "microservice architecture",
    "event-driven systems",
    "backend infrastructure",
    "high-performance APIs",
  ],
  location: "Tejgaon, Dhaka, Bangladesh",
  resumeLink:
    "https://drive.google.com/file/d/1vq9T0M7qWBFi7xLagAcx9nojvnApvJyQ/view?usp=sharing",
  careerObjective:
    "I am a Backend Engineer focused on building production-ready backend systems and distributed architectures. I enjoy developing scalable services using NestJS, Node.js, gRPC, Kafka, PostgreSQL, MongoDB, Redis, and Docker. Through projects like Waave, I have designed microservice architectures, asynchronous event-driven workflows, and high-performance APIs with a strong focus on reliability, maintainability, and developer experience.",
  languages: [
    "English (Fluent)",
    "Bangla (Native)",
    "Hindi (Conversational)",
    "Urdu (Conversational)",
  ],
  about:
    "I am a Backend Engineer focused on designing production-minded server architectures. I enjoy building scalable backend systems using NestJS, Node.js, gRPC, Kafka, PostgreSQL, MongoDB, Redis, and Docker. Through projects like Waave, I've designed microservice architectures, asynchronous event-driven workflows, and performant APIs with a strong focus on reliability, maintainability, and developer experience.",
  education: [
    {
      school: "Southeast University",
      degree: "B.Sc. in Computer Science and Engineering",
      period: "2025 – Present",
      location: "Dhaka, Bangladesh",
    },
    {
      school: "BAF Shaheen College",
      degree: "Higher Secondary Certificate (HSC)",
      period: "2022 – 2024",
      location: "Dhaka, Bangladesh",
    },
  ],
  experience: [
    {
      company: "Betopia",
      role: "Full Stack Developer (Backend-Focused)",
      period: "AUG 2025 – PRESENT",
      location: "Dhaka, Bangladesh",
      description: [
        "Engineered the backend for a health & weight-management platform covering 5+ body metrics, subscription-gated provider access, and secure payment processing.",
        "Delivered an AI meal-recommendation engine (3 input modes: text, voice, image) generating 3 daily targets — calorie, protein, water — plus a provider marketplace and admin panel driving 2 revenue streams.",
        "Shipped 3 production full-stack applications (Node.js, NestJS, PostgreSQL, MongoDB) with Socket.IO and Stripe, and streamlined CI/CD (Docker + GitHub Actions) on AWS across all projects.",
      ],
      tech: [
        "NestJS",
        "Node.js",
        "TypeScript",
        "PostgreSQL",
        "MongoDB",
        "Prisma",
        "Mongoose",
        "Redis",
        "Kafka",
        "gRPC",
        "Socket.IO",
        "Stripe",
        "Docker",
        "AWS",
        "GitHub Actions",
      ],
    },
  ],
  techStack: [
    {
      title: "Backend & Databases",
      items: [
        { name: "NestJS", icon: SiNestjs, color: "#E0234E" },
        { name: "Node.js", icon: SiNodedotjs, color: "#339933" },
        { name: "Express.js", icon: SiExpress, color: "#FFFFFF" },
        { name: "Kafka", icon: SiApachekafka, color: "#FFFFFF" },
        { name: "gRPC", icon: TbNetwork, color: "#244c5a" },
        { name: "Redis", icon: SiRedis, color: "#DC382D" },
        { name: "Socket.IO", icon: SiSocketdotio, color: "#FFFFFF" },
        { name: "PostgreSQL", icon: SiPostgresql, color: "#4169E1" },
        { name: "Prisma", icon: SiPrisma, color: "#2D3748" },
        { name: "MongoDB", icon: SiMongodb, color: "#47A248" },
        { name: "Mongoose", icon: SiMongoose, color: "#880000" },
        { name: "MySQL", icon: SiMysql, color: "#4479A1" },
        { name: "GraphQL", icon: SiGraphql, color: "#E10098" },
        { name: "Swagger", icon: SiSwagger, color: "#85EA2D" },
        { name: "JWT", icon: SiJsonwebtokens, color: "#FFFFFF" },
        { name: "Firebase", icon: SiFirebase, color: "#FFCA28" },
      ],
    },
    {
      title: "Architecture & Messaging",
      items: [
        { name: "Microservices", icon: SiDocker, color: "#FF6B00" },
        { name: "Kafka", icon: SiApachekafka, color: "#FFFFFF" },
        { name: "gRPC", icon: TbNetwork, color: "#244c5a" },
        { name: "RabbitMQ", icon: SiRabbitmq, color: "#FF6600" },
      ],
    },
    {
      title: "Core Languages",
      items: [
        { name: "TypeScript", icon: SiTypescript, color: "#3178C6" },
        { name: "JavaScript", icon: SiJavascript, color: "#F7DF1E" },
        { name: "Go", icon: SiGo, color: "#00ADD8" },
        { name: "Python", icon: SiPython, color: "#3776AB" },
        { name: "C", icon: SiC, color: "#00599C" },
        { name: "C++", icon: SiCplusplus, color: "#00599C" },
      ],
    },
    {
      title: "DevOps & Cloud",
      items: [
        { name: "Docker", icon: SiDocker, color: "#2496ED" },
        { name: "AWS", icon: FaAws, color: "#FF9900" },
        { name: "Linux", icon: FaLinux, color: "#FCC624" },
        { name: "Shell Scripting", icon: FaTerminal, color: "#FFFFFF" },
        { name: "GitHub Actions", icon: SiGithubactions, color: "#2088FF" },
        { name: "Nginx", icon: SiNginx, color: "#009639" },
        { name: "Vercel", icon: SiVercel, color: "#FFFFFF" },
        { name: "Render", icon: SiRender, color: "#0466C8" },
      ],
    },
    {
      title: "Frontend",
      items: [
        { name: "React", icon: SiReact, color: "#61DAFB" },
        { name: "Next.js", icon: SiNextdotjs, color: "#FFFFFF" },
        { name: "Redux", icon: SiRedux, color: "#764ABC" },
        { name: "TailwindCSS", icon: SiTailwindcss, color: "#06B6D4" },
        { name: "ShadcnUI", icon: SiShadcnui, color: "#FFFFFF" },
        { name: "Material UI", icon: SiMui, color: "#007FFF" },
        { name: "DaisyUI", icon: FaLayerGroup, color: "#00B4A2" },
        { name: "Zod", icon: FaCheckCircle, color: "#FFFFFF" },
      ],
    },
    {
      title: "Payment Systems",
      items: [
        { name: "Stripe", icon: SiStripe, color: "#635BFF" },
        { name: "SSLCommerz", icon: FaCreditCard, color: "#005C9E" },
        { name: "Cloudinary", icon: SiCloudinary, color: "#3448C5" },
      ],
    },
    {
      title: "Tools & Platforms",
      items: [
        { name: "Git", icon: FaGithub, color: "#F05032" },
        { name: "Postman", icon: SiPostman, color: "#FF6C37" },
        { name: "VS Code", icon: FaCode, color: "#007ACC" },
        { name: "Figma", icon: SiFigma, color: "#F24E1E" },
      ],
    },
    {
      title: "Interpersonal Skills",
      items: [
        { name: "Leadership", icon: FaUsers, color: "#007BFF" },
        { name: "Communication", icon: FaComments, color: "#FF5722" },
        { name: "Teamwork", icon: FaHandshake, color: "#9C27B0" },
        { name: "Time Management", icon: FaClock, color: "#4CAF50" },
      ],
    },
  ],
  projects: [
    {
      title: "Waave — Enterprise Microservices Social Platform",
      description:
        "Engineered a high-performance, event-driven social platform using a NestJS monorepo. Built synchronous service communication using gRPC (libs/proto-schema contracts) and decoupled asynchronous domain events (OTP verification, signup setups, follows, post engagement) via Apache Kafka. Provisioned independent database layers with Redis caching, PostgreSQL/Prisma, and MongoDB/Mongoose.",
      highlights: [
        "Distributed Services: API Gateway, Auth, User Profile, Media Processing, Notification, Post Lifecycle, and Feed Assembly services.",
        "Event-Driven Workflows: Decoupled domain interactions using Kafka event orchestration (e.g. user.registered triggers automatic profile creation and notification dispatch).",
        "High-Performance Feed System: Feed-service utilizes Redis-backed timeline caches with celebrity-buffered read paths and trending score calculations.",
        "Media Processing Pipeline: Async image processing (variants generated via sharp) with local storage adapters and Mongo metadata indexes.",
        "Upcoming Architectures: Chat Service (real-time WebSockets/Socket.IO and bilateral logging) and Marketplace Service (transaction processing and custom buyer/seller dashboards)."
      ],
      backendLink: "https://github.com/shariyerShazan/Waave-SocialMedia-Backend-Microservices",
      swaggerLink: "https://github.com/shariyerShazan/Waave-SocialMedia-Backend-Microservices", // Show Swagger button
      tags: [
        "NestJS",
        "Apache Kafka",
        "gRPC",
        "PostgreSQL",
        "MongoDB",
        "Redis",
        "Prisma",
        "Mongoose",
        "Docker",
      ],
    },
    {
      title: "AI-Powered Health & Weight Management",
      description:
        "Established user profiles based on 5+ health metrics with subscription-tiered access to certified providers. Created an AI meal-recognition engine accepting text, voice, and image input to auto-generate 3 daily nutrition targets.",
      highlights: [
        "5+ health metrics: weight, height, age, body type, activity level",
        "AI meal-recognition engine: text, voice, and image input modes",
        "3 daily nutrition targets: calorie, protein, and water intake",
        "Admin dashboard overseeing 2 revenue channels: client subscriptions and provider commissions",
      ],
      tags: [
        "NestJS",
        "PostgreSQL",
        "Prisma",
        "MongoDB",
        "AI/ML",
        "Stripe",
        "Socket.IO",
      ],
      isConfidential: true,
    },
    {
      title: "Finn — Real-Time Auction & Classified Ads Marketplace",
      description:
        "A premium, NestJS-based monolithic auction and classified marketplace platform. Built with a full-featured bidding system, real-time messaging, map-based geospatial ad search, and Stripe Connect integration for automated platform fee splitting.",
      highlights: [
        "Dual Purchase Option: Support for immediate Fixed Price checkouts and live, time-based auctions and bidding.",
        "Real-Time Chat Engine: Bidirectional user-to-user Socket.io messaging with active presence, image sharing, and block lists.",
        "Stripe Connect Payments: Automatic 10% platform commission fee deduction and direct merchant split payout onboarding.",
        "Geospatial Cataloging: Map-based search queries leveraging Leaflet locations plotting to discover neighborhood listings.",
        "Secure JWT & OTP Auth: Multi-tier authorization (User, Seller, Admin) backed by SMTP email validation OTP checks.",
      ],
      frontendLink: "https://github.com/shariyerShazan/Finn-Frontend-Reactjs-Marketplaces",
      backendLink: "https://github.com/shariyerShazan/Finn-Nestjs-Marketplace-Backend",
      liveLink: "https://shazan-ad-marketplace-project.onrender.com",
      swaggerLink: "https://shazan-ad-marketplace-project.onrender.com/docs",
      tags: [
        "NestJS",
        "PostgreSQL",
        "Prisma ORM",
        "Socket.IO",
        "Stripe Connect",
        "Cloudinary API",
        "React",
        "Redux Toolkit",
        "TypeScript",
        "Tailwind CSS",
      ],
    },
  ],
  certificates: [],
  socials: [
    {
      name: "LinkedIn",
      href: "https://www.linkedin.com/in/shariyerShazan",
      icon: FaLinkedin,
    },
    {
      name: "GitHub",
      href: "https://github.com/shariyerShazan",
      icon: FaGithub,
    },
    {
      name: "Email",
      href: "mailto:shariyershazan1@gmail.com",
      icon: FaEnvelope,
    },
    { name: "Twitter", href: "https://x.com/SJan_1293", icon: FaTwitter },
    {
      name: "Facebook",
      href: "https://www.facebook.com/darling.shazan",
      icon: FaFacebook,
    },
    {
      name: "Instagram",
      href: "https://www.instagram.com/shariyer.shazan/",
      icon: FaInstagram,
    },
  ],
};
