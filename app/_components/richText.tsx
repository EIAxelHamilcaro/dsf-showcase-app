import { Fragment } from "react";
import type { Config1 } from "@/payload-types";

const boldFormat = 1;

interface TitleSegment {
  text?: string;
  format?: number;
}

interface TitleLine {
  text?: string;
  children?: TitleSegment[];
}

const withPlainSpaces = (text: string | undefined) =>
  (text ?? "").replace(/ /g, " ");

export interface HighlightedTitleProps {
  content?: Config1["main_title"];
}

export function HighlightedTitle({ content }: HighlightedTitleProps) {
  const lines = (content?.root?.children ?? []) as TitleLine[];

  if (lines.length === 0) {
    return null;
  }

  return (
    <h1>
      {lines.map((line, lineIndex) => {
        const segments = line.children ?? [{ text: line.text }];
        const isLastLine = lineIndex === lines.length - 1;

        return (
          <Fragment key={lineIndex.toString()}>
            {segments.map((segment, segmentIndex) =>
              segment.format === boldFormat ? (
                <mark key={segmentIndex.toString()}>
                  {withPlainSpaces(segment.text)}
                </mark>
              ) : (
                withPlainSpaces(segment.text)
              ),
            )}
            {isLastLine ? null : " "}
          </Fragment>
        );
      })}
    </h1>
  );
}
