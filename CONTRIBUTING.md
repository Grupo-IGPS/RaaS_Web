# Reglas de colaboración — RaaS_Web

> El **paso a paso diario** está en [`docs/FLUJO-DE-TRABAJO.md`](docs/FLUJO-DE-TRABAJO.md).
> Este documento son las **reglas** del repositorio.

## 1. Ramas

| Rama | Para qué | Quién escribe |
|---|---|---|
| `main` | Producción. Siempre desplegable. | Nadie directamente — solo merges de PR aprobados |
| `develop` | Integración: aquí se juntan y prueban los trabajos | Nadie directamente — solo merges de PR aprobados |
| `dev/fabian` | Trabajo diario de Fabián | Fabián |
| `dev/andres` | Trabajo diario de Andrés | Andrés |

Reglas:
- Nunca se hace `commit` directo a `main` ni a `develop`.
- Nunca se hace `git push --force` a `main` ni a `develop`.
- Cada quien hace `push` libremente **a su propia rama** (es su respaldo).
- Para tareas grandes y separadas se puede abrir una rama temporal:
  `feat/andres/filtros-marketplace`, `fix/fabian/header-movil`.

## 2. Commits

Formato: `tipo(zona): descripción en presente`

```
feat(marketplace): agrega filtro por categoría de robot
fix(header): corrige menú móvil que no cerraba
style(hero): ajusta espaciado en breakpoint md
refactor(odoo): extrae mapeo de leads a función propia
docs(readme): documenta variables de entorno
chore(deps): actualiza next a 14.2.35
```

Tipos: `feat` · `fix` · `style` · `refactor` · `docs` · `chore` · `wip` (trabajo a medias, solo en tu rama personal).

Un commit = un cambio con sentido. Mejor 5 commits pequeños que 1 gigante.

## 3. Pull Requests

- **base `develop`** ← **compare `dev/tu-nombre`**. De `develop` a `main` solo lo hace Fabián.
- Rellena la plantilla del PR.
- Asigna a **Fabián** como *Reviewer*.
- Antes de abrirlo debe pasar: `pnpm lint && pnpm type-check && pnpm build`.
- **Andrés no hace merge de sus propios PRs.** Espera la aprobación de Fabián; él ejecuta el merge.
- Método de merge: **Squash and merge**.
- Un PR debería tocar como máximo ~10 archivos. Si es más grande, divídelo.

## 4. Qué NO se sube al repositorio

- `.env`, `.env.local` ni ninguna clave, token o contraseña.
- `node_modules/`, `.next/`, `out/`.
- Archivos personales del editor o del sistema operativo.

Si añades una variable de entorno, documéntala en `.env.example` **vacía**.

## 5. Código

- TypeScript en todo (`.ts` / `.tsx`), sin `any` salvo justificación.
- Componentes en `PascalCase.tsx`; hooks en `useAlgo.ts`; utilidades en `kebab-case.ts`.
- Tipos compartidos en `types/index.ts`.
- Estilos con Tailwind; usa los tokens ya definidos en `tailwind.config.ts` antes de inventar colores.
- Importa con el alias `@/` (ej. `@/components/ui/Button`).

## 6. Archivos compartidos — avisar antes de tocar

`components/layout/Header.tsx`, `components/layout/Footer.tsx`, `app/globals.css`,
`tailwind.config.ts`, `types/index.ts`, `package.json`, `pnpm-lock.yaml`.

Son los que más conflictos generan: manda un mensaje al otro antes de modificarlos.
