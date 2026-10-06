import {
  PageSection,
  SectionHeader,
  toneOf,
} from "@/app/_components/pageSection";
import { cn } from "@/lib/utils";
import type { FeatureCardsBlock } from "@/payload-types";
import { resolveIcon } from "./blockIcons";

const gridClasses: Record<FeatureCardsBlock["columns"], string> = {
  "1": "max-w-reading",
  "2": "sm:grid-cols-2",
  "3": "sm:grid-cols-2 lg:grid-cols-3",
  "4": "sm:grid-cols-2 lg:grid-cols-4",
};

export interface FeatureCardsProps {
  block: FeatureCardsBlock;
}

export function FeatureCards({ block }: FeatureCardsProps) {
  const FeatureTitle = block.heading ? "h3" : "h2";
  const isInline = block.layout === "inline";

  return (
    <PageSection tone={toneOf(block.background)}>
      {block.heading ? (
        <SectionHeader heading={block.heading} intro={block.intro} />
      ) : null}
      {!block.heading && block.intro ? (
        <p className="lead soft">{block.intro}</p>
      ) : null}
      <ul className={cn("tile-wall", gridClasses[block.columns])}>
        {block.cards.map((card, index) => {
          const Icon = resolveIcon(card.icon);

          return (
            <li
              className={cn(
                "tile gap-inline",
                isInline ? "flex items-start" : "grid content-start",
              )}
              key={card.id ?? index.toString()}
            >
              {Icon ? <Icon aria-hidden="true" className="icon-mark" /> : null}
              <div className="grid gap-inline">
                <FeatureTitle>{card.title}</FeatureTitle>
                <p className="soft">{card.text}</p>
              </div>
            </li>
          );
        })}
      </ul>
    </PageSection>
  );
}
