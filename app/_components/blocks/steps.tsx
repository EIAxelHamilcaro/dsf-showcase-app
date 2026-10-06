import {
  PageSection,
  SectionHeader,
  toneOf,
} from "@/app/_components/pageSection";
import type { StepsBlock } from "@/payload-types";

export interface StepsProps {
  block: StepsBlock;
}

export function Steps({ block }: StepsProps) {
  return (
    <PageSection layout="split" tone={toneOf(block.background)}>
      <SectionHeader heading={block.heading} />
      <ol className="tile-wall">
        {block.items.map((item, index) => (
          <li
            className="tile flex items-start gap-stack"
            key={item.id ?? index.toString()}
          >
            <span aria-hidden="true" className="step-number">
              {index + 1}
            </span>
            <div className="grid gap-inline">
              <h3>
                <span className="sr-only">{`Étape ${index + 1} : `}</span>
                {item.title}
              </h3>
              <p className="soft">{item.text}</p>
            </div>
          </li>
        ))}
      </ol>
    </PageSection>
  );
}
