import { ImageResponse } from "next/og";
import {
  MARCA_NOME,
  MARCA_NOME_FUNDADOR,
  MARCA_NOME_INSTITUTO,
  MARCA_PILAR,
  MARCA_SIGLA,
} from "@/lib/identidade";
import {
  MARCA_OURO_MARCA,
  MARCA_TEAL_CLARO,
  NEUMA_ONDA_OURO,
  NEUMA_ONDA_PONTO,
  NEUMA_ONDA_TEAL,
} from "@/lib/marca-visual";

export const alt = `${MARCA_NOME} — O que aconteceu comigo?`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "center",
          gap: 48,
          background: "linear-gradient(135deg, #0d1520 0%, #1a2744 50%, #2a3d6b 100%)",
          color: "#f8f6f0",
          padding: 48,
        }}
      >
        <svg width="120" height="128" viewBox="0 0 64 68">
          <path
            d={NEUMA_ONDA_TEAL}
            fill="none"
            stroke={MARCA_TEAL_CLARO}
            strokeWidth="4.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d={NEUMA_ONDA_OURO}
            fill="none"
            stroke={MARCA_OURO_MARCA}
            strokeWidth="4.5"
            strokeLinecap="round"
          />
          <circle
            cx={NEUMA_ONDA_PONTO.cx}
            cy={NEUMA_ONDA_PONTO.cy}
            r={NEUMA_ONDA_PONTO.r}
            fill={MARCA_OURO_MARCA}
          />
        </svg>
        <div style={{ display: "flex", flexDirection: "column", maxWidth: 720 }}>
          <div style={{ fontSize: 28, opacity: 0.85 }}>{MARCA_NOME_INSTITUTO}</div>
          <div
            style={{
              fontSize: 56,
              fontWeight: 700,
              letterSpacing: "0.08em",
              color: "#f8f6f0",
            }}
          >
            {MARCA_SIGLA}
          </div>
          <div style={{ fontSize: 26, color: MARCA_OURO_MARCA, marginTop: 4 }}>{MARCA_NOME_FUNDADOR}</div>
          <div style={{ marginTop: 20, fontSize: 22, opacity: 0.9 }}>
            Você não está condenado a permanecer como está.
          </div>
          <div style={{ marginTop: 16, fontSize: 16, opacity: 0.65 }}>{MARCA_PILAR}</div>
        </div>
      </div>
    ),
    { ...size }
  );
}
