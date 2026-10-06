import {
  PageSection,
  SectionSplit,
  sectionLeadClass,
} from "@/app/_components/pageSection";
import { cn } from "@/lib/utils";
import type { FeatureCardsBlock } from "@/payload-types";
import { resolveIcon } from "./blockIcons";

const wideGridClasses: Record<FeatureCardsBlock["columns"], string> = {
  "1": "max-w-reading",
  "2": "sm:grid-cols-2",
  "3": "sm:grid-cols-2 lg:grid-cols-3",
  "4": "sm:grid-cols-2 lg:grid-cols-4",
};

interface FeatureCardsProps {
  block: FeatureCardsBlock;
}

export function FeatureCards({ block }: FeatureCardsProps) {
  const FeatureTitle = block.heading ? "h3" : "h2";
  const isInline = block.layout === "inline";
  const isSingleColumn = block.columns === "1";
  const splitGridClass = isSingleColumn ? undefined : "sm:grid-cols-2";

  const grid = (
    <ul
      className={cn(
        "grid gap-x-8",
        block.spacing === "spacious" ? "gap-y-10" : "gap-y-8",
        block.heading ? splitGridClass : wideGridClasses[block.columns],
      )}
    >
      {block.cards.map((card) => {
        const Icon = resolveIcon(card.icon);

        return (
          <li
            className={cn(
              "border-t-2 border-primary pt-5",
              isInline ? "flex gap-4" : "space-y-3",
            )}
            key={card.id ?? card.title}
          >
            {Icon ? (
              <Icon
                aria-hidden="true"
                className={cn(
                  "shrink-0 text-primary",
                  isInline ? "mt-0.5 h-7 w-7" : "h-9 w-9",
                )}
              />
            ) : null}
            <div className="space-y-2">
              <FeatureTitle className="text-xl font-bold">
                {card.title}
              </FeatureTitle>
              <p className="text-muted-foreground">{card.text}</p>
            </div>
          </li>
        );
      })}
    </ul>
  );

  return (
    <PageSection tone={block.background === "muted" ? "muted" : "default"}>
      {block.heading ? (
        <SectionSplit heading={block.heading} intro={block.intro}>
          {grid}
        </SectionSplit>
      ) : (
        <div className="space-y-8">
          {block.intro ? (
            <p className={cn(sectionLeadClass, "max-w-reading")}>
              {block.intro}
            </p>
          ) : null}
          {grid}
        </div>
      )}
    </PageSection>
  );
}
