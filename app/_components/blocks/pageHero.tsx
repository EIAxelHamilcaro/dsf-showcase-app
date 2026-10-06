import { MapPin } from "lucide-react";
import { ContactButton } from "@/app/_components/contactButton";
import { PageSection } from "@/app/_components/pageSection";
import type { HeroBlock } from "@/payload-types";
import { PhoneButton } from "./phoneButton";

const elisionPattern = /['’]$/;

interface PageHeroProps {
  block: HeroBlock;
  phone: string;
}

export function PageHero({ block, phone }: PageHeroProps) {
  const gapAfterBefore = elisionPattern.test(block.titleBefore) ? "" : " ";

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
          <PhoneButton phone={phone} />
        </div>
      </div>
    </PageSection>
  );
}
