'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Gift, Sparkles, ChevronRight } from 'lucide-react';
import type { CardItem } from '@/components/cards/CardContainer';
import {
  MOCK_BUSINESS_CAFETERIA,
  MOCK_RULES_CAFETERIA,
  MOCK_CUSTOMER_STATUS_CAFETERIA
} from '@/data/mockLoyalty';
import {
  loadDemoSimulatorConfig,
  applyDemoConfigToEntities
} from '@/services/demoSimulatorStorage';

export interface SmartRewardBannerProps {
  cards: CardItem[];
}

export type BannerState =
  | {
      type: 'ready';
      href: string;
      businessName: string;
      rewardTitle: string;
      badgeText: string;
      subtitle: string;
    }
  | {
      type: 'close';
      href: string;
      businessName: string;
      rewardTitle: string;
      stampsLeft: number;
      badgeText: string;
      subtitle: string;
    }
  | null;

/**
 * Calcula el estado del banner inteligente leyendo el estado reactivo del simulador
 * y las tarjetas disponibles, respetando la regla de negocio y prioridad FIFO:
 * 1. Prioridad 1: Premios ya desbloqueados (status === 'ready' o no canjeados aún).
 * 2. Prioridad 2: Próximo premio a 1 o 2 sellos de distancia.
 * 3. Si faltan 3 o más sellos, o no hay premios cercanos: null (no renderiza).
 */
export function computeBannerState(cards: CardItem[]): BannerState {
  if (typeof window === 'undefined') return null;

  // 1. Analizar el comercio interactivo activo (Cafetería / Coffee Shop)
  const cafeteriaCard = cards.find((c) => c.href === '/local/cafeteria');
  if (cafeteriaCard) {
    const config = loadDemoSimulatorConfig(
      'cafeteria',
      MOCK_BUSINESS_CAFETERIA.name,
      MOCK_RULES_CAFETERIA,
      MOCK_CUSTOMER_STATUS_CAFETERIA
    );

    const { rules, wallet } = applyDemoConfigToEntities(
      config,
      MOCK_RULES_CAFETERIA,
      MOCK_CUSTOMER_STATUS_CAFETERIA
    );

    const businessDisplayName = config.businessName || MOCK_BUSINESS_CAFETERIA.name;

    // Buscar si hay algún voucher listo para retirar (FIFO: el primero en orden de hitos)
    const vouchers = wallet.vouchers || [];
    const readyVoucher = vouchers.find((v) => v.status === 'ready');
    if (readyVoucher) {
      return {
        type: 'ready',
        href: '/local/cafeteria',
        businessName: businessDisplayName,
        rewardTitle: readyVoucher.rewardTitle,
        badgeText: '¡Premio listo!',
        subtitle: `Disponible para canjear en ${businessDisplayName}`
      };
    }

    // Si no hay premios listos, verificar si está a 1 o 2 sellos de conseguir el próximo hito
    const sortedMilestones = [...rules.rewardMilestones].sort(
      (a, b) => a.stampThreshold - b.stampThreshold
    );

    const nextMilestone = sortedMilestones.find((m) => m.stampThreshold > wallet.currentStamps);
    if (nextMilestone) {
      const stampsLeft = nextMilestone.stampThreshold - wallet.currentStamps;
      if (stampsLeft === 1 || stampsLeft === 2) {
        return {
          type: 'close',
          href: '/local/cafeteria',
          businessName: businessDisplayName,
          rewardTitle: nextMilestone.rewardTitle,
          stampsLeft,
          badgeText: stampsLeft === 1 ? 'A solo 1 sello' : 'A solo 2 sellos',
          subtitle: `Estás muy cerca de ganar en ${businessDisplayName}`
        };
      }
    }
  }

  // Si no está listo ni a 1-2 sellos, no se muestra nada
  return null;
}

/**
 * SmartRewardBanner: Bloque Lego modular que expone dinámicamente el premio real
 * listo o próximo del simulador. Si el usuario está a 3+ sellos, desaparece por completo.
 */
export const SmartRewardBanner: React.FC<SmartRewardBannerProps> = ({ cards }) => {
  const [banner, setBanner] = useState<BannerState>(null);

  useEffect(() => {
    // Sincronizar estado en cliente leyendo localStorage del simulador
    setBanner(computeBannerState(cards));

    const handleStorageChange = () => {
      setBanner(computeBannerState(cards));
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, [cards]);

  // Si no hay premios listos ni a 1-2 sellos, retorno nulo (cero espacio en el DOM)
  if (!banner) {
    return null;
  }

  const isReady = banner.type === 'ready';

  return (
    <section className="px-5 py-2 select-none">
      <Link
        href={banner.href}
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

          {/* Información Dinámica Real */}
          <div className="min-w-0">
            <span
              className={`inline-block text-[11px] font-bold uppercase tracking-wider ${
                isReady ? 'text-emerald-700' : 'text-amber-700'
              }`}
            >
              {banner.badgeText}
            </span>
            <h2 className="text-[14px] font-bold text-neutral-900 truncate leading-tight">
              {banner.rewardTitle}
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
