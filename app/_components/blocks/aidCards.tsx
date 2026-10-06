import Link from "next/link";
import { PageSection } from "@/app/_components/pageSection";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import type { AidCardsBlock } from "@/payload-types";
import { resolveIcon } from "./blockIcons";

interface AidCardsProps {
  block: AidCardsBlock;
}

export function AidCards({ block }: AidCardsProps) {
  const cards = block.cards ?? [];

  return (
    <PageSection tone={block.background === "muted" ? "muted" : "default"}>
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-6">{block.heading}</h2>
        {block.intro ? (
          <p className="text-lg mb-8 text-muted-foreground">{block.intro}</p>
        ) : null}
        {cards.length ? (
          <div className="grid md:grid-cols-2 gap-6 text-left mb-8">
            {cards.map((card) => {
              const Icon = resolveIcon(card.icon);

              return (
                <Card key={card.id ?? card.title}>
                  <CardContent className="pt-6">
                    {Icon ? (
                      <Icon className="h-12 w-12 text-primary mb-4" />
                    ) : null}
                    <h3 className="font-bold mb-2">{card.title}</h3>
                    <p className="text-sm text-muted-foreground mb-2">
                      {card.text}
                    </p>
                    {card.details?.length ? (
                      <div className="space-y-2 mb-4">
                        {card.details.map((detail) => (
                          <p
                            className="text-sm"
                            key={detail.id ?? detail.label}
                          >
                            <strong>{detail.label}</strong> {detail.text}
                          </p>
                        ))}
                      </div>
                    ) : null}
                    {card.highlight ? (
                      <p className="text-xs font-semibold text-primary">
                        {card.highlight}
                      </p>
                    ) : null}
                    {card.note ? (
                      <div className="bg-primary/10 p-3 rounded-lg">
                        <p className="text-xs">{card.note}</p>
                      </div>
                    ) : null}
                  </CardContent>
                </Card>
              );
            })}
          </div>
        ) : null}
        {block.buttonHref && block.buttonLabel ? (
          <Button asChild size="lg">
            <Link href={block.buttonHref}>{block.buttonLabel}</Link>
          </Button>
        ) : null}
      </div>
    </PageSection>
  );
}
