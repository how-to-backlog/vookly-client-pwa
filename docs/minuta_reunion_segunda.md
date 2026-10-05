# Minuta de Reunión de Equipo — Validación de Modelo y Definición de Scope

> **Proyecto:** Fideliz-Ar (`p-fidelizar`)  
> **Fecha:** 2026-10-04  
> **Participantes:** Jesús Fleitas (Córdoba), Ramiro Gonzalez (Buenos Aires), Facundo Majda (Formosa), Nahuel Gonzalez (Formosa)  
> **Próxima Reunión:** Martes 6 de octubre de 2026 a las 16:00 hs  

---

## 1. Síntesis y Enfoque del Producto
- **Propósito:** App de puntos y sellos orientada a comercios independientes, medianos y pequeños.
- **Estrategia de Comunicación / Marketing:**
  - El motor subyacente es **agnóstico** por nicho.
  - La capa visual, el marketing y el posicionamiento se adaptan al nicho específico (ej. presentarse como "la app para cafeterías" convierte mucho mejor ante el dueño que un discurso genérico de fidelización).
- **Foco Estratégico Inicial:** Validar en **un solo nicho vertical** antes de escalar a múltiples rubros.
- **Incorporación al Equipo:** Se formaliza la suma de **Nahuel Gonzalez** (Formosa) al equipo de desarrollo.

---

## 2. Conclusiones del Benchmark Competitivo (3 Soluciones Auditadas)

1. **Puntos App (Argentina - Local):**
   - *Modelo:* Web móvil + DNI. Cero fricción de descarga para el cliente.
   - *Precios:* Plan básico $20.000 ARS/mes (hasta 200 clientes, 2 comercios, promociones ilimitadas).
   - *Punto Crítico:* Sin canal de comunicación directa comercio-cliente (ausencia total de WhatsApp o mensajería activa).
2. **Novity (Argentina - Local):**
   - *Modelo:* Apple Wallet y Google Wallet + integración POS (Fudo).
   - *Precios:* Básico $15.000 ARS/mes (hasta 100 clientes, 1 comercio, máx. 2 promos) y Pro $42.000 ARS/mes (clientes ilimitados).
   - *Barrera:* Requiere hardware/software Fudo y que el cliente tenga configurada la billetera (~40% de deserción en Android local por falta de Wallet activa).
3. **Stamp Me (Internacional - Global):**
   - *Modelo:* Tarjeta de sellos digital ("Buy X, Get Y") + App móvil descargable.
   - *Precios:* USD 50 a 200/mes. Descartada para comercialización en Argentina por costo en divisa extranjera.
   - *Punto a Rescatar:* Mecanismo de seguridad de cupones con temporizador de autodestrucción a los 3 minutos para evitar fraudes y reutilizaciones.

---

## 3. Decisiones de Modelo de Negocio y Operativa

### 3.1. Identificador Principal del Cliente: Teléfono Móvil
- **Reemplazo del DNI:** Se sustituye el DNI por el **número de teléfono** como dato primario de identificación.
  - *Fundamento:* Ambos tienen una fricción similar en mostrador, pero el DNI no permite re-engagement posterior; el teléfono habilita comunicación directa inmediata.
- **Formateo y Sanitización Estricta (Regex):**
  - Sin prefijo de país `54`, sin `9`, sin `15`.
  - Longitud máxima: 12 dígitos.
  - *(Módulo validado y provisto por Ramiro desde su desarrollo previo de módulo de fiado).*
- **Estrategia de Captura:**
  - Ofrecer beneficio inmediato en la primera carga (ej. descuento inicial o sellos extra de bienvenida), o solicitarlo progresivamente en el primer hito de recompensas.

### 3.2. Mecánica: Sellos vs. Puntos
- Los **sellos por visita** son significativamente más intuitivos para el cliente y el cajero frente a puntos abstractos por dinero.
- **Desafío identificado:** Cómo tratar compras con productos de distinto valor dentro de una misma tarjeta de sellos.
- *Acción asignada a Ramiro:* Investigar cómo resuelve Stamp Me y el mercado la diferenciación de productos de diferente precio en sistemas de sellos.

### 3.3. Hardware en Mostrador
- **Descarte:** Se descarta la integración con POSNET/NFC en esta etapa por costo de importación y complejidad técnica de homologación.
- **Alternativa A:** Teclado numérico físico USB/Bluetooth (~$11.000 - $15.000 ARS) orientado hacia el cliente en el mostrador para que digite su teléfono.
- **Alternativa B:** El cajero digita el teléfono del cliente desde la PC / tablet de caja habitual.

### 3.4. Canal de Comunicación: WhatsApp
- **Canal Oficial:** WhatsApp como canal primario (incomparablemente más efectivo que SMS o email en Argentina).
- **Casos de Uso Automatizados:**
  - Saludo y regalo de cumpleaños.
  - Alerta de reactivación a clientes inactivos (+20 días sin visita).
  - Promociones personalizadas por nivel de recurrencia.
  - Envío de comprobante o estado de cuenta de sellos.

### 3.5. Modelo de Monetización (SaaS)
- Estructura de **2 planes comerciales** diferenciados por:
  - Cantidad de clientes registrados activos.
  - Cantidad de comercios / sucursales.
  - Cantidad de promociones simultáneas activas.

### 3.6. Momento de Registro
- Estrictamente en **caja al momento del cobro**, al ser el único punto de contacto directo y asegurado con el 100% de los clientes.

---

## 4. Scope Oficial de Nichos (4 Nichos Seleccionados)

Se restringe la investigación y el desarrollo exclusivamente a 4 nichos de alta recurrencia y baja complejidad operativa en mostrador:

1. **Cafeterías (CAF)**
2. **Panaderías (PAN)**
3. **Heladerías (HEL)**
4. **Barberías (BAR)**

*Nichos formalmente descartados:*
- Confiterías (CON): descartada/absorbida por cafeterías y panaderías.
- Cadenas corporativas masivas (ej. Grido): ya poseen soluciones propias cerradas.
- Estacionamientos y lavaderos: baja frecuencia de interacción y baja predisposición tecnológica.
- Reparto de agua y hielo: dinámica de calle y logística no compatible con mostrador POS.

---

## 5. Nomenclatura Estándar para Investigación y Scoring de Leads

Para unificar los datos relevados por los 4 desarrolladores en Córdoba, Buenos Aires y Formosa, se aprueba la siguiente taxonomía:

### Nicho
- `CAF` — Cafetería
- `PAN` — Panadería
- `HEL` — Heladería
- `BAR` — Barbería

### Escala por Cantidad de Locales
- `L1` — 1 local
- `L2` — 2 locales
- `L3` — 3 locales
- `L4-5` — 4 a 5 locales
- `L6-10` — 6 a 10 locales
- `L10+` — Más de 10 locales

### Cobertura Geográfica
- `LOC-1` — Una sola localidad
- `LOC-M` — Múltiples localidades
- `PROV-M` — Múltiples provincias

### Presencia Digital
- `GMB` — Google Business Profile
- `IG` — Instagram activo
- `WEB` — Sitio web propio
- `WA` — WhatsApp comercial / Business
- `DEL` — Delivery o pedidos online integrados

### Nivel de Actividad Digital
- `A0` — Sin actividad observable
- `A1` — Actividad ocasional
- `A2` — Actividad frecuente
- `A3` — Actividad muy frecuente

### Métricas Públicas Relevadas
- `REV` — Cantidad de reseñas públicas (Google Maps / otras)
- `RAT` — Calificación promedio (Rating de 1.0 a 5.0)
- `FOL` — Cantidad de seguidores en redes (Instagram)
- `LOC` — Cantidad total de sucursales auditadas

---

## 6. Próximos Pasos y Asignación de Tareas

| Responsable | Tarea Asignada |
| :--- | :--- |
| **Facundo Majda** | Armar scoring y pipeline de leads por nicho en las 3 provincias (Formosa, Buenos Aires, Córdoba) aplicando la nomenclatura oficial. |
| **Ramiro Gonzalez** | Investigar mecánicas de Stamp Me para diferenciar productos de distinto precio en sellos, y profundizar cuestionario operativo con comercios reales. |
| **Jesús Fleitas & Agente-1** | Sincronización documental integral en el repositorio (Minuta 2, Master Notes NOTA-004 y poda del Research Master al scope de 4 nichos). |
| **Equipo Completo** | Próxima reunión de seguimiento: **Martes 6 de octubre de 2026 a las 16:00 hs**. |
