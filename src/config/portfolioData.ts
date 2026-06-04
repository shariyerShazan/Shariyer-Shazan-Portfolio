import {
  SiTypescript, SiGo, SiJavascript, SiPython, SiCplusplus, SiC,
  SiNodedotjs, SiExpress, SiNestjs, SiPostgresql, SiMongodb, SiMysql,
  SiPrisma, SiRedis, SiApachekafka, SiRabbitmq, SiSocketdotio, SiGraphql,
  SiJsonwebtokens, SiDocker, SiGithubactions,
  SiNginx, SiVercel, SiRender, SiReact, SiNextdotjs, SiTailwindcss,
  SiRedux, SiMui, SiShadcnui, SiStripe,
  SiFirebase, SiPostman, SiFigma
} from "react-icons/si";
import { 
  FaGithub, FaLinkedin, FaTwitter, FaEnvelope, FaAws, 
  FaUsers, FaComments, FaHandshake, FaClock, FaCode, FaLayerGroup, FaCheckCircle
} from "react-icons/fa";
import { PortfolioData } from "@/types/portfolio";

export const portfolioData: PortfolioData = {
  name: "Shariyer Shazan",
  role: "Backend Architect | Full Stack Developer",
  education: [
    {
      school: "Southeast University",
      degree: "B.Sc. in Computer Science",
      period: "2022 - Present",
    }
  ],
  about: "A performance-driven engineer architecting high-availability backends and scalable microservices. Specialized in constructing resilient infrastructures using NestJS, Go, and AWS, while bridgeing the gap with pixel-perfect frontend experiences.",
  experience: [
    {
      company: "Softvence Agency",
      role: "Full-Stack Developer",
      period: "AUG 2025 – PRESENT",
      description: [
        "Architecting scalable RESTful APIs and Microservices using Node.js, NestJS, and TypeScript.",
        "Managing distributed systems with Redis caching and real-time WebSocket communication.",
        "Implementing secure FinTech flows with Stripe and automated billing structures.",
        "Orchestrating containerized deployments via Docker, Nginx, and AWS EC2/S3 pipelines."
      ],
      tech: ["NestJS", "NodeJs", "Docker", "AWS", "Redis", "Kafka", "PostgreSQL" , "Prisma" , "MongoDB" , "Mongoose" , "WebSockets", "Socket.io" , "WebRTC"]
    }
  ],
  techStack: [
    {
      title: "Core Languages",
      items: [
        { name: "Go", icon: SiGo, color: "#00ADD8" },
        { name: "JavaScript", icon: SiJavascript, color: "#F7DF1E" },
        { name: "Python", icon: SiPython, color: "#3776AB" },
        { name: "C", icon: SiC, color: "#00599C" },
        { name: "C++", icon: SiCplusplus, color: "#00599C" },
        { name: "TypeScript", icon: SiTypescript, color: "#3178C6" },
      ]
    },
    {
      title: "Backend & Databases",
      items: [
        { name: "NestJS", icon: SiNestjs, color: "#E0234E" },
        { name: "Redis", icon: SiRedis, color: "#DC382D" },
        { name: "Node.js", icon: SiNodedotjs, color: "#339933" },
        { name: "Express.js", icon: SiExpress, color: "#FFFFFF" },
        // { name: "GoFiber", icon: SiGo, color: "#00ADD8" },
        { name: "Socket.IO", icon: SiSocketdotio, color: "#FFFFFF" },
        { name: "MongoDB", icon: SiMongodb, color: "#47A248" },
        { name: "PostgreSQL", icon: SiPostgresql, color: "#4169E1" },
        { name: "Prisma", icon: SiPrisma, color: "#2D3748" },
        { name: "MySQL", icon: SiMysql, color: "#4479A1" },
        { name: "GraphQL", icon: SiGraphql, color: "#E10098" },
        { name: "Firebase", icon: SiFirebase, color: "#FFCA28" },
        { name: "JWT", icon: SiJsonwebtokens, color: "#FFFFFF" },
      ]
    },
    {
      title: "Frontend",
      items: [
        { name: "Next.js", icon: SiNextdotjs, color: "#FFFFFF" },
        { name: "React", icon: SiReact, color: "#61DAFB" },
        { name: "TailwindCSS", icon: SiTailwindcss, color: "#06B6D4" },
        { name: "Redux", icon: SiRedux, color: "#764ABC" },
        { name: "ShadcnUI", icon: SiShadcnui, color: "#FFFFFF" },
        { name: "Material UI", icon: SiMui, color: "#007FFF" },
        { name: "DaisyUI", icon: FaLayerGroup, color: "#00B4A2" },
        { name: "Zod", icon: FaCheckCircle, color: "#FFFFFF" },
      ]
    },
    {
      title: "Architecture & Messaging",
      items: [
        { name: "Kafka", icon: SiApachekafka, color: "#FFFFFF" },
        { name: "RabbitMQ", icon: SiRabbitmq, color: "#FF6600" },
        { name: "Microservices", icon: SiDocker, color: "#FF6B00" },
      ]
    },
    {
      title: "DevOps & Cloud",
      items: [
        { name: "Docker", icon: SiDocker, color: "#2496ED" },
        { name: "AWS", icon: FaAws, color: "#FF9900" },
        { name: "CI/CD", icon: SiGithubactions, color: "#FFFFFF" },
        { name: "Nginx", icon: SiNginx, color: "#009639" },
        { name: "Vercel", icon: SiVercel, color: "#FFFFFF" },
        { name: "Render", icon: SiRender, color: "#0466C8" },
      ]
    },
    {
      title: "Tools & Payments",
      items: [
        { name: "Stripe", icon: SiStripe, color: "#635BFF" },
        { name: "Git", icon: FaGithub, color: "#F05032" },
        { name: "Postman", icon: SiPostman, color: "#FF6C37" },
        { name: "VS Code", icon: FaCode, color: "#007ACC" },
        { name: "Figma", icon: SiFigma, color: "#F24E1E" },
      ]
    },
    {
      title: "Interpersonal",
      items: [
        { name: "Leadership", icon: FaUsers, color: "#007BFF" },
        { name: "Communication", icon: FaComments, color: "#FF5722" },
        { name: "Teamwork", icon: FaHandshake, color: "#9C27B0" },
        { name: "Time Management", icon: FaClock, color: "#4CAF50" },
      ]
    }
  ],
  projects: [
    {
      title: "Enterprise SaaS Core",
      description: "High-performance multi-tenant SaaS foundation utilizing microservices, distributed caching, and automated scaling on AWS.",
      image: "/projects/saas.png",
      liveLink: "https://example.com",
      frontendLink: "https://github.com/shariyerShazan",
      backendLink: "https://github.com/shariyerShazan",
      tags: ["Microservices", "NestJS", "AWS", "Infrastructure"]
    },
    {
      title: "Real-time Fintech Engine",
      description: "Low-latency financial transaction handler with real-time analytics, Stripe integration, and WebSocket event streaming.",
      image: "/projects/fintech.png",
      liveLink: "https://example.com",
      frontendLink: "https://github.com/shariyerShazan",
      backendLink: "https://github.com/shariyerShazan",
      tags: ["FinTech", "WebSockets", "Go", "Redis"]
    }
  ],
  certificates: [
    {
      title: "AWS Certified Solutions Architect – Associate",
      issuer: "Amazon Web Services",
      date: "2024",
      description: "Validation of expertise in designing and deploying scalable systems on AWS platform.",
      fileUrl: "/certificates/placeholder.pdf"
    },
    {
      title: "Certified Kubernetes Administrator (CKA)",
      issuer: "CNCF",
      date: "2024",
      description: "Demonstrating proficiency in managing production-grade Kubernetes clusters.",
      fileUrl: "/certificates/placeholder.pdf"
    }
  ],
  socials: [
    { name: "LinkedIn", href: "https://www.linkedin.com/in/shariyerShazan", icon: FaLinkedin },
    { name: "GitHub", href: "https://github.com/shariyerShazan", icon: FaGithub },
    { name: "Email", href: "mailto:shariyershazan1@gmail.com", icon: FaEnvelope },
    { name: "Twitter", href: "https://x.com/SJan_1293", icon: FaTwitter },
  ]
};
