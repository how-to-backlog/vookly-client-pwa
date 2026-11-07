'use client';

import React from 'react';

/**
 * CategoryIcon: iconos de categoría de comercio.
 *
 * Los SVG de `public/svgs` se renderizan ENLINEADOS y no como `<img>` a propósito:
 * usan `stroke="currentColor"`, que sólo resuelve contra el color del propio
 * documento SVG. Servidos como archivo (`<img src>` o `background-image: url()`)
 * el color queda congelado en negro y el icono no puede heredar el color de texto
 * de la tarjeta. Inline además evita una request extra por tarjeta.
 *
 * La geometría proviene de `public/svgs/*.svg` (24x24, stroke-width 1.5).
 */

export type CategoryIconName = 'cafeteria' | 'heladeria' | 'barberia' | 'panaderia';

/**
 * Paleta de marca por categoría. Cada superficie de tarjeta usa un color sólido
 * pastel propio del rubro, de modo que el set se lea como un sistema y no como
 * cuatro piezas sueltas. `background` es el color plano de la tarjeta e `ink` el
 * color del trazo del icono, con contraste suficiente sobre ese fondo.
 */
export interface CategoryPalette {
  /** Color sólido de fondo de la tarjeta. */
  background: string;
  /** Color del trazo del icono sobre el fondo pastel. */
  ink: string;
  /**
   * Versión saturada del color del rubro. Se usa como fondo del chip activo
   * en la barra de filtros, donde el pastel no alcanza para marcar selección.
   */
  accent: string;
  /**
   * Color del trazo del icono sobre el fondo `accent`.
   *
   * No se puede reutilizar `ink`: ese color está calibrado para leerse sobre
   * el pastel de la tarjeta y sobre el chip inactivo (gris claro), pero contra
   * el fondo saturado queda por debajo del contraste mínimo para elementos
   * gráficos. Este valor es un crema del mismo tono del rubro y mantiene el
   * contraste por encima de 3:1 en los cuatro rubros.
   */
  accentInk: string;
}

export const CATEGORY_PALETTE: Record<CategoryIconName, CategoryPalette> = {
  cafeteria: {
    background: '#f3e2d0',
    ink: '#6f4423',
    accent: '#a9682f',
    accentInk: '#f7e8d7'
  },
  heladeria: {
    background: '#f9dbe5',
    ink: '#a83b63',
    accent: '#c94f7c',
    accentInk: '#ffe9f1'
  },
  barberia: {
    background: '#dce3ec',
    ink: '#3c4959',
    accent: '#56657a',
    accentInk: '#e2e8f0'
  },
  panaderia: {
    background: '#f7e7c6',
    ink: '#8a6420',
    accent: '#b8862f',
    accentInk: '#fffaf0'
  }
};

/**
 * Nombre legible de cada rubro. Se usa para la etiqueta accesible de los
 * controles de filtrado, donde el ícono por sí solo no comunica el significado.
 */
export const CATEGORY_LABELS: Record<CategoryIconName, string> = {
  cafeteria: 'Cafeterías de especialidad',
  heladeria: 'Heladerías',
  barberia: 'Barberías',
  panaderia: 'Panaderías'
};

export interface CategoryIconProps {
  /** Nombre del icono dentro del registro. */
  name: CategoryIconName;
  /** Lado del cuadrado en píxeles. */
  size?: number;
  /** Color del trazo. Por defecto hereda `currentColor`. */
  stroke?: string;
  /** Grosor del trazo. */
  strokeWidth?: number;
  className?: string;
}

type IconPaths = readonly string[];

const ICON_PATHS: Record<CategoryIconName, IconPaths> = {
  cafeteria: [
    'M3 14c.83 .642 2.077 1.017 3.5 1c1.423 .017 2.67 -.358 3.5 -1c.83 -.642 2.077 -1.017 3.5 -1c1.423 -.017 2.67 .358 3.5 1',
    'M8 3a2.4 2.4 0 0 0 -1 2a2.4 2.4 0 0 0 1 2',
    'M12 3a2.4 2.4 0 0 0 -1 2a2.4 2.4 0 0 0 1 2',
    'M3 10h14v5a6 6 0 0 1 -6 6h-2a6 6 0 0 1 -6 -6v-5',
    'M16.746 16.726a3 3 0 1 0 .252 -5.555'
  ],
  heladeria: [
    'M17.657 11a6 6 0 1 0 -11.315 0',
    'M6.342 11l5.658 11l5.657 -11l-11.315 0'
  ],
  barberia: [
    'M3 7a3 3 0 1 0 6 0a3 3 0 1 0 -6 0',
    'M3 17a3 3 0 1 0 6 0a3 3 0 1 0 -6 0',
    'M8.6 8.6l10.4 10.4',
    'M8.6 15.4l10.4 -10.4'
  ],
  panaderia: [
    'M5.628 11.283l5.644 -5.637c2.665 -2.663 5.924 -3.747 8.663 -1.205l.188 .181a2.987 2.987 0 0 1 0 4.228l-11.287 11.274a3 3 0 0 1 -4.089 .135l-.143 -.135c-2.728 -2.724 -1.704 -6.117 1.024 -8.841',
    'M9.5 7.5l1.5 3.5',
    'M6.5 10.5l1.5 3.5',
    'M12.5 4.5l1.5 3.5'
  ]
};

/**
 * Devuelve el nombre del icono para un comercio. Se resuelve por el slug de la
 * ruta (`/local/cafeteria`) y, como respaldo, por el nombre del comercio en
 * minúsculas sin acentos.
 */
export const resolveCategoryIcon = (
  slugOrName: string
): CategoryIconName | undefined => {
  const normalized = slugOrName
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase();

  const bySlug = normalized.split('/').filter(Boolean).pop();
  if (bySlug && bySlug in ICON_PATHS) return bySlug as CategoryIconName;

  const match = (Object.keys(ICON_PATHS) as CategoryIconName[]).find(
    (candidate) => normalized.includes(candidate)
  );
  return match;
};

export const CategoryIcon: React.FC<CategoryIconProps> = ({
  name,
  size = 24,
  stroke = 'currentColor',
  strokeWidth = 1.5,
  className
}) => {
  const paths = ICON_PATHS[name];
  if (!paths) return null;

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke={stroke}
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
      focusable="false"
    >
      {paths.map((d) => (
        <path key={d} d={d} />
      ))}
    </svg>
  );
};

export default CategoryIcon;
