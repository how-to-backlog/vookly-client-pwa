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

## 4. 📌 Roadmap Activo y Checklist de Tareas
> *Nota: Al completar una tarea, el agente que la finalice debe firmar la línea con su marca de tiempo.*
### Fase 0: Discovery y Validación de Campo (Prioridad Actual)
- [x] 0.1 Benchmark Competitivo: Auditoría de 3 plataformas (Puntos App, Novity, Stamp Me) bajo 5 dimensiones clave <!-- [agente-1]: finalizado 2026-10-03 01:30 (Asignado: Jesús & agente-1, entregable: BENCHMARK_COMPETITIVO.md) -->
- [ ] 0.2 Protocolo y Guion de Entrevistas Rápidas en Terreno (Validación de fricciones de caja y retención en <3 min) <!-- [agente-1]: planificado 2026-10-03 01:10 -->
- [ ] 0.3 Pipeline y Mapeo de Comercios Locales (Córdoba, Formosa, CABA) <!-- [agente-1]: planificado 2026-10-03 01:10 -->

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
| `#alta` | Tareas o notas de máxima prioridad | [NOTA-001], [NOTA-002], [NOTA-003], [NOTA-004] |
| `#negocio` | Definiciones de modelo de negocio y monetización | [NOTA-004] |
| `#scope` | Alcance y nichos priorizados del producto | [NOTA-004] |
| `#competencia` | Análisis y benchmark de plataformas competidoras | [NOTA-003] |
