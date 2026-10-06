# Minuta de Charla Técnica Preliminar — Jesús & Facundo

> **Estado:** Documento de Trabajo Exploratorio (No Vinculante)  
> **Participantes:** Jesús Fleitas (Córdoba) y Facundo Majda (Formosa)  
> **Fecha:** 2026-10-04  
> **Contexto:** Lluvia de ideas y visión a futuro del producto previo a las entrevistas de campo. Las decisiones vinculantes de producto continúan subordinadas a la validación en terreno y a la asamblea de los 4 desarrolladores.

---

## 1. Directriz y Tríada Core Inmediata (Prioridad Blindada)
Para evitar la dispersión de alcance (*feature creep*), el equipo se enfoca exclusivamente en **tres objetivos de corto plazo**:

1. **Gestión Comercial Básica:** Que el comerciante tenga un seguimiento sencillo de sus clientes recurrentes y pueda crear/ofrecer 2-3 promociones activas.
2. **Experiencia del Consumidor en PWA:** Que el cliente final consulte de forma instantánea y ligera sus promociones activas o próximas a desbloquearse para canjearlas en mostrador.
3. **Canal de Disparo por WhatsApp:** Conexión directa y ágil para que el comercio envíe promociones y avisos clave al WhatsApp del cliente.

Cualquier funcionalidad accesoria (CRM complejo, skins inmersivos pesados, paquetes freemium sofisticados) queda clasificada como **exploración futura**.

---

## 2. Ideas y Propuestas de Arquitectura Discutidas

### 2.1. Arquitectura de Software
- **Modelo Multi-Tenant:** Backend centralizado y agnóstico que atiende a todos los comercios, con interfaces ligeras desacopladas.
- **Punta de Lanza (2 Nichos):** Iniciar la validación y maquetación con **Barberías** y **Cafeterías** (o Panaderías), emulando modelos de expansión por etapas (validar una línea y luego replicar).

### 2.2. Mini CRM y Lógica de Puntos / Sellos
- Registro automático de puntos/sellos asociado al cobro del servicio.
- **Identificador Único:** Número de teléfono (sin DNI).
- **Atributos Mínimos:** Teléfono, histórico de visitas/servicios, fecha de cumpleaños.
- **Regla Configurable:** Combinar servicio + beneficio (ej. "3er corte en el mes → descuento en el 4to"). Caso real ya validado por barberos: invitar un café o aplicar descuento por cumpleaños genera retorno comprobado.
- **Enfoque Pasivo:** El sistema no debe sobrecargar al barbero; debe registrar lo que ya sucede de forma natural.

### 2.3. Modelo de Negocio y Segmentación
- *Idea a evaluar:* Nivel gratuito con paquetes de promociones predeterminadas y Plan Pro con promociones ilimitadas y personalizadas.
- *Alerta de Scope:* Evitar construir un CRM corporativo o automatizaciones de WhatsApp intrusivas antes de probar la adopción real del cajero/barbero.
- *Diferenciación de hardware:* El barbero trabaja sin computadora en el puesto; la cafetería/heladería suele tener cajero con PC o tablet. El proceso de entrada debe adaptarse a cada realidad.

### 2.4. Identidad Visual e Interfaz
- *Idea de Skins Temáticos:* 1 base genérica + variantes visuales por nicho (paletas de color e iconografía SVG específica para barberías, panaderías, cafeterías, etc.).
- *Referencia estética:* Lograr identidades inmersivas y contextuales.

---

## 3. Próximas Acciones de Campo Acordadas
1. **Guion de Preguntas de Campo:** Estructurar el cuestionario rápido (<3 min) para las visitas a comercios de mañana.
2. **Diseño Tentativo en Celular:** Preparar un mockup visual muy liviano para mostrar en el teléfono a los comerciantes durante las entrevistas.
3. **Reunión de Equipo:** Ajustar horario para la puesta en común general.
