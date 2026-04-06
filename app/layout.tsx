import type { Metadata } from "next";
import { Inter, Oswald } from "next/font/google";
import "@/app/globals.css";
import { Footer } from "@/components/layout/Footer";
import { Navbar } from "@/components/layout/Navbar";
import { getCanonicalUrl, getMetadataBase } from "@/lib/site";

const bodyFont = Inter({
  subsets: ["latin"],
  variable: "--font-body",
});

const displayFont = Oswald({
  subsets: ["latin"],
  variable: "--font-display",
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  metadataBase: getMetadataBase(),
  title: {
    default: "Credu Consulting",
    template: "%s | Credu Consulting",
  },
  description:
    "Structured credit consulting with a visible 3-bureau workflow, admin-reviewed disputes, and certified-mail tracking.",
  alternates: {
    canonical: getCanonicalUrl("/"),
  },
  openGraph: {
    title: "Credu Consulting",
    description:
      "Structured credit consulting with a visible 3-bureau workflow, admin-reviewed disputes, and certified-mail tracking.",
    url: getCanonicalUrl("/"),
    siteName: "Credu Consulting",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${bodyFont.variable} ${displayFont.variable} font-sans`}>
        <div className="min-h-screen bg-transparent text-text">
          <Navbar />
          <main className="mx-auto flex w-full max-w-page flex-col gap-5 px-5 pb-20 pt-8 md:px-8 md:pt-10">
            {children}
          </main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
