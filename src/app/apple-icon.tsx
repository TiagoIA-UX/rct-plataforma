import { ImageResponse } from "next/og";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default function AppleIcon() {
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
          background: "linear-gradient(145deg, #0d1520 0%, #1a2744 100%)",
          borderRadius: 36,
        }}
      >
        <svg width="100" height="100" viewBox="0 0 40 40">
          <circle cx="20" cy="20" r="15" fill="#1a2744" stroke="#c8a951" strokeWidth="1.5" />
          <path
            d="M10 18 Q20 9 30 18"
            stroke="#e8c97a"
            strokeWidth="1.75"
            fill="none"
            strokeLinecap="round"
          />
          <path d="M20 28 L20 16" stroke="#c8a951" strokeWidth="2" strokeLinecap="round" />
          <circle cx="20" cy="14" r="2.25" fill="#e8c97a" />
          <circle cx="28" cy="12" r="1.75" fill="#c8a951" />
        </svg>
        <div
          style={{
            marginTop: 14,
            color: "#f8f6f0",
            fontSize: 26,
            fontWeight: 600,
            letterSpacing: "0.14em",
          }}
        >
          RCT
        </div>
      </div>
    ),
    { ...size }
  );
}
