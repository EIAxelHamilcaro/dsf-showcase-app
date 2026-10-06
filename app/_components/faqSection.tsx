import { FaqAccordion } from "@/app/_components/blocks/faq";
import { PageSection, SectionHeader } from "@/app/_components/pageSection";
import type { Config1 } from "@/payload-types";

export function FAQSection({ config }: { config: Config1 }) {
  const faqs = config?.faq_section?.faq || [];

  return (
    <PageSection id="faq">
      <div className="mx-auto max-w-3xl space-y-10">
        <SectionHeader
          heading="Questions fréquentes"
          intro="Toutes les réponses à vos questions sur l'adaptation de salle de bain"
          isCentered
        />
        <FaqAccordion
          items={faqs.map((faq) => ({
            id: faq.id,
            question: faq.question ?? "",
            answer: faq.answer ?? "",
          }))}
        />
      </div>
    </PageSection>
  );
}
