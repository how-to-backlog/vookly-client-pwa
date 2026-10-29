# 📋 Propuesta de Preguntas de Campo: Nicho Cafeterías (Córdoba Capital)

> *Documento de trabajo oficial para la asamblea del equipo (Viernes). Preparado por Jesús (T11).*
> *Objetivo: Presentar una batería de 3-4 preguntas de nicho (Cafeterías) y 1-2 preguntas generales de negocio, justificando el impacto práctico de cada respuesta en el desarrollo de Fideliz-Ar.*

---

## Ejes de Decisión Práctica para el Producto
* **Eje A (Operación en Caja & Hora Pico):** Define la UI del mostrador, si se requiere teclado numérico físico autónomo y los tiempos máximos tolerados de carga (<3 seg).
* **Eje B (Retención & Clientes Inactivos):** Define la lógica y automatización del motor de mensajes por WhatsApp tras 25-30 días de ausencia.
* **Eje C (Economía de Recompensa & Sellos):** Define la calibración de la Calculadora de Sellos (umbral de 5-6 visitas y costo del premio vs ticket).
* **Eje D (Stack Tecnológico & Disposición a Pagar):** Define la estrategia de integración de POS (Fudo/stand-alone) y el esquema de precios en ARS.

---

## 1. Preguntas Específicas de Nicho (Cafeterías)

### Pregunta de Nicho 1: [Eje A · Flujo de Cobro y Viabilidad Operativa en Salón]

#### 1. Enfoque y Decisión de Producto
* **Qué busca la respuesta:** Determinar si el flujo de cobro real del local permite la interacción física con Fideliz-Ar en el mostrador (teclado <3 seg), o si la dinámica de mesas sin paso por caja expulsa a nuestro MVP inicial.
* **Decisión técnica en Fideliz-Ar:**
  - Si los clientes de mesa terminan yendo a pagar al mostrador: **Local calificado (Fit directo para MVP v1).**
  - Si el cobro es 100% cerrado en la mesa por el mozo con posnet: **Local No-Fit para la V1** (evita forzar integraciones complejas fuera de scope; se descarta como cliente de lanzamiento).

#### 2. Formulación Propuesta (Corta y Medible)
> **"De las mesas que tenés todos los días, ¿qué porcentaje de la gente se levanta a pagar en la caja y a cuántos les cobra el mozo en la mesa?"**

* **Métrica a ponderar en campo:**
  * **Mostrador Dominante (>60% va a caja):** Fit Alto para MVP de teclado de mostrador.
  * **Híbrido (40% a 60% en caja):** Fit Parcial (captura clientes de barra y mesas con paso por caja).
  * **Mesa Exclusiva (>80% cobro en mesa con posnet):** **No-Fit para MVP v1** (descartar local).

#### 3. Matriz de Interpretación Práctica

| Respuesta obtenida (% estimado) | Ponderación | Impacto / Decisión en Fideliz-Ar |
| :--- | :--- | :--- |
| **"El 60% o más se levanta a pagar en la caja"** | **Fit Alto para MVP** | Se implementa la solución de mostrador con teclado físico (<3 seg). El MVP opera sin fricción de mozos. |
| **"Mitad y mitad"** | **Fit Parcial** | Capturamos al cliente de paso y al que va a la barra; asumimos conscientemente que el resto queda sin registrar en V1. |
| **"Más del 80% le paga directamente al mozo en la mesa"** | **NO-FIT para MVP v1** | **No venderle la V1.** Intentar meter Fideliz-Ar acá sin hardware en el posnet genera abandono inmediato. El local queda para una V2 con integraciones. |

---

### Pregunta de Nicho 2: [Eje B · Retención Orgánica vs. Contactabilidad de Clientes]

#### 1. Enfoque y Decisión de Producto
* **Qué busca la respuesta:** Medir la brecha entre la **Retención Orgánica** (cuántos clientes nuevos vuelven por sí solos sin ayuda tecnológica) y la **Tasa de Contactabilidad** (de cuántos clientes el local tiene un canal directo para recuperarlos si dejan de venir).
* **Decisión técnica en Fideliz-Ar:**
  - Si la contactabilidad es nula (0% a 5%), valida que el **motor de captura de teléfono en mostrador y reactivación automática por WhatsApp** es la propuesta de valor central que justifica contratar el software.
  - Define el umbral de disparo: automatizar una alerta tras 21-25 días sin visita para evitar la fuga definitiva del 70% de clientes no retenidos.

#### 2. Formulación Propuesta (Secuencia en Dos Tiempos)
> **Paso 1:** *"De cada 10 personas que te entran por primera vez, ¿cuántas calculás que se terminan convirtiendo en clientes habituales que vuelven todas las semanas?"*  
> *(Esperar respuesta: ej. "3 de 10")*  
> **Paso 2 inmediato:** *"¿Y de esos clientes habituales, de qué porcentaje tenés el teléfono o alguna forma de contactarlos si dejan de venir?"*

* **Métricas a ponderar en campo (Dos Columnas Cuantitativas):**
  * **% Retención Orgánica:** Tasa estimada de clientes que se fidelizan solos (Baja: <20% · Media: 20-40% · Alta: >40%).
  * **% Contactabilidad:** Porcentaje de clientes con canal directo de re-engagement (Crítica: 0% · Mínima: 1-10% · Activa: >20%).

#### 3. Matriz de Interpretación Práctica

| Combinación de respuestas (% Retención / % Contacto) | Diagnóstico del Local | Argumento / Decisión en Fideliz-Ar |
| :--- | :--- | :--- |
| **Baja retención (<30%) / Cero contacto (0%)** | **Fuga Crítica Total** | Caso ideal para Fideliz-Ar: El negocio pierde el 70% de sus clientes y no tiene cómo evitarlo. El sistema le construye la base de contactos y los reengancha automáticamente. |
| **Media retención (30-50%) / Cero contacto (0%)** | **Habitués Cautivos pero Desprotegidos** | El local tiene buen producto pero vive a ciegas: si un habitué se va a la cafetería de enfrente, el dueño no se entera. Fideliz-Ar le da blindaje de cartera. |
| **Cualquier retención / Contacto Alto (>20%)** | **Gestión Manual Existente** | Local atípico que ya anota teléfonos o tiene lista de difusión. Fideliz-Ar se vende como el reemplazo automático para ahorrarle horas de trabajo manual. |

---

### Pregunta de Nicho 3: [Eje C · Economía de Recompensa: Producto Gratis vs. Descuento]

#### 1. Enfoque y Decisión de Producto
* **Qué busca la respuesta:** Evaluar la comprensión del dueño sobre el costo real de premiar a un cliente: si percibe la ventaja matemática de regalar un producto de bajo costo de materia prima (~$1.200 ARS en grano de espresso) con alto valor percibido ($4.500 ARS), o si cae en el error de regalar descuentos directos del 10%-15% en plata viva que destruyen su margen sin asegurar retorno.
* **Decisión técnica en Fideliz-Ar:**
  - Calibra la **Calculadora de Sellos**: configura por defecto el programa en **5 sellos = 1 café gratis** (~5% del ticket acumulado).
  - Define el argumento pedagógico del onboarding para demostrarle al comerciante que premiar con producto le cuesta la mitad que un descuento en caja.

#### 2. Formulación Propuesta (Costo Marginal vs. Descuento)
> **"Para hacer volver a un cliente que ya te compró varias veces, ¿qué te rinde más regalar: un café de la casa (que a vos te cuesta ~$1.200 de grano) o hacerle un 15% de descuento directo en el ticket?"**

* **Métrica a ponderar en campo:**
  * **Preferencia Producto Gratis (Café de la casa):** Comprensión alta del margen y costo marginal. Adopción natural de la tarjeta de sellos.
  * **Preferencia Descuento Directo (% off):** Foco en caja inmediata. Requiere que la Calculadora de Fideliz-Ar le demuestre la fuga de margen en pesos.
  * **Resistencia a Premiar (Cero regalos):** No cree en promociones de retención (objeción a trabajar con casos de ROI).

#### 3. Matriz de Interpretación Práctica

| Respuesta obtenida | Ponderación | Impacto en la Configuración de Fideliz-Ar |
| :--- | :--- | :--- |
| **"Mil veces el café gratis, el grano no me mueve la aguja"** | **Fit Natural con Sellos** | Se activa la plantilla clásica: tarjeta de 5 sellos con premio al 6° café (costo real para el local: ~5% de la facturación acumulada). |
| **"Prefiero el descuento del 15% porque es más fácil"** | **Error Clásico de Margen** | Se le muestra la Calculadora de Sellos: un 15% le regala $3.000+ ARS en efectivo por compra; 1 café cada 6 visitas le cuesta $1.200 y le asegura 5 compras previas. |
| **"No me gusta regalar nada, la gente tiene que pagar lo que vale"** | **Objeción de Costo** | Discurso de adquisición vs. retención: traer un cliente nuevo le cuesta 5 veces más en pauta o promos que retener al que ya está con $1.200 de café. |

---

## 2. Preguntas Candidatas Generales (Transversales a Todos los Nichos)

### Pregunta General 1: [Eje D · Stack de Software y Presupuesto Digital Actual]

#### 1. Enfoque y Decisión de Producto
* **Qué busca la respuesta:** Mapear la madurez tecnológica del local en cualquier rubro (cafetería, barbería, heladería, panadería) y saber si ya tienen el hábito de pagar abonos mensuales por software, o si operan en la informalidad analógica (cuaderno/Excel sin costo).
* **Decisión técnica en Fideliz-Ar:**
  - Si pagan abonos por POS (Fudo, Maxirest, Tango, etc.): Valida nuestro rango de precio (**$20.000 a $35.000 ARS/mes**) como un gasto asumible y natural.
  - Si operan con costo $0 (Excel/papel): Revela que tienen resistencia a cargos fijos mensuales y exigen un plan freemium o período de prueba muy visible.

#### 2. Formulación Propuesta (Herramientas vs. Costo Digital)
> **"Para manejar la caja, las ventas o los clientes, ¿usan algún software comercial en la computadora o se manejan con Excel y papel? ¿Tienen algún costo mensual en herramientas digitales hoy?"**

* **Métrica a ponderar en campo:**
  * **Digital con Abono Pago (> $25.000/mes):** Alta madurez. Acostumbrado al modelo SaaS.
  * **Digital Gratuito / Pago Único ($0/mes):** Madurez media. Rechazo inicial a cuotas fijas.
  * **Analógico / Cuaderno ($0/mes):** Madurez baja. Fricción alta para adoptar herramientas nuevas.

#### 3. Matriz de Interpretación Práctica

| Respuesta obtenida | Diagnóstico Tecnológico | Impacto en Fideliz-Ar |
| :--- | :--- | :--- |
| **"Usamos Fudo / Maxirest / Tango y pagamos abono mensual"** | **Presupuesto Validado (ICP Óptimo)** | No hay objeción psicológica al abono mensual. Se puede ofrecer el plan Pro directo. |
| **"Tenemos un sistema instalado que compramos hace años / Excel"** | **Sin Gasto Recurrente** | Objeción a pagar todos los meses. El argumento debe ser: *"Este sistema no es un costo de gestión, es una máquina de recuperar ventas que se paga sola"*. |
| **"Nos manejamos a mano, cuaderno y la terminal de cobro"** | **Operación Analógica** | Requiere onboarding asistido ultra simple (cero instalación en PC, todo por celular o stand-alone). |

### Pregunta General 2: [Capacidad de Disparo Directo y Base de Clientes]

#### 1. Enfoque y Decisión de Producto
* **Qué busca la respuesta:** Comprobar si el comercio en cualquier rubro posee un activo de datos propio para generar demanda cuando lo necesita, o si depende pasivamente de la suerte, el clima o el algoritmo de Instagram para que la gente entre a consumir.
* **Decisión técnica en Fideliz-Ar:**
  - Valida el módulo de **Campañas de Activación Directa por WhatsApp** de Fideliz-Ar: demuestra que tener el teléfono de 50 o 100 clientes habituales le permite llenar el local en un día muerto en 1 solo clic.
  - Expone el contraste entre la tasa de apertura de WhatsApp (+90%) vs. una historia de Instagram (<5% de alcance orgánico).

#### 2. Formulación Propuesta (Activación Directa a Celular)
> **"Si hoy quisieras avisarles a tus mejores 50 clientes que tenés una promo especial para que vengan esta tarde, ¿tenés alguna forma de mandarles ese mensaje directamente al celular?"**

* **Métrica a ponderar en campo:**
  * **Sin Canal Directo (0% capacidad):** *"No, ninguna forma, dependemos de Instagram o del cartel en la vereda"*.
  * **Canal Manual / Parcial (Baja escala):** *"Solo a unos pocos conocidos por mi WhatsApp personal"*.
  * **Canal Automatizado (Activo):** *"Sí, tenemos base de datos o sistema de mensajería"*.

#### 3. Matriz de Interpretación Práctica

| Respuesta del dueño | Diagnóstico de Canal | Impacto / Propuesta en Fideliz-Ar |
| :--- | :--- | :--- |
| **"No, ninguna forma. Si no venimos y subimos una historia a Instagram, no tenemos cómo."** | **Dependencia Total de Algoritmos (Cero activo propio)** | **Argumento demoledor:** Se le muestra que con Fideliz-Ar no depende más de Instagram: cada cliente que pone su teléfono en caja se convierte en un contacto al que le puede mandar una promo en 1 clic. |
| **"Tengo el número de algunos clientes fijos pero les escribo uno por uno a mano."** | **Canal Validado pero Cuello de Botella Manual** | El dueño ya sabe que hablarle al celular funciona; Fideliz-Ar le automatiza el envío masivo en un segundo sin quemar su número personal. |
| **"Sí, tenemos una lista de difusión o base de mails."** | **Madurez Alta de Base de Datos** | Se evalúa la tasa de apertura: se le demuestra que el WhatsApp de Fideliz-Ar tiene 5 veces más apertura que un mail o lista tradicional. |
