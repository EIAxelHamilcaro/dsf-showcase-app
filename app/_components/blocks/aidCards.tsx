import Link from "next/link";
import {
  PageSection,
  SectionHeader,
  toneOf,
} from "@/app/_components/pageSection";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import type { AidCardsBlock } from "@/payload-types";
import { resolveIcon } from "./blockIcons";

type AidCard = NonNullable<AidCardsBlock["cards"]>[number];

interface AidCardItemProps {
  card: AidCard;
  isFeatured: boolean;
}

function AidCardItem({ card, isFeatured }: AidCardItemProps) {
  const Icon = resolveIcon(card.icon);

  return (
    <li
      className="tile grid content-start gap-stack"
      data-emphasis={isFeatured ? "outlined" : undefined}
    >
      {Icon ? <Icon aria-hidden="true" className="icon-mark" /> : null}
      <h3>{card.title}</h3>
      <p className="soft">{card.text}</p>
      {card.details?.length ? (
        <dl className="rule-top grid gap-inline">
          {card.details.map((detail, index) => (
            <div key={detail.id ?? index.toString()}>
              <dt className="inline">
                <strong>{detail.label}</strong>
              </dt>{" "}
              <dd className="inline">{detail.text}</dd>
            </div>
          ))}
        </dl>
      ) : null}
      {card.highlight ? (
        <p>
          <mark>
            <strong>{card.highlight}</strong>
          </mark>
        </p>
      ) : null}
      {card.note ? <p className="tile-note">{card.note}</p> : null}
    </li>
  );
}

export interface AidCardsProps {
  block: AidCardsBlock;
}

export function AidCards({ block }: AidCardsProps) {
  const cards = block.cards ?? [];
  const isDetailed = block.variant === "detailed";

  return (
    <PageSection tone={toneOf(block.background)}>
      <SectionHeader heading={block.heading} intro={block.intro} />
      {cards.length ? (
        <ul
          className={cn(
            "tile-wall",
            isDetailed ? "lg:grid-cols-2" : "sm:grid-cols-2",
          )}
        >
          {cards.map((card, index) => (
            <AidCardItem
              card={card}
              isFeatured={isDetailed && index === 0}
              key={card.id ?? index.toString()}
            />
          ))}
        </ul>
      ) : null}
      {block.buttonHref && block.buttonLabel ? (
        <Button asChild className="justify-self-start" size="lg">
          <Link href={block.buttonHref}>{block.buttonLabel}</Link>
        </Button>
      ) : null}
    </PageSection>
  );
}
