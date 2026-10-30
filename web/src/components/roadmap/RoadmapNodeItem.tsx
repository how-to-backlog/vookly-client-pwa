'use client';

import React from 'react';
import { RoadmapNodePoint } from '@/types/loyalty';

export interface RoadmapNodeItemProps {
  node: RoadmapNodePoint;
  canvasWidth?: number;
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
export function RoadmapNodeItem({ node, canvasWidth = 360 }: RoadmapNodeItemProps) {
  // Nodo base de inicio se maneja en RoadmapOriginBadge
  if (node.stampIndex === 0) return null;

  const midX = canvasWidth / 2;

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
      <g key={`reward-${node.stampIndex}`} className="transition-transform select-none">
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
  // Radio 15px (diámetro 30px) para alojar cómodamente los números al doble de tamaño
  const regularRadius = 15;

  if (node.isCompleted) {
    return (
      <g key={`stamp-${node.stampIndex}`} className="select-none">
        {/* Fondo circular sólido oscuro */}
        <circle
          cx={node.point.x}
          cy={node.point.y}
          r={regularRadius}
          fill="#18181B"
          stroke="#FFFFFF"
          strokeWidth="2"
        />
        {/* Número del sello duplicado de tamaño (~16px) en blanco nítido */}
        <text
          x={node.point.x}
          y={node.point.y + 5.5}
          textAnchor="middle"
          className="text-[16px] font-black fill-white tracking-tight"
        >
          {node.stampIndex}
        </text>
      </g>
    );
  }

  // Nodo bloqueado / por conseguir
  return (
    <g key={`stamp-${node.stampIndex}`} className="select-none">
      {/* Fondo circular blanco con borde tenue */}
      <circle
        cx={node.point.x}
        cy={node.point.y}
        r={regularRadius}
        fill="#FFFFFF"
        stroke="#D4D4D8"
        strokeWidth="2"
      />
      {/* Número del sello duplicado de tamaño (~16px) en gris suave */}
      <text
        x={node.point.x}
        y={node.point.y + 5.5}
        textAnchor="middle"
        className="text-[16px] font-bold fill-zinc-400 tracking-tight"
      >
        {node.stampIndex}
      </text>
    </g>
  );
}
