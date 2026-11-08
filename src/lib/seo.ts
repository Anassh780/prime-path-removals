import type { Metadata } from "next";

import { siteConfig } from "@/config/site";

const baseUrl = siteConfig.url.replace(/\/$/, "");

type BuildMetadataArgs = {
  title: string;
  description: string;
  path?: string;
  /** Absolute or root-relative image path. Defaults to the generated OG image. */
  image?: string;
  noIndex?: boolean;
};

/** Consistent per-page metadata: canonical URL, Open Graph and Twitter cards. */
export function buildMetadata({
  title,
  description,
  path = "/",
  image = "/opengraph-image",
  noIndex = false,
}: BuildMetadataArgs): Metadata {
  const url = `${baseUrl}${path === "/" ? "" : path}`;

  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      type: "website",
      siteName: siteConfig.name,
      locale: siteConfig.locale,
      url,
      title,
      description,
      images: [{ url: image, width: 1200, height: 630, alt: siteConfig.name }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [image],
    },
    ...(noIndex ? { robots: { index: false, follow: false } } : {}),
  };
}

export { baseUrl };
