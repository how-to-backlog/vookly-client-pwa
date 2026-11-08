'use client';

import React from 'react';
import { CategoryCardSurface } from '@/components/cards/CategoryCardSurface';
import type { CategoryIconName } from '@/components/icons/CategoryIcon';

export interface LiveCardPreviewProps {
  businessName: string;
  category: CategoryIconName;
  stampsRequired: number;
  rewardTitle: string;
  backgroundColor: string;
  inkColor: string;
  patternId: string;
}

export const LiveCardPreview: React.FC<LiveCardPreviewProps> = ({
  businessName,
  category,
  stampsRequired,
  rewardTitle,
  backgroundColor,
  inkColor,
  patternId
}) => {
  return (
    <div className="flex flex-col gap-2 w-full">
      <div className="flex items-center justify-between">
        <span className="text-[11px] font-semibold tracking-wider text-neutral-500 uppercase">
          Vista previa en vivo
        </span>
        <span className="text-[11px] font-medium text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200/60">
          En tiempo real
        </span>
      </div>

      {/* Mini-tarjeta contenedor a escala */}
      <div className="relative w-full aspect-[1.8/1] rounded-[22px] overflow-hidden shadow-lg shadow-black/10 border border-black/5">
        <CategoryCardSurface
          name={category}
          localName={businessName.trim() || 'Tu negocio'}
          stamps={1}
          totalStamps={stampsRequired}
          nextRewardTitle={rewardTitle.trim() || 'Premio inicial'}
          backgroundColor={backgroundColor}
          inkColor={inkColor}
          patternId={patternId}
          hasReadyReward={false}
          iconSize={42}
          className="!p-4 sm:!p-5"
        />
      </div>
    </div>
  );
};

export default LiveCardPreview;
