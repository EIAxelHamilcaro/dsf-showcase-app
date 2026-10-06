import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

type SectionTone = "default" | "muted" | "hero" | "primary";

const toneClasses: Record<SectionTone, string> = {
  default: "bg-background",
  muted: "bg-muted",
  hero: "bg-surface-tint",
  primary: "bg-primary text-primary-foreground",
};

export const pageTitleClass =
  "text-4xl sm:text-5xl xl:text-6xl font-extrabold tracking-tight";

export const sectionTitleClass =
  "text-3xl md:text-4xl font-extrabold tracking-tight";

export const subsectionTitleClass =
  "text-2xl md:text-3xl font-extrabold tracking-tight";

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

export interface SectionHeaderProps {
  heading: ReactNode;
  intro?: string | null;
  isCentered?: boolean;
  className?: string;
}

export function SectionHeader({
  heading,
  intro,
  isCentered = false,
  className,
}: SectionHeaderProps) {
  return (
    <div className={cn("space-y-4", isCentered && "text-center", className)}>
      <h2 className={sectionTitleClass}>{heading}</h2>
      {intro ? (
        <p
          className={cn(
            sectionLeadClass,
            "max-w-reading",
            isCentered && "mx-auto",
          )}
        >
          {intro}
        </p>
      ) : null}
    </div>
  );
}

export interface SectionLayoutProps {
  heading: ReactNode;
  intro?: string | null;
  children: ReactNode;
}

export function SectionSplit({ heading, intro, children }: SectionLayoutProps) {
  return (
    <div className="grid gap-8 lg:grid-cols-[2fr_3fr] lg:gap-16">
      <SectionHeader
        className="lg:sticky lg:top-28 lg:self-start"
        heading={heading}
        intro={intro}
      />
      <div className="min-w-0">{children}</div>
    </div>
  );
}

export function SectionStack({ heading, intro, children }: SectionLayoutProps) {
  return (
    <div className="space-y-10">
      <SectionHeader heading={heading} intro={intro} />
      {children}
    </div>
  );
}
