"use client";

import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { Badge } from "@/components/ui/Badge";

const technologies = [
  { name: "Universal Robots", category: "Cobots" },
  { name: "KUKA", category: "Robots industriales" },
  { name: "Fanuc", category: "Robots industriales" },
  { name: "ABB", category: "Robots industriales" },
  { name: "Doosan", category: "Cobots" },
  { name: "Unitree", category: "Humanoides" },
  { name: "Cognex", category: "Visión artificial" },
  { name: "Keyence", category: "Sensores / Visión" },
  { name: "OnRobot", category: "Grippers" },
  { name: "Zimmer", category: "Grippers" },
  { name: "MiR", category: "AMR" },
  { name: "RoboDK", category: "Simulación" },
];

export function PartnersSection() {
  return (
    <section className="relative py-24 bg-background overflow-hidden">
      <div className="absolute inset-0 bg-grid opacity-30 pointer-events-none" />

      <div className="relative mx-auto max-w-7xl px-6">
        <ScrollReveal from="bottom" className="text-center mb-14">
          <Badge variant="label" className="mb-4">
            Plataforma multimarca
          </Badge>
          <h2 className="heading-premium text-3xl md:text-4xl text-text mb-4">
            La tecnología correcta para{" "}
            <span className="text-gradient">cada proceso</span>
          </h2>
          <p className="text-text-muted max-w-xl mx-auto">
            No atamos a nuestros clientes a una sola marca. Seleccionamos la mejor tecnología disponible para cada necesidad industrial específica.
          </p>
        </ScrollReveal>

        <ScrollReveal from="bottom" delay={0.15}>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
            {technologies.map((tech) => (
              <div
                key={tech.name}
                className="card-adaptive flex flex-col items-center justify-center text-center p-4 gap-2 group hover:-translate-y-0.5 transition-all duration-200 cursor-default"
              >
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center mb-1 transition-transform duration-300 group-hover:scale-110"
                  style={{
                    background: "hsl(var(--color-accent) / 0.08)",
                    border: "1px solid hsl(var(--color-accent) / 0.15)",
                  }}
                >
                  <span className="text-lg font-black text-accent leading-none">
                    {tech.name.charAt(0)}
                  </span>
                </div>
                <p className="text-xs font-bold text-text leading-tight">{tech.name}</p>
                <p className="text-[10px] text-text-subtle">{tech.category}</p>
              </div>
            ))}
          </div>
        </ScrollReveal>

        <ScrollReveal from="bottom" delay={0.25} className="text-center mt-10">
          <p className="text-text-subtle text-sm">
            ¿Tu proceso requiere una tecnología específica?{" "}
            <a href="/#contacto" className="text-accent hover:underline font-medium" style={{ color: "#6C7AE0" }}>
              Consultanos
            </a>
          </p>
        </ScrollReveal>
      </div>
    </section>
  );
}
