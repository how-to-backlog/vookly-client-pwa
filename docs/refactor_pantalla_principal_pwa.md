# 📐 Especificación Visual y Estructural: Refactorización de la Pantalla Principal (PWA)

> **Documento:** `docs/refactor_pantalla_principal_pwa.md`  
> **Rama de trabajo:** `feat/home-lightweight-ui`  
> **Propósito:** Especificación técnica de los elementos visuales y componentes modulares a incorporar en la Home de la PWA, ordenados de arriba hacia abajo.

---

## 1. Cabecera Superior (TopBar)
* **Extremo izquierdo:** Logotipo institucional **Vookly** (tipografía bold con tracking ajustado).
* **Extremo derecho:** Botón de acción rápida con ícono de auricular (`Headphones` de Lucide).
  * Enlace directo a WhatsApp de soporte oficial (`https://wa.me/...`) con mensaje precargado.
  * Interacción táctil optimizada (`active:scale-95`).

---

## 2. Bloque de Saludo y Bienvenida Contextual
* **Saludo Dinámico por Horario:**
  * Lógica local mediante `new Date().getHours()` sin dependencias externas:
    * 06:00 a 12:59 -> *"¡Buen día!"*
    * 13:00 a 19:59 -> *"¡Buenas tardes!"*
    * 20:00 a 05:59 -> *"¡Buenas noches!"*
* **Pregunta Activadora (Subtítulo):**
  * Copy fijo: *"¿Qué premio vas a canjear hoy?"*
  * Tipografía sutil en escala de grises neutros (`text-neutral-500` / `text-sm`).

---

## 3. Banner Inteligente de Recompensa (Smart Reward Banner)
Componente condicional que solo se renderiza si el usuario tiene beneficios alcanzables o listos.

* **Reglas de Renderizado y Prioridad:**
  1. **Prioridad 1 (Canje Inmediato):** Si existen comercios con premios ya desbloqueados listos para retirar en mostrador, se muestra el premio disponible más antiguo (criterio FIFO).
  2. **Prioridad 2 (Próximo a Ganar):** Si no hay canjes listos pero hay comercios a 1 o 2 sellos de desbloquear recompensa, se muestra el más antiguo que alcanzó esa condición.
  3. **Estado Silencioso:** Si el usuario no tiene premios listos ni próximos, el contenedor no se monta en el DOM.
* **Elementos del Banner:**
  * Indicador visual / Badge del estado (*"Canje disponible"* o *"A 1 sello"*).
  * Nombre del comercio y título del premio.
  * Botón o chevron que navega directamente a `/local/[id]` para ejecutar el canje.
  * Estética liviana en CSS puro con micro-animación en GPU (`active:scale-[0.98]`).

---

## 4. Título de Sección de la Billetera
* Encabezado tipográfico: **"Tus tarjetas"**.
* Contador numérico discreto con el total de comercios activos (ej: `(4)`).
* Hint sutil de interacción a la derecha: `Deslizá ↕`.

---

## 5. Contenedor de Tarjetas Multicomercio (ScrollStack)
* Mantenimiento íntegro de la arquitectura de tarjetas apiladas implementada en `src/components/cards/CardContainer.tsx`.
* Comportamiento sticky con deslizamiento sobre eje vertical.
