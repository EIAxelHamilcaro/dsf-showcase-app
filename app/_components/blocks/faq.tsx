import { PageSection } from "@/app/_components/pageSection";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import type { FaqBlock } from "@/payload-types";

interface FaqProps {
  block: FaqBlock;
}

export function Faq({ block }: FaqProps) {
  return (
    <PageSection tone={block.background === "muted" ? "muted" : "default"}>
      <div className="max-w-3xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-8">
          {block.heading}
        </h2>
        <Accordion className="space-y-3 sm:space-y-4" collapsible type="single">
          {block.items.map((item, index) => (
            <AccordionItem
              className="border border-border rounded-lg px-3 sm:px-6"
              key={item.id ?? item.question}
              value={item.id ?? `item-${index}`}
            >
              <AccordionTrigger className="text-left hover:no-underline cursor-pointer text-base sm:text-lg py-4">
                <span className="font-semibold pr-2">{item.question}</span>
              </AccordionTrigger>
              <AccordionContent
                className="text-base sm:text-lg pt-2 pb-4 space-y-2 in-data-[state=closed]:hidden"
                forceMount
              >
                <p>{item.answer}</p>
                {item.sources?.map((source) => (
                  <p
                    className="text-sm text-muted-foreground"
                    key={source.id ?? source.url}
                  >
                    {"Source : "}
                    <a
                      className="underline hover:text-primary"
                      href={source.url}
                      rel="noopener"
                      target="_blank"
                    >
                      {source.label}
                    </a>
                  </p>
                ))}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </PageSection>
  );
}
