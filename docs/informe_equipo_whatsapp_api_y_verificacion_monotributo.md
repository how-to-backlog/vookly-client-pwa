# 📱 WhatsApp Business API Oficial: Diagnóstico Técnico, Requisitos y Camino de Verificación (Argentina)

Buenas gente, les comparto el informe técnico detallado sobre la integración con la **Meta WhatsApp Business API Oficial**, el diagnóstico exacto de por qué las pruebas en modo sandbox/trial se bloquearon y el camino formal y definitivo para dejar la línea oficial 100% operativa.

---

## 1. 🔍 Diagnóstico Técnico: Qué pasó en las pruebas (Meta y Twilio)

Durante las pruebas de integración en consola y llamadas directas por API, se identificaron los siguientes bloqueos de infraestructura impuestos por Meta a nivel regional:

1. **Meta Cloud API (Modo Directo):**  
   Al enviar mensajes desde el número de prueba de Meta Developers, la API responde `HTTP 200 OK` (`message_status: accepted`), pero el mensaje es descartado antes de llegar al celular. Al auditar los webhooks oficiales, el servidor arrojó el error:
   ```json
   {
     "code": 131031,
     "title": "Business Account locked",
     "message": "Business account has been locked."
   }
   ```
2. **Twilio (Gateway Intermedio):**  
   Al intentar utilizar el Sandbox gratuito de Twilio desde Argentina, la API devuelve:
   ```json
   {
     "code": 572002,
     "message": "No Twilio trial phone number is assigned for messaging to this destination number."
   }
   ```
   **Causa comprobada:** Meta restringe el tráfico saliente de números virtuales de prueba de Estados Unidos (`+1`) hacia redes móviles de Sudamérica (`+54` / `+55`) para prevenir abuso y spam en cuentas trial.

3. **Conclusión operativa:**  
   No es un problema de código, endpoints ni tokens. Ningún proveedor (ni Meta directo ni Twilio) permite enviar mensajes automáticos salientes a números de Argentina sin que la cuenta esté formalmente verificada por Meta.

---

## 2. 🏛️ Requisito Mandatorio: Verificación de Negocio en Meta

Tanto si nos conectamos directo a Meta como si usamos Twilio, **Meta exige la Verificación Comercial de la cuenta**.

Para proyectos en etapa MVP o Fase 0 que no cuentan con una sociedad constituida (SRL o SA), **Meta acepta oficialmente la verificación a través de un Monotributista / Autónomo (Persona Humana)** bajo la categoría de **Sociedad Unipersonal (Sole Proprietorship)**.

---

## 3. 📋 Documentación Requerida (Checklist Argentina)

Para completar el trámite se necesitan únicamente **dos documentos en PDF**:

1. **Documento 1: Identidad Legal y Fiscal (Obligatorio)**
   * **Constancia de Inscripción en ARCA (ex AFIP):** Descargada desde la web de AFIP con CUIT activo.
   * Debe mostrar: CUIT, Apellido y Nombre completos y Domicilio Fiscal.
2. **Documento 2: Acreditación de Domicilio y Contacto (Obligatorio para cruce)**
   * Al menos uno de los siguientes comprobantes (antigüedad menor a 3 meses):
     * **Factura de servicio:** Luz, gas, agua, internet o telefonía móvil (Personal, Claro, Movistar) a nombre del titular del monotributo, donde figure exactamente el mismo domicilio de la constancia de AFIP.
     * **Extracto bancario:** De cuenta bancaria o billetera virtual oficial (con membrete de la entidad) que refleje nombre y domicilio fiscal.

---

## 4. ⚠️ Regla Crítica para evitar el Rechazo Automático

El 90% de los rechazos de Meta se deben a discrepancias en el nombre legal:

* **Error común:** Cargar como Razón Social "Vookly" o el nombre del producto. Meta cruza los datos con bases públicas; si no encuentra una sociedad con ese nombre, rechaza la solicitud.
* **Forma correcta:**
  * **Nombre Legal de la Empresa:** El **Nombre y Apellido completo del titular** tal como figura en la constancia de ARCA/AFIP (ejemplo: `JESUS EMANUEL FLEITAS`).
  * **Tipo de Empresa:** `Sociedad Unipersonal`.
  * **Nombre Visible en WhatsApp (Display Name):** `Vookly` o `Vookly Fidelización`.
  * **Sitio Web:** `https://vookly.vercel.app` (debe contar con HTTPS y tener visibles en el pie de página o términos los datos de contacto y CUIT del titular para validación del bot de Meta).

---

## 5. 🚀 Paso a Paso de Ejecución

1. Ingresar a **Meta Business Suite ➔ Configuración ➔ Centro de Seguridad**:  
   `https://business.facebook.com/settings/security_center`
2. En el bloque **"Verificación del negocio"**, hacer clic en **"Iniciar verificación"**.
3. Seleccionar país (**Argentina**) y tipo de negocio (**Sociedad Unipersonal**).
4. Completar los datos fiscales exactamente iguales a la constancia de AFIP (Nombre, Domicilio, Teléfono y Web).
5. Subir el PDF de la **Constancia de ARCA/AFIP** y el PDF de la **Factura de Servicio / Extracto**.
6. Validar la identidad mediante el código de 6 dígitos enviado por SMS o email.
7. Enviar para revisión.

---

## 6. ⏱️ Plazos y Resultado Final

* **Tiempo de resolución:** Entre **24 y 48 horas hábiles** (hasta 72 hs si solicitan confirmación adicional).
* **Una vez aprobado:**
  * Se elimina el candado `131031 (Business locked)`.
  * Queda habilitada la API oficial para asociar un número local definitivo (+54) y enviar notificaciones automáticas transaccionales a los clientes en caja sin riesgo de bloqueos.
