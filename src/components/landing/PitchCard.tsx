'use client';

import React from 'react';

export interface PitchCardProps {
  message: string;
  backgroundColor: string;
  inkColor: string;
}

/**
 * PitchCard: Tarjeta atómica cuadrada y 100% sólida para el stack de bienvenida.
 *
 * Características:
 * - Color sólido pastel y tinta tipográfica traídos del sistema de tarjetas del hub.
 * - Formato 1:1 cuadrado compacto.
 * - Tipografía fina, limpia y con alto contraste relativo.
 * - Borde y sombra suave para recorte definido sin desbordes.
 */
export const PitchCard: React.FC<PitchCardProps> = ({
  message,
  backgroundColor,
  inkColor
}) => {
  return (
    <div
      className="relative flex h-full w-full flex-col justify-center items-center p-6 rounded-[24px] shadow-lg select-none overflow-hidden border border-black/5"
      style={{
        backgroundColor,
        color: inkColor
      }}
    >
      {/* Sutil resplandor de volumen superior */}
      <div
        className="pointer-events-none absolute inset-0 rounded-[24px]"
        style={{
          boxShadow: 'inset 0 1px 1px 0 rgba(255, 255, 255, 0.45)'
        }}
      />

      <p
        className="relative z-10 text-[18px] font-medium leading-[1.32] tracking-[-0.015em] text-center font-sans antialiased"
        style={{ color: inkColor }}
      >
        {message}
      </p>
    </div>
  );
};

export default PitchCard;
