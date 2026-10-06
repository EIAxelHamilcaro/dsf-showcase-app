import Link from "next/link";
import { PageSection } from "@/app/_components/pageSection";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import type { AidCardsBlock } from "@/payload-types";
import { resolveIcon } from "./blockIcons";

type AidCard = NonNullable<AidCardsBlock["cards"]>[number];

interface AidCardItemProps {
  card: AidCard;
  isDetailed: boolean;
  isFeatured: boolean;
}

function AidCardItem({ card, isDetailed, isFeatured }: AidCardItemProps) {
  const Icon = resolveIcon(card.icon);
  const hasDetails = Boolean(card.details?.length);
  const hasFollowUp = hasDetails || Boolean(card.highlight || card.note);
  const textGap = isDetailed ? "mb-4" : "mb-2";

  return (
    <Card className={isFeatured ? "border-primary" : undefined}>
      <CardContent className="pt-6">
        {Icon ? <Icon className="h-12 w-12 text-primary mb-4" /> : null}
        <h3
          className={isDetailed ? "text-2xl font-bold mb-3" : "font-bold mb-2"}
        >
          {card.title}
        </h3>
        <p
          className={cn(
            "text-sm text-muted-foreground",
            hasFollowUp && textGap,
          )}
        >
          {card.text}
        </p>
        {card.details?.length ? (
          <div className="space-y-2 mb-4">
            {card.details.map((detail) => (
              <p className="text-sm" key={detail.id ?? detail.label}>
                <strong>{detail.label}</strong>
                {` ${detail.text}`}
              </p>
            ))}
          </div>
        ) : null}
        {card.highlight ? (
          <p className="text-xs font-semibold text-primary">{card.highlight}</p>
        ) : null}
        {card.note ? (
          <div
            className={cn(
              "p-3 rounded-lg",
              isDetailed && !isFeatured ? "bg-muted" : "bg-primary/10",
            )}
          >
            <p className={cn("text-xs", isFeatured && "font-semibold")}>
              {card.note}
            </p>
          </div>
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
  const tone = block.background === "muted" ? "muted" : "default";

  const button =
    block.buttonHref && block.buttonLabel ? (
      <Button asChild size="lg">
        <Link href={block.buttonHref}>{block.buttonLabel}</Link>
      </Button>
    ) : null;

  if (isDetailed) {
    return (
      <PageSection tone={tone}>
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
          {block.heading}
        </h2>
        {block.intro ? (
          <p className="text-lg mb-8 text-center text-muted-foreground">
            {block.intro}
          </p>
        ) : null}
        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {cards.map((card, index) => (
            <AidCardItem
              card={card}
              isDetailed
              isFeatured={index === 0}
              key={card.id ?? card.title}
            />
          ))}
        </div>
        {button ? <div className="text-center mt-8">{button}</div> : null}
      </PageSection>
    );
  }

  return (
    <PageSection tone={tone}>
      <div className="max-w-3xl mx-auto text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-6">{block.heading}</h2>
        {block.intro ? (
          <p
            className={cn(
              "text-lg mb-8",
              cards.length ? "text-muted-foreground" : "max-w-2xl mx-auto",
            )}
          >
            {block.intro}
          </p>
        ) : null}
        {cards.length ? (
          <div className="grid md:grid-cols-2 gap-6 text-left mb-8">
            {cards.map((card) => (
              <AidCardItem
                card={card}
                isDetailed={false}
                isFeatured={false}
                key={card.id ?? card.title}
              />
            ))}
          </div>
        ) : null}
        {button}
      </div>
    </PageSection>
  );
}
