'use client';

import React from 'react';
import { RoadmapHorizonExtension } from '@/types/loyalty';

export interface RoadmapHorizonProps {
  horizon: RoadmapHorizonExtension;
  className?: string;
}

/**
 * RoadmapHorizon: Extensión de la curva hacia el horizonte con fade-out / niebla blanca
 * y badge píldora sutil que anuncia "Próximamente más premios".
 */
export function RoadmapHorizon({ horizon, className = '' }: RoadmapHorizonProps) {
  const badgeWidth = 190;
  const badgeHeight = 28;
  const badgeX = horizon.endPoint.x - badgeWidth / 2;
  const badgeY = horizon.endPoint.y - 14;

  return (
    <g className={`roadmap-horizon select-none ${className}`}>
      <defs>
        {/* Gradiente lineal para el difuminado / desvanecimiento suave de la curva */}
        <linearGradient id="horizonCurveFade" x1="0" y1="1" x2="0" y2="0">
          <stop offset="0%" stopColor="#D4D4D8" stopOpacity="0.9" />
          <stop offset="60%" stopColor="#D4D4D8" stopOpacity="0.35" />
          <stop offset="100%" stopColor="#D4D4D8" stopOpacity="0.0" />
        </linearGradient>

        {/* Gradiente radial para el halo de niebla superior */}
        <radialGradient id="horizonMistGlow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.95" />
          <stop offset="60%" stopColor="#FFFFFF" stopOpacity="0.75" />
          <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0.0" />
        </radialGradient>
      </defs>

      {/* 1. Curva punteada hacia el horizonte con gradiente de fade-out */}
      <path
        d={horizon.pathD}
        fill="none"
        stroke="url(#horizonCurveFade)"
        strokeWidth="3.5"
        strokeDasharray="6 6"
        strokeLinecap="round"
      />

      {/* 2. Bruma / Niebla blanca suave de fondo */}
      <ellipse
        cx={horizon.endPoint.x}
        cy={horizon.endPoint.y}
        rx="95"
        ry="36"
        fill="url(#horizonMistGlow)"
      />

      {/* 3. Badge píldora sutil "Próximamente más premios" */}
      <g className="transition-opacity hover:opacity-100">
        <rect
          x={badgeX}
          y={badgeY}
          width={badgeWidth}
          height={badgeHeight}
          rx={badgeHeight / 2}
          fill="#FFFFFF"
          stroke="#E4E4E7"
          strokeWidth="1"
          strokeDasharray="4 3"
          className="drop-shadow-xs"
        />
        <text
          x={horizon.endPoint.x}
          y={badgeY + 18}
          textAnchor="middle"
          className="text-[12px] font-semibold fill-zinc-500 tracking-tight"
        >
          Próximamente más premios
        </text>
      </g>
    </g>
  );
}
