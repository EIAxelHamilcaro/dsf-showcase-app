import { Phone } from "lucide-react";
import { ContactButton } from "@/app/_components/contactButton";
import { PageSection } from "@/app/_components/pageSection";
import { Button } from "@/components/ui/button";
import { toTelHref } from "@/lib/seo/phone";
import type { CtaBlock } from "@/payload-types";

const inverseButtonClass =
  "bg-white text-primary hover:bg-primary hover:text-white border-white";

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
        <Button asChild className={inverseButtonClass} size="lg">
          <a href={toTelHref(phone)}>
            <Phone className="mr-2 h-5 w-5" />
            {block.phoneLabel || phone}
          </a>
        </Button>
      </div>
    </PageSection>
  );
}
