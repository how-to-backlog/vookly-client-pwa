'use client';

import React from 'react';
import Link from 'next/link';
import { Gift, Sparkles, ChevronRight } from 'lucide-react';
import type { CardItem } from '@/components/cards/CardContainer';

export interface SmartRewardBannerProps {
  cards: CardItem[];
}

export type BannerState =
  | {
      type: 'ready';
      card: CardItem;
      badgeText: string;
      title: string;
      subtitle: string;
    }
  | {
      type: 'close';
      card: CardItem;
      stampsLeft: number;
      badgeText: string;
      title: string;
      subtitle: string;
    }
  | null;

/**
 * Calcula el estado de mayor prioridad bajo regla FIFO:
 * 1. Prioridad 1: Comercios con premio listo para canjear (primer elemento en la lista / más antiguo).
 * 2. Prioridad 2: Comercios a 1 o 2 sellos de un premio (primer elemento en la lista / más antiguo).
 * 3. Si no hay nada elegible: null (silencioso).
 */
export function resolveSmartBanner(cards: CardItem[]): BannerState {
  // Filtramos comercios disponibles
  const activeCards = cards.filter((c) => !c.unavailable && c.href);

  // 1. Canjes Listos (stamps >= totalStamps o stamps >= 10 en hitos intermedios)
  // En nuestra demo de Cafetería: stamps: 15, totalStamps: 30, hito de tostado listo
  const readyCard = activeCards.find((c) => c.stamps >= 10);
  if (readyCard) {
    return {
      type: 'ready',
      card: readyCard,
      badgeText: '¡Premio listo!',
      title: readyCard.nextRewardTitle || 'Recompensa desbloqueada',
      subtitle: `Disponible para canjear en ${readyCard.localName}`
    };
  }

  // 2. Próximos a ganar (a 1 o 2 sellos de alcanzar un múltiplo o total)
  const closeCard = activeCards.find((c) => {
    const remainder = c.totalStamps - c.stamps;
    return remainder > 0 && remainder <= 2;
  });

  if (closeCard) {
    const stampsLeft = closeCard.totalStamps - closeCard.stamps;
    return {
      type: 'close',
      card: closeCard,
      stampsLeft,
      badgeText: stampsLeft === 1 ? 'A solo 1 sello' : 'A solo 2 sellos',
      title: closeCard.nextRewardTitle,
      subtitle: `Estás muy cerca de ganar en ${closeCard.localName}`
    };
  }

  return null;
}

/**
 * SmartRewardBanner: Bloque Lego modular que expone la recompensa más urgente
 * o más antigua sin reclamar, navegando directo al roadmap de ese comercio.
 */
export const SmartRewardBanner: React.FC<SmartRewardBannerProps> = ({ cards }) => {
  const banner = resolveSmartBanner(cards);

  // Si no hay premios listos ni cercanos, no se renderiza nada en el DOM
  if (!banner || !banner.card.href) {
    return null;
  }

  const isReady = banner.type === 'ready';

  return (
    <section className="px-5 py-2 select-none">
      <Link
        href={banner.card.href}
        className={`group relative flex items-center justify-between p-3.5 rounded-2xl border transition-all duration-150 active:scale-[0.98] ${
          isReady
            ? 'bg-gradient-to-r from-emerald-500/10 via-emerald-500/5 to-transparent border-emerald-500/25 hover:border-emerald-500/40'
            : 'bg-gradient-to-r from-amber-500/10 via-amber-500/5 to-transparent border-amber-500/25 hover:border-amber-500/40'
        }`}
      >
        <div className="flex items-center gap-3 min-w-0 pr-2">
          {/* Icono Badge */}
          <div
            className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 shadow-sm ${
              isReady ? 'bg-emerald-500 text-white' : 'bg-amber-500 text-white'
            }`}
          >
            {isReady ? (
              <Gift className="w-5 h-5 animate-pulse" />
            ) : (
              <Sparkles className="w-5 h-5" />
            )}
          </div>

          {/* Información */}
          <div className="min-w-0">
            <span
              className={`inline-block text-[11px] font-bold uppercase tracking-wider ${
                isReady ? 'text-emerald-700' : 'text-amber-700'
              }`}
            >
              {banner.badgeText}
            </span>
            <h2 className="text-[14px] font-bold text-neutral-900 truncate leading-tight">
              {banner.title}
            </h2>
            <p className="text-[12px] font-medium text-neutral-500 truncate mt-0.5">
              {banner.subtitle}
            </p>
          </div>
        </div>

        {/* Chevron de Acción */}
        <div className="shrink-0 w-8 h-8 rounded-full bg-white/80 border border-neutral-100 flex items-center justify-center text-neutral-400 group-hover:text-neutral-900 group-hover:bg-white transition-colors">
          <ChevronRight className="w-4 h-4" />
        </div>
      </Link>
    </section>
  );
};

export default SmartRewardBanner;
