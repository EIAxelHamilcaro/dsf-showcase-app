import { MapPin, Phone } from "lucide-react";
import { ContactButton } from "@/app/_components/contactButton";
import { PageSection } from "@/app/_components/pageSection";
import { Button } from "@/components/ui/button";
import { toTelHref } from "@/lib/seo/phone";
import type { HeroBlock } from "@/payload-types";

interface PageHeroProps {
  block: HeroBlock;
  phone: string;
}

export function PageHero({ block, phone }: PageHeroProps) {
  const gapAfterBefore = block.titleBefore.endsWith("'") ? "" : " ";

  return (
    <PageSection tone="hero">
      <div className="max-w-4xl mx-auto text-center space-y-6">
        {block.location ? (
          <div className="flex items-center justify-center gap-2 text-primary font-semibold">
            <MapPin className="h-5 w-5" />
            <span>{block.location}</span>
          </div>
        ) : null}
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-balance">
          {block.titleBefore}
          {gapAfterBefore}
          <span className="text-primary">{block.titleHighlight}</span>
          {block.titleAfter ? ` ${block.titleAfter}` : null}
        </h1>
        <p className="text-xl md:text-2xl text-muted-foreground">
          {block.intro}
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <ContactButton size="lg">{block.ctaLabel}</ContactButton>
          <Button asChild size="lg" variant="outline">
            <a href={toTelHref(phone)}>
              <Phone className="mr-2 h-5 w-5" />
              {phone}
            </a>
          </Button>
        </div>
      </div>
    </PageSection>
  );
}
