"use client";

import { useState } from "react";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { Badge } from "@/components/ui/Badge";
import { ChevronRight, Mail, Phone, Calendar, CheckCircle } from "lucide-react";
import { submitContactRequest } from "@/services/odoo/odooService";
import type { ContactRequest } from "@/types";

export function CTASection() {
  const [form, setForm] = useState<Partial<ContactRequest>>({
    urgency: "medium",
  });
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.company || !form.message) return;
    setLoading(true);
    await submitContactRequest(form as ContactRequest);
    setSent(true);
    setLoading(false);
  };

  return (
    <section id="contacto" className="relative py-28 overflow-hidden"
      style={{ background: "linear-gradient(135deg, hsl(224 50% 7%) 0%, hsl(228 85% 13%) 100%)" }}>

      <div className="absolute inset-0 pointer-events-none opacity-20"
        style={{
          backgroundImage: "linear-gradient(to right, rgba(108,122,224,0.08) 1px, transparent 1px), linear-gradient(to bottom, rgba(108,122,224,0.08) 1px, transparent 1px)",
          backgroundSize: "64px 64px",
        }} />

      {/* Radial glow */}
      <div className="absolute top-0 right-1/4 w-[600px] h-[600px] pointer-events-none"
        style={{ background: "radial-gradient(ellipse at center, rgba(45,49,147,0.2) 0%, transparent 70%)" }} />

      <div className="relative mx-auto max-w-6xl px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

          {/* Left */}
          <ScrollReveal from="left">
            <Badge variant="label" className="mb-6" style={{ color: "#a5b4fc" }}>
              Comienza hoy
            </Badge>
            <h2 className="heading-premium text-4xl md:text-5xl lg:text-6xl text-white mb-6">
              Evalúa tu proceso.{" "}
              <span style={{
                background: "linear-gradient(135deg, #6C7AE0 0%, #a5b4fc 100%)",
                WebkitBackgroundClip: "text", backgroundClip: "text", color: "transparent"
              }}>
                Sin compromiso.
              </span>
            </h2>
            <p className="text-white/60 text-lg leading-relaxed mb-10">
              Nuestro equipo de ingeniería analiza tu proceso, identifica oportunidades de automatización y te presenta una propuesta en menos de 5 días hábiles.
            </p>

            <div className="space-y-4 mb-10">
              {[
                "Diagnóstico técnico sin costo",
                "Propuesta en 5 días hábiles",
                "Simulación incluida si aplica",
                "Sin compromiso de contratación",
              ].map((item) => (
                <div key={item} className="flex items-center gap-3">
                  <CheckCircle size={18} className="text-emerald-400 flex-shrink-0" />
                  <span className="text-white/70 text-sm">{item}</span>
                </div>
              ))}
            </div>

            <div className="flex flex-col gap-3">
              <a href="mailto:freyes@grupo-igps.com"
                className="inline-flex items-center gap-2.5 text-white/50 hover:text-white/80 transition-colors text-sm">
                <Mail size={16} />
                freyes@grupo-igps.com
              </a>
              <a href="tel:+56912345678"
                className="inline-flex items-center gap-2.5 text-white/50 hover:text-white/80 transition-colors text-sm">
                <Phone size={16} />
                +56 9 XXXX XXXX
              </a>
              <a href="https://calendly.com" target="_blank" rel="noopener noreferrer"
                className="inline-flex items-center gap-2.5 text-white/50 hover:text-white/80 transition-colors text-sm">
                <Calendar size={16} />
                Agendar reunión online
              </a>
            </div>
          </ScrollReveal>

          {/* Right: form */}
          <ScrollReveal from="right" delay={0.15}>
            <div className="rounded-4xl p-8"
              style={{
                background: "rgba(255,255,255,0.04)",
                border: "1px solid rgba(108,122,224,0.2)",
                backdropFilter: "blur(12px)",
              }}>

              {sent ? (
                <div className="flex flex-col items-center justify-center py-12 text-center gap-4">
                  <div className="w-16 h-16 rounded-full bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center">
                    <CheckCircle size={32} className="text-emerald-400" />
                  </div>
                  <h3 className="text-white font-bold text-xl">¡Mensaje enviado!</h3>
                  <p className="text-white/50 text-sm">
                    Nuestro equipo te contactará en menos de 24 horas hábiles.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <h3 className="text-white font-bold text-lg mb-6">Solicitar evaluación de proceso</h3>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-white/50 text-xs mb-1.5 block">Nombre *</label>
                      <input
                        type="text"
                        required
                        value={form.name || ""}
                        onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
                        className="w-full px-4 py-2.5 rounded-xl text-sm text-white bg-transparent focus:outline-none transition-colors"
                        style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(108,122,224,0.2)" }}
                        placeholder="Tu nombre"
                      />
                    </div>
                    <div>
                      <label className="text-white/50 text-xs mb-1.5 block">Empresa *</label>
                      <input
                        type="text"
                        required
                        value={form.company || ""}
                        onChange={(e) => setForm((f) => ({ ...f, company: e.target.value }))}
                        className="w-full px-4 py-2.5 rounded-xl text-sm text-white bg-transparent focus:outline-none"
                        style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(108,122,224,0.2)" }}
                        placeholder="Empresa"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-white/50 text-xs mb-1.5 block">Email corporativo *</label>
                    <input
                      type="email"
                      required
                      value={form.email || ""}
                      onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
                      className="w-full px-4 py-2.5 rounded-xl text-sm text-white bg-transparent focus:outline-none"
                      style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(108,122,224,0.2)" }}
                      placeholder="tu@empresa.com"
                    />
                  </div>

                  <div>
                    <label className="text-white/50 text-xs mb-1.5 block">Describe tu proceso o consulta *</label>
                    <textarea
                      required
                      rows={4}
                      value={form.message || ""}
                      onChange={(e) => setForm((f) => ({ ...f, message: e.target.value }))}
                      className="w-full px-4 py-2.5 rounded-xl text-sm text-white bg-transparent focus:outline-none resize-none"
                      style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(108,122,224,0.2)" }}
                      placeholder="Ej: Queremos automatizar nuestro paletizado final de línea, manejamos cajas de 12kg..."
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full py-3.5 rounded-2xl font-semibold text-white text-sm transition-all duration-300 hover:opacity-90 hover:scale-[1.01] disabled:opacity-60 flex items-center justify-center gap-2"
                    style={{ background: "linear-gradient(135deg, #2D3193 0%, #6C7AE0 100%)" }}
                  >
                    {loading ? "Enviando..." : "Solicitar evaluación gratuita"}
                    {!loading && <ChevronRight size={16} />}
                  </button>

                  <p className="text-white/25 text-xs text-center">
                    Sin compromiso. Respondemos en menos de 24h hábiles.
                  </p>
                </form>
              )}
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
