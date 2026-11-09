'use client';

import React from 'react';
import { LocalFooterSummaryProps } from '@/types/loyalty';

/**
 * LocalFooterSummary: Franja horizontal inferior fija en pantalla.
 * Presenta la identidad del local, dirección, botón de mapa y métrica de sellos.
 * Desacoplado: recibe únicamente props puras conformes al esquema oficial.
 */
export const LocalFooterSummary: React.FC<LocalFooterSummaryProps> = ({
  businessName,
  address,
  currentStamps,
  stampsToNextReward = 3,
  nextRewardTitle,
  locationUrl,
  cooldownRemainingMinutes,
  readyVoucher,
  onClaimReward,
  redeemedVoucher,
  onViewRedeemedCode,
  className = ''
}) => {
  return (
    <footer
      className={`fixed bottom-0 left-0 right-0 z-40 bg-white border-t border-neutral-100 shadow-[0_-4px_20px_rgba(0,0,0,0.06)] ${className}`}
    >
      <div className="w-full max-w-md mx-auto px-5 py-3.5 flex items-center justify-between gap-4">
        {/* Columna Izquierda: Identidad y Ubicación */}
        <div className="flex flex-col min-w-0 flex-1">
          <div className="flex items-center gap-1.5">
            <h2 className="text-[17px] font-extrabold text-neutral-900 tracking-tight truncate">
              {businessName}
            </h2>
            {locationUrl && (
              <a
                href={locationUrl}
                target="_blank"
                rel="noopener noreferrer"
                title="Ver ubicación en Google Maps"
                aria-label={`Ver ubicación de ${businessName} en Google Maps`}
                className="p-1 text-neutral-500 hover:text-black hover:bg-neutral-100 rounded-full transition-colors flex-shrink-0"
              >
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
                  <circle cx="12" cy="10" r="3" />
                </svg>
              </a>
            )}
          </div>
          <p className="text-[13px] text-neutral-500 truncate mt-0.5 font-medium">
            {address}
          </p>
        </div>

        {/* Columna Derecha: Sellos Actuales y Zona de Notificaciones Dinámica */}
        <div className="flex flex-col items-end flex-shrink-0 gap-1.5 max-w-[55%]">
          {/* Badge métrico de sellos (permanente) */}
          <div className="h-8 inline-flex items-center gap-1.5 bg-neutral-950 text-white px-3.5 rounded-full shadow-sm">
            <span className="text-[13px] font-black tracking-tight">{currentStamps}</span>
            <span className="text-[13px] font-semibold text-neutral-300">Sellos</span>
          </div>

          {/* Zona de Notificaciones Dinámica (Misma altura h-8 y texto 13px) */}
          <div className="flex items-center justify-end min-h-[32px] w-full">
            {/* ESTADO ACCIÓN: Hay voucher listo para reclamar (Misma altura h-8, texto 13px, blanco con borde negro, ancho acotado y truncate) */}
            {readyVoucher ? (
              <button
                type="button"
                data-tour="claim-reward-cta-btn"
                onClick={onClaimReward}
                className="h-8 inline-flex items-center gap-1.5 px-3 rounded-full bg-white border border-neutral-950 text-neutral-950 text-[12.5px] font-bold tracking-tight shadow-2xs hover:bg-neutral-50 active:scale-95 transition-all select-none max-w-full"
                aria-label={`Reclamar premio: ${readyVoucher.rewardTitle}`}
              >
                <span className="w-1.5 h-1.5 rounded-full bg-neutral-950 flex-shrink-0" />
                <span className="truncate">Reclamar {readyVoucher.rewardTitle}</span>
              </button>
            ) : redeemedVoucher ? (
              /* ESTADO CANJEADO: el token sigue vigente, se puede volver a ver el código */
              <button
                type="button"
                onClick={onViewRedeemedCode}
                className="h-8 inline-flex items-center gap-1.5 px-3 rounded-full bg-neutral-950 text-white text-[12.5px] font-bold tracking-tight shadow-2xs hover:bg-neutral-800 active:scale-95 transition-all select-none max-w-full"
                aria-label={`Ver mi código de ${redeemedVoucher.rewardTitle}`}
              >
                <span className="w-1.5 h-1.5 rounded-full bg-white flex-shrink-0" />
                <span className="truncate">Ver mi código</span>
              </button>
            ) : cooldownRemainingMinutes && cooldownRemainingMinutes > 0 ? (
              /* ESTADO COOLDOWN: En enfriamiento tras compra reciente */
              <p className="text-[12px] font-bold text-neutral-600 tracking-tight truncate">
                Disponible en {Math.floor(cooldownRemainingMinutes / 60)}:{String(cooldownRemainingMinutes % 60).padStart(2, '0')} hs
              </p>
            ) : stampsToNextReward > 0 ? (
              /* ESTADO MOTIVACIÓN: Cuenta regresiva al próximo hito */
              <p className="text-[12px] font-bold text-neutral-600 tracking-tight truncate">
                A {stampsToNextReward} de {nextRewardTitle || 'premio'}
              </p>
            ) : (
              /* ESTADO META MÁXIMA */
              <p className="text-[12px] font-bold text-neutral-950 tracking-tight">
                Camino completado
              </p>
            )}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default LocalFooterSummary;
