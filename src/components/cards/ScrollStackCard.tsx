'use client';

import React from 'react';
import { Lock } from 'lucide-react';
import { usePageTransition } from '@/components/transition/TransitionProvider';

export interface ScrollStackCardProps {
  /** Ruta a la imagen de fondo de la tarjeta */
  backgroundImage?: string;
  /** URL destino al hacer click/tap */
  href?: string;
  /** Nombre del comercio, mostrado en la píldora superior */
  localName: string;
  /** Sellos acumulados del cliente en este comercio */
  stamps?: number;
  /** Sellos totales del roadmap de este comercio */
  totalStamps?: number;
  /** Nombre del próximo premio pendiente */
  nextRewardTitle?: string;
  /** Cuando es true la tarjeta se muestra como no disponible y no navega */
  unavailable?: boolean;
  className?: string;
  children?: React.ReactNode;
}

/**
 * ScrollStackCard: Tarjeta atómica para el ScrollStack.
 * Mantiene la navegación con circular reveal nativo de Vookly.
 *
 * Cuando recibe `stamps` y `totalStamps` renderiza el bloque de progreso
 * (barra + contadores + próximo premio) en la parte inferior.
 */
export const ScrollStackCard: React.FC<ScrollStackCardProps> = ({
  backgroundImage,
  href,
  localName,
  stamps,
  totalStamps,
  nextRewardTitle,
  unavailable = false,
  className = '',
  children
}) => {
  const { triggerTransition } = usePageTransition();

  // Una tarjeta sin href o marcada como no disponible no navega.
  const navigable = Boolean(href) && !unavailable;

  const handleClick = (e: React.MouseEvent) => {
    if (navigable && href) {
      triggerTransition(e, href);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!navigable || !href) return;
    if (e.key !== 'Enter' && e.key !== ' ') return;
    e.preventDefault();
    triggerTransition(e, href);
  };

  const showProgress = typeof stamps === 'number' && typeof totalStamps === 'number' && totalStamps > 0;
  const progressRatio = showProgress ? Math.min(1, Math.max(0, stamps! / totalStamps!)) : 0;

  return (
    <article
      onClick={navigable ? handleClick : undefined}
      onKeyDown={navigable ? handleKeyDown : undefined}
      role={navigable ? 'button' : undefined}
      tabIndex={navigable ? 0 : undefined}
      aria-label={navigable ? `${localName}. Ver sellos y premios` : `${localName}. Próximamente`}
      className={`relative h-full w-full overflow-hidden select-none ${navigable ? 'cursor-pointer' : ''} ${className}`}
    >
      {backgroundImage && (
        <div
          className="absolute inset-0 w-full h-full bg-cover bg-center bg-no-repeat pointer-events-none"
          style={{ backgroundImage: `url(${backgroundImage})` }}
        />
      )}

      {/* Scrim inferior para que el bloque de progreso tenga contraste sobre cualquier foto */}
      {showProgress && (
        <div className="absolute inset-x-0 bottom-0 h-[70%] bg-gradient-to-t from-black/90 via-black/65 to-transparent pointer-events-none" />
      )}

      {children && (
        <div className="relative z-10 w-full h-full">{children}</div>
      )}

      {/* Zona superior: nombre del comercio + badge de no disponible */}
      <div className="absolute inset-x-0 top-0 z-20 flex items-start justify-between gap-2 p-5">
        <span className="rounded-full bg-white/90 px-3 py-1 text-[12px] font-black tracking-tight text-[#061b31] backdrop-blur-sm">
          {localName}
        </span>

        {unavailable && (
          <span className="inline-flex items-center gap-1 rounded-full bg-neutral-950/90 px-2.5 py-1 text-[10.5px] font-bold tracking-tight text-white backdrop-blur-sm shadow-lg">
            <Lock size={11} strokeWidth={2.5} aria-hidden="true" />
            Próximamente
          </span>
        )}
      </div>

      {/* Zona inferior: progreso de sellos + próximo premio */}
      {showProgress && (
        <div className="absolute inset-x-0 bottom-0 z-20 p-4">
          <div className="rounded-2xl bg-neutral-950/80 px-3.5 py-2.5 backdrop-blur-md shadow-xl border border-white/10">
            <div className="flex items-baseline justify-between gap-2 mb-1.5">
              <span className="text-[13px] font-black tracking-tight text-white whitespace-nowrap">
                {stamps}
                <span className="text-white/55 font-semibold"> / {totalStamps}</span>
                <span className="ml-1.5 text-[11px] font-semibold text-white/70">sellos</span>
              </span>

              {nextRewardTitle && (
                <span className="min-w-0 truncate text-[11px] font-semibold text-white/75">
                  Próximo: {nextRewardTitle}
                </span>
              )}
            </div>

            <div
              className="h-1.5 w-full rounded-full bg-white/25 overflow-hidden"
              role="progressbar"
              aria-valuemin={0}
              aria-valuemax={totalStamps}
              aria-valuenow={stamps}
              aria-label={`Progreso de sellos en ${localName}`}
            >
              <div
                className="h-full rounded-full bg-white transition-[width] duration-500 ease-out"
                style={{ width: `${Math.round(progressRatio * 100)}%` }}
              />
            </div>
          </div>
        </div>
      )}
    </article>
  );
};

export default ScrollStackCard;
