"use client";

import { NeumaSymbol } from "@/components/layout/NeumaSymbol";

interface Props {
  size?: number;
  className?: string;
}

/** Emblema NEUMA — delega ao símbolo de marca. */
export function LogoMark({ size = 40, className = "" }: Props) {
  return <NeumaSymbol size={size} className={className} />;
}
