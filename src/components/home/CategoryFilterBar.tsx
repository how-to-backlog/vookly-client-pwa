'use client';

import { WalletCards } from 'lucide-react';
import React from 'react';

import {
    CATEGORY_LABELS,
    CATEGORY_PALETTE,
    CategoryIcon,
    type CategoryIconName
} from '@/components/icons/CategoryIcon';
import JellyRadio, { type JellyRadioItem } from '@/components/registry/JellyRadio';
import { CATEGORY_ORDER, type CategoryFilterValue } from './useCategoryFilter';

export interface CategoryFilterBarProps {
  /** Rubro seleccionado. `'all'` representa la vista sin filtro. */
  value: CategoryFilterValue;
  /** Callback invocado al seleccionar un rubro. */
  onChange: (value: CategoryFilterValue) => void;
  /** Rubros disponibles para filtrar. */
  categories?: CategoryIconName[];
}

/** Color neutro del chip de la vista completa. */
const ALL_ACCENT = '#334155';
/** Trazo claro del chip de la vista completa cuando está activo. */
const ALL_INK = '#f8fafc';
/** Trazo del chip de la vista completa cuando está inactivo. */
const ALL_TEXT = '#334155';

/**
 * CategoryFilterBar: control de filtrado por rubro de la billetera.
 *
 * Es deliberadamente icon-only: cada chip comunica su significado con el
 * ícono y su color de fondo. La accesibilidad no depende del color, por lo
 * que cada chip expone además una etiqueta accesible.
 */
export const CategoryFilterBar: React.FC<CategoryFilterBarProps> = ({
  value,
  onChange,
  categories = CATEGORY_ORDER
}) => {
  const items: JellyRadioItem[] = [
    {
      value: 'all',
      ariaLabel: 'Todos los rubros',
      icon: <WalletCards size={20} strokeWidth={1.9} aria-hidden="true" />,
      activeColor: ALL_ACCENT,
      activeTextColor: ALL_INK,
      textColor: ALL_TEXT
    },
    ...categories.map(category => {
      const palette = CATEGORY_PALETTE[category];
      return {
        value: category,
        ariaLabel: CATEGORY_LABELS[category],
        icon: (
          <CategoryIcon
            name={category}
            size={20}
            strokeWidth={1.7}
            className="text-current"
          />
        ),
        activeColor: palette.accent,
        // Sobre el fondo saturado el trazo necesita el crema del rubro: el
        // `ink` está calibrado para el pastel de la tarjeta y no alcanza el
        // contraste mínimo sobre el acento.
        activeTextColor: palette.accentInk,
        // Sobre el chip inactivo (gris claro) el `ink` sí tiene contraste, y
        // conserva la identidad cromática del rubro.
        textColor: palette.ink
      };
    })
  ];

  const currentLabel =
    value === 'all'
      ? 'Todos'
      : CATEGORY_LABELS[value as CategoryIconName] || 'Comercios';

  return (
    // El contenedor ocupa todo el ancho y distribuye los 5 botones con flex justify-between
    // dinámico: en pantallas chicas se acercan al mínimo seguro, y en pantallas más grandes
    // el espacio se expande al máximo disponible automáticamente.
    <div className="flex flex-col items-center w-full px-5 pt-2 pb-3 select-none gap-2">
      <div className="w-full">
        <JellyRadio
          items={items}
          value={value}
          onChange={next => onChange(next as CategoryFilterValue)}
          chipColor="#ebeef2"
          activeColor={ALL_ACCENT}
          textColor="#334155"
          activeTextColor={ALL_INK}
          size="lg"
          gap={0}
          radius={999}
          ariaLabel="Filtrar tarjetas por rubro"
          className="w-full justify-between"
          inset
        />
      </div>
      <p className="text-center text-sm font-semibold text-neutral-600 tracking-wide pt-2.5">
        {currentLabel}
      </p>
    </div>
  );
};

export default CategoryFilterBar;
