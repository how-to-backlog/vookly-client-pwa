'use client';

import React, { createContext, useContext, useState, useCallback, useRef, useEffect } from 'react';
import { useRouter } from 'next/navigation';

interface TransitionContextType {
  triggerTransition: (e: React.MouseEvent | React.KeyboardEvent, targetUrl: string) => void;
}

const TransitionContext = createContext<TransitionContextType | null>(null);

export const usePageTransition = () => {
  const context = useContext(TransitionContext);
  if (!context) {
    throw new Error('usePageTransition must be used within a TransitionProvider');
  }
  return context;
};

export const TransitionProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const router = useRouter();
  const [isAnimating, setIsAnimating] = useState(false);
  const [clipStyle, setClipStyle] = useState<string>('circle(0px at 50% 50%)');
  
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, []);

  const triggerTransition = useCallback((e: React.MouseEvent | React.KeyboardEvent, targetUrl: string) => {
    // Coordenadas del click o tap. Un evento de teclado no las trae: se usa el centro.
    const pointer = e as Partial<React.MouseEvent>;
    const x = pointer.clientX || window.innerWidth / 2;
    const y = pointer.clientY || window.innerHeight / 2;

    // Radio máximo hasta la esquina más lejana (Pitágoras)
    const endRadius = Math.hypot(
      Math.max(x, window.innerWidth - x),
      Math.max(y, window.innerHeight - y)
    );

    // 1. Estado inicial en el punto exacto
    setClipStyle(`circle(0px at ${x}px ${y}px)`);
    setIsAnimating(true);

    // 2. Disparo de la animación fluida en el siguiente frame
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        setClipStyle(`circle(${endRadius}px at ${x}px ${y}px)`);
      });
    });

    // 3. Al completarse la expansión (1800ms), navega con pantalla 100% negra
    if (timerRef.current) clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => {
      router.push(targetUrl);

      // Una vez en la pantalla de destino (que es negra), se limpia el overlay
      setTimeout(() => {
        setIsAnimating(false);
      }, 500);
    }, 1800);
  }, [router]);

  return (
    <TransitionContext.Provider value={{ triggerTransition }}>
      {children}

      {/* Capa de Circular Reveal nativa por clip-path en blanco */}
      {isAnimating && (
        <div
          className="fixed inset-0 z-[100] bg-white pointer-events-none"
          style={{
            clipPath: clipStyle,
            WebkitClipPath: clipStyle,
            transition: 'clip-path 1800ms cubic-bezier(0.25, 1, 0.5, 1), -webkit-clip-path 1800ms cubic-bezier(0.25, 1, 0.5, 1)'
          }}
        />
      )}
    </TransitionContext.Provider>
  );
};
