'use client';

import { usePageTransition } from '@/components/transition/TransitionProvider';
import { resolveCategoryIcon, type CategoryIconName } from '@/components/icons/CategoryIcon';
import { CategoryCardSurface } from './CategoryCardSurface';

import React from 'react';


// ! FIDELIZAR-4- BUGFIX
// ? Eliminado [ShowProgress, localName, stamps]; Revisar y considerar refactor de la Card.



export interface ScrollStackCardProps {
  /** URL destino al hacer click/tap */
  href?: string;
  /** Nombre del comercio, mostrado en la píldora superior */
  localName: string;
  /**
   * Icono de categoría. Si se omite se resuelve desde `href` o `localName`.
   */
  categoryIcon?: CategoryIconName;
  /** Color de fondo opcional para diferenciar tarjetas del mismo nicho. */
  backgroundColor?: string;
  /** Color de trazo opcional para el icono. */
  inkColor?: string;
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
  /**
   * Contenido del pie de la tarjeta. Reservado para el nombre del comercio y
   * el contador de sellos.
   */
  footer?: React.ReactNode;
}

/**
 * ScrollStackCard: Tarjeta atómica para el ScrollStack.
 * Mantiene la navegación con circular reveal nativo de Vookly.
 *
 */
export const ScrollStackCard: React.FC<ScrollStackCardProps> = ({
  href,
  localName,
  categoryIcon,
  backgroundColor,
  inkColor,
  unavailable = false,
  className = '',
  children,
  footer
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

  // El icono de categoría se resuelve por el slug del comercio (`/local/cafeteria`)
  // y, si no hay ruta, por el nombre del comercio sin acentos.
  const iconName = categoryIcon ?? resolveCategoryIcon(href ?? localName);

  return (
    <article
      onClick={navigable ? handleClick : undefined}
      onKeyDown={navigable ? handleKeyDown : undefined}
      role={navigable ? 'button' : undefined}
      tabIndex={navigable ? 0 : undefined}
      aria-label={navigable ? `${localName}. Ver sellos y premios` : `${localName}. Próximamente`}
      className={`relative h-full w-full overflow-hidden select-none ${navigable ? 'cursor-pointer' : ''} ${className}`}
    >
      {iconName && (
        <CategoryCardSurface
          name={iconName}
          backgroundColor={backgroundColor}
          inkColor={inkColor}
          muted={unavailable}
          footer={footer}
        />
      )}

      {children && (
        <div className="relative z-10 w-full h-full">{children}</div>
      )}
    </article>
  );
};

export default ScrollStackCard;
