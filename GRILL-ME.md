# Grill Me Results

Generated: 2026-10-17T22:46:28.800Z

## Plan

Puedes revisar la estructura de tabla que tenemos en una hoja específica, la cual contiene cuatro planillas que vamos a utilizar en nuestras salidas al territorio Para indagar sobre el estado actual de los nichos a los cuales vamos a atacar En términos de predisposición a utilizar esta herramienta que estamos desarrollando Para ver qué correcciones podemos hacerles a dichas cuatro fichas. Ahora, la idea es la siguiente. Cada ficha va a ser rellenada con las respuestas a las cinco preguntas que cada nicho tiene. En las columnas correspondientes a cada local de cada nicho La idea es que posterior a plasmar todas las respuestas de manera cruda, al finalizar este relevamiento de datos, vamos a curar las cuatro fichas para acomodar las respuestas o reformular las respuestas o darles un orden coherente, de tal manera de sacar o hacer inferencias de dichas respuestas, ya sea a través de gráficos, tablas o cualquier otra herramienta que nos ayude a entender de una manera visual o más ordenada el conjunto de las respuestas para luego sacar conclusiones de dichas respuestas ordenadas y curadas de tal forma de terminar la fase 0 con esa información y empezar la fase 1 que ya va a ser relacionada a la conformación del MVP cuyo contenido va a responder a los puntos de dolor obtenidos en la fase 0 durante las entrevistas en donde se respondieron todas las preguntas. ¿Me explico? No quiero que toques la tabla ni las cuatro fichas. Centrate en la hoja en donde están las cuatro fichas. Específicamente en las columnas de cada uno de los locales. Mínimo necesito 10 columnas que van a representar a 10 locales en cada uno de los cuatro nichos. Y lo que yo quiero que me respondas por acá Cómo podríamos editar dichas fichas para que queden más acorde a la idea que tenemos en términos de su utilización Desde ya te adelanto que hacer promedios y puntajes no creo que lo tengamos en cuenta Al menos por ahora, si es que no encontramos una mejor forma de interpretar los datos.

## Shared Understanding

Diseño consensuado para la optimización de las 4 fichas de campo en FICHAS_INVESTIGACION: 10 locales por nicho, eliminación de promedios/puntajes, unificación a 5 preguntas por nicho y postergación de la curaduría analítica a una hoja posterior.

## Questions and Answers

### 1. Para estructurar las 10 columnas por nicho que necesitás para las salidas de campo, ¿cómo organizamos los datos de cada local? (Recomendación: Incluir filas de metadatos en cabecera para distinguir localidad y si te atendió el dueño o un empleado).

**Recommended answer:** 10 Columnas de Locales con Metadatos en Cabecera (Recomendada)

**User answer:** 10 Columnas simples con solo el Nombre del Local

**Status:** resolved

**Notes:** Cada ficha tendrá exactamente 10 columnas simples dedicadas a los 10 locales de ese nicho (ej. Local 1 a Local 10 o nombres específicos).

### 2. Dado que descartaron promedios y puntajes numéricos, ¿cómo limpiamos las columnas de la derecha de cada ficha? (Recomendación: Eliminar 'Promedio' y '(1-5)' para no condicionar la carga cruda de las entrevistas).

**Recommended answer:** Eliminar Promedios y Puntuaciones (1-5) (Recomendada)

**User answer:** Eliminar Promedios y Puntuaciones (1-5) (Recomendada)

**Status:** resolved

**Notes:** Se eliminan las referencias a puntuación (1-5), las columnas de 'Promedio' y 'Oportunidad', ya que no se usarán cálculos matemáticos arbitrarios en la captura cruda. Se conserva 'Notas y Citas Clave'.

### 3. En el Sheet, Heladería y Cafetería tienen 5 preguntas pero Panadería y Barbería tienen 6. ¿Unificamos a 5 preguntas fijas para todos los nichos? (Recomendación: Unificar a 5 para que el relevamiento sea perfectamente simétrico y comparable).

**Recommended answer:** Unificar todas a exactamente 5 preguntas (2 GEN + 3 Nicho) (Recomendada)

**User answer:** Unificar todas a exactamente 5 preguntas (2 GEN + 3 Nicho) (Recomendada)

**Status:** resolved

**Notes:** Todas las fichas se unifican a 5 preguntas exactas (2 Generales + 3 de Nicho), ajustando Panadería y Barbería a 3 de nicho para lograr simetría total.

### 4. Para preparar la curaduría posterior que mencionaste (ordenar respuestas para sacar inferencias visuales y gráficos sin promedios), ¿dónde prefieren consolidar el conteo? (Recomendación: Bloque de frecuencias al pie de cada ficha para tener el dato crudo y su resumen en la misma pantalla).

**Recommended answer:** Bloque inferior de Normalización y Conteo de Frecuencias (Recomendada)

**User answer:** Hacer la curaduría en una hoja separada post-campo

**Status:** resolved

**Notes:** La hoja de FICHAS_INVESTIGACION se mantiene 100% enfocada en captura en crudo sin mezclar agregaciones. La curaduría, conteos de frecuencias y gráficos se trabajarán en una hoja separada al concluir el trabajo de campo.

## Agreed Decisions

- Estructura de FICHAS_INVESTIGACION dedicada a captura cruda: 10 columnas por nicho (Local 1 a Local 10) con nombres simples de local, sin sobrecarga de metadatos en cabecera.
- Eliminación de columnas analíticas prematuras: se descartan las columnas 'Promedio', 'Oportunidad' y la etiqueta de puntaje '(1-5)'. Se preserva únicamente la columna 'Notas y Citas Clave' al final.
- Unificación simétrica de preguntas: exactamente 5 preguntas por nicho (2 Generales transversales + 3 Específicas de nicho), recortando la 4ta pregunta de Panadería y Barbería.
- Aislamiento de la curaduría: la hoja de fichas se conserva limpia para la toma de datos en calle; la curaduría categórica, tablas de distribución y gráficos se construirán en una nueva hoja específica una vez finalizado el relevamiento.
- Restricción operativa confirmada: NO editar el Google Sheet de forma autónoma hasta que el usuario dé la orden explícita.

## Open Risks

- Riesgo de pérdida de contexto cualitativo si las notas de campo no registran la objeción real del comerciante más allá de la respuesta cruda.

## Next Decision Needed

Presentar a Jesús la propuesta exacta de diseño visual y disposición de celdas para que él y el equipo la evalúen o autoricen su aplicación en la hoja FICHAS_INVESTIGACION.
