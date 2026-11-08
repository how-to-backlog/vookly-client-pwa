'use client';

import React from 'react';

import Aurora, { type AuroraProps } from '@/components/registry/Aurora';

/**
 * AURORA_PRESET_LANDING:
 * 
 * Configuración idéntica a la fórmula matemática de la pantalla principal (Home):
 * 1. `lightMode: true`: la clave para que la aurora se componga como luz líquida
 *    flotando y ondulando, sin franjas rígidas verticales.
 * 2. Colores: tonos azules claros y celestes orgánicos ('#8fe3ff', '#dbeafe', '#60a5fa').
 * 3. Movimiento orgánico: `amplitude: 0.85`, `blend: 0.65`, `speed: 0.75` y `scale: 1.2`.
 * 4. El wrapper oscuro `#050b26` actúa como cielo nocturno donde las nubes de aurora
 *    bailan libremente sin ninguna barra ni corte vertical en los bordes.
 */
export const AURORA_PRESET_LANDING: AuroraProps = {
  colorStops: ['#00014A', '#2800F2', '#0E005E'],
  direction: 'top',
  height: 0.85,
  amplitude: 0.45,
  blend: 0.90,
  glow: 0.75,
  scale: 0.4,
  speed: 1.15,
  brightness: 1.1,
  layers: 1,
  opacity: 0.95,
  mouseInteraction: true,
  intro: true,
  lightMode: true
};

export function LandingBackdrop() {
  return (
    <div className="absolute inset-0 z-0 overflow-hidden bg-[#070d24]" aria-hidden="true">
      <Aurora {...AURORA_PRESET_LANDING} className="h-full w-full" />
    </div>
  );
}

export default LandingBackdrop;
