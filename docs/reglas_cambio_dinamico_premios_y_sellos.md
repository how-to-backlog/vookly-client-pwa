# 📜 Especificación de Negocio y Arquitectura: Integridad de Reglas en Vuelo (Dynamic Rules & Grandfathering Engine)

> **Documento:** `docs/reglas_cambio_dinamico_premios_y_sellos.md`  
> **Fecha de creación:** 2026-11-01  
> **Estado:** Aprobado para diseño de MVP (Fase 1)  
> **Autores:** Jesús (CEO) & Arquitectura Vookly  
> **Módulo Afectado:** Motor de Fidelización, Billetera del Cliente, Panel del Comerciante y API Transaccional.

---

## 1. 🎯 El Problema de Negocio ("The In-Flight Dilemma")

En un sistema de fidelización gamificado y visual como Vookly, los clientes construyen una expectativa psicológica y emocional directa sobre el progreso de sus sellos ("Estoy a 1 sello de ganarme el café con tostadas").

Si un comerciante edita sus reglas sobre la marcha, se presentan dos riesgos críticos de producto:
1. **Riesgo de Percepción de Estafa:** Si se le corre el arco hacia adelante (ej: de 6 a 8 sellos) o se le devalúa el producto deseado en la cara, el cliente siente que las reglas son arbitrarias, pierde la confianza en la marca y en Vookly, y abandona la PWA.
2. **Riesgo de Rigidez Comercial:** Si se le prohíbe terminantemente al comerciante cambiar sus productos o costos, el sistema se vuelve inviable para la economía real (inflación de insumos, quiebre de stock de proveedores, rotación estacional de menú).

---

## 2. 🏛️ Los Dos Escenarios de Cambio de Sellos (Umbrales)

### Escenario A: El comerciante AUMENTA la cantidad de sellos (De 6 a 8 sellos)
* **El caso:** Para el Sello 6 había una Torta. El comerciante decide que la torta ahora cuesta 8 sellos.
* **Impacto en el cliente en vuelo:** Si un cliente ya tiene 4 sellos, pasarle la meta a 8 sellos es romper el contrato unilateralmente.
* **Regla de Negocio (Protección del Tramo Activo):**
  - Para los clientes que **ya están dentro de ese tramo** (tienen entre 1 y 5 sellos acumulados y su próximo premio en la mira era el Sello 6), el sistema les **mantiene el umbral en 6 sellos**.
  - Su variable `premio_asegurado` tiene sellado `{ threshold: 6, product: "Torta" }`. Al llegar a 6, se les entrega la torta.
  - Para los **clientes nuevos** o los que vengan de canjes anteriores, el nuevo hito ya rige en **8 sellos**.

### Escenario B: El comerciante DISMINUYE la cantidad de sellos (De 6 a 4 sellos)
* **El caso:** Para promover un producto o hacerlo más accesible, el comerciante baja el umbral de 6 a 4 sellos.
* **Impacto en el cliente en vuelo:** Hay clientes que ya tenían 4 o 5 sellos acumulados. Si el umbral baja a 4, técnicamente esos clientes ¡ya calificaron!
* **Regla de Negocio (Premio Instantáneo por Beneficio Favorable):**
  - En fidelización existe el principio de *favorabilidad*: si una regla cambia para beneficio del cliente, **aplica de inmediato**.
  - Si un cliente tenía **4 o 5 sellos** y la meta bajó a 4, en su próxima apertura de la PWA el nodo del Sello 4 pasa de inmediato al estado **`reward_ready` (Premio desbloqueado para canjear)**.
  - Si el cliente tenía **2 sellos**, su meta se adelanta automáticamente a 4 (en vez de 6). El cliente percibe una grata sorpresa: *"¡Ahora me falta menos!"*.

---

## 3. 🔄 El Ciclo de Vida del "Premio Asegurado" (`premio_asegurado`)

La solución técnica para no saturar la base de datos ni mantener cientos de versiones vivas por cada local se basa en el **mecanismo de interruptor por tramo**:

```
[Cliente suma 1er sello post-canje] 
        │
        ▼
¿`premio_asegurado` es NULL?
        │
       YES ──► Consulta la Versión Vigente Oficial del Local
        │       Guarda Snapshot en Billetera: { threshold: X, product: "..." }
        ▼
[Cliente camina por el tramo: Sellos X-3, X-2, X-1]
        │
        ▼ (La promesa no se altera aunque el dueño cambie el catálogo)
[Cliente llega al Umbral X y Canjea en mostrador]
        │
        ▼
1. Se registra el canje en el Historial Transaccional Inmutable.
2. Se resetea el campo: `premio_asegurado = null`.
        │
        ▼
[Cliente vuelve la semana siguiente y suma un nuevo sello] ──► (Se repite el ciclo)
```

### El Disparador Exacto de Reactivación (El Trigger)
1. **En el canje:** El cajero aprieta "Confirmar canje" en su terminal. En ese milisegundo, la base de datos registra la entrega física y pasa `premio_asegurado: null`.
2. **En la siguiente compra:** Cuando el cliente vuelve y suma su siguiente sello (ej: pasa de 5 a 6 sellos), el backend detecta `premio_asegurado === null`. En esa misma transacción de compra, evalúa la versión oficial activa del local en ese momento, busca cuál es el siguiente hito y vuelve a poblar `premio_asegurado` con el nuevo objetivo.

---

## 4. 🗄️ Modelo de Base de Datos Limpio (Arquitectura de 2 Tablas)

No se clonan mapas enteros por usuario. Se utilizan dos entidades simples:

### Tabla 1: `business_loyalty_catalogs` (Catálogo Versionado del Local)
Almacena las revisiones históricas del comerciante. Nunca se hace `UPDATE` destructivo; se crea un nuevo registro con versión incremental:

| Columna | Tipo | Descripción |
| :--- | :--- | :--- |
| `id` | UUID | Identificador único del catálogo |
| `business_id` | UUID (FK) | Local gastronómico |
| `version` | Integer | Número de revisión (1, 2, 3...) |
| `is_active` | Boolean | `true` solo para la versión vigente actual |
| `milestones` | JSONB / Array | `[{ threshold: 5, reward_title: "Café" }, { threshold: 10, reward_title: "Torta" }]` |
| `created_at` | Timestamp | Fecha de publicación |

### Tabla 2: `customer_wallets` (Billetera Individual del Cliente)
Cada cliente tiene un solo registro por local que combina su saldo real y su promesa activa:

| Columna | Tipo | Descripción |
| :--- | :--- | :--- |
| `id` | UUID | Identificador de billetera |
| `customer_id` | UUID (FK) | Cliente |
| `business_id` | UUID (FK) | Local |
| `current_stamps` | Integer | Sellos totales acumulados (ej: 4) |
| `in_flight_milestone` | JSONB / Null | `{ threshold: 5, reward_title: "Café", catalog_version: 1 }` |
| `updated_at` | Timestamp | Última actividad |

---

## 5. 📜 Los 3 Principios Inmutables de Integridad de Vookly

1. **El Pasado es un Asiento Contable Sagrado:**  
   Los premios ya canjeados por el cliente nunca se limpian ni se sobreescriben con productos nuevos. Pertenecen a la historia de visitas del usuario y deben reflejarse tal cual fueron consumidos.
2. **La Promesa en Vuelo se Respeta:**  
   El cliente siempre tiene garantizado el premio y el umbral del tramo que está recorriendo en ese instante. El comerciante es libre de cambiar todo lo que esté por delante del siguiente hito.
3. **Principio de Favorabilidad Automática:**  
   Si un comerciante reduce la cantidad de sellos o mejora un premio dentro del tramo del cliente, la mejora aplica de inmediato. Si el cambio empeora o aleja el premio, rige la protección de tramo.
