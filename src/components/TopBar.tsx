import React from 'react';

export interface TopBarProps {
  onMenuClick?: () => void;
}

export const TopBar: React.FC<TopBarProps> = ({ onMenuClick }) => {
  return (
    <header className="sticky top-0 z-50 w-full bg-white/70 backdrop-blur-md">
      <div className="w-full max-w-md mx-auto px-4 h-14 flex items-center justify-between">
        
        {/* Logo / Nombre Vookly estilo Stripe */}
        <span className="text-lg font-bold tracking-tight text-[#061b31]">
          Vookly
        </span>

        {/* Menú Hamburguesa */}
        <button
          type="button"
          onClick={onMenuClick}
          aria-label="Abrir menú"
          className="p-2 text-[#061b31] hover:text-[#533afd] transition-colors"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            viewBox="0 0 24 24"
          >
            <line x1="3" y1="6" x2="21" y2="6" />
            <line x1="3" y1="12" x2="21" y2="12" />
            <line x1="3" y1="18" x2="21" y2="18" />
          </svg>
        </button>

      </div>
    </header>
  );
};

export default TopBar;
