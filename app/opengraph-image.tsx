import { ImageResponse } from "next/og";
import { seoDescription, siteName } from "@/app/seo";

export const alt = "CryptoMind AI live crypto intelligence dashboard";

export const size = {
  width: 1200,
  height: 630,
};

export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          background: "linear-gradient(135deg, #07110d 0%, #101113 52%, #182f27 100%)",
          color: "#f8fafc",
          display: "flex",
          height: "100%",
          padding: 68,
          position: "relative",
          width: "100%",
        }}
      >
        <div
          style={{
            border: "2px solid rgba(52,211,153,0.22)",
            borderRadius: 26,
            bottom: 42,
            left: 42,
            position: "absolute",
            right: 42,
            top: 42,
          }}
        />
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            width: "100%",
          }}
        >
          <div style={{ alignItems: "center", display: "flex", gap: 22 }}>
            <div
              style={{
                alignItems: "center",
                background: "#34d399",
                borderRadius: 18,
                color: "#04110c",
                display: "flex",
                fontSize: 34,
                fontWeight: 900,
                height: 76,
                justifyContent: "center",
                letterSpacing: 0,
                width: 76,
              }}
            >
              CM
            </div>
            <div style={{ display: "flex", flexDirection: "column" }}>
              <div style={{ color: "#34d399", fontSize: 30, fontWeight: 800 }}>
                {siteName}
              </div>
              <div style={{ color: "#a1a1aa", fontSize: 22 }}>
                Worldwide AI crypto intelligence
              </div>
            </div>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 28, maxWidth: 920 }}>
            <div
              style={{
                color: "#f8fafc",
                fontSize: 76,
                fontWeight: 900,
                letterSpacing: 0,
                lineHeight: 0.96,
              }}
            >
              Live crypto news, sentiment, airdrops and AI market signals.
            </div>
            <div style={{ color: "#d4d4d8", fontSize: 27, lineHeight: 1.36 }}>
              {seoDescription}
            </div>
          </div>
          <div style={{ display: "flex", gap: 14 }}>
            {["Bitcoin", "Altcoins", "DeFi", "RWA", "Airdrops"].map((tag) => (
              <div
                key={tag}
                style={{
                  background: "rgba(52,211,153,0.12)",
                  border: "1px solid rgba(52,211,153,0.34)",
                  borderRadius: 999,
                  color: "#bbf7d0",
                  fontSize: 22,
                  fontWeight: 700,
                  padding: "12px 20px",
                }}
              >
                {tag}
              </div>
            ))}
          </div>
        </div>
      </div>
    ),
    size
  );
}
