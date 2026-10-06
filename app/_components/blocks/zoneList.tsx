import { MapPin } from "lucide-react";
import { PageSection } from "@/app/_components/pageSection";
import { cn } from "@/lib/utils";
import type { ZoneListBlock } from "@/payload-types";

const gridClasses: Record<NonNullable<ZoneListBlock["columns"]>, string> = {
  "4": "grid grid-cols-2 md:grid-cols-4 gap-4",
  "5": "grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4",
};

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
        <ul className={gridClasses[block.columns ?? "5"]}>
          {block.items.map((item) => (
            <li
              className={cn(
                "bg-background p-4 rounded-lg text-center font-semibold",
                !block.showMapIcon && "text-sm",
              )}
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
