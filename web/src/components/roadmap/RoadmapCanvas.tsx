'use client';

import React, { useEffect, useMemo, useRef } from 'react';
import { BusinessLoyaltyRules } from '@/types/loyalty';
import { calculateRoadmapGeometry } from './roadmapMath';
import { RoadmapPathSvg } from './RoadmapPathSvg';

export interface RoadmapCanvasProps {
  rules: BusinessLoyaltyRules;
  currentStamps: number;
  className?: string;
}

/**
 * RoadmapCanvas: Contenedor scrolleable limpio que invoca calculateRoadmapGeometry
 * y monta RoadmapPathSvg, haciendo autofoco de scroll inicial hacia la coordenada Y
 * del sello actual (currentStamps).
 */
export function RoadmapCanvas({
  rules,
  currentStamps,
  className = ''
}: RoadmapCanvasProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  // Cálculo matemático desacoplado puro memoizado
  const geometry = useMemo(() => {
    return calculateRoadmapGeometry(rules, currentStamps);
  }, [rules, currentStamps]);

  // Autofoco de scroll inicial hacia la coordenada Y del sello actual
  useEffect(() => {
    if (!containerRef.current || !geometry.currentPoint) return;

    const container = containerRef.current;
    // La coordenada Y del SVG relativa a la escala real del contenedor
    const containerHeight = container.clientHeight;
    const scrollHeight = container.scrollHeight;

    // Proporción de la coordenada Y en el SVG respecto a su altura total
    const ratioY = geometry.currentPoint.y / geometry.height;
    const targetScrollY = ratioY * scrollHeight - containerHeight / 2;

    container.scrollTo({
      top: Math.max(0, targetScrollY),
      behavior: 'smooth'
    });
  }, [geometry]);

  return (
    <div
      ref={containerRef}
      className={`relative w-full flex-1 overflow-y-auto overflow-x-hidden pt-0 pb-0 px-0 flex justify-center no-scrollbar ${className}`}
      style={{ scrollBehavior: 'smooth' }}
    >
      <div className="w-full relative pb-0">
        <RoadmapPathSvg
          width={geometry.width}
          height={geometry.height}
          completedPathD={geometry.completedPathD}
          futurePathD={geometry.futurePathD}
          nodes={geometry.nodes}
          currentPoint={geometry.currentPoint}
          originPoint={geometry.originPoint}
          horizon={geometry.horizon}
        />
      </div>
    </div>
  );
}
