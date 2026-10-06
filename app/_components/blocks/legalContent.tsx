import { type ReactNode, useId } from "react";
import { PageSection } from "@/app/_components/pageSection";
import type { LegalContentBlock } from "@/payload-types";

const urlPattern = /(https:\/\/[^\s]*[^\s.,;:)])/;
const updateDateFormat = new Intl.DateTimeFormat("fr-FR", {
  dateStyle: "long",
  timeZone: "Europe/Paris",
});

function withLinks(text: string): ReactNode[] {
  return text.split(urlPattern).map((part, index) =>
    index % 2 === 1 ? (
      <a
        href={part}
        key={`${part}-${index.toString()}`}
        rel="noopener"
        target="_blank"
      >
        {part}
      </a>
    ) : (
      part
    ),
  );
}

type LegalSection = LegalContentBlock["sections"][number];

interface LegalSectionContentProps {
  section: LegalSection;
}

function LegalSectionContent({ section }: LegalSectionContentProps) {
  const headers = section.headers ?? [];
  const rows = section.rows ?? [];
  const headingId = useId();

  return (
    <>
      {section.heading ? <h2 id={headingId}>{section.heading}</h2> : null}
      {section.paragraphs?.map((paragraph, index) => (
        <p key={paragraph.id ?? index.toString()}>
          {withLinks(paragraph.text)}
        </p>
      ))}
      {section.items?.length ? (
        <ul>
          {section.items.map((item, index) => (
            <li key={item.id ?? index.toString()}>{withLinks(item.text)}</li>
          ))}
        </ul>
      ) : null}
      {rows.length ? (
        <div
          className="scroll-x"
          // biome-ignore lint/a11y/noNoninteractiveTabindex: a scrollable table must be reachable with the keyboard
          tabIndex={0}
        >
          <table
            aria-labelledby={section.heading ? headingId : undefined}
            className="data-table"
          >
            {headers.length ? (
              <thead>
                <tr>
                  {headers.map((header, index) => (
                    <th key={header.id ?? index.toString()} scope="col">
                      {header.label}
                    </th>
                  ))}
                </tr>
              </thead>
            ) : null}
            <tbody>
              {rows.map((row, rowIndex) => (
                <tr key={row.id ?? rowIndex.toString()}>
                  {row.cells.map((cell, cellIndex) => (
                    <td key={cell.id ?? cellIndex.toString()}>
                      {withLinks(cell.text)}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : null}
    </>
  );
}

export interface LegalContentProps {
  block: LegalContentBlock;
  updatedAt: string;
}

export function LegalContent({ block, updatedAt }: LegalContentProps) {
  return (
    <PageSection>
      <article className="prose">
        <h1>{block.title}</h1>
        <p className="small soft">
          {`Dernière mise à jour : ${updateDateFormat.format(new Date(updatedAt))}`}
        </p>
        {block.sections.map((section, index) => (
          <LegalSectionContent
            key={section.id ?? index.toString()}
            section={section}
          />
        ))}
      </article>
    </PageSection>
  );
}
