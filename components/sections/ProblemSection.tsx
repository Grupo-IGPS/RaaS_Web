"use client";

import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { Badge } from "@/components/ui/Badge";
import {
  Package,
  Crosshair,
  Zap,
  Settings,
  Eye,
  Truck,
  Bot,
  ScanLine,
  BoxSelect,
  Shield,
  BarChart2,
  Layers,
} from "lucide-react";

const processes = [
  {
    icon: Package,
    title: "Paletizado",
    problem: "Turnos repetitivos con alta ergonomía y errores frecuentes",
    solution: "Cobot de alta carga con gripper adaptable a tu formato",
    benefit: "3 turnos sin operario, productividad +40%",
  },
  {
    icon: Crosshair,
    title: "Pick & Place",
    problem: "Selección manual lenta y con alta tasa de error",
    solution: "Robot con visión artificial para selección de alta cadencia",
    benefit: "Precisión ±0.1mm, >500 ppm sin errores",
  },
  {
    icon: Zap,
    title: "Soldadura",
    problem: "Calidad variable y riesgo ergonómico permanente",
    solution: "Celda robotizada MIG/TIG con trazabilidad de cordón",
    benefit: "Calidad homogénea certificada, producción +60%",
  },
  {
    icon: Settings,
    title: "Machine Tending",
    problem: "Operario dedicado 100% a alimentar máquina CNC",
    solution: "Cobot que alimenta y descarga en los 3 turnos",
    benefit: "Operador libre para tareas de mayor valor",
  },
  {
    icon: Eye,
    title: "Inspección IA",
    problem: "Inspección visual humana lenta con alta tasa de escape",
    solution: "Sistema de visión con IA para detección en línea",
    benefit: "Detección >99.5%, trazabilidad completa",
  },
  {
    icon: Truck,
    title: "Logística Interna",
    problem: "Operarios moviendo material manualmente por toda la planta",
    solution: "AMRs autónomos integrados con tu WMS existente",
    benefit: "Rutas dinámicas, sin modificar infraestructura",
  },
  {
    icon: Bot,
    title: "Humanoides",
    problem: "Tareas complejas que requieren adaptación constante",
    solution: "Robots humanoides de última generación en planta",
    benefit: "Adaptación sin rediseñar layout ni jigs",
  },
  {
    icon: ScanLine,
    title: "Visión Artificial",
    problem: "Clasificación manual de productos sin trazabilidad",
    solution: "Sistema de visión 2D/3D con clasificación IA",
    benefit: "Clasificación a 100% sin error, datos en tiempo real",
  },
  {
    icon: BoxSelect,
    title: "Fin de Línea",
    problem: "Embalaje y fin de línea con alta variabilidad",
    solution: "Celda robotizada flexible para packaging multiformato",
    benefit: "Cambio de formato en minutos, no horas",
  },
  {
    icon: Shield,
    title: "Control de Calidad",
    problem: "Muestreo manual insuficiente para garantizar calidad",
    solution: "Inspección 100% automatizada con cámara + IA",
    benefit: "Cero defectos al cliente, reportería automática",
  },
  {
    icon: BarChart2,
    title: "Manipulación de Cargas",
    problem: "Riesgo ergonómico elevado en levantamiento de pesos",
    solution: "Exoesqueleto o cobot asistente según tu proceso",
    benefit: "Reducción de ausentismo y TMERT comprobada",
  },
  {
    icon: Layers,
    title: "Packaging",
    problem: "Embalaje manual como cuello de botella de producción",
    solution: "Celda automatizada para enfardado, flejado o sellado",
    benefit: "Capacidad x3 sin agregar turnos extra",
  },
];

export function ProblemSection() {
  return (
    <section id="soluciones" className="relative py-28 bg-background overflow-hidden">
      <div className="absolute inset-0 bg-grid opacity-60 pointer-events-none" />

      <div className="relative mx-auto max-w-7xl px-6">
        <ScrollReveal from="bottom" className="text-center mb-16">
          <Badge variant="label" className="mb-4">
            Diagnóstico de proceso
          </Badge>
          <h2 className="heading-premium text-4xl md:text-5xl lg:text-6xl text-text mb-6">
            ¿Qué proceso quieres{" "}
            <span className="text-gradient">automatizar?</span>
          </h2>
          <p className="text-lg text-text-muted max-w-2xl mx-auto">
            Selecciona el proceso industrial que representa tu mayor desafío operacional y te mostramos cómo lo resolvemos.
          </p>
        </ScrollReveal>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {processes.map((process, i) => {
            const Icon = process.icon;
            return (
              <ScrollReveal
                key={process.title}
                from="bottom"
                delay={i * 0.04}
                duration={0.6}
              >
                <div
                  className="card-adaptive p-5 h-full flex flex-col gap-3 group cursor-pointer hover:-translate-y-1 hover:shadow-soft transition-all duration-300"
                >
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 transition-transform duration-300 group-hover:scale-110"
                    style={{
                      background: "linear-gradient(135deg, #09116A 0%, #2D3193 100%)",
                    }}
                  >
                    <Icon size={18} className="text-white" />
                  </div>

                  <div>
                    <h3 className="font-bold text-text text-sm mb-1">{process.title}</h3>
                    <p className="text-xs text-text-subtle leading-relaxed mb-2">
                      {process.problem}
                    </p>
                  </div>

                  <div className="mt-auto space-y-1.5">
                    <p className="text-xs text-text-muted leading-relaxed">
                      <span className="font-semibold text-accent">Solución: </span>
                      {process.solution}
                    </p>
                    <div className="flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 flex-shrink-0" />
                      <p className="text-xs text-emerald-600 dark:text-emerald-400 font-semibold">
                        {process.benefit}
                      </p>
                    </div>
                  </div>
                </div>
              </ScrollReveal>
            );
          })}
        </div>

        <ScrollReveal from="bottom" delay={0.3} className="text-center mt-12">
          <a
            href="/#contacto"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-full text-white font-semibold text-base transition-all duration-300 hover:opacity-90 hover:scale-[1.02]"
            style={{ background: "linear-gradient(135deg, #09116A 0%, #2D3193 100%)" }}
          >
            Evaluar mi proceso específico
          </a>
        </ScrollReveal>
      </div>
    </section>
  );
}
