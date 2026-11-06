'use client';

import React from 'react';
import { ArrowUpDown } from 'lucide-react';

export interface WalletSectionHeaderProps {
  /** Cantidad total de tarjetas cargadas en la billetera */
  totalCards: number;
}

/**
 * WalletSectionHeader: Bloque Lego modular que rotula la sección
 * de la billetera e instruye sutilmente la interacción de scroll vertical.
 */
export const WalletSectionHeader: React.FC<WalletSectionHeaderProps> = ({ totalCards }) => {
  return (
    <div className="px-5 pt-3 pb-1 flex items-center justify-between select-none">
      <div className="flex items-center gap-2">
        <h2 className="text-base font-bold tracking-tight text-neutral-900">
          Tus tarjetas
        </h2>
        <span className="text-xs font-bold text-neutral-500 bg-neutral-100 px-2 py-0.5 rounded-full border border-neutral-200/60">
          {totalCards}
        </span>
      </div>

      <div className="flex items-center gap-1 text-[11.5px] font-medium text-neutral-400">
        <ArrowUpDown className="w-3.5 h-3.5" />
        <span>Deslizá</span>
      </div>
    </div>
  );
};

export default WalletSectionHeader;
