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

  // 1. Tarjeta 1: Coffee Shop (Hexágonos púrpuras)
  const isCoffeeShop = cardId === '1';
  // 2. Tarjeta 2: Café Roma (Cuadrifolios moca)
  const isCafeRoma = cardId === '1-b';
  // 3. Tarjeta 3: La Barbería Club (Topografía / Ondas fluidas adaptadas al gris acero/azul)
  const isBarberiaClub = cardId === '3';

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

      {/* Patrón 2: Cuadrifolios geométricos en Café Roma */}
      {isCafeRoma && (
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 z-0 opacity-70"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='80' height='88' viewBox='0 0 80 88' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M22 21.91V26h-2c-9.94 0-18 8.06-18 18 0 9.943 8.058 18 18 18h2v4.09c8.012.722 14.785 5.738 18 12.73 3.212-6.99 9.983-12.008 18-12.73V62h2c9.94 0 18-8.06 18-18 0-9.943-8.058-18-18-18h-2v-4.09c-8.012-.722-14.785-5.738-18-12.73-3.212 6.99-9.983 12.008-18 12.73zM54 58v4.696c-5.574 1.316-10.455 4.428-14 8.69-3.545-4.262-8.426-7.374-14-8.69V58h-5.993C12.27 58 6 51.734 6 44c0-7.732 6.275-14 14.007-14H26v-4.696c5.574-1.316 10.455-4.428 14-8.69 3.545 4.262 8.426 7.374 14 8.69V30h5.993C67.73 30 74 36.266 74 44c0 7.732-6.275 14-14.007 14H54zM42 88c0-9.94 8.06-18 18-18h2v-4.09c8.016-.722 14.787-5.738 18-12.73v7.434c-3.545 4.262-8.426 7.374-14 8.69V74h-5.993C52.275 74 46 80.268 46 88h-4zm-4 0c0-9.943-8.058-18-18-18h-2v-4.09c-8.012-.722-14.785-5.738-18-12.73v7.434c3.545 4.262 8.426 7.374 14 8.69V74h5.993C27.73 74 34 80.266 34 88h4zm4-88c0 9.943 8.058 18 18 18h2v4.09c8.012.722 14.785 5.738 18 12.73v-7.434c-3.545-4.262-8.426-7.374-14-8.69V14h-5.993C52.27 14 46 7.734 46 0h-4zM0 34.82c3.213-6.992 9.984-12.008 18-12.73V18h2c9.94 0 18-8.06 18-18h-4c0 7.732-6.275 14-14.007 14H14v4.696c-5.574 1.316-10.455 4.428-14 8.69v7.433z' fill='%234a2810' fill-opacity='0.16' fill-rule='evenodd'/%3E%3C/svg%3E")`
          }}
        />
      )}

      {/* Patrón 3: Topografía vectorial en La Barbería Club (adaptado a color pizarra/acero con opacidad elegante) */}
      {isBarberiaClub && (
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 z-0 opacity-60"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='300' height='300' viewBox='0 0 600 600'%3E%3Cpath fill='%233c4959' fill-opacity='0.18' d='M600 325.1v-1.17c-6.5 3.83-13.06 7.64-14.68 8.64-10.6 6.56-18.57 12.56-24.68 19.09-5.58 5.95-12.44 10.06-22.42 14.15-1.45.6-2.96 1.2-4.83 1.9l-4.75 1.82c-9.78 3.75-14.8 6.27-18.98 10.1-4.23 3.88-9.65 6.6-16.77 8.84-1.95.6-3.99 1.17-6.47 1.8l-6.14 1.53c-5.29 1.35-8.3 2.37-10.54 3.78-3.08 1.92-6.63 3.26-12.74 5.03a384.1 384.1 0 0 1-4.82 1.36c-2.04.58-3.6 1.04-5.17 1.52a110.03 110.03 0 0 0-11.2 4.05c-2.7 1.15-5.5 3.93-8.78 8.4a157.68 157.68 0 0 0-6.15 9.2c-5.75 9.07-7.58 11.74-10.24 14.51a50.97 50.97 0 0 1-4.6 4.22c-2.33 1.9-10.39 7.54-11.81 8.74a14.68 14.68 0 0 0-3.67 4.15c-1.24 2.3-1.9 4.57-2.78 8.87-2.17 10.61-3.52 14.81-8.2 22.1-4.07 6.33-6.8 9.88-9.83 12.99-.47.48-.95.96-1.5 1.48l-3.75 3.56c-1.67 1.6-3.18 3.12-4.86 4.9a42.44 42.44 0 0 0-9.89 16.94c-2.5 8.13-2.72 15.47-1.76 27.22.47 5.82.51 6.36.51 8.18 0 10.51.12 17.53.63 25.78.24 4.05.56 7.8.97 11.22h.9c-1.13-9.58-1.5-21.83-1.5-37 0-1.86-.04-2.4-.52-8.26-.94-11.63-.72-18.87 1.73-26.85a41.44 41.44 0 0 1 9.65-16.55c1.67-1.76 3.18-3.27 4.83-4.85.63-.6 3.13-2.96 3.75-3.57a71.6 71.6 0 0 0 1.52-1.5c3.09-3.16 5.86-6.76 9.96-13.15 4.77-7.42 6.15-11.71 8.34-22.44.86-4.21 1.5-6.4 2.68-8.6.68-1.25 1.79-2.48 3.43-3.86 1.38-1.15 9.43-6.8 11.8-8.72 1.71-1.4 3.26-2.81 4.7-4.3 2.72-2.85 4.56-5.54 10.36-14.67a156.9 156.9 0 0 1 6.1-9.15c3.2-4.33 5.9-7.01 8.37-8.07 3.5-1.5 7.06-2.77 11.1-4.02a233.84 233.84 0 0 1 7.6-2.2l2.38-.67c6.19-1.79 9.81-3.16 12.98-5.15 2.14-1.33 5.08-2.33 10.27-3.65l6.14-1.53c2.5-.63 4.55-1.2 6.52-1.82 7.24-2.27 12.79-5.06 17.15-9.05 4.05-3.72 9-6.2 18.66-9.9l4.75-1.82c1.87-.72 3.39-1.31 4.85-1.91 10.1-4.15 17.07-8.32 22.76-14.4 6.05-6.45 13.95-12.4 24.49-18.92 1.56-.96 7.82-4.6 14.15-8.33v-64.58c-4 8.15-8.52 14.85-12.7 17.9-2.51 1.82-5.38 4.02-9.04 6.92a1063.87 1063.87 0 0 0-6.23 4.98l-1.27 1.02a2309.25 2309.25 0 0 1-4.87 3.9c-7.55 6-12.9 10.05-17.61 13.19-3.1 2.06-3.86 2.78-8.06 7.13-5.84 6.07-11.72 8.62-29.15 10.95-11.3 1.5-20.04 4.91-30.75 11.07-1.65.94-7.27 4.27-6.97 4.1-2.7 1.58-4.69 2.69-6.64 3.66-5.63 2.8-10.47 4.17-15.71 4.17-17.13 0-41.44 11.51-51.63 22.83-12.05 13.4-31.42 27.7-45.25 31.16-7.4 1.85-11.85 7.05-14.04 14.69-1.26 4.4-1.58 8.28-1.58 13.82 0 .82.01.98.24 3.63.45 5.18.35 8.72-.77 13.26-1.53 6.2-4.89 12.6-10.59 19.43-13.87 16.65-22.88 46.58-22.88 71.68 0 2.39.02 4.26.06 8.75.12 10.8.1 15.8-.22 21.95-.56 11.18-2.09 20.73-5 29.3h-1.05c2.94-8.56 4.49-18.12 5.05-29.35.31-6.13.34-11.1.22-21.9-.04-4.48-.06-6.36-.06-8.75 0-25.32 9.07-55.47 23.12-72.32 5.6-6.72 8.88-12.99 10.38-19.03 1.09-4.4 1.18-7.85.74-12.93-.23-2.7-.24-2.86-.24-3.72 0-5.62.32-9.57 1.62-14.1 2.28-7.95 6.97-13.44 14.76-15.39 13.6-3.4 32.82-17.59 44.75-30.84C409 360.14 433.58 348.5 451 348.5c5.07 0 9.77-1.33 15.26-4.07 1.93-.96 3.9-2.05 6.58-3.62-.3.18 5.33-3.16 6.98-4.11 10.82-6.21 19.66-9.67 31.11-11.2 17.23-2.3 22.9-4.75 28.57-10.64 4.25-4.41 5.04-5.16 8.22-7.28 4.68-3.11 10.01-7.14 17.55-13.14a1113.33 1113.33 0 0 0 4.86-3.89l1.28-1.02a4668.54 4668.54 0 0 1 6.23-4.98c3.67-2.9 6.55-5.12 9.07-6.95 4.37-3.19 9.16-10.56 13.29-19.4v66.9z'/%3E%3C/svg%3E")`
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
