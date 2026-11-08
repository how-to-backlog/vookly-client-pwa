'use client';

import React from 'react';
import { motion, useReducedMotion } from 'motion/react';
import { CategoryIcon, CATEGORY_PALETTE, type CategoryIconName } from '@/components/icons/CategoryIcon';
import { HERO_PATTERNS_CATALOG } from '@/data/cardPatternsRegistry';

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
  /** Identificador de Hero Pattern (de los 12 oficiales). Si no se pasa, toma formalInvitation */
  patternId?: string;
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
  patternId = 'formalInvitation',
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

  // Obtener la definición del patrón de los 12 oficiales de Hero Patterns
  const patternItem = HERO_PATTERNS_CATALOG[patternId] || HERO_PATTERNS_CATALOG.formalInvitation;
  const patternBgUrl = patternItem.getSvgUrl(ink, 0.18);

  return (
    <div
      className={`relative h-full w-full overflow-hidden flex flex-col justify-between p-6 select-none ${className}`.trim()}
      style={{
        backgroundColor: bg,
        opacity: muted ? 0.6 : 1
      }}
    >
      {/*
        PATRÓN HERO PATTERNS:
        Inyecta dinámicamente el inkColor del comercio y se repite sin interrupción.
      */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-0 opacity-75"
        style={{
          backgroundSize: patternItem.backgroundSize,
          backgroundRepeat: 'repeat',
          backgroundImage: patternBgUrl
        }}
      />

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
