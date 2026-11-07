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
    accentColor: '#000000'
  },
  'cafeteria-roma': {
    id: 'cafeteria-roma',
    name: 'Café Roma',
    category: 'Cafetería de Especialidad',
    address: 'Belgrano 720, Güemes, Córdoba',
    location: {
      latitude: -31.4235,
      longitude: -64.1912,
      googleMapsUrl: 'https://maps.google.com/?q=-31.4235,-64.1912'
    },
    accentColor: '#000000'
  },
  heladeria: {
    id: 'heladeria',
    name: 'Heladería del Parque',
    category: 'Heladería Artesanal',
    address: 'Av. Poeta Lugones 210, Córdoba',
    location: {
      latitude: -31.4275,
      longitude: -64.1842,
      googleMapsUrl: 'https://maps.google.com/?q=-31.4275,-64.1842'
    },
    accentColor: '#000000'
  },
  'heladeria-gelato': {
    id: 'heladeria-gelato',
    name: 'Gelato & Co.',
    category: 'Heladería Artesanal',
    address: 'Chacabuco 650, Nueva Córdoba',
    location: {
      latitude: -31.4251,
      longitude: -64.1865,
      googleMapsUrl: 'https://maps.google.com/?q=-31.4251,-64.1865'
    },
    accentColor: '#000000'
  },
  barberia: {
    id: 'barberia',
    name: 'La Barbería Club',
    category: 'Barbería Clásica',
    address: 'Estrada 120, Nueva Córdoba',
    location: {
      latitude: -31.4289,
      longitude: -64.1895,
      googleMapsUrl: 'https://maps.google.com/?q=-31.4289,-64.1895'
    },
    accentColor: '#000000'
  },
  'barberia-studio': {
    id: 'barberia-studio',
    name: 'Barber Studio',
    category: 'Barbería & Spa Masculino',
    address: 'Rondeau 480, Nueva Córdoba',
    location: {
      latitude: -31.4262,
      longitude: -64.1873,
      googleMapsUrl: 'https://maps.google.com/?q=-31.4262,-64.1873'
    },
    accentColor: '#000000'
  },
  panaderia: {
    id: 'panaderia',
    name: 'Panadería La Espiga',
    category: 'Panadería & Confitería',
    address: 'Bv. Illia 340, Córdoba',
    location: {
      latitude: -31.4215,
      longitude: -64.1832,
      googleMapsUrl: 'https://maps.google.com/?q=-31.4215,-64.1832'
    },
    accentColor: '#000000'
  },
  'panaderia-masamadre': {
    id: 'panaderia-masamadre',
    name: 'Masa Madre Bakery',
    category: 'Panadería de Masa Madre',
    address: 'Fructuoso Rivera 260, Güemes',
    location: {
      latitude: -31.4248,
      longitude: -64.1925,
      googleMapsUrl: 'https://maps.google.com/?q=-31.4248,-64.1925'
    },
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
  },
  'cafeteria-roma': {
    businessId: 'cafeteria-roma',
    totalRoadmapStamps: 10,
    policy: {
      cooldownHours: 3,
      voucherValidityDays: 15,
      tokenValidityMinutes: 15
    },
    rewardMilestones: [
      { stampThreshold: 3, rewardTitle: 'Espresso Doble', icon: 'cup' },
      { stampThreshold: 6, rewardTitle: 'Porción de Torta', icon: 'gift' },
      { stampThreshold: 10, rewardTitle: 'Taza Coleccionable Roma', icon: 'crown', isMajorReward: true }
    ]
  },
  heladeria: {
    businessId: 'heladeria',
    totalRoadmapStamps: 10,
    policy: {
      cooldownHours: 3,
      voucherValidityDays: 15,
      tokenValidityMinutes: 15
    },
    rewardMilestones: [
      { stampThreshold: 2, rewardTitle: 'Topping Extra Bañado', icon: 'cup' },
      { stampThreshold: 4, rewardTitle: 'Cucurucho 2 bochas', icon: 'gift' },
      { stampThreshold: 6, rewardTitle: '1/4 Kg de Helado', icon: 'gift' },
      { stampThreshold: 8, rewardTitle: '1/2 Kg de Helado', icon: 'trophy' },
      { stampThreshold: 10, rewardTitle: 'Vaso Térmico + 1 Kg', icon: 'crown', isMajorReward: true }
    ]
  },
  'heladeria-gelato': {
    businessId: 'heladeria-gelato',
    totalRoadmapStamps: 9,
    policy: {
      cooldownHours: 3,
      voucherValidityDays: 15,
      tokenValidityMinutes: 15
    },
    rewardMilestones: [
      { stampThreshold: 2, rewardTitle: 'Cucurucho Simple', icon: 'cup' },
      { stampThreshold: 5, rewardTitle: 'Cucurucho Bañado', icon: 'gift' },
      { stampThreshold: 9, rewardTitle: 'Vaso Térmico Gelato', icon: 'crown', isMajorReward: true }
    ]
  },
  barberia: {
    businessId: 'barberia',
    totalRoadmapStamps: 5,
    policy: {
      cooldownHours: 24,
      voucherValidityDays: 30,
      tokenValidityMinutes: 30
    },
    rewardMilestones: [
      { stampThreshold: 1, rewardTitle: 'Bebida de cortesía', icon: 'cup' },
      { stampThreshold: 2, rewardTitle: 'Perfilado de Barba', icon: 'gift' },
      { stampThreshold: 4, rewardTitle: 'Corte Clásico', icon: 'crown', isMajorReward: true }
    ]
  },
  'barberia-studio': {
    businessId: 'barberia-studio',
    totalRoadmapStamps: 6,
    policy: {
      cooldownHours: 24,
      voucherValidityDays: 30,
      tokenValidityMinutes: 30
    },
    rewardMilestones: [
      { stampThreshold: 1, rewardTitle: 'Bebida de cortesía', icon: 'cup' },
      { stampThreshold: 2, rewardTitle: 'Lavado Premium', icon: 'cup' },
      { stampThreshold: 3, rewardTitle: 'Pomada Peinado', icon: 'gift' },
      { stampThreshold: 5, rewardTitle: 'Corte Fade', icon: 'trophy' },
      { stampThreshold: 6, rewardTitle: 'Servicio VIP + Barba', icon: 'crown', isMajorReward: true }
    ]
  },
  panaderia: {
    businessId: 'panaderia',
    totalRoadmapStamps: 8,
    policy: {
      cooldownHours: 2,
      voucherValidityDays: 10,
      tokenValidityMinutes: 15
    },
    rewardMilestones: [
      { stampThreshold: 2, rewardTitle: 'Medialunas x2', icon: 'cup' },
      { stampThreshold: 5, rewardTitle: 'Pan de Masa Madre', icon: 'gift' },
      { stampThreshold: 8, rewardTitle: 'Docena de Facturas', icon: 'crown', isMajorReward: true }
    ]
  },
  'panaderia-masamadre': {
    businessId: 'panaderia-masamadre',
    totalRoadmapStamps: 10,
    policy: {
      cooldownHours: 2,
      voucherValidityDays: 10,
      tokenValidityMinutes: 15
    },
    rewardMilestones: [
      { stampThreshold: 2, rewardTitle: 'Chipá Caliente x4', icon: 'cup' },
      { stampThreshold: 4, rewardTitle: 'Café al paso + Medialunas', icon: 'cup' },
      { stampThreshold: 6, rewardTitle: 'Baguette Rústica', icon: 'gift' },
      { stampThreshold: 8, rewardTitle: '1/2 Docena de Facturas', icon: 'trophy' },
      { stampThreshold: 10, rewardTitle: 'Docena Especial + Torta', icon: 'crown', isMajorReward: true }
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
  },
  'cust-01:cafeteria-roma': {
    customerId: 'cust-01',
    businessId: 'cafeteria-roma',
    currentStamps: 3,
    lastStampAt: '2026-10-28T15:00:00Z',
    transactions: [
      { id: 'tx-r01', customerId: 'cust-01', businessId: 'cafeteria-roma', stampIndex: 1, createdAt: '2026-10-20T10:00:00Z' },
      { id: 'tx-r02', customerId: 'cust-01', businessId: 'cafeteria-roma', stampIndex: 2, createdAt: '2026-10-24T11:30:00Z' },
      { id: 'tx-r03', customerId: 'cust-01', businessId: 'cafeteria-roma', stampIndex: 3, createdAt: '2026-10-28T15:00:00Z' }
    ],
    vouchers: [
      {
        id: 'vouch-r01',
        milestoneStamp: 3,
        rewardTitle: 'Espresso Doble',
        unlockedAt: '2026-10-28T15:00:00Z',
        expiresAt: '2026-11-12T15:00:00Z',
        status: 'ready'
      }
    ]
  },
  'cust-01:heladeria': {
    customerId: 'cust-01',
    businessId: 'heladeria',
    currentStamps: 4,
    lastStampAt: '2026-10-26T18:00:00Z',
    transactions: [
      { id: 'tx-h01', customerId: 'cust-01', businessId: 'heladeria', stampIndex: 1, createdAt: '2026-10-12T19:00:00Z' },
      { id: 'tx-h02', customerId: 'cust-01', businessId: 'heladeria', stampIndex: 2, createdAt: '2026-10-18T20:30:00Z' },
      { id: 'tx-h03', customerId: 'cust-01', businessId: 'heladeria', stampIndex: 3, createdAt: '2026-10-22T21:15:00Z' },
      { id: 'tx-h04', customerId: 'cust-01', businessId: 'heladeria', stampIndex: 4, createdAt: '2026-10-26T18:00:00Z' }
    ],
    vouchers: [
      {
        id: 'vouch-h01',
        milestoneStamp: 2,
        rewardTitle: 'Topping Extra Bañado',
        unlockedAt: '2026-10-18T20:30:00Z',
        expiresAt: '2026-11-02T20:30:00Z',
        status: 'redeemed',
        redeemedAt: '2026-10-20T19:00:00Z'
      },
      {
        id: 'vouch-h02',
        milestoneStamp: 4,
        rewardTitle: 'Cucurucho 2 bochas',
        unlockedAt: '2026-10-26T18:00:00Z',
        expiresAt: '2026-11-10T18:00:00Z',
        status: 'ready'
      }
    ]
  },
  'cust-01:heladeria-gelato': {
    customerId: 'cust-01',
    businessId: 'heladeria-gelato',
    currentStamps: 2,
    lastStampAt: '2026-10-29T20:00:00Z',
    transactions: [
      { id: 'tx-hg01', customerId: 'cust-01', businessId: 'heladeria-gelato', stampIndex: 1, createdAt: '2026-10-22T20:00:00Z' },
      { id: 'tx-hg02', customerId: 'cust-01', businessId: 'heladeria-gelato', stampIndex: 2, createdAt: '2026-10-29T20:00:00Z' }
    ],
    vouchers: [
      {
        id: 'vouch-hg01',
        milestoneStamp: 2,
        rewardTitle: 'Cucurucho Simple',
        unlockedAt: '2026-10-29T20:00:00Z',
        expiresAt: '2026-11-13T20:00:00Z',
        status: 'ready'
      }
    ]
  },
  'cust-01:barberia': {
    customerId: 'cust-01',
    businessId: 'barberia',
    currentStamps: 2,
    lastStampAt: '2026-10-25T16:00:00Z',
    transactions: [
      { id: 'tx-b01', customerId: 'cust-01', businessId: 'barberia', stampIndex: 1, createdAt: '2026-09-28T16:00:00Z' },
      { id: 'tx-b02', customerId: 'cust-01', businessId: 'barberia', stampIndex: 2, createdAt: '2026-10-25T16:00:00Z' }
    ],
    vouchers: [
      {
        id: 'vouch-b01',
        milestoneStamp: 1,
        rewardTitle: 'Bebida de cortesía',
        unlockedAt: '2026-09-28T16:00:00Z',
        expiresAt: '2026-10-28T16:00:00Z',
        status: 'redeemed',
        redeemedAt: '2026-09-28T16:10:00Z'
      },
      {
        id: 'vouch-b02',
        milestoneStamp: 2,
        rewardTitle: 'Perfilado de Barba',
        unlockedAt: '2026-10-25T16:00:00Z',
        expiresAt: '2026-11-25T16:00:00Z',
        status: 'ready'
      }
    ]
  },
  'cust-01:barberia-studio': {
    customerId: 'cust-01',
    businessId: 'barberia-studio',
    currentStamps: 4,
    lastStampAt: '2026-10-27T17:30:00Z',
    transactions: [
      { id: 'tx-bs01', customerId: 'cust-01', businessId: 'barberia-studio', stampIndex: 1, createdAt: '2026-07-20T17:00:00Z' },
      { id: 'tx-bs02', customerId: 'cust-01', businessId: 'barberia-studio', stampIndex: 2, createdAt: '2026-08-22T17:30:00Z' },
      { id: 'tx-bs03', customerId: 'cust-01', businessId: 'barberia-studio', stampIndex: 3, createdAt: '2026-09-24T18:00:00Z' },
      { id: 'tx-bs04', customerId: 'cust-01', businessId: 'barberia-studio', stampIndex: 4, createdAt: '2026-10-27T17:30:00Z' }
    ],
    vouchers: [
      {
        id: 'vouch-bs01',
        milestoneStamp: 3,
        rewardTitle: 'Pomada Peinado',
        unlockedAt: '2026-09-24T18:00:00Z',
        expiresAt: '2026-10-24T18:00:00Z',
        status: 'redeemed',
        redeemedAt: '2026-09-25T10:00:00Z'
      }
    ]
  },
  'cust-01:panaderia': {
    customerId: 'cust-01',
    businessId: 'panaderia',
    currentStamps: 2,
    lastStampAt: '2026-10-29T08:30:00Z',
    transactions: [
      { id: 'tx-p01', customerId: 'cust-01', businessId: 'panaderia', stampIndex: 1, createdAt: '2026-10-26T08:00:00Z' },
      { id: 'tx-p02', customerId: 'cust-01', businessId: 'panaderia', stampIndex: 2, createdAt: '2026-10-29T08:30:00Z' }
    ],
    vouchers: [
      {
        id: 'vouch-p01',
        milestoneStamp: 2,
        rewardTitle: 'Medialunas x2',
        unlockedAt: '2026-10-29T08:30:00Z',
        expiresAt: '2026-11-08T08:30:00Z',
        status: 'ready'
      }
    ]
  },
  'cust-01:panaderia-masamadre': {
    customerId: 'cust-01',
    businessId: 'panaderia-masamadre',
    currentStamps: 5,
    lastStampAt: '2026-10-30T09:00:00Z',
    transactions: [
      { id: 'tx-pm01', customerId: 'cust-01', businessId: 'panaderia-masamadre', stampIndex: 1, createdAt: '2026-10-21T09:00:00Z' },
      { id: 'tx-pm02', customerId: 'cust-01', businessId: 'panaderia-masamadre', stampIndex: 2, createdAt: '2026-10-23T09:15:00Z' },
      { id: 'tx-pm03', customerId: 'cust-01', businessId: 'panaderia-masamadre', stampIndex: 3, createdAt: '2026-10-25T08:45:00Z' },
      { id: 'tx-pm04', customerId: 'cust-01', businessId: 'panaderia-masamadre', stampIndex: 4, createdAt: '2026-10-28T09:00:00Z' },
      { id: 'tx-pm05', customerId: 'cust-01', businessId: 'panaderia-masamadre', stampIndex: 5, createdAt: '2026-10-30T09:00:00Z' }
    ],
    vouchers: [
      {
        id: 'vouch-pm01',
        milestoneStamp: 2,
        rewardTitle: 'Chipá Caliente x4',
        unlockedAt: '2026-10-23T09:15:00Z',
        expiresAt: '2026-11-02T09:15:00Z',
        status: 'redeemed',
        redeemedAt: '2026-10-24T10:00:00Z'
      },
      {
        id: 'vouch-pm02',
        milestoneStamp: 4,
        rewardTitle: 'Café al paso + Medialunas',
        unlockedAt: '2026-10-28T09:00:00Z',
        expiresAt: '2026-11-07T09:00:00Z',
        status: 'ready'
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
