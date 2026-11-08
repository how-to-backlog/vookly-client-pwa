'use client';

import { useEffect, useState } from 'react';
import type { RewardStatus } from '@/components/home/useRewardStatus';

/** Cada cuánto ms gira la cartelera entre mensajes (T77: unos pocos segundos). */
const ROTATION_INTERVAL_MS = 6000;

/**
 * useRotatingRewardMessage: cartelera giratoria de la zona de notificaciones.
 *
 * Recorre la cola de mensajes de a uno por vez, cíclicamente. Devuelve
 * siempre el mensaje vigente (o `null` si la cola está vacía, en cuyo caso
 * la vista muestra el copy por defecto).
 *
 * Pausa por cortesía: los intervalos se detienen mientras la pestaña está
 * oculta (`document.visibilitychange`, Page Visibility API) para no quemar
 * battery ni renders en segundo plano; al volver a ser visible el ciclo
 * retoma limpio desde donde iba.
 */
export function useRotatingRewardMessage(messages: RewardStatus[]): RewardStatus | null {
  const [index, setIndex] = useState(0);

  // El índice se re-ingresa si la cola se acorta por un cambio de estado.
  const safeIndex = messages.length > 0 ? Math.min(index, messages.length - 1) : 0;

  useEffect(() => {
    // Con 0 o 1 mensaje no hay rotación: nada que programar.
    if (messages.length <= 1) {
      setIndex(0);
      return;
    }

    let timer: number | undefined;

    const stop = () => {
      if (timer !== undefined) {
        window.clearInterval(timer);
        timer = undefined;
      }
    };

    const start = () => {
      stop();
      timer = window.setInterval(() => {
        // Pausa por cortesía: si la pestaña está oculta no avanza la cartelera.
        if (document.visibilityState === 'hidden') return;
        setIndex((i) => (i + 1) % messages.length);
      }, ROTATION_INTERVAL_MS);
    };

    const handleVisibility = () => {
      if (document.visibilityState === 'hidden') {
        stop();
      } else {
        start();
      }
    };

    start();
    document.addEventListener('visibilitychange', handleVisibility);
    return () => {
      stop();
      document.removeEventListener('visibilitychange', handleVisibility);
    };
  }, [messages.length]);

  // Si la cola cambia de contenido mientras el ciclo corre, el índice seguro
  // de arriba lo re-ingresa al rango válido. El mensaje vigente deriva de la
  // referencia actual de la cola.
  return messages.length > 0 ? messages[safeIndex] ?? null : null;
}

export default useRotatingRewardMessage;
