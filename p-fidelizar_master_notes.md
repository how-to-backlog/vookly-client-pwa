# 📋 Master Notes: p-fidelizar

> **Proyecto:** p-fidelizar  
> **Fecha de creación:** 2026-10-03 00:37  
> **Repositorio:** https://github.com/jerchufleitas/p-fidelizar  
> **Entorno:** Ubuntu WSL2 (/home/jesus/projects/p-fidelizar)  
> **Gobernanza:** Agente 1 (Arquitecto / Ejecutor) | Agente 2 (Anotador / Escriba)  

---

## 1. 🎯 Visión y Objetivos del Producto
- **Propósito:** Plataforma agnóstica de fidelización y retención de clientes por puntos y recompensas personalizadas para comercios independientes y cadenas pequeñas.
- **Público Objetivo:** Comercios de cercanía / locales independientes (1-4 sucursales) y sus clientes habituales en gastronomía, servicios y logística liviana.
- **Valor Principal:** Eliminar la fricción de cobro en mostrador (identificación en <3 seg, sin app obligatoria para el consumidor) y conectar el abismo post-venta con re-engagement automatizado.

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

---

## 6. 🏷️ Índice de Tópicos y Relaciones Cruzadas
| Tag | Descripción | Notas Vinculadas |
| :--- | :--- | :--- |
| `#arquitectura` | Decisiones estructurales y de sistema | [NOTA-001], [NOTA-002] |
| `#ui-ux` | Diseño visual, interfaz y experiencia | - |
| `#bug` | Correcciones de fallos o comportamientos anómalos | - |
| `#idea-futura` | Propuestas y mejoras para próximas fases | - |
| `#alta` | Tareas o notas de máxima prioridad | [NOTA-001], [NOTA-002], [NOTA-003] |
| `#competencia` | Análisis y benchmark de plataformas competidoras | [NOTA-003] |
