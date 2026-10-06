import { CheckCircle2 } from "lucide-react";
import Link from "next/link";
import { PageSection } from "@/app/_components/pageSection";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import type { ServiceCardsBlock } from "@/payload-types";

interface ColumnClasses {
  grid: string;
  title: string;
  description: string;
  descriptionGap: string;
}

const columnClasses: Record<ServiceCardsBlock["columns"], ColumnClasses> = {
  "2": {
    grid: "grid md:grid-cols-2 gap-8 max-w-4xl mx-auto",
    title: "text-xl font-bold mb-3",
    description: "text-muted-foreground",
    descriptionGap: "mb-4",
  },
  "3": {
    grid: "grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-5xl mx-auto",
    title: "font-bold mb-3",
    description: "text-sm text-muted-foreground",
    descriptionGap: "mb-3",
  },
};

interface ServiceCardsProps {
  block: ServiceCardsBlock;
}

export function ServiceCards({ block }: ServiceCardsProps) {
  const classes = columnClasses[block.columns];

  return (
    <PageSection tone={block.background === "muted" ? "muted" : "default"}>
      <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
        {block.heading}
      </h2>
      <div className={classes.grid}>
        {block.cards.map((card) => {
          const hasBullets = Boolean(card.bullets?.length);
          const hasLink = Boolean(card.linkHref && card.linkLabel);

          return (
            <Card key={card.id ?? card.title}>
              <CardContent className="pt-6">
                <h3 className={classes.title}>{card.title}</h3>
                {card.description ? (
                  <p
                    className={cn(
                      classes.description,
                      (hasBullets || hasLink) && classes.descriptionGap,
                    )}
                  >
                    {card.description}
                  </p>
                ) : null}
                {card.bullets?.length ? (
                  <ul className="space-y-2 mb-4">
                    {card.bullets.map((bullet) => (
                      <li
                        className="flex items-start gap-2"
                        key={bullet.id ?? bullet.text}
                      >
                        <CheckCircle2 className="h-5 w-5 text-primary mt-0.5 shrink-0" />
                        <span className="text-sm">{bullet.text}</span>
                      </li>
                    ))}
                  </ul>
                ) : null}
                {card.linkHref && card.linkLabel ? (
                  <Button asChild className="p-0" variant="link">
                    <Link href={card.linkHref}>{card.linkLabel}</Link>
                  </Button>
                ) : null}
              </CardContent>
            </Card>
          );
        })}
      </div>
    </PageSection>
  );
}
