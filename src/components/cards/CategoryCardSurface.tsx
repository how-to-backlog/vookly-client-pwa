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
 * La banda de color va a sangre (el ScrollStack la_pega a los bordes de la
 * pantalla) y su contenido respira desde el margen de página: el ícono
 * arranca en el mismo eje vertical que el saludo y el encabezado de sección,
 * de modo que todo el contenido de la home comparte una sola columna de
 * alineación.
 *
 * La arquitectura deja preparado el espacio para sumar nombre del comercio y
 * contador de sellos (ver `footer`): hoy la tarjeta es sólo el icono.
 */

export interface CategoryCardSurfaceProps {
  /** Categoría cuyo icono y paleta se usan. */
  name: CategoryIconName;
  /** Lado del icono en píxeles. */
  iconSize?: number;
  /** Color de fondo opcional para diferenciar tarjetas del mismo nicho. */
  backgroundColor?: string;
  /** Color de trazo opcional para el icono. */
  inkColor?: string;
  /** Cuando es true la superficie se ve atenuada (comercio no disponible). */
  muted?: boolean;
  className?: string;
  /** Contenido opcional para el footer, reservado para nombre y sellos. */
  footer?: React.ReactNode;
}

export const CategoryCardSurface: React.FC<CategoryCardSurfaceProps> = ({
  name,
  iconSize = 64,
  backgroundColor,
  inkColor,
  muted = false,
  className = '',
  footer
}) => {
  const palette = CATEGORY_PALETTE[name];
  if (!palette) return null;

  const bg = backgroundColor || palette.background;
  const ink = inkColor || palette.ink;

  return (
    <div
      className={`relative h-full w-full overflow-hidden ${className}`.trim()}
      style={{
        backgroundColor: bg,
        opacity: 1
      }}
    >
      {/*
        Icono del rubro: ubicado en la esquina superior derecha.
        Deja todo el cuerpo y pie de la tarjeta despejados para futuros elementos
        (nombre del comercio, sellos, chips, etc.).
      */}
      <div className="absolute top-5 right-5 pointer-events-none">
        <CategoryIcon name={name} size={iconSize} stroke={ink} strokeWidth={1.4} />
      </div>

      {footer && <div className="relative z-10 h-full w-full">{footer}</div>}
    </div>
  );
};

export default CategoryCardSurface;
