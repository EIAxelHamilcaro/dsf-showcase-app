import Link from "next/link";
import { PageSection, SectionSplit } from "@/app/_components/pageSection";
import type { LinkCardsBlock } from "@/payload-types";

interface LinkCardsProps {
  block: LinkCardsBlock;
}

export function LinkCards({ block }: LinkCardsProps) {
  return (
    <PageSection tone={block.background === "muted" ? "muted" : "default"}>
      <SectionSplit heading={block.heading} intro={block.intro}>
        <ul className="grid gap-4 sm:grid-cols-2">
          {block.links.map((link, index) => (
            <li key={link.id ?? index.toString()}>
              <Link
                className="group block h-full rounded-lg border bg-background p-5 hover:border-primary"
                href={link.href}
              >
                <p className="text-lg font-bold text-primary underline group-hover:no-underline">
                  {link.label}
                </p>
                <p className="text-muted-foreground">{link.description}</p>
              </Link>
            </li>
          ))}
        </ul>
      </SectionSplit>
    </PageSection>
  );
}
