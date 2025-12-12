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
      className="py-12 md:py-16 lg:py-24 bg-background mx-auto px-4 sm:px-10 md:px-16 lg:px-32 overflow-hidden"
      id="faq"
    >
      <div className="text-center mb-8 sm:mb-12 md:mb-16">
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-foreground mb-4 text-balance">
          Questions fréquentes
        </h2>
        <p className="text-base sm:text-lg md:text-xl text-muted-foreground text-pretty">
          Toutes les réponses à vos questions sur l'adaptation de salle de bain
        </p>
      </div>

      <Accordion className="space-y-3 sm:space-y-4" collapsible type="single">
        {faqs.map((faq, index) => (
          <AccordionItem
            className="border border-border rounded-lg px-3 sm:px-6"
            key={`faq_${index.toString()}`}
            value={`item-${index}`}
          >
            <AccordionTrigger className="text-left hover:no-underline cursor-pointer text-base sm:text-lg py-4">
              <span className="font-semibold pr-2">{faq.question}</span>
            </AccordionTrigger>
            <AccordionContent className="text-base sm:text-lg pt-2 pb-4">
              {faq.answer}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </section>
  );
}
