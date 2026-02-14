import { ImageResponse } from "next/og";

export const alt = "ClaimCoach — Fight Your Lowball Total Loss Offer";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OGImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: 1200,
          height: 630,
          background: "#0d0d0d",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "80px",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            marginBottom: 40,
          }}
        >
          <div
            style={{
              width: 48,
              height: 48,
              background: "#FF6B4A",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              marginRight: 16,
            }}
          >
            <span
              style={{
                color: "#0d0d0d",
                fontSize: 28,
                fontWeight: 700,
                fontFamily: "sans-serif",
              }}
            >
              C
            </span>
          </div>
          <span
            style={{
              color: "#f5f0eb",
              fontSize: 28,
              fontWeight: 700,
              fontFamily: "sans-serif",
              letterSpacing: "-0.02em",
            }}
          >
            ClaimCoach
          </span>
        </div>

        <div
          style={{
            color: "#f5f0eb",
            fontSize: 64,
            fontWeight: 700,
            fontFamily: "sans-serif",
            lineHeight: 1.1,
            maxWidth: 800,
            letterSpacing: "-0.03em",
          }}
        >
          Fight Your Lowball Total Loss Offer
        </div>

        <div
          style={{
            color: "#4a555e",
            fontSize: 24,
            fontFamily: "sans-serif",
            marginTop: 24,
            maxWidth: 700,
            lineHeight: 1.4,
          }}
        >
          AI-powered analysis finds the line items your insurer is hoping
          you&apos;ll miss.
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            marginTop: 48,
            gap: 32,
          }}
        >
          <div
            style={{
              background: "#FF6B4A",
              color: "#0d0d0d",
              padding: "14px 32px",
              fontSize: 20,
              fontWeight: 600,
              fontFamily: "sans-serif",
            }}
          >
            Free to start
          </div>
          <span
            style={{
              color: "#4a555e",
              fontSize: 20,
              fontFamily: "sans-serif",
            }}
          >
            Avg. recovery: $3,500+
          </span>
        </div>
      </div>
    ),
    { ...size }
  );
}
