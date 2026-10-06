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
import { getAllPages } from "@/lib/pages/getPage";
import { getLegalLinks } from "@/lib/pages/pageLinks";
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
  const legalLinks = getLegalLinks(await getAllPages());

  return (
    <html className="scroll-smooth" lang="fr" suppressHydrationWarning>
      <head>
        <meta
          content="Douche Senior France"
          name="apple-mobile-web-app-title"
        />
        <meta content="yes" name="mobile-web-app-capable" />
        <meta content="yes" name="apple-mobile-web-app-capable" />
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
        <Footer config={config} legalLinks={legalLinks} />
        <ContactModal phone={config.phone} />
      </body>
    </html>
  );
}
