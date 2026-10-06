import { MapPin } from "lucide-react";
import Link from "next/link";
import {
  PageSection,
  SectionHeader,
  toneOf,
} from "@/app/_components/pageSection";
import type { ZoneListBlock } from "@/payload-types";

export interface ZoneListProps {
  block: ZoneListBlock;
  hrefOf: (name: string) => string | undefined;
}

export function ZoneList({ block, hrefOf }: ZoneListProps) {
  return (
    <PageSection layout="split" tone={toneOf(block.background)}>
      <SectionHeader heading={block.heading} intro={block.intro} />
      <div className="grid content-start gap-stack">
        <ul className="tile-wall" data-fit="auto">
          {block.items.map((item, index) => {
            const href = hrefOf(item.name);

            return (
              <li
                className="tile flex items-center gap-inline"
                data-size="compact"
                key={item.id ?? index.toString()}
              >
                {block.showMapIcon ? (
                  <MapPin
                    aria-hidden="true"
                    className="icon-mark"
                    data-size="sm"
                  />
                ) : null}
                {href ? (
                  <Link className="tile-title" href={href}>
                    {item.name}
                  </Link>
                ) : (
                  item.name
                )}
              </li>
            );
          })}
        </ul>
        {block.outro ? <p className="soft">{block.outro}</p> : null}
      </div>
    </PageSection>
  );
}
