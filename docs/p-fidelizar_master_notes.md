# 📋 Master Notes: p-fidelizar

> **Proyecto:** p-fidelizar  
> **Fecha de creación:** 2026-10-03 00:37  
> **Repositorio:** https://github.com/jerchufleitas/p-fidelizar  
> **Entorno:** Ubuntu WSL2 (/home/jesus/projects/p-fidelizar)  
> **Gobernanza:** Agente 1 (Arquitecto / Ejecutor) | Agente 2 (Anotador / Escriba)  

---

## 1. 🎯 Visión y Objetivos del Producto
- **Propósito:** Plataforma agnóstica de fidelización y retención de clientes por puntos y recompensas personalizadas para comercios independientes y cadenas pequeñas.
- **Público Objetivo:** Comercios de cercanía y locales independientes (1-5 sucursales) enfocado en 4 nichos clave: Cafeterías (CAF), Panaderías (PAN), Heladerías (HEL) y Barberías (BAR).
- **Valor Principal:** Identificación ultrarrápida en caja (<3 seg) vía número de teléfono (sin DNI ni app obligatoria) y re-engagement automático post-venta por WhatsApp.

---

## 2. 🏗️ Decisiones de Arquitectura, Stack y Convenciones
- **Stack Técnico:** 
- **Patrones de Diseño:** 
- **Reglas Estrictas del Proyecto:** 

---

## 3. 🔐 Credenciales, Endpoints y Variables de Entorno
- **URLs Locales:** 
- **Puertos:** 
- **Variables Críticas:** 

---

## 4. 📌 Estado Actual y Tareas Activas
> *Nota: Al completar una tarea, el agente que la finalice debe firmar la línea con su marca de tiempo.*
### Prioridad Inmediata (Hacia la Reunión del Viernes 23 / Sábado 24 de Octubre):
- [x] [DOCS] **T10: Buyer Persona - Cafeterías (Córdoba Capital)** (Asignado: Jesús / Agente 2) <!-- [agente-2]: finalizado 2026-10-07. Documentado en docs/BUYER_PERSONA_CAFETERIAS_CBA.md y presentación en docs/presentacion_buyer_persona_cafeterias.html -->
- [x] [DOCS] **T11: Propuesta de Preguntas de Nicho - Cafeterías** (Asignado: Jesús / Agente 2) <!-- [agente-2]: finalizado 2026-10-07. Documentado en docs/PROPUESTA_PREGUNTAS_CAFETERIAS_VIERNES.md y presentación rediseñada Obsidian 2026 en docs/presentacion_preguntas_campo.html -->
- [x] [CONFIG] **T17: Curación y Estandarización de Fichas de Investigación en Google Sheets** <!-- finalizado 2026-10-17. 4 fichas depuradas a 5 preguntas, eliminadas hojas duplicadas, fijadas 10 columnas de locales (D a M) y agregada Fila 9 de notas -->
- [x] [DOCS] **T18: Preguntas de Nicho Barbería** <!-- finalizado 2026-10-17. Completadas por Ramiro y curadas a 3 preguntas críticas en el Sheet -->
- [x] [DOCS] **T19: Borrador Oficial Guía de Entrevistas de Campo (Encuesta)** (Asignado: Jesús) <!-- finalizado 2026-10-20. Sincronizado en docs/GUIA_ENTREVISTAS_CAMPO_BORRADOR.md e integrado al documento maestro en Google Docs (sección final borrador guia entrevistas) -->
- [x] [ONBOARDING] **T20: Slides de Onboarding Agnóstico (OpenDesign)** (Asignado: Jesús) <!-- finalizado 2026-10-17. Generado en OpenDesign para inducción de Pedro y futuros integrantes -->
- [x] [DOCS] **T23: Especificación Funcional MVP - User Journeys, Interfaces y Flujos de Mostrador** (Asignado: Jesús / Agente 1) <!-- finalizado 2026-10-21. Formalizado en docs/ESPECIFICACION_MVP_INTERFACES.md: Numpad USB sin hardware extra, bifurcación habitual vs nuevo, cooldown 3h, política de mesas, canje Next-Visit (45 días) y política de WhatsApp cero spam (2 mensajes/ciclo) -->
- [x] [COORDINATION] **T22: Asamblea Plenaria del Equipo Completo (Acuerdos, Roles y Calendario)** (Asignado: Jesús) <!-- finalizado 2026-10-25. Jesús asume liderazgo general unánime, Facundo líder técnico, Pedro PM (Jira), Ramiro técnico/branding y Nahuel dev frontend/mobile. Calendario oficial cerrado a Noviembre -->
- [x] [DEV] **T21: App de Mapa de Locales de Relevamiento (PWA/APK + Baserow)** (Asignado: Nahuel) <!-- finalizado 2026-10-27: demo presentada en vivo con éxito; pendientes menores de UX: exportar a CSV, estados de visita y ruteo óptimo -->
- [x] [DOCS] **T24: Guía de Entrevistas de Campo Completa (Paso a paso, preguntas, objeciones y notas post-visita)** (Asignado: Equipo) <!-- finalizado 2026-10-27: consenso unánime sobre dinámica de campo (registro post-visita, pitch de caja y propuesta de early adopter) -->
- [x] [HANDOFF] **T25: Entrega y Difusión de Especificación Funcional MD a Facundo y Equipo** (Asignado: Jesús) <!-- finalizado 2026-10-25: archivos enviados por WhatsApp y asimilados -->
- [ ] [FIELD] **T15: Salida al Campo: Relevamiento de ~40 Locales (CBA, Formosa, CABA/BA)** (Asignado: Equipo) <!-- en curso: semana en marcha; Nahuel y Ramiro en terreno, Jesús coordina con Pedro en CBA, Facundo confirma horarios -->
- [ ] [DOCS] **T27: Revisión de Bases del Programa de Early Adopters (Drive)** (Asignado: Jesús / Equipo) <!-- documento de derechos y responsabilidades de comercios beta testers en revisión -->
- [ ] [COORDINATION] **T28: Asamblea de Feedback de Campo y Consolidación de Datos (Fin de semana)** (Asignado: Equipo)

### Calendario Oficial de Lanzamiento (Hitos Noviembre 2026):
- **Semana del 27 al 31 de Octubre / 1 al 7 de Noviembre:** Salida a campo y ejecución de las ~40 entrevistas (10 por nicho).
- **Fin de semana (Feedback de Campo):** Fichas de campo consolidadas e interpretación de patrones para calibrar MVP.
- **Semana del 9 al 15 de Noviembre:** Inicio de desarrollo de código y sprint de arquitectura multitenant.
- **24 de Noviembre:** MVP funcional listo para despliegue en beta testers comerciales.

### Backlog / Post-Asamblea (En Inbox / Pausadas):
- [ ] [FIELD] **T15: Validación en Terreno: 10 locales por nicho (CBA, Formosa, CABA/BA)** (Asignado: Equipo)
  - *Se activa apenas se formalice la guía con Ramiro y Pedro y esté lista la PWA del mapa.*
- [ ] [FEAT] **T12: Calculadora de Sellos: Especificación Lógica y Guardarraíles**
  - *Pausada: sin asignación de responsable ni cronograma fijado aún.*
- [x] [RESEARCH] **T8: Benchmark Competitivo de Plataformas en Argentina** <!-- [agente-2]: finalizado 2026-10-05 (en review) -->

### Fase 1: Arquitectura y MVP (Post-Validación de Campo)
- [ ] 1.1 Definición de Arquitectura, Modelo de Dominio y Stack <!-- [sistema]: creado 2026-10-03 00:37 -->

---

## 5. 💡 Registro de Notas Técnicas Estructuradas
> *Sección gestionada por `agente-2` a partir de los requerimientos e ideas dictadas por el usuario.*

<!-- Las notas agregadas por agente-2 se listarán aquí en orden cronológico inverso o secuencial -->

### [NOTA-001] Consolidación de Investigación Pre-MVP y Selección de Nichos de Mercado
- **Fecha:** 2026-10-03 00:57
- **Categoría:** Arquitectura
- **Diagnóstico / Contexto:** Se analizaron los archivos de research (FIDELIZ-AR - RESEARCH .csv, minuta reunion primera.txt, posibles preguntas.txt y Fideliz-Ar.md) que relevaban 10 nichos de mercado con datos de campo en Córdoba, CABA/BA y Formosa. Se requería unificar y estructurar la investigación en un documento maestro pre-MVP.
- **Comportamiento Esperado / Solución:** Creación del documento integral `FIDELIZAR_RESEARCH_MASTER.md` y su copia `FIDELIZAR_RESEARCH_MASTER.txt` estructurados con índice general navegable, marco metodológico de entrevistas pre-código, matriz comparativa de nichos, cuestionarios de campo para dueños/clientes y recomendaciones tácticas (cero app obligatoria en caja, interfaz de cajero de 3 segundos, foco V1 en Cafeterías/Panaderías con Barberías como contingencia).
- **Etiquetas:** `#arquitectura #investigacion #pre-mvp #alta`
- **Tópico / Componente Afectado:** Documentación central de investigación (`FIDELIZAR_RESEARCH_MASTER.md`, `FIDELIZAR_RESEARCH_MASTER.txt`).

### [NOTA-002] Adopción de FIDELIZAR_RESEARCH_MASTER.docx como Documento Cabecera Oficial
- **Fecha:** 2026-10-03 01:13
- **Categoría:** Arquitectura
- **Diagnóstico / Contexto:** El usuario realizó ajustes y precisiones en el documento maestro de investigación desde la versión Word (`FIDELIZAR_RESEARCH_MASTER.docx` en Descargas), refinando el equipo responsable con nombres completos y localidades (Jesus Fleitas - Cba, Ramiro Gonzalez - BA, Facundo Majda - Formosa, Nahuel Gonzalez - Formosa), la lista de fuentes consolidadas y ajustes de redacción.
- **Comportamiento Esperado / Solución:** Se descartó la versión previa autogenerada y se convirtió fielmente el archivo `.docx` a Markdown (`FIDELIZAR_RESEARCH_MASTER.md`) y texto plano (`FIDELIZAR_RESEARCH_MASTER.txt`), preservando índices navegables, tablas comparativas, jerarquías y diagramas ASCII. Se sincronizó también al Desktop del usuario.
- **Etiquetas:** `#arquitectura #investigacion #fuente-de-verdad #alta`
- **Tópico / Componente Afectado:** `FIDELIZAR_RESEARCH_MASTER.md`, `FIDELIZAR_RESEARCH_MASTER.txt`

### [NOTA-003] Inicio de Tarea Prioritaria: Benchmark Competitivo de Plataformas de Fidelización
- **Fecha:** 2026-10-03 01:20
- **Categoría:** Lógica
- **Diagnóstico / Contexto:** De acuerdo con la asignación de roles del equipo (Hito 8.2 del Research Master), a Jesús le corresponde liderar la investigación y auditoría competitiva de 3 a 4 sistemas de fidelización y puntos antes de avanzar en el MVP. Se busca evitar saturación de archivos duplicados y concentrar el trabajo colaborativo entre Jesús, Agente 1 (Arquitecto) y Agente 2 (Escriba).
- **Comportamiento Esperado / Solución:** 
  1. Se eliminaron archivos `.txt` redundantes, conservando únicamente `FIDELIZAR_RESEARCH_MASTER.md` como fuente de verdad canónica.
  2. Se define el marco de trabajo del benchmark en 5 dimensiones por competidor: Onboarding del comercio, Enrolamiento del cliente final, Mecánicas de incentivos/re-engagement, Modelo de monetización y Brechas/Oportunidades frente a Fideliz-Ar.
  3. Coordinación de roles: Jesús dirige el criterio de selección; Agente 1 evalúa aspectos técnicos/arquitectónicos; Agente 2 estructura y documenta los hallazgos en las notas maestras.
- **Etiquetas:** `#benchmark #competencia #investigacion #prioridad #alta`
- **Tópico / Componente Afectado:** Documentación de Benchmark y decisiones pre-MVP.

### [NOTA-004] Acuerdos de Asamblea: Validación de Benchmark, Reducción de Scope y Definición de Modelo
- **Fecha:** 2026-10-04
- **Categoría:** Arquitectura / Negocio
- **Diagnóstico / Contexto:** El equipo evaluó el benchmark competitivo (Puntos App, Novity, Stamp Me) y resolvió las directrices fundacionales de producto, operativa en mostrador y el alcance inicial antes del desarrollo.
- **Comportamiento Esperado / Solución:**
  1. **Identificador Primario:** Sustituir DNI por **número de teléfono** sanitizado con regex (sin 54, sin 9, sin 15, máx 12 dígitos) para habilitar re-engagement directo.
  2. **Canal Oficial:** **WhatsApp** como vía prioritaria para cumpleaños, reactivación de inactivos y promociones.
  3. **Hardware en Mostrador:** Descartar POSNET/NFC; optar por teclado numérico físico (~$11-15k ARS) de cara al cliente o digitación en PC de caja.
  4. **Scope Acotado (4 Nichos):** Cafeterías (`CAF`), Panaderías (`PAN`), Heladerías (`HEL`) y Barberías (`BAR`). Confiterías (`CON`) descartada/absorbida.
  5. **Nomenclatura Oficial:** Estandarización de categorías de leads (locales `L1`-`L10+`, cobertura `LOC-1`/`LOC-M`, presencia `GMB`/`IG`/`WA`, actividad `A0`-`A3`).
  6. **Distribución de Tareas:** Facundo (scoring leads), Ramiro (StampMe y sellos vs precios), Jesús & Agente 1 (sincronización documental).
- **Etiquetas:** `#arquitectura #negocio #scope #nomenclatura #alta`
- **Tópico / Componente Afectado:** `docs/minuta_reunion_segunda.md`, `docs/FIDELIZAR_RESEARCH_MASTER.md`, `docs/p-fidelizar_master_notes.md`

### [NOTA-005] Sesión de Ideación Técnica (Jesús & Facu): Blindaje de Tríada Core y Backlog Exploratorio
- **Fecha:** 2026-10-04 23:30
- **Categoría:** Arquitectura / Exploración
- **Diagnóstico / Contexto:** Charla preliminar entre Jesús y Facundo sobre la proyección del MVP, posibles skins visuales por nicho y la interacción en mostrador. Se requiere blindar el alcance para evitar feature creep antes de la validación en calle.
- **Comportamiento Esperado / Solución:**
  1. **Tríada Core Blindada (MVP de Corto Plazo):**
     - Comerciante: seguimiento de clientes y gestión de 2 a 3 promociones.
     - Cliente: PWA instantánea para consultar promociones activas/próximas a desbloquear.
     - WhatsApp: canal directo de disparo de promociones al cliente.
  2. **Exploración / Backlog Futuro (No Vinculante):** Skins inmersivos SVG por nicho, paquetes freemium prediseñados y mini-CRM multi-servicio quedan en estado de exploración sin comprometer código inicial.
  3. **Pares Prioritarios para Campo:** Barberías (`BAR`) y Cafeterías (`CAF`) seleccionadas para las primeras entrevistas en terreno y prototipado rápido.
- **Etiquetas:** `#idea-futura #exploracion #ui-ux #mvp-scope`
- **Tópico / Componente Afectado:** `docs/minuta_charla_facu.md`, `docs/guion_preguntas_terreno.md`

### [NOTA-006] Benchmark Competitivo en Argentina: Ecosistema de Plataformas de Fidelización (Exa Research)
- **Fecha:** 2026-10-05 00:15
- **Categoría:** Lógica / Investigación
- **Diagnóstico / Contexto:** A pedido de Jesús y Agente 1 ([RESEARCH]), se ejecutó un relevamiento exhaustivo con Exa del mercado argentino para mapear competidores de fidelización activos más allá de Puntos App y Novity, evaluando modelos operativos, canales (DNI, QR, WhatsApp, Wallet, POS), nichos atendidos y esquemas de precios en ARS.
- **Comportamiento Esperado / Solución:**
  1. **Tienda de Puntos (tiendadepuntos.com):** Motor avanzado multi-canal (Web/PWA sin app). Líder en integraciones POS/ERPs locales (Fudo, Maxirest, Dragonfish/Zoo Logic, Odoo, Clover, Tiendanube, Dux, Contabilium, Centum) + API pública. Avisos por WhatsApp Lite y TDP Connect. Pricing: cotización a medida.
  2. **Gastuki (gastuki.ai):** Solución 100% WhatsApp-First (sin web app ni app nativa, todo corre en el chat de WhatsApp del cliente). Mecánica: sellos por visita + cupones + ruleta de premios. Nicho: cafeterías, panaderías, bares, peluquerías. Pricing: $19.999 a $39.999 ARS/mes con clientes ilimitados y 500 mensajes de WhatsApp/mes.
  3. **Fielty (fielty.app):** Puntos por monto gastado ($100 = 1 pt) para comercio físico. QR en mostrador, DNI, tarjeta en Google Wallet y web responsive. Pricing: Free (30 clientes), Pro $20.000 ARS/mes (3 sucursales), Business $35.000 ARS/mes (ilimitado con WhatsApp automatizado).
  4. **Puntito (puntito.app):** Selector dual (Puntos por monto O Sellos por visita) en navegador web. Carga por DNI, nombre o QR personal. Precios fijos en pesos vía suscripción sin comisiones.
  5. **Volvé (volve.app):** Puntos por visita vía QR/links compartibles por WhatsApp. Pricing: Free hasta 25 clientes; Pro $39.999 ARS/mes.
  6. **Suscri (suscri.com.ar) / Loyabit (loyabit.com) / PremiaQR:** Enfoque Wallet-First (Apple Wallet + Google Wallet nativos sin apps descargables). Notificaciones push a pantalla de bloqueo. PremiaQR tarifa anual ~$180.000 ARS/año.
  7. **Sistemas Verticales Integrados:** Pedisy (gastronómico con puntos propios sin comisión) y Lumex (POS comercial con puntos automáticos por DNI).
  8. **Hallazgos Clave para Fideliz-Ar:**
     - La franja de precios de mercado oscila entre $15.000 y $42.000 ARS/mes para PyMEs.
     - La experiencia sin descarga (WhatsApp-first o Wallet/Web) es el consenso unánime de la industria en 2026.
     - La oportunidad competitiva de Fideliz-Ar radica en resolver la fricción de mostrador (<3 seg con teclado numérico/teléfono) combinada con el disparo automatizado por WhatsApp, sin la pesadez de contratar un POS integral como Fudo o Dragonfish.
- **Etiquetas:** `#benchmark #competencia #investigacion #precios #alta`
- **Tópico / Componente Afectado:** `docs/p-fidelizar_master_notes.md`, `docs/FIDELIZAR_RESEARCH_MASTER.md`

### [NOTA-007] Acuerdos de Asamblea Plenaria (Reunión 2 post-Granola): Mecánica de Sellos, Focos Geográficos y Diferenciación vs Gastuki
- **Fecha:** 2026-10-05 01:20
- **Categoría:** Arquitectura / Negocio
- **Diagnóstico / Contexto:** Sincronización oficial de acuerdos de la Reunión 2 del equipo completo (Jesús, Ramiro, Facundo, Nahuel) inyectada por Torre de Control (projects-agent-2). Define prioridades de nichos, mecánica cuantitativa de sellos y contrastes de diseño contra Gastuki.
- **Comportamiento Esperado / Solución:**
  1. **Nichos Definitivos (Prioridad Ordenada):** 1° Cafeterías, 2° Heladerías, 3° Panaderías, 4° Barberías.
  2. **Mecánica Matemática de Sellos (MVP):**
     - Margen de recompensa: 3% a 5% del ticket acumulado total de la tarjeta completa.
     - Umbral óptimo de retención: 4 a 8 sellos por ciclo (menos es regalado, más genera abandono por fatiga).
     - Fórmula canónica: `Visitas = Costo del ítem / (Ticket promedio × % recompensa)`.
     - Feature MVP: Incorporar calculadora interactiva para guiar al comerciante en la configuración del programa.
  3. **Benchmark Crítico Gastuki (gastuki.ai):**
     - Puntos débiles de Gastuki: Interfaz cliente/dueño mezclada en el bot, carga manual de sellos por QR del cliente, y ausencia de campañas salientes proactivas por WhatsApp.
     - Moat de Fideliz-Ar: Carga instantánea por teclado numérico físico/teléfono (<3 seg en mostrador) y campañas proactivas automatizadas.
  4. **Despliegue y Validación en Terreno:**
     - Córdoba Capital: Jesús (Cafeterías y Heladerías).
     - Gral. Rodríguez / BA: Ramiro (Barberías + cafeterías/heladerías).
     - Formosa Capital: Facundo y Nahuel (todos los nichos; mapeo de Luigi, Pan de Casa, Duomo).
     - Protocolo: 2 visitas por local (1° entrevista y detección de fricción; 2° demo del MVP funcional).
- **Etiquetas:** `#reunion #mecanica-sellos #fidelizacion #gastuki #alta #scope`
- **Tópico / Componente Afectado:** `docs/p-fidelizar_master_notes.md`, `docs/minuta_reunion_segunda.md`, especificaciones del MVP.

### [NOTA-008] Secuencia Metodológica Pre-Asamblea: Banco de Preguntas por Nicho y Pausa de Validación en Terreno
- **Fecha:** 2026-10-05 01:40
- **Categoría:** Lógica / Metodología
- **Diagnóstico / Contexto:** Directiva expresa de Jesús: Se corrigió el orden de ejecución para evitar saltar prematuramente a guiones de campo o salidas a la calle antes de la asamblea del viernes.
- **Comportamiento Esperado / Solución:**
  1. **Secuencia Obligatoria para la Reunión del Viernes:**
     - Cada integrante del equipo elabora y aporta preguntas específicas de su nicho asignado (Jesús: Cafeterías y Heladerías) más preguntas candidatas generales.
     - En la asamblea plenaria del viernes se consolidan y filtran todas las propuestas en un único banco oficial de no más de 5 a 6 preguntas en total (mayoría de nicho, resto generales).
     - Recién con ese set consensuado se planificará el guión definitivo y la salida a la calle.
  2. **Ajuste de Tareas en Tablero:**
     - **T10:** `[DOCS] Buyer Persona - Cafeterías Cba (Asignado: Jesús / Agente 2)` -> En ON DECK (prioridad inmediata).
     - **T11:** `[DOCS] Preguntas de Nicho - Cafeterías (Reunión Viernes) (Asignado: Jesús / Agente 2)` -> En ON DECK (redefinida: banco previo para el viernes, no guión de campo final).
     - **T15:** `[FIELD] Validación en Terreno` -> Movida a Inbox/Backlog pausado hasta post-asamblea.
     - **T12:** `[FEAT] Calculadora de Sellos` -> Movida a Inbox/Backlog (sin responsable ni fecha fijada aún).
  3. **Gobernanza de Proyectos:** Las tareas deben pertenecer estrictamente al proyecto activo (`p-fidelizar`), garantizando visibilidad en el panel correspondiente.
- **Etiquetas:** `#metodologia #preguntas #cafeterias #scope #alta`
- **Tópico / Componente Afectado:** Tablero `tsk`, `docs/p-fidelizar_master_notes.md`

### [NOTA-009] Minuta Oficial de Asamblea Viernes 16/10: Definición de MVP, Consolidación de Preguntas y Fichas de Terreno
- **Fecha:** 2026-10-17 20:30
- **Categoría:** Metodología / Producto
- **Diagnóstico / Contexto:** Asamblea plenaria del equipo (Jesús, Facundo, Nahuel, Ramiro). Se revisaron las propuestas de preguntas generales y por nicho, se calibraron las características del MVP y se definieron los requerimientos para las fichas de relevamiento de campo en Google Sheets.
- **Comportamiento Esperado / Solución:**
  1. **Acuerdos de MVP:** Panel de comerciante simple, PWA instantánea por QR/link para el cliente (cero instalación en app store), re-engagement por WhatsApp de baja frecuencia (cumpleaños, inactividad +20 días, sellos canjeables), identificación exclusiva por número de celular en mostrador con target <3 seg (descartado hardware posnet o lectores propietarios para V1).
  2. **Preguntas Consolidadas:** Se redujeron las generales a 2 definitivas (Gen 3: Stack/Software/Costo y Gen 4: Activación directa celular). En nichos: Cafeterías consolidadas, Heladerías (Nahuel: estacionalidad, días flojos, sabores), Panaderías (Facundo: tipos de compra, clientes fijos, merma/al cierre) y Barberías (Ramiro: frecuencia corte, reserva de turnos, clientes inactivos).
  3. **Fichas de Terreno en Sheets:** 4 fichas (una por nicho), 10 columnas de locales para volcar texto crudo, sin promedios ni fórmulas de scoring prematuras.
- **Etiquetas:** `#reunion #mvp-scope #preguntas #fichas-sheets #alta`
- **Tópico / Componente Afectado:** `docs/p-fidelizar_master_notes.md`, Google Sheets de relevamiento.

### [NOTA-010] Incorporación del 5to Integrante (Pedro) y Protocolo de Onboarding Agnóstico
- **Fecha:** 2026-10-17 23:45
- **Categoría:** Organización / Onboarding
- **Diagnóstico / Contexto:** El equipo de Fideliz-Ar se amplía a 5 integrantes con la llegada de Pedro. Se requiere una narrativa e inducción estructurada que le transmita el origen del proyecto, la filosofía de Fase 0 (no tirar código sin validar dolores reales en la calle) y los objetivos inmediatos sin atarlo a personas específicas ni generar fricción.
- **Comportamiento Esperado / Solución:**
  1. Se formaliza el onboarding en 3 ejes: 1) Tesis de dolor (abismo post-venta en comercios de barrio vs. tarjetas de cartón y apps pesadas), 2) Solución técnica (PWA liviana + WhatsApp + onboarding <3s en mostrador) y 3) Estado actual de Fase 0 (validación de 10 locales por nicho en Córdoba, Formosa y Buenos Aires).
  2. Creación de presentación en OpenDesign bajo un enfoque impersonal y agnóstico, reutilizable para cualquier futuro colaborador.
- **Etiquetas:** `#organizacion #onboarding #equipo #fase-0 #alta`
- **Tópico / Componente Afectado:** `docs/p-fidelizar_master_notes.md`, OpenDesign slides.

### [NOTA-011] Minuta Oficial Asamblea Martes 20/10: Fila 9 de Notas, Guía de Salida al Campo y PWA de Mapa
- **Fecha:** 2026-10-20 20:45
- **Categoría:** Metodología / Operaciones
- **Diagnóstico / Contexto:** Reunión plenaria de coordinación (Jesús, Facundo, Nahuel; ausentes Pedro y Ramiro). Se consolidó el formato definitivo de las 4 fichas en Google Sheets, se definió la psicología y protocolo de abordaje no-vendedor para entrevistas de campo, y se asignó a Nahuel el desarrollo de la PWA del mapa de locales.
- **Comportamiento Esperado / Solución:**
  1. **Google Sheets Limpio y Operativo:** Fichas consolidadas con 10 locales cada una (Columnas D en adelante). Se agregaron casilleros de notas en la Fila 9 por local para registrar contexto cualitativo y requerimientos out-of-scope (ej. pedidos de CRM o automatizaciones). Protocolo de respuesta ante pedidos externos: confirmar factibilidad técnica, no dar precios/plazos en frío y acordar fecha para volver con respuesta del equipo. Eliminadas todas las hojas redundantes o duplicadas.
  2. **Psicología y Reglas de Abordaje en Terreno:** Enfoque no-vendedor (*The Mom Test*): charlas de 5 minutos orientadas a escuchar dolores de caja y retención, no a convencer. Identidad: "equipo de desarrolladores independientes locales en relevamiento previo". Naming de la app: descripción puramente funcional ("sistema de fidelización por sellos digitales y WhatsApp"). Fidelizar se mantiene como nombre clave de trabajo interno.
  3. **Ventanas Horarias:** Cafeterías y barberías de 11:00 a 14:00 hs; panaderías y heladerías a criterio de cada zona y clima.
  4. **PWA Mapa de Locales:** Nahuel desarrolla app web liviana y compartida para registrar locales con nombre, dirección, teléfono y notas, con perspectiva de agregar optimización de rutas con IA.
  5. **Borrador de Guía de Campo:** Redactado y formalizado en `docs/GUIA_ENTREVISTAS_CAMPO_BORRADOR.md`. Pendiente validación final con Ramiro y Pedro en la próxima reunión (Viernes 23 / Sábado 24 de Octubre).
- **Etiquetas:** `#reunion #guia-campo #sheets #pwa-mapa #alta`
- **Tópico / Componente Afectado:** `docs/p-fidelizar_master_notes.md`, `docs/GUIA_ENTREVISTAS_CAMPO_BORRADOR.md`, Google Sheets.

### [NOTA-014] Asamblea Martes 27/10: PWA Multilocal, Demo App de Mapa y Lanzamiento de Salida a Campo
- **Fecha:** 2026-10-27 22:30
- **Categoría:** Arquitectura / Operaciones / Campo
- **Diagnóstico / Contexto:** Asamblea plenaria de equipo (Jesús, Facundo, Nahuel, Pedro y Ramiro). Se revisaron la demo funcional de la App de Mapa de Nahuel, el protocolo de campo, la guía de entrevistas y el concepto diferenciador de la PWA del cliente.
- **Comportamiento Esperado / Solución:**
  1. **El Moat de la PWA Multilocal (Billetera Universal):**
     - El cliente accede a un único link PWA asociado a su número de teléfono.
     - En una sola pantalla conviven las tarjetas de fidelización de todos los comercios adheridos (la cafetería de la mañana, la heladería de la tarde, la barbería del fin de semana).
     - Diferenciador competitivo radical: cero apps pesadas descargadas y acumulación cruzada. A futuro permite visibilidad cruzada de red y promociones conjuntas.
  2. **App de Mapa de Nahuel Aprobada (Demo en vivo):**
     - Funciona con geolocalización, coordenadas y el formulario oficial de 5 preguntas (2 generales + 3 de nicho).
     - Mejoras solicitadas para UX inmediata: exportación a CSV para análisis rápido en Sheets/Excel, indicadores visuales de estado (Pendiente, Visitado, Descartado, Early Adopter) y ruteo por proximidad.
  3. **Guía de Entrevistas y Psicología de Campo:**
     - Abordaje al cajero/encargado en mostrador ("Formo parte de un equipo local... un par de preguntas"). Cero vendedores.
     - Registro diferido estricto: anotar o grabar audio al salir del local (5 min post-visita), no en la cara del comerciante.
     - Cierre: Invitación al Programa formal de Early Adopters (acceso 100% gratuito al MVP a cambio de feedback semanal y validación) + pregunta abierta de automatización deseada.
  4. **Programa Formal de Early Adopters:**
     - Cupo de hasta 50 locales. Derechos: software sin costo. Obligaciones: feedback semanal estructurado y telemetría de uso en interfaz.
     - Documento de bases en Google Drive para revisión.
  5. **Operativo de Salida a Campo:**
     - Salida inmediata esta semana con corte y reunión de feedback el fin de semana.
- **Etiquetas:** `#reunion #pwa-multilocal #mapa-nahuel #salida-campo #early-adopters #alta`
- **Tópico / Componente Afectado:** `docs/p-fidelizar_master_notes.md`, app de mapa, relevamiento de campo.

---

### [NOTA-013] Asamblea Plenaria Fundacional: Estructura de Roles, Compensación, Cronograma Oficial y Pipeline
- **Fecha:** 2026-10-25 02:00
- **Categoría:** Negocio / Organización
- **Diagnóstico / Contexto:** Asamblea general del equipo completo (Jesús, Facundo, Nahuel, Pedro y Ramiro). Se formalizó la estructura directiva y operativa del equipo de software independiente, el esquema de incentivos, la validación preliminar de campo de Facundo y el cronograma estricto para noviembre.
- **Comportamiento Esperado / Solución:**
  1. **Estructura Orgánica y Roles Formalizados:**
     - **Jesús:** Liderazgo general del equipo con voto de confianza unánime. Dirección estratégica, visión de negocio, toma de decisiones de alto nivel y cumplimiento de entregables (sin control horario). En el plano de código, asume rol de dev junior guiado por Facundo. Identidad visual y branding del equipo.
     - **Facundo:** Líder técnico general. Define arquitectura, stack tecnológico, factibilidad de features y estándares de calidad (QA). Supervisa a Ramiro, Nahuel y Jesús.
     - **Pedro Enriquez:** Project Manager (Jira: epics, stories, milestones, subtareas). Puente de conexión entre liderazgo estratégico y ejecución técnica. Aporte en comunicación, análisis e informes institucionales.
     - **Ramiro:** Perfil técnico (desarrollo) + aporte en fotografía, branding y marketing.
     - **Nahuel:** Desarrollo frontend y mobile. Responsable de la App de Mapa (APK + Supabase).
  2. **Esquema de Trabajo y Compensación:**
     - Sin control de horas: entrega por hitos (clasificados en simple, medio, complejo) con pago acorde al hito.
     - Bonus por originación: 5% a 7% de las ganancias del proyecto para quien traiga el cliente o la oportunidad.
     - Participación optativa: quien no participa en un proyecto no cobra de él.
     - Fondo común: reserva porcentual para costos fijos compartidos (VPS, infraestructura, dominios).
     - Cadencia: 1 reunión general semanal distendida (fines de semana) + reuniones atómicas operativas (~30 min entre semana). Próxima: Martes a las 21:00 hs.
  3. **Validación Preliminar de Campo (Barbería por Facundo):**
     - El barbero no utiliza software (solo WhatsApp directo), trabaja solo y confirmó el dolor de clientes que no vuelven.
     - Receptivo a automatizaciones de recordatorio y dispuesto a probar una solución.
     - Aprendizaje clave: la ficha de campo se completa post-visita, no durante la charla, para no romper la naturalidad. Estrategia comercial: no tomar el "no" como definitivo y ofrecer piloto gratuito de 15 a 30 días.
  4. **Factibilidad y Cuello de Botella Crítico del MVP:**
     - Identificado el costo y facturación de la Meta WhatsApp Business API como el habilitador fundamental del producto. Se valida su viabilidad económica amortizando el costo dentro del abono SaaS (caso testigo del competidor Tuki).
  5. **Cronograma Oficial a Noviembre 2026:**
     - *Martes 21:00 hs:* Guía de entrevistas cerrada + App de mapa de Nahuel lista.
     - *3 al 7 de Noviembre:* Salida a campo y 40 entrevistas (10 por nicho).
     - *7 de Noviembre:* Cierre formal de la Fase 0 (fichas completas).
     - *9 al 15 de Noviembre:* Inicio del desarrollo de software.
     - *24 de Noviembre:* MVP funcional entregado a beta testers.
  6. **Proyecto en Pipeline (Exploratorio):**
     - Software e infraestructura para grabación y entrega automática de partidos en canchas de fútbol y pádel con IA para highlights (referencia: Spot Reel / Open Shorts), evaluando almacenamiento masivo on-premise vs. nube.
- **Etiquetas:** `#organizacion #roles #cronograma #hitos #pipeline #alta`
- **Tópico / Componente Afectado:** `docs/p-fidelizar_master_notes.md`, acuerdos de asamblea.
- **Fecha:** 2026-10-21 04:00
- **Categoría:** Arquitectura / Producto
- **Diagnóstico / Contexto:** Aclaración y diseño integral de la interacción en mostrador y del cliente final antes de salir a campo para fundamentar técnicamente el discurso en entrevistas.
- **Comportamiento Esperado / Solución:**
  1. **Hardware en Mostrador:** Computadora existente del comercio + Numpad USB ($10k ARS) apoyado en el mostrador apuntando al cliente. Cero segundas pantallas ni tablets forzadas.
  2. **Dinámica de Caja y Bifurcación:**
     - *Cliente Habitual:* Tipea número en Numpad + Intro -> confirmación verde en pantalla de cajera con nombre y sellos en <3s (cero clicks de la cajera).
     - *Cliente Nuevo:* Tipea número en Numpad + Intro -> pop-up en pantalla de cajera -> pregunta nombre, tipea en PC y Enter -> alta y disparo de WhatsApp de bienvenida con link PWA. Mecanismo anti-spam: frena errores de tipeo de habituales.
  3. **Cooldown y Política de Mesas:** Ventana estricta de 3 horas entre sellos por número (permite consumo mañana y tarde, bloquea fraude en el momento). Mesas con pago individual suman individual; pago unificado suma un solo sello al pagador.
  4. **Mecánica de Canje "Next-Visit" y Asiento Contable del $0:** El 6° sello desbloquea el voucher en el sistema (vigencia estricta de 15 días) para ser consumido en la 7ma visita. Resuelve la paradoja de canjear un café habiendo terminado de consumir uno en el momento. La visita de canje es de redención pura a costo $0 y **NO suma un nuevo sello** (el ciclo 1/6 arranca en la próxima compra paga). El cliente solo usa su teléfono en el Numpad como llave única (cero códigos dictados). Para el comercio: Modalidad A (descuento del 100% en POS tipo Fudo para bajar stock sin devengar IVA) o Modalidad B (cortesía de la casa y conciliación diaria en el reporte de Fideliz-Ar).
  5. **Política de Integridad y Cero Carga Manual:** Prohibida la edición libre de sellos desde paneles para evitar fraude interno ("sweethearting"). Solo se emiten sellos vía Numpad en caja. Se incorpora botón `Deshacer Sello` (Undo) en mostrador disponible durante **30 minutos** posteriores a la carga. El cooldown de 3 horas actúa como guardarraíl matemático sin convertir al software en policía.
  6. **Política WhatsApp Cero-Spam:** Máximo 2 mensajes por ciclo (Bienvenida en sello 1 + Premio Desbloqueado en sello 6) + 1 mensaje de rescate si transcurren 25 días de inactividad. Sellos intermedios se actualizan silenciosamente en la PWA y de palabra en caja.
- **Fecha:** 2026-10-26 04:00
- **Categoría:** Herramientas / Validación de Campo
- **Diagnóstico / Contexto:** Para la herramienta de mapa interactivo PWA que desarrolla Nahuel para la salida a campo del martes (relevamiento de locales, encargado, teléfono, notas y ruteo óptimo), se identificó la necesidad de persistencia multi-usuario en la nube sin costo ni despliegue de backend propio.
- **Comportamiento Esperado / Solución:**
  1. **Propuesta enviada a Nahuel:** Se le propuso utilizar **Baserow Cloud (`baserow.io`)** como backend headless (PostgreSQL no-código con API REST automática generada).
  2. **Guía Técnica de Implementación:** Se le preparó y dejó en el escritorio la especificación técnica completa `GUIA_BASEROW_PWA_LOCALES.md` (formato para agentes de código: endpoints GET/POST/PATCH con `user_field_names=true`, modelo de datos de locales, y patrón de sincronización en vivo por polling corto).
  3. **Objetivo Dual:** Ahorrarle tiempo de backend a Nahuel para asegurar la entrega del martes y testear la viabilidad de Baserow en combate real para potenciales proyectos futuros del equipo.
- **Etiquetas:** `#arquitectura #herramientas #campo #pwa #baserow #alta`
- **Tópico / Componente Afectado:** Herramienta de campo (mapa de locales), `docs/p-fidelizar_master_notes.md`.

### [NOTA-015] Naming Oficial del Producto y Descarte de Nombres Genéricos: Vookly
- **Fecha:** 2026-10-28 03:00
- **Categoría:** Branding / Producto / Negocio
- **Diagnóstico / Contexto:** Tras constatar la saturación extrema en Google e INPI de marcas y startups con raíces literales (*Fiel, Leal, Loyal, Puntos*), se descartaron los nombres genéricos descriptivos para evitar litigios de marca, confusión de mercado y percepción corporativa pesada.
- **Comportamiento Esperado / Solución:**
  1. **Nombre Oficial Elegido:** **Vookly** (pronunciado *"Vúkli"*).
  2. **Etimología y Arquitectura Semántica:**
     - Nace de la fonética de *bucle* (loop / ciclo continuo de retorno y retención de clientes).
     - Incorpora el sufijo moderno `-ly` propio de herramientas SaaS de clase mundial (Bitly, Calendly, Grammarly).
     - Fonética con fuerza inicial (*V*) y solidez central (*k*), suavizada por la doble *oo*.
  3. **Ventajas Competitivas de Naming:**
     - **Cross-nicho total:** Funciona con naturalidad en cafeterías de especialidad, heladerías, panaderías, barberías y retail de indumentaria.
     - **Cero fricción en mostrador:** Fraseo orgánico para el cajero (*"¿Cargaste en Vookly?"*, *"Poné tu celu en Vookly y te llega el regalo"*).
     - **Limpieza marcaria:** Despejado de competidores directos de fidelización en Argentina y LATAM.
- **Etiquetas:** `#branding #naming #producto #vookly #alta`
- **Tópico / Componente Afectado:** Identidad de marca, `docs/p-fidelizar_master_notes.md`, presentaciones y materiales comerciales.

---

## 6. 🏷️ Índice de Tópicos y Relaciones Cruzadas
| Tag | Descripción | Notas Vinculadas |
| :--- | :--- | :--- |
| `#arquitectura` | Decisiones estructurales y de sistema | [NOTA-001], [NOTA-002] |
| `#ui-ux` | Diseño visual, interfaz y experiencia | [NOTA-005] |
| `#bug` | Correcciones de fallos o comportamientos anómalos | - |
| `#idea-futura` | Propuestas y mejoras para próximas fases | [NOTA-005] |
| `#exploracion` | Ideas preliminares y debates no vinculantes | [NOTA-005] |
| `#mvp-scope` | Blindaje de alcance y objetivos de corto plazo | [NOTA-005] |
| `#alta` | Tareas o notas de máxima prioridad | [NOTA-001], [NOTA-002], [NOTA-003], [NOTA-004], [NOTA-006], [NOTA-007], [NOTA-008] |
| `#negocio` | Definiciones de modelo de negocio y monetización | [NOTA-004] |
| `#scope` | Alcance y nichos priorizados del producto | [NOTA-004], [NOTA-007], [NOTA-008] |
| `#competencia` | Análisis y benchmark de plataformas competidoras | [NOTA-003], [NOTA-006] |
| `#precios` | Esquemas tarifarios y planes de mercado en ARS | [NOTA-006] |
| `#mecanica-sellos` | Reglas matemáticas, cálculo de ROI y umbrales de sellos | [NOTA-007] |
| `#reunion` | Minutas y resoluciones oficiales de asamblea de equipo | [NOTA-004], [NOTA-007] |
| `#metodologia` | Metodología de validación, filtros de preguntas y secuencia | [NOTA-008] |
