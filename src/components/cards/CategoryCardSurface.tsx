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
      className={`relative flex h-full w-full items-center gap-5 overflow-hidden ${className}`.trim()}
      style={{
        backgroundColor: palette.background,
        opacity: muted ? 0.80 : 1
      }}
    >
      {/*
        Icono del rubro: es la referencia principal de la tarjeta.

        Se dibuja directo sobre la banda de color, sin disco ni borde: el
        ícono ES la ilustración de la card, y envolverlo en una forma
        redundante lo convierte en un adorno sobre un rectángulo de color.

        La card es un bloque que respira desde el margen de página, así que el
        ícono lleva su propio aire interior (pl-5) en lugar de pegarse al
        borde de la banda.
      */}
      <div className="shrink-0 pl-5">
        <CategoryIcon name={name} size={iconSize} stroke={palette.ink} strokeWidth={1.4} />
      </div>

      {footer && <div className="min-w-0 flex-1 pr-5">{footer}</div>}
    </div>
  );
};

export default CategoryCardSurface;
