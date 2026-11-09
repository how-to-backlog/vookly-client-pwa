'use client';

import React, { useState } from 'react';
import { DemoRewardTier, DemoSimulatorConfig } from '@/types/loyalty';
import { computeMilestonesFromTiers, computeTotalStampsFromTiers } from '@/services/demoSimulatorStorage';
import LiveCardPreview from '@/components/landing/onboarding/LiveCardPreview';
import CardColorPicker from '@/components/landing/onboarding/CardColorPicker';
import CardPatternPicker from '@/components/landing/onboarding/CardPatternPicker';
import { OFFICIAL_CARD_COLORS } from '@/data/cardPatternsRegistry';

export interface LocalDemoSimulatorModalProps {
  isOpen: boolean;
  onClose: () => void;
  config: DemoSimulatorConfig;
  onApply: (newConfig: DemoSimulatorConfig) => void;
  onReset: () => void;
}

// Presets de demostración comercial de 1 toque alineados a los 4 nichos oficiales
const DEMO_PRESETS: Array<{
  name: string;
  businessName: string;
  categoryIcon: 'cafeteria' | 'barberia' | 'heladeria' | 'panaderia';
  tiers: DemoRewardTier[];
}> = [
  {
    name: 'Cafetería',
    businessName: 'Coffee Shop',
    categoryIcon: 'cafeteria',
    tiers: [
      { id: 't1', stampsFromPrevious: 2, rewardTitle: 'Medialuna de manteca' },
      { id: 't2', stampsFromPrevious: 2, rewardTitle: 'Café Chico' },
      { id: 't3', stampsFromPrevious: 2, rewardTitle: 'Café Especial + Alfajor' },
      { id: 't4', stampsFromPrevious: 2, rewardTitle: 'Tostado Especial' },
      { id: 't5', stampsFromPrevious: 2, rewardTitle: 'Taza Cerámica Térmica' }
    ]
  },
  {
    name: 'Heladería',
    businessName: 'Heladería del Parque',
    categoryIcon: 'heladeria',
    tiers: [
      { id: 't1', stampsFromPrevious: 2, rewardTitle: 'Topping Extra Bañado' },
      { id: 't2', stampsFromPrevious: 2, rewardTitle: 'Cucurucho 2 bochas' },
      { id: 't3', stampsFromPrevious: 2, rewardTitle: '1/4 Kg de Helado' },
      { id: 't4', stampsFromPrevious: 2, rewardTitle: '1/2 Kg de Helado' },
      { id: 't5', stampsFromPrevious: 2, rewardTitle: 'Vaso Térmico + 1 Kg' }
    ]
  },
  {
    name: 'Barbería',
    businessName: 'La Barbería Club',
    categoryIcon: 'barberia',
    tiers: [
      { id: 't1', stampsFromPrevious: 1, rewardTitle: 'Bebida de cortesía' },
      { id: 't2', stampsFromPrevious: 1, rewardTitle: 'Perfilado de Barba' },
      { id: 't3', stampsFromPrevious: 2, rewardTitle: 'Corte Clásico' }
    ]
  },
  {
    name: 'Panadería',
    businessName: 'Panadería La Espiga',
    categoryIcon: 'panaderia',
    tiers: [
      { id: 't1', stampsFromPrevious: 2, rewardTitle: 'Medialunas x2' },
      { id: 't2', stampsFromPrevious: 2, rewardTitle: 'Pan de Masa Madre' },
      { id: 't3', stampsFromPrevious: 3, rewardTitle: 'Docena de Facturas' }
    ]
  }
];

export function LocalDemoSimulatorModal({
  isOpen,
  onClose,
  config,
  onApply,
  onReset
}: LocalDemoSimulatorModalProps) {
  // Estado borrador editable dentro del modal antes de aplicar
  const [draftBusinessName, setDraftBusinessName] = useState(config.businessName);
  const [draftCategory, setDraftCategory] = useState<'cafeteria' | 'barberia' | 'heladeria' | 'panaderia'>(
    config.categoryIcon || 'cafeteria'
  );
  const [draftStamps, setDraftStamps] = useState(config.simulatedCurrentStamps);
  const [draftTiers, setDraftTiers] = useState<DemoRewardTier[]>(config.tiers);

  // Estado borrador de apariencia (Color y Patrón de la tarjeta)
  const [draftBgColor, setDraftBgColor] = useState<string>(
    config.customBackgroundColor || OFFICIAL_CARD_COLORS[0].bg
  );
  const [draftInkColor, setDraftInkColor] = useState<string>(
    config.customInkColor || OFFICIAL_CARD_COLORS[0].ink
  );
  const [draftPatternId, setDraftPatternId] = useState<string>(
    config.customPatternId || 'formalInvitation'
  );

  if (!isOpen) return null;

  // Calculamos hitos y sellos totales resultantes de los tramos en tiempo real
  const computedMilestones = computeMilestonesFromTiers(draftTiers);
  const totalMaxStamps = computeTotalStampsFromTiers(draftTiers);

  // Aseguramos que los sellos actuales no superen el total y nunca sean menores a 1 (Regla onboarding)
  const safeStamps = Math.max(1, Math.min(draftStamps, totalMaxStamps));

  // Próximo hito por alcanzar: el primero cuyo umbral supera los sellos actuales.
  // Si los sellos actuales caen justo en un umbral, ese premio ya está listo para canjear.
  const nextMilestone = computedMilestones.find((m) => m.stampThreshold > safeStamps);
  const readyMilestone = computedMilestones.find((m) => m.stampThreshold === safeStamps);
  const previousMilestone = [...computedMilestones]
    .reverse()
    .find((m) => m.stampThreshold < safeStamps);

  const handleStepDown = () => {
    setDraftStamps((prev) => Math.max(1, prev - 1));
  };

  const handleStepUp = () => {
    setDraftStamps((prev) => Math.min(totalMaxStamps, prev + 1));
  };

  // Modificar un tramo individual
  const handleUpdateTier = (index: number, deltaS: number, title: string) => {
    setDraftTiers((prev) => {
      const copy = [...prev];
      copy[index] = {
        ...copy[index],
        stampsFromPrevious: Math.max(index === 0 ? 1 : 0, Math.min(6, deltaS)),
        rewardTitle: title
      };
      return copy;
    });
  };

  // Agregar nuevo tramo (máximo 5 premios)
  const handleAddTier = () => {
    if (draftTiers.length >= 5) return;
    const newId = `tier-${Date.now()}`;
    setDraftTiers((prev) => [
      ...prev,
      { id: newId, stampsFromPrevious: 3, rewardTitle: 'Nuevo Premio' }
    ]);
  };

  // Eliminar un tramo (mínimo 1 premio)
  const handleRemoveTier = (index: number) => {
    if (draftTiers.length <= 1) return;
    setDraftTiers((prev) => prev.filter((_, idx) => idx !== index));
  };

  // Cargar preset de 1 toque (mínimo 1 sello inicial de onboarding)
  const handleLoadPreset = (preset: typeof DEMO_PRESETS[0]) => {
    setDraftBusinessName(preset.businessName);
    setDraftCategory(preset.categoryIcon);
    setDraftTiers(preset.tiers);
    setDraftStamps(1);

    // Ajustamos paleta asociada al rubro del preset si no había una personalizada
    const matchingColor = OFFICIAL_CARD_COLORS.find(c => c.id.startsWith(preset.categoryIcon));
    if (matchingColor) {
      setDraftBgColor(matchingColor.bg);
      setDraftInkColor(matchingColor.ink);
    }
  };

  const handleApply = () => {
    onApply({
      ...config,
      businessName: draftBusinessName.trim() || 'Coffee Shop',
      categoryIcon: draftCategory,
      tiers: draftTiers.map((t, idx) => ({
        ...t,
        rewardTitle: t.rewardTitle.trim() || `Premio ${idx + 1}`
      })),
      simulatedCurrentStamps: safeStamps,
      customBackgroundColor: draftBgColor,
      customInkColor: draftInkColor,
      customPatternId: draftPatternId
    });
    onClose();
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      onClick={onClose}
      className="fixed inset-0 z-60 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4 select-none animate-in fade-in duration-200"
    >
      <div
        data-tour="merchant-editor-modal"
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-[380px] bg-white rounded-3xl p-5 shadow-2xl border border-neutral-100 flex flex-col max-h-[90vh] overflow-y-auto no-scrollbar animate-in zoom-in-95 duration-150 text-left"
      >
        {/* Cabecera del Simulador */}
        <div className="flex items-center justify-between pb-3 mb-3 border-b border-neutral-100">
          <div className="flex items-center gap-2">
            <h3 className="text-[14px] font-black text-neutral-900 tracking-tight">
              Editor de Comercio
            </h3>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Cerrar editor"
            className="w-7 h-7 rounded-full bg-neutral-100 hover:bg-neutral-200 text-neutral-500 hover:text-black flex items-center justify-center text-[12px] font-bold transition-colors"
          >
            ✕
          </button>
        </div>

        {/* ============================================================== */}
        {/* BLOQUE SUPERIOR: PRESETS RÁPIDOS (AISLADOS COMO ATRACTOR)      */}
        {/* ============================================================== */}
        <div className="flex flex-col gap-1.5 mb-4 p-2.5 bg-neutral-50 rounded-2xl border border-neutral-100">
          <span className="text-[10px] font-bold uppercase tracking-wider text-neutral-400">
            Cargar ejemplo rápido
          </span>
          <div className="flex items-center gap-1.5 flex-wrap">
            {DEMO_PRESETS.map((preset) => (
              <button
                key={preset.name}
                type="button"
                onClick={() => handleLoadPreset(preset)}
                className="px-2.5 py-1 rounded-full bg-white hover:bg-neutral-100 border border-neutral-200 active:scale-95 text-neutral-800 font-semibold text-[11px] transition-all shadow-2xs"
              >
                {preset.name}
              </button>
            ))}
          </div>
        </div>

        {/* ============================================================== */}
        {/* BLOQUE 1: IDENTIDAD DEL COMERCIO Y NICHO                      */}
        {/* ============================================================== */}
        <div className="flex flex-col gap-3 mb-4">
          <div className="flex flex-col gap-1.5">
            <label className="text-[10.5px] font-bold uppercase tracking-wider text-neutral-500">
              Nombre de tu local
            </label>
            <input
              type="text"
              value={draftBusinessName}
              onChange={(e) => setDraftBusinessName(e.target.value)}
              placeholder="Ej: Café Martínez, La Birrería"
              className="w-full px-3.5 py-2 bg-neutral-50 border border-neutral-200 rounded-xl text-[13.5px] font-bold text-neutral-900 focus:outline-none focus:ring-2 focus:ring-neutral-950 focus:bg-white transition-all"
            />
          </div>

          {/* Selector de Nicho Comercial */}
          <div className="flex flex-col gap-1.5">
            <label className="text-[10.5px] font-bold uppercase tracking-wider text-neutral-500">
              Elegí rubro
            </label>
            <div className="grid grid-cols-2 gap-1.5">
              {[
                { id: 'cafeteria', label: 'Cafetería' },
                { id: 'heladeria', label: 'Heladería' },
                { id: 'barberia', label: 'Barbería' },
                { id: 'panaderia', label: 'Panadería' }
              ].map((cat) => (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => setDraftCategory(cat.id as typeof draftCategory)}
                  className={`py-1.5 px-2.5 rounded-xl text-[11px] font-bold transition-all text-center border ${
                    draftCategory === cat.id
                      ? 'bg-neutral-950 text-white border-neutral-950 shadow-xs'
                      : 'bg-neutral-50 text-neutral-600 border-neutral-200 hover:bg-neutral-100'
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* ============================================================== */}
        {/* BLOQUE INTERMEDIO: APARIENCIA Y VISTA PREVIA EN VIVO (LEGO)    */}
        {/* ============================================================== */}
        <div
          data-tour="merchant-editor-preview-card"
          className="flex flex-col gap-3.5 mb-5 p-3.5 bg-neutral-50 rounded-2xl border border-neutral-100"
        >
          <div className="flex items-center justify-between">
            <label className="text-[10.5px] font-bold uppercase tracking-wider text-neutral-500">
              Diseño de tu tarjeta
            </label>
            <span className="text-[10px] font-medium text-neutral-400">
              Vista previa
            </span>
          </div>

          {/* Mini-tarjeta de preview en vivo reutilizada */}
          <LiveCardPreview
            businessName={draftBusinessName}
            category={draftCategory}
            stampsRequired={totalMaxStamps}
            rewardTitle={draftTiers[draftTiers.length - 1]?.rewardTitle || 'Premio mayor'}
            backgroundColor={draftBgColor}
            inkColor={draftInkColor}
            patternId={draftPatternId}
          />

          {/* Selector de color oficial */}
          <CardColorPicker
            selectedBgColor={draftBgColor}
            onSelectColor={(bg, ink) => {
              setDraftBgColor(bg);
              setDraftInkColor(ink);
            }}
          />

          {/* Selector de patrones */}
          <CardPatternPicker
            selectedPatternId={draftPatternId}
            inkColor={draftInkColor}
            onSelectPattern={setDraftPatternId}
          />
        </div>

        {/* ============================================================== */}
        {/* BLOQUE 2: MATRIZ ASIMÉTRICA DE TRAMOS Y PREMIOS (0 a 6 sellos) */}
        {/* ============================================================== */}
        <div className="flex flex-col gap-2 mb-4">
          <div className="flex items-center justify-between">
            <label className="text-[10.5px] font-bold uppercase tracking-wider text-neutral-500">
              Sellos y Premios ({draftTiers.length}/5)
            </label>
            <span className="text-[10.5px] font-bold text-neutral-900 bg-neutral-100 px-2 py-0.5 rounded-full">
              Total: {totalMaxStamps} sellos
            </span>
          </div>

          <div className="flex flex-col gap-2">
            {draftTiers.map((tier, idx) => {
              const milestone = computedMilestones[idx];
              const isFirst = idx === 0;

              return (
                <div
                  key={tier.id || idx}
                  className="p-2.5 bg-neutral-50 rounded-2xl border border-neutral-100 flex flex-col gap-2"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-black text-neutral-900 tracking-tight flex items-center gap-1.5">
                      <span className="w-4 h-4 rounded-full bg-neutral-950 text-white flex items-center justify-center text-[9px] font-bold">
                        ★
                      </span>
                      Premio {idx + 1}
                    </span>

                    <div className="flex items-center gap-1.5">
                      <span className="inline-flex items-center px-2 py-0.5 rounded-full bg-neutral-200/70 text-neutral-700 text-[10px] font-bold">
                        Sello #{milestone?.stampThreshold || 0}
                      </span>
                      {draftTiers.length > 1 && (
                        <button
                          type="button"
                          onClick={() => handleRemoveTier(idx)}
                          aria-label={`Eliminar premio ${idx + 1}`}
                          className="w-5 h-5 rounded-full hover:bg-neutral-200 text-neutral-400 hover:text-rose-600 flex items-center justify-center text-[11px] font-bold transition-colors"
                        >
                          ✕
                        </button>
                      )}
                    </div>
                  </div>

                  {/* Fila de controles del tramo: Sellos delta + Nombre del producto */}
                  <div className="grid grid-cols-[104px_1fr] gap-2 items-center">
                    {/* Stepper de Sellos delta */}
                    <div className="flex items-center justify-between bg-white border border-neutral-200 rounded-xl px-1.5 py-1">
                      <button
                        type="button"
                        onClick={() =>
                          handleUpdateTier(idx, tier.stampsFromPrevious - 1, tier.rewardTitle)
                        }
                        disabled={isFirst ? tier.stampsFromPrevious <= 1 : tier.stampsFromPrevious <= 0}
                        className="w-5 h-5 rounded-md hover:bg-neutral-100 disabled:opacity-30 disabled:pointer-events-none text-neutral-700 font-bold text-[12px] flex items-center justify-center"
                      >
                        −
                      </button>
                      <span className="text-[11.5px] font-bold text-neutral-900 whitespace-nowrap">
                        {isFirst
                          ? tier.stampsFromPrevious === 1
                            ? '1 Sello'
                            : `${tier.stampsFromPrevious} Sellos`
                          : tier.stampsFromPrevious === 1
                            ? '+ 1 Sello'
                            : `+ ${tier.stampsFromPrevious} Sellos`}
                      </span>
                      <button
                        type="button"
                        onClick={() =>
                          handleUpdateTier(idx, tier.stampsFromPrevious + 1, tier.rewardTitle)
                        }
                        disabled={tier.stampsFromPrevious >= 6}
                        className="w-5 h-5 rounded-md hover:bg-neutral-100 disabled:opacity-30 disabled:pointer-events-none text-neutral-700 font-bold text-[12px] flex items-center justify-center"
                      >
                        +
                      </button>
                    </div>

                    {/* Nombre del producto */}
                    <input
                      type="text"
                      value={tier.rewardTitle}
                      onChange={(e) =>
                        handleUpdateTier(idx, tier.stampsFromPrevious, e.target.value)
                      }
                      placeholder="Nombre del producto"
                      className="w-full px-2.5 py-1 bg-white border border-neutral-200 rounded-xl text-[12.5px] font-bold text-neutral-900 focus:outline-none focus:ring-2 focus:ring-neutral-950 transition-all truncate"
                    />
                  </div>
                </div>
              );
            })}
          </div>

          {/* Botón para agregar siguiente premio (hasta 5) */}
          {draftTiers.length < 5 && (
            <button
              type="button"
              onClick={handleAddTier}
              className="w-full py-1.5 border border-dashed border-neutral-300 hover:border-neutral-950 rounded-xl text-[11.5px] font-bold text-neutral-600 hover:text-black transition-all flex items-center justify-center gap-1.5 active:scale-98"
            >
              <span>+ Agregar siguiente premio</span>
            </button>
          )}
        </div>

        {/* Botones de pie */}
        {/* ============================================================== */}
        {/* BLOQUE 4: PROGRESO SIMULADO DEL CLIENTE (DINÁMICO DE 1 A TOTAL)*/}
        {/* ============================================================== */}
        <div className="flex flex-col gap-2 mb-4 p-3.5 bg-neutral-50 rounded-2xl border border-neutral-100">
          <div className="flex items-center justify-between">
            <label className="text-[10.5px] font-bold uppercase tracking-wider text-neutral-500">
              Progreso del Cliente
            </label>
            <span className="text-[10.5px] font-semibold text-neutral-400">
              Rango: 1 a {totalMaxStamps} sellos
            </span>
          </div>

          {/* Stepper numérico grande */}
          <div className="flex items-center justify-between gap-3 mt-0.5">
            <button
              type="button"
              onClick={handleStepDown}
              disabled={safeStamps <= 1}
              aria-label="Restar un sello"
              className="w-9 h-9 rounded-xl bg-white border border-neutral-200 text-neutral-800 hover:bg-neutral-100 active:scale-90 disabled:opacity-40 disabled:pointer-events-none font-black text-[17px] flex items-center justify-center transition-all shadow-2xs"
            >
              −
            </button>

            <div className="flex flex-col items-center">
              <span className="text-[24px] font-black text-neutral-900 leading-none">
                {safeStamps}
              </span>
              <span className="text-[10px] font-bold text-neutral-500 uppercase tracking-wider mt-0.5">
                {safeStamps === 1 ? 'sello conseguido' : 'sellos conseguidos'}
              </span>
            </div>

            <button
              type="button"
              onClick={handleStepUp}
              disabled={safeStamps >= totalMaxStamps}
              aria-label="Sumar un sello"
              className="w-9 h-9 rounded-xl bg-white border border-neutral-200 text-neutral-800 hover:bg-neutral-100 active:scale-90 disabled:opacity-40 disabled:pointer-events-none font-black text-[17px] flex items-center justify-center transition-all shadow-2xs"
            >
              +
            </button>
          </div>

          {/* Slider táctil continuo que se adapta estrictamente de 1 a totalMaxStamps */}
          <div className="mt-1 px-1">
            <input
              type="range"
              min={1}
              max={totalMaxStamps}
              value={safeStamps}
              onChange={(e) => setDraftStamps(Number(e.target.value))}
              className="w-full h-1.5 bg-neutral-200 rounded-lg appearance-none cursor-pointer accent-neutral-950"
            />
          </div>

          {/* Estado del premio: comunica si el canje está disponible ahora mismo */}
          <div className="mt-1 flex flex-col gap-1.5">
            {readyMilestone ? (
              <div className="flex items-center justify-between gap-2 px-2.5 py-2 rounded-xl bg-emerald-50 border border-emerald-200">
                <div className="flex items-center gap-1.5 min-w-0">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 flex-shrink-0" />
                  <span className="text-[11px] font-bold text-emerald-900 truncate">
                    Listo para canjear: {readyMilestone.rewardTitle}
                  </span>
                </div>
                <span className="text-[10px] font-bold text-emerald-700 flex-shrink-0">
                  {readyMilestone.stampThreshold} sellos
                </span>
              </div>
            ) : (
              <div className="flex items-center justify-between gap-2 px-2.5 py-2 rounded-xl bg-white border border-neutral-200">
                <span className="text-[11px] font-semibold text-neutral-500 truncate">
                  {nextMilestone
                    ? `Faltan ${nextMilestone.stampThreshold - safeStamps} sellos para ${nextMilestone.rewardTitle}`
                    : 'Camino completado'}
                </span>
                {nextMilestone && (
                  <button
                    type="button"
                    onClick={() => setDraftStamps(nextMilestone.stampThreshold)}
                    className="flex-shrink-0 px-2 py-1 rounded-full bg-neutral-950 hover:bg-neutral-800 text-white text-[10px] font-bold active:scale-95 transition-all"
                  >
                    Llevar al premio
                  </button>
                )}
              </div>
            )}
          </div>

          {/* Atajo para devolver el cliente al último premio ya superado */}
          {previousMilestone && !readyMilestone && (
            <button
              type="button"
              onClick={() => setDraftStamps(previousMilestone.stampThreshold)}
              className="self-start text-[10.5px] font-semibold text-neutral-400 hover:text-neutral-800 transition-colors"
            >
              Volver a {previousMilestone.rewardTitle} ({previousMilestone.stampThreshold} sellos)
            </button>
          )}
        </div>

        <div className="mt-1 flex items-center justify-between gap-2 pt-3 border-t border-neutral-100">
          <button
            type="button"
            onClick={onReset}
            className="px-2 py-1.5 text-[12px] font-medium text-neutral-500 hover:text-black transition-colors"
          >
            Restablecer
          </button>

          <button
            type="button"
            onClick={handleApply}
            className="px-6 py-2 rounded-full bg-neutral-950 hover:bg-neutral-800 text-white font-bold text-[13px] shadow-2xs active:scale-95 transition-all"
          >
            Guardar
          </button>
        </div>
      </div>
    </div>
  );
}

export default LocalDemoSimulatorModal;
