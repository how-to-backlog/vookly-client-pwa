'use client';

import React from 'react';

export interface StampNodeBubbleProps {
  stampIndex: number;
  isCompleted: boolean;
  isReward?: boolean;
  className?: string;
}

/**
 * StampNodeBubble: Componente visual Lego que clona 1:1 la apariencia de un nodo del Roadmap.
 *
 * Reutilización estética estricta:
 * - Si isCompleted === true: Círculo negro sólido (#18181B) con número blanco en font-black tracking-tight.
 * - Si isCompleted === false: Círculo blanco (#FFFFFF) con borde gris (#D4D4D8) y número en font-bold fill-zinc-400.
 * - Debajo del círculo: la palabra "sello" en minúscula con estilo sobrio y centrado.
 */
export function StampNodeBubble({
  stampIndex,
  isCompleted,
  isReward = false,
  className = ''
}: StampNodeBubbleProps) {
  return (
    <div className={`flex flex-col items-center flex-shrink-0 select-none ${className}`}>
      {/* Burbuja circular exacta a los nodos del roadmap */}
      <div
        className={`w-11 h-11 rounded-full flex items-center justify-center border-2 transition-transform ${
          isCompleted
            ? 'bg-neutral-900 border-neutral-900 text-white shadow-xs'
            : 'bg-white border-neutral-300 text-neutral-400'
        }`}
      >
        {isReward ? (
          <span
            className={`text-[16px] leading-none ${
              isCompleted ? 'text-amber-300' : 'text-neutral-400'
            }`}
          >
            ★
          </span>
        ) : (
          <span
            className={`text-[17px] tracking-tight ${
              isCompleted ? 'font-black text-white' : 'font-bold text-neutral-400'
            }`}
          >
            {stampIndex}
          </span>
        )}
      </div>
    </div>
  );
}

export default StampNodeBubble;
