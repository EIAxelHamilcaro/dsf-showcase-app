import Link from "next/link";
import { Button } from "@/components/ui/button";
import type { PageLink } from "@/lib/pages/pageLinks";

export const linkChipClass =
  "h-auto shrink py-2 border-control-border font-semibold whitespace-normal text-left";

interface RelatedLinksProps {
  links: PageLink[];
}

export function RelatedLinks({ links }: RelatedLinksProps) {
  if (links.length === 0) {
    return null;
  }

  return (
    <nav
      aria-label="Pages liées"
      className="mx-auto flex max-w-page flex-wrap gap-3 px-gutter py-10"
    >
      {links.map((link) => (
        <Button
          asChild
          className={linkChipClass}
          key={link.href}
          variant="outline"
        >
          <Link href={link.href}>{link.label}</Link>
        </Button>
      ))}
    </nav>
  );
}
