# Especificación Técnica Integral: Motor del Roadmap, Dinámica de Canjes y Estados de Mostrador (Vookly)

> **Propósito:** Resguardar la lógica matemática, algorítmica y de negocio de la Pantalla 2 (`/local/[id]`) de Vookly. Desacopla la geometría del camino vertical, la interacción táctil de nodos y el protocolo antifraude de canje en caja.

---

## 1. Principio de Diseño: "Anclas de Premio + Interpolación de Sellos"

En la vida real, cada comercio define su propia regla de fidelización:
* Una barbería puede otorgar un premio cada **3 sellos**.
* Una cafetería puede otorgar premios en los sellos **5, 10, 15, 20 y 25**.
* Un restaurante puede tener hitos irregulares (**4, 10 y 20**).

Para garantizar armonía visual sin importar la regla del local, el sistema desacopla la **geometría de la curva** de la **cantidad de sellos intermedios**:

1. **Los Premios (Hitos) definen los giros de la curva ("S-Segments"):**
   * Cada hito de premio actúa como un **Nodo Ancla Principal** alternando de izquierda a derecha (zigzag suave).
   * La curva entre un Premio $A$ y el siguiente Premio $B$ es siempre un arco cúbico de Bézier armónico y simétrico.
2. **Los Sellos Comunes se interpolan sobre el arco:**
   * Si entre el Premio $A$ y el Premio $B$ hay $N$ sellos comunes, esos $N$ nodos se distribuyen equitativamente a lo largo del recorrido de ese arco mediante evaluación Bézier paramétrica $B(t)$.

---

## 2. Geometría del Tramo (Cubic Bézier Segment)

En un lienzo virtual normalizado (ancho `W = 360`), definimos las columnas laterales para los giros:
* **Ancla Izquierda ($X_{\text{left}}$):** `76px` (~`21%` del ancho).
* **Ancla Derecha ($X_{\text{right}}$):** `284px` (~`79%` del ancho).
* **Ancla Central ($X_{\text{center}}$):** `180px` (`50%` del ancho, reservado para el punto de origen en la base y el remate al horizonte).

Para unir el Hito $i$ en $(X_0, Y_0)$ con el Hito $i+1$ en $(X_3, Y_3)$ ascendiendo (donde $Y_3 < Y_0$):
$$\Delta Y = Y_0 - Y_3$$
Se definen dos puntos de control verticales para garantizar tangencia suave y forma de "S":
* $P_0 = (X_0, Y_0)$ — Punto de salida (Hito inferior)
* $P_1 = (X_0, Y_0 - 0.5 \cdot \Delta Y)$ — Control de salida vertical
* $P_2 = (X_3, Y_3 + 0.5 \cdot \Delta Y)$ — Control de entrada vertical
* $P_3 = (X_3, Y_3)$ — Punto de llegada (Hito superior)

Comando SVG resultante para el tramo:
```svg
M X0 Y0 C X1 Y1, X2 Y2, X3 Y3
```

---

## 3. Posicionamiento Agnóstico de Nodos Intermedios y Estados Visuales

Si un tramo entre dos hitos abarca $M$ sellos, cada sello intermedio $k \in \{1, 2, \dots, M-1\}$ tiene un parámetro normalizado:
$$t_k = \frac{k}{M} \quad \text{donde } t_k \in (0, 1)$$

La coordenada exacta $(X(t_k), Y(t_k))$ donde se sienta el nodo sobre la curva se obtiene evaluando el polinomio de Bézier cúbico:
$$B(t) = (1-t)^3 P_0 + 3(1-t)^2 t P_1 + 3(1-t) t^2 P_2 + t^3 P_3$$

### Estados Visuales de los Nodos Comunes (Opción A: Numerados)
Cada nodo posee un atributo derivado `isCompleted = stampIndex <= currentStamps`:
* **Nodos Comunes Conseguidos (`isCompleted === true`):** Círculo exterior sólido negro con número en blanco (`16px font-black`).
* **Nodos Comunes Pendientes (`isCompleted === false`):** Círculos blancos con borde tenue `#D4D4D8` y número gris en el interior.

---

## 4. Regla Matemática de Posicionamiento de Textos Hacia el Centro

Para evitar que las etiquetas textuales corten o pisen la curva en "S":
* **Alternancia estricta de todos los hitos:** Todos los hitos alternan izquierda ($X_{\text{left}}$) y derecha ($X_{\text{right}}$).
* **Orientación centrípeta:**
  * Si el nodo de premio está en la curva izquierda ($X < W / 2$):  
    $$X_{\text{texto}} = X_{\text{nodo}} + R + 14, \quad \text{textAnchor} = \text{"start"}$$
  * Si el nodo de premio está en la curva derecha ($X \ge W / 2$):  
    $$X_{\text{texto}} = X_{\text{nodo}} - R - 14, \quad \text{textAnchor} = \text{"end"}$$
* **Burbujas unificadas para premios:** Todos los nodos de premio poseen un radio estandarizado ($R = 28\text{px}$) con círculo interior ($r = 20\text{px}$) y estrella unificada `★` (dorada si completado, gris si pendiente).

---

## 5. Regla de las Dos Curvas y Subdivisión de De Casteljau

1. **Curva de Progreso / Tramo Recorrido (`Completed Path`):**
   * **Estilo:** Línea **continua y sólida** (`strokeWidth="4"`, `#18181B`).
   * **Alcance:** Va estrictamente desde el inicio hasta el nodo correspondiente a `currentStamps`.
2. **Curva de Horizonte / Tramo por Recorrer (`Future Path`):**
   * **Estilo:** Línea **punteada / discontinua** (`strokeDasharray="8 8"`, `#D4D4D8`).
   * **Alcance:** Nace en la coordenada exacta $(X, Y)$ de `currentStamps` y llega hasta el último hito.

### Corte Exacto (Snap to Node)
Mediante la subdivisión de **De Casteljau**, el segmento que contiene a `currentStamps` se subdivide exactamente en $t = \frac{k}{M}$:
* Sub-arco `[0, t]` $\rightarrow$ se anexa al `completedPathD`.
* Sub-arco `[t, 1]` $\rightarrow$ inicia el `futurePathD`.

---

## 6. Progresión Atmosférica, Silueta Urbana y Remate al Espacio

1. **Base Urbana (0 metros):**  
   Silueta PNG 2D (`city-skyline.png`, 45 KB) apoyada al ras en la base absoluta del SVG (`y = height - 135`, ancho `104%`), con el badge `"INICIO"` flotando a $115\text{px}$ justo sobre los techos.
2. **Troposfera (Sellos 1 a 15):**  
   Nubes PNG transparentes de contorno negro (`6.png` a `9.png`) distribuidas de forma asimétrica (algunas cortadas asomando por los laterales y otras flotando enteras en espacios vacíos).
3. **Cima y Cosmos (Sellos 20 a 25 y Horizonte):**  
   Gradiente continuo a negro cósmico (`#09090B`), lunita menguante en el Sello 25, estrellas/asteriscos dispersos y pastilla oscura de `"Próximamente más premios"` con remate ascendente despegado ($150\text{px}$ de aire).

---

## 7. Dinámica de Canjes, Guardarraíles y Protocolo Antifraude

### A. La Regla Universal del Cooldown (3 horas)
* **Principio:** Cada vez que se registra una compra paga y se suma un sello, se activa automáticamente un **período de enfriamiento de 3 horas** (`cooldownUntil = lastStampAt + 3h`).
* **En premios recién alcanzados:** Durante esas 3 horas, el premio no se puede canjear en el acto (evita que el cliente duplique consumiciones en la misma mesa). En la zona de notificaciones se muestra:  
  👉 `Disponible en HH:MM hs` (cuenta regresiva viva).
* **Al vencer el temporizador:** La notificación conmuta a un botón sobrio:  
  👉 `[ Reclamar premio ]` (blanco con borde negro fino, sin competir con el badge de sellos).

### B. El Mecanismo de Canje Seguro: "Token Efímero de 4 Dígitos"
Para evitar que un tercero suplante la identidad de un cliente dictando un número de celular ajeno, y sin forzar al comercio a comprar pistolas lectoras de QR:
1. **Paso 1 (Intención):** El cliente toca `[ Reclamar premio ]`.
2. **Paso 2 (Alerta preventiva):** Se muestra un diálogo rápido:  
   *"Abrí este código cuando estés frente al cajero para pedir tu orden. Será válido durante 15 minutos."*
3. **Paso 3 (Código en Bottom Sheet):**  
   Se despliega un Bottom Sheet a 60 FPS con un código de **4 dígitos numéricos** (ej: `4892`) y una barra animada con temporizador de 15 minutos.
4. **Paso 4 (Vencimiento y Reseteo):**  
   Si transcurren los 15 minutos sin canje, el código expira en el sistema y se destruye por seguridad, pero el premio **no se pierde**: el cliente puede volver a tocar *"Reclamar"* para generar un nuevo código fresco.

### C. Input Polimórfico en Mostrador (Cero Pantallas Nuevas)
El comercio utiliza su teclado numérico (Numpad) habitual sin necesidad de botones de cambio de modo:
* **Si el cajero/cliente ingresa 10 dígitos (Celular):** El sistema lo procesa como **Carga Habitual de Sello** (suma 1 sello e inicia cooldown).
* **Si el cajero/cliente ingresa 4 dígitos (Código de Canje):** El sistema busca el token efímero del tenant:
  * Si es válido y tiene $< 15\text{ min}$: La pantalla valida en verde: **`✓ CANJE: 1 Café Clásico ($0)`** y quema el voucher.
  * Si pasaron $> 15\text{ min}$ o no existe: La pantalla arroja error: **`✗ Código inválido o vencido`**.
* **Mecánica de Compra Combinada:** Si el cliente canjea su premio gratis y al mismo tiempo paga otro producto de su bolsillo, la parte paga **sí le suma un nuevo sello**, reactivando un nuevo cooldown de 3 horas. El producto regalado lleva la leyenda:  
  👉 *"Este producto no suma un nuevo sello."*

---

## 8. Arquitectura de Componentes Lego Desacoplados

```text
web/src/components/
├── navigation/
│   └── LocalTopBar.tsx           # Flecha volver flotante en círculo blanco
├── local/
│   ├── LocalFooterSummary.tsx    # Franja inferior con Zona de Notificaciones Dinámica
│   └── BottomSheetNodeDetail.tsx # Lámina inferior deslizable para estados de nodo y canje
└── roadmap/
    ├── roadmapMath.ts            # Motor geométrico puro (Bézier, De Casteljau, anclas, horizonte)
    ├── RoadmapCanvas.tsx         # Contenedor scrolleable con cálculo memoizado y autofoco
    ├── RoadmapPathSvg.tsx        # Ensamblador de capas SVG
    ├── RoadmapAtmosphereSvg.tsx  # Fondo continuo cósmico, estrellas, nubes y luna
    ├── RoadmapOriginBadge.tsx    # Cartel píldora de "INICIO" anclado a la base
    ├── RoadmapNodeItem.tsx       # Nodos individuales numerados con estrellas unificadas
    └── RoadmapHorizon.tsx        # Remate superior con difuminado y "Próximamente más premios"
```
