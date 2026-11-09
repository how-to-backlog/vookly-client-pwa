'use client';

import React from 'react';
import { useRouter } from 'next/navigation';

export interface LocalTopBarProps {
  onBack?: () => void;
  onOpenSimulator?: () => void;
}

/**
 * LocalTopBar: Barra superior minimalista para la vista de detalle del local.
 * - Esquina izquierda: flecha negra dentro de círculo blanco para volver a la billetera.
 * - Esquina derecha: botón discreto de sintonizador/sliders para calibrar la demo en vivo.
 */
export const LocalTopBar: React.FC<LocalTopBarProps> = ({ onBack, onOpenSimulator }) => {
  const router = useRouter();

  const handleBack = () => {
    if (onBack) {
      onBack();
    } else {
      router.push('/hub');
    }
  };

  return (
    <div className="absolute top-4 inset-x-4 z-50 pointer-events-none flex items-center justify-between">
      {/* Botón flotante izquierdo: flecha volver */}
      <button
        type="button"
        onClick={handleBack}
        aria-label="Volver a la billetera"
        data-tour="local-back-btn"
        className="pointer-events-auto w-10 h-10 rounded-full bg-white shadow-lg flex items-center justify-center text-black hover:bg-neutral-100 active:scale-90 transition-all border border-black/5"
      >
        <svg
          className="w-5 h-5 -ml-0.5"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.4"
          strokeLinecap="round"
          strokeLinejoin="round"
          viewBox="0 0 24 24"
        >
          <path d="M19 12H5M12 19l-7-7 7-7" />
        </svg>
      </button>

      {/* Botón flotante derecho: sintonizador / ajustes de demo */}
      {onOpenSimulator && (
        <button
          type="button"
          onClick={onOpenSimulator}
          aria-label="Abrir Editor de Comercio"
          data-tour="simulator-trigger-btn"
          className="pointer-events-auto w-10 h-10 rounded-full bg-white shadow-lg flex items-center justify-center text-neutral-800 hover:text-black hover:bg-neutral-100 active:scale-90 transition-all border border-black/5"
        >
          {/* Ícono Sliders / Sintonizador minimalista */}
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.1"
            strokeLinecap="round"
            strokeLinejoin="round"
            viewBox="0 0 24 24"
          >
            <line x1="4" y1="21" x2="4" y2="14" />
            <line x1="4" y1="10" x2="4" y2="3" />
            <line x1="12" y1="21" x2="12" y2="12" />
            <line x1="12" y1="8" x2="12" y2="3" />
            <line x1="20" y1="21" x2="20" y2="16" />
            <line x1="20" y1="12" x2="20" y2="3" />
            <line x1="1" y1="14" x2="7" y2="14" />
            <line x1="9" y1="8" x2="15" y2="8" />
            <line x1="17" y1="16" x2="23" y2="16" />
          </svg>
        </button>
      )}
    </div>
  );
};

export default LocalTopBar;
