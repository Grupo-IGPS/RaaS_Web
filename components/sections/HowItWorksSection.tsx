"use client";

import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { Badge } from "@/components/ui/Badge";
import {
  Search,
  FlaskConical,
  FileText,
  Wrench,
  Activity,
  HeartHandshake,
} from "lucide-react";

const steps = [
  {
    number: "01",
    icon: Search,
    title: "Diagnóstico técnico",
    description:
      "Analizamos tu proceso con detalle: cadencias, pesos, restricciones y objetivos. Sin costo inicial.",
  },
  {
    number: "02",
    icon: FlaskConical,
    title: "Simulación & PoC",
    description:
      "Simulamos tu proceso en entorno digital. Si aplica, realizamos una prueba de concepto en tu planta antes de comprometer inversión.",
  },
  {
    number: "03",
    icon: FileText,
    title: "Propuesta técnica",
    description:
      "Entregamos una propuesta detallada con tecnología seleccionada, layout, tiempos de ciclo y modelo de servicio.",
  },
  {
    number: "04",
    icon: Wrench,
    title: "Implementación",
    description:
      "Nuestro equipo integra la solución completa: robot, periféricos, programación, seguridad y capacitación.",
  },
  {
    number: "05",
    icon: Activity,
    title: "Operación",
    description:
      "La solución opera en tu proceso. Monitoreo remoto, métricas en tiempo real y respaldo técnico inmediato.",
  },
  {
    number: "06",
    icon: HeartHandshake,
    title: "Soporte continuo",
    description:
      "Mantenimiento preventivo, actualizaciones y soporte de ingeniería incluidos durante toda la vida del contrato.",
  },
];

export function HowItWorksSection() {
  return (
    <section
      id="como-funciona"
      className="relative py-28 overflow-hidden"
      style={{
        background:
          "linear-gradient(135deg, hsl(224 50% 7%) 0%, hsl(224 45% 10%) 100%)",
      }}
    >
      {/* Grid overlay */}
      <div
        className="absolute inset-0 pointer-events-none opacity-20"
        style={{
          backgroundImage:
            "linear-gradient(to right, rgba(108,122,224,0.08) 1px, transparent 1px), linear-gradient(to bottom, rgba(108,122,224,0.08) 1px, transparent 1px)",
          backgroundSize: "64px 64px",
        }}
      />

      {/* Radial glow */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at center, rgba(108, 122, 224, 0.12) 0%, transparent 70%)",
        }}
      />

      <div className="relative mx-auto max-w-7xl px-6">
        <ScrollReveal from="bottom" className="text-center mb-16">
          <Badge variant="label" className="mb-4" style={{ color: "#a5b4fc" }}>
            Metodología RaaS
          </Badge>
          <h2 className="heading-premium text-4xl md:text-5xl lg:text-6xl text-white mb-6">
            Del diagnóstico a la{" "}
            <span
              style={{
                background: "linear-gradient(135deg, #6C7AE0 0%, #a5b4fc 100%)",
                WebkitBackgroundClip: "text",
                backgroundClip: "text",
                color: "transparent",
              }}
            >
              operación
            </span>
          </h2>
          <p className="text-lg text-white/60 max-w-2xl mx-auto">
            No vendemos robots. Entregamos procesos automatizados listos para operar, bajo un modelo flexible sin CAPEX elevado.
          </p>
        </ScrollReveal>

        {/* Steps grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {steps.map((step, i) => {
            const Icon = step.icon;
            return (
              <ScrollReveal
                key={step.number}
                from="bottom"
                delay={i * 0.08}
                duration={0.7}
              >
                <div
                  className="relative p-6 rounded-3xl h-full flex flex-col gap-4 group hover:-translate-y-1 transition-all duration-300"
                  style={{
                    background: "rgba(255,255,255,0.04)",
                    border: "1px solid rgba(108,122,224,0.15)",
                    backdropFilter: "blur(8px)",
                  }}
                >
                  {/* Number */}
                  <span
                    className="absolute top-5 right-5 text-5xl font-black leading-none select-none pointer-events-none"
                    style={{ color: "rgba(108,122,224,0.12)" }}
                  >
                    {step.number}
                  </span>

                  {/* Icon */}
                  <div
                    className="w-12 h-12 rounded-2xl flex items-center justify-center transition-transform duration-300 group-hover:scale-110"
                    style={{
                      background: "linear-gradient(135deg, rgba(45,49,147,0.6) 0%, rgba(108,122,224,0.4) 100%)",
                      border: "1px solid rgba(108,122,224,0.3)",
                    }}
                  >
                    <Icon size={22} className="text-accent" style={{ color: "#a5b4fc" }} />
                  </div>

                  <div>
                    <h3 className="text-white font-bold text-lg mb-2">{step.title}</h3>
                    <p className="text-white/55 text-sm leading-relaxed">
                      {step.description}
                    </p>
                  </div>
                </div>
              </ScrollReveal>
            );
          })}
        </div>

        {/* Bottom CTA */}
        <ScrollReveal from="bottom" delay={0.5} className="text-center mt-14">
          <p className="text-white/40 text-sm mb-6 tracking-wide">
            Tiempo promedio desde diagnóstico hasta operación: 4–12 semanas
          </p>
          <a
            href="/#contacto"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-full font-semibold text-white transition-all duration-300 hover:scale-[1.03]"
            style={{
              background: "linear-gradient(135deg, #2D3193 0%, #6C7AE0 100%)",
              boxShadow: "0 8px 32px rgba(108, 122, 224, 0.3)",
            }}
          >
            Iniciar diagnóstico gratuito
          </a>
        </ScrollReveal>
      </div>
    </section>
  );
}
