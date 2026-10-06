import { ContactButton } from "@/app/_components/contactButton";
import { PageSection } from "@/app/_components/pageSection";
import type { CtaBlock } from "@/payload-types";
import { inverseButtonClass, PhoneButton } from "./phoneButton";

interface PageCtaProps {
  block: CtaBlock;
  phone: string;
}

export function PageCta({ block, phone }: PageCtaProps) {
  return (
    <PageSection tone="primary">
      <h2 className="text-3xl md:text-4xl font-bold mb-6">{block.heading}</h2>
      <p className="text-xl mb-8 max-w-2xl mx-auto">{block.text}</p>
      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <ContactButton className={inverseButtonClass} size="lg">
          {block.ctaLabel}
        </ContactButton>
        <PhoneButton label={block.phoneLabel} phone={phone} />
      </div>
    </PageSection>
  );
}
