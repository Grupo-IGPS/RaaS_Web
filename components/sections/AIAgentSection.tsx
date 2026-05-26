"use client";

import { useState } from "react";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { Badge } from "@/components/ui/Badge";
import { Bot, Send, User } from "lucide-react";

const initialMessages = [
  {
    role: "ai" as const,
    content: "Hola, soy el Ingeniero IA de RaaS by IGPS. ¿Qué proceso industrial quieres automatizar?",
  },
];

const suggestedQuestions = [
  "¿Cómo funciona el modelo RaaS?",
  "Quiero automatizar mi paletizado",
  "¿Cuál es el tiempo de implementación?",
  "Necesito información sobre cobots",
];

const mockResponses: Record<string, string> = {
  paletizado:
    "Perfecto. Para el paletizado, necesito saber: ¿qué producto manipulas y cuál es el peso máximo por unidad? ¿Cuántos formatos de caja/pallet utilizas? Eso me permitirá recomendarte el cobot y gripper correcto.",
  raas: "El modelo RaaS (Robotics as a Service) te permite implementar automatización sin CAPEX inicial. Pagas una tarifa mensual que incluye robot, integración, mantenimiento y soporte. El contrato es flexible y puedes escalar según tu producción.",
  implementacion:
    "El tiempo varía según complejidad: desde 4 semanas para una celda simple hasta 12-16 semanas para una línea completa. Antes de comprometerte, realizamos una simulación gratuita del proceso.",
  cobot:
    "Los cobots son robots colaborativos diseñados para trabajar junto a personas de forma segura. Universal Robots es la marca más usada. Para darte una recomendación precisa, ¿cuánto peso necesitas manejar y cuál es la cadencia actual del proceso?",
};

export function AIAgentSection() {
  const [messages, setMessages] =
    useState<{ role: "ai" | "user"; content: string }[]>(initialMessages);
  const [input, setInput] = useState("");

  const handleSend = (text?: string) => {
    const userMsg = text || input;
    if (!userMsg.trim()) return;

    setMessages((prev) => [...prev, { role: "user", content: userMsg }]);
    setInput("");

    // Simple keyword matching for demo
    const lower = userMsg.toLowerCase();
    let response =
      "Entiendo. Para darte la mejor recomendación, ¿podrías contarme más sobre tu proceso? Por ejemplo: ¿qué producto manipulas, cuál es el peso aproximado y cuántos turnos opera tu planta?";

    for (const [key, resp] of Object.entries(mockResponses)) {
      if (lower.includes(key)) {
        response = resp;
        break;
      }
    }

    setTimeout(() => {
      setMessages((prev) => [...prev, { role: "ai", content: response }]);
    }, 600);
  };

  return (
    <section className="relative py-28 overflow-hidden"
      style={{ background: "linear-gradient(135deg, hsl(224 50% 7%) 0%, hsl(224 45% 10%) 100%)" }}>

      <div className="absolute inset-0 pointer-events-none opacity-20"
        style={{
          backgroundImage: "linear-gradient(to right, rgba(108,122,224,0.08) 1px, transparent 1px), linear-gradient(to bottom, rgba(108,122,224,0.08) 1px, transparent 1px)",
          backgroundSize: "64px 64px",
        }} />

      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] pointer-events-none"
        style={{ background: "radial-gradient(ellipse at center, rgba(108, 122, 224, 0.08) 0%, transparent 70%)" }} />

      <div className="relative mx-auto max-w-5xl px-6">
        <ScrollReveal from="bottom" className="text-center mb-12">
          <Badge variant="label" className="mb-4" style={{ color: "#a5b4fc" }}>
            IA consultiva
          </Badge>
          <h2 className="heading-premium text-4xl md:text-5xl text-white mb-4">
            Habla con nuestro{" "}
            <span style={{
              background: "linear-gradient(135deg, #6C7AE0 0%, #a5b4fc 100%)",
              WebkitBackgroundClip: "text", backgroundClip: "text", color: "transparent"
            }}>
              Ingeniero IA
            </span>
          </h2>
          <p className="text-white/55 text-lg max-w-xl mx-auto">
            Cuéntanos tu proceso. Nuestro agente IA hace el pre-levantamiento técnico y te conecta con el especialista correcto.
          </p>
        </ScrollReveal>

        <ScrollReveal from="bottom" delay={0.15}>
          <div className="rounded-4xl overflow-hidden"
            style={{
              background: "rgba(255,255,255,0.03)",
              border: "1px solid rgba(108,122,224,0.2)",
              backdropFilter: "blur(12px)",
            }}>

            {/* Chat header */}
            <div className="px-6 py-4 border-b flex items-center gap-3"
              style={{ borderColor: "rgba(108,122,224,0.15)", background: "rgba(108,122,224,0.06)" }}>
              <div className="w-9 h-9 rounded-full flex items-center justify-center"
                style={{ background: "linear-gradient(135deg, #2D3193 0%, #6C7AE0 100%)" }}>
                <Bot size={18} className="text-white" />
              </div>
              <div>
                <p className="text-white text-sm font-semibold">Ingeniero IA — RaaS by IGPS</p>
                <div className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  <span className="text-white/40 text-xs">En línea</span>
                </div>
              </div>
            </div>

            {/* Messages */}
            <div className="p-6 space-y-4 min-h-[280px] max-h-[340px] overflow-y-auto">
              {messages.map((msg, i) => (
                <div key={i} className={`flex gap-3 ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
                  {msg.role === "ai" && (
                    <div className="w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5"
                      style={{ background: "linear-gradient(135deg, #2D3193 0%, #6C7AE0 100%)" }}>
                      <Bot size={13} className="text-white" />
                    </div>
                  )}
                  <div
                    className="max-w-[80%] px-4 py-3 rounded-2xl text-sm leading-relaxed"
                    style={msg.role === "ai"
                      ? { background: "rgba(108,122,224,0.12)", border: "1px solid rgba(108,122,224,0.2)", color: "rgba(255,255,255,0.85)" }
                      : { background: "linear-gradient(135deg, #2D3193 0%, #6C7AE0 100%)", color: "white" }
                    }
                  >
                    {msg.content}
                  </div>
                  {msg.role === "user" && (
                    <div className="w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 bg-white/10">
                      <User size={13} className="text-white/70" />
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Suggested questions */}
            <div className="px-6 pb-3 flex flex-wrap gap-2">
              {suggestedQuestions.map((q) => (
                <button
                  key={q}
                  onClick={() => handleSend(q)}
                  className="text-xs px-3 py-1.5 rounded-full transition-all duration-200 hover:scale-105"
                  style={{
                    background: "rgba(108,122,224,0.1)",
                    border: "1px solid rgba(108,122,224,0.2)",
                    color: "#a5b4fc",
                  }}
                >
                  {q}
                </button>
              ))}
            </div>

            {/* Input */}
            <div className="px-6 pb-6">
              <div className="flex gap-3 items-center rounded-2xl p-3"
                style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(108,122,224,0.15)" }}>
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleSend()}
                  placeholder="Describe tu proceso o haz una pregunta..."
                  className="flex-1 bg-transparent text-white/80 text-sm placeholder:text-white/25 focus:outline-none"
                />
                <button
                  onClick={() => handleSend()}
                  className="w-8 h-8 rounded-xl flex items-center justify-center transition-all duration-200 hover:scale-110 flex-shrink-0"
                  style={{ background: "linear-gradient(135deg, #2D3193 0%, #6C7AE0 100%)" }}
                  aria-label="Enviar mensaje"
                >
                  <Send size={14} className="text-white" />
                </button>
              </div>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
