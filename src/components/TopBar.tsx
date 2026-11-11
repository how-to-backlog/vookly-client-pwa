import React from 'react';
import { MessageCircle } from 'lucide-react';

export interface TopBarProps {
  /** Número de WhatsApp de soporte oficial (formato internacional sin signos). */
  supportPhone?: string;
  /** Mensaje inicial precargado en WhatsApp (orientado a adhesión comercial). */
  defaultMessage?: string;
  /**
   * Superficie de la cabecera.
   *
   * - `solid`: velo blanco difuminado, para pantallas con fondo plano.
   * - `transparent`: deja ver el fondo animado y deja de taparlo con una banda
   *   opaca. El texto pasa a blanco para poder leerse sobre la aurora.
   * - `bare`: sin fondo ni borde. La cabecera se apoya directamente en la
   *   superficie de la página, de modo que el fondo se lee como una sola
   *   superficie continua y no como bandas superpuestas.
   */
  variant?: 'solid' | 'transparent' | 'bare';
  /** Acción opcional, renderizada antes del acceso a soporte. */
  action?: React.ReactNode;
}

/**
 * TopBar: Cabecera minimalista superior como bloque Lego aislado.
 * Incorpora el logo Vookly y botón directo a WhatsApp de soporte.
 */
export const TopBar: React.FC<TopBarProps> = ({
  supportPhone = '5493516063909',
  defaultMessage = '¡Hola! Estoy interesado en que mi negocio forme parte de la red Vookly.',
  variant = 'solid',
  action
}) => {
  const whatsappUrl = `https://wa.me/${supportPhone}?text=${encodeURIComponent(defaultMessage)}`;
  const isTransparent = variant === 'transparent';
  const isBare = variant === 'bare';

  return (
    <header
      className={`sticky top-0 z-50 w-full ${
        isBare
          ? 'bg-transparent'
          : isTransparent
            ? 'bg-transparent backdrop-blur-sm border-b border-white/15'
            : 'bg-white/80 backdrop-blur-md border-b border-neutral-100'
      }`}
    >
      <div className="w-full max-w-md mx-auto px-5 h-14 flex items-center justify-between">
        {/* Logotipo Vookly */}
        <span
          className={`text-[28px] font-semibold tracking-tight select-none inline-flex items-baseline ${
            isTransparent
              ? 'text-white [text-shadow:0_2px_12px_rgba(0,0,0,0.45)]'
              : 'text-neutral-900'
          }`}
        >
          vookly<span className="text-[35px] leading-none text-neutral-400 font-black ml-[1px]">.</span>
        </span>

        <div className="flex items-center gap-1">
          {/*
            Acción opcional de la cabecera.

            Sobre superficies claras (variante `bare`) el slot se normaliza con
            un chip neutro claro para que el control no se convierta en el
            objeto de mayor contraste de la barra. Se sobreescribe el fondo del
            botón que se pasa por `action` sin acoplarlo a este componente.
          */}
          {action ? (
            <div className="[&>button]:!bg-neutral-200/70 [&>button]:!border-transparent [&>button]:!text-neutral-500 [&>button:hover]:!bg-neutral-200 [&>button:hover]:!text-neutral-700">
              {action}
            </div>
          ) : null}

          {/* Botón de Contacto Comercial / WhatsApp (sin contenedor circular, ícono puro) */}
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Contactar a Vookly por WhatsApp"
            data-tour="topbar-whatsapp-btn"
            className="p-1.5 active:scale-90 transition-transform duration-150 flex items-center justify-center text-emerald-600 hover:text-emerald-700"
          >
            <MessageCircle className="w-6 h-6 animate-cta-shake" strokeWidth={2.4} />
          </a>
        </div>
      </div>
    </header>
  );
};

export default TopBar;
