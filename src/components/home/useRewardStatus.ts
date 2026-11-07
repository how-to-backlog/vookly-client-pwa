'use client';

import { useSyncExternalStore } from 'react';
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
 * Deriva el estado de premio a partir del almacenamiento del simulador.
 *
 * Vive fuera del componente que lo muestra para que la vista sea
 * presentacional: recibe el estado ya resuelto y no sabe de dónde sale.
 */
export function computeRewardStatus(cards: CardItem[]): RewardStatus {
  if (typeof window === 'undefined') return null;

  const cafeteriaCard = cards.find((c) => c.href === '/local/cafeteria');
  if (!cafeteriaCard) return null;

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

  const businessName = config.businessName || MOCK_BUSINESS_CAFETERIA.name;

  const readyVoucher = (wallet.vouchers || []).find((v) => v.status === 'ready');
  if (readyVoucher) {
    return {
      type: 'ready',
      href: '/local/cafeteria',
      businessName,
      rewardTitle: readyVoucher.rewardTitle,
      badgeText: '¡Premio listo!',
      detail: `${readyVoucher.rewardTitle} en ${businessName}`
    };
  }

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
        businessName,
        rewardTitle: nextMilestone.rewardTitle,
        stampsLeft,
        badgeText: stampsLeft === 1 ? 'A solo 1 sello' : 'A solo 2 sellos',
        detail: `para ganar ${nextMilestone.rewardTitle} en ${businessName}`
      };
    }
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
