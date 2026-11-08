'use client';

import React, { useState } from 'react';
import { ChevronRight } from 'lucide-react';

import LandingBackdrop from '@/components/landing/LandingBackdrop';
import MerchantOnboardingSheet, {
  type MerchantOnboardingValues
} from '@/components/landing/MerchantOnboardingSheet';
import { PitchCard } from '@/components/landing/PitchCard';
import { Stack } from '@/components/registry/Stack';
import { usePageTransition } from '@/components/transition/TransitionProvider';
import { LANDING_PITCH_MESSAGES, LANDING_TITLE } from '@/data/landingContent';
import { saveDemoSimulatorConfig } from '@/services/demoSimulatorStorage';
import type { DemoSimulatorConfig } from '@/types/loyalty';

/**
 * Landing de la demo: Aurora azul, mensaje de bienvenida, pila cuadrada de pitches
 * y los dos caminos de navegación (personalizar el local u omitir e ir al hub).
 */
export function LandingScreen() {
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const { triggerTransition } = usePageTransition();

  const handleSubmit = (
    values: MerchantOnboardingValues,
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    const config: DemoSimulatorConfig = {
      businessName: values.businessName,
      categoryIcon: values.category,
      tiers: [
        {
          id: 'tier-1',
          stampsFromPrevious: values.stampsRequired,
          rewardTitle: values.rewardTitle
        }
      ],
      simulatedCurrentStamps: 1,
      rewardTitle: values.rewardTitle,
      stampsRequired: values.stampsRequired,
      onboardingCompleted: true,
      completedAt: new Date().toISOString()
    };

    saveDemoSimulatorConfig(values.category, config);
    setIsSheetOpen(false);
    triggerTransition(event, '/hub');
  };

  const handleSkip = (event: React.MouseEvent<HTMLButtonElement>) => {
    setIsSheetOpen(false);
    triggerTransition(event, '/hub');
  };

  return (
    <div className="relative h-screen w-full overflow-hidden bg-[#050b26]">
      <LandingBackdrop />

      <main className="relative z-10 mx-auto flex h-full w-full max-w-md flex-col justify-between px-5 pb-8 pt-12">
        {/* Cabecera de Bienvenida */}
        <div className="shrink-0">
          <h1 className="text-[34px] font-normal leading-[1.1] tracking-[-0.03em] text-neutral-100 font-sans antialiased">
            {LANDING_TITLE}
          </h1>
        </div>

        {/*
          Contenedor del Stack Cuadrado:
          - Centrado verticalmente en el viewport.
          - Con aspect-square (1:1) y ancho máximo de 310px para asegurar proporción cuadrada exacta en móviles.
        */}
        <div className="my-auto flex items-center justify-center w-full py-4">
          <div className="w-full max-w-[310px] aspect-square">
            <Stack
              cards={LANDING_PITCH_MESSAGES.map((message) => (
                <PitchCard key={message} message={message} />
              ))}
              layout="cascade"
              visible={5}
              spread={0.8}
              depth={0.12}
              radius={28}
              frame={0}
              frameColor="transparent"
              shadow
              tilt={30}
              threshold={70}
              speed={0.65}
              sendToBackOnClick={false}
              autoplay
              autoplayDelay={5200}
              pauseOnHover
            />
          </div>
        </div>

        {/* Acciones de Navegación Inferiores */}
        <nav className="shrink-0 flex items-center justify-between gap-4 pt-2">
          <button
            type="button"
            onClick={() => setIsSheetOpen(true)}
            className="flex items-center gap-1 text-[14px] font-medium text-white transition-opacity hover:opacity-80 active:scale-98"
          >
            Personaliza tu local
            <ChevronRight className="h-4 w-4" />
          </button>
          <button
            type="button"
            onClick={handleSkip}
            className="flex items-center gap-1 text-[14px] font-medium text-white/70 transition-opacity hover:opacity-100 active:scale-98"
          >
            Omitir este paso
            <ChevronRight className="h-4 w-4" />
          </button>
        </nav>
      </main>

      <MerchantOnboardingSheet
        isOpen={isSheetOpen}
        onClose={() => setIsSheetOpen(false)}
        onSubmit={handleSubmit}
        onSkip={handleSkip}
      />
    </div>
  );
}

export default LandingScreen;
