import type { CategoryIconName } from '@/components/icons/CategoryIcon';
import type { DemoRewardTier } from '@/types/loyalty';

export interface ComplementaryTier {
  stampsFromPrevious: number;
  rewardTitle: string;
}

/**
 * Matriz canónica de premios complementarios por rubro comercial:
 * Cada nicho provee dos premios adicionales para acompañar al primer producto que carga el comerciante:
 * - Tier 2: Premio intermedio alcanzable a media distancia.
 * - Tier 3: Premio mayor aspiracional de cierre de ciclo.
 */
export const NICHE_COMPLEMENTARY_REWARDS: Record<CategoryIconName, [ComplementaryTier, ComplementaryTier]> = {
  cafeteria: [
    { stampsFromPrevious: 4, rewardTitle: 'Tostado Especial' },
    { stampsFromPrevious: 5, rewardTitle: 'Taza Térmica de Colección' }
  ],
  heladeria: [
    { stampsFromPrevious: 3, rewardTitle: 'Cucurucho 2 bochas' },
    { stampsFromPrevious: 4, rewardTitle: '1 Kg de Helado Artesanal' }
  ],
  barberia: [
    { stampsFromPrevious: 2, rewardTitle: 'Perfilado de Barba' },
    { stampsFromPrevious: 4, rewardTitle: 'Corte Fade + Lavado Spa' }
  ],
  panaderia: [
    { stampsFromPrevious: 3, rewardTitle: 'Docena de Medialunas' },
    { stampsFromPrevious: 4, rewardTitle: 'Pan de Campo Masa Madre' }
  ]
};

/**
 * Ensambla un roadmap balanceado de 3 tramos:
 * - Tier 1: Definido por el comerciante (su producto y sus sellos).
 * - Tier 2 y Tier 3: Autocompletados a partir de los datos canónicos del nicho.
 */
export function buildOnboardingTiers(
  customRewardTitle: string,
  customStamps: number,
  category: CategoryIconName
): DemoRewardTier[] {
  const complement = NICHE_COMPLEMENTARY_REWARDS[category] || NICHE_COMPLEMENTARY_REWARDS.cafeteria;

  return [
    {
      id: 'tier-1',
      stampsFromPrevious: Math.max(1, customStamps),
      rewardTitle: customRewardTitle.trim() || 'Premio de Bienvenida'
    },
    {
      id: 'tier-2',
      stampsFromPrevious: complement[0].stampsFromPrevious,
      rewardTitle: complement[0].rewardTitle
    },
    {
      id: 'tier-3',
      stampsFromPrevious: complement[1].stampsFromPrevious,
      rewardTitle: complement[1].rewardTitle
    }
  ];
}
