import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

type SectionTone = "default" | "muted" | "hero" | "primary";

const toneClasses: Record<SectionTone, string> = {
  default: "py-16 lg:py-24",
  muted: "py-16 lg:py-24 bg-muted",
  hero: "py-16 lg:py-24 bg-gradient-to-b from-background to-muted",
  primary: "py-16 lg:py-24 bg-primary text-primary-foreground",
};

interface PageSectionProps {
  tone?: SectionTone;
  children: ReactNode;
}

export function PageSection({ tone = "default", children }: PageSectionProps) {
  return (
    <section className={toneClasses[tone]}>
      <div
        className={cn(
          "container mx-auto px-4",
          tone === "primary" ? "text-center" : "sm:px-10 md:px-16 lg:px-32",
        )}
      >
        {children}
      </div>
    </section>
  );
}
