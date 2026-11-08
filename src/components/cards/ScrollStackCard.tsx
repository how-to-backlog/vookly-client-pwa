'use client';

import { usePageTransition } from '@/components/transition/TransitionProvider';
import { resolveCategoryIcon, type CategoryIconName } from '@/components/icons/CategoryIcon';
import { CategoryCardSurface } from './CategoryCardSurface';
import React from 'react';

export interface ScrollStackCardProps {
  /** Identificador de la tarjeta */
  id?: string;
  /** URL destino al hacer click/tap */
  href?: string;
  /** Nombre del comercio */
  localName: string;
  /** Icono de categoría */
  categoryIcon?: CategoryIconName;
  /** Color de fondo opcional para diferenciar tarjetas del mismo nicho. */
  backgroundColor?: string;
  /** Color de trazo opcional para el icono. */
  inkColor?: string;
  /** Identificador opcional del patrón Hero Patterns */
  patternId?: string;
  /** Sellos acumulados del cliente en este comercio */
  stamps?: number;
  /** Sellos totales del roadmap de este comercio */
  totalStamps?: number;
  /** Nombre del próximo premio pendiente */
  nextRewardTitle?: string;
  /** Si tiene premio listo para canjear en mostrador */
  hasReadyReward?: boolean;
  /** Cuando es true la tarjeta se muestra como no disponible y no navega */
  unavailable?: boolean;
  className?: string;
  children?: React.ReactNode;
  /** Contenido del pie de la tarjeta */
  footer?: React.ReactNode;
}

/**
 * ScrollStackCard: Tarjeta atómica para el ScrollStack.
 * Mantiene la navegación con circular reveal nativo de Vookly.
 */
export const ScrollStackCard: React.FC<ScrollStackCardProps> = ({
  id,
  href,
  localName,
  categoryIcon,
  backgroundColor,
  inkColor,
  patternId,
  stamps,
  totalStamps,
  nextRewardTitle,
  hasReadyReward = false,
  unavailable = false,
  className = '',
  children,
  footer
}) => {
  const { triggerTransition } = usePageTransition();

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
          cardId={id}
          localName={localName}
          stamps={stamps}
          totalStamps={totalStamps}
          nextRewardTitle={nextRewardTitle}
          hasReadyReward={hasReadyReward}
          backgroundColor={backgroundColor}
          inkColor={inkColor}
          patternId={patternId}
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
