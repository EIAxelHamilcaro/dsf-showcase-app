import type { Metadata } from "next";
import Link from "next/link";
import { PhoneButton } from "@/app/_components/blocks/phoneButton";
import { PageSection } from "@/app/_components/pageSection";
import { Button } from "@/components/ui/button";
import { getSiteConfig } from "@/lib/pages/getSiteConfig";

export const metadata: Metadata = {
  title: "Page introuvable",
  robots: null,
};

export default async function NotFound() {
  const config = await getSiteConfig();

  return (
    <PageSection tone="tint">
      <h1>Page introuvable</h1>
      <p className="lead soft">
        Cette page n'existe pas ou a été déplacée. Revenez à l'accueil ou
        appelez-nous, nous vous renseignons.
      </p>
      <div className="flex flex-wrap gap-inline">
        <Button asChild size="lg">
          <Link href="/">Revenir à l'accueil</Link>
        </Button>
        <PhoneButton phone={config.phone ?? ""} />
      </div>
    </PageSection>
  );
}
