# RaaS_Web — Grupo IGPS

Sitio web y plataforma **RaaS (Robotics as a Service)** de Grupo IGPS.
Next.js 14 (App Router) + TypeScript + Tailwind + Supabase + integración con Odoo.

---

## 1. Requisitos

| Herramienta | Versión | Descarga |
|---|---|---|
| Node.js | 20 LTS | https://nodejs.org |
| pnpm | 9+ | `npm install -g pnpm` |
| Git | 2.40+ | https://git-scm.com |

## 2. Puesta en marcha (primera vez)

```bash
git clone https://github.com/Grupo-IGPS/RaaS_Web.git
cd RaaS_Web
pnpm install
cp .env.example .env.local   # y rellena los valores
pnpm dev                     # http://localhost:3000
```

> `.env.local` **nunca** se sube al repositorio (está en `.gitignore`).
> Si añades una variable nueva, agrégala también a `.env.example` **sin el valor**.

## 3. Comandos

| Comando | Qué hace |
|---|---|
| `pnpm dev` | Servidor de desarrollo |
| `pnpm build` | Build de producción |
| `pnpm start` | Sirve el build |
| `pnpm lint` | ESLint |
| `pnpm type-check` | Verifica tipos de TypeScript |

**Antes de cada commit importante:** `pnpm lint && pnpm type-check && pnpm build`

## 4. Estructura del proyecto

```
app/                    Rutas (App Router de Next.js)
  page.tsx              Landing
  dashboard/            Dashboard de cliente
  marketplace/          Marketplace de robots
components/
  layout/               Header, Footer, providers (tema, Lenis)
  sections/             Secciones de la landing (Hero, CTA, etc.)
  marketplace/          Componentes del marketplace
  ui/                   Componentes reutilizables (Button, Card, Badge...)
hooks/                  Hooks de React
lib/                    Utilidades y datos mock (gsap, utils, *-data.ts)
services/
  supabase/             Cliente de Supabase
  odoo/                 Integración con Odoo (CRM / ventas)
types/                  Tipos TypeScript compartidos
public/ · fotogramas/   Assets estáticos
docs/                   Documentación del equipo
```

## 5. Trabajo en equipo

Este repositorio lo mantienen **dos personas en paralelo**:

| Persona | Rama de trabajo | Rol en Git |
|---|---|---|
| Fabián | `dev/fabian` | Revisa y aprueba los merges a `main` |
| Andrés | `dev/andres` | Abre Pull Request y espera la confirmación de Fabián |

👉 **El flujo diario completo está en [`docs/FLUJO-DE-TRABAJO.md`](docs/FLUJO-DE-TRABAJO.md).**
👉 Las reglas (commits, ramas, PRs) están en [`CONTRIBUTING.md`](CONTRIBUTING.md).

### Ramas

```
main            Producción. Protegida. Solo entra código por Pull Request aprobado.
 └─ develop     Integración. Aquí se juntan y se prueban los trabajos de ambos.
     ├─ dev/fabian    Rama de Fabián
     └─ dev/andres    Rama de Andrés
```
