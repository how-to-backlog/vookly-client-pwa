'use client';

import React from 'react';

export interface WalletSectionHeaderProps {
  /** Cantidad de tarjetas visibles en la vista actual. */
  totalCards: number;
  /** `true` cuando hay un rubro seleccionado y la lista está filtrada. */
  isFiltered?: boolean;
  /** Cantidad total de tarjetas disponibles antes de filtrar. */
  totalAvailable?: number;
}

/**
 * WalletSectionHeader: Bloque Lego modular que rotula la sección
 * de la billetera.
 *
 * El rótulo es una etiqueta de sección, no un título: el saludo de la
 * pantalla ya ocupa el nivel de título. Por eso va en peso medio, con
 * tracking positivo y color apagado — cualquier peso extra lo haría competir
 * con el saludo en lugar de accompanyarlo.
 *
 * El contador aparece sólo cuando la vista está filtrada, donde el dato
 * importa ("2 de 4"). Sin filtro no aporta nada que las propias tarjetas no
 * digan, así que no ocupa espacio ni atención.
 */
export const WalletSectionHeader: React.FC<WalletSectionHeaderProps> = ({
  totalCards,
  isFiltered = false,
  totalAvailable
}) => {
  const showCount = isFiltered && typeof totalAvailable === 'number';

  return (
    <div className="px-5 pt-5 pb-1 flex justify-between items-baseline gap-2 select-none">
      <h2 className="text-[13px] font-light uppercase tracking-[0.12em] text-neutral-800 font-sans">
        Tus tarjetas
      </h2>
      {showCount ? (
        <span className="text-[13px] font-light text-neutral-800 tabular-nums font-sans">
          {totalCards} de {totalAvailable}
        </span>
      ) : null}
    </div>
  );
};

export default WalletSectionHeader;
