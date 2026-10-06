import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export type SectionTone = "default" | "muted" | "tint" | "primary";

export type SectionLayout = "stack" | "split";

export const toneOf = (background: string | null | undefined): SectionTone =>
  background === "muted" ? "muted" : "default";

export interface PageSectionProps {
  tone?: SectionTone;
  layout?: SectionLayout;
  id?: string;
  className?: string;
  children: ReactNode;
}

export function PageSection({
  tone = "default",
  layout = "stack",
  id,
  className,
  children,
}: PageSectionProps) {
  return (
    <section
      className={cn("section", layout === "split" && "split", className)}
      data-tone={tone}
      id={id}
    >
      {children}
    </section>
  );
}

export interface SectionHeaderProps {
  heading: ReactNode;
  intro?: string | null;
}

export function SectionHeader({ heading, intro }: SectionHeaderProps) {
  if (!intro) {
    return <h2 className="section-header">{heading}</h2>;
  }

  return (
    <header className="section-header">
      <h2>{heading}</h2>
      <p className="lead soft">{intro}</p>
    </header>
  );
}
