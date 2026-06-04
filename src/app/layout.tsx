import type { Metadata } from "next";
import { Inter, Outfit } from "next/font/google";
import "./globals.css";
import FrameBorder from "@/components/FrameBorder";
import Navbar from "@/components/Navbar";
import { AOSInit } from "@/components/AOSInit";
import CustomCursor from "@/components/CustomCursor";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const outfit = Outfit({ subsets: ["latin"], variable: "--font-outfit" });

export const metadata: Metadata = {
  title: "Shariyer Shazan | Backend & DevOps Architect",
  description: "Senior Portfolio of Shariyer Shazan - Building scalable enterprise backends and robust CI/CD pipelines.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${inter.variable} ${outfit.variable} font-sans antialiased text-slate-200 bg-[#0a0f1d]`}>
        <AOSInit />
        <CustomCursor />
        <Navbar />
        <FrameBorder />
        <main className="relative z-10">
          {children}
        </main>
      </body>
    </html>
  );
}
