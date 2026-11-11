# Minuta de Reunión General Semanal de Equipo (11/11/2026)

- **Fecha y Hora:** 11 de Noviembre de 2026, 16:04 - 17:15 hs.
- **Participantes:** Jesús Fleitas, Pedro, Facundo, Nahuel, Ramiro.
- **Objetivo Central:** 
  1. Balance y aprendizajes de la primera salida de campo en Formosa (heladerías y panaderías).
  2. Alineación del guion comercial y protocolo de seguimiento presencial a comerciantes.
  3. Demostración interna y revisión del onboarding/tour interactivo en la PWA (Vookly).
  4. Definición del modelo de negocio por niveles (Roadmap continuo / gamificación vs. planes).
  5. Infraestructura, costos iniciales (Dominio, Twilio, Meta Business API) y cierre de Fase 0.

---

## 1. 📍 Salidas de Campo: Resultados y Hallazgos Reales

### A. Formosa (Facundo y Nahuel): Nichos Heladerías y Panaderías
- **Recorrido:** 3 a 4 heladerías y 3 panaderías visitadas.
- **Diferencia Franquicias vs. Negocios Locales:**
  - **Franquicias (ej: Duomo, Cremolatti):** Resistencia burocrática, promociones decididas a nivel central o páginas web desconectadas de la realidad provincial. El personal no tiene autonomía de decisión.
  - **Negocios Locales / Artesanales (Alta receptividad):** Los comerciantes independientes buscan activamente formas de digitalizarse y retener clientes.
- **Casos Clave y Leads Calientes:**
  1. **Panadería Flora (o Florida):** El encargado atendió directamente y propuso una **reunión fuera del horario comercial** para ver la aplicación en profundidad y evaluar implementación.
  2. **Heladería Artesanal Necochea:** Se habló con la encargada. El local **se maneja 100% con lápiz y papel** (ni siquiera usan Excel). La encargada mostró gran interés, consultó directamente por precios y coordinará reunión con su esposo (socio encargado).
  3. **Duomo:** Contacto a través de empleados que se ofrecieron a remitir video/audio al encargado general itinerante.

### B. Córdoba (Jesús y Pedro): Nichos Cafeterías y Galletiterías
- **Café del Popolo:** Contacto con Facundo (empleado). Se acordó visita presencial para mostrar la demo completa en mostrador y que sirva de puente con el dueño de la cadena.
- **Cookie Time (Galletitería):** Validación de la comparativa de precio basada en volumen de ventas.
- **Planificación:** El viernes se completa la tanda de locales en Córdoba para cerrar los 10 comercios de Fase 0.

### C. Buenos Aires (Ramiro): Nicho Barberías
- Primera salida realizada a 1 local (otro cerrado). Se clonó la base de datos de cafeterías para registrar encargados y números. Planificará recorrido por zonas en transporte público para optimizar tiempos.

---

## 2. 🎯 Protocolo Comercial y Tácticas de Venta Validadas (Jesús)

1. **Prioridad Absoluta: Contacto Presencial:**
   - La regla no es mandar un link por WhatsApp y desentenderse.
   - El empleado no es vendedor de software; mandarle solo el link tiene baja tasa de conversión. Se debe ir al local en persona, abrir la demo en el celular, guiar el tour y luego sí dejar el enlace para seguimiento.
   - Hacer presencia constante: *"estoy de paso y te paso a saludar/hacer acordar"*.
2. **Personalización y Efecto Memoria:**
   - Saber de memoria los nombres del local, del empleado que atendió y del encargado.
   - Si atiende otra persona: *"La otra vez me atendió Juliana..."*. Rompe la barrera inicial y genera familiaridad inmediata.
3. **Respuesta ante la objeción: "No soy el dueño":**
   - *"Totalmente de acuerdo, nos encantaría hablar con el dueño, pero tu opinión es vital porque sos quien está en la barra todos los días cara a cara con los clientes y sabés mejor que nadie qué prefieren."*
4. **Cómo responder cuando preguntan el precio (Sin tener el producto cerrado):**
   - **Nunca mentir ni inventar una cifra fija.**
   - Explicar que está en desarrollo activo y que tendrán **2 a 3 semanas de prueba 100% gratuita** donde el feedback de ellos vale más que la cuota.
   - **Anclaje al valor de sus propios productos:**
     - *"Con lo que vendés de 3 kilos de pan, o medio kilo de helado, o 4 galletas en un día, cubrís el costo mensual del servicio para todo el mes."*
5. **Generar la necesidad con preguntas dirigidas:**
   - *"Si un cliente habitual deja de venir, ¿tenés alguna forma de contactarlo para que vuelva?"* (El 90% responde que no, exponiendo la falta de control sobre su base de clientes).

---

## 3. 🕹️ Arquitectura de Gamificación y Modelo de Negocio (Vookly)

### A. La Psicología del Roadmap Infinito (Estilo Duolingo / Candy Crush)
- **El problema de las tarjetas tradicionales de sellos:** Al llegar al sello 10 y reiniciar a cero, el cliente experimenta una sensación psicológica de pérdida de progreso acumulado, lo que genera una ventana de abandono.
- **La solución Vookly:** Un Roadmap continuo donde los sellos nunca se resetean al vacío. Si un cliente canjea un tostado en el sello 15, su progreso se mantiene en 15 porque visualiza que en el sello 20 tiene un brunch completo. Se mantiene al cliente enganchado durante 4 a 6 meses.

### B. Segmentación de Planes (Feature Toggles / Flags)
- En lugar de restringir qué tipo de productos pueden regalar, se restringe la **cantidad de hitos/premios simultáneos en el mapa** y la personalización estética:
  - **Plan Gratuito / Entrada:** 2 a 3 premios configurables. Permite entrar sin fricción y probar el sistema.
  - **Plan Pro / Premium:** Hasta 7-8 premios, personalización avanzada de tarjeta (plantillas propias e imágenes en lugar de solo patrones) y analíticas de recurrencia.
  - **Plan Ultra:** Premios ilimitados en el roadmap y funciones multi-sucursal.
- **Estrategia de Código:** Desarrollar el MVP con todas las features completas (versión Pro) y aplicar condicionales/switches simples para degradar a la versión básica, evitando duplicar lógicas en el frontend y backend.

---

## 4. 🛠️ Acciones Técnicas, Infraestructura y Finanzas

1. **Fix Menor en PWA detectado por Jesús durante la demo:**
   - En el local de Coffee Shop, se mostraba la pastilla de "Reclamar café clásico" con 17 sellos sin que el usuario estuviera parado exactamente en el nodo que entrega dicho café. Se sincronizará el estado para que coincida exactamente con la cantidad de sellos del hito.
2. **Dominio Oficial Vookly:**
   - Nahuel cotizó el dominio (~30.000 ARS). Pasará su CBU por el grupo para dividir el gasto equitativamente entre los integrantes del equipo.
3. **Twilio (Automatización de WhatsApp):**
   - Costo estimado: $10 - $15 USD mensuales.
   - Se financiará inicialmente como inversión del equipo (se absorberá del 15-20% del cobro mensual a clientes cuando arranque la facturación).
4. **Validación de Meta Business API:**
   - Facundo coordinará con Jesús para cargar datos y validar la línea oficial de WhatsApp esta semana (reunión enfocada jueves/viernes).
5. **Planilla Contable de Inversión Inicial:**
   - Pedro creará una hoja bloqueada en el Excel compartido para registrar ingresos, egresos, aportes de cada socio y costos fijos (dominio, Twilio, marketing/tarjetas).
6. **Plane Work Items:**
   - Cada responsable debe mantener al día su Work Item de nicho adjuntando los comercios relevados y estableciendo fechas límite (*Due Dates*) estrictas para culminar la Fase 0 esta misma semana.

---

## 5. 📋 Próximos Pasos y Asignación de Tareas

| Responsable | Tarea / Compromiso | Plazo / Fecha |
| :--- | :--- | :--- |
| **Jesús & Pedro** | Retirar tarjetas de presentación en gráfica y completar los 10 locales de Córdoba | Viernes 13/11 |
| **Facundo & Nahuel** | Concretar reunión con Panadería Flora y Heladería Necochea en Formosa | Esta semana |
| **Nahuel** | Enviar CBU para compra del dominio de Vookly y registrar gasto | Inmediato |
| **Pedro** | Crear tabla de gastos e inversión inicial en el Excel compartido | Esta semana |
| **Ramiro** | Planificar circuito de barberías en Buenos Aires para completar relevamiento | Esta semana |
| **Facundo & Jesús** | Sesión técnica para validación de Meta Business API y arquitectura de BD | Jueves / Viernes |
| **Jesús** | Fix de sincronización visual de reclamo de premio en Coffee Shop de la demo | 12/11 |