'use client';

import React, { Suspense, useCallback, useState, useSyncExternalStore } from 'react';
import { LocalTopBar } from '@/components/navigation/LocalTopBar';
import { LocalFooterSummary } from '@/components/local/LocalFooterSummary';
import { BottomSheetNodeDetail } from '@/components/local/BottomSheetNodeDetail';
import { NodeDetailContent } from '@/components/local/NodeDetailContent';
import { RoadmapCanvas } from '@/components/roadmap/RoadmapCanvas';
import { LocalDemoSimulatorModal } from '@/components/local/LocalDemoSimulatorModal';
import {
  getBusinessSync,
  getBusinessLoyaltyRulesSync,
  getCustomerWalletSync,
  claimVoucherToken
} from '@/services/loyaltyRepository';
import {
  loadDemoSimulatorConfig,
  saveDemoSimulatorConfig,
  clearDemoSimulatorConfig,
  applyDemoConfigToEntities,
  getDefaultDemoConfig,
  getDemoSimulatorConfigSnapshot
} from '@/services/demoSimulatorStorage';
import {
  applyRedemptionsToWallet,
  clearAllRedemptions,
  clearRedemption,
  isTokenActive,
  getRedemptionsSnapshot,
  saveRedemption,
  subscribeToRedemptions
} from '@/services/redemptionStorage';
import { calculateCooldown } from '@/lib/loyaltyRules';
import {
  DemoSimulatorConfig,
  InteractiveNodeSelection,
  VoucherTokenEntity
} from '@/types/loyalty';

interface LocalPageProps {
  params: Promise<{
    id: string;
  }>;
}

// Snapshot del servidor para useSyncExternalStore: tiene que ser la MISMA
// referencia en cada llamada, si no React avisa que puede haber un loop
// infinito de renders.
const EMPTY_REDEMPTIONS: Map<number, VoucherTokenEntity> = new Map();
const FALLBACK_SIMULATOR_CONFIG: DemoSimulatorConfig = {
  businessName: 'Coffee Shop',
  tiers: [{ id: 'tier-1', stampsFromPrevious: 5, rewardTitle: 'Premio Especial' }],
  simulatedCurrentStamps: 1
};

function LocalContent({ params }: LocalPageProps) {
  // Consumimos params de forma segura en Next.js 16
  const resolvedParams = React.use(params);
  const businessId = resolvedParams.id;

  // Por convención el cliente actual es 'cust-01' (sesión activa en PWA)
  const customerId = 'cust-01';

  // Datos inmediatos sincrónicos del repositorio (sin parpadeos de carga en SSR/Cliente)
  const business = getBusinessSync(businessId);
  const baseRules = getBusinessLoyaltyRulesSync(businessId);
  const initialWallet = getCustomerWalletSync(customerId, businessId);

  // Estado mutable de la billetera (para persistir canjes en memoria)
  const [wallet, setWallet] = useState(initialWallet);

  // Canjes persistidos: sobreviven al cierre del bottom sheet y al reload.
  // El token emitido (con su expiresAt) es la fuente de verdad del estado
  // "canjeado", no el estado local del componente que lo muestra.
  //
  // localStorage es una fuente EXTERNA, así que se lee con useSyncExternalStore:
  // el servidor devuelve el snapshot vacío (no puede tocar el storage) y el
  // cliente devuelve el real. Así no hay setState dentro de un efecto ni
  // mismatch de hidratación.
  const redemptions = useSyncExternalStore(
    (onStoreChange) => subscribeToRedemptions(customerId, businessId, onStoreChange),
    () => getRedemptionsSnapshot(customerId, businessId),
    () => EMPTY_REDEMPTIONS
  );

  const subscribeToStorage = useCallback((onStoreChange: () => void) => {
    if (typeof window === 'undefined') return () => {};
    window.addEventListener('storage', onStoreChange);
    return () => window.removeEventListener('storage', onStoreChange);
  }, []);

  const simulatorConfig = useSyncExternalStore(
    subscribeToStorage,
    () => {
      if (business && baseRules && initialWallet) {
        return getDemoSimulatorConfigSnapshot(businessId, business.name, baseRules, initialWallet);
      }
      return FALLBACK_SIMULATOR_CONFIG;
    },
    () => {
      if (business && baseRules && initialWallet) {
        return getDefaultDemoConfig(business.name, baseRules, initialWallet);
      }
      return FALLBACK_SIMULATOR_CONFIG;
    }
  );

  const [isSimulatorOpen, setIsSimulatorOpen] = useState(false);

  // Derivamos dinámicamente las reglas y la billetera en función de la configuración del simulador
  const activeEntities = (business && baseRules && wallet)
    ? applyDemoConfigToEntities(simulatorConfig, baseRules, wallet)
    : { rules: baseRules, wallet };

  const effectiveRules = activeEntities.rules;
  // El simulador regenera los vouchers desde cero, así que el código emitido
  // (activeCode) hay que reinyectarlo desde la billetera base para que el
  // token no se pierda al derivar.
  const walletWithCodes = activeEntities.wallet
    ? {
        ...activeEntities.wallet,
        vouchers: activeEntities.wallet.vouchers?.map((v) => {
          const baseVoucher = wallet?.vouchers?.find((bv) => bv.id === v.id);
          return baseVoucher?.activeCode ? { ...v, activeCode: baseVoucher.activeCode } : v;
        })
      }
    : activeEntities.wallet;
  // Los canjes persistidos mandan sobre el estado del voucher: si el token
  // sigue vigente el premio está canjeado; si venció, vuelve a estar
  // disponible para reclamar.
  const effectiveWallet = walletWithCodes
    ? (applyRedemptionsToWallet(walletWithCodes, redemptions) as typeof walletWithCodes)
    : walletWithCodes;
  const effectiveBusinessName = simulatorConfig.businessName || business?.name || 'Coffee Shop';

  // Estado reactivo del nodo seleccionado por tap en el Roadmap
  const [selectedNode, setSelectedNode] = useState<InteractiveNodeSelection | null>(null);

  // Estado para saber en qué escena está el modal ('info' | 'warning' | 'active_token')
  const [currentScene, setCurrentScene] = useState<'info' | 'warning' | 'active_token'>('info');

  // Estado para desplegar el modal de info desde el botón de la cabecera
  const [showInfoModal, setShowInfoModal] = useState(false);

  // Callback para rebobinar el ticket (modo demo/showroom):
  // Limpia el token del storage y resetea la escena para que el ticket vuelva a estar intacto.
  const handleResetTicket = useCallback(() => {
    const milestoneStamp = selectedNode?.voucher?.milestoneStamp;
    if (milestoneStamp !== undefined) {
      clearRedemption(customerId, businessId, milestoneStamp);
    }
  }, [customerId, businessId, selectedNode]);

  // Cuando el token expira, el premio vuelve a estar disponible para reclamar:
  // limpiamos el canje persistido para que la billetera vuelva a 'ready'.
  // Usamos el hito del nodo seleccionado porque, mientras el token está
  // vigente, el voucher ya está en estado 'redeemed' y no es el 'ready'.
  const handleTokenExpired = useCallback(() => {
    const milestoneStamp = selectedNode?.voucher?.milestoneStamp;
    if (milestoneStamp === undefined) return;
    clearRedemption(customerId, businessId, milestoneStamp);
  }, [customerId, businessId, selectedNode]);

  if (!business || !effectiveRules || !effectiveWallet) {
    return (
      <div className="w-full max-w-md h-screen flex flex-col items-center justify-center bg-white text-neutral-500 px-6 text-center">
        <h2 className="text-[18px] font-black text-neutral-900">Comercio no encontrado</h2>
        <p className="text-[13px] text-neutral-500 mt-1">El identificador &quot;{businessId}&quot; no existe en la base de datos de Vookly.</p>
      </div>
    );
  }

  // Cálculo matemático del próximo premio según las reglas del local
  const nextMilestone = effectiveRules.rewardMilestones.find(
    (m) => m.stampThreshold > effectiveWallet.currentStamps
  );
  const stampsToNext = nextMilestone
    ? nextMilestone.stampThreshold - effectiveWallet.currentStamps
    : 0;

  // Cálculo desacoplado del cooldown universal según la política del local
  const cooldownHours = effectiveRules.policy?.cooldownHours || 3;
  const cooldown = calculateCooldown(effectiveWallet.lastStampAt, cooldownHours);

  // Detección de vouchers: si está en cooldown, no se habilita el botón de reclamo todavía
  const readyVoucher = cooldown.isCoolingDown
    ? undefined
    : effectiveWallet.vouchers?.find((v) => v.status === 'ready');

  // Premio ya canjeado cuyo token sigue vigente: el cliente puede volver a
  // ver su código desde el footer sin pasar por el gate otra vez.
  const redeemedVoucher = effectiveWallet.vouchers?.find(
    (v) => v.status === 'redeemed' && isTokenActive(v.activeCode)
  );

  // Callback cuando se toca el botón de reclamar en el footer
  const handleClaimFromFooter = () => {
    if (readyVoucher) {
      const rewardNode = effectiveRules.rewardMilestones.find(
        (m) => m.stampThreshold === readyVoucher.milestoneStamp
      );
      if (rewardNode) {
        const transaction = effectiveWallet.transactions?.find(
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

  // Callback para generar y persistir el token de 4 dígitos del canje.
  // Devuelve el token emitido (código + expiración) para que la coreografía
  // pueda mostrarlo y derivar el timer de su expiresAt.
  //
  // El simulador deriva vouchers con ids sintéticos (voucher-15) y puede
  // configurar hitos que el catálogo estático del repositorio no tiene
  // (por ejemplo, "Brunch Completo" en el hito 20). Por eso:
  //   1. intentamos emitir el token en el repositorio (fuente de verdad cuando
  //      el voucher existe), y
  //   2. si el repositorio no conoce el hito, emitimos el token acá con el
  //      mismo formato (4 dígitos, la ventana de validez de la política),
  //      porque el token es efímero y la coreografía solo necesita el código.
  const handleClaimToken = async (): Promise<VoucherTokenEntity | null> => {
    const milestoneStamp = readyVoucher?.milestoneStamp;
    if (milestoneStamp === undefined) return null;

    const repoVoucher = wallet?.vouchers?.find(
      (v) => v.milestoneStamp === milestoneStamp && v.status === 'ready'
    );

    let token: VoucherTokenEntity | null = null;

    if (repoVoucher) {
      token = await claimVoucherToken('cust-01', businessId, repoVoucher.id);
    }

    if (!token) {
      // Fallback: el hito no existe en el catálogo del repositorio (o su
      // voucher ya no está 'ready'). Emitimos el token en la capa de la app.
      const validityMinutes = effectiveRules?.policy?.tokenValidityMinutes || 15;
      const now = new Date();
      token = {
        code: Math.floor(1000 + Math.random() * 9000).toString(),
        generatedAt: now.toISOString(),
        expiresAt: new Date(now.getTime() + validityMinutes * 60 * 1000).toISOString()
      };
    }

    // Persistimos el canje: tiene que sobrevivir al cierre del sheet y al
    // reload para que el estado "canjeado" no se pierda.
    saveRedemption(customerId, businessId, milestoneStamp, token);

    // Actualizamos localmente el voucher para reflejar el token sin recargar
    setWallet((prev) => {
      if (!prev || !prev.vouchers) return prev;
      const updatedVouchers = prev.vouchers.map((v) =>
        v.milestoneStamp === milestoneStamp ? { ...v, activeCode: token } : v
      );
      return { ...prev, vouchers: updatedVouchers };
    });
    return token;
  };

  // Callback para volver a ver el código de un premio ya canjeado (token vigente).
  const handleViewRedeemedCode = () => {
    if (!redeemedVoucher) return;
    const rewardNode = effectiveRules.rewardMilestones.find(
      (m) => m.stampThreshold === redeemedVoucher.milestoneStamp
    );
    if (!rewardNode) return;
    const transaction = effectiveWallet.transactions?.find(
      (t) => t.stampIndex === rewardNode.stampThreshold
    );

    setSelectedNode({
      stampIndex: rewardNode.stampThreshold,
      point: { x: 180, y: 710 },
      isReward: true,
      rewardTitle: rewardNode.rewardTitle,
      isMajorReward: rewardNode.isMajorReward,
      interactiveState: 'reward_redeemed',
      voucher: redeemedVoucher,
      transaction,
      label: `Sello ${rewardNode.stampThreshold}: ${rewardNode.rewardTitle}`,
      description: 'Premio canjeado. Tu código sigue vigente por unos minutos.'
    });
    setCurrentScene('active_token');
  };

  const handleApplySimulator = (newConfig: DemoSimulatorConfig) => {
    saveDemoSimulatorConfig(businessId, newConfig);
    // Si el nodo seleccionado quedó fuera de rango tras el cambio, lo deseleccionamos
    setSelectedNode(null);
  };

  const handleResetSimulator = () => {
    clearDemoSimulatorConfig(businessId);
    // Reiniciar la demo limpia todo: también los canjes guardados de este
    // comercio. Si no, el premio quedaría en estado "canjeado" y no se
    // podría volver a rasgar el ticket para obtener un código nuevo.
    clearAllRedemptions(customerId, businessId);
    setSelectedNode(null);
  };

  return (
    <main className="w-full max-w-[640px] h-dvh max-h-dvh bg-white text-black relative flex flex-col overflow-hidden pb-[88px]">
      {/* 1. Barra superior fija minimalista con flecha volver y botón sintonizador */}
      <LocalTopBar onOpenSimulator={() => setIsSimulatorOpen(true)} />

      {/* 2. Área central para el Roadmap (scroll libre con autofoco e interactividad táctil) */}
      <RoadmapCanvas
        rules={effectiveRules}
        walletStatus={effectiveWallet}
        selectedNodeIndex={selectedNode?.stampIndex ?? null}
        onSelectNode={setSelectedNode}
      />

      {/* 3. Franja horizontal inferior fija con Zona de Notificaciones Dinámica */}
      <LocalFooterSummary
        businessName={effectiveBusinessName}
        address={business.address}
        currentStamps={effectiveWallet.currentStamps}
        stampsToNextReward={stampsToNext}
        nextRewardTitle={nextMilestone?.rewardTitle}
        cooldownRemainingMinutes={cooldown.isCoolingDown ? cooldown.remainingMinutes : undefined}
        readyVoucher={readyVoucher}
        redeemedVoucher={redeemedVoucher}
        onClaimReward={handleClaimFromFooter}
        onViewRedeemedCode={handleViewRedeemedCode}
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
        onResetTicketClick={
          currentScene === 'active_token' &&
          selectedNode?.voucher?.milestoneStamp !== undefined &&
          Boolean(redemptions.get(selectedNode.voucher.milestoneStamp))
            ? handleResetTicket
            : undefined
        }
      >
        {selectedNode && (
          <NodeDetailContent
            selection={selectedNode}
            businessName={effectiveBusinessName}
            onRequestToken={handleClaimToken}
            existingToken={
              selectedNode.voucher?.milestoneStamp !== undefined
                ? redemptions.get(selectedNode.voucher.milestoneStamp) ?? null
                : null
            }
            onTokenExpired={handleTokenExpired}
            initialScene={currentScene}
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

      {/* 6. Modal de Simulador Demo de Comercio montado condicionalmente */}
      {isSimulatorOpen && (
        <LocalDemoSimulatorModal
          isOpen={isSimulatorOpen}
          onClose={() => setIsSimulatorOpen(false)}
          config={simulatorConfig}
          onApply={handleApplySimulator}
          onReset={handleResetSimulator}
        />
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
