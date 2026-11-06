'use client';

import React from 'react';
import { CategoryIcon, CATEGORY_PALETTE, type CategoryIconName } from '@/components/icons/CategoryIcon';

/**
 * CategoryCardSurface: la superficie de marca de una tarjeta de comercio.
 *
 * Reemplaza por completo a la fotografía JPG: en vez de una imagen de fondo,
 * la tarjeta es una superficie de color sólido pastel propia de la categoría,
 * con el icono de rubro como referencia principal, alineado al costado
 * izquierdo y dibujado directamente sobre el color (sin disco, sin bordes).
 *
 * La arquitectura deja preparado el espacio para sumar nombre del comercio y
 * contador de sellos (ver `footer`): hoy la tarjeta es sólo el icono.
 */

export interface CategoryCardSurfaceProps {
  /** Categoría cuyo icono y paleta se usan. */
  name: CategoryIconName;
  /** Lado del icono en píxeles. */
  iconSize?: number;
  /** Cuando es true la superficie se ve atenuada (comercio no disponible). */
  muted?: boolean;
  className?: string;
  /** Contenido opcional para el footer, reservado para nombre y sellos. */
  footer?: React.ReactNode;
}

export const CategoryCardSurface: React.FC<CategoryCardSurfaceProps> = ({
  name,
  iconSize = 64,
  muted = false,
  className = '',
  footer
}) => {
  const palette = CATEGORY_PALETTE[name];
  if (!palette) return null;

  return (
    <div
      className={`relative flex h-full w-full items-center gap-5 overflow-hidden px-7 ${className}`.trim()}
      style={{
        backgroundColor: palette.background,
        opacity: muted ? 0.80 : 1
      }}
    >
      {/*
        Icono del rubro: es la referencia principal de la tarjeta. Se dibuja
        directo sobre el color de la superficie, sin disco ni borde.
      */}
      <CategoryIcon name={name} size={iconSize} stroke={palette.ink} strokeWidth={1.4} />

      {footer && <div className="min-w-0 flex-1">{footer}</div>}
    </div>
  );
};

export default CategoryCardSurface;
