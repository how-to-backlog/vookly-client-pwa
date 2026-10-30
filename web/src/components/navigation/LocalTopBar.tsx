'use client';

import React from 'react';
import { useRouter } from 'next/navigation';

export interface LocalTopBarProps {
  onBack?: () => void;
}

/**
 * LocalTopBar: Barra superior minimalista para la vista de detalle del local.
 * Fondo transparente sobre el negro de la pantalla, flecha blanca nítida.
 */
export const LocalTopBar: React.FC<LocalTopBarProps> = ({ onBack }) => {
  const router = useRouter();

  const handleBack = () => {
    if (onBack) {
      onBack();
    } else {
      router.push('/');
    }
  };

  return (
    <div className="absolute top-4 left-4 z-50 pointer-events-auto">
      {/* Botón flotante aislado: flecha negra dentro de círculo blanco */}
      <button
        type="button"
        onClick={handleBack}
        aria-label="Volver a la billetera"
        className="w-10 h-10 rounded-full bg-white shadow-lg flex items-center justify-center text-black hover:bg-neutral-100 active:scale-90 transition-all border border-black/5"
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
    </div>
  );
};

export default LocalTopBar;
