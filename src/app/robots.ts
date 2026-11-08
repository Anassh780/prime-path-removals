import type { MetadataRoute } from "next";

import { baseUrl } from "@/lib/seo";

/**
 * Public pages are open to crawlers. The API routes are form endpoints, not
 * content, so they are excluded from indexing.
 */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/api/"],
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
    host: baseUrl,
  };
}
