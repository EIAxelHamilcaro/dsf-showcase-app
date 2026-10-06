import type { ReactNode } from "react";
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
        className="underline hover:text-primary break-all"
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

function LegalSectionContent({ section }: { section: LegalSection }) {
  const headers = section.headers ?? [];
  const rows = section.rows ?? [];

  return (
    <>
      {section.heading ? (
        <h2 className="text-2xl font-bold pt-6">{section.heading}</h2>
      ) : null}
      {section.paragraphs?.map((paragraph) => (
        <p className="whitespace-pre-line" key={paragraph.id ?? paragraph.text}>
          {withLinks(paragraph.text)}
        </p>
      ))}
      {section.items?.length ? (
        <ul className="list-disc pl-6 space-y-1">
          {section.items.map((item) => (
            <li key={item.id ?? item.text}>{withLinks(item.text)}</li>
          ))}
        </ul>
      ) : null}
      {rows.length ? (
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm border-collapse">
            {headers.length ? (
              <thead>
                <tr>
                  {headers.map((header) => (
                    <th
                      className="border border-border p-2 font-semibold"
                      key={header.id ?? header.label}
                      scope="col"
                    >
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
                    <td
                      className="border border-border p-2 align-top"
                      key={cell.id ?? cellIndex.toString()}
                    >
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

interface LegalContentProps {
  block: LegalContentBlock;
  updatedAt: string;
}

export function LegalContent({ block, updatedAt }: LegalContentProps) {
  return (
    <PageSection>
      <div className="max-w-3xl mx-auto space-y-4">
        <h1 className="text-4xl md:text-5xl font-bold text-balance">
          {block.title}
        </h1>
        <p className="text-sm text-muted-foreground">
          {`Dernière mise à jour : ${updateDateFormat.format(new Date(updatedAt))}`}
        </p>
        {block.sections.map((section, index) => (
          <LegalSectionContent
            key={section.id ?? index.toString()}
            section={section}
          />
        ))}
      </div>
    </PageSection>
  );
}
