import { BusinessProfile, BusinessLoyaltyRules, CustomerWalletStatus } from '@/types/loyalty';

export const MOCK_BUSINESS_CAFETERIA: BusinessProfile = {
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
};

export const MOCK_RULES_CAFETERIA: BusinessLoyaltyRules = {
  businessId: 'cafeteria',
  totalRoadmapStamps: 30,
  rewardMilestones: [
    { stampThreshold: 5, rewardTitle: 'Café Clásico', icon: 'cup' },
    { stampThreshold: 10, rewardTitle: 'Café + Medialuna', icon: 'gift' },
    { stampThreshold: 15, rewardTitle: 'Tostado Especial', icon: 'gift' },
    { stampThreshold: 20, rewardTitle: 'Brunch Completo', icon: 'trophy' },
    { stampThreshold: 25, rewardTitle: 'Voucher $15.000', icon: 'crown', isMajorReward: true }
  ]
};

export const MOCK_CUSTOMER_STATUS_CAFETERIA: CustomerWalletStatus = {
  customerId: 'cust-01',
  businessId: 'cafeteria',
  currentStamps: 15,
  lastStampAt: '2026-10-28T16:20:00Z'
};
