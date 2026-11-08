'use client';

import React from 'react';
import { ChevronRight } from 'lucide-react';
import { HERO_PATTERNS_LIST } from '@/data/cardPatternsRegistry';

export interface CardPatternPickerProps {
  selectedPatternId: string;
  inkColor: string;
  onSelectPattern: (patternId: string) => void;
}

export const CardPatternPicker: React.FC<CardPatternPickerProps> = ({
  selectedPatternId,
  inkColor,
  onSelectPattern
}) => {
  return (
    <div className="flex flex-col gap-2 w-full">
      <div className="flex items-center justify-between">
        <span className="text-[11px] font-semibold tracking-wider text-neutral-500 uppercase">
          Patrones
        </span>
        <span className="text-[10px] font-medium text-neutral-400 inline-flex items-center gap-0.5">
          Deslizá
          <ChevronRight className="h-3 w-3" />
        </span>
      </div>
      <div className="flex items-center gap-2 overflow-x-auto pb-1.5 pt-0.5 px-3 no-scrollbar">
        {HERO_PATTERNS_LIST.map((pattern, index) => {
          const isSelected = selectedPatternId === pattern.id;
          const bgUrl = pattern.getSvgUrl(inkColor, 0.4);

          return (
            <button
              key={pattern.id}
              type="button"
              onClick={() => onSelectPattern(pattern.id)}
              className={`shrink-0 rounded-xl p-1 transition-all active:scale-95 ${
                isSelected ? 'ring-2 ring-neutral-900' : 'ring-0'
              }`}
              aria-label={`Patrón ${index + 1}`}
            >
              {/* Thumbnail suelto con el patrón vectorial visible, numerado */}
              <div
                className={`h-11 w-11 rounded-lg overflow-hidden border transition-all ${
                  isSelected ? 'border-neutral-900 bg-white' : 'border-black/5 bg-white'
                }`}
                style={{
                  backgroundImage: bgUrl,
                  backgroundSize: '24px 24px',
                  backgroundRepeat: 'repeat'
                }}
              />
              <span className="block text-center text-[10px] font-medium tracking-tight px-1 text-neutral-600">
                {index + 1}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default CardPatternPicker;
