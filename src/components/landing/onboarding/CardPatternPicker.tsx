'use client';

import React from 'react';
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
          Patrón geométrico (Hero Patterns)
        </span>
        <span className="text-[11px] font-medium text-neutral-400">
          12 estilos
        </span>
      </div>
      <div className="flex items-center gap-2 overflow-x-auto pb-1.5 pt-0.5 no-scrollbar">
        {HERO_PATTERNS_LIST.map((pattern) => {
          const isSelected = selectedPatternId === pattern.id;
          const bgUrl = pattern.getSvgUrl(inkColor, 0.4);

          return (
            <button
              key={pattern.id}
              type="button"
              onClick={() => onSelectPattern(pattern.id)}
              className={`group shrink-0 flex flex-col items-center gap-1.5 p-1 rounded-xl transition-all active:scale-95 ${
                isSelected
                  ? 'bg-neutral-900 text-white shadow-xs'
                  : 'bg-neutral-100 hover:bg-neutral-200/80 text-neutral-700'
              }`}
            >
              {/* Thumbnail con el patrón vectorial visible */}
              <div
                className={`h-11 w-11 rounded-lg overflow-hidden border transition-all ${
                  isSelected ? 'border-white/40 shadow-inner' : 'border-black/5 bg-white'
                }`}
                style={{
                  backgroundImage: bgUrl,
                  backgroundSize: '24px 24px',
                  backgroundRepeat: 'repeat'
                }}
              />
              <span className="text-[10px] font-medium tracking-tight px-1 max-w-[64px] truncate">
                {pattern.name}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default CardPatternPicker;
