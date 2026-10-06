import { CheckCircle2 } from "lucide-react";
import Link from "next/link";
import { PageSection, SectionSplit } from "@/app/_components/pageSection";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import type { ServiceCardsBlock } from "@/payload-types";

interface ServiceCardsProps {
  block: ServiceCardsBlock;
}

export function ServiceCards({ block }: ServiceCardsProps) {
  return (
    <PageSection tone={block.background === "muted" ? "muted" : "default"}>
      <SectionSplit heading={block.heading}>
        <div className="grid gap-6 sm:grid-cols-2">
          {block.cards.map((card) => (
            <Card
              className="bg-background shadow-none"
              key={card.id ?? card.title}
            >
              <CardContent className="flex h-full flex-col gap-4">
                <h3 className="text-xl font-bold">{card.title}</h3>
                {card.description ? (
                  <p className="text-muted-foreground">{card.description}</p>
                ) : null}
                {card.bullets?.length ? (
                  <ul className="space-y-3">
                    {card.bullets.map((bullet) => (
                      <li
                        className="flex items-start gap-3"
                        key={bullet.id ?? bullet.text}
                      >
                        <CheckCircle2
                          aria-hidden="true"
                          className="mt-1 h-5 w-5 shrink-0 text-primary"
                        />
                        <span>{bullet.text}</span>
                      </li>
                    ))}
                  </ul>
                ) : null}
                {card.linkHref && card.linkLabel ? (
                  <Button
                    asChild
                    className="mt-auto self-start px-0 font-bold text-primary underline"
                    variant="link"
                  >
                    <Link href={card.linkHref}>{card.linkLabel}</Link>
                  </Button>
                ) : null}
              </CardContent>
            </Card>
          ))}
        </div>
      </SectionSplit>
    </PageSection>
  );
}
