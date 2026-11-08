'use client';

import React from 'react';
import { motion, useReducedMotion } from 'motion/react';
import { CategoryIcon, CATEGORY_PALETTE, type CategoryIconName } from '@/components/icons/CategoryIcon';

export interface CategoryCardSurfaceProps {
  /** Categoría cuyo icono y paleta se usan. */
  name: CategoryIconName;
  /** Identificador de la tarjeta */
  cardId?: string;
  /** Nombre del local comercial */
  localName?: string;
  /** Sellos acumulados */
  stamps?: number;
  /** Sellos totales */
  totalStamps?: number;
  /** Título del próximo premio */
  nextRewardTitle?: string;
  /** Si tiene premio listo para canjear en mostrador */
  hasReadyReward?: boolean;
  /** Lado del icono en píxeles. */
  iconSize?: number;
  /** Color de fondo opcional para diferenciar tarjetas del mismo nicho. */
  backgroundColor?: string;
  /** Color de trazo opcional para el icono. */
  inkColor?: string;
  /** Cuando es true la superficie se ve atenuada (comercio no disponible). */
  muted?: boolean;
  className?: string;
  /** Contenido opcional para el footer. */
  footer?: React.ReactNode;
}

export const CategoryCardSurface: React.FC<CategoryCardSurfaceProps> = ({
  name,
  cardId,
  localName,
  stamps,
  totalStamps,
  nextRewardTitle,
  hasReadyReward = false,
  iconSize = 56,
  backgroundColor,
  inkColor,
  muted = false,
  className = '',
  footer
}) => {
  const reducedMotion = useReducedMotion();
  const palette = CATEGORY_PALETTE[name];
  if (!palette) return null;

  const bg = backgroundColor || palette.background;
  const ink = inkColor || palette.ink;

  const showStamps = typeof stamps === 'number' && typeof totalStamps === 'number';

  // Tarjeta 1: Coffee Shop
  const isCoffeeShop = cardId === '1';
  // Tarjeta 2: Café Roma (segunda tarjeta del nicho cafeterías)
  const isCafeRoma = cardId === '1-b';

  return (
    <div
      className={`relative h-full w-full overflow-hidden flex flex-col justify-between p-6 select-none ${className}`.trim()}
      style={{
        backgroundColor: bg,
        opacity: muted ? 0.6 : 1
      }}
    >
      {/* Patrón 1: Hexágonos (Hero Patterns) en Coffee Shop */}
      {isCoffeeShop && (
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 z-0 opacity-80"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='28' height='49' viewBox='0 0 28 49'%3E%3Cg fill-rule='evenodd'%3E%3Cg id='hexagons' fill='%23601bcf' fill-opacity='0.2' fill-rule='nonzero'%3E%3Cpath d='M13.99 9.25l13 7.5v15l-13 7.5L1 31.75v-15l12.99-7.5zM3 17.9v12.7l10.99 6.34 11-6.35V17.9l-11-6.34L3 17.9zM0 15l12.98-7.5V0h-2v6.35L0 12.69v2.3zm0 18.5L12.98 41v8h-2v-6.85L0 35.81v-2.3zM15 0v7.5L27.99 15H28v-2.31h-.01L17 6.35V0h-2zm0 49v-8l12.99-7.5H28v2.31h-.01L17 42.15V49h-2z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
          }}
        />
      )}

      {/* Patrón 2: Cuadrifolios geométricos adaptados en Café Roma con tono café profundo y opacidad suave */}
      {isCafeRoma && (
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 z-0 opacity-70"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='80' height='88' viewBox='0 0 80 88' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M22 21.91V26h-2c-9.94 0-18 8.06-18 18 0 9.943 8.058 18 18 18h2v4.09c8.012.722 14.785 5.738 18 12.73 3.212-6.99 9.983-12.008 18-12.73V62h2c9.94 0 18-8.06 18-18 0-9.943-8.058-18-18-18h-2v-4.09c-8.012-.722-14.785-5.738-18-12.73-3.212 6.99-9.983 12.008-18 12.73zM54 58v4.696c-5.574 1.316-10.455 4.428-14 8.69-3.545-4.262-8.426-7.374-14-8.69V58h-5.993C12.27 58 6 51.734 6 44c0-7.732 6.275-14 14.007-14H26v-4.696c5.574-1.316 10.455-4.428 14-8.69 3.545 4.262 8.426 7.374 14 8.69V30h5.993C67.73 30 74 36.266 74 44c0 7.732-6.275 14-14.007 14H54zM42 88c0-9.94 8.06-18 18-18h2v-4.09c8.016-.722 14.787-5.738 18-12.73v7.434c-3.545 4.262-8.426 7.374-14 8.69V74h-5.993C52.275 74 46 80.268 46 88h-4zm-4 0c0-9.943-8.058-18-18-18h-2v-4.09c-8.012-.722-14.785-5.738-18-12.73v7.434c3.545 4.262 8.426 7.374 14 8.69V74h5.993C27.73 74 34 80.266 34 88h4zm4-88c0 9.943 8.058 18 18 18h2v4.09c8.012.722 14.785 5.738 18 12.73v-7.434c-3.545-4.262-8.426-7.374-14-8.69V14h-5.993C52.27 14 46 7.734 46 0h-4zM0 34.82c3.213-6.992 9.984-12.008 18-12.73V18h2c9.94 0 18-8.06 18-18h-4c0 7.732-6.275 14-14.007 14H14v4.696c-5.574 1.316-10.455 4.428-14 8.69v7.433z' fill='%234a2810' fill-opacity='0.16' fill-rule='evenodd'/%3E%3C/svg%3E")`
          }}
        />
      )}

      {/*
        EFECTO RESPLANDOR (SHIMMER) EXCLUSIVO:
        Se activa únicamente si la tarjeta tiene un premio listo para canjear.
      */}
      {hasReadyReward && !reducedMotion && (
        <motion.div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 z-10 w-full h-full"
          style={{
            background:
              'linear-gradient(105deg, transparent 25%, rgba(255,255,255,0.48) 50%, transparent 75%)'
          }}
          animate={{
            x: ['-130%', '160%']
          }}
          transition={{
            duration: 2.4,
            repeat: Infinity,
            repeatDelay: 2.2,
            ease: 'easeInOut'
          }}
        />
      )}

      {/* FILA SUPERIOR: Insignia 'Premio Listo' (si aplica) e Icono del Rubro a la derecha */}
      <div className="relative z-20 flex items-start justify-between w-full">
        <div className="flex-1 pr-3">
          {hasReadyReward ? (
            <motion.div
              initial={{ opacity: 0, y: -4 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-neutral-900/90 text-white shadow-sm backdrop-blur-sm"
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
              </span>
              <span className="text-[11px] font-semibold tracking-wide uppercase">¡Premio listo!</span>
            </motion.div>
          ) : (
            <div className="h-5" />
          )}
        </div>

        {/* Icono vectorial temático del rubro en esquina superior derecha */}
        <div className="pointer-events-none shrink-0" style={{ color: ink }}>
          <CategoryIcon name={name} size={iconSize} stroke={ink} strokeWidth={1.5} />
        </div>
      </div>

      {/* ZONA INFERIOR: Nombre del local + Contador de sellos y próximo premio */}
      <div className="relative z-20 flex flex-col gap-1.5 mt-auto">
        {localName && (
          <h3
            className="text-[22px] font-bold tracking-[-0.02em] leading-tight line-clamp-1"
            style={{ color: ink }}
          >
            {localName}
          </h3>
        )}

        {showStamps && (
          <div className="flex items-center gap-2 flex-wrap">
            {/* Chip de progreso de sellos */}
            <div
              className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[12px] font-semibold tabular-nums border shadow-2xs"
              style={{
                backgroundColor: 'rgba(255, 255, 255, 0.72)',
                borderColor: 'rgba(0, 0, 0, 0.08)',
                color: ink
              }}
            >
              {stamps} de {totalStamps} sellos
            </div>

            {/* Próximo premio sutil */}
            {nextRewardTitle && (
              <span
                className="text-[11.5px] font-medium opacity-80 truncate max-w-[190px]"
                style={{ color: ink }}
              >
                • Próximo: {nextRewardTitle}
              </span>
            )}
          </div>
        )}
      </div>

      {footer && <div className="relative z-20 w-full">{footer}</div>}
    </div>
  );
};

export default CategoryCardSurface;
