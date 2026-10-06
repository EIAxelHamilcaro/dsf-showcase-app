import { PageSection } from "@/app/_components/pageSection";
import type { TextSectionBlock } from "@/payload-types";

interface TextSectionProps {
  block: TextSectionBlock;
}

export function TextSection({ block }: TextSectionProps) {
  return (
    <PageSection tone={block.background === "muted" ? "muted" : "default"}>
      <div className="max-w-3xl mx-auto space-y-4">
        <h2 className="text-3xl md:text-4xl font-bold mb-6">{block.heading}</h2>
        {block.paragraphs.map((paragraph) => (
          <p
            className="text-lg text-muted-foreground"
            key={paragraph.id ?? paragraph.text}
          >
            {paragraph.text}
          </p>
        ))}
      </div>
    </PageSection>
  );
}
