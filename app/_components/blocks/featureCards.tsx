import { PageSection } from "@/app/_components/pageSection";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import type { FeatureCardsBlock } from "@/payload-types";
import { resolveIcon } from "./blockIcons";

const gridClasses: Record<FeatureCardsBlock["columns"], string> = {
  "1": "grid gap-4",
  "2": "grid md:grid-cols-2 gap-6",
  "3": "grid md:grid-cols-3 gap-8",
  "4": "grid md:grid-cols-4 gap-6",
};

const wideTwoColumnGrid = "grid md:grid-cols-2 gap-8 max-w-4xl mx-auto";

interface CardClasses {
  content: string;
  icon: string;
  title: string;
  text: string;
}

const smallText = "text-sm text-muted-foreground";

const centeredCard: CardClasses = {
  content: "pt-6 text-center",
  icon: "h-12 w-12 text-primary mx-auto mb-4",
  title: "font-bold mb-2",
  text: smallText,
};

const leftCard: CardClasses = {
  content: "pt-6",
  icon: "h-12 w-12 text-primary mb-4",
  title: "text-xl font-bold mb-3",
  text: "text-muted-foreground",
};

const compactLeftCard: CardClasses = {
  content: "pt-6",
  icon: "h-8 w-8 text-primary mb-3",
  title: "font-bold mb-2",
  text: smallText,
};

function resolveInlineTitleSpacing(block: FeatureCardsBlock): string {
  if (block.columns === "1") {
    return "mb-2";
  }

  return block.intro ? "mb-3" : "mb-4";
}

function resolveCardClasses(block: FeatureCardsBlock): CardClasses {
  if (block.layout === "inline") {
    return {
      content: "pt-6",
      icon: "h-5 w-5 text-primary",
      title: cn(
        "font-bold flex items-center gap-2",
        resolveInlineTitleSpacing(block),
      ),
      text: smallText,
    };
  }

  if (block.layout === "left") {
    return block.intro ? compactLeftCard : leftCard;
  }

  return centeredCard;
}

function resolveGridClass(block: FeatureCardsBlock): string {
  if (block.columns === "2" && !block.intro) {
    return wideTwoColumnGrid;
  }

  return gridClasses[block.columns];
}

interface FeatureCardsProps {
  block: FeatureCardsBlock;
}

export function FeatureCards({ block }: FeatureCardsProps) {
  const CardTitle = block.heading ? "h3" : "h2";
  const classes = resolveCardClasses(block);
  const isInline = block.layout === "inline";

  const grid = (
    <div className={resolveGridClass(block)}>
      {block.cards.map((card) => {
        const Icon = resolveIcon(card.icon);
        const icon = Icon ? <Icon className={classes.icon} /> : null;

        return (
          <Card key={card.id ?? card.title}>
            <CardContent className={classes.content}>
              {isInline ? null : icon}
              <CardTitle className={classes.title}>
                {isInline ? icon : null}
                {card.title}
              </CardTitle>
              <p className={classes.text}>{card.text}</p>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );

  return (
    <PageSection tone={block.background === "muted" ? "muted" : "default"}>
      {block.heading ? (
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
          {block.heading}
        </h2>
      ) : null}
      {block.intro ? (
        <div className="max-w-3xl mx-auto">
          <p
            className={cn(
              "text-lg text-muted-foreground",
              isInline && block.columns === "2" ? "mb-6" : "mb-8",
              block.columns === "1" && "text-center",
            )}
          >
            {block.intro}
          </p>
          {grid}
        </div>
      ) : (
        grid
      )}
    </PageSection>
  );
}
