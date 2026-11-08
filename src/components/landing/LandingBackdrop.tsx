'use client';

import React from 'react';

import Aurora, { type AuroraProps } from '@/components/registry/Aurora';

/**
 * AURORA_PRESET_LANDING:
 * 1. Colores originales azules de Ramiro: del celeste vivo (#7cc4ff) al azul profundo (#2f74e8, #123a9e, #050b26).
 *    Cero verde, cero turquesa chillón.
 * 2. Movimiento vivo y parejo en toda la pantalla:
 *    - `amplitude: 0.85` y `speed: 0.75` (el mismo ritmo fluido y envolvente de la pantalla principal).
 *    - `height: 1.25`: la cortina cubre holgadamente toda la altura y ancho sin dejar esa "barra oscura" estática a la derecha.
 *    - `scale: 1.4` y `blend: 0.7`: expande las ondas para que se distribuyan y respiren por ambos lados de la pantalla.
 *    - `layers: 1`: movimiento nítido, sin superposiciones densas que tapen la luz.
 */
export const AURORA_PRESET_LANDING: AuroraProps = {
  colorStops: ['#7cc4ff', '#3b82f6', '#1d4ed8', '#172554'],
  direction: 'top',
  height: 1.25,
  amplitude: 0.85,
  blend: 0.7,
  glow: 0.85,
  scale: 1.4,
  speed: 0.75,
  brightness: 1.05,
  layers: 1,
  opacity: 0.95,
  mouseInteraction: true,
  intro: true,
  lightMode: false
};

/**
 * Fondo de la landing: aurora azul en movimiento continuo con ondas perceptibles y uniformes.
 */
export function LandingBackdrop() {
  return (
    <div className="absolute inset-0 z-0 overflow-hidden bg-[#070e2c]" aria-hidden="true">
      <Aurora {...AURORA_PRESET_LANDING} className="h-full w-full" />
    </div>
  );
}

export default LandingBackdrop;
