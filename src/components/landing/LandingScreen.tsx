'use client';

import React, { useMemo, useState } from 'react';
import { ChevronRight } from 'lucide-react';

import LandingBackdrop from '@/components/landing/LandingBackdrop';
import MerchantOnboardingSheet, {
  type MerchantOnboardingValues
} from '@/components/landing/MerchantOnboardingSheet';
import { PitchCard } from '@/components/landing/PitchCard';
import { Stack } from '@/components/registry/Stack';
import { GradientText } from '@/components/registry/GradientText';
import { usePageTransition } from '@/components/transition/TransitionProvider';
import { LANDING_PITCH_MESSAGES } from '@/data/landingContent';
import { saveDemoSimulatorConfig } from '@/services/demoSimulatorStorage';
import type { DemoSimulatorConfig } from '@/types/loyalty';

const CARD_BLUE_THEMES = [
  { bg: '#172554', ink: '#e0f2fe' }, // Azul Zafiro
  { bg: '#1e3a8a', ink: '#f0fdfa' }, // Azul Cobalto
  { bg: '#1e1b4b', ink: '#ede9fe' }, // Azul Índigo
  { bg: '#0f172a', ink: '#e2e8f0' }, // Azul Medianoche
  { bg: '#1e293b', ink: '#f8fafc' }, // Azul Acero
  { bg: '#164e63', ink: '#ecfeff' }  // Azul Petróleo
];

export function LandingScreen() {
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const { triggerTransition } = usePageTransition();

  const cardsWithColors = useMemo(() => {
    return LANDING_PITCH_MESSAGES.map((message, index) => {
      const theme = CARD_BLUE_THEMES[index % CARD_BLUE_THEMES.length];
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
    <div className="relative h-screen w-full overflow-hidden bg-[#070d24]">
      {/* Fondo vivo: Aurora fluida sin franjas laterales */}
      <LandingBackdrop />

      <main className="relative z-10 mx-auto flex h-full w-full max-w-md flex-col justify-between px-6 pb-10 pt-20">
        {/* Cabecera: Marca "vookly." en escala hero y con buen aire vertical */}
        <div className="shrink-0 w-full text-center pt-6 pb-2">
          <h1 className="text-[54px] sm:text-[62px] font-black tracking-[-0.045em] text-white leading-none font-sans drop-shadow-xl select-none">
            vookly<span className="text-sky-400">.</span>
          </h1>
        </div>

        {/* Zona Central: Stack Cuadrado Compacto en Gama de Azules */}
        <div className="my-auto flex items-center justify-center w-full py-1">
          <div className="w-full max-w-[270px] aspect-square ml-4">
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
              radius={26}
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

        {/*
          Zona Inferior:
          1. Badge "Demo" centrado en el espacio intermedio entre las tarjetas y "Personaliza tu local".
             Degradado animado exclusivo de 2 colores: blanco (#ffffff) y azul del fondo (#38bdf8), con peso font-black.
          2. Botones de acción vertical centrados.
        */}
        <div className="shrink-0 flex flex-col items-center justify-center w-full gap-5 pb-1">
          {/* Badge "Demo" con contorno redondo, más bold y centrado entre tarjetas y botón */}
          <div className="flex items-center justify-center w-full">
            <GradientText
              colors={['#ffffff', '#38bdf8']}
              animationSpeed={3}
              showBorder={true}
              className="text-[13.5px] font-black tracking-[0.05em] px-4.5 py-1"
            >
              Demo
            </GradientText>
          </div>

          {/* Acciones de Navegación Inferiores */}
          <nav className="flex flex-col items-center justify-center gap-2.5 w-full">
            <button
              type="button"
              onClick={() => setIsSheetOpen(true)}
              className="inline-flex items-center justify-center gap-1.5 px-5 py-2 rounded-full bg-white/10 hover:bg-white/15 border border-white/20 text-[13.5px] font-medium text-white transition-all active:scale-95 shadow-sm backdrop-blur-xs"
            >
              Personaliza tu local
              <ChevronRight className="h-3.5 w-3.5 opacity-80" />
            </button>
            <button
              type="button"
              onClick={handleSkip}
              className="flex items-center justify-center gap-1 text-[13px] font-normal text-white/60 hover:text-white/90 transition-colors py-0.5"
            >
              Omitir este paso
              <ChevronRight className="h-3 w-3 opacity-60" />
            </button>
          </nav>
        </div>
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
