import type { Metadata } from "next";
import { Inter, Outfit } from "next/font/google";
import "./globals.css";
import FrameBorder from "@/components/FrameBorder";
import Navbar from "@/components/Navbar";
import { AOSInit } from "@/components/AOSInit";
import CustomCursor from "@/components/CustomCursor";
import { GameModeProvider } from "@/context/GameModeContext";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const outfit = Outfit({ subsets: ["latin"], variable: "--font-outfit" });

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://shariyer-shazan.vercel.app";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Shariyer Shazan | Lead Full-Stack & DevOps Engineer (Node.js, NestJS, AWS, Kubernetes)",
    template: "%s | Shariyer Shazan"
  },
  verification: {
    google: "google1d6343d8e9a74899",
  },
  description: "Official portfolio of Shariyer Shazan — Lead Full-Stack & DevOps Engineer at YouFresh LLC. Core NestJS framework contributor specializing in Node.js, NestJS, AWS EKS, Kubernetes, Terraform, React Native, and distributed microservices.",
  alternates: {
    canonical: "/",
  },
  keywords: [
    "Shariyer Shazan",
    "Md Shariyer Shazan",
    "Shariyer Shazan Developer",
    "Shariyer Shazan YouFresh",
    "YouFresh LLC Lead Engineer",
    "Grovr Developer",
    "Lead DevOps Engineer",
    "Lead Full Stack Developer",
    "Backend Specialist",
    "NestJS Core Contributor",
    "AWS EKS Engineer",
    "Kubernetes Terraform Architect",
    "Node.js Backend Developer",
    "NestJS Developer",
    "Microservice Architecture",
    "React Native Expo Developer",
    "TypeScript Engineer",
    "Kafka Event-Driven Developer",
    "Dhaka DevOps Engineer",
    "Bangladesh Senior Backend Engineer",
  ],
  authors: [{ name: "Md Shariyer Shazan", url: siteUrl }],
  creator: "Md Shariyer Shazan",
  publisher: "Md Shariyer Shazan",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  icons: {
    icon: [
      { url: "/profile.jpg", sizes: "any" },
    ],
    apple: [
      { url: "/profile.jpg", sizes: "180x180", type: "image/jpeg" },
    ],
  },
  openGraph: {
    type: "profile",
    locale: "en_US",
    url: siteUrl,
    title: "Shariyer Shazan | Lead Full-Stack & DevOps Engineer (Node.js, NestJS, AWS, Kubernetes)",
    description: "Official portfolio of Shariyer Shazan — Lead Full-Stack & DevOps Engineer at YouFresh LLC. Core NestJS contributor specializing in Node.js, AWS EKS, Kubernetes, Terraform, React Native, and distributed microservices.",
    siteName: "Shariyer Shazan Portfolio",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Shariyer Shazan - Lead Full-Stack & DevOps Engineer Portfolio",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Shariyer Shazan | Lead Full-Stack & DevOps Engineer (Node.js, NestJS, AWS, Kubernetes)",
    description: "Official portfolio of Shariyer Shazan — Lead Full-Stack & DevOps Engineer at YouFresh LLC. Core NestJS contributor specializing in Node.js, AWS EKS, Kubernetes, Terraform, React Native, and distributed microservices.",
    creator: "@SJan_1293",
    images: ["/og-image.png"],
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Person",
      "@id": `${siteUrl}/#person`,
      "name": "Md Shariyer Shazan",
      "givenName": "Md Shariyer",
      "familyName": "Shazan",
      "additionalName": "Shariyer Shazan",
      "jobTitle": "Lead Full-Stack & DevOps Engineer",
      "description": "Lead Full-Stack & DevOps Engineer at YouFresh LLC and verified NestJS core framework contributor. Specializes in building distributed systems, event-driven microservices (Kafka, gRPC, Redis), cloud infrastructure (AWS EKS, EC2, Kubernetes, Terraform, Helm, Ansible), cross-platform mobile apps (React Native, Expo), and AI integrations (OpenAI GPT-4o Vision, Whisper, MCP).",
      "url": siteUrl,
      "image": `${siteUrl}/profile.jpg`,
      "email": "shariyershazan1@gmail.com",
      "address": {
        "@type": "PostalAddress",
        "addressLocality": "Tejgaon",
        "addressRegion": "Dhaka",
        "addressCountry": "Bangladesh"
      },
      "alumniOf": [
        {
          "@type": "EducationalOrganization",
          "name": "Southeast University",
          "url": "https://www.seu.edu.bd"
        },
        {
          "@type": "EducationalOrganization",
          "name": "BAF Shaheen College"
        }
      ],
      "worksFor": [
        {
          "@type": "Organization",
          "name": "YouFresh LLC",
          "description": "Healthcare, nutrition, and telehealth platform company, creator of the Grovr ecosystem.",
          "employee": {
            "@type": "Person",
            "name": "Md Shariyer Shazan"
          }
        },
        {
          "@type": "Organization",
          "name": "Softvence",
          "description": "Software engineering company behind the Canine Registry SaaS platform."
        }
      ],
      "hasOccupation": {
        "@type": "Occupation",
        "name": "Lead Full-Stack & DevOps Engineer",
        "description": "Architects scalable distributed systems, event-driven microservices, cloud-native infrastructure with AWS EKS and Kubernetes, and AI-integrated healthcare platforms.",
        "skills": "Node.js, NestJS, TypeScript, AWS EKS, EC2, Kubernetes, Terraform, Ansible, Docker, Helm, Kafka, gRPC, PostgreSQL, Prisma, Redis, React Native, Expo, Next.js, OpenAI GPT-4o Vision, Whisper, Stripe Connect"
      },
      "knowsAbout": [
        "Software Engineering",
        "DevOps & Cloud Architecture",
        "Kubernetes & EKS",
        "Terraform Infrastructure as Code",
        "Ansible Configuration Management",
        "Helm Charts",
        "Backend Development",
        "System Architecture",
        "Node.js",
        "NestJS Core Framework",
        "TypeScript",
        "React Native",
        "Expo SDK",
        "Next.js App Router",
        "Distributed Systems",
        "Apache Kafka",
        "gRPC",
        "Redis Caching",
        "PostgreSQL",
        "Prisma ORM",
        "MongoDB",
        "Docker",
        "CI/CD Automation",
        "REST APIs",
        "Socket.IO",
        "WebRTC Audio Video Signaling",
        "Model Context Protocol (MCP)",
        "OpenAI GPT-4o Vision",
        "Whisper Audio AI",
        "Stripe Connect"
      ],
      "sameAs": [
        "https://www.linkedin.com/in/md-shariyerShazan",
        "https://github.com/shariyerShazan",
        "https://x.com/SJan_1293",
        "https://www.facebook.com/darling.shazan",
        "https://instagram.com/shariyer.shazan"
      ]
    },
    {
      "@type": "WebSite",
      "@id": `${siteUrl}/#website`,
      "url": siteUrl,
      "name": "Shariyer Shazan Portfolio",
      "description": "Official engineering portfolio of Md Shariyer Shazan, Lead Full-Stack & DevOps Engineer and NestJS Core Contributor.",
      "author": {
        "@id": `${siteUrl}/#person`
      }
    },
    {
      "@type": "WebPage",
      "@id": `${siteUrl}/#webpage`,
      "url": siteUrl,
      "name": "Shariyer Shazan | Lead Full-Stack & DevOps Engineer (Node.js, NestJS, AWS, Kubernetes)",
      "isPartOf": {
        "@id": `${siteUrl}/#website`
      },
      "about": {
        "@id": `${siteUrl}/#person`
      },
      "description": "Official engineering portfolio of Shariyer Shazan — Lead Full-Stack & DevOps Engineer at YouFresh LLC. Specializing in Node.js, NestJS, AWS EKS, Kubernetes, Terraform, React Native, and distributed microservices."
    },
    {
      "@type": "SoftwareApplication",
      "@id": `${siteUrl}/#grovr`,
      "name": "Grovr",
      "applicationCategory": "HealthApplication",
      "operatingSystem": "iOS, Android, Web, Cloud",
      "description": "Enterprise healthcare, AI nutrition tracking, and telehealth ecosystem connecting Members, certified Providers, and Administrators across Mobile (React Native Expo 57), Web (Next.js 16), and Kubernetes-backed AWS cloud infrastructure (EKS + EC2 k3s).",
      "creator": {
        "@id": `${siteUrl}/#person`
      }
    },
    {
      "@type": "SoftwareApplication",
      "@id": `${siteUrl}/#waave`,
      "name": "Waave",
      "applicationCategory": "SocialNetworkingApplication",
      "operatingSystem": "All",
      "description": "Enterprise-grade NestJS microservices platform featuring 10 services, gRPC/Kafka messaging, Redis caching, Double Ratchet E2EE Chat, and Model Context Protocol (MCP) AI Agents.",
      "creator": {
        "@id": `${siteUrl}/#person`
      },
      "downloadUrl": "https://github.com/shariyerShazan/my-product"
    },
    {
      "@type": "SoftwareApplication",
      "@id": `${siteUrl}/#finn`,
      "name": "Finn",
      "applicationCategory": "BusinessApplication",
      "operatingSystem": "All",
      "description": "Real-time auction and classified ads marketplace featuring fixed price checkouts, live bidding systems, Socket.io chat, and Stripe Connect pay splitting.",
      "creator": {
        "@id": `${siteUrl}/#person`
      },
      "downloadUrl": "https://github.com/shariyerShazan/Finn-Nestjs-Marketplace-Backend"
    }
  ]
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${inter.variable} ${outfit.variable} font-sans antialiased text-slate-200 bg-[#08090d] min-h-screen relative selection:bg-[#00f0ff]/20 selection:text-white`}>
        {/* Subtle top ambient spotlight for linear/vercel depth */}
        <div className="bg-spotlight" />

        {/* Inject JSON-LD Schema */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c"),
          }}
        />
        <GameModeProvider>
          <AOSInit />
          <CustomCursor />
          <Navbar />
          <FrameBorder />
          <main className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            {children}
          </main>
        </GameModeProvider>
      </body>
    </html>
  );
}
