import type { MetadataRoute } from "next";
import { getCanonicalUrl } from "@/lib/site";

const routes = [
  "/",
  "/how-it-works",
  "/results",
  "/book",
  "/login",
  "/register",
  "/forgot-password",
  "/reset-password",
  "/verify-email",
];

export default function sitemap(): MetadataRoute.Sitemap {
  return routes.map((route) => ({
    url: getCanonicalUrl(route),
    lastModified: new Date(),
    changeFrequency: route === "/" ? "weekly" : "monthly",
    priority: route === "/" ? 1 : 0.7,
  }));
}
