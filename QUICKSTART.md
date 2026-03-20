# 🚀 QUICK START GUIDE

## 3 Pasos para Ejecutar tu Dashboard

### Paso 1: Abrir Terminal

```bash
cd "d:\Proyectos Programación\financial-dashboard"
```

### Paso 2: Instalar Dependencias

```bash
npm install
```

### Paso 3: Iniciar Servidor

```bash
npm run dev
```

Abre en tu navegador: **http://localhost:3000**

---

## ¿Qué Ves?

✅ Dashboard con top 15 criptomonedas
✅ Gráficos interactivos
✅ Panel de detalles
✅ Gestor de portafolio
✅ Tema claro/oscuro

---

## Documentación

| Archivo | Propósito |
|---------|-----------|
| [README.md](README.md) | Descripción del proyecto |
| [SETUP.md](SETUP.md) | Guía de desarrollo |
| [PROJECT_SUMMARY.md](PROJECT_SUMMARY.md) | Resumen completo |
| [GITHUB_DEPLOYMENT.md](GITHUB_DEPLOYMENT.md) | **LEER ESTO PRIMERO para subir a GitHub** |

---

## Próximos Pasos

### 1️⃣ Sube a GitHub (Importante)
Lee: [GITHUB_DEPLOYMENT.md](GITHUB_DEPLOYMENT.md)

```bash
git init
git add .
git commit -m "feat: initial crypto dashboard"
git remote add origin https://github.com/TU_USUARIO/financial-dashboard.git
git push -u origin main
```

### 2️⃣ Despliega en Vercel
- Ve a https://vercel.com
- Importa tu GitHub repo
- Listo! ✅

### 3️⃣ Comparte
- LinkedIn
- Twitter  
- Portfolio
- GitHub

---

## Comandos Útiles

```bash
# Desarrollo
npm run dev

# Build para producción
npm run build

# Ejecutar versión producción
npm run start

# Linter
npm run lint
```

---

## Archivos Principales

- `src/app/page.tsx` - Página principal
- `src/components/` - Todos los componentes
- `src/store/dashboardStore.ts` - Estado global
- `src/services/crypto.ts` - API calls
- `package.json` - Dependencias

---

## ❓ Problemas Comunes

### "Port 3000 is already in use"
```bash
npm run dev -- -p 3001
```

### "Module not found"
```bash
rm -rf node_modules package-lock.json
npm install
```

### "TypeScript errors"
```bash
npm run build
```

---

## 📊 Stack

React • Next.js • TypeScript • Tailwind CSS • Zustand • Recharts • CoinGecko API

---

## 🎯 Objetivo Logrado ✅

Tienes un **proyecto profesional, full-stack, listo para producción** que puedes mostrar a:
- Empleadores
- Clientes
- Comunidad tech
- Reclutadores

---

**¡A subir a GitHub y a conquistar el mundo! 🚀**

Para detalles completos, lee los archivos MD en la carpeta raíz.
