'use client';

import React from 'react';

export interface PitchCardProps {
  message: string;
}

/**
 * PitchCard: Tarjeta atómica cuadrada y 100% sólida para el stack de bienvenida.
 *
 * Características de diseño:
 * - Proporción cuadrada o aspect ratio 1:1.
 * - Fondo sólido oscuro mate (sin transparencias para evitar ruido sobre la aurora).
 * - Tipografía sans limpia, elegante y de palo fino / medio legible.
 * - Sin contadores numéricos en la esquina.
 */
export const PitchCard: React.FC<PitchCardProps> = ({ message }) => {
  return (
    <div className="relative flex h-full w-full flex-col justify-center items-center p-7 rounded-[28px] bg-neutral-900 border border-neutral-800 shadow-xl select-none overflow-hidden">
      {/* Sutil halo interior decorativo para volumen sin transparencia */}
      <div
        className="pointer-events-none absolute inset-0 rounded-[28px]"
        style={{
          boxShadow: 'inset 0 1px 1px 0 rgba(255, 255, 255, 0.12)'
        }}
      />

      <p className="relative z-10 text-[20px] font-normal leading-[1.35] tracking-[-0.02em] text-neutral-100 text-center font-sans antialiased">
        {message}
      </p>
    </div>
  );
};

export default PitchCard;
