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
  /** Ruta de detalle del comercio. Ausente cuando el comercio todavía no está disponible. */
  href?: string;
  /** Sellos acumulados del cliente en este comercio. */
  stamps: number;
  /** Sellos totales del roadmap de este comercio. */
  totalStamps: number;
  /** Nombre del próximo premio pendiente. */
  nextRewardTitle: string;
  /**
   * Cuando es true la tarjeta se muestra como no disponible, no navega y
   * se etiqueta como "Próximamente". Es el caso de los comercios que todavía
   * no tienen reglas ni billetera en el repositorio de la demo.
   */
  unavailable?: boolean;
}

/**
 * Datos de demostración del hub.
 *
 * Se hardcodean acá a propósito (y no en `loyaltyRepository`) porque la demo
 * se ajusta con datos, no con lógica de negocio: para cambiar lo que se
 * ve frente al comercio alcanza con editar este array.
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
    nextRewardTitle: 'Tostado Especial'
  },
  {
    id: '1-b',
    localName: 'Café Roma',
    categoryIcon: 'cafeteria',
    // Moca tostado profundo: genera un contraste evidente frente al beige claro de Coffee Shop
    backgroundColor: '#dfc2a6',
    inkColor: '#4a2810',
    href: '/local/cafeteria-roma',
    stamps: 3,
    totalStamps: 10,
    nextRewardTitle: 'Taza Coleccionable Roma'
  },

  // 2. Barberías
  {
    id: '3',
    localName: 'La Barbería Club',
    categoryIcon: 'barberia',
    href: '/local/barberia',
    stamps: 2,
    totalStamps: 5,
    nextRewardTitle: 'Perfilado de Barba'
  },
  {
    id: '3-b',
    localName: 'Barber Studio',
    categoryIcon: 'barberia',
    // Pizarra azul petróleo: contrasta marcadamente con el gris celeste clásico
    backgroundColor: '#b8c7db',
    inkColor: '#172554',
    href: '/local/barberia-studio',
    stamps: 4,
    totalStamps: 6,
    nextRewardTitle: 'Corte Fade'
  },

  // 3. Heladerías
  {
    id: '2',
    localName: 'Heladería del Parque',
    categoryIcon: 'heladeria',
    href: '/local/heladeria',
    stamps: 4,
    totalStamps: 10,
    nextRewardTitle: 'Cucurucho 2 bochas'
  },
  {
    id: '2-b',
    localName: 'Gelato & Co.',
    categoryIcon: 'heladeria',
    // Menta pistacho pastel: contraste temático fresco contra el frutilla/rosa de Heladería del Parque
    backgroundColor: '#d1ecd9',
    inkColor: '#1b5e32',
    href: '/local/heladeria-gelato',
    stamps: 2,
    totalStamps: 9,
    nextRewardTitle: 'Cucurucho Bañado'
  },

  // 4. Panaderías
  {
    id: '4',
    localName: 'Panadería La Espiga',
    categoryIcon: 'panaderia',
    href: '/local/panaderia',
    stamps: 2,
    totalStamps: 8,
    nextRewardTitle: 'Pan de Masa Madre'
  },
  {
    id: '4-b',
    localName: 'Masa Madre Bakery',
    categoryIcon: 'panaderia',
    // Centeno tostado / corteza oscura: se distingue claramente del trigo dorado claro de La Espiga
    backgroundColor: '#e6c594',
    inkColor: '#583a0a',
    href: '/local/panaderia-masamadre',
    stamps: 5,
    totalStamps: 10,
    nextRewardTitle: 'Baguette Rústica'
  }
];

export interface CardContainerProps {
  cards?: CardItem[];
  /**
   * Clave de identidad del conjunto visible de tarjetas.
   *
   * Al cambiarla, el stack se remonta y vuelve al inicio. Se usa cuando el
   * filtro reemplaza el conjunto de tarjetas, para que la nueva vista arranque
   * desde arriba en lugar de quedar en una posición de scroll que ya no existe.
   */
  stackKey?: string;
  /** Categoría activa actual en el filtro superior. */
  activeCategory?: CategoryIconName | 'all';
  /** Callback para abrir el directorio de comercios adheridos */
  onOpenDirectory?: () => void;
}

/**
 * CardContainer: Apila las tarjetas de comercios con ScrollStack.
 * Cada tarjeta se fija (sticky) y se desplaza sobre la anterior al hacer scroll.
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
        // Mazo parejo: cada tarjeta se fija 20px más abajo que la anterior, así
        // se ve el filo de las que quedan detrás (efecto de apilamiento) y al
        // mismo tiempo los bordes quedan rectos y alineados. Con 0 el mazo se
        // convertía en una sola carta superpuesta.
        itemStackDistance={20}
        stackPosition={24}
        // Sin escala, tilt ni rotación: cada carta es idéntica a la anterior,
        // el mazo se ve parejo y no un montón torcido.
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
        {cards.map((card) => (
          <ScrollStackItem
            key={card.id}
            padding="p-0"
            background="transparent"
            boxShadow="none"
            itemClassName="h-[220px] rounded-[28px] overflow-hidden"
          >
            <ScrollStackCard
              href={card.href}
              localName={card.localName}
              categoryIcon={card.categoryIcon}
              backgroundColor={card.backgroundColor}
              inkColor={card.inkColor}
              stamps={card.stamps}
              totalStamps={card.totalStamps}
              nextRewardTitle={card.nextRewardTitle}
              unavailable={card.unavailable}
            />
          </ScrollStackItem>
        ))}

        {/* Tarjeta de Descubrimiento (DiscoverNicheCard) como ancla final del mazo */}
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
