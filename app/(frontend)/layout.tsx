/** biome-ignore-all lint/security/noDangerouslySetInnerHtml: SEO */
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "../globals.css";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import Head from "next/head";
import { getLocale } from "next-intl/server";
import type { ReactNode } from "react";
import Providers from "@/common/providers";
import { cn } from "@/lib/utils";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://www.douche-senior-france.com/"),
  title: {
    default:
      "Douche Senior France - Douche Sécurisée sur Mesure, Installation Rapide & Fabrication Française",
    template: "%s | Douche Senior France",
  },
  description:
    "Adaptez votre salle de bain avec notre douche sécurisée pour les seniors en 1 journée. Fabrication 100% française. Labellisée Handibat Silverbat.",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "fr_FR",
    url: "https://www.douche-senior-france.com",
    title:
      "Douche Senior France - Douche Sécurisée sur Mesure, Installation Rapide & Fabrication Française",
    description:
      "Adaptez votre salle de bain avec notre douche sécurisée pour les seniors en 1 journée. Fabrication 100% française. Labellisée Handibat Silverbat.Installation de douches sécurisées pour seniors en 1 journée. Fabrication 100% française, normes PMR et labellisation Handibat Silverbat. Demandez votre devis gratuit.",
    images: [
      {
        url: "/hero.png",
        width: 1536,
        height: 1024,
        alt: "Douche senior sécurisée et moderne - Fabrication française",
      },
    ],
    siteName: "Douche Senior France",
  },
  twitter: {
    card: "summary_large_image",
    title: "Douche Senior France - Installation de douches sécurisées",
    description:
      "Douche senior sur mesure, posée en 1 journée. Fabrication française, normes PMR et label Handibat Silverbat. Devis gratuit.",
    images: ["/hero.png"],
  },
  alternates: {
    canonical: "https://www.douche-senior-france.com",
  },
  other: {
    "theme-color": "#ffffff",
    "msapplication-TileColor": "#ffffff",
    keywords:
      "douche senior, douche sécurisée, douche PMR, douche adaptée personnes âgées, installation douche handicapée, douche plain-pied, fabricant douche française, douche aide action logement, douche Handibat Silverbat, douche, salle de bain, baignoire, senior, douche blois, douche romorantin, douche chateauroux, douche bourges, douche tours, douche région centre, salle de bain région centre, prime adapt",
  },
};

// --- JSON-LD constants SEO ---
const orgJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Douche Senior France",
  url: "https://www.douche-senior-france.com/",
  logo: "https://www.douche-senior-france.com/logo.png",
  sameAs: ["https://www.facebook.com/douche.senior.france/"],
};

const serviceJsonLd = {
  "@context": "https://schema.org",
  "@type": "Service",
  serviceType: "Installation de douches sécurisées pour seniors",
  provider: {
    "@type": "Organization",
    name: "Douche Senior France",
    url: "https://www.douche-senior-france.com",
  },
  areaServed: {
    "@type": "Country",
    name: "France",
  },
  offers: {
    "@type": "Offer",
    url: "https://www.douche-senior-france.com/#contact",
    price: "Sur devis",
    priceCurrency: "EUR",
  },
};

const localBusinessJsonLd = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  name: "Douche Senior France",
  image: "https://www.douche-senior-france.com/logo.png",
  "@id": "https://www.douche-senior-france.com",
  url: "https://www.douche-senior-france.com",
  telephone: "02 54 97 53 23",
  address: {
    "@type": "PostalAddress",
    streetAddress: "147 rue de Romorantin",
    addressLocality: "Selles sur Cher",
    postalCode: "41130",
    addressCountry: "FR",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: 47.28256927999651,
    longitude: 1.5726510253114867,
  },
  areaServed: {
    "@type": "AdministrativeArea",
    name: "Centre-Val de Loire",
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  const locale = await getLocale();

  return (
    <html className="scroll-smooth" lang={locale} suppressHydrationWarning>
      <Head>
        <meta content="DSF" name="apple-mobile-web-app-title" />
        <script
          dangerouslySetInnerHTML={{ __html: JSON.stringify(orgJsonLd) }}
          type="application/ld+json"
        />
        <script
          dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceJsonLd) }}
          type="application/ld+json"
        />
        <script
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(localBusinessJsonLd),
          }}
          type="application/ld+json"
        />
      </Head>
      <SpeedInsights />
      <Analytics />
      <body
        className={cn(
          `${geistSans.variable} ${geistMono.variable}`,
          "antialiased size-full",
        )}
      >
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
