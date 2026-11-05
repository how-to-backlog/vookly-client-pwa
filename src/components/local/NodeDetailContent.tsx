'use client';

import React, { useState } from 'react';
import { InteractiveNodeSelection, VoucherTokenEntity } from '@/types/loyalty';
import { formatExpirationDate, formatFullDateTime } from '@/lib/loyaltyRules';
import { StampNodeBubble } from './StampNodeBubble';
import { RedemptionChoreography } from './RedemptionChoreography';

export interface NodeDetailContentProps {
  selection: InteractiveNodeSelection;
  businessName?: string;
  /** Requests a fresh redemption token. Returns the issued 4-digit code. */
  onRequestToken?: () => Promise<VoucherTokenEntity | null>;
  /** Token already issued for this reward, if it is still valid. */
  existingToken?: VoucherTokenEntity | null;
  /** Called when the redemption token expires and the reward becomes claimable again. */
  onTokenExpired?: () => void;
  /**
   * Escena con la que abre el detalle. El padre la usa para abrir directo en
   * la coreografía cuando el cliente pide "Ver mi código" desde el footer:
   * el botón dice "ver el código", así que no debe obligar a un paso extra.
   */
  initialScene?: 'info' | 'warning' | 'active_token';
  onSceneChange?: (scene: 'info' | 'warning' | 'active_token') => void;
  className?: string;
}

/**
 * NodeDetailContent: Renderizado desacoplado de la zona media del Bottom Sheet.
 *
 * Implementa estrictamente la jerarquía agnóstica solicitada:
 * 1. A la izquierda: burbuja idéntica a la del Roadmap (con la palabra "sello" debajo).
 * 2. A la derecha: estructura limpia según los 5 arquetipos:
 *    - Arquetipo 1 (Sello regular obtenido): "Reclamaste este sello el día DD/MM/AAAA a las HH:MM hs"
 *    - Arquetipo 2 (Sello regular pendiente): "Sello pendiente. Te faltan X sellos para llegar hasta acá"
 *    - Arquetipo 3 (Premio ya canjeado): Nombre del producto + badge "Ya canjeado" + "Lo disfrutaste el día DD/MM/AAAA a las HH:MM hs"
 *    - Arquetipo 4 (Premio listo para reclamar): Nombre del producto + badge "Válido hasta DD/MM/AAAA" + Botón "Reclamar premio"
 *    - Arquetipo 5 (Premio futuro bloqueado): Nombre del producto + "Te faltan X sellos para reclamarlo"
 * 3. Flujo de Canje seguro: gate de mostrador -> coreografía de tres momentos
 *    (M1 rasgar el ticket, M2 presentar el premio, M3 mostrar el código de 4 dígitos).
 */
export function NodeDetailContent({
  selection,
  businessName = 'este local',
  onRequestToken,
  existingToken = null,
  onTokenExpired,
  initialScene = 'info',
  onSceneChange,
  className = ''
}: NodeDetailContentProps) {
  // Sub-estados para el flujo de canje seguro: 'info' | 'warning' | 'active_token'
  const [redemptionStep, setRedemptionStep] = useState<'info' | 'warning' | 'active_token'>(
    initialScene
  );

  const changeScene = (nextScene: 'info' | 'warning' | 'active_token') => {
    setRedemptionStep(nextScene);
    onSceneChange?.(nextScene);
  };

  // -------------------------------------------------------------
  // VISTA ESPECIAL 1: COREOGRAFÍA DE CANJE (M1 tear -> M2 premio -> M3 código)
  // -------------------------------------------------------------
  if (redemptionStep === 'active_token') {
    return (
      <RedemptionChoreography
        rewardTitle={selection.rewardTitle || 'Premio'}
        stamps={selection.stampIndex}
        businessName={businessName}
        onRequestToken={onRequestToken ?? (async () => null)}
        existingToken={existingToken}
        onTokenExpired={onTokenExpired}
        className={className}
      />
    );
  }

  // -------------------------------------------------------------
  // VISTA ESPECIAL 2: ADVERTENCIA PREVENTIVA DE APERTURA FRENTE A CAJA
  // -------------------------------------------------------------
  if (redemptionStep === 'warning') {
    return (
      <div className={`relative flex flex-col text-center items-center pt-2 pb-2 ${className}`}>
        {/* Pregunta centrada con el nombre del local */}
        <h4 className="text-[17px] font-black text-neutral-900 tracking-tight mb-5">
          ¿Estás frente al mostrador de {businessName}?
        </h4>

        {/* Botones de acción contenidos que abarcan su texto */}
        <div className="flex flex-col items-center gap-2 w-full">
          <button
            type="button"
            onClick={() => changeScene('active_token')}
            className="inline-flex items-center justify-center px-6 py-2 rounded-full bg-neutral-950 hover:bg-neutral-800 text-white font-bold text-[13px] shadow-2xs active:scale-95 transition-all"
          >
            Sí, quiero mi premio
          </button>
          <button
            type="button"
            onClick={() => changeScene('info')}
            className="inline-flex items-center justify-center px-4 py-1.5 text-neutral-500 hover:text-black font-medium text-[13px] transition-colors"
          >
            No, volver atrás
          </button>
        </div>
      </div>
    );
  }

  // -------------------------------------------------------------
  // VISTA PRINCIPAL: ESTRUCTURA DE 5 ARQUETIPOS AGNÓSTICOS
  // -------------------------------------------------------------
  const isCompleted =
    selection.interactiveState === 'regular_completed' ||
    selection.interactiveState === 'current_position' ||
    selection.interactiveState === 'reward_ready' ||
    selection.interactiveState === 'reward_cooldown' ||
    selection.interactiveState === 'reward_redeemed';

  // Fecha y hora formateada de la transacción real si existe
  const transactionTime = formatFullDateTime(selection.transaction?.createdAt);
  const redeemedTime = formatFullDateTime(selection.voucher?.redeemedAt);

  return (
    <div className={`flex flex-col text-left pt-0 pb-1 ${className}`}>
      {/* Zona Media: Fila con Burbuja a la izquierda y Contenido a la derecha */}
      <div
        className={`flex gap-3.5 ${
          selection.interactiveState === 'regular_completed' ||
          selection.interactiveState === 'current_position' ||
          selection.interactiveState === 'reward_ready' ||
          selection.interactiveState === 'reward_cooldown'
            ? 'items-center'
            : 'items-start'
        }`}
      >
        {/* Burbuja idéntica al Roadmap */}
        <StampNodeBubble
          stampIndex={selection.stampIndex}
          isCompleted={isCompleted}
          isReward={selection.isReward}
        />

        {/* Bloque descriptivo a la derecha según el arquetipo */}
        <div className="flex-1 min-w-0">
          {/* ARQUETIPO 1: Sello regular superado (sin premio) - centrado verticalmente con la burbuja */}
          {selection.interactiveState === 'regular_completed' || selection.interactiveState === 'current_position' ? (
            <p className="text-[13.5px] text-neutral-700 font-medium leading-snug">
              Reclamaste este sello el día{' '}
              <strong className="font-bold text-neutral-900">
                {transactionTime.date || 'recientemente'}
              </strong>{' '}
              a las{' '}
              <strong className="font-bold text-neutral-900">
                {transactionTime.time || '10:00 hs'}
              </strong>
            </p>
          ) : null}

          {/* ARQUETIPO 2: Sello regular pendiente (sin premio) */}
          {selection.interactiveState === 'regular_locked' ? (
            <div className="flex flex-col gap-0.5 pt-0.5">
              <span className="text-[14px] font-bold text-neutral-900">
                Sello pendiente
              </span>
              <p className="text-[13px] text-neutral-500 font-medium">
                ¡Estás a {selection.stampsRemaining} {selection.stampsRemaining === 1 ? 'sello' : 'sellos'} de conseguirlo!
              </p>
            </div>
          ) : null}

          {/* ARQUETIPO 3: Premio ya canjeado */}
          {selection.interactiveState === 'reward_redeemed' ? (
            <div className="flex flex-col gap-1 pt-0.5">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-[15px] font-black text-neutral-900 tracking-tight">
                  {selection.rewardTitle}
                </span>
                <span className="inline-flex items-center px-2 py-0.5 rounded-full bg-neutral-100 text-neutral-600 text-[10px] font-bold tracking-tight">
                  Ya canjeado
                </span>
              </div>
              <p className="text-[13px] text-neutral-500 font-medium leading-snug">
                Lo disfrutaste el día{' '}
                <strong className="font-bold text-neutral-800">
                  {redeemedTime.date || 'en tu visita anterior'}
                </strong>{' '}
                a las{' '}
                <strong className="font-bold text-neutral-800">
                  {redeemedTime.time || '12:00 hs'}
                </strong>
              </p>
              {/* Con el token todavía vigente, el cliente puede volver a ver
                  su código: el canje ya ocurrió, solo falta mostrarlo. */}
              {existingToken && (
                <button
                  type="button"
                  onClick={() => changeScene('active_token')}
                  className="mt-1 self-start inline-flex items-center justify-center px-4 py-2 rounded-full bg-neutral-950 hover:bg-neutral-800 text-white font-bold text-[12px] shadow-2xs active:scale-95 transition-all flex-shrink-0 whitespace-nowrap"
                >
                  Ver mi código
                </button>
              )}
            </div>
          ) : null}

          {/* ARQUETIPO 4: Premio listo para reclamar (o en cooldown) - título completo sin truncar */}
          {selection.interactiveState === 'reward_ready' || selection.interactiveState === 'reward_cooldown' ? (
            <div className="flex items-center justify-between gap-3">
              <div className="flex flex-col gap-1 min-w-0 flex-1">
                <span className="text-[15.5px] font-black text-neutral-900 tracking-tight leading-snug break-words">
                  {selection.rewardTitle}
                </span>

                {selection.interactiveState === 'reward_ready' ? (
                  <div className="inline-flex items-center gap-1.5 self-start px-2 py-0.5 rounded-full bg-neutral-100 text-neutral-700 text-[10.5px] font-semibold tracking-tight">
                    <span>Válido hasta {formatExpirationDate(selection.voucher?.expiresAt)}</span>
                  </div>
                ) : (
                  <div className="inline-flex items-center gap-1.5 self-start px-2 py-0.5 rounded-full bg-neutral-100 text-neutral-700 text-[10.5px] font-semibold tracking-tight">
                    <span>Disponible en {selection.cooldownRemainingMinutes ? `${Math.floor(selection.cooldownRemainingMinutes / 60)}:${String(selection.cooldownRemainingMinutes % 60).padStart(2, '0')} hs` : '3:00 hs'}</span>
                  </div>
                )}
              </div>

              {/* Botón Reclamar premio en la zona derecha.
                  El token NO se emite acá: se pide después de rasgar el ticket,
                  para que la ventana de 15 minutos arranque cuando el cliente ve el código. */}
              {selection.interactiveState === 'reward_ready' && (
                <button
                  type="button"
                  onClick={() => changeScene('warning')}
                  className="inline-flex items-center justify-center px-4 py-2 rounded-full bg-neutral-950 hover:bg-neutral-800 text-white font-bold text-[12px] shadow-2xs active:scale-95 transition-all flex-shrink-0 whitespace-nowrap"
                >
                  Reclamar premio
                </button>
              )}
            </div>
          ) : null}

          {/* ARQUETIPO 5: Premio futuro bloqueado */}
          {selection.interactiveState === 'reward_locked' ? (
            <div className="flex flex-col gap-0.5 pt-0.5">
              <span className="text-[15px] font-black text-neutral-900 tracking-tight">
                {selection.rewardTitle}
              </span>
              <p className="text-[13px] text-neutral-500 font-medium">
                Te faltan {selection.stampsRemaining} {selection.stampsRemaining === 1 ? 'sello' : 'sellos'} para reclamarlo.
              </p>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
}

export default NodeDetailContent;
