"use client";

import { useRef, useEffect, useCallback, useState } from "react";
import Link from "next/link";
import { ChevronDown, ArrowRight, Activity } from "lucide-react";
import { gsap, ScrollTrigger, useGSAP } from "@/lib/gsap";

// All logos in public/empresas/ (WebP after conversion)
const LOGOS = [
  "/empresas/RaaS Completo SF Blanco.webp",
  "/empresas/AUCTECH Blanco.webp",
  "/empresas/ESTUN Blanco.webp",
  "/empresas/Grupo IGPS Logo-Blanco.webp",
  "/empresas/ROBOTIQ Blanco.webp",
  "/empresas/UNITREE Blanco.webp",
  "/empresas/UR MIR Blanco.webp",
];

function CharSpan({ text, spanClass }: { text: string; spanClass: string }) {
  return (
    <>
      {text.split("").map((ch, i) =>
        ch === " " ? (
          <span key={i} className={spanClass} style={{ display: "inline-block" }}>&nbsp;</span>
        ) : (
          <span key={i} className={spanClass} style={{ display: "inline-block" }}>{ch}</span>
        )
      )}
    </>
  );
}

export interface HeroScrubProps {
  frameCount: number;
  frameUrl: (index: number) => string;
  accentHex?: string;
}

export function HeroScrub({ frameCount, frameUrl, accentHex = "#2D3193" }: HeroScrubProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const logoTrackRef = useRef<HTMLDivElement>(null);
  const frameCache = useRef<(HTMLImageElement | null)[]>(new Array(frameCount).fill(null));
  const currentFrameRef = useRef(0);
  const [loaded, setLoaded] = useState(false);

  // ── Canvas ───────────────────────────────────────────────────────────────
  const drawFrame = useCallback((index: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const safe = Math.round(Math.max(0, Math.min(index, frameCount - 1)));
    let img = frameCache.current[safe];
    if (!img) {
      for (let d = 1; d < 30; d++) {
        const p = frameCache.current[safe - d];
        const n = frameCache.current[safe + d];
        if (p) { img = p; break; }
        if (n) { img = n; break; }
      }
    }
    if (!img) return;
    const scale = Math.max(canvas.width / img.naturalWidth, canvas.height / img.naturalHeight);
    const dw = img.naturalWidth * scale, dh = img.naturalHeight * scale;
    const dx = (canvas.width - dw) / 2, dy = (canvas.height - dh) / 2;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(img, dx, dy, dw, dh);
  }, [frameCount]);

  const resizeCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    drawFrame(currentFrameRef.current);
  }, [drawFrame]);

  // ── Frame loading ────────────────────────────────────────────────────────
  useEffect(() => {
    const cancelled = { v: false };
    const first = new Image();
    first.src = frameUrl(0);
    first.onload = () => {
      frameCache.current[0] = first;
      resizeCanvas();
      setLoaded(true);
      (async () => {
        for (let i = 1; i < frameCount; i++) {
          if (cancelled.v) break;
          await new Promise<void>((res) => {
            const img = new Image();
            img.src = frameUrl(i);
            img.onload = () => { frameCache.current[i] = img; res(); };
            img.onerror = () => res();
          });
        }
      })();
    };
    return () => { cancelled.v = true; };
  }, [frameCount, frameUrl, resizeCanvas]);

  useEffect(() => {
    window.addEventListener("resize", resizeCanvas, { passive: true });
    return () => window.removeEventListener("resize", resizeCanvas);
  }, [resizeCanvas]);

  // ── Stage 1 entrance: H1 domino stagger on load ──────────────────────────
  useEffect(() => {
    if (!loaded) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    gsap.set(".h1-char", { opacity: 0, x: -28 });
    gsap.timeline({ delay: 0.15 })
      .to(".hero-badge-inner", { opacity: 1, y: 0, duration: 0.5, ease: "power3.out" })
      .to(".h1-char", { opacity: 1, x: 0, stagger: 0.020, duration: 0.42, ease: "power3.out" }, "-=0.25")
      .to(".hero-scroll-ind", { opacity: 1, duration: 0.6 }, "-=0.2");
  }, [loaded]);

  // ── GSAP Scroll Timeline ─────────────────────────────────────────────────
  useGSAP(() => {
    const container = containerRef.current;
    if (!container) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) { drawFrame(0); return; }

    // Hidden initial states for stages 2 & 3
    gsap.set(".h2-char", { opacity: 0, x: -60 });
    gsap.set(".h3-text", { opacity: 0, x: -50 });
    gsap.set(".kpi-panel", { opacity: 0, x: 60 });
    gsap.set(".s3-cta", { opacity: 0, y: 18 });
    gsap.set(".logo-carousel", { opacity: 0, y: 14 });

    // Frame scrub — full range across all scroll
    ScrollTrigger.create({
      trigger: container,
      start: "top top",
      end: "bottom bottom",
      scrub: 0.6,
      onUpdate: (self) => {
        const frame = Math.round(self.progress * (frameCount - 1));
        currentFrameRef.current = frame;
        drawFrame(frame);
      },
    });

    // Text stage transitions
    // Stage 1→2: scroll 8–25% (short, snappy)
    // Stage 2:   scroll 25–55%
    // Stage 3:   scroll 62–100% (long, gives time to read)
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: container,
        start: "top top",
        end: "bottom bottom",
        scrub: 0.8,
      },
    });

    tl
      // H1 exit (8%→18%)
      .to(".h1-char", {
        x: -80, opacity: 0,
        stagger: { amount: 0.08, from: "end" },
        ease: "power2.in", duration: 0.10,
      }, 0.08)
      // Scroll indicator fades out
      .to(".hero-scroll-ind", { opacity: 0, duration: 0.08 }, 0.08)
      // H2 enters (14%→26%)
      .to(".h2-char", {
        x: 0, opacity: 1,
        stagger: { amount: 0.10 },
        ease: "power2.out", duration: 0.12,
      }, 0.14)

      // H2 exit (55%→63%)
      .to(".h2-char", {
        x: -60, opacity: 0,
        stagger: { amount: 0.07, from: "end" },
        ease: "power2.in", duration: 0.08,
      }, 0.55)
      // H3 enters (61%→70%)
      .to(".h3-text", { x: 0, opacity: 1, ease: "power2.out", duration: 0.09 }, 0.61)
      // KPI panel slides in from right (63%→72%)
      .to(".kpi-panel", { x: 0, opacity: 1, ease: "power2.out", duration: 0.09 }, 0.63)
      // Stage 3 CTAs (66%→73%)
      .to(".s3-cta", { opacity: 1, y: 0, ease: "power2.out", duration: 0.07 }, 0.66)
      // Logo carousel (68%→74%)
      .to(".logo-carousel", { opacity: 1, y: 0, ease: "power2.out", duration: 0.06 }, 0.68);

    // Infinite logo carousel (independent of scroll)
    if (logoTrackRef.current) {
      gsap.to(logoTrackRef.current, { x: "-50%", duration: 20, repeat: -1, ease: "none" });
    }
  }, { scope: containerRef, dependencies: [frameCount, drawFrame] });

  return (
    <section ref={containerRef} style={{ height: "300vh" }}>
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        {/* Canvas */}
        <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" aria-hidden="true" />

        {/* Dark gradient overlays */}
        <div className="absolute inset-0 pointer-events-none" style={{
          background: "linear-gradient(to bottom, rgba(0,0,0,0.5) 0%, rgba(0,0,0,0.12) 35%, rgba(0,0,0,0.18) 65%, rgba(0,0,0,0.65) 100%)"
        }} />
        <div className="absolute inset-0 pointer-events-none" style={{
          background: "radial-gradient(ellipse at center, transparent 45%, rgba(0,0,0,0.45) 100%)"
        }} />

        {/* ── Content ─────────────────────────────────────────────────── */}
        <div className="relative z-10 h-full flex flex-col justify-center px-8 sm:px-12 lg:px-20 xl:px-28">
          <div className="flex items-center gap-10 lg:gap-14">

            {/* LEFT — text stages */}
            <div className="flex-1 min-w-0">

              {/* Badge */}
              <div className="mb-7">
                <div className="hero-badge-inner inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold tracking-widest uppercase"
                  style={{
                    opacity: 0, transform: "translateY(8px)",
                    background: "rgba(108,122,224,0.15)",
                    border: "1px solid rgba(108,122,224,0.35)",
                    color: "#a5b4fc",
                    backdropFilter: "blur(8px)",
                  }}>
                  <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: "#6C7AE0" }} />
                  RaaS by IGPS
                </div>
              </div>

              {/* Stacked headlines — same position, different stages */}
              <div className="relative" style={{ minHeight: "clamp(160px, 20vw, 340px)" }}>

                {/* H1 — Stage 1 */}
                <h1 className="absolute top-0 left-0 w-full heading-premium text-white select-none"
                  style={{ fontSize: "clamp(2.6rem, 5.5vw, 5rem)", lineHeight: 1.05, textShadow: "0 2px 40px rgba(0,0,0,0.5)" }}>
                  <CharSpan text="AUTOMATIZACIÓN" spanClass="h1-char" /><br />
                  <CharSpan text="INDUSTRIAL" spanClass="h1-char" /><br />
                  <CharSpan text="EVOLUCIONADA" spanClass="h1-char" />
                </h1>

                {/* H2 — Stage 2 */}
                <h2 className="absolute top-0 left-0 w-full heading-premium text-white select-none"
                  style={{ fontSize: "clamp(2.2rem, 4.8vw, 4.4rem)", lineHeight: 1.05, textShadow: "0 2px 40px rgba(0,0,0,0.5)" }}>
                  <CharSpan text="ROBÓTICA COMO" spanClass="h2-char" /><br />
                  <CharSpan text="SERVICIO SIN" spanClass="h2-char" /><br />
                  <span style={{ color: "#a5b4fc" }}>
                    <CharSpan text="INVERSIÓN INICIAL" spanClass="h2-char" />
                  </span>
                </h2>

                {/* H3 — Stage 3 */}
                <h3 className="h3-text absolute top-0 left-0 w-full heading-premium text-white select-none"
                  style={{ fontSize: "clamp(2rem, 4.2vw, 3.8rem)", lineHeight: 1.08, textShadow: "0 2px 40px rgba(0,0,0,0.5)" }}>
                  OPTIMIZA TU PRODUCCIÓN.<br />
                  <span style={{ color: "#a5b4fc" }}>PAGO POR USO.</span>
                </h3>
              </div>

              {/* Stage 3 CTAs */}
              <div className="s3-cta flex flex-wrap items-center gap-3 mt-7">
                <Link href="/#contacto"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-white font-semibold text-sm transition-all hover:opacity-90 hover:scale-105"
                  style={{ background: `linear-gradient(135deg, ${accentHex} 0%, #6C7AE0 100%)`, boxShadow: "0 8px 32px rgba(108,122,224,0.35)" }}>
                  Evaluar mi proceso <ArrowRight size={15} />
                </Link>
                <Link href="/marketplace"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-full font-semibold text-sm text-white transition-all hover:scale-105"
                  style={{ background: "rgba(255,255,255,0.1)", border: "1px solid rgba(255,255,255,0.25)", backdropFilter: "blur(8px)" }}>
                  Explorar soluciones
                </Link>
              </div>

              {/* Stage 3 Logo carousel */}
              <div className="logo-carousel mt-8">
                <p className="text-white/35 text-[10px] tracking-widest uppercase font-semibold mb-3">
                  Partners tecnológicos
                </p>
                <div className="overflow-hidden" style={{ maxWidth: "min(100%, 560px)" }}>
                  <div ref={logoTrackRef} className="flex items-center" style={{ gap: "48px", width: "max-content" }}>
                    {[...LOGOS, ...LOGOS].map((src, i) => (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img key={i} src={src} alt="" style={{ height: "28px", width: "auto", objectFit: "contain", opacity: 0.7, flexShrink: 0 }} />
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* RIGHT — Liquid Crystal KPI panel (Stage 3) */}
            <div className="kpi-panel hidden lg:block flex-shrink-0 w-80 xl:w-88">
              {/* Main stats card */}
              <div className="rounded-3xl overflow-hidden"
                style={{
                  background: "rgba(255,255,255,0.07)",
                  backdropFilter: "blur(24px)",
                  WebkitBackdropFilter: "blur(24px)",
                  border: "1px solid rgba(255,255,255,0.12)",
                }}>

                {/* Top: primary metric */}
                <div className="p-6 pb-4">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                      style={{ background: "rgba(108,122,224,0.2)", border: "1px solid rgba(108,122,224,0.3)" }}>
                      <Activity size={18} style={{ color: "#a5b4fc" }} />
                    </div>
                    <div>
                      <p className="text-[11px] text-white/50 uppercase tracking-widest font-semibold">Uptime garantizado</p>
                    </div>
                  </div>
                  <p className="text-5xl font-black text-white leading-none mb-1">98.7%</p>

                  {/* Progress bar */}
                  <div className="mt-4 mb-1">
                    <div className="flex justify-between text-[10px] text-white/35 mb-2">
                      <span>Disponibilidad del sistema</span>
                      <span>98.7 / 100</span>
                    </div>
                    <div className="h-1.5 rounded-full overflow-hidden" style={{ background: "rgba(255,255,255,0.08)" }}>
                      <div className="h-full rounded-full" style={{ width: "98.7%", background: "linear-gradient(90deg, #2D3193, #6C7AE0)" }} />
                    </div>
                  </div>
                </div>

                {/* Divider */}
                <div style={{ height: "1px", background: "rgba(255,255,255,0.08)" }} />

                {/* Stats grid */}
                <div className="grid grid-cols-3">
                  {[
                    { val: "3×", label: "ROI" },
                    { val: "30d", label: "Deploy" },
                    { val: "0", label: "CAPEX" },
                  ].map((s, i) => (
                    <div key={s.label}
                      className="py-5 flex flex-col items-center"
                      style={{ borderRight: i < 2 ? "1px solid rgba(255,255,255,0.08)" : undefined }}>
                      <p className="text-2xl font-black text-white leading-none mb-1">{s.val}</p>
                      <p className="text-[10px] text-white/40 uppercase tracking-widest">{s.label}</p>
                    </div>
                  ))}
                </div>

                {/* Divider */}
                <div style={{ height: "1px", background: "rgba(255,255,255,0.08)" }} />

                {/* Footer: description + badges */}
                <div className="p-5">
                  <p className="text-[11px] text-white/55 leading-relaxed mb-4">
                    Instalación, mantenimiento y soporte incluidos en tu suscripción mensual.
                  </p>
                  <div className="flex gap-2">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-semibold"
                      style={{ background: "rgba(34,197,94,0.12)", border: "1px solid rgba(34,197,94,0.25)", color: "#4ade80" }}>
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                      ACTIVO
                    </span>
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-semibold"
                      style={{ background: "rgba(108,122,224,0.15)", border: "1px solid rgba(108,122,224,0.3)", color: "#a5b4fc" }}>
                      ★ PREMIUM
                    </span>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>

        {/* Scroll indicator */}
        <div className="hero-scroll-ind absolute bottom-7 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5 pointer-events-none"
          style={{ opacity: 0 }}>
          <span className="text-[10px] tracking-widest uppercase font-medium text-white/40">Scroll</span>
          <ChevronDown size={14} className="animate-bounce text-white/40" />
        </div>
      </div>
    </section>
  );
}
