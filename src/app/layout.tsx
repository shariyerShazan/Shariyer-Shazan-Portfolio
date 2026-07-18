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
    default: "Shariyer Shazan | Backend Engineer & Systems Architect",
    template: "%s | Shariyer Shazan"
  },
  description: "Senior portfolio of Md Shariyer Shazan. Professional Full Stack Developer (Backend Focused) specializing in Node.js, NestJS, TypeScript, Kafka, gRPC, and Microservices.",
  alternates: {
    canonical: "/",
  },
  keywords: [
    "Shariyer Shazan",
    "Md Shariyer Shazan",
    "Shariyer Shazan Developer",
    "Backend Engineer",
    "Systems Architect",
    "Node.js Backend Developer",
    "NestJS Developer",
    "Microservice Architecture",
    "TypeScript Developer",
    "Kafka Event-Driven Developer",
    "Dhaka Backend Engineer",
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
    type: "website",
    locale: "en_US",
    url: siteUrl,
    title: "Shariyer Shazan | Backend Engineer & Systems Architect",
    description: "Professional portfolio of Md Shariyer Shazan, Backend Engineer specializing in NestJS, Kafka, gRPC, Node.js, and scaling distributed microservices.",
    siteName: "Shariyer Shazan Portfolio",
    images: [
      {
        url: "/profile.jpg",
        width: 1200,
        height: 630,
        alt: "Md Shariyer Shazan - Backend Engineer & Systems Architect Portfolio",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Shariyer Shazan | Backend Engineer & Systems Architect",
    description: "Professional portfolio of Md Shariyer Shazan, Backend Engineer specializing in NestJS, Kafka, gRPC, Node.js, and scaling distributed microservices.",
    creator: "@SJan_1293",
    images: ["/profile.jpg"],
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
      "jobTitle": "Full Stack Developer (Backend Focused)",
      "description": "Backend Engineer focused on building production-ready backend systems and distributed architectures, specializing in NestJS, Node.js, gRPC, Kafka, PostgreSQL, MongoDB, Redis, and Docker.",
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
      "worksFor": {
        "@type": "Organization",
        "name": "Betopia",
        "description": "Health & weight-management platform."
      },
      "knowsAbout": [
        "Software Engineering",
        "Backend Development",
        "System Architecture",
        "Node.js",
        "NestJS",
        "TypeScript",
        "Microservices",
        "Apache Kafka",
        "gRPC",
        "Redis",
        "PostgreSQL",
        "MongoDB",
        "Docker",
        "AWS",
        "CI/CD",
        "REST APIs",
        "WebSockets"
      ],
      "sameAs": [
        "https://www.linkedin.com/in/shariyerShazan",
        "https://github.com/shariyerShazan",
        "https://x.com/SJan_1293",
        "https://www.facebook.com/darling.shazan",
        "https://www.instagram.com/shariyer.shazan/"
      ]
    },
    {
      "@type": "WebSite",
      "@id": `${siteUrl}/#website`,
      "url": siteUrl,
      "name": "Shariyer Shazan Portfolio",
      "description": "Professional portfolio of Md Shariyer Shazan, Backend Engineer and Full Stack Developer.",
      "author": {
        "@id": `${siteUrl}/#person`
      }
    },
    {
      "@type": "WebPage",
      "@id": `${siteUrl}/#webpage`,
      "url": siteUrl,
      "name": "Md Shariyer Shazan | Backend Engineer & Systems Architect",
      "isPartOf": {
        "@id": `${siteUrl}/#website`
      },
      "about": {
        "@id": `${siteUrl}/#person`
      },
      "description": "Senior portfolio of Md Shariyer Shazan. Professional Full Stack Developer (Backend Focused) specializing in Node.js, NestJS, TypeScript, Kafka, gRPC, and Microservices."
    },
    {
      "@type": "SoftwareApplication",
      "@id": `${siteUrl}/#waave`,
      "name": "Waave",
      "applicationCategory": "SocialNetworkingApplication",
      "operatingSystem": "All",
      "description": "Enterprise microservices social platform engineered using a NestJS monorepo, Kafka event orchestration, Redis timeline caching, and gRPC communication.",
      "creator": {
        "@id": `${siteUrl}/#person`
      },
      "downloadUrl": "https://github.com/shariyerShazan/Waave-SocialMedia-Backend-Microservices"
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
      <body className={`${inter.variable} ${outfit.variable} font-sans antialiased text-slate-200 bg-[#0a0f1d]`}>
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
          <main className="relative z-10 px-9">
            {children}
          </main>
        </GameModeProvider>
      </body>
    </html>
  );
}
