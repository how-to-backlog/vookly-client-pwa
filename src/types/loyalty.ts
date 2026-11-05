/**
 * Tipos de datos para el dominio de fidelización de Vookly.
 * Refleja exactamente el contrato formal de docs/schema_pantalla_local_roadmap.json.
 */

export interface LocationCoordinates {
  latitude: number;
  longitude: number;
  googleMapsUrl?: string;
}

export interface BusinessProfile {
  id: string;
  name: string;
  category: string;
  address: string;
  location?: LocationCoordinates;
  cardImage: string;
  accentColor?: string;
}

export interface RewardMilestone {
  stampThreshold: number;
  rewardTitle: string;
  icon?: 'cup' | 'gift' | 'trophy' | 'crown';
  isMajorReward?: boolean;
}

export interface BusinessLoyaltyPolicy {
  cooldownHours: number; // Horas de enfriamiento universal tras compra (ej: 3)
  voucherValidityDays: number; // Días de vigencia del voucher al ser desbloqueado (ej: 15)
  tokenValidityMinutes: number; // Minutos de vigencia del token efímero de 4 dígitos (ej: 15)
}

export interface BusinessLoyaltyRules {
  businessId: string;
  totalRoadmapStamps: number;
  rewardMilestones: RewardMilestone[];
  policy?: BusinessLoyaltyPolicy;
}

export interface VoucherTokenEntity {
  code: string; // 4 dígitos numéricos (ej: '4892')
  generatedAt: string; // ISO timestamp
  expiresAt: string; // ISO timestamp
}

export interface CustomerVoucher {
  id: string;
  milestoneStamp: number;
  rewardTitle: string;
  unlockedAt: string;
  expiresAt: string; // Calculado según policy.voucherValidityDays
  status: 'cooling_down' | 'ready' | 'redeemed';
  redeemedAt?: string; // ISO timestamp cuando fue consumido en caja
  activeCode?: VoucherTokenEntity;
}

export interface StampTransaction {
  id: string;
  customerId: string;
  businessId: string;
  stampIndex: number;
  createdAt: string; // ISO timestamp exacto de la compra
}

export interface CustomerWalletStatus {
  customerId: string;
  businessId: string;
  currentStamps: number;
  lastStampAt?: string; // Fecha de última compra para calcular cooldown
  cooldownUntil?: string; // Fin de cooldown (lastStampAt + policy.cooldownHours)
  vouchers?: CustomerVoucher[];
  transactions?: StampTransaction[];
}

/** Contrato derivado puro para la franja horizontal fija inferior */
export interface LocalFooterSummaryProps {
  businessName: string;
  address: string;
  currentStamps: number;
  stampsToNextReward?: number;
  nextRewardTitle?: string;
  locationUrl?: string;
  cooldownRemainingMinutes?: number; // Para mostrar 'Disponible en HH:MM hs'
  readyVoucher?: CustomerVoucher; // Para activar el botón sobrio 'Reclamar premio'
  onClaimReward?: () => void; // Dispara apertura de Bottom Sheet
  /** Premio ya canjeado cuyo token sigue vigente: habilita 'Ver mi código'. */
  redeemedVoucher?: CustomerVoucher;
  onViewRedeemedCode?: () => void;
  className?: string;
}

/** Geometría del Roadmap */
export interface Point2D {
  x: number;
  y: number;
}

export interface CubicBezierSegment {
  p0: Point2D;
  p1: Point2D;
  p2: Point2D;
  p3: Point2D;
  startStamp: number;
  endStamp: number;
}

/** Matriz formal de los 7 estados interactivos de nodos del Roadmap */
export type RoadmapNodeInteractiveState =
  | 'regular_completed' // (a) Sello regular completado en visitas previas
  | 'current_position' // (b) Posición actual del cliente ('Estás acá')
  | 'regular_locked' // (c) Sello regular futuro bloqueado
  | 'reward_cooldown' // (d) Hito de premio desbloqueado pero congelado en cooldown (3h)
  | 'reward_ready' // (e) Hito de premio listo para canjear (voucher activo, vigencia 15 días)
  | 'reward_redeemed' // (f) Hito de premio histórico ya canjeado y consumido
  | 'reward_locked'; // (g) Hito de premio futuro bloqueado con umbral restante

export interface RoadmapNodePoint {
  stampIndex: number; // 0 para inicio (o 1..totalStamps para sellos)
  point: Point2D;
  isReward: boolean;
  rewardTitle?: string;
  isMajorReward?: boolean;
  isCompleted: boolean;
  status: 'completed' | 'current' | 'locked';
  // Estado interactivo enriquecido
  interactiveState?: RoadmapNodeInteractiveState;
  voucher?: CustomerVoucher;
  transaction?: StampTransaction; // Registro de obtención si ya fue completado
  cooldownRemainingMinutes?: number;
  stampsRemaining?: number;
}

/** Payload enriquecido de selección al interactuar con un nodo */
export interface InteractiveNodeSelection {
  stampIndex: number;
  point: Point2D;
  isReward: boolean;
  rewardTitle?: string;
  isMajorReward?: boolean;
  interactiveState: RoadmapNodeInteractiveState;
  voucher?: CustomerVoucher;
  transaction?: StampTransaction;
  cooldownRemainingMinutes?: number;
  stampsRemaining?: number;
  label: string; // Etiqueta legible humana (ej: "Sello 15: Tostado Especial")
  description: string; // Descripción del estado para lectores y modales
}

export interface RoadmapHorizonExtension {
  pathD: string;
  endPoint: Point2D;
}

export interface RoadmapGeometryResult {
  width: number;
  height: number;
  segments: CubicBezierSegment[];
  nodes: RoadmapNodePoint[];
  completedPathD: string;
  futurePathD: string;
  currentPoint?: Point2D;
  originPoint: Point2D;
  horizon: RoadmapHorizonExtension;
}

// ============================================================================
// SIMULADOR DEMO DE COMERCIO (HERRAMIENTA AUXILIAR)
// ============================================================================

/**
 * Tramo individual de recompensa configurable.
 * stampsFromPrevious representa los sellos incrementales (Delta S) desde el premio anterior.
 * Para el primer premio: sellos desde el inicio (mínimo 1).
 * Para los subsiguientes: sellos adicionales (0 a 6).
 */
export interface DemoRewardTier {
  id: string;
  stampsFromPrevious: number; // Delta S
  rewardTitle: string;
}

/**
 * Configuración completa del simulador demo
 */
export interface DemoSimulatorConfig {
  businessName: string;
  tiers: DemoRewardTier[];
  simulatedCurrentStamps: number;
}

/**
 * Hito absoluto computado para alimentar el motor matemático de fidelización
 */
export interface ComputedDemoMilestone {
  tierIndex: number;
  stampThreshold: number;
  rewardTitle: string;
  isMajorReward: boolean;
}


