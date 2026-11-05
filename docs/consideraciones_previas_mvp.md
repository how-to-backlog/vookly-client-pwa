# 🏛️ Consideraciones Previas al MVP de Vookly (Borrador de Trabajo / No Definitivo)

> **Documento:** `docs/consideraciones_previas_mvp.md`  
> **Estado:** Documento de discusión abierta para el equipo (propuestas y consideraciones no decididas aún)  
> **Propósito:** Servir como disparador de debate técnico y de producto antes de consensuar y diagramar los módulos y work items en Plane.

---

> ⚠️ **Nota aclaratoria para el equipo:**  
> Los puntos expuestos en este documento son **propuestas preliminares, hipótesis arquitectónicas e ideas de alcance**. No representan decisiones cerradas ni lineamientos definitivos. El objetivo es que cada integrante (y sus respectivos agentes) pueda analizarlos, cuestionarlos, sugerir alternativas o descartar lo que no aplique antes de volcar las tareas formales en Plane.

---

## 1. 🌐 Visión General del Ecosistema Vookly

Vookly opera bajo un modelo Micro-SaaS estructurado en dos aplicaciones con propósitos, audiencias y contextos técnicos diferentes, pero integradas a un núcleo transaccional y de datos común:

```
                                  [ Ecosistema Vookly ]
                                            │
              ┌─────────────────────────────┴─────────────────────────────┐
              ▼                                                           ▼
   📱 PLATAFORMA 1: PWA CLIENTE                                💻/📱 PLATAFORMA 2: PANEL COMERCIO
   • Audiencia: Consumidor final                                • Audiencia: Comerciante / Cajeros / Empleados
   • Naturaleza: PWA Mobile-First                               • Naturaleza: WebApp Responsive Adaptativa
   • Enfoque: Fidelización, gamificación y dopamina             • Enfoque: Carga rápida en caja y administración
   • Acceso: Link seguro por WhatsApp (sin contraseña)          • Acceso: Autenticación de negocio (Auth SaaS)
```

Adicionalmente, el sistema incluye una **Landing Page Comercial / Web Pública** orientada a la captación self-service de comerciantes, permitiendo el registro, la activación de un periodo de prueba gratuita (14 a 21 días) y la contratación de planes de suscripción mensual recurrente.

---

## 2. 📱 Plataforma 1: PWA Cliente (Consumidor)

### Propósito y Experiencia de Usuario
Diseñada exclusivamente para dispositivos móviles bajo el estándar Progressive Web App (PWA). Prioriza la fricción cero: el usuario no descarga aplicaciones de tiendas ni gestiona credenciales de acceso.

### Componentes Clave
1. **Acceso Inmediato por Token:** El cliente abre la PWA desde el enlace transaccional recibido por WhatsApp. Su identidad está ligada a su número telefónico (E.164).
2. **Hub de Billetera Multicomercio (Home):**
   * Despliegue interactivo de tarjetas de fidelización apiladas mediante el componente `ScrollStack`.
   * Visualización del progreso de sellos y estado de recompensas en todos los comercios donde el cliente acumula puntos.
3. **Roadmap Vertical Gamificado (`/local/[slug]`):**
   * Camino visual con nodos y atmósfera tematizada según el rubro comercial (cafetería, barbería, heladería, etc.).
4. **Coreografía de Canje Seguro en Mostrador:**
   * Interacción de desgarro de ticket digital (`TearTicket`).
   * Giro de tarjeta 3D (`FlipCard`) que revela el código efímero de 4 dígitos con temporizador de caducidad (15 minutos).
   * Herramienta sutil de reseteo rápido `[ ↺ ]` en cabecera para demostraciones comerciales continuas.

---

## 3. 💻/📱 Plataforma 2: Panel de Administración y WebApp de Mostrador (Comercio)

### Propósito y Arquitectura Responsive Adaptativa
Sistema para el comerciante y su personal de caja. Debe adaptarse al dispositivo donde se utilice:

* **Modo Terminal de Caja (Desktop / PC de Mostrador / Tablet):**
  * Diseñado para operar en <2 segundos frente al cliente.
  * Compatibilidad nativa con teclado numérico físico (Numpad USB).
  * Confirmación visual inmediata en pantalla tras el registro del sello y alertas de premios desbloqueados para canje en el acto.
* **Modo Movilidad y Operación Portátil (Smartphone / Celular del Comercio):**
  * Interfaz optimizada para comerciantes que operan directamente desde el celular del negocio o mozos en salón.
  * Teclado numérico táctil en pantalla de respuesta inmediata.
  * Consulta en tiempo real de sellos otorgados, métricas y actividad del día desde cualquier ubicación.

### Módulos Funcionales del Panel
1. **Gestión de Clientes:** Base de datos de clientes registrados, historial de compras/sellos y segmentación básica (clientes activos vs. dormidos).
2. **Editor de Catálogo y Reglas de Fidelización:** Configuración de recompensas, tramos de sellos requeridos y reglas de vigencia.
3. **Tablero de Métricas:** Analíticas de retención, canjes efectuados y retorno de visitas.
4. **Módulo de Facturación y Suscripción:** Estado del periodo de prueba gratuita y gestión de pagos del abono mensual.

---

## 4. 💰 Modelo de Suscripción, Gestión de Sucursales y Múltiples Cajas (A Debatir)

Uno de los puntos clave a analizar en conjunto con el equipo de backend es cómo estructurar el modelo de licenciamiento para evitar abusos y cobrar de forma equitativa según el tamaño real del comercio. A continuación, se presenta un esquema técnico tentativo para evaluar su viabilidad:

### A. Propuesta de Jerarquía de Entidades en Base de Datos (Borrador)
Para no atar "1 usuario = 1 local", se utiliza una estructura jerárquica de tres niveles:
1. **Cuenta / Propietario (`User`):** Credenciales de acceso del dueño del negocio y plan de suscripción contratado.
2. **Empresa / Marca (`Business` / `Organization`):** Nombre comercial, catálogo general y reglas de fidelización.
3. **Sucursales Físicas (`Branches` / `Locations`):** Cada local físico con su dirección y configuración particular.
4. **Terminales de Caja (`Terminals`):** Cada computadora, celular o tablet autorizada para sumar sellos en una sucursal específica.

### B. Esquema de Planes Comerciales
El valor de la suscripción mensual se escala principalmente por **cantidad de sucursales físicas**, con un cupo base de terminales:
* **Plan 1 Local (Comercio Independiente):** Permite 1 sucursal física activa (con hasta 1 o 2 cajas en simultáneo).
* **Plan Dúo / Crecimiento (2 a 3 Locales):** Permite hasta 3 sucursales físicas activas.
* **Plan Cadena / Franquicia (4+ Locales):** Licenciamiento extendido para múltiples sucursales con analíticas consolidadas.

### C. Mecanismos de Control Técnico (Anti-Fraude y Concurrencia)
¿Cómo evita el software que un comerciante pague un plan de 1 solo local pero abra la misma cuenta en computadoras de 5 sucursales distintas?
1. **Límite Estricto en Base de Datos por Sucursal:** El sistema no permite dar de alta una nueva sucursal en el panel si el plan contratado no dispone de cupos.
2. **Vinculación por Terminal Autorizada (Device Binding):**
   * El cajero no inicia sesión con el usuario y contraseña del dueño.
   * La terminal se activa una sola vez mediante un PIN efímero de 6 dígitos emitido desde el panel del propietario.
   * La terminal queda ligada a una sucursal física determinada.
3. **Múltiples Cajas en un Mismo Local:**
   * Si una sucursal grande posee 2 o 3 computadoras de cobro en el mismo mostrador (misma red IP local), el sistema permite su operación en paralelo sin pisarse ni cerrar sesiones.
   * Si se detectan terminales operando simultáneamente desde redes/ubicaciones externas no autorizadas en el plan, el sistema restringe la operación y solicita la actualización de suscripción.

---

## 5. 🗂️ Ideas Tentativas para Plane: Módulo DISEÑO & UI/UX

Como punto de partida para debatir la organización de las tareas de diseño, se propone evaluar la creación de un módulo dedicado **`DISEÑO & UI/UX`**, para que el equipo que tome el frente visual (Jesús y Ramiro) pueda avanzar de forma articulada pero autónoma, sin bloquear ni generar fricciones con el desarrollo de backend/storage (Facu y Pedro). 

Las siguientes tareas son sugerencias preliminares para enriquecer, fusionar o reorganizar entre todos:

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
