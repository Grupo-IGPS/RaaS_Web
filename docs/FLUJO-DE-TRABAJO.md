# Flujo de trabajo diario — RaaS_Web

Guía práctica para **Andrés** y **Fabián**. Si tienes dudas, sigue esta página al pie de la letra.

---

## 0. Configuración (SOLO la primera vez, una vez por computador)

```bash
git config --global user.name "Tu Nombre"
git config --global user.email "tucorreo@grupo-igps.com"
git config --global pull.rebase true      # historial limpio al hacer pull
git config --global init.defaultBranch main
```

Clonar el proyecto y bajarte tu rama:

```bash
git clone https://github.com/Grupo-IGPS/RaaS_Web.git
cd RaaS_Web
pnpm install
cp .env.example .env.local

# Fabián:
git switch dev/fabian
# Andrés:
git switch dev/andres
```

Comprueba en qué rama estás en cualquier momento:

```bash
git branch --show-current
```

> ⚠️ **Nunca trabajes directamente en `main` ni en `develop`.** Siempre en tu propia rama.

---

## 1. 🌅 Al llegar en la mañana — SINCRONIZAR

Objetivo: empezar el día con el trabajo del otro ya incorporado.

```bash
# 1. Asegúrate de no tener cambios sueltos
git status

# 2. Sitúate en tu rama
git switch dev/andres          # o dev/fabian

# 3. Trae todo lo que hay en GitHub
git fetch --all --prune

# 4. Actualiza tu rama con lo último de develop
git pull origin develop

# 5. Instala dependencias si alguien añadió alguna
pnpm install
```

Si el paso 4 dice `CONFLICT` → ve a la **sección 6 (Conflictos)**.

---

## 2. 💻 Durante el día — TRABAJAR

1. Escribe tu código.
2. Prueba en local con `pnpm dev`.
3. **Guarda cambios en trozos pequeños y frecuentes** (2–5 commits al día, no uno gigante al final).

### Guardar un avance (commit)

```bash
# Ver qué has tocado
git status

# Añadir lo que quieres guardar
git add .                       # todo
git add app/dashboard/page.tsx  # o solo un archivo concreto

# Guardar con un mensaje claro
git commit -m "feat(dashboard): agrega tarjeta de métricas de robots"
```

**Formato del mensaje:** `tipo(zona): qué hiciste`
`feat` (nuevo) · `fix` (arreglo) · `style` (CSS/diseño) · `refactor` · `docs` · `chore` (config/dependencias)

### Subir tu avance a GitHub (respaldo)

```bash
git push origin dev/andres      # o dev/fabian
```

> ✅ Empujar **a tu propia rama** es libre y no necesita permiso de nadie: es tu respaldo en la nube.
> ⛔ Lo que **sí** necesita la confirmación de Fabián es meter tu trabajo en `develop` / `main` (sección 4).

La primera vez que subas una rama nueva:

```bash
git push -u origin dev/andres
```

---

## 3. 🌙 Al terminar el día — CERRAR

```bash
git status                       # ¿queda algo sin guardar?
git add .
git commit -m "wip(marketplace): filtros a medio hacer"
git push origin dev/andres
```

**Regla de oro: nunca te vayas a casa con trabajo sin `push`.** Si el computador falla, se pierde.

¿No quieres hacer commit de algo a medio terminar? Guárdalo aparte:

```bash
git stash push -m "prueba de animación"
git stash list
git stash pop                    # recuperarlo después
```

---

## 4. ✅ Cuando terminas una tarea — PULL REQUEST (aquí entra la aprobación de Fabián)

### Paso 4.1 — Deja tu rama al día y verifica que todo compila

```bash
git switch dev/andres
git pull origin develop          # trae lo último del equipo
pnpm install
pnpm lint && pnpm type-check && pnpm build
git push origin dev/andres
```

### Paso 4.2 — Abre el Pull Request en GitHub

1. Entra a https://github.com/Grupo-IGPS/RaaS_Web
2. Botón **"Compare & pull request"** (o pestaña *Pull requests* → *New pull request*).
3. Configura:
   - **base:** `develop`   ←   **compare:** `dev/andres`
4. Rellena la plantilla que aparece (qué hiciste, cómo probarlo).
5. En **Reviewers**, asigna a **Fabián**.
6. Botón **"Create pull request"**.

### Paso 4.3 — Espera la confirmación

- ⏳ **Andrés NO hace merge.** Espera a que Fabián revise.
- Si Fabián pide cambios: corriges en tu misma rama, haces `commit` + `push`, y el PR se actualiza solo.
- ✅ Cuando Fabián aprueba, **Fabián** pulsa *Merge pull request* (opción **Squash and merge**) y **Delete branch** *no* (la rama personal se conserva).

### Paso 4.4 — Después del merge, todos se sincronizan

```bash
git switch dev/andres
git pull origin develop
```

### Paso 4.5 — Pasar a producción (solo Fabián)

Cuando `develop` está probado y estable:

- PR de `develop` → `main`, revisar, y *Merge pull request*.
- `main` es lo que se despliega. Nunca se hace push directo a `main`.

---

## 5. 🔁 Chuleta de comandos

| Quiero… | Comando |
|---|---|
| Ver en qué rama estoy | `git branch --show-current` |
| Ver qué cambié | `git status` / `git diff` |
| Cambiar de rama | `git switch dev/andres` |
| Bajar cambios del equipo | `git pull origin develop` |
| Guardar un avance | `git add .` → `git commit -m "..."` |
| Subir a GitHub | `git push origin dev/andres` |
| Ver historial | `git log --oneline --graph --all -20` |
| Deshacer cambios de un archivo (sin commit) | `git restore app/page.tsx` |
| Sacar un archivo del `add` | `git restore --staged app/page.tsx` |
| Cambiar el texto del último commit | `git commit --amend -m "nuevo mensaje"` |
| Guardar temporalmente sin commit | `git stash` / `git stash pop` |

---

## 6. ⚔️ Conflictos (cuando los dos tocaron lo mismo)

Al hacer `git pull` puede salir:

```
CONFLICT (content): Merge conflict in components/layout/Header.tsx
```

**Qué hacer, con calma:**

```bash
git status                      # lista los archivos en conflicto
```

1. Abre cada archivo marcado. Verás:

```
<<<<<<< HEAD
   tu versión
=======
   la versión del otro
>>>>>>> develop
```

2. Borra las marcas `<<<<<<<`, `=======`, `>>>>>>>` y deja el código correcto
   (a veces es una versión, a veces las dos combinadas). **Si dudas, pregúntale al otro antes de borrar su código.**
3. Marca el archivo como resuelto y continúa:

```bash
git add components/layout/Header.tsx
git rebase --continue           # si usas pull.rebase true
# o, si fue un merge normal:
git commit
```

4. ¿Se complicó demasiado? Cancela y vuelve al estado anterior:

```bash
git rebase --abort              # o: git merge --abort
```

### Cómo evitar conflictos
- Haz `pull` **cada mañana** y antes de cada PR.
- Commits pequeños y `push` frecuente.
- Repártanse zonas del proyecto (ver **sección 7**).
- Avísense por chat antes de tocar archivos compartidos (`Header.tsx`, `globals.css`, `tailwind.config.ts`, `types/index.ts`, `package.json`).

---

## 7. 🗂️ Reparto sugerido para no chocar

Ajústenlo según las tareas reales, pero mantengan el principio: **cada quien es dueño de sus carpetas.**

| Zona | Dueño sugerido |
|---|---|
| `app/dashboard/`, `lib/dashboard-data.ts` | uno |
| `app/marketplace/`, `components/marketplace/`, `lib/marketplace-data.ts` | el otro |
| `components/sections/` | repartir sección por sección |
| `components/ui/`, `types/`, `tailwind.config.ts`, `app/globals.css`, `package.json` | **compartido** → avisar antes de tocar |

---

## 8. 🚨 Errores comunes

| Síntoma | Solución |
|---|---|
| `Updates were rejected... fetch first` | `git pull origin dev/andres` y vuelve a hacer push |
| Hice commit en `main` por error | `git switch -c dev/andres` (se lleva los commits), luego avisa a Fabián |
| Subí `.env.local` sin querer | `git rm --cached .env.local` → commit → **y rota las claves** |
| `pnpm dev` falla tras un pull | `pnpm install` (alguien añadió dependencias) |
| No sé qué rompí | `git log --oneline -10` y `git diff HEAD~1` |

> ❗ **Nunca** uses `git push --force` sobre `main` o `develop`. Si crees que lo necesitas, para y consulta con Fabián.
