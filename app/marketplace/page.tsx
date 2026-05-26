"use client";

import { useState, useMemo } from "react";
import { Badge } from "@/components/ui/Badge";
import { MarketplaceCard } from "@/components/marketplace/MarketplaceCard";
import { marketplaceSolutions, marketplaceCategories } from "@/lib/marketplace-data";
import { Search } from "lucide-react";

export default function MarketplacePage() {
  const [activeCategory, setActiveCategory] = useState("Todos");
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    return marketplaceSolutions.filter((sol) => {
      const matchCat =
        activeCategory === "Todos" || sol.category === activeCategory;
      const matchQ =
        !query ||
        sol.title.toLowerCase().includes(query.toLowerCase()) ||
        sol.description.toLowerCase().includes(query.toLowerCase()) ||
        sol.category.toLowerCase().includes(query.toLowerCase());
      return matchCat && matchQ;
    });
  }, [activeCategory, query]);

  return (
    <div className="min-h-screen bg-background pt-24 pb-28">
      {/* Hero */}
      <div className="relative py-16 overflow-hidden"
        style={{ background: "linear-gradient(135deg, hsl(224 50% 7%) 0%, hsl(224 45% 12%) 100%)" }}>
        <div className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage: "linear-gradient(to right, rgba(108,122,224,0.06) 1px, transparent 1px), linear-gradient(to bottom, rgba(108,122,224,0.06) 1px, transparent 1px)",
            backgroundSize: "64px 64px",
          }} />
        <div className="relative mx-auto max-w-4xl px-6 text-center">
          <Badge variant="label" className="mb-4" style={{ color: "#a5b4fc" }}>
            Solution Marketplace
          </Badge>
          <h1 className="heading-premium text-4xl md:text-5xl lg:text-6xl text-white mb-6">
            Soluciones industriales{" "}
            <span style={{
              background: "linear-gradient(135deg, #6C7AE0 0%, #a5b4fc 100%)",
              WebkitBackgroundClip: "text", backgroundClip: "text", color: "transparent"
            }}>
              listas para operar
            </span>
          </h1>
          <p className="text-white/55 text-lg max-w-xl mx-auto">
            Explora nuestro catálogo de soluciones robóticas bajo modelos flexibles. Compara, cotiza y adapta a tu proceso.
          </p>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-6 mt-10">
        {/* Search + filters */}
        <div className="flex flex-col sm:flex-row gap-4 mb-8">
          <div className="relative flex-1 max-w-md">
            <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-text-subtle" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Buscar soluciones..."
              className="w-full pl-10 pr-4 py-2.5 rounded-xl text-sm bg-surface border border-border text-text placeholder:text-text-subtle focus:outline-none focus:border-accent/40 transition-colors"
              style={{ "--tw-ring-color": "#6C7AE0" } as React.CSSProperties}
            />
          </div>

          <div className="flex flex-wrap gap-2">
            {marketplaceCategories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-2 rounded-full text-xs font-semibold transition-all duration-200 ${
                  activeCategory === cat
                    ? "text-white"
                    : "border border-border text-text-muted hover:text-text hover:border-accent/30 bg-surface"
                }`}
                style={
                  activeCategory === cat
                    ? { background: "linear-gradient(135deg, #09116A 0%, #2D3193 100%)" }
                    : undefined
                }
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Results count */}
        <p className="text-text-subtle text-sm mb-6">
          {filtered.length} solución{filtered.length !== 1 ? "es" : ""} encontrada{filtered.length !== 1 ? "s" : ""}
          {activeCategory !== "Todos" && ` en "${activeCategory}"`}
        </p>

        {/* Grid */}
        {filtered.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {filtered.map((sol) => (
              <MarketplaceCard key={sol.id} solution={sol} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <p className="text-text-muted text-lg mb-2">No se encontraron soluciones</p>
            <p className="text-text-subtle text-sm">
              Intenta con otra categoría o{" "}
              <a href="/#contacto" className="text-accent hover:underline" style={{ color: "#6C7AE0" }}>
                contacta a un especialista
              </a>
            </p>
          </div>
        )}

        {/* Bottom CTA */}
        <div className="mt-16 text-center">
          <p className="text-text-muted mb-4">
            ¿No encuentras lo que necesitas? Diseñamos soluciones a medida.
          </p>
          <a
            href="/#contacto"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-full text-white font-semibold transition-all hover:opacity-90 hover:scale-[1.02]"
            style={{ background: "linear-gradient(135deg, #09116A 0%, #2D3193 100%)" }}
          >
            Solicitar solución personalizada
          </a>
        </div>
      </div>
    </div>
  );
}
