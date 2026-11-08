'use client';

import { Suspense, useState, useTransition } from 'react';
import { useSearchParams } from 'next/navigation';
import { TopBar } from '@/components/TopBar';
import { HomeGreeting } from '@/components/home/HomeGreeting';
import { RewardFab } from '@/components/home/RewardFab';
import { WalletSectionHeader } from '@/components/home/WalletSectionHeader';
import { CategoryFilterBar } from '@/components/home/CategoryFilterBar';
import { useCategoryFilter } from '@/components/home/useCategoryFilter';
import { useRewardStatus } from '@/components/home/useRewardStatus';
import { useDynamicCards } from '@/components/home/useDynamicCards';
import { AuroraBackdrop } from '@/components/home/AuroraBackdrop';
import { CardContainer } from '@/components/cards/CardContainer';
import { MerchantDirectoryModal } from '@/components/home/MerchantDirectoryModal';
import type { CategoryFilterValue } from '@/components/home/useCategoryFilter';

function HubContent() {
  const searchParams = useSearchParams();
  const categoryParam = searchParams.get('category') as CategoryFilterValue | null;

  // Las 8 tarjetas ahora se resuelven dinámicamente con reactividad al simulador y al Onboarding
  const dynamicCards = useDynamicCards();

  // Si vino de personalizar su local con ?category=barberia, arranca preseleccionado en ese nicho
  const initialCategory: CategoryFilterValue =
    categoryParam && ['cafeteria', 'barberia', 'heladeria', 'panaderia'].includes(categoryParam)
      ? categoryParam
      : 'all';

  const { selected, setSelected, visibleCards } = useCategoryFilter(dynamicCards, initialCategory);
  const [isDirectoryOpen, setIsDirectoryOpen] = useState(false);

  // El estado de premio se resuelve una vez y se reparte entre el saludo y la acción flotante
  const rewardStatus = useRewardStatus(dynamicCards);

  return (
    <div className="h-screen bg-neutral-100 flex justify-center overflow-hidden">
      {/* Shell Móvil Centrado */}
      <main className="w-full max-w-md h-screen bg-transparent relative isolate flex flex-col overflow-hidden shadow-2xl">
        {/* Fondo vivo: la aurora ocupa toda la superficie detrás del contenido */}
        <AuroraBackdrop />

        <div className="relative z-10 flex flex-col h-full min-h-0">
          {/* 1. Cabecera Minimalista */}
          <TopBar variant="bare" />

          {/* 2. Saludo Contextual por Horario + mensaje dinámico de premio */}
          <HomeGreeting reward={rewardStatus} />

          {/* 3. Encabezado de la Sección de Billetera */}
          <WalletSectionHeader
            totalCards={visibleCards.length}
            isFiltered={selected !== 'all'}
            totalAvailable={dynamicCards.length}
          />

          {/* 4. Filtro por rubro del comercio (con el nicho del comerciante activo por defecto) */}
          <CategoryFilterBar value={selected} onChange={setSelected} />

          {/* 5. Contenedor Modular de Tarjetas (ScrollStack) */}
          <div className="flex-1 w-full bg-transparent min-h-0">
            <CardContainer
              cards={visibleCards}
              stackKey={selected}
              activeCategory={selected}
              onOpenDirectory={() => setIsDirectoryOpen(true)}
            />
          </div>
        </div>

        {/* 6. Acción flotante del premio (presentacional, sólo si hay premio) */}
        <RewardFab status={rewardStatus} />

        {/* 7. Modal Bottom Sheet de Comercios Adheridos */}
        {isDirectoryOpen && (
          <MerchantDirectoryModal
            isOpen
            onClose={() => setIsDirectoryOpen(false)}
            initialCategory={selected}
          />
        )}
      </main>
    </div>
  );
}

export default function Hub() {
  return (
    <Suspense fallback={<div className="h-screen w-full bg-[#070d24]" />}>
      <HubContent />
    </Suspense>
  );
}
