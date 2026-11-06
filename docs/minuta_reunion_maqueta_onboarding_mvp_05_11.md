# 📋 Resumen Ejecutivo de Reunión: Maqueta Vookly, Onboarding y Arquitectura MVP

> **Fecha:** Jueves 5 de Noviembre de 2026  
> **Participantes:** Jesús Fleitas, Ramiro Sánchez, Facundo Majda (incorporación en bloque final)  
> **Destinatario principal:** Pedro (para alineación de backlog y base de datos)  
> **Estado:** Acuerdos consolidados de diseño, experiencia de demo y arquitectura técnica

---

## 1. 🎯 Objetivo de la Sesión
Alinear la evolución de la maqueta interactiva de **Vookly**, acordar las mejoras visuales/de rendimiento en la PWA del cliente, definir la estrategia de **Onboarding para la demo comercial antes del sábado**, y delimitar la arquitectura técnica y de base de datos entre el panel de administración del comercio y la PWA del consumidor.

---

## 2. 📱 Refactor y Mejoras en la PWA del Cliente (Pantalla Principal)

### A. Dynamic / Status Island (Notificaciones y Recompensas)
* **Comportamiento Reactivo y FIFO:**  
  * El banner superior se transformó en una **Status Island** (estética píldora oscura flotante, estilo Dynamic Island / iOS 18).
  * Detecta dinámicamente el estado del simulador:
    * **Prioridad 1 (Canje Inmediato):** Muestra el premio listo para retirar más antiguo (ej. *"¡Premio listo! • Coffee Shop"* -> *Café Clásico*).
    * **Prioridad 2 (Próximo a Ganar):** Si faltan 1 o 2 sellos, avisa la proximidad exacta (*"A solo 1 sello"*).
    * **Auto-ocultamiento:** Si el cliente está a 3 o más sellos del objetivo, la isla desaparece por completo del DOM para no saturar la pantalla.
* **Espacio en UI (Feedback de Facu):**  
  * Se analizó la posibilidad futura de reservar un área fija superior (zona tipo notch) para notificaciones persistentes (ej. aviso de días con doble sello o nuevos comercios adheridos).

### B. Rediseño de Tarjetas en Billetera Multicomercio
* **Transición de JPG a Tarjetas Dinámicas:**  
  * Reemplazar las imágenes fijas de fondo por tarjetas generadas por código: fondos de colores sólidos/pasteles por categoría con iconografía SVG limpia (cafetería, barbería, heladería, etc.).
* **Ergonomía de Información:**  
  * El contador numérico actual de sellos (*"15 de 30"*) en algunos casos tapa elementos visuales; se acordó reubicarlo.
  * La categoría del comercio (badge) se moverá fuera de la tarjeta para funcionar como filtro/tab horizontal que permita filtrar y scrollear comercios por rubro.

---

## 3. 🚀 Estrategia de Demo y Onboarding Comercial (Hito: Sábado)

### El Problema Detectado
Actualmente la demo mezcla en una sola vista la experiencia del cliente final (PWA) con el simulador del comerciante, lo que puede confundir a los dueños de negocios en las pruebas de campo.

### Solución Acordada: Pantalla Previa de Onboarding
Antes de ingresar a la billetera, el comerciante que prueba la demo se encontrará con dos caminos claros:
1. **Opción A (Personalizar mi local en 1 minuto):**  
   * El comerciante carga el nombre de su negocio (ej. *"Burger Papa"* o *"Café Roma"*).
   * Elige el color/estilo de fondo de su tarjeta.
   * Define su primer producto de recompensa y la cantidad de sellos necesarios.
   * Al darle *"Empezar"*, la demo se inicializa con su marca real tanto en la billetera como en el roadmap.
2. **Opción B (Ver demo rápida pre-cargada):**  
   * Salta la configuración y navega la demo con los datos ficticios de *Coffee Shop*.

### Integración de Driver.js
* Se utilizará la librería **Driver.js** (open-source, 5 KB, cero dependencias) para montar un tour guiado interactivo (*spotlight* paso a paso).
* **Responsables:** Jesús y Ramiro lo implementan en conjunto para dejar la demo cerrada y pulida antes del sábado.

---

## 4. 🏛️ Arquitectura del Sistema: Dos Plataformas, Un Solo Backend

Se reforzó la frontera arquitectónica para el trabajo de Facu y Pedro en el backend:

```
                                  [ Núcleo Backend Vookly ]
                                (Base de Datos / Supabase / API)
                                              │
              ┌───────────────────────────────┴───────────────────────────────┐
              ▼                                                               ▼
   📱 PLATAFORMA 1: PWA CLIENTE                                  💻/📱 PLATAFORMA 2: PANEL COMERCIO
   • Consumidor final (Mobile-First)                              • Dueño y cajeros (Responsive WebApp)
   • Enlace por WhatsApp, sin contraseñas                         • Acceso con Auth (Email/Google)
   • Billetera multicomercio y gamificación                       • Operación de caja (<2s) y métricas
   • Experiencia de canje de vouchers                             • Editor de catálogo, tarjetas y reglas
```

* **Validación de Campo:** Los comerciantes entrevistados confirmaron que **prefieren una solución web** a tener que descargar e instalar aplicaciones de tiendas. Incluso comercios con terminales Windows táctiles operan directo sobre navegador web.
* El configurador de locales y tarjetas pertenece formalmente a la Plataforma 2 (Admin). En la maqueta actual solo se emula en la pantalla previa para que el cliente comercial viva la experiencia.

---

## 5. 💳 Base de Datos, Antifraude y Modelo de Negocio SaaS

### Problemática de Licenciamiento
Se analizó cómo estructurar la base de datos para cobrar suscripciones justas por tamaño de negocio y evitar abusos (ej. un dueño con 3 locales usando una sola cuenta básica):

* **Jerarquía de Datos:** `Propietario (User)` ➔ `Organización (Business)` ➔ `Sucursales (Branches)` ➔ `Terminales de Caja (Terminals)`.
* **Mecanismos Técnicos Evaluados:**
  1. *Límite por Sucursal:* La base de datos restringe la creación de locales según el plan contratado.
  2. *Terminal Autorizada (Device Binding):* Vinculación de cajas mediante PIN efímero de 6 dígitos sin exponer credenciales del dueño.
  3. *Múltiples Cajas en Mismo Local:* Permitidas en simultáneo bajo la misma red/IP física del local.
* **Próxima Sesión Técnica:**  
  * Facundo propuso una sesión de **3 a 4 horas enfocada exclusivamente en diseño y normalización de la base de datos** para dejar el esquema cerrado.

---

## 6. 📌 Próximos Pasos y Asignación de Tareas

| Tarea | Responsables | Fecha Límite / Estado |
| :--- | :--- | :--- |
| **Diseño y maquetación de pantalla previa de onboarding** | Jesús & Ramiro | Antes del sábado |
| **Integración de Driver.js para tutorial interactivo** | Jesús & Ramiro | Antes del sábado |
| **Rediseño de tarjetas SVG dinámicas y reubicación de sellos** | Ramiro & Jesús | En curso (`feat/home-lightweight-ui`) |
| **Sesión de diseño y normalización de Base de Datos (3-4 hs)** | Facundo & Pedro (con Jesús) | A coordinar próxima semana |
| **Envío de demo interactiva limpia a clientes interesados** | Jesús | Fin de semana |
