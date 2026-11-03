# 📱 Investigación Técnica Oficial: Meta Business Cloud API para WhatsApp (Vookly / Fideliz-Ar)

> **Documento:** `docs/investigacion_meta_business_whatsapp_api.md`  
> **Fecha:** 2026-11-03  
> **Autor:** Jesús Fleitas (CEO) & Equipo de Arquitectura  
> **Contexto:** Tarea `FIDELIZAR-1` en Plane (Asignada a Jesús)  
> **Estado:** Documento de Especificación e Investigación Completa

---

## 1. 🎯 Resumen Ejecutivo y Conclusión Estratégica

Para el MVP de Vookly, **descartamos definitivamente:**
1. **WhatsApp Web Scrapers (Puppeteer/Baileys/WPPConnect):** Riesgo extremo de baneo permanente del número del comercio o de Vookly (Meta bloquea números no oficiales en <48 hs ante ráfagas de mensajes transaccionales).
2. **Telegram:** Penetración nula en el público masivo gastronómico/retail de Argentina.

**El camino elegido es:** **Meta WhatsApp Business Cloud API Oficial**.  
Meta no cobra mensualidad fija de acceso a la API para desarrolladores directos; cobra **únicamente por mensaje entregado**.

---

## 2. 💰 Estructura de Costos Oficial (Rate Card Argentina - Vigente Octubre 2026)

Meta cobra por mensaje entregado según la categoría del mensaje y el prefijo de país del destinatario (`+54` Argentina):

| Categoría | Cuándo se usa en Vookly | Costo USD / mensaje | Costo aprox. ARS | Aprobación previa |
| :--- | :--- | :--- | :--- | :--- |
| **Utilidad (Utility)** | 1° Sello (Bienvenida + Link PWA) y 6° Sello (Cupón Ganado) | **$0.0260 USD** | ~$38 ARS | Plantilla aprobada |
| **Marketing** | Campaña de reactivación tras 25 días sin compras | **$0.0618 USD** | ~$90 ARS | Plantilla aprobada |
| **Servicio (Service)** | Respuestas a consultas dentro de ventana de 24 hs | **1.000 gratis / mes** (luego $0.0260) | Gratis | Cero aprobación |

### Impacto en la Estructura de Costos de Vookly:
* **Nuestra Política Estricta de 2 Mensajes por Ciclo:**
  - Mensaje 1 (Utilidad): ~$0.026 USD
  - Mensaje 2 (Utilidad): ~$0.026 USD
  - **Costo total por cliente fidelizado:** **~$0.052 USD (~$75 ARS)**.
* **Margen para Vookly:** Si cobramos un abono mensual de $25.000 a $45.000 ARS por local, el costo de WhatsApp representa menos del 5% del ticket mensual del comercio. Es hiper-rentable.

---

## 3. 🏗️ Arquitectura de Envío: ¿1 Número Central vs. Número por Comercio?

Existen dos modelos arquitectónicos para la Cloud API:

### Modelo A: Número Central Unificado de Vookly ("El Bot de Notificaciones") — *RECOMENDADO PARA MVP*
* **Cómo funciona:** Vookly registra un número oficial corporativo verificado (ej: `+54 9 351...` "Vookly Billetera").
* **Flujo:** Todos los mensajes de bienvenida de los comercios salen desde este número oficial:
  > *"¡Hola Martín! Sumaste tu 1° sello en **The Coffee House** ☕. Seguí tu progreso acá: `vookly.app/c/token123`"*
* **Ventajas para el MVP:**
  - **Cero fricción de onboarding:** El comercio no tiene que registrar una WABA (WhatsApp Business Account) ni verificar personería jurídica ante Meta. Se da de alta en 5 minutos.
  - Costos centralizados en una sola tarjeta de crédito administrada por Vookly.
  - Tiempo de salida a producción: **2 a 3 días**.

### Modelo B: Multi-Tenant Tech Provider (Embedded Signup de Meta) — *FASE 2*
* Cada comercio conecta su propio número de WhatsApp Business mediante el modal "Embedded Signup v4".
* Requiere que Vookly sea verificado como **Meta Tech Provider / Solution Partner**.
* Es el camino para cuando la plataforma escale a más de 50 locales.

---

## 4. 📝 Plantillas Oficiales Requeridas (Templates)

Para enviar mensajes proactivos (fuera de la ventana de 24 horas), Meta exige registrar plantillas en el panel de desarrollador:

### Plantilla 1: `bienvenida_onboarding_v1` (Categoría: UTILITY)
* **Texto:**
  > *"¡Hola {{1}}! Sumaste tu 1° sello en {{2}}. Podés ver tu camino de premios y tus sellos acumulados en tu billetera digital: {{3}}"*
* **Variables:**
  - `{{1}}`: Nombre del cliente (*"Martín"*).
  - `{{2}}`: Nombre del local (*"The Coffee House"*).
  - `{{3}}`: Enlace único con token (*"https://vookly.vercel.app/local/cafeteria"*).

### Plantilla 2: `premio_desbloqueado_v1` (Categoría: UTILITY)
* **Texto:**
  > *"¡Felicitaciones {{1}}! Completaste tus sellos en {{2}} y te ganaste: {{3}} 🎁. Tenés 15 días para canjearlo en el mostrador mostrando tu código: {{4}}"*
* **Variables:**
  - `{{1}}`: Nombre del cliente.
  - `{{2}}`: Nombre del local.
  - `{{3}}`: Título del premio (*"Café Clásico + Medialunas"*).
  - `{{4}}`: Enlace directo a la PWA.

### Plantilla 3: `reactivacion_cliente_dormido_v1` (Categoría: MARKETING)
* **Texto:**
  > *"¡Hola {{1}}! En {{2}} hace más de 20 días que no te vemos. Tenés {{3}} sellos esperando en tu tarjeta. Si venís esta semana, ¡te regalamos un beneficio especial!: {{4}}"*

---

## 5. ⚙️ Prerrequisitos de Configuración Técnica (Checklist para Jesús)

Para levantar la Cloud API en Meta Developers necesitamos:
1. **Cuenta en Meta for Developers:** [developers.facebook.com](https://developers.facebook.com/).
2. **Crear una App de tipo "Business":** Nombre: `Vookly Platform`.
3. **Agregar el producto "WhatsApp":**
   - Meta te otorga inmediatamente un **Número de Teléfono de Prueba (Sandbox)** y **$100 USD de crédito de prueba** para enviar mensajes a hasta 5 teléfonos testeadores registrados.
4. **Número de Producción:**
   - Requiere un chip SIM o número virtual limpio (que **NO esté registrado activamente en una app común de WhatsApp en un celular**).
5. **Configuración de Webhooks en Next.js / Backend:**
   - Endpoint: `/api/webhooks/whatsapp`
   - Para recibir eventos de estado: `sent` (enviado), `delivered` (entregado), `read` (leído) y respuestas entrantes.

---

## 6. 🚀 Próximo Paso Operativo
Crear la App de prueba en Meta Developers con el número Sandbox para validar el primer envío real de la plantilla `bienvenida_onboarding_v1` desde un script de Node.js / Next.js en menos de 10 líneas de código.
