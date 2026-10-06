import type { Metadata } from "next";
import Link from "next/link";
import { PhoneButton } from "@/app/_components/blocks/phoneButton";
import { PageSection, pageTitleClass } from "@/app/_components/pageSection";
import { Button } from "@/components/ui/button";
import { getSiteConfig } from "@/lib/pages/getSiteConfig";

export const metadata: Metadata = {
  title: "Page introuvable",
  robots: null,
};

export default async function NotFound() {
  const config = await getSiteConfig();

  return (
    <PageSection tone="hero">
      <div className="max-w-4xl space-y-6">
        <h1 className={pageTitleClass}>Page introuvable</h1>
        <p className="max-w-reading text-xl md:text-2xl text-muted-foreground">
          Cette page n'existe pas ou a été déplacée.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
          <Button asChild size="xl">
            <Link href="/">Retour à l'accueil</Link>
          </Button>
          <PhoneButton phone={config.phone ?? ""} />
        </div>
      </div>
    </PageSection>
  );
}
