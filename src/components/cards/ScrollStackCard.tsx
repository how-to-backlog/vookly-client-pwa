'use client';

import { usePageTransition } from '@/components/transition/TransitionProvider';
import React from 'react';


// ! FIDELIZAR-4- BUGFIX
// ? Eliminado [ShowProgress, localName, stamps]; Revisar y considerar refactor de la Card.

export interface ScrollStackCardProps {
  /** Ruta a la imagen de fondo de la tarjeta */
  backgroundImage?: string;
  /** URL destino al hacer click/tap */
  href?: string;
  /** Nombre del comercio, mostrado en la píldora superior */
  localName: string;
  /** Sellos acumulados del cliente en este comercio -- DEPRECATED */
  stamps?: number;
  /** Sellos totales del roadmap de este comercio -- DEPRECATED */
  totalStamps?: number;
  /** Nombre del próximo premio pendiente  -- DEPRECATED */
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
 */
export const ScrollStackCard: React.FC<ScrollStackCardProps> = ({
  backgroundImage,
  href,
  localName,
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

      {children && (
        <div className="relative z-10 w-full h-full">{children}</div>
      )}
    </article>
  );
};

export default ScrollStackCard;
