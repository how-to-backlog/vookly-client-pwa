'use client';

import React from 'react';
import {
  Point2D,
  RoadmapHorizonExtension,
  RoadmapNodePoint
} from '@/types/loyalty';
import { RoadmapHorizon } from './RoadmapHorizon';
import { RoadmapNodeItem } from './RoadmapNodeItem';
import { RoadmapOriginBadge } from './RoadmapOriginBadge';
import { RoadmapAtmosphereSvg } from './RoadmapAtmosphereSvg';

export interface RoadmapPathSvgProps {
  width: number;
  height: number;
  completedPathD: string;
  futurePathD: string;
  nodes?: RoadmapNodePoint[];
  currentPoint?: Point2D;
  originPoint?: Point2D;
  horizon?: RoadmapHorizonExtension;
  selectedNodeIndex?: number | null;
  onSelectNode?: (node: RoadmapNodePoint) => void;
  className?: string;
}

/**
 * RoadmapPathSvg: Componente ensamblador Lego de la geometría del roadmap.
 * Renderiza en orden de capas (Z-index en SVG):
 * 1. Curva del horizonte con difuminado suave y badge "Próximamente más premios"
 * 2. Trazo punteado (strokeDasharray="8 8") para el camino por recorrer
 * 3. Trazo continuo sólido para el camino ya recorrido
 * 4. Badge anclado de "INICIO" en la base
 * 5. Nodos visuales e hitos de premios orientados hacia el centro
 * 6. Indicador pulsante del punto actual (currentPoint)
 */
export function RoadmapPathSvg({
  width,
  height,
  completedPathD,
  futurePathD,
  nodes = [],
  currentPoint,
  originPoint,
  horizon,
  selectedNodeIndex,
  onSelectNode,
  className = ''
}: RoadmapPathSvgProps) {
  return (
    <svg
      viewBox={`0 0 ${width} ${height}`}
      className={`w-full h-auto overflow-visible select-none ${className}`}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* -1. Atmósfera vertical continua (Espacio, estrellas, partículas, nubes transparentes) */}
      <RoadmapAtmosphereSvg width={width} height={height} />

      {/* 0. Silueta PNG de la ciudad: fija en la base absoluta del SVG */}
      <image
        href="/images/roadmap/city-skyline.png"
        x={-width * 0.02}
        y={height - 135}
        width={width * 1.04}
        height="135"
        preserveAspectRatio="none"
        className="pointer-events-none"
      />

      {/* 1. Extensión hacia el horizonte (fade-out y niebla) */}
      {horizon && <RoadmapHorizon horizon={horizon} />}

      {/* 2. Trazo futuro / por recorrer (Punteado) */}
      {futurePathD && (
        <path
          d={futurePathD}
          fill="none"
          stroke="#D4D4D8" // zinc-300
          strokeWidth="4"
          strokeDasharray="8 8"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      )}

      {/* 3. Trazo completado / recorrido (Sólido) */}
      {completedPathD && (
        <path
          d={completedPathD}
          fill="none"
          stroke="#18181B" // zinc-900
          strokeWidth="4"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      )}

      {/* 4. Badge anclado de INICIO en el origen */}
      {originPoint && <RoadmapOriginBadge point={originPoint} />}

      {/* 5. Nodos visuales e Hitos de premio */}
      {nodes.map((node) => (
        <RoadmapNodeItem
          key={`node-${node.stampIndex}`}
          node={node}
          canvasWidth={width}
          isSelected={selectedNodeIndex === node.stampIndex}
          onSelect={onSelectNode}
        />
      ))}

      {/* 6. Indicador del Punto de corte / Sello actual */}
      {currentPoint && (
        <g>
          {/* Halo sutil estático para destacar el nodo actual */}
          <circle
            cx={currentPoint.x}
            cy={currentPoint.y}
            r="12"
            fill="#18181B"
            fillOpacity="0.12"
          />
          {/* Punto negro central firme */}
          <circle
            cx={currentPoint.x}
            cy={currentPoint.y}
            r="8"
            fill="#18181B"
            stroke="#FFFFFF"
            strokeWidth="2.5"
          />
        </g>
      )}
    </svg>
  );
}
