import Link from "next/link";
import {
  PageSection,
  SectionHeader,
  toneOf,
} from "@/app/_components/pageSection";
import type { LinkCardsBlock } from "@/payload-types";

export interface LinkCardsProps {
  block: LinkCardsBlock;
}

export function LinkCards({ block }: LinkCardsProps) {
  return (
    <PageSection layout="split" tone={toneOf(block.background)}>
      <SectionHeader heading={block.heading} intro={block.intro} />
      <ul className="tile-wall sm:grid-cols-2">
        {block.links.map((link, index) => (
          <li key={link.id ?? index.toString()}>
            <Link className="tile grid h-full content-start" href={link.href}>
              <strong className="tile-title">{link.label}</strong>
              <span className="soft">{link.description}</span>
            </Link>
          </li>
        ))}
      </ul>
    </PageSection>
  );
}
