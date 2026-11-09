# Grill Me Results

Generated: 2026-11-09T20:56:13.551Z

## Plan

1. opcion A, péro no tengo en claro si el tutorial debe arrancar en la pagina de bienvenida o en la pantalla de lista de tarjetas-
2. Un solo tour. Pero hay algo que no se si no la estas viendo, el tema de la personalizacion de tarjetas ocurre en el bottom sheet que se despliega en la pantalla de bienvenida de personaliza tu local, no ocurre en otro lugar después. O conviene que le agreguemos ademas de en ese momento, otro momento mas en donde pueda volver a editar su tarjeta que sería en el simulador demo de comercio? supongamos que pasa que un comerciante decide saltarse e ir directamente a vookly sin personalizar su tarjeta al comienzo, pero teniendo una segunda oportunidad de editarla cuando llegue a la tool demo de comercio. vos que opinas? podes dicentir-
3. que sea obligatorio entrar al editor pero igual siempre va a tener el boton de saltar toour disponible, y ya dentro del editor que cada etapa pueda apretar el famoso "siguiente" sobre cada paso o no se. No tiene que estar obligado a tocar los inputs si no quiere.
4. Op A, ademas vamos a cambiar el icono que esta actualmente que es un auricular y no hace entender que es el contacto a soporte, ademas vamos a modificar el mensaje automatico de whatsapp para que diga algo asi como "Hola! Estoy interesado en que mi negocio forme parte de la red vookly" o alguna frase similar no literalmente esa.

## Shared Understanding

Estrategia acordada para el Tour Guiado con Driver.js orientado a la demo comercial de Vookly. El tour iniciará en el Hub, transicionará hacia el Roadmap y el Simulador interactivo, ofrecerá una segunda chance de personalización estética de tarjeta y culminará en el CTA comercial hacia WhatsApp con ícono renovado.

## Questions and Answers

### 1. ¿Dónde debería dispararse la invitación y el primer paso del tour guiado? (Recomendación: Landing, para acompañar al comerciante desde que entra y mostrarle el punto de partida que vería su cliente antes de pasar al hub).

**Recommended answer:** Arrancar en Pantalla de Bienvenida (Landing)

**User answer:** Arrancar directo en el Hub de tarjetas

**Status:** resolved

**Notes:** La landing queda libre de tour. El comerciante explora o salta la landing y la invitación al tour guiado se presenta directamente al cargar el Hub de tarjetas.

### 2. Sobre tu consulta del punto 2: ¿Conviene darle una segunda oportunidad de editar la estética de la tarjeta (colores/patrones) dentro del Simulador de comercio en /local/[id]? (Recomendación: Sí, sumar la personalización al simulador o enlazarla, porque si el comerciante salta la landing pierde el momento 'aha' de ver su local con su propia identidad visual).

**Recommended answer:** Sí, sumar edición estética dentro del Simulador en /local/[id]

**User answer:** Sí, sumar edición estética dentro del Simulador en /local/[id]

**Status:** resolved

**Notes:** Se integrará la posibilidad de editar la identidad visual de la tarjeta (color y patrón) dentro de la herramienta de simulación de comercio en /local/[id], dando una segunda oportunidad si se salteó en la bienvenida.

### 3. Para reemplazar el actual auricular (Headphones) en la TopBar: ¿Qué ícono preferís para que se entienda inequívocamente como contacto comercial de WhatsApp? (Recomendación: MessageCircle / globo de chat, universalmente asociado a WhatsApp).

**Recommended answer:** Icono de Mensaje / Chat (MessageCircle)

**User answer:** Icono de Mensaje / Chat (MessageCircle)

**Status:** resolved

**Notes:** Se reemplazará el ícono Headphones por MessageCircle (Lucide) y se actualizará el copy default de WhatsApp a intención comercial de adhesión a la red.

## Agreed Decisions

- 1. Punto de arranque: El tour guiado no arranca en la Landing, sino directamente al aterrizar en el Hub (/hub). La landing se mantiene limpia y libre de interrupciones.
- 2. Recorrido continuo (Un solo tour): Flujo Hub -> Roadmap (/local/[id]) -> Editor/Simulador -> Cierre con CTA de contacto.
- 3. Segunda chance de edición estética: Enriquecer el 'Editor de Premios y Sellos' en /local/[id] para que incluya no solo reglas lógicas (sellos y premios) sino también la edición visual (colores y patrones) de la tarjeta, permitiendo al comerciante personalizarla allí si salteó el onboarding de la landing.
- 4. Interactividad en el Simulador: El tour guía al usuario a abrir obligatoriamente el editor de comercio para que experimente la herramienta, pero una vez dentro puede avanzar paso a paso con 'Siguiente' sin estar forzado a tipear datos en los inputs. Se mantiene siempre visible el botón para saltar el tour en cualquier momento.
- 5. Icono y Mensaje de WhatsApp: En TopBar, reemplazar el auricular (Headphones) por MessageCircle (globo de chat). Actualizar el mensaje predeterminado a un copy comercial enfocado en sumarse a la red: '¡Hola! Estoy interesado en que mi negocio forme parte de la red Vookly'.
- 6. Cierre y CTA final: El tour culmina en la pantalla de Roadmap tras experimentar el simulador, anclando el llamado a la acción comercial directo hacia el contacto de WhatsApp.

## Open Risks

- Verificar que la transición de ruta desde el Hub al Roadmap (/local/[id]) preserve limpiamente el estado del tour en sessionStorage sin parpadeos visuales ni colisiones de popover durante la carga del cliente.
- Garantizar que la adición de selectores de color y patrón dentro del modal del simulador mantenga el rendimiento móvil (<2s) y no sobrecargue la interfaz en dispositivos de 360px de ancho.

## Next Decision Needed

Proceder a redactar el documento de especificación formal NOTA-024 / TOUR_GUIDE_SPEC.md y comenzar la implementación modular en la rama feat/driverjs-demo-tour.
