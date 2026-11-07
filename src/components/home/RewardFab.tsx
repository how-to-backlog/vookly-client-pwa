'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence, useReducedMotion } from 'motion/react';
import { Ticket } from 'lucide-react';
import type { RewardStatus } from '@/components/home/useRewardStatus';

export interface RewardFabProps {
  /** Estado de premio ya resuelto por `useRewardStatus`. */
  status: RewardStatus;
}

/** Cada cuántos ms se repite el halo como recordatorio. Única dial del aviso. */
const PULSE_CYCLE_MS = 60_000;

/** Duración del pulso: es un latido corto, no una transición de estado. */
const PULSE_DURATION_MS = 0.7;

/** Opacidad del primer pulso (anuncio) y de los siguientes (recordatorio). */
const PULSE_OPACITY_ANNOUNCE = 0.45;
const PULSE_OPACITY_REMINDER = 0.22;

/**
 * RewardFab: acción flotante del premio pendiente.
 *
 * Es presentacional: recibe el estado ya derivado y sólo lo representa. Los
 * datos (qué premio y en qué comercio) viven en el mensaje de `HomeGreeting`,
 * así el botón no repite copy y queda libre de comprimir texto en pantallas
 * angostas.
 *
 * El botón aparece únicamente cuando hay algo que anunciar o reclamable:
 * fuera de ese estado no queda cromo permanente sobre las tarjetas.
 *
 * El halo que expande y se apaga resuelve la distancia visual con el aviso
 * del saludo: el mensaje se lee arriba y el pulso tira la mirada hacia abajo,
 * hacia la acción. El primer pulso es el anuncio (más marcado); después el
 * halo vuelve cada `PULSE_CYCLE_MS` como recordatorio apagado, porque un
 * premio sin reclamar sigue ahí aunque nadie mire. Es un latido discreto, no
 * un loop de atención constante: con `prefers-reduced-motion` no hay halo.
 */
export const RewardFab: React.FC<RewardFabProps> = ({ status }) => {
  const reducedMotion = useReducedMotion();
  const [pulseKey, setPulseKey] = useState(0);

  // Reloj del recordatorio: el pulso se reprograma solo mientras haya premio.
  useEffect(() => {
    if (!status || reducedMotion) {
      return;
    }
    const timer = setInterval(() => setPulseKey(key => key + 1), PULSE_CYCLE_MS);
    return () => clearInterval(timer);
  }, [status, reducedMotion]);

  // Opción A: Desaparición condicional estricta.
  // El botón flotante SOLO se muestra cuando hay un premio listo para canjear.
  if (!status || status.type !== 'ready') {
    return null;
  }

  const isFirstPulse = pulseKey === 0;
  const label = `Canjear ${status.rewardTitle} en ${status.businessName}`;

  return (
    <AnimatePresence>
      <motion.div
        key={`ready-${status.rewardTitle}`}
        initial={{ opacity: 0, scale: reducedMotion ? 1 : 0.7, y: reducedMotion ? 0 : 16 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: reducedMotion ? 1 : 0.7, y: reducedMotion ? 0 : 16 }}
        transition={{ type: 'spring', stiffness: 320, damping: 24 }}
        className="absolute bottom-5 right-[30px] z-30"
      >
        <Link
          href={status.href}
          aria-label={label}
          title={label}
          className="relative z-10 flex w-14 h-14 items-center justify-center rounded-full text-white active:scale-95 transition-transform duration-150 bg-emerald-600 shadow-[5px_5px_16px_-2px_rgba(0,0,0,0.45)] overflow-hidden"
        >
          {/* Shimmer / Destello de luz diagonal continuo */}
          {!reducedMotion && (
            <motion.div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 z-20 w-full h-full"
              style={{
                background:
                  'linear-gradient(105deg, transparent 20%, rgba(255,255,255,0.45) 50%, transparent 80%)'
              }}
              animate={{
                x: ['-120%', '150%']
              }}
              transition={{
                duration: 2.2,
                repeat: Infinity,
                repeatDelay: 2.5,
                ease: 'easeInOut'
              }}
            />
          )}

          {/* Icono con meneo elástico (Ticket Wiggle) sin respiración */}
          <motion.div
            animate={
              reducedMotion
                ? { rotate: -12 }
                : {
                    rotate: [-12, 8, -16, 10, -12, -12]
                  }
            }
            transition={{
              duration: 2.2,
              repeat: Infinity,
              repeatDelay: 2.5,
              ease: 'easeInOut'
            }}
          >
            <Ticket className="w-6 h-6" aria-hidden="true" />
          </motion.div>
        </Link>
      </motion.div>
    </AnimatePresence>
  );
};

export default RewardFab;
