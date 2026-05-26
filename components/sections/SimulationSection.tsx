"use client";

import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { Badge } from "@/components/ui/Badge";
import { Monitor, CheckCircle, Clock, Shield, BarChart2, ArrowRight } from "lucide-react";

const benefits = [
  { icon: Shield, label: "0 riesgo de implementación" },
  { icon: Clock, label: "Reducción de tiempo de puesta en marcha" },
  { icon: BarChart2, label: "Optimización de tiempos de ciclo previa" },
  { icon: CheckCircle, label: "Validación de alcance y factibilidad" },
];

export function SimulationSection() {
  return (
    <section className="relative py-28 bg-background overflow-hidden">
      <div className="absolute inset-0 bg-grid opacity-40 pointer-events-none" />

      <div className="relative mx-auto max-w-7xl px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left: content */}
          <div>
            <ScrollReveal from="left">
              <Badge variant="label" className="mb-4">
                Digital Twins
              </Badge>
              <h2 className="heading-premium text-4xl md:text-5xl text-text mb-6">
                Simula antes de{" "}
                <span className="text-gradient">implementar</span>
              </h2>
              <p className="text-lg text-text-muted leading-relaxed mb-8">
                Antes de comprometer inversión, simulamos tu proceso completo en entorno digital. Validamos layout, tiempos de ciclo, alcance del robot, ergonomía y factibilidad técnica sin riesgo.
              </p>

              <ul className="space-y-4 mb-10">
                {benefits.map((b) => {
                  const Icon = b.icon;
                  return (
                    <li key={b.label} className="flex items-center gap-3">
                      <div
                        className="w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0"
                        style={{
                          background: "hsl(var(--color-accent) / 0.12)",
                          border: "1px solid hsl(var(--color-accent) / 0.2)",
                        }}
                      >
                        <Icon size={15} style={{ color: "#6C7AE0" }} />
                      </div>
                      <span className="text-text-muted text-sm font-medium">{b.label}</span>
                    </li>
                  );
                })}
              </ul>

              <a
                href="/#contacto"
                className="inline-flex items-center gap-2 text-accent font-semibold text-sm hover:gap-3 transition-all duration-200"
                style={{ color: "#6C7AE0" }}
              >
                Solicitar simulación de mi proceso
                <ArrowRight size={16} />
              </a>
            </ScrollReveal>
          </div>

          {/* Right: visual mockup */}
          <ScrollReveal from="right" delay={0.15}>
            <div
              className="relative rounded-4xl overflow-hidden"
              style={{
                background: "linear-gradient(135deg, hsl(224 50% 7%) 0%, hsl(224 45% 12%) 100%)",
                border: "1px solid rgba(108, 122, 224, 0.2)",
                boxShadow: "0 0 60px rgba(108, 122, 224, 0.08)",
              }}
            >
              {/* Mock simulation UI */}
              <div className="p-6">
                {/* Header bar */}
                <div className="flex items-center gap-2 mb-5">
                  <div className="flex gap-1.5">
                    <div className="w-3 h-3 rounded-full bg-red-500/70" />
                    <div className="w-3 h-3 rounded-full bg-yellow-500/70" />
                    <div className="w-3 h-3 rounded-full bg-emerald-500/70" />
                  </div>
                  <span className="text-xs text-white/40 ml-2 font-mono">
                    RaaS Simulation Engine v2.1
                  </span>
                </div>

                {/* Viewport */}
                <div
                  className="aspect-video rounded-2xl mb-4 flex items-center justify-center relative overflow-hidden"
                  style={{
                    background: "rgba(255,255,255,0.02)",
                    border: "1px solid rgba(108,122,224,0.1)",
                  }}
                >
                  {/* Grid floor */}
                  <div
                    className="absolute inset-0"
                    style={{
                      backgroundImage:
                        "linear-gradient(to right, rgba(108,122,224,0.07) 1px, transparent 1px), linear-gradient(to bottom, rgba(108,122,224,0.07) 1px, transparent 1px)",
                      backgroundSize: "32px 32px",
                    }}
                  />

                  {/* Stylized robot arm icon */}
                  <div className="relative z-10 flex flex-col items-center gap-3">
                    <Monitor
                      size={48}
                      style={{ color: "#6C7AE0", opacity: 0.7 }}
                    />
                    <span className="text-white/40 text-xs font-mono">
                      Simulación en progreso...
                    </span>
                  </div>

                  {/* Corner data overlays */}
                  <div className="absolute top-3 right-3 text-[10px] font-mono text-white/30 text-right">
                    <div>Ciclo: 4.2s</div>
                    <div>Alcance: 94%</div>
                  </div>
                  <div className="absolute bottom-3 left-3 text-[10px] font-mono text-white/30">
                    <div>Layout: VALIDADO</div>
                  </div>
                </div>

                {/* Metrics row */}
                <div className="grid grid-cols-3 gap-3">
                  {[
                    { label: "Tiempo ciclo", value: "4.2s" },
                    { label: "Throughput", value: "857/h" },
                    { label: "Factibilidad", value: "Alta" },
                  ].map((m) => (
                    <div
                      key={m.label}
                      className="rounded-xl p-3 text-center"
                      style={{
                        background: "rgba(108,122,224,0.08)",
                        border: "1px solid rgba(108,122,224,0.15)",
                      }}
                    >
                      <p className="text-white font-bold text-sm">{m.value}</p>
                      <p className="text-white/40 text-[10px] mt-0.5">{m.label}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
