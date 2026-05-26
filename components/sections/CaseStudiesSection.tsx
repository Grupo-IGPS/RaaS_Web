"use client";

import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { Badge } from "@/components/ui/Badge";
import { TrendingUp } from "lucide-react";

const cases = [
  {
    category: "Paletizado",
    title: "Productora de alimentos reduce dependencia de mano de obra en turno nocturno",
    problem: "3 operarios por turno, alto ausentismo, 15% de errores de palletizado.",
    solution: "Cobot UR20 con gripper neumático y mesa de paletizado custom para 3 formatos.",
    impact: [
      { metric: "+43%", label: "Productividad" },
      { metric: "99.2%", label: "Uptime" },
      { metric: "0", label: "Errores de formato" },
    ],
    tech: ["UR20", "Gripper neumático", "Software RaaS"],
    industry: "Alimentos y Bebidas",
  },
  {
    category: "Visión IA",
    title: "Laboratorio farmacéutico implementa inspección 100% automatizada de blísters",
    problem: "Inspección visual manual con 0.8% escape de defectos y trazabilidad limitada.",
    solution: "Sistema de visión 2D/3D con IA entrenada en defectos de línea, integrado al MES.",
    impact: [
      { metric: "99.8%", label: "Detección" },
      { metric: "100%", label: "Trazabilidad" },
      { metric: "-0.8%", label: "Tasa de escape" },
    ],
    tech: ["Cámara Cognex", "IA Custom", "Dashboard calidad"],
    industry: "Farmacéutico",
  },
  {
    category: "Machine Tending",
    title: "Planta metalmecánica libera operarios de turno de carga/descarga CNC",
    problem: "4 operarios exclusivos para alimentar tornos CNC, imposible escalar sin contratar.",
    solution: "Cobot UR10e con interface CNC vía IO integrado a 2 máquinas simultáneamente.",
    impact: [
      { metric: "2:1", label: "Máquinas/operario" },
      { metric: "+55%", label: "Throughput" },
      { metric: "12 sem", label: "ROI inicial" },
    ],
    tech: ["UR10e", "Interfaz CNC", "Gripper eléctrico"],
    industry: "Metalmecánica",
  },
];

export function CaseStudiesSection() {
  return (
    <section className="relative py-28 bg-surface/30 overflow-hidden">
      <div className="absolute inset-0 bg-grid opacity-30 pointer-events-none" />

      <div className="relative mx-auto max-w-7xl px-6">
        <ScrollReveal from="bottom" className="text-center mb-16">
          <Badge variant="label" className="mb-4">
            Resultados comprobados
          </Badge>
          <h2 className="heading-premium text-4xl md:text-5xl lg:text-6xl text-text mb-6">
            Automatización que{" "}
            <span className="text-gradient">transforma</span>
          </h2>
          <p className="text-lg text-text-muted max-w-2xl mx-auto">
            Casos reales de procesos industriales que pasaron de manuales a automatizados bajo el modelo RaaS.
          </p>
        </ScrollReveal>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {cases.map((c, i) => (
            <ScrollReveal key={c.title} from="bottom" delay={i * 0.1} duration={0.7}>
              <div className="card-adaptive h-full flex flex-col overflow-hidden group hover:-translate-y-1 hover:shadow-soft transition-all duration-300">
                <div className="p-6 flex-1 flex flex-col gap-4">
                  <div className="flex items-center justify-between gap-2">
                    <Badge variant="accent">{c.category}</Badge>
                    <span className="text-xs text-text-subtle">{c.industry}</span>
                  </div>

                  <h3 className="font-bold text-text text-sm leading-snug">
                    {c.title}
                  </h3>

                  <div>
                    <p className="text-xs text-text-subtle mb-1 font-semibold uppercase tracking-wide">
                      Problema
                    </p>
                    <p className="text-xs text-text-muted leading-relaxed">{c.problem}</p>
                  </div>

                  <div>
                    <p className="text-xs text-text-subtle mb-1 font-semibold uppercase tracking-wide">
                      Solución
                    </p>
                    <p className="text-xs text-text-muted leading-relaxed">{c.solution}</p>
                  </div>

                  {/* Metrics */}
                  <div className="grid grid-cols-3 gap-2 mt-auto">
                    {c.impact.map((imp) => (
                      <div
                        key={imp.label}
                        className="text-center p-3 rounded-2xl"
                        style={{
                          background: "hsl(var(--color-accent) / 0.06)",
                          border: "1px solid hsl(var(--color-accent) / 0.12)",
                        }}
                      >
                        <p className="font-black text-base text-text">{imp.metric}</p>
                        <p className="text-[10px] text-text-subtle mt-0.5">{imp.label}</p>
                      </div>
                    ))}
                  </div>

                  {/* Tech stack */}
                  <div className="flex flex-wrap gap-1.5">
                    {c.tech.map((t) => (
                      <span
                        key={t}
                        className="text-[10px] px-2 py-0.5 rounded-full border border-border text-text-subtle bg-surface"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>

                <div
                  className="px-6 py-4 border-t border-border flex items-center gap-2"
                  style={{ background: "hsl(var(--color-surface) / 0.5)" }}
                >
                  <TrendingUp size={14} className="text-emerald-500" />
                  <span className="text-xs text-emerald-600 dark:text-emerald-400 font-semibold">
                    Implementado bajo modelo RaaS IGPS
                  </span>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
