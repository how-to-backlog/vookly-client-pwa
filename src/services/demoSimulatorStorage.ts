import {
  BusinessLoyaltyRules,
  ComputedDemoMilestone,
  CustomerWalletStatus,
  DemoRewardTier,
  DemoSimulatorConfig,
  RewardMilestone
} from '@/types/loyalty';

const STORAGE_PREFIX = 'vookly_demo_config_';

/**
 * Convierte la lista de tramos relativos en hitos absolutos para las reglas de fidelización.
 */
export function computeMilestonesFromTiers(tiers: DemoRewardTier[]): ComputedDemoMilestone[] {
  let accumulatedStamps = 0;
  return tiers.map((tier, index) => {
    accumulatedStamps += Math.max(0, tier.stampsFromPrevious);
    return {
      tierIndex: index + 1,
      stampThreshold: accumulatedStamps,
      rewardTitle: tier.rewardTitle.trim() || `Premio ${index + 1}`,
      isMajorReward: index === tiers.length - 1
    };
  });
}

/**
 * Calcula el total de sellos que tendrá el roadmap a partir de los tramos.
 */
export function computeTotalStampsFromTiers(tiers: DemoRewardTier[]): number {
  const milestones = computeMilestonesFromTiers(tiers);
  if (milestones.length === 0) return 5;
  return milestones[milestones.length - 1].stampThreshold;
}

const defaultConfigCache = new Map<string, DemoSimulatorConfig>();

/**
 * Genera la configuración predeterminada a partir de los mocks del negocio,
 * cacheando la referencia por businessName + rules + wallet para evitar
 * loops infinitos en getServerSnapshot de useSyncExternalStore.
 */
export function getDefaultDemoConfig(
  businessName: string,
  rules: BusinessLoyaltyRules,
  wallet: CustomerWalletStatus
): DemoSimulatorConfig {
  const cacheKey = `${businessName}|${rules.totalRoadmapStamps}|${wallet.currentStamps}|${rules.rewardMilestones.map(m => m.stampThreshold).join(',')}`;
  const existing = defaultConfigCache.get(cacheKey);
  if (existing) return existing;

  let previous = 0;
  const tiers: DemoRewardTier[] = rules.rewardMilestones
    .slice()
    .sort((a, b) => a.stampThreshold - b.stampThreshold)
    .map((m, idx) => {
      const delta = Math.max(1, m.stampThreshold - previous);
      previous = m.stampThreshold;
      return {
        id: `tier-${idx + 1}`,
        stampsFromPrevious: delta,
        rewardTitle: m.rewardTitle
      };
    });

  const config: DemoSimulatorConfig = {
    businessName: businessName || 'Coffee Shop',
    tiers: tiers.length > 0 ? tiers : [{ id: 'tier-1', stampsFromPrevious: 5, rewardTitle: 'Premio Especial' }],
    simulatedCurrentStamps: Math.max(1, Math.min(wallet.currentStamps, rules.totalRoadmapStamps))
  };

  defaultConfigCache.set(cacheKey, config);
  return config;
}

const configCache = new Map<string, { raw: string; parsed: DemoSimulatorConfig }>();

/**
 * Snapshot referencialmente estable de la configuración del simulador para useSyncExternalStore.
 */
export function getDemoSimulatorConfigSnapshot(
  businessId: string,
  businessName: string,
  rules: BusinessLoyaltyRules,
  wallet: CustomerWalletStatus
): DemoSimulatorConfig {
  if (typeof window === 'undefined') {
    return getDefaultDemoConfig(businessName, rules, wallet);
  }

  const raw = localStorage.getItem(`${STORAGE_PREFIX}${businessId}`) ?? '';
  const cached = configCache.get(businessId);
  if (cached && cached.raw === raw) {
    return cached.parsed;
  }

  if (raw) {
    try {
      const parsed = JSON.parse(raw) as DemoSimulatorConfig;
      if (parsed && Array.isArray(parsed.tiers) && parsed.tiers.length > 0) {
        configCache.set(businessId, { raw, parsed });
        return parsed;
      }
    } catch {
      // Si falla el parseo, cae al valor por defecto
    }
  }

  const def = getDefaultDemoConfig(businessName, rules, wallet);
  configCache.set(businessId, { raw, parsed: def });
  return def;
}

/**
 * Carga la configuración del simulador desde localStorage con fallback
 */
export function loadDemoSimulatorConfig(
  businessId: string,
  businessName: string,
  rules: BusinessLoyaltyRules,
  wallet: CustomerWalletStatus
): DemoSimulatorConfig {
  if (typeof window === 'undefined') {
    return getDefaultDemoConfig(businessName, rules, wallet);
  }

  try {
    const raw = localStorage.getItem(`${STORAGE_PREFIX}${businessId}`);
    if (raw) {
      const parsed = JSON.parse(raw) as DemoSimulatorConfig;
      if (parsed && Array.isArray(parsed.tiers) && parsed.tiers.length > 0) {
        return parsed;
      }
    }
  } catch {
    // Si falla el parseo, cae al valor por defecto
  }

  return getDefaultDemoConfig(businessName, rules, wallet);
}

/**
 * Guarda la configuración en localStorage y emite el evento para que los
 * suscriptores de la misma pestaña reaccionen de inmediato.
 */
export function saveDemoSimulatorConfig(businessId: string, config: DemoSimulatorConfig): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(`${STORAGE_PREFIX}${businessId}`, JSON.stringify(config));
    window.dispatchEvent(new Event('storage'));
  } catch {
    // Manejo silencioso en entornos restringidos
  }
}

/**
 * Limpia la configuración guardada de localStorage y emite el evento de sincronización.
 */
export function clearDemoSimulatorConfig(businessId: string): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.removeItem(`${STORAGE_PREFIX}${businessId}`);
    window.dispatchEvent(new Event('storage'));
  } catch {
    // Manejo silencioso
  }
}

/**
 * Convierte la configuración del simulador en objetos activos de reglas y billetera
 */
export function applyDemoConfigToEntities(
  config: DemoSimulatorConfig,
  baseRules: BusinessLoyaltyRules,
  baseWallet: CustomerWalletStatus
): {
  rules: BusinessLoyaltyRules;
  wallet: CustomerWalletStatus;
} {
  const computedMilestones = computeMilestonesFromTiers(config.tiers);
  const totalStamps = computedMilestones.length > 0
    ? computedMilestones[computedMilestones.length - 1].stampThreshold
    : 5;

  const rewardMilestones: RewardMilestone[] = computedMilestones.map((cm) => ({
    stampThreshold: cm.stampThreshold,
    rewardTitle: cm.rewardTitle,
    isMajorReward: cm.isMajorReward
  }));

  // Regla de oro de negocio: al hacer onboarding el cliente ya sumó su primera compra, mínimo 1 sello
  const safeCurrentStamps = Math.max(1, Math.min(config.simulatedCurrentStamps, totalStamps));

  // Generamos dinámicamente los vouchers en base a los sellos actuales y los hitos del simulador
  const dynamicVouchers = rewardMilestones.map((milestone) => {
    const isUnlocked = safeCurrentStamps >= milestone.stampThreshold;
    const isExactReady = safeCurrentStamps === milestone.stampThreshold;

    return {
      id: `voucher-${milestone.stampThreshold}`,
      milestoneStamp: milestone.stampThreshold,
      rewardTitle: milestone.rewardTitle,
      unlockedAt: new Date().toISOString(),
      expiresAt: new Date(Date.now() + 15 * 24 * 60 * 60 * 1000).toISOString(),
      status: (isExactReady ? 'ready' : isUnlocked ? 'redeemed' : 'cooling_down') as 'ready' | 'redeemed' | 'cooling_down'
    };
  });

  const derivedRules: BusinessLoyaltyRules = {
    ...baseRules,
    totalRoadmapStamps: totalStamps,
    rewardMilestones
  };

  const derivedWallet: CustomerWalletStatus = {
    ...baseWallet,
    currentStamps: safeCurrentStamps,
    vouchers: dynamicVouchers
  };

  return {
    rules: derivedRules,
    wallet: derivedWallet
  };
}
