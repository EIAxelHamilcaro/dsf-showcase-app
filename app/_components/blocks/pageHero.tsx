import { MapPin } from "lucide-react";
import { ContactButton } from "@/app/_components/contactButton";
import { PageSection, pageTitleClass } from "@/app/_components/pageSection";
import { followsElision } from "@/lib/pages/pageHeading";
import type { HeroBlock } from "@/payload-types";
import { PhoneButton } from "./phoneButton";

interface PageHeroProps {
  block: HeroBlock;
  phone: string;
}

export function PageHero({ block, phone }: PageHeroProps) {
  const gapAfterBefore = followsElision(block.titleBefore) ? "" : " ";

  return (
    <PageSection className="relative overflow-hidden" tone="hero">
      <div
        aria-hidden="true"
        className="tile-motif absolute inset-y-0 right-0 hidden w-2/5 lg:block"
      />
      <div className="relative max-w-4xl space-y-6 lg:w-3/5">
        {block.location ? (
          <p className="flex items-start gap-2 text-lg font-bold text-primary">
            <MapPin aria-hidden="true" className="mt-1 h-5 w-5 shrink-0" />
            <span>{block.location}</span>
          </p>
        ) : null}
        <h1 className={pageTitleClass}>
          {block.titleBefore}
          {gapAfterBefore}
          <span className="text-primary">{block.titleHighlight}</span>
          {block.titleAfter ? ` ${block.titleAfter}` : null}
        </h1>
        <p className="max-w-reading text-xl md:text-2xl text-muted-foreground">
          {block.intro}
        </p>
        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
          <ContactButton size="xl">{block.ctaLabel}</ContactButton>
          <PhoneButton phone={phone} />
        </div>
      </div>
    </PageSection>
  );
}
