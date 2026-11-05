'use client';

import React, { useEffect, useRef, useState } from 'react';

export interface BottomSheetNodeDetailProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  ariaLabel?: string;
  onInfoClick?: () => void;
  onResetTicketClick?: () => void;
  className?: string;
}

/**
 * BottomSheetNodeDetail: Lámina inferior deslizable nativa ultraliviana a 60 FPS.
 *
 * Características de ingeniería:
 * 1. Cero librerías externas: CSS puro con transitions aceleradas por GPU.
 * 2. Bloqueo de scroll en el body mientras está montado.
 * 3. Gesto táctil nativo de arrastre hacia abajo para descartar (Drag to dismiss con umbral de 80px).
 * 4. Cabecera Agnóstica Minimalista: drag handle central, botón de info (si aplica) y botón X a la derecha.
 * 5. Semántica ARIA completa con role="dialog" y aria-modal="true".
 */
export function BottomSheetNodeDetail({
  isOpen,
  onClose,
  children,
  ariaLabel = 'Detalle del nodo',
  onInfoClick,
  onResetTicketClick,
  className = ''
}: BottomSheetNodeDetailProps) {
  // Derivamos renderizado y visibilidad sin cascading renders en useEffect
  const [isVisible, setIsVisible] = useState(false);
  const [dragOffsetY, setDragOffsetY] = useState(0);

  const sheetRef = useRef<HTMLDivElement>(null);
  const touchStartY = useRef<number | null>(null);
  const currentDragY = useRef<number>(0);

  // Animación de entrada suave sincronizada con el frame del navegador
  useEffect(() => {
    let frameId: number;
    let timerId: NodeJS.Timeout;

    if (isOpen) {
      // Entrada: siguiente tick para activar la transición CSS
      frameId = requestAnimationFrame(() => {
        setIsVisible(true);
      });
    } else {
      // Salida
      timerId = setTimeout(() => {
        setIsVisible(false);
        setDragOffsetY(0);
      }, 0);
    }

    return () => {
      cancelAnimationFrame(frameId);
      clearTimeout(timerId);
    };
  }, [isOpen]);

  // Bloqueo de scroll en el fondo mientras esté abierto
  useEffect(() => {
    if (!isOpen) return;

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      document.body.style.overflow = originalOverflow;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  // Manejo de gesto táctil de arrastre (Drag to dismiss)
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartY.current = e.touches[0].clientY;
    currentDragY.current = 0;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (touchStartY.current === null) return;
    const deltaY = e.touches[0].clientY - touchStartY.current;

    // Solo permitir arrastrar hacia abajo (valores positivos)
    if (deltaY > 0) {
      currentDragY.current = deltaY;
      setDragOffsetY(deltaY);
    }
  };

  const handleTouchEnd = () => {
    touchStartY.current = null;
    // Si se arrastró más de 80px hacia abajo, se cierra la lámina
    if (currentDragY.current > 80) {
      onClose();
    } else {
      // Rebotar al origen suavemente
      setDragOffsetY(0);
    }
    currentDragY.current = 0;
  };

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  if (!isOpen && !isVisible) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={ariaLabel}
      onClick={handleBackdropClick}
      className={`fixed inset-0 z-50 flex flex-col justify-end transition-colors duration-300 ease-out select-none ${
        isOpen && isVisible ? 'bg-black/40 backdrop-blur-xs' : 'bg-transparent pointer-events-none'
      }`}
    >
      {/* Contenedor flotante de la lámina */}
      <div
        ref={sheetRef}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        style={{
          transform: isOpen && isVisible
            ? `translateY(${dragOffsetY}px)`
            : 'translateY(100%)',
          transition: dragOffsetY > 0 ? 'none' : 'transform 300ms cubic-bezier(0.16, 1, 0.3, 1)'
        }}
        className={`w-full max-w-md mx-auto bg-white rounded-t-[28px] border-t border-neutral-100 shadow-[0_-8px_30px_rgba(0,0,0,0.12)] flex flex-col max-h-[85vh] overflow-hidden ${className}`}
      >
        {/* Barra Tiradora Superior (Drag Handle) */}
        <div className="w-full pt-2.5 pb-0 flex flex-col items-center justify-center cursor-grab active:cursor-grabbing flex-shrink-0">
          <div className="w-9 h-1 rounded-full bg-neutral-300" />
        </div>

        {/* Cabecera Agnóstica Minimalista: botón de Reset (demo), botón de Info (si aplica) y botón X a la derecha */}
        <div className="px-4 pb-0 pt-0 flex items-center justify-end gap-1.5 flex-shrink-0 min-h-[30px]">
          {onResetTicketClick && (
            <button
              type="button"
              onClick={onResetTicketClick}
              aria-label="Probar animación de nuevo"
              title="Probar animación de nuevo (Demo)"
              className="w-7 h-7 rounded-full bg-neutral-100 hover:bg-neutral-200 active:scale-95 transition-all flex items-center justify-center text-neutral-600 hover:text-black flex-shrink-0"
            >
              <svg
                className="w-3.5 h-3.5"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.2"
                strokeLinecap="round"
                strokeLinejoin="round"
                viewBox="0 0 24 24"
              >
                <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" />
                <path d="M3 3v5h5" />
              </svg>
            </button>
          )}

          {onInfoClick && (
            <button
              type="button"
              onClick={onInfoClick}
              aria-label="Más información"
              className="w-7 h-7 rounded-full bg-neutral-100 hover:bg-neutral-200 active:scale-95 transition-all flex items-center justify-center text-neutral-600 hover:text-black flex-shrink-0"
            >
              <svg
                className="w-3.5 h-3.5"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.2"
                strokeLinecap="round"
                strokeLinejoin="round"
                viewBox="0 0 24 24"
              >
                <circle cx="12" cy="12" r="10" />
                <path d="M12 16v-4" />
                <path d="M12 8h.01" />
              </svg>
            </button>
          )}

          <button
            type="button"
            onClick={onClose}
            aria-label="Cerrar detalle"
            className="w-7 h-7 rounded-full bg-neutral-100 hover:bg-neutral-200 active:scale-95 transition-all flex items-center justify-center text-neutral-600 hover:text-black flex-shrink-0"
          >
            <svg
              className="w-3.5 h-3.5"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.4"
              strokeLinecap="round"
              strokeLinejoin="round"
              viewBox="0 0 24 24"
            >
              <path d="M18 6 6 18M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Contenido scrolleable interno compacto */}
        <div className="px-5 pb-6 pt-0 overflow-y-auto no-scrollbar flex-1">
          {children}
        </div>
      </div>
    </div>
  );
}

export default BottomSheetNodeDetail;
