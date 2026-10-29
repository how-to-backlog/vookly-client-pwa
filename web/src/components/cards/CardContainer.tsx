'use client';

import React from 'react';
import { VirtualCard } from './VirtualCard';

export interface CardItem {
  id: string;
  localName: string;
  imagePath: string;
  href?: string;
}

const DEFAULT_CARDS: CardItem[] = [
  { 
    id: '1', 
    localName: 'Cafetería', 
    imagePath: '/images/cards/cafeteria/card-bg.jpg',
    href: '/local/cafeteria' // Solo la primera tarjeta navega
  },
  { 
    id: '2', 
    localName: 'Heladería', 
    imagePath: '/images/cards/heladeria/card-bg.jpg'
  },
  { 
    id: '3', 
    localName: 'Barbería', 
    imagePath: '/images/cards/barberia/card-bg.jpg'
  },
  { 
    id: '4', 
    localName: 'Panadería', 
    imagePath: '/images/cards/panaderia/card-bg.jpg'
  },
];

export interface CardContainerProps {
  cards?: CardItem[];
}

/**
 * CardContainer: Orquesta la lista de tarjetas en cascada vertical.
 */
export const CardContainer: React.FC<CardContainerProps> = ({ cards = DEFAULT_CARDS }) => {
  return (
    <section className="w-full flex flex-col gap-5 px-5 py-6">
      {cards.map((card) => (
        <VirtualCard 
          key={card.id} 
          backgroundImage={card.imagePath}
          href={card.href}
        />
      ))}
    </section>
  );
};

export default CardContainer;
