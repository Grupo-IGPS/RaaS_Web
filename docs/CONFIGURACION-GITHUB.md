# Configuración de GitHub (lo hace Fabián, una sola vez)

Estos pasos se hacen **en la web de GitHub**, no desde la terminal.
Son los que convierten "la confirmación de Fabián" en una regla real que Git obliga a cumplir.

Repositorio: https://github.com/Grupo-IGPS/RaaS_Web

---

## 1. Dar acceso a Andrés

`Settings` → `Collaborators and teams` → **Add people** → usuario de Andrés → rol **Write**.

> Con rol *Write* puede crear ramas y abrir PRs, pero las reglas del paso 3 le impedirán
> hacer merge a `main` sin tu aprobación.

## 2. Poner `develop` como rama por defecto

`Settings` → `General` → *Default branch* → **Switch to another branch** → `develop`.

Así, cuando alguien abra un PR, GitHub propone `develop` como destino en lugar de `main`.

## 3. Proteger `main` y `develop`  ⭐ (paso clave)

`Settings` → `Branches` → **Add branch ruleset** (o *Add rule* en la interfaz clásica).

Crea **dos** reglas, una para `main` y otra para `develop`, con:

- ✅ **Require a pull request before merging**
  - *Required approvals:* **1**
  - ✅ *Dismiss stale pull request approvals when new commits are pushed*
  - ✅ *Require review from Code Owners*  ← esto obliga a que apruebe **Fabián** (ver `.github/CODEOWNERS`)
- ✅ **Require status checks to pass before merging** → selecciona `Lint · Tipos · Build`
  - ✅ *Require branches to be up to date before merging*
- ✅ **Block force pushes**
- ✅ **Restrict deletions**
- ❌ *Allow bypassing the above settings* → **desactivado** (si lo dejas activo para admins, la regla no aplica a ti)

Resultado: **Andrés no puede meter nada en `main` ni en `develop` sin que Fabián apruebe el PR.**
Sí puede hacer `push` a su propia rama `dev/andres` todas las veces que quiera.

## 4. Editar `.github/CODEOWNERS`

Abre el archivo y reemplaza `@USUARIO-GITHUB-DE-FABIAN` por el usuario real de GitHub de Fabián.
Sin eso, la opción *Require review from Code Owners* no tiene a quién exigir.

## 5. Ajustes de merge

`Settings` → `General` → *Pull Requests*:

- ✅ Allow squash merging  ← el que usaremos
- ❌ Allow merge commits
- ❌ Allow rebase merging
- ✅ Automatically delete head branches → **DESACTIVADO** (queremos conservar `dev/andres` y `dev/fabian`)

## 6. Comprobación final

1. Andrés hace un cambio mínimo en `dev/andres` y lo sube.
2. Abre un PR hacia `develop`.
3. Debe aparecer: *"Review required"* y el botón de merge bloqueado.
4. Fabián aprueba → el botón se habilita → Fabián hace *Squash and merge*.

Si el botón de merge le aparece habilitado a Andrés **antes** de la aprobación,
la regla del paso 3 no está bien aplicada (revisa el "Allow bypassing").
