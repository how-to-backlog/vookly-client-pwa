'use client';

import React from 'react';

import Aurora, { type AuroraProps } from '@/components/registry/Aurora';

/**
 * AURORA_PRESET_ARCTIC:
 * Preset original claro de la billetera pero simplificado a exactamente 2 colores:
 * Celeste luminoso ('#8fe3ff') y Azul suave ('#6f9bff').
 */
export const AURORA_PRESET_ARCTIC: AuroraProps = {
  colorStops: ['#8fe3ff', '#6f9bff'],
  direction: 'top',
  height: 0.72,
  amplitude: 0.7,
  blend: 0.5,
  glow: 0.6,
  scale: 1,
  speed: 0.7,
  brightness: 1,
  layers: 1,
  opacity: 0.62,
  mouseInteraction: true,
  intro: true,
  lightMode: true
};

/**
 * AuroraBackdrop: capa de fondo de la pantalla principal (Billetera).
 * Fondo blanco luminoso original donde la cortina clara de 2 tonos se difumina.
 */
export const AuroraBackdrop: React.FC = () => (
  <div className="absolute inset-0 z-0 overflow-hidden bg-white" aria-hidden="true">
    <Aurora {...AURORA_PRESET_ARCTIC} className="h-full w-full" />
  </div>
);

export default AuroraBackdrop;
