import { MapPin } from "lucide-react";
import { PageSection, SectionSplit } from "@/app/_components/pageSection";
import type { ZoneListBlock } from "@/payload-types";

interface ZoneListProps {
  block: ZoneListBlock;
}

export function ZoneList({ block }: ZoneListProps) {
  return (
    <PageSection tone={block.background === "muted" ? "muted" : "default"}>
      <SectionSplit heading={block.heading} intro={block.intro}>
        <ul className="flex flex-wrap gap-3">
          {block.items.map((item) => (
            <li
              className="flex items-center gap-2 rounded-lg border bg-background px-4 py-3 font-semibold"
              key={item.id ?? item.name}
            >
              {block.showMapIcon ? (
                <MapPin
                  aria-hidden="true"
                  className="h-5 w-5 shrink-0 text-primary"
                />
              ) : null}
              {item.name}
            </li>
          ))}
        </ul>
        {block.outro ? (
          <p className="mt-8 max-w-reading text-muted-foreground">
            {block.outro}
          </p>
        ) : null}
      </SectionSplit>
    </PageSection>
  );
}
