import { ImageResponse } from "next/og";
import { MARCA_TEAL, NEUMA_ICON_N } from "@/lib/marca-visual";

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
          alignItems: "center",
          justifyContent: "center",
          background: "#f8f6f0",
          borderRadius: 40,
        }}
      >
        <svg width="108" height="108" viewBox="0 0 32 32">
          <path d={NEUMA_ICON_N} fill={MARCA_TEAL} />
        </svg>
      </div>
    ),
    { ...size }
  );
}
