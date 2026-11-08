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
 * Paleta de colores enriquecida, más oscura y profunda para las tarjetas:
 * Armoniza con el fondo de la Aurora sin deslumbrar, con contraste blanco/marfil nítido:
 * - Cafetería tostada: #3b2314 (moca espresso)
 * - Barbería noche: #172554 (azul noche pizarra)
 * - Heladería frutos rojos: #4a1528 (borgoña profundo)
 * - Panadería centeno: #3d2a10 (corteza tostada)
 * - Verde bosque: #123524 (menta oscura)
 * - Púrpura índigo: #261642 (amatista oscuro)
 */
const CARD_DARK_THEMES = [
  { bg: '#3b2314', ink: '#fef3e7' }, // Cafetería Tostada profunda
  { bg: '#172554', ink: '#eef4ff' }, // Azul Noche Pizarra
  { bg: '#4a1528', ink: '#fcebf1' }, // Frutos Rojos / Borgoña
  { bg: '#3d2a10', ink: '#fef7ea' }, // Trigo / Centeno Tostado
  { bg: '#123524', ink: '#ebfaef' }, // Menta Bosque Oscura
  { bg: '#261642', ink: '#f5effe' }  // Índigo Profundo
];

export function LandingScreen() {
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const { triggerTransition } = usePageTransition();

  const cardsWithColors = useMemo(() => {
    return LANDING_PITCH_MESSAGES.map((message, index) => {
      const theme = CARD_DARK_THEMES[index % CARD_DARK_THEMES.length];
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
      {/* Fondo vivo: Aurora azul profunda animada en tiempo real */}
      <LandingBackdrop />

      <main className="relative z-10 mx-auto flex h-full w-full max-w-md flex-col justify-between px-6 pb-12 pt-12">
        {/* Cabecera de Bienvenida */}
        <div className="shrink-0">
          <h1 className="text-[34px] font-normal leading-[1.1] tracking-[-0.03em] text-neutral-100 font-sans antialiased">
            {LANDING_TITLE}
          </h1>
        </div>

        {/*
          Contenedor del Stack Cuadrado Compacto:
          - Formato 265px x 265px centrado con margen de desborde protegido.
          - Texto en esquina inferior izquierda con tipografía más gorda.
          - Cascada suave y controlada sin fugas en el viewport.
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
          Acciones de Navegación Inferiores Reordenadas:
          - "Personaliza tu local": centrado como acción principal.
          - "Omitir este paso": debajo, centrado y con respiración vertical holgada respecto al pie.
        */}
        <nav className="shrink-0 flex flex-col items-center justify-center gap-3 w-full">
          <button
            type="button"
            onClick={() => setIsSheetOpen(true)}
            className="flex items-center justify-center gap-1.5 px-6 py-2.5 rounded-full bg-white/10 hover:bg-white/15 border border-white/15 text-[15px] font-medium text-white transition-all active:scale-98 shadow-sm backdrop-blur-xs"
          >
            Personaliza tu local
            <ChevronRight className="h-4 w-4 opacity-80" />
          </button>
          <button
            type="button"
            onClick={handleSkip}
            className="flex items-center justify-center gap-1 text-[13.5px] font-normal text-white/60 hover:text-white/90 transition-colors py-1"
          >
            Omitir este paso
            <ChevronRight className="h-3.5 w-3.5 opacity-60" />
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
