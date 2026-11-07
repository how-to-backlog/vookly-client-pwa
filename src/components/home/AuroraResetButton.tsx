'use client';

import React from 'react';
import { RefreshCw } from 'lucide-react';

export interface AuroraResetButtonProps {
  /** Callback invocado al pedir una nueva reproducción del fondo. */
  onReset: () => void;
}

/**
 * AuroraResetButton: control para volver a reproducir el fondo animado.
 *
 * Reinicia la aurora desde el introduction, de modo que sirve tanto para
 * repetir la entrada como para cambiar la semilla visual del fondo.
 */
export const AuroraResetButton: React.FC<AuroraResetButtonProps> = ({ onReset }) => (
  <button
    type="button"
    onClick={onReset}
    aria-label="Reiniciar el fondo animado"
    className="h-8 w-8 rounded-full bg-black/30 text-white/90 border border-white/20 backdrop-blur-sm active:scale-95 transition-transform duration-150 flex items-center justify-center"
  >
    <RefreshCw className="w-4 h-4" strokeWidth={2.2} aria-hidden="true" />
  </button>
);

export default AuroraResetButton;
