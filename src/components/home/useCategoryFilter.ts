'use client';

import { useState, useMemo } from 'react';
import type { CardItem } from '@/components/cards/CardContainer';
import type { CategoryIconName } from '@/components/icons/CategoryIcon';

/**
 * Filtro de rubro del comercio: las 4 categorías disponibles o 'all' para ver todas.
 */
export type CategoryFilterValue = CategoryIconName | 'all';

/**
 * Orden canónico estricto de categorías para el agrupamiento en el ScrollStack.
 */
export const CATEGORY_ORDER: CategoryIconName[] = [
  'cafeteria',
  'barberia',
  'heladeria',
  'panaderia'
];

/**
 * Agrupa y ordena las tarjetas según el rubro seleccionado.
 */
export const groupCardsByCategory = (
  cards: CardItem[],
  selected: CategoryFilterValue
): CardItem[] => {
  if (selected === 'all') {
    return [...cards].sort((a, b) => {
      const orderA = CATEGORY_ORDER.indexOf(a.categoryIcon);
      const orderB = CATEGORY_ORDER.indexOf(b.categoryIcon);
      const safeOrderA = orderA === -1 ? 999 : orderA;
      const safeOrderB = orderB === -1 ? 999 : orderB;
      return safeOrderA - safeOrderB;
    });
  }

  return cards.filter((card) => card.categoryIcon === selected);
};

export interface CategoryFilterState {
  /** Rubro seleccionado. `'all'` representa la vista sin filtro. */
  selected: CategoryFilterValue;
  /** Cambia el rubro seleccionado. */
  setSelected: (value: CategoryFilterValue) => void;
  /** Tarjetas visibles según la selección actual. */
  visibleCards: CardItem[];
  /** `true` cuando hay un rubro activo (la vista está filtrada). */
  isFiltered: boolean;
}

/**
 * Hook que administra el filtro de rubro de la billetera.
 * Permite recibir un `initialValue` para arrancar preseleccionado (ej: tras el onboarding).
 */
export const useCategoryFilter = (
  cards: CardItem[],
  initialValue: CategoryFilterValue = 'all'
): CategoryFilterState => {
  const [selected, setSelected] = useState<CategoryFilterValue>(initialValue);

  const visibleCards = useMemo(() => groupCardsByCategory(cards, selected), [cards, selected]);

  return {
    selected,
    setSelected,
    visibleCards,
    isFiltered: selected !== 'all'
  };
};
