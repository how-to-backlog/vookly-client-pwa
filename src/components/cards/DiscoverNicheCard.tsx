'use client';

import React from 'react';
import { ArrowRight } from 'lucide-react';
import type { CategoryIconName } from '@/components/icons/CategoryIcon';

export interface DiscoverNicheCardProps {
  /** Nicho comercial activo en el filtro actual, o undefined en 'Todos' */
  category?: CategoryIconName;
  /** Acción al hacer tap en la tarjeta para abrir el directorio */
  onOpenDirectory: () => void;
  className?: string;
}

const CATEGORY_NAMES: Record<CategoryIconName, string> = {
  cafeteria: 'cafeterías',
  heladeria: 'heladerías',
  barberia: 'barberías',
  panaderia: 'panaderías'
};

/**
 * DiscoverNicheCard: Tarjeta Lego interactiva de descubrimiento minimalista.
 * Se sitúa como ancla final del mazo invitando a sumar nuevos locales a la billetera.
 */
export const DiscoverNicheCard: React.FC<DiscoverNicheCardProps> = ({
  category,
  onOpenDirectory,
  className = ''
}) => {
  const targetText = category ? CATEGORY_NAMES[category] : 'comercios';

  return (
    <article
      onClick={onOpenDirectory}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onOpenDirectory();
        }
      }}
      aria-label={`Descubrir más ${targetText} adheridas a Vookly`}
      className={`relative h-full w-full rounded-[28px] border border-dashed border-neutral-300/80 bg-white/60 backdrop-blur-md p-6 flex flex-col justify-between cursor-pointer select-none active:scale-[0.98] hover:border-neutral-900 transition-all duration-150 overflow-hidden ${className}`.trim()}
    >
      {/* Rótulo superior minimalista alineado a la derecha */}
      <div className="flex items-center justify-end">
        <span className="text-[11px] font-black uppercase tracking-[0.12em] text-neutral-400">
          Red Vookly
        </span>
      </div>

      {/* Copy sobrio y directo */}
      <div className="flex flex-col gap-1.5">
        <h3 className="text-[19px] font-bold text-neutral-900 tracking-tight leading-snug">
          Sumate a más {targetText}
        </h3>
        <p className="text-[13px] font-normal text-neutral-500 leading-relaxed">
          Conocé nuestros comercios adheridos en donde también podés acumular premios con tus compras
        </p>
      </div>

      {/* Enlace sutil al pie alineado a la derecha */}
      <div className="flex items-center justify-end gap-1.5 pt-2">
        <span className="text-[12.5px] font-semibold text-neutral-900">
          Ver comercios adheridos
        </span>
        <ArrowRight className="w-4 h-4 text-neutral-700" strokeWidth={2} />
      </div>
    </article>
  );
};

export default DiscoverNicheCard;
