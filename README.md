# 💹 Financial Dashboard - Crypto Analytics Platform

<div align="center">

**Dashboard profesional en tiempo real para análisis de criptomonedas con gráficos interactivos**

[![Version](https://img.shields.io/badge/Version-1.0.0-blue)](https://github.com/DarnerDiaz/financial-dashboard/releases)
[![Next.js](https://img.shields.io/badge/Next.js-16.1-black)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19.2-blue)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-blue)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-4-cyan)](https://tailwindcss.com/)
[![License](https://img.shields.io/badge/License-MIT-green)](LICENSE)
[![GitHub Stars](https://img.shields.io/github/stars/DarnerDiaz/financial-dashboard?style=social)](https://github.com/DarnerDiaz/financial-dashboard)

**[🚀 Live Demo](#️-demo-en-vivo) • [✨ Características](#-características-principales) • [🛠️ Stack Tech](#-stack-tecnológico) • [📦 Setup](#-instalación-y-setup) • [📚 Documentación](#-documentación)**

</div>

---

## 🚀️ Demo en Vivo

**[▶️ Abre la aplicación en vivo aquí](https://financial-dashboard-7r859iws2-darnerdiazu-9004s-projects.vercel.app)** ⚡

👉 **Pruébalo ahora**: No requiere login - comienza a analizar criptomonedas inmediatamente

---

## 🌟 Acerca del Proyecto

**Financial Dashboard** es una aplicación web moderna que proporciona análisis en tiempo real de criptomonedas. Perfecto para traders, inversores y entusiastas de crypto que necesitan datos actualizados y una interfaz profesional.

**Casos de uso:**
- 📊 Monitoreo de precios en tiempo real
- 💼 Gestión de portafolio de criptomonedas
- 📈 Análisis histórico con múltiples timeframes
- 📱 Acceso desde cualquier dispositivo

---

## ✨ Características Principales

### 📊 Dashboard Interactivo
- **Top 15 Criptomonedas**: Visualización en tarjetas con información en tiempo real
- **Gráficos Dinámicos**: Historial de precios con 4 marcos temporales (1D, 7D, 30D, 1Y)
- **Información Detallada**: Precio actual, cambios 24h, máximos/mínimos, capitalización de mercado
- **Actualización Automática**: Datos frescos sin recargar la página

### 💼 Gestor de Portafolio
- ➕ Agregar activos criptos con cantidad y precio promedio
- 📊 Calcular P&L (Ganancia/Pérdida) automáticamente
- 💰 Valor total del portafolio en tiempo real
- 🗑️ Eliminar activos fácilmente
- 📈 Seguimiento de rentabilidad

### 🎨 Diseño Profesional
- 🌙 Tema oscuro/claro con transiciones suaves
- 📱 Responsive design (Mobile, Tablet, Desktop)
- ⚡ Carga ultrarrápida (Vite + Next.js optimizadas)
- 🎯 Interfaz intuitiva y moderna
- ♿ Accesibilidad WCAG

### 🔄 Datos en Tiempo Real
- Integración con **CoinGecko API** (sin autenticación requerida)
- Actualización automática de precios
- Historial de precios histórico
- Datos de volumen de trading 24h

## 🛠 Stack Tecnológico

| Funcionalidad | Tecnología |
|---|---|
| **Framework** | Next.js 16 con App Router |
| **Lenguaje** | TypeScript 5 |
| **UI Framework** | React 19 |
| **Estilos** | Tailwind CSS 4 |
| **Gráficos** | Recharts 3.7 |
| **Estado Global** | Zustand 5 |
| **HTTP Client** | Axios 1.13 |
| **Iconos** | Lucide React 0.56 |
| **Tema** | Next-themes 0.4 |
| **API** | CoinGecko (Pública) |

## 📦 Instalación

### Requisitos Previos
- Node.js 18+ 
- npm o yarn

### Pasos de Instalación

```bash
# 1. Clonar el repositorio
git clone https://github.com/tuusuario/financial-dashboard.git
cd financial-dashboard

# 2. Instalar dependencias
npm install

# 3. Ejecutar en desarrollo
npm run dev
```

La aplicación estará disponible en `http://localhost:3000`

## 🚀 Build para Producción

```bash
# Build
npm run build

# Iniciar servidor de producción
npm run start
```

## 📁 Estructura del Proyecto

```
src/
├── app/                      # Next.js App Router
│   ├── layout.tsx           # Layout principal
│   ├── page.tsx             # Página principal/Dashboard
│   └── globals.css          # Estilos globales
│
├── components/              # Componentes React
│   ├── Header.tsx           # Encabezado con tema toggle
│   ├── CryptoCard.tsx       # Card individual
│   ├── CryptoList.tsx       # Lista de Top 15
│   ├── CryptoDetail.tsx     # Panel de detalles
│   ├── PriceChart.tsx       # Gráfico interactivo
│   ├── TimeframeSelector.tsx # Selector de períodos
│   ├── Portfolio.tsx        # Gestor de portafolio
│   ├── ThemeProvider.tsx    # Proveedor de tema
│   └── ui/Button.tsx        # Botón reutilizable
│
├── store/dashboardStore.ts  # Estado global (Zustand)
├── services/crypto.ts       # Funciones de API
├── types/index.ts           # Tipos TypeScript
└── lib/utils.ts             # Funciones de utilidad
```

## 🎯 Casos de Uso

### Para el Usuario
1. Ver Criptomonedas: Explora el top 15 con datos actuales
2. Analizar Precios: Gráficos con hasta 1 año de histórico
3. Gestionar Portafolio: Monitorea P&L en tiempo real
4. Cambiar Tema: Interfaz claro/oscuro

### Para el Desarrollador
Demuestra:
- ✅ Consumo de APIs REST
- ✅ Manejo de estado complejo
- ✅ Componentes bien estructurados
- ✅ TypeScript & Clean Code
- ✅ Diseño responsive
- ✅ Gráficos interactivos
- ✅ Arquitectura escalable

## 🔌 API Utilizada

### CoinGecko API (Pública)
**Base URL**: `https://api.coingecko.com/api/v3`

- `GET /coins/markets` - Top criptomonedas
- `GET /coins/{id}` - Datos específicos
- `GET /coins/{id}/market_chart` - Historial de precios

📚 [Documentación Completa](https://docs.coingecko.com/reference/intro)

## 🎨 Diseño

### Paleta de Colores
- Primario: #2563eb (Azul)
- Éxito: #16a34a (Verde)
- Error: #dc2626 (Rojo)
- Fondo Claro: #ffffff
- Fondo Oscuro: #0f172a

### Componentes
- Cards con hover effects
- Gráficos interactivos
- Buttons con variantes
- Inputs estilizados
- Modales para formularios

## 🚀 Deployment

### Vercel (Recomendado)
El deploy es automático al hacer push a GitHub.

### Alternativas
- Netlify
- Docker
- Serverless

## 🐛 Troubleshooting

**Los gráficos no se muestran**
- Verifica que los datos existan
- Usa "use client" en componentes

**Next.js no inicia**
```bash
rm -rf .next node_modules && npm install && npm run dev
```

## 🤝 Contribuciones

¡PRs bienvenidos! Por favor:
1. Fork el proyecto
2. Crea una rama (`git checkout -b feature/mejora`)
3. Commit cambios
4. Push y abre un PR

## 📄 Licencia

MIT License - Ver LICENSE file

## 🎓 Skills Demostrados

- ✨ React/Next.js avanzado
- ✨ Zustand (State Management)
- ✨ APIs REST
- ✨ TypeScript
- ✨ Tailwind CSS
- ✨ Git & Versionado

---

---

## 🤝 Contributing

Contributions are welcome! Please follow these guidelines:

1. **Fork** the repository
2. **Create** a feature branch (`git checkout -b feature/new-feature`)
3. **Commit** changes (`git commit -m 'Add new feature'`)
4. **Push** to branch (`git push origin feature/new-feature`)
5. **Open** a Pull Request

Please ensure code quality:
- ✅ Run linting: `npm run lint`
- ✅ Add tests if applicable
- ✅ Update README if adding features

See [CONTRIBUTING.md](./CONTRIBUTING.md) for detailed guidelines.

---

## 🐛 Issues & Support

Found a bug? Have a suggestion? [Open an issue here](https://github.com/DarnerDiaz/financial-dashboard/issues)

**When reporting issues, please include:**
- Clear description of the problem
- Steps to reproduce
- Browser and version
- Screenshots if applicable

---

## 📚 Additional Resources

- [Next.js Documentation](https://nextjs.org)
- [React Documentation](https://react.dev)
- [CoinGecko API Docs](https://www.coingecko.com/en/api)
- [Recharts Documentation](https://recharts.org)
- [Tailwind CSS Docs](https://tailwindcss.com)
- [Zustand Documentation](https://github.com/pmndrs/zustand)

---

## 📄 License

This project is licensed under the **MIT License** - see [LICENSE](./LICENSE) file.

```
MIT License

Copyright (c) 2024 DarnerDiaz

Permission is hereby granted, free of charge, to any person obtaining
a copy of this software and associated documentation files...
```

---

<div align="center">

### ⭐ If you enjoyed this project, please star it! ⭐

[⬆️ Back to Top](#-financial-dashboard---crypto-analytics-platform)

**Built with ❤️ for the crypto community**

</div>
