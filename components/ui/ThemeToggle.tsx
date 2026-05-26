"use client";

import { useTheme } from "next-themes";
import { Moon, Sun } from "lucide-react";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

export function ThemeToggle({ className }: { className?: string }) {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => { setMounted(true); }, []);

  if (!mounted) {
    return <div className={cn("w-12 h-6 rounded-full bg-border opacity-0", className)} aria-hidden="true" />;
  }

  const isDark = theme === "dark";

  return (
    <button
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className={cn("relative w-12 h-6 rounded-full cursor-pointer transition-colors duration-300 flex-shrink-0", className)}
      style={{
        background: isDark ? "rgba(108,122,224,0.2)" : "hsl(var(--color-border))",
        border: isDark ? "1px solid rgba(108,122,224,0.4)" : "1px solid hsl(var(--color-border))",
      }}
      aria-label={isDark ? "Cambiar a modo claro" : "Cambiar a modo oscuro"}
      role="switch"
      aria-checked={isDark}
    >
      <div
        className="absolute top-[3px] w-[18px] h-[18px] rounded-full flex items-center justify-center transition-all duration-300"
        style={{
          left: isDark ? "calc(100% - 21px)" : "3px",
          background: isDark ? "hsl(234 63% 65%)" : "#ffffff",
          boxShadow: isDark
            ? "0 0 8px hsl(234 63% 65% / 0.5)"
            : "0 1px 3px rgba(0,0,0,0.15)",
        }}
      >
        {isDark ? (
          <Moon size={10} className="text-white" />
        ) : (
          <Sun size={10} style={{ color: "#1E40AF" }} />
        )}
      </div>
    </button>
  );
}
