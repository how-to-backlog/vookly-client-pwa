'use client';

import React, { Suspense, useState } from 'react';
import { LocalTopBar } from '@/components/navigation/LocalTopBar';
import { LocalFooterSummary } from '@/components/local/LocalFooterSummary';
import { BottomSheetNodeDetail } from '@/components/local/BottomSheetNodeDetail';
import { NodeDetailContent } from '@/components/local/NodeDetailContent';
import { RoadmapCanvas } from '@/components/roadmap/RoadmapCanvas';
import {
  getBusinessSync,
  getBusinessLoyaltyRulesSync,
  getCustomerWalletSync,
  claimVoucherToken
} from '@/services/loyaltyRepository';
import { calculateCooldown } from '@/lib/loyaltyRules';
import {
  InteractiveNodeSelection
} from '@/types/loyalty';

interface LocalPageProps {
  params: Promise<{
    id: string;
  }>;
}

function LocalContent({ params }: LocalPageProps) {
  // Consumimos params de forma segura en Next.js 16
  const resolvedParams = React.use(params);
  const businessId = resolvedParams.id;

  // Por convención el cliente actual es 'cust-01' (sesión activa en PWA)
  const customerId = 'cust-01';

  // Datos inmediatos sincrónicos del repositorio (sin parpadeos de carga en SSR/Cliente)
  const business = getBusinessSync(businessId);
  const rules = getBusinessLoyaltyRulesSync(businessId);
  const initialWallet = getCustomerWalletSync(customerId, businessId);

  // Estado mutable de la billetera (para persistir canjes en memoria)
  const [wallet, setWallet] = useState(initialWallet);

  // Estado reactivo del nodo seleccionado por tap en el Roadmap
  const [selectedNode, setSelectedNode] = useState<InteractiveNodeSelection | null>(null);

  // Estado para saber en qué escena está el modal ('info' | 'warning' | 'active_token')
  const [currentScene, setCurrentScene] = useState<'info' | 'warning' | 'active_token'>('info');

  // Estado para desplegar el modal de info desde el botón de la cabecera
  const [showInfoModal, setShowInfoModal] = useState(false);

  if (!business || !rules || !wallet) {
    return (
      <div className="w-full max-w-md h-screen flex flex-col items-center justify-center bg-white text-neutral-500 px-6 text-center">
        <h2 className="text-[18px] font-black text-neutral-900">Comercio no encontrado</h2>
        <p className="text-[13px] text-neutral-500 mt-1">El identificador &quot;{businessId}&quot; no existe en la base de datos de Vookly.</p>
      </div>
    );
  }

  // Cálculo matemático del próximo premio según las reglas del local
  const nextMilestone = rules.rewardMilestones.find(
    (m) => m.stampThreshold > wallet.currentStamps
  );
  const stampsToNext = nextMilestone
    ? nextMilestone.stampThreshold - wallet.currentStamps
    : 0;

  // Cálculo desacoplado del cooldown universal según la política del local
  const cooldownHours = rules.policy?.cooldownHours || 3;
  const cooldown = calculateCooldown(wallet.lastStampAt, cooldownHours);

  // Detección de vouchers: si está en cooldown, no se habilita el botón de reclamo todavía
  const readyVoucher = cooldown.isCoolingDown
    ? undefined
    : wallet.vouchers?.find((v) => v.status === 'ready');

  // Callback cuando se toca el botón de reclamar en el footer
  const handleClaimFromFooter = () => {
    if (readyVoucher) {
      const rewardNode = rules.rewardMilestones.find(
        (m) => m.stampThreshold === readyVoucher.milestoneStamp
      );
      if (rewardNode) {
        const transaction = wallet.transactions?.find(
          (t) => t.stampIndex === rewardNode.stampThreshold
        );

        setSelectedNode({
          stampIndex: rewardNode.stampThreshold,
          point: { x: 180, y: 710 }, // posición referencial
          isReward: true,
          rewardTitle: rewardNode.rewardTitle,
          isMajorReward: rewardNode.isMajorReward,
          interactiveState: 'reward_ready',
          voucher: readyVoucher,
          transaction,
          label: `Sello ${rewardNode.stampThreshold}: ${rewardNode.rewardTitle}`,
          description: 'Premio desbloqueado. Listo para reclamar en el mostrador.'
        });
      }
    }
  };

  // Callback para generar y persistir el token de 4 dígitos en el repositorio
  const handleClaimToken = async () => {
    if (readyVoucher) {
      const token = await claimVoucherToken('cust-01', businessId, readyVoucher.id);
      if (token) {
        // Actualizamos localmente el voucher para reflejar el token sin recargar
        setWallet((prev) => {
          if (!prev || !prev.vouchers) return prev;
          const updatedVouchers = prev.vouchers.map((v) =>
            v.id === readyVoucher.id ? { ...v, activeCode: token } : v
          );
          return { ...prev, vouchers: updatedVouchers };
        });
      }
    }
  };

  return (
    <main className="w-full max-w-md h-screen max-h-screen bg-white text-black relative flex flex-col overflow-hidden pb-24">
      {/* 1. Barra superior fija minimalista con flecha volver */}
      <LocalTopBar />

      {/* 2. Área central para el Roadmap (scroll libre con autofoco e interactividad táctil) */}
      <RoadmapCanvas
        rules={rules}
        walletStatus={wallet}
        selectedNodeIndex={selectedNode?.stampIndex ?? null}
        onSelectNode={setSelectedNode}
      />

      {/* 3. Franja horizontal inferior fija con Zona de Notificaciones Dinámica */}
      <LocalFooterSummary
        businessName={business.name}
        address={business.address}
        currentStamps={wallet.currentStamps}
        stampsToNextReward={stampsToNext}
        nextRewardTitle={nextMilestone?.rewardTitle}
        cooldownRemainingMinutes={cooldown.isCoolingDown ? cooldown.remainingMinutes : undefined}
        readyVoucher={readyVoucher}
        onClaimReward={handleClaimFromFooter}
        locationUrl={business.location?.googleMapsUrl}
      />

      {/* 4. Bottom Sheet Modal para detalles de nodo y canje seguro de vouchers */}
      <BottomSheetNodeDetail
        isOpen={selectedNode !== null}
        onClose={() => {
          setSelectedNode(null);
          setCurrentScene('info');
          setShowInfoModal(false);
        }}
        ariaLabel={selectedNode?.label}
        onInfoClick={
          currentScene === 'warning' || currentScene === 'active_token'
            ? () => setShowInfoModal(true)
            : undefined
        }
      >
        {selectedNode && (
          <NodeDetailContent
            selection={selectedNode}
            businessName={business.name}
            onClaim={handleClaimToken}
            onSceneChange={setCurrentScene}
          />
        )}
      </BottomSheetNodeDetail>

      {/* 5. Ventana Emergente Modal Centrada en Pantalla con Fondo Difuminado */}
      {showInfoModal && (
        <div
          role="dialog"
          aria-modal="true"
          onClick={() => setShowInfoModal(false)}
          className="fixed inset-0 z-60 bg-black/40 backdrop-blur-xs flex items-center justify-center p-6 animate-in fade-in duration-200"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-[320px] bg-white rounded-2xl p-5 shadow-2xl border border-neutral-100 flex flex-col animate-in zoom-in-95 duration-150 text-left select-none"
          >
            {/* Cabecera */}
            <div className="flex items-center justify-between mb-3 pb-2 border-b border-neutral-100">
              <span className="text-[12px] font-bold text-neutral-900 tracking-tight">
                Información de canje
              </span>
              <button
                type="button"
                onClick={() => setShowInfoModal(false)}
                aria-label="Cerrar información"
                className="w-6 h-6 rounded-full bg-neutral-100 hover:bg-neutral-200 text-neutral-500 hover:text-black flex items-center justify-center text-[12px] font-bold transition-colors"
              >
                ✕
              </button>
            </div>

            {/* Texto en un solo bloque continuo sin sangría */}
            <div className="text-[13px] text-neutral-700 font-medium leading-relaxed">
              <p>Código válido durante 15 minutos.</p>
              <p className="mt-2 text-neutral-600">Este canje no suma un nuevo sello, pero si comprás algo más, ¡sí te suma!</p>
            </div>

            {/* Botón que abarca solo el texto */}
            <div className="mt-5 flex justify-center">
              <button
                type="button"
                onClick={() => setShowInfoModal(false)}
                className="inline-flex items-center justify-center px-6 py-1.5 rounded-full bg-neutral-950 hover:bg-neutral-800 text-white font-bold text-[12px] shadow-2xs active:scale-95 transition-all"
              >
                Entendido
              </button>
            </div>
          </div>
        </div>
      )}
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
