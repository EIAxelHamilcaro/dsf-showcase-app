import { PageSection } from "@/app/_components/pageSection";
import { Card, CardContent } from "@/components/ui/card";
import type { FeatureCardsBlock } from "@/payload-types";
import { resolveIcon } from "./blockIcons";

const columnClasses: Record<FeatureCardsBlock["columns"], string> = {
  "1": "grid gap-4",
  "2": "grid md:grid-cols-2 gap-6",
  "3": "grid md:grid-cols-3 gap-8",
  "4": "grid md:grid-cols-2 lg:grid-cols-4 gap-8",
};

interface FeatureCardsProps {
  block: FeatureCardsBlock;
}

export function FeatureCards({ block }: FeatureCardsProps) {
  const CardTitle = block.heading ? "h3" : "h2";
  const hasIntro = Boolean(block.intro);

  return (
    <PageSection tone={block.background === "muted" ? "muted" : "default"}>
      <div className={hasIntro ? "max-w-3xl mx-auto" : undefined}>
        {block.heading ? (
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
            {block.heading}
          </h2>
        ) : null}
        {block.intro ? (
          <p className="text-lg mb-8 text-muted-foreground">{block.intro}</p>
        ) : null}
        <div className={columnClasses[block.columns]}>
          {block.cards.map((card) => {
            const Icon = resolveIcon(card.icon);

            if (block.layout === "inline") {
              return (
                <Card key={card.id ?? card.title}>
                  <CardContent className="pt-6">
                    <CardTitle className="font-bold mb-4 flex items-center gap-2">
                      {Icon ? <Icon className="h-5 w-5 text-primary" /> : null}
                      {card.title}
                    </CardTitle>
                    <p className="text-sm text-muted-foreground">{card.text}</p>
                  </CardContent>
                </Card>
              );
            }

            if (block.layout === "left") {
              return (
                <Card key={card.id ?? card.title}>
                  <CardContent className="pt-6">
                    {Icon ? (
                      <Icon className="h-12 w-12 text-primary mb-4" />
                    ) : null}
                    <CardTitle className="text-xl font-bold mb-3">
                      {card.title}
                    </CardTitle>
                    <p className="text-muted-foreground">{card.text}</p>
                  </CardContent>
                </Card>
              );
            }

            return (
              <Card key={card.id ?? card.title}>
                <CardContent className="pt-6 text-center">
                  {Icon ? (
                    <Icon className="h-12 w-12 text-primary mx-auto mb-4" />
                  ) : null}
                  <CardTitle className="font-bold mb-3">{card.title}</CardTitle>
                  <p className="text-sm text-muted-foreground">{card.text}</p>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </PageSection>
  );
}
