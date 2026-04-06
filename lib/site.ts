const PRIMARY_SITE_URL = "https://creditu.ai";
const LOCAL_SITE_URL = "http://localhost:3001";

function normalizeUrl(value: string) {
  return value.replace(/\/$/, "");
}

export function getSiteUrl() {
  const envUrl =
    process.env.NEXT_PUBLIC_APP_URL?.trim() || process.env.APP_BASE_URL?.trim() || LOCAL_SITE_URL;

  if (process.env.VERCEL_ENV === "production") {
    return PRIMARY_SITE_URL;
  }

  return normalizeUrl(envUrl);
}

export function getMetadataBase() {
  return new URL(getSiteUrl());
}

export function getCanonicalUrl(pathname = "/") {
  const base = getSiteUrl();
  return pathname === "/" ? base : `${base}${pathname}`;
}

export const primarySiteUrl = PRIMARY_SITE_URL;
