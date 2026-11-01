# Especificación Técnica Exhaustiva: Motor del Simulador Demo y Generador Dinámico de Roadmap (v2.0)

## 1. Visión y Propósito Comercial
El **Simulador Demo de Comercio** es una herramienta de calibración y ventas en vivo embebida en la Pantalla 2 (`/local/[id]`) de Vookly. Permite a Jesús o al equipo comercial adaptar en menos de 10 segundos la identidad del local, la cantidad de sellos requeridos entre cada premio (tramos asimétricos), los nombres reales de los productos a regalar y el progreso actual del cliente para demostrar en tiempo real el comportamiento visual y transaccional de la PWA.

---

## 2. Modelo Matemático y Lógica de Intervalos (Tramos Asimétricos)

### 2.1 Principio de Tramos Relativos vs. Índices Absolutos
Los comerciantes no piensan en índices absolutos de array; piensan en **esfuerzo incremental** entre recompensas:
* **Tramo 1 (Desde el inicio hasta el Premio 1):** $\Delta S_1$ sellos.  
  *Posición absoluta del Premio 1:* $P_1 = \Delta S_1$.
* **Tramo 2 (Desde el Premio 1 hasta el Premio 2):** $\Delta S_2$ sellos adicionales.  
  *Posición absoluta del Premio 2:* $P_2 = P_1 + \Delta S_2$.
* **Tramo $k$ (Desde el Premio $k-1$ hasta el Premio $k$):** $\Delta S_k$ sellos adicionales.  
  *Posición absoluta del Premio $k$:* $P_k = P_{k-1} + \Delta S_k$.

### 2.2 Límites de Integridad y Validación
* **Mínimo de Tramos:** 1 hito (ej: 3 sellos para una recompensa única).
* **Máximo de Tramos:** Hasta 4 hitos consecutivos para mantener la experiencia móvil concentrada.
* **Rango de sellos por tramo ($\Delta S_k$):** Mínimo 1 sello, máximo 10 sellos por tramo.
* **Límite total de sellos del mapa ($S_{total} = P_{final}$):** Mínimo 2 sellos, máximo 24 sellos.
* **Progreso actual simulado ($S_{actual}$):** Rango entero acotado estrictamente entre $0 \le S_{actual} \le S_{total}$.

### 2.3 Generación Dinámica del Grafo de Nodos
A partir de los tramos $\{\Delta S_1, \dots, \Delta S_n\}$ y sus respectivos títulos de recompensa $\{R_1, \dots, R_n\}$, el motor genera una colección ordenada de $S_{total}$ nodos (`1` a $S_{total}$):
* Para cada índice $i \in [1, S_{total}]$:
  * Si $i \in \{P_1, P_2, \dots, P_n\}$, el nodo se tipifica como **Recompensa** (`isReward: true`), asignándole el título $R_k$ correspondiente y el ícono de estrella dorada (★).
  * Si $i \notin \{P_1, P_2, \dots, P_n\}$, el nodo se tipifica como **Sello Regular** (`isReward: false`), renderizando el número entero $i$.

---

## 3. Arquitectura de Interfaces TypeScript

```typescript
/**
 * Definición de un tramo de recompensa configurable
 */
export interface DemoRewardTier {
  id: string;                      // Identificador único (ej: "tier-1", "tier-2")
  stampsFromPrevious: number;      // Cantidad de sellos a sumar desde el hito anterior (Delta S)
  rewardTitle: string;             // Nombre del producto (ej: "Café de Especialidad")
}

/**
 * Configuración completa del Simulador Demo
 */
export interface DemoSimulatorConfig {
  businessName: string;            // Nombre de fantasía del local
  tiers: DemoRewardTier[];         // Lista ordenada de tramos de recompensa
  simulatedCurrentStamps: number;  // Sellos obtenidos simulados para el cliente (0 a total)
}

/**
 * Hito absoluto computado para el motor del Roadmap
 */
export interface ComputedMilestone {
  tierIndex: number;               // Índice ordinal (1, 2, 3...)
  absoluteStampIndex: number;      // Número de sello absoluto en el mapa (ej: 3, 7, 12)
  rewardTitle: string;             // Título del producto
}
```

---

## 4. Diseño de la Interfaz del Modal (`LocalDemoSimulatorModal`)

El modal se presenta como una lámina centrada en el viewport con `bg-white`, esquinas redondeadas (`rounded-3xl`), sombra profunda, borde fino y fondo difuminado (`fixed inset-0 z-60 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4`).

### Bloque 1: Identidad del Comercio
* Input de texto con etiqueta *"Nombre del local"*.
* Placeholder: *"Ej: Café Martínez, Barbería Don Julio"*.
* Impacto directo en:
  * Barra inferior (`LocalFooterSummary`).
  * Pregunta de validación del Bottom Sheet: `¿Estás frente al mostrador de [Nombre]?`.

### Bloque 2: Constructor de Tramos y Premios Asimétricos (Hasta 5 Hitos)
Lista vertical de tarjetas compactas de tramos:
* **Fila de Tramo 1:**
  * Texto fijo: *"Primer premio a los"*
  * Selector numérico compacto de sellos: `[ 3 ]`
  * Input de texto para el producto: `[ Café chico ]`
  * Etiqueta de resultado computado: *"Sello #3"*
* **Fila de Tramo 2 (si existe):**
  * Texto fijo: *"+ Sumar"*
  * Selector numérico compacto de sellos adicionales: `[ +4 ]`
  * Input de texto para el producto: `[ Medialuna ]`
  * Etiqueta de resultado computado: *"Sello #7"*
  * Botón de eliminación `[ ✕ ]` a la derecha.

### Bloque 3: Progreso Simulado del Cliente (Rango Dinámico de 1 a Total)
* **Regla de Onboarding (Mínimo 1 Sello):** Es imposible que un cliente registrado tenga 0 sellos; entra al sistema habiendo pagado su primera compra en caja.
* Selector tipo Stepper táctil con botones grandes `[-]` y `[+]` y valor numérico central (mínimo `1`, máximo `totalMaxStamps`).
* Slider horizontal continuo debajo del stepper para arrastrar rápidamente con el pulgar desde 1 hasta el total máximo de sellos calculados.

### Bloque 4: Presets Rápidos de 1 Toque y Guardado
* Botones de configuración predeterminada:
  * **Cafetería:** 3 tramos (Sello 3: Café chico, Sello 7: Medialunas, Sello 12: Desayuno Completo).
  * **Burger & Bar:** 2 tramos (Sello 4: Pinta artesanal, Sello 9: Burger doble con papas).
  * **Heladería:** 3 tramos (Sello 3: Bocha extra, Sello 6: 1/4 Kg artesanal, Sello 10: 1 Kg premium).
* Botones de acción: *"Restablecer"* y *"Aplicar al mapa"*.
  * Selector numérico compacto de sellos adicionales: `[ +5 ]`
  * Input de texto para el producto: `[ Tostado especial ]`
  * Etiqueta de resultado computado: *"Sello #12"*
  * Botón de eliminación `[ ✕ ]`.
* **Botón `+ Agregar siguiente premio`:**
  * Habilitado si hay menos de 4 tramos y la suma total no excede 24 sellos.
  * Añade un nuevo tramo predeterminado en `+3` sellos con el texto *"Nuevo Premio"*.

### Bloque 4: Presets Comerciales de 1 Toque y Guardado
* Tres pastillas rápidas para demostraciones instantáneas:
  1. **Cafetería Express:** 3 tramos (3 sellos $\rightarrow$ Café, +4 sellos $\rightarrow$ Medialuna, +5 sellos $\rightarrow$ Tostado). Total: 12 sellos.
  2. **Cervecería / Burger:** 2 tramos (4 sellos $\rightarrow$ Papas cheddar, +5 sellos $\rightarrow$ Pinta artesanal). Total: 9 sellos.
  3. **Retail / Ropa:** 1 tramo (5 sellos $\rightarrow$ 20% OFF en prenda). Total: 5 sellos.
* **Botones inferiores de acción:**
  * Botón principal negro: `"Aplicar al mapa"` (cierra modal y aplica con animación instantánea).
  * Botón secundario sutil: `"Restablecer valores originales"`.

---

## 5. Persistencia y Reactividad Instantánea

1. **Ciclo de Vida del Estado:**
   * La configuración se almacena en `localStorage` bajo la clave `vookly_demo_config_[id]`.
   * Si no existe en `localStorage`, inicializa a partir de las reglas del mock de `loyaltyRepository` (15 sellos con premios en 5, 10 y 15).
2. **Propagación hacia los Componentes:**
   * `RoadmapCanvas`: Recibe las nuevas reglas calculadas (`rules.totalStamps = totalCalculado`, `rules.milestones = hitosCalculados`) y el nuevo estado de billetera (`wallet.currentStamps = simulatedCurrentStamps`).
   * `RoadmapPathSvg`: Recalcula las coordenadas Bézier en base al nuevo total de sellos sin deformar la geometría ni superponer nodos.
   * `LocalFooterSummary`: Recalcula dinámicamente si el cliente está en cooldown, si tiene un voucher listo (nombre exacto del producto) o a cuántos sellos se encuentra del próximo hito.
   * `BottomSheetNodeDetail` y `NodeDetailContent`: Actualizan automáticamente los nombres de productos y las transacciones simuladas asociadas.
