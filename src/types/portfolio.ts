import { IconType } from "react-icons";

export interface NavItem {
  name: string;
  href: string;
}

export interface Education {
  school: string;
  degree: string;
  period: string;
}

export interface Experience {
  company: string;
  role: string;
  period: string;
  description: string[];
  tech?: string[];
}

export interface TechItem {
  name: string;
  icon: IconType;
  color?: string;
}

export interface TechCategory {
  title: string;
  items: TechItem[];
}

export interface Project {
  title: string;
  description: string;
  image: string;
  liveLink: string;
  frontendLink: string;
  backendLink?: string;
  tags: string[];
}

export interface SocialLink {
  name: string;
  href: string;
  icon: IconType;
}

export interface Certificate {
  title: string;
  issuer: string;
  date: string;
  description?: string;
  link?: string;
  fileUrl?: string; // Consistent with fahim-portfolio
}

export interface PortfolioData {
  name: string;
  role: string;
  education: Education[];
  about: string;
  experience: Experience[];
  techStack: TechCategory[];
  projects: Project[];
  certificates: Certificate[];
  socials: SocialLink[];
}

export interface ThemePalette {
  name: string;
  primary: string;
  secondary: string;
  accent: string;
  background: string;
  surface: string;
  text: string;
  muted: string;
  border: string;
}
