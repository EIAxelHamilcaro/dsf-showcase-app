import type { Metadata } from "next";
import Link from "next/link";
import {
  PhoneButton,
  primaryActionClass,
} from "@/app/_components/blocks/phoneButton";
import { PageSection } from "@/app/_components/pageSection";
import { Button } from "@/components/ui/button";
import { getSiteConfig } from "@/lib/pages/getSiteConfig";

export const metadata: Metadata = {
  title: "Page introuvable",
  robots: { index: false, follow: false },
};

export default async function NotFound() {
  const config = await getSiteConfig();

  return (
    <PageSection tone="hero">
      <div className="max-w-4xl space-y-6">
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight">
          Page introuvable
        </h1>
        <p className="max-w-reading text-xl md:text-2xl text-muted-foreground">
          Cette page n'existe pas ou a été déplacée.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
          <Button asChild className={primaryActionClass} size="lg">
            <Link href="/">Retour à l'accueil</Link>
          </Button>
          <PhoneButton phone={config.phone ?? ""} />
        </div>
      </div>
    </PageSection>
  );
}
