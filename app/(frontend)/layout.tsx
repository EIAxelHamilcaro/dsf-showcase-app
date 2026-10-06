/** biome-ignore-all lint/security/noDangerouslySetInnerHtml: SEO */
import type { Metadata, Viewport } from "next";
import { Nunito } from "next/font/google";
import "../globals.css";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { getPayload } from "payload";
import type { ReactNode } from "react";
import { ContactModal } from "@/app/_components/contactModal";
import { Footer } from "@/app/_components/footer";
import NavBar from "@/app/_components/navBar";
import { homeSeo, siteName, siteUrl } from "@/lib/site";
import { cn } from "@/lib/utils";
import payloadConfig from "@/payload.config";

const nunito = Nunito({
  variable: "--font-nunito",
  subsets: ["latin"],
  weight: ["400", "600", "700", "800"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: { default: homeSeo.title, template: "%s" },
  description: homeSeo.description,
  applicationName: siteName,
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
};

export const viewport: Viewport = {
  themeColor: "#2563eb",
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
    {
      "@type": "AdministrativeArea",
      name: "Centre-Val de Loire",
      identifier: "R24",
    },
    {
      "@type": "AdministrativeArea",
      name: "Loir-et-Cher",
      identifier: "41",
      containedInPlace: {
        "@type": "AdministrativeArea",
        name: "Centre-Val de Loire",
      },
    },
    {
      "@type": "AdministrativeArea",
      name: "Indre-et-Loire",
      identifier: "37",
      containedInPlace: {
        "@type": "AdministrativeArea",
        name: "Centre-Val de Loire",
      },
    },
    {
      "@type": "AdministrativeArea",
      name: "Loiret",
      identifier: "45",
      containedInPlace: {
        "@type": "AdministrativeArea",
        name: "Centre-Val de Loire",
      },
    },
    {
      "@type": "AdministrativeArea",
      name: "Indre",
      identifier: "36",
      containedInPlace: {
        "@type": "AdministrativeArea",
        name: "Centre-Val de Loire",
      },
    },
    {
      "@type": "AdministrativeArea",
      name: "Cher",
      identifier: "18",
      containedInPlace: {
        "@type": "AdministrativeArea",
        name: "Centre-Val de Loire",
      },
    },
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
  areaServed: [
    {
      "@type": "AdministrativeArea",
      name: "Centre-Val de Loire",
      identifier: "R24",
    },
    {
      "@type": "GeoCircle",
      geoMidpoint: {
        "@type": "GeoCoordinates",
        latitude: 47.28256927999651,
        longitude: 1.5726510253114867,
      },
      geoRadius: "100000",
    },
  ],
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
        text: "Plusieurs aides sont disponibles : MaPrimeAdapt et crédit d'impôt. Nous vous accompagnons dans toutes les démarches.",
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
  const payload = await getPayload({ config: payloadConfig });
  const config = await payload.findByID({
    collection: "config",
    id: 1,
    depth: 1,
  });

  return (
    <html className="scroll-smooth" lang="fr" suppressHydrationWarning>
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
      <body className={cn(nunito.variable, "antialiased size-full font-sans")}>
        <SpeedInsights />
        <Analytics />
        <a
          className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-primary focus:text-primary-foreground focus:rounded-md focus:font-semibold"
          href="#main-content"
        >
          Aller au contenu principal
        </a>
        <NavBar config={config} />
        <main id="main-content">{children}</main>
        <Footer config={config} />
        <ContactModal />
      </body>
    </html>
  );
}
