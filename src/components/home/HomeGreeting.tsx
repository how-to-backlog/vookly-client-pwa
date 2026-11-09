'use client';

import React, { useSyncExternalStore } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'motion/react';
import type { RewardStatus } from '@/components/home/useRewardStatus';

export interface HomeGreetingProps {
  /** Override opcional de hora para pruebas unitarias o demos forzadas */
  forcedHour?: number;
  /**
   * Estado de premio del hub. Cuando existe, el subtítulo pasa del copy
   * estático al mensaje dinámico con el premio y el comercio.
   */
  reward?: RewardStatus;
}

/**
 * Determina el saludo según la franja horaria local.
 * 06:00 a 12:59 -> ¡Buen día!
 * 13:00 a 19:59 -> ¡Buenas tardes!
 * 20:00 a 05:59 -> ¡Buenas noches!
 */
export function getGreetingText(hour: number): string {
  if (hour >= 6 && hour < 13) return '¡Buen día!';
  if (hour >= 13 && hour < 20) return '¡Buenas tardes!';
  return '¡Buenas noches!';
}

/**
 * Suscriptor de la hora local.
 *
 * La hora es un dato del entorno que sólo existe en el cliente: leerla durante
 * el prerender rompe el build y, en el cliente, generaría una discrepancia
 * de hidratación. `useSyncExternalStore` resuelve ambas cosas de una: el
 * servidor entrega un snapshot estable y el cliente se suscribe a la hora real
 * después de hidratar.
 */
const subscribeToClock = (onStoreChange: () => void) => {
  const interval = window.setInterval(onStoreChange, 60_000);
  return () => window.clearInterval(interval);
};

const getClockSnapshot = () => new Date().getHours();
const getServerClockSnapshot = () => 12;

/**
 * HomeGreeting: Bloque Lego modular que saluda según el horario local
 * e incluye el copy activador sin inventar identidades personales.
 */
export const HomeGreeting: React.FC<HomeGreetingProps> = ({ forcedHour, reward }) => {
  const reducedMotion = useReducedMotion();
  const currentHour = useSyncExternalStore(
    subscribeToClock,
    getClockSnapshot,
    getServerClockSnapshot
  );
  const hour = forcedHour !== undefined ? forcedHour : currentHour;
  const greeting = getGreetingText(hour);

  // La parte "en {local}" se aísla como unidad atómica (whitespace-nowrap):
  // el navegador quiebra siempre ANTES de "en", nunca a mitad del nombre.
  // El producto también es indivisible (nowrap), así que los cortes de línea
  // sólo pueden ocurrir en las fronteras entre entidades: badges / producto /
  // "en local". Nunca a mitad de un nombre.
  const businessTail = reward?.businessName ? ` en ${reward.businessName}` : '';
  const rewardPrefix =
    reward && businessTail && reward.detail.endsWith(businessTail)
      ? reward.detail.slice(0, reward.detail.length - businessTail.length)
      : reward?.detail;
  // Separa el nombre del producto del prefijo restante, si lo hubiera
  const productPart = reward?.rewardTitle ?? '';
  const prefixPre =
    reward && productPart && rewardPrefix && rewardPrefix !== productPart
      ? rewardPrefix.slice(0, rewardPrefix.length - productPart.length)
      : '';

  return (
    <section className="px-5 pt-4 pb-0 select-none">
      <h1 className="text-[36px] font-normal tracking-[-0.03em] text-neutral-900 leading-[1.1] font-sans antialiased">
        {greeting}
      </h1>
      {/* Copy dinámico: footprint fijo de 2 líneas (min-h) para que el
          layout de abajo nunca salte al alternar mensajes de 1 o 2 líneas.
          Los grupos nowrap (producto / "en local") garantizan que jamás
          supere las 2 líneas y que los cortes caigan en fronteras limpias. */}
      <p
        data-tour="rotating-notifications"
        className="text-[14.5px] font-medium text-neutral-900 mt-4 mb-2 leading-[1.4] min-h-[2.8em]"
      >
        <AnimatePresence mode="wait" initial={false}>
          {reward ? (
            <motion.span
              key={`${reward.type}-${reward.businessName}-${reward.rewardTitle}-${reward.type === 'close' ? reward.stampsLeft : 0}`}
              initial={reducedMotion ? { opacity: 1 } : { opacity: 0, y: 6 }}
              animate={reducedMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
              exit={reducedMotion ? { opacity: 0 } : { opacity: 0, y: -6 }}
              transition={{ duration: 0.28, ease: [0.25, 1, 0.5, 1] }}
              className="inline-block"
            >
              {/* El punto convierte la línea en un aviso escaneable: el estado
                  manda (semibold + color) y el detalle acompaña. */}
              <motion.span
                aria-hidden="true"
                className={`inline-block h-[7px] w-[7px] rounded-full align-middle mr-1.5 ${
                  reward.type === 'ready' ? 'bg-emerald-500' : 'bg-amber-500'
                }`}
                initial={reducedMotion ? { opacity: 1 } : { opacity: 0, scale: 0.4 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={
                  reducedMotion
                    ? { duration: 0.12 }
                    : { duration: 0.32, ease: [0.25, 1, 0.5, 1] }
                }
              />
              <span
                className={`font-semibold ${
                  reward.type === 'ready' ? 'text-emerald-600' : 'text-amber-600'
                }`}
              >
                {reward.badgeText}
              </span>{' '}
              <span className="text-neutral-600">
                {prefixPre}
                {reward && productPart && (
                  <span className="whitespace-nowrap">{productPart}</span>
                )}
                {reward && businessTail && (
                  <span className="whitespace-nowrap">{businessTail}</span>
                )}
              </span>
            </motion.span>
          ) : (
            <motion.span
              key="default-copy"
              initial={reducedMotion ? { opacity: 1 } : { opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.28 }}
            >
              ¿Qué premios vas a canjear hoy?
            </motion.span>
          )}
        </AnimatePresence>
      </p>
    </section>
  );
};

export default HomeGreeting;
