'use client';

import React from 'react';
import { usePageTransition } from '@/components/transition/TransitionProvider';

export interface VirtualCardProps {
  /** Ruta a la imagen de fondo de la tarjeta */
  backgroundImage?: string;
  /** URL destino al hacer click/tap */
  href?: string;
  className?: string;
  children?: React.ReactNode;
}

/**
 * VirtualCard: Componente atómico de tarjeta virtual con soporte para
 * navegación y circular reveal nativo.
 */
export const VirtualCard: React.FC<VirtualCardProps> = ({
  backgroundImage,
  href,
  className = '',
  children
}) => {
  const { triggerTransition } = usePageTransition();

  const handleClick = (e: React.MouseEvent) => {
    if (href) {
      triggerTransition(e, href);
    }
  };

  return (
    <article
      onClick={href ? handleClick : undefined}
      role={href ? 'button' : undefined}
      tabIndex={href ? 0 : undefined}
      className={`w-full aspect-[1.586/1] rounded-[16px] bg-white relative overflow-hidden transition-all duration-200 select-none ${href ? 'cursor-pointer active:scale-[0.98]' : ''} ${className}`}
      style={{
        boxShadow: '10px 10px 20px rgba(0, 0, 0, 0.42)'
      }}
    >
      {backgroundImage && (
        <div 
          className="absolute inset-0 w-full h-full bg-cover bg-center bg-no-repeat pointer-events-none"
          style={{ backgroundImage: `url(${backgroundImage})` }}
        />
      )}
      <div className="relative z-10 w-full h-full">
        {children}
      </div>
    </article>
  );
};

export default VirtualCard;
