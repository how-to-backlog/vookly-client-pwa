'use client';

import React from 'react';
import ScrollStack, { ScrollStackItem } from '@/components/registry/ScrollStack';
import { ScrollStackCard } from './ScrollStackCard';

export interface CardItem {
  id: string;
  localName: string;
  imagePath: string;
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
const DEFAULT_CARDS: CardItem[] = [
  {
    id: '1',
    localName: 'Cafetería',
    imagePath: '/images/cards/cafeteria/card-bg.jpg',
    href: '/local/cafeteria',
    stamps: 15,
    totalStamps: 30,
    nextRewardTitle: 'Tostado Especial'
  },
  {
    id: '2',
    localName: 'Heladería',
    imagePath: '/images/cards/heladeria/card-bg.jpg',
    href: '/local/heladeria',
    stamps: 4,
    totalStamps: 12,
    nextRewardTitle: 'Cucurucho',
    unavailable: true
  },
  {
    id: '3',
    localName: 'Barbería',
    imagePath: '/images/cards/barberia/card-bg.jpg',
    href: '/local/barberia',
    stamps: 8,
    totalStamps: 20,
    nextRewardTitle: 'Corte + Barba',
    unavailable: true
  },
  {
    id: '4',
    localName: 'Panadería',
    imagePath: '/images/cards/panaderia/card-bg.jpg',
    href: '/local/panaderia',
    stamps: 2,
    totalStamps: 10,
    nextRewardTitle: 'Medialunas x2',
    unavailable: true
  }
];

export interface CardContainerProps {
  cards?: CardItem[];
}

/**
 * CardContainer: Apila las tarjetas de comercios con ScrollStack.
 * Cada tarjeta se fija (sticky) y se desplaza sobre la anterior al hacer scroll.
 */
export const CardContainer: React.FC<CardContainerProps> = ({ cards = DEFAULT_CARDS }) => {
  return (
    <section className="w-full h-full">
      <ScrollStack
        itemDistance={90}
        itemStackDistance={22}
        stackPosition="12%"
        itemScale={0.05}
        baseScale={0.92}
        dimAmount={0.25}
        blurAmount={1}
        tiltAmount={4}
        rotationAmount={1.5}
        holdDistance={140}
        smoothScroll
        snap
        innerPadding="px-4"
        className="w-full h-full no-scrollbar"
      >
        {cards.map((card) => (
          <ScrollStackItem
            key={card.id}
            padding="p-0"
            background="transparent"
            boxShadow="none"
            itemClassName="h-[300px] rounded-[28px] overflow-hidden"
          >
            <ScrollStackCard
              backgroundImage={card.imagePath}
              href={card.href}
              localName={card.localName}
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
