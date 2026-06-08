import { ImageResponse } from "next/og";

export const size = { width: 32, height: 32 };
export const contentType = "image/png";

/** Favicon alinhado ao emblema: caminho + luz (sem aparência de rosto) */
export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#0d1520",
          borderRadius: 7,
        }}
      >
        <svg width="28" height="28" viewBox="0 0 40 40">
          <circle cx="20" cy="20" r="15" fill="#1a2744" stroke="#c8a951" strokeWidth="2" />
          <path
            d="M10 18 Q20 9 30 18"
            stroke="#e8c97a"
            strokeWidth="2"
            fill="none"
            strokeLinecap="round"
          />
          <path d="M20 28 L20 16" stroke="#c8a951" strokeWidth="2.5" strokeLinecap="round" />
          <circle cx="20" cy="14" r="2.5" fill="#e8c97a" />
        </svg>
      </div>
    ),
    { ...size }
  );
}
