import { ImageResponse } from "next/og";
import { site } from "@/lib/site";

// Convention Next : cette image sert d'`og:image` par défaut à TOUTES les pages
// (résolue en absolu via `metadataBase`), sauf override plus profond. Générée au
// build, sans police distante pour éviter tout fetch réseau.
export const alt = "Court-Circuit · Salle de sport à Saint-Herblain";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
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
          background: "#0d0d0d",
          color: "#ffffff",
          fontFamily: "sans-serif",
        }}
      >
        <div
          style={{
            fontSize: 28,
            letterSpacing: 6,
            textTransform: "uppercase",
            color: "#f07336",
            fontWeight: 700,
          }}
        >
          {`Salle de sport · ${site.city}`}
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            fontSize: 92,
            fontWeight: 800,
            lineHeight: 1.05,
            marginTop: 24,
          }}
        >
          <div style={{ display: "flex" }}>Cross Training</div>
          <div style={{ display: "flex" }}>&amp; Cardio Boxing</div>
        </div>
        <div style={{ fontSize: 34, color: "#98a0a5", marginTop: 32 }}>
          Deux coachs diplômés d&apos;État · Première séance offerte
        </div>
      </div>
    ),
    size,
  );
}
