/** biome-ignore-all lint/security/noDangerouslySetInnerHtml: SEO */
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "../globals.css";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
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
      "Douche Senior Sécurisée | Installation en 24h | Différentes aides disponibles",
    template: "%s | Douche Senior France",
  },
  description:
    "Artisan certifié Handibat & Silverbat: installation douche senior sécurisée en 1 journée. Remplacement baignoire, douche PMR, salle de bain adaptée personnes âgées. Différentes aides disponibles (MaPrimeAdapt). Devis gratuit ☎ 02 54 97 53 23",
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
    title: "Douche Senior Sécurisée | Artisan Certifié | Installation 24h",
    description:
      "Installation douche senior et PMR en 1 journée. Artisan certifié Handibat Silverbat. Remplacement baignoire, douche sécurisée personnes âgées. Différentes aides disponibles (MaPrimeAdapt). Devis gratuit.",
    images: [
      {
        url: "/hero.png",
        width: 1536,
        height: 1024,
        alt: "Transformation baignoire en douche sécurisée pour senior - Avant/Après",
      },
    ],
    siteName: "Douche Senior France",
  },
  twitter: {
    card: "summary_large_image",
    title:
      "Douche Senior Sécurisée | Installation 24h | Différentes aides disponibles",
    description:
      "Douche sécurisée pour seniors et PMR installée en 1 journée. Artisan certifié Handibat Silverbat. Devis gratuit ☎ 02 54 97 53 23",
    images: ["/hero.png"],
  },
  alternates: {
    canonical: "https://www.douche-senior-france.com",
  },
  other: {
    "theme-color": "#2563eb",
    "msapplication-TileColor": "#2563eb",
    "format-detection": "telephone=yes",
    keywords:
      "douche senior, douche sécurisée, installateur douche senior, artisan douche senior, douche seniors, douche sécurisée senior, douche PMR, douche personnes âgées, douche italienne senior, installation douche sécurisée, salle de bain senior, remplacement baignoire douche, douche adaptée senior, douche sans marche, aide MaPrimeAdapt, artisan Handibat Silverbat, Centre-Val de Loire",
  },
};

const orgJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Douche Senior France",
  url: "https://www.douche-senior-france.com/",
  logo: "https://www.douche-senior-france.com/logo.png",
  description:
    "Artisan spécialisé dans le remplacement de baignoire par douche sécurisée pour seniors et PMR",
  sameAs: ["https://www.facebook.com/douche.senior.france/"],
  contactPoint: {
    "@type": "ContactPoint",
    telephone: "+33254975323",
    contactType: "customer service",
    areaServed: "FR",
    availableLanguage: "French",
  },
};

const serviceJsonLd = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "Remplacement baignoire par douche sécurisée",
  serviceType: "Installation de douches sécurisées pour seniors et PMR",
  description:
    "Transformation de votre baignoire en douche plain-pied sécurisée en seulement 1 journée. Fabrication 100% française, normes PMR.",
  provider: {
    "@type": "LocalBusiness",
    name: "Douche Senior France",
    url: "https://www.douche-senior-france.com",
    telephone: "02 54 97 53 23",
  },
  areaServed: [
    { "@type": "AdministrativeArea", name: "Loir-et-Cher" },
    { "@type": "AdministrativeArea", name: "Indre" },
    { "@type": "AdministrativeArea", name: "Cher" },
    { "@type": "AdministrativeArea", name: "Indre-et-Loire" },
    { "@type": "AdministrativeArea", name: "Loiret" },
  ],
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Services douche senior",
    itemListElement: [
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Remplacement baignoire par douche",
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Installation douche PMR",
        },
      },
    ],
  },
};

const localBusinessJsonLd = {
  "@context": "https://schema.org",
  "@type": "HomeAndConstructionBusiness",
  name: "Douche Senior France",
  image: "https://www.douche-senior-france.com/logo.png",
  "@id": "https://www.douche-senior-france.com",
  url: "https://www.douche-senior-france.com",
  telephone: "02 54 97 53 23",
  priceRange: "€€",
  address: {
    "@type": "PostalAddress",
    streetAddress: "147 rue de Romorantin",
    addressLocality: "Selles-sur-Cher",
    postalCode: "41130",
    addressRegion: "Centre-Val de Loire",
    addressCountry: "FR",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: 47.28256927999651,
    longitude: 1.5726510253114867,
  },
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      opens: "08:00",
      closes: "18:00",
    },
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: "Saturday",
      opens: "09:00",
      closes: "12:00",
    },
  ],
  areaServed: {
    "@type": "GeoCircle",
    geoMidpoint: {
      "@type": "GeoCoordinates",
      latitude: 47.28256927999651,
      longitude: 1.5726510253114867,
    },
    geoRadius: "100000",
  },
  aggregateRating: {
    "@type": "AggregateRating",
    ratingValue: "4.9",
    reviewCount: "47",
    bestRating: "5",
  },
};

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "Combien coûte le remplacement d'une baignoire par une douche ?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Le coût varie selon la configuration de votre salle de bain. Nous proposons des devis gratuits personnalisés. Des aides financières peuvent couvrir le montant (MaPrimeAdapt, crédit d'impôt).",
      },
    },
    {
      "@type": "Question",
      name: "Combien de temps dure l'installation ?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "L'installation complète est réalisée en 1 seule journée. Vous pouvez utiliser votre nouvelle douche dès le soir même.",
      },
    },
    {
      "@type": "Question",
      name: "Quelles sont les aides disponibles pour une douche senior ?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Plusieurs aides sont disponibles : MaPrimeAdapt, crédit d'impôt, aides des caisses de retraite, et aides locales. Nous vous accompagnons dans toutes les démarches.",
      },
    },
    {
      "@type": "Question",
      name: "Êtes-vous certifiés pour les travaux d'adaptation PMR ?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Oui, nous sommes certifiés Handibat et Silverbat, les labels de référence pour l'adaptation du logement aux personnes à mobilité réduite et aux seniors.",
      },
    },
  ],
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  const locale = await getLocale();

  return (
    <html className="scroll-smooth" lang={locale} suppressHydrationWarning>
      <head>
        <meta
          content="Douche Senior France"
          name="apple-mobile-web-app-title"
        />
        <meta content="yes" name="mobile-web-app-capable" />
        <meta content="yes" name="apple-mobile-web-app-capable" />
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
        <script
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(faqJsonLd),
          }}
          type="application/ld+json"
        />
      </head>
      <body
        className={cn(
          `${geistSans.variable} ${geistMono.variable}`,
          "antialiased size-full",
        )}
      >
        <SpeedInsights />
        <Analytics />
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
