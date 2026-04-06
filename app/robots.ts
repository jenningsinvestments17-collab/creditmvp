import type { MetadataRoute } from "next";
import { primarySiteUrl } from "@/lib/site";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
    sitemap: `${primarySiteUrl}/sitemap.xml`,
    host: primarySiteUrl,
  };
}
