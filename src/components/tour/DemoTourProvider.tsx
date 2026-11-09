'use client';

import React, { useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';
import { driver, type Driver } from 'driver.js';
import { TOUR_STEPS } from './tourSteps';
import {
  isTourCompleted,
  setTourCompleted,
  getActiveTourStep,
  setActiveTourStep,
  clearTourSession
} from './tourStorage';
import './driver-theme.css';

/**
 * DemoTourProvider: Orquestador aislado de Driver.js para Next.js App Router.
 *
 * Responsabilidades:
 * 1. Controla el ciclo de vida del tour sin ensuciar las páginas ni Server Components.
 * 2. Maneja la persistencia y la reanudación del tour al navegar entre /hub y /local/[id].
 * 3. Provee auto-inicio limpio al cargar /hub si el comerciante nunca vio la demo.
 */
function DemoTourInternal({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const driverInstanceRef = useRef<Driver | null>(null);

  useEffect(() => {
    // Si estamos fuera del cliente o el tour ya fue finalizado/omitido por el usuario, no hace nada
    if (typeof window === 'undefined') return;

    const isHub = pathname === '/hub';
    const isLocal = pathname.startsWith('/local');

    // Recuperamos el paso activo que guardó la sesión previa al cambiar de ruta
    const activeStepIndex = getActiveTourStep();

    // Caso A: Primera visita al Hub y nunca vio el tour -> lanzamos el paso 0 (invitación inicial)
    if (isHub && activeStepIndex === null && !isTourCompleted()) {
      startStep(0);
      return;
    }

    // Caso B: Si hay un paso pendiente de sesión y corresponde a la ruta actual, lo reanudamos
    if (activeStepIndex !== null) {
      const targetStep = TOUR_STEPS[activeStepIndex];
      if (!targetStep) {
        clearTourSession();
        return;
      }

      if (
        (isHub && targetStep.route === '/hub') ||
        (isLocal && targetStep.route === '/local') ||
        targetStep.route === 'any'
      ) {
        startStep(activeStepIndex);
      }
    }

    // Exponemos en window una función global de desarrollo para reiniciar el tour cuando quieras
    // desde la consola o botones de acción: window.vooklyResetTour()
    (window as unknown as { vooklyResetTour: () => void }).vooklyResetTour = () => {
      setTourCompleted(false);
      clearTourSession();
      if (driverInstanceRef.current) {
        driverInstanceRef.current.destroy();
        driverInstanceRef.current = null;
      }
      startStep(0);
    };

    return () => {
      // Destruimos la instancia activa antes de que el componente o la ruta cambien
      if (driverInstanceRef.current) {
        driverInstanceRef.current.destroy();
        driverInstanceRef.current = null;
      }
    };
  }, [pathname]);

  const startStep = (stepIndex: number) => {
    const stepConfig = TOUR_STEPS[stepIndex];
    if (!stepConfig) {
      clearTourSession();
      setTourCompleted(true);
      return;
    }

    // Guardamos el paso en sesión para persistir ante navegación
    setActiveTourStep(stepIndex);

    // Destruimos cualquier instancia previa
    if (driverInstanceRef.current) {
      driverInstanceRef.current.destroy();
      driverInstanceRef.current = null;
    }

    // Pequeño delay para garantizar que los elementos del DOM y animaciones estén montados
    const timer = setTimeout(() => {
      // Si el paso tiene un selector de elemento, esperamos a que exista en el DOM
      if (stepConfig.element) {
        const el = document.querySelector(stepConfig.element as string);
        if (!el) {
          // Si el elemento aún no se montó, reintentamos en un frame
          const retryTimer = setTimeout(() => {
            launchDriver(stepIndex);
          }, 300);
          return () => clearTimeout(retryTimer);
        }
      }

      launchDriver(stepIndex);
    }, 250);

    return () => clearTimeout(timer);
  };

  const launchDriver = (stepIndex: number) => {
    const stepConfig = TOUR_STEPS[stepIndex];
    if (!stepConfig) return;

    const driverObj = driver({
      animate: true,
      overlayColor: 'rgba(0, 0, 0, 0.72)',
      overlayOpacity: 0.72,
      smoothScroll: true,
      allowClose: true,
      stagePadding: 8,
      stageRadius: 16,
      popoverClass: 'vookly-driver-popover',
      onCloseClick: () => {
        // Al tocar la cruz o salir, marcamos como completado para no insistir
        setTourCompleted(true);
        clearTourSession();
        driverObj.destroy();
      },
      onDestroyStarted: () => {
        driverObj.destroy();
      }
    });

    driverInstanceRef.current = driverObj;

    // Conectamos los callbacks específicos de cada paso
    const enhancedPopover = {
      ...stepConfig.popover,
      onNextClick: () => {
        // En el paso 0 ("Comenzar recorrido") pasa al paso 1
        if (stepIndex === 0) {
          driverObj.destroy();
          startStep(1);
          return;
        }

        // En el paso 5 (Bottom Sheet de canje), al tocar Siguiente cerramos el modal y vamos al paso 6
        if (stepIndex === 5) {
          driverObj.destroy();
          // Cierra la lámina si está abierta mediante evento simulado o escape
          window.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape' }));
          setTimeout(() => {
            startStep(6);
          }, 200);
          return;
        }

        // En el paso 7 (Editor de comercio), al tocar Siguiente avanza al paso 8 (volver)
        if (stepIndex === 7) {
          driverObj.destroy();
          // Cierra el modal simulando escape o clic fuera
          window.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape' }));
          setTimeout(() => {
            startStep(8);
          }, 300);
          return;
        }

        // En el paso 9 (Cierre final en Hub), se da por completado el tour
        if (stepIndex === 9) {
          setTourCompleted(true);
          clearTourSession();
          driverObj.destroy();
          return;
        }

        // Pasos regulares: avanza al siguiente paso
        driverObj.destroy();
        startStep(stepIndex + 1);
      },
      onPrevClick: () => {
        // En el paso 0, "Explorar solo" cancela el tour
        if (stepIndex === 0) {
          setTourCompleted(true);
          clearTourSession();
          driverObj.destroy();
          return;
        }

        // Retroceder un paso
        if (stepIndex > 1) {
          driverObj.destroy();
          startStep(stepIndex - 1);
        }
      }
    };

    // Si el paso no tiene elemento, es un modal centrado
    if (!stepConfig.element) {
      driverObj.highlight({
        popover: enhancedPopover
      });
    } else {
      driverObj.highlight({
        element: stepConfig.element,
        popover: enhancedPopover
      });
    }

    // Manejo de interacciones de usuario automáticas para avanzar:
    setupAutoAdvanceListeners(stepIndex, driverObj);
  };

  /**
   * Listeners de interacción para pasos que avanzan por acción real del usuario:
   * - Paso 3: tap en la tarjeta navega a /local/[id] y deja el paso 4 listo.
   * - Paso 4: tap en el primer nodo de premio abre el bottom sheet y deja el paso 5 listo.
   * - Paso 6: tap en el botón de ajustes abre el editor de comercio y deja el paso 7 listo.
   * - Paso 7: tap en el botón Guardar del editor cierra el modal y deja el paso 8 listo.
   * - Paso 8: tap en volver navega al Hub y deja el paso 9 (WhatsApp) listo.
   */
  const setupAutoAdvanceListeners = (stepIndex: number, driverObj: Driver) => {
    if (typeof window === 'undefined') return;

    // Paso 3: Al hacer tap en la tarjeta
    if (stepIndex === 3) {
      const cardEl = document.querySelector('[data-tour="first-card-target"]');
      if (cardEl) {
        const handleCardClick = () => {
          setActiveTourStep(4);
          driverObj.destroy();
        };
        cardEl.addEventListener('click', handleCardClick, { once: true });
      }
    }

    // Paso 4: Al hacer tap en el botón de canje
    if (stepIndex === 4) {
      const footerBtn = document.querySelector('[data-tour="claim-reward-cta-btn"]');
      const rewardEl = document.querySelector('[data-tour="first-reward-node"]');

      const handleRewardClick = () => {
        driverObj.destroy();
        // Esperamos a que abra la lámina de canje para iluminar el paso 5
        setTimeout(() => {
          startStep(5);
        }, 350);
      };

      if (footerBtn) {
        footerBtn.addEventListener('click', handleRewardClick, { once: true });
      }
      if (rewardEl) {
        rewardEl.addEventListener('click', handleRewardClick, { once: true });
      }
    }

    // Paso 5: Bottom Sheet de Canje abierto
    if (stepIndex === 5) {
      // Si el usuario toca el botón "Reclamar premio" dentro del sheet, dejamos que corra la coreografía
      const claimBtn = document.querySelector('[data-tour="redemption-sheet-token"] button.bg-neutral-950');
      if (claimBtn) {
        const handleClaim = () => {
          // Destruye el popover de explicación mientras rasga el ticket
          driverObj.destroy();
          // Espera 3 segundos a que vea el código emitido y avanza solo al paso 6
          setTimeout(() => {
            window.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape' }));
            setTimeout(() => {
              startStep(6);
            }, 300);
          }, 4000);
        };
        claimBtn.addEventListener('click', handleClaim, { once: true });
      }
    }

    // Paso 6: Al tocar el botón de ajustes (sintonizador)
    if (stepIndex === 6) {
      const triggerEl = document.querySelector('[data-tour="simulator-trigger-btn"]');
      if (triggerEl) {
        const handleTriggerClick = () => {
          driverObj.destroy();
          // Esperamos a que monte el modal para iluminar el paso 7
          setTimeout(() => {
            startStep(7);
          }, 350);
        };
        triggerEl.addEventListener('click', handleTriggerClick, { once: true });
      }
    }

    // Paso 7: Al guardar dentro del editor de comercio
    if (stepIndex === 7) {
      const modalEl = document.querySelector('[data-tour="merchant-editor-modal"]');
      if (modalEl) {
        const saveBtn = modalEl.querySelector('button.bg-neutral-950');
        const closeBtn = modalEl.querySelector('button[aria-label="Cerrar editor"]');

        const handleSaveOrClose = () => {
          driverObj.destroy();
          // Al cerrarse el modal volvemos al Roadmap para indicar el retorno
          setTimeout(() => {
            startStep(8);
          }, 350);
        };

        if (saveBtn) {
          saveBtn.addEventListener('click', handleSaveOrClose, { once: true });
        }
        if (closeBtn) {
          closeBtn.addEventListener('click', handleSaveOrClose, { once: true });
        }
      }
    }

    // Paso 8: Al tocar volver a la billetera
    if (stepIndex === 8) {
      const backBtn = document.querySelector('[data-tour="local-back-btn"]');
      if (backBtn) {
        const handleBackClick = () => {
          // Preparamos el paso 9 (cierre en Hub con WhatsApp)
          setActiveTourStep(9);
          driverObj.destroy();
        };
        backBtn.addEventListener('click', handleBackClick, { once: true });
      }
    }
  };

  return <>{children}</>;
}

/**
 * DemoTourProvider: Orquestador aislado de Driver.js para Next.js App Router.
 *
 * Envuelve el hook de lectura de ruta `usePathname()` dentro de un boundary de
 * `<Suspense>` para cumplir con la regla estricta de prerendering de Next.js 16.
 */
export const DemoTourProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <React.Suspense fallback={<>{children}</>}>
      <DemoTourInternal>{children}</DemoTourInternal>
    </React.Suspense>
  );
};

export default DemoTourProvider;
