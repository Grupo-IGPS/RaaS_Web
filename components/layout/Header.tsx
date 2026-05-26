"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, LogIn } from "lucide-react";
import { ThemeToggle } from "@/components/ui/ThemeToggle";
import { ScrollTrigger } from "@/lib/gsap";
import { cn } from "@/lib/utils";

const navLinks = [
  { label: "Soluciones", href: "/#soluciones" },
  { label: "Cómo funciona", href: "/#como-funciona" },
  { label: "Marketplace", href: "/marketplace" },
  { label: "Dashboard", href: "/dashboard" },
];

export function Header() {
  const pathname = usePathname();
  const isHome = pathname === "/";

  // isPill: full pill shape + glass bg + dark text
  // isGlass: glass bg + dark text (no pill shape) — used on non-hero pages at top
  const [isPill, setIsPill] = useState(false);
  const [isGlass, setIsGlass] = useState(!isHome);
  const [mobileOpen, setMobileOpen] = useState(false);
  const closeMobile = useCallback(() => setMobileOpen(false), []);

  useEffect(() => {
    if (isHome) {
      // Home page: transparent during hero, pill after #soluciones
      setIsGlass(false);
      const st = ScrollTrigger.create({
        trigger: "#soluciones",
        start: "top 72px",
        onEnter: () => { setIsPill(true); setIsGlass(true); },
        onLeaveBack: () => { setIsPill(false); setIsGlass(false); },
      });
      return () => { st.kill(); };
    } else {
      // Non-home pages: subtle glass at top, full pill after scrolling 60px
      setIsGlass(true);
      setIsPill(false);
      const onScroll = () => {
        const scrolled = window.scrollY > 60;
        setIsPill(scrolled);
      };
      window.addEventListener("scroll", onScroll, { passive: true });
      return () => window.removeEventListener("scroll", onScroll);
    }
  }, [isHome]);

  // Close mobile menu on route change
  useEffect(() => { setMobileOpen(false); }, [pathname]);

  const showDark = isGlass || isPill; // dark text + glass bg
  const logoInvert = showDark;

  return (
    <header className="fixed top-0 inset-x-0 z-50 flex justify-center pt-4 pointer-events-none">
      <div
        className={cn(
          "w-full flex items-center justify-between transition-all duration-500 pointer-events-auto",
          isPill
            ? "max-w-5xl mx-6 rounded-full px-5 py-2.5 shadow-xl"
            : "max-w-7xl px-6 py-1 rounded-none"
        )}
        style={
          showDark
            ? {
                background: "rgba(255,255,255,0.80)",
                backdropFilter: "blur(24px)",
                WebkitBackdropFilter: "blur(24px)",
                border: "1px solid rgba(255,255,255,0.55)",
              }
            : { background: "transparent" }
        }
      >
        {/* Logo */}
        <Link href="/" className="flex items-center flex-shrink-0">
          <img
            src="/empresas/RaaS SF Blanco.webp"
            alt="RaaS by IGPS"
            className="h-7 w-auto object-contain transition-all duration-500"
            style={logoInvert ? { filter: "invert(1) brightness(0.15)" } : undefined}
          />
        </Link>

        {/* Nav — desktop */}
        <nav className="hidden md:flex items-center gap-0.5">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={closeMobile}
              className={cn(
                "px-4 py-2 text-sm font-medium rounded-full transition-colors duration-200",
                showDark
                  ? "text-gray-700 hover:text-gray-900 hover:bg-black/5"
                  : "text-white hover:text-white/70"
              )}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Right actions */}
        <div className="flex items-center gap-3">
          <ThemeToggle />
          <Link
            href="/dashboard"
            className={cn(
              "hidden md:flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-semibold transition-all duration-300 hover:opacity-90 hover:scale-105",
              showDark ? "text-gray-900 border border-gray-200 hover:bg-black/5" : "text-white"
            )}
            style={
              !showDark
                ? { background: "linear-gradient(135deg, #09116A 0%, #2D3193 100%)" }
                : undefined
            }
          >
            <LogIn size={13} />
            Login / Sign Up
          </Link>

          <button
            className={cn(
              "md:hidden p-2 rounded-full transition-colors",
              showDark ? "text-gray-700 hover:bg-black/5" : "text-white hover:text-white/70"
            )}
            onClick={() => setMobileOpen((v) => !v)}
            aria-label={mobileOpen ? "Cerrar menú" : "Abrir menú"}
          >
            {mobileOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <div
        className={cn(
          "md:hidden absolute top-full inset-x-0 mx-4 mt-2 rounded-2xl overflow-hidden transition-all duration-300 pointer-events-auto",
          mobileOpen ? "max-h-80 opacity-100" : "max-h-0 opacity-0"
        )}
        style={{
          background: "rgba(255,255,255,0.92)",
          backdropFilter: "blur(20px)",
          WebkitBackdropFilter: "blur(20px)",
          border: "1px solid rgba(255,255,255,0.5)",
        }}
      >
        <div className="px-4 py-4 flex flex-col gap-1">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="px-4 py-3 text-sm font-medium text-gray-700 hover:text-gray-900 rounded-xl transition-colors hover:bg-black/5"
              onClick={closeMobile}
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="/dashboard"
            className="mt-2 px-4 py-3 rounded-full text-sm font-semibold text-white text-center hover:opacity-90"
            style={{ background: "linear-gradient(135deg, #09116A 0%, #2D3193 100%)" }}
            onClick={closeMobile}
          >
            Login / Sign Up
          </Link>
        </div>
      </div>
    </header>
  );
}
