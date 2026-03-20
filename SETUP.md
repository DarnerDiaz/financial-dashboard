# 🚀 Setup Guía Completa de Desarrollo

Esta guía te ayudará a configurar el entorno de desarrollo para Crypto Dashboard.

## Requisitos Previos

### Obligatorios
- **Node.js**: 18.0.0 o superior
- **npm**: 9.0.0 o superior (viene con Node.js)
- **Git**: Para clonar el repositorio

### Opcionales pero Recomendados
- **VS Code**: Editor recomendado
- **Git GUI**: GitKraken, GitHub Desktop, etc.

## Instalación Paso a Paso

### 1. Clonar el Repositorio

```bash
# HTTPS
git clone https://github.com/tuusuario/financial-dashboard.git

# O SSH (si tienes configurada la clave SSH)
git clone git@github.com:tuusuario/financial-dashboard.git

# Entrar a la carpeta
cd financial-dashboard
```

### 2. Instalar Dependencias

```bash
# Limpiar npm cache (opcional pero recomendado)
npm cache clean --force

# Instalar paquetes
npm install

# O si prefieres yarn
yarn install
```

### 3. Verificar Instalación

```bash
# Ver versiones instaladas
node --version
npm --version

# Ver lista de paquetes activos
npm list
```

## Scripts Disponibles

### Desarrollo
```bash
# Iniciar servidor de desarrollo
npm run dev

# Accesible en http://localhost:3000
```

### Build & Producción
```bash
# Compilar para producción
npm run build

# Iniciar servidor de producción
npm run start
```

### Linting
```bash
# Ejecutar ESLint
npm run lint

# Corregir errores automáticamente
npm run lint -- --fix
```

## Estructura de Carpetas - Setup

```
financial-dashboard/
├── .github/
│   ├── workflows/         # CI/CD workflows
│   └── ISSUE_TEMPLATE/    # Templates de issues
├── .next/                 # Build de Next.js (generado)
├── node_modules/          # Dependencias (generado)
├── public/                # Archivos estáticos
├── src/
│   ├── app/              # Next.js App Router
│   ├── components/       # Componentes React
│   ├── services/         # Servicios (API calls)
│   ├── store/            # Estado global (Zustand)
│   ├── types/            # Tipos TypeScript
│   └── lib/              # Funciones de utilidad
├── .eslintrc.json        # Configuración de ESLint
├── .gitignore            # Archivos ignorados por Git
├── eslint.config.mjs     # Config de ESLint
├── next.config.ts        # Configuración de Next.js
├── package.json          # Dependencias del proyecto
├── postcss.config.mjs    # Configuración de PostCSS
├── tailwind.config.ts    # Configuración de Tailwind
├── tsconfig.json         # Configuración de TypeScript
└── README.md             # Este archivo
```

## Configuración de IDE (VS Code)

### Extensiones Recomendadas

1. **ES7+ React/Redux/React-Native snippets**
   - ID: dsznajder.es7-react-js-snippets

2. **TypeScript Vue Plugin (Volar)**
   - ID: Vue.volar

3. **Tailwind CSS IntelliSense**
   - ID: bradlc.vscode-tailwindcss

4. **ESLint**
   - ID: dbaeumer.vscode-eslint

5. **Prettier - Code formatter**
   - ID: esbenp.prettier-vscode

### Configuración de VS Code

`.vscode/settings.json`:
```json
{
  "editor.formatOnSave": true,
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": true
  },
  "[typescript]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  }
}
```

## Variables de Entorno

### Crear Archivo .env.local

```bash
# Copiar el ejemplo
cp .env.example .env.local

# O crear manualmente:
# .env.local (vacío o con valores de desarrollo)
```

## Troubleshooting de Instalación

### Problema: "npm ERR! code ERESOLVE"

**Solución**:
```bash
npm install --legacy-peer-deps
# O usar node v18 en lugar de v20
```

### Problema: "Module not found"

**Solución**:
```bash
rm -rf node_modules package-lock.json
npm install
```

### Problema: "Port 3000 already in use"

**Solución**:
```bash
# Usar puerto diferente
npm run dev -- -p 3001
```

### Problema: TypeScript errors

**Solución**:
```bash
# Limpiar build caché
rm -rf .next
npm run build
```

## Flujo de Desarrollo Recomendado

### 1. Antes de Empezar
```bash
# Actualizar main
git checkout main
git pull origin main

# Crear rama de feature
git checkout -b feature/tu-feature
```

### 2. Desarrollo Iterativo
```bash
# Terminal 1: Servidor de desarrollo
npm run dev

# Terminal 2: Linter en watch mode
npm run lint -- --watch
```

### 3. Antes de Commit
```bash
# Lint y fix automático
npm run lint -- --fix

# Build para verificar
npm run build

# Tests (cuando se agreguen)
npm test
```

### 4. Hacer Commit
```bash
# Stage de cambios
git add .

# Commit con mensaje descriptivo
git commit -m "feat: agregar componente de gráficos"

# Push a tu rama
git push origin feature/tu-feature

# Abrir PR en GitHub
```

## Estándares de Código

### Naming Conventions

```typescript
// ✅ BIEN
const userData: UserData = {};
function calculateTotal(items: Item[]): number {}
const MyComponent: React.FC = () => {};

// ❌ MAL
const UserData = {};
function calc() {}
const mycomponent = () => {};
```

### Estructura de Componentes

```typescript
"use client"; // Si usa hooks

import { ReactNode } from "react";

interface MyComponentProps {
  children: ReactNode;
  variant?: "primary" | "secondary";
}

export function MyComponent({ 
  children, 
  variant = "primary" 
}: MyComponentProps) {
  return <div>{children}</div>;
}
```

### Estilos con Tailwind

```typescript
// ✅ BIEN - Clases de Tailwind
className="flex items-center gap-2 rounded-lg p-4 bg-blue-500 hover:bg-blue-600"

// ❌ MAL - CSS inline o custom
style={{ display: 'flex' }}
```

## Tests

Para agregar tests en el futuro:

```bash
# Install testing dependencies
npm install --save-dev @testing-library/react jest

# Run tests
npm test

# Run tests with coverage
npm test -- --coverage
```

## Performance

### Optimizaciones
- Lazy loading de componentes
- Image optimization con next/image
- Code splitting automático
- Caching de API calls

## Debug

### VS Code Debugger

`.vscode/launch.json`:
```json
{
  "version": "0.2.0",
  "configurations": [
    {
      "name": "Next.js",
      "type": "node",
      "request": "launch",
      "program": "${workspaceFolder}/node_modules/.bin/next",
      "args": ["dev"],
      "cwd": "${workspaceFolder}"
    }
  ]
}
```

## Recursos Adicionales

- [Next.js Setup Guide](https://nextjs.org/docs)
- [React Documentation](https://react.dev)
- [TypeScript Handbook](https://www.typescriptlang.org/docs)
- [Tailwind CSS Docs](https://tailwindcss.com/docs)

## Ayuda Extra

¿Problemas durante la instalación?

1. Revisa los issues en GitHub
2. Lee el CONTRIBUTING.md
3. Abre un nuevo issue con los detalles

¡Feliz coding! 🎉
