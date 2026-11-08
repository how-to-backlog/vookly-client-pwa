'use client';

import React, { useState } from 'react';

import BottomSheetNodeDetail from '@/components/local/BottomSheetNodeDetail';
import CategoryIcon, { type CategoryIconName } from '@/components/icons/CategoryIcon';

/**
 * Nichos disponibles para el alta. El id coincide con el businessId del
 * catálogo (loyaltyRepository), así la demo precargada usa los presets del
 * simulador de sellos de ese rubro.
 */
const BUSINESS_TYPES: { id: CategoryIconName; label: string }[] = [
  { id: 'cafeteria', label: 'Cafetería' },
  { id: 'heladeria', label: 'Heladería' },
  { id: 'barberia', label: 'Barbería' },
  { id: 'panaderia', label: 'Panadería' }
];

const MIN_STAMPS = 1;
const MAX_STAMPS = 20;
const DEFAULT_STAMPS = 5;

// Opciones rápidas de 1 toque idénticas a las del simulador comercial
const PRESET_STAMP_OPTIONS = [3, 5, 8, 10];

export interface MerchantOnboardingValues {
  businessName: string;
  rewardTitle: string;
  stampsRequired: number;
  category: CategoryIconName;
}

export interface MerchantOnboardingSheetProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (values: MerchantOnboardingValues, event: React.MouseEvent<HTMLButtonElement>) => void;
  onSkip: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

/**
 * Hoja de alta del local personalizado: nombre, producto a canjear, cantidad
 * de sellos y tipo de negocio. Simplificada y alineada al simulador comercial.
 */
export function MerchantOnboardingSheet({
  isOpen,
  onClose,
  onSubmit,
  onSkip
}: MerchantOnboardingSheetProps) {
  const [businessName, setBusinessName] = useState('');
  const [rewardTitle, setRewardTitle] = useState('');
  const [stampsRequired, setStampsRequired] = useState(DEFAULT_STAMPS);
  const [category, setCategory] = useState<CategoryIconName>('cafeteria');

  const canSubmit = businessName.trim().length > 0 && rewardTitle.trim().length > 0;

  const handleSubmit = (event: React.MouseEvent<HTMLButtonElement>) => {
    if (!canSubmit) return;

    onSubmit(
      {
        businessName: businessName.trim(),
        rewardTitle: rewardTitle.trim(),
        stampsRequired,
        category
      },
      event
    );
  };

  return (
    <BottomSheetNodeDetail
      isOpen={isOpen}
      onClose={onClose}
      ariaLabel="Alta de local personalizado"
      headerContent={<span className="text-[15px] font-semibold text-neutral-900">Personaliza tu local</span>}
      disableBackdropBlur
      contentClassName="pb-2"
    >
      <div className="flex flex-col gap-4.5 pt-1">
        <label className="flex flex-col gap-1.5">
          <span className="text-[12px] font-semibold uppercase tracking-wide text-neutral-500">
            Nombre del local
          </span>
          <input
            type="text"
            value={businessName}
            onChange={(event) => setBusinessName(event.target.value)}
            placeholder="Ej. Café Aurora"
            className="w-full rounded-xl border border-neutral-200 bg-neutral-50 px-3 py-2 text-[15px] text-neutral-900 outline-none transition-colors placeholder:text-neutral-400 focus:border-neutral-400 focus:bg-white"
          />
        </label>

        <label className="flex flex-col gap-1.5">
          <span className="text-[12px] font-semibold uppercase tracking-wide text-neutral-500">
            Producto a canjear
          </span>
          <input
            type="text"
            value={rewardTitle}
            onChange={(event) => setRewardTitle(event.target.value)}
            placeholder="Ej. Espresso"
            className="w-full rounded-xl border border-neutral-200 bg-neutral-50 px-3 py-2 text-[15px] text-neutral-900 outline-none transition-colors placeholder:text-neutral-400 focus:border-neutral-400 focus:bg-white"
          />
        </label>

        {/* Sección simplificada idéntica a la tool del Simulador Demo */}
        <div className="flex flex-col gap-2">
          <div className="flex items-center justify-between">
            <span className="text-[12px] font-semibold uppercase tracking-wide text-neutral-500">
              Cantidad de sellos para canjear dicho producto
            </span>
            <span className="text-[11px] font-bold text-neutral-900 bg-neutral-100 px-2.5 py-0.5 rounded-full">
              {stampsRequired} {stampsRequired === 1 ? 'sello' : 'sellos'}
            </span>
          </div>

          <div className="flex items-center gap-2">
            {/* Stepper compacto estilo simulador (− / +) */}
            <div className="flex items-center bg-neutral-50 border border-neutral-200 rounded-xl px-2 py-1 gap-2.5 shadow-2xs">
              <button
                type="button"
                onClick={() => setStampsRequired((value) => Math.max(MIN_STAMPS, value - 1))}
                disabled={stampsRequired <= MIN_STAMPS}
                aria-label="Quitar un sello"
                className="w-7 h-7 rounded-lg hover:bg-neutral-200/70 disabled:opacity-30 disabled:pointer-events-none text-neutral-800 font-bold text-[14px] flex items-center justify-center transition-colors"
              >
                −
              </button>
              <span className="text-[14px] font-bold text-neutral-900 tabular-nums min-w-[28px] text-center">
                {stampsRequired}s
              </span>
              <button
                type="button"
                onClick={() => setStampsRequired((value) => Math.min(MAX_STAMPS, value + 1))}
                disabled={stampsRequired >= MAX_STAMPS}
                aria-label="Agregar un sello"
                className="w-7 h-7 rounded-lg hover:bg-neutral-200/70 disabled:opacity-30 disabled:pointer-events-none text-neutral-800 font-bold text-[14px] flex items-center justify-center transition-colors"
              >
                +
              </button>
            </div>

            {/* Presets rápidos de 1 toque (3, 5, 8, 10 sellos) */}
            <div className="flex items-center gap-1.5 flex-1">
              {PRESET_STAMP_OPTIONS.map((val) => {
                const isActive = stampsRequired === val;
                return (
                  <button
                    key={val}
                    type="button"
                    onClick={() => setStampsRequired(val)}
                    className={`flex-1 py-1.5 rounded-xl text-[12px] font-bold border transition-all ${
                      isActive
                        ? 'bg-neutral-900 text-white border-neutral-900 shadow-2xs'
                        : 'bg-neutral-50 hover:bg-neutral-100 text-neutral-600 border-neutral-200'
                    }`}
                  >
                    {val}s
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-1.5">
          <span className="text-[12px] font-semibold uppercase tracking-wide text-neutral-500">
            Tipo de negocio
          </span>
          <div className="grid grid-cols-2 gap-2">
            {BUSINESS_TYPES.map((type) => {
              const isSelected = type.id === category;

              return (
                <button
                  key={type.id}
                  type="button"
                  onClick={() => setCategory(type.id)}
                  className={`flex items-center gap-2 rounded-xl border p-2.5 text-left transition-colors ${
                    isSelected
                      ? 'border-neutral-900 bg-neutral-900 text-white'
                      : 'border-neutral-200 bg-neutral-50 text-neutral-700 hover:bg-neutral-100'
                  }`}
                >
                  <span
                    className={`flex h-7 w-7 items-center justify-center rounded-lg ${
                      isSelected ? 'bg-neutral-800 text-white' : 'bg-white text-neutral-700'
                    }`}
                  >
                    <CategoryIcon name={type.id} size={16} stroke="currentColor" strokeWidth={1.75} />
                  </span>
                  <span className="text-[13px] font-medium">{type.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        <div className="flex flex-col gap-2 pt-1">
          <button
            type="button"
            onClick={handleSubmit}
            disabled={!canSubmit}
            className="w-full rounded-full bg-neutral-900 py-3 text-[14px] font-semibold text-white transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-40"
          >
            Guardar y arrancar
          </button>
          <button
            type="button"
            onClick={onSkip}
            className="w-full py-2 text-center text-[13px] font-medium text-neutral-500 transition-colors hover:text-neutral-900"
          >
            Omitir este paso
          </button>
        </div>
      </div>
    </BottomSheetNodeDetail>
  );
}

export default MerchantOnboardingSheet;
