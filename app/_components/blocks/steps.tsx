import { PageSection, SectionSplit } from "@/app/_components/pageSection";
import { cn } from "@/lib/utils";
import type { StepsBlock } from "@/payload-types";

interface StepsProps {
  block: StepsBlock;
}

export function Steps({ block }: StepsProps) {
  return (
    <PageSection tone={block.background === "muted" ? "muted" : "default"}>
      <SectionSplit heading={block.heading}>
        <ol className={block.withCards ? "space-y-4" : "space-y-8"}>
          {block.items.map((item, index) => (
            <li
              className={cn(
                "flex gap-5",
                block.withCards && "rounded-lg border bg-background p-5",
              )}
              key={item.id ?? index.toString()}
            >
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-primary text-xl font-extrabold text-primary-foreground">
                {index + 1}
              </div>
              <div className="space-y-2 pt-2">
                <h3 className="text-xl font-bold">{item.title}</h3>
                <p className="text-muted-foreground">{item.text}</p>
              </div>
            </li>
          ))}
        </ol>
      </SectionSplit>
    </PageSection>
  );
}
