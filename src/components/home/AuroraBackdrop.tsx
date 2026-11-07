'use client';

import React from 'react';

import Aurora, { type AuroraProps } from '@/components/registry/Aurora';

/**
 * AURORA_PRESET_ARCTIC: preset "Arctic" exportado desde BG Studio.
 *
 * Es el fondo vivo de la pantalla principal: una cortina de luz anclada arriba
 * que se difumina hacia un blanco luminoso en el resto de la pantalla.
 *
 * `lightMode` hace que el shader componga la tint sobre un fondo transparente
 * en lugar de sumarla sobre negro. Es lo que permite que la superficie se lea
 * clara en vez de oscura: la aurora tiñe la luz, no la apaga.
 *
 * En modo claro el shader limita la luminosidad de los stops a 0.7, así que un
 * stop casi blanco se aplana igual que un azul saturado.
 *
 * El `opacity` es el control que decide si la aurora se VE. La rama clara del
 * shader compone `alpha = cover * 0.7` sobre `cover = cobertura * uOpacity`,
 * con una curva `smootherstep(0, 0.25, cover)` que aplasta los valores bajos:
 * con `opacity` por debajo de ~0.3 el alpha final cae por debajo del 10% y la
 * cortina desaparece sobre el wrapper blanco. 0.62 deja el alpha cerca de 0.43:
 * banda visible, sin tapar el texto que vive arriba.
 */
export const AURORA_PRESET_ARCTIC: AuroraProps = {
  colorStops: ['#8fe3ff', '#e8f6ff', '#6f9bff'],
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
 * AuroraBackdrop: capa de fondo de la pantalla principal.
 *
 * Vive detrás del contenido, no dentro de él: el shell queda transparente y
 * deja que la aurora ocupe toda la superficie. El wrapper blanco es el piso
 * claro sobre el que la cortina se difumina.
 */
export const AuroraBackdrop: React.FC = () => (
  <div className="absolute inset-0 z-0 overflow-hidden bg-white" aria-hidden="true">
    <Aurora {...AURORA_PRESET_ARCTIC} className="h-full w-full" />
  </div>
);

export default AuroraBackdrop;
