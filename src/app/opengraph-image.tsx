import { ImageResponse } from "next/og";

import { siteConfig } from "@/config/site";

/**
 * Social share card, generated at build time with `next/og` (Satori).
 *
 * Deliberately self-contained: the default font bundled with Next is used and
 * nothing is fetched over the network, so the image builds in an offline CI
 * sandbox. Brand colours are the literal token values from `globals.css`
 * because Satori renders outside the Tailwind pipeline.
 */

export const alt = `${siteConfig.name} — ${siteConfig.tagline}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

function siteHost() {
  try {
    return new URL(siteConfig.url).host;
  } catch {
    return siteConfig.url.replace(/^https?:\/\//, "").replace(/\/$/, "");
  }
}

/** First sentence of the site description — short enough for a share card. */
function leadSentence() {
  const [first] = siteConfig.description.split(". ");
  if (!first) return siteConfig.description;
  return first.endsWith(".") ? first : `${first}.`;
}

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          position: "relative",
          backgroundColor: "#04101f",
          padding: "64px 80px",
        }}
      >
        {/* Accent hairline along the top edge */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            height: 6,
            backgroundColor: "#11543b",
          }}
        />

        {/* Quiet geometric accent — abstract stacked boxes, right-hand side */}
        <div
          style={{
            position: "absolute",
            right: 80,
            bottom: 120,
            display: "flex",
            alignItems: "flex-end",
            opacity: 0.55,
          }}
        >
          <div
            style={{
              display: "flex",
              width: 96,
              height: 132,
              marginRight: 14,
              borderRadius: 10,
              backgroundColor: "#0d2547",
              border: "1px solid rgba(255,255,255,0.08)",
            }}
          />
          <div
            style={{
              display: "flex",
              width: 72,
              height: 96,
              marginRight: 14,
              borderRadius: 10,
              backgroundColor: "#163559",
              border: "1px solid rgba(255,255,255,0.08)",
            }}
          />
          <div
            style={{
              display: "flex",
              width: 52,
              height: 52,
              borderRadius: 10,
              backgroundColor: "#11543b",
            }}
          />
        </div>

        {/* Wordmark */}
        <div style={{ display: "flex", alignItems: "center" }}>
          <div
            style={{
              display: "flex",
              width: 10,
              height: 10,
              marginRight: 14,
              borderRadius: 2,
              backgroundColor: "#11543b",
            }}
          />
          <div
            style={{
              display: "flex",
              fontSize: 18,
              letterSpacing: "0.28em",
              color: "#8aa9c6",
            }}
          >
            PRIME HOUSE REMOVALS
          </div>
        </div>

        {/* Headline + supporting line */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            maxWidth: 760,
          }}
        >
          <div
            style={{
              display: "flex",
              fontSize: 68,
              lineHeight: 1.08,
              letterSpacing: "-0.03em",
              color: "#ffffff",
            }}
          >
            {siteConfig.tagline}
          </div>
          <div
            style={{
              display: "flex",
              marginTop: 28,
              fontSize: 24,
              lineHeight: 1.5,
              color: "#8aa9c6",
              maxWidth: 680,
            }}
          >
            {leadSentence()}
          </div>
        </div>

        {/* Footer rule + domain */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            borderTop: "1px solid rgba(255,255,255,0.12)",
            paddingTop: 24,
          }}
        >
          <div
            style={{
              display: "flex",
              fontSize: 20,
              color: "#b9cee0",
            }}
          >
            {siteHost()}
          </div>
          <div
            style={{
              display: "flex",
              fontSize: 18,
              letterSpacing: "0.12em",
              color: "#64748b",
            }}
          >
            HOUSE / OFFICE / COMMERCIAL
          </div>
        </div>
      </div>
    ),
    { ...size },
  );
}
