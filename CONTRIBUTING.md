# Contribution Guidelines

Gracias por tu interés en contribuir a Crypto Dashboard. Este documento te ayudará a entender nuestro proceso.

## Cómo Contribuir

### Reportar Bugs
1. Verifica que el bug no haya sido reportado antes
2. Proporciona un título descriptivo y una descripción clara
3. Incluye pasos para reproducir
4. Especifica el navegador y versión de Node.js

### Sugerir Mejoras
1. Usa un título claro y descriptivo
2. Proporciona una descripción detallada
3. Explica por qué esta mejora sería útil
4. Lista algunos ejemplos de cómo funcionaría

### Pull Requests
1. Fork el repositorio
2. Crea un branch descriptivo (`git checkout -b feature/nombre`)
3. Haz commits con mensajes claros
4. Push a tu fork
5. Abre un PR con descripción detallada

### Standards de Código

**TypeScript**:
```typescript
// Siempre usa tipos explícitos
const myFunction = (param: string): void => {
  // código
}
```

**React Components**:
```typescript
// Usa componentes funcionales con hooks
// Coloca "use client" al inicio si necesitas hooks
"use client";

export function MyComponent() {
  return <div></div>;
}
```

**Estilos**: Usa clases de Tailwind CSS

**Nombres**: camelCase para variables/funciones, PascalCase para componentes

## Proceso de Revisión

1. Revisamos los PRs en 1-2 días
2. Podemos solicitar cambios
3. Una vez aprobado, se hace merge a main
4. Se makeRelease automáticamente a Vercel

## Nuestras Prioridades

1. 🐛 Bug fixes
2. ✨ Features nuevas
3. 📚 Documentación
4. ⚡ Performance mejoras

---

¡Muchas gracias por contribuir! 🙏
