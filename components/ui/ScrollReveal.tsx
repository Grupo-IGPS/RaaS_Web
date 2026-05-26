"use client";

import { useRef, ReactNode } from "react";
import { gsap, useGSAP, ScrollTrigger } from "@/lib/gsap";
import { cn } from "@/lib/utils";

gsap.registerPlugin(ScrollTrigger);

type RevealDirection = "bottom" | "left" | "right" | "scale" | "none";

interface ScrollRevealProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  duration?: number;
  from?: RevealDirection;
  once?: boolean;
  stagger?: number;
}

const fromVars: Record<RevealDirection, gsap.TweenVars> = {
  bottom: { opacity: 0, y: 40 },
  left: { opacity: 0, x: -40 },
  right: { opacity: 0, x: 40 },
  scale: { opacity: 0, scale: 0.92 },
  none: { opacity: 0 },
};

export function ScrollReveal({
  children,
  className,
  delay = 0,
  duration = 0.8,
  from = "bottom",
  once = true,
}: ScrollRevealProps) {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const el = ref.current;
      if (!el) return;

      const prefersReducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches;

      if (prefersReducedMotion) {
        gsap.set(el, { opacity: 1 });
        return;
      }

      gsap.from(el, {
        ...fromVars[from],
        duration,
        delay,
        ease: "power3.out",
        scrollTrigger: {
          trigger: el,
          start: "top 88%",
          once,
        },
      });
    },
    { scope: ref, dependencies: [delay, duration, from, once] }
  );

  return (
    <div ref={ref} className={cn("will-change-transform", className)}>
      {children}
    </div>
  );
}
