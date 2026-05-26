import Link from "next/link";

const footerLinks = {
  Soluciones: [
    { label: "Paletizado", href: "/marketplace?cat=Paletizado" },
    { label: "Pick & Place", href: "/marketplace?cat=Pick+%26+Place" },
    { label: "Soldadura", href: "/marketplace?cat=Soldadura" },
    { label: "Machine Tending", href: "/marketplace?cat=Machine+Tending" },
    { label: "Visión IA", href: "/marketplace?cat=Visión+IA" },
    { label: "Logística AMR", href: "/marketplace?cat=Logística+AMR" },
  ],
  Empresa: [
    { label: "Sobre IGPS", href: "https://www.grupo-igps.cl", external: true },
    { label: "Cómo funciona RaaS", href: "/#como-funciona" },
    { label: "Marketplace", href: "/marketplace" },
    { label: "Dashboard clientes", href: "/dashboard" },
  ],
  Contacto: [
    { label: "Evaluar mi proceso", href: "/#contacto" },
    { label: "Solicitar PoC", href: "/#contacto" },
    { label: "Hablar con especialista", href: "/#contacto" },
    { label: "freyes@grupo-igps.com", href: "mailto:freyes@grupo-igps.com" },
  ],
};

export function Footer() {
  return (
    <footer className="border-t border-border bg-surface/30">
      <div className="mx-auto max-w-7xl px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-2.5 mb-4">
              <div className="w-8 h-8 rounded-lg flex items-center justify-center"
                style={{ background: "linear-gradient(135deg, #09116A 0%, #2D3193 100%)" }}>
                <span className="text-white font-black text-xs">RI</span>
              </div>
              <div className="leading-none">
                <p className="text-[10px] font-semibold tracking-[0.2em] uppercase text-text-subtle">RaaS</p>
                <p className="text-sm font-bold text-text">by IGPS</p>
              </div>
            </div>
            <p className="text-sm text-text-muted leading-relaxed mb-4">
              Robótica, Inteligencia Artificial y Automatización Industrial como Servicio para la industria LATAM.
            </p>
            <p className="text-xs text-text-subtle">
              Grupo IGPS — Ingeniería Avanzada Industrial
            </p>
          </div>

          {/* Links */}
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h4 className="text-xs font-semibold tracking-[0.2em] uppercase text-text-subtle mb-4">
                {category}
              </h4>
              <ul className="space-y-2.5">
                {links.map((link) => (
                  <li key={link.label}>
                    {"external" in link && link.external ? (
                      <a
                        href={link.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm text-text-muted hover:text-text transition-colors duration-200"
                      >
                        {link.label}
                      </a>
                    ) : (
                      <Link
                        href={link.href}
                        className="text-sm text-text-muted hover:text-text transition-colors duration-200"
                      >
                        {link.label}
                      </Link>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 pt-6 border-t border-border flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-text-subtle">
            © 2026 Grupo IGPS. Todos los derechos reservados.
          </p>
          <div className="flex items-center gap-1.5">
            <span className="inline-block w-2 h-2 rounded-full bg-emerald-500 animate-pulse-slow" />
            <span className="text-xs text-text-subtle">Plataforma activa</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
