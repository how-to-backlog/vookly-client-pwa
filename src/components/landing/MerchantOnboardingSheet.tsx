'use client';

import React, { useState } from 'react';
import { Minus, Plus } from 'lucide-react';

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
const MAX_STAMPS = 50;
const DEFAULT_STAMPS = 8;

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
 * de sellos y tipo de negocio. Reutiliza la lámina inferior existente para no
 * duplicar el gesto de descarte ni el manejo de foco y scroll lock.
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
      <div className="flex flex-col gap-5 pt-3">
        <p className="text-[13px] leading-relaxed text-neutral-500">
          Cargá los datos de tu local y arrancá la demo con tu propia marca.
        </p>

        <label className="flex flex-col gap-1.5">
          <span className="text-[12px] font-semibold uppercase tracking-wide text-neutral-500">
            Nombre del local
          </span>
          <input
            type="text"
            value={businessName}
            onChange={(event) => setBusinessName(event.target.value)}
            placeholder="Ej. Café Aurora"
            className="w-full rounded-xl border border-neutral-200 bg-neutral-50 px-3 py-2.5 text-[15px] text-neutral-900 outline-none transition-colors placeholder:text-neutral-400 focus:border-neutral-400 focus:bg-white"
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
            className="w-full rounded-xl border border-neutral-200 bg-neutral-50 px-3 py-2.5 text-[15px] text-neutral-900 outline-none transition-colors placeholder:text-neutral-400 focus:border-neutral-400 focus:bg-white"
          />
        </label>

        <div className="flex flex-col gap-1.5">
          <span className="text-[12px] font-semibold uppercase tracking-wide text-neutral-500">
            Sellos para canjear
          </span>
          <div className="flex items-center justify-between rounded-xl border border-neutral-200 bg-neutral-50 px-3 py-2">
            <span className="text-[15px] font-semibold text-neutral-900">{stampsRequired} sellos</span>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setStampsRequired((value) => Math.max(MIN_STAMPS, value - 1))}
                disabled={stampsRequired <= MIN_STAMPS}
                aria-label="Quitar un sello"
                className="flex h-8 w-8 items-center justify-center rounded-full border border-neutral-200 bg-white text-neutral-700 transition-colors hover:bg-neutral-100 disabled:opacity-40"
              >
                <Minus className="h-4 w-4" />
              </button>
              <button
                type="button"
                onClick={() => setStampsRequired((value) => Math.min(MAX_STAMPS, value + 1))}
                disabled={stampsRequired >= MAX_STAMPS}
                aria-label="Agregar un sello"
                className="flex h-8 w-8 items-center justify-center rounded-full border border-neutral-200 bg-white text-neutral-700 transition-colors hover:bg-neutral-100 disabled:opacity-40"
              >
                <Plus className="h-4 w-4" />
              </button>
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
                  aria-pressed={isSelected}
                  className={`flex items-center gap-2 rounded-xl border px-3 py-2.5 text-left transition-colors ${
                    isSelected
                      ? 'border-neutral-900 bg-neutral-900 text-white'
                      : 'border-neutral-200 bg-white text-neutral-700 hover:border-neutral-300'
                  }`}
                >
                  <CategoryIcon
                    name={type.id}
                    size={20}
                    stroke={isSelected ? '#ffffff' : '#525252'}
                    strokeWidth={1.5}
                  />
                  <span className="text-[14px] font-medium">{type.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        <button
          type="button"
          onClick={handleSubmit}
          disabled={!canSubmit}
          className={`mt-1 w-full rounded-full bg-[#2563eb] px-5 py-3.5 text-[15px] font-semibold text-white transition-opacity ${
            canSubmit ? 'opacity-100' : 'opacity-40'
          }`}
        >
          Continuar a la demo
        </button>

        <button
          type="button"
          onClick={(event) => onSkip(event)}
          className="text-center text-[13px] font-medium text-neutral-500 transition-colors hover:text-neutral-700"
        >
          Saltar y usar datos de ejemplo
        </button>
      </div>
    </BottomSheetNodeDetail>
  );
}

export default MerchantOnboardingSheet;
