import React from 'react';

export interface VirtualCardProps {
  /** Ruta a la imagen de fondo de la tarjeta */
  backgroundImage?: string;
  className?: string;
  children?: React.ReactNode;
}

/**
 * VirtualCard: Componente modular atómico que representa el contenedor físico
 * de una tarjeta virtual con la proporción estándar ISO 1.586/1.
 * 
 * Permite inyectar imágenes de fondo recortadas con bordes redondeados y sombra.
 */
export const VirtualCard: React.FC<VirtualCardProps> = ({
  backgroundImage,
  className = '',
  children
}) => {
  return (
    <article
      className={`w-full aspect-[1.586/1] rounded-[16px] bg-white relative overflow-hidden transition-all duration-200 ${className}`}
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
