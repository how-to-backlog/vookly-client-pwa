'use client';

import { useState, useCallback, useEffect, useRef, ReactNode } from 'react';
import { motion, useMotionValue, useAnimationFrame, useTransform } from 'motion/react';

export interface GradientTextProps {
  children: ReactNode;
  className?: string;
  colors?: string[];
  animationSpeed?: number;
  showBorder?: boolean;
  direction?: 'horizontal' | 'vertical' | 'diagonal';
  pauseOnHover?: boolean;
  yoyo?: boolean;
}

/**
 * GradientText: Texto animado y contorno vivo con degradado en movimiento unidireccional.
 * El efecto se desplaza continuamente de derecha a izquierda (100% -> 0%) en loop continuo, sin rebotar.
 */
export function GradientText({
  children,
  className = '',
  colors = ['#ffffff', '#2563eb'],
  animationSpeed = 3,
  showBorder = false,
  direction = 'horizontal',
  pauseOnHover = false,
  yoyo = false
}: GradientTextProps) {
  const [isPaused, setIsPaused] = useState(false);
  const progress = useMotionValue(100);
  const elapsedRef = useRef(0);
  const lastTimeRef = useRef<number | null>(null);

  const animationDuration = animationSpeed * 1000;

  useAnimationFrame(time => {
    if (isPaused) {
      lastTimeRef.current = null;
      return;
    }

    if (lastTimeRef.current === null) {
      lastTimeRef.current = time;
      return;
    }

    const deltaTime = time - lastTimeRef.current;
    lastTimeRef.current = time;
    elapsedRef.current += deltaTime;

    // Desplazamiento siempre de derecha a izquierda (100% -> 0%) en loop continuo
    const cycleTime = elapsedRef.current % animationDuration;
    const currentProgress = 100 - (cycleTime / animationDuration) * 100;
    progress.set(currentProgress);
  });

  useEffect(() => {
    elapsedRef.current = 0;
    progress.set(100);
  }, [animationSpeed]);

  const backgroundPosition = useTransform(progress, p => {
    if (direction === 'horizontal') {
      return `${p}% 50%`;
    } else if (direction === 'vertical') {
      return `50% ${p}%`;
    } else {
      return `${p}% 50%`;
    }
  });

  const handleMouseEnter = useCallback(() => {
    if (pauseOnHover) setIsPaused(true);
  }, [pauseOnHover]);

  const handleMouseLeave = useCallback(() => {
    if (pauseOnHover) setIsPaused(false);
  }, [pauseOnHover]);

  const gradientAngle =
    direction === 'horizontal' ? 'to right' : direction === 'vertical' ? 'to bottom' : 'to bottom right';
  const gradientColors = [...colors, colors[0]].join(', ');

  const gradientStyle = {
    backgroundImage: `linear-gradient(${gradientAngle}, ${gradientColors})`,
    backgroundSize: direction === 'horizontal' ? '300% 100%' : direction === 'vertical' ? '100% 300%' : '300% 300%',
    backgroundRepeat: 'repeat'
  };

  return (
    <motion.div
      className={`relative mx-auto flex max-w-fit flex-row items-center justify-center rounded-full font-medium transition-shadow duration-500 overflow-hidden bg-transparent ${showBorder ? 'py-1 px-3.5' : ''} ${className}`.trim()}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Contorno vivo sincronizado: corre siempre de derecha a izquierda */}
      {showBorder && (
        <motion.div
          className="absolute inset-0 z-0 pointer-events-none rounded-full"
          style={{
            ...gradientStyle,
            backgroundPosition,
            padding: '1.25px',
            WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
            WebkitMaskComposite: 'xor',
            maskComposite: 'exclude'
          }}
        />
      )}

      {/* Texto con el degradado animado de derecha a izquierda */}
      <motion.div
        className="inline-block relative z-10 text-transparent bg-clip-text"
        style={{ ...gradientStyle, backgroundPosition, WebkitBackgroundClip: 'text' }}
      >
        {children}
      </motion.div>
    </motion.div>
  );
}

export default GradientText;
