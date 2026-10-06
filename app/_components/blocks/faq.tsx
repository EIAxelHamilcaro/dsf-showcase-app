import { PageSection, SectionSplit } from "@/app/_components/pageSection";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import type { FaqBlock } from "@/payload-types";

export interface FaqSource {
  id?: string | null;
  label: string;
  url: string;
}

export interface FaqEntry {
  id?: string | null;
  question: string;
  answer: string;
  sources?: FaqSource[] | null;
}

export interface FaqAccordionProps {
  items: FaqEntry[];
}

export function FaqAccordion({ items }: FaqAccordionProps) {
  return (
    <Accordion className="border-t" collapsible type="single">
      {items.map((item, index) => (
        <AccordionItem
          key={item.id ?? item.question}
          value={item.id ?? `item-${index}`}
        >
          <AccordionTrigger className="cursor-pointer items-center py-5 text-lg md:text-xl font-bold [&>svg]:size-6 [&>svg]:translate-y-0 [&>svg]:text-primary">
            {item.question}
          </AccordionTrigger>
          <AccordionContent
            className="max-w-reading space-y-2 pb-6 text-lg leading-relaxed"
            forceMount
          >
            <p>{item.answer}</p>
            {item.sources?.map((source) => (
              <p
                className="text-small text-muted-foreground"
                key={source.id ?? source.url}
              >
                {"Source : "}
                <a
                  className="inline-flex min-h-11 items-center underline hover:text-primary"
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
  );
}

interface FaqProps {
  block: FaqBlock;
}

export function Faq({ block }: FaqProps) {
  return (
    <PageSection tone={block.background === "muted" ? "muted" : "default"}>
      <SectionSplit heading={block.heading}>
        <FaqAccordion items={block.items} />
      </SectionSplit>
    </PageSection>
  );
}
