import { ImageResponse } from "next/og";

export const alt = "Todos Sejam Um — Fé e ciência com comprovação";
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
          padding: 48,
        }}
      >
        <div
          style={{
            fontSize: 56,
            fontWeight: 700,
            letterSpacing: "0.04em",
            color: "#c8a951",
            textAlign: "center",
          }}
        >
          Todos Sejam Um
        </div>
        <div style={{ marginTop: 28, fontSize: 28, opacity: 0.9, textAlign: "center", fontStyle: "italic" }}>
          «Para que todos sejam um.»
        </div>
        <div style={{ marginTop: 12, fontSize: 18, opacity: 0.65 }}>João 17:21</div>
        <div style={{ marginTop: 24, fontSize: 20, opacity: 0.75 }}>
          Fé · Ciência · Unidade · Amor Universal
        </div>
      </div>
    ),
    { ...size }
  );
}
