import { MapPin } from "lucide-react";
import { PageSection } from "@/app/_components/pageSection";
import type { ZoneListBlock } from "@/payload-types";

interface ZoneListProps {
  block: ZoneListBlock;
}

export function ZoneList({ block }: ZoneListProps) {
  return (
    <PageSection tone={block.background === "muted" ? "muted" : "default"}>
      <div className="max-w-4xl mx-auto">
        {block.showMapIcon ? (
          <div className="flex items-center justify-center gap-3 mb-8">
            <MapPin className="h-8 w-8 text-primary" />
            <h2 className="text-3xl md:text-4xl font-bold text-center">
              {block.heading}
            </h2>
          </div>
        ) : (
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-8">
            {block.heading}
          </h2>
        )}
        {block.intro ? (
          <p className="text-center text-lg mb-8 text-muted-foreground">
            {block.intro}
          </p>
        ) : null}
        <ul className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {block.items.map((item) => (
            <li
              className="bg-background p-4 rounded-lg text-center font-semibold text-sm"
              key={item.id ?? item.name}
            >
              {item.name}
            </li>
          ))}
        </ul>
        {block.outro ? (
          <p className="text-center mt-8 text-muted-foreground">
            {block.outro}
          </p>
        ) : null}
      </div>
    </PageSection>
  );
}
