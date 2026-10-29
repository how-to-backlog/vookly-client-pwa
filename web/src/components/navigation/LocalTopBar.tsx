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
    <header className="sticky top-0 z-50 w-full bg-white/60 backdrop-blur-md">
      <div className="w-full max-w-md mx-auto px-4 h-14 flex items-center justify-between">
        {/* Flecha Volver de Color Negro */}
        <button
          type="button"
          onClick={handleBack}
          aria-label="Volver a la billetera"
          className="p-2 -ml-2 text-black hover:text-neutral-700 active:scale-95 transition-all"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.2"
            strokeLinecap="round"
            strokeLinejoin="round"
            viewBox="0 0 24 24"
          >
            <path d="M19 12H5M12 19l-7-7 7-7" />
          </svg>
        </button>

        {/* Centro limpio sin título */}
        <div className="flex-1" />

        {/* Espaciador de simetría */}
        <div className="w-6" />
      </div>
    </header>
  );
};

export default LocalTopBar;
