'use client';

import { useSyncExternalStore } from 'react';
import type { CardItem } from '@/components/cards/CardContainer';
import { extractBusinessSlug } from '@/components/home/useDynamicCards';
import {
  loadDemoSimulatorConfig,
  applyDemoConfigToEntities
} from '@/services/demoSimulatorStorage';
import {
  getBusinessSync,
  getBusinessLoyaltyRulesSync,
  getCustomerWalletSync
} from '@/services/loyaltyRepository';

/**
 * Estado de premio del cliente para el hub.
 *
 * - `ready`: hay un voucher canjeable ahora mismo.
 * - `close`: faltan 1 o 2 sellos para el próximo hito del programa.
 * - `null`: no hay nada que anunciar y la vista usa su copy estático.
 */
export type RewardStatus =
  | {
      type: 'ready';
      href: string;
      businessName: string;
      rewardTitle: string;
      badgeText: string;
      detail: string;
    }
  | {
      type: 'close';
      href: string;
      businessName: string;
      rewardTitle: string;
      stampsLeft: number;
      badgeText: string;
      detail: string;
    }
  | null;

/**
 * Cliente de la demo: el mismo que usa el hub para resolver las billeteras.
 */
const DEMO_CUSTOMER_ID = 'cust-01';

/**
 * Deriva el estado de premio a partir del almacenamiento del simulador.
 *
 * Recorre las tarjetas del hub y resuelve el negocio de cada una (por el slug
 * de su href) para que el anuncio no quede atado a un comercio en particular:
 * el local que el comerciante da de alta en la landing es uno más de la lista.
 *
 * Vive fuera del componente que lo muestra para que la vista sea
 * presentacional: recibe el estado ya resuelto y no sabe de dónde sale.
 */
/**
 * Resuelve el estado de premio de UNA tarjeta (bloque Lego reutilizable).
 *
 * Devuelve 'ready' si la tarjeta tiene un premio exactamente listo para
 * canjear, o 'close' si le faltan 1 o 2 sellos. En cualquier otro caso
 * devuelve null para esa tarjeta.
 */
export function computeCardRewardStatus(card: CardItem): RewardStatus | null {
  if (typeof window === 'undefined') return null;

  const slug = extractBusinessSlug(card.href);
  if (!slug) return null;

  const business = getBusinessSync(slug);
  const rules = getBusinessLoyaltyRulesSync(slug);
  const wallet = getCustomerWalletSync(DEMO_CUSTOMER_ID, slug);
  if (!business || !rules || !wallet) return null;

  const config = loadDemoSimulatorConfig(slug, card.localName || business.name, rules, wallet);
  const { rules: resolvedRules, wallet: resolvedWallet } = applyDemoConfigToEntities(
    config,
    rules,
    wallet
  );

  const businessName = config.businessName?.trim() || card.localName || business.name;
  const href = card.href || `/local/${slug}`;

  const readyVoucher = (resolvedWallet.vouchers || []).find((v) => v.status === 'ready');
  if (readyVoucher) {
    return {
      type: 'ready',
      href,
      businessName,
      rewardTitle: readyVoucher.rewardTitle,
      badgeText: '¡Premio listo!',
      detail: `${readyVoucher.rewardTitle} en ${businessName}`
    };
  }

  const sortedMilestones = [...resolvedRules.rewardMilestones].sort(
    (a, b) => a.stampThreshold - b.stampThreshold
  );
  const nextMilestone = sortedMilestones.find((m) => m.stampThreshold > resolvedWallet.currentStamps);

  if (nextMilestone) {
    const stampsLeft = nextMilestone.stampThreshold - resolvedWallet.currentStamps;
    if (stampsLeft === 1 || stampsLeft === 2) {
      return {
        type: 'close',
        href,
        businessName,
        rewardTitle: nextMilestone.rewardTitle,
        stampsLeft,
        badgeText: stampsLeft === 1 ? 'A solo 1 sello' : 'A solo 2 sellos',
        detail: `${nextMilestone.rewardTitle} en ${businessName}`
      };
    }
  }

  return null;
}

/**
 * Estado consolidado del premio a anunciar en el hub: el primero que
 * encuentre en orden de prioridad (primero los listos, luego los cercanos).
 */
export function computeRewardStatus(cards: CardItem[]): RewardStatus {
  if (typeof window === 'undefined') return null;

  for (const card of cards) {
    const status = computeCardRewardStatus(card);
    if (status) return status;
  }

  return null;
}

/**
 * Suscriptor del almacenamiento del simulador.
 *
 * El estado se deriva de `localStorage`, una fuente externa. Se suscribe a sus
 * cambios con `useSyncExternalStore` en lugar de copiarlo a un estado propio
 * dentro de un efecto, que provocaba un render en cascada.
 */
const subscribeToStorage = (onStoreChange: () => void) => {
  window.addEventListener('storage', onStoreChange);
  return () => window.removeEventListener('storage', onStoreChange);
};

/**
 * Clave de contenido del estado.
 *
 * `useSyncExternalStore` exige que `getSnapshot` devuelva siempre la misma
 * referencia mientras el estado no cambia. Como el estado se construye de cero
 * en cada llamada, el resultado se cachea y sólo se renueva cuando cambia esta
 * clave; de lo contrario React entra en un loop infinito.
 */
const statusCache = { key: '', status: null as RewardStatus };

const getRewardStatus = (cards: CardItem[]): RewardStatus => {
  const next = computeRewardStatus(cards);
  const key = next
    ? `${next.type}|${next.href}|${next.businessName}|${next.rewardTitle}|${next.badgeText}|${next.detail}`
    : 'none';

  if (key !== statusCache.key) {
    statusCache.key = key;
    statusCache.status = next;
  }

  return statusCache.status;
};

/**
 * Hook que expone el estado de premio del hub.
 *
 * En el servidor devuelve `null` para que el HTML inicial coincida con la
 * hidratación; el dato real aparece apenas monta el cliente.
 */
export function useRewardStatus(cards: CardItem[]): RewardStatus {
  return useSyncExternalStore(
    subscribeToStorage,
    () => getRewardStatus(cards),
    () => null
  );
}

export default useRewardStatus;
