import {
  BusinessLoyaltyRules,
  CubicBezierSegment,
  Point2D,
  RoadmapGeometryResult,
  RoadmapNodePoint
} from '@/types/loyalty';

/**
 * Evaluación de una curva de Bézier cúbica en el parámetro t ∈ [0, 1].
 * B(t) = (1-t)^3 P0 + 3(1-t)^2 t P1 + 3(1-t) t^2 P2 + t^3 P3
 */
export function evaluateCubicBezier(
  p0: Point2D,
  p1: Point2D,
  p2: Point2D,
  p3: Point2D,
  t: number
): Point2D {
  const mt = 1 - t;
  const mt2 = mt * mt;
  const mt3 = mt2 * mt;
  const t2 = t * t;
  const t3 = t2 * t;

  return {
    x: mt3 * p0.x + 3 * mt2 * t * p1.x + 3 * mt * t2 * p2.x + t3 * p3.x,
    y: mt3 * p0.y + 3 * mt2 * t * p1.y + 3 * mt * t2 * p2.y + t3 * p3.y
  };
}

/**
 * Subdivisión de De Casteljau para un segmento de Bézier cúbico en el parámetro t ∈ [0, 1].
 * Devuelve dos segmentos cúbicos [left, right] que reproducen exactamente la curva original.
 */
export function subdivideCubicBezier(
  p0: Point2D,
  p1: Point2D,
  p2: Point2D,
  p3: Point2D,
  t: number
): [
  { p0: Point2D; p1: Point2D; p2: Point2D; p3: Point2D },
  { p0: Point2D; p1: Point2D; p2: Point2D; p3: Point2D }
] {
  // Nivel 1
  const p01 = { x: (1 - t) * p0.x + t * p1.x, y: (1 - t) * p0.y + t * p1.y };
  const p12 = { x: (1 - t) * p1.x + t * p2.x, y: (1 - t) * p1.y + t * p2.y };
  const p23 = { x: (1 - t) * p2.x + t * p3.x, y: (1 - t) * p2.y + t * p3.y };

  // Nivel 2
  const p012 = { x: (1 - t) * p01.x + t * p12.x, y: (1 - t) * p01.y + t * p12.y };
  const p123 = { x: (1 - t) * p12.x + t * p23.x, y: (1 - t) * p12.y + t * p23.y };

  // Nivel 3 (punto sobre la curva)
  const p0123 = { x: (1 - t) * p012.x + t * p123.x, y: (1 - t) * p012.y + t * p123.y };

  return [
    { p0, p1: p01, p2: p012, p3: p0123 },
    { p0: p0123, p1: p123, p2: p23, p3 }
  ];
}

/**
 * Convierte un segmento cúbico a comando SVG C
 */
function cubicToCommand(
  p1: Point2D,
  p2: Point2D,
  p3: Point2D,
  precision = 2
): string {
  const f = (n: number) => Number(n.toFixed(precision));
  return `C ${f(p1.x)} ${f(p1.y)}, ${f(p2.x)} ${f(p2.y)}, ${f(p3.x)} ${f(p3.y)}`;
}

/**
 * Motor matemático de cálculo de geometría del roadmap.
 * Función pura desacoplada: cero React, cero DOM.
 * Sigue estrictamente docs/roadmap_curve_logic.md.
 */
export function calculateRoadmapGeometry(
  rules: BusinessLoyaltyRules,
  currentStamps: number
): RoadmapGeometryResult {
  const WIDTH = 360;
  const X_LEFT = 76;
  const X_RIGHT = 284;
  const X_CENTER = 180;

  const TOP_PADDING = 120; // Proyección vertical compacta del horizonte
  const BOTTOM_PADDING = 115; // Bajamos la curva S a 115 para calzarla justo sobre los techos
  const BASE_SEGMENT_HEIGHT = 60; // Altura mínima base en px
  const PIXELS_PER_STAMP = 44; // ~44px de recorrido vertical por cada sello del tramo

  // Altura mínima garantizada de la pantalla para que nunca queden huecos blancos en mapas chicos
  const MIN_SCREEN_HEIGHT = 780;

  // Ordenamos hitos de menor a mayor umbral
  const sortedMilestones = [...rules.rewardMilestones].sort(
    (a, b) => a.stampThreshold - b.stampThreshold
  );

  // Calcular alturas dinámicas por tramo según la cantidad de sellos que contiene
  let previousStamp = 0;
  let accumulatedHeight = BOTTOM_PADDING;

  const segmentHeights: number[] = [];
  sortedMilestones.forEach((m) => {
    const stampsInSegment = m.stampThreshold - previousStamp;
    const segHeight = Math.max(180, BASE_SEGMENT_HEIGHT + stampsInSegment * PIXELS_PER_STAMP);
    segmentHeights.push(segHeight);
    accumulatedHeight += segHeight;
    previousStamp = m.stampThreshold;
  });

  // El totalHeight es como mínimo la pantalla completa (780px)
  const totalHeight = Math.max(MIN_SCREEN_HEIGHT, TOP_PADDING + accumulatedHeight);

  // Anclas de hitos: comenzamos desde el inicio (sello 0)
  const milestoneAnchors: Array<{
    stamp: number;
    point: Point2D;
    isReward: boolean;
    rewardTitle?: string;
    isMajorReward?: boolean;
  }> = [];

  // Punto de inicio: sello 0 en la base
  milestoneAnchors.push({
    stamp: 0,
    point: { x: X_CENTER, y: totalHeight - BOTTOM_PADDING },
    isReward: false
  });

  // Iterar y colocar cada hito de premio acumulando su altura dinámica hacia arriba
  let currentY = totalHeight - BOTTOM_PADDING;
  sortedMilestones.forEach((m, idx) => {
    const segH = segmentHeights[idx];
    currentY -= segH;

    const x = idx % 2 === 0 ? X_LEFT : X_RIGHT;

    milestoneAnchors.push({
      stamp: m.stampThreshold,
      point: { x, y: currentY },
      isReward: true,
      rewardTitle: m.rewardTitle,
      isMajorReward: m.isMajorReward || idx === sortedMilestones.length - 1
    });
  });

  // Construir los segmentos Bézier cúbicos entre anclas consecutivas
  const segments: CubicBezierSegment[] = [];
  for (let i = 0; i < milestoneAnchors.length - 1; i++) {
    const startAnchor = milestoneAnchors[i];
    const endAnchor = milestoneAnchors[i + 1];

    const deltaY = startAnchor.point.y - endAnchor.point.y; // > 0 porque asciende
    const p0 = { ...startAnchor.point };
    const p1 = { x: startAnchor.point.x, y: startAnchor.point.y - 0.5 * deltaY };
    const p2 = { x: endAnchor.point.x, y: endAnchor.point.y + 0.5 * deltaY };
    const p3 = { ...endAnchor.point };

    segments.push({
      p0,
      p1,
      p2,
      p3,
      startStamp: startAnchor.stamp,
      endStamp: endAnchor.stamp
    });
  }

  // Clamped currentStamps para comparar
  const clampedCurrent = Math.max(
    0,
    Math.min(currentStamps, rules.totalRoadmapStamps)
  );

  const getNodeStatus = (stampIndex: number): 'completed' | 'current' | 'locked' => {
    if (stampIndex === clampedCurrent) return 'current';
    if (stampIndex < clampedCurrent) return 'completed';
    return 'locked';
  };

  // Interpolar las coordenadas exactas de todos los sellos (1..totalRoadmapStamps)
  const nodes: RoadmapNodePoint[] = [];

  // Agregar el nodo 0 (origen)
  nodes.push({
    stampIndex: 0,
    point: milestoneAnchors[0].point,
    isReward: false,
    isCompleted: true,
    status: clampedCurrent === 0 ? 'current' : 'completed'
  });

  // Para cada segmento, calcular los sellos dentro del rango (startStamp, endStamp]
  segments.forEach((seg) => {
    const M = seg.endStamp - seg.startStamp;
    for (let s = seg.startStamp + 1; s <= seg.endStamp; s++) {
      const k = s - seg.startStamp;
      const t = k / M;
      const pt = evaluateCubicBezier(seg.p0, seg.p1, seg.p2, seg.p3, t);

      const milestone = sortedMilestones.find((m) => m.stampThreshold === s);
      const isCompleted = s <= clampedCurrent;
      nodes.push({
        stampIndex: s,
        point: pt,
        isReward: !!milestone,
        rewardTitle: milestone?.rewardTitle,
        isMajorReward: milestone?.isMajorReward,
        isCompleted,
        status: getNodeStatus(s)
      });
    }
  });

  const currentNode = nodes.find((n) => n.stampIndex === clampedCurrent);
  const currentPoint = currentNode ? currentNode.point : nodes[0]?.point;

  // Generar completedPathD y futurePathD usando De Casteljau
  // Recorremos los segmentos y verificamos dónde cae clampedCurrent
  let completedPathD = '';
  let futurePathD = '';

  const f = (n: number) => Number(n.toFixed(2));

  segments.forEach((seg) => {
    const isSegmentPast = clampedCurrent >= seg.endStamp;
    const isSegmentFuture = clampedCurrent <= seg.startStamp;
    const isSegmentCurrent =
      clampedCurrent > seg.startStamp && clampedCurrent < seg.endStamp;

    if (isSegmentPast) {
      // Todo el segmento está completado
      if (!completedPathD) {
        completedPathD = `M ${f(seg.p0.x)} ${f(seg.p0.y)}`;
      }
      completedPathD += ` ${cubicToCommand(seg.p1, seg.p2, seg.p3)}`;
    } else if (isSegmentFuture) {
      // Todo el segmento es futuro
      if (!futurePathD) {
        futurePathD = `M ${f(seg.p0.x)} ${f(seg.p0.y)}`;
      }
      futurePathD += ` ${cubicToCommand(seg.p1, seg.p2, seg.p3)}`;
    } else if (isSegmentCurrent) {
      // El corte ocurre en este segmento en t = (current - start) / (end - start)
      const M = seg.endStamp - seg.startStamp;
      const t = (clampedCurrent - seg.startStamp) / M;
      const [left, right] = subdivideCubicBezier(seg.p0, seg.p1, seg.p2, seg.p3, t);

      // Parte izquierda (completada)
      if (!completedPathD) {
        completedPathD = `M ${f(left.p0.x)} ${f(left.p0.y)}`;
      }
      completedPathD += ` ${cubicToCommand(left.p1, left.p2, left.p3)}`;

      // Parte derecha (futura)
      if (!futurePathD) {
        futurePathD = `M ${f(right.p0.x)} ${f(right.p0.y)}`;
      } else {
        futurePathD += ` L ${f(right.p0.x)} ${f(right.p0.y)}`;
      }
      futurePathD += ` ${cubicToCommand(right.p1, right.p2, right.p3)}`;
    }
  });

  // 5. Extensión de la curva hacia el horizonte:
  // Desde el último ancla (último hito) se curva verticalmente hacia el centro superior X_CENTER
  const lastAnchor = milestoneAnchors[milestoneAnchors.length - 1];
  const horizonEndPoint = {
    x: X_CENTER,
    y: 35 // Siempre arriba de todo fijo bajo la pastilla
  };
  const horizonDeltaY = lastAnchor.point.y - horizonEndPoint.y;
  const hp1 = { x: lastAnchor.point.x, y: lastAnchor.point.y - 0.5 * horizonDeltaY };
  const hp2 = { x: horizonEndPoint.x, y: horizonEndPoint.y + 0.5 * horizonDeltaY };

  const horizonPathD = `M ${f(lastAnchor.point.x)} ${f(lastAnchor.point.y)} ${cubicToCommand(
    hp1,
    hp2,
    horizonEndPoint
  )}`;

  return {
    width: WIDTH,
    height: totalHeight,
    segments,
    nodes,
    completedPathD: completedPathD.trim(),
    futurePathD: futurePathD.trim(),
    currentPoint,
    originPoint: milestoneAnchors[0].point,
    horizon: {
      pathD: horizonPathD.trim(),
      endPoint: horizonEndPoint
    }
  };
}
