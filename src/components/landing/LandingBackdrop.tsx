'use client';

import React from 'react';

import Aurora, { type AuroraProps } from '@/components/registry/Aurora';

/**
 * AURORA_PRESET_LANDING: cortina de luz azul profunda para la landing de demo.
 *
 * A diferencia del preset "Arctic" del hub (claro, pensado para una superficie
 * blanca), este preset usa `lightMode: false` para que el shader devuelva el
 * color real de las paradas con su propia cobertura. La paleta va del celeste
 * de arriba hacia un azul casi negro al pie, siguiendo la imagen de referencia.
 */
export const AURORA_PRESET_LANDING: AuroraProps = {
  colorStops: ['#7cc4ff', '#2f74e8', '#123a9e', '#050b26'],
  direction: 'top',
  height: 1,
  amplitude: 0.65,
  blend: 0.55,
  glow: 0.85,
  scale: 1,
  speed: 0.45,
  brightness: 1,
  layers: 1,
  opacity: 0.95,
  mouseInteraction: true,
  intro: true,
  lightMode: false
};

/**
 * Fondo de la landing: aurora azul + respaldo sólido para que el color
 * profundo nunca quede con transparencia contra el body.
 */
export function LandingBackdrop() {
  return (
    <div className="absolute inset-0 z-0 overflow-hidden bg-[#050b26]" aria-hidden="true">
      <Aurora {...AURORA_PRESET_LANDING} className="h-full w-full" />
    </div>
  );
}

export default LandingBackdrop;
