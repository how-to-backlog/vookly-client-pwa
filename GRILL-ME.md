# Grill Me Results

Generated: 2026-10-05T02:13:56.072Z

## Plan

salio todo excvelente, te paso el resumen minuta de la reunion 
# Proyecto: App de Fidelización de Clientes

- App de puntos/sellos para comercios medianos y chicos (cafeterías, panaderías, heladerías, barberías)
- Modelo agnóstico por nicho, pero el marketing y la imagen se adaptan al nicho específico
  - Ejemplo: vender la misma app como “app para cafeterías” convierte mejor que una app genérica
- Foco inicial: un solo nicho para validar antes de escalar
- Nahuel se suma al proyecto (Facundo lo había propuesto previamente)

# Análisis Competitivo: Tres Aplicaciones

- *Puntos App* (local): web + DNI, cero fricción para el cliente
  - Plan básico: $20K/mes, hasta 200 clientes, 2 comercios, promociones ilimitadas
  - Debilidad: sin comunicación comercio-cliente (no hay WhatsApp ni mensajería)
- *Noviti* (local): Google/Apple Wallet + hardware POSNET (FUDO)
  - Plan básico: $15K/mes hasta 100 clientes; $42K/mes sin límite de clientes
  - Máximo 2 promociones en plan básico; solo 1 comercio
  - Barrera: requiere hardware FUDO y que el cliente tenga Google/Apple Wallet configurado
  - ~40% de personas no lo adoptarían por no tener Wallet configurado
- *StampMe* (global): mezcla de ambos modelos; precios en dólares ($50-$200/mes)
  - Funciona mejor en EE.UU., Francia, España, Alemania (Apple Wallet muy adoptado)
  - Descartada para Argentina por precio en dólares
  - Punto destacable: cupones con autodestrucción a los 3 minutos para evitar reutilización

# Decisiones de Modelo de Negocio

- *Identificador del cliente*: reemplazar DNI por número de teléfono como dato principal
  - DNI tiene fricción similar y no permite contacto posterior
  - Número formateado con regex: sin 54, sin 9, sin 15; longitud máxima 12 dígitos (Ramiro ya tiene esto implementado en su módulo de fiado)
  - Estrategia para obtener el número: ofrecerlo a cambio de un beneficio claro (descuento en primera carga)
- *Sellos vs. puntos*: sellos más intuitivos para cliente y comercio, pero tienen limitación con productos de distinto precio
  - Pendiente: investigar cómo StampMe diferencia productos de distinto valor dentro del sistema de sellos
- *Hardware*: descartar integración con POSNET/NFC en esta fase
  - Alternativa: teclado numérico físico (~$11-15K) orientado al cliente en el mostrador
  - O bien: el cajero carga el número desde su propia PC
- *Canal de comunicación*: WhatsApp como canal principal (más usado que SMS y email en Argentina)
  - Estrategia de captura progresiva: pedir número en el primer hito de sellos (no en la primera visita)
  - Casos de uso: cumpleaños, clientes inactivos, promociones personalizadas, envío de factura
- *Planes SaaS*: 2 planes diferenciados por cantidad de clientes, comercios y promociones
- *Momento de carga*: en caja al momento del pago (único contacto directo garantizado con el cliente)
- *Nichos prioritarios*: cafeterías, panaderías y heladerías
  - Alta frecuencia de clientes + baja complejidad operativa en caja
  - Excluir grandes cadenas (ya tienen sistemas propios, ej. Grido) y estacionamientos/lavaderos (baja frecuencia, baja adopción tecnológica)

# Próximos Pasos

- *Armar scoring de leads por nicho en las 3 provincias* (Facundo)
- *Investigar cómo StampMe diferencia productos de distinto precio en el sistema de sellos* (Ramiro)
- *Profundizar el cuestionario operativo y obtener respuestas reales de comercios* (Ramiro)
- *Revisar el Research Master y reducirlo a 1-2 nichos concretos*
- *Próxima reunión: martes 6 de octubre a las 16:00 hs*

Scope : 4 nichos
* Cafeterías
* Confiterías
* Panaderías
* Heladerías

Nomenclatura de investigación

Nicho

CAF — Cafetería
PAN — Panadería
HEL — Heladería
CON — Confitería

Escala por cantidad de locales

L1 — 1 local
L2 — 2 locales
L3 — 3 locales
L4-5 — 4–5 locales
L6-10 — 6–10 locales
L10+ — más de 10 locales

Cobertura geográfica

LOC-1 — una localidad
LOC-M — múltiples localidades
PROV-M — múltiples provincias

Presencia digital

GMB — Google Business Profile
IG — Instagram
WEB — sitio web
WA — WhatsApp comercial
DEL — delivery/pedidos online

Actividad digital

A0 — sin actividad observable
A1 — actividad ocasional
A2 — actividad frecuente
A3 — actividad muy frecuente

Escala pública

REV — cantidad de reseñas
RAT — rating
FOL — seguidores
LOC — cantidad de locales

## Shared Understanding

Acuerdos de la reunión de equipo: consolidación del modelo de negocio (teléfono como ID, WhatsApp como canal, teclado numérico en mostrador, 2 planes SaaS), scope acotado a 4 nichos (Cafeterías, Panaderías, Heladerías, Barberías), nomenclatura oficial de leads y sincronización total en la documentación del proyecto.

## Questions and Answers

### 1. ¿Cómo procedemos con la integración documental de estos acuerdos en el repositorio? (Recomendación: Sincronización Total para que todo el equipo trabaje sobre la misma base limpia y actualizada).

**Recommended answer:** Sincronización Total (Minuta 2 + Master Notes NOTA-004 + Refactor Research Master) (Recomendada)

**User answer:** Sincronización Total (Minuta 2 + Master Notes NOTA-004 + Refactor Research Master) (Recomendada)

**Status:** resolved

**Notes:** Integración completa: docs/minuta_reunion_segunda.md, NOTA-004 en p-fidelizar_master_notes.md y actualización de FIDELIZAR_RESEARCH_MASTER.md.

### 2. Dado que Facundo tiene asignado el scoring y Ramiro el cuestionario, ¿en qué nos enfocamos vos y yo ahora para maximizar el avance de cara al martes 6? (Recomendación: Resolver la lógica de sellos vs precio, que es el mayor desafío funcional pendiente).

**Recommended answer:** Resolver la lógica de Sellos vs. Precio de Productos (StampMe benchmark técnico) (Recomendada)

**User answer:** la logica de sellos vs precios es lo que iba a hacer ramiro-..

**Status:** resolved

**Notes:** El usuario señala que la lógica de sellos vs precios es la tarea que tiene asignada Ramiro, por lo que no debemos duplicar esa responsabilidad.

### 3. Para la depuración del Research Master, ¿cómo aplicamos el recorte de nichos acordado? (Recomendación: Reducir a los 4 aprobados, manteniendo la nomenclatura acordada en la reunión).

**Recommended answer:** Reducir a los 4 nichos aprobados (CAF, PAN, HEL, CON) (Recomendada)

**User answer:** Reducir a los 4 nichos aprobados (CAF, PAN, HEL, CON) (Recomendada)

**Status:** resolved

**Notes:** Research Master acotado a los 4 nichos del scope oficial (CAF, PAN, HEL, CON) con su nomenclatura.

### 4. Una vez que haga la sincronización documental completa, ¿en qué tarea querés que nos concentremos vos y yo para tenerla lista antes del martes? (Recomendación: Análisis para reducir a los 1-2 nichos definitivos, que es el objetivo central del Research Master hacia el martes).

**Recommended answer:** Análisis de reducción a 1-2 nichos definitivos para el martes (Recomendada)

**User answer:** por ahora nada, los 4 nichos seran: cafeterias, heladerías, panaderías y barberías (descartando confiterías)

**Status:** resolved

**Notes:** Confiterías queda descartada. Los 4 nichos del scope oficial son: Cafeterías (CAF), Panaderías (PAN), Heladerías (HEL) y Barberías (BAR). Por ahora concentrarse únicamente en la sincronización documental.

## Agreed Decisions

- Scope oficial fijado en 4 nichos: Cafeterías (CAF), Panaderías (PAN), Heladerías (HEL) y Barberías (BAR). Se descartan formalmente confiterías, estacionamientos, lavaderos y logística.
- Identificador principal del cliente: Número de teléfono (regex sin 54, sin 9, sin 15, max 12 dígitos, validado por Ramiro) en lugar de DNI, capturado a cambio de un beneficio o en el primer hito de sellos.
- Canal de comunicación: WhatsApp como canal prioritario para cumpleaños, inactivos y promociones.
- Hardware en caja: Descartar POSNET/NFC en esta fase. Alternativa: Teclado numérico físico orientado al cliente en el mostrador o carga del cajero en PC.
- Planes SaaS: 2 planes diferenciados por cantidad de clientes, comercios y promociones.
- Nomenclatura oficial de investigación: Nichos (CAF, PAN, HEL, BAR), Escala (L1 a L10+), Cobertura (LOC-1, LOC-M, PROV-M), Presencia digital (GMB, IG, WEB, WA, DEL), Actividad (A0 a A3) y Métricas públicas (REV, RAT, FOL, LOC).
- Asignación de tareas: Facundo lidera scoring de leads; Ramiro investiga StampMe (sellos vs productos de distinto precio) y cuestionario operativo; Jesús y agente-1 ejecutan la sincronización documental completa en el repositorio.
- Próxima reunión: Martes 6 de octubre a las 16:00 hs.

## Open Risks

- Lógica de sellos para productos de diferente precio (bajo investigación de Ramiro con StampMe).
- Adopción del teclado numérico de mostrador por parte del cliente en horas pico.

## Next Decision Needed

Ninguna pendiente para esta sesión. Proceder a la Sincronización Total documental: crear docs/minuta_reunion_segunda.md, asentar [NOTA-004] en docs/p-fidelizar_master_notes.md y actualizar docs/FIDELIZAR_RESEARCH_MASTER.md con los 4 nichos y la nomenclatura oficial.
