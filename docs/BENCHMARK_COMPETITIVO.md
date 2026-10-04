# Benchmark Competitivo: Plataformas de Fidelización para Comercios

> **Proyecto:** Fideliz-Ar
> **Fase:** Fase 0, Discovery y Validación de Mercado  
> **Hito:** 0.1 Benchmark Competitivo  
> **Responsable:** Jesús Fleitas (Córdoba)
> **Fecha:** 2026-10-01  
> **Objetivo de la Sesión:** Auditoría exhaustiva de 3 plataformas (2 locales de Argentina y 1 líder global) bajo 5 dimensiones clave.
---

## 1. Resumen Ejecutivo

En el mercado conviven tres enfoques bien marcados para resolver la retención en comercios físicos:

1. **El enfoque Web / DNI simple (Ej. Puntos App - Argentina):**  
   Prioriza la cero-fricción para el cliente (consulta con DNI en un link web sin app ni contraseña). Sin embargo, traslada el cuello de botella al cajero, quien debe abrir un panel web administrativo para tipear DNI y asignar puntos manualmente.
2. **El enfoque Smart Wallet + Integración POS (Ej. Novity - Argentina):**  
   Aprovecha las billeteras que ya vienen en los celulares (Apple Wallet y Google Wallet) para mandar notificaciones push a la pantalla de bloqueo sin desarrollar app nativa propia. Su mayor acierto es integrarse directamente a **Fudo POS**, logrando que cada ticket sume puntos sin fricción de caja. Su barrera: comerciantes sin Fudo o clientes que no tienen Google Wallet activo.
3. **El enfoque App Nativa Dedicada + Hardware Propietario (Ej. Stamp Me - Internacional):**  
   Basado en la descarga de una app móvil en tiendas y hardware físico en mostrador (sensores NFC StampPod o terminales). Si bien ofrece alta retención y control de fraude, es inviable para el comercio independiente argentino por costo en dólares (USD 49 a 199/mes), necesidad de hardware importado y la fricción crítica de exigirle al cliente bajar 40 MB en la fila.

### La Gran Ventana de Oportunidad para Fideliz-Ar:
> **El "Océano Azul" local:** La mayoría de los comercios gastronómicos y de cercanía independientes (1 a 3 locales) en el interior del país (Córdoba, Formosa, etc.) no tienen Fudo ni pagan USD 50/mes, pero sufren colas en mostrador.  
> **Nuestra propuesta ganadora:** Identificación ultrarrápida del cliente en caja (<3 segundos con DNI o teclado numérico táctil), acceso del cliente vía PWA / QR liviano sin app obligatoria, costo en pesos accesible a escala pyme y canal de re-engagement post-venta automático (WhatsApp / Web Push).

---

## 2. Matriz Comparativa Integral (5 Dimensiones Clave)

| Dimensión de Análisis | Puntos App (Local - AR) | Novity (Local - AR) | Stamp Me (Líder Global) | **Fideliz-Ar (Tesis MVP)** |
| :--- | :--- | :--- | :--- | :--- |
| **1. Fricción en Caja (Tiempo y Carga)** | ⚠️ **Media / Alta:** Cajero entra a panel web, busca cliente y tipea puntos manualmente. Riesgo de cola. | 🟢 **Baja (con Fudo):** Automático por POS. ⚠️ **Media:** Si es manual, busca por email/nombre. | 🟢 **Baja / Nula:** Cliente apoya celular en hardware NFC (StampPod) o escanea QR. | 🟢 **Ultra-baja (<3 seg):** Teclado numérico gigante en tablet/celular; solo DNI o QR de mostrador. |
| **2. Experiencia del Cliente (App / Hardware)** | 🟢 **Excelente:** 100% Web en navegador (`/tu-comercio`). Sin app, sin clave, solo DNI. | 🟢 **Muy Buena:** Tarjeta en Apple Wallet / Google Wallet. No descarga app de tienda. | 🔴 **Fricción:** Requiere descargar app de la tienda (Stamp Me App) para empezar. | 🟢 **Zero-Friction:** PWA / Link web móvil con DNI o teléfono. Sin descarga de tiendas. |
| **3. Modelo de Precios & Monetización** | 🟢 **Accesible en ARS:**<br>- Plus: $20.000 ARS/mes (hasta 250 clientes)<br>- Pro: $50.000 ARS/mes (ilimitado) | 🟡 **Medio en ARS:**<br>- Inicial: $14.700 ARS/mes (100 clientes, 1 sucursal)<br>- Pro: $41.900+ ARS/mes | 🔴 **Alto en USD:**<br>- Basic: USD 49/mes<br>- Full: USD 79/mes<br>- VIP: USD 199/mes (+ costo de hardware) | 🟢 **Competitivo en ARS:**<br>Freemium / Prueba piloto inicial + Abono fijo mensual en pesos por sucursal. |
| **4. Canal Post-Venta y Retención** | 🔴 **Débil:** El cliente debe acordarse de entrar al link web. Sin push nativo ni automatización activa. | 🟢 **Muy Fuerte:** Push directo a la pantalla de bloqueo vía Wallet (97% apertura) + Campañas de email. | 🟢 **Fuerte:** Notificaciones Push nativas en la app, SMS marketing y mensajes de cumpleaños. | 🟢 **Fuerte & Local:** Alertas y links automáticos vía WhatsApp / Web Push para clientes dormidos. |
| **5. Barreras y Quejas Recurrentes** | • Carga manual lenta en picos de fila.<br>• El cliente no se acuerda de mirar sus puntos si no va al local. | • Dependencia técnica de Google Wallet (muchos usuarios Android no lo tienen).<br>• Si no tienen Fudo, la carga manual por email es pesada. | • Obliga a descargar app de 40MB.<br>• Hardware NFC importado costoso.<br>• Precio prohibitivo en dólares para pymes argentinas. | • Riesgo de adopción si el cajero no ofrece el programa.<br>• Mitigación: onboarding asistido y cartelería QR física en mesa. |

---

## 3. Radiografía Profunda por Competidor

---

### Competidor 1: Puntos App (`puntosapp.com`)
* **Origen:** Argentina (Enfocado en cafeterías, peluquerías, gimnasios y retail).
* **Propuesta de Valor:** "Loyalty simple para comercios argentinos. Sin app, sin instalación. Funciona desde cualquier celular."

#### A. Mecánica Operativa y Onboarding
1. **Alta del Comercio:** Registro web en 2 minutos con email y nombre del local. Pago vía Mercado Pago o transferencia por WhatsApp.
2. **Operativa en Caja:** El cajero debe tener abierto el navegador en la PC o celular del local. Presiona "Sumar puntos", ingresa el DNI del cliente y digita el puntaje.
3. **Consulta del Cliente:** El cliente ingresa a `puntosapp.com/nombre-comercio` desde su teléfono, escribe su DNI y ve el saldo acumulado y los premios disponibles.

#### B. Estructura de Precios
* **Plan PLUS:** $20.000 ARS / mes (hasta 250 clientes registrados).
* **Plan PRO:** $50.000 ARS / mes (clientes ilimitados).

#### C. Fortalezas Clave
* **Cero barrera de entrada para el usuario final:** No le exige instalar nada ni recordar passwords complicados.
* Precios transparentes y pagables en moneda local con pasarelas habituales (Mercado Pago).

#### D. Puntos Débiles y Fricciones Detectadas
* **Cero automatización en caja:** No se conecta a sistemas de facturación ni tiqueadoras. Si hay 10 personas en la fila de una panadería o cafetería a las 8:30 AM, el cajero **no va a abrir el panel para cargar un DNI**.
* **Ausencia de re-engagement activo:** El cliente no recibe un aviso proactivo en su WhatsApp; si no vuelve a entrar voluntariamente a la web, los puntos quedan olvidados.

---

### Competidor 2: Novity (`novity.com.ar`)
* **Origen:** Argentina (Tucumán / Buenos Aires).
* **Propuesta de Valor:** "Puntos, premios y tarjetas en Google y Apple Wallet. Tu tarjeta de lealtad vive en su bolsillo."

#### A. Mecánica Operativa y Onboarding
1. **Enrolamiento del Cliente:** El cliente escanea un código QR en el mostrador o mesa. Se abre una pantalla ligera y con 1 toque guarda su pase digital en **Apple Wallet** (iOS) o **Google Wallet** (Android).
2. **Operativa en Mostrador:** 
   - **Vía Fudo POS:** Se conecta por API. Al facturar un café o almuerzo en Fudo, los puntos se acreditan solos al cliente sin intervención humana en la caja.
   - **Vía Manual:** El cajero busca al cliente en el dashboard por nombre o email y tipea el monto.
3. **Canje de Recompensas:** El cliente entra a `tuempresa.novity.com.ar/catalogo`, elige el premio (ej. café gratis) y se genera un código de cupón único alfanumérico que muestra en el mostrador.

#### B. Estructura de Precios
* **Plan Starter:** $14.700 ARS / mes (hasta 100 clientes, 1 sucursal, 2 premios).
* **Plan Crecimiento:** $41.900 ARS / mes (escalable en sucursales y clientes).

#### C. Fortalezas Clave
* **Push en pantalla de bloqueo:** Al usar pases de Wallet, pueden mandar notificaciones push directamente al celular del cliente sin haber tenido que desarrollar ni mantener una app para iOS y Android.
* **Integración con Fudo:** Resuelve de raíz el dolor del tiempo en mostrador para los locales que ya usan Fudo.

#### D. Puntos Débiles y Fricciones Detectadas
* **Barrera de Google Wallet en Argentina:** En usuarios de gama media/baja o personas mayores en Argentina, Google Wallet suele no estar configurado o requiere asociar cuenta/bloqueo de pantalla que genera deserción en el enrolamiento.
* **Dependencia de email:** La carga manual fuera de Fudo pide email/nombre en lugar del DNI habitual argentino, lo que vuelve lenta la carga verbal en mostrador.

---

### Competidor 3: Stamp Me (`stampme.com`)
* **Origen:** Internacional (Australia / Estados Unidos / Reino Unido / Europa).
* **Propuesta de Valor:** "Digital punch card app for cafés and restaurants. Buy X, Get Y."

#### A. Mecánica Operativa y Onboarding
1. **Enrolamiento del Cliente:** El cliente debe descargar obligatoriamente la aplicación "Stamp Me" desde Google Play o App Store, crear usuario y buscar el local o escanear el QR de bienvenida.
2. **Validación de Sellos en Mostrador:**
   - **StampPod:** Un dispositivo físico que se apoya en el mostrador; el cliente acerca su teléfono con tecnología NFC ("tap and go") y el sello se acredita de inmediato.
   - **OneStamps:** Códigos QR descartables impresos en vasos de café para llevar o tickets.
   - **Stamp Business App:** App del comerciante para escanear el código QR del cliente.
3. **Canje:** El cliente activa el voucher en la app; tiene un contador regresivo de 3 minutos para mostrárselo al barista antes de que se autodestruya para evitar fraudes.

#### B. Estructura de Precios
* **Lite:** USD 49 / mes (~$60.000+ ARS más impuestos y costo de cambio).
* **Pro:** USD 79 / mes.
* **Elite:** USD 199 / mes.
* Hardware (StampPod / Tags) con costo de envío internacional adicional.

#### C. Fortalezas Clave
* **Mecánica psicológica perfecta para cafeterías:** El concepto del "sellito" visual (completar 6 u 8 sellos para el café gratis) es mucho más intuitivo y adictivo para el consumidor que acumular 2.450 puntos abstractos.
* **Mecanismos anti-fraude maduros:** El voucher temporal con timer de 3 minutos evita que clientes muestren capturas de pantalla viejas.

#### D. Puntos Débiles y Fricciones Detectadas
* **Fricción letal en caja:** Exigirle a un cliente en una cafetería argentina que descargue una app de 40 MB mientras espera el café provoca una tasa de rebote superior al 60%.
* **Costos e importación:** El precio en dólares con tarjeta corporativa y la dependencia de hardware importado (StampPod) deja afuera al 95% de los comercios locales.

---

## 4. Conclusiones Estratégicas y "Diferenciales Clave" para Fideliz-Ar

```
                  ┌────────────────────────────────────────────────────────┐
                  │                 TESIS GANADORA FIDELIZ-AR              │
                  ├────────────────────────────────────────────────────────┤
                  │ 1. Identificación en Caja: DNI puro en <3 seg         │
                  │ 2. Cero App Nativa: PWA / Web Móvil sin fricción       │
                  │ 3. Canal Activo: WhatsApp / SMS (No esperar al cliente)│
                  │ 4. Mecánica Dual: Sellos por visita por encima de Puntos por monto  │
                  └────────────────────────────────────────────────────────┘
```

1. **Mecánica Híbrida (Puntos o Sellos según el local):**
   * *Aprendizaje de Stamp Me:* Para una cafetería o barbería, la **tarjeta de sellos** ("el 7mo café es gratis", "el 5to corte 50% OFF") convierte 3 veces más rápido que un sistema de puntos abstractos. Fideliz-Ar debe permitirle al comercio elegir: ¿Querés sumar puntos por peso gastado o sellitos por visita?
2. **El "Teclado Numérico" de Caja (Superando a Puntos App):**
   * En vez de obligar al cajero a navegar un dashboard administrativo pesado, la interfaz de caja de Fideliz-Ar debe ser un **num-pad táctil gigante** optimizado para tablet o celular viejo:
     `[ Tipear DNI ] ──► [ Botón Enviar (+1 Sello / +Puntos) ] ──► Listo (2.5 segundos)`.
3. **Re-engagement por WhatsApp en lugar de Push invisible:**
   * La gran falla de las soluciones web es que no tienen cómo avisarle al cliente que sus puntos vencen o que hace 15 días no viene.
   * Con solo capturar el número de teléfono o DNI, Fideliz-Ar puede disparar notificaciones o links directos por **WhatsApp**, logrando una tasa de apertura real del 90% en Argentina sin depender de que el usuario tenga Google Wallet configurado.
4. **Pricing en Moneda Local y Barrera Cero:**
   * Mientras Stamp Me arranca en USD 49 (~$60k+), un abono pyme escalable en pesos (ej. plan base $15.000 a $25.000 ARS/mes) es un "no-brainer" para cualquier cafetería o panadería que con retener 3 clientes más al mes ya recupera la inversión.

---

## 5. Preguntas Clave

1. **Definición de Enrolamiento Inicial:** ¿Qué dato le pedimos al cliente en su primera compra? ¿Solo DNI, o DNI + WhatsApp? (Recomendación técnica: Solo DNI en mostrador; el teléfono lo completa el cliente desde su propio celular cuando escanea el QR de la mesa para reclamar el premio).
2. **Priorización de la Mecánica:** ¿Arrancamos la V1 con modelo de Sellos ("Punch Card" digital estilo Stamp Me) por ser el más demandado en cafeterías/panaderías, o con Puntos por dinero gastado?
3. **Estrategia frente a sistemas POS:** ¿Buscamos una integración inicial rápida vía API/Webhooks (como hace Novity con Fudo), o nacemos 100% autónomos en una tablet de mostrador para no depender de terceros en la Fase 0?
