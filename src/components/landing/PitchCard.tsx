'use client';

import React from 'react';

export interface PitchCardProps {
  message: string;
  backgroundColor: string;
  inkColor: string;
}

/**
 * PitchCard: Tarjeta cuadrada y sólida para el stack de bienvenida.
 *
 * Características:
 * - Colores más oscuros, profundos y elegantes acordes a la paleta nocturna de la Aurora.
 * - Texto ubicado en la esquina inferior izquierda (flex-col justify-end items-start).
 * - Tipografía con más cuerpo (font-bold / font-semibold) y tamaño óptimo (text-[20px] leading-[1.25]).
 * - Padding amplio y estructurado para que entre toda la frase cómodamente.
 */
export const PitchCard: React.FC<PitchCardProps> = ({
  message,
  backgroundColor,
  inkColor
}) => {
  return (
    <div
      className="relative flex h-full w-full flex-col justify-end items-start p-6 rounded-[24px] shadow-2xl select-none overflow-hidden border border-white/10"
      style={{
        backgroundColor,
        color: inkColor
      }}
    >
      {/* Sutil brillo de borde interior superior para dar volumen físico */}
      <div
        className="pointer-events-none absolute inset-0 rounded-[24px]"
        style={{
          boxShadow: 'inset 0 1px 1px 0 rgba(255, 255, 255, 0.2)'
        }}
      />

      <p
        className="relative z-10 text-[20px] font-bold leading-[1.25] tracking-[-0.025em] text-left font-sans antialiased"
        style={{ color: inkColor }}
      >
        {message}
      </p>
    </div>
  );
};

export default PitchCard;
