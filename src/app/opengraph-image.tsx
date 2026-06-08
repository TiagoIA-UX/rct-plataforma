import { ImageResponse } from "next/og";

export const alt = "RCT — Tradição e neurociência comportamental";
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
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background: "linear-gradient(135deg, #0d1520 0%, #1a2744 50%, #2a3d6b 100%)",
          color: "#f8f6f0",
        }}
      >
        <div
          style={{
            fontSize: 96,
            fontWeight: 700,
            letterSpacing: "0.12em",
            color: "#c8a951",
          }}
        >
          RCT
        </div>
        <div style={{ marginTop: 24, fontSize: 30, opacity: 0.9, textAlign: "center", padding: "0 48px" }}>
          Tradição cristã e neurociência comportamental
        </div>
        <div style={{ marginTop: 16, fontSize: 20, opacity: 0.65 }}>
          Memória · Emoção · Hábitos · Vínculos
        </div>
      </div>
    ),
    { ...size }
  );
}
