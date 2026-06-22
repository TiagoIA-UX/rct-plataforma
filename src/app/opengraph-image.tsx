import { ImageResponse } from "next/og";

export const alt = "Instituto NEUMA — O que aconteceu comigo?";
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
            fontSize: 52,
            fontWeight: 700,
            letterSpacing: "0.04em",
            color: "#c8a951",
            textAlign: "center",
          }}
        >
          Instituto NEUMA
        </div>
        <div style={{ marginTop: 28, fontSize: 30, opacity: 0.95, textAlign: "center", maxWidth: 880 }}>
          Você não está condenado a permanecer como está.
        </div>
        <div style={{ marginTop: 18, fontSize: 20, opacity: 0.8, textAlign: "center", maxWidth: 820 }}>
          Talvez exista uma história por trás do seu sofrimento que ainda não foi compreendida.
        </div>
        <div style={{ marginTop: 20, fontSize: 18, opacity: 0.7, textAlign: "center", fontStyle: "italic" }}>
          O cérebro muda. A consciência se expande. A vida pode ser transformada.
        </div>
        <div style={{ marginTop: 24, fontSize: 16, opacity: 0.6 }}>
          Compreensão · Consciência · Transformação
        </div>
      </div>
    ),
    { ...size }
  );
}
