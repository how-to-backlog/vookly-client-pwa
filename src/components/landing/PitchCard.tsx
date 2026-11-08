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
 * Mejoras aplicadas:
 * - Tipografía con tamaño mayor (`text-[21px] sm:text-[22px]`) y peso bold contundente.
 * - Anclado en la esquina inferior izquierda.
 * - Leading ceñido (`leading-[1.2]`) y padding generoso (`p-6.5`) para que la frase
 *   llene armónicamente la tarjeta con presencia tipográfica fuerte.
 */
export const PitchCard: React.FC<PitchCardProps> = ({
  message,
  backgroundColor,
  inkColor
}) => {
  return (
    <div
      className="relative flex h-full w-full flex-col justify-end items-start p-6.5 rounded-[26px] shadow-2xl select-none overflow-hidden border border-white/10"
      style={{
        backgroundColor,
        color: inkColor
      }}
    >
      {/* Sutil halo interior superior para volumen físico */}
      <div
        className="pointer-events-none absolute inset-0 rounded-[26px]"
        style={{
          boxShadow: 'inset 0 1px 1px 0 rgba(255, 255, 255, 0.25)'
        }}
      />

      <p
        className="relative z-10 text-[21.5px] sm:text-[22.5px] font-bold leading-[1.18] tracking-[-0.03em] text-left font-sans antialiased"
        style={{ color: inkColor }}
      >
        {message}
      </p>
    </div>
  );
};

export default PitchCard;
