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
      <div className="grid gap-6 lg:grid-cols-[2fr_3fr] lg:gap-16">
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold tracking-tight">
          {block.heading}
        </h2>
        <div className="space-y-8">
          <p className="max-w-reading text-xl md:text-2xl">{block.text}</p>
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
            <ContactButton className={inverseButtonClass} size="lg">
              {block.ctaLabel}
            </ContactButton>
            <PhoneButton isOnPrimary label={block.phoneLabel} phone={phone} />
          </div>
        </div>
      </div>
    </PageSection>
  );
}
