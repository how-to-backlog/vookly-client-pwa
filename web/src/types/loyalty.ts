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

export interface BusinessLoyaltyRules {
  businessId: string;
  totalRoadmapStamps: number;
  rewardMilestones: RewardMilestone[];
}

export interface CustomerWalletStatus {
  customerId: string;
  businessId: string;
  currentStamps: number;
  lastStampAt?: string;
}

/** Contrato derivado puro para la franja horizontal fija inferior */
export interface LocalFooterSummaryProps {
  businessName: string;
  address: string;
  currentStamps: number;
  stampsToNextReward?: number;
  nextRewardTitle?: string;
  locationUrl?: string;
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

export interface RoadmapNodePoint {
  stampIndex: number; // 0 para inicio (o 1..totalStamps para sellos)
  point: Point2D;
  isReward: boolean;
  rewardTitle?: string;
  isMajorReward?: boolean;
  isCompleted: boolean;
  status: 'completed' | 'current' | 'locked';
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

