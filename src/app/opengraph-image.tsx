import { ImageResponse } from "next/og";
import { profile } from "@/data/portfolio";

export const alt = `${profile.name} — ${profile.role}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// Card gerado para pré-visualização em redes sociais (og:image / twitter:image).
export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "80px",
          background: "#12151b",
          backgroundImage:
            "linear-gradient(#1b2029 1px, transparent 1px), linear-gradient(90deg, #1b2029 1px, transparent 1px)",
          backgroundSize: "48px 48px",
          fontFamily: "monospace",
          color: "#e7ecf3",
        }}
      >
        <div style={{ display: "flex", fontSize: 30, color: "#4d9dff" }}>~/nathan</div>
        <div style={{ display: "flex", fontSize: 96, fontWeight: 700, marginTop: 24 }}>
          {profile.name}
        </div>
        <div style={{ display: "flex", fontSize: 40, color: "#97a2b2", marginTop: 12 }}>
          {profile.role}
        </div>
        <div style={{ display: "flex", fontSize: 30, color: "#4d9dff", marginTop: 40 }}>
          Protheus · ADVPL / TLPP · React · Next.js
        </div>
      </div>
    ),
    { ...size },
  );
}
