import type { MetricSnapshot, AssetStatus, ServiceEvent } from "@/types";

export const mockMetrics: MetricSnapshot[] = [
  { label: "Eficiencia promedio", value: 94.2, unit: "%", delta: 2.1, trend: "up" },
  { label: "Horas operadas (mes)", value: 687, unit: "h", delta: 8.4, trend: "up" },
  { label: "Ciclos completados", value: 128430, unit: "ciclos", delta: 12.3, trend: "up" },
  { label: "Uptime de flota", value: 98.7, unit: "%", delta: 0.3, trend: "flat" },
];

export const mockAssets: AssetStatus[] = [
  {
    id: "a1",
    name: "UR10e — Línea A",
    type: "Cobot",
    status: "active",
    uptimePercent: 99.1,
    cyclesTotal: 54200,
    lastActivity: "2026-05-17T08:32:00Z",
  },
  {
    id: "a2",
    name: "UR5e — Célula CNC",
    type: "Célula robotizada",
    status: "active",
    uptimePercent: 97.4,
    cyclesTotal: 31800,
    lastActivity: "2026-05-17T08:45:00Z",
  },
  {
    id: "a3",
    name: "UR16e — Paletizado",
    type: "Cobot",
    status: "maintenance",
    uptimePercent: 88.2,
    cyclesTotal: 42430,
    lastActivity: "2026-05-16T14:00:00Z",
  },
  {
    id: "a4",
    name: "AMR Flexi — Logística",
    type: "Robot móvil",
    status: "active",
    uptimePercent: 95.6,
    cyclesTotal: 18900,
    lastActivity: "2026-05-17T09:10:00Z",
  },
];

export const mockServiceTimeline: ServiceEvent[] = [
  {
    id: "s1",
    date: "2026-05-17",
    type: "incident",
    description: "Alerta: vibración inusual detectada en UR16e J4 — revisión programada",
    resolved: false,
  },
  {
    id: "s2",
    date: "2026-05-15",
    type: "optimization",
    description: "Ajuste de trayectoria UR10e para reducir tiempo de ciclo en 12%",
    technician: "Ing. Martínez",
    resolved: true,
  },
  {
    id: "s3",
    date: "2026-05-10",
    type: "maintenance",
    description: "Revisión preventiva UR16e — cambio de lubricante articulación 3",
    technician: "Ing. Ramírez",
    resolved: true,
  },
  {
    id: "s4",
    date: "2026-04-28",
    type: "upgrade",
    description: "Actualización firmware UR5e a versión 5.14",
    technician: "Soporte RaaS IGPS",
    resolved: true,
  },
  {
    id: "s5",
    date: "2026-04-15",
    type: "installation",
    description: "Puesta en marcha AMR Flexi — calibración de ruta y señalética",
    technician: "Equipo IGPS",
    resolved: true,
  },
];
