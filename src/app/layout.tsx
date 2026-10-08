import type { Metadata, Viewport } from "next";
import { DM_Mono, Handjet, Inter, Just_Me_Again_Down_Here } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import { site } from "@/content/site";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { ClientEffects } from "@/components/ui/ClientEffects";
import { Intro, introScript } from "@/components/layout/Intro";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter", display: "swap" });
const dmMono = DM_Mono({ subsets: ["latin"], weight: ["400", "500"], variable: "--font-dm-mono", display: "swap" });
const handjet = Handjet({ subsets: ["latin"], variable: "--font-handjet", display: "swap" });
const hand = Just_Me_Again_Down_Here({ subsets: ["latin"], weight: "400", variable: "--font-hand", display: "swap" });

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: { default: site.title, template: `%s — ${site.name}` },
  description: site.description,
  keywords: site.keywords,
  authors: [{ name: site.name }],
  creator: site.name,
  alternates: { canonical: "/" },
  openGraph: { type: "website", url: "/", siteName: site.name, title: site.title, description: site.description, locale: site.locale },
  twitter: { card: "summary_large_image", title: site.title, description: site.description },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = { themeColor: "#FDFDFB", width: "device-width", initialScale: 1 };

const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: site.name,
  jobTitle: "Product Designer & Design Engineer",
  description: site.description,
  url: site.url,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${dmMono.variable} ${handjet.variable} ${hand.variable}`} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: "document.documentElement.classList.add('js');" + introScript }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }} />
      </head>
      <body className="min-h-dvh overflow-x-clip">
        <Intro />
        <Navbar />
        <main id="main">{children}</main>
        <Footer />
        <ClientEffects />
        {process.env.VERCEL && <Analytics />}
      </body>
    </html>
  );
}
