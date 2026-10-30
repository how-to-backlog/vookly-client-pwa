/**
 * Utilidades puras para el cálculo de guardarraíles y temporizadores de fidelización.
 * Desacoplado: cero React, cero DOM.
 */

export interface CooldownCalculation {
  isCoolingDown: boolean;
  remainingMinutes: number;
  formattedRemaining: string; // ej: "2:45 hs"
}

/**
 * Calcula si el cliente se encuentra dentro de la ventana de enfriamiento.
 * Toma las horas de cooldown configuradas por el comercio (por defecto 3h).
 *
 * @param lastStampAt Fecha ISO de la última compra donde sumó sello
 * @param cooldownHours Horas de enfriamiento fijadas por la política del local (ej: 3)
 * @param now Fecha actual opcional (por defecto Date.now())
 */
export function calculateCooldown(
  lastStampAt?: string,
  cooldownHours = 3,
  now = new Date()
): CooldownCalculation {
  if (!lastStampAt) {
    return {
      isCoolingDown: false,
      remainingMinutes: 0,
      formattedRemaining: ''
    };
  }

  const lastStampTime = new Date(lastStampAt).getTime();
  if (Number.isNaN(lastStampTime)) {
    return {
      isCoolingDown: false,
      remainingMinutes: 0,
      formattedRemaining: ''
    };
  }

  const cooldownEndTime = lastStampTime + cooldownHours * 60 * 60 * 1000;
  const diffMs = cooldownEndTime - now.getTime();

  if (diffMs <= 0) {
    return {
      isCoolingDown: false,
      remainingMinutes: 0,
      formattedRemaining: ''
    };
  }

  const remainingMinutes = Math.ceil(diffMs / (60 * 1000));
  const hours = Math.floor(remainingMinutes / 60);
  const minutes = remainingMinutes % 60;

  return {
    isCoolingDown: true,
    remainingMinutes,
    formattedRemaining: `${hours}:${String(minutes).padStart(2, '0')} hs`
  };
}

/**
 * Formatea una fecha y hora exacta a formato legible latinoamericano (ej: "18/10/2026 a las 10:15 hs").
 */
export function formatFullDateTime(isoTimestamp?: string): { date: string; time: string; full: string } {
  if (!isoTimestamp) return { date: '', time: '', full: '' };
  const d = new Date(isoTimestamp);
  if (Number.isNaN(d.getTime())) return { date: '', time: '', full: '' };

  const date = d.toLocaleDateString('es-AR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric'
  });

  const hours = String(d.getHours()).padStart(2, '0');
  const minutes = String(d.getMinutes()).padStart(2, '0');
  const time = `${hours}:${minutes} hs`;

  return {
    date,
    time,
    full: `${date} a las ${time}`
  };
}

/**
 * Formatea una fecha de vencimiento a formato latinoamericano legible (ej: "15/11/2026").
 */
export function formatExpirationDate(expiresAt?: string): string {
  if (!expiresAt) return '';
  const date = new Date(expiresAt);
  if (Number.isNaN(date.getTime())) return '';
  return date.toLocaleDateString('es-AR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric'
  });
}

import {
  RoadmapNodePoint,
  RoadmapNodeInteractiveState,
  InteractiveNodeSelection,
  CustomerWalletStatus
} from '@/types/loyalty';

/**
 * Resuelve determinísticamente cuál de los 7 estados interactivos corresponde a un nodo.
 */
export function resolveNodeInteractiveState(
  node: RoadmapNodePoint,
  walletStatus: CustomerWalletStatus,
  cooldownCalc?: CooldownCalculation
): {
  interactiveState: RoadmapNodeInteractiveState;
  voucher?: RoadmapNodePoint['voucher'];
  transaction?: RoadmapNodePoint['transaction'];
  cooldownRemainingMinutes?: number;
  stampsRemaining?: number;
  label: string;
  description: string;
} {
  const currentStamps = walletStatus.currentStamps;
  const isCurrentPosition = node.stampIndex === currentStamps && node.stampIndex > 0;
  const cooldown = cooldownCalc || calculateCooldown(walletStatus.lastStampAt);

  // Registro de transacción asociado si el sello ya fue obtenido
  const transaction = walletStatus.transactions?.find((t) => t.stampIndex === node.stampIndex);

  // Caso A: Hito de Premio
  if (node.isReward) {
    const title = node.rewardTitle || `Premio Sello ${node.stampIndex}`;
    const voucher = walletStatus.vouchers?.find((v) => v.milestoneStamp === node.stampIndex);

    // Premio futuro bloqueado
    if (node.stampIndex > currentStamps) {
      const remaining = node.stampIndex - currentStamps;
      return {
        interactiveState: 'reward_locked',
        stampsRemaining: remaining,
        label: `Sello ${node.stampIndex}: ${title}`,
        description: `Bloqueado. Te faltan ${remaining} ${remaining === 1 ? 'sello' : 'sellos'} para alcanzarlo.`
      };
    }

    // Premio alcanzado: verificar voucher histórico o estado actual
    if (voucher?.status === 'redeemed') {
      return {
        interactiveState: 'reward_redeemed',
        voucher,
        transaction,
        label: `Sello ${node.stampIndex}: ${title}`,
        description: `Premio canjeado en tu visita anterior.`
      };
    }

    // Premio alcanzado pero congelado por cooldown
    if (cooldown.isCoolingDown) {
      return {
        interactiveState: 'reward_cooldown',
        voucher,
        transaction,
        cooldownRemainingMinutes: cooldown.remainingMinutes,
        label: `Sello ${node.stampIndex}: ${title}`,
        description: `Premio alcanzado. Disponible para canjear en ${cooldown.formattedRemaining}.`
      };
    }

    // Premio alcanzado y listo para canjear
    return {
      interactiveState: 'reward_ready',
      voucher,
      transaction,
      label: `Sello ${node.stampIndex}: ${title}`,
      description: `Premio desbloqueado. Listo para reclamar en el mostrador.`
    };
  }

  // Caso B: Sello Regular Intermedio
  if (isCurrentPosition) {
    return {
      interactiveState: 'current_position',
      transaction,
      label: `Sello ${node.stampIndex} (Tu posición actual)`,
      description: `Acá estás en tu camino. Sumaste ${currentStamps} ${currentStamps === 1 ? 'sello' : 'sellos'}.`
    };
  }

  if (node.stampIndex < currentStamps) {
    return {
      interactiveState: 'regular_completed',
      transaction,
      label: `Sello ${node.stampIndex}`,
      description: `Sello completado en una compra anterior.`
    };
  }

  const remaining = node.stampIndex - currentStamps;
  return {
    interactiveState: 'regular_locked',
    stampsRemaining: remaining,
    label: `Sello ${node.stampIndex}`,
    description: `Sello pendiente. Te faltan ${remaining} ${remaining === 1 ? 'sello' : 'sellos'} para llegar.`
  };
}

/**
 * Crea el objeto enriquecido InteractiveNodeSelection listo para enviar a la página o modal.
 */
export function buildInteractiveNodeSelection(
  node: RoadmapNodePoint,
  walletStatus: CustomerWalletStatus
): InteractiveNodeSelection {
  const resolved = resolveNodeInteractiveState(node, walletStatus);

  return {
    stampIndex: node.stampIndex,
    point: node.point,
    isReward: node.isReward,
    rewardTitle: node.rewardTitle,
    isMajorReward: node.isMajorReward,
    interactiveState: resolved.interactiveState,
    voucher: resolved.voucher,
    transaction: resolved.transaction,
    cooldownRemainingMinutes: resolved.cooldownRemainingMinutes,
    stampsRemaining: resolved.stampsRemaining,
    label: resolved.label,
    description: resolved.description
  };
}
