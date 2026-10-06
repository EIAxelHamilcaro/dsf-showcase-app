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
        className="break-all text-primary underline hover:no-underline"
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
        <h2 className="pt-8 text-2xl md:text-3xl font-extrabold tracking-tight">
          {section.heading}
        </h2>
      ) : null}
      {section.paragraphs?.map((paragraph) => (
        <p className="whitespace-pre-line" key={paragraph.id ?? paragraph.text}>
          {withLinks(paragraph.text)}
        </p>
      ))}
      {section.items?.length ? (
        <ul className="list-disc space-y-2 pl-6 marker:text-primary">
          {section.items.map((item) => (
            <li key={item.id ?? item.text}>{withLinks(item.text)}</li>
          ))}
        </ul>
      ) : null}
      {rows.length ? (
        <div className="overflow-x-auto">
          <table className="w-full min-w-xl border-collapse text-left text-small">
            {headers.length ? (
              <thead>
                <tr>
                  {headers.map((header) => (
                    <th
                      className="border bg-muted p-3 font-bold"
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
                      className="border p-3 align-top"
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
      <div className="mx-auto max-w-reading space-y-5 text-lg leading-relaxed">
        <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight">
          {block.title}
        </h1>
        <p className="border-b pb-6 text-small text-muted-foreground">
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
