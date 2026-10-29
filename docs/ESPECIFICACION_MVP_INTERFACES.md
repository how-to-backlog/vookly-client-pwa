# 📱 Especificación Funcional Tentativa del MVP (Fase 1: User Journeys & Interfaces)

> **Propósito del Documento:** Formalizar la arquitectura funcional mínima y los flujos de interacción del MVP de Fideliz-Ar (tanto del lado del cliente como del mostrador) para alinear al equipo, eliminar ambigüedades técnicas y fundamentar el discurso durante las entrevistas de campo.

---

## 1. Visión General de la Arquitectura
El MVP opera bajo dos frentes claramente desacoplados:
1. **La PWA del Cliente (Billetera Virtual):** Interfaz móvil web ultra liviana, 100% de **solo lectura**.
2. **La WebApp del Comercio (Sistema Unificado):** Un único usuario y contraseña por local comercial, con aterrizaje directo en el modo mostrador.

---

## 2. Frente del Cliente: La PWA de Consulta (Solo Lectura)

### 2.1. Acceso y Filosofía Cero Descargas
* **Canal de entrada:** El cliente accede exclusivamente a través de un enlace único personalizado enviado por WhatsApp tras su primera compra (ej. `fideliz.ar/c/[token_unico]`).
* **Sin autenticación pesada:** No requiere crear contraseñas, validar emails ni descargar apps de 50 MB de tiendas oficiales (Google Play / App Store).
* **Acceso rápido:** Opción nativa del navegador para "Añadir a la pantalla de inicio" como ícono de acceso directo.

### 2.2. Componentes de la Pantalla del Cliente
* **Encabezado:** Nombre y logo del local comercial.
* **Tarjeta de Sellos Virtual (Visual y Gamificada):**
  * Grilla fija de círculos (ej. 6 u 8 sellos).
  * Indicadores visuales claros de sellos acumulados (dorado/activo) vs. sellos restantes (vacíos).
* **Beneficio en Juego:**
  * Texto claro y concreto del premio: *"Completá 6 sellos y llevate 1 Café de la casa gratis"*.
* **Estado de Premio Desbloqueado (Voucher de Próxima Visita):**
  * Al completar los 6 sellos, la tarjeta cambia a estado "Premio Desbloqueado" indicando con claridad: *"1 Café Gratis listo para canjear en tu próxima visita (Válido por 15 días)"*.
* **Restricción de Seguridad:** La interfaz es estrictamente **pasiva**. El cliente no puede sumarse sellos a sí mismo ni alterar contadores.

---

## 3. Frente del Comercio: WebApp Unificada (Un Solo Usuario por Local)

### 3.1. Filosofía de Acceso y Sesión
* **Login Único:** Un solo usuario y contraseña por comercio (ej. `cafemartinez` + clave).
* **Cero Roles en V1:** No se implementa gestión de roles, permisos diferenciados ni usuarios individuales por empleado.
* **Persistencia:** La sesión permanece abierta permanentemente en la computadora o tablet del mostrador.

---

### 3.2. Pantalla 1 (Aterrizaje por Defecto): "Modo Caja / Mostrador"

Al iniciar sesión o abrir la aplicación, el sistema muestra directamente esta pantalla para no perder un solo segundo en la fila.

* **Hardware en Mostrador:** La computadora/notebook que el comercio **ya tiene en caja** + un simple teclado numérico físico (Numpad USB de bajo costo) apoyado sobre el mostrador orientado hacia el cliente. No se requieren segundas pantallas ni monitores rotatorios.
* **Pitch Mecánico y Único de la Cajera:**
  > *"¿Sumás sellos para el café gratis? Podés ingresar tu número en el tecladito."*
  *(Si el cliente pregunta para qué: "Te llega un WhatsApp con el link para ver tu tarjeta de sellos acumulados cada vez que vengas").*

---

#### 3.2.1. Dinámica de Interacción y Bifurcación en Tiempo Real

El cliente tipea su número de celular en el Numpad USB y presiona **Intro**. La cajera ve en vivo cómo se reflejan los números en su pantalla y, al presionar Intro, el sistema bifurca instantáneamente en dos escenarios:

1. **ESCENARIO 1: Cliente Habitual / Registrado (La gran mayoría de los casos - <3 segundos):**
   * El sistema detecta inmediatamente el teléfono en la base de datos.
   * **Regla de Cooldown Temporal Estricto (Anti-Fraude y Control de Frecuencia):**
     * **Ventana de 3 horas:** Solo se permite cargar 1 sello por número cada 3 horas.
     * **Comportamiento ante reintento antes de tiempo:** Si el cliente ya sumó un sello hace menos de 3 horas, la pantalla de la cajera muestra en amarillo:  
       `⚠️ Sello ya registrado hace [X] minutos (Próximo disponible a las [HH:MM] hs)`  
       No suma nuevo sello ni altera contadores. La cajera informa amablemente: *"Ya sumaste tu sello de esta visita, ¡el próximo se habilita en tu siguiente visita!"*.
     * **Mesas compartidas / Pagos divididos:** Si varias personas en la misma mesa pagan por separado, cada una puede tipear su propio número en el teclado y recibir su sello individual. Si una sola persona abona toda la cuenta grupal, recibe un único sello por esa transacción.
   * **En la pantalla de la cajera (Carga de sellos intermedios 2 a 5):**
     * Aparece una confirmación verde instantánea con el nombre del cliente y el progreso:  
       `✅ ¡Sello sumado a Martín! (Sellos: 4 / 6)`
     * La cajera solo valida visualmente y despacha al cliente con un feedback verbal: *"Listo Martín, ya tenés 4 sellos, te faltan 2 para el gratis"*.
     * **Cero clicks:** La cajera no toca el mouse ni el teclado. La pantalla se resetea sola a los 2 segundos para el siguiente cliente.
   * **Carga del 6° Sello (Desbloqueo de Recompensa para Próxima Visita):**
     * Al alcanzar el objetivo (6/6), la pantalla de la cajera notifica en verde/dorado festivo:  
       `🎉 ¡Martín completó la tarjeta! (6/6)`  
       `🎁 Premio generado: 1 Café Gratis (Disponible para su próxima visita)`
     * Feedback de la cajera: *"¡Felicitaciones Martín, completaste los sellos! Ya te quedó guardado tu café gratis para cuando vuelvas la próxima vez"*.
     * El cliente abona su consumición actual normalmente y se retira con el incentivo de volver.
   * **Visita 7 (Momento de Canje del Premio - Costo $0):**
     * **El Teléfono como Única Llave:** El cliente no necesita abrir su celular, buscar códigos complejos ni dictar tokens. Simplemente ingresa su número en el Numpad USB habitual. Cero fricción y cero posibilidad de fraude o capturas de pantalla truchas.
     * **Alerta en Pantalla de Cajera:** Se despliega automáticamente la alerta prioritaria:  
       `🎁 ¡PREMIO DISPONIBLE PARA CANJEAR!`  
       `Cliente: Martín — Premio: 1 Café de la casa gratis (Vigencia restante: 12 días)`  
       `[✓ APLICAR CANJE AHORA]  |  [Posponer para otra visita]`
     * **Regla Canónica de Lealtad (Un premio no genera premios):** La visita de canje es de redención pura a costo $0. **NO suma un nuevo sello.** El cliente comenzará su nuevo ciclo de sellos (sello `1/6`) en su siguiente visita paga con dinero.
     * **Acción de la Cajera:** Consulta verbalmente: *"Martín, tenés tu café gratis de la tarjeta anterior, ¿lo querés usar ahora?"*. Al presionar `Aplicar Canje`, el voucher se quema en el sistema y el cliente queda reseteado en `0/6`.

---

#### 3.2.2. Operatoria de Cobro y Asiento Contable del Producto Gratis ($0)

Fideliz-Ar opera como validador de identidad y recompensas; la transacción monetaria final se asienta en el sistema habitual del comercio bajo dos modalidades operativas según su grado de formalidad tecnológica:

1. **Modalidad A: Comercios Tecnificados con POS / Sistema de Stock (Fudo, Maxirest, etc.):**
   * El cajero carga el producto en su comanda/facturación (`1 Café Espresso: $4.500`).
   * Aplica la función estándar de descuento que todo POS posee: **Descuento 100% por Fidelización / Promoción (-$4.500)**.
   * **Total a cobrar:** `$0.00` (o el saldo restante si el cliente agregó productos adicionales como facturas o tostados).
   * **Beneficio contable:** El sistema fiscal emite el comprobante en cero o ticket no fiscal de comanda, descontando la materia prima (grano, leche) del inventario sin devengar IVA por una venta no cobrada.

2. **Modalidad B: Comercios Tradicionales / Atención Directa de Mostrador (Cortesía de la Casa):**
   * En locales con operativa más informal o directa al paso:
   * La cajera simplemente constata el canje en la pantalla de Fideliz-Ar y sirve el producto de cortesía, o le avisa verbalmente al barista/elaborador: *"Sale un café de la casa gratis para Martín"*.
   * **Conciliación al Cierre:** Al finalizar el turno, el comerciante consulta en el panel de Fideliz-Ar el reporte de **"Historial de Canjes del Día"** (donde figuran nombre, hora y producto canjeado) para conciliar su arqueo y cuadrar la merma de mercadería sin inconsistencias.

2. **ESCENARIO 2: Cliente Nuevo / Primera Visita (Onboarding asistido en 5 segundos):**
   * El sistema detecta que el número no existe en la base de datos.
   * **En la pantalla de la cajera:**
     * Se abre automáticamente un pop-up / modal de bienvenida con el foco listo en el campo de texto:  
       `⭐ ¡Cliente nuevo!`  
       `Teléfono ingresado: [ 351 123 4567 ]`  
       `Nombre del cliente: [ Campo de texto activo ]`
     * La cajera le pregunta con naturalidad al cliente:  
       > *"Buenísimo, ¿tu nombre? Así te agendo para la tarjeta."*
     * El cliente responde (ej. *"Lucas"*).
     * La cajera tipea *"Lucas"* en su teclado de PC y presiona **Enter**.
   * **Disparo del Ecosistema:**
     * Se registra el nuevo cliente: `Lucas` + `351 123 4567` + `1 sello`.
     * Se envía automáticamente el mensaje de bienvenida por WhatsApp:  
       *"¡Hola Lucas! ☕ Bienvenido a [Nombre del Local]. Ya tenés acreditado tu 1° sello..."* junto al enlace personalizado a su PWA.
   * **Mecanismo Anti-Error / Anti-Spam:** Si el cliente en realidad era habitual pero le erró a un número en el Numpad, al ver que la cajera le pregunta el nombre (*"¿Es tu primera vez?"*), el cliente reacciona en el acto: *"No, yo vengo siempre"*. La cajera cancela con Escape y le pide tipear de nuevo, evitando mandar WhatsApp a números equivocados.

---

### 3.3. Pantalla 2 (Navegación Secundaria): "Panel de Control / Gestión"

Accesible mediante un botón discreto en la barra superior (`Ir al Panel`), pensado para cuando el dueño o encargado gestiona el negocio fuera de la hora pico.

* **Componentes del Panel:**
  1. **Base de Datos de Clientes (Activo de Datos):**
     * Listado ordenado de números de teléfono registrados.
     * Cantidad de sellos acumulados por cliente y fecha de última visita.
     * Filtro rápido de clientes activos vs. inactivos (+20 días sin visitas).
  2. **Configuración del Programa de Sellos:**
     * Definición de cantidad de sellos por ciclo (ej. 6 sellos).
     * Descripción del producto o beneficio de recompensa (ej. "1 Café de especialidad gratis").
  3. **Módulo de Campañas por WhatsApp (Activación Directa):**
     * Redacción de mensaje de texto para días muertos o promociones relámpago.
     * Disparo directo a la base de clientes habituales.

---

## 4. Política de Integridad, Cero Carga Manual y Prevención de Fraude

Para proteger el margen del comerciante, evitar el fraude interno ("sweethearting" / sellos de favor a conocidos) y mantener la confianza del cliente, el sistema aplica reglas matemáticas estrictas en lugar de controles burocráticos:

1. **Cero Carga Manual Arbitraria:**
   * No existe ningún campo ni botón en el sistema para tipear o alterar libremente la cantidad de sellos de un cliente. Ni el dueño ni los empleados pueden asignar sellos desde un panel de gestión.
   * La **única vía de emisión de sellos** es el ingreso físico del número en el Numpad en el momento de la transacción en caja.
2. **Función "Deshacer Sello" (Undo Operativo con Ventana de 30 Minutos):**
   * En caso de error de tipeo o venta cancelada, la pantalla de caja ofrece un botón de reversión inmediata:  
     `[ ⎌ Deshacer último sello cargado (Disponible por 30 minutos) ]`
   * **Ventana de 30 minutos:** Permite subsanar equivocaciones del turno sin interrumpir la atención. Transcurridos los 30 minutos, la operación queda asentada de forma inmutable y la opción desaparece.
3. **El Software como Guardarraíl (Sin rol de policía):**
   * Si un cliente manifiesta haber olvidado registrar su sello en una visita previa, la única vía es ingresar su número en el Numpad durante su presencia en el local.
   * El sistema no audita tickets pasados; el **cooldown estricto de 3 horas** actúa como barrera matemática infranqueable que impide cargas duplicadas o abusos en la misma jornada.

---

## 5. Política Estricta de Mensajería WhatsApp (Cero Spam)

A diferencia de las notificaciones push tradicionales, WhatsApp es un canal íntimo donde el exceso de mensajes genera bloqueos del usuario y penalizaciones de Meta. Se establece una política de **máximo 2 mensajes por ciclo de tarjeta + 1 mensaje condicional de rescate**:

1. **Mensaje 1: Bienvenida y Entrega de PWA (Sello 1):**
   * *Disparo:* Única vez tras el onboarding inicial asistido en caja.
   * *Contenido:* Saludo personalizado por nombre, acreditación del 1° sello, explicación del premio y link permanente a su tarjeta PWA.
2. **Mensaje 2: Notificación de Premio Desbloqueado (Sello 6):**
   * *Disparo:* Inmediatamente después de que el cliente completa la tarjeta en el local.
   * *Contenido:* Felicitación personalizada, confirmación de su café gratis disponible para su próxima visita y fecha de caducidad (15 días).
3. **Mensaje 3: Reactivación Condicional de Clientes Inactivos (Lifecycle Trigger):**
   * *Disparo:* Exclusivamente si transcurren **25 días seguidos sin ninguna visita** al local.
   * *Contenido:* Mensaje empático invitándolo a regresar (ej. con doble sello en su próxima compra).
   * *Regla:* Si el cliente mantiene su concurrencia habitual, este mensaje **nunca se envía**. Las visitas intermedias (sellos 2, 3, 4 y 5) se confirman de palabra por el cajero y se reflejan silenciosamente en la PWA.

---

---

## 6. Diagrama de Estados y Ciclo de Vida del Cliente (State Machine)

Para modelar la lógica de negocio y diseñar las pruebas unitarias y de integración (QA), el cliente transita por una máquina de estados determinística:

```text
[ NUEVO ] 
    │
    ▼ (Ingreso Numpad + Nombre en Caja)
[ ACTIVO_EN_PROGRESO ] (Sellos: 1 a 5)
    │  ▲
    │  └── (Visitas con pago respetando Cooldown > 3 hs)
    ▼ (Acumulación del 6° Sello)
[ VOUCHER_DESBLOQUEADO ] (Premio disponible / Vigencia: 15 días)
    │
    ├───► [ CANJEADO ] (Visita 7: Redención pura a costo $0. NO suma sellos)
    │         │
    │         ▼
    │     [ ACTIVO_EN_PROGRESO ] (Nuevo ciclo reinicia en 0/6, 1° sello en Visita 8)
    │
    └───► [ VOUCHER_EXPIRADO ] (Transcurridos >15 días sin canje)
              │
              ▼
          [ ACTIVO_EN_PROGRESO ] (Vuelve a 0/6 para iniciar nuevo ciclo)
```

---

## 7. Matriz de Casos Borde y Escenarios de QA (Edge Cases & Resilience)

Diseñado para análisis de robustez, cobertura de pruebas y prevención de fallos en producción:

| ID | Escenario / Caso Límite | Comportamiento Esperado del Sistema | Criterio de Aceptación QA |
| :--- | :--- | :--- | :--- |
| **QA-01** | **Pérdida de foco en el navegador de caja.** La cajera clickeó otra pestaña o ventana y el cliente tipea en el Numpad. | Un `Global KeyListener` (o captura de eventos a nivel de ventana `window.addEventListener('keydown')`) debe redirigir los dígitos numéricos entrantes al buffer del Numpad sin importar dónde esté el foco del mouse. | El input no se pierde si la ventana está activa, evitando que el cliente tipee "en el aire". |
| **QA-02** | **Formato telefónico argentino heterogéneo.** El cliente tipea con `0`, con `15`, o solo 8 dígitos locales. | Capa de sanitización por Regex antes de consultar la base de datos: descartar `0` inicial, descartar `15` intermedio y validar longitud mínima requerida (código de área + número local). | Todo registro se almacena en formato canónico de 10 dígitos (ej. `3511234567`) listo para interoperar con API de WhatsApp (`+549...`). |
| **QA-03** | **Violación de Cooldown Temporal.** El cliente tipea su número 2 veces en 10 minutos (o dos comensales de la misma mesa ingresan el mismo teléfono). | El backend rechaza la transacción si `now() - last_stamp_timestamp < 3 hours`. El frontend muestra notificación amarilla con hora exacta de desbloqueo. | El contador de sellos permanece intacto. No se emite evento de incremento ni llamada a WhatsApp. |
| **QA-04** | **Concurrencia / Race Condition.** Dos cajeros en terminales distintas cargan el mismo número en el mismo milisegundo. | Bloqueo a nivel de base de datos (Database Lock / Atomic Increment) condicionado a la ventana de cooldown. | Una solicitud responde `200 OK` (sello sumado) y la competidora responde `409 Conflict` o rechazo por cooldown. |
| **QA-05** | **Corte intermitente de conectividad (Offline Resilience).** Se cae la conexión Wi-Fi del local durante la fila de cobro. | La WebApp de mostrador debe implementar Service Workers con cola de transacciones offline (`IndexedDB`). Almacena el número en cola y muestra confirmación local. | Al restablecer conexión, sincroniza en segundo plano respetando el timestamp real del ingreso. |
| **QA-06** | **Operación errónea de cajero (Venta cancelada o número equivocado).** Cajera suma un sello a un cliente que finalmente no pagó. | Botón `[Deshacer]` disponible de forma visible durante **30 minutos**. Al presionarlo, revierte atómicamente el último sello y asienta un registro de anulación en el log de auditoría. | Pasados 30 minutos, la opción desaparece del DOM y el estado queda congelado. |

---

## 8. Preguntas Abiertas de Viabilidad Técnica para el Equipo (QA / Full Stack)

Puntos clave para debatir en la mesa técnica antes de congelar el backlog de desarrollo:

1. **Stack de Mostrador (Offline-First vs. Realtime WebSocket):**  
   ¿Conviene una arquitectura basada en WebSockets (ej. Supabase Realtime / Socket.io) para reflejar los números del Numpad en vivo, o un simple polling / optimistic UI con almacenamiento local en IndexedDB para blindar el sistema ante caídas de internet del local?
2. **Infraestructura de WhatsApp (Meta Cloud API vs. Gateways Locales):**  
   Para la política de 2 mensajes por ciclo (Bienvenida y Voucher): ¿Conviene arrancar con la Cloud API oficial de Meta (que exige verificación de plantillas y categorización Utility vs Marketing) o una solución de conexión puente tipo Baileys/WPPConnect para la etapa de piloto de 15 días?
3. **Consumo de Memoria del Navegador en Caja:**  
   Dado que la pestaña de mostrador va a estar abierta de 8:00 a 22:00 hs de corrido en computadoras comerciales de gama baja o notebooks antiguas, ¿qué estrategia de garbage collection y reseteo de DOM se recomienda para evitar fugas de memoria (*memory leaks*) tras cientos de transacciones diarias?
4. **Validación de Número Móvil:**  
   ¿Es viable validar mediante un regex estricto en frontend si el prefijo de área ingresado corresponde a una numeración móvil real argentina antes de abrir el modal de cliente nuevo?
