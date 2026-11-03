# 📊 Especificación Operativa, Financiera y Multicomercio: Flujo de WhatsApp en Caja (Twilio / Meta API)

> **Documento:** `docs/flujo_caja_whatsapp_costes_y_multicomercio.md`  
> **Fecha:** 2026-11-03  
> **Autores:** Jesús Fleitas (CEO) & Arquitectura Vookly  
> **Estado:** Aprobado para diseño técnico del MVP  
> **Módulos Afectados:** Backend API, WebApp de Mostrador, Billetera PWA Multicomercio y Mensajería Transaccional.

---

## 1. ⚙️ El Flujo Exacto en Mostrador (<2 Segundos)

El ingreso de sellos en caja está diseñado bajo la premisa de **fricción cero** tanto para el comerciante como para el consumidor. No requiere tablets giratorias, lectores QR dedicados ni apps instaladas en el celular del cliente.

```
[1. Cliente en Caja] 
         │
         ▼ Digita su teléfono en el Numpad USB (ej: 3517370346) y pulsa Intro.
[2. WebApp de Mostrador en PC de Caja]
         │
         ▼ 1. Incrementa el contador de sellos en la base de datos de Vookly.
         ▼ 2. Evalúa si el cliente requiere notificación (1° sello del ciclo o premio ganado).
         │    Envía payload JSON interno al backend:
         │    POST /api/notify/onboarding
         │    {
         │      "phone": "+5493517370346",
         │      "customerName": "Martín",
         │      "businessSlug": "the-coffee-house",
         │      "businessName": "The Coffee House",
         │      "token": "usr_9f82a1..."
         │    }
[3. Servidor Backend de Vookly (Next.js / Node.js)]
         │
         ▼ Llama a la API de Twilio usando credenciales centralizadas:
         │  client.messages.create({
         │    from: 'whatsapp:+549351888VOOK',
         │    to: 'whatsapp:+5493517370346',
         │    body: '¡Hola Martín! Sumaste tu 1° sello en The Coffee House ☕. Seguí tu progreso acá: https://vookly.app/c/usr_9f82a1'
         │  })
[4. Red Global Twilio / Meta Cloud API]
         │
         ▼ Entrega el mensaje cifrado de extremo a extremo a través de la infraestructura oficial de WhatsApp.
[5. Teléfono del Cliente]
         │
         ▼ Vibra el celular en <1.5 segundos con el mensaje oficial y el acceso directo a su tarjeta digital.
```

---

## 2. 💰 Análisis Económico: Costes de Twilio vs. Modelo de Suscripción

### A. Estructura de Costes de Envío (Argentina - Cifras Oficiales Noviembre 2026)
Twilio no cobra ningún canon mensual fijo por mantenimiento de cuenta ni licencias de software. Se paga en modalidad **Pay-as-you-go** (saldo prepago consumido por uso real):

| Concepto | Costo USD | Costo Aprox. ARS (TC ~$1.450) |
| :--- | :--- | :--- |
| **Tarifa Oficial Meta (Categoría Utilidad):** | $0.0260 USD | ~$37.70 ARS |
| **Comisión de Plataforma Twilio:** | $0.0050 USD | ~$7.25 ARS |
| **Costo Total Unitario por Mensaje Entregado:** | **$0.0310 USD** | **~$44.95 ARS** |

### B. Rendimiento para un Local Promedio (100 Mensajes de Onboarding al Mes)
Para una cafetería o comercio gastronómico de cercanía, 100 clientes nuevos o inicios de ciclo al mes representa un volumen considerable de retención:
* **Costo mensual en mensajería para Vookly por ese local:**  
  $$100 \text{ mensajes} \times \$44.95 \text{ ARS} = \mathbf{\$4.495 \text{ ARS/mes}} \quad (\approx \$3.10 \text{ USD})$$

### C. Margen Bruto del Abono SaaS de Vookly
Comercializando el servicio con un abono mensual básico de entre **$20.000 y $30.000 ARS** por sucursal:

| Escenario de Precio | Ingreso Mensual Bruto | Costo de WhatsApp (100 msgs) | Margen Bruto Vookly | % de Margen |
| :--- | :--- | :--- | :--- | :--- |
| **Plan Base** | $20.000 ARS | $4.495 ARS | **+$15.505 ARS** | **77.5%** |
| **Plan Estándar** | $25.000 ARS | $4.495 ARS | **+$20.505 ARS** | **82.0%** |
| **Plan Premium** | $30.000 ARS | $4.495 ARS | **+$25.505 ARS** | **85.0%** |

*El costo operativo de WhatsApp representa entre el 15% y el 22% del ingreso del abono, garantizando una rentabilidad neta superior al 75% desde el día 1.*

---

## 3. 🌐 Arquitectura Multicomercio: ¿Qué pasa cuando un cliente se suma a un segundo local?

### El Dilema del Cliente Recurrente en la Red
Un cliente habitual ya utiliza Vookly en una cafetería (**Local A: The Coffee House**) y tiene su PWA guardada en el celular.  
Un viernes por la noche, ese mismo cliente visita una cervecería adherida a la red (**Local B: Burger & Bar**) y digita su mismo número de teléfono en la caja.

### La Solución Arquitectónica: Identidad Única por Teléfono y Cartera Agregada
En Vookly, **la identidad del usuario es su número de teléfono (E.164)**. El usuario no pertenece a un comercio: el usuario es dueño de su billetera general de fidelización.

```
                    [ Número de Teléfono: +5493517370346 ]
                                      │
                 ┌────────────────────┴────────────────────┐
                 ▼                                         ▼
      [ Billetera Local A ]                     [ Billetera Local B ]
        The Coffee House                          Burger & Bar
        Sellos: 4 / 6                             Sellos: 1 / 5
```

### El Protocolo de Notificación Inteligente:
1. **Detección Automática en Base de Datos:**
   - El sistema consulta: *¿Existe el número `+5493517370346` en el sistema?*
   - **Resultado:** *Sí, ya es usuario de Vookly (registrado en Local A), pero es su PRIMERA visita a Local B.*
2. **Generación del Enlace y Contexto:**
   - Se le envía un WhatsApp transaccional adaptado:
     > *"¡Hola Martín! Sumaste tu 1° sello en **Burger & Bar** 🍔. Ya agregamos tu tarjeta a tu Billetera Vookly. Podés verla acá: `https://vookly.app/c/usr_9f82a1` (o directamente con el enlace que te lleva al local: `https://vookly.app/c/usr_9f82a1?local=burger-bar`)"*
3. **Experiencia en la PWA (Pantalla 1 - Home Billetera):**
   - El cliente hace clic en el link y abre su misma PWA.
   - En la **Pantalla 1 (Billetera / Home)**, el cliente ahora ve **DOS tarjetas apiladas en carrusel vertical u horizontal**:
     1. Tarjeta 1: **The Coffee House** (con sus 4 sellos acumulados).
     2. Tarjeta 2: **Burger & Bar** (con su 1° sello recién sumado).
   - Tocar cualquiera de las dos tarjetas ejecuta la transición de apertura hacia el **Roadmap vertical individual** de ese local específico (`/local/[slug]`).
4. **Persistencia y Sesión:**
   - El token de acceso `usr_9f82a1` está atado al teléfono del cliente en `localStorage` o `HttpOnly cookie`. Una vez que el cliente abrió el link en su navegador móvil una vez, **todas sus tarjetas de todos los locales presentes y futuros quedan unificadas en la misma pantalla sin necesidad de ingresar contraseñas jamás.**
