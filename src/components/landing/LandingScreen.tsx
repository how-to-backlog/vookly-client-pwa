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
import { buildOnboardingTiers } from '@/data/defaultNicheTiers';
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
    const tiers = buildOnboardingTiers(values.rewardTitle, values.stampsRequired, values.category);

    const config: DemoSimulatorConfig = {
      businessName: values.businessName,
      categoryIcon: values.category,
      tiers,
      simulatedCurrentStamps: 1,
      rewardTitle: values.rewardTitle,
      stampsRequired: values.stampsRequired,
      onboardingCompleted: true,
      completedAt: new Date().toISOString()
    };

    saveDemoSimulatorConfig(values.category, config);
    setIsSheetOpen(false);
    triggerTransition(event, `/hub?category=${values.category}`);
  };

  const handleSkip = (event: React.MouseEvent<HTMLButtonElement>) => {
    setIsSheetOpen(false);
    triggerTransition(event, '/hub');
  };

  return (
    <div className="relative h-screen w-full overflow-hidden bg-white">
      {/* Fondo vivo: Mismo Aurora claro de la Billetera sobre blanco */}
      <LandingBackdrop />

      {/* Badge "Demo" con degradado animado en blanco y azul (afecta tanto a texto como al contorno vivo) */}
      <div className="absolute top-6 right-5 z-20">
        <GradientText
          colors={['#ffffff', '#2563eb']}
          animationSpeed={3}
          showBorder={true}
          className="text-[12px] font-black tracking-[0.06em] px-3.5 py-1"
        >
          Demo
        </GradientText>
      </div>

      <main className="relative z-10 mx-auto flex h-full w-full max-w-md flex-col justify-between px-6 pb-10 pt-16">
        {/*
          Cabecera: Marca "vookly." aumentada un 10% (82px a 95px)
          y con posición más baja (pt-14 en el bloque para acercarse más al mazo)
        */}
        <div className="shrink-0 w-full text-center pt-14 pb-1">
          <h1 className="text-[82px] sm:text-[95px] font-black tracking-[-0.052em] text-white leading-[0.9] font-sans drop-shadow-2xl select-none">
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

        {/* Acciones de Navegación Inferiores */}
        <div className="shrink-0 flex flex-col items-center justify-center w-full pb-1">
          <nav className="flex flex-col items-center justify-center gap-2.5 w-full">
            <button
              type="button"
              onClick={() => setIsSheetOpen(true)}
              className="inline-flex items-center justify-center gap-1.5 px-5 py-2.5 rounded-full bg-[#081226] hover:bg-[#0c1b38] text-[13.5px] font-bold text-white transition-all active:scale-95 shadow-md shadow-blue-950/25 border border-blue-950/40"
            >
              Personaliza tu local
              <ChevronRight className="h-3.5 w-3.5 opacity-80" />
            </button>
            <button
              type="button"
              onClick={handleSkip}
              className="flex items-center justify-center gap-1 text-[13px] font-medium text-neutral-600 hover:text-neutral-900 transition-colors py-0.5"
            >
              Omitir
              <ChevronRight className="h-3 w-3 opacity-60" />
            </button>
          </nav>
        </div>
      </main>

      <MerchantOnboardingSheet
        isOpen={isSheetOpen}
        onClose={() => setIsSheetOpen(false)}
        onSubmit={handleSubmit}
      />
    </div>
  );
}

export default LandingScreen;
