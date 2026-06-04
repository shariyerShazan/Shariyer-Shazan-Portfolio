"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { themePalettes } from "@/config/themes";
import { ThemePalette } from "@/types/portfolio";

interface ThemeContextType {
  currentTheme: ThemePalette;
  setTheme: (themeName: string) => void;
  themes: ThemePalette[];
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentTheme, setCurrentTheme] = useState<ThemePalette>(themePalettes[0]);

  // Stable applyTheme using useCallback would be better but let's just move it first
  // Actually, I'll use a direct function and move it outside or define it inside.
  
  const applyTheme = React.useCallback((theme: ThemePalette) => {
    const root = document.documentElement;
    root.style.setProperty("--primary", theme.primary);
    root.style.setProperty("--secondary", theme.secondary);
    root.style.setProperty("--accent", theme.accent);
    root.style.setProperty("--background", theme.background);
    root.style.setProperty("--surface", theme.surface);
    root.style.setProperty("--text", theme.text);
    root.style.setProperty("--muted", theme.muted);
    root.style.setProperty("--border-color", theme.border);
  }, []);

  useEffect(() => {
    const savedTheme = typeof window !== "undefined" ? localStorage.getItem("portfolio-theme") : null;
    if (savedTheme) {
      const theme = themePalettes.find((t) => t.name === savedTheme);
      if (theme) {
        setCurrentTheme(theme);
        applyTheme(theme);
      }
    } else {
      applyTheme(themePalettes[0]);
    }
  }, [applyTheme]);

  const setTheme = (themeName: string) => {
    const theme = themePalettes.find((t) => t.name === themeName);
    if (theme) {
      setCurrentTheme(theme);
      applyTheme(theme);
      localStorage.setItem("portfolio-theme", themeName);
    }
  };

  return (
    <ThemeContext.Provider value={{ currentTheme, setTheme, themes: themePalettes }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
};
