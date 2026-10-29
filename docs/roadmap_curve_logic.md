# Especificación Técnica y Matemática: Motor de Curva y Nodos del Roadmap (Vookly)

> **Propósito:** Resguardar la lógica geométrica, algorítmica y de desacoplamiento del camino vertical de sellos (`/local/[id]`) para que sea 100% agnóstica a las reglas comerciales de cada negocio adherido.

---

## 1. Principio de Diseño: "Anclas de Premio + Interpolación de Sellos"

En la vida real, cada comercio define su propia regla de fidelización:
* Una barbería puede otorgar un premio cada **3 sellos**.
* Una cafetería puede otorgar premios en los sellos **6, 12, 18, 24 y 30**.
* Un restaurante puede tener hitos irregulares (**4, 10 y 20**).

Si la forma de la curva dependiera directamente de la cantidad de sellos, el dibujo se deformaría o perdería simetría entre un local y otro. Para evitarlo, el sistema desacopla la **geometría de la curva** de la **cantidad de sellos intermedios**:

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

### Estados Visuales de los Nodos Comunes
Cada nodo posee un atributo derivado `isCompleted = stampIndex <= currentStamps`:
* **Nodos Comunes Conseguidos (`isCompleted === true`):** Círculo exterior con borde `#71717A` (`zinc-500`) y punto interior relleno `#71717A`.
* **Nodos Comunes Pendientes (`isCompleted === false`):** Círculos vacíos (`fill="#FFFFFF"`), sin círculo interior relleno, con trazo perimetral tenue `#D4D4D8` (`zinc-300`).

---

## 4. Regla Matemática de Posicionamiento de Textos Hacia el Centro

Para evitar que las etiquetas textuales corten o pisen la curva en "S":
* **Alternancia estricta de todos los hitos:** Todos los hitos alternan izquierda ($X_{\text{left}}$) y derecha ($X_{\text{right}}$), incluyendo el último hito de premio mayor. Esto permite que el camino continúe ascendiendo hacia el horizonte sin que el texto del último premio choque con la línea vertical superior.
* **Orientación centrípeta:**
  * Si el nodo de premio está en la curva izquierda ($X < W / 2$):  
    $$X_{\text{texto}} = X_{\text{nodo}} + R + 14, \quad \text{textAnchor} = \text{"start"}$$
  * Si el nodo de premio está en la curva derecha ($X \ge W / 2$):  
    $$X_{\text{texto}} = X_{\text{nodo}} - R - 14, \quad \text{textAnchor} = \text{"end"}$$
* **Burbujas amplias para imágenes:** Los nodos de premio cuentan con radios mayores ($R = 28\text{px}$ para premios estándar y $R = 32\text{px}$ para el premio mayor), con círculos interiores generosos ($r = 20\text{px}$ y $r = 24\text{px}$) preparados para alojar la imagen del producto a ganar.

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

## 6. Inicio del Camino ("INICIO") y Extensión al Horizonte ("Próximamente más premios")

1. **Badge de Inicio (`RoadmapOriginBadge`):**
   * En la base del lienzo (`stampIndex === 0`, $X = 180$, $Y = \text{totalHeight} - \text{BOTTOM\_PADDING}$), el camino está anclado a un badge píldora `#18181B` con el texto `"INICIO"` y una línea conectora punteada.
2. **Extensión hacia el Horizonte con Fade-out (`RoadmapHorizon`):**
   * Superado el último hito de premio, la curva punteada se prolonga $\sim 140\text{px}$ hacia arriba curvándose hacia el centro superior $(X = 180)$.
   * Se aplica un **gradiente lineal de opacidad (`#horizonCurveFade`)** que desvanece la curva hasta el $0\%$ de opacidad, acompañado de un halo de niebla radial (`#horizonMistGlow`).
   * En la cúspide se presenta un badge sutil con borde punteado que anuncia `"Próximamente más premios"`.

---

## 7. Arquitectura de Componentes Lego Desacoplados

```text
web/src/components/roadmap/
├── roadmapMath.ts         # Motor matemático puro (Bézier, De Casteljau, anclas, horizonte)
├── RoadmapCanvas.tsx      # Contenedor scrolleable con cálculo memoizado y autofoco
├── RoadmapPathSvg.tsx     # Ensamblador de capas SVG
├── RoadmapOriginBadge.tsx # Cartel píldora de "INICIO" anclado a la base
├── RoadmapNodeItem.tsx    # Nodos individuales (premios amplios orientados al centro y sellos vacíos/completados)
└── RoadmapHorizon.tsx     # Remate superior con difuminado suave y "Próximamente más premios"
```
