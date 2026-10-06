import { CheckCircle2 } from "lucide-react";
import Link from "next/link";
import { PageSection, SectionStack } from "@/app/_components/pageSection";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import type { ServiceCardsBlock } from "@/payload-types";

interface ServiceCardsProps {
  block: ServiceCardsBlock;
}

export function ServiceCards({ block }: ServiceCardsProps) {
  return (
    <PageSection tone={block.background === "muted" ? "muted" : "default"}>
      <SectionStack heading={block.heading}>
        <div
          className={cn(
            "grid gap-6 sm:grid-cols-2",
            block.columns === "3" && "lg:grid-cols-3",
          )}
        >
          {block.cards.map((card, cardIndex) => (
            <Card
              className="bg-background shadow-none"
              key={card.id ?? cardIndex.toString()}
            >
              <CardContent className="flex h-full flex-col gap-4">
                <h3 className="text-xl font-bold">{card.title}</h3>
                {card.description ? (
                  <p className="text-muted-foreground">{card.description}</p>
                ) : null}
                {card.bullets?.length ? (
                  <ul className="space-y-3">
                    {card.bullets.map((bullet, bulletIndex) => (
                      <li
                        className="flex items-start gap-3"
                        key={bullet.id ?? bulletIndex.toString()}
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
      </SectionStack>
    </PageSection>
  );
}
