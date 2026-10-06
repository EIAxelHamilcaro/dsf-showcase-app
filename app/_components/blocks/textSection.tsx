import { PageSection, SectionSplit } from "@/app/_components/pageSection";
import type { TextSectionBlock } from "@/payload-types";

interface TextSectionProps {
  block: TextSectionBlock;
}

export function TextSection({ block }: TextSectionProps) {
  return (
    <PageSection tone={block.background === "muted" ? "muted" : "default"}>
      <SectionSplit heading={block.heading}>
        <div className="max-w-reading space-y-5 text-lg leading-relaxed">
          {block.paragraphs.map((paragraph) => (
            <p key={paragraph.id ?? paragraph.text}>{paragraph.text}</p>
          ))}
        </div>
      </SectionSplit>
    </PageSection>
  );
}
