import { ContactButton } from "@/app/_components/contactButton";
import { PageSection, sectionTitleClass } from "@/app/_components/pageSection";
import type { CtaBlock } from "@/payload-types";
import { PhoneButton } from "./phoneButton";

interface PageCtaProps {
  block: CtaBlock;
  phone: string;
}

export function PageCta({ block, phone }: PageCtaProps) {
  return (
    <PageSection tone="primary">
      <div className="grid gap-6 lg:grid-cols-[2fr_3fr] lg:gap-16">
        <h2 className={sectionTitleClass}>{block.heading}</h2>
        <div className="space-y-8">
          <p className="max-w-reading text-xl md:text-2xl">{block.text}</p>
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
            <ContactButton size="xl" variant="inverse">
              {block.ctaLabel}
            </ContactButton>
            <PhoneButton isOnPrimary label={block.phoneLabel} phone={phone} />
          </div>
        </div>
      </div>
    </PageSection>
  );
}
