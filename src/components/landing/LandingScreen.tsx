'use client';

import React, { useMemo, useState } from 'react';
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
 * Paleta exacta de los 8 comercios de la billetera:
 * - Cafeterías: Coffee Shop (#f3e2d0 / #6f4423), Café Roma (#dfc2a6 / #4a2810)
 * - Barberías: La Barbería Club (#dce3ec / #3c4959), Barber Studio (#b8c7db / #172554)
 * - Heladerías: Heladería del Parque (#f9dbe5 / #a83b63), Gelato & Co. (#d1ecd9 / #1b5e32)
 * - Panaderías: La Espiga (#f7e7c6 / #8a6420), Masa Madre Bakery (#e6c594 / #583a0a)
 */
const CARD_COLOR_THEMES = [
  { bg: '#f3e2d0', ink: '#6f4423' }, // Cafetería A
  { bg: '#dce3ec', ink: '#3c4959' }, // Barbería A
  { bg: '#f9dbe5', ink: '#a83b63' }, // Heladería A
  { bg: '#f7e7c6', ink: '#8a6420' }, // Panadería A
  { bg: '#d1ecd9', ink: '#1b5e32' }, // Heladería B
  { bg: '#b8c7db', ink: '#172554' }, // Barbería B
  { bg: '#dfc2a6', ink: '#4a2810' }, // Cafetería B
  { bg: '#e6c594', ink: '#583a0a' }  // Panadería B
];

export function LandingScreen() {
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const { triggerTransition } = usePageTransition();

  // Asigna de forma determinista y variada un tema de color a cada mensaje
  const cardsWithColors = useMemo(() => {
    return LANDING_PITCH_MESSAGES.map((message, index) => {
      const theme = CARD_COLOR_THEMES[index % CARD_COLOR_THEMES.length];
      return { message, ...theme };
    });
  }, []);

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

      <main className="relative z-10 mx-auto flex h-full w-full max-w-md flex-col justify-between px-6 pb-8 pt-12">
        {/* Cabecera de Bienvenida */}
        <div className="shrink-0">
          <h1 className="text-[34px] font-normal leading-[1.1] tracking-[-0.03em] text-neutral-100 font-sans antialiased">
            {LANDING_TITLE}
          </h1>
        </div>

        {/*
          Contenedor del Stack Cuadrado Compacto:
          - Ancho reducido a 260px (aspect-square) para que las tarjetas de atrás
            queden contenidas holgadamente dentro de la pantalla sin tocar ni traspasar el borde izquierdo.
          - `spread={0.35}`: tarjetas mucho más juntas, revelando el filo superior-izquierdo completo.
          - `visible={4}`: muestra hasta 4 cartas apiladas con escala suave (depth 0.08).
        */}
        <div className="my-auto flex items-center justify-center w-full py-2">
          {/*
            Margen izquierdo compensatorio `ml-4` para que el stack en cascada (-x)
            quede visualmente centrado en la pantalla y el borde izquierdo respire al 100%.
          */}
          <div className="w-full max-w-[260px] aspect-square ml-4">
            <Stack
              cards={cardsWithColors.map((card) => (
                <PitchCard
                  key={card.message}
                  message={card.message}
                  backgroundColor={card.bg}
                  inkColor={card.ink}
                />
              ))}
              layout="cascade"
              visible={4}
              spread={0.35}
              depth={0.08}
              radius={24}
              frame={0}
              frameColor="transparent"
              shadow
              tilt={22}
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
