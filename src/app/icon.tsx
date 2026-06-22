import { ImageResponse } from "next/og";
import { MARCA_TEAL, NEUMA_ICON_N } from "@/lib/marca-visual";

export const size = { width: 32, height: 32 };
export const contentType = "image/png";

/** Favicon — N geométrico NEUMA */
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
          background: "#f8f6f0",
          borderRadius: 6,
        }}
      >
        <svg width="22" height="22" viewBox="0 0 32 32">
          <path d={NEUMA_ICON_N} fill={MARCA_TEAL} />
        </svg>
      </div>
    ),
    { ...size }
  );
}
