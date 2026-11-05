'use client';

import React from 'react';
import { Point2D } from '@/types/loyalty';

export interface RoadmapOriginBadgeProps {
  point: Point2D;
  className?: string;
}

/**
 * RoadmapOriginBadge: Badge píldora limpio que señala el inicio del camino ("INICIO"),
 * anclado directamente a la base de la curva S (nodo stampIndex === 0).
 */
export function RoadmapOriginBadge({ point, className = '' }: RoadmapOriginBadgeProps) {
  const badgeWidth = 74;
  const badgeHeight = 24;
  const badgeX = point.x - badgeWidth / 2;
  const badgeY = point.y + 16; // Ubicado limpiamente debajo del punto ancla 0, 100% visible por encima de los techos

  return (
    <g className={`roadmap-origin-badge select-none ${className}`}>
      {/* Línea conectora sutil entre el punto base y el badge */}
      <line
        x1={point.x}
        y1={point.y}
        x2={point.x}
        y2={badgeY}
        stroke="#71717A"
        strokeWidth="1.5"
        strokeDasharray="2 2"
      />

      {/* Punto ancla base en el origen */}
      <circle
        cx={point.x}
        cy={point.y}
        r="4"
        fill="#18181B"
        stroke="#FFFFFF"
        strokeWidth="1.5"
      />

      {/* Badge píldora de "INICIO" */}
      <rect
        x={badgeX}
        y={badgeY}
        width={badgeWidth}
        height={badgeHeight}
        rx={badgeHeight / 2}
        fill="#18181B"
        className="drop-shadow-sm"
      />
      <text
        x={point.x}
        y={badgeY + 16}
        textAnchor="middle"
        className="text-[11px] font-bold tracking-widest fill-white uppercase"
        style={{ letterSpacing: '0.12em' }}
      >
        INICIO
      </text>
    </g>
  );
}
