import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export type SectionTone = "default" | "muted" | "hero" | "primary";

const toneClasses: Record<SectionTone, string> = {
  default: "bg-background",
  muted: "bg-muted",
  hero: "bg-surface-tint",
  primary: "bg-primary text-primary-foreground",
};

export const sectionTitleClass =
  "text-3xl md:text-4xl font-extrabold tracking-tight";

export const sectionLeadClass = "text-lg md:text-xl text-muted-foreground";

export interface PageSectionProps {
  tone?: SectionTone;
  id?: string;
  className?: string;
  children: ReactNode;
}

export function PageSection({
  tone = "default",
  id,
  className,
  children,
}: PageSectionProps) {
  return (
    <section
      className={cn("py-section scroll-mt-20", toneClasses[tone], className)}
      id={id}
    >
      <div className="mx-auto max-w-page px-gutter">{children}</div>
    </section>
  );
}

export interface SectionSplitProps {
  heading: ReactNode;
  intro?: string | null;
  children: ReactNode;
}

export function SectionSplit({ heading, intro, children }: SectionSplitProps) {
  return (
    <div className="grid gap-8 lg:grid-cols-[2fr_3fr] lg:gap-16">
      <div className="space-y-4">
        <h2 className={sectionTitleClass}>{heading}</h2>
        {intro ? <p className={sectionLeadClass}>{intro}</p> : null}
      </div>
      <div className="min-w-0">{children}</div>
    </div>
  );
}
