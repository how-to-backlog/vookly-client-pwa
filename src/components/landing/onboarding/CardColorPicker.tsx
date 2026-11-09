'use client';

import React from 'react';
import { OFFICIAL_CARD_COLORS } from '@/data/cardPatternsRegistry';

export interface CardColorPickerProps {
  selectedBgColor: string;
  onSelectColor: (bg: string, ink: string) => void;
}

export const CardColorPicker: React.FC<CardColorPickerProps> = ({
  selectedBgColor,
  onSelectColor
}) => {
  return (
    <div className="flex flex-col gap-2 w-full">
      <span className="text-[11px] font-semibold tracking-wider text-neutral-500 uppercase">
        Color de fondo
      </span>
      <div className="grid grid-cols-8 gap-1.5 w-full pt-1 pb-0.5 justify-items-center">
        {OFFICIAL_CARD_COLORS.map((item) => {
          const isSelected = selectedBgColor.toLowerCase() === item.bg.toLowerCase();
          return (
            <button
              key={item.id}
              type="button"
              onClick={() => onSelectColor(item.bg, item.ink)}
              className="group relative flex items-center justify-center rounded-full transition-all active:scale-90"
              title={item.name}
            >
              <span
                className={`block h-7 w-7 rounded-full transition-all shadow-2xs border ${
                  isSelected
                    ? 'scale-110 border-black/40 ring-2 ring-neutral-950/20'
                    : 'border-black/10 hover:scale-105'
                }`}
                style={{ backgroundColor: item.bg }}
              />
              {isSelected && (
                <span
                  className="absolute h-2 w-2 rounded-full"
                  style={{ backgroundColor: item.ink }}
                />
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default CardColorPicker;
