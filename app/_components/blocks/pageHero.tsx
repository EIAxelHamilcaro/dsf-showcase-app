import { MapPin } from "lucide-react";
import { ContactButton } from "@/app/_components/contactButton";
import { PageSection } from "@/app/_components/pageSection";
import { followsElision } from "@/lib/pages/pageHeading";
import type { HeroBlock } from "@/payload-types";
import { PhoneButton } from "./phoneButton";

export interface PageHeroProps {
  block: HeroBlock;
  phone: string;
}

export function PageHero({ block, phone }: PageHeroProps) {
  const gapAfterBefore = followsElision(block.titleBefore) ? "" : " ";

  return (
    <PageSection className="hero" tone="tint">
      <div aria-hidden="true" className="tile-motif" />
      <div className="relative grid gap-stack lg:w-3/5">
        {block.location ? (
          <p className="flex items-center gap-inline">
            <MapPin aria-hidden="true" className="icon-mark" data-size="sm" />
            <strong>{block.location}</strong>
          </p>
        ) : null}
        <h1>
          {block.titleBefore}
          {gapAfterBefore}
          <mark>{block.titleHighlight}</mark>
          {block.titleAfter ? ` ${block.titleAfter}` : null}
        </h1>
        <p className="lead soft">{block.intro}</p>
        <div className="flex flex-wrap gap-inline">
          <ContactButton size="lg">{block.ctaLabel}</ContactButton>
          <PhoneButton phone={phone} />
        </div>
      </div>
    </PageSection>
  );
}
