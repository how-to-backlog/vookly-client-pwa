# 📋 Minuta Oficial de Reunión General de Equipo (Lunes 02/11/2026)

> **Fecha:** Lunes 2 de Noviembre de 2026 (21:38 a 23:15 hs)  
> **Participantes:** Jesús Fleitas (CEO), Facundo Majda (Tech Lead), Pedro Enriquez (PM), Ramiro Sánchez (Branding/Técnico)  
> **Fuentes:** Transcripción completa Meetily (1h 36m, 13.834 palabras) y Resumen Granola de Facundo.  
> **Documento:** `docs/minuta_reunion_general_lunes_02_11.md`

---

## 1. 🚶 Relevamiento de Campo (Salida Jesús + Pedro)
- **Confirmación del Dolor:** Los comerciantes independientes no tienen contacto con sus clientes y no son conscientes de la fuga de dinero que esto representa hasta que se les hace la pregunta.
- **Segmento Validado (ICP):** Comercios de 1 a 3 locales independientes. Las grandes cadenas absorben el churn por volumen o ya tienen soluciones in-house.
- **Evolución Natural a Pitch de Venta:** La encuesta derivó naturalmente en interés por la solución. Los comerciantes preguntaron proactivamente por la app.
- **Contactos Clave Conseguidos:**
  - Dueño directo de *Cookie Time*.
  - Gerente de sucursal.
  - Jefe directo de personal.
- **Aprendizaje Clave:** Abandonar el speech rígido y estructurado; la charla informal y distendida en mostrador extrae mucha mejor información.

---

## 2. 📱 Presentación de la Maqueta PWA (Jesús)
- Jesús presentó la PWA cliente interactiva alojada en Vercel.
- Se explicó que el foco fue la lógica de UX pura (blanco y negro), modular y sin distracciones estéticas.
- **Mecánica del Roadmap:**
  - Curva en S vertical ascendente infinita.
  - Sellos acumulativos permanentes (nunca se resetean a cero tras canjear).
  - Gamificación: cada premio subsiguiente es de mayor valor que el anterior.
  - Configuración del comercio: nombre, producto y sellos requeridos.
- **Multi-comercio:** Una sola PWA nuclea las tarjetas de todos los locales adheridos.
- **Flujo de Canje y Ficha Antifraude:**
  1. El cliente toca el botón o el nodo cuando está en un sello premiado.
  2. Confirmación de presencia física en caja.
  3. Generación de código efímero de 4 dígitos (vigencia 15 minutos).
  4. El cajero tipea los 4 dígitos en el mismo teclado físico (Numpad) usado para teléfonos (la longitud distingue teléfono de token).
  5. El canje no otorga nuevo sello; una compra adicional en el acto sí.
- **Simulador Demo:** Panel auxiliar para cambiar en vivo el nombre del local, productos y simular progreso frente al comerciante.
- **Aprobación Unánime:** El equipo acordó usar esta PWA en las próximas salidas a la calle como demo interactiva.

---

## 3. 🛡️ Prevención de Fraude y Auditoría
- **Rate Limit:** Máximo 1 sello por persona/comercio cada 3 a 6 horas (reforzado a nivel base de datos, no editable por el comercio).
- **Guardarraíl Horario:** No permitir emisión de sellos fuera del horario comercial del local.
- **Ventana de Corrección:** 15 minutos para deshacer un sello mal emitido; luego queda inmutable.
- **Cero Carga Manual:** Prohibido agregar o quitar sellos arbitrariamente desde paneles administrativos.
- **Audit Log Append-Only (Propuesta Ramiro):** Registro inmutable de eventos (sello otorgado, premio entregado) con timestamps para cruzar con tickets fiscales si fuera necesario.

---

## 4. 🗄️ Versionado del Roadmap y Reglas en Vuelo
- **Problema:** Un comerciante cambia un premio o sellos a mitad de camino y puede defraudar a clientes en progreso.
- **Solución Acordada:**
  - Versiones de catálogo por comercio (v1, v2, v3).
  - Los clientes en progreso mantienen su tramo inmediato prometido (a 1-2 sellos de distancia no se les puede empeorar el premio).
  - El historial de premios ya canjeados es inmutable (nunca se altera hacia atrás).
  - Si falta stock físico, el comercio debe sustituir por un producto de igual o mayor valor acordado en mostrador.
  - **Acción Jesús:** Compartir el esquema JSON representativo para guiar a los agentes y al backend.

---

## 5. 🛠️ Stack Tecnológico y Decisiones de Herramientas
- **Gestión de Proyecto:** Migración de Jira a **Plane** (soporta hasta 12 usuarios gratis, liviano, integración con MCPs y opción de self-hosting en VPS si hiciera falta). Facundo creará la organización y recolectará los correos.
- **Enfoque de Diseño:** Consenso total sobre **Stitch**: solo como herramienta de inspiración visual y screenshots para promptear agentes. **Prohibido exportar código de Stitch a producción** (por ser monolítico e inmantenible). El MVP se construye desde cero con arquitectura modular de componentes.
- **Capa de IA / LLMs:** Proveedor unificado **CoreWeb** para volumen temprano.
  - *DeepSeek V4 Flash:* Baja latencia y costo mínimo para tareas rutinarias y mensajes de WhatsApp.
  - *GLM:* Generación de código y tareas estándar.
  - *DeepSeek (Full):* Tareas complejas de razonamiento arquitectónico.
  - Gasto actual del equipo: ~$19-25 en 2 días.
- **Repositorio:** Jesús transferirá/pusheará el repositorio de la maqueta a la organización oficial de GitHub.

---

## 6. 🏗️ Arquitectura del MVP
- **Dos Bloques de Scrum:**
  1. PWA (interfaz cliente de fidelización).
  2. Panel de Comercio / Mostrador (teclado de sellos, validación de código de 4 dígitos y config de premios).
- **Back-Office Interno (Admin de Lumenlab):**
  - Panel interno para monitorear tenants, gestionar onboarding y facturación.
  - Debe estructurarse antes de iniciar desarrollos cliente masivos.
- **Onboarding de Comercios:** Proceso estilo KYC con carga de datos completa; el comercio no opera si el perfil está incompleto.
- **Integración con WhatsApp (Meta Business API):**
  - Camino crítico liderado por Jesús esta semana.
  - Se descartó Telegram (baja adopción).
  - Se descartó WhatsApp Web no oficial (alto riesgo de baneo de números).
  - CoreWeb + DeepSeek Flash como capa generativa para personalización de mensajes.

---

## 7. 🎨 Identidad Visual y Marca
- **Prioridad MVP:** Funcionalidad antes que estética visual perfecta.
- Ramiro asistirá a Jesús en sesiones de branding (nombre definitivo, tipografía, paleta de colores).
- En el futuro, cada comercio subirá su propio fondo 3D personalizado para la tarjeta virtual.

---

## 8. 📌 Próximos Pasos (Next Steps)
| Responsable | Tarea |
| :--- | :--- |
| **Equipo** | Unirse a la organización de Plane y a la organización de GitHub. |
| **Jesús** | Investigar la integración oficial de Meta Business API para WhatsApp. |
| **Jesús** | Compartir el JSON de ejemplo del versionado de roadmaps (`docs/reglas_cambio_dinamico_premios_y_sellos.md`). |
| **Jesús** | Subir el repositorio de la PWA a la organización compartida de GitHub. |
| **Ramiro** | Investigar mecanismos antifraude y audit log append-only. |
| **Facundo + Ramiro** | Comenzar la arquitectura de la API del back-office interno. |
| **Jesús + Pedro** | Continuar salidas de campo con los 5 locales restantes en Córdoba usando la PWA como demo. |
| **Equipo** | Próxima asamblea plenaria: **Viernes por la tarde (16:00 a 17:00 hs)**. |
