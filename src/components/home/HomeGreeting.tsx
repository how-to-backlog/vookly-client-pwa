'use client';

import React, { useState, useEffect } from 'react';

export interface HomeGreetingProps {
  /** Override opcional de hora para pruebas unitarias o demos forzadas */
  forcedHour?: number;
}

/**
 * Determina el saludo según la franja horaria local.
 * 06:00 a 12:59 -> ¡Buen día!
 * 13:00 a 19:59 -> ¡Buenas tardes!
 * 20:00 a 05:59 -> ¡Buenas noches!
 */
export function getGreetingText(hour: number): string {
  if (hour >= 6 && hour < 13) return '¡Buen día!';
  if (hour >= 13 && hour < 20) return '¡Buenas tardes!';
  return '¡Buenas noches!';
}

/**
 * HomeGreeting: Bloque Lego modular que saluda según el horario local
 * e incluye el copy activador sin inventar identidades personales.
 */
export const HomeGreeting: React.FC<HomeGreetingProps> = ({ forcedHour }) => {
  const [greeting, setGreeting] = useState<string>('¡Hola!');

  useEffect(() => {
    const currentHour = forcedHour !== undefined ? forcedHour : new Date().getHours();
    setGreeting(getGreetingText(currentHour));
  }, [forcedHour]);

  return (
    <section className="px-5 pt-3 pb-2 select-none">
      <h1 className="text-2xl font-bold tracking-tight text-neutral-900 leading-snug">
        {greeting}
      </h1>
      <p className="text-sm font-medium text-neutral-500 mt-0.5">
        ¿Qué premios vas a canjear hoy?
      </p>
    </section>
  );
};

export default HomeGreeting;
