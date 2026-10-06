import Link from "next/link";
import {
  PageSection,
  SectionSplit,
  sectionLeadClass,
  sectionTitleClass,
} from "@/app/_components/pageSection";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import type { AidCardsBlock } from "@/payload-types";
import { resolveIcon } from "./blockIcons";
import { primaryActionClass } from "./phoneButton";

type AidCard = NonNullable<AidCardsBlock["cards"]>[number];

interface AidCardItemProps {
  card: AidCard;
  isFeatured: boolean;
}

function AidCardItem({ card, isFeatured }: AidCardItemProps) {
  const Icon = resolveIcon(card.icon);

  return (
    <Card
      className={cn(
        "bg-background shadow-none",
        isFeatured && "border-2 border-primary",
      )}
    >
      <CardContent className="space-y-4">
        {Icon ? (
          <Icon aria-hidden="true" className="h-10 w-10 text-primary" />
        ) : null}
        <h3 className="text-xl md:text-2xl font-bold">{card.title}</h3>
        <p className="text-muted-foreground">{card.text}</p>
        {card.details?.length ? (
          <div className="space-y-2 border-t pt-4">
            {card.details.map((detail) => (
              <p key={detail.id ?? detail.label}>
                <strong>{detail.label}</strong>
                {` ${detail.text}`}
              </p>
            ))}
          </div>
        ) : null}
        {card.highlight ? (
          <p className="font-bold text-primary">{card.highlight}</p>
        ) : null}
        {card.note ? (
          <p
            className={cn(
              "rounded-lg bg-surface-tint p-4",
              isFeatured && "font-semibold",
            )}
          >
            {card.note}
          </p>
        ) : null}
      </CardContent>
    </Card>
  );
}

interface AidCardsProps {
  block: AidCardsBlock;
}

export function AidCards({ block }: AidCardsProps) {
  const cards = block.cards ?? [];
  const isDetailed = block.variant === "detailed";

  const button =
    block.buttonHref && block.buttonLabel ? (
      <Button asChild className={primaryActionClass} size="lg">
        <Link href={block.buttonHref}>{block.buttonLabel}</Link>
      </Button>
    ) : null;

  const grid = cards.length ? (
    <div
      className={cn(
        "grid gap-6",
        isDetailed ? "lg:grid-cols-2" : "sm:grid-cols-2",
      )}
    >
      {cards.map((card, index) => (
        <AidCardItem
          card={card}
          isFeatured={isDetailed && index === 0}
          key={card.id ?? card.title}
        />
      ))}
    </div>
  ) : null;

  return (
    <PageSection tone={block.background === "muted" ? "muted" : "default"}>
      {isDetailed ? (
        <div className="space-y-8">
          <h2 className={sectionTitleClass}>{block.heading}</h2>
          {block.intro ? (
            <p className={cn(sectionLeadClass, "max-w-reading")}>
              {block.intro}
            </p>
          ) : null}
          {grid}
          {button}
        </div>
      ) : (
        <SectionSplit heading={block.heading} intro={block.intro}>
          <div className="space-y-8">
            {grid}
            {button}
          </div>
        </SectionSplit>
      )}
    </PageSection>
  );
}
