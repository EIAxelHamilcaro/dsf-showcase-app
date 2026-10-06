import type { Metadata, Viewport } from "next";
import { Lexend } from "next/font/google";
import "../globals.css";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import type { ReactNode } from "react";
import { ContactModal } from "@/app/_components/contactModal";
import { Footer } from "@/app/_components/footer";
import NavBar from "@/app/_components/navBar";
import { getAllPages } from "@/lib/pages/getPage";
import { getSiteConfig } from "@/lib/pages/getSiteConfig";
import {
  getCityLinks,
  getDepartmentLinks,
  getLegalLinks,
  getServiceLinks,
} from "@/lib/pages/pageLinks";
import { homeSeo, siteName, siteUrl } from "@/lib/site";

const lexend = Lexend({
  variable: "--font-lexend",
  subsets: ["latin"],
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

export default async function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  const [config, pages] = await Promise.all([getSiteConfig(), getAllPages()]);

  return (
    <html data-scroll-behavior="smooth" lang="fr" suppressHydrationWarning>
      <head>
        <meta
          content="Douche Senior France"
          name="apple-mobile-web-app-title"
        />
        <meta content="yes" name="mobile-web-app-capable" />
        <meta content="yes" name="apple-mobile-web-app-capable" />
      </head>
      <body className={lexend.variable}>
        <SpeedInsights />
        <Analytics />
        <a className="skip-link" href="#main-content">
          Aller au contenu principal
        </a>
        <NavBar config={config} />
        <main id="main-content" tabIndex={-1}>
          {children}
        </main>
        <Footer
          cityLinks={getCityLinks(pages)}
          config={config}
          departmentLinks={getDepartmentLinks(pages)}
          legalLinks={getLegalLinks(pages)}
          serviceLinks={getServiceLinks(pages)}
        />
        <ContactModal phone={config.phone} />
      </body>
    </html>
  );
}
