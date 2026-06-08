"use client";

import { useId } from "react";

interface Props {
  size?: number;
  className?: string;
}

/**
 * Emblema RCT: caminho ascendente + horizonte dourado (luz).
 * Evita cruz + arco inferior que parecia rosto triste em tamanho pequeno.
 */
export function LogoMark({ size = 40, className = "" }: Props) {
  const uid = useId().replace(/:/g, "");
  const gradId = `rct-gold-${uid}`;

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 40 40"
      width={size}
      height={size}
      className={className}
      aria-hidden="true"
    >
      <defs>
        <linearGradient id={gradId} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#8b6914" />
          <stop offset="50%" stopColor="#c8a951" />
          <stop offset="100%" stopColor="#e8c97a" />
        </linearGradient>
      </defs>
      <rect width="40" height="40" rx="8" fill="#0d1520" />
      <circle cx="20" cy="20" r="15" fill="#1a2744" stroke={`url(#${gradId})`} strokeWidth="1.5" />
      {/* Horizonte / luz no topo */}
      <path
        d="M10 18 Q20 9 30 18"
        stroke={`url(#${gradId})`}
        strokeWidth="1.75"
        strokeLinecap="round"
        fill="none"
      />
      {/* Caminho ascendente */}
      <path
        d="M20 28 L20 16"
        stroke={`url(#${gradId})`}
        strokeWidth="2"
        strokeLinecap="round"
      />
      <circle cx="20" cy="14" r="2.25" fill="#e8c97a" />
      {/* Ciência — ponto luminoso */}
      <circle cx="28" cy="12" r="1.75" fill="#c8a951" opacity="0.85" />
    </svg>
  );
}
