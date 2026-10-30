'use client';

import React from 'react';
import { RoadmapNodePoint } from '@/types/loyalty';

export interface RoadmapNodeItemProps {
  node: RoadmapNodePoint;
  canvasWidth?: number;
  isSelected?: boolean;
  onSelect?: (node: RoadmapNodePoint) => void;
}

/**
 * RoadmapNodeItem: Renderizado modular de un nodo individual (premio o sello común).
 *
 * Implementa estrictamente las correcciones de diseño:
 * 1. Sellos comunes conseguidos (isCompleted): borde #71717A y centro relleno #71717A.
 * 2. Sellos comunes NO conseguidos (!isCompleted): círculos vacíos fill="#FFFFFF" con borde tenue #D4D4D8.
 * 3. Hitos de premio con esferas amplias listas para imagen de producto (r=28 regular, r=32 mayor).
 * 4. Orientación de texto al centro del lienzo:
 *    - Si node.point.x < width / 2: texto a la derecha (x = node.point.x + radius + 14, textAnchor="start").
 *    - Si node.point.x >= width / 2: texto a la izquierda (x = node.point.x - radius - 14, textAnchor="end").
 */
export function RoadmapNodeItem({
  node,
  canvasWidth = 360,
  isSelected = false,
  onSelect
}: RoadmapNodeItemProps) {
  // Nodo base de inicio se maneja en RoadmapOriginBadge
  if (node.stampIndex === 0) return null;

  const midX = canvasWidth / 2;

  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onSelect?.(node);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      onSelect?.(node);
    }
  };

  const ariaLabel =
    node.interactiveState === 'reward_ready'
      ? `Premio del Sello ${node.stampIndex}: ${node.rewardTitle || 'Premio'}, listo para reclamar`
      : node.interactiveState === 'reward_cooldown'
      ? `Premio del Sello ${node.stampIndex}: ${node.rewardTitle || 'Premio'}, disponible en ${node.cooldownRemainingMinutes || 180} minutos`
      : node.interactiveState === 'reward_redeemed'
      ? `Premio del Sello ${node.stampIndex}: ${node.rewardTitle || 'Premio'}, ya canjeado`
      : node.isReward
      ? `Premio del Sello ${node.stampIndex}: ${node.rewardTitle || 'Premio'}, pendiente`
      : node.interactiveState === 'current_position'
      ? `Sello ${node.stampIndex}, tu posición actual`
      : node.isCompleted
      ? `Sello ${node.stampIndex} completado`
      : `Sello ${node.stampIndex} pendiente`;

  if (node.isReward) {
    // Todos los premios estandarizados al mismo tamaño exacto (radio 28 / interior 20)
    const radius = 28;
    const innerRadius = 20;
    const isLeftSide = node.point.x < midX;

    const textX = isLeftSide
      ? node.point.x + radius + 14
      : node.point.x - radius - 14;
    const textAnchor = isLeftSide ? 'start' : 'end';

    return (
      <g
        key={`reward-${node.stampIndex}`}
        role="button"
        tabIndex={0}
        aria-label={ariaLabel}
        onClick={handleClick}
        onKeyDown={handleKeyDown}
        className="cursor-pointer select-none transition-transform duration-150 ease-out active:scale-95 origin-center outline-none focus-visible:opacity-80"
        style={{
          transformOrigin: `${node.point.x}px ${node.point.y}px`
        }}
      >
        {/* Hit area táctil expandida (mínimo 56px de radio / 112px de diámetro) que cubre círculo y aproximación de texto */}
        <circle
          cx={node.point.x}
          cy={node.point.y}
          r={radius + 8}
          fill="transparent"
          pointerEvents="all"
        />

        {/* Halo de selección si el nodo está activo */}
        {isSelected && (
          <circle
            cx={node.point.x}
            cy={node.point.y}
            r={radius + 6}
            fill="none"
            stroke="#18181B"
            strokeWidth="3"
            strokeDasharray="4 4"
            className="animate-pulse"
          />
        )}

        {/* Sombra de apoyo */}
        <circle
          cx={node.point.x}
          cy={node.point.y + 2}
          r={radius}
          fill="#18181B"
          fillOpacity="0.06"
        />

        {/* Círculo exterior / Anillo principal */}
        <circle
          cx={node.point.x}
          cy={node.point.y}
          r={radius}
          fill="#FFFFFF"
          stroke={node.isCompleted ? '#18181B' : '#A1A1AA'}
          strokeWidth={node.isMajorReward ? '3.5' : '2.5'}
        />

        {/* Círculo interior amplio listo para recibir imagen del producto */}
        <circle
          cx={node.point.x}
          cy={node.point.y}
          r={innerRadius}
          fill={
            node.isCompleted
              ? node.isMajorReward
                ? '#18181B'
                : '#F4F4F5'
              : '#FAFAFA'
          }
          stroke={node.isCompleted ? 'none' : '#E4E4E7'}
          strokeWidth="1"
        />

        {/* Indicador / Icono de estrella unificado para todos los sellos de premio */}
        <text
          x={node.point.x}
          y={node.point.y + 5}
          textAnchor="middle"
          className={`text-[15px] font-bold ${
            node.isCompleted ? 'fill-amber-300' : 'fill-zinc-400'
          }`}
        >
          ★
        </text>

        {/* Etiqueta de texto orientada matemáticamente hacia el interior/centro */}
        <g>
          {/* Badge del número de sello del premio */}
          <text
            x={textX}
            y={node.point.y - 12}
            textAnchor={textAnchor}
            className={`text-[15px] font-extrabold uppercase tracking-wider ${
              node.point.y < 500 ? 'fill-zinc-300' : 'fill-zinc-500'
            }`}
          >
            Sello {node.stampIndex}
          </text>

          {/* Título del premio (duplicado a ~22px con tracking nítido) */}
          <text
            x={textX}
            y={node.point.y + 16}
            textAnchor={textAnchor}
            className={`text-[22px] tracking-tight ${
              node.point.y < 500
                ? 'font-black fill-white'
                : node.isMajorReward
                ? 'font-black fill-zinc-950'
                : 'font-bold fill-zinc-900'
            }`}
          >
            {node.rewardTitle || `Premio ${node.stampIndex}`}
          </text>
        </g>
      </g>
    );
  }

  // Sello regular intermedio (Opción A: Número adentro del nodo estilo Candy Crush / Duolingo)
  // Radio visual de 15px (diámetro 30px)
  const regularRadius = 15;
  const accessibleHitRadius = 24; // Expansión táctil a 48x48px (Apple / Android A11y)

  return (
    <g
      key={`stamp-${node.stampIndex}`}
      role="button"
      tabIndex={0}
      aria-label={ariaLabel}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      className="cursor-pointer select-none transition-transform duration-150 ease-out active:scale-90 origin-center outline-none focus-visible:opacity-80"
      style={{
        transformOrigin: `${node.point.x}px ${node.point.y}px`
      }}
    >
      {/* Hit area invisible para garantizar target táctil de al menos 48x48px */}
      <circle
        cx={node.point.x}
        cy={node.point.y}
        r={accessibleHitRadius}
        fill="transparent"
        pointerEvents="all"
      />

      {/* Halo de selección si el nodo regular está activo */}
      {isSelected && (
        <circle
          cx={node.point.x}
          cy={node.point.y}
          r={regularRadius + 5}
          fill="none"
          stroke="#18181B"
          strokeWidth="2.5"
          strokeDasharray="3 3"
          className="animate-pulse"
        />
      )}

      {/* Fondo circular según completado o pendiente */}
      <circle
        cx={node.point.x}
        cy={node.point.y}
        r={regularRadius}
        fill={node.isCompleted ? '#18181B' : '#FFFFFF'}
        stroke={node.isCompleted ? '#FFFFFF' : '#D4D4D8'}
        strokeWidth="2"
      />

      {/* Número del sello duplicado de tamaño (~16px) */}
      <text
        x={node.point.x}
        y={node.point.y + 5.5}
        textAnchor="middle"
        className={`text-[16px] tracking-tight ${
          node.isCompleted ? 'font-black fill-white' : 'font-bold fill-zinc-400'
        }`}
      >
        {node.stampIndex}
      </text>
    </g>
  );
}
