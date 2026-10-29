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
  const badgeWidth = 64;
  const badgeHeight = 22;
  const badgeX = point.x - badgeWidth / 2;
  const badgeY = point.y + 12; // Justo debajo del punto de anclaje base

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
        y={badgeY + 14.5}
        textAnchor="middle"
        className="text-[9px] font-bold tracking-widest fill-white uppercase"
        style={{ letterSpacing: '0.12em' }}
      >
        INICIO
      </text>
    </g>
  );
}
