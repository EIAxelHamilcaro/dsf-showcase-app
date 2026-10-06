import Link from "next/link";
import {
  PageSection,
  SectionHeader,
  toneOf,
} from "@/app/_components/pageSection";
import type { TextSegment } from "@/lib/pages/mentionLinks";
import type { TextSectionBlock } from "@/payload-types";

export interface TextSectionProps {
  block: TextSectionBlock;
  paragraphs: TextSegment[][];
}

export function TextSection({ block, paragraphs }: TextSectionProps) {
  return (
    <PageSection layout="split" tone={toneOf(block.background)}>
      <SectionHeader heading={block.heading} />
      <div className="prose">
        {paragraphs.map((segments, index) => (
          <p key={block.paragraphs[index]?.id ?? index.toString()}>
            {segments.map((segment) =>
              typeof segment === "string" ? (
                segment
              ) : (
                <Link href={segment.href} key={segment.href}>
                  {segment.label}
                </Link>
              ),
            )}
          </p>
        ))}
      </div>
    </PageSection>
  );
}
