'use client';

import React from 'react';

import Aurora from '@/components/registry/Aurora';
import { AURORA_PRESET_ARCTIC } from '@/components/home/AuroraBackdrop';

/**
 * LandingBackdrop (Modo Prueba Clara):
 * Importa y reutiliza exactamente el mismo preset y variables de la pantalla de billetera
 * (AURORA_PRESET_ARCTIC con sus 2 colores #8fe3ff y #6f9bff, altura, velocidad, etc.)
 * sobre el mismo fondo blanco luminoso 'bg-white'.
 */
export function LandingBackdrop() {
  return (
    <div className="absolute inset-0 z-0 overflow-hidden bg-white" aria-hidden="true">
      <Aurora {...AURORA_PRESET_ARCTIC} className="h-full w-full" />
    </div>
  );
}

export default LandingBackdrop;
