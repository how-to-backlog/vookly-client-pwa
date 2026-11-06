import React from 'react';
import { Headphones } from 'lucide-react';

export interface TopBarProps {
  /** Número de WhatsApp de soporte oficial (formato internacional sin signos). */
  supportPhone?: string;
  /** Mensaje inicial precargado en WhatsApp. */
  defaultMessage?: string;
}

/**
 * TopBar: Cabecera minimalista superior como bloque Lego aislado.
 * Incorpora el logo Vookly y botón directo a WhatsApp de soporte.
 */
export const TopBar: React.FC<TopBarProps> = ({
  supportPhone = '5493512345678',
  defaultMessage = 'Hola! Tengo una consulta sobre mi cuenta de Vookly.'
}) => {
  const whatsappUrl = `https://wa.me/${supportPhone}?text=${encodeURIComponent(defaultMessage)}`;

  return (
    <header className="sticky top-0 z-50 w-full bg-white/80 backdrop-blur-md border-b border-neutral-100">
      <div className="w-full max-w-md mx-auto px-5 h-14 flex items-center justify-between">
        {/* Logotipo Vookly */}
        <span className="text-xl font-black tracking-tight text-neutral-900 select-none">
          Vookly
        </span>

        {/* Botón de Soporte WhatsApp */}
        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Contactar soporte técnico por WhatsApp"
          className="p-2 rounded-full text-neutral-600 hover:text-neutral-900 hover:bg-neutral-100/80 active:scale-95 transition-all duration-150 flex items-center justify-center"
        >
          <Headphones className="w-5 h-5" strokeWidth={2.2} />
        </a>
      </div>
    </header>
  );
};

export default TopBar;
