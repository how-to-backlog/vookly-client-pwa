'use client';

import React from 'react';

import Aurora, { type AuroraProps } from '@/components/registry/Aurora';

/**
 * AURORA_PRESET_LANDING:
 * 
 * Para que la aurora fluya de forma totalmente aleatoria, orgánica y envolvente:
 * 1. `direction: 'top'`
 * 2. `height: 1.6`: la onda luminosa cubre toda la pantalla vertical y horizontalmente.
 * 3. `colorStops`: gama azul profunda pero viva (sin negro al final del gradiente horizontal u).
 * 4. `blend: 0.85` y `amplitude: 1.1`: mezcla fluida de ondas cruzadas que elimina cualquier franja estática.
 * 5. `speed: 0.85`: velocidad constante y visible.
 * 6. `layers: 2`: dos capas de ruido desincronizadas que generan "burbujas" y variaciones dinámicas de luz continua.
 */
export const AURORA_PRESET_LANDING: AuroraProps = {
  colorStops: ['#60a5fa', '#3b82f6', '#2563eb', '#1d4ed8', '#38bdf8'],
  direction: 'top',
  height: 1.6,
  amplitude: 1.1,
  blend: 0.85,
  glow: 0.9,
  scale: 1.0,
  speed: 0.85,
  brightness: 1.1,
  layers: 2,
  opacity: 0.85,
  mouseInteraction: true,
  intro: true,
  lightMode: false
};

/**
 * Fondo de la landing:
 * Contenedor azul noche oscuro `#0b132b` donde la aurora WebGL proyecta ondas y burbujas
 * distribuidas homogéneamente sin franjas muertas.
 */
export function LandingBackdrop() {
  return (
    <div className="absolute inset-0 z-0 overflow-hidden bg-[#0a1128]" aria-hidden="true">
      <Aurora {...AURORA_PRESET_LANDING} className="h-full w-full" />
    </div>
  );
}

export default LandingBackdrop;
