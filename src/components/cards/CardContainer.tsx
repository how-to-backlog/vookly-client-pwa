'use client';

import React from 'react';
import ScrollStack, { ScrollStackItem } from '@/components/registry/ScrollStack';
import { ScrollStackCard } from './ScrollStackCard';
import { DiscoverNicheCard } from './DiscoverNicheCard';
import type { CategoryIconName } from '@/components/icons/CategoryIcon';

export interface CardItem {
  id: string;
  localName: string;
  /** Icono de categoría que define la superficie de la tarjeta. */
  categoryIcon: CategoryIconName;
  /** Color de fondo personalizado para diferenciar locales del mismo nicho. */
  backgroundColor?: string;
  /** Color de trazo personalizado para el icono. */
  inkColor?: string;
  /** Identificador opcional del patrón Hero Patterns */
  patternId?: string;
  /** Ruta de detalle del comercio. Ausente cuando el comercio todavía no está disponible. */
  href?: string;
  /** Sellos acumulados del cliente en este comercio. */
  stamps: number;
  /** Sellos totales del roadmap de este comercio. */
  totalStamps: number;
  /** Nombre del próximo premio pendiente. */
  nextRewardTitle: string;
  /** Si tiene al menos un premio listo para canjear en mostrador */
  hasReadyReward?: boolean;
  /**
   * Cuando es true la tarjeta se muestra como no disponible, no navega y
   * se etiqueta como "Próximamente".
   */
  unavailable?: boolean;
}

/**
 * Datos de demostración iniciales del hub.
 */
export const DEFAULT_CARDS: CardItem[] = [
  // 1. Cafeterías
  {
    id: '1',
    localName: 'Coffee Shop',
    categoryIcon: 'cafeteria',
    href: '/local/cafeteria',
    stamps: 15,
    totalStamps: 30,
    nextRewardTitle: 'Tostado Especial',
    hasReadyReward: true
  },
  {
    id: '1-b',
    localName: 'Café Roma',
    categoryIcon: 'cafeteria',
    backgroundColor: '#dfc2a6',
    inkColor: '#4a2810',
    href: '/local/cafeteria-roma',
    stamps: 3,
    totalStamps: 10,
    nextRewardTitle: 'Espresso Doble',
    hasReadyReward: true
  },

  // 2. Barberías
  {
    id: '3',
    localName: 'La Barbería Club',
    categoryIcon: 'barberia',
    href: '/local/barberia',
    stamps: 2,
    totalStamps: 5,
    nextRewardTitle: 'Perfilado de Barba',
    hasReadyReward: true
  },
  {
    id: '3-b',
    localName: 'Barber Studio',
    categoryIcon: 'barberia',
    backgroundColor: '#b8c7db',
    inkColor: '#172554',
    href: '/local/barberia-studio',
    stamps: 4,
    totalStamps: 6,
    nextRewardTitle: 'Corte Fade',
    hasReadyReward: true
  },

  // 3. Heladerías
  {
    id: '2',
    localName: 'Heladería del Parque',
    categoryIcon: 'heladeria',
    href: '/local/heladeria',
    stamps: 4,
    totalStamps: 10,
    nextRewardTitle: 'Cucurucho 2 bochas',
    hasReadyReward: false
  },
  {
    id: '2-b',
    localName: 'Gelato & Co.',
    categoryIcon: 'heladeria',
    backgroundColor: '#d1ecd9',
    inkColor: '#1b5e32',
    href: '/local/heladeria-gelato',
    stamps: 2,
    totalStamps: 9,
    nextRewardTitle: 'Cucurucho Bañado',
    hasReadyReward: false
  },

  // 4. Panaderías
  {
    id: '4',
    localName: 'Panadería La Espiga',
    categoryIcon: 'panaderia',
    href: '/local/panaderia',
    stamps: 2,
    totalStamps: 8,
    nextRewardTitle: 'Pan de Masa Madre',
    hasReadyReward: false
  },
  {
    id: '4-b',
    localName: 'Masa Madre Bakery',
    categoryIcon: 'panaderia',
    backgroundColor: '#e6c594',
    inkColor: '#583a0a',
    href: '/local/panaderia-masamadre',
    stamps: 5,
    totalStamps: 10,
    nextRewardTitle: 'Café al paso + Medialunas',
    hasReadyReward: true
  }
];

export interface CardContainerProps {
  cards?: CardItem[];
  /** Clave de identidad del conjunto visible de tarjetas. */
  stackKey?: string;
  /** Categoría activa actual en el filtro superior. */
  activeCategory?: CategoryIconName | 'all';
  /** Callback para abrir el directorio de comercios adheridos */
  onOpenDirectory?: () => void;
}

/**
 * Sombra negra direccional a 45 grados:
 * Se proyecta hacia la esquina inferior derecha (x: 4px, y: 7px, blur: 16px)
 * otorgando profundidad y relieve tridimensional sin desbordes agresivos.
 */
const CARD_BOTTOM_RIGHT_SHADOW = '4px 7px 16px -2px rgba(0, 0, 0, 0.42), 1px 2px 5px 0px rgba(0, 0, 0, 0.22)';

/**
 * CardContainer: Apila las tarjetas de comercios con ScrollStack.
 */
export const CardContainer: React.FC<CardContainerProps> = ({
  cards = DEFAULT_CARDS,
  stackKey,
  activeCategory = 'all',
  onOpenDirectory = () => {}
}) => {
  return (
    <section className="w-full h-full">
      <ScrollStack
        key={stackKey}
        itemDistance={64}
        itemStackDistance={20}
        stackPosition={24}
        itemScale={0}
        baseScale={0.92}
        dimAmount={0.25}
        blurAmount={1}
        tiltAmount={0}
        rotationAmount={1}
        holdDistance={140}
        smoothScroll
        snap
        innerPadding="px-5"
        className="w-full h-full no-scrollbar"
      >
        {cards.map((card, idx) => (
          <ScrollStackItem
            key={card.id}
            padding="p-0"
            background="transparent"
            boxShadow={CARD_BOTTOM_RIGHT_SHADOW}
            itemClassName="h-[220px] rounded-[28px] overflow-hidden"
          >
            <div
              {...(idx === 0 ? { 'data-tour': 'first-card-target' } : {})}
              className="w-full h-full"
            >
              <ScrollStackCard
                id={card.id}
                href={card.href}
                localName={card.localName}
                categoryIcon={card.categoryIcon}
                backgroundColor={card.backgroundColor}
                inkColor={card.inkColor}
                patternId={card.patternId}
                stamps={card.stamps}
                totalStamps={card.totalStamps}
                nextRewardTitle={card.nextRewardTitle}
                hasReadyReward={card.hasReadyReward}
                unavailable={card.unavailable}
              />
            </div>
          </ScrollStackItem>
        ))}

        {/* Tarjeta de Descubrimiento (DiscoverNicheCard) sin sombra (boxShadow="none") */}
        <ScrollStackItem
          key="discover-card-anchor"
          padding="p-0"
          background="transparent"
          boxShadow="none"
          itemClassName="h-[220px] rounded-[28px] overflow-hidden"
        >
          <DiscoverNicheCard
            category={activeCategory === 'all' ? undefined : activeCategory}
            onOpenDirectory={onOpenDirectory}
          />
        </ScrollStackItem>
      </ScrollStack>
    </section>
  );
};

export default CardContainer;
