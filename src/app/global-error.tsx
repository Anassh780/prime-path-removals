"use client";

/**
 * Last-resort error boundary. This replaces the root layout when an error
 * happens above it, so `globals.css` and the design tokens are not guaranteed
 * to be loaded. Styles are therefore inline and the hex values are exact
 * copies of the brand tokens (navy-900, accent-500, ink, ink-soft, line,
 * surface-subtle) — the only place in the project where raw hex is correct.
 *
 * Motion follows the same rule: the entrance is a local @keyframes block in a
 * <style> element (no Tailwind, no shared motion utilities) and it is disabled
 * when the visitor asks for reduced motion.
 */
const FALLBACK_CSS = `
@keyframes gerr-rise {
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
}
.gerr-shell {
  animation: gerr-rise 480ms cubic-bezier(0.22, 1, 0.36, 1) both;
}
.gerr-btn {
  transition:
    background-color 150ms cubic-bezier(0.22, 1, 0.36, 1),
    transform 150ms cubic-bezier(0.22, 1, 0.36, 1);
}
.gerr-btn:hover { background-color: #0d2547 !important; }
.gerr-btn:active { transform: translateY(1px); }
.gerr-btn:focus-visible,
.gerr-link:focus-visible {
  outline: 2px solid #1173d4;
  outline-offset: 2px;
  border-radius: 2px;
}
@media (prefers-reduced-motion: reduce) {
  .gerr-shell { animation: none; }
  .gerr-btn { transition: none; }
  .gerr-btn:active { transform: none; }
}
`;

export default function GlobalError({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html lang="en-GB">
      <body
        style={{
          margin: 0,
          minHeight: "100vh",
          backgroundColor: "#f7f9fb",
          color: "#0a1526",
          fontFamily:
            "ui-sans-serif, system-ui, -apple-system, 'Segoe UI', Roboto, sans-serif",
          WebkitFontSmoothing: "antialiased",
        }}
      >
        <style>{FALLBACK_CSS}</style>
        <main
          style={{
            minHeight: "100vh",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "24px",
          }}
        >
          <div
            className="gerr-shell"
            style={{
              width: "100%",
              maxWidth: "520px",
              backgroundColor: "#ffffff",
              border: "1px solid #e3e8ef",
              borderRadius: "16px",
              padding: "40px",
            }}
          >
            <svg
              viewBox="0 0 40 40"
              width="40"
              height="40"
              role="img"
              aria-label="Prime House Removals"
            >
              <rect width="40" height="40" rx="10" fill="#04101f" />
              <path
                d="M10.5 20.4 20 12.6l9.5 7.8"
                fill="none"
                stroke="#ffffff"
                strokeWidth="2.4"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M13.2 19v8.6h13.6V19"
                fill="none"
                stroke="#ffffff"
                strokeWidth="2.4"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M17.6 27.6v-4.8h4.8v4.8"
                fill="none"
                stroke="#11543b"
                strokeWidth="2.4"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M26.4 10.4h4.2"
                stroke="#11543b"
                strokeWidth="2.4"
                strokeLinecap="round"
              />
            </svg>

            <h1
              style={{
                margin: "24px 0 0",
                fontSize: "28px",
                lineHeight: 1.15,
                letterSpacing: "-0.02em",
                fontWeight: 600,
              }}
            >
              This site could not load
            </h1>

            <p
              style={{
                margin: "12px 0 0",
                fontSize: "15px",
                lineHeight: 1.65,
                color: "#44546a",
              }}
            >
              An unexpected error stopped the page from starting. Reload to try
              again — if it keeps happening, come back in a few minutes.
            </p>

            <button
              type="button"
              onClick={reset}
              className="gerr-btn"
              style={{
                marginTop: "28px",
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                height: "44px",
                padding: "0 20px",
                border: "none",
                borderRadius: "8px",
                backgroundColor: "#04101f",
                color: "#ffffff",
                fontSize: "14px",
                fontWeight: 500,
                fontFamily: "inherit",
                cursor: "pointer",
              }}
            >
              Try again
            </button>

            <p
              style={{
                margin: "20px 0 0",
                fontSize: "13px",
                lineHeight: 1.6,
                color: "#64748b",
              }}
            >
              Prime House Removals —{" "}
              {/* A plain anchor is intentional here: global-error replaces the
                  root layout, so it must not depend on router context. */}
              {/* eslint-disable-next-line @next/next/no-html-link-for-pages */}
              <a
                href="/"
                className="gerr-link"
                style={{ color: "#0b5aa8", textDecoration: "underline" }}
              >
                return to the home page
              </a>
            </p>
          </div>
        </main>
      </body>
    </html>
  );
}
