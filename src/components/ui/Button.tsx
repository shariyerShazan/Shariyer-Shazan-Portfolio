import React from "react";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "ghost";
  size?: "sm" | "md" | "lg";
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", size = "md", ...props }, ref) => {
    const baseStyles =
      "inline-flex items-center justify-center font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00f0ff]/50 disabled:pointer-events-none disabled:opacity-50 select-none cursor-pointer active:scale-[0.98]";

    const variants = {
      primary:
        "bg-white text-zinc-950 hover:bg-zinc-200 font-semibold shadow-[0_1px_2px_rgba(0,0,0,0.1),0_0_20px_rgba(255,255,255,0.15)] rounded-xl",
      secondary:
        "bg-slate-900/90 text-slate-200 hover:text-white hover:bg-slate-800 border border-slate-800 hover:border-slate-700 shadow-sm rounded-xl",
      outline:
        "border border-slate-700/80 hover:border-slate-500 bg-slate-950/40 hover:bg-slate-900/60 text-slate-200 hover:text-white shadow-sm rounded-xl",
      ghost:
        "text-slate-400 hover:text-white hover:bg-slate-800/50 rounded-xl",
    };

    const sizes = {
      sm: "h-9 px-3.5 text-xs gap-1.5",
      md: "h-11 px-5 text-sm gap-2",
      lg: "h-12 px-7 text-base gap-2.5",
    };

    return (
      <button
        ref={ref}
        className={cn(baseStyles, variants[variant], sizes[size], className)}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";
