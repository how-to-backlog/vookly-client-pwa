'use client';

import { useSyncExternalStore } from 'react';
import type { CardItem } from '@/components/cards/CardContainer';
import {
  computeCardRewardStatus,
  type RewardStatus
} from '@/components/home/useRewardStatus';

/**
 * Cola priorizada de mensajes de premio para la cartelera del hub.
 *
 * Ordenamiento de la cartelera (regla de negocio T77):
 *  1. Todos los premios listos para retirar (los más antiguos primero).
 *  2. Las tarjetas a solo 1 sello del próximo premio.
 *  3. Las tarjetas a 2 sellos.
 *
 * Dentro de cada grupo se conserva el orden determinístico de la fila de
 * tarjetas (el historial más viejo aparece antes en la lista), que actúa como
 * proxy estable de antigüedad para esta demo.
 */
export function computeRewardStatusQueue(cards: CardItem[]): RewardStatus[] {
  if (typeof window === 'undefined') return [];

  const ready: RewardStatus[] = [];
  const oneStampLeft: RewardStatus[] = [];
  const twoStampsLeft: RewardStatus[] = [];

  for (const card of cards) {
    const status = computeCardRewardStatus(card);
    if (!status) continue;

    if (status.type === 'ready') {
      ready.push(status);
    } else if (status.type === 'close' && status.stampsLeft === 1) {
      oneStampLeft.push(status);
    } else if (status.type === 'close' && status.stampsLeft === 2) {
      twoStampsLeft.push(status);
    }
  }

  return [...ready, ...oneStampLeft, ...twoStampsLeft];
}

/**
 * Suscriptor del almacenamiento del simulador: la cola se deriva de
 * `localStorage`, igual que `useRewardStatus`. Se comparte el evento
 * `storage` para reaccionar tanto a cambios entre pestañas como a los
 * despachos propios del simulador en la misma pestaña.
 */
const subscribeToStorage = (onStoreChange: () => void) => {
  if (typeof window === 'undefined') return () => {};
  window.addEventListener('storage', onStoreChange);
  return () => window.removeEventListener('storage', onStoreChange);
};

/**
 * `useSyncExternalStore` exige un snapshot referencialmente estable: la cola
 * se cachea y sólo se reconstruye cuando cambia su huella de contenido.
 */
const queueCache = { key: '', queue: [] as RewardStatus[] };

const getQueueSnapshot = (cards: CardItem[]): RewardStatus[] => {
  const next = computeRewardStatusQueue(cards);
  const key = next
    .map((s) => `${s?.type}|${s?.businessName}|${s?.rewardTitle}|${s?.type === 'close' ? s.stampsLeft : 0}`)
    .join('||');

  if (key !== queueCache.key) {
    queueCache.key = key;
    queueCache.queue = next;
  }

  return queueCache.queue;
};

const EMPTY_QUEUE: RewardStatus[] = [];
const getServerSnapshot = () => EMPTY_QUEUE;

/**
 * Hook que expone la cola completa de mensajes del hub.
 *
 * En el servidor devuelve una lista vacía referencialmente estable para
 * evitar re-renders y cumplir con la regla de getServerSnapshot de React.
 */
export function useRewardStatusQueue(cards: CardItem[]): RewardStatus[] {
  return useSyncExternalStore(
    subscribeToStorage,
    () => getQueueSnapshot(cards),
    getServerSnapshot
  );
}

export default useRewardStatusQueue;
