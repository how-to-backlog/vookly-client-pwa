import {
  BusinessProfile,
  BusinessLoyaltyRules,
  CustomerWalletStatus,
  VoucherTokenEntity
} from '@/types/loyalty';

// ============================================================================
// TABLA 1: COMERCIOS (businesses)
// ============================================================================
const DB_BUSINESSES: Record<string, BusinessProfile> = {
  cafeteria: {
    id: 'cafeteria',
    name: 'Coffee Shop',
    category: 'Cafetería de Especialidad',
    address: 'Av. San Martín 450, Córdoba',
    location: {
      latitude: -31.4201,
      longitude: -64.1888,
      googleMapsUrl: 'https://maps.google.com/?q=-31.4201,-64.1888'
    },
    cardImage: '/images/cards/cafeteria/card-bg.jpg',
    accentColor: '#000000'
  }
};

// ============================================================================
// TABLA 2: REGLAS Y POLÍTICAS DE FIDELIZACIÓN (loyalty_rules)
// ============================================================================
const DB_RULES: Record<string, BusinessLoyaltyRules> = {
  cafeteria: {
    businessId: 'cafeteria',
    totalRoadmapStamps: 30,
    policy: {
      cooldownHours: 3,
      voucherValidityDays: 15,
      tokenValidityMinutes: 15
    },
    rewardMilestones: [
      { stampThreshold: 5, rewardTitle: 'Café Clásico', icon: 'cup' },
      { stampThreshold: 10, rewardTitle: 'Café + Medialuna', icon: 'gift' },
      { stampThreshold: 15, rewardTitle: 'Tostado Especial', icon: 'gift' },
      { stampThreshold: 20, rewardTitle: 'Brunch Completo', icon: 'trophy' },
      { stampThreshold: 25, rewardTitle: 'Voucher $15.000', icon: 'crown', isMajorReward: true }
    ]
  }
};

// ============================================================================
// TABLA 3: BILLETERAS DE CLIENTES (customer_wallets)
// ============================================================================
const DB_WALLETS: Record<string, CustomerWalletStatus> = {
  'cust-01:cafeteria': {
    customerId: 'cust-01',
    businessId: 'cafeteria',
    currentStamps: 15,
    lastStampAt: '2026-10-30T02:00:00Z',
    transactions: [
      { id: 'tx-01', customerId: 'cust-01', businessId: 'cafeteria', stampIndex: 1, createdAt: '2026-10-10T11:15:00Z' },
      { id: 'tx-02', customerId: 'cust-01', businessId: 'cafeteria', stampIndex: 2, createdAt: '2026-10-11T16:40:00Z' },
      { id: 'tx-03', customerId: 'cust-01', businessId: 'cafeteria', stampIndex: 3, createdAt: '2026-10-12T10:20:00Z' },
      { id: 'tx-04', customerId: 'cust-01', businessId: 'cafeteria', stampIndex: 4, createdAt: '2026-10-14T17:05:00Z' },
      { id: 'tx-05', customerId: 'cust-01', businessId: 'cafeteria', stampIndex: 5, createdAt: '2026-10-15T10:00:00Z' },
      { id: 'tx-06', customerId: 'cust-01', businessId: 'cafeteria', stampIndex: 6, createdAt: '2026-10-16T18:30:00Z' },
      { id: 'tx-07', customerId: 'cust-01', businessId: 'cafeteria', stampIndex: 7, createdAt: '2026-10-18T09:45:00Z' },
      { id: 'tx-08', customerId: 'cust-01', businessId: 'cafeteria', stampIndex: 8, createdAt: '2026-10-19T16:10:00Z' },
      { id: 'tx-09', customerId: 'cust-01', businessId: 'cafeteria', stampIndex: 9, createdAt: '2026-10-21T11:50:00Z' },
      { id: 'tx-10', customerId: 'cust-01', businessId: 'cafeteria', stampIndex: 10, createdAt: '2026-10-22T16:00:00Z' },
      { id: 'tx-11', customerId: 'cust-01', businessId: 'cafeteria', stampIndex: 11, createdAt: '2026-10-24T10:15:00Z' },
      { id: 'tx-12', customerId: 'cust-01', businessId: 'cafeteria', stampIndex: 12, createdAt: '2026-10-25T17:30:00Z' },
      { id: 'tx-13', customerId: 'cust-01', businessId: 'cafeteria', stampIndex: 13, createdAt: '2026-10-27T09:20:00Z' },
      { id: 'tx-14', customerId: 'cust-01', businessId: 'cafeteria', stampIndex: 14, createdAt: '2026-10-28T16:20:00Z' },
      { id: 'tx-15', customerId: 'cust-01', businessId: 'cafeteria', stampIndex: 15, createdAt: '2026-10-30T02:00:00Z' }
    ],
    vouchers: [
      {
        id: 'vouch-01',
        milestoneStamp: 5,
        rewardTitle: 'Café Clásico',
        unlockedAt: '2026-10-15T10:00:00Z',
        expiresAt: '2026-10-30T10:00:00Z',
        status: 'redeemed',
        redeemedAt: '2026-10-18T10:15:00Z'
      },
      {
        id: 'vouch-02',
        milestoneStamp: 10,
        rewardTitle: 'Café + Medialuna',
        unlockedAt: '2026-10-22T16:00:00Z',
        expiresAt: '2026-11-06T16:00:00Z',
        status: 'redeemed',
        redeemedAt: '2026-10-25T17:45:00Z'
      },
      {
        id: 'vouch-03',
        milestoneStamp: 15,
        rewardTitle: 'Tostado Especial',
        unlockedAt: '2026-10-30T02:00:00Z',
        expiresAt: '2026-11-14T02:00:00Z',
        status: 'ready' // Listo para reclamar
      }
    ]
  }
};

// ============================================================================
// SERVICIOS DEL REPOSITORIO (DESACOPLADOS Y LISTOS PARA MVP/API REAL)
// ============================================================================

/**
 * Consulta sincrónica inmediata de comercio (sin flicker en SSR/Cliente)
 */
export function getBusinessSync(businessId: string): BusinessProfile | null {
  return DB_BUSINESSES[businessId] || null;
}

/**
 * Consulta sincrónica inmediata de reglas y políticas
 */
export function getBusinessLoyaltyRulesSync(businessId: string): BusinessLoyaltyRules | null {
  return DB_RULES[businessId] || null;
}

/**
 * Consulta sincrónica inmediata de billetera
 */
export function getCustomerWalletSync(
  customerId: string,
  businessId: string
): CustomerWalletStatus | null {
  const key = `${customerId}:${businessId}`;
  return DB_WALLETS[key] || null;
}

/**
 * Consulta un perfil de comercio por su identificador slug.
 */
export async function getBusiness(businessId: string): Promise<BusinessProfile | null> {
  return DB_BUSINESSES[businessId] || null;
}

/**
 * Consulta las reglas y políticas de fidelización de un comercio.
 */
export async function getBusinessLoyaltyRules(businessId: string): Promise<BusinessLoyaltyRules | null> {
  return DB_RULES[businessId] || null;
}

/**
 * Consulta el estado de la billetera de un cliente en un comercio dado.
 */
export async function getCustomerWallet(
  customerId: string,
  businessId: string
): Promise<CustomerWalletStatus | null> {
  const key = `${customerId}:${businessId}`;
  return DB_WALLETS[key] || null;
}

/**
 * Emisión o consulta de token efímero de 4 dígitos para canje en mostrador.
 * Si ya existe un token activo no vencido, lo devuelve; si expiró o no existe, genera uno nuevo.
 */
export async function claimVoucherToken(
  customerId: string,
  businessId: string,
  voucherId: string
): Promise<VoucherTokenEntity | null> {
  const wallet = await getCustomerWallet(customerId, businessId);
  if (!wallet || !wallet.vouchers) return null;

  const voucher = wallet.vouchers.find((v) => v.id === voucherId);
  if (!voucher || voucher.status !== 'ready') return null;

  const now = new Date();

  // Si ya tiene un código activo y no expiró, lo reutilizamos
  if (voucher.activeCode) {
    const expiresAt = new Date(voucher.activeCode.expiresAt).getTime();
    if (expiresAt > now.getTime()) {
      return voucher.activeCode;
    }
  }

  // Generar nuevo token efímero de 4 dígitos numéricos
  const rules = await getBusinessLoyaltyRules(businessId);
  const tokenValidityMinutes = rules?.policy?.tokenValidityMinutes || 15;

  const code = Math.floor(1000 + Math.random() * 9000).toString();
  const generatedAt = now.toISOString();
  const expiresAt = new Date(now.getTime() + tokenValidityMinutes * 60 * 1000).toISOString();

  const tokenEntity: VoucherTokenEntity = {
    code,
    generatedAt,
    expiresAt
  };

  voucher.activeCode = tokenEntity;
  return tokenEntity;
}
