'use client';

import { useMemo, useState } from 'react';

import type { CardItem } from '@/components/cards/CardContainer';
import type { CategoryIconName } from '@/components/icons/CategoryIcon';

/** Identificador de la selección actual del filtro de rubro. */
export type CategoryFilterValue = 'all' | CategoryIconName;

/**
 * Orden canónico de rubros. Define cómo se agrupan las tarjetas cuando el
 * filtro está activo, para que el set se lea siempre en el mismo orden y no
 * dependa del orden de aparición en el dataset.
 */
export const CATEGORY_ORDER: CategoryIconName[] = [
  'cafeteria',
  'barberia',
  'heladeria',
  'panaderia'
];

/**
 * Agrupa las tarjetas por rubro.
 *
 * En el estado "todos" conserva el orden original del dataset. Cuando hay un
 * rubro activo, devuelve únicamente las tarjetas de ese rubro, ordenadas por
 * `CATEGORY_ORDER` para que varias tarjetas del mismo rubro queden contiguas
 * y el stack sea estable.
 */
export const groupCardsByCategory = (
  cards: CardItem[],
  selected: CategoryFilterValue
): CardItem[] => {
  if (selected === 'all') return cards;

  return cards
    .filter(card => card.categoryIcon === selected)
    .sort((a, b) => CATEGORY_ORDER.indexOf(a.categoryIcon) - CATEGORY_ORDER.indexOf(b.categoryIcon));
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
 *
 * Vive en la pantalla de inicio porque el control y la lista de tarjetas son
 * hermanos: la home posee el estado y entrega a cada uno su parte.
 */
export const useCategoryFilter = (cards: CardItem[]): CategoryFilterState => {
  const [selected, setSelected] = useState<CategoryFilterValue>('all');

  const visibleCards = useMemo(() => groupCardsByCategory(cards, selected), [cards, selected]);

  return {
    selected,
    setSelected,
    visibleCards,
    isFiltered: selected !== 'all'
  };
};
