'use client';

import React, { useState } from 'react';
import { Minus, Plus, Palette } from 'lucide-react';

import BottomSheetNodeDetail from '@/components/local/BottomSheetNodeDetail';
import CategoryIcon, {
  CATEGORY_PALETTE,
  type CategoryIconName
} from '@/components/icons/CategoryIcon';
import CardColorPicker from '@/components/landing/onboarding/CardColorPicker';
import CardPatternPicker from '@/components/landing/onboarding/CardPatternPicker';
import LiveCardPreview from '@/components/landing/onboarding/LiveCardPreview';

const BUSINESS_TYPES: { id: CategoryIconName; label: string }[] = [
  { id: 'cafeteria', label: 'Cafetería' },
  { id: 'heladeria', label: 'Heladería' },
  { id: 'barberia', label: 'Barbería' },
  { id: 'panaderia', label: 'Panadería' }
];

const MIN_STAMPS = 1;
const MAX_STAMPS = 10;
const DEFAULT_STAMPS = 5;

export interface MerchantOnboardingValues {
  businessName: string;
  rewardTitle: string;
  stampsRequired: number;
  category: CategoryIconName;
  customBackgroundColor?: string;
  customInkColor?: string;
  customPatternId?: string;
}

export interface MerchantOnboardingSheetProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (values: MerchantOnboardingValues, event: React.MouseEvent<HTMLButtonElement>) => void;
}

export function MerchantOnboardingSheet({
  isOpen,
  onClose,
  onSubmit
}: MerchantOnboardingSheetProps) {
  const [businessName, setBusinessName] = useState('');
  const [rewardTitle, setRewardTitle] = useState('');
  const [stampsRequired, setStampsRequired] = useState(DEFAULT_STAMPS);
  const [category, setCategory] = useState<CategoryIconName>('cafeteria');

  // Personalización visual de la tarjeta
  const defaultPalette = CATEGORY_PALETTE[category] || CATEGORY_PALETTE.cafeteria;
  const [customBgColor, setCustomBgColor] = useState<string>(defaultPalette.background);
  const [customInkColor, setCustomInkColor] = useState<string>(defaultPalette.ink);
  const [customPatternId, setCustomPatternId] = useState<string>('formalInvitation');

  const canSubmit = businessName.trim().length > 0 && rewardTitle.trim().length > 0;

  const handleCategoryChange = (newCat: CategoryIconName) => {
    setCategory(newCat);
    const pal = CATEGORY_PALETTE[newCat];
    if (pal) {
      setCustomBgColor(pal.background);
      setCustomInkColor(pal.ink);
    }
  };

  const handleColorSelect = (bg: string, ink: string) => {
    setCustomBgColor(bg);
    setCustomInkColor(ink);
  };

  const handleSubmit = (event: React.MouseEvent<HTMLButtonElement>) => {
    if (!canSubmit) return;

    onSubmit(
      {
        businessName: businessName.trim(),
        rewardTitle: rewardTitle.trim(),
        stampsRequired,
        category,
        customBackgroundColor: customBgColor,
        customInkColor: customInkColor,
        customPatternId
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
      contentClassName="pb-4"
    >
      <div className="flex flex-col gap-4 pt-1 max-h-[74vh] overflow-y-auto no-scrollbar pr-0.5">
        <label className="flex flex-col gap-1.5">
          <span className="text-[12px] font-semibold uppercase tracking-wide text-neutral-500">
            Nombre de tu negocio
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
            Tu producto a canjear
          </span>
          <input
            type="text"
            value={rewardTitle}
            onChange={(event) => setRewardTitle(event.target.value)}
            placeholder="Ej. Espresso"
            className="w-full rounded-xl border border-neutral-200 bg-neutral-50 px-3 py-2 text-[15px] text-neutral-900 outline-none transition-colors placeholder:text-neutral-400 focus:border-neutral-400 focus:bg-white"
          />
        </label>

        {/* Control de Sellos Compacto con regla de equivalencia (1 compra = 1 sello) */}
        <div className="flex items-center justify-between py-0.5">
          <div className="flex items-baseline gap-1.5">
            <span className="text-[12px] font-semibold uppercase tracking-wide text-neutral-500">
              Sellos
            </span>
            <span className="text-[11px] font-normal text-neutral-400 lowercase">
              (1 compra = 1 sello)
            </span>
          </div>

          <div className="inline-flex items-center gap-2 rounded-xl border border-neutral-200 bg-neutral-50 px-2 py-1 shadow-2xs">
            <button
              type="button"
              onClick={() => setStampsRequired((value) => Math.max(MIN_STAMPS, value - 1))}
              disabled={stampsRequired <= MIN_STAMPS}
              aria-label="Quitar un sello"
              className="flex h-7 w-7 items-center justify-center rounded-lg border border-neutral-200 bg-white text-neutral-700 transition-colors hover:bg-neutral-100 disabled:opacity-30 disabled:pointer-events-none active:scale-95"
            >
              <Minus className="h-3.5 w-3.5" />
            </button>

            <span className="min-w-[68px] text-center text-[14px] font-bold text-neutral-900 tabular-nums">
              {stampsRequired} {stampsRequired === 1 ? 'sello' : 'sellos'}
            </span>

            <button
              type="button"
              onClick={() => setStampsRequired((value) => Math.min(MAX_STAMPS, value + 1))}
              disabled={stampsRequired >= MAX_STAMPS}
              aria-label="Agregar un sello"
              className="flex h-7 w-7 items-center justify-center rounded-lg border border-neutral-200 bg-white text-neutral-700 transition-colors hover:bg-neutral-100 disabled:opacity-30 disabled:pointer-events-none active:scale-95"
            >
              <Plus className="h-3.5 w-3.5" />
            </button>
          </div>
        </div>

        {/* Tipo de negocio / Rubro */}
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
                  onClick={() => handleCategoryChange(type.id)}
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

        {/* SECCIÓN FINAL: PERSONALIZACIÓN VISUAL Y VISTA PREVIA EN VIVO */}
        <div className="flex flex-col gap-3.5 pt-2 border-t border-neutral-200/80">
          <div className="flex items-center gap-1.5 text-neutral-900">
            <Palette className="h-4 w-4 text-sky-600" />
            <span className="text-[13px] font-bold tracking-tight">
              Diseño de tu tarjeta
            </span>
          </div>

          {/* Vista previa en vivo */}
          <LiveCardPreview
            businessName={businessName}
            category={category}
            stampsRequired={stampsRequired}
            rewardTitle={rewardTitle}
            backgroundColor={customBgColor}
            inkColor={customInkColor}
            patternId={customPatternId}
          />

          {/* Selector de color oficial */}
          <CardColorPicker
            selectedBgColor={customBgColor}
            onSelectColor={handleColorSelect}
          />

          {/* Selector de patrones Hero Patterns */}
          <CardPatternPicker
            selectedPatternId={customPatternId}
            inkColor={customInkColor}
            onSelectPattern={setCustomPatternId}
          />
        </div>

        {/* Botón de envío */}
        <div className="pt-2 pb-1 flex justify-center w-full">
          <button
            type="button"
            onClick={handleSubmit}
            disabled={!canSubmit}
            className="inline-flex items-center justify-center px-8 py-2.5 rounded-full bg-neutral-900 text-[14.5px] font-bold text-white transition-all hover:bg-neutral-800 active:scale-95 disabled:cursor-not-allowed disabled:opacity-40 shadow-sm"
          >
            Ir a vookly.
          </button>
        </div>
      </div>
    </BottomSheetNodeDetail>
  );
}

export default MerchantOnboardingSheet;
