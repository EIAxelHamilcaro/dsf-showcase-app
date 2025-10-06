import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import type { Config1 } from "@/payload-types";

export function FAQSection({ config }: { config: Config1 }) {
  const faqs = config?.faq_section?.faq || [];

  return (
    <section
      className="py-16 lg:py-24 bg-background mx-auto px-10 lg:px-32"
      id="faq"
    >
      <div className="text-center mb-16">
        <h1 className="text-5xl font-bold text-foreground mb-4 text-balance">
          Questions fréquentes
        </h1>
        <p className="text-xl text-muted-foreground text-pretty">
          Toutes les réponses à vos questions sur l'adaptation de salle de bain
        </p>
      </div>

      <Accordion className="space-y-4" collapsible type="single">
        {faqs.map((faq, index) => (
          <AccordionItem
            className="border border-border rounded-lg px-6"
            key={`faq_${index.toString()}`}
            value={`item-${index}`}
          >
            <AccordionTrigger className="text-left hover:no-underline cursor-pointer text-lg">
              <span className="font-semibold">{faq.question}</span>
            </AccordionTrigger>
            <AccordionContent className="text-lg pt-2 pb-4">
              {faq.answer}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </section>
  );
}
