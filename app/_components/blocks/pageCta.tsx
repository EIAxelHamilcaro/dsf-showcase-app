import { ContactButton } from "@/app/_components/contactButton";
import { PageSection } from "@/app/_components/pageSection";
import type { CtaBlock } from "@/payload-types";
import { PhoneButton } from "./phoneButton";

export interface PageCtaProps {
  block: CtaBlock;
  phone: string;
}

export function PageCta({ block, phone }: PageCtaProps) {
  return (
    <PageSection layout="split" tone="primary">
      <h2>{block.heading}</h2>
      <div className="grid gap-block">
        <p className="lead">{block.text}</p>
        <div className="flex flex-wrap gap-inline">
          <ContactButton size="lg">{block.ctaLabel}</ContactButton>
          <PhoneButton label={block.phoneLabel} phone={phone} />
        </div>
      </div>
    </PageSection>
  );
}
