import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
import { Inter, Plus_Jakarta_Sans } from "next/font/google";

import "./globals.css";

import { Providers } from "@/app/providers";
import { BookingBubble } from "@/components/layout/booking-bubble";
import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { ScrollProgress } from "@/components/shared/scroll-progress";
import { Toaster } from "@/components/ui/sonner";
import { siteConfig } from "@/config/site";
import { cn } from "@/lib/utils";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-plus-jakarta",
  display: "swap",
});

const baseUrl = siteConfig.url.replace(/\/$/, "");
const homeTitle = `${siteConfig.name} — ${siteConfig.tagline}`;

export const metadata: Metadata = {
  metadataBase: new URL(baseUrl),
  title: {
    default: homeTitle,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  applicationName: siteConfig.name,
  category: "Removals and moving services",
  openGraph: {
    type: "website",
    siteName: siteConfig.name,
    locale: siteConfig.locale,
    url: "/",
    title: homeTitle,
    description: siteConfig.description,
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: siteConfig.name,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: homeTitle,
    description: siteConfig.description,
    images: ["/opengraph-image"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  icons: {
    icon: [{ url: "/icon.svg", type: "image/svg+xml", sizes: "any" }],
    shortcut: ["/icon.svg"],
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  colorScheme: "light",
  themeColor: "#04101f",
};

export default function RootLayout({
  children,
}: Readonly<{ children: ReactNode }>) {
  /*
   * The @theme font tokens in globals.css are declared on :root, so the
   * next/font variables must also be present on <html> for --font-sans and
   * --font-display to resolve. They are repeated on <body> below.
   */
  return (
    <html
      lang="en-GB"
      data-scroll-behavior="smooth"
      className={cn(inter.variable, plusJakarta.variable)}
    >
      <body
        className={cn(
          inter.variable,
          plusJakarta.variable,
          "font-sans antialiased",
        )}
      >
        <Providers>
          <ScrollProgress />

          {/*
           * Motion wrappers render at their initial opacity/transform in the
           * server HTML. Without JavaScript nothing would ever animate them in,
           * so the static page gets a plain, fully visible fallback.
           */}
          <noscript>
            <style>{`[data-page-transition],[data-reveal],[data-reveal-item],[data-reveal-text],[data-reveal-word]{opacity:1!important;transform:none!important;filter:none!important}`}</style>
          </noscript>

          <a
            href="#main"
            className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-lg focus:bg-navy-900 focus:px-4 focus:py-2.5 focus:text-sm focus:font-medium focus:text-white focus:shadow-overlay focus:outline-none focus-visible:ring-2 focus-visible:ring-accent-300"
          >
            Skip to content
          </a>

          <SiteHeader />

          <main id="main" tabIndex={-1} className="min-h-[60vh] focus:outline-none">
            {children}
          </main>

          <SiteFooter />

          <BookingBubble />

          <Toaster />
        </Providers>
      </body>
    </html>
  );
}
