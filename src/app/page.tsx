'use client';

import { useState } from 'react';

import { TopBar } from '@/components/TopBar';
import { HomeGreeting } from '@/components/home/HomeGreeting';
import { RewardFab } from '@/components/home/RewardFab';
import { WalletSectionHeader } from '@/components/home/WalletSectionHeader';
import { CategoryFilterBar } from '@/components/home/CategoryFilterBar';
import { useCategoryFilter } from '@/components/home/useCategoryFilter';
import { useRewardStatus } from '@/components/home/useRewardStatus';
import { AuroraBackdrop } from '@/components/home/AuroraBackdrop';
import { AuroraResetButton } from '@/components/home/AuroraResetButton';
import { CardContainer, DEFAULT_CARDS } from '@/components/cards/CardContainer';

export default function Home() {
  const { selected, setSelected, visibleCards } = useCategoryFilter(DEFAULT_CARDS);
  // Cada incremento remonta la aurora y reinicia su animación de entrada.
  const [auroraKey, setAuroraKey] = useState(0);
  // El estado de premio se resuelve una vez y se reparte entre el mensaje del
  // saludo y la acción flotante: la vista no vuelve a derivar los datos.
  const rewardStatus = useRewardStatus(DEFAULT_CARDS);

  return (
    <div className="h-screen bg-neutral-100 flex justify-center overflow-hidden">
      {/* Shell Móvil Centrado */}
      <main className="w-full max-w-md h-screen bg-transparent relative isolate flex flex-col overflow-hidden shadow-2xl">
        {/* Fondo vivo: la aurora ocupa toda la superficie detrás del contenido */}
        <AuroraBackdrop key={auroraKey} />

        <div className="relative z-10 flex flex-col h-full min-h-0">
          {/* 1. Cabecera Minimalista */}
          <TopBar
            variant="bare"
            action={<AuroraResetButton onReset={() => setAuroraKey(key => key + 1)} />}
          />

          {/* 2. Saludo Contextual por Horario + mensaje dinámico de premio */}
          <HomeGreeting reward={rewardStatus} />

          {/* 3. Encabezado de la Sección de Billetera */}
          <WalletSectionHeader
            totalCards={visibleCards.length}
            isFiltered={selected !== 'all'}
            totalAvailable={DEFAULT_CARDS.length}
          />

          {/* 4. Filtro por rubro del comercio */}
          <CategoryFilterBar value={selected} onChange={setSelected} />

          {/* 5. Contenedor Modular de Tarjetas (ScrollStack) */}
          <div className="flex-1 w-full bg-transparent min-h-0">
            <CardContainer cards={visibleCards} stackKey={selected} />
          </div>
        </div>

        {/* 6. Acción flotante del premio (presentacional, sólo si hay premio) */}
        <RewardFab status={rewardStatus} />
      </main>
    </div>
  );
}
