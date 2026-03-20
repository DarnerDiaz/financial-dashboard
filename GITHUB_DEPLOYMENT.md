# 🚀 Guía para Subir a GitHub

Sigue estos pasos para subir tu Crypto Dashboard a GitHub de forma profesional.

## 1. Crear Repositorio en GitHub

### Opción A: Nuevo Repositorio (Recomendado)

1. Ve a [GitHub.com](https://github.com)
2. Haz click en el "+" arriba a la derecha
3. Selecciona "New repository"
4. Completa la información:
   - **Repository name**: `financial-dashboard`
   - **Description**: `Dashboard profesional de análisis de criptomonedas con React & Next.js`
   - **Public**: ✅ (Para que sea visible en tu portfolio)
   - **Initialize repository**: ❌ (Ya tenemos files locales)

5. Click en "Create repository"

## 2. Inicializar Git Localmente

```bash
# Navega a la carpeta del proyecto
cd "d:\Proyectos Programación\financial-dashboard"

# Inicializar git (si no está iniciado)
git init

# Configurar usuario (primera vez)
git config user.name "Tu Nombre"
git config user.email "tu.email@example.com"

# O globalmente:
git config --global user.name "Tu Nombre"
git config --global user.email "tu.email@example.com"
```

## 3. Agregar Archivos al Repositorio

```bash
# Ver estado
git status

# Agregar todos los archivos
git add .

# Hacer commit inicial
git commit -m "feat: initial commit - crypto dashboard project setup"
```

## 4. Conectar con GitHub

```bash
# Agregar remote (reemplaza TU_USUARIO con tu usuario de GitHub)
git remote add origin https://github.com/TU_USUARIO/financial-dashboard.git

# Verificar que se agregó correctamente
git remote -v

# Si cometes error, elimina:
# git remote remove origin
```

## 5. Hacer el Primer Push

```bash
# Crear rama main si es necesario
git branch -M main

# Hacer push
git push -u origin main

# La primera vez puede pedir autenticación
```

### Autenticación GitHub

#### Opción 1: Personal Access Token (Recomendado)

1. Ve a GitHub → Settings → Developer settings → Personal access tokens
2. Selecciona "Tokens (classic)"
3. Click en "Generate new token"
4. Dale un nombre: "terminal-access"
5. Selecciona scopes: `repo`, `read:user`
6. Copia el token
7. Usa en la terminal:
   ```bash
   git push -u origin main
   # Cuando pida password, pega el token
   ```

#### Opción 2: SSH (Más seguro)

1. Genera llave SSH:
   ```bash
   ssh-keygen -t ed25519 -C "tu.email@example.com"
   # Presiona Enter en todas las preguntas
   ```

2. Agrega a SSH agent:
   ```bash
   # Windows
   Start-Service ssh-agent
   ssh-add $env:USERPROFILE\.ssh\id_ed25519
   ```

3. Copia la llave pública:
   ```bash
   Get-Content $env:USERPROFILE\.ssh\id_ed25519.pub | Set-Clipboard
   ```

4. Ve a GitHub → Settings → SSH and GPG keys
5. Click "New SSH key" y pega

6. Cambia origin a SSH:
   ```bash
   git remote set-url origin git@github.com:TU_USUARIO/financial-dashboard.git
   ```

## 6. Configurar GitHub (Después del Push)

### Agregar Descripción del Repositorio

1. Ve a tu repositorio
2. Click en "Settings" (arriba)
3. En la sección superior, agrega:
   - **Description**: Tu descripción
   - **Website**: Opcional (URL de demo)
   - **Topics**: `react`, `nextjs`, `typescript`, `crypto`, `dashboard`, `tailwindcss`

### Agregar Imagen de Portada (Opcional)

1. Crea una carpeta `docs/` en tu proyecto
2. Agrega una imagen `screenshot.png` o `hero.png`
3. En README.md, agrega al inicio:
   ```markdown
   ![Crypto Dashboard](docs/screenshot.png)
   ```

## 7. Proteger la Rama Main

1. Ve a Settings → Branches
2. Click "Add rule"
3. Pattern: `main`
4. Habilita:
   - ✅ Require pull request reviews before merging
   - ✅ Require status checks to pass before merging
   - ✅ Include administrators

## 8. Configurar Vercel (Deploy Automático)

### Opción A: Deploy Manual Eventual

```bash
# Instalar Vercel CLI
npm install -g vercel

# Login
vercel login

# Deploy
vercel --prod
```

### Opción B: Deploy Automático (Recomendado)

1. Ve a [Vercel.com](https://vercel.com)
2. Sign up con GitHub
3. Autoriza Vercel
4. Click "Import Project"
5. Selecciona tu repo
6. Click "Import"
7. Done! ✅

Ahora cada push a GitHub hará deploy automático a `financial-dashboard.vercel.app`

## 9. Mejoras para tu Portfolio

### Agregar al README

Actualiza los links de GitHub/LinkedIn en README.md:

```markdown
## 👨‍💻 Autor

Desarrollado como proyecto de portfolio full-stack.

- 🌐 [Portfolio](https://tuportfolio.com)
- 💼 [LinkedIn](https://linkedin.com/in/tuprofile)
- 🐙 [GitHub](https://github.com/tuusuario)
- 📧 tu.email@example.com
```

### Agregar Badge de Demo en Vivo

```markdown
# Crypto Dashboard

[![Demo](https://img.shields.io/badge/Demo-Live-green)](https://financial-dashboard.vercel.app)
[![GitHub](https://img.shields.io/badge/GitHub-Repository-blue)](https://github.com/tuusuario/financial-dashboard)
```

### Crear un proyecto en GitHub

1. Ve a tu perfil → Projects
2. "New project"
3. Nombre: "Portfolio Projects"
4. Agrega tu dashboard a esta lista

## 10. Mantener Actualizado

```bash
# Ver cambios
git status

# Agregar cambios
git add .

# Commit
git commit -m "feat: description of change"

# Push
git push origin main
```

## 11. Flujo de Trabajo Profesional

```bash
# Feature branches
git checkout -b feature/nueva-feature
# ...hacer cambios...
git add .
git commit -m "feat: agregar nueva funcionalidad"
git push origin feature/nueva-feature

# En GitHub, abre Pull Request
# Haz que alguien lo revise (o revísalo a ti mismo)
# Merge a main
```

## Commits Tips

### Mensajes Descriptivos

```bash
# ✅ BIEN
git commit -m "feat: agregar gráfico de análisis de precios"
git commit -m "fix: corregir error en cálculo de P&L"
git commit -m "docs: actualizar README con instrucciones"
git commit -m "style: formatear código con Prettier"
git commit -m "refactor: reorganizar estructura de componentes"

# ❌ MAL
git commit -m "update"
git commit -m "fix bug"
git commit -m "cambios varios"
```

## Troubleshooting

### "fatal: not a git repository"

```bash
cd d:\Proyectos\ Programación\financial-dashboard
git init
```

### "fatal: 'origin' does not appear to be a 'git' repository"

```bash
git remote add origin https://github.com/USUARIO/financial-dashboard.git
```

### "Permission denied (publickey)"

```bash
ssh -T git@github.com  # Verificar autenticación
# Vuelve a configurar la clave SSH
```

### "cannot pull with rebase: You have unstaged changes"

```bash
git add .
git commit -m "save changes"
```

## Checklists Antes de Hacer Push

- [ ] Build compila sin errores: `npm run build`
- [ ] No hay archivos de debug: `console.log`, `debugger`
- [ ] .gitignore está actualizado
- [ ] .env.example existe sin datos sensibles
- [ ] Commits tienen mensajes claros y descriptivos
- [ ] README está actualizado
- [ ] Código está formateado
- [ ] Sin archivos innecesarios en staging

## Próximos Pasos Después del Push

1. Comparte el link en LinkedIn
2. Agrega a tu portfolio personal
3. Menciona en aplicaciones de empleo
4. Solicita feedback de otros desarrolladores
5. Sigue mejorando el proyecto

---

¡Felicidades! Tu dashboard está ahora en GitHub para el mundo entero. 🎉

**Pro Tips:**
- ⭐ Pide a amigos que le den star en GitHub
- 📝 Escribe articles sobre cómo lo hiciste
- 🚀 Agrega features constantemente
- 🔗 Vincula desde tu CV y LinkedIn
