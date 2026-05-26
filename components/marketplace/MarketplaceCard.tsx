"use client";

import { useState } from "react";
import {
  Package, Crosshair, Zap, Settings, Eye, Truck, Bot, Monitor,
  ChevronRight, X, CheckCircle
} from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import type { SolutionCard } from "@/types";

const iconMap: Record<string, React.ElementType> = {
  Package, Crosshair, Zap, Settings, Eye, Truck, Bot, Monitor,
};

interface MarketplaceCardProps {
  solution: SolutionCard;
}

export function MarketplaceCard({ solution }: MarketplaceCardProps) {
  const [expanded, setExpanded] = useState(false);
  const Icon = iconMap[solution.icon] || Package;

  return (
    <>
      <div
        className="card-adaptive flex flex-col h-full overflow-hidden group cursor-pointer hover:-translate-y-1 hover:shadow-soft transition-all duration-300"
        onClick={() => setExpanded(true)}
      >
        {/* Gradient bar */}
        <div className={`h-1.5 w-full bg-gradient-to-r ${solution.gradient}`} />

        <div className="p-5 flex flex-col gap-4 flex-1">
          {/* Header */}
          <div className="flex items-start gap-3">
            <div className={`w-11 h-11 rounded-xl flex items-center justify-center bg-gradient-to-br ${solution.gradient} flex-shrink-0`}>
              <Icon size={20} className="text-white" />
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="font-bold text-text text-sm leading-snug mb-1">{solution.title}</h3>
              <Badge variant="accent" className="text-[10px] px-2 py-0.5">{solution.category}</Badge>
            </div>
          </div>

          {/* Description */}
          <p className="text-xs text-text-muted leading-relaxed flex-1">
            {solution.description}
          </p>

          {/* Benefits preview */}
          <div className="space-y-1.5">
            {solution.benefits.slice(0, 2).map((b) => (
              <div key={b} className="flex items-center gap-2">
                <CheckCircle size={12} className="text-emerald-500 flex-shrink-0" />
                <span className="text-xs text-text-muted">{b}</span>
              </div>
            ))}
          </div>

          {/* Industries */}
          <div className="flex flex-wrap gap-1.5">
            {solution.industries.slice(0, 2).map((ind) => (
              <span key={ind} className="text-[10px] px-2 py-0.5 rounded-full border border-border bg-surface text-text-subtle">
                {ind}
              </span>
            ))}
            {solution.industries.length > 2 && (
              <span className="text-[10px] px-2 py-0.5 rounded-full border border-border bg-surface text-text-subtle">
                +{solution.industries.length - 2}
              </span>
            )}
          </div>

          {/* Modalities */}
          <div className="flex flex-wrap gap-1.5">
            {solution.modalities.map((m) => (
              <Badge key={m} variant="primary" className="text-[10px] px-2 py-0.5">{m}</Badge>
            ))}
          </div>

          {/* CTA */}
          <div className="flex items-center gap-2 pt-1">
            <button
              className="flex-1 py-2.5 rounded-xl text-xs font-semibold text-white transition-all duration-200 hover:opacity-90"
              style={{ background: "linear-gradient(135deg, #09116A 0%, #2D3193 100%)" }}
              onClick={(e) => { e.stopPropagation(); setExpanded(true); }}
            >
              Cotizar solución
            </button>
            <button
              className="p-2.5 rounded-xl border border-border text-text-muted hover:text-accent transition-colors"
              onClick={(e) => { e.stopPropagation(); setExpanded(true); }}
              aria-label="Ver detalles"
            >
              <ChevronRight size={14} />
            </button>
          </div>
        </div>
      </div>

      {/* Detail panel modal */}
      {expanded && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4"
          style={{ background: "rgba(0,0,0,0.7)", backdropFilter: "blur(8px)" }}
          onClick={() => setExpanded(false)}>
          <div
            className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-4xl"
            style={{ background: "hsl(var(--color-surface))", border: "1px solid hsl(var(--color-border))" }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className={`h-2 w-full bg-gradient-to-r ${solution.gradient} rounded-t-4xl`} />
            <div className="p-8">
              <div className="flex items-start justify-between gap-4 mb-6">
                <div className="flex items-center gap-4">
                  <div className={`w-14 h-14 rounded-2xl flex items-center justify-center bg-gradient-to-br ${solution.gradient}`}>
                    <Icon size={26} className="text-white" />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-text">{solution.title}</h2>
                    <Badge variant="accent">{solution.category}</Badge>
                  </div>
                </div>
                <button onClick={() => setExpanded(false)}
                  className="p-2 rounded-xl hover:bg-surface transition-colors text-text-muted hover:text-text">
                  <X size={20} />
                </button>
              </div>

              <p className="text-text-muted mb-6 leading-relaxed">{solution.description}</p>

              <div className="grid grid-cols-2 gap-6 mb-6">
                <div>
                  <h4 className="text-xs font-semibold uppercase tracking-widest text-text-subtle mb-3">Beneficios</h4>
                  <ul className="space-y-2">
                    {solution.benefits.map((b) => (
                      <li key={b} className="flex items-center gap-2 text-sm text-text-muted">
                        <CheckCircle size={14} className="text-emerald-500 flex-shrink-0" />
                        {b}
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h4 className="text-xs font-semibold uppercase tracking-widest text-text-subtle mb-3">Componentes</h4>
                  <ul className="space-y-2">
                    {solution.components.map((c) => (
                      <li key={c} className="flex items-center gap-2 text-sm text-text-muted">
                        <span className="w-1.5 h-1.5 rounded-full bg-accent flex-shrink-0" style={{ background: "#6C7AE0" }} />
                        {c}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="mb-6">
                <h4 className="text-xs font-semibold uppercase tracking-widest text-text-subtle mb-3">Industrias</h4>
                <div className="flex flex-wrap gap-2">
                  {solution.industries.map((ind) => (
                    <span key={ind} className="text-xs px-3 py-1 rounded-full border border-border text-text-muted bg-surface">
                      {ind}
                    </span>
                  ))}
                </div>
              </div>

              <div className="flex gap-3">
                <a href="/#contacto"
                  className="flex-1 py-3.5 rounded-2xl text-white font-semibold text-sm text-center transition-all hover:opacity-90"
                  style={{ background: "linear-gradient(135deg, #09116A 0%, #2D3193 100%)" }}
                  onClick={() => setExpanded(false)}>
                  Cotizar esta solución
                </a>
                <a href="/#contacto"
                  className="px-6 py-3.5 rounded-2xl font-semibold text-sm border border-border text-text-muted hover:text-text transition-colors"
                  onClick={() => setExpanded(false)}>
                  Evaluar aplicación
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
