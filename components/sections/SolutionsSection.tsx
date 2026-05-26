"use client";

import Link from "next/link";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { Badge } from "@/components/ui/Badge";
import { ChevronRight, Package, Crosshair, Zap, Settings, Eye, Truck, Bot, Monitor } from "lucide-react";

const solutions = [
  {
    icon: Package,
    title: "Paletizado como Servicio",
    description: "Automatiza tu palletizado sin grandes inversiones iniciales. Cobots de alta carga adaptados a tu formato.",
    tags: ["Alimentos", "Retail", "Manufactura"],
    gradient: "from-blue-700 to-blue-900",
    metric: "+40% productividad",
  },
  {
    icon: Crosshair,
    title: "Pick & Place con Visión IA",
    description: "Selección y posicionamiento de alta cadencia con visión artificial integrada para cero errores.",
    tags: ["Electrónica", "Farmacéutico"],
    gradient: "from-indigo-700 to-purple-800",
    metric: "±0.1mm precisión",
  },
  {
    icon: Zap,
    title: "Soldadura Robotizada",
    description: "Celdas de soldadura MIG/TIG multimarca. Calidad constante y trazabilidad de cada cordón.",
    tags: ["Metalmecánica", "Automotriz"],
    gradient: "from-orange-600 to-red-700",
    metric: "+60% producción",
  },
  {
    icon: Settings,
    title: "Machine Tending Autónomo",
    description: "Alimentación y descarga autónoma de CNC, inyectoras y prensas. Opera los 3 turnos.",
    tags: ["Manufactura", "Plásticos"],
    gradient: "from-cyan-700 to-blue-800",
    metric: "3 turnos sin operario",
  },
  {
    icon: Eye,
    title: "Inspección con Visión Artificial",
    description: "Control de calidad 100% automatizado con IA en línea. Detección >99.5% de defectos.",
    tags: ["Farmacéutico", "Alimentos"],
    gradient: "from-emerald-600 to-teal-700",
    metric: ">99.5% detección",
  },
  {
    icon: Truck,
    title: "Logística AMR Interna",
    description: "Robots móviles autónomos para transporte interno integrados con tu WMS actual.",
    tags: ["Logística", "E-commerce"],
    gradient: "from-violet-700 to-indigo-800",
    metric: "Sin modificar planta",
  },
  {
    icon: Bot,
    title: "Humanoides en Producción",
    description: "Robots humanoides de última generación para tareas complejas sin rediseñar tu línea.",
    tags: ["Manufactura avanzada"],
    gradient: "from-slate-700 to-zinc-900",
    metric: "Adaptación rápida",
  },
  {
    icon: Monitor,
    title: "Digital Twin & Simulación",
    description: "Simula tu proceso antes de implementar. Valida layout, tiempos de ciclo y factibilidad sin riesgo.",
    tags: ["Todos los sectores"],
    gradient: "from-primary to-secondary",
    metric: "0 riesgo previo",
  },
];

export function SolutionsSection() {
  return (
    <section className="relative py-28 bg-background overflow-hidden">
      <div className="absolute inset-0 bg-grid opacity-40 pointer-events-none" />

      <div className="relative mx-auto max-w-7xl px-6">
        <ScrollReveal from="bottom" className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-16">
          <div>
            <Badge variant="label" className="mb-4">
              Portafolio de soluciones
            </Badge>
            <h2 className="heading-premium text-4xl md:text-5xl lg:text-6xl text-text">
              Soluciones listas para{" "}
              <span className="text-gradient">operar</span>
            </h2>
          </div>
          <Link
            href="/marketplace"
            className="inline-flex items-center gap-1.5 text-accent font-semibold text-sm whitespace-nowrap hover:gap-2.5 transition-all duration-200"
          >
            Ver marketplace completo
            <ChevronRight size={16} />
          </Link>
        </ScrollReveal>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {solutions.map((sol, i) => {
            const Icon = sol.icon;
            return (
              <ScrollReveal
                key={sol.title}
                from="bottom"
                delay={i * 0.06}
                duration={0.65}
              >
                <div className="card-adaptive group overflow-hidden h-full flex flex-col cursor-pointer hover:-translate-y-1.5 hover:shadow-soft transition-all duration-300">
                  {/* Gradient top bar */}
                  <div
                    className={`h-1.5 w-full bg-gradient-to-r ${sol.gradient}`}
                  />

                  <div className="p-5 flex flex-col gap-3 flex-1">
                    <div className="flex items-start justify-between gap-2">
                      <div
                        className={`w-10 h-10 rounded-xl flex items-center justify-center bg-gradient-to-br ${sol.gradient} flex-shrink-0`}
                      >
                        <Icon size={18} className="text-white" />
                      </div>
                      <span className="text-xs font-semibold text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 border border-emerald-500/15 rounded-full px-2 py-0.5 whitespace-nowrap">
                        {sol.metric}
                      </span>
                    </div>

                    <div className="flex-1">
                      <h3 className="font-bold text-text text-sm leading-snug mb-2">
                        {sol.title}
                      </h3>
                      <p className="text-xs text-text-muted leading-relaxed">
                        {sol.description}
                      </p>
                    </div>

                    <div className="flex flex-wrap gap-1.5 mt-auto">
                      {sol.tags.map((tag) => (
                        <span
                          key={tag}
                          className="text-[10px] px-2 py-0.5 rounded-full border border-border bg-surface text-text-subtle"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </ScrollReveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
