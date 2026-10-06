import { CircleCheck } from "lucide-react";
import Link from "next/link";
import {
  PageSection,
  SectionHeader,
  toneOf,
} from "@/app/_components/pageSection";
import { cn } from "@/lib/utils";
import type { ServiceCardsBlock } from "@/payload-types";

export interface ServiceCardsProps {
  block: ServiceCardsBlock;
}

export function ServiceCards({ block }: ServiceCardsProps) {
  return (
    <PageSection tone={toneOf(block.background)}>
      <SectionHeader heading={block.heading} />
      <ul
        className={cn(
          "tile-wall sm:grid-cols-2",
          block.columns === "3" && "lg:grid-cols-3",
        )}
      >
        {block.cards.map((card, cardIndex) => (
          <li
            className="tile grid content-start gap-stack"
            key={card.id ?? cardIndex.toString()}
          >
            <h3>
              {card.linkHref ? (
                <Link className="tile-title" href={card.linkHref}>
                  {card.title}
                </Link>
              ) : (
                card.title
              )}
            </h3>
            {card.description ? (
              <p className="soft">{card.description}</p>
            ) : null}
            {card.bullets?.length ? (
              <ul className="grid gap-inline">
                {card.bullets.map((bullet, bulletIndex) => (
                  <li
                    className="flex items-start gap-inline"
                    key={bullet.id ?? bulletIndex.toString()}
                  >
                    <CircleCheck
                      aria-hidden="true"
                      className="icon-mark"
                      data-size="sm"
                    />
                    {bullet.text}
                  </li>
                ))}
              </ul>
            ) : null}
            {card.linkHref && card.linkLabel ? (
              <Link className="link" href={card.linkHref}>
                {card.linkLabel}
                <span className="sr-only"> : {card.title}</span>
              </Link>
            ) : null}
          </li>
        ))}
      </ul>
    </PageSection>
  );
}
