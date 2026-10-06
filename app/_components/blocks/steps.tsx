import { PageSection } from "@/app/_components/pageSection";
import { Card, CardContent } from "@/components/ui/card";
import type { StepsBlock } from "@/payload-types";

interface StepsProps {
  block: StepsBlock;
}

export function Steps({ block }: StepsProps) {
  const badgeSize = block.withCards ? "w-8 h-8" : "w-12 h-12 text-xl";

  return (
    <PageSection tone={block.background === "muted" ? "muted" : "default"}>
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
          {block.heading}
        </h2>
        <ol className={block.withCards ? "space-y-6" : "space-y-8"}>
          {block.items.map((item, index) => {
            const step = (
              <div className="flex gap-6 items-start">
                <div
                  className={`bg-primary text-primary-foreground rounded-full ${badgeSize} flex items-center justify-center font-bold shrink-0`}
                >
                  {index + 1}
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-2">{item.title}</h3>
                  <p className="text-muted-foreground">{item.text}</p>
                </div>
              </div>
            );

            return (
              <li key={item.id ?? item.title}>
                {block.withCards ? (
                  <Card>
                    <CardContent className="pt-6">{step}</CardContent>
                  </Card>
                ) : (
                  step
                )}
              </li>
            );
          })}
        </ol>
      </div>
    </PageSection>
  );
}
