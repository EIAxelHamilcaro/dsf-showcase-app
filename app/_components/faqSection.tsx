import { FaqAccordion } from "@/app/_components/blocks/faq";
import { PageSection, sectionLeadClass } from "@/app/_components/pageSection";
import type { Config1 } from "@/payload-types";

export function FAQSection({ config }: { config: Config1 }) {
  const faqs = config?.faq_section?.faq || [];

  return (
    <PageSection id="faq">
      <div className="mx-auto max-w-3xl space-y-10">
        <div className="space-y-4 text-center">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold">
            Questions fréquentes
          </h2>
          <p className={sectionLeadClass}>
            Toutes les réponses à vos questions sur l'adaptation de salle de
            bain
          </p>
        </div>
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
