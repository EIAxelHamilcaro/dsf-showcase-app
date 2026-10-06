import { FaqAccordion } from "@/app/_components/blocks/faq";
import { PageSection, SectionHeader } from "@/app/_components/pageSection";
import type { Config1 } from "@/payload-types";

export interface FAQSectionProps {
  config: Config1;
}

export function FAQSection({ config }: FAQSectionProps) {
  const faqs = config.faq_section?.faq ?? [];

  return (
    <PageSection id="faq" layout="split">
      <SectionHeader
        heading="Questions fréquentes"
        intro="Toutes les réponses à vos questions sur l'adaptation de salle de bain."
      />
      <FaqAccordion
        items={faqs.map((faq) => ({
          id: faq.id,
          question: faq.question ?? "",
          answer: faq.answer ?? "",
        }))}
      />
    </PageSection>
  );
}
