import Link from "next/link";
import { PageSection } from "@/app/_components/pageSection";
import { Card, CardContent } from "@/components/ui/card";
import type { LinkCardsBlock } from "@/payload-types";

interface LinkCardsProps {
  block: LinkCardsBlock;
}

export function LinkCards({ block }: LinkCardsProps) {
  return (
    <PageSection tone={block.background === "muted" ? "muted" : "default"}>
      <div className="max-w-3xl mx-auto text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-6">{block.heading}</h2>
        {block.intro ? (
          <p className="text-lg mb-8 text-muted-foreground">{block.intro}</p>
        ) : null}
        <ul className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-8">
          {block.links.map((link) => (
            <li key={link.id ?? link.href}>
              <Link href={link.href}>
                <Card className="hover:border-primary transition-colors cursor-pointer">
                  <CardContent className="pt-6 text-center">
                    <p className="font-bold">{link.label}</p>
                    <p className="text-sm text-muted-foreground">
                      {link.description}
                    </p>
                  </CardContent>
                </Card>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </PageSection>
  );
}
