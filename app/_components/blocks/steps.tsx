import { PageSection } from "@/app/_components/pageSection";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import type { StepsBlock } from "@/payload-types";

interface StepClasses {
  wrapper: string;
  heading: string;
  list: string;
  row: string;
  badge: string;
  title: string;
  text: string;
}

const plainSteps: StepClasses = {
  wrapper: "max-w-4xl mx-auto",
  heading: "mb-12",
  list: "space-y-8",
  row: "flex gap-6 items-start",
  badge: "w-12 h-12 text-xl",
  title: "text-xl font-bold mb-2",
  text: "text-muted-foreground",
};

const cardSteps: StepClasses = {
  wrapper: "max-w-3xl mx-auto",
  heading: "mb-8",
  list: "space-y-6",
  row: "flex gap-4",
  badge: "w-8 h-8",
  title: "font-bold mb-2",
  text: "text-sm text-muted-foreground",
};

interface StepsProps {
  block: StepsBlock;
}

export function Steps({ block }: StepsProps) {
  const classes = block.withCards ? cardSteps : plainSteps;

  return (
    <PageSection tone={block.background === "muted" ? "muted" : "default"}>
      <div className={classes.wrapper}>
        <h2
          className={cn(
            "text-3xl md:text-4xl font-bold text-center",
            classes.heading,
          )}
        >
          {block.heading}
        </h2>
        <ol className={classes.list}>
          {block.items.map((item, index) => {
            const step = (
              <div className={classes.row}>
                <div
                  className={cn(
                    "bg-primary text-primary-foreground rounded-full flex items-center justify-center font-bold shrink-0",
                    classes.badge,
                  )}
                >
                  {index + 1}
                </div>
                <div>
                  <h3 className={classes.title}>{item.title}</h3>
                  <p className={classes.text}>{item.text}</p>
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
