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
 * Gama armónica de azules profundos y marinos para las tarjetas:
 * Contrastan de forma elegante con la Aurora sin generar choques de colores extraños:
 * 1. Azul Zafiro Profundo: #172554 con texto #e0f2fe
 * 2. Azul Cobalto Nocturno: #1e3a8a con texto #f0fdfa
 * 3. Azul Marino Índigo: #1e1b4b con texto #ede9fe
 * 4. Azul Océano Medianoche: #0f172a con texto #e2e8f0
 * 5. Azul Acero Oscuro: #1e293b con texto #f8fafc
 * 6. Azul Petróleo Profundo: #164e63 con texto #ecfeff
 */
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
    <div className="relative h-screen w-full overflow-hidden bg-[#0a0f2c]">
      {/* Fondo vivo: Aurora azul multicapa y con movimiento ondulatorio continuo */}
      <LandingBackdrop />

      <main className="relative z-10 mx-auto flex h-full w-full max-w-md flex-col justify-between px-6 pb-10 pt-12">
        {/* Cabecera: Tipografía llamativa con palo ancho, peso bold/black y centrado perfecto */}
        <div className="shrink-0 w-full text-center">
          <h1 className="text-[32px] sm:text-[36px] font-black tracking-[-0.035em] text-white leading-tight font-sans drop-shadow-md">
            Bienvenido a <span className="text-sky-300">vookly.</span>
          </h1>
        </div>

        {/*
          Contenedor del Stack Cuadrado Compacto en Gama de Azules:
          - Formato 265px x 265px centrado con margen de desborde protegido.
          - Texto en esquina inferior izquierda con tipografía contundente.
        */}
        <div className="my-auto flex items-center justify-center w-full py-2">
          <div className="w-full max-w-[265px] aspect-square ml-4">
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

        {/*
          Acciones de Navegación Inferiores:
          - Botón "Personaliza tu local" más compacto y refinado.
          - "Omitir este paso" sutil debajo, con buena respiración del borde inferior.
        */}
        <nav className="shrink-0 flex flex-col items-center justify-center gap-2.5 w-full">
          <button
            type="button"
            onClick={() => setIsSheetOpen(true)}
            className="inline-flex items-center justify-center gap-1.5 px-4.5 py-2 rounded-full bg-white/10 hover:bg-white/15 border border-white/20 text-[13.5px] font-medium text-white transition-all active:scale-95 shadow-sm backdrop-blur-xs"
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
