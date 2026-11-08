'use client';

import React from 'react';

import Aurora, { type AuroraProps } from '@/components/registry/Aurora';

/**
 * AURORA_PRESET_ARCTIC:
 * Ajustado para tener exactamente la misma presencia y cobertura profunda de color
 * que la pantalla de bienvenida.
 */
export const AURORA_PRESET_ARCTIC: AuroraProps = {
  colorStops: ['#00014A', '#2800F2', '#0E005E'],
  direction: 'top',
  height: 0.72,
  amplitude: 0.7,
  blend: 0.5,
  glow: 0.6,
  scale: 1,
  speed: 0.7,
  brightness: 1,
  layers: 1,
  opacity: 0.95,
  mouseInteraction: true,
  intro: true,
  lightMode: true
};

/**
 * AuroraBackdrop: capa de fondo de la pantalla de billetera.
 * Usamos el mismo fondo nocturno profundo '#070d24' en vez de blanco para que el color
 * se proyecte con la misma intensidad y tono que en la bienvenida.
 */
export const AuroraBackdrop: React.FC = () => (
  <div className="absolute inset-0 z-0 overflow-hidden bg-[#070d24]" aria-hidden="true">
    <Aurora {...AURORA_PRESET_ARCTIC} className="h-full w-full" />
  </div>
);

export default AuroraBackdrop;
