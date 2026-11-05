# 🏛️ Panorama de Producto y Arquitectura de Interfaces: Guía de Módulos y Work Items para Plane

> **Documento:** `docs/panorama_producto_y_planificacion_plane_ui_ux.md`  
> **Estado:** Base estratégica y funcional para la estructuración de Plane  
> **Alcance:** Definición del ecosistema dual de interfaces, modelo Micro-SaaS y desglose de work items para el módulo **DISEÑO & UI/UX**.

---

## 1. 🌐 Visión General del Ecosistema Vookly

Vookly opera como un ecosistema Micro-SaaS compuesto por dos aplicaciones con audiencias, objetivos y contextos de uso claramente diferenciados, pero interconectadas a través de una base de datos y un núcleo transaccional unificado:

```
                                  [ Ecosistema Vookly ]
                                            │
              ┌─────────────────────────────┴─────────────────────────────┐
              ▼                                                           ▼
   📱 PLATAFORMA 1: PWA CLIENTE                                💻/📱 PLATAFORMA 2: PANEL COMERCIO
   • Audiencia: Consumidor final                                • Audiencia: Comerciante / Empleados
   • Naturaleza: PWA Mobile-First                               • Naturaleza: WebApp Responsive Adaptativa
   • Enfoque: Emoción, gamificación y retención                 • Enfoque: Operatividad ágil y gestión comercial
   • Acceso: Enlace seguro vía WhatsApp (sin pass)              • Acceso: Credenciales de comercio (Auth SaaS)
```

Adicionalmente, el ecosistema cuenta con un **Portal Web Público / Landing Comercial**, cuyo propósito es el onboarding self-service de comercios, permitiendo el registro, la activación de un periodo de prueba gratuita (14 a 21 días) y la posterior suscripción a planes mensuales.

---

## 2. 📱 Plataforma 1: PWA Cliente (Consumidor)

### Propósito y Experiencia de Usuario
Diseñada exclusivamente para dispositivos móviles bajo el estándar Progressive Web App (PWA). Su objetivo es generar fidelización a través de una experiencia ágil, gratificante y sin fricción técnica.

### Componentes Clave de Diseño y Flujo
1. **Acceso Inmediato por Token:** El cliente accede a través del enlace recibido por WhatsApp. No requiere descarga de tiendas de aplicaciones, registro de contraseñas ni formularios extensos.
2. **Hub de Billetera Multicomercio (Pantalla 1):**
   * Visualización apilada de tarjetas digitales de todos los comercios donde el usuario acumula beneficios (`ScrollStack`).
   * Despliegue interactivo de sellos actuales y estado de premios disponibles.
3. **Roadmap Vertical de Gamificación (`/local/[slug]`):**
   * Ruta visual serpenteante que guía al consumidor hacia los hitos de premiación.
   * Atmósfera visual adaptativa y tematizada según el rubro comercial (cafetería, barbería, heladería, etc.).
4. **Coreografía de Canje Seguro en Mostrador:**
   * Desgarro de ticket interactivo (`TearTicket`).
   * Giro de tarjeta 3D (`FlipCard`) que revela el código temporal de 4 dígitos con ventana de caducidad (15 minutos).
   * Herramienta sutil de reseteo en caliente para demostraciones comerciales.

---

## 3. 💻/📱 Plataforma 2: Panel de Administración y WebApp de Mostrador (Comercio)

### Propósito y Experiencia de Usuario
Sistema Micro-SaaS integral para el comerciante. Diseñado con arquitectura **Responsive Adaptativa**, garantizando un rendimiento óptimo tanto en computadoras de mostrador como en dispositivos móviles (teléfonos o tablets del comercio).

### Modos de Operación por Dispositivo
* **Modo Mostrador / Terminal de Caja (Desktop / Tablet):**
  * Optimizado para digitación ultra rápida (<2 segundos).
  * Soporte nativo para teclados numéricos físicos (Numpad USB).
  * Confirmación visual instantánea de sello sumado y alerta de premios desbloqueados para entrega en el acto.
* **Modo Gestión y Movilidad (Mobile / Smartphone):**
  * Interfaz táctil adaptada para comerciantes que operan directamente desde el celular del negocio o mozos en salón.
  * Teclado numérico táctil en pantalla de respuesta inmediata.
  * Supervisión de ventas, sellos otorgados y actividad del día desde cualquier lugar.

### Capacidades Administrativas del Panel
1. **Gestión de Clientes:** Listado de usuarios fidelizados, historial de visitas y segmentación (clientes habituales vs. clientes dormidos).
2. **Configurador Dinámico de Premios y Reglas:** Creación y ajuste de catálogo de recompensas, tramos de sellos requeridos y políticas de caducidad.
3. **Métricas y Retención:** Tableros visuales con indicadores clave (tasa de retorno, volumen de canjes y efectividad de las recompensas).
4. **Gestión de Suscripción:** Panel de facturación mensual, estado del periodo de prueba y selección de planes de servicio.

---

## 4. 🗂️ Estructuración Propuesta para Plane: Módulo DISEÑO & UI/UX

Para mantener la independencia operativa del equipo de diseño frente al desarrollo de backend y almacenamiento de datos, se establece la creación del módulo dedicado **`DISEÑO & UI/UX`**, estructurado en cuatro épicas o bloques funcionales de Work Items:

### Bloque A: Fundamentos e Identidad Visual
* `[UI/UX] Sistema de Diseño y Tokens Base (Tipografía, Paleta de Color OKLCH, Elevaciones y Bordes)`
* `[UI/UX] Definición de Tematizaciones por Rubro Comercial (Gastronomía, Estética, Retail)`

### Bloque B: Experiencia PWA Cliente
* `[UI/UX] Optimización del Hub de Billetera Multicomercio y Animaciones de ScrollStack`
* `[UI/UX] Refinamiento Estético del Roadmap Gamificado y Nodos de Hito`
* `[UI/UX] Pulido de la Coreografía de Canje (TearTicket, FlipCard y Temporizador Efímero)`

### Bloque C: Panel de Administración y Terminal de Mostrador
* `[UI/UX] Maquetación de la Pantalla de Carga Rápida en Caja (Terminal Numpad PC/Móvil)`
* `[UI/UX] Arquitectura de Información y Componentes del Dashboard Administrativo`
* `[UI/UX] Interfaz del Editor Visual de Catálogo y Reglas de Fidelización`
* `[UI/UX] Adaptación Responsive Integral de la WebApp para Gestión Móvil`

### Bloque D: Landing Comercial y Onboarding SaaS
* `[UI/UX] Diseño de Landing Page Institucional y Calculadora de Retorno para Comercios`
* `[UI/UX] Flujo de Onboarding Self-Service y Activación de Prueba Gratuita`
