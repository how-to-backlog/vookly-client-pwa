import React, { Suspense } from 'react';
import { LocalTopBar } from '@/components/navigation/LocalTopBar';
import { LocalFooterSummary } from '@/components/local/LocalFooterSummary';
import { RoadmapCanvas } from '@/components/roadmap/RoadmapCanvas';
import {
  MOCK_BUSINESS_CAFETERIA,
  MOCK_RULES_CAFETERIA,
  MOCK_CUSTOMER_STATUS_CAFETERIA
} from '@/data/mockLoyalty';

interface LocalPageProps {
  params: Promise<{
    id: string;
  }>;
}

async function LocalContent({ params }: LocalPageProps) {
  // Consumimos params de forma segura para Next.js 16 (disponible para consultas dinámicas futuras)
  await params;

  // En el futuro, acá se consulta la API/DB por el ID del comercio y del cliente.
  // Por ahora alimentamos el bloque Lego con el modelo formal desacoplado.
  const business = MOCK_BUSINESS_CAFETERIA;
  const rules = MOCK_RULES_CAFETERIA;
  const status = MOCK_CUSTOMER_STATUS_CAFETERIA;

  // Cálculo matemático del próximo premio según el contrato
  const nextMilestone = rules.rewardMilestones.find(
    (m) => m.stampThreshold > status.currentStamps
  );
  const stampsToNext = nextMilestone
    ? nextMilestone.stampThreshold - status.currentStamps
    : 0;

  return (
    <main className="w-full max-w-md h-screen max-h-screen bg-white text-black relative flex flex-col overflow-hidden pb-24">
      {/* 1. Barra superior fija minimalista con flecha volver */}
      <LocalTopBar />

      {/* 2. Área central para el Roadmap (scroll libre con autofoco) */}
      <RoadmapCanvas
        rules={rules}
        currentStamps={status.currentStamps}
      />

      {/* 3. Franja horizontal inferior fija */}
      <LocalFooterSummary
        businessName={business.name}
        address={business.address}
        currentStamps={status.currentStamps}
        stampsToNextReward={stampsToNext}
        nextRewardTitle={nextMilestone?.rewardTitle}
        locationUrl={business.location?.googleMapsUrl}
      />
    </main>
  );
}

export default function LocalPage(props: LocalPageProps) {
  return (
    <div className="min-h-screen bg-white flex justify-center">
      <Suspense fallback={<div className="w-full max-w-md min-h-screen bg-white" />}>
        <LocalContent {...props} />
      </Suspense>
    </div>
  );
}
