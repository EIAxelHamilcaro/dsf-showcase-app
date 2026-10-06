import { NewTabHint } from "@/app/_components/newTabHint";
import {
  PageSection,
  SectionHeader,
  toneOf,
} from "@/app/_components/pageSection";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import type { FaqBlock } from "@/payload-types";

interface FaqSource {
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
    <Accordion collapsible type="single">
      {items.map((item, index) => (
        <AccordionItem
          key={item.id ?? index.toString()}
          value={item.id ?? `item-${index}`}
        >
          <AccordionTrigger>{item.question}</AccordionTrigger>
          <AccordionContent forceMount>
            <p>{item.answer}</p>
            {item.sources?.map((source, sourceIndex) => (
              <p
                className="small soft"
                key={source.id ?? sourceIndex.toString()}
              >
                {"Source : "}
                <a
                  className="link"
                  href={source.url}
                  rel="noopener"
                  target="_blank"
                >
                  {source.label}
                  <NewTabHint />
                </a>
              </p>
            ))}
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
}

export interface FaqProps {
  block: FaqBlock;
}

export function Faq({ block }: FaqProps) {
  return (
    <PageSection layout="split" tone={toneOf(block.background)}>
      <SectionHeader heading={block.heading} />
      <FaqAccordion items={block.items} />
    </PageSection>
  );
}
