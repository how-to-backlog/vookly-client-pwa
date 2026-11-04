# Scope: Fusión de componentes para elevar la UX de la demo Vookly

Objetivo: enriquecer la demo Vookly con los 6 componentes descargados del registry custom (`src/components/registry/`) para que la experiencia de usuario se vea y se sienta como un producto real, sin reescribir la lógica de negocio ya afinada.

Rama: `feat/ux-fusion-demo` (a crear desde la rama actual)
Estrategia de entrega: dos entregables separados (Slice 1 = hub, Slice 2 = coreografía de canje)
Runner de tests: no hay framework de testing en el repo. Verificación = `pnpm exec tsc --noEmit` + `pnpm lint` + `pnpm build` + verificación runtime headless vía CDP.

## Specs

### S1 — El hub muestra el estado de progreso de cada comercio

La pantalla principal (`/`) debe comunicar, por cada comercio, cuántos sellos tiene el cliente, sobre cuántos, y cuál es el próximo premio. Hoy las tarjetas solo muestran el nombre y la imagen.

Criterio de aceptación:
- `CardItem` (en `src/components/cards/CardContainer.tsx`) se extiende con `stamps: number`, `totalStamps: number`, `nextRewardTitle: string` y `href: string`.
- Los cuatro comercios (`cafeteria`, `heladeria`, `barberia`, `panaderia`) tienen datos hardcodeados en `DEFAULT_CARDS`.
- Cada tarjeta renderiza: nombre del comercio (píldora existente), progreso `stamps / totalStamps`, y el nombre del próximo premio.
- Los datos NO se leen de `loyaltyRepository`: son de demostración y se ajustan editando el array.

Nota (Q2, Ronda 1): se decide hardcodear en `CardItem` y no tocar `loyaltyRepository`, porque la demo se ajusta con datos y no con lógica de negocio.

### S2 — Las tarjetas sin comercio operativo se marcan como no disponibles

Solo `cafeteria` tiene backend, reglas y billetera en el repositorio en memoria. Las otras tres tarjetas no tienen a dónde navegar. Deben communicateslo de forma explícita en lugar de parecer rotas.

Criterio de aceptación:
- Las tarjetas sin `href` renderizan un badge "Próximamente" y un icono de bloqueo.
- La tarjeta no navegable no dispara navegación ni el circular reveal.
- La tarjeta con `href` mantiene la navegación con el circular reveal actual.

Nota (Q3, Ronda 1): se decide que solo `cafeteria` navega y las otras tres se marcan como "Próximamente". Es honesto con el estado real del demo y genera la pregunta de venta natural ("¿cuándo se suma mi local?").

### S3 — El canje es una coreografía de tres momentos con dos caras

El flujo de canje actual pide un código directamente (escena `active_token` con una ficha negra). Se reemplaza por una secuencia que cuenta la historia: ganaste algo → lo confirmás → mostrás el código.

Criterio de aceptación:
- **M1 · Rasgar**: un `TearTicket` en orientación vertical muestra el ticket del premio (sellos canjeados → nombre del premio). El usuario lo rasga. Al rasgar, `onTear` dispara la transición a M2.
- **M2 · Presentar el premio**: aparece una `FlipCard` con `axis="y"` mostrando en el frente el premio obtenido. Debajo, un `SlideCommit` con la etiqueta de confirmar el canje.
- **M3 · Mostrar el código**: al confirmar con el `SlideCommit`, la `FlipCard` flipea y el dorso muestra el código de 4 dígitos (con `CodeSlots`) y el timer de 15 minutos.
- "Ocultar código" voltea la `FlipCard` de vuelta al frente (el premio). Es el flip inverso, no un salto a otra pantalla.
- El gate "¿Estás frente al mostrador de {businessName}?" ocurre ANTES de M1. El tear es la consecuencia de confirmar ese gate.

Nota (Q5, Ronda 2): la secuencia es de tres momentos con dos caras (premio al frente, código al dorso).
Nota (Q7, Ronda 2): el gate de mostrador se mantiene primero; la tear es la recompensa del "sí".
Nota (Q8, Ronda 2): el modal de advertencia se mantiene tal cual. Es lógica de negocio, no espectáculo.
Nota (Q10, Ronda 2): "Ocultar código" es el flip inverso, para que exista un único modelo mental de las dos caras.

### S4 — El `SlideCommit` vive al lado de la `FlipCard`, no encima

Criterio de aceptación:
- El `SlideCommit` se renderiza como control independiente, debajo de la `FlipCard`.
- No se renderiza dentro del `front` ni del `back` de la `FlipCard`.
- Al confirmar, `SlideCommit` entra en estado `pending` mientras el token se solicita, y en `done` cuando la `FlipCard` termina de flipear.

Nota (Q6, Ronda 2): mezclar el gesto de arrastre dentro de la superficie que ya tiene su propio gesto de flip produce una interacción ambigua. El `SlideCommit` es un control; la `FlipCard` es la recompensa.

### S5 — El token se emite después de rasgar, no antes

Hoy `claimVoucherToken` se dispara al confirmar el gate de mostrador, con lo que el timer de 15 minutos corre desde antes de que el cliente vea el código.

Criterio de aceptación:
- `claimVoucherToken` se invoca una vez que la tear se completa, es decir cuando el cliente está por ver el código.
- El contador de 15 minutos arranca en el momento en que el código se vuelve visible.
- Si el token vence, el premio NO se pierde: la `FlipCard` vuelve al frente del premio.

Nota (Q9, Ronda 2): canjear no suma sello y el token se puede re-emitir, así que emitirlo tarde no pierde nada. El timer debe correr cuando el código se ve.

### S6 — El simulador demo puede Forzar un canje disponible

El simulador actual permite cambiar nombre del local, tramos de premios y cantidad de sellos. Para poder mostrar la coreografía de canje en vivo frente al comerciante, hace falta poder llevar el estado a "premio listo para reclamar".

Criterio de aceptación:
- El simulador puede fijar los sellos actuales en el umbral exacto de un premio, de modo que el voucher quede en estado `ready`.
- El simulador expone el estado del premio listo (nombre y sellos requeridos).

Nota: hoy el simulador ajusta `simulatedCurrentStamps`, pero el voucher `ready` del repositorio está fijo en 15 sellos. Hace falta verificar cómo se derivan los vouchers al aplicar la configuración, porque el botón "Reclamar Tostado Especial" del footer depende de que exista un voucher `ready`.

Resolución (verificada): `applyDemoConfigToEntities` YA genera los vouchers dinámicamente desde la configuración del simulador. Un voucher queda `ready` exactamente cuando `safeCurrentStamps === milestone.stampThreshold`. No hace falta lógica de vouchers nueva: alcanza con comunicar el estado en la UI del simulador y ofrecer un atajo para llevar los sellos al umbral.

### S7 — El flujo existente de arquetipos no se rompe

Los 5 arquetipos del `NodeDetailContent` (sello regular obtenido, sello regular pendiente, premio canjeado, premio listo, premio futuro bloqueado) son la base funcional del detalle del nodo. La coreografía de canje los complementa, no los reemplaza.

Criterio de aceptación:
- Tocar un nodo que NO es un premio listo sigue mostrando el `info` actual con su arquetipo.
- Tocar un premio listo (o el botón "Reclamar" del footer) dispara el gate de mostrador y luego la coreografía.
- Cerrar el bottom sheet en cualquier momento vuelve al estado inicial sin dejar el token consumido visualmente.

## Tasks

| ID   | Specs  | Route  | Archivo principal                                  | Commit |
|------|--------|--------|----------------------------------------------------|--------|
| T1   | S1,S2  | inline | `src/components/cards/CardContainer.tsx`             | `9b98c2d` |
| T2   | S1,S2  | inline | `src/components/cards/ScrollStackCard.tsx`           | `9b98c2d` |
| T3   | S6     | inline | `src/components/local/LocalDemoSimulatorModal.tsx`  | `9b98c2d` |
| T4   | S3,S4  | inline | `src/components/local/RedemptionChoreography.tsx` (NUEVO) | `4c0e68a` |
| T5   | S3,S5  | inline | `src/app/local/[id]/page.tsx`                        | `4c0e68a` |
| T6   | S3,S7  | inline | `src/components/local/NodeDetailContent.tsx`        | `4c0e68a` |
| T7   | -      | inline | verificación runtime (CDP) + build final             | `4c0e68a` |

T1, T2 y T3 comparten el commit `9b98c2d` (Slice 1: hub + simulador). T1 y T2 comparten superficie de edicion (`CardContainer.tsx` renderiza `ScrollStackCard`), por lo que se ejecutan en el mismo paso.

## Log

### L1 — Pedido original del usuario (verbatim)

> "si a: q1, q2, q3, q4. y con respecto al q4, antes de continuar, podriamos concatenar dos componentes con una animacion al estilo: El componente tearTicket de manera vertical, luego se muestra una flip card que muestra el premio obtenido luego de canjear x cantidad de sellos en el roadmap, y junto al componente de slideCommit al confirmar, flipeamos la card para mostrar el codigo en el mostrador"

Contexto previo: el usuario pidió contextualizar la demo con el documento de producto de 14 puntos y encarar una tarea de "fusión y combinación de distintos componentes para elevar la experiencia de usuario y mejorar visualmente la maqueta" sin complejizar demasiado el mockup actual, con "un scope que necesita un buen diseño y pasos documentados".

### L2 — Ronda 1 (decisiones aceptadas)

- Q1 → (B) Enriquecer: integrar los componentes del registry como capas sobre la UI existente, conservando la UI actual. La UI ya está afinada contra el spec de los 5 arquetipos y las reglas de negocio.
- Q2 → (A) Hardcodear `stamps`, `totalStamps`, `nextRewardTitle` en `CardItem`. No tocar `loyaltyRepository`.
- Q3 → (C) Solo `cafeteria` navega; las otras 3 cards se marcan como "Próximamente".
- Q4 → (A) `TearTicket` reemplaza la ficha del código. **Superado por L3.**

### L3 — Ronda 2 (decisiones aceptadas)

- Q5 → 3 momentos (M1 tear, M2 premio, M3 código) con 2 caras en la FlipCard.
- Q6 → `SlideCommit` al lado de la `FlipCard`, no superpuesto.
- Q7 → el gate "¿estás frente al mostrador?" va PRIMERO; la tear es la consecuencia.
- Q8 → el modal de advertencia se mantiene sin cambios.
- Q9 → el token se emite DESPUÉS de rasgar; el timer arranca cuando el código se hace visible.
- Q10 → "Ocultar código" = flip inverso al frente del premio.
- Q11 → dos entregables: Slice 1 (hub) y Slice 2 (coreografía de canje).

### L4 — Análisis técnico previo a la implementación

- Los 6 componentes del registry (`ScrollStack`, `CodeSlots`, `FlipCard`, `ReflectiveCard`, `SlideCommit`, `TearTicket`) están normalizados a TSX con props tipadas y lint limpio.
- `TearTicket` ya fue verificado con gesto real vía CDP: 26/26 fibras se rompen, `onTear` dispara.
- `SlideCommit` verificado: arrastre llega a `aria-valuenow="100"`, `onConfirm` → `onDone`, rechazo de promesa → `onError` + auto-reset.
- `FlipCard` verificado: flipea a la cara posterior al hacer click.
- `CodeSlots` verificado: emite `123456` por `onChange`.
- Riesgo conocido: `TearTicket` y `SlideCommit` dependen de gestos de arrastre con geometría de arco alrededor de un punto de anclaje; la verificación runtime automatizada tiene queDispatchar arcos, no líneas rectas.
- El repo no tiene tests. No se introduce un framework en este alcance: la verificación es tsc + lint + build + CDP.

### L5 — Slice 2: verificación runtime y cierre

- Coreografía completa verificada end-to-end vía CDP (`/tmp/opencode/cdp_choreo2.py`): footer "Reclamar premio" → sheet arquetipo 4 → gate "¿Estás frente al mostrador?" → M1 ticket vertical → gesto de rasgado real (hinge `3px 190px`, sweep creciente 80 pasos) → M2 `h4 "Confirmá tu canje"` → slide `aria-valuenow=100` → commit → token emitido (4 dígitos visibles) → M3 cara código (`aria-pressed=true`, 4 slots, timer `Vence en 14:58 min`) → timer decrementa (14:56) → "Ocultar código temporalmente" → flip inverso a cara premio con SlideCommit. Screenshots: `/tmp/opencode/choreo_m2_reward.png`, `/tmp/opencode/choreo_m3_code.png` (visualmente confirmada).
- Fixes durante la verificación: el voucher del repo se resuelve por `milestoneStamp` en `handleClaimToken` (ids sintéticos `voucher-15` del simulador ≠ ids reales `vouch-*`); cara de código con fondo `bg-neutral-950` y dígitos `#0a0a0b` sobre slots blancos; `status="success"` de CodeSlots quitado (pintaba check sobre los dígitos); guard de flip por teclado (sin token emitido no se revela la cara código); expiry interno: al vencer devuelve a la cara del premio dentro de la coreografía.
- Verificación: `tsc --noEmit` 0 errores; `pnpm lint` limpio; `pnpm build` OK con rutas PPR intactas.
- Expiry real (15 min completos) no se testeó en runtime; el path está revisado por código (flip inverso, sin salir de la coreografía). S7 pendiente de probe runtime tras Escape (el path de gate ya quedó probado).
- Commit Slice 2: `4c0e68a` (incluye cierre mínimo de registry/deps elegido por el usuario; el resto del stream anterior queda pendiente).
- RDD assessment post-commit (base `db445a2`, committed-only): primer intento devolvió `unassessable` (untracked sin declarar); corregido con `--untracked-scope=exclude` → riesgo `medium` (`configuration_change`: package.json), `review_due=false` (`under_budget`). La review queda pendiente en el slice hasta alcanzar el presupuesto; el tier nunca se infiere bajo desde un fallo de assessment, acá sí devolvió tier válido.

### L6 — Simplificación para showroom: el gesto del rasgado es la única confirmación

- Pedido del usuario: la pantalla del slide era "información repetida" y sumaba pasos extra al showroom; alcanza con que aparezca el ticket que se rasga y una guía de qué hacer.
- Decisión tomada con el usuario: se elimina el paso M2 (pantalla de premio + SlideCommit) y el rasgado pasa a ser el gesto único de confirmación. Después de rasgar se emite el token y la FlipCard voltea directo a la cara del código (la animación de flip conecta ambos momentos, no es un paso extra).
- Cambios en `RedemptionChoreography.tsx`: el tipo de momentos pasa de `'tear' | 'reward' | 'code'` a `'tear' | 'code'`; `handleTear` ahora pide el token, activa el flip y arranca el timer; se elimina el import y el uso de `SlideCommit`; la `rewardFace` queda solo como cara frontal de la FlipCard (visible durante la animación del flip); se elimina la pantalla intermedia y su copy "Deslizá para confirmar y ver tu código"; durante la emisión se muestra "Generando tu código…".
- Verificación: `tsc --noEmit` 0 errores, lint limpio, build OK. Runtime vía CDP (`/tmp/opencode/cdp_direct.py`): gate → ticket con guía "Rasgá acá / Arrastrá hacia abajo" → tear real (hinge `3px 190px`) → token emitido y `aria-pressed=true` con 4 dígitos visibles → timer `14:59` → `14:57` → "Ocultar código temporalmente" → vuelve al ticket. Screenshot: `/tmp/opencode/direct_code.png`.
