'use client';

import React from 'react';

import Aurora, { type AuroraProps } from '@/components/registry/Aurora';

/**
 * AURORA_PRESET_LANDING:
 * Cortina de luz vibrante con burbujas y ondas dinámicas de azules.
 * Aumentamos la velocidad (speed: 1.1), amplitud (0.95), blend (0.6) y layers: 2
 * para que tenga movimiento orgánico continuo y notorio en pantalla,
 * generando esas "burbujas" y contrastes vivos de distintos tonos de azul.
 */
export const AURORA_PRESET_LANDING: AuroraProps = {
  colorStops: ['#5eead4', '#38bdf8', '#2563eb', '#1e1b4b'],
  direction: 'top',
  height: 1.1,
  amplitude: 0.95,
  blend: 0.6,
  glow: 0.9,
  scale: 1.1,
  speed: 1.1,
  brightness: 1.1,
  layers: 2,
  opacity: 0.92,
  mouseInteraction: true,
  intro: true,
  lightMode: false
};

/**
 * Fondo de la landing: aurora azul en movimiento continuo con ondas perceptibles.
 */
export function LandingBackdrop() {
  return (
    <div className="absolute inset-0 z-0 overflow-hidden bg-[#0a0f2c]" aria-hidden="true">
      <Aurora {...AURORA_PRESET_LANDING} className="h-full w-full" />
    </div>
  );
}

export default LandingBackdrop;
