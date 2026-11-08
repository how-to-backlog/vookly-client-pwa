'use client';

import React, { useState } from 'react';
import { ChevronRight } from 'lucide-react';

import LandingBackdrop from '@/components/landing/LandingBackdrop';
import MerchantOnboardingSheet, {
  type MerchantOnboardingValues
} from '@/components/landing/MerchantOnboardingSheet';
import { Stack } from '@/components/registry/Stack';
import { usePageTransition } from '@/components/transition/TransitionProvider';
import { LANDING_PITCH_MESSAGES, LANDING_TITLE } from '@/data/landingContent';
import { saveDemoSimulatorConfig } from '@/services/demoSimulatorStorage';
import type { DemoSimulatorConfig } from '@/types/loyalty';

/**
 * Placa del stack: cada mensaje de pitch vive en una tarjeta de vidrio sobre la
 * aurora, con el número de slide arriba a la izquierda.
 */
function PitchCard({ message, index }: { message: string; index: number }) {
  return (
    <div
      className="flex h-full w-full flex-col justify-between border border-white/15 p-6"
      style={{
        background: 'linear-gradient(160deg, rgba(255,255,255,0.18), rgba(255,255,255,0.06))'
      }}
    >
      <span className="text-[12px] font-semibold tracking-[0.18em] text-white/60">
        {String(index + 1).padStart(2, '0')}
      </span>
      <p className="text-[19px] font-medium leading-snug tracking-[-0.01em] text-white">
        {message}
      </p>
    </div>
  );
}

/**
 * Landing de la demo: Aurora azul, mensaje de bienvenida, pila de pitches y los
 * dos finales de flujo (personalizar el local u omitir y entrar con los datos
 * precargados). El alta vive en una lámina modal sobre la misma pantalla.
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

    // El id del nicho es el businessId del catálogo: el simulador de sellos
    // resuelve la demo precargada de ese rubro.
    saveDemoSimulatorConfig(values.category, config);
    setIsSheetOpen(false);
    triggerTransition(event, '/');
  };

  const handleSkip = (event: React.MouseEvent<HTMLButtonElement>) => {
    // Omitir no guarda nada: entra a la demo con los datos precargados.
    setIsSheetOpen(false);
    triggerTransition(event, '/');
  };

  return (
    <div className="relative h-screen w-full overflow-hidden bg-[#050b26]">
      <LandingBackdrop />

      <main className="relative z-10 mx-auto flex h-full w-full max-w-md flex-col px-5 pb-8 pt-14">
        <h1 className="text-[34px] font-bold leading-[1.1] tracking-[-0.02em] text-white">
          {LANDING_TITLE}
        </h1>

        <div className="mt-8 min-h-0 flex-1">
          <Stack
            cards={LANDING_PITCH_MESSAGES.map((message, index) => (
              <PitchCard key={message} message={message} index={index} />
            ))}
            layout="cascade"
            visible={6}
            spread={1}
            depth={0.15}
            radius={15}
            frame={0}
            frameColor="#ffffff"
            shadow
            tilt={45}
            threshold={70}
            speed={1}
            sendToBackOnClick={false}
            autoplay
            autoplayDelay={2500}
            pauseOnHover
          />
        </div>

        <nav className="mt-6 flex items-center justify-between gap-4">
          <button
            type="button"
            onClick={() => setIsSheetOpen(true)}
            className="flex items-center gap-1 text-[14px] font-medium text-white transition-opacity hover:opacity-80"
          >
            Personaliza tu local
            <ChevronRight className="h-4 w-4" />
          </button>
          <button
            type="button"
            onClick={handleSkip}
            className="flex items-center gap-1 text-[14px] font-medium text-white/80 transition-opacity hover:opacity-100"
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
