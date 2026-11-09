import type { DriveStep } from 'driver.js';

/**
 * tourSteps.ts
 *
 * Contrato inmutable de los 8 pasos oficiales del Tour Guiado de Vookly.
 * Textos llanos y directos al beneficio, sin emojis ni títulos redundantes.
 * Cada paso apunta a un selector semántico [data-tour="..."] con popover configurado.
 */

export interface VooklyTourStepConfig extends DriveStep {
  route: '/hub' | '/local' | 'any';
  stepIndex: number;
  waitForModal?: boolean;
}

export const TOUR_STEPS: VooklyTourStepConfig[] = [
  // Paso 0: Invitación inicial modal centrada en /hub
  {
    stepIndex: 0,
    route: '/hub',
    popover: {
      description:
        'Esta es la billetera digital que verán tus clientes. Recorré en un minuto cómo fideliza tu negocio y cómo configurarlo vos mismo.',
      side: 'bottom',
      align: 'center',
      nextBtnText: 'Comenzar recorrido',
      prevBtnText: 'Explorar solo',
      showButtons: ['next', 'previous'],
      popoverClass: 'vookly-driver-popover vookly-welcome-modal'
    }
  },

  // Paso 1: Cartelera Giratoria (Hub)
  {
    stepIndex: 1,
    route: '/hub',
    element: '[data-tour="rotating-notifications"]',
    popover: {
      description:
        'Vookly rota recordatorios automáticos mostrando qué premio tiene disponible tu cliente o a cuántos sellos está de ganarlo, incentivando su regreso constante.',
      side: 'bottom',
      align: 'start',
      nextBtnText: 'Siguiente',
      prevBtnText: 'Anterior',
      showButtons: ['next', 'close'],
      popoverClass: 'vookly-driver-popover'
    }
  },

  // Paso 2: Red Colaborativa y Tráfico Cruzado (Hub)
  {
    stepIndex: 2,
    route: '/hub',
    element: '[data-tour="wallet-cards-stack"]',
    popover: {
      description:
        'Formar parte de una red compartida multiplica tus clientes. Quienes compran en una heladería o barbería cercana descubren tu negocio dentro de su misma billetera, generando visitas por tráfico cruzado.',
      side: 'top',
      align: 'center',
      nextBtnText: 'Siguiente',
      prevBtnText: 'Anterior',
      showButtons: ['next', 'close'],
      popoverClass: 'vookly-driver-popover'
    }
  },

  // Paso 3: Entrada a tu Negocio (Hub -> Roadmap)
  {
    stepIndex: 3,
    route: '/hub',
    element: '[data-tour="first-card-target"]',
    popover: {
      description: 'Tocá en tu tarjeta para ver cómo tu cliente sigue su progreso en tu mostrador.',
      side: 'bottom',
      align: 'center',
      showButtons: ['close'],
      popoverClass: 'vookly-driver-popover'
    }
  },

  // Paso 4: Dinámica del Roadmap y Prueba de Canje (Foco directo en el botón de canje del footer)
  {
    stepIndex: 4,
    route: '/local',
    element: '[data-tour="claim-reward-cta-btn"]',
    popover: {
      description:
        'Cada compra avanza en el camino. Tocá en este botón para ver cómo tu cliente solicita su premio en el mostrador.',
      side: 'top',
      align: 'end',
      showButtons: ['close'],
      popoverClass: 'vookly-driver-popover'
    }
  },

  // Paso 5: Canje en Mostrador (Bottom Sheet)
  {
    stepIndex: 5,
    route: '/local',
    element: '[data-tour="redemption-sheet-token"]',
    popover: {
      description:
        'El cliente rasga su ticket y genera un código de 4 dígitos válido por 15 minutos. En mostrador, el cliente digita ese código en un teclado numérico o se lo dicta al cajero para completar la entrega.',
      side: 'top',
      align: 'center',
      nextBtnText: 'Siguiente',
      showButtons: ['next', 'close'],
      popoverClass: 'vookly-driver-popover'
    }
  },

  // Paso 6: Abrir el Editor de Comercio (Roadmap)
  {
    stepIndex: 6,
    route: '/local',
    element: '[data-tour="simulator-trigger-btn"]',
    popover: {
      description:
        'Tocá el botón de ajustes para abrir el Editor de Comercio y adaptar este local a las reglas de tu negocio.',
      side: 'bottom',
      align: 'end',
      showButtons: ['close'],
      popoverClass: 'vookly-driver-popover'
    }
  },

  // Paso 7: Configuración del Negocio y Tarjeta (Foco en la mini-tarjeta de diseño)
  {
    stepIndex: 7,
    route: '/local',
    element: '[data-tour="merchant-editor-preview-card"]',
    popover: {
      description:
        'Personalizá tu nombre, premios y diseño. Estos estilos son una base inicial; a futuro podrás sumar tu propia imagen y estilos a medida. Tocá \'Guardar\' abajo para continuar.',
      side: 'bottom',
      align: 'center',
      nextBtnText: 'Siguiente',
      showButtons: ['next'],
      popoverClass: 'vookly-driver-popover'
    }
  },

  // Paso 8: Regreso a la Billetera y Cierre Comercial (Fase A en Roadmap, Fase B en Hub)
  {
    stepIndex: 8,
    route: '/local',
    element: '[data-tour="local-back-btn"]',
    popover: {
      description: 'Volvé a tus tarjetas para finalizar.',
      side: 'bottom',
      align: 'start',
      showButtons: ['close'],
      popoverClass: 'vookly-driver-popover'
    }
  },

  // Paso 9 (Fase B del Paso 8 - Cierre en Hub): Contacto WhatsApp
  {
    stepIndex: 9,
    route: '/hub',
    element: '[data-tour="topbar-whatsapp-btn"]',
    popover: {
      description:
        'Estás a un paso de formar parte de algo grande. Queremos que tu negocio sea de los primeros en sumarse a la red Vookly. Tocá acá para hablar con nosotros por WhatsApp y empezar a planificar tu lugar en la plataforma.',
      side: 'bottom',
      align: 'end',
      nextBtnText: 'Entendido',
      showButtons: ['next'],
      popoverClass: 'vookly-driver-popover'
    }
  }
];
