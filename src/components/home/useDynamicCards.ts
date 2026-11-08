'use client';

import { useSyncExternalStore } from 'react';
import type { CardItem } from '@/components/cards/CardContainer';
import { DEFAULT_CARDS } from '@/components/cards/CardContainer';
import {
  getBusinessSync,
  getBusinessLoyaltyRulesSync,
  getCustomerWalletSync
} from '@/services/loyaltyRepository';
import {
  loadDemoSimulatorConfig,
  applyDemoConfigToEntities
} from '@/services/demoSimulatorStorage';

export interface CardStateWithSim {
  id: string;
  localName: string;
  categoryIcon: CardItem['categoryIcon'];
  backgroundColor?: string;
  inkColor?: string;
  href?: string;
  stamps: number;
  totalStamps: number;
  nextRewardTitle: string;
  hasReadyReward: boolean;
  unavailable?: boolean;
}

/**
 * Extrae el slug de negocio a partir del href (ej: '/local/cafeteria' -> 'cafeteria')
 */
export function extractBusinessSlug(href?: string): string | null {
  if (!href) return null;
  const match = href.match(/\/local\/([^/?#]+)/);
  return match ? match[1] : null;
}

/**
 * Resuelve el estado dinámico de una tarjeta consultando el simulador (localStorage)
 * y cayendo al repositorio sincronizado.
 */
export function resolveDynamicCardState(card: CardItem): CardStateWithSim {
  const slug = extractBusinessSlug(card.href);

  // Si no tiene slug o es SSR, devolvemos el fallback estático
  if (!slug || typeof window === 'undefined') {
    return {
      ...card,
      hasReadyReward: false
    };
  }

  const baseBusiness = getBusinessSync(slug);
  const baseRules = getBusinessLoyaltyRulesSync(slug);
  const baseWallet = getCustomerWalletSync('cust-01', slug);

  if (!baseBusiness || !baseRules || !baseWallet) {
    return {
      ...card,
      hasReadyReward: false
    };
  }

  // Consulta el simulador específico del local (permite cambiar nombre o sellos desde el onboarding/tool)
  const config = loadDemoSimulatorConfig(
    slug,
    card.localName || baseBusiness.name,
    baseRules,
    baseWallet
  );

  const { rules, wallet } = applyDemoConfigToEntities(config, baseRules, baseWallet);

  // Nombre dinámico (del simulador si fue editado, sino el configurado)
  const dynamicName = config.businessName?.trim() || card.localName || baseBusiness.name;

  // Sellos actuales y totales
  const stamps = wallet.currentStamps;
  const totalStamps = rules.totalRoadmapStamps;

  // Premio listo para canjear (status === 'ready')
  const hasReadyReward = (wallet.vouchers || []).some((v) => v.status === 'ready');

  // Próximo premio
  const sortedMilestones = [...rules.rewardMilestones].sort(
    (a, b) => a.stampThreshold - b.stampThreshold
  );
  const nextMilestone = sortedMilestones.find((m) => m.stampThreshold > stamps);
  const nextRewardTitle = nextMilestone ? nextMilestone.rewardTitle : card.nextRewardTitle;

  return {
    ...card,
    localName: dynamicName,
    stamps,
    totalStamps,
    nextRewardTitle,
    hasReadyReward
  };
}

const subscribeToStorage = (onStoreChange: () => void) => {
  if (typeof window === 'undefined') return () => {};
  window.addEventListener('storage', onStoreChange);
  return () => window.removeEventListener('storage', onStoreChange);
};

const cardsCache = { key: '', cards: [] as CardStateWithSim[] };

/**
 * Hook reactivo que escucha cambios en el simulador / localStorage
 * y mantiene las 8 tarjetas actualizadas en tiempo real con nombre y sellos dinámicos.
 */
export function useDynamicCards(initialCards: CardItem[] = DEFAULT_CARDS): CardStateWithSim[] {
  return useSyncExternalStore(
    subscribeToStorage,
    () => {
      const resolved = initialCards.map(resolveDynamicCardState);
      const key = resolved
        .map((c) => `${c.id}:${c.localName}:${c.stamps}:${c.totalStamps}:${c.hasReadyReward}`)
        .join('|');

      if (key !== cardsCache.key) {
        cardsCache.key = key;
        cardsCache.cards = resolved;
      }
      return cardsCache.cards;
    },
    () => initialCards.map((c) => ({ ...c, hasReadyReward: false }))
  );
}
