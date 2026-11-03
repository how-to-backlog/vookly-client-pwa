'use client';

import React, { useState } from 'react';
import { DemoRewardTier, DemoSimulatorConfig } from '@/types/loyalty';
import { computeMilestonesFromTiers, computeTotalStampsFromTiers } from '@/services/demoSimulatorStorage';

export interface LocalDemoSimulatorModalProps {
  isOpen: boolean;
  onClose: () => void;
  config: DemoSimulatorConfig;
  onApply: (newConfig: DemoSimulatorConfig) => void;
  onReset: () => void;
}

// Presets de demostración comercial de 1 toque
const DEMO_PRESETS: Array<{
  name: string;
  businessName: string;
  tiers: DemoRewardTier[];
}> = [
  {
    name: 'Cafetería',
    businessName: 'Coffee Shop',
    tiers: [
      { id: 't1', stampsFromPrevious: 3, rewardTitle: 'Café Chico' },
      { id: 't2', stampsFromPrevious: 4, rewardTitle: 'Medialuna' },
      { id: 't3', stampsFromPrevious: 5, rewardTitle: 'Tostado Especial' }
    ]
  },
  {
    name: 'Burger & Bar',
    businessName: 'Burger Joint',
    tiers: [
      { id: 't1', stampsFromPrevious: 4, rewardTitle: 'Papas Cheddar' },
      { id: 't2', stampsFromPrevious: 5, rewardTitle: 'Pinta Artesanal' }
    ]
  },
  {
    name: 'Heladería',
    businessName: 'Heladería del Parque',
    tiers: [
      { id: 't1', stampsFromPrevious: 3, rewardTitle: 'Cucurucho' },
      { id: 't2', stampsFromPrevious: 3, rewardTitle: '1/4 Kg de Helado' },
      { id: 't3', stampsFromPrevious: 4, rewardTitle: '1 Kg de Helado' }
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
  const [draftStamps, setDraftStamps] = useState(config.simulatedCurrentStamps);
  const [draftTiers, setDraftTiers] = useState<DemoRewardTier[]>(config.tiers);

  if (!isOpen) return null;

  // Calculamos hitos y sellos totales resultantes de los tramos en tiempo real
  const computedMilestones = computeMilestonesFromTiers(draftTiers);
  const totalMaxStamps = computeTotalStampsFromTiers(draftTiers);

  // Aseguramos que los sellos actuales no superen el total y nunca sean menores a 1 (Regla onboarding)
  const safeStamps = Math.max(1, Math.min(draftStamps, totalMaxStamps));

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
    setDraftTiers(preset.tiers);
    setDraftStamps(1);
  };

  const handleApply = () => {
    onApply({
      businessName: draftBusinessName.trim() || 'Coffee Shop',
      tiers: draftTiers.map((t, idx) => ({
        ...t,
        rewardTitle: t.rewardTitle.trim() || `Premio ${idx + 1}`
      })),
      simulatedCurrentStamps: safeStamps
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
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-[380px] bg-white rounded-3xl p-5 shadow-2xl border border-neutral-100 flex flex-col max-h-[90vh] overflow-y-auto no-scrollbar animate-in zoom-in-95 duration-150 text-left"
      >
        {/* Cabecera del Simulador */}
        <div className="flex items-center justify-between pb-3 mb-4 border-b border-neutral-100">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
            <h3 className="text-[14px] font-black text-neutral-900 tracking-tight">
              Simulador Demo de Comercio
            </h3>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Cerrar simulador"
            className="w-7 h-7 rounded-full bg-neutral-100 hover:bg-neutral-200 text-neutral-500 hover:text-black flex items-center justify-center text-[12px] font-bold transition-colors"
          >
            ✕
          </button>
        </div>

        {/* ============================================================== */}
        {/* BLOQUE 1: IDENTIDAD DEL COMERCIO                               */}
        {/* ============================================================== */}
        <div className="flex flex-col gap-1.5 mb-4">
          <label className="text-[10.5px] font-bold uppercase tracking-wider text-neutral-500">
            Nombre del Local
          </label>
          <input
            type="text"
            value={draftBusinessName}
            onChange={(e) => setDraftBusinessName(e.target.value)}
            placeholder="Ej: Café Martínez, La Birrería"
            className="w-full px-3.5 py-2 bg-neutral-50 border border-neutral-200 rounded-xl text-[13.5px] font-bold text-neutral-900 focus:outline-none focus:ring-2 focus:ring-neutral-950 focus:bg-white transition-all"
          />
        </div>

        {/* ============================================================== */}
        {/* BLOQUE 2: MATRIZ ASIMÉTRICA DE TRAMOS Y PREMIOS (0 a 6 sellos) */}
        {/* ============================================================== */}
        <div className="flex flex-col gap-2 mb-4">
          <div className="flex items-center justify-between">
            <label className="text-[10.5px] font-bold uppercase tracking-wider text-neutral-500">
              Premios y Tramos ({draftTiers.length}/5)
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
                  <div className="grid grid-cols-[82px_1fr] gap-2 items-center">
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
                      <span className="text-[11.5px] font-bold text-neutral-900">
                        {isFirst ? `${tier.stampsFromPrevious}s` : `+${tier.stampsFromPrevious}s`}
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

          {/* Botón para agregar siguiente premio */}
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

        {/* ============================================================== */}
        {/* BLOQUE 3: PROGRESO SIMULADO DEL CLIENTE (DINÁMICO DE 1 A TOTAL)*/}
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
        </div>

        {/* ============================================================== */}
        {/* BLOQUE 4: PRESETS DE 1 TOQUE                                   */}
        {/* ============================================================== */}
        <div className="flex flex-col gap-1.5 mb-4">
          <label className="text-[10px] font-bold uppercase tracking-wider text-neutral-400">
            Presets Rápidos
          </label>
          <div className="flex items-center gap-1.5 flex-wrap">
            {DEMO_PRESETS.map((preset) => (
              <button
                key={preset.name}
                type="button"
                onClick={() => handleLoadPreset(preset)}
                className="px-2.5 py-1 rounded-full bg-neutral-100 hover:bg-neutral-200 active:scale-95 text-neutral-700 font-semibold text-[11px] transition-all"
              >
                {preset.name}
              </button>
            ))}
          </div>
        </div>

        {/* Botones de pie */}
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
            className="px-5 py-2 rounded-full bg-neutral-950 hover:bg-neutral-800 text-white font-bold text-[13px] shadow-2xs active:scale-95 transition-all"
          >
            Aplicar al mapa
          </button>
        </div>
      </div>
    </div>
  );
}

export default LocalDemoSimulatorModal;
