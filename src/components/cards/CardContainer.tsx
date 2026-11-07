'use client';

import React from 'react';
import ScrollStack, { ScrollStackItem } from '@/components/registry/ScrollStack';
import { ScrollStackCard } from './ScrollStackCard';
import type { CategoryIconName } from '@/components/icons/CategoryIcon';

export interface CardItem {
  id: string;
  localName: string;
  /** Icono de categoría que define la superficie de la tarjeta. */
  categoryIcon: CategoryIconName;
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
  {
    id: '1',
    localName: 'Cafetería',
    categoryIcon: 'cafeteria',
    href: '/local/cafeteria',
    stamps: 15,
    totalStamps: 30,
    nextRewardTitle: 'Tostado Especial'
  },
  {
    id: '2',
    localName: 'Heladería',
    categoryIcon: 'heladeria',
    href: '/local/heladeria',
    stamps: 4,
    totalStamps: 12,
    nextRewardTitle: 'Cucurucho',
    unavailable: true
  },
  {
    id: '3',
    localName: 'Barbería',
    categoryIcon: 'barberia',
    href: '/local/barberia',
    stamps: 8,
    totalStamps: 20,
    nextRewardTitle: 'Corte + Barba',
    unavailable: true
  },
  {
    id: '4',
    localName: 'Panadería',
    categoryIcon: 'panaderia',
    href: '/local/panaderia',
    stamps: 2,
    totalStamps: 10,
    nextRewardTitle: 'Medialunas x2',
    unavailable: true
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
}

/**
 * CardContainer: Apila las tarjetas de comercios con ScrollStack.
 * Cada tarjeta se fija (sticky) y se desplaza sobre la anterior al hacer scroll.
 */
export const CardContainer: React.FC<CardContainerProps> = ({
  cards = DEFAULT_CARDS,
  stackKey
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
        rotationAmount={0}
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
              stamps={card.stamps}
              totalStamps={card.totalStamps}
              nextRewardTitle={card.nextRewardTitle}
              unavailable={card.unavailable}
            />
          </ScrollStackItem>
        ))}
      </ScrollStack>
    </section>
  );
};

export default CardContainer;
