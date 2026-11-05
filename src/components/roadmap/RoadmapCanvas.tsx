'use client';

import React, { useEffect, useMemo, useRef, useState, useCallback } from 'react';
import {
  BusinessLoyaltyRules,
  CustomerWalletStatus,
  InteractiveNodeSelection,
  RoadmapNodePoint
} from '@/types/loyalty';
import { calculateRoadmapGeometry } from './roadmapMath';
import { RoadmapPathSvg } from './RoadmapPathSvg';
import { buildInteractiveNodeSelection } from '@/lib/loyaltyRules';

export interface RoadmapCanvasProps {
  rules: BusinessLoyaltyRules;
  walletStatus: CustomerWalletStatus;
  selectedNodeIndex?: number | null;
  onSelectNode?: (selection: InteractiveNodeSelection | null) => void;
  className?: string;
}

/**
 * RoadmapCanvas: Contenedor scrolleable limpio que invoca calculateRoadmapGeometry
 * y monta RoadmapPathSvg, haciendo autofoco de scroll inicial hacia la coordenada Y
 * del sello actual (currentStamps).
 */
export function RoadmapCanvas({
  rules,
  walletStatus,
  selectedNodeIndex: externalSelectedNodeIndex,
  onSelectNode: externalOnSelectNode,
  className = ''
}: RoadmapCanvasProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const touchStartPos = useRef<{ x: number; y: number } | null>(null);
  const isDragging = useRef(false);

  // Manejo de selección unificada (controlada externamente o interna de fallback)
  const [internalSelectedNodeIndex, setInternalSelectedNodeIndex] = useState<number | null>(null);
  const selectedNodeIndex = externalSelectedNodeIndex !== undefined
    ? externalSelectedNodeIndex
    : internalSelectedNodeIndex;

  // Cálculo matemático desacoplado puro memoizado
  const geometry = useMemo(() => {
    return calculateRoadmapGeometry(rules, walletStatus.currentStamps);
  }, [rules, walletStatus.currentStamps]);

  // Autofoco de scroll inicial hacia la coordenada Y del sello actual
  useEffect(() => {
    if (!containerRef.current || !geometry.currentPoint) return;

    const container = containerRef.current;
    const containerHeight = container.clientHeight;
    const scrollHeight = container.scrollHeight;

    const ratioY = geometry.currentPoint.y / geometry.height;
    const targetScrollY = ratioY * scrollHeight - containerHeight / 2;

    container.scrollTo({
      top: Math.max(0, targetScrollY),
      behavior: 'smooth'
    });
  }, [geometry]);

  // Callback de centrado vertical suave al tocar un nodo
  const scrollToNode = useCallback((pointY: number) => {
    if (!containerRef.current) return;
    const container = containerRef.current;
    const containerHeight = container.clientHeight;
    const scrollHeight = container.scrollHeight;

    const ratioY = pointY / geometry.height;
    const targetScrollY = ratioY * scrollHeight - containerHeight / 2;

    container.scrollTo({
      top: Math.max(0, targetScrollY),
      behavior: 'smooth'
    });
  }, [geometry.height]);

  // Selección de nodo con discriminación táctil y emisión de payload enriquecido
  const handleSelectNode = useCallback((node: RoadmapNodePoint) => {
    if (isDragging.current) return;

    setInternalSelectedNodeIndex(node.stampIndex);
    scrollToNode(node.point.y);

    if (externalOnSelectNode) {
      const selection = buildInteractiveNodeSelection(node, walletStatus);
      externalOnSelectNode(selection);
    }
  }, [externalOnSelectNode, scrollToNode, walletStatus]);

  // Manejo de eventos táctiles para discriminar Tap de Scroll (umbral de 8px)
  const handleTouchStart = (e: React.TouchEvent) => {
    const touch = e.touches[0];
    touchStartPos.current = { x: touch.clientX, y: touch.clientY };
    isDragging.current = false;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!touchStartPos.current) return;
    const touch = e.touches[0];
    const dx = Math.abs(touch.clientX - touchStartPos.current.x);
    const dy = Math.abs(touch.clientY - touchStartPos.current.y);

    // Si el dedo se movió más de 8px en cualquier dirección, es un scroll/drag deliberado
    if (dx > 8 || dy > 8) {
      isDragging.current = true;
    }
  };

  const handleTouchEnd = () => {
    // Permitir pequeño retraso para evitar que el click nativo posterior se dispare si hubo arrastre
    setTimeout(() => {
      isDragging.current = false;
      touchStartPos.current = null;
    }, 100);
  };

  // Tap en el lienzo vacío para deseleccionar
  const handleCanvasClick = (e: React.MouseEvent) => {
    // Solo si se clickeó el fondo directo
    if (e.target === e.currentTarget || (e.target as HTMLElement).tagName === 'svg') {
      setInternalSelectedNodeIndex(null);
      externalOnSelectNode?.(null);
    }
  };

  return (
    <div
      ref={containerRef}
      onClick={handleCanvasClick}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
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
          selectedNodeIndex={selectedNodeIndex}
          onSelectNode={handleSelectNode}
        />
      </div>
    </div>
  );
}
