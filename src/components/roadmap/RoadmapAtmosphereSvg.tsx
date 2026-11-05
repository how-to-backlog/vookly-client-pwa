'use client';

import React from 'react';

export interface RoadmapAtmosphereSvgProps {
  width: number;
  height: number;
  className?: string;
}

/**
 * RoadmapAtmosphereSvg: Capa de fondo desacoplada con el gradiente vertical
 * de altitud hacia el cosmos, lunita menguante en el sello 30, y nubes
 * transparentes de contorno negro distribuidas asimétricamente entre el
 * inicio y el sello 15.
 */
export function RoadmapAtmosphereSvg({ width, height, className = '' }: RoadmapAtmosphereSvgProps) {
  return (
    <g className={`roadmap-atmosphere-layer pointer-events-none select-none ${className}`}>
      <defs>
        {/* Gradiente vertical continuo de altitud: de cosmos oscuro a blanco suelo */}
        <linearGradient id="atmosphericAltitudeGradient" x1="0%" y1="0%" x2="0%" y2="100%">
          {/* Cima: Espacio profundo / Noche cósmica */}
          <stop offset="0%" stopColor="#09090B" stopOpacity="0.96" />
          <stop offset="15%" stopColor="#0F172A" stopOpacity="0.88" />
          <stop offset="32%" stopColor="#1E293B" stopOpacity="0.55" />
          <stop offset="50%" stopColor="#334155" stopOpacity="0.25" />
          <stop offset="70%" stopColor="#94A3B8" stopOpacity="0.08" />
          <stop offset="85%" stopColor="#FFFFFF" stopOpacity="0.0" />
          <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0.0" />
        </linearGradient>
      </defs>

      {/* 1. Lienzo de fondo con el gradiente vertical continuo */}
      <rect
        x="0"
        y="0"
        width={width}
        height={height}
        fill="url(#atmosphericAltitudeGradient)"
      />

      {/* ========================================================================= */}
      {/* NUBES TRANSPARENTES DE CONTORNO NEGRO (DESDE INICIO HASTA SELLO 15)       */}
      {/* Cortadas en los laterales, asimétricas y sin tocar textos de premios      */}
      {/* ========================================================================= */}

      {/* Nube A (6.png): Cortada a la izquierda sobre los techos / sello 2 (~Y: height - 170) */}
      <image
        href="/images/roadmap/clouds/6.png"
        x="-75"
        y={height - 180}
        width="160"
        height="100"
        preserveAspectRatio="xMidYMid meet"
        opacity="0.85"
      />

      {/* Nube B (7.png): Asomando desde la derecha entre los sellos 3 y 5 (~Y: height - 290) */}
      <image
        href="/images/roadmap/clouds/7.png"
        x={width - 85}
        y={height - 290}
        width="155"
        height="98"
        preserveAspectRatio="xMidYMid meet"
        opacity="0.85"
      />

      {/* Nube C (8.png): Cortada a la izquierda debajo del hito 6 (~Y: height - 410) */}
      <image
        href="/images/roadmap/clouds/8.png"
        x="-65"
        y={height - 410}
        width="150"
        height="95"
        preserveAspectRatio="xMidYMid meet"
        opacity="0.8"
      />

      {/* Nube D (9.png): Cortada a la derecha entre los sellos 8 y 10 (~Y: height - 560) */}
      <image
        href="/images/roadmap/clouds/9.png"
        x={width - 90}
        y={height - 560}
        width="165"
        height="105"
        preserveAspectRatio="xMidYMid meet"
        opacity="0.85"
      />

      {/* Nube E (6.png): Asomando a la izquierda sobre el sello 11 (~Y: height - 680) */}
      <image
        href="/images/roadmap/clouds/6.png"
        x="-70"
        y={height - 680}
        width="145"
        height="92"
        preserveAspectRatio="xMidYMid meet"
        opacity="0.8"
      />

      {/* Nube F (7.png): Cortada a la derecha entre los sellos 13 y 15 (~Y: height - 830) */}
      <image
        href="/images/roadmap/clouds/7.png"
        x={width - 80}
        y={height - 830}
        width={160}
        height={100}
        preserveAspectRatio="xMidYMid meet"
        opacity="0.85"
      />

      {/* ========================================================================= */}
      {/* 2 NUBES ENTERAS FLOTANDO AL 100% VISIBLES (Sin tocar textos ni premios)   */}
      {/* ========================================================================= */}

      {/* Nube Entera 1 (8.png): Flotando entera a la derecha en el hueco entre sello 2 y 4 (~Y: height - 235) */}
      <image
        href="/images/roadmap/clouds/8.png"
        x={210}
        y={height - 235}
        width={95}
        height={60}
        preserveAspectRatio="xMidYMid meet"
        opacity="0.9"
      />

      {/* Nube Entera 2 (9.png): Reubicada en el espacio vacío a la derecha, arriba del texto del Sello 6 (~Y: height - 510) */}
      <image
        href="/images/roadmap/clouds/9.png"
        x={215}
        y={height - 520}
        width={95}
        height={60}
        preserveAspectRatio="xMidYMid meet"
        opacity="0.9"
      />

      {/* ========================================================================= */}
      {/* CIMA / ZONA SELLO 30: ESPACIO PROFUNDO                                     */}
      {/* ========================================================================= */}

      {/* Lunita menguante fina en la zona del sello 30 (~Y=210) */}
      <g transform="translate(305, 210)">
        <path
          d="M 0 -18 A 18 18 0 0 1 12 14 A 14 14 0 0 0 0 -18 Z"
          fill="#FAFAFA"
          stroke="#E4E4E7"
          strokeWidth="1"
        />
      </g>

      {/* Estrellitas de 4 puntas y asteriscos dispersos en la zona alta (reubicados lejos de los textos del Sello 30) */}
      {/* Estrella 1 (reubicada al lateral derecho despejado) */}
      <path
        d="M 320 80 Q 320 90 330 90 Q 320 90 320 100 Q 320 90 310 90 Q 320 90 320 80 Z"
        fill="#FFFFFF"
        opacity="0.9"
      />
      {/* Estrella 2 */}
      <path
        d="M 120 230 Q 120 237 127 237 Q 120 237 120 244 Q 120 237 113 237 Q 120 237 120 230 Z"
        fill="#FFFFFF"
        opacity="0.85"
      />
      {/* Estrella 3 */}
      <path
        d="M 60 140 Q 60 146 66 146 Q 60 146 60 152 Q 60 146 54 146 Q 60 146 60 140 Z"
        fill="#FFFFFF"
        opacity="0.8"
      />
      {/* Asterisco 1 (reubicado a la izquierda arriba en espacio limpio) */}
      <g transform="translate(130, 60)" stroke="#FFFFFF" strokeWidth="1.2" strokeLinecap="round" opacity="0.8">
        <line x1="0" y1="-5" x2="0" y2="5" />
        <line x1="-5" y1="0" x2="5" y2="0" />
        <line x1="-3.5" y1="-3.5" x2="3.5" y2="3.5" />
        <line x1="-3.5" y1="3.5" x2="3.5" y2="-3.5" />
      </g>
      {/* Asterisco 2 */}
      <g transform="translate(70, 290)" stroke="#FFFFFF" strokeWidth="1" strokeLinecap="round" opacity="0.75">
        <line x1="0" y1="-4" x2="0" y2="4" />
        <line x1="-4" y1="0" x2="4" y2="0" />
        <line x1="-2.8" y1="-2.8" x2="2.8" y2="2.8" />
        <line x1="-2.8" y1="2.8" x2="2.8" y2="-2.8" />
      </g>
      {/* Asterisco 3 (reubicado hacia la derecha abajo del texto) */}
      <g transform="translate(325, 140)" stroke="#FFFFFF" strokeWidth="1.2" strokeLinecap="round" opacity="0.85">
        <line x1="0" y1="-5" x2="0" y2="5" />
        <line x1="-5" y1="0" x2="5" y2="0" />
        <line x1="-3.5" y1="-3.5" x2="3.5" y2="3.5" />
        <line x1="-3.5" y1="3.5" x2="3.5" y2="-3.5" />
      </g>

      {/* Puntos de estrellas pequeñas */}
      <circle cx="150" cy="130" r="1.5" fill="#FFFFFF" opacity="0.9" />
      <circle cx="280" cy="110" r="1.2" fill="#FFFFFF" opacity="0.7" />
      <circle cx="40" cy="200" r="1.5" fill="#FFFFFF" opacity="0.8" />
      <circle cx="210" cy="280" r="1.2" fill="#FFFFFF" opacity="0.7" />
      <circle cx="140" cy="360" r="1.4" fill="#FFFFFF" opacity="0.75" />
      <circle cx="290" cy="350" r="1.5" fill="#FFFFFF" opacity="0.75" />
    </g>
  );
}
