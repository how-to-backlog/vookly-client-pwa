# 🧭 Lineamientos Técnicos y Guía del Tour de Demo con Driver.js (Vookly)

> **Documento Rector:** `NOTA-024` / `TOUR_GUIDE_SPEC.md`  
> **Rama de trabajo:** `feat/driverjs-demo-tour`  
> **Work Item asociado:** `[FIDELIZAR-4]` (Fase 4 - Tour Guiado de Demostración para Comerciantes)

---

## 1. Visión y Doble Audiencia
El tour no es un tutorial técnico de botones; es una **herramienta de conversión y venta B2B** ejecutada sobre la PWA cliente:
- **Perspectiva Cliente (Deseo y Retención):** El comerciante experimenta lo adictivo, claro y ligero que es el sistema para sus clientes (sin descargas de 50MB ni registros molestos).
- **Perspectiva Comerciante (Control, Seguridad y ROI):** Descubre cómo configurar sus propias reglas de negocio en minutos y constata la solidez del protocolo antifraude para proteger su stock.

---

## 2. Decisiones de Diseño y Alcance Acordadas

1. **Punto de Arranque:**  
   - La pantalla de bienvenida (`/`) queda completamente **limpia y libre de interrupciones**.
   - El tour se inicializa **directamente al aterrizar en el Hub (`/hub`)** con una invitación inicial clara y amigable (con opción explícita de "Comenzar tour" o "Explorar por mi cuenta").
2. **Un Solo Flujo Continuo:**  
   - Recorrido integral de 3 actos sin fragmentar: `Hub` → `Roadmap (/local/[id])` → `Simulador / Editor de Comercio` → `Cierre y CTA`.
3. **Segunda Oportunidad de Personalización Estética (Color y Patrón):**  
   - Si el comerciante omitió el onboarding en la landing y fue directo a Vookly, no pierde la posibilidad de adueñarse de su tarjeta.
   - El **Editor de Premios y Sellos** en `/local/[id]` incorpora los componentes modulares `CardColorPicker` y `CardPatternPicker` (los mismos ya creados en `src/components/landing/onboarding/`), permitiendo editar tanto la lógica de recompensas como la identidad visual de la tarjeta desde un solo lugar.
4. **Interactividad Balanceada en el Simulador:**  
   - El paso guía al comerciante a **abrir obligatoriamente el editor** para que descubra la herramienta.
   - Una vez abierto el modal, el tour avanza paso a paso con el botón "Siguiente" tradicional, **sin obligar al usuario a tipear datos en los inputs**.
   - Botón de **"Cerrar / Saltar tour"** accesible y visible en todo momento.
5. **Renovación del Canal de Contacto (TopBar):**  
   - Se reemplaza el ícono `Headphones` por **`MessageCircle`** (Lucide), universalmente identificado como conversación/chat.
   - Mensaje predeterminado de WhatsApp con intención comercial explícita de adhesión:  
     `"¡Hola! Estoy interesado en que mi negocio forme parte de la red Vookly."`
6. **Cierre Comercial y CTA Final:**  
   - El tour culmina en la pantalla del Roadmap luego de experimentar el simulador (momento de mayor entusiasmo), destacando el botón de contacto en la barra superior para iniciar la conversación por WhatsApp con el equipo comercial.

---

## 3. Secuencia Detallada de Pasos del Tour

```
[ Hub (/hub) ]
  ├── Paso 1: Notificaciones Vivas (Cartelera Giratoria) -> [data-tour="rotating-notifications"]
  ├── Paso 2: Billetera y Ecosistema de Comercios -> [data-tour="wallet-cards-stack"]
  └── Paso 3: Entrada al Negocio (Tap en Tarjeta) -> [data-tour="card-sample-cta"]
        │
        ▼ (Navegación asistida a /local/cafe-central o local activo)
[ Roadmap (/local/[id]) ]
  ├── Paso 4: Camino de Sellos y Gamificación -> [data-tour="roadmap-path"]
  ├── Paso 5: Seguridad y Protocolo Antifraude -> [data-tour="antifraud-node-info"]
  ├── Paso 6: Apertura del Simulador de Negocio -> [data-tour="simulator-trigger-btn"]
        │
        ▼ (Apertura del Modal "Editor de Premios y Sellos")
[ Modal Editor / Simulador ]
  ├── Paso 7: Configuración de Sellos y Recompensas -> [data-tour="simulator-rules-section"]
  ├── Paso 8: Personalización de Identidad (Color y Patrón) -> [data-tour="simulator-appearance-section"]
  └── Paso 9: Cierre del Editor y Aplicación en Tiempo Real -> [data-tour="simulator-apply-btn"]
        │
        ▼ (Vuelta a la pantalla Roadmap)
[ Cierre y Conversión ]
  └── Paso 10: Sumá tu Comercio a la Red (CTA WhatsApp) -> [data-tour="topbar-support-btn"]
```

---

## 4. Arquitectura de Implementación Técnica

- **Componente Aislado:** `src/components/tour/DemoTourProvider.tsx` (Client Component puro, cargado dinámicamente, cero impacto en SSR).
- **Selectores Estables:** Todos los objetivos del tour se anclan mediante atributos `data-tour="..."`. Cero dependencia de clases CSS de Tailwind.
- **Transición entre Rutas:** Se utiliza `sessionStorage` para registrar el paso actual durante la navegación (`/hub` a `/local/[id]`), destruyendo la instancia de Driver.js antes del cambio y reanudándola limpiamente al montar el DOM de la página destino.
- **Persistencia de Finalización:** Clave `localStorage` versionada (`vookly_demo_tour_v1`) para evitar reabrir el tour automáticamente si el usuario ya lo completó o lo cerró voluntariamente.
- **Mobile Friendly:** Posicionamiento inteligente `auto-flip`, adaptación estricta para anchos desde 360px (Motorola G42) y respeto a `prefers-reduced-motion`.
