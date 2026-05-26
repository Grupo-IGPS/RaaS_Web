import { mockMetrics, mockAssets, mockServiceTimeline } from "@/lib/dashboard-data";
import {
  TrendingUp,
  TrendingDown,
  Minus,
  CheckCircle,
  AlertCircle,
  Clock,
  Wrench,
  Activity,
  Package,
  RefreshCw,
  Settings,
  AlertTriangle,
  Download,
  Bell,
  LayoutDashboard,
  Bot,
  FileText,
  BarChart2,
  ChevronRight,
} from "lucide-react";
import { Badge } from "@/components/ui/Badge";

function MetricCard({
  label,
  value,
  unit,
  delta,
  trend,
}: {
  label: string;
  value: string | number;
  unit?: string;
  delta?: number;
  trend: "up" | "down" | "flat";
}) {
  const TrendIcon = trend === "up" ? TrendingUp : trend === "down" ? TrendingDown : Minus;
  const trendColor =
    trend === "up"
      ? "text-emerald-500"
      : trend === "down"
      ? "text-red-400"
      : "text-text-subtle";

  return (
    <div className="card-adaptive p-6">
      <p className="text-xs font-semibold uppercase tracking-widest text-text-subtle mb-3">
        {label}
      </p>
      <div className="flex items-end gap-2 mb-2">
        <span className="text-3xl font-black text-text leading-none">{value}</span>
        {unit && <span className="text-text-muted text-sm mb-0.5">{unit}</span>}
      </div>
      {delta !== undefined && (
        <div className={`flex items-center gap-1 ${trendColor}`}>
          <TrendIcon size={13} />
          <span className="text-xs font-semibold">
            {trend !== "flat" && (trend === "up" ? "+" : "-")}
            {Math.abs(delta)}% vs mes anterior
          </span>
        </div>
      )}
    </div>
  );
}

const statusConfig = {
  active: { label: "Activo", color: "text-emerald-500", bg: "bg-emerald-500/10 border-emerald-500/20", dot: "bg-emerald-500" },
  maintenance: { label: "Mantenimiento", color: "text-amber-500", bg: "bg-amber-500/10 border-amber-500/20", dot: "bg-amber-500" },
  idle: { label: "En espera", color: "text-text-subtle", bg: "bg-border/30 border-border", dot: "bg-text-subtle" },
  alert: { label: "Alerta", color: "text-red-400", bg: "bg-red-500/10 border-red-500/20", dot: "bg-red-500" },
};

const eventTypeConfig = {
  installation: { icon: Package, color: "text-blue-400", bg: "bg-blue-400/10" },
  maintenance: { icon: Wrench, color: "text-amber-400", bg: "bg-amber-400/10" },
  upgrade: { icon: RefreshCw, color: "text-indigo-400", bg: "bg-indigo-400/10" },
  incident: { icon: AlertTriangle, color: "text-red-400", bg: "bg-red-400/10" },
  optimization: { icon: Activity, color: "text-emerald-400", bg: "bg-emerald-400/10" },
};

export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-background pt-16 flex">
      {/* Sidebar */}
      <aside className="hidden lg:flex flex-col w-60 border-r border-border bg-surface/30 fixed left-0 top-16 bottom-0 overflow-y-auto">
        <div className="p-5">
          <div className="flex items-center gap-2 mb-6">
            <div className="w-8 h-8 rounded-lg flex items-center justify-center"
              style={{ background: "linear-gradient(135deg, #09116A 0%, #2D3193 100%)" }}>
              <Bot size={15} className="text-white" />
            </div>
            <div>
              <p className="text-xs font-bold text-text">Portal Cliente</p>
              <p className="text-[10px] text-text-subtle">RaaS by IGPS</p>
            </div>
          </div>

          <nav className="space-y-1">
            {[
              { icon: LayoutDashboard, label: "Overview", active: true },
              { icon: Bot, label: "Mis Activos", active: false },
              { icon: Activity, label: "Telemetría", active: false },
              { icon: Settings, label: "Mis Servicios", active: false },
              { icon: FileText, label: "Solicitudes", active: false },
              { icon: BarChart2, label: "Reportes", active: false },
            ].map((item) => {
              const Icon = item.icon;
              return (
                <div
                  key={item.label}
                  className={`flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-sm font-medium transition-all cursor-pointer ${
                    item.active
                      ? "text-white"
                      : "text-text-muted hover:text-text hover:bg-surface"
                  }`}
                  style={item.active ? { background: "linear-gradient(135deg, #09116A 0%, #2D3193 100%)" } : undefined}
                >
                  <Icon size={16} />
                  {item.label}
                </div>
              );
            })}
          </nav>
        </div>

        <div className="mt-auto p-5 border-t border-border">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-full bg-accent/20 flex items-center justify-center"
              style={{ background: "hsl(var(--color-accent) / 0.15)" }}>
              <span className="text-xs font-bold" style={{ color: "#6C7AE0" }}>CL</span>
            </div>
            <div>
              <p className="text-xs font-semibold text-text">Cliente IGPS</p>
              <p className="text-[10px] text-text-subtle">Plan RaaS Anual</p>
            </div>
          </div>
        </div>
      </aside>

      {/* Main content */}
      <main className="flex-1 lg:ml-60 p-6 lg:p-8">
        {/* Page header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-black text-text tracking-tight">Dashboard</h1>
            <p className="text-text-subtle text-sm mt-0.5">
              Última actualización: hoy 09:15 AM
            </p>
          </div>
          <div className="flex items-center gap-3">
            <button className="p-2 rounded-xl border border-border text-text-muted hover:text-text transition-colors relative">
              <Bell size={18} />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-red-500" />
            </button>
            <button className="flex items-center gap-1.5 px-4 py-2 rounded-xl border border-border text-text-muted text-sm hover:text-text transition-colors">
              <Download size={14} />
              Exportar
            </button>
          </div>
        </div>

        {/* Metrics */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {mockMetrics.map((metric) => (
            <MetricCard key={metric.label} {...metric} />
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Assets */}
          <div className="lg:col-span-2">
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-bold text-text">Mis Activos</h2>
              <button className="text-xs text-accent hover:underline flex items-center gap-1" style={{ color: "#6C7AE0" }}>
                Ver todos <ChevronRight size={12} />
              </button>
            </div>
            <div className="space-y-3">
              {mockAssets.map((asset) => {
                const status = statusConfig[asset.status];
                return (
                  <div key={asset.id} className="card-adaptive p-5 flex items-center gap-4">
                    <div
                      className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                      style={{ background: "hsl(var(--color-accent) / 0.1)", border: "1px solid hsl(var(--color-accent) / 0.15)" }}
                    >
                      <Bot size={18} style={{ color: "#6C7AE0" }} />
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-0.5">
                        <p className="font-semibold text-text text-sm truncate">{asset.name}</p>
                        <span className={`inline-flex items-center gap-1 text-[10px] font-semibold px-2 py-0.5 rounded-full border ${status.bg} ${status.color}`}>
                          <span className={`w-1.5 h-1.5 rounded-full ${status.dot}`} />
                          {status.label}
                        </span>
                      </div>
                      <p className="text-xs text-text-subtle">{asset.type}</p>
                    </div>

                    <div className="hidden sm:flex items-center gap-6 text-right flex-shrink-0">
                      <div>
                        <p className="text-sm font-bold text-text">{asset.uptimePercent}%</p>
                        <p className="text-[10px] text-text-subtle">Uptime</p>
                      </div>
                      <div>
                        <p className="text-sm font-bold text-text">{asset.cyclesTotal.toLocaleString()}</p>
                        <p className="text-[10px] text-text-subtle">Ciclos</p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Timeline */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-bold text-text">Actividad de Servicio</h2>
            </div>
            <div className="card-adaptive p-5 space-y-4">
              {mockServiceTimeline.map((event, i) => {
                const config = eventTypeConfig[event.type];
                const EventIcon = config.icon;
                return (
                  <div key={event.id} className="flex gap-3">
                    <div className="flex flex-col items-center">
                      <div className={`w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0 ${config.bg}`}>
                        <EventIcon size={14} className={config.color} />
                      </div>
                      {i < mockServiceTimeline.length - 1 && (
                        <div className="w-px flex-1 mt-2 bg-border" />
                      )}
                    </div>
                    <div className="pb-4 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-[10px] text-text-subtle">{event.date}</span>
                        {!event.resolved && (
                          <Badge variant="danger" className="text-[9px] px-1.5 py-0">Pendiente</Badge>
                        )}
                      </div>
                      <p className="text-xs text-text-muted leading-snug">{event.description}</p>
                      {event.technician && (
                        <p className="text-[10px] text-text-subtle mt-1">{event.technician}</p>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Simulated telemetry */}
        <div className="mt-8">
          <h2 className="font-bold text-text mb-4">Telemetría Simulada</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { label: "UR10e — Eficiencia", value: 99.1, color: "emerald" },
              { label: "UR5e — Eficiencia", value: 97.4, color: "blue" },
              { label: "UR16e — Eficiencia", value: 88.2, color: "amber" },
              { label: "AMR Flexi — Eficiencia", value: 95.6, color: "indigo" },
            ].map((item) => (
              <div key={item.label} className="card-adaptive p-5">
                <p className="text-xs text-text-subtle mb-3">{item.label}</p>
                <div className="relative h-2 bg-surface rounded-full overflow-hidden mb-2">
                  <div
                    className="absolute left-0 top-0 h-full rounded-full transition-all duration-500"
                    style={{
                      width: `${item.value}%`,
                      background: `linear-gradient(90deg, #2D3193, #6C7AE0)`,
                    }}
                  />
                </div>
                <p className="text-lg font-black text-text">{item.value}%</p>
              </div>
            ))}
          </div>
        </div>

        {/* Notice */}
        <div className="mt-8 p-5 rounded-2xl border border-border bg-surface/30 flex items-start gap-3">
          <AlertCircle size={18} style={{ color: "#6C7AE0" }} className="flex-shrink-0 mt-0.5" />
          <div>
            <p className="text-sm font-semibold text-text mb-0.5">Vista de demostración</p>
            <p className="text-xs text-text-muted leading-relaxed">
              Este dashboard muestra datos simulados. La versión productiva se conectará a Supabase y al sistema de telemetría de los activos RaaS instalados en tu planta.
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}
